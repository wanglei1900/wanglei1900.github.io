import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Django ORM 深入解析：Python生态数据访问层全面指南","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/python/django-orm.md","filePath":"data/access/orm/python/django-orm.md"}'),p={name:"data/access/orm/python/django-orm.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="django-orm-深入解析-python生态数据访问层全面指南" tabindex="-1">Django ORM 深入解析：Python生态数据访问层全面指南 <a class="header-anchor" href="#django-orm-深入解析-python生态数据访问层全面指南" aria-label="Permalink to &quot;Django ORM 深入解析：Python生态数据访问层全面指南&quot;">​</a></h1><h2 id="一、django-orm-架构与核心概念" tabindex="-1">一、Django ORM 架构与核心概念 <a class="header-anchor" href="#一、django-orm-架构与核心概念" aria-label="Permalink to &quot;一、Django ORM 架构与核心概念&quot;">​</a></h2><h3 id="_1-1-orm-架构概览" tabindex="-1">1.1 ORM 架构概览 <a class="header-anchor" href="#_1-1-orm-架构概览" aria-label="Permalink to &quot;1.1 ORM 架构概览&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│          Django 应用层                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│           Django ORM                    │ ← 查询API、模型层</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│        SQL 编译与执行层                 │ ← 查询集、SQL生成</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│       数据库适配器 (Database Wrapper)   │ ← 连接管理、SQL转义</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│          数据库驱动                     │ ← psycopg2, mysqlclient等</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_1-2-核心组件详解" tabindex="-1">1.2 核心组件详解 <a class="header-anchor" href="#_1-2-核心组件详解" aria-label="Permalink to &quot;1.2 核心组件详解&quot;">​</a></h3><ul><li><strong>Model</strong>: 数据库表的Python类表示</li><li><strong>Manager</strong>: 模型的主要查询接口</li><li><strong>QuerySet</strong>: 延迟执行的查询集合</li><li><strong>Migration</strong>: 数据库模式版本控制</li><li><strong>Lookups &amp; Expressions</strong>: 查询条件和表达式</li><li><strong>Aggregation</strong>: 聚合操作</li><li><strong>Transactions</strong>: 事务管理</li></ul><h2 id="二、模型定义与字段系统" tabindex="-1">二、模型定义与字段系统 <a class="header-anchor" href="#二、模型定义与字段系统" aria-label="Permalink to &quot;二、模型定义与字段系统&quot;">​</a></h2><h3 id="_2-1-基础模型定义" tabindex="-1">2.1 基础模型定义 <a class="header-anchor" href="#_2-1-基础模型定义" aria-label="Permalink to &quot;2.1 基础模型定义&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> models</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.core.validators </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> MinValueValidator, MaxValueValidator, RegexValidator</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.utils </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> timezone</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> uuid</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BaseModel</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;抽象基类，提供通用字段&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField(</span><span class="__shiki_1jdh33">auto_now_add</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField(</span><span class="__shiki_1jdh33">auto_now</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    is_active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.BooleanField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        abstract </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_21nrsd">  # 抽象类，不会创建数据库表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;用户模型示例&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 主键</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> models.UUIDField(</span><span class="__shiki_1jdh33">primary_key</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">uuid.uuid4, </span><span class="__shiki_1jdh33">editable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基础字段</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        validators</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">            RegexValidator(</span></span>
<span class="line"><span class="__shiki_1jdh33">                regex</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;^[a-zA-Z0-9_]+$&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                message</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;用户名只能包含字母、数字和下划线&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.EmailField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        error_messages</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;unique&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;该邮箱已被注册&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 选择字段</span></span>
<span class="line"><span class="__shiki_dzsirb">    USER_ROLES</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;ADMIN&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;管理员&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;EDITOR&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;编辑&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;USER&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;普通用户&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;GUEST&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;访客&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    role </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">USER_ROLES</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;USER&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 数值字段</span></span>
<span class="line"><span class="__shiki_140thh">    age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.PositiveIntegerField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        validators</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">            MinValueValidator(</span><span class="__shiki_dzsirb">13</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            MaxValueValidator(</span><span class="__shiki_dzsirb">120</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    score </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DecimalField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_digits</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        decimal_places</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.00</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日期时间字段</span></span>
<span class="line"><span class="__shiki_140thh">    birth_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    last_login </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文件字段</span></span>
<span class="line"><span class="__shiki_140thh">    avatar </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ImageField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        upload_to</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;avatars/%Y/%m/&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">255</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # JSON字段 (Django 3.1+)</span></span>
<span class="line"><span class="__shiki_140thh">    metadata </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.JSONField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">dict</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        help_text</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;附加的元数据&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 大文本字段</span></span>
<span class="line"><span class="__shiki_140thh">    bio </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.TextField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2000</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 布尔字段</span></span>
<span class="line"><span class="__shiki_140thh">    is_verified </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.BooleanField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    accepts_marketing </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.BooleanField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 计算字段（不存数据库）</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> display_name</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.email</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> age_in_days</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.birth_date:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> (timezone.now().date() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.birth_date).days</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 模型方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> deactivate</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;停用用户&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.is_active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;updated_at&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> promote_to_editor</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;升级为编辑&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.role </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &#39;ADMIN&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.role </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;EDITOR&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;updated_at&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 数据库表名</span></span>
<span class="line"><span class="__shiki_140thh">        db_table </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;auth_users&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 排序规则</span></span>
<span class="line"><span class="__shiki_140thh">        ordering </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;-created_at&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 唯一约束（复合）</span></span>
<span class="line"><span class="__shiki_140thh">        unique_together </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [[</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 索引配置</span></span>
<span class="line"><span class="__shiki_140thh">        indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            models.Index(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_140thh">            models.Index(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;last_login&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;idx_last_login&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            models.Index(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 权限</span></span>
<span class="line"><span class="__shiki_140thh">        permissions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;can_impersonate&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;可以模拟用户&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;export_user_data&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;可以导出用户数据&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 数据库选项</span></span>
<span class="line"><span class="__shiki_140thh">        constraints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            models.CheckConstraint(</span></span>
<span class="line"><span class="__shiki_1jdh33">                check</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.Q(</span><span class="__shiki_1jdh33">age__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">13</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> models.Q(</span><span class="__shiki_1jdh33">age__isnull</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">                name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;age_gte_13&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 单表继承选项</span></span>
<span class="line"><span class="__shiki_21nrsd">        # base_manager_name = &#39;objects&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # default_manager_name = &#39;objects&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 模型说明</span></span>
<span class="line"><span class="__shiki_140thh">        verbose_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;用户&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        verbose_name_plural </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;用户管理&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __str__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.get_role_display()</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> save</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;自定义保存逻辑&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 保存前的处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.email:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.email.lower().strip()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 调用父类保存方法</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">().save(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 保存后的处理</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 可以在这里添加后处理逻辑</span></span></code></pre></div><h3 id="_2-2-关系字段详解" tabindex="-1">2.2 关系字段详解 <a class="header-anchor" href="#_2-2-关系字段详解" aria-label="Permalink to &quot;2.2 关系字段详解&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Category</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;分类模型&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    parent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;self&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 自引用</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;subcategories&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.SlugField(</span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        verbose_name_plural </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;分类&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __str__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.name</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取所有后代分类</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_descendants</span><span class="__shiki_140thh">(self, include_self</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;递归获取所有后代分类&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        descendants </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> collect_descendants</span><span class="__shiki_140thh">(category):</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> include_self </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> category </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                descendants.append(category)</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> subcategory </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> category.subcategories.all():</span></span>
<span class="line"><span class="__shiki_140thh">                collect_descendants(subcategory)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        collect_descendants(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> descendants</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Tag</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;标签模型&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    color </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;#007bff&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 十六进制颜色</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __str__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.name</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章模型 - 展示各种关系字段&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.SlugField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">220</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique_for_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.TextField()</span></span>
<span class="line"><span class="__shiki_140thh">    excerpt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 外键关系</span></span>
<span class="line"><span class="__shiki_140thh">    author </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        User,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">PROTECT</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 保护模式，防止作者被删除时文章也被删除</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;articles&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_query_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;article&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    category </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        Category,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">SET_NULL</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 分类删除时设为NULL</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;articles&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 多对多关系</span></span>
<span class="line"><span class="__shiki_140thh">    tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ManyToManyField(</span></span>
<span class="line"><span class="__shiki_140thh">        Tag,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;articles&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        through</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ArticleTag&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 自定义中间表</span></span>
<span class="line"><span class="__shiki_1jdh33">        through_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;tag&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自引用多对多（类似推荐系统）</span></span>
<span class="line"><span class="__shiki_140thh">    related_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ManyToManyField(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;self&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        symmetrical</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 非对称关系</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        through</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ArticleRelationship&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        through_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;from_article&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;to_article&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 一对一关系</span></span>
<span class="line"><span class="__shiki_140thh">    featured_image </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.OneToOneField(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;Image&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">SET_NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;featured_in_article&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 状态字段</span></span>
<span class="line"><span class="__shiki_dzsirb">    STATUS_CHOICES</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;草稿&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;REVIEW&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;审核中&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;已发布&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;ARCHIVED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;已归档&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;DELETED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;已删除&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">STATUS_CHOICES</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 发布相关</span></span>
<span class="line"><span class="__shiki_140thh">    published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    is_featured </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.BooleanField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    view_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.PositiveIntegerField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    rating </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.FloatField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SEO 相关</span></span>
<span class="line"><span class="__shiki_140thh">    meta_title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    meta_description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        ordering </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;-published_at&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-created_at&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            models.Index(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_140thh">            models.Index(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_140thh">            models.Index(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;slug&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        constraints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            models.UniqueConstraint(</span></span>
<span class="line"><span class="__shiki_1jdh33">                fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1jdh33">                name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;unique_author_title&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                condition</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.Q(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        permissions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;can_publish&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;可以发布文章&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;can_feature&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;可以设置推荐文章&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __str__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.title</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> publish</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;发布文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.now()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;updated_at&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> increment_view_count</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;增加浏览次数（原子操作）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        Article.objects.filter(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.pk).update(</span></span>
<span class="line"><span class="__shiki_1jdh33">            view_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.F(</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.refresh_from_db()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 属性方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> reading_time</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;估算阅读时间（每分钟200字）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        word_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.content.split())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">round</span><span class="__shiki_140thh">(word_count </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> is_published</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.published_at </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义中间表</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleTag</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章-标签中间表（自定义）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(Article, </span><span class="__shiki_1jdh33">on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    tag </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(Tag, </span><span class="__shiki_1jdh33">on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField(</span><span class="__shiki_1jdh33">auto_now_add</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    weight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.FloatField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1.0</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 关系权重</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        unique_together </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;tag&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        ordering </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;-weight&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleRelationship</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章关系中间表&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    RELATIONSHIP_TYPES</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;RELATED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;相关&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;SIMILAR&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;相似&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;SEQUEL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;续篇&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;PREQUEL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;前传&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    from_article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        Article,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;outgoing_relationships&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    to_article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        Article,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;incoming_relationships&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    relationship_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">RELATIONSHIP_TYPES</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;RELATED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    confidence </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.FloatField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 关系置信度</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        unique_together </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;from_article&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;to_article&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;relationship_type&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Image</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;图片模型&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">    file</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> models.ImageField(</span><span class="__shiki_1jdh33">upload_to</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;images/%Y/%m/&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    uploader </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(User, </span><span class="__shiki_1jdh33">on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">SET_NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    alt_text </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    width </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.PositiveIntegerField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    height </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.PositiveIntegerField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    file_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.PositiveIntegerField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __str__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.title</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Comment</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;评论模型（自引用示例）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        Article,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;comments&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    author </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        User,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;comments&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.TextField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自引用，实现评论回复</span></span>
<span class="line"><span class="__shiki_140thh">    parent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;self&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;replies&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 投票相关</span></span>
<span class="line"><span class="__shiki_140thh">    upvotes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.PositiveIntegerField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    downvotes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.PositiveIntegerField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        ordering </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            models.Index(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;parent&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">]),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> net_votes</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.upvotes </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.downvotes</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> is_root</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;是否是根评论（非回复）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.parent </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_thread_depth</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取评论在对话中的深度&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        depth </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        comment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> comment.parent:</span></span>
<span class="line"><span class="__shiki_140thh">            depth </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            comment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> comment.parent</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> depth</span></span></code></pre></div><h3 id="_2-3-自定义字段" tabindex="-1">2.3 自定义字段 <a class="header-anchor" href="#_2-3-自定义字段" aria-label="Permalink to &quot;2.3 自定义字段&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> models</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.core.exceptions </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> ValidationError</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> EncryptedField</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TextField</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;加密字段（示例）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;AES加密字段&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 初始化配置</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.encryption_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> kwargs.pop(</span><span class="__shiki_mdbnqw">&#39;encryption_key&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">__init__</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> from_db_value</span><span class="__shiki_140thh">(self, value, expression, connection):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;从数据库读取值时的处理&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 这里应该是解密逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.decrypt(value)</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> to_python</span><span class="__shiki_140thh">(self, value):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;将数据库值转换为Python对象&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> isinstance</span><span class="__shiki_140thh">(value, </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> str</span><span class="__shiki_140thh">(value)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_prep_value</span><span class="__shiki_140thh">(self, value):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;将Python对象转换为数据库值&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> value</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 这里应该是加密逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.encrypt(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">(value))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> encrypt</span><span class="__shiki_140thh">(self, plaintext):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;加密方法（示例）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 实际应该使用加密库</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;ENCRYPTED:</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">plaintext</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> decrypt</span><span class="__shiki_140thh">(self, ciphertext):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;解密方法（示例）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ciphertext.startswith(</span><span class="__shiki_mdbnqw">&quot;ENCRYPTED:&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> ciphertext[</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">:]</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ciphertext</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ChoiceArrayField</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">JSONField</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;支持选择的数组字段&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, base_field, choices, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.base_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> base_field</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.choices </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> choices</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">__init__</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> validate</span><span class="__shiki_140thh">(self, value, model_instance):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;验证数组中的每个值&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">().validate(value, model_instance)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> isinstance</span><span class="__shiki_140thh">(value, </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_140thh"> ValidationError(</span><span class="__shiki_mdbnqw">&#39;必须是列表&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> value:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> [choice[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> choice </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.choices]:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    raise</span><span class="__shiki_140thh"> ValidationError(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;无效的选择: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">item</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> formfield</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;表单字段&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        defaults </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;form_class&#39;</span><span class="__shiki_140thh">: forms.MultipleChoiceField,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;choices&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.choices,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        defaults.update(kwargs)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> super</span><span class="__shiki_140thh">().formfield(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">defaults)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用自定义字段</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserProfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.OneToOneField(User, </span><span class="__shiki_1jdh33">on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用自定义字段</span></span>
<span class="line"><span class="__shiki_140thh">    secret_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> EncryptedField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        encryption_key</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;my-secret-key&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    skills </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ChoiceArrayField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        base_field</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">        choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;PYTHON&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Python&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;JS&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;JavaScript&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;DJANGO&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Django&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;REACT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;React&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span></code></pre></div><h2 id="三、查询api详解" tabindex="-1">三、查询API详解 <a class="header-anchor" href="#三、查询api详解" aria-label="Permalink to &quot;三、查询API详解&quot;">​</a></h2><h3 id="_3-1-基础查询方法" tabindex="-1">3.1 基础查询方法 <a class="header-anchor" href="#_3-1-基础查询方法" aria-label="Permalink to &quot;3.1 基础查询方法&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 获取管理器</span></span>
<span class="line"><span class="__shiki_140thh">User.objects  </span><span class="__shiki_21nrsd"># 默认管理器</span></span>
<span class="line"><span class="__shiki_140thh">User.active_objects  </span><span class="__shiki_21nrsd"># 自定义管理器</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基本查询方法</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 获取所有对象</span></span>
<span class="line"><span class="__shiki_140thh">all_users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.all()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 获取单个对象</span></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 主键查询</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.get(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 字段查询</span></span>
<span class="line"><span class="__shiki_1itgoe">except</span><span class="__shiki_140thh"> User.DoesNotExist:</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;用户不存在&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">except</span><span class="__shiki_140thh"> User.MultipleObjectsReturned:</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;找到多个用户&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用get_object_or_404 (视图层常用)</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.shortcuts </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> get_object_or_404</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> get_object_or_404(User, </span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">pk)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 创建对象</span></span>
<span class="line"><span class="__shiki_21nrsd"># 方法1：create()</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    role</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;USER&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：save()</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">user.save()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法3：bulk_create() 批量创建</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    User(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;user</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;user</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.bulk_create(users, </span><span class="__shiki_1jdh33">batch_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 更新对象</span></span>
<span class="line"><span class="__shiki_21nrsd"># 方法1：save()</span></span>
<span class="line"><span class="__shiki_140thh">user.username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;new_username&#39;</span></span>
<span class="line"><span class="__shiki_140thh">user.save()  </span><span class="__shiki_21nrsd"># 更新所有字段</span></span>
<span class="line"><span class="__shiki_140thh">user.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;updated_at&#39;</span><span class="__shiki_140thh">])  </span><span class="__shiki_21nrsd"># 只更新指定字段</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：update() 批量更新</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">role</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;USER&#39;</span><span class="__shiki_140thh">).update(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 删除对象</span></span>
<span class="line"><span class="__shiki_140thh">user.delete()  </span><span class="__shiki_21nrsd"># 删除单个</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">).delete()  </span><span class="__shiki_21nrsd"># 批量删除</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 检查存在性</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> User.objects.filter(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">).exists():</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;管理员存在&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 8. 计数</span></span>
<span class="line"><span class="__shiki_140thh">user_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.count()</span></span>
<span class="line"><span class="__shiki_140thh">active_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">).count()</span></span></code></pre></div><h3 id="_3-2-查询过滤器-lookups" tabindex="-1">3.2 查询过滤器（Lookups） <a class="header-anchor" href="#_3-2-查询过滤器-lookups" aria-label="Permalink to &quot;3.2 查询过滤器（Lookups）&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 精确匹配</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">username__exact</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 同上</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">username__iexact</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Admin&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 不区分大小写</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 包含查询</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">email__contains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;gmail.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">email__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;GMAIL&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 不区分大小写</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 开头/结尾查询</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">username__startswith</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">username__istartswith</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">email__endswith</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">email__iendswith</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;.COM&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 范围查询</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime, timedelta</span></span>
<span class="line"><span class="__shiki_140thh">one_week_ago </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日期范围</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">one_week_ago)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__range</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    timezone.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    timezone.now()</span></span>
<span class="line"><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数值范围</span></span>
<span class="line"><span class="__shiki_140thh">Article.objects.filter(</span><span class="__shiki_1jdh33">view_count__gt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">Article.objects.filter(</span><span class="__shiki_1jdh33">view_count__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">Article.objects.filter(</span><span class="__shiki_1jdh33">view_count__lt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">Article.objects.filter(</span><span class="__shiki_1jdh33">view_count__lte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">Article.objects.filter(</span><span class="__shiki_1jdh33">rating__range</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3.0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5.0</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># IN查询</span></span>
<span class="line"><span class="__shiki_140thh">roles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;ADMIN&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;EDITOR&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">role__in</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">roles)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.exclude(</span><span class="__shiki_1jdh33">role__in</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;GUEST&#39;</span><span class="__shiki_140thh">])  </span><span class="__shiki_21nrsd"># 排除查询</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># NULL查询</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">last_login__isnull</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">email__isnull</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 正则表达式</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">username__regex</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">^</span><span class="__shiki_21q97f">user</span><span class="__shiki_dzsirb">\\d</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">$</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">username__iregex</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">r</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">^</span><span class="__shiki_21q97f">USER</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 不区分大小写</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JSON字段查询（Django 3.1+）</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">metadata__has_key</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;theme&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">metadata__theme</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;dark&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">metadata__settings__notifications</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日期字段的详细查询</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__year</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2024</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__month</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__day</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">15</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__week_day</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># Monday=2</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__hour</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">14</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__minute</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 时间比较</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">timezone.now().date())</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">created_at__time__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.time(</span><span class="__shiki_dzsirb">9</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 关系查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 外键正向查询</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">author__username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">author__role</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ADMIN&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 外键反向查询</span></span>
<span class="line"><span class="__shiki_140thh">admin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.get(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">admin_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> admin.articles.all()  </span><span class="__shiki_21nrsd"># 使用related_name</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多对多查询</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">tags__name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;django&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">tags__name__in</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;python&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;django&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自引用查询</span></span>
<span class="line"><span class="__shiki_140thh">root_comments </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Comment.objects.filter(</span><span class="__shiki_1jdh33">parent__isnull</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">replies </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Comment.objects.filter(</span><span class="__shiki_1jdh33">parent__pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 链式查询</span></span>
<span class="line"><span class="__shiki_140thh">recent_popular_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">    status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    published_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">one_week_ago,</span></span>
<span class="line"><span class="__shiki_1jdh33">    view_count__gt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">).exclude(</span></span>
<span class="line"><span class="__shiki_1jdh33">    author__is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span></span>
<span class="line"><span class="__shiki_140thh">).distinct()  </span><span class="__shiki_21nrsd"># 去重</span></span></code></pre></div><h3 id="_3-3-复杂查询-q对象和f表达式" tabindex="-1">3.3 复杂查询（Q对象和F表达式） <a class="header-anchor" href="#_3-3-复杂查询-q对象和f表达式" aria-label="Permalink to &quot;3.3 复杂查询（Q对象和F表达式）&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Q, F, When, Case, Value, CharField</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models.functions </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Concat, ExtractYear, Coalesce</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Q对象 - 复杂逻辑查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># OR查询</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span></span>
<span class="line"><span class="__shiki_140thh">    Q(</span><span class="__shiki_1jdh33">role</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ADMIN&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> Q(</span><span class="__shiki_1jdh33">role</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;EDITOR&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># AND查询</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span></span>
<span class="line"><span class="__shiki_140thh">    Q(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> Q(</span><span class="__shiki_1jdh33">created_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">one_week_ago)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># NOT查询</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">Q(</span><span class="__shiki_1jdh33">role</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;GUEST&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复杂组合</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Q()</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> search_term:</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">|=</span><span class="__shiki_140thh"> Q(</span><span class="__shiki_1jdh33">username__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">search_term)</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">|=</span><span class="__shiki_140thh"> Q(</span><span class="__shiki_1jdh33">email__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">search_term)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> min_age:</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">&amp;=</span><span class="__shiki_140thh"> Q(</span><span class="__shiki_1jdh33">age__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">min_age)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> max_age:</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">&amp;=</span><span class="__shiki_140thh"> Q(</span><span class="__shiki_1jdh33">age__lte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">max_age)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.filter(query)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># F表达式 - 字段间比较和更新</span></span>
<span class="line"><span class="__shiki_21nrsd"># 字段比较</span></span>
<span class="line"><span class="__shiki_140thh">Article.objects.filter(</span><span class="__shiki_1jdh33">view_count__gt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;rating&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 原子更新（避免竞态条件）</span></span>
<span class="line"><span class="__shiki_140thh">Article.objects.filter(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article_id).update(</span></span>
<span class="line"><span class="__shiki_1jdh33">    view_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复杂表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> ExpressionWrapper, DurationField</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models.functions </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Now</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 计算注册天数</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    days_since_registration</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">ExpressionWrapper(</span></span>
<span class="line"><span class="__shiki_140thh">        Now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> F(</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">        output_field</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">DurationField()</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Case/When表达式</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    status_display</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Case(</span></span>
<span class="line"><span class="__shiki_140thh">        When(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">then</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Value(</span><span class="__shiki_mdbnqw">&#39;活跃&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">        When(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">then</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Value(</span><span class="__shiki_mdbnqw">&#39;停用&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Value(</span><span class="__shiki_mdbnqw">&#39;未知&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">        output_field</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">CharField()</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_1jdh33">    age_group</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Case(</span></span>
<span class="line"><span class="__shiki_140thh">        When(</span><span class="__shiki_1jdh33">age__lt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">then</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Value(</span><span class="__shiki_mdbnqw">&#39;未成年&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">        When(</span><span class="__shiki_1jdh33">age__range</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">then</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Value(</span><span class="__shiki_mdbnqw">&#39;青年&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">        When(</span><span class="__shiki_1jdh33">age__range</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">31</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">then</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Value(</span><span class="__shiki_mdbnqw">&#39;中年&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">        When(</span><span class="__shiki_1jdh33">age__gt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">then</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Value(</span><span class="__shiki_mdbnqw">&#39;老年&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Value(</span><span class="__shiki_mdbnqw">&#39;未知&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">        output_field</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">CharField()</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用函数</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    full_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Concat(</span><span class="__shiki_mdbnqw">&#39;first_name&#39;</span><span class="__shiki_140thh">, Value(</span><span class="__shiki_mdbnqw">&#39; &#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&#39;last_name&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    birth_year</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">ExtractYear(</span><span class="__shiki_mdbnqw">&#39;birth_date&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    display_email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Coalesce(</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, Value(</span><span class="__shiki_mdbnqw">&#39;未设置&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_3-4-聚合与注解" tabindex="-1">3.4 聚合与注解 <a class="header-anchor" href="#_3-4-聚合与注解" aria-label="Permalink to &quot;3.4 聚合与注解&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    Count, Sum, Avg, Max, Min, StdDev, Variance,</span></span>
<span class="line"><span class="__shiki_140thh">    Subquery, OuterRef, Exists</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基本聚合</span></span>
<span class="line"><span class="__shiki_140thh">stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.aggregate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    total</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filter</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Q(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_1jdh33">    avg_age</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Avg(</span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    max_age</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Max(</span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    min_age</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Min(</span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 分组聚合</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models.functions </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> TruncDate, TruncMonth</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 按角色统计</span></span>
<span class="line"><span class="__shiki_140thh">role_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.values(</span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">).annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    avg_age</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Avg(</span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).order_by(</span><span class="__shiki_mdbnqw">&#39;-count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 按日期统计</span></span>
<span class="line"><span class="__shiki_140thh">daily_signups </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    signup_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">TruncDate(</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).values(</span><span class="__shiki_mdbnqw">&#39;signup_date&#39;</span><span class="__shiki_140thh">).annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).order_by(</span><span class="__shiki_mdbnqw">&#39;-signup_date&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多层分组</span></span>
<span class="line"><span class="__shiki_140thh">monthly_article_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">    status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">).annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    month</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">TruncMonth(</span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).values(</span><span class="__shiki_mdbnqw">&#39;month&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;author__username&#39;</span><span class="__shiki_140thh">).annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    article_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    total_views</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Sum(</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).order_by(</span><span class="__shiki_mdbnqw">&#39;-month&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-total_views&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 条件聚合</span></span>
<span class="line"><span class="__shiki_140thh">article_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.aggregate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    total_articles</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    published_articles</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filter</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Q(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_1jdh33">    draft_articles</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filter</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Q(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_1jdh33">    high_rated</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filter</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Q(</span><span class="__shiki_1jdh33">rating__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">4.0</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 注解（给每个对象添加计算字段）</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    comment_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;comments&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    avg_rating</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Avg(</span><span class="__shiki_mdbnqw">&#39;comments__rating&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    recent_comment_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;comments&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        filter</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Q(</span><span class="__shiki_1jdh33">comments__created_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">one_week_ago)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">).filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">    comment_count__gt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">).order_by(</span><span class="__shiki_mdbnqw">&#39;-avg_rating&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 子查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 获取每个用户的最新文章</span></span>
<span class="line"><span class="__shiki_140thh">latest_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">    author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">OuterRef(</span><span class="__shiki_mdbnqw">&#39;pk&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).order_by(</span><span class="__shiki_mdbnqw">&#39;-published_at&#39;</span><span class="__shiki_140thh">).values(</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">)[:</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">users_with_latest_article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    latest_article_title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Subquery(latest_articles)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 存在性检查</span></span>
<span class="line"><span class="__shiki_140thh">active_authors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    has_published_articles</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Exists(</span></span>
<span class="line"><span class="__shiki_140thh">        Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            author_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">OuterRef(</span><span class="__shiki_mdbnqw">&#39;pk&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">).filter(</span><span class="__shiki_1jdh33">has_published_articles</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 窗口函数（Django 3.0+，需要数据库支持）</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Window</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models.functions </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Rank, DenseRank, RowNumber</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">ranked_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">    rank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Window(</span></span>
<span class="line"><span class="__shiki_1jdh33">        expression</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Rank(),</span></span>
<span class="line"><span class="__shiki_1jdh33">        order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">).desc(),</span></span>
<span class="line"><span class="__shiki_1jdh33">        partition_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[F(</span><span class="__shiki_mdbnqw">&#39;author_id&#39;</span><span class="__shiki_140thh">)]</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_1jdh33">    row_num</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Window(</span></span>
<span class="line"><span class="__shiki_1jdh33">        expression</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">RowNumber(),</span></span>
<span class="line"><span class="__shiki_1jdh33">        order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">).desc()</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">).filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">    status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">).order_by(</span><span class="__shiki_mdbnqw">&#39;author_id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-view_count&#39;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_3-5-查询优化技巧" tabindex="-1">3.5 查询优化技巧 <a class="header-anchor" href="#_3-5-查询优化技巧" aria-label="Permalink to &quot;3.5 查询优化技巧&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. select_related - 外键和一对一关系的JOIN</span></span>
<span class="line"><span class="__shiki_21nrsd"># 优化前：N+1查询问题</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.all()</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(article.author.username)  </span><span class="__shiki_21nrsd"># 每次循环都查询数据库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 优化后：使用select_related</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.select_related(</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">).all()</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(article.author.username)  </span><span class="__shiki_21nrsd"># 一次性获取所有作者</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多层select_related</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.select_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;author&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;category&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;featured_image&#39;</span></span>
<span class="line"><span class="__shiki_140thh">).all()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. prefetch_related - 多对多和反向关系的预取</span></span>
<span class="line"><span class="__shiki_21nrsd"># 优化前</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.all()</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> tag </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> article.tags.all():  </span><span class="__shiki_21nrsd"># 每次循环都查询数据库</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(tag.name)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 优化后</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.prefetch_related(</span><span class="__shiki_mdbnqw">&#39;tags&#39;</span><span class="__shiki_140thh">).all()</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> tag </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> article.tags.all():  </span><span class="__shiki_21nrsd"># 一次性获取所有标签</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(tag.name)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># prefetch_related 可以链式调用</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.prefetch_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;tags&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;comments&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;comments__author&#39;</span></span>
<span class="line"><span class="__shiki_140thh">).all()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Prefetch对象 - 精细控制预取</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Prefetch</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 只预取已发布的评论</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.prefetch_related(</span></span>
<span class="line"><span class="__shiki_140thh">    Prefetch(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;comments&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        queryset</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Comment.objects.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">        to_attr</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;active_comments&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">).all()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. only() 和 defer() - 选择/延迟加载字段</span></span>
<span class="line"><span class="__shiki_21nrsd"># 只加载需要的字段</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.only(</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">).all()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 延迟加载大字段</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.defer(</span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;metadata&#39;</span><span class="__shiki_140thh">).all()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. values() 和 values_list() - 获取字典/元组</span></span>
<span class="line"><span class="__shiki_21nrsd"># 获取特定字段的字典</span></span>
<span class="line"><span class="__shiki_140thh">user_dicts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.values(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取特定字段的元组</span></span>
<span class="line"><span class="__shiki_140thh">user_tuples </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.values_list(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">named</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取单个值的列表</span></span>
<span class="line"><span class="__shiki_140thh">usernames </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.values_list(</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">flat</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. iterator() - 流式处理大数据集</span></span>
<span class="line"><span class="__shiki_21nrsd"># 优化内存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> User.objects.iterator(</span><span class="__shiki_1jdh33">chunk_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    process_user(user)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 使用索引</span></span>
<span class="line"><span class="__shiki_21nrsd"># 确保数据库表有适当的索引</span></span>
<span class="line"><span class="__shiki_21nrsd"># Django自动为ForeignKey、ManyToManyField创建索引</span></span>
<span class="line"><span class="__shiki_21nrsd"># 可以在Meta中自定义索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 8. 批量操作</span></span>
<span class="line"><span class="__shiki_21nrsd"># 批量创建</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.bulk_create(users)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批量更新</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">).update(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 9. 使用数据库特定优化</span></span>
<span class="line"><span class="__shiki_21nrsd"># PostgreSQL特定优化</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> connection.vendor </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;postgresql&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用物化视图、部分索引等</span></span>
<span class="line"><span class="__shiki_140thh">    articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.raw(</span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT * FROM articles </span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE status = &#39;PUBLISHED&#39; </span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY published_at DESC </span></span>
<span class="line"><span class="__shiki_mdbnqw">        FOR UPDATE SKIP LOCKED</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;&#39;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 10. 查询分析</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connection</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> analyze_query</span><span class="__shiki_140thh">(queryset):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;分析查询性能&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;SQL: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">queryset.query</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用Django Debug Toolbar或django-silk进行性能分析</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用EXPLAIN</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> connection.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">        cursor.execute(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;EXPLAIN ANALYZE </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">queryset.query</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cursor.fetchall()</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(row[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span></code></pre></div><h2 id="四、自定义管理器与查询集" tabindex="-1">四、自定义管理器与查询集 <a class="header-anchor" href="#四、自定义管理器与查询集" aria-label="Permalink to &quot;四、自定义管理器与查询集&quot;">​</a></h2><h3 id="_4-1-自定义管理器" tabindex="-1">4.1 自定义管理器 <a class="header-anchor" href="#_4-1-自定义管理器" aria-label="Permalink to &quot;4.1 自定义管理器&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleManager</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Manager</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章自定义管理器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_queryset</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;基础查询集&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> super</span><span class="__shiki_140thh">().get_queryset().select_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;author&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;category&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ).prefetch_related(</span><span class="__shiki_mdbnqw">&#39;tags&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> published</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;已发布的文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_queryset().filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            published_at__lte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">timezone.now()</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> by_author</span><span class="__shiki_140thh">(self, author_username):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;按作者查询&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filter(</span><span class="__shiki_1jdh33">author__username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">author_username)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> with_high_rating</span><span class="__shiki_140thh">(self, min_rating</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">4.0</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;高评分文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filter(</span><span class="__shiki_1jdh33">rating__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">min_rating)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> popular</span><span class="__shiki_140thh">(self, days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">, min_views</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;近期热门文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        cutoff_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">days)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.published().filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            published_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">cutoff_date,</span></span>
<span class="line"><span class="__shiki_1jdh33">            view_count__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">min_views</span></span>
<span class="line"><span class="__shiki_140thh">        ).order_by(</span><span class="__shiki_mdbnqw">&#39;-view_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> create_with_tags</span><span class="__shiki_140thh">(self, title, content, author, tags</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">extra_fields):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;创建文章并关联标签&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">            title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">title,</span></span>
<span class="line"><span class="__shiki_1jdh33">            content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">content,</span></span>
<span class="line"><span class="__shiki_1jdh33">            author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">author,</span></span>
<span class="line"><span class="__shiki_1itgoe">            **</span><span class="__shiki_140thh">extra_fields</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> tags:</span></span>
<span class="line"><span class="__shiki_140thh">            article.tags.set(tags)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> article</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> bulk_update_view_count</span><span class="__shiki_140thh">(self, article_ids):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;批量更新浏览次数&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> django.db.models </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> F</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filter(</span><span class="__shiki_1jdh33">id__in</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article_ids).update(</span></span>
<span class="line"><span class="__shiki_1jdh33">            view_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CustomQuerySet</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">QuerySet</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;自定义查询集&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> active</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;活跃对象&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> inactive</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;非活跃对象&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> created_in_range</span><span class="__shiki_140thh">(self, start_date, end_date):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;创建时间在指定范围内&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            created_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date,</span></span>
<span class="line"><span class="__shiki_1jdh33">            created_at__lte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> annotate_stats</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;添加统计注解&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">            comment_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;comments&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">distinct</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">            like_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;likes&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">distinct</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">            share_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;shares&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">distinct</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在模型中使用自定义管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ... 字段定义</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认管理器</span></span>
<span class="line"><span class="__shiki_140thh">    objects </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ArticleManager.from_queryset(CustomQuerySet)()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 只读管理器（用于特定场景）</span></span>
<span class="line"><span class="__shiki_140thh">    read_only </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.Manager()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 指定默认管理器</span></span>
<span class="line"><span class="__shiki_140thh">        base_manager_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;objects&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义查询方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_featured</span><span class="__shiki_140thh">(cls, limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取推荐文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.objects.published().filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            is_featured</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">        ).order_by(</span><span class="__shiki_mdbnqw">&#39;-published_at&#39;</span><span class="__shiki_140thh">)[:limit]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_trending</span><span class="__shiki_140thh">(cls, hours</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">24</span><span class="__shiki_140thh">, limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取趋势文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        cutoff </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">hours</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">hours)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.objects.published().filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            published_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">cutoff</span></span>
<span class="line"><span class="__shiki_140thh">        ).order_by(</span><span class="__shiki_mdbnqw">&#39;-view_count&#39;</span><span class="__shiki_140thh">)[:limit]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_140thh">published_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.published()</span></span>
<span class="line"><span class="__shiki_140thh">popular_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.popular(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">admin_articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.by_author(</span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-2-动态查询集" tabindex="-1">4.2 动态查询集 <a class="header-anchor" href="#_4-2-动态查询集" aria-label="Permalink to &quot;4.2 动态查询集&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DynamicQuerySet</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">QuerySet</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;动态查询构建器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> filter_by_params</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">filters):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;根据参数动态过滤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理状态过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">status)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理时间范围</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> start_date </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;start_date&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span><span class="__shiki_1jdh33">created_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> end_date </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;end_date&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span><span class="__shiki_1jdh33">created_at__lte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> search </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;search&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span></span>
<span class="line"><span class="__shiki_140thh">                Q(</span><span class="__shiki_1jdh33">title__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">search) </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_140thh">                Q(</span><span class="__shiki_1jdh33">content__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">search) </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_140thh">                Q(</span><span class="__shiki_1jdh33">author__username__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">search)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理排序</span></span>
<span class="line"><span class="__shiki_140thh">        sort_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;sort_by&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-created_at&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> sort_by.lstrip(</span><span class="__shiki_mdbnqw">&#39;-&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;rating&#39;</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.order_by(sort_by)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理分页</span></span>
<span class="line"><span class="__shiki_140thh">        page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;page&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        page_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;page_size&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        offset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (page </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> page_size</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> queryset[offset:offset </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> page_size]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> to_dict</span><span class="__shiki_140thh">(self, fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;转换为字典列表&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> fields:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.values(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">fields))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.values())</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    objects </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DynamicQuerySet.as_manager()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 动态查询</span></span>
<span class="line"><span class="__shiki_140thh">params </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;status&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;start_date&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;2024-01-01&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;search&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Django&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;sort_by&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;-view_count&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;page&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;page_size&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter_by_params(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">params)</span></span></code></pre></div><h2 id="五、事务与并发控制" tabindex="-1">五、事务与并发控制 <a class="header-anchor" href="#五、事务与并发控制" aria-label="Permalink to &quot;五、事务与并发控制&quot;">​</a></h2><h3 id="_5-1-事务管理" tabindex="-1">5.1 事务管理 <a class="header-anchor" href="#_5-1-事务管理" aria-label="Permalink to &quot;5.1 事务管理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> transaction, DatabaseError</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> F</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 装饰器方式</span></span>
<span class="line"><span class="__shiki_1t8gfj">@transaction.atomic</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> transfer_points</span><span class="__shiki_140thh">(from_user, to_user, points):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;原子化转账&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> from_user.points </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> points:</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;余额不足&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    from_user.points </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> points</span></span>
<span class="line"><span class="__shiki_140thh">    from_user.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;points&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    to_user.points </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> points</span></span>
<span class="line"><span class="__shiki_140thh">    to_user.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;points&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建交易记录</span></span>
<span class="line"><span class="__shiki_140thh">    Transaction.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">        from_user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">from_user,</span></span>
<span class="line"><span class="__shiki_1jdh33">        to_user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">to_user,</span></span>
<span class="line"><span class="__shiki_1jdh33">        points</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">points</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 上下文管理器方式</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> process_order</span><span class="__shiki_140thh">(order_id):</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">            order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Order.objects.select_for_update().get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">order_id)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查库存</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> order.items.all():</span></span>
<span class="line"><span class="__shiki_140thh">                product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> item.product</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> product.stock </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> item.quantity:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">product.name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">库存不足&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 扣减库存</span></span>
<span class="line"><span class="__shiki_140thh">                product.stock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> F(</span><span class="__shiki_mdbnqw">&#39;stock&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> item.quantity</span></span>
<span class="line"><span class="__shiki_140thh">                product.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;stock&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 更新订单状态</span></span>
<span class="line"><span class="__shiki_140thh">            order.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;PROCESSED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            order.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 发送通知</span></span>
<span class="line"><span class="__shiki_140thh">            send_order_confirmation(order)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_140thh"> DatabaseError </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理数据库错误</span></span>
<span class="line"><span class="__shiki_140thh">        logger.error(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;订单处理失败: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 保存点（嵌套事务）</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> complex_operation</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> transaction.atomic():  </span><span class="__shiki_21nrsd"># 开启事务</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 操作1</span></span>
<span class="line"><span class="__shiki_140thh">        user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        savepoint </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> transaction.savepoint()  </span><span class="__shiki_21nrsd"># 创建保存点</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 操作2（可能失败）</span></span>
<span class="line"><span class="__shiki_140thh">            profile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UserProfile.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">                user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user,</span></span>
<span class="line"><span class="__shiki_1jdh33">                bio</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;测试用户&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 操作3（可能失败）</span></span>
<span class="line"><span class="__shiki_140thh">            send_welcome_email(user.email)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            transaction.savepoint_commit(savepoint)  </span><span class="__shiki_21nrsd"># 提交保存点</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_140thh">            transaction.savepoint_rollback(savepoint)  </span><span class="__shiki_21nrsd"># 回滚到保存点</span></span>
<span class="line"><span class="__shiki_140thh">            user.delete()  </span><span class="__shiki_21nrsd"># 清理</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 自动提交控制</span></span>
<span class="line"><span class="__shiki_1t8gfj">@transaction.non_atomic_requests</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> heavy_import_view</span><span class="__shiki_140thh">(request):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;非原子请求，手动控制事务&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> get_large_dataset()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 每1000条记录提交一次</span></span>
<span class="line"><span class="__shiki_140thh">    batch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(data), batch_size):</span></span>
<span class="line"><span class="__shiki_140thh">        batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data[i:i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batch_size]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">            User.objects.bulk_create([</span></span>
<span class="line"><span class="__shiki_140thh">                User(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">item) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> batch</span></span>
<span class="line"><span class="__shiki_140thh">            ])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 数据库层面的事务控制</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> update_with_retry</span><span class="__shiki_140thh">(model_instance, max_retries</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;带重试的更新操作&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(max_retries):</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 使用select_for_update锁定行</span></span>
<span class="line"><span class="__shiki_140thh">                obj </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Model.objects.select_for_update().get(</span></span>
<span class="line"><span class="__shiki_1jdh33">                    pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">model_instance.pk</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 检查版本（乐观锁）</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> obj.version </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> model_instance.version:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;数据已被修改，请重试&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 执行更新</span></span>
<span class="line"><span class="__shiki_140thh">                obj.field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> new_value</span></span>
<span class="line"><span class="__shiki_140thh">                obj.version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> F(</span><span class="__shiki_mdbnqw">&#39;version&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">                obj.save()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> obj</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh"> DatabaseError </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> max_retries </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span></span>
<span class="line"><span class="__shiki_140thh">            time.sleep(</span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> **</span><span class="__shiki_140thh"> attempt))  </span><span class="__shiki_21nrsd"># 指数退避</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span></span></code></pre></div><h3 id="_5-2-并发控制" tabindex="-1">5.2 并发控制 <a class="header-anchor" href="#_5-2-并发控制" aria-label="Permalink to &quot;5.2 并发控制&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> F</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> transaction</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> threading</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 使用select_for_update（悲观锁）</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> reserve_seat</span><span class="__shiki_140thh">(event_id, seat_number, user_id):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;预定座位（防止重复预定）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 锁定座位行</span></span>
<span class="line"><span class="__shiki_140thh">        seat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Seat.objects.select_for_update().get(</span></span>
<span class="line"><span class="__shiki_1jdh33">            event_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">event_id,</span></span>
<span class="line"><span class="__shiki_1jdh33">            number</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">seat_number</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> seat.is_reserved:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;座位已被预定&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 更新座位状态</span></span>
<span class="line"><span class="__shiki_140thh">        seat.is_reserved </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">        seat.reserved_by_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user_id</span></span>
<span class="line"><span class="__shiki_140thh">        seat.reserved_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.now()</span></span>
<span class="line"><span class="__shiki_140thh">        seat.save()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;预定成功&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 乐观锁（使用版本号）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcurrentModel</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.IntegerField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> update_with_optimistic_lock</span><span class="__shiki_140thh">(self, new_data):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;乐观锁更新&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        current_version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.version</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 尝试更新</span></span>
<span class="line"><span class="__shiki_140thh">        updated </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ConcurrentModel.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.pk,</span></span>
<span class="line"><span class="__shiki_1jdh33">            version</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">current_version</span></span>
<span class="line"><span class="__shiki_140thh">        ).update(</span></span>
<span class="line"><span class="__shiki_1jdh33">            data</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">new_data,</span></span>
<span class="line"><span class="__shiki_1jdh33">            version</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;version&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> updated </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;数据已被修改，请重试&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 刷新实例</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.refresh_from_db()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用F表达式避免竞态条件</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> increment_counter</span><span class="__shiki_140thh">(counter_id):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;原子递增计数器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Counter.objects.filter(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">counter_id).update(</span></span>
<span class="line"><span class="__shiki_1jdh33">        value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 分布式锁（使用Redis）</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.core.cache </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> cache</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> uuid</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DistributedLock</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;分布式锁&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, lock_key, timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.lock_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;lock:</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">lock_key</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timeout</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.identifier </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> str</span><span class="__shiki_140thh">(uuid.uuid4())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __enter__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        acquired </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache.add(</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.lock_key,</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.identifier,</span></span>
<span class="line"><span class="__shiki_1jdh33">            timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.timeout</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> acquired:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> TimeoutError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;无法获取锁&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __exit__</span><span class="__shiki_140thh">(self, exc_type, exc_val, exc_tb):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 只释放自己的锁</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> cache.get(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.lock_key) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.identifier:</span></span>
<span class="line"><span class="__shiki_140thh">            cache.delete(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.lock_key)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用分布式锁</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> process_with_distributed_lock</span><span class="__shiki_140thh">(resource_id):</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> DistributedLock(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;resource_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">resource_id</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全地处理共享资源</span></span>
<span class="line"><span class="__shiki_140thh">        resource </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Resource.objects.get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">resource_id)</span></span>
<span class="line"><span class="__shiki_140thh">        resource.process()</span></span>
<span class="line"><span class="__shiki_140thh">        resource.save()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 信号量控制并发数</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> asyncio</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> asgiref.sync </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> sync_to_async</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcurrencyLimiter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;并发限制器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, max_concurrent):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.semaphore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> asyncio.Semaphore(max_concurrent)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">(self, coro):</span></span>
<span class="line"><span class="__shiki_1itgoe">        async</span><span class="__shiki_1itgoe"> with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.semaphore:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> coro</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 异步并发控制</span></span>
<span class="line"><span class="__shiki_140thh">limiter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ConcurrencyLimiter(</span><span class="__shiki_1jdh33">max_concurrent</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> process_items_async</span><span class="__shiki_140thh">(items):</span></span>
<span class="line"><span class="__shiki_140thh">    tasks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> items:</span></span>
<span class="line"><span class="__shiki_140thh">        task </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> limiter.run(process_item_async(item))</span></span>
<span class="line"><span class="__shiki_140thh">        tasks.append(task)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> asyncio.gather(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">tasks)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@sync_to_async</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> process_item_async</span><span class="__shiki_140thh">(item):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;处理单个项目（同步函数转异步）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 数据库操作</span></span>
<span class="line"><span class="__shiki_140thh">        item.processed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">        item.save()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> item</span></span></code></pre></div><h2 id="六、数据库迁移" tabindex="-1">六、数据库迁移 <a class="header-anchor" href="#六、数据库迁移" aria-label="Permalink to &quot;六、数据库迁移&quot;">​</a></h2><h3 id="_6-1-迁移文件详解" tabindex="-1">6.1 迁移文件详解 <a class="header-anchor" href="#_6-1-迁移文件详解" aria-label="Permalink to &quot;6.1 迁移文件详解&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 自动生成的迁移文件示例</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> migrations, models</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> django.db.models.deletion</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> uuid</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Migration</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">migrations</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Migration</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 迁移依赖</span></span>
<span class="line"><span class="__shiki_140thh">    dependencies </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;app&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;0001_initial&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 操作列表</span></span>
<span class="line"><span class="__shiki_140thh">    operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建模型</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.CreateModel(</span></span>
<span class="line"><span class="__shiki_1jdh33">            name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">                (</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, models.UUIDField(</span></span>
<span class="line"><span class="__shiki_1jdh33">                    default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">uuid.uuid4,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    editable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    primary_key</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    serialize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span></span>
<span class="line"><span class="__shiki_140thh">                )),</span></span>
<span class="line"><span class="__shiki_140thh">                (</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">, models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">                (</span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">, models.TextField()),</span></span>
<span class="line"><span class="__shiki_140thh">                (</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, models.CharField(</span></span>
<span class="line"><span class="__shiki_1jdh33">                    choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;草稿&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;已发布&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    ],</span></span>
<span class="line"><span class="__shiki_1jdh33">                    default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">                )),</span></span>
<span class="line"><span class="__shiki_140thh">                (</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">, models.DateTimeField(</span><span class="__shiki_1jdh33">auto_now_add</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">                (</span><span class="__shiki_mdbnqw">&#39;updated_at&#39;</span><span class="__shiki_140thh">, models.DateTimeField(</span><span class="__shiki_1jdh33">auto_now</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">            ],</span></span>
<span class="line"><span class="__shiki_1jdh33">            options</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;ordering&#39;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;-created_at&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;indexes&#39;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                    models.Index(</span></span>
<span class="line"><span class="__shiki_1jdh33">                        fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1jdh33">                        name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;idx_status_created&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    ),</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加字段</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.AddField(</span></span>
<span class="line"><span class="__shiki_1jdh33">            model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            field</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.PositiveIntegerField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 修改字段</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.AlterField(</span></span>
<span class="line"><span class="__shiki_1jdh33">            model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            field</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.CharField(</span></span>
<span class="line"><span class="__shiki_1jdh33">                max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                help_text</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;文章标题&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 删除字段</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.RemoveField(</span></span>
<span class="line"><span class="__shiki_1jdh33">            model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;old_field&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重命名字段</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.RenameField(</span></span>
<span class="line"><span class="__shiki_1jdh33">            model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            old_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;old_name&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            new_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;new_name&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加索引</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.AddIndex(</span></span>
<span class="line"><span class="__shiki_1jdh33">            model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.Index(</span></span>
<span class="line"><span class="__shiki_1jdh33">                fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1jdh33">                name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;idx_author_created&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加约束</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.AddConstraint(</span></span>
<span class="line"><span class="__shiki_1jdh33">            model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            constraint</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.CheckConstraint(</span></span>
<span class="line"><span class="__shiki_1jdh33">                check</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.Q(</span><span class="__shiki_1jdh33">view_count__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">                name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;view_count_non_negative&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加外键</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.AddField(</span></span>
<span class="line"><span class="__shiki_1jdh33">            model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            field</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_1jdh33">                on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">django.db.models.deletion.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;articles&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                to</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;app.User&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 数据迁移</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.RunPython(</span></span>
<span class="line"><span class="__shiki_1jdh33">            code</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">forwards_func,</span></span>
<span class="line"><span class="__shiki_1jdh33">            reverse_code</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">backwards_func,</span></span>
<span class="line"><span class="__shiki_1jdh33">            atomic</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_21nrsd">  # 在事务中运行</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 运行SQL</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.RunSQL(</span></span>
<span class="line"><span class="__shiki_1jdh33">            sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                CREATE INDEX idx_article_slug </span></span>
<span class="line"><span class="__shiki_mdbnqw">                ON app_article (slug)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                WHERE status = &#39;PUBLISHED&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            reverse_sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DROP INDEX IF EXISTS idx_article_slug;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> forwards_func</span><span class="__shiki_140thh">(apps, schema_editor):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;向前迁移：数据转换&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> apps.get_model(</span><span class="__shiki_mdbnqw">&#39;app&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Article&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 批量更新</span></span>
<span class="line"><span class="__shiki_140thh">    Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">).update(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;P&#39;</span><span class="__shiki_140thh">).update(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 数据迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Article.objects.all():</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> article.slug:</span></span>
<span class="line"><span class="__shiki_140thh">            article.slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> generate_slug(article.title)</span></span>
<span class="line"><span class="__shiki_140thh">            article.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;slug&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> backwards_func</span><span class="__shiki_140thh">(apps, schema_editor):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;回滚迁移：数据恢复&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> apps.get_model(</span><span class="__shiki_mdbnqw">&#39;app&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Article&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">).update(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;D&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">).update(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;P&#39;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_6-2-高级迁移技巧" tabindex="-1">6.2 高级迁移技巧 <a class="header-anchor" href="#_6-2-高级迁移技巧" aria-label="Permalink to &quot;6.2 高级迁移技巧&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 条件迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> migrations, models</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> should_apply_migration</span><span class="__shiki_140thh">(apps, schema_editor):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;检查是否应该应用迁移&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    connection </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> schema_editor.connection</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> connection.vendor </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;postgresql&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # PostgreSQL特定迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Migration</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">migrations</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Migration</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.RunPython(</span></span>
<span class="line"><span class="__shiki_1jdh33">            code</span><span class="__shiki_1itgoe">=lambda</span><span class="__shiki_140thh"> apps, schema_editor: </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            reverse_code</span><span class="__shiki_1itgoe">=lambda</span><span class="__shiki_140thh"> apps, schema_editor: </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 只在满足条件时运行</span></span>
<span class="line"><span class="__shiki_1jdh33">            elidable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">should_apply_migration</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 跨数据库迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MultiDatabaseMigration</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">migrations</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Migration</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 指定数据库</span></span>
<span class="line"><span class="__shiki_140thh">    atomic </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> False</span><span class="__shiki_21nrsd">  # 非原子操作</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> apply</span><span class="__shiki_140thh">(self, project_state, schema_editor, collect_sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;自定义应用逻辑&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 对主数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> schema_editor.connection.alias </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            super</span><span class="__shiki_140thh">().apply(project_state, schema_editor, collect_sql)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 对其他数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> schema_editor.connection.alias </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;analytics&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 只创建表，不创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> operation </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.operations:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_dzsirb"> isinstance</span><span class="__shiki_140thh">(operation, migrations.CreateModel):</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 简化表结构</span></span>
<span class="line"><span class="__shiki_1itgoe">                    pass</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 零停机迁移（大型表）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ZeroDowntimeMigration</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">migrations</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Migration</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    零停机迁移策略：</span></span>
<span class="line"><span class="__shiki_mdbnqw">    1. 创建新表</span></span>
<span class="line"><span class="__shiki_mdbnqw">    2. 双写数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">    3. 迁移数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">    4. 切换读写</span></span>
<span class="line"><span class="__shiki_mdbnqw">    5. 清理旧表</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, name, app_label):</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">__init__</span><span class="__shiki_140thh">(name, app_label)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.phase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">  # 迁移阶段</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    operations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 阶段1：创建新表结构</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.CreateModel(</span></span>
<span class="line"><span class="__shiki_1jdh33">            name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ArticleNew&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">...</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 阶段2：添加双写触发器（数据库层面）</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.RunSQL(</span></span>
<span class="line"><span class="__shiki_1jdh33">            sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                CREATE OR REPLACE FUNCTION sync_articles()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                RETURNS TRIGGER AS $$</span></span>
<span class="line"><span class="__shiki_mdbnqw">                BEGIN</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    INSERT INTO app_articlenew </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    SELECT * FROM app_article </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    WHERE id = NEW.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ON CONFLICT (id) DO UPDATE </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    SET title = EXCLUDED.title,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        content = EXCLUDED.content;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    RETURN NEW;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                END;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                $$ LANGUAGE plpgsql;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                CREATE TRIGGER sync_articles_trigger</span></span>
<span class="line"><span class="__shiki_mdbnqw">                AFTER INSERT OR UPDATE ON app_article</span></span>
<span class="line"><span class="__shiki_mdbnqw">                FOR EACH ROW EXECUTE FUNCTION sync_articles();</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            reverse_sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                DROP TRIGGER IF EXISTS sync_articles_trigger ON app_article;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                DROP FUNCTION IF EXISTS sync_articles;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 阶段3：批量迁移历史数据</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.RunPython(</span></span>
<span class="line"><span class="__shiki_1jdh33">            code</span><span class="__shiki_1itgoe">=lambda</span><span class="__shiki_140thh"> apps, schema_editor: batch_migrate_data(apps, schema_editor),</span></span>
<span class="line"><span class="__shiki_1jdh33">            reverse_code</span><span class="__shiki_1itgoe">=lambda</span><span class="__shiki_140thh"> apps, schema_editor: </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 阶段4：切换表名</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.SeparateDatabaseAndState(</span></span>
<span class="line"><span class="__shiki_1jdh33">            database_operations</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">                migrations.RunSQL(</span></span>
<span class="line"><span class="__shiki_1jdh33">                    sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ALTER TABLE app_article RENAME TO app_article_old;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ALTER TABLE app_articlenew RENAME TO app_article;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    reverse_sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ALTER TABLE app_article RENAME TO app_articlenew;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ALTER TABLE app_article_old RENAME TO app_article;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                ),</span></span>
<span class="line"><span class="__shiki_140thh">            ],</span></span>
<span class="line"><span class="__shiki_1jdh33">            state_operations</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">                migrations.DeleteModel(</span><span class="__shiki_mdbnqw">&#39;Article&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                migrations.RenameModel(</span><span class="__shiki_mdbnqw">&#39;ArticleNew&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Article&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            ],</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 阶段5：清理</span></span>
<span class="line"><span class="__shiki_140thh">        migrations.RunSQL(</span></span>
<span class="line"><span class="__shiki_1jdh33">            sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DROP TABLE IF EXISTS app_article_old;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            reverse_sql</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_21nrsd">  # 不可逆</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> batch_migrate_data</span><span class="__shiki_140thh">(apps, schema_editor):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;批量迁移数据&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> apps.get_model(</span><span class="__shiki_mdbnqw">&#39;app&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Article&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ArticleNew </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> apps.get_model(</span><span class="__shiki_mdbnqw">&#39;app&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ArticleNew&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    batch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">    total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.count()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> offset </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, total, batch_size):</span></span>
<span class="line"><span class="__shiki_140thh">        batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.all()[offset:offset </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batch_size]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 批量插入新表</span></span>
<span class="line"><span class="__shiki_140thh">        ArticleNew.objects.bulk_create([</span></span>
<span class="line"><span class="__shiki_140thh">            ArticleNew(</span></span>
<span class="line"><span class="__shiki_1jdh33">                id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.id,</span></span>
<span class="line"><span class="__shiki_1jdh33">                title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.title,</span></span>
<span class="line"><span class="__shiki_1jdh33">                content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.content,</span></span>
<span class="line"><span class="__shiki_21nrsd">                # ... 其他字段</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> batch</span></span>
<span class="line"><span class="__shiki_140thh">        ])</span></span></code></pre></div><h2 id="七、性能监控与优化" tabindex="-1">七、性能监控与优化 <a class="header-anchor" href="#七、性能监控与优化" aria-label="Permalink to &quot;七、性能监控与优化&quot;">​</a></h2><h3 id="_7-1-查询性能分析" tabindex="-1">7.1 查询性能分析 <a class="header-anchor" href="#_7-1-查询性能分析" aria-label="Permalink to &quot;7.1 查询性能分析&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. Django Debug Toolbar集成</span></span>
<span class="line"><span class="__shiki_21nrsd"># settings.py</span></span>
<span class="line"><span class="__shiki_dzsirb">DEBUG_TOOLBAR_CONFIG</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;SHOW_TOOLBAR_CALLBACK&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> request: </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;RESULTS_CACHE_SIZE&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;SQL_WARNING_THRESHOLD&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 毫秒</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 自定义查询监控</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connection</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> contextlib </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> contextmanager</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> logging</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">logger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> logging.getLogger(</span><span class="__shiki_mdbnqw">&#39;django.db&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryMonitorMiddleware</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;查询监控中间件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, get_response):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.get_response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> get_response</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __call__</span><span class="__shiki_140thh">(self, request):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重置查询计数</span></span>
<span class="line"><span class="__shiki_140thh">        request.query_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        request.query_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        start_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_response(request)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录查询统计</span></span>
<span class="line"><span class="__shiki_140thh">        query_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> request.query_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_140thh"> query_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 2.0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            logger.warning(</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;慢请求: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">request.path</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> - &quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;查询次数: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">request.query_count</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> - &quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;查询时间: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">query_time</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> response</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. SQL日志记录</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SQLLogger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;SQL日志记录器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.queries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __call__</span><span class="__shiki_140thh">(self, execute, sql, params, many, context):</span></span>
<span class="line"><span class="__shiki_140thh">        start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.perf_counter()</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> execute(sql, params, many, context)</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.log_error(sql, params, e)</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span></span>
<span class="line"><span class="__shiki_1itgoe">        finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.perf_counter() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.log_query(sql, params, duration)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_query</span><span class="__shiki_140thh">(self, sql, params, duration):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 100ms</span></span>
<span class="line"><span class="__shiki_140thh">            logger.warning(</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;慢查询 (</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">duration</span><span class="__shiki_1itgoe">:.3f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">s): </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">sql</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> &quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                f</span><span class="__shiki_mdbnqw">&quot;Params: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">params</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.queries.append({</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;sql&#39;</span><span class="__shiki_140thh">: sql,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;params&#39;</span><span class="__shiki_140thh">: params,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;duration&#39;</span><span class="__shiki_140thh">: duration,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;time&#39;</span><span class="__shiki_140thh">: time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_error</span><span class="__shiki_140thh">(self, sql, params, error):</span></span>
<span class="line"><span class="__shiki_140thh">        logger.error(</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&quot;查询错误: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">error</span><span class="__shiki_dzsirb">}\\n</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&quot;SQL: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">sql</span><span class="__shiki_dzsirb">}\\n</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&quot;Params: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">params</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 查询分析装饰器</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> functools </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> wraps</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> profile_queries</span><span class="__shiki_140thh">(func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;查询性能分析装饰器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @wraps</span><span class="__shiki_140thh">(func)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> wrapper</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connection</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重置查询记录</span></span>
<span class="line"><span class="__shiki_140thh">        initial_queries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(connection.queries)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        start_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.perf_counter()</span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">        end_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.perf_counter()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        queries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> connection.queries[initial_queries:]</span></span>
<span class="line"><span class="__shiki_140thh">        total_duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">(q[</span><span class="__shiki_mdbnqw">&#39;time&#39;</span><span class="__shiki_140thh">]) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> q </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> queries)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\n{</span><span class="__shiki_mdbnqw">&#39;=&#39;</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">50}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;函数: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">func.</span><span class="__shiki_dzsirb">__name__}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;执行时间: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">(end_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time)</span><span class="__shiki_1itgoe">:.3f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">s&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;查询次数: </span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(queries)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;查询总时间: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">total_duration</span><span class="__shiki_1itgoe">:.3f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">s&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 显示慢查询</span></span>
<span class="line"><span class="__shiki_140thh">        slow_queries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [q </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> q </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> queries </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> float</span><span class="__shiki_140thh">(q[</span><span class="__shiki_mdbnqw">&#39;time&#39;</span><span class="__shiki_140thh">]) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> slow_queries:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">慢查询 (&gt;10ms):&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> i, q </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> enumerate</span><span class="__shiki_140thh">(slow_queries[:</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">], </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">. [</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">q[</span><span class="__shiki_mdbnqw">&#39;time&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">s] </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">q[</span><span class="__shiki_mdbnqw">&#39;sql&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_mdbnqw">&#39;=&#39;</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">50}\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> wrapper</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">@profile_queries</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_complex_report</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.select_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;author&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ).prefetch_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;tags&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;comments&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ).filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">        status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ).annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">        comment_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;comments&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ).order_by(</span><span class="__shiki_mdbnqw">&#39;-view_count&#39;</span><span class="__shiki_140thh">)[:</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(articles)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 数据库连接监控</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> check_database_health</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;检查数据库健康状态&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connections</span></span>
<span class="line"><span class="__shiki_1itgoe">    import</span><span class="__shiki_140thh"> psutil</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    report </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> alias </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> connections:</span></span>
<span class="line"><span class="__shiki_140thh">        conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> connections[alias]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 测试连接</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> conn.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">                cursor.execute(</span><span class="__shiki_mdbnqw">&quot;SELECT 1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                connection_ok </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cursor.fetchone()[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 获取连接信息</span></span>
<span class="line"><span class="__shiki_140thh">            report[alias] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;connection_ok&#39;</span><span class="__shiki_140thh">: connection_ok,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;vendor&#39;</span><span class="__shiki_140thh">: conn.vendor,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;in_transaction&#39;</span><span class="__shiki_140thh">: conn.in_atomic_block,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;queries_executed&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(conn.queries) </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> hasattr</span><span class="__shiki_140thh">(conn, </span><span class="__shiki_mdbnqw">&#39;queries&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # PostgreSQL特定检查</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> conn.vendor </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;postgresql&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                cursor.execute(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                        COUNT(*) as active_connections,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        MAX(AGE(backend_start)) as oldest_connection,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        SUM(CASE WHEN state = &#39;active&#39; THEN 1 ELSE 0 END) as executing_queries</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    FROM pg_stat_activity </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    WHERE datname = current_database()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cursor.fetchone()</span></span>
<span class="line"><span class="__shiki_140thh">                report[alias][</span><span class="__shiki_mdbnqw">&#39;postgres_stats&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;active_connections&#39;</span><span class="__shiki_140thh">: stats[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;oldest_connection&#39;</span><span class="__shiki_140thh">: stats[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;executing_queries&#39;</span><span class="__shiki_140thh">: stats[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_140thh">            report[alias] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;connection_ok&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;error&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">(e)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> report</span></span></code></pre></div><h3 id="_7-2-缓存策略" tabindex="-1">7.2 缓存策略 <a class="header-anchor" href="#_7-2-缓存策略" aria-label="Permalink to &quot;7.2 缓存策略&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.core.cache </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> cache</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.views.decorators.cache </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> cache_page</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.utils.decorators </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> method_decorator</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 查询缓存装饰器</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> cache_query</span><span class="__shiki_140thh">(key_template, timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;查询缓存装饰器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> decorator</span><span class="__shiki_140thh">(func):</span></span>
<span class="line"><span class="__shiki_1t8gfj">        @wraps</span><span class="__shiki_140thh">(func)</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> wrapper</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 生成缓存键</span></span>
<span class="line"><span class="__shiki_140thh">            cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> key_template.format(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 尝试从缓存获取</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache.get(cache_key)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 执行查询</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 设置缓存</span></span>
<span class="line"><span class="__shiki_140thh">            cache.set(cache_key, result, timeout)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> wrapper</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> decorator</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">@cache_query</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key_template</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;user_articles_</span><span class="__shiki_dzsirb">{user_id}</span><span class="__shiki_mdbnqw">_</span><span class="__shiki_dzsirb">{page}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_user_articles</span><span class="__shiki_140thh">(user_id, page</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">        author_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user_id,</span></span>
<span class="line"><span class="__shiki_1jdh33">        status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ).order_by(</span><span class="__shiki_mdbnqw">&#39;-published_at&#39;</span><span class="__shiki_140thh">)[</span></span>
<span class="line"><span class="__shiki_140thh">        (page</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">: page</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_140thh">    ])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 模型缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CachedModelManager</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Manager</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;带缓存的模型管理器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">__init__</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._cache_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 300</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_cached</span><span class="__shiki_140thh">(self, pk):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取缓存实例&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.model._meta.model_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">pk</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 尝试从本地缓存获取</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> cache_key </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache:</span></span>
<span class="line"><span class="__shiki_140thh">            cached_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache[cache_key]</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> cached_data[</span><span class="__shiki_mdbnqw">&#39;timestamp&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache_timeout:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> cached_data[</span><span class="__shiki_mdbnqw">&#39;instance&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 从数据库获取</span></span>
<span class="line"><span class="__shiki_140thh">        instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">pk)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 更新缓存</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._cache[cache_key] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;instance&#39;</span><span class="__shiki_140thh">: instance,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;timestamp&#39;</span><span class="__shiki_140thh">: time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> instance</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> clear_cache</span><span class="__shiki_140thh">(self, pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;清理缓存&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> pk:</span></span>
<span class="line"><span class="__shiki_140thh">            cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.model._meta.model_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">pk</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">._cache.pop(cache_key, </span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">._cache.clear()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 视图缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">@method_decorator</span><span class="__shiki_140thh">(cache_page(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 15</span><span class="__shiki_140thh">), </span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;dispatch&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 15分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleListView</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">ListView</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章列表视图（带缓存）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    model </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article</span></span>
<span class="line"><span class="__shiki_140thh">    template_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;articles/list.html&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    paginate_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_queryset</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存的查询集</span></span>
<span class="line"><span class="__shiki_140thh">        cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;article_list_</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.request.</span><span class="__shiki_dzsirb">GET</span><span class="__shiki_140thh">.urlencode()</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache.get(cache_key)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> queryset </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.published().select_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;author&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ).prefetch_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;tags&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ).order_by(</span><span class="__shiki_mdbnqw">&#39;-published_at&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 应用过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> tag </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.request.</span><span class="__shiki_dzsirb">GET</span><span class="__shiki_140thh">.get(</span><span class="__shiki_mdbnqw">&#39;tag&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span><span class="__shiki_1jdh33">tags__name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">tag)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            cache.set(cache_key, queryset, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 5分钟</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> queryset</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_context_data</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_140thh">        context </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> super</span><span class="__shiki_140thh">().get_context_data(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存分页数据</span></span>
<span class="line"><span class="__shiki_140thh">        cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;article_stats_</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.request.</span><span class="__shiki_dzsirb">GET</span><span class="__shiki_140thh">.urlencode()</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache.get(cache_key)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;total_articles&#39;</span><span class="__shiki_140thh">: Article.objects.published().count(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;total_authors&#39;</span><span class="__shiki_140thh">: User.objects.annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">                    article_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;articles&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ).filter(</span><span class="__shiki_1jdh33">article_count__gt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">).count(),</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            cache.set(cache_key, stats, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 30分钟</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        context.update(stats)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> context</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 数据库查询缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryCacheMiddleware</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;数据库查询缓存中间件&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, get_response):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.get_response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> get_response</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __call__</span><span class="__shiki_140thh">(self, request):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 为GET请求启用查询缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> request.method </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;GET&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connections</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> connection </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> connections.all():</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 为每个连接启用查询缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_dzsirb"> hasattr</span><span class="__shiki_140thh">(connection, </span><span class="__shiki_mdbnqw">&#39;use_query_cache&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                    connection.use_query_cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">                    connection.query_cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_response(request)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 清理缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> request.method </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PUT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;DELETE&#39;</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_140thh">            cache.clear()  </span><span class="__shiki_21nrsd"># 清除所有缓存</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> response</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 缓存失效策略</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CacheInvalidator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;缓存失效管理器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> invalidate_article_cache</span><span class="__shiki_140thh">(article_id):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;使文章相关缓存失效&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        cache_keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&#39;article_detail_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">article_id</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&#39;article_list_*&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 通配符匹配</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&#39;user_articles_*&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            f</span><span class="__shiki_mdbnqw">&#39;article_stats_*&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> cache_keys:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_mdbnqw"> &#39;*&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> key:</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 使用Redis的keys命令（生产环境慎用）</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 或者维护一个缓存键的索引</span></span>
<span class="line"><span class="__shiki_1itgoe">                pass</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                cache.delete(key)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> on_article_save</span><span class="__shiki_140thh">(sender, instance, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;文章保存时的缓存失效&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> instance.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            CacheInvalidator.invalidate_article_cache(instance.id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> on_article_delete</span><span class="__shiki_140thh">(sender, instance, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;文章删除时的缓存失效&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        CacheInvalidator.invalidate_article_cache(instance.id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 连接信号</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.models.signals </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> post_save, post_delete</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">post_save.connect(CacheInvalidator.on_article_save, </span><span class="__shiki_1jdh33">sender</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Article)</span></span>
<span class="line"><span class="__shiki_140thh">post_delete.connect(CacheInvalidator.on_article_delete, </span><span class="__shiki_1jdh33">sender</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Article)</span></span></code></pre></div><h2 id="八、数据库路由与多数据库" tabindex="-1">八、数据库路由与多数据库 <a class="header-anchor" href="#八、数据库路由与多数据库" aria-label="Permalink to &quot;八、数据库路由与多数据库&quot;">​</a></h2><h3 id="_8-1-多数据库配置" tabindex="-1">8.1 多数据库配置 <a class="header-anchor" href="#_8-1-多数据库配置" aria-label="Permalink to &quot;8.1 多数据库配置&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># settings.py</span></span>
<span class="line"><span class="__shiki_dzsirb">DATABASES</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;default&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;ENGINE&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;django.db.backends.postgresql&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;NAME&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;main_db&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;USER&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;PASSWORD&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;HOST&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;localhost&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;PORT&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;5432&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;CONN_MAX_AGE&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">600</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 连接池</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;OPTIONS&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;connect_timeout&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;application_name&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;django_app&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;analytics&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;ENGINE&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;django.db.backends.postgresql&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;NAME&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;analytics_db&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;USER&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;analytics_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;PASSWORD&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;HOST&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;analytics.host&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;PORT&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;5432&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;TEST&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;MIRROR&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;default&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 测试时使用默认数据库</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;cache_db&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;ENGINE&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;django.db.backends.postgresql&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;NAME&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;cache_db&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;USER&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;cache_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;PASSWORD&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;HOST&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;cache.host&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;PORT&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;5432&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;CONN_MAX_AGE&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 每次都新建连接</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数据库路由配置</span></span>
<span class="line"><span class="__shiki_dzsirb">DATABASE_ROUTERS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;myapp.routers.AuthRouter&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;myapp.routers.AnalyticsRouter&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;myapp.routers.PrimaryReplicaRouter&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 读写分离配置</span></span>
<span class="line"><span class="__shiki_dzsirb">DATABASE_POOL</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;default&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;POOL_SIZE&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;MAX_OVERFLOW&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;RECYCLE&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-数据库路由器" tabindex="-1">8.2 数据库路由器 <a class="header-anchor" href="#_8-2-数据库路由器" aria-label="Permalink to &quot;8.2 数据库路由器&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># routers.py</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AuthRouter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;认证相关模型路由到默认数据库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    route_app_labels </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&#39;auth&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;contenttypes&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sessions&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> db_for_read</span><span class="__shiki_140thh">(self, model, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> model._meta.app_label </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.route_app_labels:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> db_for_write</span><span class="__shiki_140thh">(self, model, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> model._meta.app_label </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.route_app_labels:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> allow_relation</span><span class="__shiki_140thh">(self, obj1, obj2, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">            obj1._meta.app_label </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.route_app_labels </span><span class="__shiki_1itgoe">or</span></span>
<span class="line"><span class="__shiki_140thh">            obj2._meta.app_label </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.route_app_labels</span></span>
<span class="line"><span class="__shiki_140thh">        ):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> allow_migrate</span><span class="__shiki_140thh">(self, db, app_label, model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> app_label </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.route_app_labels:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> db </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AnalyticsRouter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;分析模型路由到分析数据库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    analytics_models </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&#39;AnalyticsEvent&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;UserBehavior&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;PageView&#39;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> db_for_read</span><span class="__shiki_140thh">(self, model, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> model.</span><span class="__shiki_dzsirb">__name__</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.analytics_models:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;analytics&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> db_for_write</span><span class="__shiki_140thh">(self, model, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 分析数据库只读</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> allow_migrate</span><span class="__shiki_140thh">(self, db, app_label, model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> model_name </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.analytics_models:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> db </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;analytics&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PrimaryReplicaRouter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;主从复制路由&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> db_for_read</span><span class="__shiki_140thh">(self, model, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        随机选择读副本</span></span>
<span class="line"><span class="__shiki_mdbnqw">        可以根据模型、视图等选择不同的副本</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> random</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重要数据走主库</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> model.</span><span class="__shiki_dzsirb">__name__</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;User&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Payment&#39;</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 随机选择副本</span></span>
<span class="line"><span class="__shiki_140thh">        replicas </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;replica1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;replica2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;replica3&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> random.choice(replicas)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> db_for_write</span><span class="__shiki_140thh">(self, model, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;写操作走主库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> allow_relation</span><span class="__shiki_140thh">(self, obj1, obj2, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;允许所有关系&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> allow_migrate</span><span class="__shiki_140thh">(self, db, app_label, model_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;迁移只走主库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> db </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TenantRouter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;多租户数据库路由&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> db_for_read</span><span class="__shiki_140thh">(self, model, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> django_tenants.utils </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> get_tenant_database_alias</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> hasattr</span><span class="__shiki_140thh">(model, </span><span class="__shiki_mdbnqw">&#39;tenant_id&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> get_tenant_database_alias()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> db_for_write</span><span class="__shiki_140thh">(self, model, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">hints):</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> django_tenants.utils </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> get_tenant_database_alias</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> hasattr</span><span class="__shiki_140thh">(model, </span><span class="__shiki_mdbnqw">&#39;tenant_id&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> get_tenant_database_alias()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span></span></code></pre></div><h3 id="_8-3-多数据库操作" tabindex="-1">8.3 多数据库操作 <a class="header-anchor" href="#_8-3-多数据库操作" aria-label="Permalink to &quot;8.3 多数据库操作&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connections, transaction</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db.utils </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> ConnectionHandler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MultiDatabaseService</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;多数据库服务&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> execute_on_all_databases</span><span class="__shiki_140thh">(func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;在所有数据库上执行函数&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> alias </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> connections:</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> connections[alias].cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">                results[alias] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> func(cursor)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> results</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> sync_data</span><span class="__shiki_140thh">(source_alias, target_alias, model_name, batch_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;同步数据到另一个数据库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        source_conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> connections[source_alias]</span></span>
<span class="line"><span class="__shiki_140thh">        target_conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> connections[target_alias]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> source_conn.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> source_cursor:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 获取数据</span></span>
<span class="line"><span class="__shiki_140thh">            source_cursor.execute(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">model_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            columns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [col[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> col </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> source_cursor.description]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> source_cursor:</span></span>
<span class="line"><span class="__shiki_140thh">                batch.append(row)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(batch) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> batch_size:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 批量插入目标数据库</span></span>
<span class="line"><span class="__shiki_140thh">                    MultiDatabaseService._bulk_insert(</span></span>
<span class="line"><span class="__shiki_140thh">                        target_conn, model_name, columns, batch</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                    batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 插入剩余数据</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> batch:</span></span>
<span class="line"><span class="__shiki_140thh">                MultiDatabaseService._bulk_insert(</span></span>
<span class="line"><span class="__shiki_140thh">                    target_conn, model_name, columns, batch</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _bulk_insert</span><span class="__shiki_140thh">(connection, table, columns, rows):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;批量插入&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> connection.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 构建INSERT语句</span></span>
<span class="line"><span class="__shiki_140thh">            placeholders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;, &#39;</span><span class="__shiki_140thh">.join([</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(columns))</span></span>
<span class="line"><span class="__shiki_140thh">            columns_str </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;, &#39;</span><span class="__shiki_140thh">.join(columns)</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;INSERT INTO </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">table</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">columns_str</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">) VALUES (</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">placeholders</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 批量执行</span></span>
<span class="line"><span class="__shiki_140thh">            cursor.executemany(query, rows)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> compare_databases</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;比较两个数据库的结构差异&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        diff_report </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> alias </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;default&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;analytics&#39;</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> connections[alias].cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">                cursor.execute(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    SELECT table_name, column_name, data_type</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    FROM information_schema.columns</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    WHERE table_schema = &#39;public&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ORDER BY table_name, ordinal_position</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                tables </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> table, column, data_type </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> cursor.fetchall():</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> table </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> tables:</span></span>
<span class="line"><span class="__shiki_140thh">                        tables[table] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">                    tables[table][column] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data_type</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                diff_report[alias] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tables</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 比较差异</span></span>
<span class="line"><span class="__shiki_140thh">        default_tables </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> set</span><span class="__shiki_140thh">(diff_report[</span><span class="__shiki_mdbnqw">&#39;default&#39;</span><span class="__shiki_140thh">].keys())</span></span>
<span class="line"><span class="__shiki_140thh">        analytics_tables </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> set</span><span class="__shiki_140thh">(diff_report[</span><span class="__shiki_mdbnqw">&#39;analytics&#39;</span><span class="__shiki_140thh">].keys())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;missing_in_analytics&#39;</span><span class="__shiki_140thh">: default_tables </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> analytics_tables,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;extra_in_analytics&#39;</span><span class="__shiki_140thh">: analytics_tables </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> default_tables,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;column_differences&#39;</span><span class="__shiki_140thh">: MultiDatabaseService._compare_columns(</span></span>
<span class="line"><span class="__shiki_140thh">                diff_report[</span><span class="__shiki_mdbnqw">&#39;default&#39;</span><span class="__shiki_140thh">], diff_report[</span><span class="__shiki_mdbnqw">&#39;analytics&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _compare_columns</span><span class="__shiki_140thh">(default_cols, analytics_cols):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;比较列定义&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        differences </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> table </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> set</span><span class="__shiki_140thh">(default_cols.keys()) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_dzsirb"> set</span><span class="__shiki_140thh">(analytics_cols.keys()):</span></span>
<span class="line"><span class="__shiki_140thh">            default_table_cols </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> default_cols[table]</span></span>
<span class="line"><span class="__shiki_140thh">            analytics_table_cols </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> analytics_cols[table]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> default_table_cols </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> analytics_table_cols:</span></span>
<span class="line"><span class="__shiki_140thh">                differences[table] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;default&#39;</span><span class="__shiki_140thh">: default_table_cols,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;analytics&#39;</span><span class="__shiki_140thh">: analytics_table_cols</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> differences</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CrossDatabaseQuery</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;跨数据库查询&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_user_with_analytics</span><span class="__shiki_140thh">(user_id):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;从多个数据库获取用户数据&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connections</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 从主数据库获取用户信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> connections[</span><span class="__shiki_mdbnqw">&#39;default&#39;</span><span class="__shiki_140thh">].cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">            cursor.execute(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;SELECT * FROM auth_user WHERE id = </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                [user_id]</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            user_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cursor.fetchone()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 从分析数据库获取用户行为</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> connections[</span><span class="__shiki_mdbnqw">&#39;analytics&#39;</span><span class="__shiki_140thh">].cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">            cursor.execute(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    COUNT(*) as event_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    MAX(created_at) as last_event</span></span>
<span class="line"><span class="__shiki_mdbnqw">                FROM analytics_event </span></span>
<span class="line"><span class="__shiki_mdbnqw">                WHERE user_id = </span><span class="__shiki_dzsirb">%s</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span><span class="__shiki_140thh">, [user_id])</span></span>
<span class="line"><span class="__shiki_140thh">            analytics_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cursor.fetchone()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;user&#39;</span><span class="__shiki_140thh">: user_data,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;analytics&#39;</span><span class="__shiki_140thh">: analytics_data</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> sharded_query</span><span class="__shiki_140thh">(shard_key, query_func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;分片查询&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 根据分片键选择数据库</span></span>
<span class="line"><span class="__shiki_140thh">        shard_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> hash</span><span class="__shiki_140thh">(shard_key) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_21nrsd">  # 4个分片</span></span>
<span class="line"><span class="__shiki_140thh">        database_alias </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&#39;shard_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">shard_id</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> connections[database_alias].cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> query_func(cursor)</span></span></code></pre></div><h2 id="九、测试与调试" tabindex="-1">九、测试与调试 <a class="header-anchor" href="#九、测试与调试" aria-label="Permalink to &quot;九、测试与调试&quot;">​</a></h2><h3 id="_9-1-数据库测试" tabindex="-1">9.1 数据库测试 <a class="header-anchor" href="#_9-1-数据库测试" aria-label="Permalink to &quot;9.1 数据库测试&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.test </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> TestCase, TransactionTestCase</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.test.utils </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> CaptureQueriesContext</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connection</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> pytest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ModelTests</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">TestCase</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;模型测试&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> setUp</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试准备&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">            username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;testuser&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;test@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">            title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Test Article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Test content&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.user</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_article_creation</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试文章创建&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.article.title, </span><span class="__shiki_mdbnqw">&#39;Test Article&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.article.author, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.user)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.article.status, </span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_article_publish</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试文章发布&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.article.publish()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.article.status, </span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertIsNotNone(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.article.published_at)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_query_performance</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试查询性能&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建测试数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            Article.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">                title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;Article </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Content&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.user</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 监控查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> CaptureQueriesContext(connection) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> context:</span></span>
<span class="line"><span class="__shiki_140thh">            articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">                author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.user</span></span>
<span class="line"><span class="__shiki_140thh">            ).select_related(</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 断言查询次数</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertLessEqual(</span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(context), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 最多2个查询</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查是否使用了select_related</span></span>
<span class="line"><span class="__shiki_140thh">        sql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> context[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">][</span><span class="__shiki_mdbnqw">&#39;sql&#39;</span><span class="__shiki_140thh">].lower()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertIn(</span><span class="__shiki_mdbnqw">&#39;join&#39;</span><span class="__shiki_140thh">, sql)  </span><span class="__shiki_21nrsd"># 应该包含JOIN</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_concurrent_updates</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试并发更新&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> threading </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Thread</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> increment_views</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">            time.sleep(</span><span class="__shiki_dzsirb">0.01</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 模拟并发</span></span>
<span class="line"><span class="__shiki_140thh">            article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.article.pk)</span></span>
<span class="line"><span class="__shiki_140thh">            article.increment_view_count()</span></span>
<span class="line"><span class="__shiki_140thh">            results.append(article.view_count)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启动多个线程同时更新</span></span>
<span class="line"><span class="__shiki_140thh">        threads </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [Thread(</span><span class="__shiki_1jdh33">target</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">increment_views) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> _ </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)]</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> thread </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> threads:</span></span>
<span class="line"><span class="__shiki_140thh">            thread.start()</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> thread </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> threads:</span></span>
<span class="line"><span class="__shiki_140thh">            thread.join()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 验证结果</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.article.view_count, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_bulk_operations</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试批量操作&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 批量创建</span></span>
<span class="line"><span class="__shiki_140thh">        articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            Article(</span><span class="__shiki_1jdh33">title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;Bulk </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.user)</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.assertNumQueries(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            Article.objects.bulk_create(articles)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.assertNumQueries(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">                author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.user</span></span>
<span class="line"><span class="__shiki_140thh">            ).update(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 验证</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(</span></span>
<span class="line"><span class="__shiki_140thh">            Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">).count(),</span></span>
<span class="line"><span class="__shiki_dzsirb">            1001</span><span class="__shiki_21nrsd">  # 包括之前创建的</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionTests</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">TransactionTestCase</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;事务测试&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_atomic_transaction</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试原子事务&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">                User.objects.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;test1&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;模拟错误&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            pass</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 用户不应该被创建</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertFalse(User.objects.filter(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;test1&#39;</span><span class="__shiki_140thh">).exists())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_nested_transactions</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试嵌套事务&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">            user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;parent&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            savepoint_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">                    savepoint_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> transaction.savepoint()</span></span>
<span class="line"><span class="__shiki_140thh">                    Article.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">                        title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Child Article&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                        author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_1itgoe">                    raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;子事务错误&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> savepoint_id:</span></span>
<span class="line"><span class="__shiki_140thh">                    transaction.savepoint_rollback(savepoint_id)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 用户应该被创建，文章不应该</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.assertTrue(User.objects.filter(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;parent&#39;</span><span class="__shiki_140thh">).exists())</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.assertFalse(Article.objects.filter(</span><span class="__shiki_1jdh33">title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Child Article&#39;</span><span class="__shiki_140thh">).exists())</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@pytest.mark.django_db</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PytestModelTests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;使用pytest的模型测试&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @pytest.fixture</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_user</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试用户fixture&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> User.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">            username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;pytest_user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;pytest@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_user_creation</span><span class="__shiki_140thh">(self, test_user):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试用户创建&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        assert</span><span class="__shiki_140thh"> test_user.username </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;pytest_user&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        assert</span><span class="__shiki_140thh"> test_user.is_active </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @pytest.mark.parametrize</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;status,expected_count&#39;</span><span class="__shiki_140thh">, [</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ])</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_article_status_filter</span><span class="__shiki_140thh">(self, test_user, status, expected_count):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;参数化测试状态过滤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建测试数据</span></span>
<span class="line"><span class="__shiki_140thh">        Article.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">            title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Draft 1&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">test_user,</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        Article.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">            title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Draft 2&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">test_user,</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        Article.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">            title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Published&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">test_user,</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">test_user,</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">status</span></span>
<span class="line"><span class="__shiki_140thh">        ).count()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        assert</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> expected_count</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryOptimizationTests</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">TestCase</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;查询优化测试&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_n_plus_one_problem</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试N+1问题&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建测试数据</span></span>
<span class="line"><span class="__shiki_140thh">        user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">                title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;Article </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> j </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                Comment.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">                    article</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;Comment </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">j</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 错误的做法：N+1查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.assertNumQueries(</span><span class="__shiki_dzsirb">11</span><span class="__shiki_140thh">):  </span><span class="__shiki_21nrsd"># 1 + 10</span></span>
<span class="line"><span class="__shiki_140thh">            articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user)</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:</span></span>
<span class="line"><span class="__shiki_dzsirb">                list</span><span class="__shiki_140thh">(article.comments.all())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 正确的做法：使用prefetch_related</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.assertNumQueries(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">):  </span><span class="__shiki_21nrsd"># 1个文章查询 + 1个评论查询</span></span>
<span class="line"><span class="__shiki_140thh">            articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">                author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user</span></span>
<span class="line"><span class="__shiki_140thh">            ).prefetch_related(</span><span class="__shiki_mdbnqw">&#39;comments&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:</span></span>
<span class="line"><span class="__shiki_dzsirb">                list</span><span class="__shiki_140thh">(article.comments.all())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_index_usage</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试索引使用&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建大量数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            User.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">                username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;user_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;user_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 分析查询计划</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> connection.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">            cursor.execute(</span><span class="__shiki_mdbnqw">&quot;EXPLAIN ANALYZE SELECT * FROM auth_user WHERE username = &#39;user_5000&#39;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            plan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cursor.fetchall()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查是否使用了索引</span></span>
<span class="line"><span class="__shiki_140thh">            plan_text </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">.join(row[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> plan)</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.assertIn(</span><span class="__shiki_mdbnqw">&#39;Index Scan&#39;</span><span class="__shiki_140thh">, plan_text)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> FactoryBoyIntegration</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;使用Factory Boy创建测试数据&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    import</span><span class="__shiki_140thh"> factory</span></span>
<span class="line"><span class="__shiki_1itgoe">    from</span><span class="__shiki_140thh"> factory.django </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> DjangoModelFactory</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> UserFactory</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">DjangoModelFactory</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">        class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            model </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> factory.Sequence(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> n: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;user_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">n</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> factory.LazyAttribute(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> obj: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">obj.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        is_active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> ArticleFactory</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">DjangoModelFactory</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">        class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            model </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> factory.Faker(</span><span class="__shiki_mdbnqw">&#39;sentence&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        content </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> factory.Faker(</span><span class="__shiki_mdbnqw">&#39;text&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        author </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> factory.SubFactory(UserFactory)</span></span>
<span class="line"><span class="__shiki_140thh">        status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;DRAFT&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        @factory.post_generation</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> tags</span><span class="__shiki_140thh">(self, create, extracted, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> create:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> extracted:</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> tag </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> extracted:</span></span>
<span class="line"><span class="__shiki_dzsirb">                    self</span><span class="__shiki_140thh">.tags.add(tag)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> test_factory_creation</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;测试工厂创建&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建单个用户</span></span>
<span class="line"><span class="__shiki_140thh">        user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.UserFactory()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(user.email, </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">user.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建带标签的文章</span></span>
<span class="line"><span class="__shiki_140thh">        article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.ArticleFactory(</span></span>
<span class="line"><span class="__shiki_1jdh33">            author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user,</span></span>
<span class="line"><span class="__shiki_1jdh33">            tags</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;python&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;django&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(article.tags.count(), </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 批量创建</span></span>
<span class="line"><span class="__shiki_140thh">        articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.ArticleFactory.create_batch(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.assertEqual(</span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(articles), </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_9-2-调试工具" tabindex="-1">9.2 调试工具 <a class="header-anchor" href="#_9-2-调试工具" aria-label="Permalink to &quot;9.2 调试工具&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ORMDebugTool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;ORM调试工具集&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> print_queryset_sql</span><span class="__shiki_140thh">(queryset):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;打印查询集的SQL&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;SQL: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">queryset.query</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Params: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">queryset.query.params</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> explain_queryset</span><span class="__shiki_140thh">(queryset):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;解释查询执行计划&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connection</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        sql, params </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.query.sql_with_params()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> connection.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_140thh">            cursor.execute(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;EXPLAIN ANALYZE </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">sql</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, params)</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cursor.fetchall()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Execution Plan:&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> result:</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(row[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> profile_queryset</span><span class="__shiki_140thh">(queryset, iterations</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;性能分析查询集&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 预热</span></span>
<span class="line"><span class="__shiki_dzsirb">        list</span><span class="__shiki_140thh">(queryset[:</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 测量</span></span>
<span class="line"><span class="__shiki_140thh">        start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.perf_counter()</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _ </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(iterations):</span></span>
<span class="line"><span class="__shiki_dzsirb">            list</span><span class="__shiki_140thh">(queryset)</span></span>
<span class="line"><span class="__shiki_140thh">        end </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.perf_counter()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        avg_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (end </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> iterations</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Average time: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">avg_time</span><span class="__shiki_1itgoe">:.4f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">s&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Total time: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">end </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start</span><span class="__shiki_1itgoe">:.4f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">s&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Iterations: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">iterations</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> find_n_plus_one</span><span class="__shiki_140thh">(model_class, related_field):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检测N+1查询问题&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connection</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取所有实例</span></span>
<span class="line"><span class="__shiki_140thh">        instances </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> model_class.objects.all()[:</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重置查询计数</span></span>
<span class="line"><span class="__shiki_140thh">        connection.queries_log.clear()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 触发N+1查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> instance </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> instances:</span></span>
<span class="line"><span class="__shiki_dzsirb">            getattr</span><span class="__shiki_140thh">(instance, related_field).all()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        query_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(connection.queries)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Total queries: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">query_count</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Instances: </span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(instances)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> query_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(instances) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;⚠️  Potential N+1 problem detected!&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;   Expected: ~</span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(instances) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1}</span><span class="__shiki_mdbnqw"> queries&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;   Actual: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">query_count</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> queries&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 显示查询</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> i, query </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> enumerate</span><span class="__shiki_140thh">(connection.queries[:</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">]):</span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;  </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">1}</span><span class="__shiki_mdbnqw">. </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">query[</span><span class="__shiki_mdbnqw">&#39;sql&#39;</span><span class="__shiki_140thh">][:</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">]</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> query_count</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> generate_test_data</span><span class="__shiki_140thh">(model_class, count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成测试数据&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> django.db </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> transaction</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Generating </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">count</span><span class="__shiki_dzsirb">}</span><span class="__shiki_dzsirb"> {</span><span class="__shiki_140thh">model_class._meta.verbose_name_plural</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        batch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">        created </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, count, batch_size):</span></span>
<span class="line"><span class="__shiki_140thh">                batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> j </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">min</span><span class="__shiki_140thh">(batch_size, count </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> i)):</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 创建模型实例</span></span>
<span class="line"><span class="__shiki_140thh">                    instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> model_class()</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 为每个字段生成值</span></span>
<span class="line"><span class="__shiki_1itgoe">                    for</span><span class="__shiki_140thh"> field </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> model_class._meta.fields:</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> field.primary_key:</span></span>
<span class="line"><span class="__shiki_1itgoe">                            continue</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ORMDebugTool._generate_field_value(field)</span></span>
<span class="line"><span class="__shiki_dzsirb">                        setattr</span><span class="__shiki_140thh">(instance, field.name, value)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    batch.append(instance)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 批量插入</span></span>
<span class="line"><span class="__shiki_140thh">                model_class.objects.bulk_create(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                created </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(batch)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_dzsirb">                print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;  Created </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">created</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">count</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;✓ Created </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">created</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> records&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _generate_field_value</span><span class="__shiki_140thh">(field):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;为字段生成测试值&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> random</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> string</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime, timedelta</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 根据字段类型生成值</span></span>
<span class="line"><span class="__shiki_140thh">        field_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> field.get_internal_type()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> field_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;CharField&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            length </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> min</span><span class="__shiki_140thh">(field.max_length </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">.join(random.choices(string.ascii_letters, </span><span class="__shiki_1jdh33">k</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">length))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> field_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;TextField&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &#39; &#39;</span><span class="__shiki_140thh">.join([</span><span class="__shiki_mdbnqw">&#39;word&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> random.randint(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> field_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;IntegerField&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> random.randint(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> field_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;BooleanField&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> random.choice([</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> field_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;DateTimeField&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            days_ago </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> random.randint(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">365</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> datetime.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">days_ago)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> field_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;EmailField&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">.join(random.choices(string.ascii_lowercase, </span><span class="__shiki_1jdh33">k</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">@example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> field_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;ForeignKey&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 返回一个随机的现有ID或None</span></span>
<span class="line"><span class="__shiki_140thh">            model </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> field.related_model</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> model.objects.exists():</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> random.choice(model.objects.all()[:</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Django Shell Plus 增强</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在settings.py中添加</span></span>
<span class="line"><span class="__shiki_dzsirb">SHELL_PLUS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;ipython&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">SHELL_PLUS_PRINT_SQL</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_dzsirb">SHELL_PLUS_PRINT_SQL_TRUNCATE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义shell命令</span></span>
<span class="line"><span class="__shiki_dzsirb">SHELL_PLUS_PRE_IMPORTS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;django.db.models&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Count&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Sum&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Avg&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Max&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Min&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;django.db.models&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Q&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;F&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;datetime&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;datetime&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;timedelta&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">SHELL_PLUS_POST_IMPORTS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;myapp.models&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    (</span><span class="__shiki_mdbnqw">&#39;myapp.utils.debug&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ORMDebugTool&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="十、最佳实践与模式" tabindex="-1">十、最佳实践与模式 <a class="header-anchor" href="#十、最佳实践与模式" aria-label="Permalink to &quot;十、最佳实践与模式&quot;">​</a></h2><h3 id="_10-1-设计模式" tabindex="-1">10.1 设计模式 <a class="header-anchor" href="#_10-1-设计模式" aria-label="Permalink to &quot;10.1 设计模式&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. Repository模式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleRepository</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章仓库模式&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_published_articles</span><span class="__shiki_140thh">(page</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, page_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取已发布文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ).select_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;author&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ).prefetch_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;tags&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ).order_by(</span><span class="__shiki_mdbnqw">&#39;-published_at&#39;</span><span class="__shiki_140thh">)[</span></span>
<span class="line"><span class="__shiki_140thh">            (page</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">page_size: page</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">page_size</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_by_slug</span><span class="__shiki_140thh">(slug):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;根据slug获取文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Article.objects.select_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;author&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ).prefetch_related(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;tags&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Prefetch(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;comments&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                queryset</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Comment.objects.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">                to_attr</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;active_comments&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        ).get(</span><span class="__shiki_1jdh33">slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">slug, </span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> increment_view_count</span><span class="__shiki_140thh">(article_id):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;增加浏览次数&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        Article.objects.filter(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article_id).update(</span></span>
<span class="line"><span class="__shiki_1jdh33">            view_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> search</span><span class="__shiki_140thh">(query, filters</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;搜索文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ).select_related(</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 全文搜索</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> query:</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span></span>
<span class="line"><span class="__shiki_140thh">                Q(</span><span class="__shiki_1jdh33">title__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">query) </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_140thh">                Q(</span><span class="__shiki_1jdh33">content__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">query) </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_140thh">                Q(</span><span class="__shiki_1jdh33">author__username__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">query)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 应用过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> filters:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> tags </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;tags&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span><span class="__shiki_1jdh33">tags__name__in</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">tags)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> author_id </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;author_id&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span><span class="__shiki_1jdh33">author_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">author_id)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> start_date </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;start_date&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span><span class="__shiki_1jdh33">published_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> end_date </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> filters.get(</span><span class="__shiki_mdbnqw">&#39;end_date&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">                queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(</span><span class="__shiki_1jdh33">published_at__lte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> queryset.order_by(</span><span class="__shiki_mdbnqw">&#39;-published_at&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. Service模式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleService</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章服务层&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, repository</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.repository </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> repository </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> ArticleRepository</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> publish_article</span><span class="__shiki_140thh">(self, article_id, publish_at</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;发布文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">            article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.select_for_update().get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article_id)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> article.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;文章已发布&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            article.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            article.published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> publish_at </span><span class="__shiki_1itgoe">or</span><span class="__shiki_140thh"> timezone.now()</span></span>
<span class="line"><span class="__shiki_140thh">            article.save(</span><span class="__shiki_1jdh33">update_fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 触发事件</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">._notify_subscribers(article)</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">._update_search_index(article)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> article</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> create_article_with_tags</span><span class="__shiki_140thh">(self, user, title, content, tags</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;创建带标签的文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">            article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">                title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">title,</span></span>
<span class="line"><span class="__shiki_1jdh33">                content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">content,</span></span>
<span class="line"><span class="__shiki_1jdh33">                author</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user,</span></span>
<span class="line"><span class="__shiki_1itgoe">                **</span><span class="__shiki_140thh">kwargs</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> tags:</span></span>
<span class="line"><span class="__shiki_140thh">                article.tags.set(tags)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 记录创建日志</span></span>
<span class="line"><span class="__shiki_140thh">            AuditLog.objects.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">                user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user,</span></span>
<span class="line"><span class="__shiki_1jdh33">                action</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;CREATE_ARTICLE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                target_object_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.id,</span></span>
<span class="line"><span class="__shiki_1jdh33">                details</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">: title}</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> article</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _notify_subscribers</span><span class="__shiki_140thh">(self, article):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;通知订阅者&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 实现通知逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">        pass</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _update_search_index</span><span class="__shiki_140thh">(self, article):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;更新搜索索引&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 实现搜索索引更新</span></span>
<span class="line"><span class="__shiki_1itgoe">        pass</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Data Transfer Object (DTO)模式</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> dataclasses </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> List, Optional</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleDTO</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章数据传输对象&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">int</span></span>
<span class="line"><span class="__shiki_140thh">    title: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    slug: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    content: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    excerpt: Optional[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    author_id: </span><span class="__shiki_dzsirb">int</span></span>
<span class="line"><span class="__shiki_140thh">    author_name: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    author_avatar: Optional[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    status: </span><span class="__shiki_dzsirb">str</span></span>
<span class="line"><span class="__shiki_140thh">    published_at: Optional[datetime]</span></span>
<span class="line"><span class="__shiki_140thh">    view_count: </span><span class="__shiki_dzsirb">int</span></span>
<span class="line"><span class="__shiki_140thh">    rating: </span><span class="__shiki_dzsirb">float</span></span>
<span class="line"><span class="__shiki_140thh">    tags: List[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    comment_count: </span><span class="__shiki_dzsirb">int</span></span>
<span class="line"><span class="__shiki_140thh">    like_count: </span><span class="__shiki_dzsirb">int</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> from_orm</span><span class="__shiki_140thh">(cls, article):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;从ORM对象创建DTO&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">            id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.id,</span></span>
<span class="line"><span class="__shiki_1jdh33">            title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.title,</span></span>
<span class="line"><span class="__shiki_1jdh33">            slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.slug,</span></span>
<span class="line"><span class="__shiki_1jdh33">            content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.content,</span></span>
<span class="line"><span class="__shiki_1jdh33">            excerpt</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.excerpt,</span></span>
<span class="line"><span class="__shiki_1jdh33">            author_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.author_id,</span></span>
<span class="line"><span class="__shiki_1jdh33">            author_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.author.username,</span></span>
<span class="line"><span class="__shiki_1jdh33">            author_avatar</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.author.avatar.url </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> article.author.avatar </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.status,</span></span>
<span class="line"><span class="__shiki_1jdh33">            published_at</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.published_at,</span></span>
<span class="line"><span class="__shiki_1jdh33">            view_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.view_count,</span></span>
<span class="line"><span class="__shiki_1jdh33">            rating</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.rating,</span></span>
<span class="line"><span class="__shiki_1jdh33">            tags</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[tag.name </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> tag </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> article.tags.all()],</span></span>
<span class="line"><span class="__shiki_1jdh33">            comment_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.comments.count(),</span></span>
<span class="line"><span class="__shiki_1jdh33">            like_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article.likes.count(),</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> to_dict</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;转换为字典&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;id&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;title&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.title,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;slug&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.slug,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;excerpt&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.excerpt,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;author&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;id&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.author_id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;name&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.author_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;avatar&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.author_avatar,</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;status&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.status,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;published_at&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.published_at.isoformat() </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.published_at </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;view_count&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.view_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;rating&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.rating,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;tags&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.tags,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;stats&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;comments&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.comment_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;likes&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.like_count,</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. Query Object模式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleQuery</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;文章查询对象&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.filters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.order_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;-published_at&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.select_related </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.prefetch_related </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;tags&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.annotations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.offset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> by_status</span><span class="__shiki_140thh">(self, status):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;按状态过滤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.filters.append(Q(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">status))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> by_author</span><span class="__shiki_140thh">(self, author_id):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;按作者过滤&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.filters.append(Q(</span><span class="__shiki_1jdh33">author_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">author_id))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> published_after</span><span class="__shiki_140thh">(self, date):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;发布时间之后&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.filters.append(Q(</span><span class="__shiki_1jdh33">published_at__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">date))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> with_min_views</span><span class="__shiki_140thh">(self, min_views):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;最小浏览量&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.filters.append(Q(</span><span class="__shiki_1jdh33">view_count__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">min_views))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> search</span><span class="__shiki_140thh">(self, query):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;搜索&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> query:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.filters.append(</span></span>
<span class="line"><span class="__shiki_140thh">                Q(</span><span class="__shiki_1jdh33">title__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">query) </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_140thh">                Q(</span><span class="__shiki_1jdh33">content__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">query)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> order_by_views</span><span class="__shiki_140thh">(self, descending</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;按浏览量排序&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> descending:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.order_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;-view_count&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.order_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> paginate</span><span class="__shiki_140thh">(self, page</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, page_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;分页&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.offset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (page </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> page_size</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.limit </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> page_size</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;执行查询&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.all()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 应用过滤</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filters:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Q()</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> filter_q </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filters:</span></span>
<span class="line"><span class="__shiki_140thh">                query </span><span class="__shiki_1itgoe">&amp;=</span><span class="__shiki_140thh"> filter_q</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.filter(query)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 应用关联查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.select_related:</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.select_related(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.select_related)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.prefetch_related:</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.prefetch_related(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.prefetch_related)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 应用注解</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.annotations:</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.annotate(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.annotations)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 应用排序</span></span>
<span class="line"><span class="__shiki_140thh">        queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.order_by(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.order_by)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 应用分页</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.limit </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset[</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.offset:</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.offset </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.limit]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> queryset</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    ArticleQuery()</span></span>
<span class="line"><span class="__shiki_140thh">    .by_status(</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .published_after(timezone.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    .with_min_views(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .order_by_views()</span></span>
<span class="line"><span class="__shiki_140thh">    .paginate(</span><span class="__shiki_1jdh33">page</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">page_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.execute()</span></span></code></pre></div><h3 id="_10-2-性能模式" tabindex="-1">10.2 性能模式 <a class="header-anchor" href="#_10-2-性能模式" aria-label="Permalink to &quot;10.2 性能模式&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 懒加载与预加载模式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> LazyDataLoader</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;懒加载数据&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, queryset, chunk_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.chunk_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> chunk_size</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __iter__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __next__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._index </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">._cache):</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">._load_next_chunk()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> StopIteration</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        item </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache[</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">._index]</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._index </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> item</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _load_next_chunk</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        offset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">._cache) </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._cache </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.queryset[offset:offset </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.chunk_size]</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_140thh">loader </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> LazyDataLoader(</span></span>
<span class="line"><span class="__shiki_140thh">    Article.objects.all(),</span></span>
<span class="line"><span class="__shiki_1jdh33">    chunk_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">500</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> loader:</span></span>
<span class="line"><span class="__shiki_140thh">    process_article(article)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 缓存装饰器模式</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> functools</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.core.cache </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> cache</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> cached_method</span><span class="__shiki_140thh">(timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, key_prefix</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;方法缓存装饰器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> decorator</span><span class="__shiki_140thh">(method):</span></span>
<span class="line"><span class="__shiki_1t8gfj">        @functools.wraps</span><span class="__shiki_140thh">(method)</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> wrapper</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 生成缓存键</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> key_prefix:</span></span>
<span class="line"><span class="__shiki_140thh">                cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">key_prefix</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">_</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.pk</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                cache_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">__class__</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">__name__}</span><span class="__shiki_mdbnqw">_</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.pk</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">_</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">method.</span><span class="__shiki_dzsirb">__name__}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 尝试从缓存获取</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache.get(cache_key)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 执行方法</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> method(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 设置缓存</span></span>
<span class="line"><span class="__shiki_140thh">            cache.set(cache_key, result, timeout)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> wrapper</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> decorator</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在模型中使用</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ... 字段</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @cached_method</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">key_prefix</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;user_stats&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_statistics</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取用户统计（带缓存）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;article_count&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.articles.count(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;comment_count&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.comments.count(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;total_views&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.articles.aggregate(</span></span>
<span class="line"><span class="__shiki_1jdh33">                total</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Sum(</span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            )[</span><span class="__shiki_mdbnqw">&#39;total&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 批量处理模式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BatchProcessor</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;批量处理器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, model_class, batch_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.model_class </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> model_class</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.batch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> batch_size</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> process_all</span><span class="__shiki_140thh">(self, process_func, queryset</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;处理所有记录&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.model_class.objects.all()</span></span>
<span class="line"><span class="__shiki_140thh">        total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.count()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> offset </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, total, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.batch_size):</span></span>
<span class="line"><span class="__shiki_140thh">            batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset[offset:offset </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch_size]</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">._process_batch(batch, process_func)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Processed </span><span class="__shiki_dzsirb">{min</span><span class="__shiki_140thh">(offset </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch_size, total)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">total</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _process_batch</span><span class="__shiki_140thh">(self, batch, process_func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;处理批次&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        updates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> obj </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> batch:</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> process_func(obj)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                updates.append(result)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> updates:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.model_class.objects.bulk_update(</span></span>
<span class="line"><span class="__shiki_140thh">                updates,</span></span>
<span class="line"><span class="__shiki_140thh">                [field </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> field </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> updates[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].</span><span class="__shiki_dzsirb">__dict__</span><span class="__shiki_140thh">.keys()</span></span>
<span class="line"><span class="__shiki_1itgoe">                 if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> field.startswith(</span><span class="__shiki_mdbnqw">&#39;_&#39;</span><span class="__shiki_140thh">)]</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> map_reduce</span><span class="__shiki_140thh">(self, map_func, reduce_func, initial</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;Map-Reduce模式&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.model_class.objects.all()</span></span>
<span class="line"><span class="__shiki_140thh">        total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset.count()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> initial</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> offset </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, total, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.batch_size):</span></span>
<span class="line"><span class="__shiki_140thh">            batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryset[offset:offset </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch_size]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # Map阶段</span></span>
<span class="line"><span class="__shiki_140thh">            mapped </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [map_func(obj) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> obj </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> batch]</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # Reduce阶段</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> reduce_func(result, mapped)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Processed </span><span class="__shiki_dzsirb">{min</span><span class="__shiki_140thh">(offset </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch_size, total)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">total</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_140thh">processor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> BatchProcessor(Article, </span><span class="__shiki_1jdh33">batch_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> update_article</span><span class="__shiki_140thh">(article):</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> article.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> article.published_at:</span></span>
<span class="line"><span class="__shiki_140thh">        article.published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.now()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> article</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">processor.process_all(update_article)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Map-Reduce示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> map_views</span><span class="__shiki_140thh">(article):</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> article.view_count</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> sum_views</span><span class="__shiki_140thh">(total, batch_views):</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> (total </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(batch_views)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">total_views </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> processor.map_reduce(map_views, sum_views)</span></span>
<span class="line"><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Total views: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">total_views</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="十一、常见陷阱与解决方案" tabindex="-1">十一、常见陷阱与解决方案 <a class="header-anchor" href="#十一、常见陷阱与解决方案" aria-label="Permalink to &quot;十一、常见陷阱与解决方案&quot;">​</a></h2><h3 id="_11-1-性能陷阱" tabindex="-1">11.1 性能陷阱 <a class="header-anchor" href="#_11-1-性能陷阱" aria-label="Permalink to &quot;11.1 性能陷阱&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 陷阱1: N+1查询问题</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.all()</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(article.author.username)  </span><span class="__shiki_21nrsd"># 每次循环都查询数据库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.select_related(</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">).all()</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(article.author.username)  </span><span class="__shiki_21nrsd"># 一次性获取所有作者</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱2: 在循环中保存</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> User.objects.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    user.is_active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">    user.save()  </span><span class="__shiki_21nrsd"># 每次循环都执行UPDATE</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_140thh">User.objects.filter(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">).update(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱3: 获取不需要的字段</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.all()  </span><span class="__shiki_21nrsd"># 获取所有字段，包括大文本字段</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.only(</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;author_id&#39;</span><span class="__shiki_140thh">).all()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱4: 错误使用count()</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">).count() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 执行COUNT查询</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DRAFT&#39;</span><span class="__shiki_140thh">).exists():  </span><span class="__shiki_21nrsd"># 执行EXISTS查询，更快</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱5: 不必要的数据转换</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(Article.objects.all())  </span><span class="__shiki_21nrsd"># 立即转换为列表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_140thh">articles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.all()  </span><span class="__shiki_21nrsd"># 保持为QuerySet</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> article </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> articles:  </span><span class="__shiki_21nrsd"># 惰性求值</span></span>
<span class="line"><span class="__shiki_140thh">    process(article)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱6: 忘记使用索引</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 没有索引</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 没有定义索引</span></span>
<span class="line"><span class="__shiki_1itgoe">        pass</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询会很慢</span></span>
<span class="line"><span class="__shiki_140thh">Article.objects.filter(</span><span class="__shiki_1jdh33">title__icontains</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;django&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">db_index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 添加索引</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            models.Index(</span><span class="__shiki_1jdh33">fields</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">]),  </span><span class="__shiki_21nrsd"># 复合索引</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱7: 大事务阻塞</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">@transaction.atomic</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> import_large_dataset</span><span class="__shiki_140thh">(data):</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> data:  </span><span class="__shiki_21nrsd"># 100万条记录</span></span>
<span class="line"><span class="__shiki_140thh">        Model.objects.create(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">item)  </span><span class="__shiki_21nrsd"># 长时间持有事务</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> import_large_dataset</span><span class="__shiki_140thh">(data):</span></span>
<span class="line"><span class="__shiki_140thh">    batch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(data), batch_size):</span></span>
<span class="line"><span class="__shiki_140thh">        batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data[i:i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batch_size]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> transaction.atomic():  </span><span class="__shiki_21nrsd"># 分批提交</span></span>
<span class="line"><span class="__shiki_140thh">            Model.objects.bulk_create([</span></span>
<span class="line"><span class="__shiki_140thh">                Model(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">item) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> batch</span></span>
<span class="line"><span class="__shiki_140thh">            ])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱8: 重复查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_user_stats</span><span class="__shiki_140thh">(user_id):</span></span>
<span class="line"><span class="__shiki_140thh">    article_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">author_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user_id).count()</span></span>
<span class="line"><span class="__shiki_140thh">    comment_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Comment.objects.filter(</span><span class="__shiki_1jdh33">author_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user_id).count()</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 两个独立的查询</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_user_stats</span><span class="__shiki_140thh">(user_id):</span></span>
<span class="line"><span class="__shiki_140thh">    stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.objects.filter(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user_id).annotate(</span></span>
<span class="line"><span class="__shiki_1jdh33">        article_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;articles&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">        comment_count</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Count(</span><span class="__shiki_mdbnqw">&#39;comments&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ).values(</span><span class="__shiki_mdbnqw">&#39;article_count&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;comment_count&#39;</span><span class="__shiki_140thh">).first()</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 一个查询获取所有统计</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱9: 忘记清理连接</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> long_running_task</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">        obj </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Model.objects.get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">i)  </span><span class="__shiki_21nrsd"># 每次循环都新建连接</span></span>
<span class="line"><span class="__shiki_140thh">        process(obj)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> long_running_task</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 复用连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> connection.cursor() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> cursor:</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            cursor.execute(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM model WHERE id = </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, [i])</span></span>
<span class="line"><span class="__shiki_140thh">            row </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cursor.fetchone()</span></span>
<span class="line"><span class="__shiki_140thh">            process(row)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱10: 错误评估QuerySet</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_140thh">queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> queryset:  </span><span class="__shiki_21nrsd"># 评估整个QuerySet</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_140thh">queryset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;PUBLISHED&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> queryset.exists():  </span><span class="__shiki_21nrsd"># 使用exists()，更高效</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ...</span></span></code></pre></div><h3 id="_11-2-数据完整性陷阱" tabindex="-1">11.2 数据完整性陷阱 <a class="header-anchor" href="#_11-2-数据完整性陷阱" aria-label="Permalink to &quot;11.2 数据完整性陷阱&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 陷阱1: 竞态条件</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> transfer_balance</span><span class="__shiki_140thh">(from_account, to_account, amount):</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> from_account.balance </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> amount:</span></span>
<span class="line"><span class="__shiki_140thh">        from_account.balance </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> amount</span></span>
<span class="line"><span class="__shiki_140thh">        from_account.save()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        to_account.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> amount</span></span>
<span class="line"><span class="__shiki_140thh">        to_account.save()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> transfer_balance</span><span class="__shiki_140thh">(from_account, to_account, amount):</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 锁定账户行</span></span>
<span class="line"><span class="__shiki_140thh">        from_acc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Account.objects.select_for_update().get(</span></span>
<span class="line"><span class="__shiki_1jdh33">            pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">from_account.pk</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        to_acc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Account.objects.select_for_update().get(</span></span>
<span class="line"><span class="__shiki_1jdh33">            pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">to_account.pk</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> from_acc.balance </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> amount:</span></span>
<span class="line"><span class="__shiki_140thh">            from_acc.balance </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> amount</span></span>
<span class="line"><span class="__shiki_140thh">            from_acc.save()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            to_acc.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> amount</span></span>
<span class="line"><span class="__shiki_140thh">            to_acc.save()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱2: 丢失更新</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> update_article</span><span class="__shiki_140thh">(article_id, data):</span></span>
<span class="line"><span class="__shiki_140thh">    article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article_id)</span></span>
<span class="line"><span class="__shiki_140thh">    article.title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data[</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 可能覆盖其他人的修改</span></span>
<span class="line"><span class="__shiki_140thh">    article.save()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案（乐观锁）</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> update_article</span><span class="__shiki_140thh">(article_id, data, version):</span></span>
<span class="line"><span class="__shiki_140thh">    updated </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.filter(</span></span>
<span class="line"><span class="__shiki_1jdh33">        pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article_id,</span></span>
<span class="line"><span class="__shiki_1jdh33">        version</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">version</span></span>
<span class="line"><span class="__shiki_140thh">    ).update(</span></span>
<span class="line"><span class="__shiki_1jdh33">        title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">data[</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_1jdh33">        version</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">F(</span><span class="__shiki_mdbnqw">&#39;version&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> updated </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;数据已被修改，请重试&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱3: 级联删除导致数据丢失</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    author </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        User,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_21nrsd">  # 用户删除时文章也被删除</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    author </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        User,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">SET_NULL</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 用户删除时设为NULL</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        blank</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱4: 不一致的状态</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> publish_article</span><span class="__shiki_140thh">(article_id):</span></span>
<span class="line"><span class="__shiki_140thh">    article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article_id)</span></span>
<span class="line"><span class="__shiki_140thh">    article.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    article.save()  </span><span class="__shiki_21nrsd"># 可能失败，导致状态不一致</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    send_notifications(article)  </span><span class="__shiki_21nrsd"># 通知发送了，但文章可能未发布</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> publish_article</span><span class="__shiki_140thh">(article_id):</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> transaction.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">        article </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Article.objects.get(</span><span class="__shiki_1jdh33">pk</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">article_id)</span></span>
<span class="line"><span class="__shiki_140thh">        article.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        article.published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.now()</span></span>
<span class="line"><span class="__shiki_140thh">        article.save()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 在事务中发送通知</span></span>
<span class="line"><span class="__shiki_140thh">        send_notifications(article)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱5: 重复数据</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 没有唯一约束</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    author </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(User, </span><span class="__shiki_1jdh33">on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">CASCADE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        unique_together </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;author&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 防止同一作者重复标题</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱6: 数据验证缺失</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    view_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.IntegerField()  </span><span class="__shiki_21nrsd"># 可能为负数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    view_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.PositiveIntegerField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 只能为非负数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        constraints </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">            models.CheckConstraint(</span></span>
<span class="line"><span class="__shiki_1jdh33">                check</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.Q(</span><span class="__shiki_1jdh33">view_count__gte</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">                name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;view_count_non_negative&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱7: 时区问题</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField()  </span><span class="__shiki_21nrsd"># 天真日期时间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> django.utils </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> timezone</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">timezone.now)  </span><span class="__shiki_21nrsd"># 感知日期时间</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用时区感知的函数</span></span>
<span class="line"><span class="__shiki_140thh">now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.now()</span></span>
<span class="line"><span class="__shiki_140thh">local_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timezone.localtime(now)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱8: 浮点数精度</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.FloatField()  </span><span class="__shiki_21nrsd"># 浮点数，精度问题</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DecimalField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_digits</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        decimal_places</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd">  # 固定精度</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱9: 枚举值硬编码</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> is_published</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span><span class="__shiki_21nrsd">  # 硬编码字符串</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ArticleStatus</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">TextChoices</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    DRAFT</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;DRAFT&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;草稿&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">    PUBLISHED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;PUBLISHED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;已发布&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">    ARCHIVED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;ARCHIVED&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;已归档&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.CharField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">ArticleStatus.choices,</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">ArticleStatus.</span><span class="__shiki_dzsirb">DRAFT</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> is_published</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> ArticleStatus.</span><span class="__shiki_dzsirb">PUBLISHED</span><span class="__shiki_21nrsd">  # 使用枚举</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 陷阱10: 缺少审计跟踪</span></span>
<span class="line"><span class="__shiki_21nrsd"># 错误示例</span></span>
<span class="line"><span class="__shiki_21nrsd"># 没有记录谁在什么时候修改了什么</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AuditableModel</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">models</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    created_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        User,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">SET_NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;created_</span><span class="__shiki_dzsirb">%(class)s</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField(</span><span class="__shiki_1jdh33">auto_now_add</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.ForeignKey(</span></span>
<span class="line"><span class="__shiki_140thh">        User,</span></span>
<span class="line"><span class="__shiki_1jdh33">        on_delete</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">models.</span><span class="__shiki_dzsirb">SET_NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        related_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;updated_</span><span class="__shiki_dzsirb">%(class)s</span><span class="__shiki_mdbnqw">&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> models.DateTimeField(</span><span class="__shiki_1jdh33">auto_now</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        abstract </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">AuditableModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ... 字段</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> save</span><span class="__shiki_140thh">(self, </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 自动设置更新者</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> hasattr</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;request&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">and</span><span class="__shiki_dzsirb"> hasattr</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.request, </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.updated_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.request.user</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">().save(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="django-orm-核心优势" tabindex="-1">Django ORM 核心优势： <a class="header-anchor" href="#django-orm-核心优势" aria-label="Permalink to &quot;Django ORM 核心优势：&quot;">​</a></h3><ol><li><strong>开发者友好</strong>：Pythonic API，易于学习和使用</li><li><strong>安全性</strong>：自动SQL转义，防止注入攻击</li><li><strong>数据库无关性</strong>：支持多种数据库后端</li><li><strong>迁移系统</strong>：强大的数据库版本控制</li><li><strong>丰富的查询API</strong>：支持复杂查询和聚合</li><li><strong>性能优化</strong>：select_related、prefetch_related等优化工具</li><li><strong>事务支持</strong>：完整的事务管理和并发控制</li></ol><h3 id="最佳实践总结" tabindex="-1">最佳实践总结： <a class="header-anchor" href="#最佳实践总结" aria-label="Permalink to &quot;最佳实践总结：&quot;">​</a></h3><ol><li><strong>始终使用索引</strong>：为频繁查询的字段添加索引</li><li><strong>避免N+1查询</strong>：使用select_related和prefetch_related</li><li><strong>批量操作</strong>：使用bulk_create、bulk_update、update()</li><li><strong>事务管理</strong>：合理使用事务，避免长事务</li><li><strong>查询优化</strong>：只选择需要的字段，使用exists()代替count()</li><li><strong>缓存策略</strong>：合理缓存查询结果和计算数据</li><li><strong>监控分析</strong>：定期分析查询性能，使用EXPLAIN</li><li><strong>数据验证</strong>：在模型层进行数据验证和约束</li><li><strong>错误处理</strong>：正确处理数据库异常和竞态条件</li><li><strong>测试覆盖</strong>：编写全面的数据库测试</li></ol><h3 id="性能关键点" tabindex="-1">性能关键点： <a class="header-anchor" href="#性能关键点" aria-label="Permalink to &quot;性能关键点：&quot;">​</a></h3><ul><li>使用<code>select_related</code>进行外键JOIN</li><li>使用<code>prefetch_related</code>进行多对多预加载</li><li>使用<code>only()</code>和<code>defer()</code>选择字段</li><li>使用<code>values()</code>和<code>values_list()</code>获取字典/元组</li><li>使用<code>iterator()</code>处理大数据集</li><li>使用<code>count()</code>和<code>exists()</code> appropriately</li><li>避免在循环中进行数据库操作</li></ul><h3 id="安全注意事项" tabindex="-1">安全注意事项： <a class="header-anchor" href="#安全注意事项" aria-label="Permalink to &quot;安全注意事项：&quot;">​</a></h3><ul><li>始终使用参数化查询（Django ORM自动处理）</li><li>验证用户输入，使用Django的表单和序列化器</li><li>限制查询结果，防止数据泄露</li><li>使用权限系统控制数据访问</li><li>定期备份和监控数据库</li></ul><p>Django ORM是一个功能强大且全面的工具，通过合理使用其特性，可以构建高效、可维护且安全的数据访问层。掌握这些高级特性，将帮助您构建更健壮的Django应用程序。</p>`,76)])])}const r=a(p,[["render",h]]);export{d as __pageData,r as default};
