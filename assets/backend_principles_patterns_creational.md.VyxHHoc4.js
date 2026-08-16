import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"设计模式学习笔记 - 创建型模式","description":"","frontmatter":{},"headers":[],"relativePath":"backend/principles/patterns/creational.md","filePath":"backend/principles/patterns/creational.md"}'),_={name:"backend/principles/patterns/creational.md"};function l(h,s,t,e,c,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="设计模式学习笔记-创建型模式" tabindex="-1">设计模式学习笔记 - 创建型模式 <a class="header-anchor" href="#设计模式学习笔记-创建型模式" aria-label="Permalink to &quot;设计模式学习笔记 - 创建型模式&quot;">​</a></h1><h2 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h2><ul><li><a href="#概述">概述</a></li><li><a href="#单例模式">单例模式</a></li><li><a href="#工厂方法模式">工厂方法模式</a></li><li><a href="#抽象工厂模式">抽象工厂模式</a></li><li><a href="#建造者模式">建造者模式</a></li><li><a href="#原型模式">原型模式</a></li><li><a href="#总结对比">总结对比</a></li></ul><hr><h2 id="一、概述" tabindex="-1">一、概述 <a class="header-anchor" href="#一、概述" aria-label="Permalink to &quot;一、概述&quot;">​</a></h2><h3 id="_1-什么是创建型模式" tabindex="-1">1. 什么是创建型模式 <a class="header-anchor" href="#_1-什么是创建型模式" aria-label="Permalink to &quot;1. 什么是创建型模式&quot;">​</a></h3><p>创建型设计模式主要解决<strong>对象创建机制</strong>的问题，通过控制对象的创建过程，提高系统的灵活性和可复用性。</p><h3 id="_2-主要目标" tabindex="-1">2. 主要目标 <a class="header-anchor" href="#_2-主要目标" aria-label="Permalink to &quot;2. 主要目标&quot;">​</a></h3><ul><li>将系统与对象创建、组合、表示的方式解耦</li><li>封装复杂的创建逻辑</li><li>提供对象创建的灵活性</li></ul><hr><h2 id="二、单例模式-singleton-pattern" tabindex="-1">二、单例模式 (Singleton Pattern) <a class="header-anchor" href="#二、单例模式-singleton-pattern" aria-label="Permalink to &quot;二、单例模式 (Singleton Pattern)&quot;">​</a></h2><h3 id="_1-定义" tabindex="-1">1. 定义 <a class="header-anchor" href="#_1-定义" aria-label="Permalink to &quot;1. 定义&quot;">​</a></h3><p>确保一个类只有一个实例，并提供一个全局访问点。</p><h3 id="_2-应用场景" tabindex="-1">2. 应用场景 <a class="header-anchor" href="#_2-应用场景" aria-label="Permalink to &quot;2. 应用场景&quot;">​</a></h3><ul><li>需要频繁创建和销毁的对象</li><li>创建对象时耗时过多或资源消耗过大</li><li>工具类对象</li><li>数据库连接池、线程池等</li></ul><h3 id="_3-实现方式" tabindex="-1">3. 实现方式 <a class="header-anchor" href="#_3-实现方式" aria-label="Permalink to &quot;3. 实现方式&quot;">​</a></h3><h4 id="_3-1-饿汉式-线程安全" tabindex="-1">3.1 饿汉式（线程安全） <a class="header-anchor" href="#_3-1-饿汉式-线程安全" aria-label="Permalink to &quot;3.1 饿汉式（线程安全）&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Singleton instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Singleton </span><span class="__shiki_1t8gfj">getInstance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> instance;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-懒汉式-双重检查锁" tabindex="-1">3.2 懒汉式（双重检查锁） <a class="header-anchor" href="#_3-2-懒汉式-双重检查锁" aria-label="Permalink to &quot;3.2 懒汉式（双重检查锁）&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_140thh"> Singleton instance;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Singleton </span><span class="__shiki_1t8gfj">getInstance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (instance </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            synchronized</span><span class="__shiki_140thh"> (Singleton.class) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (instance </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> instance;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-3-静态内部类-推荐" tabindex="-1">3.3 静态内部类（推荐） <a class="header-anchor" href="#_3-3-静态内部类-推荐" aria-label="Permalink to &quot;3.3 静态内部类（推荐）&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">public</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh">() {}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> SingletonHolder</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Singleton instance </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Singleton</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Singleton </span><span class="__shiki_1t8gfj">getInstance</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> SingletonHolder.instance;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-优缺点" tabindex="-1">4. 优缺点 <a class="header-anchor" href="#_4-优缺点" aria-label="Permalink to &quot;4. 优缺点&quot;">​</a></h3><p><strong>优点：</strong></p><ul><li>内存中只有一个实例，减少内存开销</li><li>避免对资源的多重占用</li><li>全局访问点，便于管理</li></ul><p><strong>缺点：</strong></p><ul><li>违反单一职责原则</li><li>扩展困难</li><li>测试困难</li></ul><hr><h2 id="三、工厂方法模式-factory-method-pattern" tabindex="-1">三、工厂方法模式 (Factory Method Pattern) <a class="header-anchor" href="#三、工厂方法模式-factory-method-pattern" aria-label="Permalink to &quot;三、工厂方法模式 (Factory Method Pattern)&quot;">​</a></h2><h3 id="_1-定义-1" tabindex="-1">1. 定义 <a class="header-anchor" href="#_1-定义-1" aria-label="Permalink to &quot;1. 定义&quot;">​</a></h3><p>定义一个创建对象的接口，但让子类决定实例化哪个类。工厂方法使一个类的实例化延迟到其子类。</p><h3 id="_2-结构" tabindex="-1">2. 结构 <a class="header-anchor" href="#_2-结构" aria-label="Permalink to &quot;2. 结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Creator (抽象工厂)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↑</span></span>
<span class="line"><span class="__shiki_wvjl67">ConcreteCreator (具体工厂) → ConcreteProduct (具体产品)</span></span></code></pre></div><h3 id="_3-代码示例" tabindex="-1">3. 代码示例 <a class="header-anchor" href="#_3-代码示例" aria-label="Permalink to &quot;3. 代码示例&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 产品接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> use</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体产品A</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteProductA</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> use</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;使用产品A&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体产品B</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteProductB</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> use</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;使用产品B&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 抽象工厂</span></span>
<span class="line"><span class="__shiki_1itgoe">abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Creator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1t8gfj">createProduct</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> someOperation</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        Product product </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> createProduct</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        product.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体工厂A</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteCreatorA</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Creator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1t8gfj">createProduct</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ConcreteProductA</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体工厂B</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteCreatorB</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Creator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Product </span><span class="__shiki_1t8gfj">createProduct</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ConcreteProductB</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-应用场景" tabindex="-1">4. 应用场景 <a class="header-anchor" href="#_4-应用场景" aria-label="Permalink to &quot;4. 应用场景&quot;">​</a></h3><ul><li>无法预知对象的确切类型和依赖关系时</li><li>希望用户能够扩展软件库或框架的内部组件</li><li>希望将产品创建逻辑与使用逻辑分离</li></ul><hr><h2 id="四、抽象工厂模式-abstract-factory-pattern" tabindex="-1">四、抽象工厂模式 (Abstract Factory Pattern) <a class="header-anchor" href="#四、抽象工厂模式-abstract-factory-pattern" aria-label="Permalink to &quot;四、抽象工厂模式 (Abstract Factory Pattern)&quot;">​</a></h2><h3 id="_1-定义-2" tabindex="-1">1. 定义 <a class="header-anchor" href="#_1-定义-2" aria-label="Permalink to &quot;1. 定义&quot;">​</a></h3><p>提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。</p><h3 id="_2-结构-1" tabindex="-1">2. 结构 <a class="header-anchor" href="#_2-结构-1" aria-label="Permalink to &quot;2. 结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">AbstractFactory (抽象工厂)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↑</span></span>
<span class="line"><span class="__shiki_wvjl67">ConcreteFactory1 (具体工厂1) → ProductA1, ProductB1</span></span>
<span class="line"><span class="__shiki_wvjl67">ConcreteFactory2 (具体工厂2) → ProductA2, ProductB2</span></span></code></pre></div><h3 id="_3-代码示例-1" tabindex="-1">3. 代码示例 <a class="header-anchor" href="#_3-代码示例-1" aria-label="Permalink to &quot;3. 代码示例&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 抽象产品A</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> AbstractProductA</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> operationA</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 抽象产品B</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> AbstractProductB</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> operationB</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体产品A1</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteProductA1</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> AbstractProductA</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> operationA</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;产品A1的操作&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体产品B1</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteProductB1</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> AbstractProductB</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> operationB</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;产品B1的操作&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 抽象工厂</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> AbstractFactory</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    AbstractProductA </span><span class="__shiki_1t8gfj">createProductA</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    AbstractProductB </span><span class="__shiki_1t8gfj">createProductB</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体工厂1</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteFactory1</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> AbstractFactory</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> AbstractProductA </span><span class="__shiki_1t8gfj">createProductA</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ConcreteProductA1</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> AbstractProductB </span><span class="__shiki_1t8gfj">createProductB</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ConcreteProductB1</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-应用场景-1" tabindex="-1">4. 应用场景 <a class="header-anchor" href="#_4-应用场景-1" aria-label="Permalink to &quot;4. 应用场景&quot;">​</a></h3><ul><li>系统需要独立于其产品的创建、组合和表示</li><li>系统需要配置多个产品系列中的一个</li><li>需要提供一个产品类库，只暴露接口而不是实现</li></ul><hr><h2 id="五、建造者模式-builder-pattern" tabindex="-1">五、建造者模式 (Builder Pattern) <a class="header-anchor" href="#五、建造者模式-builder-pattern" aria-label="Permalink to &quot;五、建造者模式 (Builder Pattern)&quot;">​</a></h2><h3 id="_1-定义-3" tabindex="-1">1. 定义 <a class="header-anchor" href="#_1-定义-3" aria-label="Permalink to &quot;1. 定义&quot;">​</a></h3><p>将一个复杂对象的构建与其表示分离，使得同样的构建过程可以创建不同的表示。</p><h3 id="_2-结构-2" tabindex="-1">2. 结构 <a class="header-anchor" href="#_2-结构-2" aria-label="Permalink to &quot;2. 结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Director (指挥者) → Builder (抽象建造者) ← ConcreteBuilder (具体建造者) → Product (产品)</span></span></code></pre></div><h3 id="_3-代码示例-2" tabindex="-1">3. 代码示例 <a class="header-anchor" href="#_3-代码示例-2" aria-label="Permalink to &quot;3. 代码示例&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 产品类</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Computer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String cpu;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String memory;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String storage;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 省略getter/setter方法</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &quot;Computer{&quot;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;cpu=&#39;&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> cpu </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;, memory=&#39;&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> memory </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;, storage=&#39;&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> storage </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_1itgoe"> +</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &#39;}&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 抽象建造者</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> ComputerBuilder</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> buildCPU</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> buildMemory</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> buildStorage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    Computer </span><span class="__shiki_1t8gfj">getResult</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体建造者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> GamingComputerBuilder</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> ComputerBuilder</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Computer computer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Computer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> buildCPU</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        computer.</span><span class="__shiki_1t8gfj">setCpu</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Intel i9&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> buildMemory</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        computer.</span><span class="__shiki_1t8gfj">setMemory</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;32GB DDR4&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> buildStorage</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        computer.</span><span class="__shiki_1t8gfj">setStorage</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;1TB SSD + 2TB HDD&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Computer </span><span class="__shiki_1t8gfj">getResult</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> computer;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 指挥者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ComputerDirector</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Computer </span><span class="__shiki_1t8gfj">construct</span><span class="__shiki_140thh">(ComputerBuilder </span><span class="__shiki_1jdh33">builder</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        builder.</span><span class="__shiki_1t8gfj">buildCPU</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        builder.</span><span class="__shiki_1t8gfj">buildMemory</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        builder.</span><span class="__shiki_1t8gfj">buildStorage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> builder.</span><span class="__shiki_1t8gfj">getResult</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用</span></span>
<span class="line"><span class="__shiki_140thh">ComputerDirector director </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ComputerDirector</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">ComputerBuilder builder </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> GamingComputerBuilder</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">Computer computer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> director.</span><span class="__shiki_1t8gfj">construct</span><span class="__shiki_140thh">(builder);</span></span></code></pre></div><h3 id="_4-应用场景-2" tabindex="-1">4. 应用场景 <a class="header-anchor" href="#_4-应用场景-2" aria-label="Permalink to &quot;4. 应用场景&quot;">​</a></h3><ul><li>创建复杂对象，其各部分子对象需要按照特定步骤构建</li><li>创建过程需要不同的表示</li><li>需要精确控制对象的创建过程</li></ul><hr><h2 id="六、原型模式-prototype-pattern" tabindex="-1">六、原型模式 (Prototype Pattern) <a class="header-anchor" href="#六、原型模式-prototype-pattern" aria-label="Permalink to &quot;六、原型模式 (Prototype Pattern)&quot;">​</a></h2><h3 id="_1-定义-4" tabindex="-1">1. 定义 <a class="header-anchor" href="#_1-定义-4" aria-label="Permalink to &quot;1. 定义&quot;">​</a></h3><p>用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。</p><h3 id="_2-实现方式" tabindex="-1">2. 实现方式 <a class="header-anchor" href="#_2-实现方式" aria-label="Permalink to &quot;2. 实现方式&quot;">​</a></h3><h4 id="_2-1-浅拷贝" tabindex="-1">2.1 浅拷贝 <a class="header-anchor" href="#_2-1-浅拷贝" aria-label="Permalink to &quot;2.1 浅拷贝&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Prototype</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Cloneable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; list;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Prototype </span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> (Prototype) </span><span class="__shiki_dzsirb">super</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (CloneNotSupportedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> RuntimeException</span><span class="__shiki_140thh">(e);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_2-2-深拷贝" tabindex="-1">2.2 深拷贝 <a class="header-anchor" href="#_2-2-深拷贝" aria-label="Permalink to &quot;2.2 深拷贝&quot;">​</a></h4><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DeepPrototype</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Cloneable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; list;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> DeepPrototype </span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            DeepPrototype clone </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (DeepPrototype) </span><span class="__shiki_dzsirb">super</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">clone</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            clone.list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.list); </span><span class="__shiki_21nrsd">// 深拷贝引用对象</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> clone;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (CloneNotSupportedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> RuntimeException</span><span class="__shiki_140thh">(e);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-应用场景" tabindex="-1">3. 应用场景 <a class="header-anchor" href="#_3-应用场景" aria-label="Permalink to &quot;3. 应用场景&quot;">​</a></h3><ul><li>当创建新对象实例的成本较高时</li><li>系统需要独立于其产品的创建、构成和表示</li><li>需要避免使用层次结构的工厂类</li></ul><hr><h2 id="七、总结对比" tabindex="-1">七、总结对比 <a class="header-anchor" href="#七、总结对比" aria-label="Permalink to &quot;七、总结对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>模式</th><th>核心思想</th><th>适用场景</th><th>优点</th><th>缺点</th></tr></thead><tbody><tr><td><strong>单例模式</strong></td><td>确保一个类只有一个实例</td><td>需要全局唯一实例的场景</td><td>减少内存开销，避免资源冲突</td><td>违反单一职责原则，测试困难</td></tr><tr><td><strong>工厂方法</strong></td><td>由子类决定创建哪个对象</td><td>创建逻辑复杂，需要扩展</td><td>符合开闭原则，解耦创建逻辑</td><td>类数量增加，系统复杂度提高</td></tr><tr><td><strong>抽象工厂</strong></td><td>创建相关产品家族</td><td>产品族扩展，系统平台切换</td><td>保证产品兼容性，符合开闭原则</td><td>产品族扩展困难，类数量多</td></tr><tr><td><strong>建造者</strong></td><td>分步骤构建复杂对象</td><td>创建过程复杂，需要精细控制</td><td>建造独立，易于扩展，精细控制</td><td>产品差异大时不适用，增加复杂度</td></tr><tr><td><strong>原型模式</strong></td><td>通过拷贝创建新对象</td><td>创建成本高，需要动态配置</td><td>性能高，避免构造约束</td><td>深拷贝实现复杂，需要Cloneable支持</td></tr></tbody></table><h3 id="选择原则" tabindex="-1">选择原则 <a class="header-anchor" href="#选择原则" aria-label="Permalink to &quot;选择原则&quot;">​</a></h3><ol><li><strong>需要控制实例数量</strong> → 单例模式</li><li><strong>需要灵活创建对象</strong> → 工厂方法模式</li><li><strong>需要创建产品家族</strong> → 抽象工厂模式</li><li><strong>需要分步构建复杂对象</strong> → 建造者模式</li><li><strong>需要高性能的对象创建</strong> → 原型模式</li></ol>`,73)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
