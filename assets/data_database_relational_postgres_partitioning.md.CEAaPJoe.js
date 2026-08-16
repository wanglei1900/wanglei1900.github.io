import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const g=JSON.parse('{"title":"PostgreSQL分区表与表继承深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/relational/postgres/partitioning.md","filePath":"data/database/relational/postgres/partitioning.md"}'),p={name:"data/database/relational/postgres/partitioning.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="postgresql分区表与表继承深度解析" tabindex="-1">PostgreSQL分区表与表继承深度解析 <a class="header-anchor" href="#postgresql分区表与表继承深度解析" aria-label="Permalink to &quot;PostgreSQL分区表与表继承深度解析&quot;">​</a></h1><h2 id="一、表继承基础概念" tabindex="-1">一、表继承基础概念 <a class="header-anchor" href="#一、表继承基础概念" aria-label="Permalink to &quot;一、表继承基础概念&quot;">​</a></h2><h3 id="_1-1-表继承核心原理" tabindex="-1">1.1 表继承核心原理 <a class="header-anchor" href="#_1-1-表继承核心原理" aria-label="Permalink to &quot;1.1 表继承核心原理&quot;">​</a></h3><h4 id="_1-1-1-继承关系基本操作" tabindex="-1">1.1.1 继承关系基本操作 <a class="header-anchor" href="#_1-1-1-继承关系基本操作" aria-label="Permalink to &quot;1.1.1 继承关系基本操作&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建父表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> parent_table</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata JSONB</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建继承表（子表）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> child_table</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    child_specific_column </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    additional_data </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) INHERITS (parent_table);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看继承关系</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    inhrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> child_table,</span></span>
<span class="line"><span class="__shiki_140thh">    inhparent::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">    inhseqno </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> inheritance_sequence</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;parent_table&#39;</span><span class="__shiki_140thh">::regclass;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入数据到父表（会插入到所有子表吗？）</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> parent_table (metadata) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;{&quot;type&quot;: &quot;parent&quot;}&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 注意：这只会插入到parent_table，不会自动传播到子表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入数据到子表</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> child_table (child_specific_column, metadata) </span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;child data&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;{&quot;type&quot;: &quot;child&quot;}&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询父表（包含所有子表数据）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> parent_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 只查询父表自身数据（不包含子表）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> ONLY parent_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看表的继承链</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> RECURSIVE</span><span class="__shiki_140thh"> inheritance_chain </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 起始表</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        oid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_1itgoe">        oid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> full_name,</span></span>
<span class="line"><span class="__shiki_1itgoe">        oid</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> table_oid,</span></span>
<span class="line"><span class="__shiki_dzsirb">        0</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> level</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_class</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;parent_table&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 递归查询子表</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">::regclass,</span></span>
<span class="line"><span class="__shiki_dzsirb">        ic</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">full_name</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39; -&gt; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">::regclass,</span></span>
<span class="line"><span class="__shiki_dzsirb">        c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        ic</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">level</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_inherits i</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_class c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> inheritance_chain ic </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ic</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_oid</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    table_name,</span></span>
<span class="line"><span class="__shiki_1itgoe">    level</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    repeat</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;  &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">level</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> table_name </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> inheritance_tree</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> inheritance_chain</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> level</span><span class="__shiki_140thh">, table_name;</span></span></code></pre></div><h4 id="_1-1-2-继承表的约束与索引" tabindex="-1">1.1.2 继承表的约束与索引 <a class="header-anchor" href="#_1-1-2-继承表的约束与索引" aria-label="Permalink to &quot;1.1.2 继承表的约束与索引&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 父表约束不会自动继承</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 需要在每个子表单独创建约束</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 为父表添加检查约束</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> parent_table </span></span>
<span class="line"><span class="__shiki_1itgoe">ADD</span><span class="__shiki_1itgoe"> CONSTRAINT</span><span class="__shiki_140thh"> check_status </span></span>
<span class="line"><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">status</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;active&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;inactive&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;archived&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 子表不会继承这个约束</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 需要手动为子表添加相同约束</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> child_table </span></span>
<span class="line"><span class="__shiki_1itgoe">ADD</span><span class="__shiki_1itgoe"> CONSTRAINT</span><span class="__shiki_140thh"> child_check_status </span></span>
<span class="line"><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">status</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;active&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;inactive&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;archived&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建索引（同样不会继承）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_parent_created</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> parent_table(created_at);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_child_created</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> child_table(created_at);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看表的所有约束</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    conname </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> constraint_name,</span></span>
<span class="line"><span class="__shiki_140thh">    conrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_140thh">    contype </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> constraint_type,</span></span>
<span class="line"><span class="__shiki_140thh">    consrc </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> constraint_definition</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_constraint</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> conrelid </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;parent_table&#39;</span><span class="__shiki_140thh">::regclass, </span><span class="__shiki_mdbnqw">&#39;child_table&#39;</span><span class="__shiki_140thh">::regclass)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> table_name, contype;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用继承约束继承（PostgreSQL 12+）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> another_child_table</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    extra_column </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> another_child_check_status </span></span>
<span class="line"><span class="__shiki_1itgoe">        CHECK</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">status</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;active&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;inactive&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;archived&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">) INHERITS (parent_table);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证约束继承</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> another_child_table (</span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;invalid&#39;</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">-- 应该失败</span></span></code></pre></div><h3 id="_1-2-继承表的dml操作" tabindex="-1">1.2 继承表的DML操作 <a class="header-anchor" href="#_1-2-继承表的dml操作" aria-label="Permalink to &quot;1.2 继承表的DML操作&quot;">​</a></h3><h4 id="_1-2-1-数据操作语义" tabindex="-1">1.2.1 数据操作语义 <a class="header-anchor" href="#_1-2-1-数据操作语义" aria-label="Permalink to &quot;1.2.1 数据操作语义&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建测试表结构</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> employees</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    employee_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    salary </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    department </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    hire_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> CURRENT_DATE</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> managers</span><span class="__shiki_140thh"> () INHERITS (employees);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> developers</span><span class="__shiki_140thh"> () INHERITS (employees);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> interns</span><span class="__shiki_140thh"> () INHERITS (employees);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 向不同表插入数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> managers (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary, department) </span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Alice&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">90000</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Management&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> developers (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary, department)</span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Bob&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">75000</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Engineering&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> interns (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, salary, department)</span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Charlie&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20000</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Training&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 更新操作</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 更新所有员工（包括所有子表）</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> employees </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> WHERE</span><span class="__shiki_140thh"> department </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Engineering&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看更新影响的行</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    tableoid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> source_table,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> rows_affected</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> employees</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> department </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Engineering&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> tableoid;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 删除操作</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 删除所有实习生</span></span>
<span class="line"><span class="__shiki_1itgoe">DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> employees </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tableoid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;interns&#39;</span><span class="__shiki_140thh">::regclass;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 或者更精确的删除</span></span>
<span class="line"><span class="__shiki_1itgoe">DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> ONLY employees </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;Alice&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 只删除父表中的数据</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用RETURNING子句查看操作结果</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> deleted </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> employees </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 30000</span></span>
<span class="line"><span class="__shiki_140thh">    RETURNING tableoid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> source_table, employee_id, </span><span class="__shiki_1itgoe">name</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> source_table, </span><span class="__shiki_dzsirb">COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> deleted_count</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> deleted</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> source_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 事务中的继承表操作</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 跨表更新</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> employees </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHEN</span><span class="__shiki_140thh"> tableoid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;managers&#39;</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">15</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHEN</span><span class="__shiki_140thh"> tableoid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;developers&#39;</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_1itgoe">    ELSE</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">05</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> hire_date </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2023-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证更新</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    tableoid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(salary)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_salary,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> employee_count</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> employees</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> tableoid;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_1-2-2-继承表的性能考虑" tabindex="-1">1.2.2 继承表的性能考虑 <a class="header-anchor" href="#_1-2-2-继承表的性能考虑" aria-label="Permalink to &quot;1.2.2 继承表的性能考虑&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建大量测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> performance_parent</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    data_value </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    category </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    created_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建多个子表</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    i </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">..</span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe"> LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE TABLE performance_child_%s () INHERITS (performance_parent)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, i);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 为每个子表插入数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            INSERT INTO performance_child_%s (data_value, category)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                random() * 1000,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                CASE floor(random() * 4)::int</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    WHEN 0 THEN &#39;&#39;A&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    WHEN 1 THEN &#39;&#39;B&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    WHEN 2 THEN &#39;&#39;C&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ELSE &#39;&#39;D&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                END</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM generate_series(1, 100000)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, i);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能测试：查询所有表</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> category, </span><span class="__shiki_dzsirb">COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">AVG</span><span class="__shiki_140thh">(data_value)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> performance_parent</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> created_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> category;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能测试：查询特定子表</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> category, </span><span class="__shiki_dzsirb">COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">AVG</span><span class="__shiki_140thh">(data_value)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> performance_child_1</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> created_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> category;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看查询计划中的表扫描</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    relid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_140thh">    seq_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    seq_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;performance_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> seq_tup_read </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> idx_tup_fetch </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 继承表查询优化技巧</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 使用tableoid过滤</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> performance_parent</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tableoid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;performance_child_1&#39;</span><span class="__shiki_140thh">::regclass</span></span>
<span class="line"><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> data_value </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 在查询中使用ONLY限制</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> ONLY performance_parent</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> data_value </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建索引（需要在每个子表单独创建）</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    child RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> child </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> inhrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> child_table</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;performance_parent&#39;</span><span class="__shiki_140thh">::regclass</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE INDEX idx_data_value_%s ON %s (data_value)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">child_table</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;_&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">child_table</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span></code></pre></div><h2 id="二、声明式分区表" tabindex="-1">二、声明式分区表 <a class="header-anchor" href="#二、声明式分区表" aria-label="Permalink to &quot;二、声明式分区表&quot;">​</a></h2><h3 id="_2-1-分区表基础概念" tabindex="-1">2.1 分区表基础概念 <a class="header-anchor" href="#_2-1-分区表基础概念" aria-label="Permalink to &quot;2.1 分区表基础概念&quot;">​</a></h3><h4 id="_2-1-1-分区类型与创建" tabindex="-1">2.1.1 分区类型与创建 <a class="header-anchor" href="#_2-1-1-分区类型与创建" aria-label="Permalink to &quot;2.1.1 分区类型与创建&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- PostgreSQL支持的分区类型：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 范围分区 (RANGE)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 列表分区 (LIST)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 哈希分区 (HASH)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建范围分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> measurement_range</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    city_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    logdate </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    peaktemp </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    unitsales </span><span class="__shiki_1itgoe">INTEGER</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (logdate);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建列表分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_list</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    region </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    quantity </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sale_date </span><span class="__shiki_1itgoe">DATE</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_140thh"> LIST (region);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建哈希分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> users_hash</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> HASH</span><span class="__shiki_140thh"> (user_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建默认分区（用于存储不符合任何分区条件的数据）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> measurement_default</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF measurement_range </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看分区表信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    partitionkey,</span></span>
<span class="line"><span class="__shiki_140thh">    parttype,</span></span>
<span class="line"><span class="__shiki_140thh">    partstrat,</span></span>
<span class="line"><span class="__shiki_140thh">    partnatts,</span></span>
<span class="line"><span class="__shiki_140thh">    partdefid</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tablename </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;measurement%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看分区信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    nmsp_parent</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> parent_schema,</span></span>
<span class="line"><span class="__shiki_dzsirb">    parent</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> parent_table,</span></span>
<span class="line"><span class="__shiki_dzsirb">    nmsp_child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> child_schema,</span></span>
<span class="line"><span class="__shiki_dzsirb">    child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> child_table,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_get_expr(</span><span class="__shiki_dzsirb">child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relpartbound</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_bound</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_class parent </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> pg_inherits</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> parent</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_class child </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> pg_inherits</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_namespace nmsp_parent </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> nmsp_parent</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> parent</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_namespace nmsp_child </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> nmsp_child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> child</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> parent</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;measurement_range&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> partition_bound;</span></span></code></pre></div><h4 id="_2-1-2-范围分区详解" tabindex="-1">2.1.2 范围分区详解 <a class="header-anchor" href="#_2-1-2-范围分区详解" aria-label="Permalink to &quot;2.1.2 范围分区详解&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建详细的订单表（范围分区）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_range</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    order_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    customer_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    order_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    total_amount </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;pending&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> check_status </span><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">status</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;processing&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;shipped&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;delivered&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;cancelled&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (order_date);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建年度分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2023</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_range</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2023-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2024</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_range</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2025-01-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建月度分区（更细粒度）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2024_01</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_range</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-02-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2024_02</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_range</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-02-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-03-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 注意：分区范围不能重叠，也不能有间隙</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建带索引的分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2024_03</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_range</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-03-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-04-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在分区上创建本地索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_2024_03_customer</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders_2024_03(customer_id);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_2024_03_status</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders_2024_03(</span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> orders_range (customer_id, order_date, total_amount, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;2024-02-15&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">date</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39; days&#39;</span><span class="__shiki_140thh">)::interval,</span></span>
<span class="line"><span class="__shiki_140thh">    random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;pending&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;processing&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;shipped&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;delivered&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;cancelled&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看数据分布</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    tableoid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> row_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(order_date) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> min_date,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(order_date) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> max_date</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders_range</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> tableoid</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> min_date;</span></span></code></pre></div><h3 id="_2-2-列表分区与哈希分区" tabindex="-1">2.2 列表分区与哈希分区 <a class="header-anchor" href="#_2-2-列表分区与哈希分区" aria-label="Permalink to &quot;2.2 列表分区与哈希分区&quot;">​</a></h3><h4 id="_2-2-1-列表分区应用" tabindex="-1">2.2.1 列表分区应用 <a class="header-anchor" href="#_2-2-1-列表分区应用" aria-label="Permalink to &quot;2.2.1 列表分区应用&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建按地区列表分区的销售表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_by_region</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    sale_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    region_code </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_code </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    sale_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    quantity </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    amount </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> valid_region </span><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (region_code </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;US&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;EU&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;AS&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;AF&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;SA&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_140thh"> LIST (region_code);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建地区分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_us</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_by_region</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;US&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_eu</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_by_region</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;DE&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;FR&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;IT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ES&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;UK&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 多个值属于同一个分区</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (fillfactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_asia</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_by_region</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;JP&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;CN&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;KR&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;IN&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">TABLESPACE fast_ssd;  </span><span class="__shiki_21nrsd">-- 指定表空间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_other</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_by_region</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;AU&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;NZ&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;CA&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;MX&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;BR&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 默认分区（捕获所有未指定的地区）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_default</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_by_region </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> sales_by_region (region_code, product_code, sale_date, quantity, amount)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;US&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;DE&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;JP&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;AU&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;CN&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;XX&#39;</span><span class="__shiki_21nrsd">  -- 这个会进入默认分区</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;PROD-&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    CURRENT_DATE </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 365</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证数据分布</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    tableoid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> partition</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    region_code,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> sales_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(amount) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_amount</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> sales_by_region</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> tableoid, region_code</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> partition</span><span class="__shiki_140thh">, region_code;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 动态创建分区函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> create_region_partition</span><span class="__shiki_140thh">(region_code </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        CREATE TABLE IF NOT EXISTS sales_%s PARTITION OF sales_by_region</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FOR VALUES IN (%L)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">lower</span><span class="__shiki_140thh">(region_code), region_code);</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用函数创建新分区</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> create_region_partition(</span><span class="__shiki_mdbnqw">&#39;RU&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_2-2-2-哈希分区详解" tabindex="-1">2.2.2 哈希分区详解 <a class="header-anchor" href="#_2-2-2-哈希分区详解" aria-label="Permalink to &quot;2.2.2 哈希分区详解&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 哈希分区适用于均匀分布数据</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> user_sessions_hash</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    session_id UUID </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_140thh"> gen_random_uuid(),</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    expires_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    session_data JSONB,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> sessions_pk </span><span class="__shiki_1itgoe">PRIMARY KEY</span><span class="__shiki_140thh"> (session_id, user_id)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> HASH</span><span class="__shiki_140thh"> (user_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建哈希分区（使用模数和余数）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建4个哈希分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> user_sessions_hash_0</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF user_sessions_hash</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> WITH</span><span class="__shiki_140thh"> (MODULUS </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, REMAINDER </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> user_sessions_hash_1</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF user_sessions_hash</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> WITH</span><span class="__shiki_140thh"> (MODULUS </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, REMAINDER </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> user_sessions_hash_2</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF user_sessions_hash</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> WITH</span><span class="__shiki_140thh"> (MODULUS </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, REMAINDER </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> user_sessions_hash_3</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF user_sessions_hash</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> WITH</span><span class="__shiki_140thh"> (MODULUS </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, REMAINDER </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> user_sessions_hash (user_id, session_data)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;ip&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;192.168.1.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 255</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;user_agent&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;Chrome&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;Firefox&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;Safari&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;active&#39;</span><span class="__shiki_140thh">, random() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 验证哈希分布均匀性</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> partition_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        tableoid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> row_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> user_id) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> unique_users,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MIN</span><span class="__shiki_140thh">(user_id) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> min_user_id,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(user_id) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> max_user_id</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> user_sessions_hash</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> tableoid</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">    row_count,</span></span>
<span class="line"><span class="__shiki_140thh">    unique_users,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(row_count </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> SUM</span><span class="__shiki_140thh">(row_count) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> percentage</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">AVG</span><span class="__shiki_140thh">(row_count) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_rows,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(row_count </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(row_count) </span><span class="__shiki_1itgoe">OVER</span><span class="__shiki_140thh"> (), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> diff_from_avg</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> partition_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> partition_name;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 哈希分区查询示例</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> user_sessions_hash</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1234</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 优化器知道应该查询哪个分区</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 添加新的哈希分区（需要重新分布数据，比较复杂）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 一般建议在创建表时确定好分区数</span></span></code></pre></div><h3 id="_2-3-多级分区-子分区" tabindex="-1">2.3 多级分区（子分区） <a class="header-anchor" href="#_2-3-多级分区-子分区" aria-label="Permalink to &quot;2.3 多级分区（子分区）&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建多级分区：先按年份范围分区，再按月列表分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_multi_level</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    sale_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sale_year </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sale_month </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    region </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    amount </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> valid_month </span><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (sale_month </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (sale_year);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建年度分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_2024</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_multi_level</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2024</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2025</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_140thh"> LIST (sale_month);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 为2024年创建月度子分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_2024_01</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_2024 </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_2024_02</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_2024 </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_2024_03</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_2024 </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">-- ... 继续创建其他月份</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建2025年分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_2025</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_multi_level</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2025</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2026</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_140thh"> LIST (sale_month);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> sales_multi_level (sale_year, sale_month, region, amount)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> random() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 2024</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_dzsirb"> 2025</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;North&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;South&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;East&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;West&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看多级分区结构</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> partition_tree </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        inhparent::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> parent,</span></span>
<span class="line"><span class="__shiki_140thh">        inhrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> child,</span></span>
<span class="line"><span class="__shiki_dzsirb">        1</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> level</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;sales_multi_level&#39;</span><span class="__shiki_140thh">::regclass</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_140thh">::regclass,</span></span>
<span class="line"><span class="__shiki_dzsirb">        i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">::regclass,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">level</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_inherits i</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> partition_tree pt </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> pt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">child</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    repeat</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;  &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">level</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> child </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_tree,</span></span>
<span class="line"><span class="__shiki_1itgoe">    level</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(child)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> partition_tree</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> parent, child;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 多级分区查询优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    sale_year,</span></span>
<span class="line"><span class="__shiki_140thh">    sale_month,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> sales_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(amount) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_amount</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> sales_multi_level</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> sale_year </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2024</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> sale_month </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> region </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;North&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> sale_year, sale_month</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> sale_month;</span></span></code></pre></div><h2 id="三、分区表管理操作" tabindex="-1">三、分区表管理操作 <a class="header-anchor" href="#三、分区表管理操作" aria-label="Permalink to &quot;三、分区表管理操作&quot;">​</a></h2><h3 id="_3-1-分区维护操作" tabindex="-1">3.1 分区维护操作 <a class="header-anchor" href="#_3-1-分区维护操作" aria-label="Permalink to &quot;3.1 分区维护操作&quot;">​</a></h3><h4 id="_3-1-1-添加与删除分区" tabindex="-1">3.1.1 添加与删除分区 <a class="header-anchor" href="#_3-1-1-添加与删除分区" aria-label="Permalink to &quot;3.1.1 添加与删除分区&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 为现有分区表添加新分区</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 范围分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2024_04</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_range</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-04-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-05-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 列表分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sales_africa</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sales_by_region</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;ZA&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;NG&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;EG&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;KE&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 哈希分区（添加新分区需要重新分布数据，不建议动态添加）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 通常在设计时确定哈希分区数量</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分离分区（将分区从分区表中移除，但保留表和数据）</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_range DETACH </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_140thh"> orders_2024_01;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 现在 orders_2024_01 是一个独立的表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重新附加分区</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_range </span><span class="__shiki_1itgoe">ATTACH</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> orders_2024_01</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-02-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 删除分区（删除表和数据）</span></span>
<span class="line"><span class="__shiki_1itgoe">DROP</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_2024_01;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重命名分区</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_2024_02 RENAME </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> orders_feb_2024;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置分区表空间</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_feb_2024 </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> TABLESPACE archive_tablespace;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区维护函数：自动创建下个月的分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> create_next_month_partition</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    next_month </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    partition_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    start_date</span><span class="__shiki_1itgoe"> DATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    end_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    next_month :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> date_trunc(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, CURRENT_DATE) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 month&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    partition_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;orders_&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> to_char(next_month, </span><span class="__shiki_mdbnqw">&#39;YYYY_MM&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    start_date</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> next_month;</span></span>
<span class="line"><span class="__shiki_140thh">    end_date :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> next_month </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 month&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查分区是否已存在</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_class </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> partition_name </span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> relkind </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE TABLE %I PARTITION OF orders_range</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FOR VALUES FROM (%L) TO (%L)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, partition_name, </span><span class="__shiki_1itgoe">start_date</span><span class="__shiki_140thh">, end_date);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Created partition: %&#39;</span><span class="__shiki_140thh">, partition_name;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ELSE</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;Partition % already exists&#39;</span><span class="__shiki_140thh">, partition_name;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建定期任务（需要pg_cron扩展）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> cron</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;create-monthly-partition&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;0 0 1 * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每月1号执行</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;SELECT create_next_month_partition()&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_3-1-2-分区数据迁移与交换" tabindex="-1">3.1.2 分区数据迁移与交换 <a class="header-anchor" href="#_3-1-2-分区数据迁移与交换" aria-label="Permalink to &quot;3.1.2 分区数据迁移与交换&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建外部表作为交换分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2023_archive</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIKE</span><span class="__shiki_140thh"> orders_range INCLUDING ALL</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 将数据从分区迁移到归档表</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 方法1：使用INSERT...SELECT</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> orders_2023_archive</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders_2023;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 方法2：分离分区然后重命名</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_range DETACH </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_140thh"> orders_2023;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_2023 RENAME </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> orders_2023_archive;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 方法3：使用分区交换（更高效）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 首先创建一个与分区结构相同的表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2024_01_temp</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_140thh"> orders_2024_01 INCLUDING ALL);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 交换分区</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_range</span></span>
<span class="line"><span class="__shiki_140thh">    DETACH </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_140thh"> orders_2024_01;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_2024_01_temp</span></span>
<span class="line"><span class="__shiki_1itgoe">    ATTACH</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> orders_2024_01</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-02-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 现在 orders_2024_01_temp 包含原分区的数据</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 可以对临时表进行操作，然后重新附加</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区数据重分布（哈希分区扩容示例）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 创建新结构的分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> users_hash_new</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIKE</span><span class="__shiki_140thh"> users_hash INCLUDING ALL</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> HASH</span><span class="__shiki_140thh"> (user_id) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (MODULUS </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">, REMAINDER </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建8个新分区</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">..</span><span class="__shiki_dzsirb">7</span><span class="__shiki_1itgoe"> LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE TABLE users_hash_new_%s PARTITION OF users_hash_new</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FOR VALUES WITH (MODULUS 8, REMAINDER %s)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, i, i);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 迁移数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> users_hash_new </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> users_hash;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 重命名表</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> users_hash RENAME </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> users_hash_old;</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> users_hash_new RENAME </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> users_hash;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 删除旧表</span></span>
<span class="line"><span class="__shiki_1itgoe">DROP</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> users_hash_old CASCADE;</span></span></code></pre></div><h3 id="_3-2-分区表约束与索引" tabindex="-1">3.2 分区表约束与索引 <a class="header-anchor" href="#_3-2-分区表约束与索引" aria-label="Permalink to &quot;3.2 分区表约束与索引&quot;">​</a></h3><h4 id="_3-2-1-分区表约束管理" tabindex="-1">3.2.1 分区表约束管理 <a class="header-anchor" href="#_3-2-1-分区表约束管理" aria-label="Permalink to &quot;3.2.1 分区表约束管理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建带约束的分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sensor_data</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    sensor_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    reading_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    value</span><span class="__shiki_1itgoe"> DOUBLE PRECISION</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;normal&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> valid_status </span><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">status</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;normal&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;warning&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;error&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> positive_value </span><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">value</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> sensor_data_pk </span><span class="__shiki_1itgoe">PRIMARY KEY</span><span class="__shiki_140thh"> (sensor_id, reading_time)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (reading_time);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sensor_data_2024_q1</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF sensor_data</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-04-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 约束会自动继承吗？</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 主键约束：分区表的主键约束会自动应用到所有分区</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 检查约束：可以在分区表定义，但需要在每个分区单独验证</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看分区约束</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    conname,</span></span>
<span class="line"><span class="__shiki_140thh">    conrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_140thh">    contype,</span></span>
<span class="line"><span class="__shiki_140thh">    consrc,</span></span>
<span class="line"><span class="__shiki_140thh">    convalidated</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_constraint</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> conrelid </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> oid</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_class </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;sensor_data%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> table_name, contype;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 添加分区级约束</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> sensor_data_2024_q1</span></span>
<span class="line"><span class="__shiki_1itgoe">ADD</span><span class="__shiki_1itgoe"> CONSTRAINT</span><span class="__shiki_140thh"> max_sensor_value </span><span class="__shiki_1itgoe">CHECK</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">value</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 禁用/启用约束</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> sensor_data_2024_q1</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> CONSTRAINT</span><span class="__shiki_140thh"> max_sensor_value </span><span class="__shiki_1itgoe">NOT</span><span class="__shiki_140thh"> VALID;  </span><span class="__shiki_21nrsd">-- 禁用验证</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> sensor_data_2024_q1</span></span>
<span class="line"><span class="__shiki_140thh">VALIDATE </span><span class="__shiki_1itgoe">CONSTRAINT</span><span class="__shiki_140thh"> max_sensor_value;  </span><span class="__shiki_21nrsd">-- 启用验证</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 外键约束与分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sensors</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    sensor_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    sensor_type </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区表可以作为外键的引用表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> sensor_data_with_fk</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIKE</span><span class="__shiki_140thh"> sensor_data INCLUDING ALL,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> fk_sensor_id </span></span>
<span class="line"><span class="__shiki_1itgoe">        FOREIGN KEY</span><span class="__shiki_140thh"> (sensor_id) </span></span>
<span class="line"><span class="__shiki_1itgoe">        REFERENCES</span><span class="__shiki_140thh"> sensors(sensor_id)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (reading_time);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 但是，引用分区表的外键比较复杂</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 通常建议避免在分区表上使用外键</span></span></code></pre></div><h4 id="_3-2-2-分区表索引策略" tabindex="-1">3.2.2 分区表索引策略 <a class="header-anchor" href="#_3-2-2-分区表索引策略" aria-label="Permalink to &quot;3.2.2 分区表索引策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 在分区表上创建索引（会自动传播到所有分区）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_sensor_data_time</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> sensor_data(reading_time);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看所有分区的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    indexdef</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tablename </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;sensor_data%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> tablename, indexname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建分区级局部索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_sensor_data_2024_q1_sensor</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> sensor_data_2024_q1(sensor_id) </span></span>
<span class="line"><span class="__shiki_1itgoe">INCLUDE</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 唯一索引限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 唯一索引必须包含分区键</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> UNIQUE INDEX</span><span class="__shiki_1t8gfj"> idx_unique_sensor_reading</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> sensor_data(sensor_id, reading_time, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 这个会失败，因为缺少分区键</span></span>
<span class="line"><span class="__shiki_21nrsd">-- CREATE UNIQUE INDEX idx_failed_unique ON sensor_data(sensor_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 并行创建索引（PostgreSQL 12+）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> CONCURRENTLY</span><span class="__shiki_140thh"> idx_sensor_data_value </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> sensor_data(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 索引维护</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 重建特定分区的索引</span></span>
<span class="line"><span class="__shiki_140thh">REINDEX </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> sensor_data_2024_q1;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 并行重建所有分区索引</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_1itgoe">    partition</span><span class="__shiki_140thh"> RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_1itgoe"> partition</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> inhrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;sensor_data&#39;</span><span class="__shiki_140thh">::regclass</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;REINDEX INDEX CONCURRENTLY %s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">partition</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控索引使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tablename </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;sensor_data%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建部分索引（在分区上）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_sensor_warnings</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> sensor_data_2024_q1(reading_time) </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;warning&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="四、分区表查询优化" tabindex="-1">四、分区表查询优化 <a class="header-anchor" href="#四、分区表查询优化" aria-label="Permalink to &quot;四、分区表查询优化&quot;">​</a></h2><h3 id="_4-1-分区剪枝-partition-pruning" tabindex="-1">4.1 分区剪枝（Partition Pruning） <a class="header-anchor" href="#_4-1-分区剪枝-partition-pruning" aria-label="Permalink to &quot;4.1 分区剪枝（Partition Pruning）&quot;">​</a></h3><h4 id="_4-1-1-剪枝原理与优化" tabindex="-1">4.1.1 剪枝原理与优化 <a class="header-anchor" href="#_4-1-1-剪枝原理与优化" aria-label="Permalink to &quot;4.1.1 剪枝原理与优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建测试分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> log_entries</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    log_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    log_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    log_level </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    message</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    application</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (log_time);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> logs_2024_q1</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF log_entries</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-04-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> logs_2024_q2</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF log_entries</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-04-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-07-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> logs_2024_q3</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF log_entries</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-07-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-10-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> logs_2024_q4</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF log_entries</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-10-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2025-01-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> log_entries (log_time, log_level, </span><span class="__shiki_1itgoe">message</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">application</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;2024-01-01&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 365</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39; seconds&#39;</span><span class="__shiki_140thh">)::interval,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;DEBUG&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;INFO&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;WARN&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;ERROR&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;Log message &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> generate_series,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;web-app&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;backend&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;database&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分析查询计划</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用分区剪枝</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_partition_pruning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看剪枝效果</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> log_entries</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> log_time </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-03-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-03-31&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 只扫描Q1分区，其他分区被剪枝</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 复杂查询的剪枝</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    log_level,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(log_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> earliest,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(log_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> latest</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> log_entries</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> log_time </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-06-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> log_time </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2024-09-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_1itgoe"> application</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;web-app&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> log_level </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;ERROR&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;WARN&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> log_level</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看哪些分区被访问</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    tableoid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_scanned,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> rows_returned</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> log_entries</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> log_time </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-06-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> log_time </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2024-09-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> tableoid;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 参数化查询的剪枝</span></span>
<span class="line"><span class="__shiki_140thh">PREPARE get_logs_by_date_range(</span><span class="__shiki_1itgoe">date</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">date</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> log_entries</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> log_time </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_140thh"> $</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> $</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE) </span><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_140thh"> get_logs_by_date_range(</span><span class="__shiki_mdbnqw">&#39;2024-01-15&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;2024-01-31&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 禁用分区剪枝进行对比</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_partition_pruning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE) </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> log_entries </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> log_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> &#39;2024-10-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_partition_pruning </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_4-1-2-剪枝优化技巧" tabindex="-1">4.1.2 剪枝优化技巧 <a class="header-anchor" href="#_4-1-2-剪枝优化技巧" aria-label="Permalink to &quot;4.1.2 剪枝优化技巧&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建包含子查询的剪枝优化示例</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> events</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    event_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_type </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    details JSONB</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (event_date);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建分区</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_1itgoe">    start_date</span><span class="__shiki_1itgoe"> DATE</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    i </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">..</span><span class="__shiki_dzsirb">11</span><span class="__shiki_1itgoe"> LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE TABLE events_%s PARTITION OF events</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FOR VALUES FROM (%L) TO (%L)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            to_char(</span><span class="__shiki_1itgoe">start_date</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; months&#39;</span><span class="__shiki_140thh">)::interval, </span><span class="__shiki_mdbnqw">&#39;YYYY_MM&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">            start_date</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; months&#39;</span><span class="__shiki_140thh">)::interval,</span></span>
<span class="line"><span class="__shiki_1itgoe">            start_date</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> ((i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; months&#39;</span><span class="__shiki_140thh">)::interval</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 填充测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> events (event_date, event_type, user_id, details)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;2024-01-01&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">date</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 365</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;login&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;purchase&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;view&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;search&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;logout&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    jsonb_build_object(</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">, random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">500000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化技巧1：使用分区键作为查询条件</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 好的查询（使用分区键）</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2024-06-15&#39;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 精确匹配分区键</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化技巧2：避免在分区键上使用函数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 不好的查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> EXTRACT(</span><span class="__shiki_1itgoe">MONTH</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> event_date) </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 无法剪枝</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 好的查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-06-01&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2024-07-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化技巧3：使用IN子句进行剪枝</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-03-15&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;2024-06-20&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;2024-09-10&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化技巧4：结合其他条件</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_events_user</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> events(user_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-05-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-05-31&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1234</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看分区剪枝统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%partition%prun%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- enable_partition_pruning (默认on)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- enable_partitionwise_aggregate (默认off)</span></span>
<span class="line"><span class="__shiki_21nrsd">-- enable_partitionwise_join (默认off)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用分区智能聚合</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_partitionwise_aggregate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    event_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> event_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">((details</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> events</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_date </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-06-30&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> event_type</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> event_count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_4-2-分区表连接优化" tabindex="-1">4.2 分区表连接优化 <a class="header-anchor" href="#_4-2-分区表连接优化" aria-label="Permalink to &quot;4.2 分区表连接优化&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建关联的分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_partitioned</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    order_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    customer_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    order_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    total_amount </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (order_date);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> order_items_partitioned</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    item_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    order_id </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    quantity </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">    CONSTRAINT</span><span class="__shiki_140thh"> fk_order </span><span class="__shiki_1itgoe">FOREIGN KEY</span><span class="__shiki_140thh"> (order_id) </span><span class="__shiki_1itgoe">REFERENCES</span><span class="__shiki_140thh"> orders_partitioned(order_id)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (order_date);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建对应的分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> orders_2024</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF orders_partitioned</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2025-01-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> order_items_2024</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF order_items_partitioned</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2025-01-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 填充测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> orders_partitioned (customer_id, order_date, total_amount, </span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;2024-01-01&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">date</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 365</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;pending&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;processing&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;shipped&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;delivered&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> order_items_partitioned (order_id, product_id, quantity, price)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders_partitioned o</span></span>
<span class="line"><span class="__shiki_1itgoe">CROSS JOIN</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 每个订单3个商品</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 30000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区智能连接（Partitionwise Join）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用分区智能连接</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_partitionwise_join </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看连接优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">quantity</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">price</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> calculated_total,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">item_id</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> item_count</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders_partitioned o</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> order_items_partitioned i </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-06-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-06-30&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_dzsirb"> ABS</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">quantity</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">price</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">01</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 对比禁用分区智能连接</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_partitionwise_join </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> ... (同上查询);</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_partitionwise_join </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 跨分区连接优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建索引支持连接</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_orders_customer_date</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> orders_partitioned(customer_id, order_date);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_order_items_order</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> order_items_partitioned(order_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 复杂连接查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> order_month,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> unique_customers,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_orders,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> revenue,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">quantity</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_quantity_per_item</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> orders_partitioned o</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> order_items_partitioned i </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-12-31&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;delivered&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> order_month;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区表与非分区表连接</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> customers</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    customer_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    customer_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    customer_since </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    customer_tier </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> customers (customer_name, customer_since, customer_tier)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;Customer &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> generate_series,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;2020-01-01&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">date</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1460</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;basic&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;premium&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;vip&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 混合连接</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_tier</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;quarter&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> quarter</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> orders_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_spent,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_order_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> customers c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> orders_partitioned o </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-12-31&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_tier</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;premium&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_tier</span><span class="__shiki_140thh">, DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;quarter&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> quarter</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="五、分区表监控与维护" tabindex="-1">五、分区表监控与维护 <a class="header-anchor" href="#五、分区表监控与维护" aria-label="Permalink to &quot;五、分区表监控与维护&quot;">​</a></h2><h3 id="_5-1-分区表监控" tabindex="-1">5.1 分区表监控 <a class="header-anchor" href="#_5-1-分区表监控" aria-label="Permalink to &quot;5.1 分区表监控&quot;">​</a></h3><h4 id="_5-1-1-系统视图监控" tabindex="-1">5.1.1 系统视图监控 <a class="header-anchor" href="#_5-1-1-系统视图监控" aria-label="Permalink to &quot;5.1.1 系统视图监控&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看所有分区表信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    partitionkey,</span></span>
<span class="line"><span class="__shiki_140thh">    parttype,</span></span>
<span class="line"><span class="__shiki_140thh">    partstrat,</span></span>
<span class="line"><span class="__shiki_140thh">    partnatts,</span></span>
<span class="line"><span class="__shiki_140thh">    partdefid</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> schemaname, tablename;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看分区表的大小和统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> partition_sizes </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        inhparent::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">        inhrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_total_relation_size(inhrelid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_relation_size(inhrelid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">        pg_total_relation_size(inhrelid) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> pg_relation_size(inhrelid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> n_live_tup </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> inhrelid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> live_tuples,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> inhrelid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> dead_tuples</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">    partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(total_size) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(table_size) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(index_size) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_140thh">    live_tuples,</span></span>
<span class="line"><span class="__shiki_140thh">    dead_tuples,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> live_tuples </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(dead_tuples::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> (live_tuples </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> dead_tuples), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> dead_percentage</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> partition_sizes</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> parent_table, partition_name;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控分区表使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    relname </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
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
<span class="line"><span class="__shiki_140thh">    last_vacuum,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autovacuum,</span></span>
<span class="line"><span class="__shiki_140thh">    last_analyze,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autoanalyze</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%partition%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">       SELECT</span><span class="__shiki_140thh"> inhrelid::regclass::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_1itgoe">       FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">       WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">           SELECT</span><span class="__shiki_1itgoe"> oid</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_class </span></span>
<span class="line"><span class="__shiki_1itgoe">           WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%partition%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">       )</span></span>
<span class="line"><span class="__shiki_140thh">   )</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> n_dead_tup </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区表索引使用统计</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> tablename </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> inhrelid::regclass::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;orders_partitioned&#39;</span><span class="__shiki_140thh">::regclass</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_5-1-2-自定义监控函数" tabindex="-1">5.1.2 自定义监控函数 <a class="header-anchor" href="#_5-1-2-自定义监控函数" aria-label="Permalink to &quot;5.1.2 自定义监控函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建分区表健康检查函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> check_partition_health</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_parent_table regclass </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> NULL</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    parent_table regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    partition_name regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    partition_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    total_size </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table_size </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    index_size </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    live_tuples </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    dead_tuples </span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    dead_percentage </span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autovacuum </span><span class="__shiki_1itgoe">timestamptz</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autoanalyze </span><span class="__shiki_1itgoe">timestamptz</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    needs_vacuum </span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    needs_analyze </span><span class="__shiki_1itgoe">boolean</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> partition_info </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partstrat</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;RANGE&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partstrat</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;l&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;LIST&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partstrat</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;h&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;HASH&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_mdbnqw"> &#39;UNKNOWN&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> part_type,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_total_relation_size(</span><span class="__shiki_dzsirb">i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_relation_size(</span><span class="__shiki_dzsirb">i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> table_size,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_total_relation_size(</span><span class="__shiki_dzsirb">i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">            COALESCE</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">st</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">n_live_tup</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> live_tuples,</span></span>
<span class="line"><span class="__shiki_dzsirb">            COALESCE</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">st</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">n_dead_tup</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> dead_tuples,</span></span>
<span class="line"><span class="__shiki_dzsirb">            st</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_autovacuum</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            st</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_autoanalyze</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits i</span></span>
<span class="line"><span class="__shiki_1itgoe">        LEFT JOIN</span><span class="__shiki_140thh"> pg_partitioned_table p </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">        LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_user_tables st </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> st</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relid</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> p_parent_table </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> p_parent_table</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_140thh">::regclass,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">::regclass,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">part_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_size</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">live_tuples</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_tuples</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">live_tuples</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_tuples</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_tuples</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">live_tuples</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_tuples</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_autovacuum</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_autoanalyze</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 需要VACUUM的条件：死元组比例超过20%且超过1万条</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_tuples</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">         pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_tuples</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> GREATEST</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">live_tuples</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_tuples</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">OR</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_autovacuum</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">live_tuples</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dead_tuples</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 需要ANALYZE的条件：超过7天未分析</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_autoanalyze</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_autoanalyze</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> partition_info pi</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用健康检查函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">    partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">    partition_type,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(total_size) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_size,</span></span>
<span class="line"><span class="__shiki_140thh">    live_tuples,</span></span>
<span class="line"><span class="__shiki_140thh">    dead_tuples,</span></span>
<span class="line"><span class="__shiki_140thh">    dead_percentage,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autovacuum,</span></span>
<span class="line"><span class="__shiki_140thh">    last_autoanalyze,</span></span>
<span class="line"><span class="__shiki_140thh">    needs_vacuum,</span></span>
<span class="line"><span class="__shiki_140thh">    needs_analyze</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> check_partition_health(</span><span class="__shiki_mdbnqw">&#39;orders_partitioned&#39;</span><span class="__shiki_140thh">::regclass)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> needs_vacuum </span><span class="__shiki_1itgoe">OR</span><span class="__shiki_140thh"> needs_analyze;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动维护建议生成</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> generate_partition_maintenance_sql</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    priority integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    recommendation </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查需要VACUUM的分区</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        1</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> priority,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;需要VACUUM的分区&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> recommendation,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;VACUUM ANALYZE %s;&#39;</span><span class="__shiki_140thh">, partition_name) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> sql_command</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> check_partition_health()</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> needs_vacuum</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> dead_percentage </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查需要ANALYZE的分区</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        2</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> priority,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;需要ANALYZE的分区&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> recommendation,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ANALYZE %s;&#39;</span><span class="__shiki_140thh">, partition_name) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> sql_command</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> check_partition_health()</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> needs_analyze </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> needs_vacuum</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> last_autoanalyze </span><span class="__shiki_1itgoe">NULLS</span><span class="__shiki_1itgoe"> FIRST</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查大分区</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        3</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> priority,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;大型分区&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> recommendation,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;-- 分区 %s 大小: %s&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">               partition_name, </span></span>
<span class="line"><span class="__shiki_140thh">               pg_size_pretty(total_size)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> sql_command</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> check_partition_health()</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> total_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd">  -- 大于1GB</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> total_size </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 生成维护脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> generate_partition_maintenance_sql()</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> priority, recommendation;</span></span></code></pre></div><h3 id="_5-2-分区表维护策略" tabindex="-1">5.2 分区表维护策略 <a class="header-anchor" href="#_5-2-分区表维护策略" aria-label="Permalink to &quot;5.2 分区表维护策略&quot;">​</a></h3><h4 id="_5-2-1-自动分区管理" tabindex="-1">5.2.1 自动分区管理 <a class="header-anchor" href="#_5-2-1-自动分区管理" aria-label="Permalink to &quot;5.2.1 自动分区管理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建自动分区管理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> auto_manage_partitions</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_parent_table regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    p_retention_months </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_archive_schema </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;archive&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    partition</span><span class="__shiki_140thh"> regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    details </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sql_executed </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    partition_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    old_partition_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    new_partition_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    partition_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    start_date</span><span class="__shiki_1itgoe"> DATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    end_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建归档模式（如果不存在）</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;CREATE SCHEMA IF NOT EXISTS %I&#39;</span><span class="__shiki_140thh">, p_archive_schema);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 归档旧分区</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> partition_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_get_expr(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relpartbound</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_bound</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits i</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_class c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> p_parent_table</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relpartbound</span><span class="__shiki_1itgoe"> IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 解析分区边界（简化示例，实际需要更复杂的解析）</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这里假设是范围分区，格式为：FOR VALUES FROM (&#39;YYYY-MM-DD&#39;) TO (&#39;YYYY-MM-DD&#39;)</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_dzsirb"> partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_bound</span><span class="__shiki_140thh"> ~ </span><span class="__shiki_mdbnqw">&#39;FROM \\(&#39;&#39;([0-9-]+)&#39;&#39;\\) TO \\(&#39;&#39;([0-9-]+)&#39;&#39;\\)&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">            start_date</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> substring</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_bound</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                FROM</span><span class="__shiki_mdbnqw"> &#39;FROM \\(&#39;&#39;([0-9-]+)&#39;&#39;\\)&#39;</span><span class="__shiki_140thh">)[1]::</span><span class="__shiki_1itgoe">date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            IF</span><span class="__shiki_1itgoe"> start_date</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh"> CURRENT_DATE </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> (p_retention_months </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; months&#39;</span><span class="__shiki_140thh">)::interval </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 分离分区</span></span>
<span class="line"><span class="__shiki_1itgoe">                EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ALTER TABLE %s DETACH PARTITION %s&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    p_parent_table, </span><span class="__shiki_dzsirb">partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 移动到归档模式</span></span>
<span class="line"><span class="__shiki_1itgoe">                EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ALTER TABLE %s SET SCHEMA %I&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">, p_archive_schema);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 记录操作</span></span>
<span class="line"><span class="__shiki_1itgoe">                action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;ARCHIVED&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                partition</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Moved to %s schema&#39;</span><span class="__shiki_140thh">, p_archive_schema);</span></span>
<span class="line"><span class="__shiki_140thh">                sql_executed :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ALTER TABLE %s DETACH PARTITION %s; &#39;</span><span class="__shiki_1itgoe"> ||</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;ALTER TABLE %s SET SCHEMA %I;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    p_parent_table, </span><span class="__shiki_dzsirb">partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">, p_archive_schema);</span></span>
<span class="line"><span class="__shiki_1itgoe">                RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建未来分区（提前创建3个月的分区）</span></span>
<span class="line"><span class="__shiki_140thh">    new_partition_date :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> date_trunc(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, CURRENT_DATE);</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">..</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> LOOP</span></span>
<span class="line"><span class="__shiki_140thh">        partition_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;%s_%s&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            to_char(new_partition_date </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; months&#39;</span><span class="__shiki_140thh">)::interval, </span><span class="__shiki_mdbnqw">&#39;YYYY_MM&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        start_date</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> new_partition_date </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; months&#39;</span><span class="__shiki_140thh">)::interval;</span></span>
<span class="line"><span class="__shiki_140thh">        end_date :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> new_partition_date </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> ((i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; months&#39;</span><span class="__shiki_140thh">)::interval;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 检查分区是否已存在</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_class </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> split_part(partition_name, </span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            AND</span><span class="__shiki_140thh"> relnamespace </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> oid</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_namespace </span></span>
<span class="line"><span class="__shiki_1itgoe">                               WHERE</span><span class="__shiki_140thh"> nspname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> split_part(partition_name, </span><span class="__shiki_mdbnqw">&#39;.&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 创建新分区</span></span>
<span class="line"><span class="__shiki_1itgoe">            EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                CREATE TABLE %s PARTITION OF %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">                FOR VALUES FROM (%L) TO (%L)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;</span><span class="__shiki_140thh">, partition_name, p_parent_table, </span><span class="__shiki_1itgoe">start_date</span><span class="__shiki_140thh">, end_date);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 记录操作</span></span>
<span class="line"><span class="__shiki_1itgoe">            action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;CREATED&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            partition</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> partition_name::regclass;</span></span>
<span class="line"><span class="__shiki_140thh">            details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;For period %s to %s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">start_date</span><span class="__shiki_140thh">, end_date);</span></span>
<span class="line"><span class="__shiki_140thh">            sql_executed :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;CREATE TABLE %s PARTITION OF %s &#39;</span><span class="__shiki_1itgoe"> ||</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;FOR VALUES FROM (%L) TO (%L);&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                partition_name, p_parent_table, </span><span class="__shiki_1itgoe">start_date</span><span class="__shiki_140thh">, end_date);</span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 更新统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ANALYZE %s&#39;</span><span class="__shiki_140thh">, p_parent_table);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;ANALYZED&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    partition</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_parent_table;</span></span>
<span class="line"><span class="__shiki_140thh">    details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Updated statistics&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    sql_executed :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ANALYZE %s;&#39;</span><span class="__shiki_140thh">, p_parent_table);</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用自动分区管理</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> auto_manage_partitions(</span><span class="__shiki_mdbnqw">&#39;orders_partitioned&#39;</span><span class="__shiki_140thh">::regclass, </span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;archive&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建定期维护任务</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> cron</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">schedule</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;partition-maintenance-daily&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;0 2 * * *&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每天凌晨2点执行</span></span>
<span class="line"><span class="__shiki_140thh">    $$</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> auto_manage_partitions(</span><span class="__shiki_mdbnqw">&#39;orders_partitioned&#39;</span><span class="__shiki_140thh">::regclass);</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> auto_manage_partitions(</span><span class="__shiki_mdbnqw">&#39;log_entries&#39;</span><span class="__shiki_140thh">::regclass);</span></span>
<span class="line"><span class="__shiki_140thh">    $$</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_5-2-2-性能优化维护" tabindex="-1">5.2.2 性能优化维护 <a class="header-anchor" href="#_5-2-2-性能优化维护" aria-label="Permalink to &quot;5.2.2 性能优化维护&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 分区表索引优化函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> optimize_partition_indexes</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_parent_table regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    p_reindex_threshold_gb </span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    partition</span><span class="__shiki_140thh"> regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    index_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    index_size_gb </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    index_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 查找需要重建的大索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> index_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_name,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_relation_size(</span><span class="__shiki_dzsirb">ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size_gb,</span></span>
<span class="line"><span class="__shiki_dzsirb">            psi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idx_scan</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits pi</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_index xi </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> xi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_class ci </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> xi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_user_indexes psi </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> psi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> p_parent_table</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;i&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> p_reindex_threshold_gb </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 重建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;REINDEX&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        partition</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        index_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        index_size_gb :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_size_gb</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        sql_command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;REINDEX INDEX CONCURRENTLY %s;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 执行重建（注释掉实际执行，只返回建议）</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- EXECUTE sql_command;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 查找未使用的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> index_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_name,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_relation_size(</span><span class="__shiki_dzsirb">ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> index_size_gb</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits pi</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_index xi </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> xi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_class ci </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> xi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        LEFT JOIN</span><span class="__shiki_140thh"> pg_stat_user_indexes psi </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> psi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> pi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> p_parent_table</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;i&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">psi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idx_scan</span><span class="__shiki_1itgoe"> IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_dzsirb"> psi</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idx_scan</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd">  -- 大于100MB</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">ci</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">indexrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 建议删除未使用的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;DROP INDEX&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        partition</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        index_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        index_size_gb :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_size_gb</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        sql_command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;DROP INDEX CONCURRENTLY %s;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用索引优化函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> optimize_partition_indexes(</span><span class="__shiki_mdbnqw">&#39;orders_partitioned&#39;</span><span class="__shiki_140thh">::regclass, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区数据均衡函数（适用于哈希分区）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> rebalance_hash_partitions</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_parent_table regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    p_new_modulus </span><span class="__shiki_1itgoe">integer</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    step </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    details </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    old_modulus </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    i </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取当前模数</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> partnatts </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> old_modulus</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> partrelid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_parent_table;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    step :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;CHECK&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Current modulus: %s, New modulus: %s&#39;</span><span class="__shiki_140thh">, old_modulus, p_new_modulus);</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建新分区表</span></span>
<span class="line"><span class="__shiki_140thh">    step :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;CREATE NEW TABLE&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Creating new partitioned table with desired modulus&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        CREATE TABLE %s_new (LIKE %s INCLUDING ALL)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        PARTITION BY HASH (%s)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">       (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> attname </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_attribute </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> attrelid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_parent_table </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> attnum </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">));  </span><span class="__shiki_21nrsd">-- 假设第一个列是分区键</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建新分区</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">..(p_new_modulus </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_140thh">        step :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;CREATE PARTITION&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Creating partition for remainder %s&#39;</span><span class="__shiki_140thh">, i);</span></span>
<span class="line"><span class="__shiki_140thh">        sql_command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE TABLE %s_new_%s PARTITION OF %s_new</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FOR VALUES WITH (MODULUS %s, REMAINDER %s)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, i, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;_new&#39;</span><span class="__shiki_140thh">, p_new_modulus, i);</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 迁移数据</span></span>
<span class="line"><span class="__shiki_140thh">    step :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;MIGRATE DATA&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Migrating data from old to new table&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;INSERT INTO %s_new SELECT * FROM %s&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 交换表名</span></span>
<span class="line"><span class="__shiki_140thh">    step :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;SWAP TABLES&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Swapping old and new tables&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ALTER TABLE %s RENAME TO %s_old;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ALTER TABLE %s_new RENAME TO %s;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">       p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 清理旧表</span></span>
<span class="line"><span class="__shiki_140thh">    step :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;CLEANUP&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    details :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Dropping old table&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    sql_command :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;DROP TABLE %s_old CASCADE;&#39;</span><span class="__shiki_140thh">, p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 生成重新平衡计划</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> rebalance_hash_partitions(</span><span class="__shiki_mdbnqw">&#39;users_hash&#39;</span><span class="__shiki_140thh">::regclass, </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="六、最佳实践与高级技巧" tabindex="-1">六、最佳实践与高级技巧 <a class="header-anchor" href="#六、最佳实践与高级技巧" aria-label="Permalink to &quot;六、最佳实践与高级技巧&quot;">​</a></h2><h3 id="_6-1-分区设计最佳实践" tabindex="-1">6.1 分区设计最佳实践 <a class="header-anchor" href="#_6-1-分区设计最佳实践" aria-label="Permalink to &quot;6.1 分区设计最佳实践&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 选择合适的分区键</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">分区键选择原则：</span></span>
<span class="line"><span class="__shiki_21nrsd">- 经常出现在WHERE子句中</span></span>
<span class="line"><span class="__shiki_21nrsd">- 数据分布均匀</span></span>
<span class="line"><span class="__shiki_21nrsd">- 不会频繁更新</span></span>
<span class="line"><span class="__shiki_21nrsd">- 支持范围查询（对于范围分区）</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 确定分区粒度</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">分区数量建议：</span></span>
<span class="line"><span class="__shiki_21nrsd">- 避免过多分区（通常&lt;1000）</span></span>
<span class="line"><span class="__shiki_21nrsd">- 每个分区大小建议在1-10GB</span></span>
<span class="line"><span class="__shiki_21nrsd">- 考虑维护操作的性能</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 分区命名规范</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用一致的命名约定</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">命名模式：{表名}_{分区键值}</span></span>
<span class="line"><span class="__shiki_21nrsd">示例：</span></span>
<span class="line"><span class="__shiki_21nrsd">- orders_2024_01</span></span>
<span class="line"><span class="__shiki_21nrsd">- sales_us_east</span></span>
<span class="line"><span class="__shiki_21nrsd">- users_hash_0</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 索引策略</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在分区键上创建索引（自动）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 根据查询模式创建局部索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 维护计划</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 提前创建未来分区</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期归档旧分区</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控分区大小和性能</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区表设计检查清单</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> check_partition_design</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_table_name regclass</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    checklist_item </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    details </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    recommendation </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查分区数量</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;分区数量&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> checklist_item,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> partition_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> partition_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;注意&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;良好&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;当前分区数: %s&#39;</span><span class="__shiki_140thh">, partition_count) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> details,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> partition_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;考虑合并分区或使用子分区&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> partition_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;监控查询计划性能&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;分区数量合理&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> recommendation</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_count</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_table_name</span></span>
<span class="line"><span class="__shiki_140thh">    ) pc;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查分区大小均匀性</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> partition_sizes </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            inhrelid,</span></span>
<span class="line"><span class="__shiki_140thh">            pg_relation_size(inhrelid) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> size</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_table_name</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;分区大小均匀性&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> checklist_item,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> max_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> avg_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> max_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> avg_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;注意&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;良好&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;最大分区: %s, 平均分区: %s, 差异倍数: %s&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">               pg_size_pretty(max_size),</span></span>
<span class="line"><span class="__shiki_140thh">               pg_size_pretty(avg_size::</span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">               ROUND</span><span class="__shiki_140thh">(max_size::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(avg_size, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> details,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> max_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> avg_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;考虑重新设计分区键或重新分布数据&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> max_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> avg_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;监控大分区的性能&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;分区大小分布均匀&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> recommendation</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">size</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> max_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">            AVG</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">size</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> avg_size</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> partition_sizes</span></span>
<span class="line"><span class="__shiki_140thh">    ) ps;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查索引使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;索引效率&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> checklist_item,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> unused_index_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> total_index_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> unused_index_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> total_index_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;注意&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;良好&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;未使用索引大小: %s, 总索引大小: %s, 未使用比例: %s%%&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">               pg_size_pretty(unused_index_size),</span></span>
<span class="line"><span class="__shiki_140thh">               pg_size_pretty(total_index_size),</span></span>
<span class="line"><span class="__shiki_dzsirb">               ROUND</span><span class="__shiki_140thh">(unused_index_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(total_index_size, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> details,</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> unused_index_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> total_index_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;考虑删除或重新设计未使用索引&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> unused_index_size </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> total_index_size </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;评估索引必要性&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;索引使用效率良好&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> recommendation</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_140thh"> pg_relation_size(indexrelid) </span><span class="__shiki_1itgoe">ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> unused_index_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">            SUM</span><span class="__shiki_140thh">(pg_relation_size(indexrelid)) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> total_index_size</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> tablename </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> inhrelid::regclass::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_table_name</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    ) isz;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 运行设计检查</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> check_partition_design(</span><span class="__shiki_mdbnqw">&#39;orders_partitioned&#39;</span><span class="__shiki_140thh">::regclass);</span></span></code></pre></div><h3 id="_6-2-高级分区技巧" tabindex="-1">6.2 高级分区技巧 <a class="header-anchor" href="#_6-2-高级分区技巧" aria-label="Permalink to &quot;6.2 高级分区技巧&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 动态SQL生成分区管理</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> dynamic_partition_management(</span></span>
<span class="line"><span class="__shiki_140thh">    p_action </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- &#39;CREATE&#39;, &#39;DROP&#39;, &#39;DETACH&#39;, &#39;ATTACH&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    p_parent_table REGCLASS,</span></span>
<span class="line"><span class="__shiki_140thh">    p_partition_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_partition_values JSONB </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> NULL</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_sql </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_partition_key </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_partition_strategy </span><span class="__shiki_1itgoe">CHAR</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_partition_expr </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取分区策略和键</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> partstrat, partexprs::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> v_partition_strategy, v_partition_expr</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> partrelid </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_parent_table;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 根据策略生成SQL</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> p_action</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;CREATE&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">            IF</span><span class="__shiki_140thh"> v_partition_strategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 范围分区</span></span>
<span class="line"><span class="__shiki_140thh">                v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    CREATE TABLE %s PARTITION OF %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    FOR VALUES FROM (%L) TO (%L)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;</span><span class="__shiki_140thh">, p_partition_name, p_parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">                   p_partition_values</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;from&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                   p_partition_values</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;to&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            ELSIF v_partition_strategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;l&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 列表分区</span></span>
<span class="line"><span class="__shiki_140thh">                v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    CREATE TABLE %s PARTITION OF %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    FOR VALUES IN (%s)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;</span><span class="__shiki_140thh">, p_partition_name, p_parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">                   (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> string_agg</span><span class="__shiki_140thh">(quote_literal(</span><span class="__shiki_1itgoe">value</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    FROM</span><span class="__shiki_140thh"> jsonb_array_elements_text(p_partition_values</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;values&#39;</span><span class="__shiki_140thh">)));</span></span>
<span class="line"><span class="__shiki_140thh">            ELSIF v_partition_strategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;h&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 哈希分区</span></span>
<span class="line"><span class="__shiki_140thh">                v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    CREATE TABLE %s PARTITION OF %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    FOR VALUES WITH (MODULUS %s, REMAINDER %s)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;</span><span class="__shiki_140thh">, p_partition_name, p_parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">                   p_partition_values</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;modulus&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                   p_partition_values</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;remainder&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;DROP&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;DROP TABLE %s&#39;</span><span class="__shiki_140thh">, p_partition_name);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;DETACH&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ALTER TABLE %s DETACH PARTITION %s&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                p_parent_table, p_partition_name);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;ATTACH&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">            IF</span><span class="__shiki_140thh"> v_partition_strategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;r&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">                v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ALTER TABLE %s ATTACH PARTITION %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    FOR VALUES FROM (%L) TO (%L)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;</span><span class="__shiki_140thh">, p_parent_table, p_partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">                   p_partition_values</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;from&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                   p_partition_values</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;to&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span></span>
<span class="line"><span class="__shiki_140thh">            RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;未知操作: %&#39;</span><span class="__shiki_140thh">, p_action;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 执行SQL</span></span>
<span class="line"><span class="__shiki_140thh">    RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;执行SQL: %&#39;</span><span class="__shiki_140thh">, v_sql;</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- EXECUTE v_sql;  -- 取消注释以实际执行</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> partition_audit_log (</span></span>
<span class="line"><span class="__shiki_140thh">        action_time,</span></span>
<span class="line"><span class="__shiki_140thh">        action_type,</span></span>
<span class="line"><span class="__shiki_140thh">        parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">        partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">        sql_executed</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        p_action,</span></span>
<span class="line"><span class="__shiki_140thh">        p_parent_table,</span></span>
<span class="line"><span class="__shiki_140thh">        p_partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">        v_sql</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 分区表数据生命周期管理</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> data_lifecycle_rules</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    rule_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table_name REGCLASS </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    retention_period INTERVAL </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    action_on_expiry </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> CHECK</span><span class="__shiki_140thh"> (action_on_expiry </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;ARCHIVE&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;DELETE&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;COMPRESS&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    archive_location </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    enabled</span><span class="__shiki_1itgoe"> BOOLEAN</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> true,</span></span>
<span class="line"><span class="__shiki_140thh">    last_executed </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 生命周期管理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> execute_lifecycle_management()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    rule_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    partition_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    v_sql </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> rule_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> data_lifecycle_rules </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_1itgoe"> enabled</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 查找过期的分区</span></span>
<span class="line"><span class="__shiki_1itgoe">        FOR</span><span class="__shiki_140thh"> partition_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_140thh">::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name,</span></span>
<span class="line"><span class="__shiki_140thh">                pg_get_expr(</span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relpartbound</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_bound</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> pg_inherits i</span></span>
<span class="line"><span class="__shiki_1itgoe">            JOIN</span><span class="__shiki_140thh"> pg_class c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> i</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">inhparent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> rule_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_name</span></span>
<span class="line"><span class="__shiki_1itgoe">            AND</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relpartbound</span><span class="__shiki_1itgoe"> IS NOT NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">        LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 解析分区边界获取日期（简化示例）</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 实际实现需要根据分区策略解析</span></span>
<span class="line"><span class="__shiki_1itgoe">            IF</span><span class="__shiki_dzsirb"> partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_bound</span><span class="__shiki_140thh"> ~ </span><span class="__shiki_mdbnqw">&#39;FROM \\(&#39;&#39;([0-9-]+)&#39;&#39;\\)&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">                    v_partition_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">                    v_partition_date :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> substring</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_bound</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                        FROM</span><span class="__shiki_mdbnqw"> &#39;FROM \\(&#39;&#39;([0-9-]+)&#39;&#39;\\)&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    )[1]::</span><span class="__shiki_1itgoe">date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 检查是否过期</span></span>
<span class="line"><span class="__shiki_1itgoe">                    IF</span><span class="__shiki_140thh"> v_partition_date </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> CURRENT_DATE </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> rule_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">retention_period</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                        CASE</span><span class="__shiki_dzsirb"> rule_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">action_on_expiry</span></span>
<span class="line"><span class="__shiki_1itgoe">                            WHEN</span><span class="__shiki_mdbnqw"> &#39;ARCHIVE&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">                                -- 归档分区</span></span>
<span class="line"><span class="__shiki_1itgoe">                                CALL</span><span class="__shiki_140thh"> dynamic_partition_management(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    &#39;DETACH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                    rule_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                    partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">                                );</span></span>
<span class="line"><span class="__shiki_140thh">                                </span></span>
<span class="line"><span class="__shiki_21nrsd">                                -- 移动到归档位置</span></span>
<span class="line"><span class="__shiki_140thh">                                v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    ALTER TABLE %s SET TABLESPACE %I</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">rule_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">archive_location</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">                                EXECUTE</span><span class="__shiki_140thh"> v_sql;</span></span>
<span class="line"><span class="__shiki_140thh">                                </span></span>
<span class="line"><span class="__shiki_1itgoe">                            WHEN</span><span class="__shiki_mdbnqw"> &#39;DELETE&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">                                -- 删除分区</span></span>
<span class="line"><span class="__shiki_1itgoe">                                CALL</span><span class="__shiki_140thh"> dynamic_partition_management(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                    &#39;DROP&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                    rule_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                    partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">                                );</span></span>
<span class="line"><span class="__shiki_140thh">                                </span></span>
<span class="line"><span class="__shiki_1itgoe">                            WHEN</span><span class="__shiki_mdbnqw"> &#39;COMPRESS&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">                                -- 压缩分区（使用扩展如pg_repack或pgcompacttable）</span></span>
<span class="line"><span class="__shiki_140thh">                                RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;压缩分区: %&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">                                -- 实际压缩逻辑...</span></span>
<span class="line"><span class="__shiki_1itgoe">                        END</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 更新最后执行时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        UPDATE</span><span class="__shiki_140thh"> data_lifecycle_rules </span></span>
<span class="line"><span class="__shiki_1itgoe">        SET</span><span class="__shiki_140thh"> last_executed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> rule_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> rule_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">rule_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 分区表跨数据库同步</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建逻辑复制发布（主数据库）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> PUBLICATION partition_publication </span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> orders_partitioned </span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (publish </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;insert, update, delete&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在备数据库创建订阅</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> SUBSCRIPTION partition_subscription</span></span>
<span class="line"><span class="__shiki_1itgoe">CONNECTION</span><span class="__shiki_mdbnqw"> &#39;host=primary dbname=mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PUBLICATION partition_publication;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控复制延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sync_state,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_wal_lsn_diff(</span></span>
<span class="line"><span class="__shiki_140thh">        pg_current_wal_lsn(),</span></span>
<span class="line"><span class="__shiki_140thh">        replay_lsn</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> replication_lag_bytes</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_replication</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> application_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;partition_subscription&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="七、分区表限制与解决方案" tabindex="-1">七、分区表限制与解决方案 <a class="header-anchor" href="#七、分区表限制与解决方案" aria-label="Permalink to &quot;七、分区表限制与解决方案&quot;">​</a></h2><h3 id="_7-1-已知限制与变通方案" tabindex="-1">7.1 已知限制与变通方案 <a class="header-anchor" href="#_7-1-已知限制与变通方案" aria-label="Permalink to &quot;7.1 已知限制与变通方案&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 分区表上的唯一约束必须包含分区键</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：确保唯一约束包含分区键</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 错误的唯一约束</span></span>
<span class="line"><span class="__shiki_21nrsd">-- CREATE UNIQUE INDEX idx_unique_order ON orders_partitioned(order_id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 正确的唯一约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> UNIQUE INDEX</span><span class="__shiki_1t8gfj"> idx_unique_order_partition</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> orders_partitioned(order_id, order_date);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 外键引用限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区表不能直接作为外键引用</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：使用触发器或应用程序逻辑维护引用完整性</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 全局索引不支持</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：在每个分区上创建相同索引，或使用继承表+触发器</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 分区数量限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 大量分区影响查询计划性能</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：使用子分区或多级分区</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 分区键更新限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 更新分区键可能导致行移动到不同分区</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：删除后重新插入，或使用应用程序逻辑处理</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区键更新处理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> handle_partition_key_update</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> TRIGGER </span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_dzsirb"> OLD</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_dzsirb"> NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 删除旧行</span></span>
<span class="line"><span class="__shiki_1itgoe">        DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> orders_partitioned </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> order_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> OLD</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> order_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> OLD</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 插入新行</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> orders_partitioned </span></span>
<span class="line"><span class="__shiki_1itgoe">        VALUES</span><span class="__shiki_140thh"> (NEW.</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 跳过原始更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建触发器（需要在每个分区上创建）</span></span>
<span class="line"><span class="__shiki_140thh">DO $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_1itgoe">    partition</span><span class="__shiki_140thh"> RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_1itgoe"> partition</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> inhrelid::regclass </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> partition_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_inherits</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> inhparent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;orders_partitioned&#39;</span><span class="__shiki_140thh">::regclass</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE TRIGGER trg_partition_key_update</span></span>
<span class="line"><span class="__shiki_mdbnqw">            BEFORE UPDATE ON %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FOR EACH ROW</span></span>
<span class="line"><span class="__shiki_mdbnqw">            EXECUTE FUNCTION handle_partition_key_update()</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">partition</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 默认分区性能问题</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 默认分区可能成为性能瓶颈</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 解决方案：定期清理或重新分区默认分区中的数据</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> reorganize_default_partition(</span></span>
<span class="line"><span class="__shiki_140thh">    p_parent_table REGCLASS,</span></span>
<span class="line"><span class="__shiki_140thh">    p_default_partition </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    partition_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    v_sql </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_new_partition_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 为默认分区中的数据创建新分区</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> partition_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WITH</span><span class="__shiki_140thh"> distinct_values </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT DISTINCT</span><span class="__shiki_140thh"> partition_key_column</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> p_default_partition</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_21nrsd">  -- 限制每次处理的行数</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> partition_key_column</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> distinct_values</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 创建新分区</span></span>
<span class="line"><span class="__shiki_140thh">        v_new_partition_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;%s_%s&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            p_parent_table::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_key_column</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 动态创建分区（需要根据分区策略调整）</span></span>
<span class="line"><span class="__shiki_140thh">        v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE TABLE %s PARTITION OF %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FOR VALUES FROM (%L) TO (%L)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, v_new_partition_name, p_parent_table,</span></span>
<span class="line"><span class="__shiki_dzsirb">           partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_key_column</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">           partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_key_column</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_140thh"> v_sql;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 移动数据</span></span>
<span class="line"><span class="__shiki_140thh">        v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            INSERT INTO %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT * FROM %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE partition_key_column = %L</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, v_new_partition_name, p_default_partition,</span></span>
<span class="line"><span class="__shiki_dzsirb">           partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_key_column</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_140thh"> v_sql;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 删除已移动的数据</span></span>
<span class="line"><span class="__shiki_140thh">        v_sql :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            DELETE FROM %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE partition_key_column = %L</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, p_default_partition, </span><span class="__shiki_dzsirb">partition_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">partition_key_column</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_140thh"> v_sql;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span></code></pre></div><h2 id="八、性能测试与基准" tabindex="-1">八、性能测试与基准 <a class="header-anchor" href="#八、性能测试与基准" aria-label="Permalink to &quot;八、性能测试与基准&quot;">​</a></h2><h3 id="_8-1-分区表性能测试" tabindex="-1">8.1 分区表性能测试 <a class="header-anchor" href="#_8-1-分区表性能测试" aria-label="Permalink to &quot;8.1 分区表性能测试&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 创建性能测试环境</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> unpartitioned_table</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    event_type </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    payload JSONB</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> partitioned_table</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIKE</span><span class="__shiki_140thh"> unpartitioned_table INCLUDING ALL</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">PARTITION</span><span class="__shiki_1itgoe"> BY</span><span class="__shiki_1itgoe"> RANGE</span><span class="__shiki_140thh"> (event_time);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建分区</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> partitioned_2024_q1</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-04-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> partitioned_2024_q2</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-04-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-07-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> partitioned_2024_q3</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-07-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-10-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> partitioned_2024_q4</span><span class="__shiki_1itgoe"> PARTITION</span><span class="__shiki_140thh"> OF partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> VALUES</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2024-10-01&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;2025-01-01&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 插入测试数据（1000万行）</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> unpartitioned_table (event_time, user_id, event_type, payload)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;2024-01-01&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 365</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39; seconds&#39;</span><span class="__shiki_140thh">)::interval,</span></span>
<span class="line"><span class="__shiki_dzsirb">    floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_dzsirb"> floor</span><span class="__shiki_140thh">(random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;login&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;purchase&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;view&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;search&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;logout&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    jsonb_build_object(</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">, random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;details&#39;</span><span class="__shiki_140thh">, md5(random()::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 复制数据到分区表</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> partitioned_table </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> unpartitioned_table;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建相同索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_unpartitioned_time</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> unpartitioned_table(event_time);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_unpartitioned_user</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> unpartitioned_table(user_id);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_unpartitioned_type</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> unpartitioned_table(event_type);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 分区表索引会自动创建</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能测试1：点查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> unpartitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2024-06-15 10:30:00&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1234</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;2024-06-15 10:30:00&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1234</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能测试2：范围查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    event_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> event_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">((payload</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> unpartitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-06-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-06-30&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> event_type</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> event_count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    event_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> event_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">((payload</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_value</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-06-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-06-30&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> event_type</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> event_count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能测试3：聚合查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, event_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> daily_events,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> user_id) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> unique_users</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> unpartitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-12-31&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, event_time)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, event_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> daily_events,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> user_id) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> unique_users</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-12-31&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> DATE_TRUNC(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, event_time)</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能测试4：更新操作</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> unpartitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> payload </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> payload </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;{&quot;updated&quot;: true}&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-06-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-06-30&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> event_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;purchase&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> payload </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> payload </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;{&quot;updated&quot;: true}&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_mdbnqw"> &#39;2024-06-01&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_mdbnqw"> &#39;2024-06-30&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> event_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;purchase&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 性能测试5：删除操作</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> unpartitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS, TIMING)</span></span>
<span class="line"><span class="__shiki_1itgoe">DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> partitioned_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> event_time </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 收集性能统计</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> performance_results</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    test_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    test_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    table_type </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd">-- &#39;partitioned&#39; or &#39;unpartitioned&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    execution_time_ms </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    buffer_hits </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    buffer_reads </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    rows_returned </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    test_timestamp </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动运行性能测试</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> run_performance_benchmarks()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_start_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_end_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_explain_json </span><span class="__shiki_1itgoe">JSON</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 测试1：点查询</span></span>
<span class="line"><span class="__shiki_140thh">    v_start_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_mdbnqw"> &#39;EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON) SELECT * FROM unpartitioned_table WHERE event_time = &#39;&#39;2024-06-15 10:30:00&#39;&#39; AND user_id = 1234&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> v_explain_json;</span></span>
<span class="line"><span class="__shiki_140thh">    v_end_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> performance_results (test_name, table_type, execution_time_ms, buffer_hits, buffer_reads, rows_returned)</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;point_query&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;unpartitioned&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        extract(epoch </span><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> (v_end_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> v_start_time)) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (v_explain_json</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plan&#39;</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Shared Hit Blocks&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (v_explain_json</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plan&#39;</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Shared Read Blocks&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">bigint</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (v_explain_json</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plan&#39;</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Actual Rows&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">bigint</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 对其他测试重复类似逻辑...</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>PostgreSQL的分区表和表继承功能为处理大规模数据提供了强大的工具：</p><h3 id="关键要点总结" tabindex="-1">关键要点总结： <a class="header-anchor" href="#关键要点总结" aria-label="Permalink to &quot;关键要点总结：&quot;">​</a></h3><ol><li><p><strong>表继承</strong>：</p><ul><li>提供灵活的数据模型设计</li><li>支持多态查询</li><li>需要手动管理约束和索引</li></ul></li><li><p><strong>声明式分区</strong>：</p><ul><li>简化分区表管理</li><li>支持范围、列表、哈希分区</li><li>自动分区剪枝优化</li></ul></li><li><p><strong>分区设计</strong>：</p><ul><li>选择合适的分区键</li><li>确定合理的分区粒度</li><li>考虑数据生命周期</li></ul></li><li><p><strong>性能优化</strong>：</p><ul><li>启用分区剪枝</li><li>使用分区智能连接和聚合</li><li>合理设计索引策略</li></ul></li><li><p><strong>维护管理</strong>：</p><ul><li>自动化分区创建和归档</li><li>监控分区健康状况</li><li>定期维护索引和统计信息</li></ul></li></ol><h3 id="选择指南" tabindex="-1">选择指南： <a class="header-anchor" href="#选择指南" aria-label="Permalink to &quot;选择指南：&quot;">​</a></h3><ul><li><strong>使用表继承</strong>：当需要灵活的数据模型、多态查询，或PostgreSQL版本低于10时</li><li><strong>使用声明式分区</strong>：当需要简化管理、自动优化，且版本在10+时</li><li><strong>使用多级分区</strong>：当单个维度分区不够，需要更细粒度控制时</li><li><strong>使用哈希分区</strong>：当需要均匀分布数据，且查询模式不依赖于范围时</li></ul><h3 id="最佳实践" tabindex="-1">最佳实践： <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践：&quot;">​</a></h3><ol><li><p><strong>设计阶段</strong>：</p><ul><li>评估数据访问模式</li><li>选择合适的分区策略</li><li>设计分区维护流程</li></ul></li><li><p><strong>实施阶段</strong>：</p><ul><li>创建分区模板和函数</li><li>设置自动化维护作业</li><li>建立监控和告警</li></ul></li><li><p><strong>运维阶段</strong>：</p><ul><li>定期健康检查</li><li>优化分区策略</li><li>归档旧数据</li></ul></li></ol><p>通过合理使用分区表和表继承，可以显著提升大规模数据处理的性能和管理效率，构建可扩展的数据库架构。</p>`,75)])])}const r=a(p,[["render",h]]);export{g as __pageData,r as default};
