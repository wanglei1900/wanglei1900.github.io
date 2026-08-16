import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Peewee轻量级ORM框架学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/python/peewee.md","filePath":"data/access/orm/python/peewee.md"}'),p={name:"data/access/orm/python/peewee.md"};function h(l,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="peewee轻量级orm框架学习笔记" tabindex="-1">Peewee轻量级ORM框架学习笔记 <a class="header-anchor" href="#peewee轻量级orm框架学习笔记" aria-label="Permalink to &quot;Peewee轻量级ORM框架学习笔记&quot;">​</a></h1><h2 id="一、orm概述与peewee简介" tabindex="-1">一、ORM概述与Peewee简介 <a class="header-anchor" href="#一、orm概述与peewee简介" aria-label="Permalink to &quot;一、ORM概述与Peewee简介&quot;">​</a></h2><h3 id="_1-1-orm概念" tabindex="-1">1.1 ORM概念 <a class="header-anchor" href="#_1-1-orm概念" aria-label="Permalink to &quot;1.1 ORM概念&quot;">​</a></h3><p><strong>ORM（Object-Relational Mapping）</strong> 是将关系数据库中的表结构映射到面向对象编程语言中的类和对象的技术。Peewee通过Python类来表示数据库表，类的实例表示表中的记录。</p><h3 id="_1-2-peewee特点" tabindex="-1">1.2 Peewee特点 <a class="header-anchor" href="#_1-2-peewee特点" aria-label="Permalink to &quot;1.2 Peewee特点&quot;">​</a></h3><ul><li><strong>轻量级</strong>：单一文件实现，无复杂依赖</li><li><strong>简单直观</strong>：API设计清晰，学习成本低</li><li><strong>功能完备</strong>：支持查询构建、事务、迁移等</li><li><strong>可扩展</strong>：支持多种数据库后端</li><li><strong>类型安全</strong>：支持Python类型注解</li></ul><h3 id="_1-3-支持的数据库" tabindex="-1">1.3 支持的数据库 <a class="header-anchor" href="#_1-3-支持的数据库" aria-label="Permalink to &quot;1.3 支持的数据库&quot;">​</a></h3><ul><li>SQLite（内置支持）</li><li>MySQL（需要mysqlclient）</li><li>PostgreSQL（需要psycopg2）</li><li>CockroachDB</li></ul><h2 id="二、安装与基本配置" tabindex="-1">二、安装与基本配置 <a class="header-anchor" href="#二、安装与基本配置" aria-label="Permalink to &quot;二、安装与基本配置&quot;">​</a></h2><h3 id="_2-1-安装" tabindex="-1">2.1 安装 <a class="header-anchor" href="#_2-1-安装" aria-label="Permalink to &quot;2.1 安装&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> peewee</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据数据库选择安装驱动</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> peewee</span><span class="__shiki_mdbnqw"> mysqlclient</span><span class="__shiki_21nrsd">      # MySQL</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> peewee</span><span class="__shiki_mdbnqw"> psycopg2-binary</span><span class="__shiki_21nrsd">  # PostgreSQL</span></span></code></pre></div><h3 id="_2-2-数据库连接" tabindex="-1">2.2 数据库连接 <a class="header-anchor" href="#_2-2-数据库连接" aria-label="Permalink to &quot;2.2 数据库连接&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># SQLite连接（文件数据库）</span></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SqliteDatabase(</span><span class="__shiki_mdbnqw">&#39;my_database.db&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># MySQL连接</span></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> MySQLDatabase(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;my_database&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;root&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    password</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;secret&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;localhost&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    port</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3306</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># PostgreSQL连接</span></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PostgresqlDatabase(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;my_database&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    password</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;secret&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;localhost&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    port</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5432</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用连接池（需要playhouse扩展）</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> playhouse.pool </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> PooledMySQLDatabase</span></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PooledMySQLDatabase(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;my_database&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    max_connections</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    stale_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    **</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;root&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;password&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;secret&#39;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="三、定义数据模型" tabindex="-1">三、定义数据模型 <a class="header-anchor" href="#三、定义数据模型" aria-label="Permalink to &quot;三、定义数据模型&quot;">​</a></h2><h3 id="_3-1-基础模型定义" tabindex="-1">3.1 基础模型定义 <a class="header-anchor" href="#_3-1-基础模型定义" aria-label="Permalink to &quot;3.1 基础模型定义&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Model, CharField, IntegerField, DateTimeField, BooleanField</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基础模型类，所有模型继承此类</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BaseModel</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        database </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db  </span><span class="__shiki_21nrsd"># 指定数据库连接</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 用户模型示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 字段定义</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">120</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> IntegerField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 允许空值</span></span>
<span class="line"><span class="__shiki_140thh">    is_active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> BooleanField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateTimeField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateTimeField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;users&#39;</span><span class="__shiki_21nrsd">  # 指定表名</span></span>
<span class="line"><span class="__shiki_140thh">        indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 复合索引</span></span>
<span class="line"><span class="__shiki_140thh">            ((</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span></code></pre></div><h3 id="_3-2-字段类型详解" tabindex="-1">3.2 字段类型详解 <a class="header-anchor" href="#_3-2-字段类型详解" aria-label="Permalink to &quot;3.2 字段类型详解&quot;">​</a></h3><h4 id="_3-2-1-基础字段类型" tabindex="-1">3.2.1 基础字段类型 <a class="header-anchor" href="#_3-2-1-基础字段类型" aria-label="Permalink to &quot;3.2.1 基础字段类型&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 字符串类型</span></span>
<span class="line"><span class="__shiki_140thh">CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">)          </span><span class="__shiki_21nrsd"># VARCHAR</span></span>
<span class="line"><span class="__shiki_140thh">TextField()                         </span><span class="__shiki_21nrsd"># TEXT</span></span>
<span class="line"><span class="__shiki_140thh">FixedCharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)       </span><span class="__shiki_21nrsd"># CHAR</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数值类型</span></span>
<span class="line"><span class="__shiki_140thh">IntegerField()                      </span><span class="__shiki_21nrsd"># INT</span></span>
<span class="line"><span class="__shiki_140thh">BigIntegerField()                   </span><span class="__shiki_21nrsd"># BIGINT</span></span>
<span class="line"><span class="__shiki_140thh">SmallIntegerField()                 </span><span class="__shiki_21nrsd"># SMALLINT</span></span>
<span class="line"><span class="__shiki_140thh">FloatField()                        </span><span class="__shiki_21nrsd"># FLOAT</span></span>
<span class="line"><span class="__shiki_140thh">DoubleField()                       </span><span class="__shiki_21nrsd"># DOUBLE</span></span>
<span class="line"><span class="__shiki_140thh">DecimalField(</span><span class="__shiki_1jdh33">max_digits</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">decimal_places</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># DECIMAL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 布尔与二进制</span></span>
<span class="line"><span class="__shiki_140thh">BooleanField()                      </span><span class="__shiki_21nrsd"># BOOL/TINYINT(1)</span></span>
<span class="line"><span class="__shiki_140thh">BlobField()                         </span><span class="__shiki_21nrsd"># BLOB</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日期时间</span></span>
<span class="line"><span class="__shiki_140thh">DateField()                         </span><span class="__shiki_21nrsd"># DATE</span></span>
<span class="line"><span class="__shiki_140thh">DateTimeField()                     </span><span class="__shiki_21nrsd"># DATETIME</span></span>
<span class="line"><span class="__shiki_140thh">TimeField()                         </span><span class="__shiki_21nrsd"># TIME</span></span>
<span class="line"><span class="__shiki_140thh">TimestampField()                    </span><span class="__shiki_21nrsd"># TIMESTAMP</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 其他</span></span>
<span class="line"><span class="__shiki_140thh">UUIDField()                         </span><span class="__shiki_21nrsd"># UUID</span></span>
<span class="line"><span class="__shiki_140thh">BinaryUUIDField()                   </span><span class="__shiki_21nrsd"># 压缩UUID</span></span>
<span class="line"><span class="__shiki_140thh">AutoField()                         </span><span class="__shiki_21nrsd"># 自增主键</span></span>
<span class="line"><span class="__shiki_140thh">ForeignKeyField(model, backref)    </span><span class="__shiki_21nrsd"># 外键</span></span></code></pre></div><h4 id="_3-2-2-字段参数" tabindex="-1">3.2.2 字段参数 <a class="header-anchor" href="#_3-2-2-字段参数" aria-label="Permalink to &quot;3.2.2 字段参数&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 常用参数</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd"># 唯一约束</span></span>
<span class="line"><span class="__shiki_1jdh33">        index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd"># 创建索引</span></span>
<span class="line"><span class="__shiki_1jdh33">        null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd"># 非空约束</span></span>
<span class="line"><span class="__shiki_1jdh33">        default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd"># 默认值</span></span>
<span class="line"><span class="__shiki_1jdh33">        help_text</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;产品名称&#39;</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd"># 帮助文本</span></span>
<span class="line"><span class="__shiki_1jdh33">        verbose_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;名称&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd"># 可读名称</span></span>
<span class="line"><span class="__shiki_1jdh33">        choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[              </span><span class="__shiki_21nrsd"># 选项约束</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;new&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;新品&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;hot&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;热销&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;off&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;下架&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DecimalField(</span></span>
<span class="line"><span class="__shiki_1jdh33">        max_digits</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        decimal_places</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">        constraints</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">            Check(</span><span class="__shiki_mdbnqw">&#39;price &gt;= 0&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 检查约束</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateTimeField(</span><span class="__shiki_1jdh33">constraints</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[SQL(</span><span class="__shiki_mdbnqw">&#39;DEFAULT CURRENT_TIMESTAMP&#39;</span><span class="__shiki_140thh">)])</span></span></code></pre></div><h3 id="_3-3-模型关系" tabindex="-1">3.3 模型关系 <a class="header-anchor" href="#_3-3-模型关系" aria-label="Permalink to &quot;3.3 模型关系&quot;">​</a></h3><h4 id="_3-3-1-一对一关系" tabindex="-1">3.3.1 一对一关系 <a class="header-anchor" href="#_3-3-1-一对一关系" aria-label="Permalink to &quot;3.3.1 一对一关系&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserProfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ForeignKeyField(User, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;profile&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    bio </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TextField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    avatar </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_3-3-2-一对多关系" tabindex="-1">3.3.2 一对多关系 <a class="header-anchor" href="#_3-3-2-一对多关系" aria-label="Permalink to &quot;3.3.2 一对多关系&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Post</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ForeignKeyField(User, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;posts&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TextField()</span></span>
<span class="line"><span class="__shiki_140thh">    views </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> IntegerField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_3-3-3-多对多关系" tabindex="-1">3.3.3 多对多关系 <a class="header-anchor" href="#_3-3-3-多对多关系" aria-label="Permalink to &quot;3.3.3 多对多关系&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方式1：使用ManyToManyField</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Tag</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自动创建中间表</span></span>
<span class="line"><span class="__shiki_140thh">Post.tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ManyToManyField(Tag, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;posts&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方式2：手动定义中间表</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PostTag</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    post </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ForeignKeyField(Post, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;post_tags&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    tag </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ForeignKeyField(Tag, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;post_tags&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        primary_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CompositeKey(</span><span class="__shiki_mdbnqw">&#39;post&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;tag&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 复合主键</span></span></code></pre></div><h2 id="四、数据库操作" tabindex="-1">四、数据库操作 <a class="header-anchor" href="#四、数据库操作" aria-label="Permalink to &quot;四、数据库操作&quot;">​</a></h2><h3 id="_4-1-表创建与维护" tabindex="-1">4.1 表创建与维护 <a class="header-anchor" href="#_4-1-表创建与维护" aria-label="Permalink to &quot;4.1 表创建与维护&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 连接数据库</span></span>
<span class="line"><span class="__shiki_140thh">db.connect()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建表（安全方式）</span></span>
<span class="line"><span class="__shiki_140thh">db.create_tables([User, Post, Tag, PostTag])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批量创建带中间表的模型</span></span>
<span class="line"><span class="__shiki_140thh">PostTagThroughDeferred </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DeferredThroughModel()</span></span>
<span class="line"><span class="__shiki_140thh">Post.tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ManyToManyField(Tag, </span><span class="__shiki_1jdh33">through_model</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">PostTagThroughDeferred)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 删除表</span></span>
<span class="line"><span class="__shiki_140thh">db.drop_tables([User, Post, Tag, PostTag])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查表是否存在</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> User.table_exists():</span></span>
<span class="line"><span class="__shiki_140thh">    User.create_table()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建索引</span></span>
<span class="line"><span class="__shiki_140thh">db.create_indexes([User])  </span><span class="__shiki_21nrsd"># 创建模型中定义的所有索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动SQL操作</span></span>
<span class="line"><span class="__shiki_140thh">db.execute_sql(</span><span class="__shiki_mdbnqw">&#39;ALTER TABLE users ADD COLUMN nickname VARCHAR(50)&#39;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-2-crud操作" tabindex="-1">4.2 CRUD操作 <a class="header-anchor" href="#_4-2-crud操作" aria-label="Permalink to &quot;4.2 CRUD操作&quot;">​</a></h3><h4 id="_4-2-1-创建记录" tabindex="-1">4.2.1 创建记录 <a class="header-anchor" href="#_4-2-1-创建记录" aria-label="Permalink to &quot;4.2.1 创建记录&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：create() - 创建并保存</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.create(</span></span>
<span class="line"><span class="__shiki_1jdh33">    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john_doe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    age</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">25</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：save() - 先创建对象再保存</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User(</span></span>
<span class="line"><span class="__shiki_1jdh33">    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;jane_doe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;jane@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">user.save()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法3：insert() - 只插入不获取对象</span></span>
<span class="line"><span class="__shiki_140thh">user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.insert({</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;username&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;bob&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;bob@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}).execute()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批量插入（高效）</span></span>
<span class="line"><span class="__shiki_140thh">users_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;user1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;user1@example.com&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;user2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;user2@example.com&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;user3&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;user3@example.com&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">User.insert_many(users_data).execute()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用字典批量插入</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> db.atomic():  </span><span class="__shiki_21nrsd"># 使用事务保证原子性</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> users_data:</span></span>
<span class="line"><span class="__shiki_140thh">        User.create(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">data)</span></span></code></pre></div><h4 id="_4-2-2-查询记录" tabindex="-1">4.2.2 查询记录 <a class="header-anchor" href="#_4-2-2-查询记录" aria-label="Permalink to &quot;4.2.2 查询记录&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 获取单个记录</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.get(User.username </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;john_doe&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.get_by_id(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 通过主键获取</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用get_or_create（原子操作）</span></span>
<span class="line"><span class="__shiki_140thh">user, created </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.get_or_create(</span></span>
<span class="line"><span class="__shiki_1jdh33">    username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john_doe&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    defaults</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询多条记录</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select()  </span><span class="__shiki_21nrsd"># 获取所有用户</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 带条件查询</span></span>
<span class="line"><span class="__shiki_140thh">active_users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().where(User.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">young_users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().where(User.age </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_4-2-3-更新记录" tabindex="-1">4.2.3 更新记录 <a class="header-anchor" href="#_4-2-3-更新记录" aria-label="Permalink to &quot;4.2.3 更新记录&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：更新对象属性后保存</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.get(User.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">user.age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 26</span></span>
<span class="line"><span class="__shiki_140thh">user.updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.datetime.now()</span></span>
<span class="line"><span class="__shiki_140thh">user.save()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：批量更新</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.update(</span><span class="__shiki_1jdh33">is_active</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">).where(User.age </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">updated_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.execute()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新并返回受影响行数</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.update(</span><span class="__shiki_1jdh33">age</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">User.age </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">).where(User.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">updated_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.execute()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用字典更新</span></span>
<span class="line"><span class="__shiki_140thh">update_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;updated_at&#39;</span><span class="__shiki_140thh">: datetime.datetime.now()}</span></span>
<span class="line"><span class="__shiki_140thh">User.update(update_data).where(User.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">).execute()</span></span></code></pre></div><h4 id="_4-2-4-删除记录" tabindex="-1">4.2.4 删除记录 <a class="header-anchor" href="#_4-2-4-删除记录" aria-label="Permalink to &quot;4.2.4 删除记录&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：删除对象实例</span></span>
<span class="line"><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.get(User.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">deleted_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user.delete_instance()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：批量删除</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.delete().where(User.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">deleted_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.execute()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清空表（谨慎使用）</span></span>
<span class="line"><span class="__shiki_140thh">User.delete().execute()</span></span></code></pre></div><h2 id="五、查询构建器" tabindex="-1">五、查询构建器 <a class="header-anchor" href="#五、查询构建器" aria-label="Permalink to &quot;五、查询构建器&quot;">​</a></h2><h3 id="_5-1-基础查询" tabindex="-1">5.1 基础查询 <a class="header-anchor" href="#_5-1-基础查询" aria-label="Permalink to &quot;5.1 基础查询&quot;">​</a></h3><h4 id="_5-1-1-select查询" tabindex="-1">5.1.1 SELECT查询 <a class="header-anchor" href="#_5-1-1-select查询" aria-label="Permalink to &quot;5.1.1 SELECT查询&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基本查询</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 指定字段</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(User.username, User.email)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用SQL函数</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> fn</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(</span></span>
<span class="line"><span class="__shiki_140thh">    User.username,</span></span>
<span class="line"><span class="__shiki_140thh">    fn.COUNT(User.id).alias(</span><span class="__shiki_mdbnqw">&#39;post_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制结果集</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().limit(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)                    </span><span class="__shiki_21nrsd"># 限制10条</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().limit(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">).offset(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)         </span><span class="__shiki_21nrsd"># 分页：跳过20条取10条</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().paginate(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)              </span><span class="__shiki_21nrsd"># 第2页，每页10条</span></span></code></pre></div><h4 id="_5-1-2-where条件" tabindex="-1">5.1.2 WHERE条件 <a class="header-anchor" href="#_5-1-2-where条件" aria-label="Permalink to &quot;5.1.2 WHERE条件&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 比较操作符</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 25</span><span class="__shiki_140thh">)                </span><span class="__shiki_21nrsd"># 等于</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 25</span><span class="__shiki_140thh">)                </span><span class="__shiki_21nrsd"># 不等于</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">)                 </span><span class="__shiki_21nrsd"># 大于</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">)                </span><span class="__shiki_21nrsd"># 大于等于</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 65</span><span class="__shiki_140thh">)                 </span><span class="__shiki_21nrsd"># 小于</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 65</span><span class="__shiki_140thh">)                </span><span class="__shiki_21nrsd"># 小于等于</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 空值判断</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.email.is_null(</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">))      </span><span class="__shiki_21nrsd"># 为NULL</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.email.is_null(</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">))     </span><span class="__shiki_21nrsd"># 不为NULL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># IN查询</span></span>
<span class="line"><span class="__shiki_140thh">ages </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age.in_(ages))            </span><span class="__shiki_21nrsd"># IN列表</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age.not_in(ages))         </span><span class="__shiki_21nrsd"># NOT IN</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># BETWEEN查询</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.age.between(</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">))      </span><span class="__shiki_21nrsd"># BETWEEN</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># LIKE查询</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.username.contains(</span><span class="__shiki_mdbnqw">&#39;john&#39;</span><span class="__shiki_140thh">))    </span><span class="__shiki_21nrsd"># 包含</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.username.startswith(</span><span class="__shiki_mdbnqw">&#39;j&#39;</span><span class="__shiki_140thh">))     </span><span class="__shiki_21nrsd"># 开头</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.username.endswith(</span><span class="__shiki_mdbnqw">&#39;n&#39;</span><span class="__shiki_140thh">))       </span><span class="__shiki_21nrsd"># 结尾</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.username </span><span class="__shiki_1itgoe">%</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">oe%&#39;</span><span class="__shiki_140thh">)           </span><span class="__shiki_21nrsd"># 使用%操作符</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 正则表达式（MySQL/PostgreSQL）</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(User.username.regexp(</span><span class="__shiki_mdbnqw">&#39;^j&#39;</span><span class="__shiki_140thh">))        </span><span class="__shiki_21nrsd"># 正则匹配</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 组合条件</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_dzsirb"> OP</span></span>
<span class="line"><span class="__shiki_140thh">User.select().where(</span></span>
<span class="line"><span class="__shiki_140thh">    (User.age </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    (User.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;</span></span>
<span class="line"><span class="__shiki_140thh">    (User.username.contains(</span><span class="__shiki_mdbnqw">&#39;john&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> User.email.contains(</span><span class="__shiki_mdbnqw">&#39;john&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用where()链式调用</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().where(User.age </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">).where(User.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_5-2-高级查询" tabindex="-1">5.2 高级查询 <a class="header-anchor" href="#_5-2-高级查询" aria-label="Permalink to &quot;5.2 高级查询&quot;">​</a></h3><h4 id="_5-2-1-聚合查询" tabindex="-1">5.2.1 聚合查询 <a class="header-anchor" href="#_5-2-1-聚合查询" aria-label="Permalink to &quot;5.2.1 聚合查询&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> fn</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 计数</span></span>
<span class="line"><span class="__shiki_140thh">user_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().count()</span></span>
<span class="line"><span class="__shiki_140thh">active_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().where(User.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">).count()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 聚合函数</span></span>
<span class="line"><span class="__shiki_140thh">stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(</span></span>
<span class="line"><span class="__shiki_140thh">    fn.COUNT(User.id).alias(</span><span class="__shiki_mdbnqw">&#39;total&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    fn.AVG(User.age).alias(</span><span class="__shiki_mdbnqw">&#39;avg_age&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    fn.MIN(User.age).alias(</span><span class="__shiki_mdbnqw">&#39;min_age&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    fn.MAX(User.age).alias(</span><span class="__shiki_mdbnqw">&#39;max_age&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    fn.SUM(User.age).alias(</span><span class="__shiki_mdbnqw">&#39;sum_age&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).get()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 分组聚合</span></span>
<span class="line"><span class="__shiki_140thh">age_groups </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(</span></span>
<span class="line"><span class="__shiki_140thh">    User.age,</span></span>
<span class="line"><span class="__shiki_140thh">    fn.COUNT(User.id).alias(</span><span class="__shiki_mdbnqw">&#39;count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">).group_by(User.age).having(fn.COUNT(User.id) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_5-2-2-排序与去重" tabindex="-1">5.2.2 排序与去重 <a class="header-anchor" href="#_5-2-2-排序与去重" aria-label="Permalink to &quot;5.2.2 排序与去重&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 排序</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().order_by(User.username)              </span><span class="__shiki_21nrsd"># 升序</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().order_by(User.username.desc())       </span><span class="__shiki_21nrsd"># 降序</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().order_by(User.age, User.username)    </span><span class="__shiki_21nrsd"># 多字段排序</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 去重</span></span>
<span class="line"><span class="__shiki_140thh">distinct_ages </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(User.age).distinct()</span></span></code></pre></div><h4 id="_5-2-3-子查询" tabindex="-1">5.2.3 子查询 <a class="header-anchor" href="#_5-2-3-子查询" aria-label="Permalink to &quot;5.2.3 子查询&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 标量子查询</span></span>
<span class="line"><span class="__shiki_140thh">subquery </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(fn.AVG(User.age))</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().where(User.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> subquery)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># IN子查询</span></span>
<span class="line"><span class="__shiki_140thh">active_user_ids </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(User.id).where(User.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">posts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Post.select().where(Post.user_id.in_(active_user_ids))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># EXISTS子查询</span></span>
<span class="line"><span class="__shiki_140thh">subquery </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Post.select().where(Post.user_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> User.id)</span></span>
<span class="line"><span class="__shiki_140thh">users_with_posts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().where(fn.EXISTS(subquery))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 作为派生表</span></span>
<span class="line"><span class="__shiki_140thh">subquery </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(User.id, User.username).where(User.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">).alias(</span><span class="__shiki_mdbnqw">&#39;adults&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Post</span></span>
<span class="line"><span class="__shiki_140thh">         .select(Post.title, subquery.c.username)</span></span>
<span class="line"><span class="__shiki_140thh">         .join(subquery, </span><span class="__shiki_1jdh33">on</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(Post.user_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> subquery.c.id)))</span></span></code></pre></div><h3 id="_5-3-连接查询" tabindex="-1">5.3 连接查询 <a class="header-anchor" href="#_5-3-连接查询" aria-label="Permalink to &quot;5.3 连接查询&quot;">​</a></h3><h4 id="_5-3-1-join类型" tabindex="-1">5.3.1 JOIN类型 <a class="header-anchor" href="#_5-3-1-join类型" aria-label="Permalink to &quot;5.3.1 JOIN类型&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># INNER JOIN（默认）</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Post</span></span>
<span class="line"><span class="__shiki_140thh">         .select(Post, User)</span></span>
<span class="line"><span class="__shiki_140thh">         .join(User, </span><span class="__shiki_1jdh33">on</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(Post.user_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> User.id)))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># LEFT OUTER JOIN</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (User</span></span>
<span class="line"><span class="__shiki_140thh">         .select(User, Post)</span></span>
<span class="line"><span class="__shiki_140thh">         .join(Post, </span><span class="__shiki_dzsirb">JOIN</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">LEFT_OUTER</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">on</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(User.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> Post.user_id)))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自连接</span></span>
<span class="line"><span class="__shiki_140thh">ManagerAlias </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.alias()</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (User</span></span>
<span class="line"><span class="__shiki_140thh">         .select(User, ManagerAlias)</span></span>
<span class="line"><span class="__shiki_140thh">         .join(ManagerAlias, </span><span class="__shiki_1jdh33">on</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(User.manager_id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> ManagerAlias.id)))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多表连接</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Post</span></span>
<span class="line"><span class="__shiki_140thh">         .select(Post, User, Tag)</span></span>
<span class="line"><span class="__shiki_140thh">         .join(User)</span></span>
<span class="line"><span class="__shiki_140thh">         .join(PostTag)</span></span>
<span class="line"><span class="__shiki_140thh">         .join(Tag))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># USING简化（当字段名相同时）</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Post.select().join(User, </span><span class="__shiki_1jdh33">on</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(Post.user </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> User.id))</span></span></code></pre></div><h4 id="_5-3-2-预取关联数据" tabindex="-1">5.3.2 预取关联数据 <a class="header-anchor" href="#_5-3-2-预取关联数据" aria-label="Permalink to &quot;5.3.2 预取关联数据&quot;">​</a></h4><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 预取一对多关系</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().prefetch(Post)  </span><span class="__shiki_21nrsd"># 获取用户及其所有文章</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 预取多对多关系</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Post.select().prefetch(Tag)   </span><span class="__shiki_21nrsd"># 获取文章及其所有标签</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 嵌套预取</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().prefetch(</span></span>
<span class="line"><span class="__shiki_140thh">    Post.select().prefetch(Tag)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="六、事务与连接管理" tabindex="-1">六、事务与连接管理 <a class="header-anchor" href="#六、事务与连接管理" aria-label="Permalink to &quot;六、事务与连接管理&quot;">​</a></h2><h3 id="_6-1-事务处理" tabindex="-1">6.1 事务处理 <a class="header-anchor" href="#_6-1-事务处理" aria-label="Permalink to &quot;6.1 事务处理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：使用atomic()上下文管理器（推荐）</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> db.atomic() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> transaction:</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Post.create(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user, </span><span class="__shiki_1jdh33">title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;First Post&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Hello World&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动提交，异常时回滚</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：显式事务控制</span></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    db.begin()  </span><span class="__shiki_21nrsd"># 开始事务</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Post.create(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user, </span><span class="__shiki_1jdh33">title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;First Post&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Hello World&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    db.commit()  </span><span class="__shiki_21nrsd"># 提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_140thh">    db.rollback()  </span><span class="__shiki_21nrsd"># 回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">    raise</span><span class="__shiki_140thh"> e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法3：使用atomic装饰器</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db.atomic</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> create_user_with_posts</span><span class="__shiki_140thh">(username, email):</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">username, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">email)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">        Post.create(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">user, </span><span class="__shiki_1jdh33">title</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;Post </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">content</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;...&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 嵌套事务（保存点）</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> db.atomic() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> txn1:</span></span>
<span class="line"><span class="__shiki_140thh">    User.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;user1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;user1@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db.atomic() </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> txn2:  </span><span class="__shiki_21nrsd"># 创建保存点</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            User.create(</span><span class="__shiki_1jdh33">username</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;user2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;user2@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;模拟错误&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            pass</span><span class="__shiki_21nrsd">  # txn2回滚，txn1继续</span></span></code></pre></div><h3 id="_6-2-连接管理" tabindex="-1">6.2 连接管理 <a class="header-anchor" href="#_6-2-连接管理" aria-label="Permalink to &quot;6.2 连接管理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 手动连接管理</span></span>
<span class="line"><span class="__shiki_140thh">db.connect()          </span><span class="__shiki_21nrsd"># 建立连接</span></span>
<span class="line"><span class="__shiki_21nrsd"># ... 数据库操作 ...</span></span>
<span class="line"><span class="__shiki_140thh">db.close()            </span><span class="__shiki_21nrsd"># 关闭连接</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用连接上下文管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> db.connection_context():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 在此代码块内保持连接</span></span>
<span class="line"><span class="__shiki_140thh">    users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(User.select())</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 退出时自动关闭连接</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 连接池配置（MySQL示例）</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> playhouse.pool </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> PooledMySQLDatabase</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PooledMySQLDatabase(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;my_app&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    max_connections</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    stale_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd"># 5分钟后回收连接</span></span>
<span class="line"><span class="__shiki_1jdh33">    timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,          </span><span class="__shiki_21nrsd"># 无限等待</span></span>
<span class="line"><span class="__shiki_1jdh33">    user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;root&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    password</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;secret&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查连接状态</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> db.is_closed():</span></span>
<span class="line"><span class="__shiki_140thh">    db.connect()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd"># 设置连接参数</span></span>
<span class="line"><span class="__shiki_140thh">db.connection_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_21nrsd">  # 连接超时30秒</span></span></code></pre></div><h2 id="七、高级特性" tabindex="-1">七、高级特性 <a class="header-anchor" href="#七、高级特性" aria-label="Permalink to &quot;七、高级特性&quot;">​</a></h2><h3 id="_7-1-模型继承" tabindex="-1">7.1 模型继承 <a class="header-anchor" href="#_7-1-模型继承" aria-label="Permalink to &quot;7.1 模型继承&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 抽象基类（不创建表）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BaseModel</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateTimeField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateTimeField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        database </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db</span></span>
<span class="line"><span class="__shiki_140thh">        abstract </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_21nrsd">  # 关键：抽象模型</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多表继承</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField()</span></span>
<span class="line"><span class="__shiki_140thh">    birthday </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateField()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;person&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Employee</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Person</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    department </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField()</span></span>
<span class="line"><span class="__shiki_140thh">    salary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DecimalField(</span><span class="__shiki_1jdh33">max_digits</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">decimal_places</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;employee&#39;</span><span class="__shiki_21nrsd">  # 单独的表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 代理模型（同一张表）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ActiveUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;users&#39;</span><span class="__shiki_21nrsd">  # 指向User表</span></span>
<span class="line"><span class="__shiki_140thh">        proxy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_21nrsd">  # 关键：代理模型</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_active</span><span class="__shiki_140thh">(cls):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.select().where(</span><span class="__shiki_dzsirb">cls</span><span class="__shiki_140thh">.is_active </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_7-2-信号机制" tabindex="-1">7.2 信号机制 <a class="header-anchor" href="#_7-2-信号机制" aria-label="Permalink to &quot;7.2 信号机制&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> playhouse.signals </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Model, pre_save, post_save, pre_delete, post_delete</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        database </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 注册信号处理器</span></span>
<span class="line"><span class="__shiki_1t8gfj">@pre_save</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sender</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">User)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> before_save_handler</span><span class="__shiki_140thh">(model_class, instance, created):</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;准备保存 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">instance.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">，新建: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">created</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    instance.updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.datetime.now()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@post_save</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sender</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">User)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> after_save_handler</span><span class="__shiki_140thh">(model_class, instance, created):</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;已保存 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">instance.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">，新建: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">created</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 其他信号</span></span>
<span class="line"><span class="__shiki_1t8gfj">@pre_delete</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sender</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">User)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> before_delete_handler</span><span class="__shiki_140thh">(model_class, instance):</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;准备删除 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">instance.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@post_delete</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">sender</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">User)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> after_delete_handler</span><span class="__shiki_140thh">(model_class, instance):</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;已删除 </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">instance.username</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_7-3-数据库迁移" tabindex="-1">7.3 数据库迁移 <a class="header-anchor" href="#_7-3-数据库迁移" aria-label="Permalink to &quot;7.3 数据库迁移&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用peewee-migrate扩展</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee_migrate </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Router</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">router </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Router(db)</span></span>
<span class="line"><span class="__shiki_140thh">router.create(</span><span class="__shiki_mdbnqw">&#39;add_email_to_user&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 创建迁移文件</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 编辑迁移文件后运行</span></span>
<span class="line"><span class="__shiki_140thh">router.run(</span><span class="__shiki_mdbnqw">&#39;add_email_to_user&#39;</span><span class="__shiki_140thh">)    </span><span class="__shiki_21nrsd"># 运行特定迁移</span></span>
<span class="line"><span class="__shiki_140thh">router.run()                       </span><span class="__shiki_21nrsd"># 运行所有未应用的迁移</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 手动迁移示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> migrate_add_column</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db.atomic():</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加新列</span></span>
<span class="line"><span class="__shiki_140thh">        db.execute_sql(</span><span class="__shiki_mdbnqw">&#39;ALTER TABLE users ADD COLUMN phone VARCHAR(20)&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> migrate_drop_column</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db.atomic():</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 删除列（注意数据丢失）</span></span>
<span class="line"><span class="__shiki_140thh">        db.execute_sql(</span><span class="__shiki_mdbnqw">&#39;ALTER TABLE users DROP COLUMN phone&#39;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_7-4-全文搜索" tabindex="-1">7.4 全文搜索 <a class="header-anchor" href="#_7-4-全文搜索" aria-label="Permalink to &quot;7.4 全文搜索&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># SQLite FTS5扩展（需要编译时启用）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DocumentIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">FTS5Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SearchField()</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SearchField()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        database </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db</span></span>
<span class="line"><span class="__shiki_140thh">        extensions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;tokenize=porter&#39;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 使用Porter词干分析器</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建虚拟表</span></span>
<span class="line"><span class="__shiki_140thh">DocumentIndex.create_table(</span><span class="__shiki_1jdh33">tokenize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;porter&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 插入数据</span></span>
<span class="line"><span class="__shiki_140thh">DocumentIndex.insert({</span></span>
<span class="line"><span class="__shiki_140thh">    DocumentIndex.title: </span><span class="__shiki_mdbnqw">&#39;Peewee ORM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    DocumentIndex.content: </span><span class="__shiki_mdbnqw">&#39;Peewee is a simple and small ORM&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}).execute()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 全文搜索</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (DocumentIndex</span></span>
<span class="line"><span class="__shiki_140thh">         .select()</span></span>
<span class="line"><span class="__shiki_140thh">         .where(DocumentIndex.match(</span><span class="__shiki_mdbnqw">&#39;Peewee ORM&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">         .order_by(DocumentIndex.bm25()))</span></span></code></pre></div><h2 id="八、性能优化" tabindex="-1">八、性能优化 <a class="header-anchor" href="#八、性能优化" aria-label="Permalink to &quot;八、性能优化&quot;">​</a></h2><h3 id="_8-1-查询优化" tabindex="-1">8.1 查询优化 <a class="header-anchor" href="#_8-1-查询优化" aria-label="Permalink to &quot;8.1 查询优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用select_related减少查询次数</span></span>
<span class="line"><span class="__shiki_21nrsd"># 不好的方式：N+1查询问题</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select()</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> users:</span></span>
<span class="line"><span class="__shiki_140thh">    posts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(user.posts)  </span><span class="__shiki_21nrsd"># 每次迭代都查询数据库</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 好的方式：使用join预取</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (User</span></span>
<span class="line"><span class="__shiki_140thh">         .select(User, Post)</span></span>
<span class="line"><span class="__shiki_140thh">         .join(Post, </span><span class="__shiki_dzsirb">JOIN</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">LEFT_OUTER</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">         .order_by(User.id, Post.id))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用prefetch处理复杂关系</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().prefetch(Post, Tag)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 只选择需要的字段</span></span>
<span class="line"><span class="__shiki_21nrsd"># 不好的方式：选择所有字段</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 好的方式：只选择需要的字段</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select(User.id, User.username)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用iterator()处理大量数据</span></span>
<span class="line"><span class="__shiki_21nrsd"># 避免一次性加载所有数据到内存</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> User.select().iterator():</span></span>
<span class="line"><span class="__shiki_140thh">    process_user(user)  </span><span class="__shiki_21nrsd"># 每次迭代从数据库获取一条记录</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 使用chunked()分批处理</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> chunk </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> User.select().chunked(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">):  </span><span class="__shiki_21nrsd"># 每次100条</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> chunk:</span></span>
<span class="line"><span class="__shiki_140thh">        process_user(user)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 使用count()而不是len()</span></span>
<span class="line"><span class="__shiki_21nrsd"># 不好的方式</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(User.select())</span></span>
<span class="line"><span class="__shiki_140thh">count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(users)  </span><span class="__shiki_21nrsd"># 加载所有数据到内存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 好的方式</span></span>
<span class="line"><span class="__shiki_140thh">count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().count()  </span><span class="__shiki_21nrsd"># 只计算数量</span></span></code></pre></div><h3 id="_8-2-索引优化" tabindex="-1">8.2 索引优化 <a class="header-anchor" href="#_8-2-索引优化" aria-label="Permalink to &quot;8.2 索引优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 单字段索引</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)    </span><span class="__shiki_21nrsd"># 唯一索引</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 复合索引</span></span>
<span class="line"><span class="__shiki_140thh">            ((</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 唯一复合索引</span></span>
<span class="line"><span class="__shiki_140thh">            ((</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 非唯一复合索引</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 表达式索引（PostgreSQL）</span></span>
<span class="line"><span class="__shiki_140thh">            (fn.LOWER(User.username), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 小写用户名索引</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 部分索引（PostgreSQL）</span></span>
<span class="line"><span class="__shiki_140thh">            ((</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_mdbnqw">&#39;WHERE is_active = true&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 覆盖索引（INCLUDE子句）</span></span>
<span class="line"><span class="__shiki_140thh">        index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;idx_user_cover&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">,),</span></span>
<span class="line"><span class="__shiki_dzsirb">            True</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 包含额外字段</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span></code></pre></div><h3 id="_8-3-批量操作优化" tabindex="-1">8.3 批量操作优化 <a class="header-anchor" href="#_8-3-批量操作优化" aria-label="Permalink to &quot;8.3 批量操作优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 批量插入（高效）</span></span>
<span class="line"><span class="__shiki_140thh">data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [{</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;user</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;user</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">@example.com&#39;</span><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方式1：insert_many</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> db.atomic():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认每批100条</span></span>
<span class="line"><span class="__shiki_140thh">    User.insert_many(data).execute()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方式2：分批次插入</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> db.atomic():</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> idx </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(data), </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">):  </span><span class="__shiki_21nrsd"># 每批100条</span></span>
<span class="line"><span class="__shiki_140thh">        User.insert_many(data[idx:idx</span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">]).execute()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 批量更新</span></span>
<span class="line"><span class="__shiki_140thh">update_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">35</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用CASE语句批量更新（PostgreSQL/MySQL）</span></span>
<span class="line"><span class="__shiki_140thh">case_stmt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Case(</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, [</span></span>
<span class="line"><span class="__shiki_140thh">    (User.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> item[</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">], item[</span><span class="__shiki_mdbnqw">&#39;age&#39;</span><span class="__shiki_140thh">]) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> update_data</span></span>
<span class="line"><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">User.update(</span><span class="__shiki_1jdh33">age</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">case_stmt).where(User.id.in_([item[</span><span class="__shiki_mdbnqw">&#39;id&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> update_data])).execute()</span></span></code></pre></div><h2 id="九、实际应用示例" tabindex="-1">九、实际应用示例 <a class="header-anchor" href="#九、实际应用示例" aria-label="Permalink to &quot;九、实际应用示例&quot;">​</a></h2><h3 id="_9-1-博客系统模型" tabindex="-1">9.1 博客系统模型 <a class="header-anchor" href="#_9-1-博客系统模型" aria-label="Permalink to &quot;9.1 博客系统模型&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SqliteDatabase(</span><span class="__shiki_mdbnqw">&#39;blog.db&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BaseModel</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Model</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateTimeField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateTimeField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        database </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">120</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    password_hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    is_active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> BooleanField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    is_admin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> BooleanField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;users&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> post_count</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.posts.count()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_by_username</span><span class="__shiki_140thh">(cls, username):</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.get(</span><span class="__shiki_dzsirb">cls</span><span class="__shiki_140thh">.username </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> username)</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.DoesNotExist:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Category</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TextField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;categories&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Post</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    STATUS_DRAFT</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;draft&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">    STATUS_PUBLISHED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;published&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">    STATUS_CHOICES</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">STATUS_DRAFT</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;草稿&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">STATUS_PUBLISHED</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;已发布&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ForeignKeyField(User, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;posts&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    category </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ForeignKeyField(Category, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;posts&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    content </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TextField()</span></span>
<span class="line"><span class="__shiki_140thh">    excerpt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> TextField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">choices</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">STATUS_CHOICES</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">STATUS_DRAFT</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    view_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> IntegerField(</span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> DateTimeField(</span><span class="__shiki_1jdh33">null</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;posts&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">            ((</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            ((</span><span class="__shiki_mdbnqw">&#39;slug&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> publish</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">STATUS_PUBLISHED</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.datetime.now()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.save()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_published</span><span class="__shiki_140thh">(cls):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">cls</span></span>
<span class="line"><span class="__shiki_140thh">                .select()</span></span>
<span class="line"><span class="__shiki_140thh">                .where(</span></span>
<span class="line"><span class="__shiki_140thh">                    (</span><span class="__shiki_dzsirb">cls</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">STATUS_PUBLISHED</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&amp;</span></span>
<span class="line"><span class="__shiki_140thh">                    (</span><span class="__shiki_dzsirb">cls</span><span class="__shiki_140thh">.published_at </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> datetime.datetime.now())</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">                .order_by(</span><span class="__shiki_dzsirb">cls</span><span class="__shiki_140thh">.published_at.desc()))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Tag</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CharField(</span><span class="__shiki_1jdh33">max_length</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;tags&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PostTag</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseModel</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    post </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ForeignKeyField(Post, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;post_tags&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    tag </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ForeignKeyField(Tag, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;post_tags&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Meta</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;post_tags&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        primary_key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CompositeKey(</span><span class="__shiki_mdbnqw">&#39;post&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;tag&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建多对多关系</span></span>
<span class="line"><span class="__shiki_140thh">Post.tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ManyToManyField(Tag, </span><span class="__shiki_1jdh33">through_model</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">PostTag, </span><span class="__shiki_1jdh33">backref</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;posts&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 初始化数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> init_database</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    db.connect()</span></span>
<span class="line"><span class="__shiki_140thh">    db.create_tables([User, Category, Post, Tag, PostTag])</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;数据库初始化完成&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复杂查询示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_recent_posts_with_details</span><span class="__shiki_140thh">(limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;获取最近发布的文章及其详细信息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> (Post</span></span>
<span class="line"><span class="__shiki_140thh">            .select(Post, User, Category)</span></span>
<span class="line"><span class="__shiki_140thh">            .join(User)</span></span>
<span class="line"><span class="__shiki_140thh">            .join(Category, </span><span class="__shiki_dzsirb">JOIN</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">LEFT_OUTER</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .where(Post.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> Post.</span><span class="__shiki_dzsirb">STATUS_PUBLISHED</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .order_by(Post.published_at.desc())</span></span>
<span class="line"><span class="__shiki_140thh">            .limit(limit)</span></span>
<span class="line"><span class="__shiki_140thh">            .prefetch(Post.tags))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_popular_tags</span><span class="__shiki_140thh">(limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;获取热门标签（按使用次数排序）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> (Tag</span></span>
<span class="line"><span class="__shiki_140thh">            .select(Tag, fn.COUNT(PostTag.post_id).alias(</span><span class="__shiki_mdbnqw">&#39;post_count&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">            .join(PostTag)</span></span>
<span class="line"><span class="__shiki_140thh">            .group_by(Tag.id)</span></span>
<span class="line"><span class="__shiki_140thh">            .order_by(fn.COUNT(PostTag.post_id).desc())</span></span>
<span class="line"><span class="__shiki_140thh">            .limit(limit))</span></span></code></pre></div><h3 id="_9-2-分页功能实现" tabindex="-1">9.2 分页功能实现 <a class="header-anchor" href="#_9-2-分页功能实现" aria-label="Permalink to &quot;9.2 分页功能实现&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Paginator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;通用分页器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, query, page</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, per_page</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, page)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.per_page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> per_page</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.count()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.pages </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.total </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> per_page </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">//</span><span class="__shiki_140thh"> per_page</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> items</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        offset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.page </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.per_page</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.query.paginate(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.page, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.per_page)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> has_prev</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.page </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> has_next</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.page </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.pages</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_page_range</span><span class="__shiki_140thh">(self, delta</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取页面范围&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.page </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> delta)</span></span>
<span class="line"><span class="__shiki_140thh">        end </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.pages, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.page </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> delta)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(start, end </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_posts_page</span><span class="__shiki_140thh">(page</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, per_page</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Post.get_published()</span></span>
<span class="line"><span class="__shiki_140thh">    paginator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Paginator(query, page, per_page)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;items&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(paginator.items),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;page&#39;</span><span class="__shiki_140thh">: paginator.page,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;pages&#39;</span><span class="__shiki_140thh">: paginator.pages,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;total&#39;</span><span class="__shiki_140thh">: paginator.total,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;has_prev&#39;</span><span class="__shiki_140thh">: paginator.has_prev,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;has_next&#39;</span><span class="__shiki_140thh">: paginator.has_next,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;page_range&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(paginator.get_page_range()),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span></code></pre></div><h2 id="十、常见问题与解决方案" tabindex="-1">十、常见问题与解决方案 <a class="header-anchor" href="#十、常见问题与解决方案" aria-label="Permalink to &quot;十、常见问题与解决方案&quot;">​</a></h2><h3 id="_10-1-连接池耗尽" tabindex="-1">10.1 连接池耗尽 <a class="header-anchor" href="#_10-1-连接池耗尽" aria-label="Permalink to &quot;10.1 连接池耗尽&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案1：使用连接池</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> playhouse.pool </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> PooledPostgresqlDatabase</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PooledPostgresqlDatabase(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;my_app&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    max_connections</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    stale_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    password</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;secret&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案2：确保连接关闭</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_user</span><span class="__shiki_140thh">(user_id):</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db.connection_context():  </span><span class="__shiki_21nrsd"># 自动管理连接</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> User.get_by_id(user_id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案3：调整连接参数</span></span>
<span class="line"><span class="__shiki_140thh">db.connect(</span><span class="__shiki_1jdh33">reuse_if_open</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 重用现有连接</span></span></code></pre></div><h3 id="_10-2-n-1查询问题" tabindex="-1">10.2 N+1查询问题 <a class="header-anchor" href="#_10-2-n-1查询问题" aria-label="Permalink to &quot;10.2 N+1查询问题&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 问题示例：获取所有用户及其文章</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select()</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> users:  </span><span class="__shiki_21nrsd"># 1次查询</span></span>
<span class="line"><span class="__shiki_140thh">    posts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(user.posts)  </span><span class="__shiki_21nrsd"># N次查询（每个用户一次）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案1：使用join</span></span>
<span class="line"><span class="__shiki_140thh">users_with_posts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (User</span></span>
<span class="line"><span class="__shiki_140thh">                    .select(User, Post)</span></span>
<span class="line"><span class="__shiki_140thh">                    .join(Post, </span><span class="__shiki_dzsirb">JOIN</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">LEFT_OUTER</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案2：使用prefetch</span></span>
<span class="line"><span class="__shiki_140thh">users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().prefetch(Post)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案3：手动批量加载</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> batch_load_posts</span><span class="__shiki_140thh">(users):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;批量加载用户的文章&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    user_ids </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [user.id </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> users]</span></span>
<span class="line"><span class="__shiki_140thh">    posts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Post</span></span>
<span class="line"><span class="__shiki_140thh">             .select()</span></span>
<span class="line"><span class="__shiki_140thh">             .where(Post.user_id.in_(user_ids)))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 按用户ID分组</span></span>
<span class="line"><span class="__shiki_140thh">    posts_by_user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> post </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> posts:</span></span>
<span class="line"><span class="__shiki_140thh">        posts_by_user.setdefault(post.user_id, []).append(post)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 分配给用户对象</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> users:</span></span>
<span class="line"><span class="__shiki_140thh">        user._posts_cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> posts_by_user.get(user.id, [])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> users</span></span></code></pre></div><h3 id="_10-3-性能监控" tabindex="-1">10.3 性能监控 <a class="header-anchor" href="#_10-3-性能监控" aria-label="Permalink to &quot;10.3 性能监控&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> functools </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> wraps</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> query_timer</span><span class="__shiki_140thh">(func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;查询计时装饰器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @wraps</span><span class="__shiki_140thh">(func)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> wrapper</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_140thh">        start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_140thh">        elapsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">func.</span><span class="__shiki_dzsirb">__name__}</span><span class="__shiki_mdbnqw"> 耗时: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">elapsed</span><span class="__shiki_1itgoe">:.3f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">秒&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> wrapper</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">@query_timer</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_complex_report</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> (User</span></span>
<span class="line"><span class="__shiki_140thh">            .select(User, fn.COUNT(Post.id).alias(</span><span class="__shiki_mdbnqw">&#39;post_count&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">            .join(Post, </span><span class="__shiki_dzsirb">JOIN</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">LEFT_OUTER</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .group_by(User.id)</span></span>
<span class="line"><span class="__shiki_140thh">            .order_by(fn.COUNT(Post.id).desc())</span></span>
<span class="line"><span class="__shiki_140thh">            .limit(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看生成的SQL</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.select().where(User.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(query.sql())  </span><span class="__shiki_21nrsd"># 打印SQL语句</span></span></code></pre></div><h2 id="十一、扩展与集成" tabindex="-1">十一、扩展与集成 <a class="header-anchor" href="#十一、扩展与集成" aria-label="Permalink to &quot;十一、扩展与集成&quot;">​</a></h2><h3 id="_11-1-集成fastapi" tabindex="-1">11.1 集成FastAPI <a class="header-anchor" href="#_11-1-集成fastapi" aria-label="Permalink to &quot;11.1 集成FastAPI&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> fastapi </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> FastAPI, Depends, HTTPException</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> DoesNotExist</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> databases</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">app </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> FastAPI()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数据库依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_db</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    db.connect()</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        yield</span><span class="__shiki_140thh"> db</span></span>
<span class="line"><span class="__shiki_1itgoe">    finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> db.is_closed():</span></span>
<span class="line"><span class="__shiki_140thh">            db.close()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CRUD端点示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">@app.post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/users/&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> create_user</span><span class="__shiki_140thh">(user_data: </span><span class="__shiki_dzsirb">dict</span><span class="__shiki_140thh">, db</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Depends(get_db)):</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db.atomic():</span></span>
<span class="line"><span class="__shiki_140thh">        user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.create(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">user_data)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">: user.id, </span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">: user.username}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@app.get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/users/</span><span class="__shiki_dzsirb">{user_id}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> read_user</span><span class="__shiki_140thh">(user_id: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, db</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Depends(get_db)):</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> User.get_by_id(user_id)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;id&quot;</span><span class="__shiki_140thh">: user.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;username&quot;</span><span class="__shiki_140thh">: user.username,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;email&quot;</span><span class="__shiki_140thh">: user.email,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;created_at&quot;</span><span class="__shiki_140thh">: user.created_at</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_140thh"> DoesNotExist:</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span><span class="__shiki_140thh"> HTTPException(</span><span class="__shiki_1jdh33">status_code</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">detail</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;用户不存在&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@app.get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/posts/&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> read_posts</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    page: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    per_page: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    category: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    db</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Depends(get_db)</span></span>
<span class="line"><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Post.select().where(Post.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> Post.</span><span class="__shiki_dzsirb">STATUS_PUBLISHED</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> category:</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.where(Post.category.slug </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> category)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    paginator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Paginator(query, page, per_page)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;items&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;id&quot;</span><span class="__shiki_140thh">: post.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;title&quot;</span><span class="__shiki_140thh">: post.title,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;excerpt&quot;</span><span class="__shiki_140thh">: post.excerpt,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;author&quot;</span><span class="__shiki_140thh">: post.user.username,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;published_at&quot;</span><span class="__shiki_140thh">: post.published_at</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> post </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> paginator.items</span></span>
<span class="line"><span class="__shiki_140thh">        ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;pagination&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;page&quot;</span><span class="__shiki_140thh">: paginator.page,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;pages&quot;</span><span class="__shiki_140thh">: paginator.pages,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;total&quot;</span><span class="__shiki_140thh">: paginator.total,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;has_next&quot;</span><span class="__shiki_140thh">: paginator.has_next,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;has_prev&quot;</span><span class="__shiki_140thh">: paginator.has_prev</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span></code></pre></div><h3 id="_11-2-集成django风格admin" tabindex="-1">11.2 集成Django风格Admin <a class="header-anchor" href="#_11-2-集成django风格admin" aria-label="Permalink to &quot;11.2 集成Django风格Admin&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> playhouse.flask_utils </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> FlaskDB</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> flask </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Flask, render_template</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> flask_admin </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> admin</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> flask_admin.contrib.peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> ModelView</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">app </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Flask(</span><span class="__shiki_dzsirb">__name__</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">app.config[</span><span class="__shiki_mdbnqw">&#39;SECRET_KEY&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;secret&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置Peewee</span></span>
<span class="line"><span class="__shiki_140thh">flask_db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> FlaskDB(app)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建管理员视图</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserAdmin</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">ModelView</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    column_list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    column_filters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    column_searchable_list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    form_columns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PostAdmin</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">ModelView</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    column_list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;view_count&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    column_filters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;published_at&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    column_searchable_list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">&#39;title&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;content&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    form_ajax_refs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;user&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;fields&#39;</span><span class="__shiki_140thh">: (</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 注册视图</span></span>
<span class="line"><span class="__shiki_140thh">admin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> admin.Admin(app, </span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;博客后台&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">admin.add_view(UserAdmin(User))</span></span>
<span class="line"><span class="__shiki_140thh">admin.add_view(PostAdmin(Post))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> __name__</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;__main__&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    app.run(</span><span class="__shiki_1jdh33">debug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="十二、最佳实践总结" tabindex="-1">十二、最佳实践总结 <a class="header-anchor" href="#十二、最佳实践总结" aria-label="Permalink to &quot;十二、最佳实践总结&quot;">​</a></h2><h3 id="_12-1-代码组织" tabindex="-1">12.1 代码组织 <a class="header-anchor" href="#_12-1-代码组织" aria-label="Permalink to &quot;12.1 代码组织&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">project/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── models/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── __init__.py      # 导出所有模型</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── base.py          # 基础模型类</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── user.py          # 用户模型</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── post.py          # 文章模型</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── tag.py           # 标签模型</span></span>
<span class="line"><span class="__shiki_wvjl67">├── database.py          # 数据库配置</span></span>
<span class="line"><span class="__shiki_wvjl67">├── queries.py           # 复杂查询函数</span></span>
<span class="line"><span class="__shiki_wvjl67">├── migrations/          # 数据库迁移</span></span>
<span class="line"><span class="__shiki_wvjl67">└── app.py              # 主应用</span></span></code></pre></div><h3 id="_12-2-配置管理" tabindex="-1">12.2 配置管理 <a class="header-anchor" href="#_12-2-配置管理" aria-label="Permalink to &quot;12.2 配置管理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># database.py</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> os</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> peewee </span><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> playhouse.db_url </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> connect</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据环境变量选择数据库</span></span>
<span class="line"><span class="__shiki_dzsirb">DATABASE_URL</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> os.getenv(</span><span class="__shiki_mdbnqw">&#39;DATABASE_URL&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sqlite:///app.db&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> DATABASE_URL</span><span class="__shiki_140thh">.startswith(</span><span class="__shiki_mdbnqw">&#39;postgres://&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> connect(</span><span class="__shiki_dzsirb">DATABASE_URL</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 自动识别PostgreSQL</span></span>
<span class="line"><span class="__shiki_1itgoe">elif</span><span class="__shiki_dzsirb"> DATABASE_URL</span><span class="__shiki_140thh">.startswith(</span><span class="__shiki_mdbnqw">&#39;mysql://&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> connect(</span><span class="__shiki_dzsirb">DATABASE_URL</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 自动识别MySQL</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SqliteDatabase(</span><span class="__shiki_mdbnqw">&#39;app.db&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 测试配置</span></span>
<span class="line"><span class="__shiki_dzsirb">TEST_DATABASE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> SqliteDatabase(</span><span class="__shiki_mdbnqw">&#39;:memory:&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> use_test_database</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;切换</span></span></code></pre></div>`,101)])])}const r=a(p,[["render",h]]);export{d as __pageData,r as default};
