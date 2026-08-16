import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Pony ORM高级查询学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/python/pony.md","filePath":"data/access/orm/python/pony.md"}'),p={name:"data/access/orm/python/pony.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="pony-orm高级查询学习笔记" tabindex="-1">Pony ORM高级查询学习笔记 <a class="header-anchor" href="#pony-orm高级查询学习笔记" aria-label="Permalink to &quot;Pony ORM高级查询学习笔记&quot;">​</a></h1><h2 id="一、pony-orm概述" tabindex="-1">一、Pony ORM概述 <a class="header-anchor" href="#一、pony-orm概述" aria-label="Permalink to &quot;一、Pony ORM概述&quot;">​</a></h2><h3 id="_1-1-pony-orm简介" tabindex="-1">1.1 Pony ORM简介 <a class="header-anchor" href="#_1-1-pony-orm简介" aria-label="Permalink to &quot;1.1 Pony ORM简介&quot;">​</a></h3><p>Pony ORM是一个具有Pythonic语法的ORM框架，最大特点是使用<strong>生成器表达式</strong>构建查询，语法简洁优雅。它提供了独特的<strong>关系代数</strong>查询方法，支持自动事务管理和智能查询优化。</p><h3 id="_1-2-核心特点" tabindex="-1">1.2 核心特点 <a class="header-anchor" href="#_1-2-核心特点" aria-label="Permalink to &quot;1.2 核心特点&quot;">​</a></h3><ul><li><strong>Pythonic查询语法</strong>：使用生成器表达式，类似Python列表推导式</li><li><strong>智能查询优化</strong>：自动优化N+1查询问题</li><li><strong>高级数据库功能</strong>：支持窗口函数、CTE、JSON字段等</li><li><strong>在线编辑器</strong>：提供Web版数据库设计器（Pony ER Diagram Editor）</li><li><strong>自动事务管理</strong>：使用<code>@db_session</code>装饰器自动管理事务</li></ul><h3 id="_1-3-安装与配置" tabindex="-1">1.3 安装与配置 <a class="header-anchor" href="#_1-3-安装与配置" aria-label="Permalink to &quot;1.3 安装与配置&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装Pony ORM</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pony</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装数据库驱动（根据数据库选择）</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> psycopg2-binary</span><span class="__shiki_21nrsd">    # PostgreSQL</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> mysqlclient</span><span class="__shiki_21nrsd">        # MySQL</span></span>
<span class="line"><span class="__shiki_1t8gfj">pip</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> pony[cockroach]</span><span class="__shiki_21nrsd">    # CockroachDB</span></span></code></pre></div><h2 id="二、数据库连接与实体定义" tabindex="-1">二、数据库连接与实体定义 <a class="header-anchor" href="#二、数据库连接与实体定义" aria-label="Permalink to &quot;二、数据库连接与实体定义&quot;">​</a></h2><h3 id="_2-1-数据库连接" tabindex="-1">2.1 数据库连接 <a class="header-anchor" href="#_2-1-数据库连接" aria-label="Permalink to &quot;2.1 数据库连接&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建数据库对象</span></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Database()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># PostgreSQL连接</span></span>
<span class="line"><span class="__shiki_140thh">db.bind(</span></span>
<span class="line"><span class="__shiki_1jdh33">    provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    password</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;secret&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;localhost&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    database</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># MySQL连接</span></span>
<span class="line"><span class="__shiki_140thh">db.bind(</span></span>
<span class="line"><span class="__shiki_1jdh33">    provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;mysql&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;localhost&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    passwd</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;secret&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    db</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># SQLite连接</span></span>
<span class="line"><span class="__shiki_140thh">db.bind(</span><span class="__shiki_1jdh33">provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;sqlite&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filename</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;database.sqlite&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">create_db</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用绑定字符串</span></span>
<span class="line"><span class="__shiki_140thh">db.bind(</span><span class="__shiki_mdbnqw">&#39;sqlite&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;:memory:&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 内存数据库</span></span>
<span class="line"><span class="__shiki_140thh">db.bind(</span><span class="__shiki_mdbnqw">&#39;postgresql://user:pass@localhost/dbname&#39;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_2-2-实体定义基础" tabindex="-1">2.2 实体定义基础 <a class="header-anchor" href="#_2-2-实体定义基础" aria-label="Permalink to &quot;2.2 实体定义基础&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> decimal </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Decimal</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Customer</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 主键</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 必需字段</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 最大长度100</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 可选字段</span></span>
<span class="line"><span class="__shiki_140thh">    age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">nullable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 10位数，2位小数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日期时间</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">volatile</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 每次保存时更新</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 关系</span></span>
<span class="line"><span class="__shiki_140thh">    orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Order&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    addresses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Address&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    _table_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;customers&#39;</span><span class="__shiki_21nrsd">  # 自定义表名</span></span>
<span class="line"><span class="__shiki_140thh">    _discriminator_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">    # 用于继承</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 复合索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 唯一复合索引</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),   </span><span class="__shiki_21nrsd"># 普通索引</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span></code></pre></div><h3 id="_2-3-字段类型详解" tabindex="-1">2.3 字段类型详解 <a class="header-anchor" href="#_2-3-字段类型详解" aria-label="Permalink to &quot;2.3 字段类型详解&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 数值类型</span></span>
<span class="line"><span class="__shiki_140thh">int_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">float_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">DecimalField </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 总位数10，小数2位</span></span>
<span class="line"><span class="__shiki_140thh">LongStrField </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(LongStr)         </span><span class="__shiki_21nrsd"># 长文本</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 字符串类型</span></span>
<span class="line"><span class="__shiki_140thh">str_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)           </span><span class="__shiki_21nrsd"># 带长度限制</span></span>
<span class="line"><span class="__shiki_140thh">str_unicode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_1jdh33">unicode</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)     </span><span class="__shiki_21nrsd"># Unicode字符串</span></span>
<span class="line"><span class="__shiki_140thh">json_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Json)              </span><span class="__shiki_21nrsd"># JSON字段</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日期时间</span></span>
<span class="line"><span class="__shiki_140thh">date_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(date)</span></span>
<span class="line"><span class="__shiki_140thh">datetime_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">time_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(time)</span></span>
<span class="line"><span class="__shiki_140thh">timedelta_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(timedelta)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 二进制数据</span></span>
<span class="line"><span class="__shiki_140thh">bytes_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">bytes</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">buffer_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(buffer)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># UUID</span></span>
<span class="line"><span class="__shiki_140thh">uuid_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">UUID</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 枚举类型</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> enum </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Enum</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Status</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    ACTIVE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_dzsirb">    INACTIVE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_dzsirb">    PENDING</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">status_field </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Status, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">Status.</span><span class="__shiki_dzsirb">ACTIVE</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数组类型（PostgreSQL）</span></span>
<span class="line"><span class="__shiki_140thh">tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(StrArray)                </span><span class="__shiki_21nrsd"># 字符串数组</span></span>
<span class="line"><span class="__shiki_140thh">int_array </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(IntArray)           </span><span class="__shiki_21nrsd"># 整数数组</span></span></code></pre></div><h3 id="_2-4-实体关系" tabindex="-1">2.4 实体关系 <a class="header-anchor" href="#_2-4-实体关系" aria-label="Permalink to &quot;2.4 实体关系&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 一对一关系</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    passport </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_mdbnqw">&#39;Passport&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 可空一对一</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Passport</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    person </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_mdbnqw">&#39;Person&#39;</span><span class="__shiki_140thh">)      </span><span class="__shiki_21nrsd"># 必需一对一</span></span>
<span class="line"><span class="__shiki_140thh">    number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 级联删除：删除Person时自动删除Passport</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 一对多关系</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Department</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    employees </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Employee&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Employee</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    department </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_mdbnqw">&#39;Department&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 反向引用</span></span>
<span class="line"><span class="__shiki_140thh">    Department.employees </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Employee&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多对多关系（自动中间表）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Student</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    courses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Course&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Course</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    students </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Student&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 双向关系</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多对多关系（自定义中间表）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> StudentCourse</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    student </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_mdbnqw">&#39;Student&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    course </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_mdbnqw">&#39;Course&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    grade </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    enrolled_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    PrimaryKey(student, course)  </span><span class="__shiki_21nrsd"># 复合主键</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自引用关系</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Employee</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    manager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_mdbnqw">&#39;Employee&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reverse</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;subordinates&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    subordinates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Employee&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reverse</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;manager&#39;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_2-5-继承与多态" tabindex="-1">2.5 继承与多态 <a class="header-anchor" href="#_2-5-继承与多态" aria-label="Permalink to &quot;2.5 继承与多态&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 单表继承（所有字段在一个表中）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    discriminator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 鉴别器字段</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _discriminator_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Employee</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Person</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    salary </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    _discriminator_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Customer</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Person</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    loyalty_points </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    _discriminator_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多表继承（每个子类有自己的表）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Vehicle</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    make </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    model </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _table_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;vehicles&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Car</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Vehicle</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    doors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    _table_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;cars&#39;</span><span class="__shiki_21nrsd">  # 单独的表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Truck</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Vehicle</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    load_capacity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    _table_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;trucks&#39;</span><span class="__shiki_21nrsd">  # 单独的表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 抽象基类</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BaseEntity</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">volatile</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _abstract_ </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_21nrsd">  # 不会创建表</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">BaseEntity</span><span class="__shiki_140thh">):  </span><span class="__shiki_21nrsd"># 继承抽象基类字段</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="三、查询基础" tabindex="-1">三、查询基础 <a class="header-anchor" href="#三、查询基础" aria-label="Permalink to &quot;三、查询基础&quot;">​</a></h2><h3 id="_3-1-生成器表达式查询" tabindex="-1">3.1 生成器表达式查询 <a class="header-anchor" href="#_3-1-生成器表达式查询" aria-label="Permalink to &quot;3.1 生成器表达式查询&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基本查询 - 使用生成器表达式</span></span>
<span class="line"><span class="__shiki_140thh">customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 相当于SQL: SELECT * FROM customer WHERE age &gt; 18</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 转换为列表</span></span>
<span class="line"><span class="__shiki_140thh">customer_list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(customers)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取第一个</span></span>
<span class="line"><span class="__shiki_140thh">first_customer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer).first()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取前N个</span></span>
<span class="line"><span class="__shiki_140thh">top_customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer).order_by(Customer.balance.desc())[:</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 计数</span></span>
<span class="line"><span class="__shiki_140thh">count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">).count()</span></span></code></pre></div><h3 id="_3-2-条件查询" tabindex="-1">3.2 条件查询 <a class="header-anchor" href="#_3-2-条件查询" aria-label="Permalink to &quot;3.2 条件查询&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 比较操作符</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.price </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.price </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.price </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.price </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.price </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.price </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># IN查询</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.category </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;Electronics&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Books&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.id </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">])</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># BETWEEN查询</span></span>
<span class="line"><span class="__shiki_140thh">select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.price.between(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># LIKE查询</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.name.startswith(</span><span class="__shiki_mdbnqw">&#39;John&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.name.endswith(</span><span class="__shiki_mdbnqw">&#39;son&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.name.contains(</span><span class="__shiki_mdbnqw">&#39;Smith&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 正则表达式</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.name.matches(</span><span class="__shiki_mdbnqw">&#39;^J.*n$&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 空值检查</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.email </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.email </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日期查询</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> date</span></span>
<span class="line"><span class="__shiki_140thh">select(o </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> o.order_date </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> date(</span><span class="__shiki_dzsirb">2023</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">select(o </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> o.order_date.year </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 2023</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">select(o </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> o.order_date.month </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 组合条件</span></span>
<span class="line"><span class="__shiki_140thh">select(</span></span>
<span class="line"><span class="__shiki_140thh">    c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (c.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> c.balance </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_1itgoe">    or</span><span class="__shiki_140thh"> (c.country </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;US&#39;</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> c.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;active&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># NOT条件</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> (c.age </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_140thh"> c.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;inactive&#39;</span><span class="__shiki_140thh">))</span></span></code></pre></div><h3 id="_3-3-排序与分页" tabindex="-1">3.3 排序与分页 <a class="header-anchor" href="#_3-3-排序与分页" aria-label="Permalink to &quot;3.3 排序与分页&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 排序</span></span>
<span class="line"><span class="__shiki_21nrsd"># 升序</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer).order_by(Customer.name)</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer).order_by(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 按第一个select字段排序</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 降序</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer).order_by(desc(Customer.created_at))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多字段排序</span></span>
<span class="line"><span class="__shiki_140thh">select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer).order_by(Customer.country, desc(Customer.balance))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 分页</span></span>
<span class="line"><span class="__shiki_140thh">page_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 20</span></span>
<span class="line"><span class="__shiki_140thh">page_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用切片</span></span>
<span class="line"><span class="__shiki_140thh">customers_page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer).order_by(Customer.id)[</span></span>
<span class="line"><span class="__shiki_140thh">    (page_number</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">page_size : page_number</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">page_size</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用page()方法</span></span>
<span class="line"><span class="__shiki_140thh">customers_page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer).order_by(Customer.id).page(</span></span>
<span class="line"><span class="__shiki_1jdh33">    pagenum</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">page_number, </span></span>
<span class="line"><span class="__shiki_1jdh33">    pagesize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">page_size</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取分页信息</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)</span></span>
<span class="line"><span class="__shiki_140thh">total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.count()</span></span>
<span class="line"><span class="__shiki_140thh">pages </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (total </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> page_size </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">//</span><span class="__shiki_140thh"> page_size  </span><span class="__shiki_21nrsd"># 总页数</span></span></code></pre></div><h2 id="四、高级查询功能" tabindex="-1">四、高级查询功能 <a class="header-anchor" href="#四、高级查询功能" aria-label="Permalink to &quot;四、高级查询功能&quot;">​</a></h2><h3 id="_4-1-聚合查询" tabindex="-1">4.1 聚合查询 <a class="header-anchor" href="#_4-1-聚合查询" aria-label="Permalink to &quot;4.1 聚合查询&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> avg, count, </span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">min</span><span class="__shiki_140thh">, distinct</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 计数</span></span>
<span class="line"><span class="__shiki_140thh">total_customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> count(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)</span></span>
<span class="line"><span class="__shiki_140thh">active_customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> count(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.is_active)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 聚合函数</span></span>
<span class="line"><span class="__shiki_140thh">max_balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(c.balance </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)</span></span>
<span class="line"><span class="__shiki_140thh">min_balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> min</span><span class="__shiki_140thh">(c.balance </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)</span></span>
<span class="line"><span class="__shiki_140thh">avg_age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> avg(c.age </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)</span></span>
<span class="line"><span class="__shiki_140thh">total_balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(c.balance </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 分组聚合</span></span>
<span class="line"><span class="__shiki_21nrsd"># 按国家分组统计客户数和总余额</span></span>
<span class="line"><span class="__shiki_140thh">stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.country, count(c), </span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(c.balance)) </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_140thh">).group_by(c.country)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> country, cnt, total </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> stats:</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">country</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">cnt</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> customers, total balance: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">total</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 带条件的分组</span></span>
<span class="line"><span class="__shiki_140thh">stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.country, count(c), avg(c.balance))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> c.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span></span>
<span class="line"><span class="__shiki_140thh">).group_by(c.country)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HAVING子句</span></span>
<span class="line"><span class="__shiki_21nrsd"># 统计余额大于1000的客户数超过10的国家</span></span>
<span class="line"><span class="__shiki_140thh">rich_countries </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.country, count(c))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> c.balance </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">).group_by(c.country).having(count(c) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-2-连接查询" tabindex="-1">4.2 连接查询 <a class="header-anchor" href="#_4-2-连接查询" aria-label="Permalink to &quot;4.2 连接查询&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 隐式连接（自动JOIN）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询所有订单及其客户</span></span>
<span class="line"><span class="__shiki_140thh">orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (o.id, o.amount, o.customer.name) </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 显式连接</span></span>
<span class="line"><span class="__shiki_140thh">orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (o.id, o.amount, c.name)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> o.customer </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> c</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 左外连接</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询所有客户及其订单（即使没有订单）</span></span>
<span class="line"><span class="__shiki_140thh">customers_with_orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> left_join(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.name, o.amount)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> c.orders</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自连接</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查找员工及其经理</span></span>
<span class="line"><span class="__shiki_140thh">employees </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (e.name, m.name)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> e </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Employee</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> m </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Employee</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> e.manager </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> m</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多表连接</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询订单详情：客户-订单-产品</span></span>
<span class="line"><span class="__shiki_140thh">results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.name, o.order_date, p.name, oi.quantity)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> c.orders</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> oi </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> o.items</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> oi.product </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> p</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-3-子查询" tabindex="-1">4.3 子查询 <a class="header-anchor" href="#_4-3-子查询" aria-label="Permalink to &quot;4.3 子查询&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 标量子查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询余额高于平均值的客户</span></span>
<span class="line"><span class="__shiki_140thh">avg_balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> avg(c.balance </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)</span></span>
<span class="line"><span class="__shiki_140thh">rich_customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> c.balance </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> avg_balance</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># IN子查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询有订单的客户</span></span>
<span class="line"><span class="__shiki_140thh">customers_with_orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> c.id </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> select(o.customer.id </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># EXISTS子查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询有超过5个订单的客户</span></span>
<span class="line"><span class="__shiki_140thh">busy_customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> count(o </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> o.customer </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> c) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 相关子查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询每个客户的最新订单</span></span>
<span class="line"><span class="__shiki_140thh">latest_orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.name, o)</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> c.orders</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> o.order_date </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        o2.order_date </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> o2 </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> o2.customer </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> c</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-4-窗口函数" tabindex="-1">4.4 窗口函数 <a class="header-anchor" href="#_4-4-窗口函数" aria-label="Permalink to &quot;4.4 窗口函数&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># ROW_NUMBER() - 为每行分配唯一序号</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.name, c.balance,</span></span>
<span class="line"><span class="__shiki_140thh">     row_number().over(</span><span class="__shiki_1jdh33">order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">desc(c.balance)).alias(</span><span class="__shiki_mdbnqw">&#39;rank&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># RANK() - 排名，相同值排名相同</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.country, c.name, c.balance,</span></span>
<span class="line"><span class="__shiki_140thh">     rank().over(</span><span class="__shiki_1jdh33">partition_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">c.country, </span><span class="__shiki_1jdh33">order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">desc(c.balance)).alias(</span><span class="__shiki_mdbnqw">&#39;rank_in_country&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># DENSE_RANK() - 密集排名</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.department, c.name, c.salary,</span></span>
<span class="line"><span class="__shiki_140thh">     dense_rank().over(</span><span class="__shiki_1jdh33">partition_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">c.department, </span><span class="__shiki_1jdh33">order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">desc(c.salary)))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Employee</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># NTILE() - 将数据分桶</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.name, c.balance,</span></span>
<span class="line"><span class="__shiki_140thh">     ntile(</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">).over(</span><span class="__shiki_1jdh33">order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">desc(c.balance)).alias(</span><span class="__shiki_mdbnqw">&#39;quartile&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 累计统计</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.name, c.balance,</span></span>
<span class="line"><span class="__shiki_dzsirb">     sum</span><span class="__shiki_140thh">(c.balance).over(</span><span class="__shiki_1jdh33">order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">c.created_at).alias(</span><span class="__shiki_mdbnqw">&#39;running_total&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">     avg(c.balance).over(</span><span class="__shiki_1jdh33">order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">c.created_at).alias(</span><span class="__shiki_mdbnqw">&#39;moving_avg&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># LAG/LEAD - 访问前后行数据</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c.name, c.balance, c.created_at,</span></span>
<span class="line"><span class="__shiki_140thh">     lag(c.balance).over(</span><span class="__shiki_1jdh33">order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">c.created_at).alias(</span><span class="__shiki_mdbnqw">&#39;prev_balance&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">     lead(c.balance).over(</span><span class="__shiki_1jdh33">order_by</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">c.created_at).alias(</span><span class="__shiki_mdbnqw">&#39;next_balance&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_4-5-公共表表达式-cte" tabindex="-1">4.5 公共表表达式（CTE） <a class="header-anchor" href="#_4-5-公共表表达式-cte" aria-label="Permalink to &quot;4.5 公共表表达式（CTE）&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 递归CTE - 组织结构树</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Employee</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    manager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_mdbnqw">&#39;Employee&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    subordinates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Employee&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reverse</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;manager&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 递归查询所有下属</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_140thh"> recursive subordinates_cte(</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">, name, level) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 锚点查询</span></span>
<span class="line"><span class="__shiki_140thh">    select (e.id, e.name, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    from</span><span class="__shiki_140thh"> Employee e</span></span>
<span class="line"><span class="__shiki_140thh">    where e.id = :manager_id</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    union </span><span class="__shiki_dzsirb">all</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 递归查询</span></span>
<span class="line"><span class="__shiki_140thh">    select (e.id, e.name, s.level </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    from</span><span class="__shiki_140thh"> Employee e</span></span>
<span class="line"><span class="__shiki_140thh">    inner join subordinates_cte s on e.manager_id = s.id</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">select </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1itgoe"> from</span><span class="__shiki_140thh"> subordinates_cte</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用Pony实现</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_subordinates</span><span class="__shiki_140thh">(manager_id, max_level</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用递归查询</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    WITH RECURSIVE subordinates AS (</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT id, name, 0 as level</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM employee</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE id = $manager_id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        UNION ALL</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT e.id, e.name, s.level + 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM employee e</span></span>
<span class="line"><span class="__shiki_mdbnqw">        INNER JOIN subordinates s ON e.manager_id = s.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE $max_level IS NULL OR s.level &lt; $max_level</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    SELECT * FROM subordinates</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ORDER BY level, name</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> db.select(query, </span><span class="__shiki_1jdh33">manager_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">manager_id, </span><span class="__shiki_1jdh33">max_level</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">max_level)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 普通CTE - 复杂查询分解</span></span>
<span class="line"><span class="__shiki_140thh">cte_query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">WITH high_value_customers AS (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    SELECT customer_id, SUM(amount) as total_spent</span></span>
<span class="line"><span class="__shiki_mdbnqw">    FROM orders</span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE order_date &gt;= &#39;2023-01-01&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    GROUP BY customer_id</span></span>
<span class="line"><span class="__shiki_mdbnqw">    HAVING SUM(amount) &gt; 10000</span></span>
<span class="line"><span class="__shiki_mdbnqw">),</span></span>
<span class="line"><span class="__shiki_mdbnqw">customer_segments AS (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">        c.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        c.name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        hvc.total_spent,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        CASE </span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHEN hvc.total_spent &gt; 50000 THEN &#39;Platinum&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHEN hvc.total_spent &gt; 20000 THEN &#39;Gold&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ELSE &#39;Silver&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        END as segment</span></span>
<span class="line"><span class="__shiki_mdbnqw">    FROM customers c</span></span>
<span class="line"><span class="__shiki_mdbnqw">    INNER JOIN high_value_customers hvc ON c.id = hvc.customer_id</span></span>
<span class="line"><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_mdbnqw">SELECT segment, COUNT(*), AVG(total_spent)</span></span>
<span class="line"><span class="__shiki_mdbnqw">FROM customer_segments</span></span>
<span class="line"><span class="__shiki_mdbnqw">GROUP BY segment</span></span>
<span class="line"><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span></code></pre></div><h2 id="五、json与数组查询" tabindex="-1">五、JSON与数组查询 <a class="header-anchor" href="#五、json与数组查询" aria-label="Permalink to &quot;五、JSON与数组查询&quot;">​</a></h2><h3 id="_5-1-json字段查询" tabindex="-1">5.1 JSON字段查询 <a class="header-anchor" href="#_5-1-json字段查询" aria-label="Permalink to &quot;5.1 JSON字段查询&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定义JSON字段</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    attributes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Json)  </span><span class="__shiki_21nrsd"># JSON字段</span></span>
<span class="line"><span class="__shiki_140thh">    tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(StrArray)    </span><span class="__shiki_21nrsd"># 字符串数组</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 插入JSON数据</span></span>
<span class="line"><span class="__shiki_140thh">Product(</span></span>
<span class="line"><span class="__shiki_1jdh33">    name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Smartphone&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    attributes</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;brand&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Apple&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;model&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;iPhone 14&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;specs&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;storage&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;128GB&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;color&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;black&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;cameras&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;features&#39;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;5G&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Face ID&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;OLED&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_1jdh33">    tags</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;electronics&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;mobile&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;apple&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JSON路径查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询品牌为Apple的产品</span></span>
<span class="line"><span class="__shiki_140thh">apple_products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> p.attributes[</span><span class="__shiki_mdbnqw">&#39;brand&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;Apple&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 嵌套JSON查询</span></span>
<span class="line"><span class="__shiki_140thh">products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> p.attributes[</span><span class="__shiki_mdbnqw">&#39;specs&#39;</span><span class="__shiki_140thh">][</span><span class="__shiki_mdbnqw">&#39;storage&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;128GB&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JSON数组查询</span></span>
<span class="line"><span class="__shiki_140thh">products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_mdbnqw"> &#39;5G&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> p.attributes[</span><span class="__shiki_mdbnqw">&#39;features&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JSON操作函数</span></span>
<span class="line"><span class="__shiki_140thh">products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> json_get(p.attributes, </span><span class="__shiki_mdbnqw">&#39;$.specs.cameras&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新JSON字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> update_product_attributes</span><span class="__shiki_140thh">(product_id, new_attributes):</span></span>
<span class="line"><span class="__shiki_140thh">    product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Product[product_id]</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 合并JSON</span></span>
<span class="line"><span class="__shiki_140thh">    product.attributes.update(new_attributes)</span></span></code></pre></div><h3 id="_5-2-数组字段查询" tabindex="-1">5.2 数组字段查询 <a class="header-anchor" href="#_5-2-数组字段查询" aria-label="Permalink to &quot;5.2 数组字段查询&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 数组包含查询</span></span>
<span class="line"><span class="__shiki_21nrsd"># 查询包含特定标签的产品</span></span>
<span class="line"><span class="__shiki_140thh">electronics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_mdbnqw"> &#39;electronics&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> p.tags</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数组重叠查询（有共同元素）</span></span>
<span class="line"><span class="__shiki_140thh">related_products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> p.tags.overlap([</span><span class="__shiki_mdbnqw">&#39;apple&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;mobile&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数组包含查询（包含所有指定元素）</span></span>
<span class="line"><span class="__shiki_140thh">premium_products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> p.tags.contains([</span><span class="__shiki_mdbnqw">&#39;premium&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;featured&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数组长度查询</span></span>
<span class="line"><span class="__shiki_140thh">products_with_many_tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(p.tags) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数组索引访问</span></span>
<span class="line"><span class="__shiki_140thh">products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> p.tags[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;electronics&#39;</span><span class="__shiki_21nrsd">  # 第一个标签</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 数组拼接</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> add_tags</span><span class="__shiki_140thh">(product_id, new_tags):</span></span>
<span class="line"><span class="__shiki_140thh">    product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Product[product_id]</span></span>
<span class="line"><span class="__shiki_140thh">    product.tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(product.tags) </span><span class="__shiki_1itgoe">|</span><span class="__shiki_dzsirb"> set</span><span class="__shiki_140thh">(new_tags))</span></span></code></pre></div><h2 id="六、性能优化技巧" tabindex="-1">六、性能优化技巧 <a class="header-anchor" href="#六、性能优化技巧" aria-label="Permalink to &quot;六、性能优化技巧&quot;">​</a></h2><h3 id="_6-1-查询优化" tabindex="-1">6.1 查询优化 <a class="header-anchor" href="#_6-1-查询优化" aria-label="Permalink to &quot;6.1 查询优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用select()而非对象属性访问</span></span>
<span class="line"><span class="__shiki_21nrsd"># 避免N+1查询问题</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 不好的方式：N+1查询</span></span>
<span class="line"><span class="__shiki_140thh">customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)[:]</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> customer </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> customers:</span></span>
<span class="line"><span class="__shiki_140thh">    orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(o </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> o.customer </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> customer)[:]  </span><span class="__shiki_21nrsd"># 每次循环都查询</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 好的方式：预加载</span></span>
<span class="line"><span class="__shiki_140thh">customers_with_orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">    (c, o) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> c.orders</span></span>
<span class="line"><span class="__shiki_140thh">)[:]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用prefetch</span></span>
<span class="line"><span class="__shiki_140thh">customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Customer.select().prefetch(Order)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 只选择需要的字段</span></span>
<span class="line"><span class="__shiki_21nrsd"># 避免选择所有字段</span></span>
<span class="line"><span class="__shiki_140thh">customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c.name </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)  </span><span class="__shiki_21nrsd"># 只选择名字</span></span>
<span class="line"><span class="__shiki_140thh">customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select((c.id, c.name) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)  </span><span class="__shiki_21nrsd"># 选择多个字段</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用索引</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Customer</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 唯一约束自动创建索引</span></span>
<span class="line"><span class="__shiki_140thh">    age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;idx_age&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 自定义索引名</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 复合索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;country&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;city&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 非唯一复合索引</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;last_name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;first_name&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 唯一复合索引</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 批量操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> batch_insert_customers</span><span class="__shiki_140thh">(customer_data):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 批量插入</span></span>
<span class="line"><span class="__shiki_140thh">    Customer.insert_many(customer_data)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或使用事务批量插入</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> customer_data:</span></span>
<span class="line"><span class="__shiki_140thh">            Customer(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">data)</span></span>
<span class="line"><span class="__shiki_140thh">        commit()  </span><span class="__shiki_21nrsd"># 一次性提交</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 使用exists()而非count()</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检查是否存在记录时使用exists()更高效</span></span>
<span class="line"><span class="__shiki_140thh">has_orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> exists(o </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> o.customer </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> customer)</span></span>
<span class="line"><span class="__shiki_21nrsd"># 比 count(o for o in Order if o.customer == customer) &gt; 0 更高效</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 使用raw_sql进行复杂查询</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_complex_report</span><span class="__shiki_140thh">(start_date, end_date):</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">        c.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        c.name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        COUNT(o.id) as order_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SUM(o.amount) as total_amount,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        AVG(o.amount) as avg_amount</span></span>
<span class="line"><span class="__shiki_mdbnqw">    FROM customer c</span></span>
<span class="line"><span class="__shiki_mdbnqw">    LEFT JOIN orders o ON c.id = o.customer_id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        AND o.order_date BETWEEN $start_date AND $end_date</span></span>
<span class="line"><span class="__shiki_mdbnqw">    GROUP BY c.id, c.name</span></span>
<span class="line"><span class="__shiki_mdbnqw">    HAVING COUNT(o.id) &gt; 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ORDER BY total_amount DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> db.select(query, </span><span class="__shiki_1jdh33">start_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date, </span><span class="__shiki_1jdh33">end_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span></code></pre></div><h3 id="_6-2-缓存优化" tabindex="-1">6.2 缓存优化 <a class="header-anchor" href="#_6-2-缓存优化" aria-label="Permalink to &quot;6.2 缓存优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 查询缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> local_db_cache</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用本地缓存</span></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Database(</span><span class="__shiki_1jdh33">local_db_cache</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 二级缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> sql_debug, show_cache_stats</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 调试SQL</span></span>
<span class="line"><span class="__shiki_140thh">sql_debug(</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 显示缓存统计</span></span>
<span class="line"><span class="__shiki_140thh">show_cache_stats()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 手动缓存管理</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_customer_with_cache</span><span class="__shiki_140thh">(customer_id):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用get()会检查缓存</span></span>
<span class="line"><span class="__shiki_140thh">    customer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Customer.get(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">customer_id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> customer:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 强制刷新缓存</span></span>
<span class="line"><span class="__shiki_140thh">        customer.flush()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> customer</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 批量预加载缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> preload_customers</span><span class="__shiki_140thh">(customer_ids):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 一次性加载多个对象到缓存</span></span>
<span class="line"><span class="__shiki_140thh">    customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Customer.select(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> c: c.id </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> customer_ids)[:]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预加载关联数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> customer </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> customers:</span></span>
<span class="line"><span class="__shiki_140thh">        customer.orders.preload()</span></span>
<span class="line"><span class="__shiki_140thh">        customer.addresses.preload()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> customers</span></span></code></pre></div><h2 id="七、事务与并发控制" tabindex="-1">七、事务与并发控制 <a class="header-anchor" href="#七、事务与并发控制" aria-label="Permalink to &quot;七、事务与并发控制&quot;">​</a></h2><h3 id="_7-1-事务管理" tabindex="-1">7.1 事务管理 <a class="header-anchor" href="#_7-1-事务管理" aria-label="Permalink to &quot;7.1 事务管理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用@db_session装饰器</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> create_customer</span><span class="__shiki_140thh">(name, email):</span></span>
<span class="line"><span class="__shiki_140thh">    customer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Customer(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">name, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">email)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动提交事务</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> customer.id</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 手动事务控制</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> complex_operation</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 开始事务</span></span>
<span class="line"><span class="__shiki_140thh">        customer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Customer(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;John&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Order(</span><span class="__shiki_1jdh33">customer</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">customer, </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 如果一切正常，自动提交</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 如果发生异常，自动回滚</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 嵌套事务（保存点）</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> nested_transaction</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    customer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Customer(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;John&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> db_session:  </span><span class="__shiki_21nrsd"># 创建保存点</span></span>
<span class="line"><span class="__shiki_140thh">            order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Order(</span><span class="__shiki_1jdh33">customer</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">customer, </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 这里发生错误会回滚到保存点</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Something went wrong&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        pass</span><span class="__shiki_21nrsd">  # 内层事务回滚，外层事务继续</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # customer对象仍然存在</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 显式提交与回滚</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> manual_control</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        customer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Customer(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;John&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;john@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Order(</span><span class="__shiki_1jdh33">customer</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">customer, </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 显式提交</span></span>
<span class="line"><span class="__shiki_140thh">        commit()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 显式回滚</span></span>
<span class="line"><span class="__shiki_140thh">        rollback()</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Transaction rolled back: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 事务隔离级别</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">serializable</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 可序列化隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> sensitive_operation</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最高隔离级别，避免并发问题</span></span>
<span class="line"><span class="__shiki_1itgoe">    pass</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 只读事务</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">readonly</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> read_only_operation</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 只读事务，不能修改数据</span></span>
<span class="line"><span class="__shiki_140thh">    customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer)[:]</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> customers</span></span></code></pre></div><h3 id="_7-2-乐观锁与并发控制" tabindex="-1">7.2 乐观锁与并发控制 <a class="header-anchor" href="#_7-2-乐观锁与并发控制" aria-label="Permalink to &quot;7.2 乐观锁与并发控制&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用版本控制（乐观锁）</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    quantity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 版本字段</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> buy</span><span class="__shiki_140thh">(self, amount):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查库存</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> amount:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Insufficient stock&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 更新版本</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> amount</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.version </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            commit()  </span><span class="__shiki_21nrsd"># 提交时检查版本</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh"> pony.orm.core.OptimisticCheckError:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 版本冲突，重试或通知用户</span></span>
<span class="line"><span class="__shiki_140thh">            rollback()</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_140thh"> ConcurrentModificationError(</span><span class="__shiki_mdbnqw">&quot;Product was modified by another transaction&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用select_for_update（悲观锁）</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> reserve_product</span><span class="__shiki_140thh">(product_id, amount):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 锁定行直到事务结束</span></span>
<span class="line"><span class="__shiki_140thh">    product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Product.select_for_update(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> p: p.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> product_id).first()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> product.quantity </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> amount:</span></span>
<span class="line"><span class="__shiki_140thh">        product.quantity </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> amount</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Insufficient stock&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用数据库锁函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> atomic_increment</span><span class="__shiki_140thh">(counter_id):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用数据库原语保证原子性</span></span>
<span class="line"><span class="__shiki_140thh">    db.execute(</span><span class="__shiki_mdbnqw">&quot;UPDATE counters SET value = value + 1 WHERE id = $1&quot;</span><span class="__shiki_140thh">, counter_id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 处理死锁</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> TransactionError</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> retry_on_deadlock</span><span class="__shiki_140thh">(operation, max_retries</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(max_retries):</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> operation()</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh"> TransactionError </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_mdbnqw"> &quot;deadlock&quot;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_dzsirb"> str</span><span class="__shiki_140thh">(e).lower() </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> max_retries </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                time.sleep(</span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> **</span><span class="__shiki_140thh"> attempt))  </span><span class="__shiki_21nrsd"># 指数退避</span></span>
<span class="line"><span class="__shiki_1itgoe">                continue</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> update_inventory</span><span class="__shiki_140thh">(product_id, delta):</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _operation</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_140thh">            product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Product[product_id]</span></span>
<span class="line"><span class="__shiki_140thh">            product.quantity </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> delta</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> retry_on_deadlock(_operation)</span></span></code></pre></div><h2 id="八、高级特性与扩展" tabindex="-1">八、高级特性与扩展 <a class="header-anchor" href="#八、高级特性与扩展" aria-label="Permalink to &quot;八、高级特性与扩展&quot;">​</a></h2><h3 id="_8-1-事件钩子" tabindex="-1">8.1 事件钩子 <a class="header-anchor" href="#_8-1-事件钩子" aria-label="Permalink to &quot;8.1 事件钩子&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> before_insert, after_insert, before_update, after_update</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> before_delete, after_delete</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AuditLog</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    table_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    record_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    action </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># INSERT, UPDATE, DELETE</span></span>
<span class="line"><span class="__shiki_140thh">    changes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Json)  </span><span class="__shiki_21nrsd"># 存储变更内容</span></span>
<span class="line"><span class="__shiki_140thh">    changed_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    changed_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 全局事件处理器</span></span>
<span class="line"><span class="__shiki_1t8gfj">@before_insert</span><span class="__shiki_140thh">(AuditLog)</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> audit_before_insert</span><span class="__shiki_140thh">(entity):</span></span>
<span class="line"><span class="__shiki_21nrsd">    # entity是要插入的AuditLog实例</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Before inserting audit log for </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">entity.table_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 特定实体事件</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @before_insert</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> validate_before_insert</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.price </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Price must be positive&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @after_insert</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_after_insert</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        AuditLog(</span></span>
<span class="line"><span class="__shiki_1jdh33">            table_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            record_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.id,</span></span>
<span class="line"><span class="__shiki_1jdh33">            action</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;INSERT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            changes</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.name, </span><span class="__shiki_mdbnqw">&#39;price&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.price)}</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @before_update</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> validate_before_update</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 可以访问旧值</span></span>
<span class="line"><span class="__shiki_140thh">        old_price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._old_[</span><span class="__shiki_mdbnqw">&#39;price&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.price </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> old_price </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Price cannot be reduced by more than 50%&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @after_update</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_after_update</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        changes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> attr, old_value </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._old_.items():</span></span>
<span class="line"><span class="__shiki_140thh">            new_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> getattr</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">, attr)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> old_value </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> new_value:</span></span>
<span class="line"><span class="__shiki_140thh">                changes[attr] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&#39;old&#39;</span><span class="__shiki_140thh">: old_value, </span><span class="__shiki_mdbnqw">&#39;new&#39;</span><span class="__shiki_140thh">: new_value}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> changes:</span></span>
<span class="line"><span class="__shiki_140thh">            AuditLog(</span></span>
<span class="line"><span class="__shiki_1jdh33">                table_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                record_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.id,</span></span>
<span class="line"><span class="__shiki_1jdh33">                action</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;UPDATE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                changes</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">changes</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @before_delete</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> check_before_delete</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查是否可以删除</span></span>
<span class="line"><span class="__shiki_1itgoe">        from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> datetime.now().hour </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 9</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Cannot delete products before 9 AM&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @after_delete</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> log_after_delete</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        AuditLog(</span></span>
<span class="line"><span class="__shiki_1jdh33">            table_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            record_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.id,</span></span>
<span class="line"><span class="__shiki_1jdh33">            action</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DELETE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            changes</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">._old_  </span><span class="__shiki_21nrsd"># 删除前的数据</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span></code></pre></div><h3 id="_8-2-自定义查询方法" tabindex="-1">8.2 自定义查询方法 <a class="header-anchor" href="#_8-2-自定义查询方法" aria-label="Permalink to &quot;8.2 自定义查询方法&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 实体类方法</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Customer</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Order&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> find_by_email</span><span class="__shiki_140thh">(cls, email):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;根据邮箱查找客户&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.get(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> c: c.email </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> email)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> top_spenders</span><span class="__shiki_140thh">(cls, limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取消费最高的客户&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">            (c, </span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(o.amount))</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> cls</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> c.orders</span></span>
<span class="line"><span class="__shiki_140thh">        ).group_by(c).order_by(desc(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(o.amount)))[:limit]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> search</span><span class="__shiki_140thh">(cls, keyword, country</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;搜索客户&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.select(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> c: keyword </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> c.name)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> country:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.filter(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> c: c.country </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> country)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> query[:]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_order_summary</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取客户的订单摘要&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> db.select(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                EXTRACT(YEAR FROM order_date) as year,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                COUNT(*) as order_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SUM(amount) as total_amount</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM orders</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE customer_id = $1</span></span>
<span class="line"><span class="__shiki_mdbnqw">            GROUP BY EXTRACT(YEAR FROM order_date)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ORDER BY year DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.id)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 属性装饰器</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> display_name</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;显示名称&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.email</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> order_stats</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;订单统计（延迟计算）&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> hasattr</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;_order_stats&#39;</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_order_summary()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">._order_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stats</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._order_stats</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 查询构建器模式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CustomerQueryBuilder</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.filters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.limit_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.offset_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> with_name</span><span class="__shiki_140thh">(self, name):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.filters.append(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> c: c.name </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> name)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> with_min_balance</span><span class="__shiki_140thh">(self, min_balance):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.filters.append(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> c: c.balance </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> min_balance)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> order_by_balance_desc</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.orders.append(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh">: desc(Customer.balance))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> limit</span><span class="__shiki_140thh">(self, limit):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.limit_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> limit</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> build</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Customer.select()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> filter_func </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.filters:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.filter(filter_func)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> order_func </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.orders:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.order_by(order_func())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.limit_value:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.limit(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.limit_value)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.offset_value:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.offset(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.offset_value)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> query</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_140thh">query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (CustomerQueryBuilder()</span></span>
<span class="line"><span class="__shiki_140thh">         .with_min_balance(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">         .order_by_balance_desc()</span></span>
<span class="line"><span class="__shiki_140thh">         .limit(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">         .build())</span></span>
<span class="line"><span class="__shiki_140thh">customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(query)</span></span></code></pre></div><h3 id="_8-3-数据库迁移" tabindex="-1">8.3 数据库迁移 <a class="header-anchor" href="#_8-3-数据库迁移" aria-label="Permalink to &quot;8.3 数据库迁移&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用Pony的迁移工具</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Migration</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建迁移实例</span></span>
<span class="line"><span class="__shiki_140thh">migration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Migration(db)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义迁移操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">@migration.migration</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> migration_1</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;第一次迁移：创建表和索引&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建表</span></span>
<span class="line"><span class="__shiki_140thh">    db.execute(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    CREATE TABLE IF NOT EXISTS customer (</span></span>
<span class="line"><span class="__shiki_mdbnqw">        id SERIAL PRIMARY KEY,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        name VARCHAR(100) NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        email VARCHAR(255) UNIQUE NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP</span></span>
<span class="line"><span class="__shiki_mdbnqw">    )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建索引</span></span>
<span class="line"><span class="__shiki_140thh">    db.execute(</span><span class="__shiki_mdbnqw">&quot;CREATE INDEX idx_customer_name ON customer(name)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &quot;Created customer table and indexes&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@migration.migration</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> migration_2</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;第二次迁移：添加新字段&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    db.execute(</span><span class="__shiki_mdbnqw">&quot;ALTER TABLE customer ADD COLUMN IF NOT EXISTS phone VARCHAR(20)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &quot;Added phone column to customer table&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@migration.migration</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> migration_3</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;第三次迁移：数据迁移&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 迁移现有数据</span></span>
<span class="line"><span class="__shiki_140thh">    db.execute(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    UPDATE customer </span></span>
<span class="line"><span class="__shiki_mdbnqw">    SET phone = &#39;+1234567890&#39; </span></span>
<span class="line"><span class="__shiki_mdbnqw">    WHERE phone IS NULL</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &quot;Set default phone numbers&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> run_migrations</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查当前版本</span></span>
<span class="line"><span class="__shiki_140thh">    current_version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> migration.get_current_version()</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Current database version: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">current_version</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 运行所有未应用的迁移</span></span>
<span class="line"><span class="__shiki_140thh">    applied </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> migration.apply_all()</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Applied </span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(applied)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> migrations&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或运行特定迁移</span></span>
<span class="line"><span class="__shiki_21nrsd">    # migration.apply(&#39;migration_2&#39;)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 回滚迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> rollback_migration</span><span class="__shiki_140thh">(version):</span></span>
<span class="line"><span class="__shiki_140thh">    migration.rollback(version)</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Rolled back to version </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">version</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 生成SQL脚本（不执行）</span></span>
<span class="line"><span class="__shiki_140thh">sql_script </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> migration.generate_script()</span></span>
<span class="line"><span class="__shiki_1itgoe">with</span><span class="__shiki_dzsirb"> open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;migration.sql&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;w&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> f:</span></span>
<span class="line"><span class="__shiki_140thh">    f.write(sql_script)</span></span></code></pre></div><h3 id="_8-4-多数据库支持" tabindex="-1">8.4 多数据库支持 <a class="header-anchor" href="#_8-4-多数据库支持" aria-label="Permalink to &quot;8.4 多数据库支持&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 多数据库连接</span></span>
<span class="line"><span class="__shiki_140thh">primary_db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Database()</span></span>
<span class="line"><span class="__shiki_140thh">replica_db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Database()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主数据库（写操作）</span></span>
<span class="line"><span class="__shiki_140thh">primary_db.bind(</span></span>
<span class="line"><span class="__shiki_1jdh33">    provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;primary.db.example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    database</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从数据库（读操作）</span></span>
<span class="line"><span class="__shiki_140thh">replica_db.bind(</span></span>
<span class="line"><span class="__shiki_1jdh33">    provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;replica.db.example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    database</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 读写分离装饰器</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> with_replica</span><span class="__shiki_140thh">(fallback</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;装饰器：在读操作中使用从数据库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> decorator</span><span class="__shiki_140thh">(func):</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> wrapper</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs):</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 如果是读操作，尝试使用从数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> is_read_operation(func):</span></span>
<span class="line"><span class="__shiki_1itgoe">                try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 绑定到从数据库</span></span>
<span class="line"><span class="__shiki_140thh">                    db.bind(</span></span>
<span class="line"><span class="__shiki_1jdh33">                        provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                        host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;replica.db.example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                        database</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                    result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_1itgoe">                except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> fallback:</span></span>
<span class="line"><span class="__shiki_21nrsd">                        # 失败时回退到主数据库</span></span>
<span class="line"><span class="__shiki_dzsirb">                        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Replica failed, falling back to primary: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        db.bind(</span></span>
<span class="line"><span class="__shiki_1jdh33">                            provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                            host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;primary.db.example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                            database</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        )</span></span>
<span class="line"><span class="__shiki_140thh">                        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                        raise</span></span>
<span class="line"><span class="__shiki_1itgoe">                finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 恢复主数据库连接</span></span>
<span class="line"><span class="__shiki_140thh">                    db.bind(</span></span>
<span class="line"><span class="__shiki_1jdh33">                        provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                        host</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;primary.db.example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">                        database</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;mydb&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 写操作使用主数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> func(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">args, </span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">kwargs)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> wrapper</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> decorator</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 分片数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ShardedDatabase</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, shards):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.shards </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> shards  </span><span class="__shiki_21nrsd"># 分片配置列表</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_shard</span><span class="__shiki_140thh">(self, shard_key):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;根据分片键选择数据库&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        shard_index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> hash</span><span class="__shiki_140thh">(shard_key) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.shards)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.shards[shard_index]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_customer</span><span class="__shiki_140thh">(self, customer_id):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;根据客户ID选择分片&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        shard </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.get_shard(customer_id)</span></span>
<span class="line"><span class="__shiki_140thh">        db.bind(</span><span class="__shiki_1itgoe">**</span><span class="__shiki_140thh">shard)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Customer.get(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">customer_id)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置示例</span></span>
<span class="line"><span class="__shiki_140thh">shards </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;provider&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;host&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;shard1.example.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;mydb_shard1&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;provider&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;host&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;shard2.example.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;mydb_shard2&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_mdbnqw">&#39;provider&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;postgres&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;host&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;shard3.example.com&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;database&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;mydb_shard3&#39;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">sharded_db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ShardedDatabase(shards)</span></span></code></pre></div><h2 id="九、实战案例-电商系统" tabindex="-1">九、实战案例：电商系统 <a class="header-anchor" href="#九、实战案例-电商系统" aria-label="Permalink to &quot;九、实战案例：电商系统&quot;">​</a></h2><h3 id="_9-1-完整数据模型" tabindex="-1">9.1 完整数据模型 <a class="header-anchor" href="#_9-1-完整数据模型" aria-label="Permalink to &quot;9.1 完整数据模型&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> decimal </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Decimal</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> datetime </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> datetime</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> enum </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Enum</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_1itgoe"> *</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">db </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Database()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserStatus</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    ACTIVE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;active&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    INACTIVE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;inactive&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    SUSPENDED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;suspended&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    BANNED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;banned&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OrderStatus</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    PENDING</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;pending&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    PROCESSING</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;processing&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    SHIPPED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;shipped&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    DELIVERED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;delivered&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    CANCELLED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;cancelled&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    REFUNDED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;refunded&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PaymentStatus</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    PENDING</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;pending&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    PAID</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;paid&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    FAILED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;failed&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    REFUNDED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;refunded&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 用户系统</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    password_hash </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(UserStatus, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">UserStatus.</span><span class="__shiki_dzsirb">ACTIVE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 个人信息</span></span>
<span class="line"><span class="__shiki_140thh">    first_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    last_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    phone </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    avatar_url </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">volatile</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    last_login_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 关系</span></span>
<span class="line"><span class="__shiki_140thh">    addresses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Address&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Order&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    reviews </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Review&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    cart_items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;CartItem&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 唯一索引</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;username&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 唯一索引</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 属性方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> full_name</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.first_name </span><span class="__shiki_1itgoe">and</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.last_name:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.first_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_dzsirb"> {self</span><span class="__shiki_140thh">.last_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.username</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> total_spent</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(o.total_amount </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.orders </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> o.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">DELIVERED</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 查询方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> search</span><span class="__shiki_140thh">(cls, keyword</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, min_balance</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_140thh">.select()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> keyword:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.filter(</span></span>
<span class="line"><span class="__shiki_1itgoe">                lambda</span><span class="__shiki_140thh"> u: (</span></span>
<span class="line"><span class="__shiki_140thh">                    keyword </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> u.username </span><span class="__shiki_1itgoe">or</span></span>
<span class="line"><span class="__shiki_140thh">                    keyword </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> u.email </span><span class="__shiki_1itgoe">or</span></span>
<span class="line"><span class="__shiki_140thh">                    (u.first_name </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> keyword </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> u.first_name) </span><span class="__shiki_1itgoe">or</span></span>
<span class="line"><span class="__shiki_140thh">                    (u.last_name </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> keyword </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> u.last_name)</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> status:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.filter(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> u: u.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> status)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> min_balance:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.filter(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> u: u.balance </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> min_balance)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> query.order_by(desc(</span><span class="__shiki_dzsirb">cls</span><span class="__shiki_140thh">.created_at))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 业务方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> add_balance</span><span class="__shiki_140thh">(self, amount):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> amount </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Amount must be positive&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.balance </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> amount</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录交易日志</span></span>
<span class="line"><span class="__shiki_140thh">        TransactionLog(</span></span>
<span class="line"><span class="__shiki_1jdh33">            user</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            type</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;DEPOSIT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            amount</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">amount,</span></span>
<span class="line"><span class="__shiki_1jdh33">            new_balance</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.balance</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(User)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 地址信息</span></span>
<span class="line"><span class="__shiki_140thh">    recipient_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    phone </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    address_line1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    address_line2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    city </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    country </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    postal_code </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 标志</span></span>
<span class="line"><span class="__shiki_140thh">    is_default </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    label </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 如&quot;家&quot;, &quot;办公室&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 确保每个用户只有一个默认地址</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @before_insert</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @before_update</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> ensure_single_default</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.is_default:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 将此用户的其他地址设为非默认</span></span>
<span class="line"><span class="__shiki_140thh">            Address.select(</span></span>
<span class="line"><span class="__shiki_1itgoe">                lambda</span><span class="__shiki_140thh"> a: a.user </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.user </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> a.id </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.id</span></span>
<span class="line"><span class="__shiki_140thh">            ).forEach(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> a: </span><span class="__shiki_dzsirb">setattr</span><span class="__shiki_140thh">(a, </span><span class="__shiki_mdbnqw">&#39;is_default&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 产品目录</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Category</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    parent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_mdbnqw">&#39;Category&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reverse</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;children&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    children </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Category&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">reverse</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;parent&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Product&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 树形结构排序</span></span>
<span class="line"><span class="__shiki_140thh">    display_order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 层级计算属性</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> level</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_140thh">        level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        parent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.parent</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> parent:</span></span>
<span class="line"><span class="__shiki_140thh">            level </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            parent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parent.parent</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> level</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> ancestors</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取所有祖先分类&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ancestors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        parent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.parent</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> parent:</span></span>
<span class="line"><span class="__shiki_140thh">            ancestors.append(parent)</span></span>
<span class="line"><span class="__shiki_140thh">            parent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parent.parent</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">reversed</span><span class="__shiki_140thh">(ancestors))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> descendants</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取所有后代分类&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        descendants </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> collect_children</span><span class="__shiki_140thh">(category):</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> child </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> category.children:</span></span>
<span class="line"><span class="__shiki_140thh">                descendants.append(child)</span></span>
<span class="line"><span class="__shiki_140thh">                collect_children(child)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        collect_children(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> descendants</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    sku </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(LongStr)</span></span>
<span class="line"><span class="__shiki_140thh">    short_description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定价</span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    compare_at_price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 原价/对比价格</span></span>
<span class="line"><span class="__shiki_140thh">    cost_price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 成本价</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 库存</span></span>
<span class="line"><span class="__shiki_140thh">    quantity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    low_stock_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 分类</span></span>
<span class="line"><span class="__shiki_140thh">    categories </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(Category)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 状态</span></span>
<span class="line"><span class="__shiki_140thh">    is_active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    is_featured </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    is_virtual </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 虚拟商品（如电子书）</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 元数据</span></span>
<span class="line"><span class="__shiki_140thh">    weight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 重量（kg）</span></span>
<span class="line"><span class="__shiki_140thh">    dimensions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Json)  </span><span class="__shiki_21nrsd"># 尺寸 {length, width, height}</span></span>
<span class="line"><span class="__shiki_140thh">    attributes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Json)  </span><span class="__shiki_21nrsd"># 自定义属性</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 媒体</span></span>
<span class="line"><span class="__shiki_140thh">    main_image </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    images </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Json)  </span><span class="__shiki_21nrsd"># 图片数组</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">volatile</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    published_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 关系</span></span>
<span class="line"><span class="__shiki_140thh">    variants </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;ProductVariant&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    reviews </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Review&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    order_items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;OrderItem&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    cart_items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;CartItem&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;sku&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;slug&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;is_active&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;is_featured&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;price&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 属性方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> in_stock</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> low_stock</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.low_stock_threshold</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> discount_percent</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.compare_at_price </span><span class="__shiki_1itgoe">and</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.compare_at_price </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.price:</span></span>
<span class="line"><span class="__shiki_140thh">            discount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ((</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.compare_at_price </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.price) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.compare_at_price) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> round</span><span class="__shiki_140thh">(discount, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 业务方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> reserve_quantity</span><span class="__shiki_140thh">(self, quantity):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> quantity:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Insufficient stock. Available: </span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.quantity</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">, Requested: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">quantity</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> quantity</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录库存变更</span></span>
<span class="line"><span class="__shiki_140thh">        InventoryLog(</span></span>
<span class="line"><span class="__shiki_1jdh33">            product</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            type</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;RESERVATION&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            quantity_change</span><span class="__shiki_1itgoe">=-</span><span class="__shiki_140thh">quantity,</span></span>
<span class="line"><span class="__shiki_1jdh33">            new_quantity</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.quantity</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> restore_quantity</span><span class="__shiki_140thh">(self, quantity):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> quantity</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        InventoryLog(</span></span>
<span class="line"><span class="__shiki_1jdh33">            product</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            type</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;RESTORATION&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            quantity_change</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">quantity,</span></span>
<span class="line"><span class="__shiki_1jdh33">            new_quantity</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.quantity</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ProductVariant</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Product)</span></span>
<span class="line"><span class="__shiki_140thh">    sku </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 变体属性（如颜色、尺寸）</span></span>
<span class="line"><span class="__shiki_140thh">    attributes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Json)  </span><span class="__shiki_21nrsd"># {&quot;color&quot;: &quot;red&quot;, &quot;size&quot;: &quot;L&quot;}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定价和库存（覆盖产品默认值）</span></span>
<span class="line"><span class="__shiki_140thh">    price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    quantity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 状态</span></span>
<span class="line"><span class="__shiki_140thh">    is_active </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;sku&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取最终价格（优先使用变体价格）</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> final_price</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.price </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.price </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product.price</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取最终库存</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> final_quantity</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">is</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> None</span><span class="__shiki_1itgoe"> else</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product.quantity</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 购物车</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CartItem</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(User)</span></span>
<span class="line"><span class="__shiki_140thh">    product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Product)</span></span>
<span class="line"><span class="__shiki_140thh">    variant </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(ProductVariant)</span></span>
<span class="line"><span class="__shiki_140thh">    quantity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 价格快照（添加到购物车时的价格）</span></span>
<span class="line"><span class="__shiki_140thh">    unit_price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    added_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">volatile</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;variant&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 唯一复合索引</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 计算属性</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> subtotal</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.unit_price </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.quantity</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> product_name</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.variant:</span></span>
<span class="line"><span class="__shiki_140thh">            attrs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;, &quot;</span><span class="__shiki_140thh">.join([</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">k</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">v</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> for</span><span class="__shiki_140thh"> k, v </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.variant.attributes.items()])</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.product.name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">attrs</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product.name</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 业务方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> update_quantity</span><span class="__shiki_140thh">(self, new_quantity):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> new_quantity </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.delete()  </span><span class="__shiki_21nrsd"># 数量为0时删除</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查库存</span></span>
<span class="line"><span class="__shiki_140thh">            available </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.variant.final_quantity </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.variant </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product.quantity</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> new_quantity </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> available:</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Only </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">available</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> items available&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.quantity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> new_quantity</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.now()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 订单系统</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    order_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">unique</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 显示给用户的订单号</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(User)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 状态</span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(OrderStatus, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">OrderStatus.</span><span class="__shiki_dzsirb">PENDING</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    payment_status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(PaymentStatus, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">PaymentStatus.</span><span class="__shiki_dzsirb">PENDING</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 价格信息</span></span>
<span class="line"><span class="__shiki_140thh">    subtotal </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    tax_amount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    shipping_amount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    discount_amount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    total_amount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 配送信息</span></span>
<span class="line"><span class="__shiki_140thh">    shipping_address </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Address)</span></span>
<span class="line"><span class="__shiki_140thh">    billing_address </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Address)  </span><span class="__shiki_21nrsd"># 如果与配送地址不同</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 支付信息</span></span>
<span class="line"><span class="__shiki_140thh">    payment_method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    transaction_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 支付网关交易ID</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 配送信息</span></span>
<span class="line"><span class="__shiki_140thh">    shipping_method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    tracking_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 备注</span></span>
<span class="line"><span class="__shiki_140thh">    customer_note </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    admin_note </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">volatile</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    paid_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">    shipped_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">    delivered_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">    cancelled_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 关系</span></span>
<span class="line"><span class="__shiki_140thh">    items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;OrderItem&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    payments </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Set(</span><span class="__shiki_mdbnqw">&#39;Payment&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;order_number&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;payment_status&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 生成订单号</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @before_insert</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> generate_order_number</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.order_number:</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.now().strftime(</span><span class="__shiki_mdbnqw">&#39;%Y%m</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">%H%M%S&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            random_str </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">.join(random.choices(</span><span class="__shiki_mdbnqw">&#39;ABCDEFGHIJKLMNOPQRSTUVWXYZ&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">k</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.order_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;ORD-</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">timestamp</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">-</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">random_str</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 状态转换</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> mark_as_paid</span><span class="__shiki_140thh">(self, transaction_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, payment_method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.payment_status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> PaymentStatus.</span><span class="__shiki_dzsirb">PAID</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Order already paid&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.payment_status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PaymentStatus.</span><span class="__shiki_dzsirb">PAID</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.paid_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.now()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> transaction_id:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.transaction_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> transaction_id</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> payment_method:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.payment_method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> payment_method</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录支付</span></span>
<span class="line"><span class="__shiki_140thh">        Payment(</span></span>
<span class="line"><span class="__shiki_1jdh33">            order</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">            amount</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.total_amount,</span></span>
<span class="line"><span class="__shiki_1jdh33">            method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">payment_method,</span></span>
<span class="line"><span class="__shiki_1jdh33">            transaction_id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">transaction_id,</span></span>
<span class="line"><span class="__shiki_1jdh33">            status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">PaymentStatus.</span><span class="__shiki_dzsirb">PAID</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 如果已付款，将订单状态改为处理中</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">PENDING</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">PROCESSING</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> mark_as_shipped</span><span class="__shiki_140thh">(self, tracking_number</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">, shipping_method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> [OrderStatus.</span><span class="__shiki_dzsirb">PROCESSING</span><span class="__shiki_140thh">, OrderStatus.</span><span class="__shiki_dzsirb">PENDING</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Cannot ship order in </span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.status.value</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> status&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">SHIPPED</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.shipped_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.now()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> tracking_number:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.tracking_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tracking_number</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> shipping_method:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.shipping_method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> shipping_method</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> mark_as_delivered</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">SHIPPED</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Order must be shipped before marking as delivered&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">DELIVERED</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.delivered_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.now()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">(self, reason</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> [OrderStatus.</span><span class="__shiki_dzsirb">PENDING</span><span class="__shiki_140thh">, OrderStatus.</span><span class="__shiki_dzsirb">PROCESSING</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Cannot cancel order in </span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.status.value</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> status&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">CANCELLED</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cancelled_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime.now()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 恢复库存</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.items:</span></span>
<span class="line"><span class="__shiki_140thh">            item.product.restore_quantity(item.quantity)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 退款</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.payment_status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> PaymentStatus.</span><span class="__shiki_dzsirb">PAID</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.payment_status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PaymentStatus.</span><span class="__shiki_dzsirb">REFUNDED</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.user.add_balance(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.total_amount)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 计算属性</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> item_count</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(item.quantity </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.items)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> estimated_delivery_date</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.shipped_at:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 假设配送需要3-7天</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.shipped_at </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">random.randint(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">7</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 查询方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_by_user</span><span class="__shiki_140thh">(cls, user, limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, offset</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">            o </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> cls</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> o.user </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> user</span></span>
<span class="line"><span class="__shiki_140thh">        ).order_by(desc(o.created_at)).limit(limit, offset)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">classmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_recent_orders</span><span class="__shiki_140thh">(cls, days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">, status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(o </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> cls</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> o.created_at </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> datetime.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">days))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> status:</span></span>
<span class="line"><span class="__shiki_140thh">            query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.filter(</span><span class="__shiki_1itgoe">lambda</span><span class="__shiki_140thh"> o: o.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> status)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> query.order_by(desc(o.created_at))</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OrderItem</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Order)</span></span>
<span class="line"><span class="__shiki_140thh">    product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Product)</span></span>
<span class="line"><span class="__shiki_140thh">    variant </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(ProductVariant)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 快照信息（下单时的状态）</span></span>
<span class="line"><span class="__shiki_140thh">    product_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    sku </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    unit_price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    quantity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 折扣</span></span>
<span class="line"><span class="__shiki_140thh">    discount_amount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 计算属性</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> subtotal</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.unit_price </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.quantity</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> total</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.subtotal </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.discount_amount</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 在创建订单项时保存快照</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @before_insert</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> save_snapshot</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product_name:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.product_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product.name</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.sku:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.sku </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.variant.sku </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.variant </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product.sku</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.unit_price:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.unit_price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.variant.final_price </span><span class="__shiki_1itgoe">if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.variant </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product.price</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 支付系统</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Payment</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Order)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 支付信息</span></span>
<span class="line"><span class="__shiki_140thh">    amount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    currency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;USD&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># credit_card, paypal, etc.</span></span>
<span class="line"><span class="__shiki_140thh">    transaction_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 状态</span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(PaymentStatus, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">PaymentStatus.</span><span class="__shiki_dzsirb">PENDING</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 详情</span></span>
<span class="line"><span class="__shiki_140thh">    gateway_response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Json)  </span><span class="__shiki_21nrsd"># 支付网关的原始响应</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    processed_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;transaction_id&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;order&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 评价系统</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Review</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(User)</span></span>
<span class="line"><span class="__shiki_140thh">    product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Product)</span></span>
<span class="line"><span class="__shiki_140thh">    order_item </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(OrderItem)  </span><span class="__shiki_21nrsd"># 确保只能购买后评价</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 评价内容</span></span>
<span class="line"><span class="__shiki_140thh">    rating </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 1-5</span></span>
<span class="line"><span class="__shiki_140thh">    title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    comment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 状态</span></span>
<span class="line"><span class="__shiki_140thh">    is_approved </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    is_verified_purchase </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 有帮助计数</span></span>
<span class="line"><span class="__shiki_140thh">    helpful_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    not_helpful_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(datetime)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 每个用户对每个产品只能评价一次</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;rating&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;is_approved&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 验证</span></span>
<span class="line"><span class="__shiki_1t8gfj">    @before_insert</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> validate_rating</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> &lt;=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.rating </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">            raise</span><span class="__shiki_dzsirb"> ValueError</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Rating must be between 1 and 5&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">property</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> average_rating</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 产品的平均评分</span></span>
<span class="line"><span class="__shiki_140thh">        ratings </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(r.rating </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Review </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> r.product </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.product </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> r.is_approved)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> avg(ratings) </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> ratings </span><span class="__shiki_1itgoe">else</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 库存日志</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> InventoryLog</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Product)</span></span>
<span class="line"><span class="__shiki_140thh">    variant </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(ProductVariant)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 变更信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># PURCHASE, RETURN, ADJUSTMENT, RESERVATION, etc.</span></span>
<span class="line"><span class="__shiki_140thh">    quantity_change </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 正数表示增加，负数表示减少</span></span>
<span class="line"><span class="__shiki_140thh">    new_quantity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 相关订单</span></span>
<span class="line"><span class="__shiki_140thh">    order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Order)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 备注</span></span>
<span class="line"><span class="__shiki_140thh">    notes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 操作者</span></span>
<span class="line"><span class="__shiki_140thh">    created_by </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 用户ID或系统</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;type&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 交易日志</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TransactionLog</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">db</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    id</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> PrimaryKey(</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">auto</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(User)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 交易信息</span></span>
<span class="line"><span class="__shiki_dzsirb">    type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Required(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># DEPOSIT, WITHDRAWAL, PAYMENT, REFUND</span></span>
<span class="line"><span class="__shiki_140thh">    amount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    new_balance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(Decimal, </span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 相关订单</span></span>
<span class="line"><span class="__shiki_140thh">    order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(Order)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 详情</span></span>
<span class="line"><span class="__shiki_140thh">    description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Optional(</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 时间戳</span></span>
<span class="line"><span class="__shiki_140thh">    created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Required(datetime, </span><span class="__shiki_1jdh33">default</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">datetime.now)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 索引</span></span>
<span class="line"><span class="__shiki_140thh">    indexes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;user&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;created_at&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ((</span><span class="__shiki_mdbnqw">&#39;type&#39;</span><span class="__shiki_140thh">,), </span><span class="__shiki_dzsirb">False</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 初始化数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> init_database</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    db.bind(</span><span class="__shiki_1jdh33">provider</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;sqlite&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">filename</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;ecommerce.db&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">create_db</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    db.generate_mapping(</span><span class="__shiki_1jdh33">create_tables</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 创建初始数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建默认分类</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> Category.exists():</span></span>
<span class="line"><span class="__shiki_140thh">            electronics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Category(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Electronics&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;electronics&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            books </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Category(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Books&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;books&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            clothing </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Category(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Clothing&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;clothing&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 子分类</span></span>
<span class="line"><span class="__shiki_140thh">            Category(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Smartphones&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;smartphones&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">parent</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">electronics)</span></span>
<span class="line"><span class="__shiki_140thh">            Category(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Laptops&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;laptops&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">parent</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">electronics)</span></span>
<span class="line"><span class="__shiki_140thh">            Category(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Fiction&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;fiction&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">parent</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">books)</span></span>
<span class="line"><span class="__shiki_140thh">            Category(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;Non-Fiction&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slug</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;non-fiction&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">parent</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">books)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        commit()</span></span></code></pre></div><h3 id="_9-2-复杂查询示例" tabindex="-1">9.2 复杂查询示例 <a class="header-anchor" href="#_9-2-复杂查询示例" aria-label="Permalink to &quot;9.2 复杂查询示例&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_dashboard_stats</span><span class="__shiki_140thh">(start_date, end_date):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;获取仪表板统计信息&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 销售额统计</span></span>
<span class="line"><span class="__shiki_140thh">    sales_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.select(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            DATE(created_at) as date,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            COUNT(*) as order_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SUM(total_amount) as revenue,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            AVG(total_amount) as avg_order_value</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM orders</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE created_at BETWEEN $start_date AND $end_date</span></span>
<span class="line"><span class="__shiki_mdbnqw">            AND status != &#39;cancelled&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        GROUP BY DATE(created_at)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY date</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date, </span><span class="__shiki_1jdh33">end_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 产品销量排行</span></span>
<span class="line"><span class="__shiki_140thh">    top_products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.select(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            p.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            p.name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            p.sku,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SUM(oi.quantity) as total_quantity,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SUM(oi.unit_price * oi.quantity) as total_revenue,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            COUNT(DISTINCT o.id) as order_count</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM order_items oi</span></span>
<span class="line"><span class="__shiki_mdbnqw">        JOIN orders o ON oi.order_id = o.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        JOIN products p ON oi.product_id = p.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE o.created_at BETWEEN $start_date AND $end_date</span></span>
<span class="line"><span class="__shiki_mdbnqw">            AND o.status != &#39;cancelled&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        GROUP BY p.id, p.name, p.sku</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY total_quantity DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">        LIMIT 10</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date, </span><span class="__shiki_1jdh33">end_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 客户统计</span></span>
<span class="line"><span class="__shiki_140thh">    customer_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.select(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            COUNT(DISTINCT user_id) as total_customers,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            COUNT(DISTINCT CASE WHEN created_at BETWEEN $start_date AND $end_date </span></span>
<span class="line"><span class="__shiki_mdbnqw">                THEN user_id END) as new_customers,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            COUNT(DISTINCT CASE WHEN last_login_at BETWEEN $start_date AND $end_date </span></span>
<span class="line"><span class="__shiki_mdbnqw">                THEN user_id END) as active_customers</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM users</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date, </span><span class="__shiki_1jdh33">end_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 库存预警</span></span>
<span class="line"><span class="__shiki_140thh">    low_stock_products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">        (p.id, p.name, p.sku, p.quantity, p.low_stock_threshold)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> p.quantity </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> p.low_stock_threshold </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> p.quantity </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    ).order_by(p.quantity)[:</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用Pony的生成器表达式进行复杂查询</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 查找高价值客户（最近30天消费超过1000）</span></span>
<span class="line"><span class="__shiki_140thh">    high_value_customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">        (u.id, u.username, u.email, </span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(o.total_amount))</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> u </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> User</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> u.orders</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> o.created_at </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> datetime.now() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        and</span><span class="__shiki_140thh"> o.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">DELIVERED</span></span>
<span class="line"><span class="__shiki_140thh">    ).group_by(u.id, u.username, u.email).having(</span><span class="__shiki_dzsirb">sum</span><span class="__shiki_140thh">(o.total_amount) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;sales_stats&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(sales_stats),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;top_products&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(top_products),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;customer_stats&#39;</span><span class="__shiki_140thh">: customer_stats.first(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;low_stock_products&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(low_stock_products),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;high_value_customers&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(high_value_customers)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> get_product_recommendations</span><span class="__shiki_140thh">(user_id, limit</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;基于协同过滤的产品推荐&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取用户购买过的产品</span></span>
<span class="line"><span class="__shiki_140thh">    user_products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">        oi.product.id</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> oi </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> o.items</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> o.user.id </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> user_id</span></span>
<span class="line"><span class="__shiki_1itgoe">        and</span><span class="__shiki_140thh"> o.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">DELIVERED</span></span>
<span class="line"><span class="__shiki_140thh">    )[:]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> user_products:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 如果用户没有购买记录，返回热门产品</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">            p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> p.is_active</span></span>
<span class="line"><span class="__shiki_140thh">        ).order_by(desc(</span></span>
<span class="line"><span class="__shiki_140thh">            select(avg(r.rating) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Review </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> r.product </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> r.is_approved)</span></span>
<span class="line"><span class="__shiki_140thh">        ))[:limit]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 查找购买了相同产品的其他用户</span></span>
<span class="line"><span class="__shiki_140thh">    similar_users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">        distinct(o.user.id)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> oi </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> o.items</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> oi.product.id </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> user_products</span></span>
<span class="line"><span class="__shiki_1itgoe">        and</span><span class="__shiki_140thh"> o.user.id </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> user_id</span></span>
<span class="line"><span class="__shiki_1itgoe">        and</span><span class="__shiki_140thh"> o.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">DELIVERED</span></span>
<span class="line"><span class="__shiki_140thh">    )[:</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 限制数量</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取这些用户购买的其他产品</span></span>
<span class="line"><span class="__shiki_140thh">    recommended_products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(</span></span>
<span class="line"><span class="__shiki_140thh">        distinct(oi.product)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> o </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> oi </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> o.items</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> o.user.id </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> similar_users</span></span>
<span class="line"><span class="__shiki_1itgoe">        and</span><span class="__shiki_140thh"> oi.product.id </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> user_products</span></span>
<span class="line"><span class="__shiki_1itgoe">        and</span><span class="__shiki_140thh"> o.status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> OrderStatus.</span><span class="__shiki_dzsirb">DELIVERED</span></span>
<span class="line"><span class="__shiki_1itgoe">        and</span><span class="__shiki_140thh"> oi.product.is_active</span></span>
<span class="line"><span class="__shiki_140thh">    ).order_by(desc(</span></span>
<span class="line"><span class="__shiki_140thh">        select(count(distinct(o2.user.id)) </span></span>
<span class="line"><span class="__shiki_1itgoe">               for</span><span class="__shiki_140thh"> o2 </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Order </span></span>
<span class="line"><span class="__shiki_1itgoe">               for</span><span class="__shiki_140thh"> oi2 </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> o2.items </span></span>
<span class="line"><span class="__shiki_1itgoe">               if</span><span class="__shiki_140thh"> oi2.product </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> oi.product)</span></span>
<span class="line"><span class="__shiki_140thh">    ))[:limit]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(recommended_products)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> generate_sales_report</span><span class="__shiki_140thh">(year, month</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">None</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;生成销售报告&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 构建时间范围</span></span>
<span class="line"><span class="__shiki_140thh">    start_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime(year, month </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> month:</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> month </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            end_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime(year </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            end_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime(year, month </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        end_date </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> datetime(year </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> timedelta(</span><span class="__shiki_1jdh33">days</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用窗口函数计算月度趋势</span></span>
<span class="line"><span class="__shiki_140thh">    monthly_trends </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.select(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WITH monthly_sales AS (</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                EXTRACT(YEAR FROM o.created_at) as year,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                EXTRACT(MONTH FROM o.created_at) as month,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                COUNT(*) as order_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SUM(o.total_amount) as revenue,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                AVG(o.total_amount) as avg_order_value,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                COUNT(DISTINCT o.user_id) as customer_count</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM orders o</span></span>
<span class="line"><span class="__shiki_mdbnqw">            WHERE o.created_at BETWEEN $start_date AND $end_date</span></span>
<span class="line"><span class="__shiki_mdbnqw">                AND o.status != &#39;cancelled&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            GROUP BY EXTRACT(YEAR FROM o.created_at), EXTRACT(MONTH FROM o.created_at)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            *,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            revenue - LAG(revenue) OVER (ORDER BY year, month) as revenue_change,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ROUND(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                (revenue - LAG(revenue) OVER (ORDER BY year, month)) * 100.0 </span></span>
<span class="line"><span class="__shiki_mdbnqw">                / NULLIF(LAG(revenue) OVER (ORDER BY year, month), 0), </span></span>
<span class="line"><span class="__shiki_mdbnqw">                2</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ) as revenue_change_percent</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM monthly_sales</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY year, month</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date, </span><span class="__shiki_1jdh33">end_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 产品类别销售分布</span></span>
<span class="line"><span class="__shiki_140thh">    category_sales </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.select(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            c.name as category_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            COUNT(DISTINCT o.id) as order_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SUM(oi.unit_price * oi.quantity) as revenue,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SUM(oi.quantity) as quantity_sold</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM order_items oi</span></span>
<span class="line"><span class="__shiki_mdbnqw">        JOIN orders o ON oi.order_id = o.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        JOIN products p ON oi.product_id = p.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        JOIN product_category pc ON p.id = pc.product_id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        JOIN categories c ON pc.category_id = c.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE o.created_at BETWEEN $start_date AND $end_date</span></span>
<span class="line"><span class="__shiki_mdbnqw">            AND o.status != &#39;cancelled&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        GROUP BY c.id, c.name</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY revenue DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date, </span><span class="__shiki_1jdh33">end_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 客户分层分析</span></span>
<span class="line"><span class="__shiki_140thh">    customer_segments </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.select(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WITH customer_stats AS (</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">                u.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                u.username,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                u.email,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                COUNT(o.id) as order_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                SUM(o.total_amount) as total_spent,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                MIN(o.created_at) as first_order_date,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                MAX(o.created_at) as last_order_date</span></span>
<span class="line"><span class="__shiki_mdbnqw">            FROM users u</span></span>
<span class="line"><span class="__shiki_mdbnqw">            LEFT JOIN orders o ON u.id = o.user_id </span></span>
<span class="line"><span class="__shiki_mdbnqw">                AND o.status != &#39;cancelled&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                AND o.created_at BETWEEN $start_date AND $end_date</span></span>
<span class="line"><span class="__shiki_mdbnqw">            GROUP BY u.id, u.username, u.email</span></span>
<span class="line"><span class="__shiki_mdbnqw">        )</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            CASE </span></span>
<span class="line"><span class="__shiki_mdbnqw">                WHEN total_spent &gt; 1000 THEN &#39;VIP&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                WHEN total_spent &gt; 500 THEN &#39;Premium&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                WHEN total_spent &gt; 100 THEN &#39;Regular&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ELSE &#39;New&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            END as segment,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            COUNT(*) as customer_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            AVG(total_spent) as avg_spent,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            AVG(order_count) as avg_orders,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            SUM(total_spent) as segment_revenue</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM customer_stats</span></span>
<span class="line"><span class="__shiki_mdbnqw">        GROUP BY segment</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ORDER BY segment_revenue DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">start_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">start_date, </span><span class="__shiki_1jdh33">end_date</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">end_date)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;monthly_trends&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(monthly_trends),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;category_sales&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(category_sales),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;customer_segments&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(customer_segments),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;report_period&#39;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;start_date&#39;</span><span class="__shiki_140thh">: start_date,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;end_date&#39;</span><span class="__shiki_140thh">: end_date,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;year&#39;</span><span class="__shiki_140thh">: year,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;month&#39;</span><span class="__shiki_140thh">: month</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span></code></pre></div><h2 id="十、性能监控与调试" tabindex="-1">十、性能监控与调试 <a class="header-anchor" href="#十、性能监控与调试" aria-label="Permalink to &quot;十、性能监控与调试&quot;">​</a></h2><h3 id="_10-1-sql调试" tabindex="-1">10.1 SQL调试 <a class="header-anchor" href="#_10-1-sql调试" aria-label="Permalink to &quot;10.1 SQL调试&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用SQL调试</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> pony.orm.sql_debugging</span></span>
<span class="line"><span class="__shiki_140thh">pony.orm.sql_debugging.enable()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用环境变量</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> os</span></span>
<span class="line"><span class="__shiki_140thh">os.environ[</span><span class="__shiki_mdbnqw">&#39;PONY_DEBUG&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;1&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 统计查询性能</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> show_cache_stats, show_db_stats</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@db_session</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> profile_query</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 显示缓存统计</span></span>
<span class="line"><span class="__shiki_140thh">    show_cache_stats()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 显示数据库统计</span></span>
<span class="line"><span class="__shiki_140thh">    show_db_stats()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 执行查询</span></span>
<span class="line"><span class="__shiki_140thh">    customers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">)[:]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 再次显示统计</span></span>
<span class="line"><span class="__shiki_140thh">    show_cache_stats()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用性能分析器</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> cProfile</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> pstats</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> profile_orm_operations</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;性能分析ORM操作&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    profiler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cProfile.Profile()</span></span>
<span class="line"><span class="__shiki_140thh">    profiler.enable()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 执行需要分析的代码</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_140thh">            Customer(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;Test</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&#39;test</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">i</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">@example.com&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        commit()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    profiler.disable()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 保存分析结果</span></span>
<span class="line"><span class="__shiki_140thh">    stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pstats.Stats(profiler)</span></span>
<span class="line"><span class="__shiki_140thh">    stats.sort_stats(</span><span class="__shiki_mdbnqw">&#39;cumulative&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    stats.print_stats(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 显示前20个最耗时的函数</span></span></code></pre></div><h3 id="_10-2-查询计划分析" tabindex="-1">10.2 查询计划分析 <a class="header-anchor" href="#_10-2-查询计划分析" aria-label="Permalink to &quot;10.2 查询计划分析&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> analyze_query_plan</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;分析查询执行计划&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取查询的SQL</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    sql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.get_sql()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Generated SQL:&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(sql)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 获取执行计划（PostgreSQL）</span></span>
<span class="line"><span class="__shiki_140thh">    explain_query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> f</span><span class="__shiki_mdbnqw">&quot;EXPLAIN ANALYZE </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">sql</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_140thh">        plan </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.select(explain_query)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> row </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> plan:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(row[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用Pony的调试功能</span></span>
<span class="line"><span class="__shiki_1itgoe">    from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> raw_sql</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 跟踪查询执行</span></span>
<span class="line"><span class="__shiki_1itgoe">    with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录查询开始时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_140thh">        start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 执行查询</span></span>
<span class="line"><span class="__shiki_140thh">        result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(query)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算执行时间</span></span>
<span class="line"><span class="__shiki_140thh">        elapsed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Query took </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">elapsed</span><span class="__shiki_1itgoe">:.3f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> seconds&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Returned </span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(result)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> rows&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 使用raw_sql执行自定义分析</span></span>
<span class="line"><span class="__shiki_140thh">        analyze_sql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">            relname as table_name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            seq_scan,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            seq_tup_read,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            idx_scan,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            idx_tup_fetch</span></span>
<span class="line"><span class="__shiki_mdbnqw">        FROM pg_stat_user_tables</span></span>
<span class="line"><span class="__shiki_mdbnqw">        WHERE relname IN (&#39;customer&#39;, &#39;orders&#39;, &#39;products&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db.select(analyze_sql)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">Table Statistics:&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> stat </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> stats:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">stat.table_name</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">: seq_scan=</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">stat.seq_scan</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">, idx_scan=</span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">stat.idx_scan</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_10-3-连接池与资源管理" tabindex="-1">10.3 连接池与资源管理 <a class="header-anchor" href="#_10-3-连接池与资源管理" aria-label="Permalink to &quot;10.3 连接池与资源管理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> pony.orm </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> db_session, commit</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> threading</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> queue</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConnectionPool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;自定义连接池&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, max_connections</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.max_connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> max_connections</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queue.Queue(</span><span class="__shiki_1jdh33">maxsize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">max_connections)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._lock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> threading.Lock()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_connection</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;获取数据库连接&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 从队列获取连接</span></span>
<span class="line"><span class="__shiki_140thh">            conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._connections.get_nowait()</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> conn</span></span>
<span class="line"><span class="__shiki_1itgoe">        except</span><span class="__shiki_140thh"> queue.Empty:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 创建新连接</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._lock:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._connections.qsize() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.max_connections:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 创建新连接</span></span>
<span class="line"><span class="__shiki_140thh">                    conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> db._get_connection()</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> conn</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 等待连接释放</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._connections.get()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> release_connection</span><span class="__shiki_140thh">(self, conn):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;释放连接回池中&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._connections.put(conn)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> close_all</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;关闭所有连接&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._connections.empty():</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._connections.get_nowait()</span></span>
<span class="line"><span class="__shiki_140thh">                conn.close()</span></span>
<span class="line"><span class="__shiki_1itgoe">            except</span><span class="__shiki_140thh"> queue.Empty:</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用连接上下文管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConnectionContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, pool):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.pool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> pool</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __enter__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.conn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.pool.get_connection()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.conn</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __exit__</span><span class="__shiki_140thh">(self, exc_type, exc_val, exc_tb):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.conn:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.pool.release_connection(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.conn)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 异步支持</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> asyncio</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> concurrent.futures </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> ThreadPoolExecutor</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AsyncPony</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;Pony ORM的异步包装器&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, max_workers</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.executor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ThreadPoolExecutor(</span><span class="__shiki_1jdh33">max_workers</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">max_workers)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.loop </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> asyncio.get_event_loop()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> execute_query</span><span class="__shiki_140thh">(self, query_func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;异步执行查询&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.loop.run_in_executor(</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.executor, </span></span>
<span class="line"><span class="__shiki_140thh">            query_func</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> fetch_all</span><span class="__shiki_140thh">(self, query):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;异步获取所有结果&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> _fetch</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> list</span><span class="__shiki_140thh">(query)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.execute_query(_fetch)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> fetch_one</span><span class="__shiki_140thh">(self, query):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;异步获取单个结果&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> _fetch</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> query.first()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.execute_query(_fetch)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> execute_update</span><span class="__shiki_140thh">(self, update_func):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;异步执行更新操作&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> _update</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_140thh"> db_session:</span></span>
<span class="line"><span class="__shiki_140thh">                result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update_func()</span></span>
<span class="line"><span class="__shiki_140thh">                commit()</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.execute_query(_update)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_140thh">    pony_async </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AsyncPony()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 并行执行多个查询</span></span>
<span class="line"><span class="__shiki_140thh">    query1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(c </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> c </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Customer </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> c.age </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 18</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    query2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> select(p </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> p </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> p.price </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> asyncio.gather(</span></span>
<span class="line"><span class="__shiki_140thh">        pony_async.fetch_all(query1),</span></span>
<span class="line"><span class="__shiki_140thh">        pony_async.fetch_all(query2)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    customers, products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> results</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Found </span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(customers)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> customers and </span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(products)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> products&quot;</span><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Pony ORM 提供了强大而优雅的查询功能，其核心优势在于：</p><ol><li><strong>Pythonic语法</strong>：使用生成器表达式构建查询，代码简洁易读</li><li><strong>高级查询功能</strong>：支持窗口函数、CTE、JSON查询等高级特性</li><li><strong>智能优化</strong>：自动优化N+1查询，提高性能</li><li><strong>事务管理</strong>：自动事务管理，简化并发控制</li><li><strong>类型安全</strong>：完整的类型注解支持</li></ol><p>对于需要复杂查询和分析的应用，Pony ORM是一个优秀的选择。通过学习本笔记的内容，您应该能够：</p><ul><li>掌握Pony ORM的基本用法和高级特性</li><li>构建复杂的数据模型和查询</li><li>优化查询性能，处理大数据量</li><li>实现事务和并发控制</li><li>构建生产级的应用系统</li></ul><p>Pony ORM的学习曲线相对较陡，但一旦掌握，将大大提升开发效率和代码质量。</p>`,79)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
