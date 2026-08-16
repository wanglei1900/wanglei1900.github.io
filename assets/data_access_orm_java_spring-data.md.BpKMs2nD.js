import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const g=JSON.parse('{"title":"Spring Data抽象学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/java/spring-data.md","filePath":"data/access/orm/java/spring-data.md"}'),p={name:"data/access/orm/java/spring-data.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="spring-data抽象学习笔记" tabindex="-1">Spring Data抽象学习笔记 <a class="header-anchor" href="#spring-data抽象学习笔记" aria-label="Permalink to &quot;Spring Data抽象学习笔记&quot;">​</a></h1><h2 id="一、spring-data核心概念与架构" tabindex="-1">一、Spring Data核心概念与架构 <a class="header-anchor" href="#一、spring-data核心概念与架构" aria-label="Permalink to &quot;一、Spring Data核心概念与架构&quot;">​</a></h2><h3 id="_1-1-spring-data是什么" tabindex="-1">1.1 Spring Data是什么？ <a class="header-anchor" href="#_1-1-spring-data是什么" aria-label="Permalink to &quot;1.1 Spring Data是什么？&quot;">​</a></h3><ul><li><strong>定义</strong>：Spring Data是Spring生态系统中的数据访问抽象层，提供统一的API访问不同类型的数据存储</li><li><strong>目标</strong>：简化数据访问层的开发，减少样板代码</li><li><strong>哲学</strong>：&quot;Repository&quot;模式 + 约定优于配置</li></ul><h3 id="_1-2-spring-data家族" tabindex="-1">1.2 Spring Data家族 <a class="header-anchor" href="#_1-2-spring-data家族" aria-label="Permalink to &quot;1.2 Spring Data家族&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Spring Data Commons (核心抽象)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Spring Data JPA (关系型数据库)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Spring Data MongoDB (文档数据库)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Spring Data Redis (键值存储)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Spring Data Elasticsearch (搜索引擎)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Spring Data Cassandra (列式数据库)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Spring Data Neo4j (图数据库)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Spring Data LDAP (目录服务)</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── Spring Data REST (RESTful暴露)</span></span></code></pre></div><h3 id="_1-3-核心架构" tabindex="-1">1.3 核心架构 <a class="header-anchor" href="#_1-3-核心架构" aria-label="Permalink to &quot;1.3 核心架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">应用层 (Application)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Repository接口 (UserRepository)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Spring Data Commons抽象</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── Repository</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── CrudRepository</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── PagingAndSortingRepository</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── JpaRepository (JPA特定)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">数据存储实现层</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── JPA (Hibernate/EclipseLink)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── MongoDB Driver</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── Redis Client</span></span></code></pre></div><h2 id="二、spring-data-commons核心抽象" tabindex="-1">二、Spring Data Commons核心抽象 <a class="header-anchor" href="#二、spring-data-commons核心抽象" aria-label="Permalink to &quot;二、Spring Data Commons核心抽象&quot;">​</a></h2><h3 id="_2-1-repository层次结构" tabindex="-1">2.1 Repository层次结构 <a class="header-anchor" href="#_2-1-repository层次结构" aria-label="Permalink to &quot;2.1 Repository层次结构&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. Repository标记接口（顶级接口）</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Indexed</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> Repository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 标记接口，无方法</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. CrudRepository基础CRUD操作</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> CrudRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">extends</span><span class="__shiki_1t8gfj"> Repository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">&gt; S </span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(S </span><span class="__shiki_1jdh33">entity</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">&gt; Iterable&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">saveAll</span><span class="__shiki_140thh">(Iterable&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">entities</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    Optional&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(ID </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    boolean</span><span class="__shiki_1t8gfj"> existsById</span><span class="__shiki_140thh">(ID </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    Iterable&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    Iterable&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAllById</span><span class="__shiki_140thh">(Iterable&lt;</span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">ids</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    long</span><span class="__shiki_1t8gfj"> count</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> deleteById</span><span class="__shiki_140thh">(ID </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> delete</span><span class="__shiki_140thh">(T </span><span class="__shiki_1jdh33">entity</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> deleteAllById</span><span class="__shiki_140thh">(Iterable&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> ID</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">ids</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> deleteAll</span><span class="__shiki_140thh">(Iterable&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">entities</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> deleteAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. PagingAndSortingRepository分页排序</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> PagingAndSortingRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">extends</span><span class="__shiki_1t8gfj"> CrudRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    Iterable&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(Sort </span><span class="__shiki_1jdh33">sort</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 特定存储的Repository接口</span></span>
<span class="line"><span class="__shiki_21nrsd">// 如：JpaRepository, MongoRepository等</span></span></code></pre></div><h3 id="_2-2-核心注解" tabindex="-1">2.2 核心注解 <a class="header-anchor" href="#_2-2-核心注解" aria-label="Permalink to &quot;2.2 核心注解&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 启用Spring Data Repository</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableJpaRepositories</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">    basePackages</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;com.example.repository&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    repositoryBaseClass</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> CustomRepositoryImpl.class,</span></span>
<span class="line"><span class="__shiki_dzsirb">    repositoryImplementationPostfix</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Impl&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    namedQueriesLocation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;classpath:jpa-named-queries.properties&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    includeFilters</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">ComponentScan.Filter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FilterType.REGEX, </span><span class="__shiki_dzsirb">pattern</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;.*Repository&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">    excludeFilters</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">ComponentScan.Filter</span><span class="__shiki_140thh">(Repository.class)</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableMongoRepositories</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">basePackages</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;com.example.mongorepo&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableRedisRepositories</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">basePackages</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;com.example.redisrepo&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DataConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 配置</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-repositoryfactory支持" tabindex="-1">2.3 RepositoryFactory支持 <a class="header-anchor" href="#_2-3-repositoryfactory支持" aria-label="Permalink to &quot;2.3 RepositoryFactory支持&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自定义Repository工厂</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CustomRepositoryFactoryBean</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">R</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_140thh"> JpaRepository&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">I</span><span class="__shiki_140thh">&gt;, </span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">I</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    extends</span><span class="__shiki_1t8gfj"> JpaRepositoryFactoryBean</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">R</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">I</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> CustomRepositoryFactoryBean</span><span class="__shiki_140thh">(Class&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> R</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">repositoryInterface</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">(repositoryInterface);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_140thh"> RepositoryFactorySupport </span><span class="__shiki_1t8gfj">createRepositoryFactory</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        EntityManager </span><span class="__shiki_1jdh33">entityManager</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CustomRepositoryFactory</span><span class="__shiki_140thh">(entityManager);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义Repository工厂</span></span>
<span class="line"><span class="__shiki_1itgoe">private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CustomRepositoryFactory</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepositoryFactory</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> CustomRepositoryFactory</span><span class="__shiki_140thh">(EntityManager </span><span class="__shiki_1jdh33">entityManager</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">(entityManager);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_140thh"> SimpleJpaRepository&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getTargetRepository</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        RepositoryInformation </span><span class="__shiki_1jdh33">information</span><span class="__shiki_140thh">, EntityManager </span><span class="__shiki_1jdh33">entityManager</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> CustomRepositoryImpl&lt;&gt;(</span></span>
<span class="line"><span class="__shiki_1t8gfj">            getEntityInformation</span><span class="__shiki_140thh">(information.</span><span class="__shiki_1t8gfj">getDomainType</span><span class="__shiki_140thh">()), </span></span>
<span class="line"><span class="__shiki_140thh">            entityManager);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_140thh"> Class&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getRepositoryBaseClass</span><span class="__shiki_140thh">(RepositoryMetadata </span><span class="__shiki_1jdh33">metadata</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> CustomRepositoryImpl.class;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、spring-data-jpa深度解析" tabindex="-1">三、Spring Data JPA深度解析 <a class="header-anchor" href="#三、spring-data-jpa深度解析" aria-label="Permalink to &quot;三、Spring Data JPA深度解析&quot;">​</a></h2><h3 id="_3-1-jpa-repository层次结构" tabindex="-1">3.1 JPA Repository层次结构 <a class="header-anchor" href="#_3-1-jpa-repository层次结构" aria-label="Permalink to &quot;3.1 JPA Repository层次结构&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// JPA特定Repository接口</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">extends</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">    PagingAndSortingRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt;, </span></span>
<span class="line"><span class="__shiki_1t8gfj">    QueryByExampleExecutor</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // JPA特定方法</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(Sort </span><span class="__shiki_1jdh33">sort</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAllById</span><span class="__shiki_140thh">(Iterable&lt;</span><span class="__shiki_1itgoe">ID</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">ids</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">&gt; List&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">saveAll</span><span class="__shiki_140thh">(Iterable&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">entities</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> flush</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">&gt; S </span><span class="__shiki_1t8gfj">saveAndFlush</span><span class="__shiki_140thh">(S </span><span class="__shiki_1jdh33">entity</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> deleteInBatch</span><span class="__shiki_140thh">(Iterable&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">entities</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> deleteAllInBatch</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    T </span><span class="__shiki_1t8gfj">getOne</span><span class="__shiki_140thh">(ID </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">// 返回引用，延迟加载</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">&gt; List&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(Example&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">example</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">&gt; List&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(Example&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">example</span><span class="__shiki_140thh">, Sort </span><span class="__shiki_1jdh33">sort</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">&gt; Page&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(Example&lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">example</span><span class="__shiki_140thh">, Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-查询方法定义规则" tabindex="-1">3.2 查询方法定义规则 <a class="header-anchor" href="#_3-2-查询方法定义规则" aria-label="Permalink to &quot;3.2 查询方法定义规则&quot;">​</a></h3><h4 id="_3-2-1-方法命名约定" tabindex="-1">3.2.1 方法命名约定 <a class="header-anchor" href="#_3-2-1-方法命名约定" aria-label="Permalink to &quot;3.2.1 方法命名约定&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基本查找</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findByUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    Optional&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findOptionalByUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 条件组合</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameAndEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameOrEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 比较操作</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAgeGreaterThan</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> age</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAgeLessThan</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> age</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAgeBetween</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> start</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> end</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAgeGreaterThanEqual</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> age</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 空值检查</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByEmailIsNull</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByEmailIsNotNull</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Like和Containing</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameLike</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">pattern</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameContaining</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">keyword</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameStartingWith</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">prefix</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameEndingWith</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">suffix</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // In查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameIn</span><span class="__shiki_140thh">(Collection&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">usernames</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameNotIn</span><span class="__shiki_140thh">(Collection&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">usernames</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 排序</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByActiveTrueOrderByUsernameAsc</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByActiveOrderByCreatedDateDesc</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_1jdh33"> active</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分页</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByActiveTrue</span><span class="__shiki_140thh">(Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    Slice&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByEmailContaining</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">, Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 限制结果</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findFirstByOrderByAgeDesc</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findTop3ByOrderByScoreDesc</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findDistinctByUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 聚合函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    long</span><span class="__shiki_1t8gfj"> countByActiveTrue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    long</span><span class="__shiki_1t8gfj"> deleteByActiveFalse</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    boolean</span><span class="__shiki_1t8gfj"> existsByUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-属性表达式" tabindex="-1">3.2.2 属性表达式 <a class="header-anchor" href="#_3-2-2-属性表达式" aria-label="Permalink to &quot;3.2.2 属性表达式&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 嵌套属性查询</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> OrderRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 单层嵌套</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUserUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUserAddressCity</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">city</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 多层嵌套</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUserAddressCountryCode</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">countryCode</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 集合属性</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByItemsProductName</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">productName</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 关联实体ID</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUserId</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实体定义参考</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">ManyToOne</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> User user;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OneToMany</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">mappedBy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;order&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">OrderItem</span><span class="__shiki_140thh">&gt; items;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String username;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Embedded</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Address address;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Embeddable</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String city;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String countryCode;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-query注解详解" tabindex="-1">3.3 @Query注解详解 <a class="header-anchor" href="#_3-3-query注解详解" aria-label="Permalink to &quot;3.3 @Query注解详解&quot;">​</a></h3><h4 id="_3-3-1-jpql查询" tabindex="-1">3.3.1 JPQL查询 <a class="header-anchor" href="#_3-3-1-jpql查询" aria-label="Permalink to &quot;3.3.1 JPQL查询&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基本JPQL查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u FROM User u WHERE u.email = ?1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findByEmailAddress</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 命名参数</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u FROM User u WHERE u.username = :username AND u.active = :active&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findByUsernameAndActive</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">) String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                 @</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_1jdh33"> active</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 排序和分页</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u FROM User u WHERE u.age &gt; :age&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersOlderThan</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> age</span><span class="__shiki_140thh">, Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 投影查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u.username, u.email FROM User u WHERE u.active = true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">[]&gt; </span><span class="__shiki_1t8gfj">findActiveUserInfo</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自定义DTO投影</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT new com.example.dto.UserInfo(u.username, u.email) FROM User u&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">UserInfo</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUserInfo</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 聚合查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT COUNT(u), AVG(u.age), MAX(u.age) FROM User u&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    Object</span><span class="__shiki_140thh">[] </span><span class="__shiki_1t8gfj">getUserStatistics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新操作（需要@Modifying）</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Modifying</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;UPDATE User u SET u.active = false WHERE u.lastLogin &lt; :date&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_1t8gfj"> deactivateInactiveUsers</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;date&quot;</span><span class="__shiki_140thh">) LocalDate </span><span class="__shiki_1jdh33">date</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 删除操作</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Modifying</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;DELETE FROM User u WHERE u.active = false&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_1t8gfj"> deleteInactiveUsers</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 原生SQL查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT * FROM users WHERE email = ?1&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">           nativeQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findByEmailNative</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 原生SQL分页</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT * FROM users ORDER BY id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">           countQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT COUNT(*) FROM users&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">           nativeQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAllUsers</span><span class="__shiki_140thh">(Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-2-spel表达式支持" tabindex="-1">3.3.2 SpEL表达式支持 <a class="header-anchor" href="#_3-3-2-spel表达式支持" aria-label="Permalink to &quot;3.3.2 SpEL表达式支持&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用SpEL引用实体名称</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u FROM #{#entityName} u WHERE u.active = true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAllActive</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用SpEL引用参数</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u FROM User u WHERE u.username = ?#{ principal?.username }&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findCurrentUser</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 动态表名（谨慎使用）</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT * FROM #{#entityName.tableName} WHERE active = :active&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByActive</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_1jdh33"> active</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实体定义</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// #{#entityName} 将解析为 &quot;users&quot;</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Table</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;t_users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-规范模式-specification" tabindex="-1">3.4 规范模式（Specification） <a class="header-anchor" href="#_3-4-规范模式-specification" aria-label="Permalink to &quot;3.4 规范模式（Specification）&quot;">​</a></h3><h4 id="_3-4-1-specification接口" tabindex="-1">3.4.1 Specification接口 <a class="header-anchor" href="#_3-4-1-specification接口" aria-label="Permalink to &quot;3.4.1 Specification接口&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserSpecifications</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基础Specification</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">usernameLike</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            username </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">like</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">lower</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">)), </span></span>
<span class="line"><span class="__shiki_mdbnqw">                   &quot;%&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> username.</span><span class="__shiki_1t8gfj">toLowerCase</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;%&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">emailContains</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            email </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">like</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&quot;%&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> email </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;%&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">ageBetween</span><span class="__shiki_140thh">(Integer </span><span class="__shiki_1jdh33">minAge</span><span class="__shiki_140thh">, Integer </span><span class="__shiki_1jdh33">maxAge</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (minAge </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> maxAge </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            List&lt;</span><span class="__shiki_1itgoe">Predicate</span><span class="__shiki_140thh">&gt; predicates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (minAge </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">ge</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">), minAge));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (maxAge </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">le</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">), maxAge));</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(predicates.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Predicate</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]));</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">isActive</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">isTrue</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">createdAfter</span><span class="__shiki_140thh">(LocalDate </span><span class="__shiki_1jdh33">date</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            date </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">greaterThanOrEqualTo</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;createdDate&quot;</span><span class="__shiki_140thh">), date);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用Specification</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">searchUsers</span><span class="__shiki_140thh">(UserSearchCriteria </span><span class="__shiki_1jdh33">criteria</span><span class="__shiki_140thh">, Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Specification.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spec.</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">usernameLike</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spec.</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">emailContains</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spec.</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">ageBetween</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            criteria.</span><span class="__shiki_1t8gfj">getMinAge</span><span class="__shiki_140thh">(), criteria.</span><span class="__shiki_1t8gfj">getMaxAge</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getActive</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> criteria.</span><span class="__shiki_1t8gfj">getActive</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">            spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spec.</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">isActive</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getCreatedAfter</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> spec.</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">createdAfter</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getCreatedAfter</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(spec, pageable);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-4-2-jpaspecificationexecutor接口" tabindex="-1">3.4.2 JpaSpecificationExecutor接口 <a class="header-anchor" href="#_3-4-2-jpaspecificationexecutor接口" aria-label="Permalink to &quot;3.4.2 JpaSpecificationExecutor接口&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt;, </span></span>
<span class="line"><span class="__shiki_1t8gfj">                                       JpaSpecificationExecutor</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动获得以下方法：</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Optional&lt;T&gt; findOne(Specification&lt;T&gt; spec);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // List&lt;T&gt; findAll(Specification&lt;T&gt; spec);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Page&lt;T&gt; findAll(Specification&lt;T&gt; spec, Pageable pageable);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // List&lt;T&gt; findAll(Specification&lt;T&gt; spec, Sort sort);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // long count(Specification&lt;T&gt; spec);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 复杂Specification示例</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AdvancedSpecifications</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 关联查询Specification</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">hasProduct</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">productName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 避免重复连接</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (query.</span><span class="__shiki_1t8gfj">getResultType</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> Long.class </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                query.</span><span class="__shiki_1t8gfj">getResultType</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> long.class) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 计数查询不需要连接</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 连接订单项和产品</span></span>
<span class="line"><span class="__shiki_140thh">            Join&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">OrderItem</span><span class="__shiki_140thh">&gt; items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> root.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;items&quot;</span><span class="__shiki_140thh">, JoinType.INNER);</span></span>
<span class="line"><span class="__shiki_140thh">            Join&lt;</span><span class="__shiki_1itgoe">OrderItem</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> items.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">, JoinType.INNER);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(product.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">), productName);</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 动态排序</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">withDynamicSort</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">sortField</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">direction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (sortField </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> direction </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Path&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">&gt; path </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(sortField);</span></span>
<span class="line"><span class="__shiki_140thh">                Order order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;DESC&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">equalsIgnoreCase</span><span class="__shiki_140thh">(direction) </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                    cb.</span><span class="__shiki_1t8gfj">desc</span><span class="__shiki_140thh">(path) </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">asc</span><span class="__shiki_140thh">(path);</span></span>
<span class="line"><span class="__shiki_140thh">                query.</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 不添加where条件</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 子查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">hasOrderAmountGreaterThan</span><span class="__shiki_140thh">(BigDecimal </span><span class="__shiki_1jdh33">amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 创建子查询</span></span>
<span class="line"><span class="__shiki_140thh">            Subquery&lt;</span><span class="__shiki_1itgoe">BigDecimal</span><span class="__shiki_140thh">&gt; subquery </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">subquery</span><span class="__shiki_140thh">(BigDecimal.class);</span></span>
<span class="line"><span class="__shiki_140thh">            Root&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subquery.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Order.class);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 子查询选择总和</span></span>
<span class="line"><span class="__shiki_140thh">            subquery.</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">sum</span><span class="__shiki_140thh">(order.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;totalAmount&quot;</span><span class="__shiki_140thh">)))</span></span>
<span class="line"><span class="__shiki_140thh">                    .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(order.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">), root));</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 主查询条件</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">greaterThan</span><span class="__shiki_140thh">(subquery, amount);</span></span>
<span class="line"><span class="__shiki_140thh">        };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、spring-data-mongodb" tabindex="-1">四、Spring Data MongoDB <a class="header-anchor" href="#四、spring-data-mongodb" aria-label="Permalink to &quot;四、Spring Data MongoDB&quot;">​</a></h2><h3 id="_4-1-mongodb-repository基础" tabindex="-1">4.1 MongoDB Repository基础 <a class="header-anchor" href="#_4-1-mongodb-repository基础" aria-label="Permalink to &quot;4.1 MongoDB Repository基础&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 文档定义</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Document</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">collection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String username;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String email;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Integer age;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;registration_date&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDateTime registrationDate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Indexed</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String status;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeoSpatialIndexed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> GeoSpatialIndexType.GEO_2DSPHERE)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> GeoJsonPoint location;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 内嵌文档</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Address address;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 引用其他集合</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">DBRef</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; orders;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // getter/setter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 内嵌文档</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String street;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String city;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String postalCode;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeoSpatialIndexed</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> GeoSpatialIndexType.GEO_2DSPHERE)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> GeoJsonPoint coordinates;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Repository定义</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> MongoRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基本查询方法</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 内嵌文档查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAddressCity</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">city</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 地理空间查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByLocationNear</span><span class="__shiki_140thh">(Point </span><span class="__shiki_1jdh33">point</span><span class="__shiki_140thh">, Distance </span><span class="__shiki_1jdh33">distance</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 数组查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByTagsIn</span><span class="__shiki_140thh">(List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">tags</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 正则表达式查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameRegex</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">pattern</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存在性查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByEmailExists</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_1jdh33"> exists</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // @Query注解</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;{ &#39;username&#39; : ?0 }&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findByUsernameQuery</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;{ &#39;age&#39; : { $gt: ?0, $lt: ?1 } }&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAgeBetween</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> minAge</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> maxAge</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;{ &#39;status&#39; : ?0 }&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">fields</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;{ &#39;username&#39; : 1, &#39;email&#39; : 1 }&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByStatusWithProjection</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">status</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 聚合查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Aggregation</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">pipeline</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;{ $match: { status: ?0 } }&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;{ $group: { _id: &#39;$city&#39;, total: { $sum: 1 } } }&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">CitySummary</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">aggregateByCity</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">status</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 聚合结果</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CitySummary</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String city;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Integer total;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-mongodb-template操作" tabindex="-1">4.2 MongoDB Template操作 <a class="header-anchor" href="#_4-2-mongodb-template操作" aria-label="Permalink to &quot;4.2 MongoDB Template操作&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> MongoTemplate mongoTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 复杂查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersByComplexCriteria</span><span class="__shiki_140thh">(UserCriteria </span><span class="__shiki_1jdh33">criteria</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Query query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Query</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Criteria</span><span class="__shiki_140thh">&gt; criteriaList </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            criteriaList.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(Criteria.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">regex</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">(), </span><span class="__shiki_mdbnqw">&quot;i&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getMinAge</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            criteriaList.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(Criteria.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">gte</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getMinAge</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getMaxAge</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            criteriaList.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(Criteria.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">lte</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getMaxAge</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getCity</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            criteriaList.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(Criteria.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;address.city&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">is</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getCity</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">criteriaList.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">            query.</span><span class="__shiki_1t8gfj">addCriteria</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Criteria</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">andOperator</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                criteriaList.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Criteria</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">])));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 排序和分页</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">with</span><span class="__shiki_140thh">(Sort.</span><span class="__shiki_1t8gfj">by</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;registrationDate&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">descending</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">with</span><span class="__shiki_140thh">(PageRequest.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getPage</span><span class="__shiki_140thh">(), criteria.</span><span class="__shiki_1t8gfj">getSize</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> mongoTemplate.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query, User.class);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 地理空间查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersNearLocation</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> latitude</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> longitude</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                            double</span><span class="__shiki_1jdh33"> distanceInKilometers</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Point point </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Point</span><span class="__shiki_140thh">(longitude, latitude);</span></span>
<span class="line"><span class="__shiki_140thh">        Distance distance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Distance</span><span class="__shiki_140thh">(distanceInKilometers, Metrics.KILOMETERS);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Query query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Query</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            Criteria.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;location&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">nearSphere</span><span class="__shiki_140thh">(point).</span><span class="__shiki_1t8gfj">maxDistance</span><span class="__shiki_140thh">(distance)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> mongoTemplate.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(query, User.class);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 聚合操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">AgeGroup</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">groupUsersByAge</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        Aggregation aggregation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Aggregation.</span><span class="__shiki_1t8gfj">newAggregation</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            Aggregation.</span><span class="__shiki_1t8gfj">project</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpression</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;year(registrationDate)&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">as</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;registrationYear&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            Aggregation.</span><span class="__shiki_1t8gfj">group</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;registrationYear&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">avg</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">as</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;averageAge&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">count</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">as</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;totalUsers&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            Aggregation.</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">(Sort.Direction.DESC, </span><span class="__shiki_mdbnqw">&quot;registrationYear&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        AggregationResults&lt;</span><span class="__shiki_1itgoe">AgeGroup</span><span class="__shiki_140thh">&gt; results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            mongoTemplate.</span><span class="__shiki_1t8gfj">aggregate</span><span class="__shiki_140thh">(aggregation, </span><span class="__shiki_mdbnqw">&quot;users&quot;</span><span class="__shiki_140thh">, AgeGroup.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> results.</span><span class="__shiki_1t8gfj">getMappedResults</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> bulkUpdateUserStatus</span><span class="__shiki_140thh">(List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">userIds</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">status</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        BulkOperations bulkOps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> mongoTemplate.</span><span class="__shiki_1t8gfj">bulkOps</span><span class="__shiki_140thh">(BulkOperations.BulkMode.UNORDERED, User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (String userId </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> userIds) {</span></span>
<span class="line"><span class="__shiki_140thh">            Update update </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Update</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">, status);</span></span>
<span class="line"><span class="__shiki_140thh">            bulkOps.</span><span class="__shiki_1t8gfj">updateOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                Query.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(Criteria.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">is</span><span class="__shiki_140thh">(userId)), </span></span>
<span class="line"><span class="__shiki_140thh">                update</span></span>
<span class="line"><span class="__shiki_140thh">            );</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        bulkOps.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、spring-data-redis" tabindex="-1">五、Spring Data Redis <a class="header-anchor" href="#五、spring-data-redis" aria-label="Permalink to &quot;五、Spring Data Redis&quot;">​</a></h2><h3 id="_5-1-redis-repository配置" tabindex="-1">5.1 Redis Repository配置 <a class="header-anchor" href="#_5-1-redis-repository配置" aria-label="Permalink to &quot;5.1 Redis Repository配置&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Redis实体定义</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">RedisHash</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">TimeToLive</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// TTL 1小时</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Indexed</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String username;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String email;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Indexed</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Integer age;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储为JSON</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">RedisHash</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Address address;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 存储为Hash</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; preferences </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // getter/setter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Repository定义</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> CrudRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 根据索引字段查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 范围查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAgeBetween</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> minAge</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> maxAge</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分页查询</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAgeGreaterThan</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> age</span><span class="__shiki_140thh">, Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 配置类</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableRedisRepositories</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">    basePackages</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;com.example.repository.redis&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    redisTemplateRef</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;redisTemplate&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    repositoryBaseClass</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> CustomRedisRepository.class</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RedisConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> RedisConnectionFactory </span><span class="__shiki_1t8gfj">redisConnectionFactory</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        RedisStandaloneConfiguration config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> RedisStandaloneConfiguration</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        config.</span><span class="__shiki_1t8gfj">setHostName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        config.</span><span class="__shiki_1t8gfj">setPort</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        config.</span><span class="__shiki_1t8gfj">setPassword</span><span class="__shiki_140thh">(RedisPassword.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;password&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> LettuceConnectionFactory</span><span class="__shiki_140thh">(config);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">redisTemplate</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        RedisTemplate&lt;</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">[], </span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">[]&gt; template </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> RedisTemplate&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setConnectionFactory</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">redisConnectionFactory</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setKeySerializer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> StringRedisSerializer</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setValueSerializer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> GenericJackson2JsonRedisSerializer</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setHashKeySerializer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> StringRedisSerializer</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        template.</span><span class="__shiki_1t8gfj">setHashValueSerializer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> GenericJackson2JsonRedisSerializer</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> template;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-redis-template操作" tabindex="-1">5.2 Redis Template操作 <a class="header-anchor" href="#_5-2-redis-template操作" aria-label="Permalink to &quot;5.2 Redis Template操作&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RedisService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; redisTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> StringRedisTemplate stringRedisTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 字符串操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> cacheUserToken</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">token</span><span class="__shiki_140thh">, Duration </span><span class="__shiki_1jdh33">ttl</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        ValueOperations&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; ops </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stringRedisTemplate.</span><span class="__shiki_1t8gfj">opsForValue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        ops.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:token:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId, token, ttl);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">getUserToken</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> stringRedisTemplate.</span><span class="__shiki_1t8gfj">opsForValue</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:token:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Hash操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> cacheUserProfile</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, UserProfile </span><span class="__shiki_1jdh33">profile</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        HashOperations&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; ops </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">opsForHash</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        ops.</span><span class="__shiki_1t8gfj">putAll</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:profile:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId, </span><span class="__shiki_1t8gfj">toMap</span><span class="__shiki_140thh">(profile));</span></span>
<span class="line"><span class="__shiki_140thh">        redisTemplate.</span><span class="__shiki_1t8gfj">expire</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:profile:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, TimeUnit.HOURS);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // List操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> pushNotification</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">notification</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        ListOperations&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; ops </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">opsForList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        ops.</span><span class="__shiki_1t8gfj">rightPush</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:notifications:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId, notification);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 保持最近100条通知</span></span>
<span class="line"><span class="__shiki_140thh">        ops.</span><span class="__shiki_1t8gfj">trim</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:notifications:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">99</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getNotifications</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; notifications </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">opsForList</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">range</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:notifications:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> notifications.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(Object</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">toString)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Set操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> addUserToOnlineSet</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        SetOperations&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; ops </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">opsForSet</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        ops.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;online:users&quot;</span><span class="__shiki_140thh">, userId);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Set&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getOnlineUsers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        Set&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">opsForSet</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">members</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;online:users&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(Object</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">toString)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toSet</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Sorted Set操作（排行榜）</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> updateUserScore</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> score</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        ZSetOperations&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; ops </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">opsForZSet</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        ops.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:scores&quot;</span><span class="__shiki_140thh">, userId, score);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">LeaderboardEntry</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getTopUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> limit</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        ZSetOperations&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; ops </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">opsForZSet</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        Set&lt;</span><span class="__shiki_1itgoe">ZSetOperations</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">TypedTuple</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt;&gt; topScores </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            ops.</span><span class="__shiki_1t8gfj">reverseRangeWithScores</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:scores&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, limit </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> topScores.</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(tuple </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> LeaderboardEntry</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                tuple.</span><span class="__shiki_1t8gfj">getValue</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">                tuple.</span><span class="__shiki_1t8gfj">getScore</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Pub/Sub</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> publishMessage</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">channel</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        redisTemplate.</span><span class="__shiki_1t8gfj">convertAndSend</span><span class="__shiki_140thh">(channel, message);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 管道操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getMultipleUserData</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">executePipelined</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            (RedisCallback</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">Object</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">) connection </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                StringRedisConnection stringConn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (StringRedisConnection) connection;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 管道中执行多个命令</span></span>
<span class="line"><span class="__shiki_140thh">                stringConn.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:profile:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId);</span></span>
<span class="line"><span class="__shiki_140thh">                stringConn.</span><span class="__shiki_1t8gfj">lRange</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:notifications:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> userId, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">9</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                stringConn.</span><span class="__shiki_1t8gfj">zScore</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:scores&quot;</span><span class="__shiki_140thh">, userId);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        data.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;profile&quot;</span><span class="__shiki_140thh">, results.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        data.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;notifications&quot;</span><span class="__shiki_140thh">, results.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        data.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;score&quot;</span><span class="__shiki_140thh">, results.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> data;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Lua脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> rateLimit</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> limit</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> windowInSeconds</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        String luaScript </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;local current = redis.call(&#39;GET&#39;, KEYS[1]) &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;if current == false then &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;   redis.call(&#39;SETEX&#39;, KEYS[1], ARGV[2], 1) &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;   return 1 &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;elseif tonumber(current) &lt; tonumber(ARGV[1]) then &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;   redis.call(&#39;INCR&#39;, KEYS[1]) &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;   return 1 &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;else &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;   return 0 &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;end&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        RedisScript&lt;</span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; script </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> DefaultRedisScript&lt;&gt;(luaScript, Long.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Long result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> redisTemplate.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(script, </span></span>
<span class="line"><span class="__shiki_140thh">            Collections.</span><span class="__shiki_1t8gfj">singletonList</span><span class="__shiki_140thh">(key), </span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(limit), </span></span>
<span class="line"><span class="__shiki_140thh">            String.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(windowInSeconds));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、spring-data-elasticsearch" tabindex="-1">六、Spring Data Elasticsearch <a class="header-anchor" href="#六、spring-data-elasticsearch" aria-label="Permalink to &quot;六、Spring Data Elasticsearch&quot;">​</a></h2><h3 id="_6-1-elasticsearch-repository" tabindex="-1">6.1 Elasticsearch Repository <a class="header-anchor" href="#_6-1-elasticsearch-repository" aria-label="Permalink to &quot;6.1 Elasticsearch Repository&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 文档映射</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Document</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">indexName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;products&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">createIndex</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Setting</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">settingPath</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;/elasticsearch/settings/product-settings.json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">MultiField</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        mainField</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Text, </span><span class="__shiki_dzsirb">analyzer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;standard&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        otherFields</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">InnerField</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">suffix</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;keyword&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Keyword),</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">InnerField</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">suffix</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;suggest&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Text, </span></span>
<span class="line"><span class="__shiki_dzsirb">                       analyzer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;autocomplete&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Text, </span><span class="__shiki_dzsirb">analyzer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;english&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String description;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Double)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Double price;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Integer)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Integer stock;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Keyword)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; categories;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Date, </span><span class="__shiki_dzsirb">format</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> DateFormat.date_hour_minute_second)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDateTime createdAt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeoPointField</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> GeoPoint location;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Nested类型</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Nested)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Review</span><span class="__shiki_140thh">&gt; reviews;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // getter/setter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 嵌套文档</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Review</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Text)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String content;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Integer)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Integer rating;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Field</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FieldType.Date)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDateTime reviewDate;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Repository定义</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> ProductRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> ElasticsearchRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基本查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByName</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByPriceBetween</span><span class="__shiki_140thh">(Double </span><span class="__shiki_1jdh33">minPrice</span><span class="__shiki_140thh">, Double </span><span class="__shiki_1jdh33">maxPrice</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 全文搜索</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByDescriptionContaining</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">keyword</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 嵌套查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByReviewsRatingGreaterThan</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> minRating</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 地理查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByLocationNear</span><span class="__shiki_140thh">(GeoPoint </span><span class="__shiki_1jdh33">point</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">distance</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动补全</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByNameSuggest</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">prefix</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // @Query注解</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;bool&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;must&quot;: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">              { &quot;match&quot;: { &quot;name&quot;: &quot;?0&quot; } },</span></span>
<span class="line"><span class="__shiki_mdbnqw">              { &quot;range&quot;: { &quot;price&quot;: { &quot;gte&quot;: ?1, &quot;lte&quot;: ?2 } } }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ]</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByNameAndPriceRange</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, Double </span><span class="__shiki_1jdh33">minPrice</span><span class="__shiki_140thh">, Double </span><span class="__shiki_1jdh33">maxPrice</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 高亮查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Highlight</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">fields</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">HighlightField</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;name&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">HighlightField</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;description&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">match</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: {</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">_all</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">?0</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    SearchHits&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">searchWithHighlight</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">keyword</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用SearchTemplate</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ProductSearchService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> ElasticsearchRestTemplate elasticsearchTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> SearchHits&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">searchProducts</span><span class="__shiki_140thh">(ProductSearchCriteria </span><span class="__shiki_1jdh33">criteria</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        NativeSearchQueryBuilder queryBuilder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> NativeSearchQueryBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 构建bool查询</span></span>
<span class="line"><span class="__shiki_140thh">        BoolQueryBuilder boolQuery </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> QueryBuilders.</span><span class="__shiki_1t8gfj">boolQuery</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getKeyword</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            boolQuery.</span><span class="__shiki_1t8gfj">must</span><span class="__shiki_140thh">(QueryBuilders.</span><span class="__shiki_1t8gfj">multiMatchQuery</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getKeyword</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2.0f</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// boost权重</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;description&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">type</span><span class="__shiki_140thh">(MultiMatchQueryBuilder.Type.BEST_FIELDS));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getMinPrice</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> criteria.</span><span class="__shiki_1t8gfj">getMaxPrice</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            RangeQueryBuilder rangeQuery </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> QueryBuilders.</span><span class="__shiki_1t8gfj">rangeQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;price&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getMinPrice</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                rangeQuery.</span><span class="__shiki_1t8gfj">gte</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getMinPrice</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getMaxPrice</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                rangeQuery.</span><span class="__shiki_1t8gfj">lte</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getMaxPrice</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            boolQuery.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(rangeQuery);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getCategories</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">criteria.</span><span class="__shiki_1t8gfj">getCategories</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">            boolQuery.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(QueryBuilders.</span><span class="__shiki_1t8gfj">termsQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;categories&quot;</span><span class="__shiki_140thh">, criteria.</span><span class="__shiki_1t8gfj">getCategories</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 聚合</span></span>
<span class="line"><span class="__shiki_140thh">        TermsAggregationBuilder categoryAgg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AggregationBuilders.</span><span class="__shiki_1t8gfj">terms</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;by_category&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;categories.keyword&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        RangeAggregationBuilder priceAgg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AggregationBuilders.</span><span class="__shiki_1t8gfj">range</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;by_price&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;price&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">addRange</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">addRange</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">addRange</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">addRange</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 高亮</span></span>
<span class="line"><span class="__shiki_140thh">        HighlightBuilder highlightBuilder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HighlightBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">field</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;description&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">preTags</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;em&gt;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">postTags</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;/em&gt;&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 构建查询</span></span>
<span class="line"><span class="__shiki_140thh">        NativeSearchQuery searchQuery </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queryBuilder</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">withQuery</span><span class="__shiki_140thh">(boolQuery)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">withAggregations</span><span class="__shiki_140thh">(categoryAgg, priceAgg)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">withHighlightBuilder</span><span class="__shiki_140thh">(highlightBuilder)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">withPageable</span><span class="__shiki_140thh">(PageRequest.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getPage</span><span class="__shiki_140thh">(), criteria.</span><span class="__shiki_1t8gfj">getSize</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">withSort</span><span class="__shiki_140thh">(SortBuilders.</span><span class="__shiki_1t8gfj">fieldSort</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;_score&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">order</span><span class="__shiki_140thh">(SortOrder.DESC))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> elasticsearchTemplate.</span><span class="__shiki_1t8gfj">search</span><span class="__shiki_140thh">(searchQuery, Product.class);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动补全</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">autocompleteProductNames</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">prefix</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        CompletionSuggestionBuilder suggestionBuilder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            SuggestBuilders.</span><span class="__shiki_1t8gfj">completionSuggestion</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;name.suggest&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">prefix</span><span class="__shiki_140thh">(prefix)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">skipDuplicates</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        SuggestBuilder suggestBuilder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SuggestBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">addSuggestion</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product-suggest&quot;</span><span class="__shiki_140thh">, suggestionBuilder);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        SearchSourceBuilder sourceBuilder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SearchSourceBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">suggest</span><span class="__shiki_140thh">(suggestBuilder);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        SearchRequest searchRequest </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SearchRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;products&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">source</span><span class="__shiki_140thh">(sourceBuilder);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        SearchResponse response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> elasticsearchTemplate.</span><span class="__shiki_1t8gfj">suggest</span><span class="__shiki_140thh">(searchRequest, RequestOptions.DEFAULT);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">getSuggest</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">getSuggestion</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product-suggest&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">getEntries</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">flatMap</span><span class="__shiki_140thh">(entry </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> entry.</span><span class="__shiki_1t8gfj">getOptions</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(CompletionSuggestion.Entry.Option</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">getText)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、spring-data-rest" tabindex="-1">七、Spring Data REST <a class="header-anchor" href="#七、spring-data-rest" aria-label="Permalink to &quot;七、Spring Data REST&quot;">​</a></h2><h3 id="_7-1-rest-repository自动暴露" tabindex="-1">7.1 REST Repository自动暴露 <a class="header-anchor" href="#_7-1-rest-repository自动暴露" aria-label="Permalink to &quot;7.1 REST Repository自动暴露&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 启用Spring Data REST</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableJpaRepositories</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">basePackages</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;com.example.repository&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableJpaAuditing</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableSpringDataWebSupport</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RestConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 配置</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实体定义</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> GenerationType.IDENTITY)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String username;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String email;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">CreatedDate</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDateTime createdDate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">LastModifiedDate</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDateTime lastModifiedDate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OneToMany</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">mappedBy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">RestResource</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;orders&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">rel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;orders&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; orders;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // getter/setter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Repository自动暴露REST端点</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">RepositoryRestResource</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">    path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    collectionResourceRel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    itemResourceRel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;user&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    excerptProjection</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> UserProjection.class</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">RestResource</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;by-username&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">rel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;username&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findByUsername</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">) String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">RestResource</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;by-email&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">rel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;email&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByEmailContaining</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">) String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">, Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 投影</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Projection</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;summary&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">types</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> User.class)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserProjection</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    String </span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    String </span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    LocalDateTime </span><span class="__shiki_1t8gfj">getCreatedDate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义控制器</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">RestController</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">RequestMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">ExposesResourceFor</span><span class="__shiki_140thh">(User.class)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserController</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自定义端点</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GetMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/{id}/profile&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> ResponseEntity&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getUserProfile</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">PathVariable</span><span class="__shiki_140thh"> Long </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> ResponseEntity.</span><span class="__shiki_1t8gfj">ok</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            Map.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">, userRepository.</span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(id),</span></span>
<span class="line"><span class="__shiki_mdbnqw">                   &quot;statistics&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">getStatistics</span><span class="__shiki_140thh">(id)));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理特定请求</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PostMapping</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/{id}/activate&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">ResponseStatus</span><span class="__shiki_140thh">(HttpStatus.NO_CONTENT)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> activateUser</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">PathVariable</span><span class="__shiki_140thh"> Long </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(id)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">orElseThrow</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ResourceNotFoundException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User not found&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 激活逻辑</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-hal浏览器与api发现" tabindex="-1">7.2 HAL浏览器与API发现 <a class="header-anchor" href="#_7-2-hal浏览器与api发现" aria-label="Permalink to &quot;7.2 HAL浏览器与API发现&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># application.yml配置</span></span>
<span class="line"><span class="__shiki_17hn0y">spring</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    rest</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      base-path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/api</span></span>
<span class="line"><span class="__shiki_17hn0y">      default-page-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">      max-page-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">      return-body-on-create</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      return-body-on-update</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">      detection-strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">annotated</span></span>
<span class="line"><span class="__shiki_17hn0y">      enable-enum-translation</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  jpa</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    open-in-view</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安全配置</span></span>
<span class="line"><span class="__shiki_17hn0y">security</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  ignored</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">/api</span></span></code></pre></div><h2 id="八、事务管理与审计" tabindex="-1">八、事务管理与审计 <a class="header-anchor" href="#八、事务管理与审计" aria-label="Permalink to &quot;八、事务管理与审计&quot;">​</a></h2><h3 id="_8-1-spring-data事务管理" tabindex="-1">8.1 Spring Data事务管理 <a class="header-anchor" href="#_8-1-spring-data事务管理" aria-label="Permalink to &quot;8.1 Spring Data事务管理&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 声明式事务</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> AuditLogRepository auditLogRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        propagation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Propagation.REQUIRED,</span></span>
<span class="line"><span class="__shiki_dzsirb">        isolation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Isolation.READ_COMMITTED,</span></span>
<span class="line"><span class="__shiki_dzsirb">        timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        readOnly</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rollbackFor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {BusinessException.class, DataAccessException.class}</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">createUser</span><span class="__shiki_140thh">(UserDTO </span><span class="__shiki_1jdh33">userDTO</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查用户名是否存在</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (userRepository.</span><span class="__shiki_1t8gfj">existsByUsername</span><span class="__shiki_140thh">(userDTO.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">())) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> BusinessException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Username already exists&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建用户</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setUsername</span><span class="__shiki_140thh">(userDTO.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setEmail</span><span class="__shiki_140thh">(userDTO.</span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        User savedUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录审计日志</span></span>
<span class="line"><span class="__shiki_140thh">        AuditLog log </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AuditLog</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">setAction</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;USER_CREATED&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">setUserId</span><span class="__shiki_140thh">(savedUser.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        auditLogRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(log);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> savedUser;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">propagation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Propagation.REQUIRES_NEW)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> logAuditEvent</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">action</span><span class="__shiki_140thh">, Long </span><span class="__shiki_1jdh33">userId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        AuditLog log </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AuditLog</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">setAction</span><span class="__shiki_140thh">(action);</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">setUserId</span><span class="__shiki_140thh">(userId);</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">setTimestamp</span><span class="__shiki_140thh">(LocalDateTime.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        auditLogRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(log);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 编程式事务</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> TransactionalUserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> PlatformTransactionManager transactionManager;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">createUserWithProgrammaticTx</span><span class="__shiki_140thh">(UserDTO </span><span class="__shiki_1jdh33">userDTO</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        TransactionDefinition definition </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DefaultTransactionDefinition</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        TransactionStatus status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> transactionManager.</span><span class="__shiki_1t8gfj">getTransaction</span><span class="__shiki_140thh">(definition);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            user.</span><span class="__shiki_1t8gfj">setUsername</span><span class="__shiki_140thh">(userDTO.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            user.</span><span class="__shiki_1t8gfj">setEmail</span><span class="__shiki_140thh">(userDTO.</span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            User savedUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            transactionManager.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">(status);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> savedUser;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            transactionManager.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">(status);</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_140thh"> e;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-审计功能" tabindex="-1">8.2 审计功能 <a class="header-anchor" href="#_8-2-审计功能" aria-label="Permalink to &quot;8.2 审计功能&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 启用JPA审计</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableJpaAuditing</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AuditConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> AuditorAware&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">auditorAware</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> Optional.</span><span class="__shiki_1t8gfj">ofNullable</span><span class="__shiki_140thh">(SecurityContextHolder.</span><span class="__shiki_1t8gfj">getContext</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(SecurityContext</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">getAuthentication)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(Authentication</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">isAuthenticated)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(Authentication</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">getName)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">or</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> Optional.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;system&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> DateTimeProvider </span><span class="__shiki_1t8gfj">dateTimeProvider</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> Optional.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(LocalDateTime.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 审计实体</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EntityListeners</span><span class="__shiki_140thh">(AuditingEntityListener.class)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AuditableEntity</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">CreatedDate</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">updatable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDateTime createdDate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">LastModifiedDate</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDateTime lastModifiedDate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">CreatedBy</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">updatable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String createdBy;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">LastModifiedBy</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String lastModifiedBy;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Version</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long version;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义审计监听器</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CustomAuditListener</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PrePersist</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> prePersist</span><span class="__shiki_140thh">(Object </span><span class="__shiki_1jdh33">entity</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (entity </span><span class="__shiki_1itgoe">instanceof</span><span class="__shiki_140thh"> Auditable) {</span></span>
<span class="line"><span class="__shiki_140thh">            Auditable auditable </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Auditable) entity;</span></span>
<span class="line"><span class="__shiki_140thh">            auditable.</span><span class="__shiki_1t8gfj">setCreatedDate</span><span class="__shiki_140thh">(LocalDateTime.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            auditable.</span><span class="__shiki_1t8gfj">setCreatedBy</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">getCurrentUser</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PreUpdate</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> preUpdate</span><span class="__shiki_140thh">(Object </span><span class="__shiki_1jdh33">entity</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (entity </span><span class="__shiki_1itgoe">instanceof</span><span class="__shiki_140thh"> Auditable) {</span></span>
<span class="line"><span class="__shiki_140thh">            Auditable auditable </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Auditable) entity;</span></span>
<span class="line"><span class="__shiki_140thh">            auditable.</span><span class="__shiki_1t8gfj">setLastModifiedDate</span><span class="__shiki_140thh">(LocalDateTime.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            auditable.</span><span class="__shiki_1t8gfj">setLastModifiedBy</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">getCurrentUser</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">getCurrentUser</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 从SecurityContext或ThreadLocal获取当前用户</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> SecurityContextHolder.</span><span class="__shiki_1t8gfj">getContext</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">getAuthentication</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、测试与调试" tabindex="-1">九、测试与调试 <a class="header-anchor" href="#九、测试与调试" aria-label="Permalink to &quot;九、测试与调试&quot;">​</a></h2><h3 id="_9-1-repository测试" tabindex="-1">9.1 Repository测试 <a class="header-anchor" href="#_9-1-repository测试" aria-label="Permalink to &quot;9.1 Repository测试&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">DataJpaTest</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">AutoConfigureTestDatabase</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">replace</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> AutoConfigureTestDatabase.Replace.NONE)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">propagation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Propagation.NOT_SUPPORTED) </span><span class="__shiki_21nrsd">// 禁用测试事务</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserRepositoryTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> TestEntityManager testEntityManager;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">BeforeEach</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setUp</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 准备测试数据</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setUsername</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;testuser&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        testEntityManager.</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        testEntityManager.</span><span class="__shiki_1t8gfj">flush</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> whenFindByUsername_thenReturnUser</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行测试</span></span>
<span class="line"><span class="__shiki_140thh">        User found </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findByUsername</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;testuser&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 验证结果</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(found).</span><span class="__shiki_1t8gfj">isNotNull</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(found.</span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">isEqualTo</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Sql</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/test-data/users.sql&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 使用SQL脚本初始化数据</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Sql</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">scripts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;/test-data/cleanup.sql&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">executionPhase</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> AFTER_TEST_METHOD)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> whenFindAllActive_thenReturnActiveUsers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; activeUsers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findByActiveTrue</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(activeUsers).</span><span class="__shiki_1t8gfj">hasSize</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Rollback</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 禁用自动回滚</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> whenSaveUser_thenPersistToDatabase</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        User newUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        newUser.</span><span class="__shiki_1t8gfj">setUsername</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;newuser&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        newUser.</span><span class="__shiki_1t8gfj">setEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;new@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        User saved </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(newUser);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 验证数据库中的记录</span></span>
<span class="line"><span class="__shiki_140thh">        User fromDb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> testEntityManager.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(User.class, saved.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(fromDb).</span><span class="__shiki_1t8gfj">isNotNull</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(fromDb.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">isEqualTo</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;newuser&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// MongoDB测试</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">DataMongoTest</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">ExtendWith</span><span class="__shiki_140thh">(SpringExtension.class)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ProductRepositoryTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> ProductRepository productRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> MongoTemplate mongoTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">BeforeEach</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setUp</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        productRepository.</span><span class="__shiki_1t8gfj">deleteAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Product product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        product.</span><span class="__shiki_1t8gfj">setName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Test Product&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        product.</span><span class="__shiki_1t8gfj">setPrice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">99.99</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        productRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(product);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> whenFindByName_thenReturnProduct</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> productRepository.</span><span class="__shiki_1t8gfj">findByName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Test Product&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(products).</span><span class="__shiki_1t8gfj">hasSize</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(products.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">getPrice</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">isEqualTo</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">99.99</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Redis测试</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">DataRedisTest</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserRedisRepositoryTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> RedisTemplate&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; redisTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> whenSaveUser_thenCanRetrieveFromRedis</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setId</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test-id&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setUsername</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;testuser&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        Optional&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; found </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test-id&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(found).</span><span class="__shiki_1t8gfj">isPresent</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        assertThat</span><span class="__shiki_140thh">(found.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">isEqualTo</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;testuser&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-集成测试" tabindex="-1">9.2 集成测试 <a class="header-anchor" href="#_9-2-集成测试" aria-label="Permalink to &quot;9.2 集成测试&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">SpringBootTest</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">AutoConfigureMockMvc</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">TestPropertySource</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">locations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;classpath:application-test.properties&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">ActiveProfiles</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserControllerIntegrationTest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> MockMvc mockMvc;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> ObjectMapper objectMapper;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">BeforeEach</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setUp</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        userRepository.</span><span class="__shiki_1t8gfj">deleteAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> whenCreateUser_thenSuccess</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_140thh">        UserDTO userDTO </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserDTO</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        userDTO.</span><span class="__shiki_1t8gfj">setUsername</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;testuser&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        userDTO.</span><span class="__shiki_1t8gfj">setEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        mockMvc.</span><span class="__shiki_1t8gfj">perform</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/users&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">contentType</span><span class="__shiki_140thh">(MediaType.APPLICATION_JSON)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">content</span><span class="__shiki_140thh">(objectMapper.</span><span class="__shiki_1t8gfj">writeValueAsString</span><span class="__shiki_140thh">(userDTO)))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isCreated</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">jsonPath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;$.username&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;testuser&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">jsonPath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;$.email&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> whenGetUser_thenReturnUser</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setUsername</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;existinguser&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;existing@example.com&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        mockMvc.</span><span class="__shiki_1t8gfj">perform</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/users/{id}&quot;</span><span class="__shiki_140thh">, user.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isOk</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">jsonPath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;$.username&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">value</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;existinguser&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Test</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">WithMockUser</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">username</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;admin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">roles</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;ADMIN&quot;</span><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> whenAdminGetAllUsers_thenSuccess</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Exception {</span></span>
<span class="line"><span class="__shiki_140thh">        mockMvc.</span><span class="__shiki_1t8gfj">perform</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/users&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">andExpect</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isOk</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、最佳实践与性能优化" tabindex="-1">十、最佳实践与性能优化 <a class="header-anchor" href="#十、最佳实践与性能优化" aria-label="Permalink to &quot;十、最佳实践与性能优化&quot;">​</a></h2><h3 id="_10-1-性能优化策略" tabindex="-1">10.1 性能优化策略 <a class="header-anchor" href="#_10-1-性能优化策略" aria-label="Permalink to &quot;10.1 性能优化策略&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. N+1查询问题解决方案</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用JOIN FETCH</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.orders&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAllWithOrders</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用@EntityGraph</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EntityGraph</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">attributePaths</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;orders.items&quot;</span><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EntityGraph</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User.withOrdersAndItems&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 实体定义</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">NamedEntityGraphs</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">NamedEntityGraph</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;User.withOrders&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        attributeNodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">NamedAttributeNode</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">NamedEntityGraph</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;User.withOrdersAndItems&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        attributeNodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">NamedAttributeNode</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">NamedAttributeNode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;orders&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">subgraph</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;orderItems&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_dzsirb">        subgraphs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">NamedSubgraph</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">                name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;orderItems&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                attributeNodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">NamedAttributeNode</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;items&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 分页优化</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Page&lt;</span><span class="__shiki_1itgoe">UserDTO</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getUsersWithPagination</span><span class="__shiki_140thh">(UserSearchCriteria </span><span class="__shiki_1jdh33">criteria</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                                Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 优化COUNT查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">isComplex</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 对于复杂查询，使用单独的COUNT查询</span></span>
<span class="line"><span class="__shiki_140thh">            Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; userPage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findByComplexCriteria</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                criteria, pageable);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 转换为DTO</span></span>
<span class="line"><span class="__shiki_140thh">            List&lt;</span><span class="__shiki_1itgoe">UserDTO</span><span class="__shiki_140thh">&gt; dtos </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userPage.</span><span class="__shiki_1t8gfj">getContent</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">convertToDTO)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> PageImpl&lt;&gt;(dtos, pageable, userPage.</span><span class="__shiki_1t8gfj">getTotalElements</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 简单查询直接使用</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findBySimpleCriteria</span><span class="__shiki_140thh">(criteria, pageable)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">convertToDTO);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 批量操作优化</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> BatchUserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> batchInsertUsers</span><span class="__shiki_140thh">(List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">users</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 分批插入</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> batchSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">(); i </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> batchSize) {</span></span>
<span class="line"><span class="__shiki_140thh">            List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; batch </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">subList</span><span class="__shiki_140thh">(i, </span></span>
<span class="line"><span class="__shiki_140thh">                Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> batchSize, users.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">            userRepository.</span><span class="__shiki_1t8gfj">saveAll</span><span class="__shiki_140thh">(batch);</span></span>
<span class="line"><span class="__shiki_140thh">            userRepository.</span><span class="__shiki_1t8gfj">flush</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 强制刷新到数据库</span></span>
<span class="line"><span class="__shiki_140thh">            userRepository.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 清除持久化上下文，防止内存溢出</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用原生SQL批量更新</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Modifying</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">nativeQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">           value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;UPDATE users SET status = :status WHERE id IN :ids&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> updateUserStatusBatch</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ids&quot;</span><span class="__shiki_140thh">) List&lt;</span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">ids</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                               @</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">) String </span><span class="__shiki_1jdh33">status</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-监控与指标" tabindex="-1">10.2 监控与指标 <a class="header-anchor" href="#_10-2-监控与指标" aria-label="Permalink to &quot;10.2 监控与指标&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. Spring Boot Actuator端点</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> MetricsConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> MeterRegistryCustomizer&lt;</span><span class="__shiki_1itgoe">MeterRegistry</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">metricsCommonTags</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> registry </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> registry.</span><span class="__shiki_1t8gfj">config</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">commonTags</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;application&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user-service&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;environment&quot;</span><span class="__shiki_140thh">, System.</span><span class="__shiki_1t8gfj">getenv</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ENV&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 自定义指标</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> RepositoryMetrics</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> MeterRegistry meterRegistry;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Timer</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">Sample</span><span class="__shiki_140thh">&gt; timerSamples </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ConcurrentHashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> RepositoryMetrics</span><span class="__shiki_140thh">(MeterRegistry </span><span class="__shiki_1jdh33">meterRegistry</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.meterRegistry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> meterRegistry;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Around</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;execution(* com.example.repository.*.*(..))&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Object </span><span class="__shiki_1t8gfj">measureRepositoryMethod</span><span class="__shiki_140thh">(ProceedingJoinPoint </span><span class="__shiki_1jdh33">joinPoint</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> Throwable {</span></span>
<span class="line"><span class="__shiki_140thh">        String methodName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> joinPoint.</span><span class="__shiki_1t8gfj">getSignature</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toShortString</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        Timer.Sample sample </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Timer.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">(meterRegistry);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> joinPoint.</span><span class="__shiki_1t8gfj">proceed</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            sample.</span><span class="__shiki_1t8gfj">stop</span><span class="__shiki_140thh">(meterRegistry.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;repository.method.duration&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;method&quot;</span><span class="__shiki_140thh">, methodName,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;class&quot;</span><span class="__shiki_140thh">, joinPoint.</span><span class="__shiki_1t8gfj">getTarget</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getClass</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getSimpleName</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录调用次数</span></span>
<span class="line"><span class="__shiki_140thh">            meterRegistry.</span><span class="__shiki_1t8gfj">counter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;repository.method.calls&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;method&quot;</span><span class="__shiki_140thh">, methodName).</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 监控慢查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EventListener</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleAfterQuery</span><span class="__shiki_140thh">(AfterQueryEvent </span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 超过1秒</span></span>
<span class="line"><span class="__shiki_140thh">            meterRegistry.</span><span class="__shiki_1t8gfj">counter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;repository.slow.queries&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Slow query detected: {} - {} ms&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                event.</span><span class="__shiki_1t8gfj">getSql</span><span class="__shiki_140thh">(), duration);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DatabaseHealthIndicator</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> HealthIndicator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Health </span><span class="__shiki_1t8gfj">health</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 执行简单查询检查数据库连接</span></span>
<span class="line"><span class="__shiki_140thh">            userRepository.</span><span class="__shiki_1t8gfj">count</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 检查连接池状态</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> Health.</span><span class="__shiki_1t8gfj">up</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">withDetail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;database&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;connected&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">withDetail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">, LocalDateTime.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> Health.</span><span class="__shiki_1t8gfj">down</span><span class="__shiki_140thh">(e)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">withDetail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;database&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;disconnected&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">withDetail</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">, e.</span><span class="__shiki_1t8gfj">getMessage</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">build</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-3-缓存策略" tabindex="-1">10.3 缓存策略 <a class="header-anchor" href="#_10-3-缓存策略" aria-label="Permalink to &quot;10.3 缓存策略&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. Spring Cache与Repository集成</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableCaching</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CacheConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> CacheManager </span><span class="__shiki_1t8gfj">cacheManager</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        CaffeineCacheManager cacheManager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CaffeineCacheManager</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        cacheManager.</span><span class="__shiki_1t8gfj">setCaffeine</span><span class="__shiki_140thh">(Caffeine.</span><span class="__shiki_1t8gfj">newBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">expireAfterWrite</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, TimeUnit.MINUTES)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">maximumSize</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">recordStats</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> cacheManager;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 缓存Repository方法</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Repository</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Cacheable</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;#id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unless</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;#result == null&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Optional&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findById</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Cacheable</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;#username&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findByUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">CacheEvict</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;#user.id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1itgoe">S</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1itgoe"> User</span><span class="__shiki_140thh">&gt; S </span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(S </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">CacheEvict</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;#id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> deleteById</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">CacheEvict</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;users&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">allEntries</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> clearCache</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 二级缓存配置（JPA）</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Cacheable</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Cache</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">usage</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> CacheConcurrencyStrategy.READ_WRITE, </span><span class="__shiki_dzsirb">region</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;userCache&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 查询缓存</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">QueryHints</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">QueryHint</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;org.hibernate.cacheable&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;true&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">QueryHint</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;org.hibernate.cacheRegion&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;userQueries&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u FROM User u WHERE u.active = true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findAllActive</span><span class="__shiki_140thh">();</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Spring Data抽象层通过统一的Repository模式，极大地简化了数据访问层的开发。无论是关系型数据库、文档数据库、键值存储还是搜索引擎，Spring Data都提供了一致的编程模型。</p><h3 id="关键最佳实践" tabindex="-1">关键最佳实践： <a class="header-anchor" href="#关键最佳实践" aria-label="Permalink to &quot;关键最佳实践：&quot;">​</a></h3><ol><li><strong>合理选择Repository类型</strong>：根据数据存储类型选择合适的Repository接口</li><li><strong>查询方法设计</strong>：遵循命名约定，合理使用@Query注解</li><li><strong>性能优化</strong>：解决N+1问题，合理使用分页和缓存</li><li><strong>事务管理</strong>：合理划分事务边界，避免长事务</li><li><strong>测试策略</strong>：分层测试，使用合适的测试工具</li></ol><h3 id="学习路径建议" tabindex="-1">学习路径建议： <a class="header-anchor" href="#学习路径建议" aria-label="Permalink to &quot;学习路径建议：&quot;">​</a></h3><ol><li><strong>入门</strong>：Spring Data JPA（关系型数据库）</li><li><strong>进阶</strong>：Spring Data MongoDB（文档数据库）</li><li><strong>扩展</strong>：Spring Data Redis、Elasticsearch等</li><li><strong>高级</strong>：Spring Data REST、多数据源、分布式事务</li></ol><p>Spring Data是Spring生态系统中非常重要的组成部分，掌握Spring Data对于构建现代Java应用至关重要。</p>`,75)])])}const r=a(p,[["render",h]]);export{g as __pageData,r as default};
