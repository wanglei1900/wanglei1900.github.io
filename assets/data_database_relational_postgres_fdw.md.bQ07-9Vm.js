import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"PostgreSQL FDW（外部数据包装器）深度解析","description":"","frontmatter":{},"headers":[],"relativePath":"data/database/relational/postgres/fdw.md","filePath":"data/database/relational/postgres/fdw.md"}'),p={name:"data/database/relational/postgres/fdw.md"};function h(l,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="postgresql-fdw-外部数据包装器-深度解析" tabindex="-1">PostgreSQL FDW（外部数据包装器）深度解析 <a class="header-anchor" href="#postgresql-fdw-外部数据包装器-深度解析" aria-label="Permalink to &quot;PostgreSQL FDW（外部数据包装器）深度解析&quot;">​</a></h1><h2 id="一、fdw基础概念与架构" tabindex="-1">一、FDW基础概念与架构 <a class="header-anchor" href="#一、fdw基础概念与架构" aria-label="Permalink to &quot;一、FDW基础概念与架构&quot;">​</a></h2><h3 id="_1-1-fdw核心概念" tabindex="-1">1.1 FDW核心概念 <a class="header-anchor" href="#_1-1-fdw核心概念" aria-label="Permalink to &quot;1.1 FDW核心概念&quot;">​</a></h3><h4 id="_1-1-1-fdw定义与标准化" tabindex="-1">1.1.1 FDW定义与标准化 <a class="header-anchor" href="#_1-1-1-fdw定义与标准化" aria-label="Permalink to &quot;1.1.1 FDW定义与标准化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- FDW（Foreign Data Wrapper）是PostgreSQL基于SQL/MED标准实现的机制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- SQL/MED：SQL Management of External Data（ISO/IEC 9075-9:2003）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看PostgreSQL的SQL/MED实现状态</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">    setting, </span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%fdw%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%foreign%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- FDW架构概览</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">FDW三层架构：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 包装器（Wrapper）：实现特定数据源的访问协议</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 服务器（Server）：外部数据源实例的配置</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 外部表（Foreign Table）：本地数据库中的表映射</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">数据流：</span></span>
<span class="line"><span class="__shiki_21nrsd">本地查询 → FDW接口 → 包装器 → 外部数据源 → 返回结果</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h4 id="_1-1-2-fdw优势与应用场景" tabindex="-1">1.1.2 FDW优势与应用场景 <a class="header-anchor" href="#_1-1-2-fdw优势与应用场景" aria-label="Permalink to &quot;1.1.2 FDW优势与应用场景&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- FDW主要优势</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 统一数据访问接口：不同数据源统一SQL访问</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 实时数据集成：无需ETL，直接查询外部数据</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 数据联邦：跨数据源关联查询</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 简化架构：减少数据同步的复杂性</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 典型应用场景</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 场景1：数据湖查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 将S3、HDFS等数据源映射为数据库表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 场景2：多数据库联邦查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 跨PostgreSQL、MySQL、Oracle等数据库联合查询</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 场景3：云服务集成</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 连接Snowflake、Redshift、BigQuery等云数据库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 场景4：NoSQL数据访问</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询MongoDB、Redis、Elasticsearch等NoSQL数据</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 场景5：文件数据查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 直接查询CSV、JSON、Parquet等文件格式</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- FDW扩展生态</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 官方维护的FDW：postgres_fdw, file_fdw</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 社区维护的FDW：mysql_fdw, oracle_fdw, mongo_fdw, redis_fdw等</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 商业FDW：aws_s3, snowflake_fdw等</span></span></code></pre></div><h3 id="_1-2-fdw核心组件详解" tabindex="-1">1.2 FDW核心组件详解 <a class="header-anchor" href="#_1-2-fdw核心组件详解" aria-label="Permalink to &quot;1.2 FDW核心组件详解&quot;">​</a></h3><h4 id="_1-2-1-fdw系统目录与元数据" tabindex="-1">1.2.1 FDW系统目录与元数据 <a class="header-anchor" href="#_1-2-1-fdw系统目录与元数据" aria-label="Permalink to &quot;1.2.1 FDW系统目录与元数据&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 查看FDW相关系统目录</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. 外部数据包装器</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    fdwname </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> wrapper_name,</span></span>
<span class="line"><span class="__shiki_140thh">    fdwhandler::regprocedure </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> handler_function,</span></span>
<span class="line"><span class="__shiki_140thh">    fdwvalidator::regprocedure </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> validator_function,</span></span>
<span class="line"><span class="__shiki_140thh">    fdwoptions </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> wrapper_options</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_foreign_data_wrapper</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> fdwname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 外部服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    srvname </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_140thh">    srvtype </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> server_type,</span></span>
<span class="line"><span class="__shiki_140thh">    srvversion </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> server_version,</span></span>
<span class="line"><span class="__shiki_140thh">    fdwname </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> wrapper_name,</span></span>
<span class="line"><span class="__shiki_140thh">    srvoptions </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> server_options</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_foreign_server fs</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_foreign_data_wrapper fdw </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvfdw</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> srvname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 用户映射</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    umuser::regrole </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> local_user,</span></span>
<span class="line"><span class="__shiki_140thh">    srvname </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_140thh">    umoptions </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> mapping_options</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_user_mappings um</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_foreign_server fs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> um</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> local_user, srvname;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> schema_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftoptions</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> table_options</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_foreign_table ft </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_foreign_server fs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftserver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;f&#39;</span><span class="__shiki_21nrsd">  -- 外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 外部表列信息</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> schema_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> table_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> column_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attnum</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> column_position,</span></span>
<span class="line"><span class="__shiki_1itgoe">    format_type</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">atttypid</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">atttypmod</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> data_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attnotnull</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> not_null,</span></span>
<span class="line"><span class="__shiki_dzsirb">    fdw_a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attfdwoptions</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> column_options</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_attribute a </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> pg_foreign_table_columns fdw_a </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fdw_a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attrelid</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attnum</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fdw_a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attnum</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;f&#39;</span><span class="__shiki_21nrsd">  -- 外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attnum</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attisdropped</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">attnum</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_1-2-2-fdw接口函数" tabindex="-1">1.2.2 FDW接口函数 <a class="header-anchor" href="#_1-2-2-fdw接口函数" aria-label="Permalink to &quot;1.2.2 FDW接口函数&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- FDW接口函数（handler函数必须实现）</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">核心Handler函数（C语言实现）：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. GetForeignRelSize      - 估算外部表大小</span></span>
<span class="line"><span class="__shiki_21nrsd">2. GetForeignPaths        - 生成访问路径</span></span>
<span class="line"><span class="__shiki_21nrsd">3. GetForeignPlan         - 生成执行计划</span></span>
<span class="line"><span class="__shiki_21nrsd">4. BeginForeignScan       - 开始扫描</span></span>
<span class="line"><span class="__shiki_21nrsd">5. IterateForeignScan     - 迭代获取数据</span></span>
<span class="line"><span class="__shiki_21nrsd">6. ReScanForeignScan      - 重新扫描</span></span>
<span class="line"><span class="__shiki_21nrsd">7. EndForeignScan         - 结束扫描</span></span>
<span class="line"><span class="__shiki_21nrsd">8. GetForeignJoinPaths    - 外部表连接路径（可选）</span></span>
<span class="line"><span class="__shiki_21nrsd">9. GetForeignUpperPaths   - 上层操作路径（可选）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">写操作函数（可选）：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. ExecForeignInsert      - 执行插入</span></span>
<span class="line"><span class="__shiki_21nrsd">2. ExecForeignUpdate      - 执行更新</span></span>
<span class="line"><span class="__shiki_21nrsd">3. ExecForeignDelete      - 执行删除</span></span>
<span class="line"><span class="__shiki_21nrsd">4. BeginForeignModify     - 开始修改</span></span>
<span class="line"><span class="__shiki_21nrsd">5. EndForeignModify       - 结束修改</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">其他支持函数：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. AnalyzeForeignTable    - 分析外部表统计信息</span></span>
<span class="line"><span class="__shiki_21nrsd">2. PlanForeignModify      - 计划修改操作</span></span>
<span class="line"><span class="__shiki_21nrsd">3. ExplainForeignScan     - 解释外部表扫描</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h2 id="二、postgres-fdw深度解析" tabindex="-1">二、postgres_fdw深度解析 <a class="header-anchor" href="#二、postgres-fdw深度解析" aria-label="Permalink to &quot;二、postgres_fdw深度解析&quot;">​</a></h2><h3 id="_2-1-postgres-fdw基础配置" tabindex="-1">2.1 postgres_fdw基础配置 <a class="header-anchor" href="#_2-1-postgres-fdw基础配置" aria-label="Permalink to &quot;2.1 postgres_fdw基础配置&quot;">​</a></h3><h4 id="_2-1-1-安装与基本配置" tabindex="-1">2.1.1 安装与基本配置 <a class="header-anchor" href="#_2-1-1-安装与基本配置" aria-label="Permalink to &quot;2.1.1 安装与基本配置&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 安装postgres_fdw扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> postgres_fdw;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建外部服务器（连接到另一个PostgreSQL实例）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres</span></span>
<span class="line"><span class="__shiki_140thh">FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER postgres_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    host </span><span class="__shiki_mdbnqw">&#39;192.168.1.100&#39;</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">-- 远程主机</span></span>
<span class="line"><span class="__shiki_140thh">    port </span><span class="__shiki_mdbnqw">&#39;5432&#39;</span><span class="__shiki_140thh">,                 </span><span class="__shiki_21nrsd">-- 端口</span></span>
<span class="line"><span class="__shiki_140thh">    dbname </span><span class="__shiki_mdbnqw">&#39;remote_db&#39;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">-- 数据库名</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 可选参数</span></span>
<span class="line"><span class="__shiki_140thh">    fetch_size </span><span class="__shiki_mdbnqw">&#39;10000&#39;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">-- 每次获取行数</span></span>
<span class="line"><span class="__shiki_140thh">    use_remote_estimate </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 使用远程估计</span></span>
<span class="line"><span class="__shiki_140thh">    updatable </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_21nrsd">             -- 是否可更新</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建用户映射</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> USER</span><span class="__shiki_1t8gfj"> MAPPING</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> current_user</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> foreign_postgres</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_mdbnqw">&#39;remote_user&#39;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">-- 远程用户名</span></span>
<span class="line"><span class="__shiki_1itgoe">    password</span><span class="__shiki_mdbnqw"> &#39;remote_password&#39;</span><span class="__shiki_21nrsd">   -- 密码（可选，可使用.pgpass文件）</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 创建外部表（方法1：手动指定）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> remote_employees (</span></span>
<span class="line"><span class="__shiki_140thh">    employee_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    first_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    last_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    department_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    salary </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    hire_date </span><span class="__shiki_1itgoe">DATE</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> foreign_postgres</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    schema_name </span><span class="__shiki_mdbnqw">&#39;public&#39;</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">-- 远程模式</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_mdbnqw">&#39;employees&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">-- 远程表名</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 可选参数</span></span>
<span class="line"><span class="__shiki_140thh">    column_name </span><span class="__shiki_mdbnqw">&#39;employee_id,first_name,last_name,department_id,salary,hire_date&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 创建外部表（方法2：导入整个模式）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 导入所有表</span></span>
<span class="line"><span class="__shiki_140thh">IMPORT FOREIGN </span><span class="__shiki_1itgoe">SCHEMA</span><span class="__shiki_140thh"> public</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> public</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (import_default </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 导入特定表</span></span>
<span class="line"><span class="__shiki_140thh">IMPORT FOREIGN </span><span class="__shiki_1itgoe">SCHEMA</span><span class="__shiki_140thh"> public </span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_1itgoe"> TO</span><span class="__shiki_140thh"> (employees, departments, projects)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> public;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 排除特定表</span></span>
<span class="line"><span class="__shiki_140thh">IMPORT FOREIGN </span><span class="__shiki_1itgoe">SCHEMA</span><span class="__shiki_140thh"> public </span></span>
<span class="line"><span class="__shiki_1itgoe">EXCEPT</span><span class="__shiki_140thh"> (temporary_data, audit_logs)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> public;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 查看已创建的外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    schemaname,</span></span>
<span class="line"><span class="__shiki_140thh">    tablename,</span></span>
<span class="line"><span class="__shiki_140thh">    server_name,</span></span>
<span class="line"><span class="__shiki_140thh">    ftoptions</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_foreign_tables</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> schemaname, tablename;</span></span></code></pre></div><h4 id="_2-1-2-高级配置选项" tabindex="-1">2.1.2 高级配置选项 <a class="header-anchor" href="#_2-1-2-高级配置选项" aria-label="Permalink to &quot;2.1.2 高级配置选项&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 连接池配置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在外部服务器配置中设置连接池参数</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> keep_connections </span><span class="__shiki_mdbnqw">&#39;on&#39;</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">-- 保持连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> max_connections </span><span class="__shiki_mdbnqw">&#39;10&#39;</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">-- 最大连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> connect_timeout </span><span class="__shiki_mdbnqw">&#39;10&#39;</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">-- 连接超时（秒）</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> socket_timeout </span><span class="__shiki_mdbnqw">&#39;30&#39;</span><span class="__shiki_21nrsd">           -- socket超时（秒）</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. SSL连接配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> sslmode </span><span class="__shiki_mdbnqw">&#39;require&#39;</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">-- SSL模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> sslcert </span><span class="__shiki_mdbnqw">&#39;/path/to/client.crt&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> sslkey </span><span class="__shiki_mdbnqw">&#39;/path/to/client.key&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> sslrootcert </span><span class="__shiki_mdbnqw">&#39;/path/to/ca.crt&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 查询优化参数</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> fetch_size </span><span class="__shiki_mdbnqw">&#39;50000&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">-- 增加每次获取行数</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> use_remote_estimate </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">-- 使用远程统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> fdw_startup_cost </span><span class="__shiki_mdbnqw">&#39;100&#39;</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">-- 连接启动成本</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> fdw_tuple_cost </span><span class="__shiki_mdbnqw">&#39;0.01&#39;</span><span class="__shiki_21nrsd">         -- 每行处理成本</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 事务控制参数</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> transaction_read_only </span><span class="__shiki_mdbnqw">&#39;false&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">-- 是否只读事务</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> transaction_isolation </span><span class="__shiki_mdbnqw">&#39;read committed&#39;</span><span class="__shiki_21nrsd"> -- 事务隔离级别</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 批处理优化</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> batch_size </span><span class="__shiki_mdbnqw">&#39;1000&#39;</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">-- 批量操作大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> row_estimate_method </span><span class="__shiki_mdbnqw">&#39;exact&#39;</span><span class="__shiki_21nrsd">   -- 行数估计方法</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 监控与诊断</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> log_remote_commands </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">-- 记录远程命令</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> log_foreign_server_stats </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_21nrsd"> -- 记录服务器统计</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_2-2-postgres-fdw查询优化" tabindex="-1">2.2 postgres_fdw查询优化 <a class="header-anchor" href="#_2-2-postgres-fdw查询优化" aria-label="Permalink to &quot;2.2 postgres_fdw查询优化&quot;">​</a></h3><h4 id="_2-2-1-查询下推-pushdown-优化" tabindex="-1">2.2.1 查询下推（Pushdown）优化 <a class="header-anchor" href="#_2-2-1-查询下推-pushdown-优化" aria-label="Permalink to &quot;2.2.1 查询下推（Pushdown）优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. WHERE条件下推</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 原始查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> remote_employees </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> department_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  AND</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看远程查询（如果启用了日志）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 远程执行：SELECT * FROM employees WHERE department_id = 10 AND salary &gt; 50000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. JOIN下推（有限支持）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建第二个外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> remote_departments (</span></span>
<span class="line"><span class="__shiki_140thh">    department_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    department_name </span><span class="__shiki_1itgoe">VARCHAR</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> foreign_postgres</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (schema_name </span><span class="__shiki_mdbnqw">&#39;public&#39;</span><span class="__shiki_140thh">, table_name </span><span class="__shiki_mdbnqw">&#39;departments&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- JOIN查询下推</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">first_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">department_name</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_employees e</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> remote_departments d </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">department_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">department_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">salary</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 60000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 聚合函数下推</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    department_id,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> employee_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(salary) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_salary</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_employees</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> department_id</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. ORDER BY和LIMIT下推</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">, ANALYZE)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> remote_employees</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> hire_date </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 检查下推支持情况</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看哪些操作可以下推</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    setting,</span></span>
<span class="line"><span class="__shiki_140thh">    short_desc</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_settings</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%push%&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%foreign%join%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 强制下推（测试用）</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_fdw_join_pushdown </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_fdw_aggregate_pushdown </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_fdw_order_by_pushdown </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> enable_fdw_limit_pushdown </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 查看下推统计信息</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pg_stat_statements;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    calls,</span></span>
<span class="line"><span class="__shiki_140thh">    total_time,</span></span>
<span class="line"><span class="__shiki_1itgoe">    rows</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_read</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%remote_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_time </span><span class="__shiki_1itgoe">DESC</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_2-2-2-批量操作与性能优化" tabindex="-1">2.2.2 批量操作与性能优化 <a class="header-anchor" href="#_2-2-2-批量操作与性能优化" aria-label="Permalink to &quot;2.2.2 批量操作与性能优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 批量插入优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用批量插入</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> batch_size </span><span class="__shiki_mdbnqw">&#39;1000&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 批量插入示例</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> remote_employees </span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1001</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;First_&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;Last_&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> s</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    (random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    50000</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 50000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    current_date </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> (random() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 3650</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1001</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> s(id);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 批量更新优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用CTE进行批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> updates </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        employee_id,</span></span>
<span class="line"><span class="__shiki_140thh">        salary </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> new_salary</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> remote_employees</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> department_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">    AND</span><span class="__shiki_140thh"> hire_date </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw"> &#39;2020-01-01&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> remote_employees e</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">new_salary</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> updates u</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">employee_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">employee_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 并行查询优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用并行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> parallel_degree </span><span class="__shiki_mdbnqw">&#39;4&#39;</span><span class="__shiki_21nrsd">  -- 并行度</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 连接管理优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建连接池函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> manage_fdw_connections</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    conn RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查并关闭空闲连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> conn </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> server_name, connection_count</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_foreign_server_connections</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> idle_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 执行连接管理操作</span></span>
<span class="line"><span class="__shiki_140thh">        PERFORM dblink_disconnect(</span><span class="__shiki_dzsirb">conn</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;_conn&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 记录连接统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> fdw_connection_stats (check_time, active_connections, idle_connections)</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_foreign_server_connections;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 缓存策略优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建物化视图缓存常用查询</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW cached_employee_summary </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    department_id,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_employees,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(salary) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> average_salary,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(hire_date) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> earliest_hire,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(hire_date) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> latest_hire</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_employees</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> department_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> DATA</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 自动刷新物化视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> refresh_fdw_cache</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> trigger </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    REFRESH MATERIALIZED VIEW CONCURRENTLY cached_employee_summary;</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 查询重写优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用视图简化复杂查询</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> employee_details</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">employee_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">first_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">salary</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">department_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">hire_date</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_employees e</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> remote_departments d </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> e</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">department_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> d</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">department_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 监控查询性能</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_query_performance</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    execution_time INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    rows_returned </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    remote_execution_time INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    check_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> log_fdw_performance</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> event_trigger </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    start_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    end_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    start_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 执行查询</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 这里需要根据实际情况实现</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    end_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> fdw_query_performance </span></span>
<span class="line"><span class="__shiki_140thh">        (query_text, execution_time, check_time)</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        current_query(),</span></span>
<span class="line"><span class="__shiki_140thh">        end_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time,</span></span>
<span class="line"><span class="__shiki_1itgoe">        now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h3 id="_2-3-postgres-fdw事务与并发" tabindex="-1">2.3 postgres_fdw事务与并发 <a class="header-anchor" href="#_2-3-postgres-fdw事务与并发" aria-label="Permalink to &quot;2.3 postgres_fdw事务与并发&quot;">​</a></h3><h4 id="_2-3-1-事务一致性管理" tabindex="-1">2.3.1 事务一致性管理 <a class="header-anchor" href="#_2-3-1-事务一致性管理" aria-label="Permalink to &quot;2.3.1 事务一致性管理&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 跨数据库事务处理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 开始事务</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 本地操作</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> local_table (id, </span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;local data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 远程操作（通过FDW）</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> remote_employees (employee_id, first_name, last_name) </span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">9999</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;John&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Doe&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 提交事务（两阶段提交）</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 注意：postgres_fdw使用两阶段提交确保跨数据库事务一致性</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 事务隔离级别设置</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 为外部服务器设置隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> default_transaction_isolation </span><span class="__shiki_mdbnqw">&#39;repeatable read&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 在会话中设置</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> TRANSACTION</span><span class="__shiki_1itgoe"> ISOLATION</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> REPEATABLE</span><span class="__shiki_1itgoe"> READ</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> remote_employees </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> employee_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 锁管理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 查看外部表上的锁</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    relation::regclass,</span></span>
<span class="line"><span class="__shiki_140thh">    locktype,</span></span>
<span class="line"><span class="__shiki_140thh">    mode,</span></span>
<span class="line"><span class="__shiki_140thh">    granted,</span></span>
<span class="line"><span class="__shiki_140thh">    pid</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_locks</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> relation::regclass::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;remote_%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 死锁检测和预防</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 设置锁超时</span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_1itgoe"> lock_timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;5s&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 死锁检测配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> deadlock_timeout </span><span class="__shiki_mdbnqw">&#39;1s&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 保存点支持</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">SAVEPOINT sp1;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> remote_employees </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Test&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50000</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">());</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 如果出错可以回滚到保存点</span></span>
<span class="line"><span class="__shiki_1itgoe">ROLLBACK</span><span class="__shiki_1itgoe"> TO</span><span class="__shiki_140thh"> sp1;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 分布式事务监控</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> distributed_transactions</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    datname,</span></span>
<span class="line"><span class="__shiki_140thh">    pid,</span></span>
<span class="line"><span class="__shiki_140thh">    usename,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr,</span></span>
<span class="line"><span class="__shiki_140thh">    backend_start,</span></span>
<span class="line"><span class="__shiki_140thh">    xact_start,</span></span>
<span class="line"><span class="__shiki_140thh">    query_start,</span></span>
<span class="line"><span class="__shiki_140thh">    state_change,</span></span>
<span class="line"><span class="__shiki_140thh">    waiting,</span></span>
<span class="line"><span class="__shiki_1itgoe">    state</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 外部服务器信息</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> string_agg</span><span class="__shiki_140thh">(srvname, </span><span class="__shiki_mdbnqw">&#39;, &#39;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">     FROM</span><span class="__shiki_140thh"> pg_foreign_server fs</span></span>
<span class="line"><span class="__shiki_1itgoe">     JOIN</span><span class="__shiki_140thh"> pg_user_mappings um </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> um</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvid</span></span>
<span class="line"><span class="__shiki_1itgoe">     WHERE</span><span class="__shiki_dzsirb"> um</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">umuser</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">usesysid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> foreign_servers</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_activity a</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> pid </span><span class="__shiki_1itgoe">&lt;&gt;</span><span class="__shiki_140thh"> pg_backend_pid()</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> xact_start </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 事务重试机制</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> execute_with_retry</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_sql </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_max_retries </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_retry_delay INTERVAL </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;1 second&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> INTEGER</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    retry_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    rows_affected </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">            EXECUTE</span><span class="__shiki_140thh"> p_sql;</span></span>
<span class="line"><span class="__shiki_1itgoe">            GET</span><span class="__shiki_140thh"> DIAGNOSTICS rows_affected </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ROW_COUNT;</span></span>
<span class="line"><span class="__shiki_1itgoe">            RETURN</span><span class="__shiki_140thh"> rows_affected;</span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> deadlock_detected </span><span class="__shiki_1itgoe">OR</span><span class="__shiki_140thh"> lock_not_available </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                retry_count :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> retry_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                IF</span><span class="__shiki_140thh"> retry_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> p_max_retries </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                    RAISE;</span></span>
<span class="line"><span class="__shiki_1itgoe">                END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                PERFORM pg_sleep(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> p_retry_delay)::</span><span class="__shiki_1itgoe">numeric</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h2 id="三、其他常用fdw详解" tabindex="-1">三、其他常用FDW详解 <a class="header-anchor" href="#三、其他常用fdw详解" aria-label="Permalink to &quot;三、其他常用FDW详解&quot;">​</a></h2><h3 id="_3-1-file-fdw-文件数据访问" tabindex="-1">3.1 file_fdw：文件数据访问 <a class="header-anchor" href="#_3-1-file-fdw-文件数据访问" aria-label="Permalink to &quot;3.1 file_fdw：文件数据访问&quot;">​</a></h3><h4 id="_3-1-1-csv文件访问" tabindex="-1">3.1.1 CSV文件访问 <a class="header-anchor" href="#_3-1-1-csv文件访问" aria-label="Permalink to &quot;3.1.1 CSV文件访问&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 安装file_fdw扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> file_fdw;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建外部服务器（file_fdw通常不需要特定服务器配置）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> file_server FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER file_fdw;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建外部表访问CSV文件</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> csv_employees (</span></span>
<span class="line"><span class="__shiki_140thh">    employee_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    first_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    department </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    salary </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    hire_date </span><span class="__shiki_1itgoe">DATE</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> file_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    filename</span><span class="__shiki_mdbnqw"> &#39;/path/to/employees.csv&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    format </span><span class="__shiki_mdbnqw">&#39;csv&#39;</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd">-- 文件格式</span></span>
<span class="line"><span class="__shiki_140thh">    header </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">-- 第一行是标题</span></span>
<span class="line"><span class="__shiki_140thh">    delimiter </span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">,         </span><span class="__shiki_21nrsd">-- 分隔符</span></span>
<span class="line"><span class="__shiki_140thh">    quote </span><span class="__shiki_mdbnqw">&#39;&quot;&#39;</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">-- 引号字符</span></span>
<span class="line"><span class="__shiki_140thh">    escape </span><span class="__shiki_mdbnqw">&#39;&quot;&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">-- 转义字符</span></span>
<span class="line"><span class="__shiki_1itgoe">    null</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">,              </span><span class="__shiki_21nrsd">-- NULL值表示</span></span>
<span class="line"><span class="__shiki_1itgoe">    encoding</span><span class="__shiki_mdbnqw"> &#39;UTF8&#39;</span><span class="__shiki_21nrsd">       -- 文件编码</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 查询CSV文件</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> csv_employees </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> salary </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 支持的文件格式选项</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">csv: CSV格式（默认）</span></span>
<span class="line"><span class="__shiki_21nrsd">text: 定界文本文件</span></span>
<span class="line"><span class="__shiki_21nrsd">binary: 二进制格式</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 动态文件路径（使用程序函数）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> get_daily_employee_file</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_mdbnqw"> &#39;/data/employees/employees_&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> to_char(current_date, </span><span class="__shiki_mdbnqw">&#39;YYYYMMDD&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;.csv&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> daily_employees (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 列定义同上</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> file_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    filename</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 空值，由程序函数提供</span></span>
<span class="line"><span class="__shiki_140thh">    format </span><span class="__shiki_mdbnqw">&#39;csv&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    header </span><span class="__shiki_mdbnqw">&#39;true&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 多文件支持</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> multi_file_data (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    data</span><span class="__shiki_1itgoe"> TEXT</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> file_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    filename</span><span class="__shiki_mdbnqw"> &#39;/path/to/data/file*.csv&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 通配符支持</span></span>
<span class="line"><span class="__shiki_140thh">    format </span><span class="__shiki_mdbnqw">&#39;csv&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    header </span><span class="__shiki_mdbnqw">&#39;false&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 文件监控和自动刷新</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> monitor_file_changes</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> TRIGGER </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    file_path </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    file_mtime </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取文件信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> modification </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> file_mtime</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_ls_dir(</span><span class="__shiki_mdbnqw">&#39;/path/to/employees.csv&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> ORDINALITY </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> f(</span><span class="__shiki_1itgoe">filename</span><span class="__shiki_140thh">, modification)</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_1itgoe"> filename</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;employees.csv&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查文件是否被修改</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> TG_OP </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;SELECT&#39;</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_140thh"> file_mtime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> OLD</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_modified</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 重新加载外部表定义</span></span>
<span class="line"><span class="__shiki_140thh">        REFRESH FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> csv_employees;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h4 id="_3-1-2-json文件访问" tabindex="-1">3.1.2 JSON文件访问 <a class="header-anchor" href="#_3-1-2-json文件访问" aria-label="Permalink to &quot;3.1.2 JSON文件访问&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建JSON文件外部表（需要自定义解析）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 方法：使用file_fdw读取原始数据，然后用JSON函数解析</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> raw_json_data (</span></span>
<span class="line"><span class="__shiki_140thh">    json_line </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> file_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    filename</span><span class="__shiki_mdbnqw"> &#39;/path/to/data.json&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    format </span><span class="__shiki_mdbnqw">&#39;text&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 每行一个JSON对象</span></span>
<span class="line"><span class="__shiki_140thh">    header </span><span class="__shiki_mdbnqw">&#39;false&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建解析视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> parsed_json_data</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    (json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> id,</span></span>
<span class="line"><span class="__shiki_140thh">    json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    (json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> value</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    (json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;timestamp&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> timestamp</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> raw_json_data;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 嵌套JSON解析</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> nested_json_data</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    (json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;employee_id&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> employee_id,</span></span>
<span class="line"><span class="__shiki_140thh">    json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;personal_info&#39;</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;first_name&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> first_name,</span></span>
<span class="line"><span class="__shiki_140thh">    json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;personal_info&#39;</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;last_name&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> last_name,</span></span>
<span class="line"><span class="__shiki_140thh">    json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;department&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> department,</span></span>
<span class="line"><span class="__shiki_140thh">    jsonb_array_elements_text(json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;skills&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> skill</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> raw_json_data;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 使用jsonb_to_record函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> structured_json_data</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> raw_json_data r,</span></span>
<span class="line"><span class="__shiki_140thh">jsonb_to_record(</span><span class="__shiki_dzsirb">r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">json_line</span><span class="__shiki_140thh">::jsonb) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> x(</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 性能优化：创建物化视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW cached_json_data </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    (json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> id,</span></span>
<span class="line"><span class="__shiki_140thh">    json_line::</span><span class="__shiki_1itgoe">json-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;data&#39;</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_1itgoe"> data</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> raw_json_data</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> DATA</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期刷新</span></span>
<span class="line"><span class="__shiki_140thh">REFRESH MATERIALIZED VIEW CONCURRENTLY cached_json_data;</span></span></code></pre></div><h3 id="_3-2-mysql-fdw-mysql数据库访问" tabindex="-1">3.2 mysql_fdw：MySQL数据库访问 <a class="header-anchor" href="#_3-2-mysql-fdw-mysql数据库访问" aria-label="Permalink to &quot;3.2 mysql_fdw：MySQL数据库访问&quot;">​</a></h3><h4 id="_3-2-1-基础配置与使用" tabindex="-1">3.2.1 基础配置与使用 <a class="header-anchor" href="#_3-2-1-基础配置与使用" aria-label="Permalink to &quot;3.2.1 基础配置与使用&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 安装mysql_fdw扩展（需要编译安装）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 编译安装步骤：</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 1) 下载源码：https://github.com/EnterpriseDB/mysql_fdw</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 2) 编译安装：make USE_PGXS=1 &amp;&amp; make USE_PGXS=1 install</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 3) 创建扩展</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> mysql_fdw;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建外部服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> mysql_server</span></span>
<span class="line"><span class="__shiki_140thh">FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER mysql_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    host </span><span class="__shiki_mdbnqw">&#39;mysql_host&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">-- MySQL主机</span></span>
<span class="line"><span class="__shiki_140thh">    port </span><span class="__shiki_mdbnqw">&#39;3306&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">-- MySQL端口</span></span>
<span class="line"><span class="__shiki_140thh">    dbname </span><span class="__shiki_mdbnqw">&#39;mysql_db&#39;</span><span class="__shiki_21nrsd">      -- MySQL数据库</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建用户映射</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> USER</span><span class="__shiki_1t8gfj"> MAPPING</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> current_user</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> mysql_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_mdbnqw">&#39;mysql_user&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- MySQL用户名</span></span>
<span class="line"><span class="__shiki_1itgoe">    password</span><span class="__shiki_mdbnqw"> &#39;mysql_pass&#39;</span><span class="__shiki_21nrsd">   -- MySQL密码</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 创建外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> mysql_customers (</span></span>
<span class="line"><span class="__shiki_140thh">    customer_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    customer_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> mysql_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    dbname </span><span class="__shiki_mdbnqw">&#39;mysql_db&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_mdbnqw">&#39;customers&#39;</span><span class="__shiki_21nrsd">  -- MySQL表名</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 数据类型映射</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">PostgreSQL ↔ MySQL 数据类型映射：</span></span>
<span class="line"><span class="__shiki_21nrsd">integer ↔ INT</span></span>
<span class="line"><span class="__shiki_21nrsd">text ↔ VARCHAR/TEXT</span></span>
<span class="line"><span class="__shiki_21nrsd">numeric ↔ DECIMAL</span></span>
<span class="line"><span class="__shiki_21nrsd">timestamp ↔ DATETIME/TIMESTAMP</span></span>
<span class="line"><span class="__shiki_21nrsd">boolean ↔ TINYINT(1)</span></span>
<span class="line"><span class="__shiki_21nrsd">bytea ↔ BLOB</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 查询MySQL数据</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mysql_customers </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 写入MySQL数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mysql_customers (customer_id, customer_name, email)</span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1001</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;John Doe&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_140thh"> mysql_customers </span></span>
<span class="line"><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;updated@example.com&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1001</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mysql_customers </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1001</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 批量导入导出</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 从MySQL导入到PostgreSQL</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> local_customers</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mysql_customers;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 从PostgreSQL导出到MySQL</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mysql_customers</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> local_customers </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">NOT</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> mysql_customers);</span></span></code></pre></div><h4 id="_3-2-2-高级功能与优化" tabindex="-1">3.2.2 高级功能与优化 <a class="header-anchor" href="#_3-2-2-高级功能与优化" aria-label="Permalink to &quot;3.2.2 高级功能与优化&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 连接池配置</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> mysql_server OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> max_connections </span><span class="__shiki_mdbnqw">&#39;10&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> idle_timeout </span><span class="__shiki_mdbnqw">&#39;300&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> connection_lifetime </span><span class="__shiki_mdbnqw">&#39;3600&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. SSL连接</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> mysql_server OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> ssl_mode </span><span class="__shiki_mdbnqw">&#39;REQUIRED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> ssl_ca </span><span class="__shiki_mdbnqw">&#39;/path/to/ca.pem&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> ssl_cert </span><span class="__shiki_mdbnqw">&#39;/path/to/client-cert.pem&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> ssl_key </span><span class="__shiki_mdbnqw">&#39;/path/to/client-key.pem&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 字符集和排序规则</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> mysql_customers OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> charset </span><span class="__shiki_mdbnqw">&#39;utf8mb4&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> collation </span><span class="__shiki_mdbnqw">&#39;utf8mb4_unicode_ci&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 查询下推优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- WHERE条件下推</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mysql_customers </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">BETWEEN</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> 2000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- JOIN下推（有限支持）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> mysql_orders (</span></span>
<span class="line"><span class="__shiki_140thh">    order_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    customer_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    order_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    amount </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> mysql_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (dbname </span><span class="__shiki_mdbnqw">&#39;mysql_db&#39;</span><span class="__shiki_140thh">, table_name </span><span class="__shiki_mdbnqw">&#39;orders&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 可能下推到MySQL执行的查询</span></span>
<span class="line"><span class="__shiki_140thh">EXPLAIN (</span><span class="__shiki_1itgoe">VERBOSE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_spent</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> mysql_customers c</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> mysql_orders o </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 分页查询优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用LIMIT/OFFSET下推</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mysql_customers</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">LIMIT</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> OFFSET </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 事务支持</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 本地操作</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> local_table </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">-- MySQL操作</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mysql_customers </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1002</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Jane Doe&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;jane@example.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 提交（mysql_fdw使用MySQL事务）</span></span>
<span class="line"><span class="__shiki_1itgoe">COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 监控MySQL连接</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> mysql_connections</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> connection_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(connection_time) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> oldest_connection,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(connection_time) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> newest_connection</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_foreign_server_connections fsc</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> pg_foreign_server fs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fsc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvfdw</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> oid</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_foreign_data_wrapper </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> fdwname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;mysql_fdw&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 性能调优参数</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> mysql_server OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> fetch_size </span><span class="__shiki_mdbnqw">&#39;10000&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> use_remote_estimate </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> row_estimate_method </span><span class="__shiki_mdbnqw">&#39;sample&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_3-3-其他常用fdw扩展" tabindex="-1">3.3 其他常用FDW扩展 <a class="header-anchor" href="#_3-3-其他常用fdw扩展" aria-label="Permalink to &quot;3.3 其他常用FDW扩展&quot;">​</a></h3><h4 id="_3-3-1-oracle-fdw" tabindex="-1">3.3.1 oracle_fdw <a class="header-anchor" href="#_3-3-1-oracle-fdw" aria-label="Permalink to &quot;3.3.1 oracle_fdw&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 安装oracle_fdw（需要Oracle客户端库）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> oracle_fdw;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 配置外部服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> oracle_server</span></span>
<span class="line"><span class="__shiki_140thh">FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER oracle_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    dbserver </span><span class="__shiki_mdbnqw">&#39;//oracle_host:1521/orcl&#39;</span><span class="__shiki_21nrsd">  -- Oracle连接字符串</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建用户映射</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> USER</span><span class="__shiki_1t8gfj"> MAPPING</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> current_user</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> oracle_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_mdbnqw">&#39;oracle_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    password</span><span class="__shiki_mdbnqw"> &#39;oracle_pass&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 创建外部表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> oracle_employees (</span></span>
<span class="line"><span class="__shiki_140thh">    empno </span><span class="__shiki_1itgoe">NUMBER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ename </span><span class="__shiki_1itgoe">VARCHAR2</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    job </span><span class="__shiki_1itgoe">VARCHAR2</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">9</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    mgr </span><span class="__shiki_1itgoe">NUMBER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    hiredate </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sal </span><span class="__shiki_1itgoe">NUMBER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    comm </span><span class="__shiki_1itgoe">NUMBER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    deptno </span><span class="__shiki_1itgoe">NUMBER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> oracle_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    schema</span><span class="__shiki_mdbnqw"> &#39;SCOTT&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">-- Oracle模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    table</span><span class="__shiki_mdbnqw"> &#39;EMP&#39;</span><span class="__shiki_21nrsd">          -- Oracle表名</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 数据类型映射</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">Oracle ↔ PostgreSQL 数据类型映射：</span></span>
<span class="line"><span class="__shiki_21nrsd">NUMBER ↔ numeric</span></span>
<span class="line"><span class="__shiki_21nrsd">VARCHAR2 ↔ varchar</span></span>
<span class="line"><span class="__shiki_21nrsd">DATE ↔ timestamp</span></span>
<span class="line"><span class="__shiki_21nrsd">CLOB ↔ text</span></span>
<span class="line"><span class="__shiki_21nrsd">BLOB ↔ bytea</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 查询Oracle数据</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> oracle_employees </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> deptno </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 高级功能</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用Oracle特定功能</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> oracle_sales (</span></span>
<span class="line"><span class="__shiki_140thh">    sales_id </span><span class="__shiki_1itgoe">NUMBER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sales_data </span><span class="__shiki_dzsirb">SYS</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">XMLTYPE</span><span class="__shiki_21nrsd">  -- Oracle XML类型</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> oracle_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    schema</span><span class="__shiki_mdbnqw"> &#39;SALES&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    table</span><span class="__shiki_mdbnqw"> &#39;SALES_DATA&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    nls_length_semantics </span><span class="__shiki_mdbnqw">&#39;CHAR&#39;</span><span class="__shiki_21nrsd">  -- 字符长度语义</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h4 id="_3-3-2-mongo-fdw" tabindex="-1">3.3.2 mongo_fdw <a class="header-anchor" href="#_3-3-2-mongo-fdw" aria-label="Permalink to &quot;3.3.2 mongo_fdw&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 安装mongo_fdw（需要MongoDB C驱动）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> mongo_fdw;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建外部服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> mongo_server</span></span>
<span class="line"><span class="__shiki_140thh">FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER mongo_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    address</span><span class="__shiki_mdbnqw"> &#39;mongodb://mongo_host:27017&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    authentication_database </span><span class="__shiki_mdbnqw">&#39;admin&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 创建用户映射</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> USER</span><span class="__shiki_1t8gfj"> MAPPING</span><span class="__shiki_1itgoe"> FOR</span><span class="__shiki_140thh"> current_user</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> mongo_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_mdbnqw">&#39;mongo_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    password</span><span class="__shiki_mdbnqw"> &#39;mongo_pass&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 创建外部表（映射MongoDB集合）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> mongo_users (</span></span>
<span class="line"><span class="__shiki_140thh">    _id </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">-- MongoDB文档ID</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    age </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    address</span><span class="__shiki_140thh"> JSONB,      </span><span class="__shiki_21nrsd">-- 嵌套文档</span></span>
<span class="line"><span class="__shiki_140thh">    tags </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">[],        </span><span class="__shiki_21nrsd">-- 数组</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> mongo_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    database</span><span class="__shiki_mdbnqw"> &#39;testdb&#39;</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">-- MongoDB数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    collection</span><span class="__shiki_mdbnqw"> &#39;users&#39;</span><span class="__shiki_21nrsd">      -- MongoDB集合</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 查询MongoDB数据</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 基本查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mongo_users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 25</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- JSON查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    _id,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    address-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;city&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> city,</span></span>
<span class="line"><span class="__shiki_1itgoe">    address-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;country&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> country</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> mongo_users </span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> address-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;country&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;USA&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 数组查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> mongo_users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_mdbnqw"> &#39;mongodb&#39;</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ANY(tags);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 写入MongoDB数据</span></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> mongo_users (</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh">, email, age, </span><span class="__shiki_1itgoe">address</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;John Doe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;john@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;{&quot;city&quot;: &quot;New York&quot;, &quot;country&quot;: &quot;USA&quot;}&#39;</span><span class="__shiki_140thh">::jsonb</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 聚合查询支持</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">    address-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;country&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> country,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> user_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    AVG</span><span class="__shiki_140thh">(age) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_age</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> mongo_users</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_1itgoe"> address-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;country&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="四、fdw高级应用与优化" tabindex="-1">四、FDW高级应用与优化 <a class="header-anchor" href="#四、fdw高级应用与优化" aria-label="Permalink to &quot;四、FDW高级应用与优化&quot;">​</a></h2><h3 id="_4-1-多数据源联邦查询" tabindex="-1">4.1 多数据源联邦查询 <a class="header-anchor" href="#_4-1-多数据源联邦查询" aria-label="Permalink to &quot;4.1 多数据源联邦查询&quot;">​</a></h3><h4 id="_4-1-1-跨数据库联合查询" tabindex="-1">4.1.1 跨数据库联合查询 <a class="header-anchor" href="#_4-1-1-跨数据库联合查询" aria-label="Permalink to &quot;4.1.1 跨数据库联合查询&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 配置多个数据源</span></span>
<span class="line"><span class="__shiki_21nrsd">-- PostgreSQL源</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> pg_source FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER postgres_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (host </span><span class="__shiki_mdbnqw">&#39;pg_host&#39;</span><span class="__shiki_140thh">, dbname </span><span class="__shiki_mdbnqw">&#39;pg_db&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- MySQL源</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> mysql_source FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER mysql_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (host </span><span class="__shiki_mdbnqw">&#39;mysql_host&#39;</span><span class="__shiki_140thh">, dbname </span><span class="__shiki_mdbnqw">&#39;mysql_db&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Oracle源</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> oracle_source FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER oracle_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (dbserver </span><span class="__shiki_mdbnqw">&#39;//oracle_host/orcl&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建外部表</span></span>
<span class="line"><span class="__shiki_21nrsd">-- PostgreSQL用户表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> pg_users (</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> pg_source OPTIONS (schema_name </span><span class="__shiki_mdbnqw">&#39;public&#39;</span><span class="__shiki_140thh">, table_name </span><span class="__shiki_mdbnqw">&#39;users&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- MySQL订单表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> mysql_orders (</span></span>
<span class="line"><span class="__shiki_140thh">    order_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    order_date </span><span class="__shiki_1itgoe">DATE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    amount </span><span class="__shiki_1itgoe">DECIMAL</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> mysql_source OPTIONS (dbname </span><span class="__shiki_mdbnqw">&#39;shop&#39;</span><span class="__shiki_140thh">, table_name </span><span class="__shiki_mdbnqw">&#39;orders&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- Oracle产品表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> oracle_products (</span></span>
<span class="line"><span class="__shiki_140thh">    product_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    product_name </span><span class="__shiki_1itgoe">VARCHAR2</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    category </span><span class="__shiki_1itgoe">VARCHAR2</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">NUMBER</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> oracle_source OPTIONS (</span><span class="__shiki_1itgoe">schema</span><span class="__shiki_mdbnqw"> &#39;INVENTORY&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">table</span><span class="__shiki_mdbnqw"> &#39;PRODUCTS&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 跨数据库联合查询</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">username</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">email</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> order_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_spent,</span></span>
<span class="line"><span class="__shiki_dzsirb">    STRING_AGG</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_name</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;, &#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> purchased_products</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_users u</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> mysql_orders o </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> oracle_products p </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">product_id</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_1itgoe"> &gt;=</span><span class="__shiki_mdbnqw"> &#39;2024-01-01&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">username</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">email</span></span>
<span class="line"><span class="__shiki_1itgoe">HAVING</span><span class="__shiki_dzsirb"> SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_spent </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 使用物化视图优化性能</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW customer_summary </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">username</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">email</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_id</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> order_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">amount</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_spent,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">order_date</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> last_order_date</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_users u</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> mysql_orders o </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> o</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_dzsirb"> u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">username</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">u</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">email</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> DATA</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 分区联邦查询</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 按数据源分区查询</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> partitioned_data </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- PostgreSQL数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        user_id,</span></span>
<span class="line"><span class="__shiki_140thh">        username,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;postgresql&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> source_system,</span></span>
<span class="line"><span class="__shiki_140thh">        created_at</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_users</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    UNION ALL</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 从CSV文件加载的历史数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        user_id,</span></span>
<span class="line"><span class="__shiki_140thh">        username,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;legacy_csv&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> source_system,</span></span>
<span class="line"><span class="__shiki_140thh">        import_date </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> created_at</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> csv_users</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    source_system,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> user_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(created_at) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> earliest_user,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(created_at) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> latest_user</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> partitioned_data</span></span>
<span class="line"><span class="__shiki_1itgoe">GROUP BY</span><span class="__shiki_140thh"> source_system;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 联邦查询性能优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建统计信息表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_query_stats</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_hash </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    execution_time INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    rows_returned </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    check_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 智能路由查询</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> route_query_based_on_stats</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> TRIGGER </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    avg_time_postgres INTERVAL;</span></span>
<span class="line"><span class="__shiki_140thh">    avg_time_mysql INTERVAL;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算各数据源的平均查询时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(execution_time) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> avg_time_postgres</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_query_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> source_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;postgres_fdw&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(execution_time) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> avg_time_mysql</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_query_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> source_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;mysql_fdw&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 根据性能动态路由</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 这里可以实现智能路由逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h4 id="_4-1-2-数据虚拟化层" tabindex="-1">4.1.2 数据虚拟化层 <a class="header-anchor" href="#_4-1-2-数据虚拟化层" aria-label="Permalink to &quot;4.1.2 数据虚拟化层&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建统一的业务视图层</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 客户360度视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> customer_360</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 基本信息（来自PostgreSQL）</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">first_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">email</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">phone</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 账户信息（来自MySQL）</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">account_balance</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">account_status</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">created_date</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> account_created,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 交易历史（来自Oracle）</span></span>
<span class="line"><span class="__shiki_dzsirb">    t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_transactions</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_transaction_date</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_spent</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 行为数据（来自MongoDB）</span></span>
<span class="line"><span class="__shiki_dzsirb">    b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_login</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">preferences</span><span class="__shiki_140thh">::jsonb </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> user_preferences,</span></span>
<span class="line"><span class="__shiki_dzsirb">    b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">device_info</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> postgres_customers c</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> mysql_accounts a </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> oracle_transactions t </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> t</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> mongo_user_behavior b </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">customer_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_id</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 数据质量检查视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> data_quality_checks</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;postgres_customers&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> source_table,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> row_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> customer_id) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> unique_ids,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(email) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> emails_not_null,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(created_at) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> earliest_record,</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(created_at) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> latest_record</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> postgres_customers</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">UNION ALL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;mysql_accounts&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> customer_id),</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(account_number),</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(created_date),</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(created_date)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> mysql_accounts</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">UNION ALL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;oracle_transactions&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_140thh"> customer_id),</span></span>
<span class="line"><span class="__shiki_dzsirb">    COUNT</span><span class="__shiki_140thh">(transaction_id),</span></span>
<span class="line"><span class="__shiki_dzsirb">    MIN</span><span class="__shiki_140thh">(transaction_date),</span></span>
<span class="line"><span class="__shiki_dzsirb">    MAX</span><span class="__shiki_140thh">(transaction_date)</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> oracle_transactions;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 数据血缘跟踪</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> data_lineage</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    lineage_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_system </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_table </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    target_view </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    transformation_logic </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_refresh </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    refresh_frequency INTERVAL</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">INSERT INTO</span><span class="__shiki_140thh"> data_lineage </span></span>
<span class="line"><span class="__shiki_140thh">    (source_system, source_table, target_view, transformation_logic, refresh_frequency)</span></span>
<span class="line"><span class="__shiki_1itgoe">VALUES</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;customers&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;customer_360&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;直接映射&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;MySQL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;accounts&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;customer_360&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;LEFT JOIN ON customer_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;Oracle&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;transactions&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;customer_360&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;聚合交易数据&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;1 day&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;MongoDB&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;user_behavior&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;customer_360&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;JSON解析和映射&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 自动数据刷新调度</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> refresh_fdw_views</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    lineage_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> lineage_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> data_lineage </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> last_refresh </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> refresh_frequency </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 根据血缘关系刷新视图</span></span>
<span class="line"><span class="__shiki_1itgoe">            CASE</span><span class="__shiki_dzsirb"> lineage_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">source_system</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_mdbnqw"> &#39;PostgreSQL&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">                    REFRESH MATERIALIZED VIEW CONCURRENTLY postgres_mv;</span></span>
<span class="line"><span class="__shiki_1itgoe">                WHEN</span><span class="__shiki_mdbnqw"> &#39;MySQL&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">                    REFRESH MATERIALIZED VIEW CONCURRENTLY mysql_mv;</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 其他系统...</span></span>
<span class="line"><span class="__shiki_1itgoe">            END</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 更新刷新时间</span></span>
<span class="line"><span class="__shiki_1itgoe">            UPDATE</span><span class="__shiki_140thh"> data_lineage </span></span>
<span class="line"><span class="__shiki_1itgoe">            SET</span><span class="__shiki_140thh"> last_refresh </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> lineage_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> lineage_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">lineage_id</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                RAISE WARNING </span><span class="__shiki_mdbnqw">&#39;刷新失败: % - %&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                    lineage_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">target_view</span><span class="__shiki_140thh">, SQLERRM;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 查询重写和优化</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> optimize_fdw_query</span><span class="__shiki_140thh">(p_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    optimized_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 简单的查询重写示例</span></span>
<span class="line"><span class="__shiki_140thh">    optimized_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> p_query;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 重写规则1: 将*替换为具体列</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> optimized_query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%SELECT * FROM%&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这里可以添加逻辑来识别和替换具体列</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这需要解析查询和表结构</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 重写规则2: 添加查询提示</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> optimized_query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%JOIN%&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_140thh">        optimized_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> regexp_replace(</span></span>
<span class="line"><span class="__shiki_140thh">            optimized_query,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;FROM (\\w+) JOIN&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;FROM \\1 /*+ leading(\\1) */ JOIN&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;i&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> optimized_query;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 性能监控仪表板</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> fdw_performance_dashboard</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> performance_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        source_system,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_execution_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">        PERCENTILE_CONT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">WITHIN</span><span class="__shiki_dzsirb"> GROUP</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> execution_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> p95_execution_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(rows_returned) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_rows_returned,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MIN</span><span class="__shiki_140thh">(check_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> monitoring_since,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(check_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> last_check</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_query_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;24 hours&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> source_system</span></span>
<span class="line"><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">connection_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">        fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">fdwname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> wrapper_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_dzsirb"> fsc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">connection_id</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> active_connections,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_dzsirb"> fsc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idle_time</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_idle_seconds</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_foreign_server_connections fsc</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_foreign_server fs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fsc</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_foreign_data_wrapper fdw </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvfdw</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">fdwname</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">source_system</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_count</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_execution_seconds</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_sec,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">p95_execution_seconds</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> p95_sec,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_rows_returned</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">active_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_idle_seconds</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">monitoring_since</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">last_check</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> performance_stats ps</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> connection_stats cs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">source_system</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> ps</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_execution_seconds</span><span class="__shiki_1itgoe"> DESC</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_4-2-自定义fdw开发" tabindex="-1">4.2 自定义FDW开发 <a class="header-anchor" href="#_4-2-自定义fdw开发" aria-label="Permalink to &quot;4.2 自定义FDW开发&quot;">​</a></h3><h4 id="_4-2-1-fdw开发基础" tabindex="-1">4.2.1 FDW开发基础 <a class="header-anchor" href="#_4-2-1-fdw开发基础" aria-label="Permalink to &quot;4.2.1 FDW开发基础&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 虽然FDW主要用C开发，但我们可以了解其架构和接口</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 1. FDW开发步骤概览</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 定义FDW处理函数（C语言）</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 创建扩展控制文件</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 编写SQL安装脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 编译为共享库</span></span>
<span class="line"><span class="__shiki_21nrsd">5. 安装和测试</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 基本的FDW处理函数模板</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">必须实现的函数：</span></span>
<span class="line"><span class="__shiki_21nrsd">- GetForeignRelSize: 估算外部表大小</span></span>
<span class="line"><span class="__shiki_21nrsd">- GetForeignPaths: 生成访问路径</span></span>
<span class="line"><span class="__shiki_21nrsd">- GetForeignPlan: 生成执行计划</span></span>
<span class="line"><span class="__shiki_21nrsd">- BeginForeignScan: 开始扫描</span></span>
<span class="line"><span class="__shiki_21nrsd">- IterateForeignScan: 获取数据</span></span>
<span class="line"><span class="__shiki_21nrsd">- ReScanForeignScan: 重新扫描</span></span>
<span class="line"><span class="__shiki_21nrsd">- EndForeignScan: 结束扫描</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">可选实现的函数：</span></span>
<span class="line"><span class="__shiki_21nrsd">- GetForeignJoinPaths: 连接路径</span></span>
<span class="line"><span class="__shiki_21nrsd">- GetForeignUpperPaths: 上层操作</span></span>
<span class="line"><span class="__shiki_21nrsd">- ExecForeignInsert/Update/Delete: DML操作</span></span>
<span class="line"><span class="__shiki_21nrsd">- AnalyzeForeignTable: 收集统计信息</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 示例：简单的CSV FDW实现思路</span></span>
<span class="line"><span class="__shiki_21nrsd">-- （实际需要C代码，这里展示SQL接口部分）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建包装器类型</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> csv_fdw_handler</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> fdw_handler</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_mdbnqw"> &#39;MODULE_PATHNAME&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;csv_fdw_handler&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> C STRICT;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> csv_fdw_validator</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">[], </span><span class="__shiki_1itgoe">oid</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_mdbnqw"> &#39;MODULE_PATHNAME&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;csv_fdw_validator&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> C STRICT;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建外部数据包装器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER csv_fdw</span></span>
<span class="line"><span class="__shiki_140thh">  HANDLER csv_fdw_handler</span></span>
<span class="line"><span class="__shiki_140thh">  VALIDATOR csv_fdw_validator;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 创建控制文件（csv_fdw.control）</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd"># csv_fdw extension</span></span>
<span class="line"><span class="__shiki_21nrsd">comment = &#39;Foreign Data Wrapper for CSV files&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">default_version = &#39;1.0&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">module_pathname = &#39;$libdir/csv_fdw&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">relocatable = true</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 创建安装脚本（csv_fdw--1.0.sql）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 见上面的CREATE FUNCTION和CREATE FOREIGN DATA WRAPPER语句</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 编译和安装</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">Makefile示例：</span></span>
<span class="line"><span class="__shiki_21nrsd">MODULES = csv_fdw</span></span>
<span class="line"><span class="__shiki_21nrsd">EXTENSION = csv_fdw</span></span>
<span class="line"><span class="__shiki_21nrsd">DATA = csv_fdw--1.0.sql</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">PG_CONFIG = pg_config</span></span>
<span class="line"><span class="__shiki_21nrsd">PGXS := $(shell $(PG_CONFIG) --pgxs)</span></span>
<span class="line"><span class="__shiki_21nrsd">include $(PGXS)</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h4 id="_4-2-2-开发高级功能fdw" tabindex="-1">4.2.2 开发高级功能FDW <a class="header-anchor" href="#_4-2-2-开发高级功能fdw" aria-label="Permalink to &quot;4.2.2 开发高级功能FDW&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 支持WHERE条件下推的FDW</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在C代码中需要解析和传递WHERE条件到外部数据源</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 支持聚合下推的FDW</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 将GROUP BY和聚合函数下推到外部数据源执行</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 支持连接下推的FDW</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 将JOIN操作下推到外部数据源</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 实现连接池的FDW</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 管理外部数据源的连接，复用连接提高性能</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 实现缓存机制的FDW</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 缓存查询结果，减少对外部数据源的访问</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 示例：REST API FDW实现思路</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 通过HTTP/REST API访问外部数据</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建REST API FDW包装器</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER rest_fdw</span></span>
<span class="line"><span class="__shiki_140thh">  HANDLER rest_fdw_handler</span></span>
<span class="line"><span class="__shiki_140thh">  VALIDATOR rest_fdw_validator;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建外部服务器（配置API端点）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> rest_api_server</span></span>
<span class="line"><span class="__shiki_140thh">FOREIGN </span><span class="__shiki_1itgoe">DATA</span><span class="__shiki_140thh"> WRAPPER rest_fdw</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    endpoint</span><span class="__shiki_mdbnqw"> &#39;https://api.example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    auth_type </span><span class="__shiki_mdbnqw">&#39;bearer&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    timeout</span><span class="__shiki_mdbnqw"> &#39;30&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建外部表（映射API资源）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> api_users (</span></span>
<span class="line"><span class="__shiki_140thh">    user_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    name</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SERVER</span><span class="__shiki_140thh"> rest_api_server</span></span>
<span class="line"><span class="__shiki_140thh">OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    resource</span><span class="__shiki_mdbnqw"> &#39;/users&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">-- API资源路径</span></span>
<span class="line"><span class="__shiki_140thh">    method </span><span class="__shiki_mdbnqw">&#39;GET&#39;</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd">-- HTTP方法</span></span>
<span class="line"><span class="__shiki_140thh">    pagination </span><span class="__shiki_mdbnqw">&#39;cursor&#39;</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">-- 分页类型</span></span>
<span class="line"><span class="__shiki_140thh">    page_size </span><span class="__shiki_mdbnqw">&#39;100&#39;</span><span class="__shiki_21nrsd">             -- 每页大小</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 查询API数据（WHERE条件转换为查询参数）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> api_users </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 转换为：GET /users?user_id=gt.1000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 实现流式处理的FDW</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 支持大规模数据流式处理，避免内存溢出</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 实现列式存储FDW</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化列式数据源的访问（如Parquet、ORC格式）</span></span></code></pre></div><h3 id="_4-3-fdw性能优化与监控" tabindex="-1">4.3 FDW性能优化与监控 <a class="header-anchor" href="#_4-3-fdw性能优化与监控" aria-label="Permalink to &quot;4.3 FDW性能优化与监控&quot;">​</a></h3><h4 id="_4-3-1-性能优化策略" tabindex="-1">4.3.1 性能优化策略 <a class="header-anchor" href="#_4-3-1-性能优化策略" aria-label="Permalink to &quot;4.3.1 性能优化策略&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 连接池优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建连接池管理函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> manage_fdw_connections</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    server_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> server_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> srvname, srvoptions</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_foreign_server</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> srvfdw </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> oid</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_foreign_data_wrapper </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> fdwname </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;postgres_fdw&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 检查连接使用情况</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">            SELECT</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> pg_foreign_server_connections </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> server_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> server_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            AND</span><span class="__shiki_140thh"> idle_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 关闭空闲连接</span></span>
<span class="line"><span class="__shiki_140thh">            PERFORM pg_terminate_backend(pid)</span></span>
<span class="line"><span class="__shiki_1itgoe">            FROM</span><span class="__shiki_140thh"> pg_foreign_server_connections</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHERE</span><span class="__shiki_140thh"> server_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> server_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span></span>
<span class="line"><span class="__shiki_1itgoe">            AND</span><span class="__shiki_140thh"> idle_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 查询缓存优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建查询结果缓存表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_query_cache</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    query_hash </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    result_data JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    cached_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    expires_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    hit_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 缓存查询函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> cached_fdw_query</span><span class="__shiki_140thh">(p_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">, p_ttl INTERVAL </span><span class="__shiki_1itgoe">DEFAULT</span><span class="__shiki_mdbnqw"> &#39;5 minutes&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_hash </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_cached JSONB;</span></span>
<span class="line"><span class="__shiki_140thh">    v_result JSONB;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 计算查询哈希</span></span>
<span class="line"><span class="__shiki_140thh">    v_hash :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> md5(p_query);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> result_data </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_cached</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_query_cache</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> query_hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_hash</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> expires_at </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> v_cached </span><span class="__shiki_1itgoe">IS NOT NULL</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 更新命中计数</span></span>
<span class="line"><span class="__shiki_1itgoe">        UPDATE</span><span class="__shiki_140thh"> fdw_query_cache</span></span>
<span class="line"><span class="__shiki_1itgoe">        SET</span><span class="__shiki_140thh"> hit_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> hit_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> query_hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> v_hash;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_140thh"> v_cached;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 执行查询并缓存结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_mdbnqw"> &#39;SELECT jsonb_agg(row_to_json(t)) FROM (&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> p_query </span><span class="__shiki_1itgoe">||</span><span class="__shiki_mdbnqw"> &#39;) t&#39;</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_140thh"> v_result;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    INSERT INTO</span><span class="__shiki_140thh"> fdw_query_cache </span></span>
<span class="line"><span class="__shiki_140thh">        (query_hash, query_text, result_data, expires_at)</span></span>
<span class="line"><span class="__shiki_1itgoe">    VALUES</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        (v_hash, p_query, v_result, </span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> p_ttl)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ON</span><span class="__shiki_140thh"> CONFLICT (query_hash) DO </span><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_1itgoe"> SET</span></span>
<span class="line"><span class="__shiki_140thh">        result_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">result_data</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        cached_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        expires_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> EXCLUDED</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">expires_at</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        hit_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> v_result;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 并行查询优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用并行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span><span class="__shiki_1itgoe">SET</span><span class="__shiki_140thh"> parallel_degree </span><span class="__shiki_mdbnqw">&#39;4&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 监控并行查询性能</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> parallel_query_stats</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    query,</span></span>
<span class="line"><span class="__shiki_140thh">    plans,</span></span>
<span class="line"><span class="__shiki_140thh">    total_plan_time,</span></span>
<span class="line"><span class="__shiki_140thh">    avg_plan_time,</span></span>
<span class="line"><span class="__shiki_140thh">    executions,</span></span>
<span class="line"><span class="__shiki_140thh">    total_exec_time,</span></span>
<span class="line"><span class="__shiki_140thh">    avg_exec_time,</span></span>
<span class="line"><span class="__shiki_140thh">    max_exec_time,</span></span>
<span class="line"><span class="__shiki_140thh">    rows_affected,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_hit,</span></span>
<span class="line"><span class="__shiki_140thh">    shared_blks_read</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%Parallel%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">   OR</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%parallel%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> total_exec_time </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 批量操作优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 批量插入性能测试</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> test_batch_performance</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    batch_size </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    execution_time INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    rows_per_second </span><span class="__shiki_1itgoe">NUMERIC</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    batch_sizes </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">[] :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh">[1, 10, 100, 1000, 10000];</span></span>
<span class="line"><span class="__shiki_140thh">    batch_size </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    start_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    end_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    FOREACH batch_size </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> ARRAY</span><span class="__shiki_140thh"> batch_sizes </span><span class="__shiki_1itgoe">LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 准备测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        CREATE</span><span class="__shiki_140thh"> TEMP </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> test_data </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, batch_size) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> id, </span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> generate_series</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, batch_size) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 测试批量插入</span></span>
<span class="line"><span class="__shiki_140thh">        start_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> remote_test_table </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> test_data;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        end_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 返回结果</span></span>
<span class="line"><span class="__shiki_140thh">        batch_size :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> batch_size;</span></span>
<span class="line"><span class="__shiki_140thh">        execution_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> end_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time;</span></span>
<span class="line"><span class="__shiki_140thh">        rows_per_second :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> batch_size </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (end_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 清理</span></span>
<span class="line"><span class="__shiki_1itgoe">        DROP</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> test_data;</span></span>
<span class="line"><span class="__shiki_1itgoe">        DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> remote_test_table </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> name</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;test%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 索引下推优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建支持索引下推的FDW函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> pushdown_index_scan</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    p_table_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_index_column </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    p_value ANYELEMENT</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> SETOF JSONB </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    v_result JSONB;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 构建下推查询</span></span>
<span class="line"><span class="__shiki_140thh">    v_query :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SELECT row_to_json(t) FROM %I t WHERE %I = $1&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                     p_table_name, p_index_column);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 执行下推查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY </span><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_140thh"> v_query </span><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> p_value;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h4 id="_4-3-2-监控与诊断" tabindex="-1">4.3.2 监控与诊断 <a class="header-anchor" href="#_4-3-2-监控与诊断" aria-label="Permalink to &quot;4.3.2 监控与诊断&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 创建综合监控视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> fdw_comprehensive_monitor</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> server_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">        fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">        fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">fdwname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> wrapper_type,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftrelid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> table_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(pg_relation_size(</span><span class="__shiki_dzsirb">ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftrelid</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_metadata_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">DISTINCT</span><span class="__shiki_dzsirb"> um</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">umid</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> user_mapping_count</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_foreign_server fs</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_foreign_data_wrapper fdw </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvfdw</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    LEFT JOIN</span><span class="__shiki_140thh"> pg_foreign_table ft </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftserver</span></span>
<span class="line"><span class="__shiki_1itgoe">    LEFT JOIN</span><span class="__shiki_140thh"> pg_user_mappings um </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> um</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvid</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">fdwname</span></span>
<span class="line"><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">connection_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_connections,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> active_connections,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> idle_connections,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> idle_time)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_idle_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> connection_age)) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> oldest_connection_seconds</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_foreign_server_connections</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> server_name</span></span>
<span class="line"><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">query_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        split_part(query, </span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> server_name,  </span><span class="__shiki_21nrsd">-- 简化解析</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(total_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_query_time,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(total_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_query_time,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(total_time) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> max_query_time,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">rows</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_rows_returned</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_stat_statements</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%FROM foreign_%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> split_part(query, </span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">wrapper_type</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">table_count</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    pg_size_pretty(</span><span class="__shiki_dzsirb">ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_metadata_size</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> metadata_size,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">user_mapping_count</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">active_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idle_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_idle_seconds</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_idle_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oldest_connection_seconds</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> oldest_connection_seconds,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COALESCE</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">qs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">query_count</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_count,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">COALESCE</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">qs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_query_time</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_query_time_ms,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">COALESCE</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">qs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_query_time</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_query_time_ms,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">COALESCE</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">qs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">max_query_time</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> max_query_time_ms,</span></span>
<span class="line"><span class="__shiki_dzsirb">    COALESCE</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">qs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">total_rows_returned</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> total_rows_returned</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> server_stats ss</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> connection_stats cs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> query_stats qs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> qs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_dzsirb"> ss</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 性能告警系统</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_performance_alerts</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    alert_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    alert_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    alert_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> CHECK</span><span class="__shiki_140thh"> (alert_type </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;high_latency&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;connection_error&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;data_inconsistency&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    alert_message </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    alert_severity </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> CHECK</span><span class="__shiki_140thh"> (alert_severity </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;info&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;warning&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;critical&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    resolved </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> false,</span></span>
<span class="line"><span class="__shiki_140thh">    resolved_time </span><span class="__shiki_1itgoe">TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> check_fdw_alerts</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    latency_threshold_ms </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 1秒</span></span>
<span class="line"><span class="__shiki_140thh">    error_threshold_count </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd">-- 10个错误</span></span>
<span class="line"><span class="__shiki_140thh">    server_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查高延迟</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> server_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            AVG</span><span class="__shiki_140thh">(execution_time_ms) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_latency,</span></span>
<span class="line"><span class="__shiki_dzsirb">            COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> query_count</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> fdw_query_performance</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;5 minutes&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        GROUP BY</span><span class="__shiki_140thh"> server_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        HAVING</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(execution_time_ms) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> latency_threshold_ms</span></span>
<span class="line"><span class="__shiki_1itgoe">           AND</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> fdw_performance_alerts </span></span>
<span class="line"><span class="__shiki_140thh">            (server_name, alert_type, alert_message, alert_severity)</span></span>
<span class="line"><span class="__shiki_1itgoe">        VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">            server_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;high_latency&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;平均延迟: %s ms (超过阈值: %s ms)&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                   ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">server_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_latency</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_140thh">                   latency_threshold_ms),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;warning&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查连接错误</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 这里需要根据具体FDW的错误日志实现</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 清理旧告警</span></span>
<span class="line"><span class="__shiki_1itgoe">    DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> fdw_performance_alerts </span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> alert_time </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;7 days&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">      AND</span><span class="__shiki_140thh"> resolved </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 查询计划分析</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> analyze_fdw_query_plan</span><span class="__shiki_140thh">(p_query </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    plan_step </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    estimated_rows </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    estimated_cost </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    actual_rows </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    actual_time </span><span class="__shiki_1itgoe">NUMERIC</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    v_explain_json </span><span class="__shiki_1itgoe">JSON</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 获取查询计划</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_mdbnqw"> &#39;EXPLAIN (ANALYZE, FORMAT JSON) &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> p_query </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> v_explain_json;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 解析查询计划</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    WITH</span><span class="__shiki_140thh"> plan_data </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> jsonb_array_elements(v_explain_json</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plan&#39;</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plans&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> subplan</span></span>
<span class="line"><span class="__shiki_1itgoe">        UNION ALL</span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> v_explain_json</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;Plan&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        subplan</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Node Type&#39;</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> plan_step,</span></span>
<span class="line"><span class="__shiki_140thh">        (subplan</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Plan Rows&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> estimated_rows,</span></span>
<span class="line"><span class="__shiki_140thh">        (subplan</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Total Cost&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> estimated_cost,</span></span>
<span class="line"><span class="__shiki_140thh">        (subplan</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Actual Rows&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> actual_rows,</span></span>
<span class="line"><span class="__shiki_140thh">        (subplan</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Actual Total Time&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> actual_time</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> plan_data</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> subplan</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Node Type&#39;</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%Foreign%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">       OR</span><span class="__shiki_140thh"> subplan</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;Node Type&#39;</span><span class="__shiki_1itgoe"> LIKE</span><span class="__shiki_mdbnqw"> &#39;%Join%&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 数据一致性检查</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> check_fdw_data_consistency</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    local_count </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    remote_count </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    count_diff </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    consistency_status </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    foreign_table RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> foreign_table </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> full_table_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">            ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftoptions</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_foreign_table ft </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_foreign_server fs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftserver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;f&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 获取本地计数（如果有对应的本地表）</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">            EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SELECT COUNT(*) FROM %I&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                          foreign_table</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">full_table_name</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> local_count;</span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                local_count :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 获取远程计数</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 这里需要根据具体FDW实现远程计数查询</span></span>
<span class="line"><span class="__shiki_140thh">        remote_count :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">-- 简化示例</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        count_diff :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> ABS</span><span class="__shiki_140thh">(local_count </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> remote_count);</span></span>
<span class="line"><span class="__shiki_140thh">        consistency_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> count_diff </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;consistent&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> count_diff </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;minor_diff&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;inconsistent&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h2 id="五、fdw安全与最佳实践" tabindex="-1">五、FDW安全与最佳实践 <a class="header-anchor" href="#五、fdw安全与最佳实践" aria-label="Permalink to &quot;五、FDW安全与最佳实践&quot;">​</a></h2><h3 id="_5-1-安全管理" tabindex="-1">5.1 安全管理 <a class="header-anchor" href="#_5-1-安全管理" aria-label="Permalink to &quot;5.1 安全管理&quot;">​</a></h3><h4 id="_5-1-1-访问控制" tabindex="-1">5.1.1 访问控制 <a class="header-anchor" href="#_5-1-1-访问控制" aria-label="Permalink to &quot;5.1.1 访问控制&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 最小权限原则</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建专用角色用于FDW访问</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> ROLE</span><span class="__shiki_140thh"> fdw_user </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> LOGIN</span><span class="__shiki_1itgoe"> PASSWORD</span><span class="__shiki_mdbnqw"> &#39;secure_password&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> CONNECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_1itgoe"> DATABASE</span><span class="__shiki_140thh"> current_database </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> fdw_user;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 细粒度权限控制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 为外部表设置权限</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> remote_employees </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> fdw_user;</span></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> INSERT</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">UPDATE</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> remote_employees </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> fdw_app_user;</span></span>
<span class="line"><span class="__shiki_1itgoe">REVOKE</span><span class="__shiki_140thh"> ALL </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> FOREIGN </span><span class="__shiki_1itgoe">TABLE</span><span class="__shiki_140thh"> sensitive_data </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> PUBLIC;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 行级安全策略（PostgreSQL 9.5+）</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 为外部表添加行级安全</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> remote_employees </span><span class="__shiki_1itgoe">ENABLE</span><span class="__shiki_1itgoe"> ROW</span><span class="__shiki_1itgoe"> LEVEL</span><span class="__shiki_1itgoe"> SECURITY</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> POLICY</span><span class="__shiki_140thh"> employee_access_policy </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> remote_employees</span></span>
<span class="line"><span class="__shiki_1itgoe">FOR</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> TO</span><span class="__shiki_140thh"> fdw_user</span></span>
<span class="line"><span class="__shiki_1itgoe">USING</span><span class="__shiki_140thh"> (department_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current_setting(</span><span class="__shiki_mdbnqw">&#39;app.current_department_id&#39;</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 列级权限控制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建视图隐藏敏感列</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> safe_employee_view</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    employee_id,</span></span>
<span class="line"><span class="__shiki_140thh">    first_name,</span></span>
<span class="line"><span class="__shiki_140thh">    last_name,</span></span>
<span class="line"><span class="__shiki_140thh">    department_id,</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 隐藏薪资信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    NULL</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> salary,</span></span>
<span class="line"><span class="__shiki_140thh">    hire_date</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_employees;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">GRANT</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> ON</span><span class="__shiki_140thh"> safe_employee_view </span><span class="__shiki_1itgoe">TO</span><span class="__shiki_140thh"> reporting_user;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 审计日志</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 启用外部表审计</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_audit_log</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    audit_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    audit_time </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    operation </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_text </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    client_addr </span><span class="__shiki_1itgoe">INET</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    application_name </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> log_fdw_operations</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> event_trigger </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    r RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_1itgoe"> SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> pg_event_trigger_ddl_commands() </span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        IF</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">command_tag</span><span class="__shiki_1itgoe"> IN</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;SELECT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;INSERT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;UPDATE&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;DELETE&#39;</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">           AND</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">object_type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;foreign table&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">            INSERT INTO</span><span class="__shiki_140thh"> fdw_audit_log </span></span>
<span class="line"><span class="__shiki_140thh">                (username, server_name, table_name, operation, query_text, client_addr, application_name)</span></span>
<span class="line"><span class="__shiki_1itgoe">            VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">                current_user,</span></span>
<span class="line"><span class="__shiki_140thh">                (</span><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> srvname </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> pg_foreign_server fs </span></span>
<span class="line"><span class="__shiki_1itgoe">                 JOIN</span><span class="__shiki_140thh"> pg_foreign_table ft </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftserver</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">                 WHERE</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftrelid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">objid</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">                r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">object_identity</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                r</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">command_tag</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                current_query(),</span></span>
<span class="line"><span class="__shiki_140thh">                inet_client_addr(),</span></span>
<span class="line"><span class="__shiki_140thh">                current_setting(</span><span class="__shiki_mdbnqw">&#39;application_name&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> EVENT</span><span class="__shiki_140thh"> TRIGGER fdw_audit_trigger</span></span>
<span class="line"><span class="__shiki_1itgoe">ON</span><span class="__shiki_140thh"> ddl_command_end</span></span>
<span class="line"><span class="__shiki_1itgoe">EXECUTE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_140thh"> log_fdw_operations();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 连接安全</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用SSL连接外部服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_postgres OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> sslmode </span><span class="__shiki_mdbnqw">&#39;verify-full&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> sslrootcert </span><span class="__shiki_mdbnqw">&#39;/path/to/ca.crt&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> sslcert </span><span class="__shiki_mdbnqw">&#39;/path/to/client.crt&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    SET</span><span class="__shiki_140thh"> sslkey </span><span class="__shiki_mdbnqw">&#39;/path/to/client.key&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 密码管理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用password_encryption</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> USER</span><span class="__shiki_140thh"> fdw_user </span><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> ENCRYPTED</span><span class="__shiki_1itgoe"> PASSWORD</span><span class="__shiki_mdbnqw"> &#39;new_password&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 或者使用.pgpass文件</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 在~/.pgpass中添加：hostname:port:database:username:password</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 网络隔离</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用防火墙规则限制访问</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 只允许特定IP访问外部数据源</span></span></code></pre></div><h4 id="_5-1-2-数据加密与脱敏" tabindex="-1">5.1.2 数据加密与脱敏 <a class="header-anchor" href="#_5-1-2-数据加密与脱敏" aria-label="Permalink to &quot;5.1.2 数据加密与脱敏&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 数据传输加密</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 配置SSL/TLS连接</span></span>
<span class="line"><span class="__shiki_1itgoe">ALTER</span><span class="__shiki_1itgoe"> SERVER</span><span class="__shiki_140thh"> foreign_mysql OPTIONS (</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> ssl_cipher </span><span class="__shiki_mdbnqw">&#39;TLS_AES_256_GCM_SHA384&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ADD</span><span class="__shiki_140thh"> ssl_verify_server_cert </span><span class="__shiki_mdbnqw">&#39;true&#39;</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 数据加密函数</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 使用pgcrypto扩展进行数据加密</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> pgcrypto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 加密敏感数据视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> encrypted_employee_data</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    employee_id,</span></span>
<span class="line"><span class="__shiki_140thh">    first_name,</span></span>
<span class="line"><span class="__shiki_140thh">    last_name,</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 加密薪资数据</span></span>
<span class="line"><span class="__shiki_140thh">    encode(encrypt(</span></span>
<span class="line"><span class="__shiki_140thh">        salary::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">bytea</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;encryption_key&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;aes&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ), </span><span class="__shiki_mdbnqw">&#39;base64&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> encrypted_salary,</span></span>
<span class="line"><span class="__shiki_140thh">    hire_date</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_employees;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 数据脱敏</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> mask_sensitive_data</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">data</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_1itgoe"> AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 脱敏逻辑：保留前2个字符，其余替换为*</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_dzsirb"> LEFT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> repeat</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">GREATEST</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">length</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">data</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 脱敏视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> masked_customer_data</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    customer_id,</span></span>
<span class="line"><span class="__shiki_140thh">    mask_sensitive_data(first_name) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> first_name,</span></span>
<span class="line"><span class="__shiki_140thh">    mask_sensitive_data(last_name) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> last_name,</span></span>
<span class="line"><span class="__shiki_140thh">    mask_sensitive_data(email) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> email,</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 脱敏电话号码</span></span>
<span class="line"><span class="__shiki_140thh">    regexp_replace(phone, </span><span class="__shiki_mdbnqw">&#39;(\\d{3})\\d{4}(\\d{4})&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;\\1****\\2&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> phone</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_customers;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 动态数据屏蔽</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> dynamic_data_masking</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> TRIGGER </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 根据用户角色决定返回的数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> current_user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;reporting_user&#39;</span><span class="__shiki_1itgoe"> THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 对报告用户屏蔽敏感数据</span></span>
<span class="line"><span class="__shiki_dzsirb">        NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">salary</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">        NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ssn</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 数据水印</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 添加数据水印用于追踪</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> add_data_watermark</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> TRIGGER </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_dzsirb">    NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">watermark</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> md5(</span><span class="__shiki_dzsirb">NEW</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">employee_id</span><span class="__shiki_140thh">::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> current_timestamp::</span><span class="__shiki_1itgoe">text</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> NEW;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 数据完整性验证</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> verify_data_integrity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    record_count </span><span class="__shiki_1itgoe">BIGINT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    checksum</span><span class="__shiki_1itgoe"> TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    verification_time </span><span class="__shiki_1itgoe">TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    ft RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> ft </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;.&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> full_name</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relkind</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;f&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                %L as table_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                COUNT(*) as record_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                md5(string_agg(employee_id::text, &#39;&#39;,&#39;&#39; ORDER BY employee_id)) as checksum,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                now() as verification_time</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM %I</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">full_name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">full_name</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">INTO</span><span class="__shiki_140thh"> table_name, record_count, </span><span class="__shiki_1itgoe">checksum</span><span class="__shiki_140thh">, verification_time;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h3 id="_5-2-最佳实践" tabindex="-1">5.2 最佳实践 <a class="header-anchor" href="#_5-2-最佳实践" aria-label="Permalink to &quot;5.2 最佳实践&quot;">​</a></h3><h4 id="_5-2-1-架构设计最佳实践" tabindex="-1">5.2.1 架构设计最佳实践 <a class="header-anchor" href="#_5-2-1-架构设计最佳实践" aria-label="Permalink to &quot;5.2.1 架构设计最佳实践&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 分层架构设计</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">建议的FDW架构：</span></span>
<span class="line"><span class="__shiki_21nrsd">应用层 → 业务视图层 → 联邦视图层 → 外部表层 → 外部数据源</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">各层职责：</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 外部表层：原始外部表映射</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 联邦视图层：跨数据源关联</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 业务视图层：业务逻辑封装</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 应用层：最终用户访问</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 创建架构层次</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 外部表架构（原始映射）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SCHEMA</span><span class="__shiki_1t8gfj"> fdw_raw</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 联邦视图架构（跨源关联）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SCHEMA</span><span class="__shiki_1t8gfj"> fdw_federated</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 业务视图架构（业务封装）</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> SCHEMA</span><span class="__shiki_1t8gfj"> fdw_business</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 数据源注册表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_data_source_registry</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    source_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> UNIQUE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- &#39;postgres&#39;, &#39;mysql&#39;, &#39;oracle&#39;, &#39;file&#39;, &#39;api&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    connection_params JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    owner_role </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    is_active </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> true,</span></span>
<span class="line"><span class="__shiki_140thh">    health_check_url </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_health_check </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    health_status </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 数据血缘管理</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_data_lineage</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    lineage_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    source_id </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_1itgoe"> REFERENCES</span><span class="__shiki_140thh"> fdw_data_source_registry(source_id),</span></span>
<span class="line"><span class="__shiki_140thh">    source_object </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    target_schema </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    target_object </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    transformation_type </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- &#39;direct&#39;, &#39;join&#39;, &#39;aggregate&#39;, &#39;filter&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    transformation_logic </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    refresh_schedule </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    last_refresh </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    next_refresh </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    refresh_status </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    data_freshness INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    quality_metrics JSONB</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 容量规划表</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_capacity_planning</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    plan_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    estimated_connections </span><span class="__shiki_1itgoe">INTEGER</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    estimated_throughput_mbps </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    peak_hours </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    backup_window </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    maintenance_window </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    scaling_strategy JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 灾难恢复计划</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_disaster_recovery</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    recovery_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    recovery_point_objective INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    recovery_time_objective INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    backup_strategy </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    replication_strategy </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    failover_procedure </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    contact_persons JSONB,</span></span>
<span class="line"><span class="__shiki_140thh">    last_tested </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    test_results </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 性能基准</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_1t8gfj"> fdw_performance_baseline</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    baseline_id </span><span class="__shiki_1itgoe">SERIAL</span><span class="__shiki_1itgoe"> PRIMARY KEY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    server_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    query_pattern </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    expected_latency_ms </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    expected_throughput_rps </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    acceptable_error_rate </span><span class="__shiki_1itgoe">NUMERIC</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    measurement_window INTERVAL,</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    is_active </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_1itgoe"> DEFAULT</span><span class="__shiki_140thh"> true</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 文档自动化</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> generate_fdw_documentation</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    section </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">TEXT</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 数据源清单</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;数据源清单&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        string_agg</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">            format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;- %s (%s): %s&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                   source_name, </span></span>
<span class="line"><span class="__shiki_140thh">                   source_type, </span></span>
<span class="line"><span class="__shiki_140thh">                   connection_params</span><span class="__shiki_1itgoe">-&gt;&gt;</span><span class="__shiki_mdbnqw">&#39;host&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            E</span><span class="__shiki_mdbnqw">&#39;\\n&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_data_source_registry</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> is_active;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 外部表清单</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;外部表清单&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        string_agg</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">            format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;- %s.%s → %s.%s&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                   n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">nspname</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                   c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relname</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                   fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                   ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftoptions</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;table_name&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            E</span><span class="__shiki_mdbnqw">&#39;\\n&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_class c</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_namespace n </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">relnamespace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_foreign_table ft </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftrelid</span></span>
<span class="line"><span class="__shiki_1itgoe">    JOIN</span><span class="__shiki_140thh"> pg_foreign_server fs </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> ft</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">ftserver</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 性能指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> QUERY</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;性能指标&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        string_agg</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">            format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;- %s: 平均延迟 %s ms, 查询数 %s&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                   server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">                   ROUND</span><span class="__shiki_140thh">(avg_query_time_ms, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                   query_count),</span></span>
<span class="line"><span class="__shiki_140thh">            E</span><span class="__shiki_mdbnqw">&#39;\\n&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_comprehensive_monitor;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span></code></pre></div><h4 id="_5-2-2-运维最佳实践" tabindex="-1">5.2.2 运维最佳实践 <a class="header-anchor" href="#_5-2-2-运维最佳实践" aria-label="Permalink to &quot;5.2.2 运维最佳实践&quot;">​</a></h4><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 自动化部署脚本</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 创建FDW部署函数</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> deploy_fdw_infrastructure</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    source_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建包装器</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM create_fdw_wrappers();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建服务器和用户映射</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> source_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> fdw_data_source_registry </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> is_active</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 创建服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE SERVER IF NOT EXISTS %I</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FOREIGN DATA WRAPPER %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">            OPTIONS (%s)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">            source_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">source_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            source_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">source_type</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;_fdw&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            json_to_options(</span><span class="__shiki_dzsirb">source_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">connection_params</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 创建用户映射</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CREATE USER MAPPING IF NOT EXISTS FOR CURRENT_USER</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SERVER %I</span></span>
<span class="line"><span class="__shiki_mdbnqw">            OPTIONS (%s)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            source_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">source_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            json_to_options(</span><span class="__shiki_dzsirb">source_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">connection_params</span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_mdbnqw">&#39;auth&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建外部表</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM import_foreign_schemas();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 创建视图</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM create_business_views();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;FDW基础设施部署完成&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 健康检查系统</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> perform_fdw_health_checks</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    check_name </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    check_result </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    check_status </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    check_time </span><span class="__shiki_1itgoe">TIMESTAMP</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    server_record RECORD;</span></span>
<span class="line"><span class="__shiki_140thh">    check_start </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    check_end </span><span class="__shiki_1itgoe">TIMESTAMP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    check_start :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 连接性检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> server_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_140thh"> srvname, </span><span class="__shiki_dzsirb">fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">fdwname</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> wrapper_type</span></span>
<span class="line"><span class="__shiki_1itgoe">        FROM</span><span class="__shiki_140thh"> pg_foreign_server fs</span></span>
<span class="line"><span class="__shiki_1itgoe">        JOIN</span><span class="__shiki_140thh"> pg_foreign_data_wrapper fdw </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvfdw</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> fdw</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oid</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_1itgoe">        BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 尝试简单查询</span></span>
<span class="line"><span class="__shiki_1itgoe">            EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SELECT 1 FROM %I LIMIT 1&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                          &#39;foreign_table_&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> server_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            check_result :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;连接成功&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            check_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;PASS&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">                check_result :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;连接失败: &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> SQLERRM;</span></span>
<span class="line"><span class="__shiki_140thh">                check_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;FAIL&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        check_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;连接性检查 - &#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> server_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">srvname</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        check_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> check_start;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 性能检查</span></span>
<span class="line"><span class="__shiki_140thh">    check_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;性能检查&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> AND</span><span class="__shiki_dzsirb"> AVG</span><span class="__shiki_140thh">(avg_query_time_ms) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_mdbnqw"> &#39;性能正常&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;性能警告&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_140thh"> check_result</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_comprehensive_monitor;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    check_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> check_result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;性能正常&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;PASS&#39;</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_mdbnqw"> &#39;WARNING&#39;</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    check_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> check_start;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 数据新鲜度检查</span></span>
<span class="line"><span class="__shiki_140thh">    check_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;数据新鲜度检查&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            WHEN</span><span class="__shiki_dzsirb"> MAX</span><span class="__shiki_140thh">(last_refresh) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">            THEN</span><span class="__shiki_mdbnqw"> &#39;数据新鲜&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">            ELSE</span><span class="__shiki_mdbnqw"> &#39;数据陈旧&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        END</span><span class="__shiki_1itgoe"> INTO</span><span class="__shiki_140thh"> check_result</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_data_lineage;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    check_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> CASE</span><span class="__shiki_1itgoe"> WHEN</span><span class="__shiki_140thh"> check_result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;数据新鲜&#39;</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;PASS&#39;</span><span class="__shiki_1itgoe"> ELSE</span><span class="__shiki_mdbnqw"> &#39;WARNING&#39;</span><span class="__shiki_1itgoe"> END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    check_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> check_start;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    check_end :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> clock_timestamp();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 总体健康状态</span></span>
<span class="line"><span class="__shiki_140thh">    check_name :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;总体健康状态&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    check_result :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;检查完成，耗时 %s 秒&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                          EXTRACT(EPOCH </span><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> check_end </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> check_start));</span></span>
<span class="line"><span class="__shiki_140thh">    check_status :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;INFO&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    check_time :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> check_end;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_1itgoe"> NEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 容量监控</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> fdw_capacity_monitoring</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> connection_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> current_connections,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> active_connections,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">FILTER</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_1itgoe"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;idle&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> idle_connections,</span></span>
<span class="line"><span class="__shiki_dzsirb">        MAX</span><span class="__shiki_140thh">(connection_age) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> oldest_connection</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> pg_foreign_server_connections</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> server_name</span></span>
<span class="line"><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">throughput_stats </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        server_name,</span></span>
<span class="line"><span class="__shiki_dzsirb">        COUNT</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> queries_last_hour,</span></span>
<span class="line"><span class="__shiki_dzsirb">        SUM</span><span class="__shiki_140thh">(rows_returned) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> rows_returned_last_hour,</span></span>
<span class="line"><span class="__shiki_dzsirb">        AVG</span><span class="__shiki_140thh">(execution_time_ms) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> avg_query_time_ms</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_query_performance</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> check_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> interval </span><span class="__shiki_mdbnqw">&#39;1 hour&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    GROUP BY</span><span class="__shiki_140thh"> server_name</span></span>
<span class="line"><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">capacity_plan </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        server_name,</span></span>
<span class="line"><span class="__shiki_140thh">        estimated_connections,</span></span>
<span class="line"><span class="__shiki_140thh">        estimated_throughput_mbps</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> fdw_capacity_planning</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">current_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cp</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">estimated_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ROUND</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">current_connections</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">cp</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">estimated_connections</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> connection_usage_percent,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ts</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">queries_last_hour</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    ts</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">avg_query_time_ms</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">active_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">idle_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">oldest_connection</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    CASE</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">current_connections</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">cp</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">estimated_connections</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 80</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;警告: 连接数接近上限&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_dzsirb"> cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">current_connections</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> NULLIF</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">cp</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">estimated_connections</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_1itgoe"> THEN</span><span class="__shiki_mdbnqw"> &#39;严重: 连接数超限&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ELSE</span><span class="__shiki_mdbnqw"> &#39;正常&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> capacity_status</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> connection_stats cs</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> throughput_stats ts </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> ts</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span></span>
<span class="line"><span class="__shiki_1itgoe">LEFT JOIN</span><span class="__shiki_140thh"> capacity_plan cp </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> cs</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> cp</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span></span>
<span class="line"><span class="__shiki_1itgoe">ORDER BY</span><span class="__shiki_140thh"> connection_usage_percent </span><span class="__shiki_1itgoe">DESC</span><span class="__shiki_1itgoe"> NULLS</span><span class="__shiki_1itgoe"> LAST</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 自动化伸缩</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> auto_scale_fdw_connections</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> void </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    capacity_record RECORD;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    FOR</span><span class="__shiki_140thh"> capacity_record </span><span class="__shiki_1itgoe">IN</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">        SELECT</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> fdw_capacity_monitoring </span></span>
<span class="line"><span class="__shiki_1itgoe">        WHERE</span><span class="__shiki_140thh"> capacity_status </span><span class="__shiki_1itgoe">LIKE</span><span class="__shiki_mdbnqw"> &#39;%严重%&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LOOP</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 自动增加连接数配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ALTER SERVER %I OPTIONS (</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SET max_connections %s</span></span>
<span class="line"><span class="__shiki_mdbnqw">            )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">            capacity_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">capacity_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">estimated_connections</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">integer</span><span class="__shiki_21nrsd">  -- 增加20%</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 记录伸缩操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> fdw_auto_scaling_log (</span></span>
<span class="line"><span class="__shiki_140thh">            server_name,</span></span>
<span class="line"><span class="__shiki_140thh">            action_taken,</span></span>
<span class="line"><span class="__shiki_140thh">            old_value,</span></span>
<span class="line"><span class="__shiki_140thh">            new_value,</span></span>
<span class="line"><span class="__shiki_140thh">            reason</span></span>
<span class="line"><span class="__shiki_140thh">        ) </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">            capacity_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;increase_connections&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            capacity_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">estimated_connections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">capacity_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">estimated_connections</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)::</span><span class="__shiki_1itgoe">integer</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;连接使用率超过90%&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;自动伸缩: 为服务器 % 增加连接数&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">capacity_record</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">server_name</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> LOOP</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 备份和恢复</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> backup_fdw_configuration()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    backup_file </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 生成备份文件名</span></span>
<span class="line"><span class="__shiki_140thh">    backup_file :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/backup/fdw_config_%s.sql&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                         to_char(</span><span class="__shiki_1itgoe">now</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&#39;YYYYMMDD_HH24MISS&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 导出FDW配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        COPY (</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                format(&#39;&#39;CREATE SERVER %%I FOREIGN DATA WRAPPER %%I OPTIONS (%%s);&#39;&#39;, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                       srvname, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                       fdw.fdwname,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       string_agg(format(&#39;&#39;%%L %%L&#39;&#39;, option, value), &#39;&#39;, &#39;&#39;))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM pg_foreign_server fs</span></span>
<span class="line"><span class="__shiki_mdbnqw">            JOIN pg_foreign_data_wrapper fdw ON fs.srvfdw = fdw.oid</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CROSS JOIN LATERAL json_each_text(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                json_object(fs.srvoptions::text::cstring)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ) AS opts(option, value)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            GROUP BY srvname, fdw.fdwname</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ) TO PROGRAM &#39;&#39;cat &gt; %s&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">, backup_file);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 导出外部表定义</span></span>
<span class="line"><span class="__shiki_1itgoe">    EXECUTE</span><span class="__shiki_dzsirb"> format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        COPY (</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                format(&#39;&#39;CREATE FOREIGN TABLE %%I.%%I (%%s) SERVER %%I OPTIONS (%%s);&#39;&#39;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       n.nspname,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       c.relname,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       string_agg(format(&#39;&#39;%%I %%s&#39;&#39;, a.attname, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                                        format_type(a.atttypid, a.atttypmod)), &#39;&#39;, &#39;&#39;),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       fs.srvname,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       string_agg(format(&#39;&#39;%%L %%L&#39;&#39;, option, value), &#39;&#39;, &#39;&#39;))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM pg_class c</span></span>
<span class="line"><span class="__shiki_mdbnqw">            JOIN pg_namespace n ON c.relnamespace = n.oid</span></span>
<span class="line"><span class="__shiki_mdbnqw">            JOIN pg_foreign_table ft ON c.oid = ft.ftrelid</span></span>
<span class="line"><span class="__shiki_mdbnqw">            JOIN pg_foreign_server fs ON ft.ftserver = fs.oid</span></span>
<span class="line"><span class="__shiki_mdbnqw">            JOIN pg_attribute a ON c.oid = a.attrelid</span></span>
<span class="line"><span class="__shiki_mdbnqw">            CROSS JOIN LATERAL json_each_text(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                json_object(ft.ftoptions::text::cstring)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ) AS opts(option, value)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE a.attnum &gt; 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">              AND NOT a.attisdropped</span></span>
<span class="line"><span class="__shiki_mdbnqw">            GROUP BY n.nspname, c.relname, fs.srvname</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ) TO PROGRAM &#39;&#39;cat &gt;&gt; %s&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;</span><span class="__shiki_140thh">, backup_file);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    RAISE NOTICE </span><span class="__shiki_mdbnqw">&#39;FDW配置已备份到: %&#39;</span><span class="__shiki_140thh">, backup_file;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span></code></pre></div><h2 id="六、fdw限制与未来发展" tabindex="-1">六、FDW限制与未来发展 <a class="header-anchor" href="#六、fdw限制与未来发展" aria-label="Permalink to &quot;六、FDW限制与未来发展&quot;">​</a></h2><h3 id="_6-1-当前限制与变通方案" tabindex="-1">6.1 当前限制与变通方案 <a class="header-anchor" href="#_6-1-当前限制与变通方案" aria-label="Permalink to &quot;6.1 当前限制与变通方案&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 事务一致性限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 问题：跨数据源的两阶段提交支持有限</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 变通方案：使用补偿事务模式</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> distributed_transaction_with_compensation()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">DECLARE</span></span>
<span class="line"><span class="__shiki_140thh">    local_success </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_140thh">    remote_success </span><span class="__shiki_1itgoe">BOOLEAN</span><span class="__shiki_140thh"> :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 尝试本地操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> local_table </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        local_success :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_140thh">    EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            local_success :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 尝试远程操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    BEGIN</span></span>
<span class="line"><span class="__shiki_1itgoe">        INSERT INTO</span><span class="__shiki_140thh"> remote_table </span><span class="__shiki_1itgoe">VALUES</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;data&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        remote_success :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> true;</span></span>
<span class="line"><span class="__shiki_140thh">    EXCEPTION</span></span>
<span class="line"><span class="__shiki_1itgoe">        WHEN</span><span class="__shiki_140thh"> OTHERS </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_140thh">            remote_success :</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> false;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查并执行补偿</span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> local_success </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_140thh"> remote_success </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 补偿：回滚本地操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> local_table </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;分布式事务失败，已执行补偿&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    ELSIF </span><span class="__shiki_1itgoe">NOT</span><span class="__shiki_140thh"> local_success </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> remote_success </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 补偿：回滚远程操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        DELETE</span><span class="__shiki_1itgoe"> FROM</span><span class="__shiki_140thh"> remote_table </span><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        RAISE EXCEPTION </span><span class="__shiki_mdbnqw">&#39;分布式事务失败，已执行补偿&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    IF</span><span class="__shiki_140thh"> local_success </span><span class="__shiki_1itgoe">AND</span><span class="__shiki_140thh"> remote_success </span><span class="__shiki_1itgoe">THEN</span></span>
<span class="line"><span class="__shiki_1itgoe">        COMMIT</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ELSE</span></span>
<span class="line"><span class="__shiki_1itgoe">        ROLLBACK</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    END</span><span class="__shiki_1itgoe"> IF</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 性能限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 问题：大规模JOIN性能差</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 变通方案：使用物化视图预计算</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> MATERIALIZED VIEW precomputed_joins </span><span class="__shiki_1itgoe">AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">value</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">category</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_table_a a</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> remote_table_b b </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> a</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">a_id</span></span>
<span class="line"><span class="__shiki_1itgoe">JOIN</span><span class="__shiki_140thh"> remote_table_c c </span><span class="__shiki_1itgoe">ON</span><span class="__shiki_dzsirb"> b</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">c_id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> c</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">id</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_1itgoe"> DATA</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 定期刷新</span></span>
<span class="line"><span class="__shiki_140thh">REFRESH MATERIALIZED VIEW CONCURRENTLY precomputed_joins;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 数据类型映射限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 问题：某些数据类型不支持</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 变通方案：使用自定义转换函数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE OR REPLACE</span><span class="__shiki_1itgoe"> FUNCTION</span><span class="__shiki_1t8gfj"> convert_special_type</span><span class="__shiki_140thh">(p_value </span><span class="__shiki_1itgoe">TEXT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">RETURNS</span><span class="__shiki_140thh"> JSONB </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 自定义转换逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">    RETURN</span><span class="__shiki_140thh"> p_value::jsonb;</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$ </span><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. DDL操作限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 问题：不能通过FDW执行CREATE TABLE等DDL</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 变通方案：使用dblink或外部脚本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_140thh"> EXTENSION </span><span class="__shiki_1itgoe">IF</span><span class="__shiki_1itgoe"> NOT</span><span class="__shiki_1itgoe"> EXISTS</span><span class="__shiki_140thh"> dblink;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> OR</span><span class="__shiki_1itgoe"> REPLACE</span><span class="__shiki_1itgoe"> PROCEDURE</span><span class="__shiki_140thh"> create_remote_table()</span></span>
<span class="line"><span class="__shiki_1itgoe">LANGUAGE</span><span class="__shiki_140thh"> plpgsql</span></span>
<span class="line"><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> $$</span></span>
<span class="line"><span class="__shiki_1itgoe">BEGIN</span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM dblink_connect(</span><span class="__shiki_mdbnqw">&#39;remote_conn&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;host=remote_host dbname=remote_db user=admin&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM dblink_exec(</span><span class="__shiki_mdbnqw">&#39;remote_conn&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;CREATE TABLE new_table (id SERIAL PRIMARY KEY, data TEXT)&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    PERFORM dblink_disconnect(</span><span class="__shiki_mdbnqw">&#39;remote_conn&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">END</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">$$;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 复杂查询下推限制</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 变通方案：手动优化查询结构</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 原查询（可能无法完全下推）</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> remote_table</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> complex_condition(x, y, z);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 优化后查询</span></span>
<span class="line"><span class="__shiki_1itgoe">WITH</span><span class="__shiki_140thh"> filtered_data </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 下推简单条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">    FROM</span><span class="__shiki_140thh"> remote_table</span></span>
<span class="line"><span class="__shiki_1itgoe">    WHERE</span><span class="__shiki_140thh"> simple_condition(x)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> filtered_data</span></span>
<span class="line"><span class="__shiki_1itgoe">WHERE</span><span class="__shiki_140thh"> remaining_condition(y, z);</span></span></code></pre></div><h3 id="_6-2-未来发展趋势" tabindex="-1">6.2 未来发展趋势 <a class="header-anchor" href="#_6-2-未来发展趋势" aria-label="Permalink to &quot;6.2 未来发展趋势&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- 1. 更智能的查询下推</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 未来的FDW可能支持更复杂的下推优化</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 2. 更好的事务支持</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 增强的分布式事务管理</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 3. 云原生集成</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 与Kubernetes、Service Mesh等云原生技术集成</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 4. 机器学习优化</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 基于机器学习的查询优化和自动调优</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 5. 流式处理支持</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 实时数据流处理能力</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 6. 多模型数据库支持</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 更好的图数据、文档数据等支持</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 7. 自动化数据治理</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 集成数据质量、血缘追踪、合规性检查</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 8. 边缘计算支持</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 边缘设备上的轻量级FDW实现</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 9. 量子计算准备</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 为量子计算时代的数据处理做准备</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 10. 创建未来兼容性视图</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> VIEW</span><span class="__shiki_1t8gfj"> fdw_future_features</span><span class="__shiki_1itgoe"> AS</span></span>
<span class="line"><span class="__shiki_1itgoe">SELECT</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    feature_name,</span></span>
<span class="line"><span class="__shiki_140thh">    expected_release,</span></span>
<span class="line"><span class="__shiki_140thh">    current_status,</span></span>
<span class="line"><span class="__shiki_140thh">    potential_impact</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">VALUES</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;智能查询下推&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL 17&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;规划中&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;高&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;增强事务支持&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL 18&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;研究中&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;高&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;云原生集成&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;持续演进&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;进行中&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;中&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;机器学习优化&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;未来版本&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;实验阶段&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;高&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;流式处理&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PostgreSQL 19+&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;概念阶段&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;中&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> features(feature_name, expected_release, current_status, potential_impact);</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>PostgreSQL的FDW（外部数据包装器）是一个强大而灵活的功能，它使PostgreSQL能够作为数据联邦中心，集成和查询来自各种数据源的数据。以下是关键要点总结：</p><h3 id="核心优势" tabindex="-1">核心优势： <a class="header-anchor" href="#核心优势" aria-label="Permalink to &quot;核心优势：&quot;">​</a></h3><ol><li><strong>统一数据访问</strong>：通过标准SQL接口访问异构数据源</li><li><strong>实时数据集成</strong>：无需ETL即可实时查询外部数据</li><li><strong>简化架构</strong>：减少数据复制和同步的复杂性</li><li><strong>扩展性强</strong>：支持自定义开发新的数据源包装器</li></ol><h3 id="关键技术点" tabindex="-1">关键技术点： <a class="header-anchor" href="#关键技术点" aria-label="Permalink to &quot;关键技术点：&quot;">​</a></h3><ol><li><strong>postgres_fdw</strong>：最成熟和功能最全的FDW，支持双向数据同步</li><li><strong>查询下推</strong>：将查询操作下推到外部数据源执行，提高性能</li><li><strong>事务管理</strong>：有限的两阶段提交支持</li><li><strong>性能优化</strong>：连接池、缓存、并行查询等优化策略</li></ol><h3 id="最佳实践" tabindex="-1">最佳实践： <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践：&quot;">​</a></h3><ol><li><strong>分层架构设计</strong>：分离原始映射、联邦视图和业务视图</li><li><strong>安全性管理</strong>：最小权限原则、数据加密、审计日志</li><li><strong>监控和运维</strong>：全面的监控、告警、容量规划</li><li><strong>灾难恢复</strong>：备份配置、故障转移计划</li></ol><h3 id="应用场景" tabindex="-1">应用场景： <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景：&quot;">​</a></h3><ol><li><strong>数据湖查询</strong>：统一查询S3、HDFS等数据源</li><li><strong>多数据库联邦</strong>：跨PostgreSQL、MySQL、Oracle等联合查询</li><li><strong>实时数据集成</strong>：业务系统实时数据访问</li><li><strong>数据迁移</strong>：数据库升级和迁移的过渡方案</li></ol><h3 id="未来发展" tabindex="-1">未来发展： <a class="header-anchor" href="#未来发展" aria-label="Permalink to &quot;未来发展：&quot;">​</a></h3><p>FDW技术仍在快速发展中，未来将会有更智能的查询优化、更好的事务支持、云原生集成等增强功能。</p><p>通过合理设计和实施FDW，可以构建强大、灵活且高效的数据集成平台，满足现代企业对数据访问和集成的多样化需求。</p>`,87)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
