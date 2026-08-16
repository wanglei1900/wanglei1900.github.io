import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"PostgreSQL全文搜索与模糊查询深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/relational/postgres/fulltext-search.md","filePath":"data/database/relational/postgres/fulltext-search.md"}'),p={name:"data/database/relational/postgres/fulltext-search.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="postgresql全文搜索与模糊查询深度解析" tabindex="-1">PostgreSQL全文搜索与模糊查询深度解析 <a class="header-anchor" href="#postgresql全文搜索与模糊查询深度解析" aria-label="Permalink to &quot;PostgreSQL全文搜索与模糊查询深度解析&quot;">​</a></h1><h2 id="一、全文搜索基础与核心概念" tabindex="-1">一、全文搜索基础与核心概念 <a class="header-anchor" href="#一、全文搜索基础与核心概念" aria-label="Permalink to &quot;一、全文搜索基础与核心概念&quot;">​</a></h2><h3 id="_1-1-全文搜索架构概览" tabindex="-1">1.1 全文搜索架构概览 <a class="header-anchor" href="#_1-1-全文搜索架构概览" aria-label="Permalink to &quot;1.1 全文搜索架构概览&quot;">​</a></h3><h4 id="_1-1-1-全文搜索处理流程" tabindex="-1">1.1.1 全文搜索处理流程 <a class="header-anchor" href="#_1-1-1-全文搜索处理流程" aria-label="Permalink to &quot;1.1.1 全文搜索处理流程&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- PostgreSQL全文搜索处理流程</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 文档解析 (Parsing)</span></span>
<span class="line"><span class="__shiki_21nrsd">   原始文本 → 分词器 → 记号流</span></span>
<span class="line"><span class="__shiki_21nrsd">   </span></span>
<span class="line"><span class="__shiki_21nrsd">2. 规范化 (Normalization)</span></span>
<span class="line"><span class="__shiki_21nrsd">   记号流 → 词典处理 → 词位</span></span>
<span class="line"><span class="__shiki_21nrsd">   </span></span>
<span class="line"><span class="__shiki_21nrsd">3. 索引构建</span></span>
<span class="line"><span class="__shiki_21nrsd">   词位 → tsvector类型存储</span></span>
<span class="line"><span class="__shiki_21nrsd">   </span></span>
<span class="line"><span class="__shiki_21nrsd">4. 查询处理</span></span>
<span class="line"><span class="__shiki_21nrsd">   查询文本 → tsquery类型</span></span>
<span class="line"><span class="__shiki_21nrsd">   </span></span>
<span class="line"><span class="__shiki_21nrsd">5. 匹配与排名</span></span>
<span class="line"><span class="__shiki_21nrsd">   tsvector @@ tsquery → 结果排名</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看全文搜索相关系统信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%text%search%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%fuzzy%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%similarity%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看已安装的全文搜索相关扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    extname,</span></span>
<span class="line"><span class="__shiki_140thh">    extversion,</span></span>
<span class="line"><span class="__shiki_140thh">    extrelocatable</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_extension</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> extname </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;pg_trgm&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;fuzzystrmatch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;unaccent&#39;</span><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_1-1-2-核心数据类型对比" tabindex="-1">1.1.2 核心数据类型对比 <a class="header-anchor" href="#_1-1-2-核心数据类型对比" aria-label="Permalink to &quot;1.1.2 核心数据类型对比&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 三种核心文本类型的区别</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. text: 原始文本类型</span></span>
<span class="line"><span class="__shiki_21nrsd">2. tsvector: 分词后的向量表示</span></span>
<span class="line"><span class="__shiki_21nrsd">3. tsquery: 查询表示</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 示例对比</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;The quick brown fox jumps over the lazy dog&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> original_text,</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;The quick brown fox jumps over the lazy dog&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> tsvector_example,</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;quick &amp; fox&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> tsquery_example;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看tsvector结构</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> ts_debug(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;The quick brown fox jumps over the lazy dog&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- tsvector详细结构</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">tsvector格式：</span></span>
<span class="line"><span class="__shiki_21nrsd">&#39;fox&#39;:3 &#39;jump&#39;:5 &#39;lazi&#39;:8 &#39;quick&#39;:2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">组成：</span></span>
<span class="line"><span class="__shiki_21nrsd">- 词位(lexeme): 规范化的词（如&#39;lazi&#39;是&#39;lazy&#39;的词位）</span></span>
<span class="line"><span class="__shiki_21nrsd">- 位置信息：词在原文中的位置（如&#39;fox&#39;:3）</span></span>
<span class="line"><span class="__shiki_21nrsd">- 权重标记：A, B, C, D（默认为D）</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h3 id="_1-2-文本搜索配置" tabindex="-1">1.2 文本搜索配置 <a class="header-anchor" href="#_1-2-文本搜索配置" aria-label="Permalink to &quot;1.2 文本搜索配置&quot;">​</a></h3><h4 id="_1-2-1-配置体系结构" tabindex="-1">1.2.1 配置体系结构 <a class="header-anchor" href="#_1-2-1-配置体系结构" aria-label="Permalink to &quot;1.2.1 配置体系结构&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看现有的文本搜索配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    cfgname,</span></span>
<span class="line"><span class="__shiki_140thh">    cfgnamespace::regnamespace </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> schema</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    cfgparser::regprocedure </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> parser</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_ts_config</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> cfgname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看配置的组件</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    cfgname,</span></span>
<span class="line"><span class="__shiki_140thh">    tok_alias,</span></span>
<span class="line"><span class="__shiki_140thh">    dict_name,</span></span>
<span class="line"><span class="__shiki_140thh">    dict_initoption</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_ts_config_map cm</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_ts_config c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> cm</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">cfgid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_ts_dict d </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> cm</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mapdict</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_ts_token_type tt </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> cm</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">maptokentype</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> tt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tokid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> cfgname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;english&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> tok_alias;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看可用的解析器</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    prsname,</span></span>
<span class="line"><span class="__shiki_140thh">    prsnamespace::regnamespace </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> schema</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    prsstart::regprocedure </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> start_func,</span></span>
<span class="line"><span class="__shiki_140thh">    prstoken::regprocedure </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> token_func,</span></span>
<span class="line"><span class="__shiki_140thh">    prsend::regprocedure </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> end_func,</span></span>
<span class="line"><span class="__shiki_140thh">    prsheadline::regprocedure </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> headline_func,</span></span>
<span class="line"><span class="__shiki_140thh">    prslextype::regprocedure </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> lextype_func</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_ts_parser</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> prsname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看可用的词典</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    dictname,</span></span>
<span class="line"><span class="__shiki_140thh">    dictnamespace::regnamespace </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_1itgoe"> schema</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    dictinitoption</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_ts_dict</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> dictname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看停用词</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    cfgname,</span></span>
<span class="line"><span class="__shiki_140thh">    word</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_ts_config c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_ts_stopword s </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">cfgid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> cfgname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;english&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> word;</span></span></code></pre></div><h4 id="_1-2-2-创建自定义配置" tabindex="-1">1.2.2 创建自定义配置 <a class="header-anchor" href="#_1-2-2-创建自定义配置" aria-label="Permalink to &quot;1.2.2 创建自定义配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 基于现有配置创建自定义配置</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH </span><span class="__shiki_1itgoe">CONFIGURATION</span><span class="__shiki_140thh"> my_english (</span></span>
<span class="line"><span class="__shiki_1itgoe">    COPY</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> english</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建自定义词典</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建同义词词典文件</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd"># my_synonyms.syn</span></span>
<span class="line"><span class="__shiki_21nrsd">postgresql postgres pg</span></span>
<span class="line"><span class="__shiki_21nrsd">database db</span></span>
<span class="line"><span class="__shiki_21nrsd">index idx</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建同义词词典</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH DICTIONARY my_synonyms (</span></span>
<span class="line"><span class="__shiki_140thh">    TEMPLATE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> synonym</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    SYNONYMS </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> my_synonyms</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建词干词典</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH DICTIONARY my_english_stem (</span></span>
<span class="line"><span class="__shiki_140thh">    TEMPLATE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> snowball,</span></span>
<span class="line"><span class="__shiki_1itgoe">    LANGUAGE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> english</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 配置词典映射</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH </span><span class="__shiki_1itgoe">CONFIGURATION</span><span class="__shiki_140thh"> my_english</span></span>
<span class="line"><span class="__shiki_1itgoe">    ALTER</span><span class="__shiki_140thh"> MAPPING </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> asciiword, asciihword, hword_asciipart</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> my_synonyms, my_english_stem, english_stem;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 配置其他词类映射</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH </span><span class="__shiki_1itgoe">CONFIGURATION</span><span class="__shiki_140thh"> my_english</span></span>
<span class="line"><span class="__shiki_1itgoe">    ALTER</span><span class="__shiki_140thh"> MAPPING </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> url</span><span class="__shiki_140thh">, url_path, email, sfloat, </span><span class="__shiki_1itgoe">float</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_1itgoe"> simple</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 测试自定义配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> to_tsvector(</span><span class="__shiki_mdbnqw">&#39;my_english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL database index optimization&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 查看自定义配置详情</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    tt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tok_alias</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dictname</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cm</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mapcfg</span><span class="__shiki_140thh">::regconfig,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cm</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mapdict</span><span class="__shiki_140thh">::regdictionary</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_ts_config_map cm</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_ts_dict d </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> cm</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">mapdict</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_ts_token_type tt </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> cm</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">maptokentype</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> tt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tokid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> mapcfg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;my_english&#39;</span><span class="__shiki_140thh">::regconfig</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> tt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">tok_alias</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 创建主题特定配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 医疗领域配置</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH DICTIONARY medical_terms (</span></span>
<span class="line"><span class="__shiki_140thh">    TEMPLATE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ispell,</span></span>
<span class="line"><span class="__shiki_140thh">    DictFile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> medical,</span></span>
<span class="line"><span class="__shiki_140thh">    AffFile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> medical,</span></span>
<span class="line"><span class="__shiki_140thh">    StopWords </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> medical</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH </span><span class="__shiki_1itgoe">CONFIGURATION</span><span class="__shiki_140thh"> medical_search (</span></span>
<span class="line"><span class="__shiki_140thh">    PARSER </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> default</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH </span><span class="__shiki_1itgoe">CONFIGURATION</span><span class="__shiki_140thh"> medical_search</span></span>
<span class="line"><span class="__shiki_1itgoe">    ALTER</span><span class="__shiki_140thh"> MAPPING </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> word, hword, hword_part</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> medical_terms, english_stem;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 多语言配置管理</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH </span><span class="__shiki_1itgoe">CONFIGURATION</span><span class="__shiki_140thh"> multilingual (</span></span>
<span class="line"><span class="__shiki_140thh">    PARSER </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> default</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 为不同语言设置不同词典映射</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh"> SEARCH </span><span class="__shiki_1itgoe">CONFIGURATION</span><span class="__shiki_140thh"> multilingual</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> MAPPING </span><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> word </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    english_stem, </span><span class="__shiki_1itgoe">simple</span><span class="__shiki_140thh">, french_stem, german_stem;</span></span></code></pre></div><h2 id="二、全文搜索核心功能" tabindex="-1">二、全文搜索核心功能 <a class="header-anchor" href="#二、全文搜索核心功能" aria-label="Permalink to &quot;二、全文搜索核心功能&quot;">​</a></h2><h3 id="_2-1-tsvector与tsquery详解" tabindex="-1">2.1 tsvector与tsquery详解 <a class="header-anchor" href="#_2-1-tsvector与tsquery详解" aria-label="Permalink to &quot;2.1 tsvector与tsquery详解&quot;">​</a></h3><h4 id="_2-1-1-tsvector操作与函数" tabindex="-1">2.1.1 tsvector操作与函数 <a class="header-anchor" href="#_2-1-1-tsvector操作与函数" aria-label="Permalink to &quot;2.1.1 tsvector操作与函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建tsvector的多种方式</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 基本转换</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL is a powerful, open source object-relational database system.&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> basic</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 从多列构建</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(title, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(content, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> from_columns,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 设置权重</span></span>
<span class="line"><span class="__shiki_140thh">    setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Important title&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Regular content&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;B&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> with_weights,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 直接构造</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;databas&#39;</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">1</span><span class="__shiki_mdbnqw"> &#39;object&#39;</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">5</span><span class="__shiki_mdbnqw"> &#39;open&#39;</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">3</span><span class="__shiki_mdbnqw"> &#39;power&#39;</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw"> &#39;relat&#39;</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">6</span><span class="__shiki_mdbnqw"> &#39;sourc&#39;</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">4</span><span class="__shiki_mdbnqw"> &#39;system&#39;</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">::tsvector </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> direct;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. tsvector函数操作</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 连接向量</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;quick brown&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;fox jumps&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> concatenated,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取长度</span></span>
<span class="line"><span class="__shiki_1itgoe">    length</span><span class="__shiki_140thh">(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;quick brown fox&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> vector_length,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 转换为数组</span></span>
<span class="line"><span class="__shiki_140thh">    tsvector_to_array(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;quick brown fox&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> vector_array,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 从数组构建</span></span>
<span class="line"><span class="__shiki_140thh">    array_to_tsvector(</span><span class="__shiki_1itgoe">ARRAY</span><span class="__shiki_140thh">[&#39;brown&#39;, &#39;fox&#39;, &#39;quick&#39;]) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> array_to_vector,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 删除词位</span></span>
<span class="line"><span class="__shiki_140thh">    ts_delete(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;quick brown fox&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;brown&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> deleted,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 过滤词位</span></span>
<span class="line"><span class="__shiki_140thh">    ts_filter(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;quick brown fox&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;{a,b}&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> filtered,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查是否包含词位</span></span>
<span class="line"><span class="__shiki_140thh">    tsvector </span><span class="__shiki_mdbnqw">&#39;quick brown fox&#39;</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> &#39;fox&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> contains_fox;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 高级tsvector操作</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> documents_advanced</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    body </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    tsv TSVECTOR </span><span class="__shiki_1itgoe">GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(title, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(body, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;B&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(metadata</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;keywords&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;C&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ) STORED</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. tsvector统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 词位统计</span></span>
<span class="line"><span class="__shiki_140thh">    ts_stat($$</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> tsv </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> documents_advanced</span></span>
<span class="line"><span class="__shiki_140thh">    $$) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> stat,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 转换为表格形式</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> word, ndoc, nentry </span></span>
<span class="line"><span class="__shiki_1itgoe">     FROM</span><span class="__shiki_140thh"> ts_stat($$</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> tsv </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> documents_advanced</span></span>
<span class="line"><span class="__shiki_140thh">     $$) </span></span>
<span class="line"><span class="__shiki_1itgoe">     ORDER BY</span><span class="__shiki_140thh"> nentry </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">     LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> top_words;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. tsvector清理和标准化</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> normalize_tsvector</span><span class="__shiki_140thh">(tsv tsvector)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> tsvector </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 移除位置信息和权重</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> strip(tsv);</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> normalize_tsvector(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;The quick brown fox&#39;</span><span class="__shiki_140thh">));</span></span></code></pre></div><h4 id="_2-1-2-tsquery操作与函数" tabindex="-1">2.1.2 tsquery操作与函数 <a class="header-anchor" href="#_2-1-2-tsquery操作与函数" aria-label="Permalink to &quot;2.1.2 tsquery操作与函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建tsquery的多种方式</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 基本转换</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; database&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> basic_query,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Web搜索语法</span></span>
<span class="line"><span class="__shiki_140thh">    websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql database &quot;full text search&quot; -mongodb&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> web_query,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 短语搜索</span></span>
<span class="line"><span class="__shiki_140thh">    phraseto_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;full text search&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> phrase_query,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 普通文本转换</span></span>
<span class="line"><span class="__shiki_140thh">    plainto_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;full text search in postgresql&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> plain_query,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 直接构造</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;databas&#39;</span><span class="__shiki_140thh"> &amp; </span><span class="__shiki_mdbnqw">&#39;search&#39;</span><span class="__shiki_140thh">::tsquery </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> direct_query;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. tsquery操作符</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- AND操作符</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">) &amp;&amp; to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> and_query,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- OR操作符</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> or_query,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- NOT操作符</span></span>
<span class="line"><span class="__shiki_140thh">    !!to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;mongodb&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> not_query,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 跟随操作符</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;-&gt;</span><span class="__shiki_140thh"> to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> followed_by,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 距离操作符 (PostgreSQL 9.6+)</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> distance_2;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. tsquery函数操作</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 查询重写</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rewrite(</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; database&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;postgresql&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;postgres&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> rewritten,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 多个重写规则</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rewrite(</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;db &amp; performance&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;SELECT &#39;&#39;db&#39;&#39;::tsquery, &#39;&#39;database&#39;&#39;::tsquery UNION </span></span>
<span class="line"><span class="__shiki_mdbnqw">         SELECT &#39;&#39;performance&#39;&#39;::tsquery, &#39;&#39;optimization&#39;&#39;::tsquery&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> multiple_rewrites,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 查询树操作</span></span>
<span class="line"><span class="__shiki_140thh">    querytree(to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; (database | db)&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_tree,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查空查询</span></span>
<span class="line"><span class="__shiki_140thh">    tsquery_is_empty(to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;stopword&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> is_empty,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取查询中的词位</span></span>
<span class="line"><span class="__shiki_140thh">    tsquery_to_tsvector(to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; database&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_vector;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 高级tsquery构建</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> build_advanced_query</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    search_terms </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    must_include </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    exclude_terms </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    phrase_terms </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> NULL</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> tsquery </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    base_query tsquery;</span></span>
<span class="line"><span class="__shiki_140thh">    must_query tsquery;</span></span>
<span class="line"><span class="__shiki_140thh">    exclude_query tsquery;</span></span>
<span class="line"><span class="__shiki_140thh">    phrase_query tsquery;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 基础查询</span></span>
<span class="line"><span class="__shiki_140thh">    base_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_terms);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 必须包含的术语</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> must_include </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">        must_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, array_to_string(must_include, </span><span class="__shiki_mdbnqw">&#39; &amp; &#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        base_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> base_query &amp;&amp; must_query;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 排除的术语</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> exclude_terms </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">        exclude_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, array_to_string(exclude_terms, </span><span class="__shiki_mdbnqw">&#39; | &#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        base_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> base_query &amp;&amp; !!exclude_query;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 短语搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> phrase_terms </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">        FOREACH phrase </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh"> phrase_terms </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_140thh">            phrase_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> phraseto_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, phrase);</span></span>
<span class="line"><span class="__shiki_140thh">            base_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> base_query &amp;&amp; phrase_query;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> base_query;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 查询优化和缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW tsquery_cache </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query_text,</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cached_query,</span></span>
<span class="line"><span class="__shiki_1itgoe">    now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cached_at</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;postgresql database&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;full text search&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;performance optimization&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> popular_queries(query_text);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 刷新缓存</span></span>
<span class="line"><span class="__shiki_140thh">REFRESH MATERIALIZED VIEW tsquery_cache;</span></span></code></pre></div><h3 id="_2-2-全文搜索匹配与排名" tabindex="-1">2.2 全文搜索匹配与排名 <a class="header-anchor" href="#_2-2-全文搜索匹配与排名" aria-label="Permalink to &quot;2.2 全文搜索匹配与排名&quot;">​</a></h3><h4 id="_2-2-1-匹配操作与优化" tabindex="-1">2.2.1 匹配操作与优化 <a class="header-anchor" href="#_2-2-1-匹配操作与优化" aria-label="Permalink to &quot;2.2.1 匹配操作与优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 基本匹配操作</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 基本匹配</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL is a powerful database&#39;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_140thh">    @@ to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; database&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> basic_match,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 权重敏感匹配</span></span>
<span class="line"><span class="__shiki_140thh">    setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Important: PostgreSQL&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_140thh">    @@ to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> weighted_match,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 短语匹配</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;full text search in postgresql&#39;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_140thh">    @@ phraseto_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;full text search&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> phrase_match,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 距离匹配</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL database system&#39;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_140thh">    @@ (to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;system&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> distance_match;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建测试表和索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> search_documents</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    author </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    category </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    search_vector TSVECTOR </span><span class="__shiki_1itgoe">GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(title, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(content, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;B&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(author, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;C&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(category, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ) STORED</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建GIN索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_gin</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_documents </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(search_vector);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建GIN快速更新索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_gin_fast</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(search_vector) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (fastupdate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建GIST索引（适用于频繁更新的场景）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_gist</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_documents </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIST(search_vector);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 复杂查询示例</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    id,</span></span>
<span class="line"><span class="__shiki_140thh">    title,</span></span>
<span class="line"><span class="__shiki_140thh">    content,</span></span>
<span class="line"><span class="__shiki_140thh">    ts_headline(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, content, </span></span>
<span class="line"><span class="__shiki_140thh">                to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; performance&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;StartSel=&lt;mark&gt;, StopSel=&lt;/mark&gt;, MaxWords=35, MinWords=15&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> headline</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> search_documents</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> search_vector @@ to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; performance&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> category </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;database&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> created_at </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> ts_rank(search_vector, to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; performance&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 多字段搜索优化</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> search_documents_multi_field</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    search_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    field_weights JSONB </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;{&quot;title&quot;: 1.0, &quot;content&quot;: 0.8, &quot;author&quot;: 0.5, &quot;category&quot;: 0.3}&#39;</span><span class="__shiki_140thh">::jsonb,</span></span>
<span class="line"><span class="__shiki_140thh">    categories </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    min_rank </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">05</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    document_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    rank_score </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    matched_fields </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[]</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ts_rank_cd(</span></span>
<span class="line"><span class="__shiki_140thh">            setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                     COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">            setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                     COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">            setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">author</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                     COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">            setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                     COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;category&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">            websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_text)</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> rank_score,</span></span>
<span class="line"><span class="__shiki_1itgoe">        ARRAY</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">) @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_text) </span></span>
<span class="line"><span class="__shiki_1itgoe">                 THEN</span><span class="__shiki_mdbnqw"> &#39;title&#39;</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">) @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_text) </span></span>
<span class="line"><span class="__shiki_1itgoe">                 THEN</span><span class="__shiki_mdbnqw"> &#39;content&#39;</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">author</span><span class="__shiki_140thh">) @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_text) </span></span>
<span class="line"><span class="__shiki_1itgoe">                 THEN</span><span class="__shiki_mdbnqw"> &#39;author&#39;</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">) @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_text) </span></span>
<span class="line"><span class="__shiki_1itgoe">                 THEN</span><span class="__shiki_mdbnqw"> &#39;category&#39;</span><span class="__shiki_1itgoe"> END</span></span>
<span class="line"><span class="__shiki_140thh">        ] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> matched_fields</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> search_documents sd</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                 COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                 COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">author</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                 COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                 COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;category&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    ) @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_text)</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> (categories </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_dzsirb"> sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ANY(categories))</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> ts_rank_cd(</span></span>
<span class="line"><span class="__shiki_140thh">            setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                     COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">            setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                     COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">            setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">author</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                     COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">            setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_dzsirb">                     COALESCE</span><span class="__shiki_140thh">((field_weights</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;category&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_mdbnqw">&quot;char&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">            websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_text)</span></span>
<span class="line"><span class="__shiki_140thh">      ) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> min_rank</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> rank_score </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 分面搜索（Faceted Search）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> faceted_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    search_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    facet_fields </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;category&#39;, &#39;author&#39;]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    result JSONB;</span></span>
<span class="line"><span class="__shiki_140thh">    facet_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    result :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;results&#39;</span><span class="__shiki_140thh">, (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> jsonb_agg(</span></span>
<span class="line"><span class="__shiki_140thh">                jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;id&#39;</span><span class="__shiki_140thh">, id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;title&#39;</span><span class="__shiki_140thh">, title,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;rank&#39;</span><span class="__shiki_140thh">, ts_rank(search_vector, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_query))</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> search_documents</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> search_vector @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_query)</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> ts_rank(search_vector, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, search_query)) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_dzsirb"> 50</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 添加分面数据</span></span>
<span class="line"><span class="__shiki_140thh">    FOREACH facet_field </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh"> facet_fields </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT jsonb_object_agg(facet_value, count) as facets</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM (</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SELECT %I as facet_value, COUNT(*) as count</span></span>
<span class="line"><span class="__shiki_mdbnqw">                FROM search_documents</span></span>
<span class="line"><span class="__shiki_mdbnqw">                WHERE search_vector @@ websearch_to_tsquery(&#39;&#39;english&#39;&#39;, $1)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                GROUP BY %I</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ORDER BY count DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">                LIMIT 10</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ) t</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, facet_field, facet_field)</span></span>
<span class="line"><span class="__shiki_1itgoe">        INTO</span><span class="__shiki_140thh"> facet_record</span></span>
<span class="line"><span class="__shiki_1itgoe">        USING</span><span class="__shiki_140thh"> search_query;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        result :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> jsonb_build_object(facet_field </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;_facets&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">facet_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">facets</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span></code></pre></div><h4 id="_2-2-2-排名算法详解" tabindex="-1">2.2.2 排名算法详解 <a class="header-anchor" href="#_2-2-2-排名算法详解" aria-label="Permalink to &quot;2.2.2 排名算法详解&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 基本排名函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- ts_rank：基于词频和文档频率的排名</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rank(</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL is a powerful database system&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; database&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> basic_rank,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- ts_rank_cd：考虑覆盖密度（Cover Density）</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rank_cd(</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL database system with PostgreSQL features&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cd_rank,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 带权重的排名</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rank(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;{0.1, 0.2, 0.4, 1.0}&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 权重数组：[D-weight, C-weight, B-weight, A-weight]</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Important title&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Regular content&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;title &amp; content&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> weighted_rank;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 自定义排名函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> custom_ranking</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    search_vector tsvector,</span></span>
<span class="line"><span class="__shiki_140thh">    search_query tsquery,</span></span>
<span class="line"><span class="__shiki_140thh">    recency_weight </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    popularity_weight </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    text_weight </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> FLOAT</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    text_score </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    recency_score </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    popularity_score </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 文本相关性得分</span></span>
<span class="line"><span class="__shiki_140thh">    text_score :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ts_rank_cd(search_vector, search_query);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 时间新鲜度得分（基于created_at）</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 这里需要从外部传入created_at，为简化示例假设为参数</span></span>
<span class="line"><span class="__shiki_140thh">    recency_score :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 实际计算应为：1.0 / (EXTRACT(EPOCH FROM now() - created_at) / 86400 + 1)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 受欢迎程度得分（基于views）</span></span>
<span class="line"><span class="__shiki_140thh">    popularity_score :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 实际计算应为：LOG(views + 1)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 综合得分</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> text_weight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> text_score </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">           recency_weight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> recency_score </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">           popularity_weight </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> popularity_score;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 排名优化参数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    unit,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%rank%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要排名参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- ts_rank_weights：排名权重配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- ts_rank_cd_normalization：ts_rank_cd标准化标志</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 排名调优示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 调整排名权重</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> vector,</span></span>
<span class="line"><span class="__shiki_140thh">       ts_rank(</span><span class="__shiki_mdbnqw">&#39;{0.1, 0.2, 0.4, 1.0}&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">               setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_140thh">               to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> rank_with_weights;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 高级排名策略：BM25算法实现</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> bm25_ranking</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    search_vector tsvector,</span></span>
<span class="line"><span class="__shiki_140thh">    search_query tsquery,</span></span>
<span class="line"><span class="__shiki_140thh">    doc_length </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    avg_doc_length </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    total_docs </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    k1 </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    b </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">75</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> FLOAT</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    score </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    term </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    term_freq </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    doc_freq </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    idf </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 遍历查询中的每个词位</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> term </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_140thh"> lexeme </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> tsquery_to_tsvector(search_query) </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 获取词频（在文档中出现的次数）</span></span>
<span class="line"><span class="__shiki_140thh">        term_freq :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> nentry(search_vector, term);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 获取文档频率（需要从全局统计中获取）</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这里简化处理，实际需要从全局统计表查询</span></span>
<span class="line"><span class="__shiki_140thh">        doc_freq :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 假设值</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> term_freq </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> doc_freq </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 计算IDF（逆文档频率）</span></span>
<span class="line"><span class="__shiki_140thh">            idf :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> LOG</span><span class="__shiki_140thh">((total_docs </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> doc_freq </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (doc_freq </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 计算TF（词频）成分</span></span>
<span class="line"><span class="__shiki_140thh">            score :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> idf </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (term_freq </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (k1 </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                     (term_freq </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> k1 </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> b </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> b </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> doc_length </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> avg_doc_length));</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> score;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 创建排名物化视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW document_rankings </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    id,</span></span>
<span class="line"><span class="__shiki_140thh">    title,</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rank_cd(search_vector, to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> postgresql_rank,</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rank_cd(search_vector, to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> database_rank,</span></span>
<span class="line"><span class="__shiki_140thh">    ts_rank_cd(search_vector, to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;performance&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> performance_rank,</span></span>
<span class="line"><span class="__shiki_1itgoe">    now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> computed_at</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> search_documents</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> search_vector @@ to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql | database | performance&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建索引加速排名查询</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_document_rankings</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> document_rankings </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> btree(postgresql_rank </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">, database_rank </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 实时排名更新</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> update_document_ranking</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> TRIGGER </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 删除旧排名</span></span>
<span class="line"><span class="__shiki_1itgoe">    DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> document_rankings </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 插入新排名</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> document_rankings (id, title, postgresql_rank, database_rank, performance_rank, computed_at)</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ts_rank_cd(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">        ts_rank_cd(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">        ts_rank_cd(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;performance&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_1itgoe">        now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TRIGGER</span><span class="__shiki_1t8gfj"> trig_update_ranking</span></span>
<span class="line"><span class="__shiki_1itgoe">AFTER</span><span class="__shiki_1itgoe"> INSERT</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> UPDATE</span><span class="__shiki_140thh"> OF title, content, search_vector </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> search_documents</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> EACH </span><span class="__shiki_1itgoe">ROW</span></span>
<span class="line"><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_140thh"> update_document_ranking();</span></span></code></pre></div><h3 id="_2-3-高亮与摘要功能" tabindex="-1">2.3 高亮与摘要功能 <a class="header-anchor" href="#_2-3-高亮与摘要功能" aria-label="Permalink to &quot;2.3 高亮与摘要功能&quot;">​</a></h3><h4 id="_2-3-1-ts-headline高级应用" tabindex="-1">2.3.1 ts_headline高级应用 <a class="header-anchor" href="#_2-3-1-ts-headline高级应用" aria-label="Permalink to &quot;2.3.1 ts_headline高级应用&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 基本高亮功能</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    ts_headline(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;english&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;PostgreSQL is a powerful, open source object-relational database system.&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql &amp; database&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;StartSel=&lt;mark&gt;, StopSel=&lt;/mark&gt;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> basic_headline;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 高级高亮选项</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 控制片段数量</span></span>
<span class="line"><span class="__shiki_140thh">    ts_headline(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;english&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        content,</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;MaxFragments=3, FragmentDelimiter=&quot; ... &quot;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> multi_fragment,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 控制片段长度</span></span>
<span class="line"><span class="__shiki_140thh">    ts_headline(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;english&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        content,</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;MaxWords=25, MinWords=15&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> controlled_length,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 短查询优化</span></span>
<span class="line"><span class="__shiki_140thh">    ts_headline(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;english&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        content,</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;pg&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;ShortWord=3&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> short_word_highlight,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 高亮所有词</span></span>
<span class="line"><span class="__shiki_140thh">    ts_headline(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;english&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        content,</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql database&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;HighlightAll=true&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> highlight_all</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_mdbnqw"> &#39;PostgreSQL, often simply Postgres, is an object-relational database management system.&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> content) t;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 自定义高亮函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> smart_headline</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    config regconfig,</span></span>
<span class="line"><span class="__shiki_140thh">    document </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query tsquery,</span></span>
<span class="line"><span class="__shiki_140thh">    options </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    default_options </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    final_options </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    headline_result </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 根据文档长度选择默认选项</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_1itgoe"> length</span><span class="__shiki_140thh">(document) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            default_options :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;MaxFragments=1, MaxWords=50, MinWords=20&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_1itgoe"> length</span><span class="__shiki_140thh">(document) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            default_options :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;MaxFragments=2, MaxWords=30, MinWords=15&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span></span>
<span class="line"><span class="__shiki_140thh">            default_options :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;MaxFragments=3, MaxWords=25, MinWords=10&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 合并选项</span></span>
<span class="line"><span class="__shiki_140thh">    final_options :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> default_options;</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> options </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">        final_options :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> final_options </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;, &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> options;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 应用高亮</span></span>
<span class="line"><span class="__shiki_140thh">    headline_result :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ts_headline(config, document, query, final_options);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 如果没有高亮内容，返回前N个字符</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> headline_result </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> headline_result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_dzsirb"> substring</span><span class="__shiki_140thh">(document </span><span class="__shiki_1itgoe">from</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> for</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;...&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> headline_result;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 多语言高亮支持</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> multilingual_headline</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    document </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    language_code </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;english&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> ts_headline(</span></span>
<span class="line"><span class="__shiki_140thh">        language_code::regconfig,</span></span>
<span class="line"><span class="__shiki_140thh">        document,</span></span>
<span class="line"><span class="__shiki_140thh">        websearch_to_tsquery(language_code::regconfig, query),</span></span>
<span class="line"><span class="__shiki_dzsirb">        format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;StartSel=&lt;mark class=&quot;%s&quot;&gt;, StopSel=&lt;/mark&gt;&#39;</span><span class="__shiki_140thh">, language_code)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 高亮缓存系统</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> headline_cache</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    cache_key </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    document_hash </span><span class="__shiki_1itgoe">BYTEA</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_hash </span><span class="__shiki_1itgoe">BYTEA</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    config_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    options </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    headline </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    accessed_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    access_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> get_cached_headline</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_config regconfig,</span></span>
<span class="line"><span class="__shiki_140thh">    p_document </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_query tsquery,</span></span>
<span class="line"><span class="__shiki_140thh">    p_options </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_cache_key </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_document_hash </span><span class="__shiki_1itgoe">bytea</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_hash </span><span class="__shiki_1itgoe">bytea</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_cached_headline </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 生成哈希键</span></span>
<span class="line"><span class="__shiki_140thh">    v_document_hash :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> digest</span><span class="__shiki_140thh">(p_document, </span><span class="__shiki_mdbnqw">&#39;sha256&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_hash :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> digest</span><span class="__shiki_140thh">(p_query::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sha256&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    v_cache_key :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> encode(v_document_hash, </span><span class="__shiki_mdbnqw">&#39;hex&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;:&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> encode(v_query_hash, </span><span class="__shiki_mdbnqw">&#39;hex&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 尝试获取缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> headline </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_cached_headline</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> headline_cache</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_cache_key</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> config_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_config::</span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> options </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_options;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> FOUND </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 更新访问统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        UPDATE</span><span class="__shiki_140thh"> headline_cache </span></span>
<span class="line"><span class="__shiki_1itgoe">        SET</span><span class="__shiki_140thh"> accessed_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">            access_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> access_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_cache_key;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> v_cached_headline;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 生成新高亮并缓存</span></span>
<span class="line"><span class="__shiki_140thh">    v_cached_headline :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ts_headline(p_config, p_document, p_query, p_options);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> headline_cache </span></span>
<span class="line"><span class="__shiki_140thh">        (cache_key, document_hash, query_hash, config_name, options, headline)</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        (v_cache_key, v_document_hash, v_query_hash, p_config::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, p_options, v_cached_headline)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ON</span><span class="__shiki_140thh"> CONFLICT (cache_key) DO </span><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_1itgoe"> SET</span></span>
<span class="line"><span class="__shiki_140thh">        headline </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">headline</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        accessed_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        access_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> headline_cache</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">access_count</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> v_cached_headline;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 高亮质量评估</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> evaluate_headline_quality</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    headline </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query tsquery</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> float</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    highlight_count </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    total_words </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    query_terms </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算高亮标记数量</span></span>
<span class="line"><span class="__shiki_140thh">    highlight_count :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> regexp_matches(headline, </span><span class="__shiki_mdbnqw">&#39;&lt;mark[^&gt;]*&gt;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;g&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算总词数</span></span>
<span class="line"><span class="__shiki_140thh">    total_words :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> array_length(regexp_split_to_array(headline, </span><span class="__shiki_mdbnqw">&#39;\\s+&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取查询词</span></span>
<span class="line"><span class="__shiki_140thh">    query_terms :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> lexeme </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> tsquery_to_tsvector(query)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算质量分数（简化版）</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> total_words </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_140thh"> highlight_count::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> total_words::</span><span class="__shiki_1itgoe">float</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span></code></pre></div><h2 id="三、模糊查询与相似度搜索" tabindex="-1">三、模糊查询与相似度搜索 <a class="header-anchor" href="#三、模糊查询与相似度搜索" aria-label="Permalink to &quot;三、模糊查询与相似度搜索&quot;">​</a></h2><h3 id="_3-1-pg-trgm扩展深度解析" tabindex="-1">3.1 pg_trgm扩展深度解析 <a class="header-anchor" href="#_3-1-pg-trgm扩展深度解析" aria-label="Permalink to &quot;3.1 pg_trgm扩展深度解析&quot;">​</a></h3><h4 id="_3-1-1-三元组基础与配置" tabindex="-1">3.1.1 三元组基础与配置 <a class="header-anchor" href="#_3-1-1-三元组基础与配置" aria-label="Permalink to &quot;3.1.1 三元组基础与配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 启用pg_trgm扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pg_trgm;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 查看扩展配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%trgm%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 重要参数：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- pg_trgm.similarity_threshold：相似度阈值（默认0.3）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- pg_trgm.word_similarity_threshold：词相似度阈值（默认0.6）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- pg_trgm.strict_word_similarity_threshold：严格词相似度阈值（默认0.5）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 三元组基础操作</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 显示三元组</span></span>
<span class="line"><span class="__shiki_140thh">    show_trgm(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> trigrams,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算相似度</span></span>
<span class="line"><span class="__shiki_140thh">    similarity(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Postgres&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> similarity_score,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 词相似度</span></span>
<span class="line"><span class="__shiki_140thh">    word_similarity(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL database&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Postgres db&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> word_sim,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 严格词相似度</span></span>
<span class="line"><span class="__shiki_140thh">    strict_word_similarity(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Postgres SQL&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> strict_word_sim,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 包含操作</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;PostgreSQL&#39;</span><span class="__shiki_140thh"> % </span><span class="__shiki_mdbnqw">&#39;Postgres&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> similarity_match,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 词包含操作</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;PostgreSQL database&#39;</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh">% </span><span class="__shiki_mdbnqw">&#39;Postgres&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> word_similarity_match,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 严格词包含操作</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;PostgreSQL&#39;</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_140thh">% </span><span class="__shiki_mdbnqw">&#39;Postgres SQL&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> strict_word_similarity_match;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 自定义三元组函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> advanced_trgm_operations</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    text1 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    text2 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    case_sensitive </span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> false</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    trigrams1 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[],</span></span>
<span class="line"><span class="__shiki_140thh">    trigrams2 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[],</span></span>
<span class="line"><span class="__shiki_140thh">    common_trigrams </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[],</span></span>
<span class="line"><span class="__shiki_140thh">    jaccard_similarity </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    dice_similarity </span><span class="__shiki_1itgoe">float</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    t1 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> case_sensitive </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_140thh"> text1 </span><span class="__shiki_1itgoe">ELSE</span><span class="__shiki_dzsirb"> lower</span><span class="__shiki_140thh">(text1) </span><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    t2 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> case_sensitive </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_140thh"> text2 </span><span class="__shiki_1itgoe">ELSE</span><span class="__shiki_dzsirb"> lower</span><span class="__shiki_140thh">(text2) </span><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    tg1 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">    tg2 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    tg1 :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> show_trgm(t1);</span></span>
<span class="line"><span class="__shiki_140thh">    tg2 :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> show_trgm(t2);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    trigrams1 :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tg1;</span></span>
<span class="line"><span class="__shiki_140thh">    trigrams2 :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tg2;</span></span>
<span class="line"><span class="__shiki_140thh">    common_trigrams :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> unnest(tg1)</span></span>
<span class="line"><span class="__shiki_1itgoe">        INTERSECT</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> unnest(tg2)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Jaccard相似度 = |A ∩ B| / |A ∪ B|</span></span>
<span class="line"><span class="__shiki_140thh">    jaccard_similarity :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        array_length(common_trigrams, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        array_length(</span><span class="__shiki_1itgoe">ARRAY</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> unnest(tg1)</span></span>
<span class="line"><span class="__shiki_1itgoe">            UNION</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> unnest(tg2)</span></span>
<span class="line"><span class="__shiki_140thh">        ), </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Dice相似度 = 2 * |A ∩ B| / (|A| + |B|)</span></span>
<span class="line"><span class="__shiki_140thh">    dice_similarity :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> array_length(common_trigrams, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        (array_length(tg1, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> array_length(tg2, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 三元组索引类型</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建测试表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> products_trgm</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    description</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    category </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    search_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        product_name </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">description</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(category, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ) STORED</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- GIST索引（推荐用于模糊搜索）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_products_gist_trgm</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIST (search_text gist_trgm_ops);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- GIN索引（适用于频繁更新的场景）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_products_gin_trgm</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN (search_text gin_trgm_ops);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 复合索引（多列）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_products_composite_trgm</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIST (product_name gist_trgm_ops, </span><span class="__shiki_1itgoe">description</span><span class="__shiki_140thh"> gist_trgm_ops);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 索引优化参数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 调整填充因子</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_products_optimized</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIST (search_text gist_trgm_ops) </span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (buffering </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> auto</span><span class="__shiki_140thh">, fillfactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 70</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 并行索引创建</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> CONCURRENTLY</span><span class="__shiki_140thh"> idx_products_concurrent </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIST (search_text gist_trgm_ops);</span></span></code></pre></div><h4 id="_3-1-2-高级模糊查询技巧" tabindex="-1">3.1.2 高级模糊查询技巧 <a class="header-anchor" href="#_3-1-2-高级模糊查询技巧" aria-label="Permalink to &quot;3.1.2 高级模糊查询技巧&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 基本模糊查询模式</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    product_name,</span></span>
<span class="line"><span class="__shiki_140thh">    similarity(product_name, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL Book&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> sim_score</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> products_trgm</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> product_name % </span><span class="__shiki_mdbnqw">&#39;PostgreSQL Book&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> sim_score </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 词相似度查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    product_name,</span></span>
<span class="line"><span class="__shiki_140thh">    word_similarity(product_name, </span><span class="__shiki_mdbnqw">&#39;SQL database&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> word_sim</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> products_trgm</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> product_name </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">% </span><span class="__shiki_mdbnqw">&#39;SQL database&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> word_sim </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 多字段模糊搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> fuzzy_search_products</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    search_term </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    min_similarity </span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    limit_results </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    product_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    description</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    overall_similarity </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    name_similarity </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    desc_similarity </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    category_similarity </span><span class="__shiki_1itgoe">float</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 综合相似度（加权）</span></span>
<span class="line"><span class="__shiki_140thh">        (</span></span>
<span class="line"><span class="__shiki_140thh">            similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_140thh">            similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_140thh">            similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> overall_similarity,</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> name_sim,</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> desc_sim,</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> category_sim</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> products_trgm p</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 任意字段满足最小相似度</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> min_similarity </span><span class="__shiki_1itgoe">OR</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> min_similarity </span><span class="__shiki_1itgoe">OR</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> min_similarity</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> overall_similarity </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_140thh"> limit_results;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 模糊自动补全</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> fuzzy_autocomplete</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    prefix </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    field_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;product_name&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    limit_suggestions </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    suggestion </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    similarity_score </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_field </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            %I as suggestion,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            similarity(%I, $1) as similarity_score,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            %L as source_field</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM products_trgm</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE %I %% $1</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY similarity_score DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT $2</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">, field_name, field_name, field_name, field_name)</span></span>
<span class="line"><span class="__shiki_1itgoe">    USING</span><span class="__shiki_140thh"> prefix, limit_suggestions;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 模糊连接（Fuzzy Join）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> fuzzy_join_tables</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    similarity_threshold </span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    table1_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table1_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table2_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table2_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    match_similarity </span><span class="__shiki_1itgoe">float</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        p1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        p1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        p2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        p2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(</span><span class="__shiki_dzsirb">p1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">p2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> match_score</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> products_trgm p1</span></span>
<span class="line"><span class="__shiki_1itgoe">    CROSS JOIN</span><span class="__shiki_140thh"> products_trgm p2</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> p1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> p2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_21nrsd">  -- 避免重复和自连接</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> similarity(</span><span class="__shiki_dzsirb">p1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">p2</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> similarity_threshold</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> match_score </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 模糊分组（消除重复）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> fuzzy_group_products</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    similarity_threshold </span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">7</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    group_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    canonical_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_count </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_names </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[]</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    product_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    matched_group_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建临时表存储分组</span></span>
<span class="line"><span class="__shiki_1itgoe">    CREATE</span><span class="__shiki_140thh"> TEMP </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> product_groups (</span></span>
<span class="line"><span class="__shiki_140thh">        group_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        canonical_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        product_ids </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">[],</span></span>
<span class="line"><span class="__shiki_140thh">        product_names </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[]</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_1itgoe"> COMMIT</span><span class="__shiki_1itgoe"> DROP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 处理每个产品</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> product_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> id, product_name </span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_1itgoe"> length</span><span class="__shiki_140thh">(product_name) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_21nrsd">  -- 从最长的开始</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 查找匹配的组</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> group_id </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> matched_group_id</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> product_groups</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> similarity(canonical_name, </span><span class="__shiki_dzsirb">product_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> similarity_threshold</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> matched_group_id </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 创建新组</span></span>
<span class="line"><span class="__shiki_1itgoe">            INSERT INTO</span><span class="__shiki_140thh"> product_groups (canonical_name, product_ids, product_names)</span></span>
<span class="line"><span class="__shiki_1itgoe">            VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">                product_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                ARRAY</span><span class="__shiki_140thh">[product_record.id],</span></span>
<span class="line"><span class="__shiki_1itgoe">                ARRAY</span><span class="__shiki_140thh">[product_record.product_name]</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 添加到现有组</span></span>
<span class="line"><span class="__shiki_1itgoe">            UPDATE</span><span class="__shiki_140thh"> product_groups</span></span>
<span class="line"><span class="__shiki_1itgoe">            SET</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                product_ids </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> product_ids </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> product_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                product_names </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> product_names </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> product_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> group_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> matched_group_id;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 返回结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        group_id,</span></span>
<span class="line"><span class="__shiki_140thh">        canonical_name,</span></span>
<span class="line"><span class="__shiki_140thh">        array_length(product_ids, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> product_count,</span></span>
<span class="line"><span class="__shiki_140thh">        product_names</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> product_groups</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> product_count </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 性能优化：模糊查询缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fuzzy_query_cache</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    query_hash </span><span class="__shiki_1itgoe">bytea</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    search_term </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    search_field </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    threshold </span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    results jsonb </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    accessed_at </span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    access_count </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    expires_at </span><span class="__shiki_1itgoe">timestamp</span><span class="__shiki_1itgoe"> GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (created_at </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span><span class="__shiki_140thh">) STORED</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> cached_fuzzy_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_search_term </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_search_field </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;product_name&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_threshold </span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_limit </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> jsonb </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_hash </span><span class="__shiki_1itgoe">bytea</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_cached_results jsonb;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算查询哈希</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_hash :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> digest</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        p_search_term </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;|&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> p_search_field </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;|&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> p_threshold::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;|&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> p_limit::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;sha256&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> results </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_cached_results</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fuzzy_query_cache</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> query_hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_query_hash</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> expires_at </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> v_cached_results </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 更新访问统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        UPDATE</span><span class="__shiki_140thh"> fuzzy_query_cache</span></span>
<span class="line"><span class="__shiki_1itgoe">        SET</span><span class="__shiki_140thh"> accessed_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            access_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> access_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> query_hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_query_hash;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> v_cached_results;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 执行新查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT jsonb_agg(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;&#39;id&#39;&#39;, id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;&#39;name&#39;&#39;, %I,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;&#39;similarity&#39;&#39;, similarity(%I, $1)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM products_trgm</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE similarity(%I, $1) &gt;= $2</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY similarity(%I, $1) DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT $3</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">, p_search_field, p_search_field, p_search_field, p_search_field)</span></span>
<span class="line"><span class="__shiki_1itgoe">    INTO</span><span class="__shiki_140thh"> v_cached_results</span></span>
<span class="line"><span class="__shiki_1itgoe">    USING</span><span class="__shiki_140thh"> p_search_term, p_threshold, p_limit;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 存储到缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> fuzzy_query_cache (query_hash, search_term, search_field, threshold, results)</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (v_query_hash, p_search_term, p_search_field, p_threshold, v_cached_results)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ON</span><span class="__shiki_140thh"> CONFLICT (query_hash) DO </span><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_1itgoe"> SET</span></span>
<span class="line"><span class="__shiki_140thh">        results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">results</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        accessed_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        access_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> v_cached_results;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h3 id="_3-2-其他模糊匹配技术" tabindex="-1">3.2 其他模糊匹配技术 <a class="header-anchor" href="#_3-2-其他模糊匹配技术" aria-label="Permalink to &quot;3.2 其他模糊匹配技术&quot;">​</a></h3><h4 id="_3-2-1-fuzzystrmatch扩展" tabindex="-1">3.2.1 fuzzystrmatch扩展 <a class="header-anchor" href="#_3-2-1-fuzzystrmatch扩展" aria-label="Permalink to &quot;3.2.1 fuzzystrmatch扩展&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 启用fuzzystrmatch扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> fuzzystrmatch;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 编辑距离算法</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Levenshtein距离（插入、删除、替换的代价）</span></span>
<span class="line"><span class="__shiki_140thh">    levenshtein(</span><span class="__shiki_mdbnqw">&#39;kitten&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sitting&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> levenshtein_dist,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 带代价的Levenshtein距离</span></span>
<span class="line"><span class="__shiki_140thh">    levenshtein_less_equal(</span><span class="__shiki_mdbnqw">&#39;kitten&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sitting&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> limited_levenshtein,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Damerau-Levenshtein距离（允许相邻字符交换）</span></span>
<span class="line"><span class="__shiki_140thh">    levenshtein(</span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> damerau_levenshtein;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 语音匹配算法</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Soundex（英语语音算法）</span></span>
<span class="line"><span class="__shiki_dzsirb">    soundex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Robert&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">soundex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Rupert&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">    difference</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Robert&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Rupert&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> soundex_diff,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Metaphone（改进的英语语音算法）</span></span>
<span class="line"><span class="__shiki_140thh">    metaphone(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> metaphone_code,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- Double Metaphone（更精确的英语语音算法）</span></span>
<span class="line"><span class="__shiki_140thh">    dmetaphone(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> dmetaphone_primary,</span></span>
<span class="line"><span class="__shiki_140thh">    dmetaphone_alt(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> dmetaphone_alternate;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 高级模糊匹配函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> advanced_fuzzy_match</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    text1 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    text2 </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    algorithm</span><span class="__shiki_1itgoe"> text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;composite&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    algorithm_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    score </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    normalized_score </span><span class="__shiki_1itgoe">float</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 综合多种算法的匹配</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;levenshtein&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        levenshtein(text1, text2)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> (levenshtein(text1, text2)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> greatest</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(text1), </span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(text2))::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;soundex&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        difference</span><span class="__shiki_140thh">(text1, text2)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        difference</span><span class="__shiki_140thh">(text1, text2)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;trigram&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(text1, text2),</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(text1, text2)</span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;composite&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> (levenshtein(text1, text2)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> greatest</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(text1), </span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(text2))::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">difference</span><span class="__shiki_140thh">(text1, text2)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_140thh">            similarity(text1, text2) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> (levenshtein(text1, text2)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> greatest</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(text1), </span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(text2))::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">difference</span><span class="__shiki_140thh">(text1, text2)::</span><span class="__shiki_1itgoe">float</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_140thh">            similarity(text1, text2) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql IMMUTABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 模糊匹配索引优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建基于Metaphone的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_products_metaphone</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> btree (metaphone(product_name, </span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 基于编辑距离的快速筛选</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> fast_levenshtein_filter</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    search_term </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    max_distance </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    product_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    levenshtein_distance </span><span class="__shiki_1itgoe">integer</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        levenshtein(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, search_term)</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> products_trgm p</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 快速预筛选：长度差异不能太大</span></span>
<span class="line"><span class="__shiki_dzsirb">        abs</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_1itgoe"> length</span><span class="__shiki_140thh">(search_term)) </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> max_distance </span><span class="__shiki_1itgoe">AND</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 使用三元组预筛选</span></span>
<span class="line"><span class="__shiki_140thh">        similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> levenshtein(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, search_term)</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span></code></pre></div><h4 id="_3-2-2-正则表达式模糊匹配" tabindex="-1">3.2.2 正则表达式模糊匹配 <a class="header-anchor" href="#_3-2-2-正则表达式模糊匹配" aria-label="Permalink to &quot;3.2.2 正则表达式模糊匹配&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 基本正则表达式匹配</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    product_name,</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 简单模式匹配</span></span>
<span class="line"><span class="__shiki_140thh">    product_name ~ </span><span class="__shiki_mdbnqw">&#39;^Post.*SQL&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> starts_with_post,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 不区分大小写匹配</span></span>
<span class="line"><span class="__shiki_140thh">    product_name ~</span><span class="__shiki_1itgoe">*</span><span class="__shiki_mdbnqw"> &#39;postgresql&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> case_insensitive,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 否定匹配</span></span>
<span class="line"><span class="__shiki_140thh">    product_name !~ </span><span class="__shiki_mdbnqw">&#39;^[0-9]&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> not_starts_with_digit,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 复杂模式</span></span>
<span class="line"><span class="__shiki_140thh">    product_name ~ </span><span class="__shiki_mdbnqw">&#39;(Postgres|PostgreSQL).*(Database|DB)&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> complex_pattern</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> products_trgm</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 正则表达式函数</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 提取匹配部分</span></span>
<span class="line"><span class="__shiki_140thh">    regexp_match(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL 14.5 released&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL (\\d+\\.\\d+)&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> version_match,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 替换</span></span>
<span class="line"><span class="__shiki_140thh">    regexp_replace(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL database&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;DBMS&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> replaced,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分割为数组</span></span>
<span class="line"><span class="__shiki_140thh">    regexp_split_to_array(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL,MySQL,Oracle&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> db_array,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分割为表格</span></span>
<span class="line"><span class="__shiki_140thh">    regexp_split_to_table(</span><span class="__shiki_mdbnqw">&#39;PostgreSQL MySQL Oracle&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;\\s+&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> db_name;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 模糊正则表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> fuzzy_regexp_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    search_term </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    max_errors </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    product_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    match_pattern </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    pattern </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 构建容错正则表达式</span></span>
<span class="line"><span class="__shiki_140thh">    pattern :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">..</span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(search_term) </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            pattern :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pattern </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;[^&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> substring</span><span class="__shiki_140thh">(search_term </span><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> i</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> for</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;]?&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        pattern :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pattern </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> substring</span><span class="__shiki_140thh">(search_term </span><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">for</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 添加可选的错误字符</span></span>
<span class="line"><span class="__shiki_140thh">    pattern :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> replace</span><span class="__shiki_140thh">(pattern, </span><span class="__shiki_mdbnqw">&#39;?&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;{0,&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> max_errors::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;}&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        pattern</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> products_trgm p</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh"> ~</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> pattern</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, search_term) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 正则表达式索引</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建表达式索引支持特定模式</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_products_version</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> btree ((regexp_match(product_name, </span><span class="__shiki_mdbnqw">&#39;(\\d+\\.\\d+\\.\\d+)&#39;</span><span class="__shiki_140thh">)));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 正则表达式性能优化</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (ANALYZE, BUFFERS)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> product_name</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> products_trgm</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> product_name ~ </span><span class="__shiki_mdbnqw">&#39;^PostgreSQL [0-9]+\\.[0-9]+&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用前缀索引优化正则表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_products_prefix</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> products_trgm </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> btree (</span><span class="__shiki_dzsirb">left</span><span class="__shiki_140thh">(product_name, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 正则表达式与全文搜索结合</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> regexp_fulltext_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    regexp_pattern </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    fulltext_query </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    product_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_name </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    fulltext_rank </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    regexp_match </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ts_rank(</span></span>
<span class="line"><span class="__shiki_140thh">            to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, fulltext_query)</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> rank,</span></span>
<span class="line"><span class="__shiki_140thh">        (regexp_matches(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, regexp_pattern))[1] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> matched_part</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> products_trgm p</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh"> ~ regexp_pattern</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_140thh">          @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, fulltext_query)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> rank </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span></code></pre></div><h2 id="四、全文搜索与模糊查询的集成应用" tabindex="-1">四、全文搜索与模糊查询的集成应用 <a class="header-anchor" href="#四、全文搜索与模糊查询的集成应用" aria-label="Permalink to &quot;四、全文搜索与模糊查询的集成应用&quot;">​</a></h2><h3 id="_4-1-智能搜索系统" tabindex="-1">4.1 智能搜索系统 <a class="header-anchor" href="#_4-1-智能搜索系统" aria-label="Permalink to &quot;4.1 智能搜索系统&quot;">​</a></h3><h4 id="_4-1-1-混合搜索策略" tabindex="-1">4.1.1 混合搜索策略 <a class="header-anchor" href="#_4-1-1-混合搜索策略" aria-label="Permalink to &quot;4.1.1 混合搜索策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建智能搜索函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> intelligent_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    user_query </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    search_mode </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;auto&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- auto, exact, fuzzy, fulltext</span></span>
<span class="line"><span class="__shiki_140thh">    result_limit </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    result_id </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    result_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    relevance_score </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    match_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[],</span></span>
<span class="line"><span class="__shiki_140thh">    highlighted_content </span><span class="__shiki_1itgoe">text</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_tsquery tsquery;</span></span>
<span class="line"><span class="__shiki_140thh">    v_fuzzy_threshold </span><span class="__shiki_1itgoe">float</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_length </span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_length :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> length</span><span class="__shiki_140thh">(user_query);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 自动检测搜索模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> search_mode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;auto&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> v_query_length </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            search_mode :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;exact&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        ELSIF v_query_length </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            search_mode :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;fulltext&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        ELSIF user_query ~ </span><span class="__shiki_mdbnqw">&#39;[^a-zA-Z0-9\\s]&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            search_mode :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;exact&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span></span>
<span class="line"><span class="__shiki_140thh">            search_mode :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;hybrid&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 根据不同模式执行搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> search_mode</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;exact&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;product&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> relevance,</span></span>
<span class="line"><span class="__shiki_1itgoe">                ARRAY</span><span class="__shiki_140thh">[&#39;exact&#39;] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> match_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">                p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> highlighted</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> products_trgm p</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh"> ILIKE </span><span class="__shiki_mdbnqw">&#39;%&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> user_query </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;document&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                ARRAY</span><span class="__shiki_140thh">[&#39;exact&#39;],</span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> search_documents d</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh"> ILIKE </span><span class="__shiki_mdbnqw">&#39;%&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> user_query </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> relevance </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_140thh"> result_limit;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;fuzzy&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            v_fuzzy_threshold :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> v_query_length </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_140thh"> v_query_length </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;product&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, user_query) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> relevance,</span></span>
<span class="line"><span class="__shiki_1itgoe">                ARRAY</span><span class="__shiki_140thh">[&#39;fuzzy&#39;] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> match_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">                p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> highlighted</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> products_trgm p</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh"> % user_query</span></span>
<span class="line"><span class="__shiki_1itgoe">               OR</span><span class="__shiki_140thh"> similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, user_query) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> v_fuzzy_threshold</span></span>
<span class="line"><span class="__shiki_1itgoe">            UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;document&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                similarity(</span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">, user_query),</span></span>
<span class="line"><span class="__shiki_1itgoe">                ARRAY</span><span class="__shiki_140thh">[&#39;fuzzy&#39;],</span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> search_documents d</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh"> % user_query</span></span>
<span class="line"><span class="__shiki_1itgoe">               OR</span><span class="__shiki_140thh"> similarity(</span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">, user_query) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> v_fuzzy_threshold</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> relevance </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_140thh"> result_limit;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;fulltext&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            v_tsquery :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, user_query);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;document&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                ts_rank_cd(</span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, v_tsquery) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> relevance,</span></span>
<span class="line"><span class="__shiki_1itgoe">                ARRAY</span><span class="__shiki_140thh">[&#39;fulltext&#39;],</span></span>
<span class="line"><span class="__shiki_140thh">                ts_headline(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">, v_tsquery, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                           &#39;StartSel=&lt;mark&gt;, StopSel=&lt;/mark&gt;, MaxWords=30&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> search_documents d</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh"> @@ v_tsquery</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> relevance </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_140thh"> result_limit;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;hybrid&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">            v_tsquery :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, user_query);</span></span>
<span class="line"><span class="__shiki_140thh">            v_fuzzy_threshold :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">            WITH</span><span class="__shiki_140thh"> ranked_results </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 全文搜索结果</span></span>
<span class="line"><span class="__shiki_1itgoe">                SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;document&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> result_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> content,</span></span>
<span class="line"><span class="__shiki_140thh">                    ts_rank_cd(</span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, v_tsquery) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> relevance,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    ARRAY</span><span class="__shiki_140thh">[&#39;fulltext&#39;] </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> match_type,</span></span>
<span class="line"><span class="__shiki_140thh">                    ts_headline(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">, v_tsquery, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                               &#39;StartSel=&lt;mark&gt;, StopSel=&lt;/mark&gt;, MaxWords=30&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> highlighted,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    1</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> source_priority</span></span>
<span class="line"><span class="__shiki_1itgoe">                FROM</span><span class="__shiki_140thh"> search_documents d</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHERE</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh"> @@ v_tsquery</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 模糊搜索结果</span></span>
<span class="line"><span class="__shiki_1itgoe">                SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                    p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;product&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, user_query) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    ARRAY</span><span class="__shiki_140thh">[&#39;fuzzy&#39;],</span></span>
<span class="line"><span class="__shiki_dzsirb">                    p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    2</span></span>
<span class="line"><span class="__shiki_1itgoe">                FROM</span><span class="__shiki_140thh"> products_trgm p</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHERE</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh"> % user_query</span></span>
<span class="line"><span class="__shiki_1itgoe">                   OR</span><span class="__shiki_140thh"> similarity(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, user_query) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> v_fuzzy_threshold</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                result_id,</span></span>
<span class="line"><span class="__shiki_140thh">                result_type,</span></span>
<span class="line"><span class="__shiki_140thh">                content,</span></span>
<span class="line"><span class="__shiki_140thh">                relevance,</span></span>
<span class="line"><span class="__shiki_140thh">                match_type,</span></span>
<span class="line"><span class="__shiki_140thh">                highlighted_content</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> ranked_results</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> source_priority, relevance </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_140thh"> result_limit;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 搜索建议和纠错</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> search_suggestions</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    user_query </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    suggestion_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;all&#39;</span><span class="__shiki_21nrsd">  -- all, correction, completion, related</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    suggestion </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    suggestion_type </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    confidence </span><span class="__shiki_1itgoe">float</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_words </span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分词</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_words :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> regexp_split_to_array(</span><span class="__shiki_dzsirb">lower</span><span class="__shiki_140thh">(user_query), </span><span class="__shiki_mdbnqw">&#39;\\s+&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> suggestion_type </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;all&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;correction&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 拼写纠错建议</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            word </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> suggestion,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;correction&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> suggestion_type,</span></span>
<span class="line"><span class="__shiki_140thh">            similarity(word, user_query) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> confidence</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> unnest(v_query_words) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> word</span></span>
<span class="line"><span class="__shiki_140thh">        ) words</span></span>
<span class="line"><span class="__shiki_1itgoe">        CROSS JOIN</span><span class="__shiki_140thh"> LATERAL (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> dict_word</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> spelling_dictionary</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> similarity(dict_word, </span><span class="__shiki_dzsirb">words</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">word</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">6</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> similarity(dict_word, </span><span class="__shiki_dzsirb">words</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">word</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_140thh">        ) corrections</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> similarity(</span><span class="__shiki_dzsirb">corrections</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">dict_word</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">words</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">word</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">9</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> confidence </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> suggestion_type </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;all&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;completion&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 自动补全建议</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            suggestion,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;completion&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            similarity_score</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> fuzzy_autocomplete(user_query, </span><span class="__shiki_mdbnqw">&#39;product_name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> similarity_score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> suggestion_type </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;all&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;related&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 相关搜索建议</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            related_query </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> suggestion,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;related&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            frequency </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> confidence</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> search_query_log</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> similarity(original_query, user_query) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> frequency </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">, similarity(original_query, user_query) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 搜索日志和分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> search_log</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    log_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    session_id UUID,</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    search_mode </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    result_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    execution_time INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    clicked_results </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">[],</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    query_vector TSVECTOR </span><span class="__shiki_1itgoe">GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)) STORED</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_log_time</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_log(created_at);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_log_query</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_log </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(query_vector);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_log_user</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_log(user_id, created_at);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 搜索分析视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> search_analytics</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> daily_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        date_trunc(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, created_at) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> day</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_searches,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> session_id) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> unique_sessions,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> user_id) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> unique_users,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_execution_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">        PERCENTILE_CONT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITHIN</span><span class="__shiki_dzsirb"> GROUP</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> p95_execution_seconds</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> search_log</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> date_trunc(</span><span class="__shiki_mdbnqw">&#39;day&#39;</span><span class="__shiki_140thh">, created_at)</span></span>
<span class="line"><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">popular_queries </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        query_text,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> search_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> session_id) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(result_count) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_results,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MIN</span><span class="__shiki_140thh">(created_at) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> first_seen,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(created_at) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> last_seen</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> search_log</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> created_at </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> query_text</span></span>
<span class="line"><span class="__shiki_1itgoe">    HAVING</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> search_count </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    ds</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">day</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ds</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_searches</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ds</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">unique_sessions</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ds</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">unique_users</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ds</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_execution_seconds</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ds</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">p95_execution_seconds</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> jsonb_agg(</span></span>
<span class="line"><span class="__shiki_140thh">            jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;query&#39;</span><span class="__shiki_140thh">, query_text,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;count&#39;</span><span class="__shiki_140thh">, search_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;avg_results&#39;</span><span class="__shiki_140thh">, avg_results</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> popular_queries pq</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> pq</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_count</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> top_queries</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> daily_stats ds</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> ds</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">day</span><span class="__shiki_1itgoe"> DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 个性化搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> user_search_preferences</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    preferred_search_mode </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;hybrid&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    fuzzy_threshold </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    min_fulltext_rank </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">05</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    excluded_categories </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[],</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> personalized_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_query </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_prefs user_search_preferences;</span></span>
<span class="line"><span class="__shiki_140thh">    v_results JSONB;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取用户偏好</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_140thh"> v_prefs</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> user_search_preferences</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_user_id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 设置默认值</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> v_prefs </span><span class="__shiki_1itgoe">IS</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_prefs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">preferred_search_mode</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;hybrid&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_prefs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">fuzzy_threshold</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_prefs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">min_fulltext_rank</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">05</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_prefs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">excluded_categories</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[]::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 执行个性化搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> jsonb_agg(</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">result_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">result_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;content&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;relevance&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relevance_score</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;highlighted&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">highlighted_content</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_results</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> intelligent_search(</span></span>
<span class="line"><span class="__shiki_140thh">        p_query,</span></span>
<span class="line"><span class="__shiki_dzsirb">        v_prefs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">preferred_search_mode</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        50</span></span>
<span class="line"><span class="__shiki_140thh">    ) r</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">        r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">result_type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;product&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        AND</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh"> ILIKE ANY(</span><span class="__shiki_dzsirb">v_prefs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">excluded_categories</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> search_log (user_id, query_text, search_mode, result_count)</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (p_user_id, p_query, </span><span class="__shiki_dzsirb">v_prefs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">preferred_search_mode</span><span class="__shiki_140thh">, jsonb_array_length(v_results));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;query&#39;</span><span class="__shiki_140thh">, p_query,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;preferences&#39;</span><span class="__shiki_140thh">, to_jsonb(v_prefs),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;results&#39;</span><span class="__shiki_140thh">, v_results,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;result_count&#39;</span><span class="__shiki_140thh">, jsonb_array_length(v_results)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h3 id="_4-2-实时搜索优化" tabindex="-1">4.2 实时搜索优化 <a class="header-anchor" href="#_4-2-实时搜索优化" aria-label="Permalink to &quot;4.2 实时搜索优化&quot;">​</a></h3><h4 id="_4-2-1-实时索引更新" tabindex="-1">4.2.1 实时索引更新 <a class="header-anchor" href="#_4-2-1-实时索引更新" aria-label="Permalink to &quot;4.2.1 实时索引更新&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 使用触发器实时更新索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> update_search_vector</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> TRIGGER </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 更新全文搜索向量</span></span>
<span class="line"><span class="__shiki_dzsirb">    NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;B&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">author</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;C&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_140thh">        setweight(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)), </span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 更新模糊搜索文本</span></span>
<span class="line"><span class="__shiki_dzsirb">    NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_text</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">updated_at</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TRIGGER</span><span class="__shiki_1t8gfj"> trig_update_search_index</span></span>
<span class="line"><span class="__shiki_1itgoe">BEFORE</span><span class="__shiki_1itgoe"> INSERT</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> UPDATE</span><span class="__shiki_140thh"> OF title, content, author, category </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> search_documents</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_140thh"> EACH </span><span class="__shiki_1itgoe">ROW</span></span>
<span class="line"><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_140thh"> update_search_vector();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 增量索引更新</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW incremental_search_index </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_text</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> fuzzy_vector,</span></span>
<span class="line"><span class="__shiki_dzsirb">    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">updated_at</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> search_documents d</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">updated_at</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期刷新增量索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> refresh_incremental_index</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    REFRESH MATERIALIZED VIEW CONCURRENTLY incremental_search_index;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 实时搜索缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> realtime_search_cache</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    cache_key </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_hash </span><span class="__shiki_1itgoe">BYTEA</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_params JSONB </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    results JSONB </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    result_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    last_accessed </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    access_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    expires_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (created_at </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span><span class="__shiki_140thh">) STORED</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_realtime_cache_expiry</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> realtime_search_cache(expires_at);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> cached_realtime_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_filters JSONB </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;{}&#39;</span><span class="__shiki_140thh">::jsonb,</span></span>
<span class="line"><span class="__shiki_140thh">    p_limit </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_cache_key </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_hash </span><span class="__shiki_1itgoe">BYTEA</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_cached JSONB;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 生成缓存键</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_hash :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> digest</span><span class="__shiki_140thh">(p_query </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> p_filters::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> p_limit::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sha256&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    v_cache_key :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> encode(v_query_hash, </span><span class="__shiki_mdbnqw">&#39;hex&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 尝试获取缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> results </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_cached</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> realtime_search_cache</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_cache_key</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> expires_at </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> v_cached </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 更新访问统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        UPDATE</span><span class="__shiki_140thh"> realtime_search_cache</span></span>
<span class="line"><span class="__shiki_1itgoe">        SET</span><span class="__shiki_140thh"> last_accessed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            access_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> access_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_cache_key;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> v_cached;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 执行实时搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> jsonb_agg(</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;title&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;relevance&#39;</span><span class="__shiki_140thh">, ts_rank_cd(</span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, p_query)),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;highlighted&#39;</span><span class="__shiki_140thh">, ts_headline(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">content</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, p_query),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                                      &#39;StartSel=&lt;mark&gt;, StopSel=&lt;/mark&gt;, MaxWords=30&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_cached</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> search_documents d</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh"> @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, p_query)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> ts_rank_cd(</span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, p_query)) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_140thh"> p_limit;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 存储到缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> realtime_search_cache </span></span>
<span class="line"><span class="__shiki_140thh">        (cache_key, query_hash, query_params, results, result_count)</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        v_cache_key,</span></span>
<span class="line"><span class="__shiki_140thh">        v_query_hash,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_build_object(</span><span class="__shiki_mdbnqw">&#39;query&#39;</span><span class="__shiki_140thh">, p_query, </span><span class="__shiki_mdbnqw">&#39;filters&#39;</span><span class="__shiki_140thh">, p_filters, </span><span class="__shiki_mdbnqw">&#39;limit&#39;</span><span class="__shiki_140thh">, p_limit),</span></span>
<span class="line"><span class="__shiki_140thh">        v_cached,</span></span>
<span class="line"><span class="__shiki_140thh">        jsonb_array_length(v_cached)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    ON</span><span class="__shiki_140thh"> CONFLICT (cache_key) DO </span><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_1itgoe"> SET</span></span>
<span class="line"><span class="__shiki_140thh">        results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">results</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        result_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">result_count</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        last_accessed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        access_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> v_cached;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 并行搜索处理</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> parallel_search_processing</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_worker_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 4</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    result_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    result_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    relevance </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    worker_id </span><span class="__shiki_1itgoe">INTEGER</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_parts </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">    v_part_length </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_worker </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分割查询用于并行处理</span></span>
<span class="line"><span class="__shiki_140thh">    v_query_parts :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> regexp_split_to_array(p_query, </span><span class="__shiki_mdbnqw">&#39;\\s+&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    v_part_length :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ceil(array_length(v_query_parts, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> p_worker_count);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 并行处理每个部分</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> v_worker </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">..p_worker_count </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;document&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ts_rank_cd(</span></span>
<span class="line"><span class="__shiki_dzsirb">                d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                    array_to_string(</span></span>
<span class="line"><span class="__shiki_140thh">                        v_query_parts[(v_worker</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">v_part_length </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> : </span></span>
<span class="line"><span class="__shiki_dzsirb">                                      least</span><span class="__shiki_140thh">(v_worker</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">v_part_length, array_length(v_query_parts, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">))],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &#39; &amp; &#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">            v_worker</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> search_documents d</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh"> @@ to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            array_to_string(</span></span>
<span class="line"><span class="__shiki_140thh">                v_query_parts[(v_worker</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">v_part_length </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> : </span></span>
<span class="line"><span class="__shiki_dzsirb">                              least</span><span class="__shiki_140thh">(v_worker</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">v_part_length, array_length(v_query_parts, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">))],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39; &amp; &#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> ts_rank_cd(</span></span>
<span class="line"><span class="__shiki_dzsirb">            d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                array_to_string(</span></span>
<span class="line"><span class="__shiki_140thh">                    v_query_parts[(v_worker</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">v_part_length </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> : </span></span>
<span class="line"><span class="__shiki_dzsirb">                                  least</span><span class="__shiki_140thh">(v_worker</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">v_part_length, array_length(v_query_parts, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">))],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39; &amp; &#39;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 流式搜索结果</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> stream_search_results</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_batch_size </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> SETOF JSONB </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_total_results </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_processed </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_batch JSONB;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取总结果数</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_total_results</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> search_documents</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> search_vector @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, p_query);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 分批返回结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHILE</span><span class="__shiki_140thh"> v_processed </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> v_total_results </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;batch&#39;</span><span class="__shiki_140thh">, v_processed </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> p_batch_size </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;total_batches&#39;</span><span class="__shiki_140thh">, ceil(v_total_results::</span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> p_batch_size),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;results&#39;</span><span class="__shiki_140thh">, jsonb_agg(</span></span>
<span class="line"><span class="__shiki_140thh">                jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;title&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;relevance&#39;</span><span class="__shiki_140thh">, ts_rank_cd(</span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, p_query))</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_batch</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> search_documents</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> search_vector @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, p_query)</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> ts_rank_cd(search_vector, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, p_query)) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_140thh">            OFFSET v_processed</span></span>
<span class="line"><span class="__shiki_1itgoe">            LIMIT</span><span class="__shiki_140thh"> p_batch_size</span></span>
<span class="line"><span class="__shiki_140thh">        ) d;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh"> v_batch;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        v_processed :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_processed </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> p_batch_size;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 添加延迟以模拟流式处理</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM pg_sleep(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> WHILE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h2 id="五、性能优化与监控" tabindex="-1">五、性能优化与监控 <a class="header-anchor" href="#五、性能优化与监控" aria-label="Permalink to &quot;五、性能优化与监控&quot;">​</a></h2><h3 id="_5-1-索引优化策略" tabindex="-1">5.1 索引优化策略 <a class="header-anchor" href="#_5-1-索引优化策略" aria-label="Permalink to &quot;5.1 索引优化策略&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 复合索引优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 全文搜索 + 过滤条件</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_filtered</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(search_vector, category);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 部分索引（只索引热门数据）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_popular</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(search_vector)</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> updated_at </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;30 days&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 表达式索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_lower_title</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">lower</span><span class="__shiki_140thh">(title)));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 覆盖索引</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_covering</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(search_vector)</span></span>
<span class="line"><span class="__shiki_1itgoe">INCLUDE</span><span class="__shiki_140thh"> (title, category, created_at);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 索引压缩（PostgreSQL 14+）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_search_compressed</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_documents </span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(search_vector)</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> (fastupdate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">, gin_pending_list_limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4096</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 并行索引扫描配置</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> max_parallel_workers_per_gather </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> parallel_tuple_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> parallel_setup_cost </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 索引使用统计</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> index_usage_stats</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> ROUND</span><span class="__shiki_140thh">(idx_tup_fetch::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> idx_tup_read, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> selectivity_percentage</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> indexname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;idx_search%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 索引维护函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> maintain_search_indexes</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    action</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    index_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    index_size_before </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    index_size_after </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    duration INTERVAL</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    index_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    start_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    end_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    size_before </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    size_after </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> index_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">            indexname,</span></span>
<span class="line"><span class="__shiki_140thh">            indexrelid::regclass </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> indexname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;idx_search%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  -- 经常使用的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">          AND</span><span class="__shiki_140thh"> pg_relation_size(indexrelid) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_21nrsd">  -- 大于100MB</span></span>
<span class="line"><span class="__shiki_1itgoe">        ORDER BY</span><span class="__shiki_140thh"> pg_relation_size(indexrelid) </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_140thh">        start_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">        size_before :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">::regclass);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 重建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;REINDEX INDEX CONCURRENTLY %s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        end_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">        size_after :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_relation_size(</span><span class="__shiki_dzsirb">index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">::regclass);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        action</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;REINDEX&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        index_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> index_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">index_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        index_size_before :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_size_pretty(size_before);</span></span>
<span class="line"><span class="__shiki_140thh">        index_size_after :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_size_pretty(size_after);</span></span>
<span class="line"><span class="__shiki_140thh">        duration :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> end_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h3 id="_5-2-查询性能监控" tabindex="-1">5.2 查询性能监控 <a class="header-anchor" href="#_5-2-查询性能监控" aria-label="Permalink to &quot;5.2 查询性能监控&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 查询性能统计表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> search_performance_stats</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    stat_id </span><span class="__shiki_1itgoe">BIGSERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- &#39;fulltext&#39;, &#39;fuzzy&#39;, &#39;hybrid&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    execution_time INTERVAL </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    result_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    cache_hit </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> false,</span></span>
<span class="line"><span class="__shiki_140thh">    index_used </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    memory_usage </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    check_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    query_vector TSVECTOR </span><span class="__shiki_1itgoe">GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)) STORED</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_perf_stats_time</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_performance_stats(check_time);</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> INDEX</span><span class="__shiki_1t8gfj"> idx_perf_stats_query</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> search_performance_stats </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> GIN(query_vector);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 性能监控视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> search_performance_monitor</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> hourly_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        date_trunc(</span><span class="__shiki_mdbnqw">&#39;hour&#39;</span><span class="__shiki_140thh">, check_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> hour</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        query_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_execution_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">        PERCENTILE_CONT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITHIN</span><span class="__shiki_dzsirb"> GROUP</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> p95_execution_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">        PERCENTILE_CONT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">99</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITHIN</span><span class="__shiki_dzsirb"> GROUP</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> p99_execution_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(result_count) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_results,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> cache_hit </span><span class="__shiki_1itgoe">THEN</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cache_hit_rate</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> search_performance_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;24 hours&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> date_trunc(</span><span class="__shiki_mdbnqw">&#39;hour&#39;</span><span class="__shiki_140thh">, check_time), query_type</span></span>
<span class="line"><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">slow_queries </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        query_text,</span></span>
<span class="line"><span class="__shiki_140thh">        query_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> occurrence_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_time,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MIN</span><span class="__shiki_140thh">(check_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> first_seen,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(check_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> last_seen</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> search_performance_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">  -- 超过1秒</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> query_text, query_type</span></span>
<span class="line"><span class="__shiki_1itgoe">    HAVING</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hour</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_count</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_execution_seconds</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_sec,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">p95_execution_seconds</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> p95_sec,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">p99_execution_seconds</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> p99_sec,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_results</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_results,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">cache_hit_rate</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cache_hit_percent,</span></span>
<span class="line"><span class="__shiki_140thh">    (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> jsonb_agg(</span></span>
<span class="line"><span class="__shiki_140thh">            jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;query&#39;</span><span class="__shiki_140thh">, query_text,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;occurrences&#39;</span><span class="__shiki_140thh">, occurrence_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;avg_time&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">ROUND</span><span class="__shiki_140thh">(avg_time, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> slow_queries sq</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> sq</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_type</span></span>
<span class="line"><span class="__shiki_1itgoe">        LIMIT</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_140thh">    ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> slow_queries_list</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> hourly_stats hs</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hour</span><span class="__shiki_1itgoe"> DESC</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">hs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_type</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 自动性能调优函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> auto_tune_search</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    parameter_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    current_value </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    recommended_value </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    reason </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查work_mem设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;work_mem&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        current_setting(</span><span class="__shiki_mdbnqw">&#39;work_mem&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> pg_size_bytes(current_setting(</span><span class="__shiki_mdbnqw">&#39;shared_buffers&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_mdbnqw"> &#39;64MB&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;32MB&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;基于shared_buffers调整工作内存&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查维护工作内存</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;maintenance_work_mem&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        current_setting(</span><span class="__shiki_mdbnqw">&#39;maintenance_work_mem&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> pg_size_bytes(current_setting(</span><span class="__shiki_mdbnqw">&#39;shared_buffers&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_mdbnqw"> &#39;1GB&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;512MB&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;优化索引维护性能&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查并行设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;max_parallel_workers_per_gather&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        current_setting(</span><span class="__shiki_mdbnqw">&#39;max_parallel_workers_per_gather&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;4&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;提高并行查询性能&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查相似度阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;pg_trgm.similarity_threshold&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        current_setting(</span><span class="__shiki_mdbnqw">&#39;pg_trgm.similarity_threshold&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;0.3&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;平衡召回率和精确率&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;default_statistics_target&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        current_setting(</span><span class="__shiki_mdbnqw">&#39;default_statistics_target&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;500&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;提高查询计划准确性&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 查询计划分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> analyze_search_query_plan</span><span class="__shiki_140thh">(p_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    plan_node </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    estimated_rows </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    estimated_cost </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    actual_rows </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    actual_time </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    node_type </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_explain_json </span><span class="__shiki_1itgoe">JSON</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_mdbnqw"> &#39;EXPLAIN (ANALYZE, FORMAT JSON) &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> p_query </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_explain_json;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_1itgoe"> RECURSIVE</span><span class="__shiki_140thh"> plan_tree </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            1</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_1itgoe"> level</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            v_explain_json</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plan&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> plan_node,</span></span>
<span class="line"><span class="__shiki_140thh">            (v_explain_json</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plan&#39;</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Node Type&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> node_type</span></span>
<span class="line"><span class="__shiki_1itgoe">        UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            pt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">level</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            subplan,</span></span>
<span class="line"><span class="__shiki_140thh">            (subplan</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Node Type&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> plan_tree pt</span></span>
<span class="line"><span class="__shiki_1itgoe">        CROSS JOIN</span><span class="__shiki_140thh"> LATERAL jsonb_array_elements(</span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_dzsirb"> pt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">plan_node</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plans&#39;</span><span class="__shiki_1itgoe"> IS NOT NULL</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                THEN</span><span class="__shiki_dzsirb"> pt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">plan_node</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plans&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">                ELSE</span><span class="__shiki_mdbnqw"> &#39;[]&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> subplan</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> pt</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">plan_node</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plans&#39;</span><span class="__shiki_1itgoe"> IS NOT NULL</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        node_type,</span></span>
<span class="line"><span class="__shiki_140thh">        (plan_node</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Plan Rows&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (plan_node</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Total Cost&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (plan_node</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Actual Rows&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        (plan_node</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Actual Total Time&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        node_type</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> plan_tree</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> node_type </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;Bitmap Heap Scan&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Bitmap Index Scan&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Gather&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Sort&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Limit&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_1itgoe"> level</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h2 id="六、高级应用场景" tabindex="-1">六、高级应用场景 <a class="header-anchor" href="#六、高级应用场景" aria-label="Permalink to &quot;六、高级应用场景&quot;">​</a></h2><h3 id="_6-1-多语言搜索" tabindex="-1">6.1 多语言搜索 <a class="header-anchor" href="#_6-1-多语言搜索" aria-label="Permalink to &quot;6.1 多语言搜索&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 多语言配置管理</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> multilingual_documents</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    doc_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title_en </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    content_en </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title_fr </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    content_fr </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title_de </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    content_de </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    language_code </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;en&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    search_vector_en TSVECTOR </span><span class="__shiki_1itgoe">GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsvector(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(title_en, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(content_en, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    ) STORED,</span></span>
<span class="line"><span class="__shiki_140thh">    search_vector_fr TSVECTOR </span><span class="__shiki_1itgoe">GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsvector(</span><span class="__shiki_mdbnqw">&#39;french&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(title_fr, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(content_fr, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    ) STORED,</span></span>
<span class="line"><span class="__shiki_140thh">    search_vector_de TSVECTOR </span><span class="__shiki_1itgoe">GENERATED</span><span class="__shiki_1itgoe"> ALWAYS</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        to_tsvector(</span><span class="__shiki_mdbnqw">&#39;german&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">coalesce</span><span class="__shiki_140thh">(title_de, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> coalesce</span><span class="__shiki_140thh">(content_de, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    ) STORED,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 多语言搜索函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> multilingual_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    target_languages </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;en&#39;, &#39;fr&#39;, &#39;de&#39;],</span></span>
<span class="line"><span class="__shiki_140thh">    result_limit </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    doc_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    language_code </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    relevance </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    match_language </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    target_language </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    FOREACH target_language </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh"> target_languages </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                doc_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                %L as language_code,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                title_%s as title,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                content_%s as content,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ts_rank_cd(search_vector_%s, websearch_to_tsquery(%L, $1)) as relevance,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                %L as match_language</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM multilingual_documents</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE search_vector_%s @@ websearch_to_tsquery(%L, $1)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ORDER BY relevance DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">            LIMIT $2</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            target_language, target_language, target_language,</span></span>
<span class="line"><span class="__shiki_140thh">            target_language, target_language,</span></span>
<span class="line"><span class="__shiki_140thh">            target_language, target_language, target_language)</span></span>
<span class="line"><span class="__shiki_1itgoe">        USING</span><span class="__shiki_140thh"> query_text, result_limit;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 语言检测函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> plpython3u;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> detect_language</span><span class="__shiki_140thh">(text_content </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_140thh">    import langdetect</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> langdetect</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">detect</span><span class="__shiki_140thh">(text_content)</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;en&#39;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpython3u;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 自动翻译搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> translated_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    source_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_language </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    target_languages </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[&#39;en&#39;, &#39;fr&#39;, &#39;de&#39;]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    translated_queries JSONB :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;{}&#39;</span><span class="__shiki_140thh">::jsonb;</span></span>
<span class="line"><span class="__shiki_140thh">    target_lang </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    translated_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 这里需要集成翻译API（如Google Translate, DeepL等）</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 简化示例：假设有翻译函数 translate_text(query, source, target)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    FOREACH target_lang </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh"> target_languages </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_140thh"> target_lang </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> source_language </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- translated_query := translate_text(source_query, source_language, target_lang);</span></span>
<span class="line"><span class="__shiki_140thh">            translated_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> source_query;  </span><span class="__shiki_21nrsd">-- 简化处理</span></span>
<span class="line"><span class="__shiki_140thh">            translated_queries :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> translated_queries </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                jsonb_build_object(target_lang, translated_query);</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> jsonb_build_object(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;original_query&#39;</span><span class="__shiki_140thh">, source_query,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;source_language&#39;</span><span class="__shiki_140thh">, source_language,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;translated_queries&#39;</span><span class="__shiki_140thh">, translated_queries</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h3 id="_6-2-语义搜索与向量相似度" tabindex="-1">6.2 语义搜索与向量相似度 <a class="header-anchor" href="#_6-2-语义搜索与向量相似度" aria-label="Permalink to &quot;6.2 语义搜索与向量相似度&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 安装向量相似度扩展（如pgvector）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- CREATE EXTENSION vector;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建文档向量表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> document_vectors</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    doc_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_1itgoe"> REFERENCES</span><span class="__shiki_140thh"> search_documents(id),</span></span>
<span class="line"><span class="__shiki_140thh">    title_vector VECTOR(</span><span class="__shiki_dzsirb">768</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd">-- 假设使用768维向量</span></span>
<span class="line"><span class="__shiki_140thh">    content_vector VECTOR(</span><span class="__shiki_dzsirb">768</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    combined_vector VECTOR(</span><span class="__shiki_dzsirb">768</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    embedding_model </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;bert-base-uncased&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    embedded_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 向量相似度搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> semantic_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    top_k </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    similarity_threshold </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">7</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    doc_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    semantic_similarity </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    keyword_similarity </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    combined_score </span><span class="__shiki_1itgoe">FLOAT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    query_vector VECTOR(</span><span class="__shiki_dzsirb">768</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取查询向量（需要外部服务生成）</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- query_vector := get_embedding(query_text);</span></span>
<span class="line"><span class="__shiki_140thh">    query_vector :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;[0.1,0.2,...]&#39;</span><span class="__shiki_140thh">::vector;  </span><span class="__shiki_21nrsd">-- 示例向量</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        dv</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">doc_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 向量余弦相似度</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">dv</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">combined_vector</span><span class="__shiki_1itgoe"> &lt;=&gt;</span><span class="__shiki_140thh"> query_vector) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> semantic_sim,</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 关键词相似度</span></span>
<span class="line"><span class="__shiki_140thh">        ts_rank_cd(</span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> keyword_sim,</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 综合得分</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">6</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">dv</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">combined_vector</span><span class="__shiki_1itgoe"> &lt;=&gt;</span><span class="__shiki_140thh"> query_vector)) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">         0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">4</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> ts_rank_cd(</span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text))) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> combined</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> document_vectors dv</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> search_documents sd </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> dv</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">doc_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_dzsirb"> dv</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">combined_vector</span><span class="__shiki_1itgoe"> &lt;=&gt;</span><span class="__shiki_140thh"> query_vector </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> similarity_threshold</span></span>
<span class="line"><span class="__shiki_1itgoe">       OR</span><span class="__shiki_dzsirb"> sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh"> @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ORDER BY</span><span class="__shiki_140thh"> combined </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">    LIMIT</span><span class="__shiki_140thh"> top_k;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 混合搜索策略</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> hybrid_search</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    search_mode </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_mdbnqw"> &#39;smart&#39;</span><span class="__shiki_21nrsd">  -- smart, keyword, semantic, both</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    doc_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    search_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    relevance_score </span><span class="__shiki_1itgoe">FLOAT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    explanation </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> search_mode</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;keyword&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 纯关键词搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;keyword&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                ts_rank_cd(</span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;Keyword match found&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> search_documents sd</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh"> @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)</span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> ts_rank_cd(</span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)) </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;semantic&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 纯语义搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> semantic_search(query_text, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;both&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 关键词和语义搜索并集</span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;keyword&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                ts_rank_cd(</span><span class="__shiki_dzsirb">sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh">, websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;Keyword match&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> search_documents sd</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_dzsirb"> sd</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">search_vector</span><span class="__shiki_140thh"> @@ websearch_to_tsquery(</span><span class="__shiki_mdbnqw">&#39;english&#39;</span><span class="__shiki_140thh">, query_text)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">                r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">doc_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">title</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;semantic&#39;</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">combined_score</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;Semantic similarity&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> semantic_search(query_text, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">) r</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            ORDER BY</span><span class="__shiki_140thh"> relevance_score </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_mdbnqw"> &#39;smart&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 智能模式：根据查询长度和复杂度选择</span></span>
<span class="line"><span class="__shiki_1itgoe">            IF</span><span class="__shiki_1itgoe"> length</span><span class="__shiki_140thh">(query_text) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                RETURN</span><span class="__shiki_140thh"> QUERY </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> hybrid_search(query_text, </span><span class="__shiki_mdbnqw">&#39;keyword&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            ELSIF </span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(query_text) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_140thh"> query_text ~ </span><span class="__shiki_mdbnqw">&#39;\\d{4}&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">                RETURN</span><span class="__shiki_140thh"> QUERY </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> hybrid_search(query_text, </span><span class="__shiki_mdbnqw">&#39;semantic&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span></span>
<span class="line"><span class="__shiki_1itgoe">                RETURN</span><span class="__shiki_140thh"> QUERY </span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> hybrid_search(query_text, </span><span class="__shiki_mdbnqw">&#39;both&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql STABLE;</span></span></code></pre></div><h2 id="七、总结与最佳实践" tabindex="-1">七、总结与最佳实践 <a class="header-anchor" href="#七、总结与最佳实践" aria-label="Permalink to &quot;七、总结与最佳实践&quot;">​</a></h2><h3 id="_7-1-性能优化总结" tabindex="-1">7.1 性能优化总结 <a class="header-anchor" href="#_7-1-性能优化总结" aria-label="Permalink to &quot;7.1 性能优化总结&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 索引选择指南</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">全文搜索索引选择：</span></span>
<span class="line"><span class="__shiki_21nrsd">- GIN索引：适合静态数据，搜索快，更新慢</span></span>
<span class="line"><span class="__shiki_21nrsd">- GiST索引：适合动态数据，更新快，搜索稍慢</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">模糊搜索索引选择：</span></span>
<span class="line"><span class="__shiki_21nrsd">- GiST trigram索引：适合模糊搜索和自动补全</span></span>
<span class="line"><span class="__shiki_21nrsd">- GIN trigram索引：适合频繁更新的场景</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 配置参数优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 关键参数设置</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_config(</span><span class="__shiki_mdbnqw">&#39;pg_trgm.similarity_threshold&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;0.3&#39;</span><span class="__shiki_140thh">, false);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_config(</span><span class="__shiki_mdbnqw">&#39;pg_trgm.word_similarity_threshold&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;0.6&#39;</span><span class="__shiki_140thh">, false);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_config(</span><span class="__shiki_mdbnqw">&#39;effective_cache_size&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;4GB&#39;</span><span class="__shiki_140thh">, false);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_config(</span><span class="__shiki_mdbnqw">&#39;work_mem&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;32MB&#39;</span><span class="__shiki_140thh">, false);</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> set_config(</span><span class="__shiki_mdbnqw">&#39;maintenance_work_mem&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;1GB&#39;</span><span class="__shiki_140thh">, false);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 监控SQL</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控索引使用</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    indexname,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_scan,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_read,</span></span>
<span class="line"><span class="__shiki_140thh">    idx_tup_fetch,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(pg_relation_size(indexrelid)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> index_size</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_user_indexes</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> indexname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%search%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> indexname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%trgm%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> idx_scan </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控缓存命中率</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(heap_blks_read) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> heap_read,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(heap_blks_hit) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> heap_hit,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(idx_blks_read) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> idx_read,</span></span>
<span class="line"><span class="__shiki_dzsirb">    sum</span><span class="__shiki_140thh">(idx_blks_hit) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> idx_hit,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(heap_blks_hit) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(heap_blks_read) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> round</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(heap_blks_hit) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(heap_blks_hit) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(heap_blks_read)), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> heap_hit_ratio,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(idx_blks_hit) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(idx_blks_read) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span><span class="__shiki_dzsirb"> round</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(idx_blks_hit) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(idx_blks_hit) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(idx_blks_read)), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> idx_hit_ratio</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_statio_user_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relname </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%search%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 维护任务</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期更新统计信息</span></span>
<span class="line"><span class="__shiki_140thh">ANALYZE search_documents;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期清理旧数据</span></span>
<span class="line"><span class="__shiki_1itgoe">DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> search_log </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> created_at </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;90 days&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期重建索引</span></span>
<span class="line"><span class="__shiki_140thh">REINDEX </span><span class="__shiki_1itgoe">INDEX</span><span class="__shiki_140thh"> CONCURRENTLY idx_search_gin;</span></span></code></pre></div><h3 id="_7-2-最佳实践建议" tabindex="-1">7.2 最佳实践建议 <a class="header-anchor" href="#_7-2-最佳实践建议" aria-label="Permalink to &quot;7.2 最佳实践建议&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 设计建议</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">表设计：</span></span>
<span class="line"><span class="__shiki_21nrsd">- 为搜索字段创建生成列存储tsvector</span></span>
<span class="line"><span class="__shiki_21nrsd">- 使用适当的数据类型（text而不是varchar）</span></span>
<span class="line"><span class="__shiki_21nrsd">- 考虑分区大表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">索引设计：</span></span>
<span class="line"><span class="__shiki_21nrsd">- 为不同搜索模式创建不同索引</span></span>
<span class="line"><span class="__shiki_21nrsd">- 使用部分索引减少索引大小</span></span>
<span class="line"><span class="__shiki_21nrsd">- 定期维护索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">查询优化：</span></span>
<span class="line"><span class="__shiki_21nrsd">- 避免在WHERE子句中使用函数</span></span>
<span class="line"><span class="__shiki_21nrsd">- 使用参数化查询</span></span>
<span class="line"><span class="__shiki_21nrsd">- 限制返回结果数量</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>PostgreSQL的全文搜索和模糊查询功能非常强大，提供了从基础到高级的完整搜索解决方案：</p><h3 id="核心功能总结" tabindex="-1">核心功能总结： <a class="header-anchor" href="#核心功能总结" aria-label="Permalink to &quot;核心功能总结：&quot;">​</a></h3><ol><li><p><strong>全文搜索</strong>：</p><ul><li>基于<code>tsvector</code>和<code>tsquery</code>的高效文本搜索</li><li>支持权重、排名、高亮等高级功能</li><li>多语言和自定义配置支持</li></ul></li><li><p><strong>模糊查询</strong>：</p><ul><li><code>pg_trgm</code>扩展提供三元组相似度搜索</li><li><code>fuzzystrmatch</code>提供编辑距离和语音匹配</li><li>支持正则表达式模糊匹配</li></ul></li><li><p><strong>高级特性</strong>：</p><ul><li>混合搜索策略</li><li>多语言支持</li><li>语义搜索集成</li><li>实时搜索优化</li></ul></li></ol><h3 id="性能优化要点" tabindex="-1">性能优化要点： <a class="header-anchor" href="#性能优化要点" aria-label="Permalink to &quot;性能优化要点：&quot;">​</a></h3><ol><li><p><strong>索引策略</strong>：</p><ul><li>根据数据特性选择GIN或GiST索引</li><li>使用复合索引和部分索引</li><li>定期维护索引</li></ul></li><li><p><strong>查询优化</strong>：</p><ul><li>使用适当的搜索模式</li><li>实现结果缓存</li><li>监控和调整性能参数</li></ul></li><li><p><strong>架构设计</strong>：</p><ul><li>分层搜索架构</li><li>实时索引更新</li><li>负载均衡和扩展</li></ul></li></ol><h3 id="应用场景" tabindex="-1">应用场景： <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景：&quot;">​</a></h3><ol><li><strong>电商搜索</strong>：产品名称、描述的模糊和全文搜索</li><li><strong>内容管理</strong>：文章、博客的智能搜索</li><li><strong>企业搜索</strong>：文档、邮件的全文检索</li><li><strong>社交网络</strong>：用户、内容的实时搜索</li><li><strong>数据分析</strong>：日志、报告的文本分析</li></ol><p>通过合理设计和优化，PostgreSQL可以构建出高性能、可扩展的企业级搜索系统，满足从简单关键字搜索到复杂语义搜索的各种需求。</p>`,68)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
