import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"TypeORM 高级特性详细学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"data/access/orm/nodejs/typeorm.md","filePath":"data/access/orm/nodejs/typeorm.md"}'),p={name:"data/access/orm/nodejs/typeorm.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="typeorm-高级特性详细学习笔记" tabindex="-1">TypeORM 高级特性详细学习笔记 <a class="header-anchor" href="#typeorm-高级特性详细学习笔记" aria-label="Permalink to &quot;TypeORM 高级特性详细学习笔记&quot;">​</a></h1><h2 id="一、数据建模高级特性" tabindex="-1">一、数据建模高级特性 <a class="header-anchor" href="#一、数据建模高级特性" aria-label="Permalink to &quot;一、数据建模高级特性&quot;">​</a></h2><h3 id="_1-1-实体继承策略" tabindex="-1">1.1 实体继承策略 <a class="header-anchor" href="#_1-1-实体继承策略" aria-label="Permalink to &quot;1.1 实体继承策略&quot;">​</a></h3><h4 id="_1-1-1-单表继承-single-table-inheritance" tabindex="-1">1.1.1 单表继承 (Single Table Inheritance) <a class="header-anchor" href="#_1-1-1-单表继承-single-table-inheritance" aria-label="Permalink to &quot;1.1.1 单表继承 (Single Table Inheritance)&quot;">​</a></h4><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Entity, Column, PrimaryGeneratedColumn, TableInheritance, ChildEntity } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;typeorm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 基类</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">TableInheritance</span><span class="__shiki_140thh">({ column: { type: </span><span class="__shiki_mdbnqw">&quot;varchar&quot;</span><span class="__shiki_140thh">, name: </span><span class="__shiki_mdbnqw">&quot;type&quot;</span><span class="__shiki_140thh"> } })</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Content</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  title</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 子类1</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">ChildEntity</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;article&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Content</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  text</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  author</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 子类2</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">ChildEntity</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;video&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Video</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Content</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  duration</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  format</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>特点：</strong></p><ul><li>所有子类数据存储在同一张表中</li><li>通过鉴别器列区分类型</li><li>查询性能较好，但存在空字段浪费</li></ul><h4 id="_1-1-2-类表继承-class-table-inheritance" tabindex="-1">1.1.2 类表继承 (Class Table Inheritance) <a class="header-anchor" href="#_1-1-2-类表继承-class-table-inheritance" aria-label="Permalink to &quot;1.1.2 类表继承 (Class Table Inheritance)&quot;">​</a></h4><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Entity, TableInheritance, ChildEntity } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;typeorm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">TableInheritance</span><span class="__shiki_140thh">({ pattern: </span><span class="__shiki_mdbnqw">&quot;STI&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">ChildEntity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Employee</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  salary</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  department</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">ChildEntity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Customer</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  loyaltyPoints</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  membershipLevel</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_1-1-3-具体表继承-concrete-table-inheritance" tabindex="-1">1.1.3 具体表继承 (Concrete Table Inheritance) <a class="header-anchor" href="#_1-1-3-具体表继承-concrete-table-inheritance" aria-label="Permalink to &quot;1.1.3 具体表继承 (Concrete Table Inheritance)&quot;">​</a></h4><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">TableInheritance</span><span class="__shiki_140thh">({ pattern: </span><span class="__shiki_mdbnqw">&quot;CTI&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Content</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  title</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Content</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  content</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  authorId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Video</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Content</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  duration</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  url</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_1-2-嵌入式实体-embedded-entities" tabindex="-1">1.2 嵌入式实体 (Embedded Entities) <a class="header-anchor" href="#_1-2-嵌入式实体-embedded-entities" aria-label="Permalink to &quot;1.2 嵌入式实体 (Embedded Entities)&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Entity, Column, PrimaryGeneratedColumn, Embeddable, Embedded } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;typeorm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 可嵌入的类</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Embeddable</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  street</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  city</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  country</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  zipCode</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Embeddable</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ContactInfo</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  phone</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用嵌入的主实体</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 嵌入地址</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Embedded</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Address)</span></span>
<span class="line"><span class="__shiki_1jdh33">  address</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 嵌入联系信息</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Embedded</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ContactInfo)</span></span>
<span class="line"><span class="__shiki_1jdh33">  contact</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ContactInfo</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 可选：前缀配置</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Embedded</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Address, { prefix: </span><span class="__shiki_mdbnqw">&#39;home_&#39;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  homeAddress</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Embedded</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Address, { prefix: </span><span class="__shiki_mdbnqw">&#39;work_&#39;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  workAddress</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_1-3-实体监听器和订阅器" tabindex="-1">1.3 实体监听器和订阅器 <a class="header-anchor" href="#_1-3-实体监听器和订阅器" aria-label="Permalink to &quot;1.3 实体监听器和订阅器&quot;">​</a></h3><h4 id="_1-3-1-实体监听器" tabindex="-1">1.3.1 实体监听器 <a class="header-anchor" href="#_1-3-1-实体监听器" aria-label="Permalink to &quot;1.3.1 实体监听器&quot;">​</a></h4><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterLoad, AfterInsert } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;typeorm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;decimal&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  price</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  slug</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">({ nullable: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  updatedAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 插入前自动执行</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">BeforeInsert</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">  generateSlug</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.slug </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.name</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">toLowerCase</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">[</span><span class="__shiki_1itgoe">^</span><span class="__shiki_dzsirb">\\w\\s]</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">gi</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">g</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;-&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.createdAt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 更新前自动执行</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">BeforeUpdate</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">  updateTimestamp</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.updatedAt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 加载后执行</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">AfterLoad</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">  formatPrice</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 可以在这里对加载的数据进行处理</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.formattedPrice </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`$\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">price</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 虚拟字段</span></span>
<span class="line"><span class="__shiki_1jdh33">  formattedPrice</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_1-3-2-事件订阅器-event-subscriber" tabindex="-1">1.3.2 事件订阅器 (Event Subscriber) <a class="header-anchor" href="#_1-3-2-事件订阅器-event-subscriber" aria-label="Permalink to &quot;1.3.2 事件订阅器 (Event Subscriber)&quot;">​</a></h4><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;typeorm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Product } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;./product.entity&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">EventSubscriber</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ProductSubscriber</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> EntitySubscriberInterface</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">  /**</span></span>
<span class="line"><span class="__shiki_21nrsd">   * 指定此订阅器监听的实体</span></span>
<span class="line"><span class="__shiki_21nrsd">   */</span></span>
<span class="line"><span class="__shiki_1t8gfj">  listenTo</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Product;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  /**</span></span>
<span class="line"><span class="__shiki_21nrsd">   * 插入前</span></span>
<span class="line"><span class="__shiki_21nrsd">   */</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeInsert</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> InsertEvent</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">&gt;) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`准备插入产品: \${</span><span class="__shiki_140thh">event</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">entity</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  /**</span></span>
<span class="line"><span class="__shiki_21nrsd">   * 插入后</span></span>
<span class="line"><span class="__shiki_21nrsd">   */</span></span>
<span class="line"><span class="__shiki_1t8gfj">  afterInsert</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> InsertEvent</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">&gt;) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`产品插入成功，ID: \${</span><span class="__shiki_140thh">event</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">entity</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 这里可以触发事件、发送通知等</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  /**</span></span>
<span class="line"><span class="__shiki_21nrsd">   * 更新前</span></span>
<span class="line"><span class="__shiki_21nrsd">   */</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> UpdateEvent</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">&gt;) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`准备更新产品 ID: \${</span><span class="__shiki_140thh">event</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">entity</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 可以访问更新前的数据</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;原始数据:&#39;</span><span class="__shiki_140thh">, event.databaseEntity);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  /**</span></span>
<span class="line"><span class="__shiki_21nrsd">   * 更新后</span></span>
<span class="line"><span class="__shiki_21nrsd">   */</span></span>
<span class="line"><span class="__shiki_1t8gfj">  afterUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> UpdateEvent</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">&gt;) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`产品更新成功，ID: \${</span><span class="__shiki_140thh">event</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">entity</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  /**</span></span>
<span class="line"><span class="__shiki_21nrsd">   * 删除前</span></span>
<span class="line"><span class="__shiki_21nrsd">   */</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeRemove</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">event</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> RemoveEvent</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">&gt;) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`准备删除产品 ID: \${</span><span class="__shiki_140thh">event</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">entityId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在数据源配置中注册订阅器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ... 其他配置</span></span>
<span class="line"><span class="__shiki_140thh">  subscribers: [ProductSubscriber]</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="二、查询构建器高级用法" tabindex="-1">二、查询构建器高级用法 <a class="header-anchor" href="#二、查询构建器高级用法" aria-label="Permalink to &quot;二、查询构建器高级用法&quot;">​</a></h2><h3 id="_2-1-链式api和复杂查询" tabindex="-1">2.1 链式API和复杂查询 <a class="header-anchor" href="#_2-1-链式api和复杂查询" aria-label="Permalink to &quot;2.1 链式API和复杂查询&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { createQueryBuilder } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;typeorm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 复杂查询示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createQueryBuilder</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 左连接 user.profile</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">leftJoinAndSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.profile&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;profile&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 左连接 user.posts</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">leftJoinAndSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.posts&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;post&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 内连接 post.categories</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">innerJoinAndSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.categories&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;category&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 条件：用户状态为活跃</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.status = :status&quot;</span><span class="__shiki_140thh">, { status: </span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 条件：文章发布日期在30天内</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.publishedAt &gt; :date&quot;</span><span class="__shiki_140thh">, { </span></span>
<span class="line"><span class="__shiki_140thh">    date: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) </span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 条件：类别名称</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;category.name IN (:...categories)&quot;</span><span class="__shiki_140thh">, { </span></span>
<span class="line"><span class="__shiki_140thh">    categories: [</span><span class="__shiki_mdbnqw">&quot;Technology&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Science&quot;</span><span class="__shiki_140thh">] </span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分组</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">groupBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">  // Having 子句</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">having</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;COUNT(post.id) &gt; :minPosts&quot;</span><span class="__shiki_140thh">, { minPosts: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 排序</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.createdAt&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;DESC&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">addOrderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;profile.rating&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;DESC&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分页</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">skip</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">take</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 获取结果</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 获取原始SQL语句（调试用）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sql</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> createQueryBuilder</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">leftJoinAndSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.profile&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;profile&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id = :id&quot;</span><span class="__shiki_140thh">, { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getSql</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(sql);</span></span></code></pre></div><h3 id="_2-2-子查询-subqueries" tabindex="-1">2.2 子查询 (SubQueries) <a class="header-anchor" href="#_2-2-子查询-subqueries" aria-label="Permalink to &quot;2.2 子查询 (SubQueries)&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 标量子查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createQueryBuilder</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">subQuery</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> subQuery</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;COUNT(post.id)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;postCount&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Post, </span><span class="__shiki_mdbnqw">&quot;post&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.userId = user.id&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }, </span><span class="__shiki_mdbnqw">&quot;postCount&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.active = :active&quot;</span><span class="__shiki_140thh">, { active: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getRawMany</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 使用 getRawMany 获取计算字段</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// EXISTS 子查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> activeUsersWithPosts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createQueryBuilder</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">exists</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> exists</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Post, </span><span class="__shiki_mdbnqw">&quot;post&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.userId = user.id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.published = :published&quot;</span><span class="__shiki_140thh">, { published: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// IN 子查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> popularUsers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createQueryBuilder</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">qb</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> subQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> qb.</span><span class="__shiki_1t8gfj">subQuery</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;userId&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Post, </span><span class="__shiki_mdbnqw">&quot;post&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">groupBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;userId&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">having</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;COUNT(id) &gt; :count&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">getQuery</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &quot;user.id IN &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> subQuery;</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 子查询作为FROM子句</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;userGroup.userId&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;userId&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;AVG(userGroup.score)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;averageScore&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;COUNT(userGroup.id)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;totalPosts&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">subQuery</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> subQuery</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;userId&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.score&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;score&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">leftJoin</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.posts&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;post&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.createdAt &gt; :date&quot;</span><span class="__shiki_140thh">, { date: lastMonth });</span></span>
<span class="line"><span class="__shiki_140thh">  }, </span><span class="__shiki_mdbnqw">&quot;userGroup&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">groupBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;userGroup.userId&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getRawMany</span><span class="__shiki_140thh">();</span></span></code></pre></div><h3 id="_2-3-原生查询和存储过程" tabindex="-1">2.3 原生查询和存储过程 <a class="header-anchor" href="#_2-3-原生查询和存储过程" aria-label="Permalink to &quot;2.3 原生查询和存储过程&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 原生查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> rawData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">  SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">    u.id,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    u.name,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    COUNT(p.id) as post_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    AVG(p.likes) as avg_likes</span></span>
<span class="line"><span class="__shiki_mdbnqw">  FROM users u</span></span>
<span class="line"><span class="__shiki_mdbnqw">  LEFT JOIN posts p ON p.user_id = u.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">  WHERE u.created_at &gt; $1</span></span>
<span class="line"><span class="__shiki_mdbnqw">  GROUP BY u.id, u.name</span></span>
<span class="line"><span class="__shiki_mdbnqw">  HAVING COUNT(p.id) &gt; $2</span></span>
<span class="line"><span class="__shiki_mdbnqw">  ORDER BY avg_likes DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">, [</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;2023-01-01&#39;</span><span class="__shiki_140thh">), </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">]);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用实体映射的原生查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> dataSource</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id IN (:...ids)&quot;</span><span class="__shiki_140thh">, { ids: [</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">] })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getRawMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 调用存储过程</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;CALL get_user_statistics($1, $2)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  [userId, startDate]</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用实体管理器的原生查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userRepository</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(User);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">  SELECT * FROM users </span></span>
<span class="line"><span class="__shiki_mdbnqw">  WHERE age &gt; ? </span></span>
<span class="line"><span class="__shiki_mdbnqw">  AND status = ? </span></span>
<span class="line"><span class="__shiki_mdbnqw">  ORDER BY created_at DESC</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">, [</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;active&#39;</span><span class="__shiki_140thh">]);</span></span></code></pre></div><h3 id="_2-4-查询缓存" tabindex="-1">2.4 查询缓存 <a class="header-anchor" href="#_2-4-查询缓存" aria-label="Permalink to &quot;2.4 查询缓存&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 全局启用查询缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ... 其他配置</span></span>
<span class="line"><span class="__shiki_140thh">  cache: {</span></span>
<span class="line"><span class="__shiki_140thh">    type: </span><span class="__shiki_mdbnqw">&quot;database&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 或 &quot;redis&quot;, &quot;ioredis&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    tableName: </span><span class="__shiki_mdbnqw">&quot;query_results_cache&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    duration: </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 缓存60秒</span></span>
<span class="line"><span class="__shiki_140thh">    options: {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // Redis配置</span></span>
<span class="line"><span class="__shiki_140thh">      host: </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      port: </span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      password: </span><span class="__shiki_mdbnqw">&quot;password&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 为特定查询启用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> createQueryBuilder</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">leftJoinAndSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.posts&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;posts&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.active = :active&quot;</span><span class="__shiki_140thh">, { active: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 启用缓存</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 缓存30秒</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;users_active_key&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 自定义缓存键</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 手动管理缓存</span></span>
<span class="line"><span class="__shiki_21nrsd">// 清除特定缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> dataSource.queryResultCache?.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">([</span><span class="__shiki_mdbnqw">&quot;users_active_key&quot;</span><span class="__shiki_140thh">]);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 清除所有缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> dataSource.queryResultCache?.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span></code></pre></div><h2 id="三、关系操作高级特性" tabindex="-1">三、关系操作高级特性 <a class="header-anchor" href="#三、关系操作高级特性" aria-label="Permalink to &quot;三、关系操作高级特性&quot;">​</a></h2><h3 id="_3-1-级联操作-cascade-operations" tabindex="-1">3.1 级联操作 (Cascade Operations) <a class="header-anchor" href="#_3-1-级联操作-cascade-operations" aria-label="Permalink to &quot;3.1 级联操作 (Cascade Operations)&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;typeorm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 级联保存和删除</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Post, </span><span class="__shiki_1jdh33">post</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> post.author, {</span></span>
<span class="line"><span class="__shiki_140thh">    cascade: [</span><span class="__shiki_mdbnqw">&quot;insert&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;update&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;remove&quot;</span><span class="__shiki_140thh">], </span><span class="__shiki_21nrsd">// 或 cascade: true</span></span>
<span class="line"><span class="__shiki_140thh">    onDelete: </span><span class="__shiki_mdbnqw">&quot;CASCADE&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 数据库级联删除</span></span>
<span class="line"><span class="__shiki_140thh">    onUpdate: </span><span class="__shiki_mdbnqw">&quot;CASCADE&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_1jdh33">  posts</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Post</span><span class="__shiki_140thh">[];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Profile, </span><span class="__shiki_1jdh33">profile</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> profile.user, {</span></span>
<span class="line"><span class="__shiki_140thh">    cascade: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    orphanedRowAction: </span><span class="__shiki_mdbnqw">&quot;delete&quot;</span><span class="__shiki_21nrsd"> // 删除孤儿记录</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_1jdh33">  profiles</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Profile</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Post</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  title</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">ManyToOne</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> User, </span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> user.posts, {</span></span>
<span class="line"><span class="__shiki_140thh">    onDelete: </span><span class="__shiki_mdbnqw">&quot;SET NULL&quot;</span><span class="__shiki_21nrsd"> // 用户删除时设为NULL</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">JoinColumn</span><span class="__shiki_140thh">({ name: </span><span class="__shiki_mdbnqw">&quot;author_id&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  author</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用级联保存</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">user.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;John&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">user.posts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Post</span><span class="__shiki_140thh">(), </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Post</span><span class="__shiki_140thh">()]; </span><span class="__shiki_21nrsd">// 自动保存关联的帖子</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(user); </span><span class="__shiki_21nrsd">// 保存用户和所有帖子</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用级联删除</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(user); </span><span class="__shiki_21nrsd">// 删除用户和所有关联帖子</span></span></code></pre></div><h3 id="_3-2-加载策略" tabindex="-1">3.2 加载策略 <a class="header-anchor" href="#_3-2-加载策略" aria-label="Permalink to &quot;3.2 加载策略&quot;">​</a></h3><h4 id="_3-2-1-懒加载-lazy-loading" tabindex="-1">3.2.1 懒加载 (Lazy Loading) <a class="header-anchor" href="#_3-2-1-懒加载-lazy-loading" aria-label="Permalink to &quot;3.2.1 懒加载 (Lazy Loading)&quot;">​</a></h4><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;typeorm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 懒加载关系</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Post, </span><span class="__shiki_1jdh33">post</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> post.author, {</span></span>
<span class="line"><span class="__shiki_140thh">    lazy: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_1jdh33">  posts</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Post</span><span class="__shiki_140thh">[]&gt;; </span><span class="__shiki_21nrsd">// 返回Promise</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Post</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  title</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">ManyToOne</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> User, </span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> user.posts, {</span></span>
<span class="line"><span class="__shiki_140thh">    lazy: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_1jdh33">  author</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用懒加载</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } });</span></span>
<span class="line"><span class="__shiki_21nrsd">// 此时 posts 还未加载</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> posts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> user.posts; </span><span class="__shiki_21nrsd">// 现在才加载posts</span></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(posts);</span></span></code></pre></div><h4 id="_3-2-2-急切加载-eager-loading" tabindex="-1">3.2.2 急切加载 (Eager Loading) <a class="header-anchor" href="#_3-2-2-急切加载-eager-loading" aria-label="Permalink to &quot;3.2.2 急切加载 (Eager Loading)&quot;">​</a></h4><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 急切加载</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Post, </span><span class="__shiki_1jdh33">post</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> post.author, {</span></span>
<span class="line"><span class="__shiki_140thh">    eager: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_1jdh33">  posts</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Post</span><span class="__shiki_140thh">[]; </span><span class="__shiki_21nrsd">// 自动加载</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Profile, </span><span class="__shiki_1jdh33">profile</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> profile.user, {</span></span>
<span class="line"><span class="__shiki_140thh">    eager: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd"> // 显式关闭急切加载</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_1jdh33">  profiles</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Profile</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 急切加载会自动包含关系数据</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } });</span></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(user.posts); </span><span class="__shiki_21nrsd">// posts 已自动加载</span></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(user.profiles); </span><span class="__shiki_21nrsd">// profiles 未加载，需要手动加载</span></span></code></pre></div><h3 id="_3-3-多对多关系的高级用法" tabindex="-1">3.3 多对多关系的高级用法 <a class="header-anchor" href="#_3-3-多对多关系的高级用法" aria-label="Permalink to &quot;3.3 多对多关系的高级用法&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  title</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 多对多关系</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">ManyToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Tag, </span><span class="__shiki_1jdh33">tag</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> tag.articles, {</span></span>
<span class="line"><span class="__shiki_140thh">    cascade: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    onDelete: </span><span class="__shiki_mdbnqw">&quot;CASCADE&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">JoinTable</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    name: </span><span class="__shiki_mdbnqw">&quot;article_tags&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 连接表名</span></span>
<span class="line"><span class="__shiki_140thh">    joinColumn: {</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&quot;article_id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      referencedColumnName: </span><span class="__shiki_mdbnqw">&quot;id&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    inverseJoinColumn: {</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&quot;tag_id&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      referencedColumnName: </span><span class="__shiki_mdbnqw">&quot;id&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_1jdh33">  tags</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Tag</span><span class="__shiki_140thh">[];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加额外字段的连接表</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ArticleTag, </span><span class="__shiki_1jdh33">articleTag</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> articleTag.article)</span></span>
<span class="line"><span class="__shiki_1jdh33">  articleTags</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ArticleTag</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Tag</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">({ unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">ManyToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Article, </span><span class="__shiki_1jdh33">article</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> article.tags)</span></span>
<span class="line"><span class="__shiki_1jdh33">  articles</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义连接表实体（带额外字段）</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ArticleTag</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  addedAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">ManyToOne</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Article, </span><span class="__shiki_1jdh33">article</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> article.articleTags)</span></span>
<span class="line"><span class="__shiki_1jdh33">  article</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">ManyToOne</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Tag, </span><span class="__shiki_1jdh33">tag</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> tag.articleTags)</span></span>
<span class="line"><span class="__shiki_1jdh33">  tag</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Tag</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 多对多操作</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> article</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">article.title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;New Article&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> tag1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Tag</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">tag1.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Technology&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> tag2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Tag</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">tag2.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Programming&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">article.tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [tag1, tag2];</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> articleRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(article);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询带标签的文章</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> articlesWithTags</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> articleRepository.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  relations: [</span><span class="__shiki_mdbnqw">&quot;tags&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  where: {</span></span>
<span class="line"><span class="__shiki_140thh">    tags: {</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_1t8gfj">In</span><span class="__shiki_140thh">([</span><span class="__shiki_mdbnqw">&quot;Technology&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Programming&quot;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用连接表查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> articleTags</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> articleTagRepository.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  relations: [</span><span class="__shiki_mdbnqw">&quot;article&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;tag&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  where: {</span></span>
<span class="line"><span class="__shiki_140thh">    addedAt: </span><span class="__shiki_1t8gfj">MoreThan</span><span class="__shiki_140thh">(lastWeek)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="四、事务和并发控制" tabindex="-1">四、事务和并发控制 <a class="header-anchor" href="#四、事务和并发控制" aria-label="Permalink to &quot;四、事务和并发控制&quot;">​</a></h2><h3 id="_4-1-事务管理" tabindex="-1">4.1 事务管理 <a class="header-anchor" href="#_4-1-事务管理" aria-label="Permalink to &quot;4.1 事务管理&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 方法1：使用QueryRunner</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> queryRunner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">createQueryRunner</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> userRepository</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> queryRunner.manager.</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(User);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> orderRepository</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> queryRunner.manager.</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(Order);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 创建用户</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  user.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;John&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 创建订单</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> order</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  order.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user;</span></span>
<span class="line"><span class="__shiki_140thh">  order.total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> orderRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 提交事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 回滚事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">rollbackTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 释放QueryRunner</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">release</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法2：使用transaction方法（推荐）</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">transactionalEntityManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> userRepository</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> transactionalEntityManager.</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(User);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> orderRepository</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> transactionalEntityManager.</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(Order);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  user.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;John&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> order</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  order.user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user;</span></span>
<span class="line"><span class="__shiki_140thh">  order.total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> orderRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法3：隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SERIALIZABLE&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">transactionalEntityManager</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 可重复读隔离级别</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> transactionalEntityManager</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">setLock</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;pessimistic_write&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 悲观锁</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id = :id&quot;</span><span class="__shiki_140thh">, { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">getOne</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 执行其他操作</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 方法4：嵌套事务（保存点）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> queryRunner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">createQueryRunner</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">startTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 外层事务</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(user1);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 创建保存点</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> queryRunner.manager.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SAVEPOINT sp1&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 内层操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> orderRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(order1);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 释放保存点</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.manager.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;RELEASE SAVEPOINT sp1&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (innerError) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 回滚到保存点</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.manager.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ROLLBACK TO SAVEPOINT sp1&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">commitTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">rollbackTransaction</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">release</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-乐观锁和悲观锁" tabindex="-1">4.2 乐观锁和悲观锁 <a class="header-anchor" href="#_4-2-乐观锁和悲观锁" aria-label="Permalink to &quot;4.2 乐观锁和悲观锁&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 乐观锁</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  stock</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">VersionColumn</span><span class="__shiki_140thh">() </span><span class="__shiki_21nrsd">// 版本控制列</span></span>
<span class="line"><span class="__shiki_1jdh33">  version</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用乐观锁</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> productRepository</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(Product);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 第一次加载</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> product1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> productRepository.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } });</span></span>
<span class="line"><span class="__shiki_140thh">product1.stock </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 同时，另一个进程也加载了同一产品</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> product2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> productRepository.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> } });</span></span>
<span class="line"><span class="__shiki_140thh">product2.stock </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 保存第一个更新</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> productRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(product1); </span><span class="__shiki_21nrsd">// 成功</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 保存第二个更新（会失败，因为版本不匹配）</span></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  await</span><span class="__shiki_140thh"> productRepository.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(product2); </span><span class="__shiki_21nrsd">// 抛出 OptimisticLockVersionMismatchError</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;数据已被其他进程修改，请重试&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 悲观锁</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> queryRunner</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">createQueryRunner</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 悲观读锁</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> queryRunner.manager</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(User, </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">setLock</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;pessimistic_read&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id = :id&quot;</span><span class="__shiki_140thh">, { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getOne</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 悲观写锁</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> product</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> queryRunner.manager</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(Product, </span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">setLock</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;pessimistic_write&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product.id = :id&quot;</span><span class="__shiki_140thh">, { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getOne</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 带超时的锁</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> order</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> queryRunner.manager</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(Order, </span><span class="__shiki_mdbnqw">&quot;order&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">setLock</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;pessimistic_write&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 5秒超时</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;order.id = :id&quot;</span><span class="__shiki_140thh">, { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getOne</span><span class="__shiki_140thh">();</span></span></code></pre></div><h2 id="五、数据源和多数据库配置" tabindex="-1">五、数据源和多数据库配置 <a class="header-anchor" href="#五、数据源和多数据库配置" aria-label="Permalink to &quot;五、数据源和多数据库配置&quot;">​</a></h2><h3 id="_5-1-多数据源配置" tabindex="-1">5.1 多数据源配置 <a class="header-anchor" href="#_5-1-多数据源配置" aria-label="Permalink to &quot;5.1 多数据源配置&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 主数据源</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> primaryDataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  host: </span><span class="__shiki_mdbnqw">&quot;primary.db.host&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  port: </span><span class="__shiki_dzsirb">3306</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  username: </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  password: </span><span class="__shiki_mdbnqw">&quot;password&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  database: </span><span class="__shiki_mdbnqw">&quot;primary_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  entities: [User, Order],</span></span>
<span class="line"><span class="__shiki_140thh">  synchronize: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  logging: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&quot;primary&quot;</span><span class="__shiki_21nrsd"> // 数据源名称</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 只读副本数据源</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> readReplicaDataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  host: </span><span class="__shiki_mdbnqw">&quot;replica.db.host&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  port: </span><span class="__shiki_dzsirb">3306</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  username: </span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  password: </span><span class="__shiki_mdbnqw">&quot;password&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  database: </span><span class="__shiki_mdbnqw">&quot;primary_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  entities: [User, Order],</span></span>
<span class="line"><span class="__shiki_140thh">  synchronize: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  logging: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&quot;replica&quot;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 报告数据库数据源</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> reportDataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&quot;postgres&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  host: </span><span class="__shiki_mdbnqw">&quot;report.db.host&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  port: </span><span class="__shiki_dzsirb">5432</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  username: </span><span class="__shiki_mdbnqw">&quot;report_user&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  password: </span><span class="__shiki_mdbnqw">&quot;report_password&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  database: </span><span class="__shiki_mdbnqw">&quot;report_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  entities: [Report, Analytics],</span></span>
<span class="line"><span class="__shiki_140thh">  synchronize: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&quot;reports&quot;</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 动态数据源选择</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DatabaseManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> dataSources</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">DataSource</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.dataSources.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;primary&quot;</span><span class="__shiki_140thh">, primaryDataSource);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.dataSources.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;replica&quot;</span><span class="__shiki_140thh">, readReplicaDataSource);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.dataSources.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;reports&quot;</span><span class="__shiki_140thh">, reportDataSource);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getDataSource</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">DataSource</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.dataSources.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(name);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">dataSource) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`数据源 \${</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">} 未找到\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">dataSource.isInitialized) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">initialize</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> dataSource;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt;(</span><span class="__shiki_1jdh33">entity</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">dataSourceName</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getDataSource</span><span class="__shiki_140thh">(dataSourceName);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(entity);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-数据库分片" tabindex="-1">5.2 数据库分片 <a class="header-anchor" href="#_5-2-数据库分片" aria-label="Permalink to &quot;5.2 数据库分片&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 分片策略</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ShardingStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  getShardId</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">entity</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于ID的分片</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (entity.id) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> shardCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> shardId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> entity.id </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> shardCount;</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_mdbnqw"> \`shard_\${</span><span class="__shiki_140thh">shardId</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于创建时间的分片</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (entity.createdAt) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> month</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> entity.createdAt.</span><span class="__shiki_1t8gfj">getMonth</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_mdbnqw"> \`shard_\${</span><span class="__shiki_140thh">month</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &quot;shard_0&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分片感知的数据源管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ShardedDataSource</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> shards</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">DataSource</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> strategy</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> ShardingStrategy</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.strategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ShardingStrategy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化分片</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> shardName</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`shard_\${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        name: shardName,</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&quot;mysql&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        host: </span><span class="__shiki_mdbnqw">\`shard\${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}.db.host\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        database: </span><span class="__shiki_mdbnqw">\`app_db_shard_\${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        entities: [User, Order],</span></span>
<span class="line"><span class="__shiki_21nrsd">        // ... 其他配置</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.shards.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(shardName, dataSource);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getShardForEntity</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">entity</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">DataSource</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> shardId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.strategy.</span><span class="__shiki_1t8gfj">getShardId</span><span class="__shiki_140thh">(entity);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.shards.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(shardId);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">dataSource) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`分片 \${</span><span class="__shiki_140thh">shardId</span><span class="__shiki_mdbnqw">} 未找到\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">dataSource.isInitialized) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">initialize</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> dataSource;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 跨分片查询</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> queryAllShards</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt;(</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">ds</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt;)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">[]&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_140thh">[] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">dataSource</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.shards) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">dataSource.isInitialized) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">initialize</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> query</span><span class="__shiki_140thh">(dataSource);</span></span>
<span class="line"><span class="__shiki_140thh">      results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> results;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、高级查询特性" tabindex="-1">六、高级查询特性 <a class="header-anchor" href="#六、高级查询特性" aria-label="Permalink to &quot;六、高级查询特性&quot;">​</a></h2><h3 id="_6-1-全文搜索" tabindex="-1">6.1 全文搜索 <a class="header-anchor" href="#_6-1-全文搜索" aria-label="Permalink to &quot;6.1 全文搜索&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// PostgreSQL 全文搜索</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Article</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  title</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;text&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  content</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 全文搜索列</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Index</span><span class="__shiki_140thh">({ fulltext: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tsvector&quot;</span><span class="__shiki_140thh">, { nullable: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  document</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 创建GIN索引</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Index</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;article_document_gin_idx&quot;</span><span class="__shiki_140thh">, { synchronize: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Generated</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ALWAYS AS (to_tsvector(&#39;english&#39;, coalesce(title, &#39;&#39;) || &#39; &#39; || coalesce(content, &#39;&#39;))) STORED&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  searchVector</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 全文搜索查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> searchResults</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> articleRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;article&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;article.searchVector @@ plainto_tsquery(&#39;english&#39;, :query)&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    query: </span><span class="__shiki_mdbnqw">&quot;database postgresql&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ts_rank(article.searchVector, plainto_tsquery(&#39;english&#39;, :query))&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;DESC&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;query&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;database postgresql&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用Like和iLike</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> articles</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> articleRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;article&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;article.title ILIKE :search&quot;</span><span class="__shiki_140thh">, { search: </span><span class="__shiki_mdbnqw">&quot;%database%&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">orWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;article.content ILIKE :search&quot;</span><span class="__shiki_140thh">, { search: </span><span class="__shiki_mdbnqw">&quot;%postgresql%&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// MySQL 全文搜索</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;text&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  description</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // MySQL 全文索引</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Index</span><span class="__shiki_140thh">({ fulltext: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, spatial: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  searchIndex</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 重建搜索索引</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> productRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(Product)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1t8gfj">    searchIndex</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &quot;CONCAT(name, &#39; &#39;, description)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 全文搜索查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> products</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> productRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;MATCH(product.searchIndex) AGAINST(:query IN BOOLEAN MODE)&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    query: </span><span class="__shiki_mdbnqw">&quot;+database -oracle&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span></code></pre></div><h3 id="_6-2-地理空间查询" tabindex="-1">6.2 地理空间查询 <a class="header-anchor" href="#_6-2-地理空间查询" aria-label="Permalink to &quot;6.2 地理空间查询&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// PostgreSQL PostGIS扩展</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Location</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;geometry&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    spatialFeatureType: </span><span class="__shiki_mdbnqw">&quot;Point&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    srid: </span><span class="__shiki_dzsirb">4326</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_1jdh33">  coordinates</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 或使用 string</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;geography&quot;</span><span class="__shiki_140thh">, { nullable: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  area</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 空间查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> nearbyLocations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> locationRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;location&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ST_DWithin(location.coordinates, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326), :distance)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ST_Distance(location.coordinates, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326))&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">setParameters</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    lng: </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">122.4194</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    lat: </span><span class="__shiki_dzsirb">37.7749</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    distance: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_21nrsd"> // 10公里</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查找在区域内的地点</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> locationsInArea</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> locationRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;location&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ST_Within(location.coordinates, ST_GeomFromText(:polygon, 4326))&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">setParameter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;polygon&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;POLYGON((...))&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用原生查询进行复杂空间操作</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> spatialData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> locationRepository.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">  SELECT </span></span>
<span class="line"><span class="__shiki_mdbnqw">    l1.name as location1,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    l2.name as location2,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ST_Distance(l1.coordinates::geography, l2.coordinates::geography) as distance</span></span>
<span class="line"><span class="__shiki_mdbnqw">  FROM locations l1</span></span>
<span class="line"><span class="__shiki_mdbnqw">  CROSS JOIN locations l2</span></span>
<span class="line"><span class="__shiki_mdbnqw">  WHERE l1.id != l2.id</span></span>
<span class="line"><span class="__shiki_mdbnqw">    AND ST_DWithin(l1.coordinates::geography, l2.coordinates::geography, 50000)</span></span>
<span class="line"><span class="__shiki_mdbnqw">  ORDER BY distance ASC</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_6-3-json和数组操作" tabindex="-1">6.3 JSON和数组操作 <a class="header-anchor" href="#_6-3-json和数组操作" aria-label="Permalink to &quot;6.3 JSON和数组操作&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // JSON 列</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  attributes</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">    color</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">    size</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">[];</span></span>
<span class="line"><span class="__shiki_1jdh33">    weight</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">    dimensions</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">      length</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">      width</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">      height</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;simple-array&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  tags</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">[];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;simple-json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  metadata</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// JSON 查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> redProducts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> productRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product.attributes-&gt;&gt;&#39;color&#39; = :color&quot;</span><span class="__shiki_140thh">, { color: </span><span class="__shiki_mdbnqw">&quot;red&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// JSON 包含查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> productsWithSizeM</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> productRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product.attributes-&gt;&#39;size&#39; ? :size&quot;</span><span class="__shiki_140thh">, { size: </span><span class="__shiki_mdbnqw">&quot;M&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// JSON 路径查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> heavyProducts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> productRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;CAST(product.attributes-&gt;&gt;&#39;weight&#39; AS INTEGER) &gt; :weight&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    weight: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 数组查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> taggedProducts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> productRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;:tag = ANY(product.tags)&quot;</span><span class="__shiki_140thh">, { tag: </span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 数组包含查询</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> multiTagProducts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> productRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;product.tags @&gt; ARRAY[:...tags]&quot;</span><span class="__shiki_140thh">, { tags: [</span><span class="__shiki_mdbnqw">&quot;electronics&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sale&quot;</span><span class="__shiki_140thh">] })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// JSONB 更新</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> productRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(Product)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1t8gfj">    attributes</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_mdbnqw"> &quot;jsonb_set(attributes, &#39;{dimensions,length}&#39;, &#39;20&#39;)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;id = :id&quot;</span><span class="__shiki_140thh">, { id: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span></code></pre></div><h2 id="七、性能和优化" tabindex="-1">七、性能和优化 <a class="header-anchor" href="#七、性能和优化" aria-label="Permalink to &quot;七、性能和优化&quot;">​</a></h2><h3 id="_7-1-查询优化技巧" tabindex="-1">7.1 查询优化技巧 <a class="header-anchor" href="#_7-1-查询优化技巧" aria-label="Permalink to &quot;7.1 查询优化技巧&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 使用索引提示</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">useIndex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;IDX_USER_EMAIL&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// MySQL 索引提示</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.email = :email&quot;</span><span class="__shiki_140thh">, { email: </span><span class="__shiki_mdbnqw">&quot;test@example.com&quot;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getOne</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 选择性加载字段</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> partialUsers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  select: [</span><span class="__shiki_mdbnqw">&quot;id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">], </span><span class="__shiki_21nrsd">// 只选择需要的字段</span></span>
<span class="line"><span class="__shiki_140thh">  where: { active: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 使用 getRawMany 获取原始数据（避免实体转换开销）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> rawData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">([</span><span class="__shiki_mdbnqw">&quot;user.id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user.name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;COUNT(posts.id) as post_count&quot;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">leftJoin</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.posts&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;posts&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">groupBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getRawMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 分页优化 - Keyset 分页（避免 OFFSET）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> lastId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 上一页最后一个ID</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id &gt; :lastId&quot;</span><span class="__shiki_140thh">, { lastId })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ASC&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">take</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 5. 批量操作</span></span>
<span class="line"><span class="__shiki_21nrsd">// 批量插入</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> users</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">  users.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">({ name: </span><span class="__shiki_mdbnqw">\`User \${</span><span class="__shiki_140thh">i</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh"> }));</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> dataSource</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">insert</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">into</span><span class="__shiki_140thh">(User)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(users)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">await</span><span class="__shiki_140thh"> userRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(User)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">({ lastLogin: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">() })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;lastLogin &lt; :date&quot;</span><span class="__shiki_140thh">, { date: monthAgo })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 6. 使用 EXISTS 替代 IN（对于大数据集）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> activeUsers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">exists</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> exists</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Post, </span><span class="__shiki_mdbnqw">&quot;post&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.userId = user.id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;post.createdAt &gt; :date&quot;</span><span class="__shiki_140thh">, { date: lastWeek });</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">  .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span></code></pre></div><h3 id="_7-2-连接池优化" tabindex="-1">7.2 连接池优化 <a class="header-anchor" href="#_7-2-连接池优化" aria-label="Permalink to &quot;7.2 连接池优化&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  type: </span><span class="__shiki_mdbnqw">&quot;postgres&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ... 其他配置</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 连接池配置</span></span>
<span class="line"><span class="__shiki_140thh">  poolSize: </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 最大连接数</span></span>
<span class="line"><span class="__shiki_140thh">  extra: {</span></span>
<span class="line"><span class="__shiki_140thh">    max: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 最大连接数（某些数据库驱动）</span></span>
<span class="line"><span class="__shiki_140thh">    min: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 最小连接数</span></span>
<span class="line"><span class="__shiki_140thh">    idleTimeoutMillis: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 空闲连接超时</span></span>
<span class="line"><span class="__shiki_140thh">    connectionTimeoutMillis: </span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 连接超时</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 其他优化选项</span></span>
<span class="line"><span class="__shiki_140thh">  synchronize: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 生产环境关闭</span></span>
<span class="line"><span class="__shiki_140thh">  logging: [</span><span class="__shiki_mdbnqw">&quot;query&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;error&quot;</span><span class="__shiki_140thh">], </span><span class="__shiki_21nrsd">// 生产环境只记录错误</span></span>
<span class="line"><span class="__shiki_140thh">  maxQueryExecutionTime: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 慢查询阈值（毫秒）</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 缓存配置</span></span>
<span class="line"><span class="__shiki_140thh">  cache: {</span></span>
<span class="line"><span class="__shiki_140thh">    duration: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    type: </span><span class="__shiki_mdbnqw">&quot;redis&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    options: {</span></span>
<span class="line"><span class="__shiki_140thh">      host: </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      port: </span><span class="__shiki_dzsirb">6379</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 监控连接池</span></span>
<span class="line"><span class="__shiki_140thh">dataSource.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;pool-created&quot;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">pool</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;连接池已创建&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">dataSource.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;pool-destroyed&quot;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">pool</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;连接池已销毁&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 定期检查连接池状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> pool</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataSource.driver.pool;</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`活跃连接: \${</span><span class="__shiki_140thh">pool</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">activeConnections</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`空闲连接: \${</span><span class="__shiki_140thh">pool</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">idleConnections</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`等待队列: \${</span><span class="__shiki_140thh">pool</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">waitingClients</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}, </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="八、架构和最佳实践" tabindex="-1">八、架构和最佳实践 <a class="header-anchor" href="#八、架构和最佳实践" aria-label="Permalink to &quot;八、架构和最佳实践&quot;">​</a></h2><h3 id="_8-1-存储库模式扩展" tabindex="-1">8.1 存储库模式扩展 <a class="header-anchor" href="#_8-1-存储库模式扩展" aria-label="Permalink to &quot;8.1 存储库模式扩展&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自定义基础存储库</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ExtendedRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">extends</span><span class="__shiki_1t8gfj"> Repository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 查找并计数</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> findAndCountWithPagination</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    options</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> FindManyOptions</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt;,</span></span>
<span class="line"><span class="__shiki_1jdh33">    page</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    limit</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">  )</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;[</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">[], </span><span class="__shiki_dzsirb">number</span><span class="__shiki_140thh">]&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> skip</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (page </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> limit;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">data</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">total</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findAndCount</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">      ...</span><span class="__shiki_140thh">options,</span></span>
<span class="line"><span class="__shiki_140thh">      skip,</span></span>
<span class="line"><span class="__shiki_140thh">      take: limit</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [data, total];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 软删除</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> softDelete</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">void</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(id, { deletedAt: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">() } </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> bulkUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ids</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">[], </span><span class="__shiki_1jdh33">updates</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Partial</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt;)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">void</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(updates)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">whereInIds</span><span class="__shiki_140thh">(ids)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体实体的自定义存储库</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> ExtendedRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  findActiveUsers</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">[]&gt;;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  findByEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  findUsersWithPostCount</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Array</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh"> { </span><span class="__shiki_1jdh33">postCount</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh"> }&gt;&gt;;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserRepositoryImpl</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  extends</span><span class="__shiki_1t8gfj"> ExtendedRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">&gt; </span></span>
<span class="line"><span class="__shiki_1itgoe">  implements</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> findActiveUsers</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">[]&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">find</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      where: { active: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      relations: [</span><span class="__shiki_mdbnqw">&quot;profile&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> findByEmail</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({ where: { email } });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> findUsersWithPostCount</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Array</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_140thh"> { </span><span class="__shiki_1jdh33">postCount</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh"> }&gt;&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">([</span><span class="__shiki_mdbnqw">&quot;user.id&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user.name&quot;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;COUNT(post.id)&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;postCount&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">leftJoin</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.posts&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;post&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">groupBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user.id&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">getRawMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 在实体中注册自定义存储库</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">({ repository: UserRepositoryImpl })</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> BaseEntity</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ... 字段定义</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用自定义存储库</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> userRepository</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataSource.</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(User) </span><span class="__shiki_1itgoe">as</span><span class="__shiki_1t8gfj"> UserRepository</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> activeUsers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findActiveUsers</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> paginatedUsers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> userRepository.</span><span class="__shiki_1t8gfj">findAndCountWithPagination</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">  { where: { active: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> } },</span></span>
<span class="line"><span class="__shiki_dzsirb">  1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  10</span></span>
<span class="line"><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_8-2-迁移管理" tabindex="-1">8.2 迁移管理 <a class="header-anchor" href="#_8-2-迁移管理" aria-label="Permalink to &quot;8.2 迁移管理&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 生成迁移</span></span>
<span class="line"><span class="__shiki_21nrsd">// typeorm migration:generate -n CreateUsersTable</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 迁移文件示例</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { MigrationInterface, QueryRunner } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;typeorm&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CreateUsersTable1698765432100</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> MigrationInterface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;CreateUsersTable1698765432100&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> up</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queryRunner</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> QueryRunner</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">void</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建表</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      CREATE TABLE users (</span></span>
<span class="line"><span class="__shiki_mdbnqw">        id SERIAL PRIMARY KEY,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        email VARCHAR(255) UNIQUE NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        name VARCHAR(255) NOT NULL,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        created_at TIMESTAMP NOT NULL DEFAULT now(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        updated_at TIMESTAMP NOT NULL DEFAULT now(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">        deleted_at TIMESTAMP</span></span>
<span class="line"><span class="__shiki_mdbnqw">      )</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建索引</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      CREATE INDEX idx_users_email ON users(email);</span></span>
<span class="line"><span class="__shiki_mdbnqw">      CREATE INDEX idx_users_created_at ON users(created_at);</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加外键</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ALTER TABLE posts </span></span>
<span class="line"><span class="__shiki_mdbnqw">      ADD CONSTRAINT fk_posts_user_id </span></span>
<span class="line"><span class="__shiki_mdbnqw">      FOREIGN KEY (user_id) </span></span>
<span class="line"><span class="__shiki_mdbnqw">      REFERENCES users(id) </span></span>
<span class="line"><span class="__shiki_mdbnqw">      ON DELETE CASCADE</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> down</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queryRunner</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> QueryRunner</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">void</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 回滚操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`DROP TABLE users CASCADE\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 数据迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> MigrateUserData1698765432101</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> MigrationInterface</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> up</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queryRunner</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> QueryRunner</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">void</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 迁移旧数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      INSERT INTO new_users (email, name, created_at)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      SELECT email_address, full_name, registration_date</span></span>
<span class="line"><span class="__shiki_mdbnqw">      FROM old_users_table</span></span>
<span class="line"><span class="__shiki_mdbnqw">      WHERE active = true</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      UPDATE users </span></span>
<span class="line"><span class="__shiki_mdbnqw">      SET email = LOWER(email)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      WHERE email != LOWER(email)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行存储过程</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`CALL normalize_user_data()\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  public</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> down</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">queryRunner</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> QueryRunner</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">void</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 回滚数据迁移</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> queryRunner.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`DELETE FROM new_users\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 迁移配置</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ... 其他配置</span></span>
<span class="line"><span class="__shiki_140thh">  migrations: [</span><span class="__shiki_mdbnqw">&quot;src/migrations/*.ts&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  migrationsTableName: </span><span class="__shiki_mdbnqw">&quot;typeorm_migrations&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  migrationsRun: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 自动运行迁移</span></span>
<span class="line"><span class="__shiki_140thh">  cli: {</span></span>
<span class="line"><span class="__shiki_140thh">    migrationsDir: </span><span class="__shiki_mdbnqw">&quot;src/migrations&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 运行迁移</span></span>
<span class="line"><span class="__shiki_21nrsd">// typeorm migration:run</span></span>
<span class="line"><span class="__shiki_21nrsd">// typeorm migration:revert</span></span>
<span class="line"><span class="__shiki_21nrsd">// typeorm migration:show</span></span></code></pre></div><h2 id="九、调试和监控" tabindex="-1">九、调试和监控 <a class="header-anchor" href="#九、调试和监控" aria-label="Permalink to &quot;九、调试和监控&quot;">​</a></h2><h3 id="_9-1-查询日志和性能监控" tabindex="-1">9.1 查询日志和性能监控 <a class="header-anchor" href="#_9-1-查询日志和性能监控" aria-label="Permalink to &quot;9.1 查询日志和性能监控&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自定义日志记录器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CustomLogger</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Logger</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  logQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">parameters</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">[]) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[QUERY] \${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (parameters </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> parameters.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[PARAMS] \${</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">parameters</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  logQueryError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">error</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">parameters</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">[]) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[QUERY ERROR] \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[QUERY] \${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (parameters) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[PARAMS] \${</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">parameters</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  logQuerySlow</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">time</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">parameters</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">[]) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[SLOW QUERY: \${</span><span class="__shiki_140thh">time</span><span class="__shiki_mdbnqw">}ms] \${</span><span class="__shiki_140thh">query</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (parameters) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[PARAMS] \${</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">parameters</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  logSchemaBuild</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[SCHEMA] \${</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  logMigration</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[MIGRATION] \${</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  log</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">level</span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &quot;log&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_mdbnqw"> &quot;info&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_mdbnqw"> &quot;warn&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console[level](</span><span class="__shiki_mdbnqw">\`[TYPEORM] \${</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 配置数据源使用自定义日志</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dataSource</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ... 其他配置</span></span>
<span class="line"><span class="__shiki_140thh">  logger: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> CustomLogger</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">  logging: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  maxQueryExecutionTime: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd"> // 慢查询阈值（毫秒）</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 查询性能监控</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> QueryMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> slowQueries</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Array</span><span class="__shiki_140thh">&lt;{</span></span>
<span class="line"><span class="__shiki_1jdh33">    query</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">    duration</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">    timestamp</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }&gt; </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  startMonitoring</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">dataSource</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> DataSource</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalQuery</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataSource.query.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(dataSource);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    dataSource.</span><span class="__shiki_1t8gfj">query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> startTime</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> originalQuery</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">args);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录慢查询</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (duration </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 100ms阈值</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            query: </span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_140thh"> args[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;string&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_140thh"> args[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;QueryBuilder&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            duration,</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 保持最近100个慢查询</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_1t8gfj">shift</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> duration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime;</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`查询失败，耗时 \${</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">}ms:\`</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> error;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  getSlowQueries</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.slowQueries;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">  getQueryStats</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      totalQueries: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      averageDuration: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxDuration: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      queriesByTime: {}</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> totalDuration</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">query</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> query.duration, </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">      stats.averageDuration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> totalDuration </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      stats.maxDuration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">        ...</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">q</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> q.duration)</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      // 按小时分组</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.slowQueries.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">query</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> hour</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> query.timestamp.</span><span class="__shiki_1t8gfj">getHours</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        stats.queriesByTime[hour] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (stats.queriesByTime[hour] </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> stats;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用监控</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> monitor</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> QueryMonitor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">monitor.</span><span class="__shiki_1t8gfj">startMonitoring</span><span class="__shiki_140thh">(dataSource);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 定期报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> stats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> monitor.</span><span class="__shiki_1t8gfj">getQueryStats</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;查询性能统计:&#39;</span><span class="__shiki_140thh">, stats);</span></span>
<span class="line"><span class="__shiki_140thh">}, </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">);</span></span></code></pre></div><h2 id="十、综合示例-电商系统数据访问层" tabindex="-1">十、综合示例：电商系统数据访问层 <a class="header-anchor" href="#十、综合示例-电商系统数据访问层" aria-label="Permalink to &quot;十、综合示例：电商系统数据访问层&quot;">​</a></h2><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 实体定义</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Customer</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> BaseEntity</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;uuid&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">({ unique: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  email</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  name</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jsonb&#39;</span><span class="__shiki_140thh">, { default: {} })</span></span>
<span class="line"><span class="__shiki_1jdh33">  metadata</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> CustomerMetadata</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Order, </span><span class="__shiki_1jdh33">order</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> order.customer, { cascade: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  orders</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh">[];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">CreateDateColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">UpdateDateColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  updatedAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">DeleteDateColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  deletedAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Entity</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> BaseEntity</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">PrimaryGeneratedColumn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;uuid&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  id</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  status</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> OrderStatus</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;decimal&#39;</span><span class="__shiki_140thh">, { precision: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, scale: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  totalAmount</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">Column</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;jsonb&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1jdh33">  shippingAddress</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">ManyToOne</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Customer, </span><span class="__shiki_1jdh33">customer</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> customer.orders)</span></span>
<span class="line"><span class="__shiki_1jdh33">  customer</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Customer</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToMany</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> OrderItem, </span><span class="__shiki_1jdh33">item</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> item.order, { cascade: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_1jdh33">  items</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> OrderItem</span><span class="__shiki_140thh">[];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">OneToOne</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> Payment, </span><span class="__shiki_1jdh33">payment</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> payment.order)</span></span>
<span class="line"><span class="__shiki_1jdh33">  payment</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Payment</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">  @</span><span class="__shiki_1t8gfj">CreateDateColumn</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1jdh33">  createdAt</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 自定义存储库</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">EntityRepository</span><span class="__shiki_140thh">(Order)</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderRepository</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> ExtendedRepository</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> findOrdersByCustomer</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    customerId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    options</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_1t8gfj"> FindOrdersOptions</span></span>
<span class="line"><span class="__shiki_140thh">  )</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">[]&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> query</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">leftJoinAndSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.items&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;items&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">leftJoinAndSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;items.product&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;product&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.customerId = :customerId&#39;</span><span class="__shiki_140thh">, { customerId })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.deletedAt IS NULL&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (options?.status) {</span></span>
<span class="line"><span class="__shiki_140thh">      query.</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.status = :status&#39;</span><span class="__shiki_140thh">, { status: options.status });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (options?.startDate) {</span></span>
<span class="line"><span class="__shiki_140thh">      query.</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.createdAt &gt;= :startDate&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        startDate: options.startDate</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (options?.endDate) {</span></span>
<span class="line"><span class="__shiki_140thh">      query.</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.createdAt &lt;= :endDate&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        endDate: options.endDate</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> query</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.createdAt&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;DESC&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">skip</span><span class="__shiki_140thh">(options?.skip </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">take</span><span class="__shiki_140thh">(options?.take </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">getMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getCustomerOrderStats</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    customerId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span></span>
<span class="line"><span class="__shiki_140thh">  )</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">CustomerOrderStats</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;COUNT(order.id)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;totalOrders&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SUM(order.totalAmount)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;totalSpent&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;AVG(order.totalAmount)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;averageOrderValue&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;MAX(order.createdAt)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;lastOrderDate&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.customerId = :customerId&#39;</span><span class="__shiki_140thh">, { customerId })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.status = :status&#39;</span><span class="__shiki_140thh">, { status: </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">getRawOne</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 服务层使用</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Service</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> OrderService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1t8gfj">InjectRepository</span><span class="__shiki_140thh">(Order)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1jdh33"> orderRepository</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> OrderRepository</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1t8gfj">InjectRepository</span><span class="__shiki_140thh">(Customer)</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1jdh33"> customerRepository</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> CustomerRepository</span></span>
<span class="line"><span class="__shiki_140thh">  ) {}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> placeOrder</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    customerId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    orderData</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> CreateOrderDto</span></span>
<span class="line"><span class="__shiki_140thh">  )</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.orderRepository.manager.</span><span class="__shiki_1t8gfj">transaction</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">      async</span><span class="__shiki_1jdh33"> transactionalEntityManager</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查库存</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> item</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> orderData.items) {</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> product</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> transactionalEntityManager</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">getRepository</span><span class="__shiki_140thh">(Product)</span></span>
<span class="line"><span class="__shiki_140thh">            .</span><span class="__shiki_1t8gfj">findOne</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">              where: { id: item.productId },</span></span>
<span class="line"><span class="__shiki_140thh">              lock: { mode: </span><span class="__shiki_mdbnqw">&#39;pessimistic_write&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">product </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> product.stock </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> item.quantity) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`产品 \${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">productId</span><span class="__shiki_mdbnqw">} 库存不足\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">          // 扣减库存</span></span>
<span class="line"><span class="__shiki_140thh">          product.stock </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> item.quantity;</span></span>
<span class="line"><span class="__shiki_1itgoe">          await</span><span class="__shiki_140thh"> transactionalEntityManager.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(product);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建订单</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> order</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.orderRepository.</span><span class="__shiki_1t8gfj">create</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          customer: { id: customerId },</span></span>
<span class="line"><span class="__shiki_140thh">          status: </span><span class="__shiki_mdbnqw">&#39;pending&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          totalAmount: orderData.totalAmount,</span></span>
<span class="line"><span class="__shiki_140thh">          shippingAddress: orderData.shippingAddress,</span></span>
<span class="line"><span class="__shiki_140thh">          items: orderData.items.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">            product: { id: item.productId },</span></span>
<span class="line"><span class="__shiki_140thh">            quantity: item.quantity,</span></span>
<span class="line"><span class="__shiki_140thh">            unitPrice: item.unitPrice</span></span>
<span class="line"><span class="__shiki_140thh">          }))</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 保存订单</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> savedOrder</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> transactionalEntityManager.</span><span class="__shiki_1t8gfj">save</span><span class="__shiki_140thh">(order);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送领域事件</span></span>
<span class="line"><span class="__shiki_140thh">        transactionalEntityManager.queryRunner?.dataSource</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">getEventEmitter</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">          .</span><span class="__shiki_1t8gfj">emit</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.created&#39;</span><span class="__shiki_140thh">, savedOrder);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> savedOrder;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getCustomerOrders</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1jdh33">    customerId</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> string</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    pagination</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> PaginationOptions</span></span>
<span class="line"><span class="__shiki_140thh">  )</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">PaginatedResult</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">&gt;&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">orders</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">total</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.orderRepository</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">findAndCountWithPagination</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          where: { customer: { id: customerId } },</span></span>
<span class="line"><span class="__shiki_140thh">          relations: [</span><span class="__shiki_mdbnqw">&#39;items&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;items.product&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">          order: { createdAt: </span><span class="__shiki_mdbnqw">&#39;DESC&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        pagination.page,</span></span>
<span class="line"><span class="__shiki_140thh">        pagination.limit</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      data: orders,</span></span>
<span class="line"><span class="__shiki_140thh">      pagination: {</span></span>
<span class="line"><span class="__shiki_140thh">        page: pagination.page,</span></span>
<span class="line"><span class="__shiki_140thh">        limit: pagination.limit,</span></span>
<span class="line"><span class="__shiki_140thh">        total,</span></span>
<span class="line"><span class="__shiki_140thh">        totalPages: Math.</span><span class="__shiki_1t8gfj">ceil</span><span class="__shiki_140thh">(total </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> pagination.limit)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 复杂报表查询</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ReportService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getSalesReport</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> SalesReportOptions</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.dataSource</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;DATE(order.created_at)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;date&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;COUNT(order.id)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;orderCount&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SUM(order.total_amount)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;totalRevenue&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;AVG(order.total_amount)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;averageOrderValue&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Order, </span><span class="__shiki_mdbnqw">&#39;order&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">where</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.created_at BETWEEN :startDate AND :endDate&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        startDate: options.startDate,</span></span>
<span class="line"><span class="__shiki_140thh">        endDate: options.endDate</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">andWhere</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;order.status = :status&#39;</span><span class="__shiki_140thh">, { status: </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">groupBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;DATE(order.created_at)&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;date&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ASC&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`sales_report_\${</span><span class="__shiki_140thh">options</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">startDate</span><span class="__shiki_mdbnqw">}_\${</span><span class="__shiki_140thh">options</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">endDate</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3600000</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// 缓存1小时</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">getRawMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> getCustomerLifetimeValue</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.dataSource</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">createQueryBuilder</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;customer.id&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;customerId&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;customer.email&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;email&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;customer.name&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;name&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;COUNT(order.id)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;totalOrders&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SUM(order.total_amount)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;lifetimeValue&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addSelect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;MAX(order.created_at)&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;lastPurchaseDate&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(Customer, </span><span class="__shiki_mdbnqw">&#39;customer&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">leftJoin</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;customer.orders&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;order&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;order.status = :status&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">        status: </span><span class="__shiki_mdbnqw">&#39;completed&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">groupBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;customer.id&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">having</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SUM(order.total_amount) &gt; :minValue&#39;</span><span class="__shiki_140thh">, { minValue: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh"> })</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">orderBy</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;lifetimeValue&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;DESC&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">limit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">getRawMany</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>TypeORM 提供了丰富的高级特性，使得在 Node.js 应用中构建复杂的数据访问层变得简单而强大。关键要点包括：</p><ol><li><strong>数据建模灵活性</strong>：支持继承、嵌入式实体、复杂关系映射</li><li><strong>查询能力强大</strong>：链式 API、子查询、原生查询、全文搜索、地理空间查询</li><li><strong>性能优化</strong>：连接池、查询缓存、批量操作、索引优化</li><li><strong>事务和安全</strong>：多级别事务控制、乐观锁和悲观锁</li><li><strong>架构支持</strong>：存储库模式、数据源管理、迁移系统</li><li><strong>监控和调试</strong>：查询日志、性能监控、错误处理</li></ol><p>在实际项目中，应根据具体需求选择合适的功能，并遵循以下最佳实践：</p><ul><li>生产环境关闭 <code>synchronize</code>，使用迁移管理数据库结构</li><li>合理使用连接池和查询缓存</li><li>对复杂查询进行性能分析和优化</li><li>使用事务确保数据一致性</li><li>实现适当的日志记录和监控</li><li>考虑分库分表策略应对大数据量场景</li></ul>`,74)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
