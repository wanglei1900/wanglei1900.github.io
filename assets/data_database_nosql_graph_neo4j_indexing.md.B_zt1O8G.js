import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Neo4j 图数据库学习笔记：索引与约束","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/nosql/graph/neo4j/indexing.md","filePath":"data/database/nosql/graph/neo4j/indexing.md"}'),_={name:"data/database/nosql/graph/neo4j/indexing.md"};function l(h,s,e,c,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="neo4j-图数据库学习笔记-索引与约束" tabindex="-1">Neo4j 图数据库学习笔记：索引与约束 <a class="header-anchor" href="#neo4j-图数据库学习笔记-索引与约束" aria-label="Permalink to &quot;Neo4j 图数据库学习笔记：索引与约束&quot;">​</a></h1><h2 id="一、索引与约束基础概念" tabindex="-1">一、索引与约束基础概念 <a class="header-anchor" href="#一、索引与约束基础概念" aria-label="Permalink to &quot;一、索引与约束基础概念&quot;">​</a></h2><h3 id="_1-1-索引与约束的重要性" tabindex="-1">1.1 索引与约束的重要性 <a class="header-anchor" href="#_1-1-索引与约束的重要性" aria-label="Permalink to &quot;1.1 索引与约束的重要性&quot;">​</a></h3><h4 id="_1-1-1-性能与数据完整性" tabindex="-1">1.1.1 性能与数据完整性 <a class="header-anchor" href="#_1-1-1-性能与数据完整性" aria-label="Permalink to &quot;1.1.1 性能与数据完整性&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│         索引与约束的核心价值                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 索引：加速数据检索，优化查询性能          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 约束：保障数据完整性，维护一致性          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 查询优化：为Cypher优化器提供统计信息      │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • 数据质量：防止无效或不一致数据进入系统    │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>对比分析</strong>：</p><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 无索引：全标签扫描，O(n)复杂度</span></span>
<span class="line"><span class="__shiki_1itgoe">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Alice&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行计划：NodeByLabelScan</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 有索引：索引查找，O(log n)复杂度</span></span>
<span class="line"><span class="__shiki_1itgoe">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Alice&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 执行计划：NodeIndexSeek</span></span></code></pre></div><h4 id="_1-1-2-neo4j索引特性" tabindex="-1">1.1.2 Neo4j索引特性 <a class="header-anchor" href="#_1-1-2-neo4j索引特性" aria-label="Permalink to &quot;1.1.2 Neo4j索引特性&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">• 基于B+树或Lucene（全文索引）</span></span>
<span class="line"><span class="__shiki_wvjl67">• 自动维护索引更新</span></span>
<span class="line"><span class="__shiki_wvjl67">• 支持节点和关系的属性索引</span></span>
<span class="line"><span class="__shiki_wvjl67">• 可创建复合索引（多属性）</span></span>
<span class="line"><span class="__shiki_wvjl67">• 支持唯一性和非唯一性索引</span></span></code></pre></div><h3 id="_1-2-索引体系架构" tabindex="-1">1.2 索引体系架构 <a class="header-anchor" href="#_1-2-索引体系架构" aria-label="Permalink to &quot;1.2 索引体系架构&quot;">​</a></h3><h4 id="_1-2-1-索引存储结构" tabindex="-1">1.2.1 索引存储结构 <a class="header-anchor" href="#_1-2-1-索引存储结构" aria-label="Permalink to &quot;1.2.1 索引存储结构&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│            Neo4j索引存储层次                 │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 应用层: Cypher查询 → 查询优化器             │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 逻辑层: 索引管理器 → 索引选择器             │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 存储层: B+树索引 | Lucene全文索引           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 物理层: 索引文件 (neostore.*.db)            │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────┘</span></span></code></pre></div><p><strong>索引文件结构</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">neostore.nodestore.db          # 节点存储</span></span>
<span class="line"><span class="__shiki_wvjl67">neostore.relationshipstore.db  # 关系存储</span></span>
<span class="line"><span class="__shiki_wvjl67">neostore.propertystore.db      # 属性存储</span></span>
<span class="line"><span class="__shiki_wvjl67">neostore.schemastore.db        # 模式存储（索引/约束元数据）</span></span>
<span class="line"><span class="__shiki_wvjl67">index/                         # Lucene索引目录</span></span>
<span class="line"><span class="__shiki_wvjl67">  - person_name/               # 索引文件</span></span>
<span class="line"><span class="__shiki_wvjl67">  - person_email/</span></span></code></pre></div><h2 id="二、索引类型与创建" tabindex="-1">二、索引类型与创建 <a class="header-anchor" href="#二、索引类型与创建" aria-label="Permalink to &quot;二、索引类型与创建&quot;">​</a></h2><h3 id="_2-1-单属性索引" tabindex="-1">2.1 单属性索引 <a class="header-anchor" href="#_2-1-单属性索引" aria-label="Permalink to &quot;2.1 单属性索引&quot;">​</a></h3><h4 id="_2-1-1-创建单属性索引" tabindex="-1">2.1.1 创建单属性索引 <a class="header-anchor" href="#_2-1-1-创建单属性索引" aria-label="Permalink to &quot;2.1.1 创建单属性索引&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基本单属性索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_name_index FOR (p:Person) ON (p.name)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带选项的索引创建</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_email_index IF NOT EXISTS </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) ON (p.email)</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">indexProvider</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;native-btree-1.0&#39;</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 关系属性索引（Neo4j </span><span class="__shiki_dzsirb">4.0</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX relationship_timestamp_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR ()</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj">TRANSACTION</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">() ON (r.timestamp)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看索引创建进度</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_phone_index FOR (p:Person) ON (p.phone)</span></span>
<span class="line"><span class="__shiki_21nrsd">// 在另一个会话中查看状态</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.awaitIndex(</span><span class="__shiki_mdbnqw">&quot;person_phone_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 等待300秒</span></span></code></pre></div><h4 id="_2-1-2-索引创建最佳实践" tabindex="-1">2.1.2 索引创建最佳实践 <a class="header-anchor" href="#_2-1-2-索引创建最佳实践" aria-label="Permalink to &quot;2.1.2 索引创建最佳实践&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">. 高基数字段优先索引</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 性别（低基数，</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">3种值） vs 身份证号（高基数）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_id_card_index FOR (p:Person) ON (p.idCard)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">. 频繁查询条件字段</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 假设80</span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh">查询使用email过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_email_index FOR (p:Person) ON (p.email)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">. 等值查询字段优先于范围查询字段</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_employee_id_index FOR (p:Person) ON (p.employeeId)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">. 避免过度索引（写性能代价）</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 评估：读写比例，更新频率</span></span></code></pre></div><h3 id="_2-2-复合索引-多属性索引" tabindex="-1">2.2 复合索引（多属性索引） <a class="header-anchor" href="#_2-2-复合索引-多属性索引" aria-label="Permalink to &quot;2.2 复合索引（多属性索引）&quot;">​</a></h3><h4 id="_2-2-1-创建和使用复合索引" tabindex="-1">2.2.1 创建和使用复合索引 <a class="header-anchor" href="#_2-2-1-创建和使用复合索引" aria-label="Permalink to &quot;2.2.1 创建和使用复合索引&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建复合索引（Neo4j </span><span class="__shiki_dzsirb">5.0</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_name_age_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) ON (p.lastName, p.firstName, p.age)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 复合索引使用场景</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 场景1：多条件查询（所有索引属性都在WHERE中）</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.lastName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Smith&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> p.firstName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;John&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 使用复合索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 场景2：前缀匹配（部分索引属性）</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.lastName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Smith&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> p.firstName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;John&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 使用复合索引（前缀）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 场景3：仅最后一个属性</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p  </span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 可能不使用复合索引，除非统计信息显示有益</span></span></code></pre></div><h4 id="_2-2-2-复合索引设计原则" tabindex="-1">2.2.2 复合索引设计原则 <a class="header-anchor" href="#_2-2-2-复合索引设计原则" aria-label="Permalink to &quot;2.2.2 复合索引设计原则&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">. 属性顺序至关重要（最左前缀原则）</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 好：WHERE条件按索引顺序</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX idx_person_1 FOR (p:Person) ON (p.country, p.city, p.district)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">. 基数从高到低排列</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 国家(</span><span class="__shiki_dzsirb">200</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> 城市(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> 区(</span><span class="__shiki_dzsirb">5000</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX idx_location FOR (l:Location) ON (l.countryCode, l.city, l.district)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">. 包含所有查询条件</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查询：</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> dept</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;IT&quot;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> role</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;Dev&quot;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;active&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX idx_employee_dept_role_status </span></span>
<span class="line"><span class="__shiki_140thh">FOR (e:Employee) ON (e.department, e.role, e.status)</span></span></code></pre></div><h3 id="_2-3-全文索引-full-text-index" tabindex="-1">2.3 全文索引（Full-Text Index） <a class="header-anchor" href="#_2-3-全文索引-full-text-index" aria-label="Permalink to &quot;2.3 全文索引（Full-Text Index）&quot;">​</a></h3><h4 id="_2-3-1-全文索引创建" tabindex="-1">2.3.1 全文索引创建 <a class="header-anchor" href="#_2-3-1-全文索引创建" aria-label="Permalink to &quot;2.3.1 全文索引创建&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建全文索引（基于Lucene）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FULLTEXT INDEX product_search </span></span>
<span class="line"><span class="__shiki_140thh">FOR (n:Product|Service) </span></span>
<span class="line"><span class="__shiki_140thh">ON EACH [n.name, n.description, n.keywords]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建带分析器的全文索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FULLTEXT INDEX document_content_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR (d:Document) </span></span>
<span class="line"><span class="__shiki_140thh">ON EACH [d.title, d.content, d.abstract]</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  indexConfig</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    \`fulltext.analyzer\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;english&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 英文分析器</span></span>
<span class="line"><span class="__shiki_140thh">    \`fulltext.eventually_consistent\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 最终一致性</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 节点和关系全文索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FULLTEXT INDEX relationship_notes_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR ()</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj">HAS_NOTE</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">() </span></span>
<span class="line"><span class="__shiki_140thh">ON EACH [r.note, r.comments]</span></span></code></pre></div><h4 id="_2-3-2-全文索引查询" tabindex="-1">2.3.2 全文索引查询 <a class="header-anchor" href="#_2-3-2-全文索引查询" aria-label="Permalink to &quot;2.3.2 全文索引查询&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基础全文搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.fulltext.queryNodes(</span><span class="__shiki_mdbnqw">&quot;product_search&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;laptop AND gaming&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, node.description, score</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 高级搜索语法</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.fulltext.queryNodes(</span><span class="__shiki_mdbnqw">&quot;document_content_index&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;&quot;machine learning&quot;~2 OR AI OR &quot;artificial intelligence&quot;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.2</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.title, </span><span class="__shiki_dzsirb">substring</span><span class="__shiki_140thh">(node.content, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">), score</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 短语搜索和模糊搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.fulltext.queryNodes(</span><span class="__shiki_mdbnqw">&quot;product_search&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;database NEAR/5 management OR graph~&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, score</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 多字段提升权重（通过查询语法）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.fulltext.queryNodes(</span><span class="__shiki_mdbnqw">&quot;document_content_index&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;title:&quot;重要报告&quot;^2.0 content:&quot;季度分析&quot;^1.0&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.title, score</span></span></code></pre></div><h3 id="_2-4-向量索引-vector-index-neo4j-5-0" tabindex="-1">2.4 向量索引（Vector Index，Neo4j 5.0+） <a class="header-anchor" href="#_2-4-向量索引-vector-index-neo4j-5-0" aria-label="Permalink to &quot;2.4 向量索引（Vector Index，Neo4j 5.0+）&quot;">​</a></h3><h4 id="_2-4-1-创建向量索引" tabindex="-1">2.4.1 创建向量索引 <a class="header-anchor" href="#_2-4-1-创建向量索引" aria-label="Permalink to &quot;2.4.1 创建向量索引&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建向量索引（用于AI嵌入搜索）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> VECTOR INDEX document_embeddings_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR (d:Document) ON (d.embedding)</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  indexConfig</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.dimensions\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1536</span><span class="__shiki_1itgoe">,</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 向量维度（如OpenAI embedding）</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.similarity_function\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;cosine&#39;</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 余弦相似度</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建带特定实现的向量索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> VECTOR INDEX product_vector_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Product) ON (p.featureVector)</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  indexConfig</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.dimensions\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 768</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.similarity_function\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;euclidean&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.type\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;FLOAT32_ARRAY&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-4-2-向量索引查询" tabindex="-1">2.4.2 向量索引查询 <a class="header-anchor" href="#_2-4-2-向量索引查询" aria-label="Permalink to &quot;2.4.2 向量索引查询&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 相似度搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> $user_embedding </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> query_vector</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.vector.queryNodes(</span><span class="__shiki_mdbnqw">&quot;document_embeddings_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, query_vector)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.title, node.url, score</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 混合搜索（向量</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">属性）</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> $query_embedding </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> embedding</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.vector.queryNodes(</span><span class="__shiki_mdbnqw">&quot;product_vector_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, embedding)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> node.category </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Electronics&quot;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> node.price </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, node.price, score</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span></span></code></pre></div><h2 id="三、索引管理与维护" tabindex="-1">三、索引管理与维护 <a class="header-anchor" href="#三、索引管理与维护" aria-label="Permalink to &quot;三、索引管理与维护&quot;">​</a></h2><h3 id="_3-1-索引状态与监控" tabindex="-1">3.1 索引状态与监控 <a class="header-anchor" href="#_3-1-索引状态与监控" aria-label="Permalink to &quot;3.1 索引状态与监控&quot;">​</a></h3><h4 id="_3-1-1-索引信息查询" tabindex="-1">3.1.1 索引信息查询 <a class="header-anchor" href="#_3-1-1-索引信息查询" aria-label="Permalink to &quot;3.1.1 索引信息查询&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看所有索引</span></span>
<span class="line"><span class="__shiki_140thh">SHOW INDEXES</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看详细索引信息</span></span>
<span class="line"><span class="__shiki_140thh">SHOW INDEXES </span><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, type, entityType, labelsOrTypes, properties, </span></span>
<span class="line"><span class="__shiki_140thh">       state, populationPercent, failureMessage,</span></span>
<span class="line"><span class="__shiki_140thh">       createStatement</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> type, name</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看特定标签的索引</span></span>
<span class="line"><span class="__shiki_140thh">SHOW INDEXES</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> labelsOrTypes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;Person&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看索引大小（使用APOC）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.schema.node.indexProperties()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> label, properties, size, type, provider</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> label, properties, size</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> size </span><span class="__shiki_1itgoe">DESC</span></span></code></pre></div><h4 id="_3-1-2-索引状态管理" tabindex="-1">3.1.2 索引状态管理 <a class="header-anchor" href="#_3-1-2-索引状态管理" aria-label="Permalink to &quot;3.1.2 索引状态管理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查索引状态</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.indexes()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name, state, populationPercent, type</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;POPULATING&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, populationPercent, type</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 等待索引就绪</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.awaitIndex(</span><span class="__shiki_mdbnqw">&quot;person_name_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">600</span><span class="__shiki_140thh">)  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 等待10分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name, state, success, failureMessage</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 强制重建索引（在线）</span></span>
<span class="line"><span class="__shiki_140thh">DROP INDEX person_name_index</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_name_index FOR (p:Person) ON (p.name)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.awaitIndex(</span><span class="__shiki_mdbnqw">&quot;person_name_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看索引使用统计（企业版）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.stats.retrieve(</span><span class="__shiki_mdbnqw">&quot;INDEX USAGE&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> data</span></span></code></pre></div><h3 id="_3-2-索引维护操作" tabindex="-1">3.2 索引维护操作 <a class="header-anchor" href="#_3-2-索引维护操作" aria-label="Permalink to &quot;3.2 索引维护操作&quot;">​</a></h3><h4 id="_3-2-1-索引创建与删除" tabindex="-1">3.2.1 索引创建与删除 <a class="header-anchor" href="#_3-2-1-索引创建与删除" aria-label="Permalink to &quot;3.2.1 索引创建与删除&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建索引（带存在性检查）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_name_index IF NOT EXISTS </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) ON (p.name)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 删除索引</span></span>
<span class="line"><span class="__shiki_140thh">DROP INDEX person_name_index</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 安全删除：先检查是否存在</span></span>
<span class="line"><span class="__shiki_140thh">DROP INDEX person_name_index IF EXISTS</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 批量删除旧索引</span></span>
<span class="line"><span class="__shiki_140thh">SHOW INDEXES</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> name CONTAINS </span><span class="__shiki_mdbnqw">&quot;old_&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">OR</span><span class="__shiki_140thh"> (populationPercent </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;FAILED&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_1itgoe"> {</span></span>
<span class="line"><span class="__shiki_140thh">  WITH name</span></span>
<span class="line"><span class="__shiki_140thh">  DROP INDEX name</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(name) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> droppedIndexes</span></span></code></pre></div><h4 id="_3-2-2-索引重建与优化" tabindex="-1">3.2.2 索引重建与优化 <a class="header-anchor" href="#_3-2-2-索引重建与优化" aria-label="Permalink to &quot;3.2.2 索引重建与优化&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 在线重建策略</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">. 创建新索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_name_new FOR (p:Person) ON (p.name)</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.awaitIndex(</span><span class="__shiki_mdbnqw">&quot;person_name_new&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">600</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">. 验证新索引</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE </span><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Test&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(p)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">. 重命名（需要APOC）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.schema.assert(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">Person</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">Person</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> key, label, keys, unique, action</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">. 删除旧索引</span></span>
<span class="line"><span class="__shiki_140thh">DROP INDEX person_name_old</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 定期重建索引的脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;person_name_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;product_title_index&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> indexesToRebuild</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> indexesToRebuild </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> indexName</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_1itgoe"> {</span></span>
<span class="line"><span class="__shiki_140thh">  WITH indexName</span></span>
<span class="line"><span class="__shiki_140thh">  CALL db.indexes() YIELD name</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> createStatement</span></span>
<span class="line"><span class="__shiki_140thh">  WHERE name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> indexName</span></span>
<span class="line"><span class="__shiki_140thh">  DROP INDEX name</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 从createStatement解析并重新创建</span></span>
<span class="line"><span class="__shiki_140thh">  RETURN name</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> indexesRebuilt</span></span></code></pre></div><h3 id="_3-3-索引性能分析" tabindex="-1">3.3 索引性能分析 <a class="header-anchor" href="#_3-3-索引性能分析" aria-label="Permalink to &quot;3.3 索引性能分析&quot;">​</a></h3><h4 id="_3-3-1-查询计划分析" tabindex="-1">3.3.1 查询计划分析 <a class="header-anchor" href="#_3-3-1-查询计划分析" aria-label="Permalink to &quot;3.3.1 查询计划分析&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查索引使用情况</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Alice&quot;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 25</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p.email</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 分析查询计划</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name STARTS </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_mdbnqw"> &quot;A&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> p.country </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;US&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> p.age BETWEEN </span><span class="__shiki_dzsirb">20</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> 40</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p.name, p.age</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> p.name</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 强制使用索引（提示）</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">USING INDEX</span><span class="__shiki_140thh"> p:Person(name)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Alice&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看索引统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.fulltext.queryNodes(</span><span class="__shiki_mdbnqw">&quot;product_search&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> totalDocs</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.fulltext.listAvailableAnalyzers()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> analyzer, description</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> totalDocs, </span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">(analyzer) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> availableAnalyzers</span></span></code></pre></div><h4 id="_3-3-2-索引效率监控" tabindex="-1">3.3.2 索引效率监控 <a class="header-anchor" href="#_3-3-2-索引效率监控" aria-label="Permalink to &quot;3.3.2 索引效率监控&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 监控索引命中率（企业版功能）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.stats.retrieve(</span><span class="__shiki_mdbnqw">&quot;INDEX USAGE&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> keys(data) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> indexName</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> indexName,</span></span>
<span class="line"><span class="__shiki_140thh">       data[indexName].hits </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> hits,</span></span>
<span class="line"><span class="__shiki_140thh">       data[indexName].lookups </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> lookups,</span></span>
<span class="line"><span class="__shiki_1itgoe">       CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> data[indexName].lookups </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_dzsirb"> 100.0</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> data[indexName].hits </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> data[indexName].lookups </span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">       END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> hitRate</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> hitRate </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 识别缺失索引</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 收集慢查询</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.stats.retrieve(</span><span class="__shiki_mdbnqw">&quot;QUERIES&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> data.elapsedTimeMillis </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> data.query CONTAINS </span><span class="__shiki_mdbnqw">&quot;WHERE&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> data.query </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> slowQuery, data.parameters </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> params</span></span>
<span class="line"><span class="__shiki_21nrsd">// 分析WHERE条件，识别可能受益的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> slowQuery, params</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span></span></code></pre></div><h2 id="四、约束类型与创建" tabindex="-1">四、约束类型与创建 <a class="header-anchor" href="#四、约束类型与创建" aria-label="Permalink to &quot;四、约束类型与创建&quot;">​</a></h2><h3 id="_4-1-唯一性约束" tabindex="-1">4.1 唯一性约束 <a class="header-anchor" href="#_4-1-唯一性约束" aria-label="Permalink to &quot;4.1 唯一性约束&quot;">​</a></h3><h4 id="_4-1-1-节点唯一性约束" tabindex="-1">4.1.1 节点唯一性约束 <a class="header-anchor" href="#_4-1-1-节点唯一性约束" aria-label="Permalink to &quot;4.1.1 节点唯一性约束&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基本唯一性约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_email_unique </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE p.email </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 复合唯一性约束（多属性唯一）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_name_dob_unique </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE (p.firstName, p.lastName, p.dateOfBirth) </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 带选项的唯一性约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT user_username_unique </span></span>
<span class="line"><span class="__shiki_140thh">FOR (u:User) REQUIRE u.username </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">indexProvider</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;native-btree-1.0&#39;</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查唯一性约束</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> email, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> email, count</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">DESC</span></span></code></pre></div><h4 id="_4-1-2-关系唯一性约束" tabindex="-1">4.1.2 关系唯一性约束 <a class="header-anchor" href="#_4-1-2-关系唯一性约束" aria-label="Permalink to &quot;4.1.2 关系唯一性约束&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> Neo4j </span><span class="__shiki_dzsirb">5.0</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> 支持关系属性唯一性</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT unique_transaction_id </span></span>
<span class="line"><span class="__shiki_140thh">FOR ()</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[</span><span class="__shiki_140thh">t</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj">TRANSACTION</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">() REQUIRE t.transactionId </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 确保单次关系唯一性</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT unique_friendship </span></span>
<span class="line"><span class="__shiki_140thh">FOR (a:Person)</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj">FRIEND</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">(b:Person) </span></span>
<span class="line"><span class="__shiki_140thh">REQUIRE (a, b) </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span></code></pre></div><h4 id="_4-1-3-唯一性约束与索引的关系" tabindex="-1">4.1.3 唯一性约束与索引的关系 <a class="header-anchor" href="#_4-1-3-唯一性约束与索引的关系" aria-label="Permalink to &quot;4.1.3 唯一性约束与索引的关系&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 唯一性约束自动创建支持索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_ssn_unique FOR (p:Person) REQUIRE p.ssn </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 自动创建索引: person_ssn_unique（类型为UNIQUENESS）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看约束创建的索引</span></span>
<span class="line"><span class="__shiki_140thh">SHOW INDEXES</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;UNIQUENESS&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, labelsOrTypes, properties</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 唯一性约束索引的特殊性</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">. 自动维护唯一性</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">. 不能被直接DROP INDEX</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">. 必须通过DROP CONSTRAINT删除</span></span></code></pre></div><h3 id="_4-2-存在性约束" tabindex="-1">4.2 存在性约束 <a class="header-anchor" href="#_4-2-存在性约束" aria-label="Permalink to &quot;4.2 存在性约束&quot;">​</a></h3><h4 id="_4-2-1-节点属性存在性约束" tabindex="-1">4.2.1 节点属性存在性约束 <a class="header-anchor" href="#_4-2-1-节点属性存在性约束" aria-label="Permalink to &quot;4.2.1 节点属性存在性约束&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 单属性存在性约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_name_exists </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE p.name </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 多属性存在性约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT employee_required_fields </span></span>
<span class="line"><span class="__shiki_140thh">FOR (e:Employee) </span></span>
<span class="line"><span class="__shiki_140thh">REQUIRE e.employeeId </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> e.hireDate </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 条件存在性约束（通过触发器或应用层实现）</span></span>
<span class="line"><span class="__shiki_21nrsd">// Neo4j原生不支持条件约束，需要应用逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;active&quot;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">IS NULL</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p.name  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 应用层检查</span></span></code></pre></div><h4 id="_4-2-2-关系属性存在性约束" tabindex="-1">4.2.2 关系属性存在性约束 <a class="header-anchor" href="#_4-2-2-关系属性存在性约束" aria-label="Permalink to &quot;4.2.2 关系属性存在性约束&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 关系属性存在性约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT transaction_timestamp_exists </span></span>
<span class="line"><span class="__shiki_140thh">FOR ()</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[</span><span class="__shiki_140thh">t</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj">TRANSACTION</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">() REQUIRE t.timestamp </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 确保关键关系属性存在</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT friendship_since_exists </span></span>
<span class="line"><span class="__shiki_140thh">FOR ()</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[</span><span class="__shiki_140thh">f</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj">FRIEND</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">() REQUIRE f.since </span><span class="__shiki_1itgoe">IS NOT NULL</span></span></code></pre></div><h3 id="_4-3-属性类型约束-neo4j-5-0" tabindex="-1">4.3 属性类型约束（Neo4j 5.0+） <a class="header-anchor" href="#_4-3-属性类型约束-neo4j-5-0" aria-label="Permalink to &quot;4.3 属性类型约束（Neo4j 5.0+）&quot;">​</a></h3><h4 id="_4-3-1-标量类型约束" tabindex="-1">4.3.1 标量类型约束 <a class="header-anchor" href="#_4-3-1-标量类型约束" aria-label="Permalink to &quot;4.3.1 标量类型约束&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 基本类型约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_age_integer </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE p.age </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> INTEGER</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 字符串类型约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT product_name_string </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Product) REQUIRE p.name </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> STRING</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 布尔类型约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT user_active_boolean </span></span>
<span class="line"><span class="__shiki_140thh">FOR (u:User) REQUIRE u.active </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> BOOLEAN</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 浮点数类型约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT product_price_float </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Product) REQUIRE p.price </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> FLOAT</span></span></code></pre></div><h4 id="_4-3-2-复杂类型约束" tabindex="-1">4.3.2 复杂类型约束 <a class="header-anchor" href="#_4-3-2-复杂类型约束" aria-label="Permalink to &quot;4.3.2 复杂类型约束&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 列表类型约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT user_roles_list </span></span>
<span class="line"><span class="__shiki_140thh">FOR (u:User) REQUIRE u.roles </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> LIST</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">STRING</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 日期时间约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT event_date_datetime </span></span>
<span class="line"><span class="__shiki_140thh">FOR (e:Event) REQUIRE e.eventDate </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> DATETIME</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 点类型约束（空间数据）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT location_point </span></span>
<span class="line"><span class="__shiki_140thh">FOR (l:Location) REQUIRE l.coordinates </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> POINT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 映射</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">字典约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT product_attributes_map </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Product) REQUIRE p.attributes </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> MAP</span></span></code></pre></div><h4 id="_4-3-3-范围约束" tabindex="-1">4.3.3 范围约束 <a class="header-anchor" href="#_4-3-3-范围约束" aria-label="Permalink to &quot;4.3.3 范围约束&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 数值范围约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_age_range </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE </span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 150</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 日期范围约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT order_date_range </span></span>
<span class="line"><span class="__shiki_140thh">FOR (o:Order) </span></span>
<span class="line"><span class="__shiki_140thh">REQUIRE date(</span><span class="__shiki_mdbnqw">&quot;2000-01-01&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> o.orderDate </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> date()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 字符串长度约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT username_length </span></span>
<span class="line"><span class="__shiki_140thh">FOR (u:User) REQUIRE </span><span class="__shiki_dzsirb">3</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_140thh"> size(u.username) </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 50</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 正则表达式约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT email_format </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) </span></span>
<span class="line"><span class="__shiki_140thh">REQUIRE p.email </span><span class="__shiki_1itgoe">=~</span><span class="__shiki_mdbnqw"> &#39;^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">.[A-Za-z]{2,}$&#39;</span></span></code></pre></div><h3 id="_4-4-键约束-key-constraints" tabindex="-1">4.4 键约束（Key Constraints） <a class="header-anchor" href="#_4-4-键约束-key-constraints" aria-label="Permalink to &quot;4.4 键约束（Key Constraints）&quot;">​</a></h3><h4 id="_4-4-1-节点键约束" tabindex="-1">4.4.1 节点键约束 <a class="header-anchor" href="#_4-4-1-节点键约束" aria-label="Permalink to &quot;4.4.1 节点键约束&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 节点键约束（唯一且非空）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_pk </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE (p.personId) </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> NODE KEY</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 复合节点键</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT employee_pk </span></span>
<span class="line"><span class="__shiki_140thh">FOR (e:Employee) REQUIRE (e.companyId, e.employeeNumber) </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> NODE KEY</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看键约束</span></span>
<span class="line"><span class="__shiki_140thh">SHOW CONSTRAINTS</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;NODE KEY&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, labelsOrTypes, properties</span></span></code></pre></div><h2 id="五、约束管理与维护" tabindex="-1">五、约束管理与维护 <a class="header-anchor" href="#五、约束管理与维护" aria-label="Permalink to &quot;五、约束管理与维护&quot;">​</a></h2><h3 id="_5-1-约束状态管理" tabindex="-1">5.1 约束状态管理 <a class="header-anchor" href="#_5-1-约束状态管理" aria-label="Permalink to &quot;5.1 约束状态管理&quot;">​</a></h3><h4 id="_5-1-1-约束创建与验证" tabindex="-1">5.1.1 约束创建与验证 <a class="header-anchor" href="#_5-1-1-约束创建与验证" aria-label="Permalink to &quot;5.1.1 约束创建与验证&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建约束（带存在检查）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_email_unique IF NOT EXISTS</span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE p.email </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 验证现有数据</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_age_not_null</span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE p.age </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"><span class="__shiki_21nrsd">// 如果现有Person节点age为null，会失败</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 延迟约束验证（某些版本支持）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 可能需要分步操作：</span></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 清理无效数据</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">IS NULL</span><span class="__shiki_1itgoe"> SET</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 创建约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_age_not_null</span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE p.age </span><span class="__shiki_1itgoe">IS NOT NULL</span></span></code></pre></div><h4 id="_5-1-2-约束信息查询" tabindex="-1">5.1.2 约束信息查询 <a class="header-anchor" href="#_5-1-2-约束信息查询" aria-label="Permalink to &quot;5.1.2 约束信息查询&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看所有约束</span></span>
<span class="line"><span class="__shiki_140thh">SHOW CONSTRAINTS</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看详细约束信息</span></span>
<span class="line"><span class="__shiki_140thh">SHOW CONSTRAINTS </span><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, type, entityType, labelsOrTypes, properties, </span></span>
<span class="line"><span class="__shiki_140thh">       createStatement</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> type, name</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看特定类型约束</span></span>
<span class="line"><span class="__shiki_140thh">SHOW CONSTRAINTS</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> type </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;UNIQUENESS&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;NODE KEY&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> name, labelsOrTypes, properties</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看约束违反情况（唯一性检查）</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> email, </span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">(p) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> persons</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> size(persons) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> email, [p </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> persons | p.name] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> duplicateNames</span></span></code></pre></div><h3 id="_5-2-约束维护操作" tabindex="-1">5.2 约束维护操作 <a class="header-anchor" href="#_5-2-约束维护操作" aria-label="Permalink to &quot;5.2 约束维护操作&quot;">​</a></h3><h4 id="_5-2-1-约束创建与删除" tabindex="-1">5.2.1 约束创建与删除 <a class="header-anchor" href="#_5-2-1-约束创建与删除" aria-label="Permalink to &quot;5.2.1 约束创建与删除&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 删除约束</span></span>
<span class="line"><span class="__shiki_140thh">DROP CONSTRAINT person_email_unique</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 安全删除</span></span>
<span class="line"><span class="__shiki_140thh">DROP CONSTRAINT person_email_unique IF EXISTS</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 批量删除旧约束</span></span>
<span class="line"><span class="__shiki_140thh">SHOW CONSTRAINTS</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> name CONTAINS </span><span class="__shiki_mdbnqw">&quot;temp_&quot;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> name CONTAINS </span><span class="__shiki_mdbnqw">&quot;old_&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> name</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_1itgoe"> {</span></span>
<span class="line"><span class="__shiki_140thh">  WITH name</span></span>
<span class="line"><span class="__shiki_140thh">  DROP CONSTRAINT name</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(name) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> droppedConstraints</span></span></code></pre></div><h4 id="_5-2-2-约束迁移策略" tabindex="-1">5.2.2 约束迁移策略 <a class="header-anchor" href="#_5-2-2-约束迁移策略" aria-label="Permalink to &quot;5.2.2 约束迁移策略&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 约束迁移示例：从单属性唯一到复合唯一</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">. 删除旧约束</span></span>
<span class="line"><span class="__shiki_140thh">DROP CONSTRAINT person_email_unique</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">. 验证数据，确保新约束条件满足</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> email, p.countryCode </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> country, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> count</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> email, country, count  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 如果有返回，需要清理数据</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">. 创建新约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_email_country_unique</span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) REQUIRE (p.email, p.countryCode) </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">. 更新查询使用新约束</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> $email </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> p.countryCode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> $country</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p</span></span></code></pre></div><h2 id="六、索引与约束的高级应用" tabindex="-1">六、索引与约束的高级应用 <a class="header-anchor" href="#六、索引与约束的高级应用" aria-label="Permalink to &quot;六、索引与约束的高级应用&quot;">​</a></h2><h3 id="_6-1-组合索引策略" tabindex="-1">6.1 组合索引策略 <a class="header-anchor" href="#_6-1-组合索引策略" aria-label="Permalink to &quot;6.1 组合索引策略&quot;">​</a></h3><h4 id="_6-1-1-覆盖索引-index-only-scan" tabindex="-1">6.1.1 覆盖索引（Index-Only Scan） <a class="header-anchor" href="#_6-1-1-覆盖索引-index-only-scan" aria-label="Permalink to &quot;6.1.1 覆盖索引（Index-Only Scan）&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建包含查询返回字段的复合索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_contact_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) ON (p.lastName, p.firstName, p.email, p.phone)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查询可以使用索引覆盖</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.lastName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Smith&quot;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> p.firstName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;John&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p.email, p.phone  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 从索引直接获取，无需访问节点存储</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 验证是否使用索引覆盖</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.lastName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Smith&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p.lastName, p.firstName</span></span>
<span class="line"><span class="__shiki_21nrsd">// 检查执行计划中的&quot;NodeIndexSeek&quot;操作</span></span></code></pre></div><h4 id="_6-1-2-函数索引-通过计算属性" tabindex="-1">6.1.2 函数索引（通过计算属性） <a class="header-anchor" href="#_6-1-2-函数索引-通过计算属性" aria-label="Permalink to &quot;6.1.2 函数索引（通过计算属性）&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> Neo4j原生不支持函数索引，可通过存储计算属性实现</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">. 创建计算属性</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> p.name_lower </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> toLower(p.name),</span></span>
<span class="line"><span class="__shiki_140thh">    p.email_domain </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> split</span><span class="__shiki_140thh">(p.email, </span><span class="__shiki_mdbnqw">&quot;@&quot;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">. 为计算属性创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_name_lower_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) ON (p.name_lower)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_email_domain_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) ON (p.email_domain)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">. 查询使用计算属性</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name_lower </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> toLower(</span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">. 维护计算属性（触发器或应用层）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 需要在name更新时同步更新name_lower</span></span></code></pre></div><h3 id="_6-2-文本搜索高级应用" tabindex="-1">6.2 文本搜索高级应用 <a class="header-anchor" href="#_6-2-文本搜索高级应用" aria-label="Permalink to &quot;6.2 文本搜索高级应用&quot;">​</a></h3><h4 id="_6-2-1-多语言全文索引" tabindex="-1">6.2.1 多语言全文索引 <a class="header-anchor" href="#_6-2-1-多语言全文索引" aria-label="Permalink to &quot;6.2.1 多语言全文索引&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建多语言全文索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FULLTEXT INDEX multilingual_content </span></span>
<span class="line"><span class="__shiki_140thh">FOR (c:Content) ON EACH [c.title, c.body]</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  indexConfig</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    \`fulltext.analyzer\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;standard&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 默认分析器</span></span>
<span class="line"><span class="__shiki_140thh">    \`fulltext.eventually_consistent\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 语言特定查询</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.fulltext.queryNodes(</span><span class="__shiki_mdbnqw">&quot;multilingual_content&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;language:en AND &quot;database management&quot;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.title, score</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 混合语言内容处理</span></span>
<span class="line"><span class="__shiki_21nrsd">// 方案1：按语言分字段存储</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (d:Document </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  title_en</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;Introduction to Neo4j&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  title_zh</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;Neo4j入门指南&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  content_en</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;...&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  content_zh</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方案2：使用语言检测和翻译（应用层实现）</span></span></code></pre></div><h4 id="_6-2-2-全文索引优化" tabindex="-1">6.2.2 全文索引优化 <a class="header-anchor" href="#_6-2-2-全文索引优化" aria-label="Permalink to &quot;6.2.2 全文索引优化&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">. 选择合适分析器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FULLTEXT INDEX product_descriptions </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Product) ON EACH [p.name, p.description]</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  indexConfig</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    \`fulltext.analyzer\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;english&#39;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 英文文本</span></span>
<span class="line"><span class="__shiki_140thh">    \`fulltext.eventually_consistent\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 实时一致性</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">. 字段提升权重</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.fulltext.queryNodes(</span><span class="__shiki_mdbnqw">&quot;product_descriptions&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;title:&quot;wireless keyboard&quot;^4.0 description:&quot;bluetooth&quot;^2.0&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.name, score</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">. 同义词扩展</span></span>
<span class="line"><span class="__shiki_21nrsd">// 创建同义词词典文件 synonyms.txt</span></span>
<span class="line"><span class="__shiki_21nrsd">// wireless, wifi, wi-fi</span></span>
<span class="line"><span class="__shiki_21nrsd">// keyboard, keypad</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">. 停用词配置</span></span>
<span class="line"><span class="__shiki_21nrsd">// 配置停用词列表，忽略&quot;the&quot;, &quot;a&quot;, &quot;an&quot;等</span></span></code></pre></div><h3 id="_6-3-向量索引ai应用" tabindex="-1">6.3 向量索引AI应用 <a class="header-anchor" href="#_6-3-向量索引ai应用" aria-label="Permalink to &quot;6.3 向量索引AI应用&quot;">​</a></h3><h4 id="_6-3-1-ai嵌入索引优化" tabindex="-1">6.3.1 AI嵌入索引优化 <a class="header-anchor" href="#_6-3-1-ai嵌入索引优化" aria-label="Permalink to &quot;6.3.1 AI嵌入索引优化&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 创建分层可导航小世界索引（HNSW）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> VECTOR INDEX document_hnsw_index </span></span>
<span class="line"><span class="__shiki_140thh">FOR (d:Document) ON (d.embedding)</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  indexConfig</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.dimensions\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1536</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.similarity_function\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;cosine&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.index_type\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;HNSW&#39;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.hnsw.efConstruction\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">    \`vector.hnsw.M\`</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 16</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 混合检索（语义</span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh">关键词）</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> $query_embedding </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> vector, $keywords </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> keywords</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_1itgoe"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 向量相似度搜索</span></span>
<span class="line"><span class="__shiki_140thh">  CALL db.index.vector.queryNodes(</span><span class="__shiki_mdbnqw">&quot;document_hnsw_index&quot;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> vector)</span></span>
<span class="line"><span class="__shiki_140thh">  YIELD node</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> score AS vectorScore</span></span>
<span class="line"><span class="__shiki_140thh">  RETURN node</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> vectorScore</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_1itgoe"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 全文关键词搜索</span></span>
<span class="line"><span class="__shiki_140thh">  CALL db.index.fulltext.queryNodes(</span><span class="__shiki_mdbnqw">&quot;document_fulltext&quot;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> keywords)</span></span>
<span class="line"><span class="__shiki_140thh">  YIELD node</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> score AS textScore</span></span>
<span class="line"><span class="__shiki_140thh">  RETURN node</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> textScore</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> node, </span></span>
<span class="line"><span class="__shiki_dzsirb">     coalesce</span><span class="__shiki_140thh">(vectorScore, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(textScore, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> combinedScore</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.title, combinedScore</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> combinedScore </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 20</span></span></code></pre></div><h4 id="_6-3-2-近似最近邻搜索调优" tabindex="-1">6.3.2 近似最近邻搜索调优 <a class="header-anchor" href="#_6-3-2-近似最近邻搜索调优" aria-label="Permalink to &quot;6.3.2 近似最近邻搜索调优&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 调整搜索参数</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.vector.queryNodes(</span><span class="__shiki_mdbnqw">&quot;document_hnsw_index&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">  50</span><span class="__shiki_140thh">,            </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 返回数量</span></span>
<span class="line"><span class="__shiki_140thh">  $query_vector, </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查询向量</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_1itgoe">              --</span><span class="__shiki_140thh"> 参数配置</span></span>
<span class="line"><span class="__shiki_140thh">    efSearch</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe">,</span><span class="__shiki_1itgoe">     --</span><span class="__shiki_140thh"> 搜索时的ef参数</span></span>
<span class="line"><span class="__shiki_140thh">    similarityCutoff</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 0.6</span><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh"> 相似度阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">  }</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> node.title, score</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 批量向量搜索优化</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> $query_vectors </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> query_vector</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.index.vector.queryNodes(</span><span class="__shiki_mdbnqw">&quot;product_vector_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, query_vector)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> node, score</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> query_vector, </span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">product</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> node</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> score</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> score</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> results</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> query_vector, results</span></span></code></pre></div><h2 id="七、性能优化最佳实践" tabindex="-1">七、性能优化最佳实践 <a class="header-anchor" href="#七、性能优化最佳实践" aria-label="Permalink to &quot;七、性能优化最佳实践&quot;">​</a></h2><h3 id="_7-1-索引设计策略" tabindex="-1">7.1 索引设计策略 <a class="header-anchor" href="#_7-1-索引设计策略" aria-label="Permalink to &quot;7.1 索引设计策略&quot;">​</a></h3><h4 id="_7-1-1-索引选择决策树" tabindex="-1">7.1.1 索引选择决策树 <a class="header-anchor" href="#_7-1-1-索引选择决策树" aria-label="Permalink to &quot;7.1.1 索引选择决策树&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">开始</span></span>
<span class="line"><span class="__shiki_wvjl67">  ├─ 查询模式分析</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   ├─ 等值查询 → 单属性B+树索引</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   ├─ 范围查询 → 单属性B+树索引</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   ├─ 前缀匹配 → 单属性B+树索引</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   ├─ 全文搜索 → 全文索引</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   ├─ 向量相似度 → 向量索引</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   └─ 多条件AND → 复合索引</span></span>
<span class="line"><span class="__shiki_wvjl67">  │</span></span>
<span class="line"><span class="__shiki_wvjl67">  ├─ 数据特征分析</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   ├─ 高基数属性 → 优先索引</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   ├─ 低基数属性 → 谨慎索引</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   ├─ 更新频率 → 考虑索引维护成本</span></span>
<span class="line"><span class="__shiki_wvjl67">  │   └─ 数据分布 → 均匀分布更有效</span></span>
<span class="line"><span class="__shiki_wvjl67">  │</span></span>
<span class="line"><span class="__shiki_wvjl67">  └─ 资源约束</span></span>
<span class="line"><span class="__shiki_wvjl67">      ├─ 内存限制 → 控制索引数量</span></span>
<span class="line"><span class="__shiki_wvjl67">      ├─ 磁盘空间 → 考虑索引大小</span></span>
<span class="line"><span class="__shiki_wvjl67">      └─ 写入负载 → 平衡读写性能</span></span></code></pre></div><h4 id="_7-1-2-索引设计检查清单" tabindex="-1">7.1.2 索引设计检查清单 <a class="header-anchor" href="#_7-1-2-索引设计检查清单" aria-label="Permalink to &quot;7.1.2 索引设计检查清单&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查1: 索引是否被使用</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;alice@example.com&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 查看执行计划是否显示</span><span class="__shiki_mdbnqw">&quot;NodeIndexSeek&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查2: 索引选择性</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;alice@example.com&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> total, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(p) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> matches</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> total, matches, </span><span class="__shiki_dzsirb">100.0</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> matches </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> total </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> selectivity</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 选择性 </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> 通常适合索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查3: 索引大小影响</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.meta.stats()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> labels, propertyKeys, relTypes, relTypesCount</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> labels, propertyKeys</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 检查4: 索引维护成本</span></span>
<span class="line"><span class="__shiki_21nrsd">// 监控写入性能</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> p.newIndexedField </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> rand</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_21nrsd">// 对比有索引和无索引的写入速度</span></span></code></pre></div><h3 id="_7-2-约束设计策略" tabindex="-1">7.2 约束设计策略 <a class="header-anchor" href="#_7-2-约束设计策略" aria-label="Permalink to &quot;7.2 约束设计策略&quot;">​</a></h3><h4 id="_7-2-1-约束实施策略" tabindex="-1">7.2.1 约束实施策略 <a class="header-anchor" href="#_7-2-1-约束实施策略" aria-label="Permalink to &quot;7.2.1 约束实施策略&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 分层约束策略</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">. 数据库层约束（强一致性）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT user_email_unique FOR (u:User) REQUIRE u.email </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">. 应用层约束（业务逻辑）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 应用代码中验证业务规则</span></span>
<span class="line"><span class="__shiki_140thh">function createUser(email, username) </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  if (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">isValidEmail(email)) throw Error(</span><span class="__shiki_mdbnqw">&quot;Invalid email&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  if (username.length </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">) throw Error(</span><span class="__shiki_mdbnqw">&quot;Username too short&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 然后写入数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">. 批处理约束检查（离线验证）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 定期运行数据质量检查</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 150</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> p.name, p.age</span></span>
<span class="line"><span class="__shiki_21nrsd">// 报告并修复数据问题</span></span></code></pre></div><h4 id="_7-2-2-约束与性能平衡" tabindex="-1">7.2.2 约束与性能平衡 <a class="header-anchor" href="#_7-2-2-约束与性能平衡" aria-label="Permalink to &quot;7.2.2 约束与性能平衡&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 权衡：约束保证 vs 写入性能</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 场景1：高写入负载，可接受暂时不一致</span></span>
<span class="line"><span class="__shiki_21nrsd">// 使用最终一致性，异步验证</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT eventual_email_unique </span></span>
<span class="line"><span class="__shiki_140thh">FOR (u:User) REQUIRE u.email </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">constraintValidation</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;DEFERRED&quot;</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 场景2：关键业务数据，需要强一致性</span></span>
<span class="line"><span class="__shiki_21nrsd">// 使用即时验证，接受性能代价</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT immediate_transaction_id </span></span>
<span class="line"><span class="__shiki_140thh">FOR ()</span><span class="__shiki_dzsirb">-</span><span class="__shiki_1itgoe">[</span><span class="__shiki_140thh">t</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj">TRANSACTION</span><span class="__shiki_1itgoe">]</span><span class="__shiki_dzsirb">-</span><span class="__shiki_140thh">() REQUIRE t.transactionId </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">constraintValidation</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;IMMEDIATE&quot;</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 场景3：只读或低频更新数据</span></span>
<span class="line"><span class="__shiki_21nrsd">// 可以添加多个约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT historical_data_pk </span></span>
<span class="line"><span class="__shiki_140thh">FOR (r:Record) REQUIRE (r.recordId) </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> NODE KEY</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT historical_data_dates </span></span>
<span class="line"><span class="__shiki_140thh">FOR (r:Record) REQUIRE r.startDate </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> r.endDate </span><span class="__shiki_1itgoe">IS NOT NULL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT historical_date_order </span></span>
<span class="line"><span class="__shiki_140thh">FOR (r:Record) REQUIRE r.startDate </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> r.endDate</span></span></code></pre></div><h3 id="_7-3-监控与调优" tabindex="-1">7.3 监控与调优 <a class="header-anchor" href="#_7-3-监控与调优" aria-label="Permalink to &quot;7.3 监控与调优&quot;">​</a></h3><h4 id="_7-3-1-索引性能监控" tabindex="-1">7.3.1 索引性能监控 <a class="header-anchor" href="#_7-3-1-索引性能监控" aria-label="Permalink to &quot;7.3.1 索引性能监控&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 监控索引统计（企业版）</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.stats.retrieveAll()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> section, data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> section </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;TOKENS&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 监控查询性能</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.stats.retrieve(</span><span class="__shiki_mdbnqw">&quot;QUERIES&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> data.elapsedTimeMillis </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> data.query, data.elapsedTimeMillis, data.parameters</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> data.elapsedTimeMillis </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 识别缺失索引</span></span>
<span class="line"><span class="__shiki_21nrsd">// 分析慢查询模式</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;WHERE p.email =&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;WHERE p.name CONTAINS&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;WHERE p.age &gt;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> commonPatterns</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.stats.retrieve(</span><span class="__shiki_mdbnqw">&quot;QUERIES&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> data.elapsedTimeMillis </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 500</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">(pattern </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> commonPatterns </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> data.query CONTAINS pattern)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> data.query, data.elapsedTimeMillis</span></span></code></pre></div><h4 id="_7-3-2-自动化索引管理" tabindex="-1">7.3.2 自动化索引管理 <a class="header-anchor" href="#_7-3-2-自动化索引管理" aria-label="Permalink to &quot;7.3.2 自动化索引管理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 自动索引建议脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.stats.retrieve(</span><span class="__shiki_mdbnqw">&quot;QUERIES&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> data.elapsedTimeMillis </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> data.query </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query, data.parameters </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> params</span></span>
<span class="line"><span class="__shiki_21nrsd">// 解析WHERE子句，提取属性访问</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> query, </span></span>
<span class="line"><span class="__shiki_dzsirb">     extract</span><span class="__shiki_140thh">(x </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> split</span><span class="__shiki_140thh">(query, </span><span class="__shiki_mdbnqw">&quot;WHERE&quot;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">..] | </span></span>
<span class="line"><span class="__shiki_dzsirb">       extract</span><span class="__shiki_140thh">(m </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> regexGroups(x, </span><span class="__shiki_mdbnqw">&#39;([a-zA-Z]+)</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">.[a-zA-Z]+&#39;</span><span class="__shiki_140thh">) | m[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">     ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> potentialProperties</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> potentialProperties </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> prop</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> prop, </span><span class="__shiki_dzsirb">count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> frequency</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> frequency </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_mdbnqw"> &quot;Consider creating index on: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> prop </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> recommendation</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 定期索引重建计划</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;person_name_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;product_title_index&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> indexesToMaintain</span></span>
<span class="line"><span class="__shiki_1itgoe">UNWIND</span><span class="__shiki_140thh"> indexesToMaintain </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> indexName</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_1itgoe"> {</span></span>
<span class="line"><span class="__shiki_140thh">  WITH indexName</span></span>
<span class="line"><span class="__shiki_140thh">  CALL db.indexes() YIELD name</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> populationPercent</span></span>
<span class="line"><span class="__shiki_140thh">  WHERE name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> indexName </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> populationPercent </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 95</span></span>
<span class="line"><span class="__shiki_140thh">  RETURN name</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> populationPercent</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_dzsirb"> collect</span><span class="__shiki_140thh">(name) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> indexesNeedingRebuild</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> size(indexesNeedingRebuild) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_mdbnqw"> &quot;Indexes to rebuild: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> indexesNeedingRebuild</span></span></code></pre></div><h2 id="八、常见问题与解决方案" tabindex="-1">八、常见问题与解决方案 <a class="header-anchor" href="#八、常见问题与解决方案" aria-label="Permalink to &quot;八、常见问题与解决方案&quot;">​</a></h2><h3 id="_8-1-索引相关问题" tabindex="-1">8.1 索引相关问题 <a class="header-anchor" href="#_8-1-索引相关问题" aria-label="Permalink to &quot;8.1 索引相关问题&quot;">​</a></h3><h4 id="_8-1-1-索引未被使用" tabindex="-1">8.1.1 索引未被使用 <a class="header-anchor" href="#_8-1-1-索引未被使用" aria-label="Permalink to &quot;8.1.1 索引未被使用&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 问题：查询没有使用预期索引</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 原因1：数据类型不匹配</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;30&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 字符串 vs 整数</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决：使用正确类型</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 原因2：函数包装索引列</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> toLower(p.name) </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;alice&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决：使用计算属性或全文索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_name_lower FOR (p:Person) ON (p.name_lower)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 原因3：OR条件导致全扫描</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Alice&quot;</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;alice@example.com&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决：重写为UNION</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Alice&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p</span></span>
<span class="line"><span class="__shiki_1itgoe">UNION</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;alice@example.com&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_140thh"> p</span></span></code></pre></div><h4 id="_8-1-2-索引创建失败" tabindex="-1">8.1.2 索引创建失败 <a class="header-anchor" href="#_8-1-2-索引创建失败" aria-label="Permalink to &quot;8.1.2 索引创建失败&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 问题：索引创建超时或失败</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 原因1：数据量太大，超时</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX large_dataset_index FOR (l:Log) ON (l.timestamp)</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决：增加超时时间，分批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.awaitIndex(</span><span class="__shiki_mdbnqw">&quot;large_dataset_index&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">)  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 1小时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 原因2：内存不足</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决：增加堆内存，监控资源使用</span></span>
<span class="line"><span class="__shiki_21nrsd">// neo4j.conf: dbms.memory.heap.initial_size=4G</span></span>
<span class="line"><span class="__shiki_21nrsd">// neo4j.conf: dbms.memory.heap.max_size=8G</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 原因3：磁盘空间不足</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决：清理磁盘，监控索引大小</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.meta.stats()</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> labelCount, propertyCount, relTypeCount</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> labelCount, propertyCount</span></span></code></pre></div><h3 id="_8-2-约束相关问题" tabindex="-1">8.2 约束相关问题 <a class="header-anchor" href="#_8-2-约束相关问题" aria-label="Permalink to &quot;8.2 约束相关问题&quot;">​</a></h3><h4 id="_8-2-1-约束违反处理" tabindex="-1">8.2.1 约束违反处理 <a class="header-anchor" href="#_8-2-1-约束违反处理" aria-label="Permalink to &quot;8.2.1 约束违反处理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 问题：唯一性约束违反</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 场景：批量导入重复数据</span></span>
<span class="line"><span class="__shiki_1itgoe">LOAD CSV</span><span class="__shiki_1itgoe"> WITH</span><span class="__shiki_1itgoe"> HEADERS</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;file:///users.csv&quot;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_140thh"> (u:User </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.email</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 可能失败：UNIQUE constraint failed</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决方案1：预处理去重</span></span>
<span class="line"><span class="__shiki_1itgoe">LOAD CSV</span><span class="__shiki_1itgoe"> WITH</span><span class="__shiki_1itgoe"> HEADERS</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;file:///users.csv&quot;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> row.email </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> email, </span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">(row) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> rows</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> email, rows[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> row  </span><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 取第一个</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_140thh"> (u:User </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> email</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> u </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> row</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决方案2：使用APOC批量处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.periodic.iterate(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;LOAD CSV WITH HEADERS FROM &#39;file:///users.csv&#39; AS row RETURN row&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;MERGE (u:User {email: row.email}) SET u += row&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">  {</span><span class="__shiki_140thh">batchSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> parallel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决方案3：暂时禁用约束检查（不推荐）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 某些情况下可以先导入，后清理</span></span></code></pre></div><h4 id="_8-2-2-约束性能问题" tabindex="-1">8.2.2 约束性能问题 <a class="header-anchor" href="#_8-2-2-约束性能问题" aria-label="Permalink to &quot;8.2.2 约束性能问题&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 问题：约束检查导致写入性能下降</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 场景：高频写入需要唯一性检查</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决方案1：异步约束验证</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT async_unique_email </span></span>
<span class="line"><span class="__shiki_140thh">FOR (u:User) REQUIRE u.email </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">constraintValidation</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;DEFERRED&quot;</span><span class="__shiki_1itgoe">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决方案2：应用层去重 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> 数据库约束</span></span>
<span class="line"><span class="__shiki_21nrsd">// 应用层维护本地唯一性集合</span></span>
<span class="line"><span class="__shiki_21nrsd">// 定期与数据库同步验证</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 解决方案3：分区策略</span></span>
<span class="line"><span class="__shiki_21nrsd">// 根据业务分区，减少冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (u:User </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;alice@example.com&quot;</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> partition</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;A&quot;</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">// 约束可以按分区创建</span></span></code></pre></div><h2 id="九、生产环境实践" tabindex="-1">九、生产环境实践 <a class="header-anchor" href="#九、生产环境实践" aria-label="Permalink to &quot;九、生产环境实践&quot;">​</a></h2><h3 id="_9-1-索引部署策略" tabindex="-1">9.1 索引部署策略 <a class="header-anchor" href="#_9-1-索引部署策略" aria-label="Permalink to &quot;9.1 索引部署策略&quot;">​</a></h3><h4 id="_9-1-1-蓝绿部署中的索引管理" tabindex="-1">9.1.1 蓝绿部署中的索引管理 <a class="header-anchor" href="#_9-1-1-蓝绿部署中的索引管理" aria-label="Permalink to &quot;9.1.1 蓝绿部署中的索引管理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 阶段1：新环境准备</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 在新集群创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX new_person_name_index FOR (p:Person) ON (p.name)</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX new_product_search </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Product) ON EACH [p.name, p.description]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 阶段2：数据同步</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 使用Neo4j迁移工具同步数据</span></span>
<span class="line"><span class="__shiki_21nrsd">// 注意：同步期间索引会自动重建</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 阶段3：切换验证</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 验证新索引性能</span></span>
<span class="line"><span class="__shiki_140thh">PROFILE</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person) </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Test&quot;</span><span class="__shiki_1itgoe"> RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(p)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 阶段4：清理旧索引</span></span>
<span class="line"><span class="__shiki_140thh">DROP INDEX old_person_name_index</span></span></code></pre></div><h4 id="_9-1-2-索引版本管理" tabindex="-1">9.1.2 索引版本管理 <a class="header-anchor" href="#_9-1-2-索引版本管理" aria-label="Permalink to &quot;9.1.2 索引版本管理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 索引命名规范：包含版本和时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> INDEX person_name_idx_v2_20240115 </span></span>
<span class="line"><span class="__shiki_140thh">FOR (p:Person) ON (p.name)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 索引元数据记录</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (meta:IndexMetadata </span><span class="__shiki_1itgoe">{</span></span>
<span class="line"><span class="__shiki_140thh">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;person_name_idx_v2_20240115&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  type</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;BTREE&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  label</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;Person&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  properties</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  created</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> datetime()</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  createdBy</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;deployment-script-v1.2&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  purpose</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;Optimize person lookup by name&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  expectedSize</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;100K-1M nodes&quot;</span><span class="__shiki_1itgoe">,</span></span>
<span class="line"><span class="__shiki_140thh">  maintenanceWindow</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;每月第一个周日&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 索引生命周期管理</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (idx:IndexMetadata)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> idx.created </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> datetime().subtract(Duration.ofDays(</span><span class="__shiki_dzsirb">180</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> idx.name CONTAINS </span><span class="__shiki_mdbnqw">&quot;_v1_&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> idx.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;deprecated&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> idx.name, idx.created</span></span></code></pre></div><h3 id="_9-2-约束实施策略" tabindex="-1">9.2 约束实施策略 <a class="header-anchor" href="#_9-2-约束实施策略" aria-label="Permalink to &quot;9.2 约束实施策略&quot;">​</a></h3><h4 id="_9-2-1-数据迁移中的约束处理" tabindex="-1">9.2.1 数据迁移中的约束处理 <a class="header-anchor" href="#_9-2-1-数据迁移中的约束处理" aria-label="Permalink to &quot;9.2.1 数据迁移中的约束处理&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 迁移前：禁用约束检查</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 注意：Neo4j不支持临时禁用约束，需要策略性处理</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 策略1：分段迁移</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 阶段A：迁移无约束数据</span></span>
<span class="line"><span class="__shiki_1itgoe">LOAD CSV</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;file:///phase1.csv&quot;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> (:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.name</span><span class="__shiki_1itgoe">,</span><span class="__shiki_140thh"> age</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> toInteger(row.age)</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 阶段B：创建约束</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> CONSTRAINT person_name_unique FOR (p:Person) REQUIRE p.name </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_140thh"> UNIQUE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 阶段C：迁移需要约束检查的数据</span></span>
<span class="line"><span class="__shiki_1itgoe">LOAD CSV</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_mdbnqw"> &quot;file:///phase2.csv&quot;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> row</span></span>
<span class="line"><span class="__shiki_1itgoe">MERGE</span><span class="__shiki_140thh"> (p:Person </span><span class="__shiki_1itgoe">{</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> row.name</span><span class="__shiki_1itgoe">}</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> p.age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> toInteger(row.age)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 策略2：应用层预处理</span></span>
<span class="line"><span class="__shiki_21nrsd">// 1. 在应用层验证数据</span></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 批量导入已验证数据</span></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 创建约束</span></span></code></pre></div><h4 id="_9-2-2-约束监控告警" tabindex="-1">9.2.2 约束监控告警 <a class="header-anchor" href="#_9-2-2-约束监控告警" aria-label="Permalink to &quot;9.2.2 约束监控告警&quot;">​</a></h4><div class="language-cypher vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cypher</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 约束违反监控</span></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 定期检查唯一性约束</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> email, </span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">(p) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> persons</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> size(persons) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> apoc.util.sleep(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 避免监控过载</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> email, size(persons) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> duplicateCount</span></span>
<span class="line"><span class="__shiki_21nrsd">// 集成到监控系统，触发告警</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 空值监控</span></span>
<span class="line"><span class="__shiki_1itgoe">MATCH</span><span class="__shiki_140thh"> (p:Person)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> p.email </span><span class="__shiki_1itgoe">IS NULL</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> p.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;active&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> activeUsersWithoutEmail</span></span>
<span class="line"><span class="__shiki_21nrsd">// 阈值告警：如果&gt;10，发送通知</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">--</span><span class="__shiki_140thh"> 约束性能监控</span></span>
<span class="line"><span class="__shiki_21nrsd">// 监控约束检查的写入延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">CALL</span><span class="__shiki_140thh"> db.stats.retrieve(</span><span class="__shiki_mdbnqw">&quot;WRITE OPERATIONS&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">YIELD</span><span class="__shiki_140thh"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> data.operation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;CREATE_NODE&quot;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> data.constraintCheckTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURN</span><span class="__shiki_140thh"> data.timestamp, data.constraintCheckTime</span></span></code></pre></div><hr><h2 id="附录-索引与约束参考速查" tabindex="-1">附录：索引与约束参考速查 <a class="header-anchor" href="#附录-索引与约束参考速查" aria-label="Permalink to &quot;附录：索引与约束参考速查&quot;">​</a></h2><h3 id="索引类型对比表" tabindex="-1">索引类型对比表 <a class="header-anchor" href="#索引类型对比表" aria-label="Permalink to &quot;索引类型对比表&quot;">​</a></h3><table tabindex="0"><thead><tr><th>索引类型</th><th>适用场景</th><th>创建语法示例</th><th>性能特征</th></tr></thead><tbody><tr><td>单属性索引</td><td>等值查询、范围查询</td><td><code>CREATE INDEX FOR (n:Label) ON (n.property)</code></td><td>O(log n)查找</td></tr><tr><td>复合索引</td><td>多条件AND查询</td><td><code>CREATE INDEX FOR (n:Label) ON (n.p1, n.p2)</code></td><td>最左前缀匹配</td></tr><tr><td>全文索引</td><td>文本搜索、模糊匹配</td><td><code>CREATE FULLTEXT INDEX FOR (n:Label) ON EACH [n.text]</code></td><td>基于Lucene，支持评分</td></tr><tr><td>向量索引</td><td>相似度搜索、AI嵌入</td><td><code>CREATE VECTOR INDEX FOR (n:Label) ON (n.embedding)</code></td><td>近似最近邻搜索</td></tr><tr><td>唯一索引</td><td>通过约束自动创建</td><td><code>CREATE CONSTRAINT FOR (n:Label) REQUIRE n.property IS UNIQUE</code></td><td>唯一性保证</td></tr></tbody></table><h3 id="约束类型对比表" tabindex="-1">约束类型对比表 <a class="header-anchor" href="#约束类型对比表" aria-label="Permalink to &quot;约束类型对比表&quot;">​</a></h3><table tabindex="0"><thead><tr><th>约束类型</th><th>作用</th><th>创建语法示例</th><th>注意事项</th></tr></thead><tbody><tr><td>唯一性约束</td><td>保证属性值唯一</td><td><code>CREATE CONSTRAINT REQUIRE property IS UNIQUE</code></td><td>自动创建支持索引</td></tr><tr><td>存在性约束</td><td>保证属性非空</td><td><code>CREATE CONSTRAINT REQUIRE property IS NOT NULL</code></td><td>影响写入性能</td></tr><tr><td>节点键约束</td><td>唯一且非空（主键）</td><td><code>CREATE CONSTRAINT REQUIRE (p1,p2) IS NODE KEY</code></td><td>类似关系型主键</td></tr><tr><td>类型约束</td><td>保证属性类型</td><td><code>CREATE CONSTRAINT REQUIRE property IS INTEGER</code></td><td>Neo4j 5.0+</td></tr><tr><td>范围约束</td><td>保证属性值范围</td><td><code>CREATE CONSTRAINT REQUIRE 0 &lt;= property &lt;= 100</code></td><td>需要应用层支持</td></tr></tbody></table><h3 id="最佳实践清单" tabindex="-1">最佳实践清单 <a class="header-anchor" href="#最佳实践清单" aria-label="Permalink to &quot;最佳实践清单&quot;">​</a></h3><ol><li><strong>索引设计前</strong>：分析查询模式和数据分布</li><li><strong>索引创建时</strong>：监控资源使用，设置合理超时</li><li><strong>索引使用中</strong>：定期监控索引命中率和性能</li><li><strong>索引维护</strong>：定期重建碎片化索引</li><li><strong>约束设计</strong>：平衡数据完整性和性能</li><li><strong>约束实施</strong>：考虑迁移和数据清理策略</li><li><strong>监控告警</strong>：设置索引和约束的监控指标</li><li><strong>文档记录</strong>：维护索引和约束的元数据</li></ol><hr><h2 id="学习资源" tabindex="-1">学习资源 <a class="header-anchor" href="#学习资源" aria-label="Permalink to &quot;学习资源&quot;">​</a></h2><h3 id="官方文档" tabindex="-1">官方文档 <a class="header-anchor" href="#官方文档" aria-label="Permalink to &quot;官方文档&quot;">​</a></h3><ol><li><a href="https://neo4j.com/docs/cypher-manual/current/indexes/" target="_blank" rel="noreferrer">Neo4j Indexes</a></li><li><a href="https://neo4j.com/docs/cypher-manual/current/constraints/" target="_blank" rel="noreferrer">Neo4j Constraints</a></li><li><a href="https://neo4j.com/docs/operations-manual/current/performance/index-configuration/" target="_blank" rel="noreferrer">Index Configuration</a></li></ol><h3 id="工具推荐" tabindex="-1">工具推荐 <a class="header-anchor" href="#工具推荐" aria-label="Permalink to &quot;工具推荐&quot;">​</a></h3><ol><li><strong>Neo4j Browser</strong>：索引和约束的交互管理</li><li><strong>Neo4j Desktop</strong>：本地开发环境</li><li><strong>APOC Library</strong>：高级索引和约束管理</li><li><strong>Prometheus + Grafana</strong>：监控指标可视化</li></ol><h3 id="进阶学习" tabindex="-1">进阶学习 <a class="header-anchor" href="#进阶学习" aria-label="Permalink to &quot;进阶学习&quot;">​</a></h3><ol><li>深入理解B+树和Lucene索引原理</li><li>学习查询优化器如何选择索引</li><li>掌握生产环境索引性能调优</li><li>研究分布式集群中的索引管理</li></ol><hr><p><em>索引与约束是Neo4j性能和数据质量的基石。正确的索引策略可以将查询性能提升几个数量级，而恰当的约束设计可以避免数据混乱和业务逻辑错误。在实际应用中，需要根据具体业务需求、数据特征和系统资源进行权衡和优化。定期审查和调整索引约束策略，是维护高效、稳定图数据库系统的关键。</em></p>`,157)])])}const r=a(_,[["render",l]]);export{d as __pageData,r as default};
