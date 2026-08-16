import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"行为型设计模式学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/principles/patterns/behavioral.md","filePath":"backend/principles/patterns/behavioral.md"}'),_={name:"backend/principles/patterns/behavioral.md"};function l(h,s,t,e,c,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="行为型设计模式学习笔记" tabindex="-1">行为型设计模式学习笔记 <a class="header-anchor" href="#行为型设计模式学习笔记" aria-label="Permalink to &quot;行为型设计模式学习笔记&quot;">​</a></h1><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p>行为型设计模式主要关注<strong>对象之间的职责分配</strong>和<strong>算法抽象</strong>，描述对象之间怎样相互协作完成单个对象无法完成的任务。它们不仅描述对象或类的模式，还描述它们之间的通信模式。</p><h2 id="_1-模板方法模式-template-method-pattern" tabindex="-1">1. 模板方法模式 (Template Method Pattern) <a class="header-anchor" href="#_1-模板方法模式-template-method-pattern" aria-label="Permalink to &quot;1. 模板方法模式 (Template Method Pattern)&quot;">​</a></h2><h3 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>定义一个操作中的算法骨架，而将一些步骤延迟到子类中。使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。</p><h3 id="结构" tabindex="-1">结构 <a class="header-anchor" href="#结构" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>抽象类(AbstractClass)</strong>: 定义抽象的原语操作，实现一个模板方法</li><li><strong>具体类(ConcreteClass)</strong>: 实现原语操作以完成算法中与特定子类相关的步骤</li></ul><h3 id="实现方式" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 抽象类</span></span>
<span class="line"><span class="__shiki_1itgoe">abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> DataProcessor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模板方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> process</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        readData</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        processData</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        saveData</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 具体方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> readData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Reading data from file...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 抽象方法，由子类实现</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processData</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 具体方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> saveData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Saving data to database...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体类</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CSVDataProcessor</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> DataProcessor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Processing CSV data...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> XMLDataProcessor</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> DataProcessor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Processing XML data...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>一次性实现算法的不变部分，将可变的行为留给子类来实现</li><li>各子类中公共的行为应被提取出来并集中到一个公共父类中</li><li>控制子类扩展，模板方法只在特定点调用&quot;hook&quot;操作</li></ul><h2 id="_2-策略模式-strategy-pattern" tabindex="-1">2. 策略模式 (Strategy Pattern) <a class="header-anchor" href="#_2-策略模式-strategy-pattern" aria-label="Permalink to &quot;2. 策略模式 (Strategy Pattern)&quot;">​</a></h2><h3 id="定义-1" tabindex="-1">定义 <a class="header-anchor" href="#定义-1" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>定义一系列算法，将每个算法封装起来，并使它们可以相互替换。策略模式让算法独立于使用它的客户而变化。</p><h3 id="结构-1" tabindex="-1">结构 <a class="header-anchor" href="#结构-1" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>策略接口(Strategy)</strong>: 定义所有支持的算法的公共接口</li><li><strong>具体策略(ConcreteStrategy)</strong>: 实现策略接口的具体算法类</li><li><strong>上下文(Context)</strong>: 用一个具体策略对象来配置，维护策略对象的引用</li></ul><h3 id="实现方式-1" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-1" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 策略接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> PaymentStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> pay</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体策略</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CreditCardPayment</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> PaymentStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String cardNumber;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> CreditCardPayment</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">cardNumber</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.cardNumber </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cardNumber;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> pay</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Paid &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> amount </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; using Credit Card: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> cardNumber);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PayPalPayment</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> PaymentStrategy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String email;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> PayPalPayment</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">email</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> email;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> pay</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Paid &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> amount </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; using PayPal: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> email);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 上下文</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ShoppingCart</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> PaymentStrategy paymentStrategy;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setPaymentStrategy</span><span class="__shiki_140thh">(PaymentStrategy </span><span class="__shiki_1jdh33">paymentStrategy</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.paymentStrategy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> paymentStrategy;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> checkout</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        paymentStrategy.</span><span class="__shiki_1t8gfj">pay</span><span class="__shiki_140thh">(amount);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-1" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-1" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>许多相关的类仅仅是行为有异</li><li>需要使用一个算法的不同变体</li><li>算法使用客户不应该知道的数据</li><li>一个类定义了多种行为，并且这些行为在这个类的操作中以多个条件语句的形式出现</li></ul><h2 id="_3-观察者模式-observer-pattern" tabindex="-1">3. 观察者模式 (Observer Pattern) <a class="header-anchor" href="#_3-观察者模式-observer-pattern" aria-label="Permalink to &quot;3. 观察者模式 (Observer Pattern)&quot;">​</a></h2><h3 id="定义-2" tabindex="-1">定义 <a class="header-anchor" href="#定义-2" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。</p><h3 id="结构-2" tabindex="-1">结构 <a class="header-anchor" href="#结构-2" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>主题(Subject)</strong>: 提供注册和删除观察者对象的接口</li><li><strong>具体主题(ConcreteSubject)</strong>: 存储具体观察者感兴趣的状态</li><li><strong>观察者(Observer)</strong>: 为所有的具体观察者定义一个更新接口</li><li><strong>具体观察者(ConcreteObserver)</strong>: 实现观察者更新接口</li></ul><h3 id="实现方式-2" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-2" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> java.util.</span><span class="__shiki_dzsirb">*</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 观察者接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Observer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> update</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 主题接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Subject</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> registerObserver</span><span class="__shiki_140thh">(Observer </span><span class="__shiki_1jdh33">observer</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> removeObserver</span><span class="__shiki_140thh">(Observer </span><span class="__shiki_1jdh33">observer</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> notifyObservers</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体主题</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> NewsAgency</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Subject</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Observer</span><span class="__shiki_140thh">&gt; observers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String news;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setNews</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">news</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">new</span><span class="__shiki_140thh">s </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> news;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        notifyObservers</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> registerObserver</span><span class="__shiki_140thh">(Observer </span><span class="__shiki_1jdh33">observer</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        observers.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(observer);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> removeObserver</span><span class="__shiki_140thh">(Observer </span><span class="__shiki_1jdh33">observer</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        observers.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(observer);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> notifyObservers</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (Observer observer </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> observers) {</span></span>
<span class="line"><span class="__shiki_140thh">            observer.</span><span class="__shiki_1t8gfj">update</span><span class="__shiki_140thh">(news);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体观察者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> NewsChannel</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Observer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String news;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> update</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">news</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1itgoe">new</span><span class="__shiki_140thh">s </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> news;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        display</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> display</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Breaking News: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> news);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-2" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-2" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>一个抽象模型有两个方面，其中一个方面依赖于另一个方面</li><li>一个对象的改变需要同时改变其他对象，而不知道具体有多少对象有待改变</li><li>一个对象必须通知其他对象，而又不能假定这些对象是谁</li></ul><h2 id="_4-责任链模式-chain-of-responsibility-pattern" tabindex="-1">4. 责任链模式 (Chain of Responsibility Pattern) <a class="header-anchor" href="#_4-责任链模式-chain-of-responsibility-pattern" aria-label="Permalink to &quot;4. 责任链模式 (Chain of Responsibility Pattern)&quot;">​</a></h2><h3 id="定义-3" tabindex="-1">定义 <a class="header-anchor" href="#定义-3" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。</p><h3 id="结构-3" tabindex="-1">结构 <a class="header-anchor" href="#结构-3" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>处理器(Handler)</strong>: 定义处理请求的接口，实现后继链</li><li><strong>具体处理器(ConcreteHandler)</strong>: 处理它负责的请求，可访问它的后继者</li></ul><h3 id="实现方式-3" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-3" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 处理器抽象类</span></span>
<span class="line"><span class="__shiki_1itgoe">abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Logger</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> INFO </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> DEBUG </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> ERROR </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> level;</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_140thh"> Logger nextLogger;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setNextLogger</span><span class="__shiki_140thh">(Logger </span><span class="__shiki_1jdh33">nextLogger</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.nextLogger </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> nextLogger;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> logMessage</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> level</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.level </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> level) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            write</span><span class="__shiki_140thh">(message);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (nextLogger </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            nextLogger.</span><span class="__shiki_1t8gfj">logMessage</span><span class="__shiki_140thh">(level, message);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    abstract</span><span class="__shiki_1itgoe"> protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> write</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConsoleLogger</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Logger</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ConsoleLogger</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> level</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> level;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> write</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Standard Console::Logger: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> message);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ErrorLogger</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Logger</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ErrorLogger</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> level</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> level;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> write</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Error Console::Logger: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> message);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> FileLogger</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Logger</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> FileLogger</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> level</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.level </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> level;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> write</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;File::Logger: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> message);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-3" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-3" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>有多个对象可以处理一个请求，哪个对象处理该请求运行时刻自动确定</li><li>想在不明确指定接收者的情况下向多个对象中的一个提交一个请求</li><li>可处理一个请求的对象集合应被动态指定</li></ul><h2 id="_5-命令模式-command-pattern" tabindex="-1">5. 命令模式 (Command Pattern) <a class="header-anchor" href="#_5-命令模式-command-pattern" aria-label="Permalink to &quot;5. 命令模式 (Command Pattern)&quot;">​</a></h2><h3 id="定义-4" tabindex="-1">定义 <a class="header-anchor" href="#定义-4" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>将一个请求封装为一个对象，从而使你可以用不同的请求对客户进行参数化，对请求排队或记录请求日志，以及支持可撤销的操作。</p><h3 id="结构-4" tabindex="-1">结构 <a class="header-anchor" href="#结构-4" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>命令接口(Command)</strong>: 声明执行操作的接口</li><li><strong>具体命令(ConcreteCommand)</strong>: 将一个接收者对象绑定于一个动作</li><li><strong>调用者(Invoker)</strong>: 要求该命令执行这个请求</li><li><strong>接收者(Receiver)</strong>: 知道如何实施与执行一个请求相关的操作</li></ul><h3 id="实现方式-4" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-4" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 命令接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Command</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> undo</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 接收者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Light</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> on</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Light is ON&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> off</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Light is OFF&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体命令</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> LightOnCommand</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Command</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Light light;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> LightOnCommand</span><span class="__shiki_140thh">(Light </span><span class="__shiki_1jdh33">light</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.light </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> light;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        light.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> undo</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        light.</span><span class="__shiki_1t8gfj">off</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> LightOffCommand</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Command</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Light light;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> LightOffCommand</span><span class="__shiki_140thh">(Light </span><span class="__shiki_1jdh33">light</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.light </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> light;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        light.</span><span class="__shiki_1t8gfj">off</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> undo</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        light.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 调用者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RemoteControl</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Command command;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setCommand</span><span class="__shiki_140thh">(Command </span><span class="__shiki_1jdh33">command</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.command </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> command;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> pressButton</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        command.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> pressUndo</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        command.</span><span class="__shiki_1t8gfj">undo</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-4" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-4" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>抽象出待执行的动作以参数化某对象</li><li>在不同的时刻指定、排列和执行请求</li><li>支持取消操作</li><li>支持修改日志，这样当系统崩溃时，这些修改可以被重做一遍</li></ul><h2 id="_6-状态模式-state-pattern" tabindex="-1">6. 状态模式 (State Pattern) <a class="header-anchor" href="#_6-状态模式-state-pattern" aria-label="Permalink to &quot;6. 状态模式 (State Pattern)&quot;">​</a></h2><h3 id="定义-5" tabindex="-1">定义 <a class="header-anchor" href="#定义-5" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。</p><h3 id="结构-5" tabindex="-1">结构 <a class="header-anchor" href="#结构-5" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>上下文(Context)</strong>: 定义客户感兴趣的接口，维护一个具体状态子类的实例</li><li><strong>状态接口(State)</strong>: 定义一个接口以封装与Context的一个特定状态相关的行为</li><li><strong>具体状态(ConcreteState)</strong>: 每一个子类实现一个与Context的一个状态相关的行为</li></ul><h3 id="实现方式-5" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-5" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 状态接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> State</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> handleRequest</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体状态</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteStateA</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> State</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleRequest</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Handling request in State A&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConcreteStateB</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> State</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleRequest</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Handling request in State B&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 上下文</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Context</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> State state;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> Context</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 默认状态</span></span>
<span class="line"><span class="__shiki_140thh">        state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ConcreteStateA</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setState</span><span class="__shiki_140thh">(State </span><span class="__shiki_1jdh33">state</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> state;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> request</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        state.</span><span class="__shiki_1t8gfj">handleRequest</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-5" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-5" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>一个对象的行为取决于它的状态，并且它必须在运行时刻根据状态改变它的行为</li><li>一个操作中含有庞大的多分支的条件语句，且这些分支依赖于该对象的状态</li></ul><h2 id="_7-访问者模式-visitor-pattern" tabindex="-1">7. 访问者模式 (Visitor Pattern) <a class="header-anchor" href="#_7-访问者模式-visitor-pattern" aria-label="Permalink to &quot;7. 访问者模式 (Visitor Pattern)&quot;">​</a></h2><h3 id="定义-6" tabindex="-1">定义 <a class="header-anchor" href="#定义-6" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。</p><h3 id="结构-6" tabindex="-1">结构 <a class="header-anchor" href="#结构-6" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>访问者(Visitor)</strong>: 为该对象结构中每个具体类声明一个访问操作</li><li><strong>具体访问者(ConcreteVisitor)</strong>: 实现每个由访问者声明的操作</li><li><strong>元素(Element)</strong>: 定义一个接受操作，它以一个访问者为参数</li><li><strong>具体元素(ConcreteElement)</strong>: 实现接受操作</li><li><strong>对象结构(ObjectStructure)</strong>: 能枚举它的元素，可以提供一个高层的接口以允许访问者访问它的元素</li></ul><h3 id="实现方式-6" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-6" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 访问者接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> ComputerPartVisitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> visit</span><span class="__shiki_140thh">(Computer </span><span class="__shiki_1jdh33">computer</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> visit</span><span class="__shiki_140thh">(Mouse </span><span class="__shiki_1jdh33">mouse</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> visit</span><span class="__shiki_140thh">(Keyboard </span><span class="__shiki_1jdh33">keyboard</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> visit</span><span class="__shiki_140thh">(Monitor </span><span class="__shiki_1jdh33">monitor</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 元素接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> ComputerPart</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> accept</span><span class="__shiki_140thh">(ComputerPartVisitor </span><span class="__shiki_1jdh33">computerPartVisitor</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体元素</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Computer</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> ComputerPart</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ComputerPart</span><span class="__shiki_140thh">[] parts;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> Computer</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        parts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> ComputerPart</span><span class="__shiki_140thh">[] { </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Mouse</span><span class="__shiki_140thh">(), </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Keyboard</span><span class="__shiki_140thh">(), </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Monitor</span><span class="__shiki_140thh">() };</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> accept</span><span class="__shiki_140thh">(ComputerPartVisitor </span><span class="__shiki_1jdh33">computerPartVisitor</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (ComputerPart part </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> parts) {</span></span>
<span class="line"><span class="__shiki_140thh">            part.</span><span class="__shiki_1t8gfj">accept</span><span class="__shiki_140thh">(computerPartVisitor);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        computerPartVisitor.</span><span class="__shiki_1t8gfj">visit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Mouse</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> ComputerPart</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> accept</span><span class="__shiki_140thh">(ComputerPartVisitor </span><span class="__shiki_1jdh33">computerPartVisitor</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        computerPartVisitor.</span><span class="__shiki_1t8gfj">visit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体访问者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ComputerPartDisplayVisitor</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> ComputerPartVisitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> visit</span><span class="__shiki_140thh">(Computer </span><span class="__shiki_1jdh33">computer</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Displaying Computer.&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> visit</span><span class="__shiki_140thh">(Mouse </span><span class="__shiki_1jdh33">mouse</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Displaying Mouse.&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> visit</span><span class="__shiki_140thh">(Keyboard </span><span class="__shiki_1jdh33">keyboard</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Displaying Keyboard.&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> visit</span><span class="__shiki_140thh">(Monitor </span><span class="__shiki_1jdh33">monitor</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Displaying Monitor.&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-6" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-6" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>一个对象结构包含很多类对象，它们有不同的接口，而你想对这些对象实施一些依赖于其具体类的操作</li><li>需要对一个对象结构中的对象进行很多不同并且不相关的操作</li><li>定义对象结构的类很少改变，但经常需要在此结构上定义新的操作</li></ul><h2 id="_8-中介者模式-mediator-pattern" tabindex="-1">8. 中介者模式 (Mediator Pattern) <a class="header-anchor" href="#_8-中介者模式-mediator-pattern" aria-label="Permalink to &quot;8. 中介者模式 (Mediator Pattern)&quot;">​</a></h2><h3 id="定义-7" tabindex="-1">定义 <a class="header-anchor" href="#定义-7" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。</p><h3 id="结构-7" tabindex="-1">结构 <a class="header-anchor" href="#结构-7" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>中介者(Mediator)</strong>: 定义各个同事对象交互的接口</li><li><strong>具体中介者(ConcreteMediator)</strong>: 实现中介者接口，协调各个同事对象</li><li><strong>同事类(Colleague)</strong>: 每个同事类都知道它的中介者对象</li></ul><h3 id="实现方式-7" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-7" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 中介者接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> ChatMediator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> sendMessage</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">, User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> addUser</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体中介者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ChatMediatorImpl</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> ChatMediator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; users;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ChatMediatorImpl</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> addUser</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.users.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> sendMessage</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">, User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (User u </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.users) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 消息不应该被发送者接收到</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (u </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> user) {</span></span>
<span class="line"><span class="__shiki_140thh">                u.</span><span class="__shiki_1t8gfj">receive</span><span class="__shiki_140thh">(msg);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 同事类</span></span>
<span class="line"><span class="__shiki_1itgoe">abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_140thh"> ChatMediator mediator;</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh">(ChatMediator </span><span class="__shiki_1jdh33">med</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.mediator </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> med;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> name;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> send</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> receive</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserImpl</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> User</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> UserImpl</span><span class="__shiki_140thh">(ChatMediator </span><span class="__shiki_1jdh33">med</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">(med, name);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> send</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.name </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;: Sending Message=&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> msg);</span></span>
<span class="line"><span class="__shiki_140thh">        mediator.</span><span class="__shiki_1t8gfj">sendMessage</span><span class="__shiki_140thh">(msg, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> receive</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.name </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;: Received Message:&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> msg);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-7" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-7" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>一组对象以定义良好但是复杂的方式进行通信</li><li>一个对象引用很多其他对象并且直接与这些对象通信，导致难以复用该对象</li><li>想定制一个分布在多个类中的行为，而又不想生成太多的子类</li></ul><h2 id="_9-迭代器模式-iterator-pattern" tabindex="-1">9. 迭代器模式 (Iterator Pattern) <a class="header-anchor" href="#_9-迭代器模式-iterator-pattern" aria-label="Permalink to &quot;9. 迭代器模式 (Iterator Pattern)&quot;">​</a></h2><h3 id="定义-8" tabindex="-1">定义 <a class="header-anchor" href="#定义-8" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>提供一种方法顺序访问一个聚合对象中各个元素，而又不暴露该对象的内部表示。</p><h3 id="结构-8" tabindex="-1">结构 <a class="header-anchor" href="#结构-8" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>迭代器接口(Iterator)</strong>: 定义访问和遍历元素的接口</li><li><strong>具体迭代器(ConcreteIterator)</strong>: 实现迭代器接口，跟踪遍历的当前位置</li><li><strong>聚合接口(Aggregate)</strong>: 定义创建相应迭代器对象的接口</li><li><strong>具体聚合(ConcreteAggregate)</strong>: 实现创建相应迭代器的接口</li></ul><h3 id="实现方式-8" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-8" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 迭代器接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Iterator</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    boolean</span><span class="__shiki_1t8gfj"> hasNext</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    T </span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 聚合接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Container</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_140thh">    Iterator&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getIterator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体聚合</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> NameRepository</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Container</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> String</span><span class="__shiki_140thh">[] names </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;Robert&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;John&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Julie&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Lora&quot;</span><span class="__shiki_140thh">};</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Iterator&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">getIterator</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> NameIterator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 具体迭代器</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> NameIterator</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Iterator</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> index;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> hasNext</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> index </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> names.length;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hasNext</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> names[index</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-8" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-8" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>访问一个聚合对象的内容而无需暴露它的内部表示</li><li>支持对聚合对象的多种遍历</li><li>为遍历不同的聚合结构提供一个统一的接口</li></ul><h2 id="_10-备忘录模式-memento-pattern" tabindex="-1">10. 备忘录模式 (Memento Pattern) <a class="header-anchor" href="#_10-备忘录模式-memento-pattern" aria-label="Permalink to &quot;10. 备忘录模式 (Memento Pattern)&quot;">​</a></h2><h3 id="定义-9" tabindex="-1">定义 <a class="header-anchor" href="#定义-9" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便以后可以将该对象恢复到原先保存的状态。</p><h3 id="结构-9" tabindex="-1">结构 <a class="header-anchor" href="#结构-9" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>备忘录(Memento)</strong>: 存储原发器对象的内部状态</li><li><strong>原发器(Originator)</strong>: 创建一个备忘录，记录它的当前内部状态，也可以使用备忘录恢复内部状态</li><li><strong>管理者(Caretaker)</strong>: 负责保存备忘录，不能对备忘录的内容进行操作或检查</li></ul><h3 id="实现方式-9" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-9" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 备忘录</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Memento</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String state;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> Memento</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">state</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> state;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">getState</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> state;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 原发器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Originator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String state;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setState</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">state</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> state;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">getState</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> state;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Memento </span><span class="__shiki_1t8gfj">saveStateToMemento</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Memento</span><span class="__shiki_140thh">(state);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> getStateFromMemento</span><span class="__shiki_140thh">(Memento </span><span class="__shiki_1jdh33">memento</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> memento.</span><span class="__shiki_1t8gfj">getState</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 管理者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CareTaker</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">Memento</span><span class="__shiki_140thh">&gt; mementoList </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(Memento </span><span class="__shiki_1jdh33">state</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        mementoList.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(state);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Memento </span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> index</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> mementoList.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(index);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-9" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-9" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>必须保存一个对象在某一个时刻的状态，这样以后需要时它才能恢复到先前的状态</li><li>如果用接口来让其他对象直接得到这些状态，将会暴露对象的实现细节并破坏对象的封装性</li></ul><h2 id="_11-解释器模式-interpreter-pattern" tabindex="-1">11. 解释器模式 (Interpreter Pattern) <a class="header-anchor" href="#_11-解释器模式-interpreter-pattern" aria-label="Permalink to &quot;11. 解释器模式 (Interpreter Pattern)&quot;">​</a></h2><h3 id="定义-10" tabindex="-1">定义 <a class="header-anchor" href="#定义-10" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。</p><h3 id="结构-10" tabindex="-1">结构 <a class="header-anchor" href="#结构-10" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>抽象表达式(AbstractExpression)</strong>: 声明一个抽象的解释操作</li><li><strong>终结符表达式(TerminalExpression)</strong>: 实现与文法中的终结符相关联的解释操作</li><li><strong>非终结符表达式(NonterminalExpression)</strong>: 对文法中的每一条规则都需要一个具体的非终结符表达式类</li><li><strong>上下文(Context)</strong>: 包含解释器之外的一些全局信息</li></ul><h3 id="实现方式-10" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-10" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 抽象表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Expression</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    boolean</span><span class="__shiki_1t8gfj"> interpret</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 终结符表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TerminalExpression</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Expression</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String data;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> TerminalExpression</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> interpret</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">contains</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 非终结符表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OrExpression</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Expression</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Expression expr1;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Expression expr2;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> OrExpression</span><span class="__shiki_140thh">(Expression </span><span class="__shiki_1jdh33">expr1</span><span class="__shiki_140thh">, Expression </span><span class="__shiki_1jdh33">expr2</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.expr1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> expr1;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.expr2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> expr2;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> interpret</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> expr1.</span><span class="__shiki_1t8gfj">interpret</span><span class="__shiki_140thh">(context) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> expr2.</span><span class="__shiki_1t8gfj">interpret</span><span class="__shiki_140thh">(context);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AndExpression</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Expression</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Expression expr1;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Expression expr2;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> AndExpression</span><span class="__shiki_140thh">(Expression </span><span class="__shiki_1jdh33">expr1</span><span class="__shiki_140thh">, Expression </span><span class="__shiki_1jdh33">expr2</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.expr1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> expr1;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.expr2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> expr2;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> interpret</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">context</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> expr1.</span><span class="__shiki_1t8gfj">interpret</span><span class="__shiki_140thh">(context) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> expr2.</span><span class="__shiki_1t8gfj">interpret</span><span class="__shiki_140thh">(context);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-10" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-10" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>当有一个语言需要解释执行，并且你可将该语言中的句子表示为一个抽象语法树时</li><li>该文法简单（对于复杂的文法，文法的类层次变得庞大而无法管理）</li><li>效率不是关键问题（最高效的解释器通常不是通过直接解释语法分析树实现的）</li></ul><h2 id="总结对比" tabindex="-1">总结对比 <a class="header-anchor" href="#总结对比" aria-label="Permalink to &quot;总结对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>模式</th><th>主要目的</th><th>关键特点</th><th>适用场景</th></tr></thead><tbody><tr><td>模板方法</td><td>算法骨架固定，步骤可变</td><td>父类定义骨架，子类实现细节</td><td>算法有固定流程但某些步骤可变</td></tr><tr><td>策略</td><td>算法可互换</td><td>封装算法，独立于客户端</td><td>多种算法，需要动态切换</td></tr><tr><td>观察者</td><td>一对多依赖通知</td><td>主题状态变化自动通知观察者</td><td>事件处理、消息通知系统</td></tr><tr><td>责任链</td><td>请求传递链</td><td>多个处理器组成链，依次处理</td><td>审批流程、过滤器链</td></tr><tr><td>命令</td><td>请求封装为对象</td><td>将请求与执行解耦，支持撤销</td><td>任务队列、事务处理</td></tr><tr><td>状态</td><td>状态改变影响行为</td><td>对象行为随状态改变而改变</td><td>状态机、游戏角色状态</td></tr><tr><td>访问者</td><td>对元素执行操作</td><td>不改变元素类的情况下定义新操作</td><td>编译器、文档处理</td></tr><tr><td>中介者</td><td>对象交互中介</td><td>通过中介者减少对象间耦合</td><td>聊天系统、UI组件交互</td></tr><tr><td>迭代器</td><td>集合遍历</td><td>统一遍历接口，隐藏内部结构</td><td>集合类遍历、数据库游标</td></tr><tr><td>备忘录</td><td>状态保存恢复</td><td>保存对象状态，支持撤销</td><td>文本编辑器、游戏存档</td></tr><tr><td>解释器</td><td>语言解释</td><td>定义文法，解释语言句子</td><td>编译器、规则引擎</td></tr></tbody></table><h2 id="设计原则体现" tabindex="-1">设计原则体现 <a class="header-anchor" href="#设计原则体现" aria-label="Permalink to &quot;设计原则体现&quot;">​</a></h2><ol><li><strong>开闭原则</strong>: 策略模式、状态模式、访问者模式</li><li><strong>单一职责原则</strong>: 命令模式、迭代器模式</li><li><strong>接口隔离原则</strong>: 所有行为型模式都通过接口进行解耦</li><li><strong>依赖倒置原则</strong>: 模板方法模式、策略模式</li><li><strong>迪米特法则</strong>: 中介者模式、观察者模式</li><li><strong>合成复用原则</strong>: 迭代器模式、访问者模式</li></ol><h2 id="行为型模式分类" tabindex="-1">行为型模式分类 <a class="header-anchor" href="#行为型模式分类" aria-label="Permalink to &quot;行为型模式分类&quot;">​</a></h2><h3 id="类行为型模式" tabindex="-1">类行为型模式 <a class="header-anchor" href="#类行为型模式" aria-label="Permalink to &quot;类行为型模式&quot;">​</a></h3><ul><li>使用继承机制在类间分派行为</li><li><strong>模板方法模式</strong>: 子类重定义算法的某些步骤</li><li><strong>解释器模式</strong>: 通过继承和组合表示文法</li></ul><h3 id="对象行为型模式" tabindex="-1">对象行为型模式 <a class="header-anchor" href="#对象行为型模式" aria-label="Permalink to &quot;对象行为型模式&quot;">​</a></h3><ul><li>使用对象复合而不是继承</li><li><strong>策略模式</strong>: 封装算法到独立策略对象</li><li><strong>状态模式</strong>: 封装状态相关行为到状态对象</li><li><strong>观察者模式</strong>: 定义对象间的一对多依赖</li><li><strong>责任链模式</strong>: 对象链处理请求</li><li><strong>命令模式</strong>: 封装请求为对象</li><li><strong>访问者模式</strong>: 在不改变类的前提下定义新操作</li><li><strong>中介者模式</strong>: 封装对象交互</li><li><strong>备忘录模式</strong>: 外部保存对象状态</li><li><strong>迭代器模式</strong>: 顺序访问聚合元素</li></ul><p>行为型模式通过描述对象或类之间怎样相互协作完成单个对象无法完成的任务，使得系统具有更好的灵活性和可维护性。</p>`,112)])])}const g=a(_,[["render",l]]);export{r as __pageData,g as default};
