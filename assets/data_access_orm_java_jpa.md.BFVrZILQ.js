import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"JPA（Java Persistence API）规范实现学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/java/jpa.md","filePath":"data/access/orm/java/jpa.md"}'),p={name:"data/access/orm/java/jpa.md"};function h(l,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="jpa-java-persistence-api-规范实现学习笔记" tabindex="-1">JPA（Java Persistence API）规范实现学习笔记 <a class="header-anchor" href="#jpa-java-persistence-api-规范实现学习笔记" aria-label="Permalink to &quot;JPA（Java Persistence API）规范实现学习笔记&quot;">​</a></h1><h2 id="一、jpa概述与历史演进" tabindex="-1">一、JPA概述与历史演进 <a class="header-anchor" href="#一、jpa概述与历史演进" aria-label="Permalink to &quot;一、JPA概述与历史演进&quot;">​</a></h2><h3 id="_1-1-jpa是什么" tabindex="-1">1.1 JPA是什么？ <a class="header-anchor" href="#_1-1-jpa是什么" aria-label="Permalink to &quot;1.1 JPA是什么？&quot;">​</a></h3><ul><li><strong>定义</strong>：Java Persistence API（JPA）是Java EE和Jakarta EE平台中用于对象关系映射（ORM）的官方规范</li><li><strong>目标</strong>：提供一种标准化的方式，将Java对象映射到关系数据库</li><li><strong>地位</strong>：JPA是一个规范，不是具体的实现（类似JDBC规范）</li></ul><h3 id="_1-2-jpa规范的历史演进" tabindex="-1">1.2 JPA规范的历史演进 <a class="header-anchor" href="#_1-2-jpa规范的历史演进" aria-label="Permalink to &quot;1.2 JPA规范的历史演进&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">JPA 1.0 (2006) → JPA 2.0 (2009) → JPA 2.1 (2013) → JPA 2.2 (2017) → Jakarta Persistence 3.0 (2020) → Jakarta Persistence 3.1 (2022)</span></span></code></pre></div><h3 id="_1-3-jpa实现提供商" tabindex="-1">1.3 JPA实现提供商 <a class="header-anchor" href="#_1-3-jpa实现提供商" aria-label="Permalink to &quot;1.3 JPA实现提供商&quot;">​</a></h3><table tabindex="0"><thead><tr><th>实现</th><th>提供商</th><th>特点</th></tr></thead><tbody><tr><td><strong>Hibernate</strong></td><td>Red Hat</td><td>最流行，功能最丰富</td></tr><tr><td><strong>EclipseLink</strong></td><td>Eclipse基金会</td><td>JPA参考实现，源自Oracle TopLink</td></tr><tr><td><strong>Apache OpenJPA</strong></td><td>Apache基金会</td><td>轻量级，Apache许可</td></tr><tr><td><strong>DataNucleus</strong></td><td>DataNucleus</td><td>支持JPA、JDO、REST</td></tr><tr><td><strong>IBM WebSphere</strong></td><td>IBM</td><td>商业实现</td></tr></tbody></table><h3 id="_1-4-jpa-vs-hibernate" tabindex="-1">1.4 JPA vs Hibernate <a class="header-anchor" href="#_1-4-jpa-vs-hibernate" aria-label="Permalink to &quot;1.4 JPA vs Hibernate&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// JPA是接口，Hibernate是实现</span></span>
<span class="line"><span class="__shiki_140thh">JPA规范 ≈ JDBC规范</span></span>
<span class="line"><span class="__shiki_140thh">Hibernate ≈ MySQL JDBC Driver</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用JPA API编写代码</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;  </span><span class="__shiki_21nrsd">// JPA注解</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Hibernate特定功能（超出JPA规范）</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">FilterDef</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;activeFilter&quot;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// Hibernate特有注解</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="二、jpa架构与核心组件" tabindex="-1">二、JPA架构与核心组件 <a class="header-anchor" href="#二、jpa架构与核心组件" aria-label="Permalink to &quot;二、JPA架构与核心组件&quot;">​</a></h2><h3 id="_2-1-jpa三层架构模型" tabindex="-1">2.1 JPA三层架构模型 <a class="header-anchor" href="#_2-1-jpa三层架构模型" aria-label="Permalink to &quot;2.1 JPA三层架构模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">应用程序层 (Application)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">JPA API层 (EntityManager, Query, Criteria API)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">持久化提供程序层 (Hibernate, EclipseLink等实现)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">数据库层 (JDBC驱动)</span></span></code></pre></div><h3 id="_2-2-核心接口与类" tabindex="-1">2.2 核心接口与类 <a class="header-anchor" href="#_2-2-核心接口与类" aria-label="Permalink to &quot;2.2 核心接口与类&quot;">​</a></h3><h4 id="_2-2-1-persistence类" tabindex="-1">2.2.1 Persistence类 <a class="header-anchor" href="#_2-2-1-persistence类" aria-label="Permalink to &quot;2.2.1 Persistence类&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 入口点：创建EntityManagerFactory</span></span>
<span class="line"><span class="__shiki_140thh">EntityManagerFactory emf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Persistence.</span><span class="__shiki_1t8gfj">createEntityManagerFactory</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;my-persistence-unit&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 从persistence.xml加载配置</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">persistence xmlns</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;http://xmlns.jcp.org/xml/ns/persistence&quot;</span></span>
<span class="line"><span class="__shiki_140thh">             xmlns</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">xsi</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span class="__shiki_140thh">             xsi</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">schemaLocation</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;http://xmlns.jcp.org/xml/ns/persistence</span></span>
<span class="line"><span class="__shiki_mdbnqw">             http://xmlns.jcp.org/xml/ns/persistence/persistence_2_2.xsd&quot;</span></span>
<span class="line"><span class="__shiki_140thh">             version</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;2.2&quot;</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;</span><span class="__shiki_140thh">persistence</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">unit name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;my-persistence-unit&quot;</span><span class="__shiki_140thh"> transaction</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">type</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;RESOURCE_LOCAL&quot;</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">provider</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">org.hibernate.jpa.HibernatePersistenceProvider</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">provider</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">class</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">com.example.User</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">class</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">properties</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            &lt;</span><span class="__shiki_140thh">property name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.url&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                      value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;jdbc:mysql://localhost:3306/test&quot;</span><span class="__shiki_1itgoe">/&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            &lt;</span><span class="__shiki_140thh">property name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.user&quot;</span><span class="__shiki_140thh"> value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;root&quot;</span><span class="__shiki_1itgoe">/&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            &lt;</span><span class="__shiki_140thh">property name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.password&quot;</span><span class="__shiki_140thh"> value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;password&quot;</span><span class="__shiki_1itgoe">/&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            &lt;</span><span class="__shiki_140thh">property name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.driver&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                      value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;com.mysql.cj.jdbc.Driver&quot;</span><span class="__shiki_1itgoe">/&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            &lt;</span><span class="__shiki_140thh">property name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;hibernate.dialect&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                      value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;org.hibernate.dialect.MySQL8Dialect&quot;</span><span class="__shiki_1itgoe">/&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;/</span><span class="__shiki_140thh">properties</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;/</span><span class="__shiki_140thh">persistence</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">unit</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">persistence</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><h4 id="_2-2-2-entitymanagerfactory" tabindex="-1">2.2.2 EntityManagerFactory <a class="header-anchor" href="#_2-2-2-entitymanagerfactory" aria-label="Permalink to &quot;2.2.2 EntityManagerFactory&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建EntityManagerFactory（重量级对象）</span></span>
<span class="line"><span class="__shiki_140thh">EntityManagerFactory emf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Persistence</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">createEntityManagerFactory</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;my-persistence-unit&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 标准属性配置（JPA规范）</span></span>
<span class="line"><span class="__shiki_140thh">Properties props </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Properties</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">props.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.url&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;jdbc:mysql://localhost:3306/test&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">props.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.user&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;root&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">props.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.password&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;password&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">props.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.driver&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;com.mysql.cj.jdbc.Driver&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">props.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.schema-generation.database.action&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;create&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 创建EntityManager</span></span>
<span class="line"><span class="__shiki_140thh">EntityManager em </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> emf.</span><span class="__shiki_1t8gfj">createEntityManager</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 关闭工厂（应用关闭时）</span></span>
<span class="line"><span class="__shiki_140thh">emf.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span></code></pre></div><h4 id="_2-2-3-entitymanager" tabindex="-1">2.2.3 EntityManager <a class="header-anchor" href="#_2-2-3-entitymanager" aria-label="Permalink to &quot;2.2.3 EntityManager&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// EntityManager生命周期管理</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PersistenceContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManager em;  </span><span class="__shiki_21nrsd">// 容器管理</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> createUser</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        EntityManager em </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> emf.</span><span class="__shiki_1t8gfj">createEntityManager</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 应用管理</span></span>
<span class="line"><span class="__shiki_140thh">        EntityTransaction tx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">begin</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            em.</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (tx.</span><span class="__shiki_1t8gfj">isActive</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">                tx.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_140thh"> e;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            em.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// EntityManager操作类型</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> EntityManagerOperations</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> crudOperations</span><span class="__shiki_140thh">(EntityManager </span><span class="__shiki_1jdh33">em</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 持久化（插入）</span></span>
<span class="line"><span class="__shiki_140thh">        User newUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;John&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(newUser);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 查找（按主键）</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(User.class, </span><span class="__shiki_dzsirb">1L</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 合并（更新或插入）</span></span>
<span class="line"><span class="__shiki_140thh">        user.</span><span class="__shiki_1t8gfj">setName</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Jane&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">merge</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 删除</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 5. 刷新（从数据库重新加载）</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">refresh</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 6. 分离（从持久化上下文移除）</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">detach</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 7. 包含检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        boolean</span><span class="__shiki_140thh"> managed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">contains</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 8. 清除持久化上下文</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 9. 获取EntityManagerFactory</span></span>
<span class="line"><span class="__shiki_140thh">        EntityManagerFactory factory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getEntityManagerFactory</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 10. 获取底层提供程序</span></span>
<span class="line"><span class="__shiki_140thh">        HibernateEntityManager hibernateEm </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">unwrap</span><span class="__shiki_140thh">(HibernateEntityManager.class);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="三、实体映射详解" tabindex="-1">三、实体映射详解 <a class="header-anchor" href="#三、实体映射详解" aria-label="Permalink to &quot;三、实体映射详解&quot;">​</a></h2><h3 id="_3-1-实体类要求" tabindex="-1">3.1 实体类要求 <a class="header-anchor" href="#_3-1-实体类要求" aria-label="Permalink to &quot;3.1 实体类要求&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> javax.persistence.</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> java.io.Serializable;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> java.time.LocalDateTime;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span><span class="__shiki_21nrsd">  // 标记为实体类</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Table</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;USERS&quot;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 指定表名</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Serializable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span><span class="__shiki_21nrsd">  // 主键</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> GenerationType.IDENTITY)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Basic</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">optional</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 基本类型映射</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;USER_NAME&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nullable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unique</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String username;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transient</span><span class="__shiki_21nrsd">  // 不持久化到数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String temporaryData;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Temporal</span><span class="__shiki_140thh">(TemporalType.TIMESTAMP)  </span><span class="__shiki_21nrsd">// 时间类型映射</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;CREATED_AT&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">updatable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Date createdAt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Java 8时间API（JPA 2.2+）</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDateTime updatedAt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Lob</span><span class="__shiki_21nrsd">  // 大对象</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;BIO&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String biography;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Enumerated</span><span class="__shiki_140thh">(EnumType.STRING)  </span><span class="__shiki_21nrsd">// 枚举映射</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;USER_ROLE&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Role role;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Version</span><span class="__shiki_21nrsd">  // 乐观锁版本字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long version;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 必须有无参构造函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 可以有其他构造函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> username;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.createdAt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 必须提供getter和setter</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 实体标识方法</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> equals</span><span class="__shiki_140thh">(Object </span><span class="__shiki_1jdh33">o</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_140thh"> o) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (o </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_1t8gfj"> getClass</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> o.</span><span class="__shiki_1t8gfj">getClass</span><span class="__shiki_140thh">()) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (User) o;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> id.</span><span class="__shiki_1t8gfj">equals</span><span class="__shiki_140thh">(user.id);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> hashCode</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> getClass</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">hashCode</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-主键生成策略" tabindex="-1">3.2 主键生成策略 <a class="header-anchor" href="#_3-2-主键生成策略" aria-label="Permalink to &quot;3.2 主键生成策略&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 自增（数据库生成）</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> GenerationType.IDENTITY)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 序列（Oracle, PostgreSQL等）</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> GenerationType.SEQUENCE, </span><span class="__shiki_dzsirb">generator</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;product_seq&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">SequenceGenerator</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;product_seq&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        sequenceName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;PRODUCT_SEQUENCE&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        allocationSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        initialValue</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long sequenceId;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 表生成器</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> GenerationType.TABLE, </span><span class="__shiki_dzsirb">generator</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;table_gen&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">TableGenerator</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;table_gen&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        table</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;ID_GENERATOR&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pkColumnName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;GEN_NAME&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        valueColumnName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;GEN_VALUE&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        pkColumnValue</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;PRODUCT_ID&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        allocationSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long tableId;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. UUID生成</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">generator</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;UUID&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GenericGenerator</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;UUID&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        strategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;org.hibernate.id.UUIDGenerator&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">updatable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nullable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UUID uuid;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-复合主键" tabindex="-1">3.3 复合主键 <a class="header-anchor" href="#_3-3-复合主键" aria-label="Permalink to &quot;3.3 复合主键&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 方法1：使用@IdClass</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">IdClass</span><span class="__shiki_140thh">(EmployeeId.class)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Employee</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String departmentCode;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String employeeNumber;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // getter/setter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> EmployeeId</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Serializable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String departmentCode;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String employeeNumber;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 必须有无参构造函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> EmployeeId</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> EmployeeId</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">departmentCode</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">employeeNumber</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.departmentCode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> departmentCode;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.employeeNumber </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> employeeNumber;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 必须实现equals和hashCode</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> equals</span><span class="__shiki_140thh">(Object </span><span class="__shiki_1jdh33">o</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">/* ... */</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> hashCode</span><span class="__shiki_140thh">() { </span><span class="__shiki_21nrsd">/* ... */</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法2：使用@EmbeddedId</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ProjectAssignment</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EmbeddedId</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> ProjectAssignmentId id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String role;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // getter/setter</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Embeddable</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ProjectAssignmentId</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Serializable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long projectId;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long employeeId;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 必须有无参构造函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ProjectAssignmentId</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 必须实现equals和hashCode</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、关系映射" tabindex="-1">四、关系映射 <a class="header-anchor" href="#四、关系映射" aria-label="Permalink to &quot;四、关系映射&quot;">​</a></h2><h3 id="_4-1-一对一关系" tabindex="-1">4.1 一对一关系 <a class="header-anchor" href="#_4-1-一对一关系" aria-label="Permalink to &quot;4.1 一对一关系&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 双向一对一</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OneToOne</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        mappedBy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;person&quot;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 由Address.person维护关系</span></span>
<span class="line"><span class="__shiki_dzsirb">        cascade</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> CascadeType.ALL,</span></span>
<span class="line"><span class="__shiki_dzsirb">        orphanRemoval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Address address;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置地址的辅助方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setAddress</span><span class="__shiki_140thh">(Address </span><span class="__shiki_1jdh33">address</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (address </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.address </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">                this</span><span class="__shiki_140thh">.address.</span><span class="__shiki_1t8gfj">setPerson</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            address.</span><span class="__shiki_1t8gfj">setPerson</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.address </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> address;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String street;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String city;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OneToOne</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;person_id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unique</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Person person;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 单向一对一（仅从一方引用）</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserProfile</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OneToOne</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">fetch</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FetchType.LAZY)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;user_id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> User user;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String bio;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String avatarUrl;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-一对多-多对一关系" tabindex="-1">4.2 一对多/多对一关系 <a class="header-anchor" href="#_4-2-一对多-多对一关系" aria-label="Permalink to &quot;4.2 一对多/多对一关系&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 双向一对多/多对一</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Department</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OneToMany</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        mappedBy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;department&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        cascade</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> CascadeType.ALL,</span></span>
<span class="line"><span class="__shiki_dzsirb">        orphanRemoval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        fetch</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FetchType.LAZY</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OrderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;lastName ASC, firstName ASC&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Employee</span><span class="__shiki_140thh">&gt; employees </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加员工的辅助方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> addEmployee</span><span class="__shiki_140thh">(Employee </span><span class="__shiki_1jdh33">employee</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        employees.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(employee);</span></span>
<span class="line"><span class="__shiki_140thh">        employee.</span><span class="__shiki_1t8gfj">setDepartment</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> removeEmployee</span><span class="__shiki_140thh">(Employee </span><span class="__shiki_1jdh33">employee</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        employees.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(employee);</span></span>
<span class="line"><span class="__shiki_140thh">        employee.</span><span class="__shiki_1t8gfj">setDepartment</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Employee</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String firstName;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String lastName;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">ManyToOne</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">fetch</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> FetchType.LAZY)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;department_id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nullable</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Department department;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 单向一对多（使用连接表）</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ShoppingCart</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OneToMany</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">cascade</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> CascadeType.ALL, </span><span class="__shiki_dzsirb">orphanRemoval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">JoinTable</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;CART_ITEMS&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        joinColumns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;cart_id&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        inverseJoinColumns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;item_id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">CartItem</span><span class="__shiki_140thh">&gt; items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-多对多关系" tabindex="-1">4.3 多对多关系 <a class="header-anchor" href="#_4-3-多对多关系" aria-label="Permalink to &quot;4.3 多对多关系&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 双向多对多</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Student</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">ManyToMany</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">JoinTable</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;STUDENT_COURSE&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        joinColumns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;student_id&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_dzsirb">        inverseJoinColumns</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;course_id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Set&lt;</span><span class="__shiki_1itgoe">Course</span><span class="__shiki_140thh">&gt; courses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashSet&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 辅助方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> addCourse</span><span class="__shiki_140thh">(Course </span><span class="__shiki_1jdh33">course</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        courses.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(course);</span></span>
<span class="line"><span class="__shiki_140thh">        course.</span><span class="__shiki_1t8gfj">getStudents</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> removeCourse</span><span class="__shiki_140thh">(Course </span><span class="__shiki_1jdh33">course</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        courses.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(course);</span></span>
<span class="line"><span class="__shiki_140thh">        course.</span><span class="__shiki_1t8gfj">getStudents</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Course</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String title;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String code;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">ManyToMany</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">mappedBy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;courses&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Set&lt;</span><span class="__shiki_1itgoe">Student</span><span class="__shiki_140thh">&gt; students </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashSet&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 带额外属性的多对多（使用关联实体）</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> StudentCourse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EmbeddedId</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> StudentCourseId id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">ManyToOne</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">MapsId</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;studentId&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;student_id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Student student;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">ManyToOne</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">MapsId</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;courseId&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">JoinColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;course_id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Course course;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> LocalDate enrollmentDate;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> BigDecimal grade;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构造函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> StudentCourse</span><span class="__shiki_140thh">(Student </span><span class="__shiki_1jdh33">student</span><span class="__shiki_140thh">, Course </span><span class="__shiki_1jdh33">course</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.student </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> student;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.course </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> course;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> StudentCourseId</span><span class="__shiki_140thh">(student.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">(), course.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、查询语言-jpql" tabindex="-1">五、查询语言：JPQL <a class="header-anchor" href="#五、查询语言-jpql" aria-label="Permalink to &quot;五、查询语言：JPQL&quot;">​</a></h2><h3 id="_5-1-jpql基础语法" tabindex="-1">5.1 JPQL基础语法 <a class="header-anchor" href="#_5-1-jpql基础语法" aria-label="Permalink to &quot;5.1 JPQL基础语法&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基本查询</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PersistenceContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManager em;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查询所有用户</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;SELECT u FROM User u ORDER BY u.username&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            User.class</span></span>
<span class="line"><span class="__shiki_140thh">        ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 条件查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByRole</span><span class="__shiki_140thh">(Role </span><span class="__shiki_1jdh33">role</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;SELECT u FROM User u WHERE u.role = :role&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            User.class</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;role&quot;</span><span class="__shiki_140thh">, role)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分页查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersWithPagination</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> page</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> size</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;SELECT u FROM User u ORDER BY u.id&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            User.class</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setFirstResult</span><span class="__shiki_140thh">((page </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> size)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setMaxResults</span><span class="__shiki_140thh">(size)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 聚合查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Long </span><span class="__shiki_1t8gfj">countActiveUsers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;SELECT COUNT(u) FROM User u WHERE u.active = true&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            Long.class</span></span>
<span class="line"><span class="__shiki_140thh">        ).</span><span class="__shiki_1t8gfj">getSingleResult</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Double </span><span class="__shiki_1t8gfj">averageUserAge</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;SELECT AVG(u.age) FROM User u&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">            Double.class</span></span>
<span class="line"><span class="__shiki_140thh">        ).</span><span class="__shiki_1t8gfj">getSingleResult</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 分组查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">[]&gt; </span><span class="__shiki_1t8gfj">countUsersByRole</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;SELECT u.role, COUNT(u) FROM User u GROUP BY u.role&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">            Object</span><span class="__shiki_140thh">[].class</span></span>
<span class="line"><span class="__shiki_140thh">        ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-连接查询" tabindex="-1">5.2 连接查询 <a class="header-anchor" href="#_5-2-连接查询" aria-label="Permalink to &quot;5.2 连接查询&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 内连接（隐式）</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;Object</span><span class="__shiki_140thh">[]</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findUsersWithOrders</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT u.username, o.orderNumber FROM User u, Order o &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;WHERE u.id = o.user.id&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">        Object</span><span class="__shiki_140thh">[].class</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 内连接（显式）</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findUsersWithOrdersExplicit</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT DISTINCT u FROM User u JOIN u.orders o &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;WHERE o.status = &#39;COMPLETED&#39;&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        User.class</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 左外连接</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;Object</span><span class="__shiki_140thh">[]</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findAllUsersWithOrders</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT u.username, o.orderNumber FROM User u &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;LEFT JOIN u.orders o&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">        Object</span><span class="__shiki_140thh">[].class</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// FETCH JOIN（解决N+1问题）</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findUsersWithOrdersFetch</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT DISTINCT u FROM User u &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;LEFT JOIN FETCH u.orders&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        User.class</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多重连接</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">Order</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findOrdersWithDetails</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT o FROM Order o &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;JOIN FETCH o.user &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;LEFT JOIN FETCH o.items &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;WHERE o.createdDate &gt;= :startDate&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        Order.class</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;startDate&quot;</span><span class="__shiki_140thh">, LocalDate.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">minusMonths</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-子查询与函数" tabindex="-1">5.3 子查询与函数 <a class="header-anchor" href="#_5-3-子查询与函数" aria-label="Permalink to &quot;5.3 子查询与函数&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 子查询</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findTopSpenders</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT u FROM User u WHERE &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;(SELECT SUM(o.totalAmount) FROM Order o WHERE o.user = u) &gt; 1000&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        User.class</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// EXISTS子查询</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findUsersWithOrders</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT u FROM User u WHERE EXISTS &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;(SELECT o FROM Order o WHERE o.user = u AND o.status = &#39;COMPLETED&#39;)&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        User.class</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// IN子查询</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findUsersInActiveDepartment</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT u FROM User u WHERE u.department.id IN &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;(SELECT d.id FROM Department d WHERE d.active = true)&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        User.class</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// JPA函数</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findUsersByNamePattern</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT u FROM User u WHERE &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;LOWER(u.username) LIKE LOWER(:pattern) AND &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;LENGTH(u.username) &gt; 5 AND &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;u.createdDate &gt; CURRENT_DATE - 30&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        User.class</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;pattern&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;%john%&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// CASE表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;Object</span><span class="__shiki_140thh">[]</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> categorizeUsersByAge</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT u.username, &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;CASE WHEN u.age &lt; 20 THEN &#39;Teen&#39; &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">             &quot;WHEN u.age BETWEEN 20 AND 40 THEN &#39;Young Adult&#39; &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">             &quot;WHEN u.age BETWEEN 40 AND 60 THEN &#39;Middle Aged&#39; &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">             &quot;ELSE &#39;Senior&#39; END &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;FROM User u&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">        Object</span><span class="__shiki_140thh">[].class</span></span>
<span class="line"><span class="__shiki_140thh">    ).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-4-命名查询" tabindex="-1">5.4 命名查询 <a class="header-anchor" href="#_5-4-命名查询" aria-label="Permalink to &quot;5.4 命名查询&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 在实体类上定义命名查询</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">NamedQueries</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">NamedQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;User.findByEmail&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT u FROM User u WHERE u.email = :email&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">NamedQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;User.findActiveUsers&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT u FROM User u WHERE u.active = true &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;ORDER BY u.username&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">NamedQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;User.countByRole&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT COUNT(u) FROM User u WHERE u.role = :role&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">NamedNativeQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">    name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;User.findTopUsers&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT * FROM users ORDER BY score DESC LIMIT :limit&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    resultClass</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> User.class</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用命名查询</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PersistenceContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManager em;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">findByEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createNamedQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User.findByEmail&quot;</span><span class="__shiki_140thh">, User.class)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">, email)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getSingleResult</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findActiveUsers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createNamedQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User.findActiveUsers&quot;</span><span class="__shiki_140thh">, User.class)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findTopUsers</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> limit</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createNamedNativeQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User.findTopUsers&quot;</span><span class="__shiki_140thh">, User.class)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;limit&quot;</span><span class="__shiki_140thh">, limit)</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、criteria-api" tabindex="-1">六、Criteria API <a class="header-anchor" href="#六、criteria-api" aria-label="Permalink to &quot;六、Criteria API&quot;">​</a></h2><h3 id="_6-1-criteria-api基础" tabindex="-1">6.1 Criteria API基础 <a class="header-anchor" href="#_6-1-criteria-api基础" aria-label="Permalink to &quot;6.1 Criteria API基础&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 动态查询构建器</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserSpecifications</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 查找用户（条件动态构建）</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsers</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">, Role </span><span class="__shiki_1jdh33">role</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                Integer </span><span class="__shiki_1jdh33">minAge</span><span class="__shiki_140thh">, Integer </span><span class="__shiki_1jdh33">maxAge</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                Boolean </span><span class="__shiki_1jdh33">active</span><span class="__shiki_140thh">, LocalDate </span><span class="__shiki_1jdh33">createdAfter</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaQuery&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 构建谓词列表</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Predicate</span><span class="__shiki_140thh">&gt; predicates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (username </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">username.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">            predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">like</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                cb.</span><span class="__shiki_1t8gfj">lower</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">)), </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;%&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> username.</span><span class="__shiki_1t8gfj">toLowerCase</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;%&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            ));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (role </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;role&quot;</span><span class="__shiki_140thh">), role));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (minAge </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">ge</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">), minAge));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (maxAge </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">le</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">), maxAge));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (active </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">), active));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (createdAfter </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">greaterThan</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;createdDate&quot;</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_140thh">                createdAfter</span></span>
<span class="line"><span class="__shiki_140thh">            ));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 应用谓词和排序</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(predicates.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Predicate</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]))</span></span>
<span class="line"><span class="__shiki_140thh">             .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">asc</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">)));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 聚合查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> UserStatistics </span><span class="__shiki_1t8gfj">getUserStatistics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaQuery&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">[]&gt; query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">[].class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 选择多个聚合函数</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">multiselect</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">count</span><span class="__shiki_140thh">(user),</span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">avg</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">)),</span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">sum</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;score&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        Object</span><span class="__shiki_140thh">[] result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">getSingleResult</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UserStatistics</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            (Long) result[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            (Double) result[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            (Integer) result[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            (Integer) result[</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">            (Long) result[</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-复杂条件与连接" tabindex="-1">6.2 复杂条件与连接 <a class="header-anchor" href="#_6-2-复杂条件与连接" aria-label="Permalink to &quot;6.2 复杂条件与连接&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> AdvancedCriteriaQueries</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersWithOrders</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">productName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaQuery&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接订单</span></span>
<span class="line"><span class="__shiki_140thh">        Join&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">, JoinType.INNER);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接订单项</span></span>
<span class="line"><span class="__shiki_140thh">        Join&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">OrderItem</span><span class="__shiki_140thh">&gt; items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> orders.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;items&quot;</span><span class="__shiki_140thh">, JoinType.INNER);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接产品</span></span>
<span class="line"><span class="__shiki_140thh">        Join&lt;</span><span class="__shiki_1itgoe">OrderItem</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> items.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">, JoinType.INNER);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(user)</span></span>
<span class="line"><span class="__shiki_140thh">             .</span><span class="__shiki_1t8gfj">distinct</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">             .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(product.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">), productName));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 子查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findTopSpendingUsers</span><span class="__shiki_140thh">(BigDecimal </span><span class="__shiki_1jdh33">minAmount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaQuery&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建子查询</span></span>
<span class="line"><span class="__shiki_140thh">        Subquery&lt;</span><span class="__shiki_1itgoe">BigDecimal</span><span class="__shiki_140thh">&gt; subquery </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">subquery</span><span class="__shiki_140thh">(BigDecimal.class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">Order</span><span class="__shiki_140thh">&gt; order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> subquery.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Order.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        subquery.</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">sum</span><span class="__shiki_140thh">(order.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;totalAmount&quot;</span><span class="__shiki_140thh">)))</span></span>
<span class="line"><span class="__shiki_140thh">                .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(order.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">), user));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 主查询条件</span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(user)</span></span>
<span class="line"><span class="__shiki_140thh">             .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">greaterThan</span><span class="__shiki_140thh">(subquery, minAmount))</span></span>
<span class="line"><span class="__shiki_140thh">             .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">desc</span><span class="__shiki_140thh">(subquery));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // CASE表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">[]&gt; </span><span class="__shiki_1t8gfj">categorizeUsers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaQuery&lt;</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">[]&gt; query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">[].class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 构建CASE表达式</span></span>
<span class="line"><span class="__shiki_140thh">        Expression&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; ageCategory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">selectCase</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">when</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">lessThan</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&quot;Teen&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">when</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">between</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">40</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&quot;Young Adult&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">when</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">between</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">40</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">), </span><span class="__shiki_mdbnqw">&quot;Middle Aged&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">otherwise</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Senior&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">multiselect</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            ageCategory,</span></span>
<span class="line"><span class="__shiki_140thh">            user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ).</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">asc</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">)));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-criteria-api更新与删除" tabindex="-1">6.3 Criteria API更新与删除 <a class="header-anchor" href="#_6-3-criteria-api更新与删除" aria-label="Permalink to &quot;6.3 Criteria API更新与删除&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CriteriaUpdateDelete</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // CriteriaUpdate - 批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> deactivateInactiveUsers</span><span class="__shiki_140thh">(LocalDate </span><span class="__shiki_1jdh33">cutoffDate</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建更新查询</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaUpdate&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; update </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createCriteriaUpdate</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置更新值</span></span>
<span class="line"><span class="__shiki_140thh">        update.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">              .</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;deactivatedDate&quot;</span><span class="__shiki_140thh">), LocalDate.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置条件</span></span>
<span class="line"><span class="__shiki_140thh">        update.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">lessThan</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;lastLoginDate&quot;</span><span class="__shiki_140thh">), cutoffDate)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行更新</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(update).</span><span class="__shiki_1t8gfj">executeUpdate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // CriteriaDelete - 批量删除</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> deleteOldLogs</span><span class="__shiki_140thh">(LocalDate </span><span class="__shiki_1jdh33">cutoffDate</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建删除查询</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaDelete&lt;</span><span class="__shiki_1itgoe">AuditLog</span><span class="__shiki_140thh">&gt; delete </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createCriteriaDelete</span><span class="__shiki_140thh">(AuditLog.class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">AuditLog</span><span class="__shiki_140thh">&gt; log </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> delete.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(AuditLog.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置条件</span></span>
<span class="line"><span class="__shiki_140thh">        delete.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">lessThan</span><span class="__shiki_140thh">(log.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;createdDate&quot;</span><span class="__shiki_140thh">), cutoffDate));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行删除</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(delete).</span><span class="__shiki_1t8gfj">executeUpdate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 带连接的更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> updateProductPrices</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">category</span><span class="__shiki_140thh">, BigDecimal </span><span class="__shiki_1jdh33">increasePercent</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaUpdate&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; update </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createCriteriaUpdate</span><span class="__shiki_140thh">(Product.class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">&gt; product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> update.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Product.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接分类</span></span>
<span class="line"><span class="__shiki_140thh">        Join&lt;</span><span class="__shiki_1itgoe">Product</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Category</span><span class="__shiki_140thh">&gt; categoryJoin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> product.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;category&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 计算新价格</span></span>
<span class="line"><span class="__shiki_140thh">        Expression&lt;</span><span class="__shiki_1itgoe">BigDecimal</span><span class="__shiki_140thh">&gt; oldPrice </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> product.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;price&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        Expression&lt;</span><span class="__shiki_1itgoe">BigDecimal</span><span class="__shiki_140thh">&gt; increaseFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">literal</span><span class="__shiki_140thh">(BigDecimal.ONE.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(increasePercent.</span><span class="__shiki_1t8gfj">divide</span><span class="__shiki_140thh">(BigDecimal.</span><span class="__shiki_1t8gfj">valueOf</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">))));</span></span>
<span class="line"><span class="__shiki_140thh">        Expression&lt;</span><span class="__shiki_1itgoe">BigDecimal</span><span class="__shiki_140thh">&gt; newPrice </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">prod</span><span class="__shiki_140thh">(oldPrice, increaseFactor);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        update.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(product.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;price&quot;</span><span class="__shiki_140thh">), newPrice)</span></span>
<span class="line"><span class="__shiki_140thh">              .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(categoryJoin.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">), category));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(update).</span><span class="__shiki_1t8gfj">executeUpdate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、事务管理" tabindex="-1">七、事务管理 <a class="header-anchor" href="#七、事务管理" aria-label="Permalink to &quot;七、事务管理&quot;">​</a></h2><h3 id="_7-1-jta与resource-local" tabindex="-1">7.1 JTA与RESOURCE_LOCAL <a class="header-anchor" href="#_7-1-jta与resource-local" aria-label="Permalink to &quot;7.1 JTA与RESOURCE_LOCAL&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// persistence.xml配置</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">persistence</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">unit name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;jta-pu&quot;</span><span class="__shiki_140thh"> transaction</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">type</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;JTA&quot;</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;</span><span class="__shiki_140thh">jta</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">data</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">source</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh">java</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">jboss</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">datasources</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">ExampleDS</span><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">jta</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">data</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">source</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;!--</span><span class="__shiki_140thh"> JTA事务，由容器管理 </span><span class="__shiki_1itgoe">--&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">persistence</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">unit</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">persistence</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">unit name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;resource-local-pu&quot;</span><span class="__shiki_140thh"> transaction</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">type</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;RESOURCE_LOCAL&quot;</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;</span><span class="__shiki_140thh">properties</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;</span><span class="__shiki_140thh">property name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;javax.persistence.jdbc.url&quot;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                  value</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;jdbc:mysql://localhost:3306/test&quot;</span><span class="__shiki_1itgoe">/&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        &lt;!--</span><span class="__shiki_140thh"> RESOURCE_LOCAL事务，由应用管理 </span><span class="__shiki_1itgoe">--&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    &lt;/</span><span class="__shiki_140thh">properties</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">&lt;/</span><span class="__shiki_140thh">persistence</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">unit</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 编程式事务管理（RESOURCE_LOCAL）</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManagerFactory emf;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> createUserWithTransaction</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        EntityManager em </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> emf.</span><span class="__shiki_1t8gfj">createEntityManager</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        EntityTransaction tx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">begin</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 业务操作</span></span>
<span class="line"><span class="__shiki_140thh">            em.</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 插入关联实体</span></span>
<span class="line"><span class="__shiki_140thh">            Address address </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            address.</span><span class="__shiki_1t8gfj">setUser</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">            em.</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(address);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 提交事务</span></span>
<span class="line"><span class="__shiki_140thh">            tx.</span><span class="__shiki_1t8gfj">commit</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (RuntimeException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (tx </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> tx.</span><span class="__shiki_1t8gfj">isActive</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">                tx.</span><span class="__shiki_1t8gfj">rollback</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_140thh"> e;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            em.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-事务传播与隔离" tabindex="-1">7.2 事务传播与隔离 <a class="header-anchor" href="#_7-2-事务传播与隔离" aria-label="Permalink to &quot;7.2 事务传播与隔离&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Spring中声明式事务</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PersistenceContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManager em;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        propagation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Propagation.REQUIRED,</span></span>
<span class="line"><span class="__shiki_dzsirb">        isolation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Isolation.READ_COMMITTED,</span></span>
<span class="line"><span class="__shiki_dzsirb">        timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        readOnly</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        rollbackFor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {BusinessException.class, DataAccessException.class},</span></span>
<span class="line"><span class="__shiki_dzsirb">        noRollbackFor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {ValidationException.class}</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Order </span><span class="__shiki_1t8gfj">placeOrder</span><span class="__shiki_140thh">(OrderRequest </span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 在事务中执行</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查库存</span></span>
<span class="line"><span class="__shiki_140thh">        Product product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(Product.class, request.</span><span class="__shiki_1t8gfj">getProductId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (product.</span><span class="__shiki_1t8gfj">getStock</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> request.</span><span class="__shiki_1t8gfj">getQuantity</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> BusinessException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;库存不足&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建订单</span></span>
<span class="line"><span class="__shiki_140thh">        Order order </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">        // ... 设置订单属性</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 更新库存</span></span>
<span class="line"><span class="__shiki_140thh">        product.</span><span class="__shiki_1t8gfj">setStock</span><span class="__shiki_140thh">(product.</span><span class="__shiki_1t8gfj">getStock</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> request.</span><span class="__shiki_1t8gfj">getQuantity</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">merge</span><span class="__shiki_140thh">(product);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> order;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">propagation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Propagation.REQUIRES_NEW)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> logAudit</span><span class="__shiki_140thh">(AuditLog </span><span class="__shiki_1jdh33">log</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 在新事务中执行，独立于外层事务</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(log);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">propagation</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Propagation.NESTED)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> updateInventory</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">productId</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> quantity</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 嵌套事务，可以独立回滚</span></span>
<span class="line"><span class="__shiki_140thh">        Product product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(Product.class, productId);</span></span>
<span class="line"><span class="__shiki_140thh">        product.</span><span class="__shiki_1t8gfj">setStock</span><span class="__shiki_140thh">(product.</span><span class="__shiki_1t8gfj">getStock</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> quantity);</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">merge</span><span class="__shiki_140thh">(product);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-乐观锁与悲观锁" tabindex="-1">7.3 乐观锁与悲观锁 <a class="header-anchor" href="#_7-3-乐观锁与悲观锁" aria-label="Permalink to &quot;7.3 乐观锁与悲观锁&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 乐观锁实现</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Integer stock;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Version</span><span class="__shiki_21nrsd">  // 乐观锁版本字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long version;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 乐观锁使用</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> updateProductWithOptimisticLock</span><span class="__shiki_140thh">(Long productId, ProductUpdate update) {</span></span>
<span class="line"><span class="__shiki_140thh">    Product product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(Product.class, productId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟并发修改</span></span>
<span class="line"><span class="__shiki_140thh">    product.</span><span class="__shiki_1t8gfj">setStock</span><span class="__shiki_140thh">(update.</span><span class="__shiki_1t8gfj">getStock</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    product.</span><span class="__shiki_1t8gfj">setPrice</span><span class="__shiki_140thh">(update.</span><span class="__shiki_1t8gfj">getPrice</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">merge</span><span class="__shiki_140thh">(product);</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">flush</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 触发版本检查</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (OptimisticLockException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理乐观锁异常</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ConcurrentModificationException</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;产品已被其他用户修改，请刷新后重试&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 悲观锁使用</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> reserveProduct</span><span class="__shiki_140thh">(Long productId, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> quantity) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 悲观读锁</span></span>
<span class="line"><span class="__shiki_140thh">    Product product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        Product.class, </span></span>
<span class="line"><span class="__shiki_140thh">        productId, </span></span>
<span class="line"><span class="__shiki_140thh">        LockModeType.PESSIMISTIC_READ</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 或使用查询加锁</span></span>
<span class="line"><span class="__shiki_140thh">    Product product2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT p FROM Product p WHERE p.id = :id&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        Product.class</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">, productId)</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">setLockMode</span><span class="__shiki_140thh">(LockModeType.PESSIMISTIC_WRITE)</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">getSingleResult</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查库存</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (product.</span><span class="__shiki_1t8gfj">getStock</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> quantity) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> BusinessException</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;库存不足&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新库存</span></span>
<span class="line"><span class="__shiki_140thh">    product.</span><span class="__shiki_1t8gfj">setStock</span><span class="__shiki_140thh">(product.</span><span class="__shiki_1t8gfj">getStock</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> quantity);</span></span>
<span class="line"><span class="__shiki_140thh">    em.</span><span class="__shiki_1t8gfj">merge</span><span class="__shiki_140thh">(product);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 锁超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1t8gfj">findProductWithTimeout</span><span class="__shiki_140thh">(Long productId) {</span></span>
<span class="line"><span class="__shiki_140thh">    Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; properties </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    properties.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.lock.timeout&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">// 5秒超时</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        Product.class, </span></span>
<span class="line"><span class="__shiki_140thh">        productId, </span></span>
<span class="line"><span class="__shiki_140thh">        LockModeType.PESSIMISTIC_WRITE,</span></span>
<span class="line"><span class="__shiki_140thh">        properties</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、jpa-2-1-新特性" tabindex="-1">八、JPA 2.1+ 新特性 <a class="header-anchor" href="#八、jpa-2-1-新特性" aria-label="Permalink to &quot;八、JPA 2.1+ 新特性&quot;">​</a></h2><h3 id="_8-1-存储过程支持" tabindex="-1">8.1 存储过程支持 <a class="header-anchor" href="#_8-1-存储过程支持" aria-label="Permalink to &quot;8.1 存储过程支持&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 定义存储过程</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">NamedStoredProcedureQueries</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">NamedStoredProcedureQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;calculateOrderTotal&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        procedureName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;CALCULATE_ORDER_TOTAL&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        parameters</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">StoredProcedureParameter</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">                name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;orderId&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Long.class, </span></span>
<span class="line"><span class="__shiki_dzsirb">                mode</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ParameterMode.IN</span></span>
<span class="line"><span class="__shiki_140thh">            ),</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">StoredProcedureParameter</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">                name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;total&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> BigDecimal.class, </span></span>
<span class="line"><span class="__shiki_dzsirb">                mode</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ParameterMode.OUT</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 调用存储过程</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> BigDecimal </span><span class="__shiki_1t8gfj">calculateOrderTotal</span><span class="__shiki_140thh">(Long orderId) {</span></span>
<span class="line"><span class="__shiki_140thh">    StoredProcedureQuery query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">createNamedStoredProcedureQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;calculateOrderTotal&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    query.</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orderId&quot;</span><span class="__shiki_140thh">, orderId);</span></span>
<span class="line"><span class="__shiki_140thh">    query.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> (BigDecimal) query.</span><span class="__shiki_1t8gfj">getOutputParameterValue</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用原生SQL调用存储过程</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;Object</span><span class="__shiki_140thh">[]</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> getMonthlySales</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> year) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createNativeQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;CALL GET_MONTHLY_SALES(:year)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;year&quot;</span><span class="__shiki_140thh">, year)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-实体图-entity-graph" tabindex="-1">8.2 实体图（Entity Graph） <a class="header-anchor" href="#_8-2-实体图-entity-graph" aria-label="Permalink to &quot;8.2 实体图（Entity Graph）&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 定义实体图</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">NamedEntityGraphs</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">NamedEntityGraph</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;User.withOrders&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        attributeNodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            @</span><span class="__shiki_1itgoe">NamedAttributeNode</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;orders&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
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
<span class="line"><span class="__shiki_21nrsd">// 使用实体图</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">findUserWithOrders</span><span class="__shiki_140thh">(Long userId) {</span></span>
<span class="line"><span class="__shiki_140thh">    EntityGraph&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">&gt; entityGraph </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getEntityGraph</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User.withOrders&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; properties </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    properties.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.fetchgraph&quot;</span><span class="__shiki_140thh">, entityGraph);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(User.class, userId, properties);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 动态实体图</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">findUserWithDynamicGraph</span><span class="__shiki_140thh">(Long userId, String... attributes) {</span></span>
<span class="line"><span class="__shiki_140thh">    EntityGraph&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; entityGraph </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createEntityGraph</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (String attribute </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> attributes) {</span></span>
<span class="line"><span class="__shiki_140thh">        entityGraph.</span><span class="__shiki_1t8gfj">addAttributeNodes</span><span class="__shiki_140thh">(attribute);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; properties </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    properties.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.fetchgraph&quot;</span><span class="__shiki_140thh">, entityGraph);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">(User.class, userId, properties);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在查询中使用实体图</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">User</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> findUsersWithGraph</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    EntityGraph&lt;</span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh">&gt; entityGraph </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getEntityGraph</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User.withOrdersAndItems&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT DISTINCT u FROM User u WHERE u.active = true&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        User.class</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">setHint</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;javax.persistence.fetchgraph&quot;</span><span class="__shiki_140thh">, entityGraph)</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-3-批量更新与删除-jpa-2-1" tabindex="-1">8.3 批量更新与删除（JPA 2.1） <a class="header-anchor" href="#_8-3-批量更新与删除-jpa-2-1" aria-label="Permalink to &quot;8.3 批量更新与删除（JPA 2.1）&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 批量更新</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> updateProductPrices</span><span class="__shiki_140thh">(String category, BigDecimal newPrice) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;UPDATE Product p SET p.price = :price &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;WHERE p.category.name = :category&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;price&quot;</span><span class="__shiki_140thh">, newPrice)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;category&quot;</span><span class="__shiki_140thh">, category)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">executeUpdate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量删除</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> deleteInactiveUsers</span><span class="__shiki_140thh">(LocalDate cutoffDate) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;DELETE FROM User u WHERE u.active = false &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;AND u.lastLoginDate &lt; :cutoffDate&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cutoffDate&quot;</span><span class="__shiki_140thh">, cutoffDate)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">executeUpdate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 带返回值的更新（JPA 2.1）</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> deactivateUsersWithNotification</span><span class="__shiki_140thh">(LocalDate cutoffDate) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 首先查询需要处理的用户</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; usersToDeactivate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT u FROM User u WHERE u.lastLoginDate &lt; :cutoffDate&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        User.class)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cutoffDate&quot;</span><span class="__shiki_140thh">, cutoffDate)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> updated </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;UPDATE User u SET u.active = false &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;WHERE u.lastLoginDate &lt; :cutoffDate&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cutoffDate&quot;</span><span class="__shiki_140thh">, cutoffDate)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">executeUpdate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送通知</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (User user </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> usersToDeactivate) {</span></span>
<span class="line"><span class="__shiki_140thh">        notificationService.</span><span class="__shiki_1t8gfj">sendDeactivationEmail</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> updated;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、spring-data-jpa" tabindex="-1">九、Spring Data JPA <a class="header-anchor" href="#九、spring-data-jpa" aria-label="Permalink to &quot;九、Spring Data JPA&quot;">​</a></h2><h3 id="_9-1-repository模式" tabindex="-1">9.1 Repository模式 <a class="header-anchor" href="#_9-1-repository模式" aria-label="Permalink to &quot;9.1 Repository模式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基础Repository接口</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 方法名查询</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsername</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByUsernameContaining</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">keyword</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByAgeGreaterThan</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> age</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByRoleAndActive</span><span class="__shiki_140thh">(Role </span><span class="__shiki_1jdh33">role</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">boolean</span><span class="__shiki_1jdh33"> active</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByCreatedDateBetween</span><span class="__shiki_140thh">(LocalDate </span><span class="__shiki_1jdh33">start</span><span class="__shiki_140thh">, LocalDate </span><span class="__shiki_1jdh33">end</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 排序和分页</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByActiveTrue</span><span class="__shiki_140thh">(Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findByRoleOrderByUsernameAsc</span><span class="__shiki_140thh">(Role </span><span class="__shiki_1jdh33">role</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计数</span></span>
<span class="line"><span class="__shiki_1itgoe">    long</span><span class="__shiki_1t8gfj"> countByRole</span><span class="__shiki_140thh">(Role </span><span class="__shiki_1jdh33">role</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    boolean</span><span class="__shiki_1t8gfj"> existsByEmail</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 删除</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> deleteByActiveFalse</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    long</span><span class="__shiki_1t8gfj"> deleteByCreatedDateBefore</span><span class="__shiki_140thh">(LocalDate </span><span class="__shiki_1jdh33">date</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义查询</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // @Query注解</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u FROM User u WHERE u.email = :email&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    User </span><span class="__shiki_1t8gfj">findByEmailAddress</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">) String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT u.username FROM User u WHERE u.active = true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findActiveUsernames</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 原生SQL查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT * FROM users WHERE age &gt; :age&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">           nativeQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersOlderThan</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> age</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 修改查询</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Modifying</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;UPDATE User u SET u.active = false WHERE u.lastLoginDate &lt; :date&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_1t8gfj"> deactivateInactiveUsers</span><span class="__shiki_140thh">(@</span><span class="__shiki_1itgoe">Param</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;date&quot;</span><span class="__shiki_140thh">) LocalDate </span><span class="__shiki_1jdh33">date</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义Repository实现</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> CustomUserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersByCustomCriteria</span><span class="__shiki_140thh">(UserSearchCriteria </span><span class="__shiki_1jdh33">criteria</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CustomUserRepositoryImpl</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> CustomUserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PersistenceContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManager em;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersByCustomCriteria</span><span class="__shiki_140thh">(UserSearchCriteria </span><span class="__shiki_1jdh33">criteria</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaBuilder cb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">getCriteriaBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        CriteriaQuery&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        Root&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> query.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User.class);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Predicate</span><span class="__shiki_140thh">&gt; predicates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">like</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">), </span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;%&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> criteria.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;%&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (criteria.</span><span class="__shiki_1t8gfj">getMinAge</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            predicates.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">ge</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">), criteria.</span><span class="__shiki_1t8gfj">getMinAge</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // ... 更多条件</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        query.</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(predicates.</span><span class="__shiki_1t8gfj">toArray</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Predicate</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(query).</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 主Repository接口</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt;, </span></span>
<span class="line"><span class="__shiki_1t8gfj">                                       CustomUserRepository</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 继承自定义接口</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-specification与querydsl" tabindex="-1">9.2 Specification与Querydsl <a class="header-anchor" href="#_9-2-specification与querydsl" aria-label="Permalink to &quot;9.2 Specification与Querydsl&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Specification接口（Spring Data JPA）</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserSpecifications</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">usernameContains</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">username</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            username </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            cb.</span><span class="__shiki_1t8gfj">like</span><span class="__shiki_140thh">(cb.</span><span class="__shiki_1t8gfj">lower</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">)), </span></span>
<span class="line"><span class="__shiki_mdbnqw">                   &quot;%&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> username.</span><span class="__shiki_1t8gfj">toLowerCase</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;%&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">hasRole</span><span class="__shiki_140thh">(Role </span><span class="__shiki_1jdh33">role</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            role </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;role&quot;</span><span class="__shiki_140thh">), role);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">isActive</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> (root, query, cb) </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> cb.</span><span class="__shiki_1t8gfj">isTrue</span><span class="__shiki_140thh">(root.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">createdAfter</span><span class="__shiki_140thh">(LocalDate </span><span class="__shiki_1jdh33">date</span><span class="__shiki_140thh">) {</span></span>
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
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">searchUsers</span><span class="__shiki_140thh">(UserSearchCriteria </span><span class="__shiki_1jdh33">criteria</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Specification</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">isActive</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">usernameContains</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">hasRole</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getRole</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(UserSpecifications.</span><span class="__shiki_1t8gfj">createdAfter</span><span class="__shiki_140thh">(criteria.</span><span class="__shiki_1t8gfj">getCreatedAfter</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(spec, </span></span>
<span class="line"><span class="__shiki_140thh">            Sort.</span><span class="__shiki_1t8gfj">by</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;username&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">ascending</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Querydsl支持（需要生成Q类）</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt;,</span></span>
<span class="line"><span class="__shiki_1t8gfj">                                       QuerydslPredicateExecutor</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动获得findAll(Predicate predicate)等方法</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserQueryService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findActiveAdmins</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        QUser user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> QUser.user;</span></span>
<span class="line"><span class="__shiki_140thh">        Predicate predicate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user.active.</span><span class="__shiki_1t8gfj">isTrue</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">and</span><span class="__shiki_140thh">(user.role.</span><span class="__shiki_1t8gfj">eq</span><span class="__shiki_140thh">(Role.ADMIN));</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(predicate);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-3-审计功能" tabindex="-1">9.3 审计功能 <a class="header-anchor" href="#_9-3-审计功能" aria-label="Permalink to &quot;9.3 审计功能&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 启用JPA审计</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EnableJpaAuditing</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> JpaConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> AuditorAware&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">auditorAware</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> Optional.</span><span class="__shiki_1t8gfj">ofNullable</span><span class="__shiki_140thh">(SecurityContextHolder.</span><span class="__shiki_1t8gfj">getContext</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(SecurityContext</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">getAuthentication)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(Authentication</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">isAuthenticated)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(Authentication</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">getName);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 审计实体</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">EntityListeners</span><span class="__shiki_140thh">(AuditingEntityListener.class)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Id</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">GeneratedValue</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Long id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> BigDecimal price;</span></span>
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
<span class="line"><span class="__shiki_21nrsd">        // 获取当前用户逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &quot;system&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、性能优化与最佳实践" tabindex="-1">十、性能优化与最佳实践 <a class="header-anchor" href="#十、性能优化与最佳实践" aria-label="Permalink to &quot;十、性能优化与最佳实践&quot;">​</a></h2><h3 id="_10-1-n-1查询问题解决方案" tabindex="-1">10.1 N+1查询问题解决方案 <a class="header-anchor" href="#_10-1-n-1查询问题解决方案" aria-label="Permalink to &quot;10.1 N+1查询问题解决方案&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 问题：N+1查询</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">readOnly</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">Department</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> getDepartmentsWithEmployeesBad</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Department</span><span class="__shiki_140thh">&gt; departments </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> departmentRepository.</span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 每个department的getEmployees()都会触发一次查询</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (Department dept </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> departments) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(dept.</span><span class="__shiki_1t8gfj">getEmployees</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">());  </span><span class="__shiki_21nrsd">// N次查询</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> departments;  </span><span class="__shiki_21nrsd">// 总共1+N次查询</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 解决方案1：JOIN FETCH</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> DepartmentRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">Department</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SELECT DISTINCT d FROM Department d &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">           &quot;LEFT JOIN FETCH d.employees&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Department</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAllWithEmployees</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 解决方案2：@EntityGraph</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">NamedEntityGraph</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;Department.withEmployees&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">    attributeNodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> @</span><span class="__shiki_1itgoe">NamedAttributeNode</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;employees&quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Department</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> DepartmentRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> JpaRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">Department</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EntityGraph</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Department.withEmployees&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Department</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EntityGraph</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">attributePaths</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;employees&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;employees.projects&quot;</span><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_140thh">    List&lt;</span><span class="__shiki_1itgoe">Department</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findAllWithEmployeesAndProjects</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 解决方案3：@BatchSize</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Entity</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Department</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">OneToMany</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">mappedBy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;department&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">BatchSize</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">size</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// 批量加载，减少查询次数</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Employee</span><span class="__shiki_140thh">&gt; employees;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 解决方案4：二级查询缓存</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">readOnly</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_140thh"> List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">Department</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1t8gfj"> getDepartmentsCached</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;SELECT d FROM Department d LEFT JOIN FETCH d.employees&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        Department.class)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">setHint</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;org.hibernate.cacheable&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">getResultList</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-分页优化" tabindex="-1">10.2 分页优化 <a class="header-anchor" href="#_10-2-分页优化" aria-label="Permalink to &quot;10.2 分页优化&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分页查询最佳实践</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> UserRepository userRepository;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Page&lt;</span><span class="__shiki_1itgoe">UserDTO</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersWithPagination</span><span class="__shiki_140thh">(UserSearchCriteria </span><span class="__shiki_1jdh33">criteria</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                                                 Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 1. 使用Specification构建查询条件</span></span>
<span class="line"><span class="__shiki_140thh">        Specification&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; spec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> buildSpecification</span><span class="__shiki_140thh">(criteria);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 2. 获取分页数据</span></span>
<span class="line"><span class="__shiki_140thh">        Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; userPage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(spec, pageable);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3. 转换为DTO（避免返回实体）</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">UserDTO</span><span class="__shiki_140thh">&gt; dtos </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> userPage.</span><span class="__shiki_1t8gfj">getContent</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">stream</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">convertToDTO)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">collect</span><span class="__shiki_140thh">(Collectors.</span><span class="__shiki_1t8gfj">toList</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 返回分页结果</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> PageImpl&lt;&gt;(dtos, pageable, userPage.</span><span class="__shiki_1t8gfj">getTotalElements</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 避免COUNT查询（当数据量很大时）</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Slice&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findUsersWithoutCount</span><span class="__shiki_140thh">(Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        PageRequest pageRequest </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PageRequest.</span><span class="__shiki_1t8gfj">of</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            pageable.</span><span class="__shiki_1t8gfj">getPageNumber</span><span class="__shiki_140thh">(), </span></span>
<span class="line"><span class="__shiki_140thh">            pageable.</span><span class="__shiki_1t8gfj">getPageSize</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            pageable.</span><span class="__shiki_1t8gfj">getSort</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用Slice避免COUNT查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findAll</span><span class="__shiki_140thh">(pageRequest);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自定义分页查询（优化COUNT）</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Query</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT u FROM User u WHERE u.active = true&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">           countQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;SELECT COUNT(u) FROM User u WHERE u.active = true&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    Page&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">findActiveUsersWithOptimizedCount</span><span class="__shiki_140thh">(Pageable </span><span class="__shiki_1jdh33">pageable</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-3-批量操作优化" tabindex="-1">10.3 批量操作优化 <a class="header-anchor" href="#_10-3-批量操作优化" aria-label="Permalink to &quot;10.3 批量操作优化&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 批量插入优化</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Service</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> BatchInsertService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PersistenceContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManager em;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> batchInsertUsers</span><span class="__shiki_140thh">(List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">users</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> batchSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">(); i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            em.</span><span class="__shiki_1t8gfj">persist</span><span class="__shiki_140thh">(users.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(i));</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 每batchSize条刷新并清除持久化上下文</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> batchSize </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                em.</span><span class="__shiki_1t8gfj">flush</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                em.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">flush</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用JDBC批量插入（性能更好）</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Autowired</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> JdbcTemplate jdbcTemplate;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> batchInsertWithJdbc</span><span class="__shiki_140thh">(List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">users</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        jdbcTemplate.</span><span class="__shiki_1t8gfj">batchUpdate</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;INSERT INTO users (username, email) VALUES (?, ?)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_1t8gfj"> BatchPreparedStatementSetter</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">                @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">                public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setValues</span><span class="__shiki_140thh">(PreparedStatement </span><span class="__shiki_1jdh33">ps</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> i</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> SQLException {</span></span>
<span class="line"><span class="__shiki_140thh">                    User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(i);</span></span>
<span class="line"><span class="__shiki_140thh">                    ps.</span><span class="__shiki_1t8gfj">setString</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, user.</span><span class="__shiki_1t8gfj">getUsername</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">                    ps.</span><span class="__shiki_1t8gfj">setString</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, user.</span><span class="__shiki_1t8gfj">getEmail</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">                public</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> getBatchSize</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> users.</span><span class="__shiki_1t8gfj">size</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量更新优化</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Transactional</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> batchUpdateProductPrices</span><span class="__shiki_140thh">(List</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh">ProductPriceUpdate</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> updates) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用批量更新语句</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (ProductPriceUpdate update </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> updates) {</span></span>
<span class="line"><span class="__shiki_140thh">        em.</span><span class="__shiki_1t8gfj">createQuery</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;UPDATE Product p SET p.price = :price &quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;WHERE p.id = :id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;price&quot;</span><span class="__shiki_140thh">, update.</span><span class="__shiki_1t8gfj">getPrice</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">, update.</span><span class="__shiki_1t8gfj">getProductId</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">executeUpdate</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 或使用原生SQL批量更新</span></span>
<span class="line"><span class="__shiki_140thh">    Session session </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> em.</span><span class="__shiki_1t8gfj">unwrap</span><span class="__shiki_140thh">(Session.class);</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">doWork</span><span class="__shiki_140thh">(connection </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> (PreparedStatement ps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> connection.</span><span class="__shiki_1t8gfj">prepareStatement</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;UPDATE products SET price = ? WHERE id = ?&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> (ProductPriceUpdate update </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> updates) {</span></span>
<span class="line"><span class="__shiki_140thh">                ps.</span><span class="__shiki_1t8gfj">setBigDecimal</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, update.</span><span class="__shiki_1t8gfj">getPrice</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">                ps.</span><span class="__shiki_1t8gfj">setLong</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, update.</span><span class="__shiki_1t8gfj">getProductId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">                ps.</span><span class="__shiki_1t8gfj">addBatch</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            ps.</span><span class="__shiki_1t8gfj">executeBatch</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-4-监控与诊断" tabindex="-1">10.4 监控与诊断 <a class="header-anchor" href="#_10-4-监控与诊断" aria-label="Permalink to &quot;10.4 监控与诊断&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 启用JPA统计</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Configuration</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> JpaMetricsConfig</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Bean</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> MeterRegistryCustomizer&lt;</span><span class="__shiki_1itgoe">MeterRegistry</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">metricsCommonTags</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> registry </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> registry.</span><span class="__shiki_1t8gfj">config</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">commonTags</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;application&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;myapp&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 监控慢查询</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1itgoe">Component</span></span>
<span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> SlowQueryMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">PersistenceContext</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> EntityManager em;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">EventListener</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleQueryEvent</span><span class="__shiki_140thh">(PostQueryEvent </span><span class="__shiki_1jdh33">event</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> executionTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> event.</span><span class="__shiki_1t8gfj">getTime</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (executionTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {  </span><span class="__shiki_21nrsd">// 超过1秒的查询</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Slow query detected: {} - {} ms&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">                event.</span><span class="__shiki_1t8gfj">getQueryString</span><span class="__shiki_140thh">(), executionTime);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录到监控系统</span></span>
<span class="line"><span class="__shiki_140thh">            Metrics.</span><span class="__shiki_1t8gfj">counter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;slow.queries&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">increment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用P6Spy记录SQL</span></span>
<span class="line"><span class="__shiki_21nrsd">// application.properties</span></span>
<span class="line"><span class="__shiki_140thh">spring.datasource.url</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">jdbc</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">p6spy</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh">mysql</span><span class="__shiki_1itgoe">:</span><span class="__shiki_21nrsd">//localhost:3306/test</span></span>
<span class="line"><span class="__shiki_140thh">spring.datasource.driver</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">class</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">com.p6spy.engine.spy.P6SpyDriver</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// spy.properties</span></span>
<span class="line"><span class="__shiki_140thh">modulelist</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">com.p6spy.engine.logging.P6LogFactory,com.p6spy.engine.outage.P6OutageFactory</span></span>
<span class="line"><span class="__shiki_140thh">logMessageFormat</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">com.p6spy.engine.spy.appender.MultiLineFormat</span></span>
<span class="line"><span class="__shiki_140thh">appender</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">com.p6spy.engine.spy.appender.Slf4JLogger</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>JPA作为Java持久化标准，提供了统一的对象关系映射解决方案。通过掌握JPA的核心概念、实体映射、查询语言和事务管理，开发者可以构建高效、可维护的数据访问层。结合Spring Data JPA，可以进一步简化开发工作，提高生产力。</p><h3 id="关键最佳实践" tabindex="-1">关键最佳实践： <a class="header-anchor" href="#关键最佳实践" aria-label="Permalink to &quot;关键最佳实践：&quot;">​</a></h3><ol><li><strong>合理使用延迟加载</strong>：避免N+1查询问题</li><li><strong>批量操作优化</strong>：合理设置批次大小，定期清理持久化上下文</li><li><strong>缓存策略</strong>：合理使用一级、二级和查询缓存</li><li><strong>监控与诊断</strong>：监控慢查询，优化数据库访问</li><li><strong>事务管理</strong>：保持事务短小，合理设置隔离级别</li><li><strong>代码可维护性</strong>：使用Repository模式，分离数据访问逻辑</li></ol><h3 id="版本选择建议" tabindex="-1">版本选择建议： <a class="header-anchor" href="#版本选择建议" aria-label="Permalink to &quot;版本选择建议：&quot;">​</a></h3><ul><li><strong>新项目</strong>：使用Jakarta Persistence 3.0+（Jakarta EE 9+）</li><li><strong>Spring Boot项目</strong>：使用Spring Data JPA 2.7+（Spring Boot 2.7+）</li><li><strong>传统项目</strong>：JPA 2.2（Java EE 8）仍然广泛支持</li></ul><p>JPA规范与Hibernate等实现结合使用，可以构建出既标准化又高性能的数据访问层，是现代Java企业应用开发的核心技术之一。</p>`,87)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
