import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Ent 框架学习笔记：图驱动的现代 Go ORM","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/go/ent.md","filePath":"data/access/orm/go/ent.md"}'),p={name:"data/access/orm/go/ent.md"};function h(l,s,t,c,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="ent-框架学习笔记-图驱动的现代-go-orm" tabindex="-1">Ent 框架学习笔记：图驱动的现代 Go ORM <a class="header-anchor" href="#ent-框架学习笔记-图驱动的现代-go-orm" aria-label="Permalink to &quot;Ent 框架学习笔记：图驱动的现代 Go ORM&quot;">​</a></h1><h2 id="_1-ent-概述-设计理念与核心优势" tabindex="-1">1. Ent 概述：设计理念与核心优势 <a class="header-anchor" href="#_1-ent-概述-设计理念与核心优势" aria-label="Permalink to &quot;1. Ent 概述：设计理念与核心优势&quot;">​</a></h2><h3 id="_1-1-什么是-ent" tabindex="-1">1.1 什么是 Ent？ <a class="header-anchor" href="#_1-1-什么是-ent" aria-label="Permalink to &quot;1.1 什么是 Ent？&quot;">​</a></h3><p>Ent（发音 &quot;ent&quot;）是 Facebook 开源的一款<strong>实体框架</strong>，专为 Go 语言设计。它采用<strong>代码生成</strong>（而非反射）的方式，让开发者能够以<strong>图结构</strong>（Graph）的形式定义数据模型，并生成类型安全、易于使用的 Go 代码。Ent 的核心思想是 &quot;Schema as Code&quot;。</p><h3 id="_1-2-核心设计哲学" tabindex="-1">1.2 核心设计哲学 <a class="header-anchor" href="#_1-2-核心设计哲学" aria-label="Permalink to &quot;1.2 核心设计哲学&quot;">​</a></h3><ol><li><strong>图即代码</strong>：数据模型被抽象为节点（实体）和边（关系）组成的图结构，这种抽象更贴近现实世界的复杂关系。</li><li><strong>类型安全</strong>：通过代码生成实现 100% 类型安全的 API，编译时即可发现错误，无需运行时反射。</li><li><strong>静态检查</strong>：所有查询在编译时检查，避免 SQL 注入和运行时错误。</li><li><strong>高性能</strong>：生成的代码直接操作数据库，没有反射开销。</li><li><strong>可扩展性</strong>：通过自定义模板、注解、钩子和隐私层，可以轻松扩展框架功能。</li></ol><h3 id="_1-3-ent-vs-gorm-vs-标准库" tabindex="-1">1.3 Ent vs GORM vs 标准库 <a class="header-anchor" href="#_1-3-ent-vs-gorm-vs-标准库" aria-label="Permalink to &quot;1.3 Ent vs GORM vs 标准库&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>Ent</th><th>GORM</th><th>标准库 <code>database/sql</code></th></tr></thead><tbody><tr><td>类型安全</td><td>✅ 100% 编译时</td><td>⚠️ 部分运行时</td><td>❌ 无</td></tr><tr><td>性能</td><td>✅ 代码生成，无反射</td><td>⚠️ 使用反射</td><td>✅ 直接</td></tr><tr><td>图结构支持</td><td>✅ 原生</td><td>❌ 需要额外设计</td><td>❌ 无</td></tr><tr><td>迁移</td><td>✅ 内置</td><td>✅ 内置</td><td>❌ 手动</td></tr><tr><td>学习曲线</td><td>📈 较陡峭</td><td>📈 中等</td><td>📈 平坦</td></tr><tr><td>代码生成</td><td>✅ 必需</td><td>❌ 可选</td><td>❌ 无</td></tr><tr><td>隐私层</td><td>✅ 内置</td><td>❌ 无</td><td>❌ 无</td></tr></tbody></table><h2 id="_2-ent-核心概念-图结构建模" tabindex="-1">2. Ent 核心概念：图结构建模 <a class="header-anchor" href="#_2-ent-核心概念-图结构建模" aria-label="Permalink to &quot;2. Ent 核心概念：图结构建模&quot;">​</a></h2><h3 id="_2-1-实体-entity-与模式-schema" tabindex="-1">2.1 实体（Entity）与模式（Schema） <a class="header-anchor" href="#_2-1-实体-entity-与模式-schema" aria-label="Permalink to &quot;2.1 实体（Entity）与模式（Schema）&quot;">​</a></h3><p>在 Ent 中，每个<strong>实体</strong>对应数据库中的一张表，通过<strong>模式</strong>（Schema）定义。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// ent/schema/user.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> schema</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">entgo.io/ent</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">entgo.io/ent/schema/field</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">entgo.io/ent/schema/edge</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">entgo.io/ent/schema/mixin</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// User 实体定义</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Schema</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Mixins 可以嵌入公共字段和行为</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Mixin</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mixin</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mixin</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1t8gfj">        mixin</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">{},  </span><span class="__shiki_21nrsd">// 添加 created_at, updated_at 字段</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Fields 定义实体的字段（表的列）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Fields</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Field</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Field</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Unique</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">            MaxLen</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            NotEmpty</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Unique</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Match</span><span class="__shiki_140thh">(regexp.</span><span class="__shiki_1t8gfj">MustCompile</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$\`</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Int</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Positive</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Optional</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Nillable</span><span class="__shiki_140thh">(),  </span><span class="__shiki_21nrsd">// 允许显式设置为 nil</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Values</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;inactive&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;suspended&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Default</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">JSON</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;metadata&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}{}).  </span><span class="__shiki_21nrsd">// JSON 字段</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Optional</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Edges 定义实体之间的关系（外键）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Edges</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Edge</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Edge</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 用户有多张信用卡（一对多）</span></span>
<span class="line"><span class="__shiki_140thh">        edge.</span><span class="__shiki_1t8gfj">To</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cards&quot;</span><span class="__shiki_140thh">, Card.Type),</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 用户属于一个部门（多对一）</span></span>
<span class="line"><span class="__shiki_140thh">        edge.</span><span class="__shiki_1t8gfj">From</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;department&quot;</span><span class="__shiki_140thh">, Department.Type).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Ref</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;users&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Unique</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 用户可以有多个朋友（多对多）</span></span>
<span class="line"><span class="__shiki_140thh">        edge.</span><span class="__shiki_1t8gfj">To</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;friends&quot;</span><span class="__shiki_140thh">, User.Type).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Through</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;friendships&quot;</span><span class="__shiki_140thh">, Friendship.Type),</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 用户可以有多个角色（多对多）</span></span>
<span class="line"><span class="__shiki_140thh">        edge.</span><span class="__shiki_1t8gfj">From</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;groups&quot;</span><span class="__shiki_140thh">, Group.Type).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Ref</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;users&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Indexes 定义数据库索引</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Indexes</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Index</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Index</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        index.</span><span class="__shiki_1t8gfj">Fields</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd">// 复合索引</span></span>
<span class="line"><span class="__shiki_140thh">        index.</span><span class="__shiki_1t8gfj">Fields</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Edges</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;department&quot;</span><span class="__shiki_140thh">),        </span><span class="__shiki_21nrsd">// 跨边索引</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-关系-edge-类型详解" tabindex="-1">2.2 关系（Edge）类型详解 <a class="header-anchor" href="#_2-2-关系-edge-类型详解" aria-label="Permalink to &quot;2.2 关系（Edge）类型详解&quot;">​</a></h3><p>Ent 支持四种基本关系类型，与图论概念对应：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. O2M（一对多）：用户 -&gt; 帖子</span></span>
<span class="line"><span class="__shiki_140thh">edge.</span><span class="__shiki_1t8gfj">To</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;posts&quot;</span><span class="__shiki_140thh">, Post.Type)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. M2O（多对一）：帖子 -&gt; 用户  </span></span>
<span class="line"><span class="__shiki_140thh">edge.</span><span class="__shiki_1t8gfj">From</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;author&quot;</span><span class="__shiki_140thh">, User.Type).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Ref</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;posts&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Unique</span><span class="__shiki_140thh">()  </span><span class="__shiki_21nrsd">// 每个帖子只有一个作者</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. O2O（一对一）：用户 -&gt; 资料</span></span>
<span class="line"><span class="__shiki_140thh">edge.</span><span class="__shiki_1t8gfj">To</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;profile&quot;</span><span class="__shiki_140thh">, Profile.Type).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Unique</span><span class="__shiki_140thh">()  </span><span class="__shiki_21nrsd">// 确保一对一</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. M2M（多对多）：用户 &lt;-&gt; 群组</span></span>
<span class="line"><span class="__shiki_21nrsd">// 方式1：直接 M2M（自动创建中间表）</span></span>
<span class="line"><span class="__shiki_140thh">edge.</span><span class="__shiki_1t8gfj">To</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;groups&quot;</span><span class="__shiki_140thh">, Group.Type)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方式2：显式中间实体（可以添加额外字段）</span></span>
<span class="line"><span class="__shiki_140thh">edge.</span><span class="__shiki_1t8gfj">To</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user_groups&quot;</span><span class="__shiki_140thh">, UserGroup.Type).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    From</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ent/schema/usergroup.go</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> UserGroup</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Schema</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">UserGroup</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Fields</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Field</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Field</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;joined_at&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Default</span><span class="__shiki_140thh">(time.Now),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;role&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Default</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;member&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">UserGroup</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Edges</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Edge</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Edge</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        edge.</span><span class="__shiki_1t8gfj">From</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">, User.Type).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Ref</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user_groups&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Unique</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        edge.</span><span class="__shiki_1t8gfj">From</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;group&quot;</span><span class="__shiki_140thh">, Group.Type).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Ref</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user_groups&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Unique</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-字段类型与验证" tabindex="-1">2.3 字段类型与验证 <a class="header-anchor" href="#_2-3-字段类型与验证" aria-label="Permalink to &quot;2.3 字段类型与验证&quot;">​</a></h3><p>Ent 提供了丰富的字段类型和验证器：</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Fields</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Field</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Field</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基础类型</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Bool</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">Default</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Int</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">Range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Float</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;score&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">Min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0.0</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">Max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100.0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;title&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">NotEmpty</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;birthday&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">Optional</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 特殊类型</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">UUID</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">, uuid.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">()).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Default</span><span class="__shiki_140thh">(uuid.New),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;priority&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Values</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;low&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;medium&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;high&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Bytes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;avatar&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">MaxLen</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// 1MB</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // JSON 类型（支持自定义 Go 类型）</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">JSON</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;address&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">Address</span><span class="__shiki_140thh">{}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Optional</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">JSON</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tags&quot;</span><span class="__shiki_140thh">, []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{}).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Default</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{}),</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 自定义类型（需要实现 ValueScanner 接口）</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Other</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;duration&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">{}),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义类型示例</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> Duration</span><span class="__shiki_1t8gfj"> time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">d </span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">() (</span><span class="__shiki_1t8gfj">driver</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(d).</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">d </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Scan</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh">{}) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> v </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> value.(</span><span class="__shiki_1itgoe">type</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        dur, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">ParseDuration</span><span class="__shiki_140thh">(v)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        *</span><span class="__shiki_140thh">d </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> Duration</span><span class="__shiki_140thh">(dur)</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> d.</span><span class="__shiki_1t8gfj">Scan</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(v))</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;unexpected type </span><span class="__shiki_dzsirb">%T</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, value)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-代码生成与配置" tabindex="-1">3. 代码生成与配置 <a class="header-anchor" href="#_3-代码生成与配置" aria-label="Permalink to &quot;3. 代码生成与配置&quot;">​</a></h2><h3 id="_3-1-生成代码" tabindex="-1">3.1 生成代码 <a class="header-anchor" href="#_3-1-生成代码" aria-label="Permalink to &quot;3.1 生成代码&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 初始化项目</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> mod</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_mdbnqw"> myapp</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> entgo.io/ent/cmd/ent</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建第一个实体</span></span>
<span class="line"><span class="__shiki_1t8gfj">ent</span><span class="__shiki_mdbnqw"> init</span><span class="__shiki_mdbnqw"> User</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 编辑 schema 后生成代码</span></span>
<span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> generate</span><span class="__shiki_mdbnqw"> ./ent</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或直接使用</span></span>
<span class="line"><span class="__shiki_1t8gfj">ent</span><span class="__shiki_mdbnqw"> generate</span><span class="__shiki_mdbnqw"> ./ent/schema</span></span></code></pre></div><h3 id="_3-2-配置生成选项" tabindex="-1">3.2 配置生成选项 <a class="header-anchor" href="#_3-2-配置生成选项" aria-label="Permalink to &quot;3.2 配置生成选项&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// ent/generate.go</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> ent</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">//go:generate go run -mod=mod entgo.io/ent/cmd/ent generate ./schema --feature sql/upsert --feature sql/execquery --feature sql/lock --feature privacy --feature entql --feature schema/snapshot</span></span></code></pre></div><h3 id="_3-3-生成的代码结构" tabindex="-1">3.3 生成的代码结构 <a class="header-anchor" href="#_3-3-生成的代码结构" aria-label="Permalink to &quot;3.3 生成的代码结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">ent/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── client.go          # 数据库客户端</span></span>
<span class="line"><span class="__shiki_wvjl67">├── config.go          # 配置</span></span>
<span class="line"><span class="__shiki_wvjl67">├── context.go         # 上下文工具</span></span>
<span class="line"><span class="__shiki_wvjl67">├── ent.go             # 包导出</span></span>
<span class="line"><span class="__shiki_wvjl67">├── hook/              # 钩子函数</span></span>
<span class="line"><span class="__shiki_wvjl67">├── migrate/           # 迁移相关</span></span>
<span class="line"><span class="__shiki_wvjl67">├── mutation.go        # 变更操作</span></span>
<span class="line"><span class="__shiki_wvjl67">├── predicate/         # 谓词（查询条件）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── runtime/           # 运行时信息</span></span>
<span class="line"><span class="__shiki_wvjl67">├── schema/            # 模式定义</span></span>
<span class="line"><span class="__shiki_wvjl67">├── tx.go              # 事务</span></span>
<span class="line"><span class="__shiki_wvjl67">├── user/              # 生成的 User 实体代码</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── user.go        # 实体定义</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── where.go       # 查询条件</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── create.go      # 创建操作</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── ...</span></span>
<span class="line"><span class="__shiki_wvjl67">└── ...                # 其他实体</span></span></code></pre></div><h2 id="_4-基础操作-crud" tabindex="-1">4. 基础操作：CRUD <a class="header-anchor" href="#_4-基础操作-crud" aria-label="Permalink to &quot;4. 基础操作：CRUD&quot;">​</a></h2><h3 id="_4-1-客户端初始化" tabindex="-1">4.1 客户端初始化 <a class="header-anchor" href="#_4-1-客户端初始化" aria-label="Permalink to &quot;4.1 客户端初始化&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">myapp/ent</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">myapp/ent/migrate</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/mattn/go-sqlite3</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/lib/pq</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_21nrsd">          // PostgreSQL</span></span>
<span class="line"><span class="__shiki_140thh">    _ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1t8gfj">github.com/go-sql-driver/mysql</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_21nrsd"> // MySQL</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建客户端</span></span>
<span class="line"><span class="__shiki_140thh">    client, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ent.</span><span class="__shiki_1t8gfj">Open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;sqlite3&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;file:ent?mode=memory&amp;cache=shared&amp;_fk=1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动迁移</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client.Schema.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        ctx,</span></span>
<span class="line"><span class="__shiki_140thh">        migrate.</span><span class="__shiki_1t8gfj">WithDropIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">),   </span><span class="__shiki_21nrsd">// 重建索引</span></span>
<span class="line"><span class="__shiki_140thh">        migrate.</span><span class="__shiki_1t8gfj">WithDropColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd">// 删除未使用的列</span></span>
<span class="line"><span class="__shiki_140thh">        migrate.</span><span class="__shiki_1t8gfj">WithForeignKeys</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// 启用外键</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;迁移失败:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-创建操作" tabindex="-1">4.2 创建操作 <a class="header-anchor" href="#_4-2-创建操作" aria-label="Permalink to &quot;4.2 创建操作&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建单个实体</span></span>
<span class="line"><span class="__shiki_140thh">user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Create</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetAge</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;alice@example.com&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Save</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量创建</span></span>
<span class="line"><span class="__shiki_140thh">users, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CreateBulk</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        client.User.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">SetName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Bob&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">SetAge</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        client.User.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">SetName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Charlie&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">SetAge</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">35</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">Save</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建关联实体</span></span>
<span class="line"><span class="__shiki_140thh">card, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.Card.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Create</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetNumber</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;4111111111111111&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetOwner</span><span class="__shiki_140thh">(user).  </span><span class="__shiki_21nrsd">// 设置关联</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Save</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用 OnConflict 处理重复（upsert）</span></span>
<span class="line"><span class="__shiki_140thh">user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Create</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;alice@example.com&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    OnConflict</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    UpdateNewValues</span><span class="__shiki_140thh">().  </span><span class="__shiki_21nrsd">// 冲突时更新</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ID</span><span class="__shiki_140thh">(ctx)             </span><span class="__shiki_21nrsd">// 返回 ID</span></span></code></pre></div><h3 id="_4-3-查询操作" tabindex="-1">4.3 查询操作 <a class="header-anchor" href="#_4-3-查询操作" aria-label="Permalink to &quot;4.3 查询操作&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询单个</span></span>
<span class="line"><span class="__shiki_140thh">user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Get</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 通过 ID</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">Name</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">)).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Only</span><span class="__shiki_140thh">(ctx)  </span><span class="__shiki_21nrsd">// 期望且仅有一个结果</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询多个</span></span>
<span class="line"><span class="__shiki_140thh">users, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">AgeGT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Order</span><span class="__shiki_140thh">(ent.</span><span class="__shiki_1t8gfj">Asc</span><span class="__shiki_140thh">(user.FieldAge)).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Offset</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    All</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 聚合查询</span></span>
<span class="line"><span class="__shiki_140thh">count, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Count</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">avgAge, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Aggregate</span><span class="__shiki_140thh">(ent.</span><span class="__shiki_1t8gfj">Avg</span><span class="__shiki_140thh">(user.FieldAge)).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Float64</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分组聚合</span></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> results []</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Department </span><span class="__shiki_1itgoe">string</span><span class="__shiki_mdbnqw"> \`json:&quot;department&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    Count      </span><span class="__shiki_1itgoe">int</span><span class="__shiki_mdbnqw">    \`json:&quot;count&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">    AvgAge     </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_mdbnqw"> \`json:&quot;avg_age&quot;\`</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    GroupBy</span><span class="__shiki_140thh">(user.FieldDepartment).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Aggregate</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        ent.</span><span class="__shiki_1t8gfj">Count</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        ent.</span><span class="__shiki_1t8gfj">Avg</span><span class="__shiki_140thh">(user.FieldAge),</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Scan</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">results)</span></span></code></pre></div><h3 id="_4-4-更新操作" tabindex="-1">4.4 更新操作 <a class="header-anchor" href="#_4-4-更新操作" aria-label="Permalink to &quot;4.4 更新操作&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 更新单个</span></span>
<span class="line"><span class="__shiki_140thh">user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    UpdateOneID</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetAge</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">31</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetStatus</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Save</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量更新</span></span>
<span class="line"><span class="__shiki_140thh">updated, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Update</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">AgeLT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">)).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    SetStatus</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;minor&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Save</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 更新关联</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    UpdateOne</span><span class="__shiki_140thh">(user).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AddGroupIDs</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">).      </span><span class="__shiki_21nrsd">// 添加关联</span></span>
<span class="line"><span class="__shiki_1t8gfj">    RemoveCardsIDs</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">).      </span><span class="__shiki_21nrsd">// 移除关联</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ClearGroups</span><span class="__shiki_140thh">().             </span><span class="__shiki_21nrsd">// 清除所有关联</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Save</span><span class="__shiki_140thh">(ctx)</span></span></code></pre></div><h3 id="_4-5-删除操作" tabindex="-1">4.5 删除操作 <a class="header-anchor" href="#_4-5-删除操作" aria-label="Permalink to &quot;4.5 删除操作&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 删除单个</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    DeleteOneID</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Exec</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量删除</span></span>
<span class="line"><span class="__shiki_140thh">deleted, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Delete</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">Status</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;inactive&quot;</span><span class="__shiki_140thh">)).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Exec</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 软删除（需要 schema 支持）</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> SoftDeleteMixin</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    mixin</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Schema</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">SoftDeleteMixin</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Fields</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Field</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Field</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        field.</span><span class="__shiki_1t8gfj">Time</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;deleted_at&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">            Optional</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-高级查询与图遍历" tabindex="-1">5. 高级查询与图遍历 <a class="header-anchor" href="#_5-高级查询与图遍历" aria-label="Permalink to &quot;5. 高级查询与图遍历&quot;">​</a></h2><h3 id="_5-1-关联查询-预加载" tabindex="-1">5.1 关联查询（预加载） <a class="header-anchor" href="#_5-1-关联查询-预加载" aria-label="Permalink to &quot;5.1 关联查询（预加载）&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询用户及其信用卡</span></span>
<span class="line"><span class="__shiki_140thh">user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    WithCards</span><span class="__shiki_140thh">().  </span><span class="__shiki_21nrsd">// 预加载 cards</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Only</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 深度预加载</span></span>
<span class="line"><span class="__shiki_140thh">users, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    WithCards</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">q</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CardQuery</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        q.</span><span class="__shiki_1t8gfj">WithOwner</span><span class="__shiki_140thh">()  </span><span class="__shiki_21nrsd">// 嵌套预加载</span></span>
<span class="line"><span class="__shiki_140thh">    }).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    WithDepartment</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    All</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 条件预加载</span></span>
<span class="line"><span class="__shiki_140thh">user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    WithCards</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">        func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">q</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CardQuery</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            q.</span><span class="__shiki_1t8gfj">Where</span><span class="__shiki_140thh">(card.</span><span class="__shiki_1t8gfj">Type</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;visa&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Only</span><span class="__shiki_140thh">(ctx)</span></span></code></pre></div><h3 id="_5-2-图遍历查询" tabindex="-1">5.2 图遍历查询 <a class="header-anchor" href="#_5-2-图遍历查询" aria-label="Permalink to &quot;5.2 图遍历查询&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 查询朋友的朋友（二度人脉）</span></span>
<span class="line"><span class="__shiki_140thh">friendsOfFriends, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">HasFriends</span><span class="__shiki_140thh">()).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    QueryFriends</span><span class="__shiki_140thh">().  </span><span class="__shiki_21nrsd">// 一度朋友</span></span>
<span class="line"><span class="__shiki_1t8gfj">    QueryFriends</span><span class="__shiki_140thh">().  </span><span class="__shiki_21nrsd">// 二度朋友</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Unique</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">).    </span><span class="__shiki_21nrsd">// 去重</span></span>
<span class="line"><span class="__shiki_1t8gfj">    All</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查找两个用户的共同朋友</span></span>
<span class="line"><span class="__shiki_140thh">commonFriends, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">HasFriendsWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            user.</span><span class="__shiki_1t8gfj">IDIn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd">// 用户1和2的共同朋友</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    All</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 路径查询：查找从用户A到用户B的最短路径</span></span>
<span class="line"><span class="__shiki_21nrsd">// 需要自定义扩展</span></span></code></pre></div><h3 id="_5-3-复杂条件查询" tabindex="-1">5.3 复杂条件查询 <a class="header-anchor" href="#_5-3-复杂条件查询" aria-label="Permalink to &quot;5.3 复杂条件查询&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 predicate 构建复杂条件</span></span>
<span class="line"><span class="__shiki_140thh">users, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">Or</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            user.</span><span class="__shiki_1t8gfj">And</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                user.</span><span class="__shiki_1t8gfj">AgeGT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                user.</span><span class="__shiki_1t8gfj">AgeLT</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">            user.</span><span class="__shiki_1t8gfj">And</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                user.</span><span class="__shiki_1t8gfj">Status</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                user.</span><span class="__shiki_1t8gfj">HasCards</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    All</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 动态条件构建</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> buildUserQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">age</span><span class="__shiki_1itgoe"> *int</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserQuery</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    query </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">AgeEQ</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">age))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">StatusEQ</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">status))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> query</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-高级特性" tabindex="-1">6. 高级特性 <a class="header-anchor" href="#_6-高级特性" aria-label="Permalink to &quot;6. 高级特性&quot;">​</a></h2><h3 id="_6-1-隐私层-privacy-layer" tabindex="-1">6.1 隐私层（Privacy Layer） <a class="header-anchor" href="#_6-1-隐私层-privacy-layer" aria-label="Permalink to &quot;6.1 隐私层（Privacy Layer）&quot;">​</a></h3><p>隐私层是 Ent 的杀手级特性，允许在<strong>查询层面</strong>定义数据访问策略。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// ent/schema/user.go</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Policy</span><span class="__shiki_140thh">() </span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Policy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> privacy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Policy</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 查询策略：谁能看到什么数据</span></span>
<span class="line"><span class="__shiki_140thh">        privacy.</span><span class="__shiki_1t8gfj">QueryRule</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">q</span><span class="__shiki_1t8gfj"> ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 1. 管理员可以看到所有</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> viewer.</span><span class="__shiki_1t8gfj">FromContext</span><span class="__shiki_140thh">(q.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">()).Role </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;admin&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> privacy.Allow</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 2. 用户只能看到自己的数据</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> privacy.</span><span class="__shiki_1t8gfj">FilterFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">f</span><span class="__shiki_1t8gfj"> privacy</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Filter</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                m, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> f.(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserFilter</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> privacy.Deny</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                viewerID </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> viewer.</span><span class="__shiki_1t8gfj">FromContext</span><span class="__shiki_140thh">(ctx).ID</span></span>
<span class="line"><span class="__shiki_140thh">                m.</span><span class="__shiki_1t8gfj">Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">ID</span><span class="__shiki_140thh">(viewerID))</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> privacy.Skip</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        }),</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 变更策略：谁能修改什么数据</span></span>
<span class="line"><span class="__shiki_140thh">        privacy.</span><span class="__shiki_1t8gfj">MutationRule</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">m</span><span class="__shiki_1t8gfj"> ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutation</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">viewer.</span><span class="__shiki_1t8gfj">FromContext</span><span class="__shiki_140thh">(m.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">IsAuthenticated</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> privacy.Deny</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> privacy.Allow</span></span>
<span class="line"><span class="__shiki_140thh">        }),</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在业务代码中使用</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> GetMyProfile</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 隐私策略会自动应用</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> client.User.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Only</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-钩子-hooks" tabindex="-1">6.2 钩子（Hooks） <a class="header-anchor" href="#_6-2-钩子-hooks" aria-label="Permalink to &quot;6.2 钩子（Hooks）&quot;">​</a></h3><p>钩子允许在数据库操作的生命周期中插入自定义逻辑。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 全局钩子（在 client.go 中）</span></span>
<span class="line"><span class="__shiki_140thh">client.</span><span class="__shiki_1t8gfj">Use</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> ent.</span><span class="__shiki_1t8gfj">MutateFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">m</span><span class="__shiki_1t8gfj"> ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutation</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        start </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        defer</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;操作 </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> 耗时 </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, m.</span><span class="__shiki_1t8gfj">Op</span><span class="__shiki_140thh">(), time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(start))</span></span>
<span class="line"><span class="__shiki_140thh">        }()</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">Mutate</span><span class="__shiki_140thh">(ctx, m)</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实体级钩子</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Hooks</span><span class="__shiki_140thh">() []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Hook</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> []</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Hook</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        hook.</span><span class="__shiki_1t8gfj">On</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">            func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutator</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Mutator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> hook.</span><span class="__shiki_1t8gfj">UserFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">m</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserMutation</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 创建前：加密密码</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> password, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> m.</span><span class="__shiki_1t8gfj">Password</span><span class="__shiki_140thh">(); ok {</span></span>
<span class="line"><span class="__shiki_140thh">                        hashed, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bcrypt.</span><span class="__shiki_1t8gfj">GenerateFromPassword</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(password), bcrypt.DefaultCost)</span></span>
<span class="line"><span class="__shiki_140thh">                        m.</span><span class="__shiki_1t8gfj">SetPassword</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(hashed))</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">Mutate</span><span class="__shiki_140thh">(ctx, m)</span></span>
<span class="line"><span class="__shiki_140thh">                })</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            ent.OpCreate,</span></span>
<span class="line"><span class="__shiki_140thh">        ),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-自定义模板" tabindex="-1">6.3 自定义模板 <a class="header-anchor" href="#_6-3-自定义模板" aria-label="Permalink to &quot;6.3 自定义模板&quot;">​</a></h3><p>Ent 允许自定义代码生成模板，扩展生成代码。</p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// ent/template/extension.tmpl</span></span>
<span class="line"><span class="__shiki_140thh">{{ define </span><span class="__shiki_mdbnqw">&quot;model/fields/additional&quot;</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自定义方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    func</span><span class="__shiki_140thh"> ({{ $.Receiver }} {{ $.Name }}) </span><span class="__shiki_1t8gfj">DisplayName</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {{ $.Receiver }}.FirstName </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> {{ $.Receiver }}.LastName</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">{{ end }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// ent/generate.go 中指定模板</span></span>
<span class="line"><span class="__shiki_21nrsd">//go:generate go run entgo.io/ent/cmd/ent generate ./schema --template ./ent/template</span></span></code></pre></div><h3 id="_6-4-事务" tabindex="-1">6.4 事务 <a class="header-anchor" href="#_6-4-事务" aria-label="Permalink to &quot;6.4 事务&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基础事务</span></span>
<span class="line"><span class="__shiki_140thh">tx, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Tx</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">defer</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> v </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> recover</span><span class="__shiki_140thh">(); v </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">        panic</span><span class="__shiki_140thh">(v)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在事务中操作</span></span>
<span class="line"><span class="__shiki_140thh">_, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.User.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">SetName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">Save</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    tx.</span><span class="__shiki_1t8gfj">Rollback</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">Commit</span><span class="__shiki_140thh">()</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用 WithTx 辅助函数</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ent.</span><span class="__shiki_1t8gfj">WithTx</span><span class="__shiki_140thh">(ctx, client, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">tx</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Tx</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> tx.User.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">SetName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Bob&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">Save</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> tx.Card.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">SetNumber</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;1234&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">SetOwner</span><span class="__shiki_140thh">(user).</span><span class="__shiki_1t8gfj">Save</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div><h3 id="_6-5-分页" tabindex="-1">6.5 分页 <a class="header-anchor" href="#_6-5-分页" aria-label="Permalink to &quot;6.5 分页&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基于游标的分页（性能更好）</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> paginateUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">client</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Client</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">after</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Cursor</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">first</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserConnection</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> client.User.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">        Paginate</span><span class="__shiki_140thh">(ctx, after, first,</span></span>
<span class="line"><span class="__shiki_140thh">            ent.</span><span class="__shiki_1t8gfj">WithUserOrder</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                ent.</span><span class="__shiki_1t8gfj">Desc</span><span class="__shiki_140thh">(user.FieldCreatedAt),</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 基于偏移的分页</span></span>
<span class="line"><span class="__shiki_140thh">users, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Offset</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    All</span><span class="__shiki_140thh">(ctx)</span></span></code></pre></div><h2 id="_7-迁移管理" tabindex="-1">7. 迁移管理 <a class="header-anchor" href="#_7-迁移管理" aria-label="Permalink to &quot;7. 迁移管理&quot;">​</a></h2><h3 id="_7-1-自动迁移" tabindex="-1">7.1 自动迁移 <a class="header-anchor" href="#_7-1-自动迁移" aria-label="Permalink to &quot;7.1 自动迁移&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 开发环境：自动同步</span></span>
<span class="line"><span class="__shiki_140thh">err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.Schema.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    ctx,</span></span>
<span class="line"><span class="__shiki_140thh">    migrate.</span><span class="__shiki_1t8gfj">WithDropIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    migrate.</span><span class="__shiki_1t8gfj">WithDropColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 生产环境：使用 Atlas（推荐）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 生成迁移文件</span></span>
<span class="line"><span class="__shiki_140thh">atlas migrate diff migration_name \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh">dir </span><span class="__shiki_mdbnqw">&quot;file://migrations&quot;</span><span class="__shiki_140thh"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh">to </span><span class="__shiki_mdbnqw">&quot;ent://ent/schema&quot;</span><span class="__shiki_140thh"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh">dev</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">url </span><span class="__shiki_mdbnqw">&quot;docker://mysql/8/test&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 应用迁移</span></span>
<span class="line"><span class="__shiki_140thh">atlas migrate apply \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh">dir </span><span class="__shiki_mdbnqw">&quot;file://migrations&quot;</span><span class="__shiki_140thh"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  --</span><span class="__shiki_140thh">url </span><span class="__shiki_mdbnqw">&quot;mysql://root:pass@localhost:3306/test&quot;</span></span></code></pre></div><h3 id="_7-2-版本化迁移" tabindex="-1">7.2 版本化迁移 <a class="header-anchor" href="#_7-2-版本化迁移" aria-label="Permalink to &quot;7.2 版本化迁移&quot;">​</a></h3><div class="language-sql vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- migrations/20231201000001_create_users.up.sql</span></span>
<span class="line"><span class="__shiki_1itgoe">CREATE</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_140thh"> \`</span><span class="__shiki_1t8gfj">users</span><span class="__shiki_140thh">\` (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`id\`</span><span class="__shiki_1itgoe"> bigint</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh"> AUTO_INCREMENT,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`name\`</span><span class="__shiki_1itgoe"> varchar</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`email\`</span><span class="__shiki_1itgoe"> varchar</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">255</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">UNIQUE</span><span class="__shiki_1itgoe"> NOT NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">    PRIMARY KEY</span><span class="__shiki_140thh"> (</span><span class="__shiki_mdbnqw">\`id\`</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- migrations/20231201000001_create_users.down.sql  </span></span>
<span class="line"><span class="__shiki_1itgoe">DROP</span><span class="__shiki_1itgoe"> TABLE</span><span class="__shiki_mdbnqw"> \`users\`</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="_8-测试与调试" tabindex="-1">8. 测试与调试 <a class="header-anchor" href="#_8-测试与调试" aria-label="Permalink to &quot;8. 测试与调试&quot;">​</a></h2><h3 id="_8-1-测试策略" tabindex="-1">8.1 测试策略 <a class="header-anchor" href="#_8-1-测试策略" aria-label="Permalink to &quot;8.1 测试策略&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 集成测试</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TestUserCRUD</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">testing</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    client </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> enttest.</span><span class="__shiki_1t8gfj">Open</span><span class="__shiki_140thh">(t, </span><span class="__shiki_mdbnqw">&quot;sqlite3&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;file:ent?mode=memory&amp;cache=shared&amp;_fk=1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    ctx </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    user </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">        SetName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Test&quot;</span><span class="__shiki_140thh">).</span></span>
<span class="line"><span class="__shiki_1t8gfj">        SaveX</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    assert.</span><span class="__shiki_1t8gfj">Equal</span><span class="__shiki_140thh">(t, </span><span class="__shiki_mdbnqw">&quot;Test&quot;</span><span class="__shiki_140thh">, user.Name)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 模拟测试</span></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> mockUserClient</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserClient</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">mockUserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Create</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserCreate</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 返回模拟的实现</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-调试技巧" tabindex="-1">8.2 调试技巧 <a class="header-anchor" href="#_8-2-调试技巧" aria-label="Permalink to &quot;8.2 调试技巧&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 查看生成的 SQL</span></span>
<span class="line"><span class="__shiki_140thh">client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> client.</span><span class="__shiki_1t8gfj">Debug</span><span class="__shiki_140thh">()  </span><span class="__shiki_21nrsd">// 启用调试模式</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 使用拦截器</span></span>
<span class="line"><span class="__shiki_140thh">client.</span><span class="__shiki_1t8gfj">Intercept</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    ent.</span><span class="__shiki_1t8gfj">InterceptFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">next</span><span class="__shiki_1t8gfj"> ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Querier</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Querier</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ent.</span><span class="__shiki_1t8gfj">QuerierFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_1t8gfj"> ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">) (</span><span class="__shiki_1t8gfj">ent</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Value</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            start </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            defer</span><span class="__shiki_140thh"> log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Query: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(start))</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> next.</span><span class="__shiki_1t8gfj">Query</span><span class="__shiki_140thh">(ctx, query)</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="_9-性能优化" tabindex="-1">9. 性能优化 <a class="header-anchor" href="#_9-性能优化" aria-label="Permalink to &quot;9. 性能优化&quot;">​</a></h2><h3 id="_9-1-查询优化" tabindex="-1">9.1 查询优化 <a class="header-anchor" href="#_9-1-查询优化" aria-label="Permalink to &quot;9.1 查询优化&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 使用 Select 只查询需要的字段</span></span>
<span class="line"><span class="__shiki_140thh">user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Select</span><span class="__shiki_140thh">(user.FieldName, user.FieldEmail).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Only</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 避免 N+1 查询（使用 With）</span></span>
<span class="line"><span class="__shiki_140thh">users, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    WithCards</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    All</span><span class="__shiki_140thh">(ctx)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 使用索引查询</span></span>
<span class="line"><span class="__shiki_140thh">users, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Query</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">Name</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">), user.</span><span class="__shiki_1t8gfj">Email</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;alice@example.com&quot;</span><span class="__shiki_140thh">)).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    All</span><span class="__shiki_140thh">(ctx)  </span><span class="__shiki_21nrsd">// 会使用 (name, email) 复合索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 批量操作</span></span>
<span class="line"><span class="__shiki_140thh">_, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> client.User.</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Delete</span><span class="__shiki_140thh">().</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Where</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">CreatedAtLT</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">AddDate</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">))).</span></span>
<span class="line"><span class="__shiki_1t8gfj">    Exec</span><span class="__shiki_140thh">(ctx)</span></span></code></pre></div><h3 id="_9-2-连接池配置" tabindex="-1">9.2 连接池配置 <a class="header-anchor" href="#_9-2-连接池配置" aria-label="Permalink to &quot;9.2 连接池配置&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_1t8gfj">database/sql</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 手动配置数据库连接</span></span>
<span class="line"><span class="__shiki_140thh">db, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> sql.</span><span class="__shiki_1t8gfj">Open</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;root:pass@tcp(localhost:3306)/test&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 配置连接池</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">SetMaxOpenConns</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">SetMaxIdleConns</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">db.</span><span class="__shiki_1t8gfj">SetConnMaxLifetime</span><span class="__shiki_140thh">(time.Hour)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">client </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ent.</span><span class="__shiki_1t8gfj">NewClient</span><span class="__shiki_140thh">(ent.</span><span class="__shiki_1t8gfj">Driver</span><span class="__shiki_140thh">(db))</span></span></code></pre></div><h2 id="_10-最佳实践" tabindex="-1">10. 最佳实践 <a class="header-anchor" href="#_10-最佳实践" aria-label="Permalink to &quot;10. 最佳实践&quot;">​</a></h2><h3 id="_10-1-架构建议" tabindex="-1">10.1 架构建议 <a class="header-anchor" href="#_10-1-架构建议" aria-label="Permalink to &quot;10.1 架构建议&quot;">​</a></h3><ol><li><strong>分层架构</strong>：Controller -&gt; Service -&gt; Repository (Ent Client)</li><li><strong>依赖注入</strong>：传递 <code>ent.Client</code>，而非全局变量</li><li><strong>领域驱动</strong>：将 Ent 实体作为领域模型的一部分</li><li><strong>限界上下文</strong>：每个微服务使用独立的 Ent schema</li></ol><h3 id="_10-2-开发流程" tabindex="-1">10.2 开发流程 <a class="header-anchor" href="#_10-2-开发流程" aria-label="Permalink to &quot;10.2 开发流程&quot;">​</a></h3><ol><li>设计 Schema（实体和关系）</li><li>生成代码：<code>go generate ./ent</code></li><li>编写业务逻辑</li><li>编写测试</li><li>生成迁移：<code>atlas migrate diff</code></li><li>代码审查</li><li>部署迁移</li></ol><h3 id="_10-3-常见陷阱与解决方案" tabindex="-1">10.3 常见陷阱与解决方案 <a class="header-anchor" href="#_10-3-常见陷阱与解决方案" aria-label="Permalink to &quot;10.3 常见陷阱与解决方案&quot;">​</a></h3><ol><li><strong>循环导入</strong>：将共享类型放在独立包中</li><li><strong>N+1 查询</strong>：始终使用 <code>With()</code> 预加载关联</li><li><strong>事务过大</strong>：拆分大事务，保持事务短小</li><li><strong>过度规范化</strong>：适度反范式化以提高查询性能</li><li><strong>忽略索引</strong>：为查询条件创建合适索引</li></ol><h2 id="_11-总结" tabindex="-1">11. 总结 <a class="header-anchor" href="#_11-总结" aria-label="Permalink to &quot;11. 总结&quot;">​</a></h2><p>Ent 框架通过其独特的<strong>图驱动</strong>设计，为 Go 开发者提供了类型安全、高性能的数据访问解决方案。核心优势包括：</p><ol><li><strong>类型安全</strong>：编译时检查，减少运行时错误</li><li><strong>隐私层</strong>：内置的数据访问控制</li><li><strong>图遍历</strong>：原生支持复杂关系查询</li><li><strong>扩展性</strong>：通过模板和钩子高度可定制</li><li><strong>现代工具链</strong>：集成 Atlas 进行迁移管理</li></ol><p>Ent 最适合：</p><ul><li>复杂领域模型（多对多、层次结构）</li><li>需要严格数据权限控制的应用</li><li>高性能要求的服务</li><li>团队协作的大型项目</li></ul><p>学习曲线虽然较陡，但一旦掌握，Ent 将成为构建健壮、可维护 Go 应用的强大工具。随着 v0.12 及后续版本的发布，Ent 正在成为 Go 生态中数据访问层的主流选择之一。</p>`,85)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
