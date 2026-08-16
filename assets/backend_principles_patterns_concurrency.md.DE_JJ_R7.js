import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"并发设计模式学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/principles/patterns/concurrency.md","filePath":"backend/principles/patterns/concurrency.md"}'),p={name:"backend/principles/patterns/concurrency.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="并发设计模式学习笔记" tabindex="-1">并发设计模式学习笔记 <a class="header-anchor" href="#并发设计模式学习笔记" aria-label="Permalink to &quot;并发设计模式学习笔记&quot;">​</a></h1><h2 id="概述" tabindex="-1">概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;概述&quot;">​</a></h2><p>并发设计模式为解决多线程编程中的常见问题提供了可重用的解决方案，帮助开发者编写正确、高效且可维护的并发程序。</p><h2 id="_1-主动对象模式-active-object-pattern" tabindex="-1">1. 主动对象模式 (Active Object Pattern) <a class="header-anchor" href="#_1-主动对象模式-active-object-pattern" aria-label="Permalink to &quot;1. 主动对象模式 (Active Object Pattern)&quot;">​</a></h2><h3 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>将方法调用与方法执行解耦，每个对象都有自己的控制线程和消息队列，实现异步方法调用。</p><h3 id="结构" tabindex="-1">结构 <a class="header-anchor" href="#结构" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Proxy</strong>: 提供公开接口，将方法调用转换为消息</li><li><strong>Method Request</strong>: 封装方法调用和参数</li><li><strong>Scheduler</strong>: 管理请求队列，调度方法执行</li><li><strong>Servant</strong>: 实际执行业务逻辑的对象</li><li><strong>Future</strong>: 返回异步调用的结果</li></ul><h3 id="实现方式" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 方法请求</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> MethodRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    boolean</span><span class="__shiki_1t8gfj"> canExecute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 主动对象接口</span></span>
<span class="line"><span class="__shiki_1itgoe">interface</span><span class="__shiki_1t8gfj"> ActiveObject</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Future&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">process</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1t8gfj"> shutdown</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 具体实现</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ActiveObjectImpl</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> ActiveObject</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> ExecutorService executor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Executors.</span><span class="__shiki_1t8gfj">newSingleThreadExecutor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> BlockingQueue&lt;</span><span class="__shiki_1itgoe">MethodRequest</span><span class="__shiki_140thh">&gt; queue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> LinkedBlockingQueue&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_140thh"> running </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ActiveObjectImpl</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 启动调度器线程</span></span>
<span class="line"><span class="__shiki_1itgoe">        new</span><span class="__shiki_1t8gfj"> Thread</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">runScheduler).</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> runScheduler</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> (running </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">queue.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                MethodRequest request </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queue.</span><span class="__shiki_1t8gfj">take</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (request.</span><span class="__shiki_1t8gfj">canExecute</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">                    request.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    queue.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(request); </span><span class="__shiki_21nrsd">// 重新入队</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> Future&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1t8gfj">process</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        FutureResult&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; future </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> FutureResult&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        queue.</span><span class="__shiki_1t8gfj">offer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> ProcessRequest</span><span class="__shiki_140thh">(data, future));</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> future;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> shutdown</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        running </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        executor.</span><span class="__shiki_1t8gfj">shutdown</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 具体方法请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> ProcessRequest</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> MethodRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String data;</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> FutureResult&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; future;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        ProcessRequest</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">, FutureResult&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1jdh33">future</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> data;</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.future </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> future;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 模拟处理</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                String result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Processed: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> data;</span></span>
<span class="line"><span class="__shiki_140thh">                future.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> canExecute</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>需要异步方法调用</li><li>方法调用需要排队和调度</li><li>避免线程阻塞，提高响应性</li></ul><h2 id="_2-监控器模式-monitor-object-pattern" tabindex="-1">2. 监控器模式 (Monitor Object Pattern) <a class="header-anchor" href="#_2-监控器模式-monitor-object-pattern" aria-label="Permalink to &quot;2. 监控器模式 (Monitor Object Pattern)&quot;">​</a></h2><h3 id="定义-1" tabindex="-1">定义 <a class="header-anchor" href="#定义-1" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>通过封装同步原语，确保同一时刻只有一个线程可以执行对象的某个方法。</p><h3 id="结构-1" tabindex="-1">结构 <a class="header-anchor" href="#结构-1" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Monitor Object</strong>: 包含同步方法</li><li><strong>Synchronized Methods</strong>: 需要同步执行的方法</li><li><strong>Condition Variables</strong>: 用于线程等待和通知</li></ul><h3 id="实现方式-1" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-1" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BoundedBuffer</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">&gt; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> T</span><span class="__shiki_140thh">[] buffer;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> putIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> takeIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Object lock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Object</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Condition notFull </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lock.</span><span class="__shiki_1t8gfj">newCondition</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Condition notEmpty </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lock.</span><span class="__shiki_1t8gfj">newCondition</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">SuppressWarnings</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;unchecked&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> BoundedBuffer</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> capacity</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">T</span><span class="__shiki_140thh">[]) </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Object</span><span class="__shiki_140thh">[capacity];</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> put</span><span class="__shiki_140thh">(T </span><span class="__shiki_1jdh33">item</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> InterruptedException {</span></span>
<span class="line"><span class="__shiki_1itgoe">        synchronized</span><span class="__shiki_140thh"> (lock) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_140thh"> (count </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> buffer.length) {</span></span>
<span class="line"><span class="__shiki_140thh">                notFull.</span><span class="__shiki_1t8gfj">await</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 等待缓冲区不满</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            buffer[putIndex] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> item;</span></span>
<span class="line"><span class="__shiki_140thh">            putIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (putIndex </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> buffer.length;</span></span>
<span class="line"><span class="__shiki_140thh">            count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            notEmpty.</span><span class="__shiki_1t8gfj">signal</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 通知消费者</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> T </span><span class="__shiki_1t8gfj">take</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> InterruptedException {</span></span>
<span class="line"><span class="__shiki_1itgoe">        synchronized</span><span class="__shiki_140thh"> (lock) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_140thh"> (count </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                notEmpty.</span><span class="__shiki_1t8gfj">await</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 等待缓冲区不空</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            T item </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> buffer[takeIndex];</span></span>
<span class="line"><span class="__shiki_140thh">            buffer[takeIndex] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            takeIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (takeIndex </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh"> buffer.length;</span></span>
<span class="line"><span class="__shiki_140thh">            count</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            notFull.</span><span class="__shiki_1t8gfj">signal</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 通知生产者</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> item;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-1" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-1" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>需要保护共享数据的完整性</li><li>复杂的线程同步需求</li><li>生产者-消费者问题</li></ul><h2 id="_3-线程池模式-thread-pool-pattern" tabindex="-1">3. 线程池模式 (Thread Pool Pattern) <a class="header-anchor" href="#_3-线程池模式-thread-pool-pattern" aria-label="Permalink to &quot;3. 线程池模式 (Thread Pool Pattern)&quot;">​</a></h2><h3 id="定义-2" tabindex="-1">定义 <a class="header-anchor" href="#定义-2" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>创建一组可重用的线程来执行任务，避免频繁创建和销毁线程的开销。</p><h3 id="结构-2" tabindex="-1">结构 <a class="header-anchor" href="#结构-2" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Thread Pool</strong>: 管理线程集合</li><li><strong>Worker Threads</strong>: 执行任务的线程</li><li><strong>Task Queue</strong>: 待执行的任务队列</li><li><strong>Task Interface</strong>: 任务接口</li></ul><h3 id="实现方式-2" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-2" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SimpleThreadPool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> BlockingQueue&lt;</span><span class="__shiki_1itgoe">Runnable</span><span class="__shiki_140thh">&gt; taskQueue;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">WorkerThread</span><span class="__shiki_140thh">&gt; workers;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_140thh"> isShutdown </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> SimpleThreadPool</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> poolSize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.taskQueue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> LinkedBlockingQueue&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建工作线程</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> poolSize; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            WorkerThread worker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> WorkerThread</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Worker-&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> i);</span></span>
<span class="line"><span class="__shiki_140thh">            workers.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(worker);</span></span>
<span class="line"><span class="__shiki_140thh">            worker.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">(Runnable </span><span class="__shiki_1jdh33">task</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">isShutdown) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                taskQueue.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(task);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> shutdown</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        isShutdown </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 中断所有工作线程</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (WorkerThread worker </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> workers) {</span></span>
<span class="line"><span class="__shiki_140thh">            worker.</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> WorkerThread</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Thread</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1t8gfj"> WorkerThread</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            super</span><span class="__shiki_140thh">(name);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">isShutdown </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">taskQueue.</span><span class="__shiki_1t8gfj">isEmpty</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    Runnable task </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> taskQueue.</span><span class="__shiki_1t8gfj">take</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                    task.</span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 线程被中断，退出</span></span>
<span class="line"><span class="__shiki_1itgoe">                    break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ComputeTask</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Runnable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> number;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ComputeTask</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> number</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> number;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">                          &quot; computing factorial of &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> number);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 模拟计算</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> factorial</span><span class="__shiki_140thh">(number);</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Factorial of &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> number </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; = &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> result);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_1t8gfj"> factorial</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> n</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (n </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_140thh"> n; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            result </span><span class="__shiki_1itgoe">*=</span><span class="__shiki_140thh"> i;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-2" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-2" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>大量短期异步任务</li><li>需要限制并发线程数量</li><li>减少线程创建销毁开销</li></ul><h2 id="_4-生产者-消费者模式-producer-consumer-pattern" tabindex="-1">4. 生产者-消费者模式 (Producer-Consumer Pattern) <a class="header-anchor" href="#_4-生产者-消费者模式-producer-consumer-pattern" aria-label="Permalink to &quot;4. 生产者-消费者模式 (Producer-Consumer Pattern)&quot;">​</a></h2><h3 id="定义-3" tabindex="-1">定义 <a class="header-anchor" href="#定义-3" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>通过共享的缓冲区协调生产者和消费者之间的工作，解耦数据生产和消费。</p><h3 id="结构-3" tabindex="-1">结构 <a class="header-anchor" href="#结构-3" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Producer</strong>: 生产数据并放入缓冲区</li><li><strong>Consumer</strong>: 从缓冲区取出并消费数据</li><li><strong>Buffer</strong>: 共享的线程安全缓冲区</li></ul><h3 id="实现方式-3" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-3" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ProducerConsumerExample</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> BlockingQueue&lt;</span><span class="__shiki_1itgoe">Integer</span><span class="__shiki_140thh">&gt; queue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> LinkedBlockingQueue&lt;&gt;(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Producer</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Runnable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1t8gfj"> Producer</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> name;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                int</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    queue.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(value);</span></span>
<span class="line"><span class="__shiki_140thh">                    System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(name </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; produced: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> value);</span></span>
<span class="line"><span class="__shiki_140thh">                    value</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                    Thread.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 模拟生产时间</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Consumer</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Runnable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> String name;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1t8gfj"> Consumer</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> name;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    Integer value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queue.</span><span class="__shiki_1t8gfj">take</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                    System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(name </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; consumed: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> value);</span></span>
<span class="line"><span class="__shiki_140thh">                    Thread.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">150</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 模拟消费时间</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> start</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建生产者</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_1t8gfj"> Thread</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Producer</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Producer-&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> i)).</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建消费者</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            new</span><span class="__shiki_1t8gfj"> Thread</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Consumer</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Consumer-&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> i)).</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-3" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-3" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>数据生产和消费速率不匹配</li><li>需要缓冲数据</li><li>解耦生产者和消费者</li></ul><h2 id="_5-读写锁模式-read-write-lock-pattern" tabindex="-1">5. 读写锁模式 (Read-Write Lock Pattern) <a class="header-anchor" href="#_5-读写锁模式-read-write-lock-pattern" aria-label="Permalink to &quot;5. 读写锁模式 (Read-Write Lock Pattern)&quot;">​</a></h2><h3 id="定义-4" tabindex="-1">定义 <a class="header-anchor" href="#定义-4" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>允许多个读操作并发执行，但写操作需要独占访问。</p><h3 id="结构-4" tabindex="-1">结构 <a class="header-anchor" href="#结构-4" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Read Lock</strong>: 共享锁，允许多个线程同时读取</li><li><strong>Write Lock</strong>: 排他锁，只允许一个线程写入</li><li><strong>ReadWriteLock</strong>: 管理读写锁的接口</li></ul><h3 id="实现方式-4" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-4" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SimpleReadWriteLock</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> readers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> writers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> writeRequests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> lockRead</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> InterruptedException {</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> (writers </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> writeRequests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            wait</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 等待没有写入者或写入请求</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        readers</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> unlockRead</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        readers</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        notifyAll</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 通知等待的线程</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> lockWrite</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> InterruptedException {</span></span>
<span class="line"><span class="__shiki_140thh">        writeRequests</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> (readers </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> writers </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            wait</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 等待没有读者和写入者</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        writeRequests</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        writers</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> unlockWrite</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        writers</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        notifyAll</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 通知等待的线程</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SharedResource</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> SimpleReadWriteLock lock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SimpleReadWriteLock</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_140thh"> String data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Initial Data&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> InterruptedException {</span></span>
<span class="line"><span class="__shiki_140thh">        lock.</span><span class="__shiki_1t8gfj">lockRead</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 模拟读取操作</span></span>
<span class="line"><span class="__shiki_140thh">            Thread.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> data;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            lock.</span><span class="__shiki_1t8gfj">unlockRead</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> write</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">newData</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> InterruptedException {</span></span>
<span class="line"><span class="__shiki_140thh">        lock.</span><span class="__shiki_1t8gfj">lockWrite</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 模拟写入操作</span></span>
<span class="line"><span class="__shiki_140thh">            Thread.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> newData;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            lock.</span><span class="__shiki_1t8gfj">unlockWrite</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-4" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-4" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>读多写少的场景</li><li>需要保证数据一致性</li><li>允许读取操作的并发执行</li></ul><h2 id="_6-工作窃取模式-work-stealing-pattern" tabindex="-1">6. 工作窃取模式 (Work Stealing Pattern) <a class="header-anchor" href="#_6-工作窃取模式-work-stealing-pattern" aria-label="Permalink to &quot;6. 工作窃取模式 (Work Stealing Pattern)&quot;">​</a></h2><h3 id="定义-5" tabindex="-1">定义 <a class="header-anchor" href="#定义-5" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>每个工作线程维护自己的任务队列，当自己的队列为空时，可以从其他线程的队列中&quot;窃取&quot;任务执行。</p><h3 id="结构-5" tabindex="-1">结构 <a class="header-anchor" href="#结构-5" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Worker Threads</strong>: 工作线程，有自己的任务队列</li><li><strong>Work Queue</strong>: 每个线程的任务队列</li><li><strong>Work Stealing Algorithm</strong>: 窃取任务的策略</li></ul><h3 id="实现方式-5" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-5" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> WorkStealingThreadPool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> List&lt;BlockingQueue&lt;</span><span class="__shiki_1itgoe">Runnable</span><span class="__shiki_140thh">&gt;&gt; queues;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">WorkerThread</span><span class="__shiki_140thh">&gt; workers;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> poolSize;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> WorkStealingThreadPool</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> poolSize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.poolSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> poolSize;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.queues </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.workers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 为每个线程创建任务队列</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> poolSize; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            queues.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_140thh"> LinkedBlockingQueue&lt;&gt;());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 创建工作线程</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> poolSize; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            WorkerThread worker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> WorkerThread</span><span class="__shiki_140thh">(i);</span></span>
<span class="line"><span class="__shiki_140thh">            workers.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(worker);</span></span>
<span class="line"><span class="__shiki_140thh">            worker.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> execute</span><span class="__shiki_140thh">(Runnable </span><span class="__shiki_1jdh33">task</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 随机选择一个队列提交任务</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ThreadLocalRandom.</span><span class="__shiki_1t8gfj">current</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">nextInt</span><span class="__shiki_140thh">(poolSize);</span></span>
<span class="line"><span class="__shiki_140thh">        queues.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(index).</span><span class="__shiki_1t8gfj">offer</span><span class="__shiki_140thh">(task);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> shutdown</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (WorkerThread worker </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> workers) {</span></span>
<span class="line"><span class="__shiki_140thh">            worker.</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> WorkerThread</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> Thread</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> threadIndex;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1t8gfj"> WorkerThread</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> index</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">            super</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Worker-&quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> index);</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.threadIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> index;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">            BlockingQueue&lt;</span><span class="__shiki_1itgoe">Runnable</span><span class="__shiki_140thh">&gt; myQueue </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queues.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(threadIndex);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isInterrupted</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">                Runnable task </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> myQueue.</span><span class="__shiki_1t8gfj">poll</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 非阻塞获取</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (task </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 执行自己的任务</span></span>
<span class="line"><span class="__shiki_140thh">                    task.</span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 尝试窃取其他线程的任务</span></span>
<span class="line"><span class="__shiki_140thh">                    task </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stealTask</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (task </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                        task.</span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 没有任务，短暂休眠</span></span>
<span class="line"><span class="__shiki_1itgoe">                        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                            Thread.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                            Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        private</span><span class="__shiki_140thh"> Runnable </span><span class="__shiki_1t8gfj">stealTask</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 随机选择其他线程尝试窃取</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> poolSize; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> threadIndex) {</span></span>
<span class="line"><span class="__shiki_140thh">                    Runnable task </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> queues.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(i).</span><span class="__shiki_1t8gfj">poll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (task </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        return</span><span class="__shiki_140thh"> task;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-5" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-5" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>任务执行时间不确定</li><li>任务之间相互独立</li><li>需要良好的负载均衡</li></ul><h2 id="_7-领导者-追随者模式-leader-followers-pattern" tabindex="-1">7. 领导者/追随者模式 (Leader/Followers Pattern) <a class="header-anchor" href="#_7-领导者-追随者模式-leader-followers-pattern" aria-label="Permalink to &quot;7. 领导者/追随者模式 (Leader/Followers Pattern)&quot;">​</a></h2><h3 id="定义-6" tabindex="-1">定义 <a class="header-anchor" href="#定义-6" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>多个线程轮流担任领导者角色处理事件，其他线程作为追随者等待成为领导者。</p><h3 id="结构-6" tabindex="-1">结构 <a class="header-anchor" href="#结构-6" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Leader</strong>: 当前处理事件的线程</li><li><strong>Followers</strong>: 等待成为领导者的线程</li><li><strong>Thread Pool</strong>: 管理领导者和追随者</li><li><strong>Event Source</strong>: 事件源</li></ul><h3 id="实现方式-6" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-6" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> LeaderFollowersPattern</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> ExecutorService executor;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> poolSize;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_140thh"> Thread leader;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Object lock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Object</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> LeaderFollowersPattern</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> poolSize</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.poolSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> poolSize;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.executor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Executors.</span><span class="__shiki_1t8gfj">newFixedThreadPool</span><span class="__shiki_140thh">(poolSize);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 启动所有工作线程</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> poolSize; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            executor.</span><span class="__shiki_1t8gfj">execute</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Worker</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleEvent</span><span class="__shiki_140thh">(Runnable </span><span class="__shiki_1jdh33">eventHandler</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        synchronized</span><span class="__shiki_140thh"> (lock) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 如果有领导者，直接处理事件</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (leader </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                leader </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                lock.</span><span class="__shiki_1t8gfj">notify</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 通知一个追随者成为新领导者</span></span>
<span class="line"><span class="__shiki_140thh">                eventHandler.</span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> shutdown</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        executor.</span><span class="__shiki_1t8gfj">shutdown</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Worker</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Runnable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">isInterrupted</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                synchronized</span><span class="__shiki_140thh"> (lock) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 如果没有领导者，成为领导者</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (leader </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                        leader </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                            lock.</span><span class="__shiki_1t8gfj">wait</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 等待事件</span></span>
<span class="line"><span class="__shiki_140thh">                        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                            Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-6" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-6" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>事件驱动的架构</li><li>需要避免线程上下文切换</li><li>高并发事件处理</li></ul><h2 id="_8-反应堆模式-reactor-pattern" tabindex="-1">8. 反应堆模式 (Reactor Pattern) <a class="header-anchor" href="#_8-反应堆模式-reactor-pattern" aria-label="Permalink to &quot;8. 反应堆模式 (Reactor Pattern)&quot;">​</a></h2><h3 id="定义-7" tabindex="-1">定义 <a class="header-anchor" href="#定义-7" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>处理并发服务请求的事件处理模式，将请求分发到相应的处理程序。</p><h3 id="结构-7" tabindex="-1">结构 <a class="header-anchor" href="#结构-7" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Reactor</strong>: 事件循环，监听和分发事件</li><li><strong>Demultiplexer</strong>: 事件多路分离器</li><li><strong>Event Handler</strong>: 事件处理器接口</li><li><strong>Concrete Event Handler</strong>: 具体事件处理器</li></ul><h3 id="实现方式-7" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-7" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Reactor</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Runnable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Selector selector;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> ServerSocketChannel serverSocket;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> Reactor</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> port</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> IOException {</span></span>
<span class="line"><span class="__shiki_140thh">        selector </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Selector.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        serverSocket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ServerSocketChannel.</span><span class="__shiki_1t8gfj">open</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        serverSocket.</span><span class="__shiki_1t8gfj">socket</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> InetSocketAddress</span><span class="__shiki_140thh">(port));</span></span>
<span class="line"><span class="__shiki_140thh">        serverSocket.</span><span class="__shiki_1t8gfj">configureBlocking</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 注册接受连接事件</span></span>
<span class="line"><span class="__shiki_140thh">        SelectionKey key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> serverSocket.</span><span class="__shiki_1t8gfj">register</span><span class="__shiki_140thh">(selector, SelectionKey.OP_ACCEPT);</span></span>
<span class="line"><span class="__shiki_140thh">        key.</span><span class="__shiki_1t8gfj">attach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Acceptor</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">Thread.</span><span class="__shiki_1t8gfj">interrupted</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">                selector.</span><span class="__shiki_1t8gfj">select</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                Set&lt;</span><span class="__shiki_1itgoe">SelectionKey</span><span class="__shiki_140thh">&gt; selected </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> selector.</span><span class="__shiki_1t8gfj">selectedKeys</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                Iterator&lt;</span><span class="__shiki_1itgoe">SelectionKey</span><span class="__shiki_140thh">&gt; it </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> selected.</span><span class="__shiki_1t8gfj">iterator</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                while</span><span class="__shiki_140thh"> (it.</span><span class="__shiki_1t8gfj">hasNext</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">                    SelectionKey key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> it.</span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    dispatch</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                selected.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (IOException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            e.</span><span class="__shiki_1t8gfj">printStackTrace</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> dispatch</span><span class="__shiki_140thh">(SelectionKey </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Runnable handler </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (Runnable) key.</span><span class="__shiki_1t8gfj">attachment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (handler </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            handler.</span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 接受连接处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">    class</span><span class="__shiki_1t8gfj"> Acceptor</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Runnable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">        public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                SocketChannel client </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> serverSocket.</span><span class="__shiki_1t8gfj">accept</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (client </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    new</span><span class="__shiki_1t8gfj"> Handler</span><span class="__shiki_140thh">(selector, client);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (IOException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                e.</span><span class="__shiki_1t8gfj">printStackTrace</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 事件处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> Handler</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Runnable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> SocketChannel socket;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> SelectionKey key;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> READING </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">, SENDING </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> READING;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> Handler</span><span class="__shiki_140thh">(Selector </span><span class="__shiki_1jdh33">selector</span><span class="__shiki_140thh">, SocketChannel </span><span class="__shiki_1jdh33">socket</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> IOException {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.socket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> socket;</span></span>
<span class="line"><span class="__shiki_140thh">        socket.</span><span class="__shiki_1t8gfj">configureBlocking</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> socket.</span><span class="__shiki_1t8gfj">register</span><span class="__shiki_140thh">(selector, SelectionKey.OP_READ);</span></span>
<span class="line"><span class="__shiki_140thh">        key.</span><span class="__shiki_1t8gfj">attach</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        selector.</span><span class="__shiki_1t8gfj">wakeup</span><span class="__shiki_140thh">();  </span><span class="__shiki_21nrsd">// 唤醒selector</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">Override</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (state </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> READING) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                read</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (state </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> SENDING) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                send</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (IOException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                socket.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (IOException </span><span class="__shiki_1jdh33">ex</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 忽略关闭异常</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> read</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> IOException {</span></span>
<span class="line"><span class="__shiki_140thh">        ByteBuffer buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ByteBuffer.</span><span class="__shiki_1t8gfj">allocate</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> bytesRead </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> socket.</span><span class="__shiki_1t8gfj">read</span><span class="__shiki_140thh">(buffer);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (bytesRead </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理读取的数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">            process</span><span class="__shiki_140thh">(buffer);</span></span>
<span class="line"><span class="__shiki_140thh">            state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> SENDING;</span></span>
<span class="line"><span class="__shiki_140thh">            key.</span><span class="__shiki_1t8gfj">interestOps</span><span class="__shiki_140thh">(SelectionKey.OP_WRITE);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> send</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> IOException {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送响应</span></span>
<span class="line"><span class="__shiki_140thh">        ByteBuffer response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ByteBuffer.</span><span class="__shiki_1t8gfj">wrap</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;HTTP/1.1 200 OK</span><span class="__shiki_dzsirb">\\r\\n\\r\\n</span><span class="__shiki_mdbnqw">Hello World&quot;</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getBytes</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        socket.</span><span class="__shiki_1t8gfj">write</span><span class="__shiki_140thh">(response);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (response.</span><span class="__shiki_1t8gfj">hasRemaining</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 如果还有数据要写，继续监听写事件</span></span>
<span class="line"><span class="__shiki_140thh">            key.</span><span class="__shiki_1t8gfj">interestOps</span><span class="__shiki_140thh">(SelectionKey.OP_WRITE);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 数据发送完成，关闭连接</span></span>
<span class="line"><span class="__shiki_140thh">            socket.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> process</span><span class="__shiki_140thh">(ByteBuffer </span><span class="__shiki_1jdh33">buffer</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理业务逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        buffer.</span><span class="__shiki_1t8gfj">flip</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        byte</span><span class="__shiki_140thh">[] data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> byte</span><span class="__shiki_140thh">[buffer.</span><span class="__shiki_1t8gfj">remaining</span><span class="__shiki_140thh">()];</span></span>
<span class="line"><span class="__shiki_140thh">        buffer.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> String</span><span class="__shiki_140thh">(data));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-7" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-7" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>高并发网络服务器</li><li>事件驱动的应用程序</li><li>需要处理大量并发连接</li></ul><h2 id="_9-线程特定存储模式-thread-specific-storage-pattern" tabindex="-1">9. 线程特定存储模式 (Thread-Specific Storage Pattern) <a class="header-anchor" href="#_9-线程特定存储模式-thread-specific-storage-pattern" aria-label="Permalink to &quot;9. 线程特定存储模式 (Thread-Specific Storage Pattern)&quot;">​</a></h2><h3 id="定义-8" tabindex="-1">定义 <a class="header-anchor" href="#定义-8" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>为每个线程提供独立的变量副本，避免共享数据的同步问题。</p><h3 id="结构-8" tabindex="-1">结构 <a class="header-anchor" href="#结构-8" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>ThreadLocal</strong>: 线程局部变量</li><li><strong>Thread-Specific Data</strong>: 线程特定的数据</li></ul><h3 id="实现方式-8" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-8" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> UserContext</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> ThreadLocal&lt;</span><span class="__shiki_1itgoe">User</span><span class="__shiki_140thh">&gt; currentUser </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ThreadLocal&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> ThreadLocal&lt;</span><span class="__shiki_1itgoe">Long</span><span class="__shiki_140thh">&gt; requestId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ThreadLocal&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> ThreadLocal&lt;</span><span class="__shiki_1itgoe">SimpleDateFormat</span><span class="__shiki_140thh">&gt; dateFormat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">        ThreadLocal.</span><span class="__shiki_1t8gfj">withInitial</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SimpleDateFormat</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;yyyy-MM-dd HH:mm:ss&quot;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setCurrentUser</span><span class="__shiki_140thh">(User </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        currentUser.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(user);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> User </span><span class="__shiki_1t8gfj">getCurrentUser</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> currentUser.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> setRequestId</span><span class="__shiki_140thh">(Long </span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        requestId.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(id);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> Long </span><span class="__shiki_1t8gfj">getRequestId</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> requestId.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">formatDate</span><span class="__shiki_140thh">(Date </span><span class="__shiki_1jdh33">date</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> dateFormat.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">format</span><span class="__shiki_140thh">(date);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> clear</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        currentUser.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        requestId.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        dateFormat.</span><span class="__shiki_1t8gfj">remove</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RequestProcessor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> processRequest</span><span class="__shiki_140thh">(HttpRequest </span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 设置线程上下文</span></span>
<span class="line"><span class="__shiki_140thh">            UserContext.</span><span class="__shiki_1t8gfj">setCurrentUser</span><span class="__shiki_140thh">(request.</span><span class="__shiki_1t8gfj">getUser</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            UserContext.</span><span class="__shiki_1t8gfj">setRequestId</span><span class="__shiki_140thh">(request.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 处理请求</span></span>
<span class="line"><span class="__shiki_1t8gfj">            handleRequest</span><span class="__shiki_140thh">(request);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 清理线程上下文，避免内存泄漏</span></span>
<span class="line"><span class="__shiki_140thh">            UserContext.</span><span class="__shiki_1t8gfj">clear</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> handleRequest</span><span class="__shiki_140thh">(HttpRequest </span><span class="__shiki_1jdh33">request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        User user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UserContext.</span><span class="__shiki_1t8gfj">getCurrentUser</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        Long requestId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UserContext.</span><span class="__shiki_1t8gfj">getRequestId</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        String timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> UserContext.</span><span class="__shiki_1t8gfj">formatDate</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Processing request &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> requestId </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">                          &quot; for user &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> user.</span><span class="__shiki_1t8gfj">getName</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_mdbnqw">                          &quot; at &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> timestamp);</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 处理逻辑...</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-8" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-8" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>需要为每个线程维护独立状态</li><li>避免在方法参数中传递上下文信息</li><li>Web应用中的用户会话管理</li></ul><h2 id="_10-屏障模式-barrier-pattern" tabindex="-1">10. 屏障模式 (Barrier Pattern) <a class="header-anchor" href="#_10-屏障模式-barrier-pattern" aria-label="Permalink to &quot;10. 屏障模式 (Barrier Pattern)&quot;">​</a></h2><h3 id="定义-9" tabindex="-1">定义 <a class="header-anchor" href="#定义-9" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>让一组线程互相等待，直到所有线程都到达某个执行点后再继续执行。</p><h3 id="结构-9" tabindex="-1">结构 <a class="header-anchor" href="#结构-9" aria-label="Permalink to &quot;结构&quot;">​</a></h3><ul><li><strong>Barrier</strong>: 屏障对象，跟踪到达的线程数</li><li><strong>Participating Threads</strong>: 参与屏障的线程</li><li><strong>Barrier Action</strong>: 所有线程到达后执行的动作</li></ul><h3 id="实现方式-9" tabindex="-1">实现方式 <a class="header-anchor" href="#实现方式-9" aria-label="Permalink to &quot;实现方式&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CyclicBarrier</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> parties;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> count;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Runnable barrierAction;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> volatile</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_140thh"> broken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> CyclicBarrier</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> parties</span><span class="__shiki_140thh">, Runnable </span><span class="__shiki_1jdh33">barrierAction</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.parties </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parties;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parties;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.barrierAction </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> barrierAction;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> CyclicBarrier</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> parties</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">(parties, </span><span class="__shiki_dzsirb">null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> await</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">throws</span><span class="__shiki_140thh"> InterruptedException, BrokenBarrierException {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (broken) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> BrokenBarrierException</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> --</span><span class="__shiki_140thh">count;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (index </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 最后一个线程到达</span></span>
<span class="line"><span class="__shiki_140thh">            count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parties;  </span><span class="__shiki_21nrsd">// 重置计数器</span></span>
<span class="line"><span class="__shiki_1t8gfj">            notifyAll</span><span class="__shiki_140thh">();      </span><span class="__shiki_21nrsd">// 唤醒所有等待线程</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (barrierAction </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                barrierAction.</span><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 等待其他线程</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_140thh"> (count </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">broken) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                wait</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (broken) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                throw</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> BrokenBarrierException</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> index;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> reset</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        broken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parties;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        notifyAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> synchronized</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> breakBarrier</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        broken </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        notifyAll</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ParallelComputation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> threadCount;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> CyclicBarrier barrier;</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh">[] results;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1t8gfj"> ParallelComputation</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> threadCount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.threadCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> threadCount;</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_140thh">[threadCount];</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.barrier </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CyclicBarrier</span><span class="__shiki_140thh">(threadCount, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">::</span><span class="__shiki_140thh">mergeResults);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> compute</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        List&lt;</span><span class="__shiki_1itgoe">Thread</span><span class="__shiki_140thh">&gt; threads </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> threadCount; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            final</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> threadId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> i;</span></span>
<span class="line"><span class="__shiki_140thh">            Thread thread </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Thread</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">-&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 第一阶段计算</span></span>
<span class="line"><span class="__shiki_140thh">                    results[threadId] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> phase1Computation</span><span class="__shiki_140thh">(threadId);</span></span>
<span class="line"><span class="__shiki_140thh">                    barrier.</span><span class="__shiki_1t8gfj">await</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 第二阶段计算（在所有线程完成第一阶段后开始）</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    phase2Computation</span><span class="__shiki_140thh">(threadId);</span></span>
<span class="line"><span class="__shiki_140thh">                    barrier.</span><span class="__shiki_1t8gfj">await</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (Exception </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    e.</span><span class="__shiki_1t8gfj">printStackTrace</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            });</span></span>
<span class="line"><span class="__shiki_140thh">            threads.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(thread);</span></span>
<span class="line"><span class="__shiki_140thh">            thread.</span><span class="__shiki_1t8gfj">start</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 等待所有线程完成</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (Thread thread </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> threads) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                thread.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> double</span><span class="__shiki_1t8gfj"> phase1Computation</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> threadId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 模拟计算</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> phase2Computation</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> threadId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 使用第一阶段的结果进行计算</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Thread &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> threadId </span><span class="__shiki_1itgoe">+</span><span class="__shiki_mdbnqw"> &quot; phase2 with result: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> results[threadId]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> mergeResults</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        double</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">double</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> results) {</span></span>
<span class="line"><span class="__shiki_140thh">            sum </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        System.out.</span><span class="__shiki_1t8gfj">println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;All threads completed phase1. Average: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> (sum </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> threadCount));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="适用场景-9" tabindex="-1">适用场景 <a class="header-anchor" href="#适用场景-9" aria-label="Permalink to &quot;适用场景&quot;">​</a></h3><ul><li>并行算法中的同步点</li><li>多阶段计算任务</li><li>需要协调多个线程的执行进度</li></ul><h2 id="并发模式总结对比" tabindex="-1">并发模式总结对比 <a class="header-anchor" href="#并发模式总结对比" aria-label="Permalink to &quot;并发模式总结对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>模式</th><th>主要目的</th><th>关键特点</th><th>适用场景</th></tr></thead><tbody><tr><td>主动对象</td><td>异步方法调用</td><td>方法调用与执行解耦</td><td>需要异步处理，避免阻塞</td></tr><tr><td>监控器</td><td>线程安全访问</td><td>封装同步逻辑</td><td>保护共享数据完整性</td></tr><tr><td>线程池</td><td>线程复用</td><td>管理线程生命周期</td><td>大量短期任务，资源控制</td></tr><tr><td>生产者-消费者</td><td>工作解耦</td><td>缓冲队列协调生产消费</td><td>生产消费速率不匹配</td></tr><tr><td>读写锁</td><td>并发读取</td><td>读共享，写独占</td><td>读多写少场景</td></tr><tr><td>工作窃取</td><td>负载均衡</td><td>线程窃取其他队列任务</td><td>任务执行时间不确定</td></tr><tr><td>领导者/追随者</td><td>事件处理</td><td>线程轮流担任领导者</td><td>事件驱动架构</td></tr><tr><td>反应堆</td><td>事件分发</td><td>事件多路复用</td><td>高并发网络服务器</td></tr><tr><td>线程特定存储</td><td>线程隔离数据</td><td>ThreadLocal变量</td><td>线程上下文管理</td></tr><tr><td>屏障</td><td>线程同步</td><td>等待所有线程到达</td><td>并行计算，多阶段任务</td></tr></tbody></table><h2 id="并发设计原则" tabindex="-1">并发设计原则 <a class="header-anchor" href="#并发设计原则" aria-label="Permalink to &quot;并发设计原则&quot;">​</a></h2><h3 id="_1-安全性原则-safety" tabindex="-1">1. 安全性原则 (Safety) <a class="header-anchor" href="#_1-安全性原则-safety" aria-label="Permalink to &quot;1. 安全性原则 (Safety)&quot;">​</a></h3><ul><li>确保对象状态在多线程环境下保持一致性</li><li>使用适当的同步机制保护共享数据</li><li>避免竞态条件</li></ul><h3 id="_2-活性原则-liveness" tabindex="-1">2. 活性原则 (Liveness) <a class="header-anchor" href="#_2-活性原则-liveness" aria-label="Permalink to &quot;2. 活性原则 (Liveness)&quot;">​</a></h3><ul><li>避免死锁、活锁和饥饿</li><li>确保线程能够正常执行和终止</li><li>合理的资源分配策略</li></ul><h3 id="_3-性能原则-performance" tabindex="-1">3. 性能原则 (Performance) <a class="header-anchor" href="#_3-性能原则-performance" aria-label="Permalink to &quot;3. 性能原则 (Performance)&quot;">​</a></h3><ul><li>减少锁竞争</li><li>使用无锁数据结构</li><li>合理的线程数量配置</li></ul><h3 id="_4-可重用性原则-reusability" tabindex="-1">4. 可重用性原则 (Reusability) <a class="header-anchor" href="#_4-可重用性原则-reusability" aria-label="Permalink to &quot;4. 可重用性原则 (Reusability)&quot;">​</a></h3><ul><li>设计线程安全的可重用组件</li><li>提供清晰的线程安全保证</li><li>文档化并发行为</li></ul><h2 id="常见并发问题及解决方案" tabindex="-1">常见并发问题及解决方案 <a class="header-anchor" href="#常见并发问题及解决方案" aria-label="Permalink to &quot;常见并发问题及解决方案&quot;">​</a></h2><h3 id="死锁预防" tabindex="-1">死锁预防 <a class="header-anchor" href="#死锁预防" aria-label="Permalink to &quot;死锁预防&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> DeadlockPrevention</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 锁顺序化</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> transfer</span><span class="__shiki_140thh">(Account </span><span class="__shiki_1jdh33">from</span><span class="__shiki_140thh">, Account </span><span class="__shiki_1jdh33">to</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        Object firstLock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> from.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> to.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> from </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> to;</span></span>
<span class="line"><span class="__shiki_140thh">        Object secondLock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> from.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> to.</span><span class="__shiki_1t8gfj">getId</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> to </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> from;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        synchronized</span><span class="__shiki_140thh"> (firstLock) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            synchronized</span><span class="__shiki_140thh"> (secondLock) {</span></span>
<span class="line"><span class="__shiki_140thh">                from.</span><span class="__shiki_1t8gfj">withdraw</span><span class="__shiki_140thh">(amount);</span></span>
<span class="line"><span class="__shiki_140thh">                to.</span><span class="__shiki_1t8gfj">deposit</span><span class="__shiki_140thh">(amount);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 使用超时</span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> tryTransfer</span><span class="__shiki_140thh">(Account </span><span class="__shiki_1jdh33">from</span><span class="__shiki_140thh">, Account </span><span class="__shiki_1jdh33">to</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> amount</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">long</span><span class="__shiki_1jdh33"> timeout</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        long</span><span class="__shiki_140thh"> stopTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> System.</span><span class="__shiki_1t8gfj">nanoTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> timeout;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> (System.</span><span class="__shiki_1t8gfj">nanoTime</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> stopTime) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (from.</span><span class="__shiki_1t8gfj">getLock</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">tryLock</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (to.</span><span class="__shiki_1t8gfj">getLock</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">tryLock</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                            from.</span><span class="__shiki_1t8gfj">withdraw</span><span class="__shiki_140thh">(amount);</span></span>
<span class="line"><span class="__shiki_140thh">                            to.</span><span class="__shiki_1t8gfj">deposit</span><span class="__shiki_140thh">(amount);</span></span>
<span class="line"><span class="__shiki_1itgoe">                            return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                            to.</span><span class="__shiki_1t8gfj">getLock</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">unlock</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    from.</span><span class="__shiki_1t8gfj">getLock</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">unlock</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 短暂休眠后重试</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (InterruptedException </span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                Thread.</span><span class="__shiki_1t8gfj">currentThread</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">interrupt</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="性能优化技巧" tabindex="-1">性能优化技巧 <a class="header-anchor" href="#性能优化技巧" aria-label="Permalink to &quot;性能优化技巧&quot;">​</a></h3><div class="language-java vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">java</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PerformanceOptimizations</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 减小锁粒度</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> Map&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Object</span><span class="__shiki_140thh">&gt; cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> HashMap&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_1itgoe"> Object</span><span class="__shiki_140thh">[] locks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> Object</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> locks.length; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            locks[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Object</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> put</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, Object </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> lockIndex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> key.</span><span class="__shiki_1t8gfj">hashCode</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh"> (locks.length </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        synchronized</span><span class="__shiki_140thh"> (locks[lockIndex]) {</span></span>
<span class="line"><span class="__shiki_140thh">            cache.</span><span class="__shiki_1t8gfj">put</span><span class="__shiki_140thh">(key, value);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 使用读写锁</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> ReadWriteLock rwLock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ReentrantReadWriteLock</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> List&lt;</span><span class="__shiki_1itgoe">String</span><span class="__shiki_140thh">&gt; data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> ArrayList&lt;&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_140thh"> String </span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> index</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        rwLock.</span><span class="__shiki_1t8gfj">readLock</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">lock</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> data.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(index);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            rwLock.</span><span class="__shiki_1t8gfj">readLock</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">unlock</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> add</span><span class="__shiki_140thh">(String </span><span class="__shiki_1jdh33">item</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        rwLock.</span><span class="__shiki_1t8gfj">writeLock</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">lock</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            data.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(item);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            rwLock.</span><span class="__shiki_1t8gfj">writeLock</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">unlock</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 使用无锁编程</span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> final</span><span class="__shiki_140thh"> AtomicLong counter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AtomicLong</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    public</span><span class="__shiki_1itgoe"> long</span><span class="__shiki_1t8gfj"> increment</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> counter.</span><span class="__shiki_1t8gfj">incrementAndGet</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>并发设计模式提供了解决复杂并发问题的标准化方法，理解这些模式有助于构建高性能、可维护的并发系统。在实际应用中，应根据具体需求选择合适的模式，并注意遵循并发编程的最佳实践。</p>`,110)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
