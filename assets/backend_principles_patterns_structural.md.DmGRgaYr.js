import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"结构型设计模式学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/principles/patterns/structural.md","filePath":"backend/principles/patterns/structural.md"}'),_={name:"backend/principles/patterns/structural.md"};function l(h,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="结构型设计模式学习笔记" tabindex="-1">结构型设计模式学习笔记 <a class="header-anchor" href="#结构型设计模式学习笔记" aria-label="Permalink to &quot;结构型设计模式学习笔记&quot;">​</a></h1><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p>结构型设计模式主要关注如何将类或对象按某种布局组成更大的结构。它分为<strong>类结构型模式</strong>（关心类的组合，通过继承机制）和<strong>对象结构型模式</strong>（关心类与对象的组合，通过关联关系）。</p><h2 id="_1-适配器模式-adapter-pattern" tabindex="-1">1. 适配器模式 (Adapter Pattern) <a class="header-anchor" href="#_1-适配器模式-adapter-pattern" aria-label="Permalink to &quot;1. 适配器模式 (Adapter Pattern)&quot;">​</a></h2><h3 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的类可以一起工作。</p><h3 id="结构" tabindex="-1">结构 <a class="header-anchor" href="#结构" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>目标接口(Target)</strong>: 客户所期望的接口</li><li><strong>适配器(Adapter)</strong>: 将源接口转换成目标接口</li><li><strong>被适配者(Adaptee)</strong>: 需要被适配的类</li></ul><h3 id="实现方式" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 目标接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> MediaPlayer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> play</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">audioType</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">fileName</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 被适配者</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AdvancedMediaPlayer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> playVlc</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">fileName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Playing vlc file: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> fileName);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> playMp4</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">fileName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Playing mp4 file: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> fileName);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 适配器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MediaAdapter</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> MediaPlayer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> AdvancedMediaPlayer advancedMusicPlayer;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> MediaAdapter</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">audioType</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh">(audioType.</span><span class="__shiki_1t8gfj">equalsIgnoreCase</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;vlc&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">            advancedMusicPlayer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AdvancedMediaPlayer</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> play</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">audioType</span><span class="__shiki_140thh">, String </span><span class="__shiki_1jdh33">fileName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh">(audioType.</span><span class="__shiki_1t8gfj">equalsIgnoreCase</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;vlc&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">            advancedMusicPlayer.</span><span class="__shiki_1t8gfj">playVlc</span><span class="__shiki_140thh">(fileName);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>系统需要使用现有的类，但这些类的接口不符合系统的需要</li><li>想要建立一个可以重复使用的类，用于与一些彼此之间没有太大关联的类一起工作</li></ul><h2 id="_2-桥接模式-bridge-pattern" tabindex="-1">2. 桥接模式 (Bridge Pattern) <a class="header-anchor" href="#_2-桥接模式-bridge-pattern" aria-label="Permalink to &quot;2. 桥接模式 (Bridge Pattern)&quot;">​</a></h2><h3 id="定义-1" tabindex="-1">定义 <a class="header-anchor" href="#定义-1" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>将抽象部分与它的实现部分分离，使它们都可以独立地变化。</p><h3 id="结构-1" tabindex="-1">结构 <a class="header-anchor" href="#结构-1" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>抽象化(Abstraction)</strong>: 定义抽象类的接口</li><li><strong>扩展抽象化(RefinedAbstraction)</strong>: 扩充抽象类定义的接口</li><li><strong>实现化接口(Implementor)</strong>: 定义实现类的接口</li><li><strong>具体实现化(ConcreteImplementor)</strong>: 具体实现Implementor接口</li></ul><h3 id="实现方式-1" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-1" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 实现化接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> DrawingAPI</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> drawCircle</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> x</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> y</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> radius</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体实现化A</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DrawingAPI1</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> DrawingAPI</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> drawCircle</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> x</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> y</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> radius</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;API1.circle at %f:%f radius %f</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, x, y, radius);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 抽象化</span></span>
<span class="line"><span class="__shiki_1itgoe">abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Shape</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_140thh"> DrawingAPI drawingAPI;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_1t8gfj"> Shape</span><span class="__shiki_140thh">(DrawingAPI </span><span class="__shiki_1jdh33">drawingAPI</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.drawingAPI </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> drawingAPI;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> abstract</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> draw</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 扩展抽象化</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Circle</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Shape</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh"> x, y, radius;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> Circle</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> x</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> y</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">double</span><span class="__shiki_1jdh33"> radius</span><span class="__shiki_140thh">, DrawingAPI </span><span class="__shiki_1jdh33">drawingAPI</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">(drawingAPI);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.x </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> x; </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.y </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> y; </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.radius </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> radius;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> draw</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        drawingAPI.</span><span class="__shiki_1t8gfj">drawCircle</span><span class="__shiki_140thh">(x, y, radius);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-1" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-1" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>不希望在抽象和实现部分之间有固定的绑定关系</li><li>抽象部分和实现部分都应该可以通过子类来扩展</li><li>对抽象部分实现的修改应对客户不产生影响</li></ul><h2 id="_3-组合模式-composite-pattern" tabindex="-1">3. 组合模式 (Composite Pattern) <a class="header-anchor" href="#_3-组合模式-composite-pattern" aria-label="Permalink to &quot;3. 组合模式 (Composite Pattern)&quot;">​</a></h2><h3 id="定义-2" tabindex="-1">定义 <a class="header-anchor" href="#定义-2" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>将对象组合成树形结构以表示&quot;部分-整体&quot;的层次结构，使得用户对单个对象和组合对象的使用具有一致性。</p><h3 id="结构-2" tabindex="-1">结构 <a class="header-anchor" href="#结构-2" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>组件(Component)</strong>: 为组合中的对象声明接口</li><li><strong>叶子(Leaf)</strong>: 表示组合中的叶子节点对象</li><li><strong>复合组件(Composite)</strong>: 定义有子部件的部件行为</li></ul><h3 id="实现方式-2" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-2" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 组件</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> FileSystemComponent</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> showDetails</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(FileSystemComponent </span><span class="__shiki_1jdh33">component</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> remove</span><span class="__shiki_140thh">(FileSystemComponent </span><span class="__shiki_1jdh33">component</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 叶子</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> File</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> FileSystemComponent</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> File</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> name;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> showDetails</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;File: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> name);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(FileSystemComponent </span><span class="__shiki_1jdh33">component</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UnsupportedOperationException</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> remove</span><span class="__shiki_140thh">(FileSystemComponent </span><span class="__shiki_1jdh33">component</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> UnsupportedOperationException</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 复合组件</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Directory</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> FileSystemComponent</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">FileSystemComponent</span><span class="__shiki_140thh">&gt; components </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> Directory</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> name;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> showDetails</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Directory: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> name);</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (FileSystemComponent component </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> components) {</span></span>
<span class="line"><span class="__shiki_140thh">            component.</span><span class="__shiki_1t8gfj">showDetails</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(FileSystemComponent </span><span class="__shiki_1jdh33">component</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        components.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(component);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> remove</span><span class="__shiki_140thh">(FileSystemComponent </span><span class="__shiki_1jdh33">component</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        components.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">(component);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-2" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-2" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>表示对象的部分-整体层次结构</li><li>希望用户忽略组合对象与单个对象的不同，统一地使用组合结构中的所有对象</li></ul><h2 id="_4-装饰器模式-decorator-pattern" tabindex="-1">4. 装饰器模式 (Decorator Pattern) <a class="header-anchor" href="#_4-装饰器模式-decorator-pattern" aria-label="Permalink to &quot;4. 装饰器模式 (Decorator Pattern)&quot;">​</a></h2><h3 id="定义-3" tabindex="-1">定义 <a class="header-anchor" href="#定义-3" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>动态地给一个对象添加一些额外的职责，就增加功能来说，装饰器模式相比生成子类更为灵活。</p><h3 id="结构-3" tabindex="-1">结构 <a class="header-anchor" href="#结构-3" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>组件(Component)</strong>: 定义一个对象接口，可以给这些对象动态地添加职责</li><li><strong>具体组件(ConcreteComponent)</strong>: 定义了一个具体的对象</li><li><strong>装饰器(Decorator)</strong>: 维持一个指向Component对象的引用，并定义一个与Component接口一致的接口</li><li><strong>具体装饰器(ConcreteDecorator)</strong>: 向组件添加职责</li></ul><h3 id="实现方式-3" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-3" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 组件</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Coffee</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    double</span><span class="__shiki_1t8gfj"> getCost</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    String </span><span class="__shiki_1t8gfj">getDescription</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体组件</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SimpleCoffee</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Coffee</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> getCost</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 1.0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">getDescription</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &quot;Simple coffee&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 装饰器</span></span>
<span class="line"><span class="__shiki_1itgoe">abstract</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> CoffeeDecorator</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Coffee</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    protected</span><span class="__shiki_140thh"> Coffee decoratedCoffee;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> CoffeeDecorator</span><span class="__shiki_140thh">(Coffee </span><span class="__shiki_1jdh33">coffee</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.decoratedCoffee </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> coffee;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> getCost</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> decoratedCoffee.</span><span class="__shiki_1t8gfj">getCost</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">getDescription</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> decoratedCoffee.</span><span class="__shiki_1t8gfj">getDescription</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体装饰器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MilkDecorator</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> CoffeeDecorator</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> MilkDecorator</span><span class="__shiki_140thh">(Coffee </span><span class="__shiki_1jdh33">coffee</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        super</span><span class="__shiki_140thh">(coffee);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> getCost</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> super</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getCost</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">getDescription</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> super</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getDescription</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;, with milk&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-3" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-3" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责</li><li>处理那些可以撤销的职责</li><li>当不能采用生成子类的方法进行扩充时</li></ul><h2 id="_5-外观模式-facade-pattern" tabindex="-1">5. 外观模式 (Facade Pattern) <a class="header-anchor" href="#_5-外观模式-facade-pattern" aria-label="Permalink to &quot;5. 外观模式 (Facade Pattern)&quot;">​</a></h2><h3 id="定义-4" tabindex="-1">定义 <a class="header-anchor" href="#定义-4" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。</p><h3 id="结构-4" tabindex="-1">结构 <a class="header-anchor" href="#结构-4" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>外观(Facade)</strong>: 知道哪些子系统类负责处理请求，将客户的请求代理给适当的子系统对象</li><li><strong>子系统类(Subsystem classes)</strong>: 实现子系统的功能，处理由Facade对象指派的任务</li></ul><h3 id="实现方式-4" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-4" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 子系统类</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CPU</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;CPU starting...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Memory</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> load</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Memory loading...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> HardDrive</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> read</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;HardDrive reading...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 外观</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ComputerFacade</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> CPU cpu;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> Memory memory;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> HardDrive hardDrive;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ComputerFacade</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.cpu </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CPU</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.memory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Memory</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.hardDrive </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> HardDrive</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Computer starting...&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        cpu.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        memory.</span><span class="__shiki_1t8gfj">load</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        hardDrive.</span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Computer started successfully&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-4" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-4" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>要为一个复杂子系统提供一个简单接口时</li><li>客户程序与抽象类的实现部分之间存在着很大的依赖性</li><li>需要构建一个层次结构的子系统时</li></ul><h2 id="_6-享元模式-flyweight-pattern" tabindex="-1">6. 享元模式 (Flyweight Pattern) <a class="header-anchor" href="#_6-享元模式-flyweight-pattern" aria-label="Permalink to &quot;6. 享元模式 (Flyweight Pattern)&quot;">​</a></h2><h3 id="定义-5" tabindex="-1">定义 <a class="header-anchor" href="#定义-5" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>运用共享技术有效地支持大量细粒度的对象。</p><h3 id="结构-5" tabindex="-1">结构 <a class="header-anchor" href="#结构-5" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>享元工厂(Flyweight Factory)</strong>: 创建并管理享元对象</li><li><strong>享元(Flyweight)</strong>: 所有具体享元类的超类或接口</li><li><strong>具体享元(ConcreteFlyweight)</strong>: 实现享元接口，并为内部状态增加存储空间</li><li><strong>非共享具体享元(UnsharedConcreteFlyweight)</strong>: 不需要共享的享元子类</li></ul><h3 id="实现方式-5" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-5" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 享元接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Shape</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> draw</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体享元</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Circle</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Shape</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String color;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> x, y, radius;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> Circle</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">color</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.color </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> color;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setX</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> x</span><span class="__shiki_140thh">) { </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.x </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> x; }</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setY</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> y</span><span class="__shiki_140thh">) { </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.y </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> y; }</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setRadius</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> radius</span><span class="__shiki_140thh">) { </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.radius </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> radius; }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> draw</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Drawing Circle [Color: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> color </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">                          &quot;, x: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;, y: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> y </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;, radius: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> radius </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot;]&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 享元工厂</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ShapeFactory</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> HashMap&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Shape</span><span class="__shiki_140thh">&gt; circleMap </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Shape </span><span class="__shiki_1t8gfj">getCircle</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">color</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Circle circle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Circle) circleMap.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(color);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (circle </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            circle </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Circle</span><span class="__shiki_140thh">(color);</span></span>
<span class="line"><span class="__shiki_140thh">            circleMap.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(color, circle);</span></span>
<span class="line"><span class="__shiki_140thh">            System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Creating circle of color: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> color);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> circle;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-5" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-5" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>一个应用程序使用了大量的对象</li><li>由于使用大量的对象，造成很大的存储开销</li><li>对象的大多数状态都可以变为外部状态</li><li>如果删除对象的外部状态，那么可以用相对较少的共享对象取代很多组对象</li></ul><h2 id="_7-代理模式-proxy-pattern" tabindex="-1">7. 代理模式 (Proxy Pattern) <a class="header-anchor" href="#_7-代理模式-proxy-pattern" aria-label="Permalink to &quot;7. 代理模式 (Proxy Pattern)&quot;">​</a></h2><h3 id="定义-6" tabindex="-1">定义 <a class="header-anchor" href="#定义-6" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>为其他对象提供一种代理以控制对这个对象的访问。</p><h3 id="结构-6" tabindex="-1">结构 <a class="header-anchor" href="#结构-6" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>抽象主题(Subject)</strong>: 定义了RealSubject和Proxy的共同接口</li><li><strong>真实主题(RealSubject)</strong>: 定义了代理所代表的真实对象</li><li><strong>代理(Proxy)</strong>: 保存一个引用使得代理可以访问实体，并提供一个与Subject的接口相同的接口</li></ul><h3 id="实现方式-6" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-6" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 抽象主题</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> Image</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> display</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 真实主题</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RealImage</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Image</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String fileName;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> RealImage</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">fileName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.fileName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> fileName;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        loadFromDisk</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> loadFromDisk</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Loading &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> fileName);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> display</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Displaying &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> fileName);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 代理</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ProxyImage</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Image</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> RealImage realImage;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String fileName;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ProxyImage</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">fileName</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.fileName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> fileName;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> display</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (realImage </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            realImage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> RealImage</span><span class="__shiki_140thh">(fileName);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        realImage.</span><span class="__shiki_1t8gfj">display</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="代理模式类型" tabindex="-1">代理模式类型 <a class="header-anchor" href="#代理模式类型" aria-label="Permalink to &quot;代理模式类型&quot;">​</a></h3><ul><li><strong>远程代理</strong>: 为一个对象在不同的地址空间提供局部代表</li><li><strong>虚拟代理</strong>: 根据需要创建开销很大的对象</li><li><strong>保护代理</strong>: 控制对原始对象的访问</li><li><strong>智能引用</strong>: 在访问对象时执行一些附加操作</li></ul><h3 id="适用场景-6" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-6" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>远程代理：为一个对象在不同的地址空间提供局部代表</li><li>虚拟代理：根据需要创建开销很大的对象</li><li>保护代理：控制对原始对象的访问权限</li><li>智能指引：取代简单的指针，在访问对象时执行一些附加操作</li></ul><h2 id="总结对比" tabindex="-1">总结对比 <a class="header-anchor" href="#总结对比" aria-label="Permalink to &quot;总结对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>模式</th><th>主要目的</th><th>关键特点</th><th>适用场景</th></tr></thead><tbody><tr><td>适配器</td><td>接口转换</td><td>兼容不同接口</td><td>系统集成、复用现有类</td></tr><tr><td>桥接</td><td>抽象与实现分离</td><td>两个维度独立变化</td><td>多维度扩展、避免类爆炸</td></tr><tr><td>组合</td><td>部分-整体层次</td><td>统一处理单个和组合对象</td><td>树形结构、文件系统</td></tr><tr><td>装饰器</td><td>动态添加功能</td><td>透明扩展、比继承灵活</td><td>功能扩展、动态职责添加</td></tr><tr><td>外观</td><td>简化子系统接口</td><td>提供统一入口</td><td>复杂子系统封装、降低耦合</td></tr><tr><td>享元</td><td>对象共享</td><td>内部状态与外部状态分离</td><td>大量细粒度对象、性能优化</td></tr><tr><td>代理</td><td>控制访问</td><td>间接访问、附加功能</td><td>远程访问、延迟加载、权限控制</td></tr></tbody></table><h2 id="设计原则体现" tabindex="-1">设计原则体现 <a class="header-anchor" href="#设计原则体现" aria-label="Permalink to &quot;设计原则体现&quot;">​</a></h2><ol><li><strong>开闭原则</strong>: 装饰器模式、桥接模式</li><li><strong>单一职责原则</strong>: 所有结构型模式都帮助分解复杂功能</li><li><strong>接口隔离原则</strong>: 适配器模式、外观模式</li><li><strong>依赖倒置原则</strong>: 桥接模式、代理模式</li><li><strong>迪米特法则</strong>: 外观模式、代理模式</li><li><strong>合成复用原则</strong>: 组合模式、装饰器模式</li></ol><p>结构型模式通过不同的方式组合类和对象，形成更大的结构，同时保持系统的灵活性和可扩展性。</p>`,73)])])}const g=a(_,[["render",l]]);export{r as __pageData,g as default};
