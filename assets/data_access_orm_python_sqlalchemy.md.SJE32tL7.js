import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"SQLAlchemy核心：Python数据访问层ORM与查询构建详解","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/python/sqlalchemy.md","filePath":"data/access/orm/python/sqlalchemy.md"}'),p={name:"data/access/orm/python/sqlalchemy.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="sqlalchemy核心-python数据访问层orm与查询构建详解" tabindex="-1">SQLAlchemy核心：Python数据访问层ORM与查询构建详解 <a class="header-anchor" href="#sqlalchemy核心-python数据访问层orm与查询构建详解" aria-label="Permalink to &quot;SQLAlchemy核心：Python数据访问层ORM与查询构建详解&quot;">​</a></h1><h2 id="一、sqlalchemy架构概述" tabindex="-1">一、SQLAlchemy架构概述 <a class="header-anchor" href="#一、sqlalchemy架构概述" aria-label="Permalink to &quot;一、SQLAlchemy架构概述&quot;">​</a></h2><h3 id="_1-1-核心架构分层" tabindex="-1">1.1 核心架构分层 <a class="header-anchor" href="#_1-1-核心架构分层" aria-label="Permalink to &quot;1.1 核心架构分层&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│           ORM（对象关系映射）        │ ← 高级API，面向对象</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│        SQL表达式语言（核心）         │ ← 中级API，SQL构建</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│              DBAPI                  │ ← 低级API，数据库驱动</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-2-核心组件" tabindex="-1">1.2 核心组件 <a class="header-anchor" href="#_1-2-核心组件" aria-label="Permalink to &quot;1.2 核心组件&quot;">​</a></h3><ul><li><strong>Engine</strong>：数据库连接和DBAPI封装</li><li><strong>Connection</strong>：活跃的数据库连接</li><li><strong>Transaction</strong>：事务管理</li><li><strong>MetaData</strong>：数据库模式描述</li><li><strong>Table</strong>：表定义</li><li><strong>Column</strong>：列定义</li><li><strong>SQL表达式语言</strong>：类型安全的SQL构建</li></ul><h2 id="二、安装与基础配置" tabindex="-1">二、安装与基础配置 <a class="header-anchor" href="#二、安装与基础配置" aria-label="Permalink to &quot;二、安装与基础配置&quot;">​</a></h2><h3 id="_2-1-安装" tabindex="-1">2.1 安装 <a class="header-anchor" href="#_2-1-安装" aria-label="Permalink to &quot;2.1 安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> sqlalchemy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据数据库选择驱动</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pymysql</span><span class="__shiki_21nrsd">      # MySQL</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> psycopg2-binary</span><span class="__shiki_21nrsd">  # PostgreSQL</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> sqlalchemy-sqlite</span><span class="__shiki_21nrsd">  # SQLite</span></span></code></pre></div><h3 id="_2-2-基础连接配置" tabindex="-1">2.2 基础连接配置 <a class="header-anchor" href="#_2-2-基础连接配置" aria-label="Permalink to &quot;2.2 基础连接配置&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> create_engine, MetaData</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基本连接配置</span></span>
<span class="line"><span class="__shiki_dzsirb">DATABASE_URL</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;dialect+driver://username:password@host:port/database&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 示例：</span></span>
<span class="line"><span class="__shiki_21nrsd"># SQLite: sqlite:///database.db</span></span>
<span class="line"><span class="__shiki_21nrsd"># MySQL: mysql+pymysql://user:pass@localhost/dbname</span></span>
<span class="line"><span class="__shiki_21nrsd"># PostgreSQL: postgresql+psycopg2://user:pass@localhost/dbname</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建引擎</span></span>
<span class="line"><span class="__shiki_140thh">engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_engine(</span></span>
<span class="line"><span class="__shiki_dzsirb">    DATABASE_URL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    echo</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd"># 输出SQL日志</span></span>
<span class="line"><span class="__shiki_1jdh33">    pool_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd"># 连接池大小</span></span>
<span class="line"><span class="__shiki_1jdh33">    max_overflow</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd"># 最大溢出连接数</span></span>
<span class="line"><span class="__shiki_1jdh33">    pool_recycle</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd"># 连接回收时间(秒)</span></span>
<span class="line"><span class="__shiki_1jdh33">    pool_pre_ping</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_21nrsd">    # 连接前检查</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建元数据</span></span>
<span class="line"><span class="__shiki_140thh">metadata </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> MetaData()</span></span></code></pre></div><h2 id="三、表结构定义" tabindex="-1">三、表结构定义 <a class="header-anchor" href="#三、表结构定义" aria-label="Permalink to &quot;三、表结构定义&quot;">​</a></h2><h3 id="_3-1-声明式表定义" tabindex="-1">3.1 声明式表定义 <a class="header-anchor" href="#_3-1-声明式表定义" aria-label="Permalink to &quot;3.1 声明式表定义&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Table, Column, Integer, String, ForeignKey, DateTime, Text, Boolean, Float, Enum</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.sql </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> func</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.dialects.postgresql </span><span class="__shiki_1itgoe">import</span><span class="__shiki_dzsirb"> JSONB</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">ARRAY</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> enum</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义枚举</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserRole</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">enum</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    ADMIN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;admin&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    USER</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;user&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    GUEST</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;guest&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 用户表</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Table(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;users&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata,</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, Integer, </span><span class="__shiki_1jdh33">primary_key</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">autoincrement</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, String(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, String(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;password_hash&#39;</span><span class="__shiki_140thh">, String(</span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">, Enum(UserRole), </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">UserRole.</span><span class="__shiki_dzsirb">USER</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">, Boolean, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">, DateTime(</span><span class="__shiki_1jdh33">timezone</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">server_default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">func.now()),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;updated_at&#39;</span><span class="__shiki_140thh">, DateTime(</span><span class="__shiki_1jdh33">timezone</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">onupdate</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">func.now()),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;metadata&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">JSONB</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># PostgreSQL专用</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;tags&#39;</span><span class="__shiki_140thh">, ARRAY(String), </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># PostgreSQL数组类型</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 表级约束</span></span>
<span class="line"><span class="__shiki_21nrsd">    # CheckConstraint(&#39;email LIKE &quot;%@%&quot;&#39;, name=&#39;valid_email&#39;),</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 文章表</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Table(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;articles&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata,</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, Integer, </span><span class="__shiki_1jdh33">primary_key</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">, String(</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">, Text, </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">, Integer, ForeignKey(</span><span class="__shiki_mdbnqw">&#39;users.id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ondelete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;CASCADE&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, Enum(</span><span class="__shiki_mdbnqw">&#39;draft&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;published&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;archived&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;draft&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">, Integer, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;rating&#39;</span><span class="__shiki_140thh">, Float, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">, DateTime(</span><span class="__shiki_1jdh33">timezone</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 复合唯一约束</span></span>
<span class="line"><span class="__shiki_21nrsd">    # UniqueConstraint(&#39;user_id&#39;, &#39;title&#39;, name=&#39;uq_user_title&#39;),</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Index(&#39;idx_articles_status&#39;, &#39;status&#39;),</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Index(&#39;idx_articles_published&#39;, &#39;published_at&#39;, postgresql_using=&#39;brin&#39;),</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 评论表（自引用外键示例）</span></span>
<span class="line"><span class="__shiki_140thh">comments </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Table(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;comments&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata,</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, Integer, </span><span class="__shiki_1jdh33">primary_key</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;article_id&#39;</span><span class="__shiki_140thh">, Integer, ForeignKey(</span><span class="__shiki_mdbnqw">&#39;articles.id&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">, Integer, ForeignKey(</span><span class="__shiki_mdbnqw">&#39;users.id&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;parent_id&#39;</span><span class="__shiki_140thh">, Integer, ForeignKey(</span><span class="__shiki_mdbnqw">&#39;comments.id&#39;</span><span class="__shiki_140thh">)),  </span><span class="__shiki_21nrsd"># 自引用</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">, Text),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">, DateTime, </span><span class="__shiki_1jdh33">server_default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">func.now()),</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_3-2-表反射" tabindex="-1">3.2 表反射 <a class="header-anchor" href="#_3-2-表反射" aria-label="Permalink to &quot;3.2 表反射&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 反射现有数据库表</span></span>
<span class="line"><span class="__shiki_140thh">metadata.reflect(</span><span class="__shiki_1jdh33">bind</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">engine)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取特定表</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> metadata.tables[</span><span class="__shiki_mdbnqw">&#39;users&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> metadata.tables[</span><span class="__shiki_mdbnqw">&#39;articles&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看表信息</span></span>
<span class="line"><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(users.columns.keys())  </span><span class="__shiki_21nrsd"># 列名列表</span></span>
<span class="line"><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(users.primary_key)     </span><span class="__shiki_21nrsd"># 主键信息</span></span>
<span class="line"><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(users.foreign_keys)    </span><span class="__shiki_21nrsd"># 外键信息</span></span></code></pre></div><h2 id="四、sql表达式语言" tabindex="-1">四、SQL表达式语言 <a class="header-anchor" href="#四、sql表达式语言" aria-label="Permalink to &quot;四、SQL表达式语言&quot;">​</a></h2><h3 id="_4-1-select查询" tabindex="-1">4.1 SELECT查询 <a class="header-anchor" href="#_4-1-select查询" aria-label="Permalink to &quot;4.1 SELECT查询&quot;">​</a></h3><h4 id="基础查询" tabindex="-1">基础查询 <a class="header-anchor" href="#基础查询" aria-label="Permalink to &quot;基础查询&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> select, and_, or_, not_, text, bindparam, case, cast</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.sql </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> func</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基础SELECT</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users.c.id, users.c.username, users.c.email)</span></span>
<span class="line"><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(stmt)  </span><span class="__shiki_21nrsd"># 查看生成的SQL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 选择所有列</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># WHERE条件</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">).where(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.role </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> UserRole.</span><span class="__shiki_dzsirb">USER</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复合条件</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(</span></span>
<span class="line"><span class="__shiki_140thh">    and_(</span></span>
<span class="line"><span class="__shiki_140thh">        users.c.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        or_(</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.role </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> UserRole.</span><span class="__shiki_dzsirb">ADMIN</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.role </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> UserRole.</span><span class="__shiki_dzsirb">USER</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        not_(users.c.email.like(</span><span class="__shiki_mdbnqw">&#39;%@test.com&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># IN查询</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(users.c.role.in_([UserRole.</span><span class="__shiki_dzsirb">ADMIN</span><span class="__shiki_140thh">, UserRole.</span><span class="__shiki_dzsirb">USER</span><span class="__shiki_140thh">]))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># BETWEEN查询</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(articles).where(articles.c.view_count.between(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># LIKE查询</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(users.c.email.like(</span><span class="__shiki_mdbnqw">&#39;%@gmail.com&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ILIKE（不区分大小写，PostgreSQL）</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(users.c.username.ilike(</span><span class="__shiki_mdbnqw">&#39;john%&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># IS NULL / IS NOT NULL</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(articles).where(articles.c.published_at.is_(</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># DISTINCT</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users.c.role).distinct()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ORDER BY</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).order_by(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.created_at.desc(),</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.username.asc()</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># LIMIT和OFFSET</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(articles).limit(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">).offset(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># GROUP BY和聚合函数</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.user_id,</span></span>
<span class="line"><span class="__shiki_140thh">    func.count(articles.c.id).label(</span><span class="__shiki_mdbnqw">&#39;article_count&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    func.avg(articles.c.view_count).label(</span><span class="__shiki_mdbnqw">&#39;avg_views&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    func.max(articles.c.published_at).label(</span><span class="__shiki_mdbnqw">&#39;last_published&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).group_by(articles.c.user_id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HAVING子句</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.user_id,</span></span>
<span class="line"><span class="__shiki_140thh">    func.count(articles.c.id).label(</span><span class="__shiki_mdbnqw">&#39;article_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).group_by(articles.c.user_id).having(</span></span>
<span class="line"><span class="__shiki_140thh">    func.count(articles.c.id) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CASE表达式</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.id,</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.title,</span></span>
<span class="line"><span class="__shiki_140thh">    case(</span></span>
<span class="line"><span class="__shiki_140thh">        (articles.c.view_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;popular&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (articles.c.view_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;trending&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">        else_</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;normal&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ).label(</span><span class="__shiki_mdbnqw">&#39;popularity&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 窗口函数（PostgreSQL）</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> over</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.id,</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.title,</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.view_count,</span></span>
<span class="line"><span class="__shiki_140thh">    func.row_number().over(</span></span>
<span class="line"><span class="__shiki_1jdh33">        order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">articles.c.view_count.desc(),</span></span>
<span class="line"><span class="__shiki_1jdh33">        partition_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">articles.c.user_id</span></span>
<span class="line"><span class="__shiki_140thh">    ).label(</span><span class="__shiki_mdbnqw">&#39;rank&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JOIN操作</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.title,</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.published_at</span></span>
<span class="line"><span class="__shiki_140thh">).select_from(</span></span>
<span class="line"><span class="__shiki_140thh">    users.join(articles, users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> articles.c.user_id)</span></span>
<span class="line"><span class="__shiki_140thh">).where(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;published&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多表JOIN</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.title,</span></span>
<span class="line"><span class="__shiki_140thh">    comments.c.content</span></span>
<span class="line"><span class="__shiki_140thh">).select_from(</span></span>
<span class="line"><span class="__shiki_140thh">    users</span></span>
<span class="line"><span class="__shiki_140thh">    .join(articles, users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> articles.c.user_id)</span></span>
<span class="line"><span class="__shiki_140thh">    .join(comments, articles.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> comments.c.article_id)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 子查询</span></span>
<span class="line"><span class="__shiki_140thh">subq </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.user_id,</span></span>
<span class="line"><span class="__shiki_140thh">    func.count(</span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">).label(</span><span class="__shiki_mdbnqw">&#39;count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).group_by(articles.c.user_id).subquery()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">    subq.c.count</span></span>
<span class="line"><span class="__shiki_140thh">).join(subq, users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> subq.c.user_id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 相关子查询</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">    select(func.count(</span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    .where(articles.c.user_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> users.c.id)</span></span>
<span class="line"><span class="__shiki_140thh">    .correlate(users)</span></span>
<span class="line"><span class="__shiki_140thh">    .label(</span><span class="__shiki_mdbnqw">&#39;article_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># UNION操作</span></span>
<span class="line"><span class="__shiki_140thh">stmt1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users.c.id, users.c.username).where(users.c.role </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;admin&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">stmt2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users.c.id, users.c.username).where(users.c.role </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;user&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">union_stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stmt1.union(stmt2)</span></span></code></pre></div><h4 id="_4-2-insert操作" tabindex="-1">4.2 INSERT操作 <a class="header-anchor" href="#_4-2-insert操作" aria-label="Permalink to &quot;4.2 INSERT操作&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> insert, update, delete</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 单条插入</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> insert(users).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john_doe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    password_hash</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;hashed_password&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    role</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">UserRole.</span><span class="__shiki_dzsirb">USER</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多条插入</span></span>
<span class="line"><span class="__shiki_140thh">users_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;alice&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;alice@example.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">: UserRole.</span><span class="__shiki_dzsirb">USER</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;bob&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;bob@example.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">: UserRole.</span><span class="__shiki_dzsirb">ADMIN</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> insert(users).values(users_data)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 插入并返回生成的ID</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> insert(users).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;charlie&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;charlie@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">).returning(users.c.id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ON CONFLICT处理（PostgreSQL/Upsert）</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.dialects.postgresql </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> insert </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> pg_insert</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pg_insert(users).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john_doe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">).on_conflict_do_update(</span></span>
<span class="line"><span class="__shiki_1jdh33">    index_elements</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">],  </span><span class="__shiki_21nrsd"># 冲突列</span></span>
<span class="line"><span class="__shiki_1jdh33">    set_</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;new_email@example.com&#39;</span><span class="__shiki_140thh">}  </span><span class="__shiki_21nrsd"># 更新列</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_4-3-update操作" tabindex="-1">4.3 UPDATE操作 <a class="header-anchor" href="#_4-3-update操作" aria-label="Permalink to &quot;4.3 UPDATE操作&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础UPDATE</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update(users).where(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;new_email@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    updated_at</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">func.now()</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于子查询的UPDATE</span></span>
<span class="line"><span class="__shiki_140thh">subq </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(articles.c.user_id).where(articles.c.view_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">).subquery()</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update(users).where(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.id.in_(select(subq.c.user_id))</span></span>
<span class="line"><span class="__shiki_140thh">).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用CASE表达式更新</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update(articles).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">case(</span></span>
<span class="line"><span class="__shiki_140thh">        (articles.c.view_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;featured&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">        else_</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;normal&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 增量更新</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update(articles).where(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    view_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">articles.c.view_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用RETURNING子句</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update(users).where(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span></span>
<span class="line"><span class="__shiki_140thh">).returning(users.c.username, users.c.email)</span></span></code></pre></div><h4 id="_4-4-delete操作" tabindex="-1">4.4 DELETE操作 <a class="header-anchor" href="#_4-4-delete操作" aria-label="Permalink to &quot;4.4 DELETE操作&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础DELETE</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> delete(users).where(users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用IN子句删除</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> delete(articles).where(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.user_id.in_(</span></span>
<span class="line"><span class="__shiki_140thh">        select(users.c.id).where(users.c.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 级联删除（在数据库层面定义外键约束）</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> delete(users).where(users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用RETURNING子句</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> delete(comments).where(</span></span>
<span class="line"><span class="__shiki_140thh">    comments.c.article_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">).returning(comments.c.id, comments.c.user_id)</span></span></code></pre></div><h2 id="五、执行查询与结果处理" tabindex="-1">五、执行查询与结果处理 <a class="header-anchor" href="#五、执行查询与结果处理" aria-label="Permalink to &quot;五、执行查询与结果处理&quot;">​</a></h2><h3 id="_5-1-连接与执行" tabindex="-1">5.1 连接与执行 <a class="header-anchor" href="#_5-1-连接与执行" aria-label="Permalink to &quot;5.1 连接与执行&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用Connection</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> text</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> contextlib </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> contextmanager</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@contextmanager</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_connection</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;上下文管理器管理连接&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> engine.connect()</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        yield</span><span class="__shiki_140thh"> conn</span></span>
<span class="line"><span class="__shiki_140thh">        conn.commit()</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        conn.rollback()</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span></span>
<span class="line"><span class="__shiki_1itgoe">    finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        conn.close()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 执行查询</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> get_connection() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 执行SELECT</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.execute(stmt)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取所有结果</span></span>
<span class="line"><span class="__shiki_140thh">    rows </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result.fetchall()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 迭代结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result:</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(row)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取列信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(result.keys())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取第一行</span></span>
<span class="line"><span class="__shiki_140thh">    row </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result.first()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取单个值</span></span>
<span class="line"><span class="__shiki_140thh">    count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result.scalar()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用Session（更推荐）</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Session</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> Session(engine) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 执行查询</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> session.execute(stmt)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 转换为字典列表</span></span>
<span class="line"><span class="__shiki_140thh">    rows </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">dict</span><span class="__shiki_140thh">(row._mapping) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 转换为特定对象</span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> UserData</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, id, username):</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> id</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> username</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [UserData(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">row) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> rows]</span></span></code></pre></div><h3 id="_5-2-批量操作" tabindex="-1">5.2 批量操作 <a class="header-anchor" href="#_5-2-批量操作" aria-label="Permalink to &quot;5.2 批量操作&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 批量插入</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> engine.begin() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_140thh">    batch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">    data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> generate_large_dataset()  </span><span class="__shiki_21nrsd"># 假设生成大量数据</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(data), batch_size):</span></span>
<span class="line"><span class="__shiki_140thh">        batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data[i:i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batch_size]</span></span>
<span class="line"><span class="__shiki_140thh">        conn.execute(insert(users), batch)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批量更新（使用executemany）</span></span>
<span class="line"><span class="__shiki_140thh">update_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;published&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;draft&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> engine.begin() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_140thh">    conn.execute(</span></span>
<span class="line"><span class="__shiki_140thh">        update(articles).where(articles.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> bindparam(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">        update_data</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span></code></pre></div><h3 id="_5-3-结果映射与处理" tabindex="-1">5.3 结果映射与处理 <a class="header-anchor" href="#_5-3-结果映射与处理" aria-label="Permalink to &quot;5.3 结果映射与处理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 行对象处理</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> Session(engine) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> session.execute(</span></span>
<span class="line"><span class="__shiki_140thh">        select(users.c.id, users.c.username, users.c.email)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 按列名访问</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result:</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;ID: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">row.id</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">, Username: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">row.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 按索引访问</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result:</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;ID: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">row[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">, Username: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">row[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 字典访问</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result.mappings():</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;ID: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">row[</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">, Username: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">row[</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 转换为Pandas DataFrame</span></span>
<span class="line"><span class="__shiki_1itgoe">    import</span><span class="__shiki_140thh"> pandas </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> pd</span></span>
<span class="line"><span class="__shiki_140thh">    df </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pd.DataFrame(result.mappings())</span></span></code></pre></div><h2 id="六、事务管理" tabindex="-1">六、事务管理 <a class="header-anchor" href="#六、事务管理" aria-label="Permalink to &quot;六、事务管理&quot;">​</a></h2><h3 id="_6-1-基础事务" tabindex="-1">6.1 基础事务 <a class="header-anchor" href="#_6-1-基础事务" aria-label="Permalink to &quot;6.1 基础事务&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用begin()上下文管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> engine.begin() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_140thh">    conn.execute(insert(users), user_data)</span></span>
<span class="line"><span class="__shiki_140thh">    conn.execute(update(articles), article_data)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动提交或回滚</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动控制事务</span></span>
<span class="line"><span class="__shiki_140thh">conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> engine.connect()</span></span>
<span class="line"><span class="__shiki_140thh">trans </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.begin()</span></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    conn.execute(stmt1)</span></span>
<span class="line"><span class="__shiki_140thh">    conn.execute(stmt2)</span></span>
<span class="line"><span class="__shiki_140thh">    trans.commit()</span></span>
<span class="line"><span class="__shiki_1itgoe">except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    trans.rollback()</span></span>
<span class="line"><span class="__shiki_1itgoe">    raise</span></span>
<span class="line"><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    conn.close()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 嵌套事务（保存点）</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> engine.begin() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_140thh">    savepoint </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.begin_nested()</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        conn.execute(stmt1)</span></span>
<span class="line"><span class="__shiki_140thh">        savepoint.commit()</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        savepoint.rollback()</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    conn.execute(stmt2)  </span><span class="__shiki_21nrsd"># 外部事务继续</span></span></code></pre></div><h3 id="_6-2-事务隔离级别" tabindex="-1">6.2 事务隔离级别 <a class="header-anchor" href="#_6-2-事务隔离级别" aria-label="Permalink to &quot;6.2 事务隔离级别&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> create_engine</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.engine </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Engine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置事务隔离级别</span></span>
<span class="line"><span class="__shiki_140thh">engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_engine(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;postgresql://user:pass@localhost/dbname&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    isolation_level</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;REPEATABLE READ&quot;</span><span class="__shiki_21nrsd">  # 或&quot;SERIALIZABLE&quot;, &quot;READ COMMITTED&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在事务中设置隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> engine.connect().execution_options(</span></span>
<span class="line"><span class="__shiki_1jdh33">    isolation_level</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;SERIALIZABLE&quot;</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> conn.begin():</span></span>
<span class="line"><span class="__shiki_140thh">        conn.execute(stmt)</span></span></code></pre></div><h2 id="七、高级特性" tabindex="-1">七、高级特性 <a class="header-anchor" href="#七、高级特性" aria-label="Permalink to &quot;七、高级特性&quot;">​</a></h2><h3 id="_7-1-自定义类型" tabindex="-1">7.1 自定义类型 <a class="header-anchor" href="#_7-1-自定义类型" aria-label="Permalink to &quot;7.1 自定义类型&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> TypeDecorator, String</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> JSONEncodedDict</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">TypeDecorator</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;JSON编码的字典类型&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    impl </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> String</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> process_bind_param</span><span class="__shiki_140thh">(self, value, dialect):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> json.dumps(value)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> process_result_value</span><span class="__shiki_140thh">(self, value, dialect):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> json.loads(value)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> copy</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kw):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> JSONEncodedDict(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.impl.length)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用自定义类型</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Table, Column</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">settings_table </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Table(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;user_settings&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    metadata,</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, Integer, </span><span class="__shiki_1jdh33">primary_key</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;user_id&#39;</span><span class="__shiki_140thh">, Integer, ForeignKey(</span><span class="__shiki_mdbnqw">&#39;users.id&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">    Column(</span><span class="__shiki_mdbnqw">&#39;settings&#39;</span><span class="__shiki_140thh">, JSONEncodedDict)  </span><span class="__shiki_21nrsd"># 自动JSON编码/解码</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_7-2-事件监听" tabindex="-1">7.2 事件监听 <a class="header-anchor" href="#_7-2-事件监听" aria-label="Permalink to &quot;7.2 事件监听&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> event</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 连接事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">@event.listens_for</span><span class="__shiki_140thh">(engine, </span><span class="__shiki_mdbnqw">&quot;connect&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> receive_connect</span><span class="__shiki_140thh">(dbapi_connection, connection_record):</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;连接建立&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@event.listens_for</span><span class="__shiki_140thh">(engine, </span><span class="__shiki_mdbnqw">&quot;checkout&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> receive_checkout</span><span class="__shiki_140thh">(dbapi_connection, connection_record, connection_proxy):</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;从连接池获取连接&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 语句执行事件</span></span>
<span class="line"><span class="__shiki_1t8gfj">@event.listens_for</span><span class="__shiki_140thh">(engine, </span><span class="__shiki_mdbnqw">&quot;before_execute&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> receive_before_execute</span><span class="__shiki_140thh">(conn, clauseelement, multiparams, params):</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;执行SQL: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">clauseelement</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义查询拦截</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryLogger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.queries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @event.listens_for</span><span class="__shiki_140thh">(engine, </span><span class="__shiki_mdbnqw">&quot;before_cursor_execute&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> before_cursor_execute</span><span class="__shiki_140thh">(self, conn, cursor, statement, parameters, context, executemany):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.queries.append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;timestamp&#39;</span><span class="__shiki_140thh">: datetime.now(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;statement&#39;</span><span class="__shiki_140thh">: statement,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;parameters&#39;</span><span class="__shiki_140thh">: parameters,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;context&#39;</span><span class="__shiki_140thh">: context</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">logger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> QueryLogger()</span></span></code></pre></div><h3 id="_7-3-方言特定功能" tabindex="-1">7.3 方言特定功能 <a class="header-anchor" href="#_7-3-方言特定功能" aria-label="Permalink to &quot;7.3 方言特定功能&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># PostgreSQL特定功能</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.dialects.postgresql </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> insert, array, aggregate_order_by</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数组操作</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.tags.contains([</span><span class="__shiki_mdbnqw">&#39;python&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sqlalchemy&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JSONB操作</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.metadata[</span><span class="__shiki_mdbnqw">&#39;settings&#39;</span><span class="__shiki_140thh">][</span><span class="__shiki_mdbnqw">&#39;theme&#39;</span><span class="__shiki_140thh">].astext </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;dark&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 全文搜索</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(articles).where(</span></span>
<span class="line"><span class="__shiki_140thh">    articles.c.content.match(</span><span class="__shiki_mdbnqw">&#39;sqlalchemy OR database&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># MySQL特定功能</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.dialects.mysql </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> insert </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> mysql_insert</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> mysql_insert(users).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;test@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">).on_duplicate_key_update(</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;updated@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="八、性能优化" tabindex="-1">八、性能优化 <a class="header-anchor" href="#八、性能优化" aria-label="Permalink to &quot;八、性能优化&quot;">​</a></h2><h3 id="_8-1-连接池优化" tabindex="-1">8.1 连接池优化 <a class="header-anchor" href="#_8-1-连接池优化" aria-label="Permalink to &quot;8.1 连接池优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> create_engine</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.pool </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> QueuePool, StaticPool, NullPool</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 不同连接池策略</span></span>
<span class="line"><span class="__shiki_140thh">engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_engine(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;sqlite:///app.db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    poolclass</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">QueuePool,      </span><span class="__shiki_21nrsd"># 默认，适合多线程</span></span>
<span class="line"><span class="__shiki_1jdh33">    pool_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    max_overflow</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    pool_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    pool_recycle</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    pool_pre_ping</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># SQLite内存数据库</span></span>
<span class="line"><span class="__shiki_140thh">memory_engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_engine(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;sqlite:///:memory:&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    poolclass</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">StaticPool,     </span><span class="__shiki_21nrsd"># 单连接</span></span>
<span class="line"><span class="__shiki_1jdh33">    connect_args</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;check_same_thread&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 禁用连接池（如配合外部连接池）</span></span>
<span class="line"><span class="__shiki_140thh">no_pool_engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_engine(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;postgresql://...&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    poolclass</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">NullPool</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_8-2-查询优化" tabindex="-1">8.2 查询优化 <a class="header-anchor" href="#_8-2-查询优化" aria-label="Permalink to &quot;8.2 查询优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用索引提示</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.dialects.postgresql </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Insert</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(articles).with_hint(</span></span>
<span class="line"><span class="__shiki_140thh">    articles, </span><span class="__shiki_mdbnqw">&quot;USE INDEX (idx_articles_status)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">dialect_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 避免N+1查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误方式</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users)</span></span>
<span class="line"><span class="__shiki_140thh">users_result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.execute(stmt)</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> users_result:</span></span>
<span class="line"><span class="__shiki_140thh">    articles_stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(articles).where(articles.c.user_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> user.id)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 每次循环都执行查询</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 正确方式：使用JOIN或子查询</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.id,</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">    func.array_agg(articles.c.title).label(</span><span class="__shiki_mdbnqw">&#39;articles&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).join(articles, users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> articles.c.user_id).group_by(users.c.id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 分页优化</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> paginate_query</span><span class="__shiki_140thh">(page, per_page):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;使用keyset分页（比OFFSET性能更好）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    last_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> get_last_id_from_previous_page()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(articles).where(</span></span>
<span class="line"><span class="__shiki_140thh">        articles.c.id </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> last_id</span></span>
<span class="line"><span class="__shiki_140thh">    ).order_by(</span></span>
<span class="line"><span class="__shiki_140thh">        articles.c.id</span></span>
<span class="line"><span class="__shiki_140thh">    ).limit(per_page)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> stmt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 只选择需要的列</span></span>
<span class="line"><span class="__shiki_21nrsd"># 避免：select(*)</span></span>
<span class="line"><span class="__shiki_21nrsd"># 推荐：select(table.c.id, table.c.name)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 使用EXPLAIN分析查询</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> engine.connect() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.execute(text(</span><span class="__shiki_mdbnqw">&quot;EXPLAIN ANALYZE SELECT * FROM users&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(result.fetchall())</span></span></code></pre></div><h3 id="_8-3-缓存策略" tabindex="-1">8.3 缓存策略 <a class="header-anchor" href="#_8-3-缓存策略" aria-label="Permalink to &quot;8.3 缓存策略&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Query</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.ext.declarative </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> declarative_base</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Session</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> hashlib</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> pickle</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CachingQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;自定义缓存查询类&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, entities, session</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">__init__</span><span class="__shiki_140thh">(entities, session)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _generate_cache_key</span><span class="__shiki_140thh">(self, statement):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成缓存键&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        compiled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> statement.compile()</span></span>
<span class="line"><span class="__shiki_140thh">        key_parts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">            str</span><span class="__shiki_140thh">(compiled.statement),</span></span>
<span class="line"><span class="__shiki_dzsirb">            str</span><span class="__shiki_140thh">(compiled.params),</span></span>
<span class="line"><span class="__shiki_dzsirb">            str</span><span class="__shiki_140thh">(compiled.execution_options)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> hashlib.md5(</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">.join(key_parts).encode()).hexdigest()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> key</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> all</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;带缓存的所有结果获取&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._generate_cache_key(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.statement)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> cache_key </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache[cache_key]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> super</span><span class="__shiki_140thh">().all()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._cache[cache_key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用缓存Session</span></span>
<span class="line"><span class="__shiki_140thh">Session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sessionmaker(</span><span class="__shiki_1jdh33">bind</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">engine, </span><span class="__shiki_1jdh33">query_cls</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">CachingQuery)</span></span></code></pre></div><h2 id="九、安全最佳实践" tabindex="-1">九、安全最佳实践 <a class="header-anchor" href="#九、安全最佳实践" aria-label="Permalink to &quot;九、安全最佳实践&quot;">​</a></h2><h3 id="_9-1-sql注入防护" tabindex="-1">9.1 SQL注入防护 <a class="header-anchor" href="#_9-1-sql注入防护" aria-label="Permalink to &quot;9.1 SQL注入防护&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 危险：字符串拼接（易受SQL注入攻击）</span></span>
<span class="line"><span class="__shiki_140thh">dangerous_stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> text(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE username = &#39;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">user_input</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全：使用参数绑定</span></span>
<span class="line"><span class="__shiki_140thh">safe_stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> text(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM users WHERE username = :username&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.execute(safe_stmt, {</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">: user_input})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全：使用SQL表达式语言（自动参数化）</span></span>
<span class="line"><span class="__shiki_140thh">safe_stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(users.c.username </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> user_input)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用bindparam</span></span>
<span class="line"><span class="__shiki_140thh">stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(users).where(</span></span>
<span class="line"><span class="__shiki_140thh">    users.c.username </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> bindparam(</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">type_</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">String)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.execute(stmt, {</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">: user_input})</span></span></code></pre></div><h3 id="_9-2-权限最小化" tabindex="-1">9.2 权限最小化 <a class="header-anchor" href="#_9-2-权限最小化" aria-label="Permalink to &quot;9.2 权限最小化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建只读用户连接</span></span>
<span class="line"><span class="__shiki_140thh">readonly_engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_engine(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;postgresql://readonly_user:password@localhost/database&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    pool_pre_ping</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    connect_args</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;options&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;-c default_transaction_read_only=on&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用连接时设置角色</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> engine.connect().execution_options(</span></span>
<span class="line"><span class="__shiki_1jdh33">    postgresql_readonly</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    postgresql_transaction_isolation</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;READ COMMITTED&quot;</span></span>
<span class="line"><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 只读操作</span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.execute(select(users))</span></span></code></pre></div><h2 id="十、调试与监控" tabindex="-1">十、调试与监控 <a class="header-anchor" href="#十、调试与监控" aria-label="Permalink to &quot;十、调试与监控&quot;">​</a></h2><h3 id="_10-1-sql日志记录" tabindex="-1">10.1 SQL日志记录 <a class="header-anchor" href="#_10-1-sql日志记录" aria-label="Permalink to &quot;10.1 SQL日志记录&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> logging</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置SQLAlchemy日志</span></span>
<span class="line"><span class="__shiki_140thh">logging.basicConfig()</span></span>
<span class="line"><span class="__shiki_140thh">logging.getLogger(</span><span class="__shiki_mdbnqw">&#39;sqlalchemy.engine&#39;</span><span class="__shiki_140thh">).setLevel(logging.</span><span class="__shiki_dzsirb">INFO</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">logging.getLogger(</span><span class="__shiki_mdbnqw">&#39;sqlalchemy.pool&#39;</span><span class="__shiki_140thh">).setLevel(logging.</span><span class="__shiki_dzsirb">DEBUG</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 详细调试</span></span>
<span class="line"><span class="__shiki_140thh">engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_engine(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;sqlite:///app.db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    echo</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,                    </span><span class="__shiki_21nrsd"># 基础日志</span></span>
<span class="line"><span class="__shiki_1jdh33">    echo_pool</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,               </span><span class="__shiki_21nrsd"># 连接池日志</span></span>
<span class="line"><span class="__shiki_1jdh33">    logging_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;myengine&#39;</span><span class="__shiki_21nrsd">       # 日志器名称</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义日志格式</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> event</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@event.listens_for</span><span class="__shiki_140thh">(engine, </span><span class="__shiki_mdbnqw">&quot;before_cursor_execute&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> log_sql</span><span class="__shiki_140thh">(conn, cursor, statement, parameters, context, executemany):</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;SQL: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">statement</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Parameters: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">parameters</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_10-2-性能监控" tabindex="-1">10.2 性能监控 <a class="header-anchor" href="#_10-2-性能监控" aria-label="Permalink to &quot;10.2 性能监控&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> contextlib </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> contextmanager</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@contextmanager</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> timing_context</span><span class="__shiki_140thh">(name):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;计时上下文管理器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.perf_counter()</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        yield</span></span>
<span class="line"><span class="__shiki_1itgoe">    finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        elapsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.perf_counter() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> took </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">elapsed</span><span class="__shiki_1itgoe">:.4f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> seconds&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> timing_context(</span><span class="__shiki_mdbnqw">&quot;Database Query&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> engine.connect() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> conn:</span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.execute(complex_query)</span></span></code></pre></div><h2 id="十一、完整示例-博客系统数据层" tabindex="-1">十一、完整示例：博客系统数据层 <a class="header-anchor" href="#十一、完整示例-博客系统数据层" aria-label="Permalink to &quot;十一、完整示例：博客系统数据层&quot;">​</a></h2><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">完整的博客系统数据访问层实现</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> List, Dict, Optional, Tuple</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime, timedelta</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> dataclasses </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> contextlib </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> contextmanager</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> asyncio</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy.ext.asyncio </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> create_async_engine, AsyncSession</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> select, insert, update, delete, func, and_, or_, desc, asc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数据模型定义</span></span>
<span class="line"><span class="__shiki_1t8gfj">@dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserProfile</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span></span>
<span class="line"><span class="__shiki_140thh">    username: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    email: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    article_count: </span><span class="__shiki_dzsirb">int</span></span>
<span class="line"><span class="__shiki_140thh">    last_active: Optional[datetime]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BlogRepository</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;博客系统数据仓库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, engine):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> engine</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @contextmanager</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_session</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取数据库会话&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> Session(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.engine) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_1itgoe">            yield</span><span class="__shiki_140thh"> session</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> get_active_users</span><span class="__shiki_140thh">(self, min_articles: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) -&gt; List[UserProfile]:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取活跃用户（异步版本）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.id,</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.email,</span></span>
<span class="line"><span class="__shiki_140thh">            func.count(articles.c.id).label(</span><span class="__shiki_mdbnqw">&#39;article_count&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            func.max(articles.c.published_at).label(</span><span class="__shiki_mdbnqw">&#39;last_active&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ).join(</span></span>
<span class="line"><span class="__shiki_140thh">            articles, users.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> articles.c.user_id</span></span>
<span class="line"><span class="__shiki_140thh">        ).where(</span></span>
<span class="line"><span class="__shiki_140thh">            and_(</span></span>
<span class="line"><span class="__shiki_140thh">                users.c.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                articles.c.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;published&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        ).group_by(</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.id</span></span>
<span class="line"><span class="__shiki_140thh">        ).having(</span></span>
<span class="line"><span class="__shiki_140thh">            func.count(articles.c.id) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> min_articles</span></span>
<span class="line"><span class="__shiki_140thh">        ).order_by(</span></span>
<span class="line"><span class="__shiki_140thh">            desc(</span><span class="__shiki_mdbnqw">&#39;article_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        async</span><span class="__shiki_1itgoe"> with</span><span class="__shiki_140thh"> AsyncSession(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.engine) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> session.execute(stmt)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">                UserProfile(</span></span>
<span class="line"><span class="__shiki_1jdh33">                    id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">row.id,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">row.username,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">row.email,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    article_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">row.article_count,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    last_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">row.last_active</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result.mappings()</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_popular_articles</span><span class="__shiki_140thh">(self, days: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">, limit: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取近期热门文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        cutoff_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">days)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.id,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.title,</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.view_count,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.published_at,</span></span>
<span class="line"><span class="__shiki_140thh">            func.count(comments.c.id).label(</span><span class="__shiki_mdbnqw">&#39;comment_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ).select_from(</span></span>
<span class="line"><span class="__shiki_140thh">            articles</span></span>
<span class="line"><span class="__shiki_140thh">            .join(users, articles.c.user_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> users.c.id)</span></span>
<span class="line"><span class="__shiki_140thh">            .outerjoin(comments, articles.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> comments.c.article_id)</span></span>
<span class="line"><span class="__shiki_140thh">        ).where(</span></span>
<span class="line"><span class="__shiki_140thh">            and_(</span></span>
<span class="line"><span class="__shiki_140thh">                articles.c.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;published&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                articles.c.published_at </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> cutoff_date</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        ).group_by(</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.id,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.title,</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.view_count,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.published_at</span></span>
<span class="line"><span class="__shiki_140thh">        ).order_by(</span></span>
<span class="line"><span class="__shiki_140thh">            desc(articles.c.view_count)</span></span>
<span class="line"><span class="__shiki_140thh">        ).limit(limit)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_session() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> session.execute(stmt).mappings().all()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> increment_view_count</span><span class="__shiki_140thh">(self, article_id: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;原子递增文章浏览数&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update(articles).where(</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> article_id</span></span>
<span class="line"><span class="__shiki_140thh">        ).values(</span></span>
<span class="line"><span class="__shiki_1jdh33">            view_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">articles.c.view_count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        ).returning(articles.c.view_count)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_session() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> session.execute(stmt)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> result.scalar()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> search_articles</span><span class="__shiki_140thh">(self, </span></span>
<span class="line"><span class="__shiki_140thh">                       keyword: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                       categories: Optional[List[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">]] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                       offset: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                       limit: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">) -&gt; Tuple[List[Dict], </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;全文搜索文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基础查询</span></span>
<span class="line"><span class="__shiki_140thh">        base_query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.id,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.title,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.content,</span></span>
<span class="line"><span class="__shiki_140thh">            users.c.username,</span></span>
<span class="line"><span class="__shiki_140thh">            articles.c.published_at</span></span>
<span class="line"><span class="__shiki_140thh">        ).select_from(</span></span>
<span class="line"><span class="__shiki_140thh">            articles.join(users, articles.c.user_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> users.c.id)</span></span>
<span class="line"><span class="__shiki_140thh">        ).where(</span></span>
<span class="line"><span class="__shiki_140thh">            and_(</span></span>
<span class="line"><span class="__shiki_140thh">                articles.c.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;published&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                or_(</span></span>
<span class="line"><span class="__shiki_140thh">                    articles.c.title.contains(keyword),</span></span>
<span class="line"><span class="__shiki_140thh">                    articles.c.content.contains(keyword)</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加分类过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> categories:</span></span>
<span class="line"><span class="__shiki_140thh">            base_query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> base_query.where(</span></span>
<span class="line"><span class="__shiki_140thh">                articles.c.category.in_(categories)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取总数</span></span>
<span class="line"><span class="__shiki_140thh">        count_stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(func.count()).select_from(base_query.subquery())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取分页结果</span></span>
<span class="line"><span class="__shiki_140thh">        result_stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> base_query.order_by(</span></span>
<span class="line"><span class="__shiki_140thh">            desc(articles.c.published_at)</span></span>
<span class="line"><span class="__shiki_140thh">        ).offset(offset).limit(limit)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_session() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_140thh">            total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> session.execute(count_stmt).scalar()</span></span>
<span class="line"><span class="__shiki_140thh">            results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> session.execute(result_stmt).mappings().all()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> results, total</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 异步版本</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AsyncBlogRepository</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;异步博客数据仓库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, database_url: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.engine </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> create_async_engine(database_url, </span><span class="__shiki_1jdh33">echo</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> bulk_create_articles</span><span class="__shiki_140thh">(self, articles_data: List[Dict]):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;批量创建文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        async</span><span class="__shiki_1itgoe"> with</span><span class="__shiki_140thh"> AsyncSession(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.engine) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_1itgoe">            async</span><span class="__shiki_1itgoe"> with</span><span class="__shiki_140thh"> session.begin():</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_140thh"> session.execute(</span></span>
<span class="line"><span class="__shiki_140thh">                    insert(articles),</span></span>
<span class="line"><span class="__shiki_140thh">                    articles_data</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> get_user_activity_stats</span><span class="__shiki_140thh">(self, user_id: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取用户活动统计&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">            func.count(articles.c.id).label(</span><span class="__shiki_mdbnqw">&#39;total_articles&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            func.sum(articles.c.view_count).label(</span><span class="__shiki_mdbnqw">&#39;total_views&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            func.avg(articles.c.view_count).label(</span><span class="__shiki_mdbnqw">&#39;avg_views&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            func.max(articles.c.published_at).label(</span><span class="__shiki_mdbnqw">&#39;last_published&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ).where(</span></span>
<span class="line"><span class="__shiki_140thh">            and_(</span></span>
<span class="line"><span class="__shiki_140thh">                articles.c.user_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> user_id,</span></span>
<span class="line"><span class="__shiki_140thh">                articles.c.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;published&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        async</span><span class="__shiki_1itgoe"> with</span><span class="__shiki_140thh"> AsyncSession(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.engine) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> session:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> session.execute(stmt)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> result.mappings().first()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> __name__</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &quot;__main__&quot;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 初始化仓库</span></span>
<span class="line"><span class="__shiki_140thh">    repo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> BlogRepository(engine)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建表</span></span>
<span class="line"><span class="__shiki_140thh">    metadata.create_all(engine)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 执行查询</span></span>
<span class="line"><span class="__shiki_140thh">    popular_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> repo.get_popular_articles(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 异步示例</span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">        async_repo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AsyncBlogRepository(</span><span class="__shiki_mdbnqw">&quot;postgresql+asyncpg://user:pass@localhost/db&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> async_repo.get_user_activity_stats(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(stats)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    asyncio.run(main())</span></span></code></pre></div><h2 id="十二、常见问题与解决方案" tabindex="-1">十二、常见问题与解决方案 <a class="header-anchor" href="#十二、常见问题与解决方案" aria-label="Permalink to &quot;十二、常见问题与解决方案&quot;">​</a></h2><h3 id="_12-1-连接泄漏检测" tabindex="-1">12.1 连接泄漏检测 <a class="header-anchor" href="#_12-1-连接泄漏检测" aria-label="Permalink to &quot;12.1 连接泄漏检测&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> weakref</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> traceback</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConnectionTracker</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;连接追踪器，检测连接泄漏&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> weakref.WeakKeyDictionary()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @event.listens_for</span><span class="__shiki_140thh">(engine, </span><span class="__shiki_mdbnqw">&quot;checkout&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> on_checkout</span><span class="__shiki_140thh">(self, dbapi_connection, connection_record, connection_proxy):</span></span>
<span class="line"><span class="__shiki_140thh">        stack </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> traceback.extract_stack()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.connections[dbapi_connection] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;time&#39;</span><span class="__shiki_140thh">: datetime.now(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;stack&#39;</span><span class="__shiki_140thh">: stack</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @event.listens_for</span><span class="__shiki_140thh">(engine, </span><span class="__shiki_mdbnqw">&quot;checkin&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> on_checkin</span><span class="__shiki_140thh">(self, dbapi_connection, connection_record):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> dbapi_connection </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections:</span></span>
<span class="line"><span class="__shiki_1itgoe">            del</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections[dbapi_connection]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_leaked_connections</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取泄漏的连接&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.connections.items())</span></span></code></pre></div><h3 id="_12-2-数据库迁移策略" tabindex="-1">12.2 数据库迁移策略 <a class="header-anchor" href="#_12-2-数据库迁移策略" aria-label="Permalink to &quot;12.2 数据库迁移策略&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用Alembic进行迁移（推荐）</span></span>
<span class="line"><span class="__shiki_21nrsd"># alembic init migrations</span></span>
<span class="line"><span class="__shiki_21nrsd"># 编辑alembic.ini和env.py</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动迁移示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> migrate_add_column</span><span class="__shiki_140thh">(conn, table_name, column_name, column_type):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;手动添加列&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    from</span><span class="__shiki_140thh"> sqlalchemy </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> text</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查列是否存在</span></span>
<span class="line"><span class="__shiki_140thh">    check_sql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> text(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT column_name </span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM information_schema.columns </span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE table_name = :table AND column_name = :column</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.execute(check_sql, {</span><span class="__shiki_mdbnqw">&#39;table&#39;</span><span class="__shiki_140thh">: table_name, </span><span class="__shiki_mdbnqw">&#39;column&#39;</span><span class="__shiki_140thh">: column_name})</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> result.fetchone():</span></span>
<span class="line"><span class="__shiki_140thh">        add_sql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> text(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;ALTER TABLE </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">table_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> ADD COLUMN </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">column_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_dzsirb"> {</span><span class="__shiki_140thh">column_type</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        conn.execute(add_sql)</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="关键要点" tabindex="-1">关键要点： <a class="header-anchor" href="#关键要点" aria-label="Permalink to &quot;关键要点：&quot;">​</a></h3><ol><li><strong>使用SQL表达式语言而非原始SQL</strong>：提高安全性和可维护性</li><li><strong>合理使用连接池</strong>：根据应用类型选择合适策略</li><li><strong>批量操作优化</strong>：减少数据库往返次数</li><li><strong>事务管理</strong>：确保数据一致性</li><li><strong>监控与调试</strong>：建立完善的日志和监控体系</li><li><strong>异步支持</strong>：在高并发场景使用异步操作</li></ol><h3 id="性能建议" tabindex="-1">性能建议： <a class="header-anchor" href="#性能建议" aria-label="Permalink to &quot;性能建议：&quot;">​</a></h3><ul><li>为频繁查询的列创建索引</li><li>避免在循环中执行数据库查询</li><li>使用EXPLAIN分析复杂查询</li><li>考虑使用只读副本分担读负载</li><li>对大数据集使用流式处理</li></ul><h3 id="安全建议" tabindex="-1">安全建议： <a class="header-anchor" href="#安全建议" aria-label="Permalink to &quot;安全建议：&quot;">​</a></h3><ul><li>始终使用参数化查询</li><li>限制数据库用户权限</li><li>定期更新依赖包</li><li>对敏感数据加密存储</li><li>实施SQL注入防护</li></ul><p>SQLAlchemy核心提供了强大而灵活的数据库访问能力，适合构建高性能、可维护的数据访问层。正确使用其特性，可以大幅提升应用的数据处理能力和代码质量。</p>`,77)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
