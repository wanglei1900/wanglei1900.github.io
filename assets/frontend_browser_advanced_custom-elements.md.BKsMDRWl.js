import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"Custom Elements 学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/browser/advanced/custom-elements.md","filePath":"frontend/browser/advanced/custom-elements.md"}'),_={name:"frontend/browser/advanced/custom-elements.md"};function l(h,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="custom-elements-学习笔记" tabindex="-1">Custom Elements 学习笔记 <a class="header-anchor" href="#custom-elements-学习笔记" aria-label="Permalink to &quot;Custom Elements 学习笔记&quot;">​</a></h1><h2 id="一、custom-elements-概述" tabindex="-1">一、Custom Elements 概述 <a class="header-anchor" href="#一、custom-elements-概述" aria-label="Permalink to &quot;一、Custom Elements 概述&quot;">​</a></h2><h3 id="_1-1-什么是-custom-elements" tabindex="-1">1.1 什么是 Custom Elements <a class="header-anchor" href="#_1-1-什么是-custom-elements" aria-label="Permalink to &quot;1.1 什么是 Custom Elements&quot;">​</a></h3><p>Custom Elements 是 <strong>Web Components 的核心技术</strong>，允许开发者创建自定义的、可重用的 HTML 元素。主要特点包括：</p><ul><li><strong>原生浏览器支持</strong>：无需第三方框架</li><li><strong>生命周期管理</strong>：提供元素创建、挂载、更新和销毁的回调</li><li><strong>DOM 集成</strong>：与现有 HTML 元素无缝协作</li><li><strong>样式封装</strong>：可与 Shadow DOM 结合实现样式隔离</li></ul><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 基本示例：创建自定义元素</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MyElement</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 元素初始化逻辑</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  connectedCallback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 元素插入DOM时调用</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">customElements.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;my-element&#39;</span><span class="__shiki_140thh">, MyElement);</span></span></code></pre></div><h3 id="_1-2-自定义元素类型" tabindex="-1">1.2 自定义元素类型 <a class="header-anchor" href="#_1-2-自定义元素类型" aria-label="Permalink to &quot;1.2 自定义元素类型&quot;">​</a></h3><table tabindex="0"><thead><tr><th>类型</th><th>继承自</th><th>特点</th><th>使用示例</th></tr></thead><tbody><tr><td><strong>Autonomous</strong></td><td>HTMLElement</td><td>完全自定义元素</td><td><code>&lt;my-element&gt;</code></td></tr><tr><td><strong>Customized built-in</strong></td><td>HTMLButtonElement</td><td>扩展原生元素</td><td><code>&lt;button is=&quot;fancy-button&quot;&gt;</code></td></tr></tbody></table><h3 id="_1-3-浏览器支持情况" tabindex="-1">1.3 浏览器支持情况 <a class="header-anchor" href="#_1-3-浏览器支持情况" aria-label="Permalink to &quot;1.3 浏览器支持情况&quot;">​</a></h3><table tabindex="0"><thead><tr><th>浏览器</th><th>支持版本</th><th>备注</th></tr></thead><tbody><tr><td>Chrome</td><td>54+</td><td>完整支持</td></tr><tr><td>Firefox</td><td>63+</td><td>完整支持</td></tr><tr><td>Safari</td><td>10.1+</td><td>支持V1规范</td></tr><tr><td>Edge</td><td>79+</td><td>Chromium内核支持</td></tr><tr><td>Opera</td><td>41+</td><td>完整支持</td></tr></tbody></table><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 特性检测</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> supportsCustomElements</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;customElements&#39;</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> window;</span></span></code></pre></div><h2 id="二、创建自定义元素" tabindex="-1">二、创建自定义元素 <a class="header-anchor" href="#二、创建自定义元素" aria-label="Permalink to &quot;二、创建自定义元素&quot;">​</a></h2><h3 id="_2-1-基本创建流程" tabindex="-1">2.1 基本创建流程 <a class="header-anchor" href="#_2-1-基本创建流程" aria-label="Permalink to &quot;2.1 基本创建流程&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 创建元素类</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> GreetingElement</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建Shadow DOM（可选）</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;World&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 2. 生命周期回调</span></span>
<span class="line"><span class="__shiki_1t8gfj">  connectedCallback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">render</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 3. 渲染方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">  render</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          display: block;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          font-family: sans-serif;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;h1&gt;Hello, \${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}!&lt;/h1&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 4. 属性访问器</span></span>
<span class="line"><span class="__shiki_1itgoe">  get</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">._name;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  set</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> value;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">render</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 5. 注册元素</span></span>
<span class="line"><span class="__shiki_140thh">customElements.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;greeting-element&#39;</span><span class="__shiki_140thh">, GreetingElement);</span></span></code></pre></div><h3 id="_2-2-扩展原生元素" tabindex="-1">2.2 扩展原生元素 <a class="header-anchor" href="#_2-2-扩展原生元素" aria-label="Permalink to &quot;2.2 扩展原生元素&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 扩展HTMLButtonElement</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> FancyButton</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLButtonElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.classList.</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fancy-button&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> CustomEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fancy-click&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 注册时指定扩展的元素</span></span>
<span class="line"><span class="__shiki_140thh">customElements.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fancy-button&#39;</span><span class="__shiki_140thh">, FancyButton, { extends: </span><span class="__shiki_mdbnqw">&#39;button&#39;</span><span class="__shiki_140thh"> });</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- 使用方式 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">button</span><span class="__shiki_1t8gfj"> is</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;fancy-button&quot;</span><span class="__shiki_140thh">&gt;点击我&lt;/</span><span class="__shiki_17hn0y">button</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="三、生命周期回调" tabindex="-1">三、生命周期回调 <a class="header-anchor" href="#三、生命周期回调" aria-label="Permalink to &quot;三、生命周期回调&quot;">​</a></h2><h3 id="_3-1-完整生命周期方法" tabindex="-1">3.1 完整生命周期方法 <a class="header-anchor" href="#_3-1-完整生命周期方法" aria-label="Permalink to &quot;3.1 完整生命周期方法&quot;">​</a></h3><table tabindex="0"><thead><tr><th>方法</th><th>调用时机</th><th>典型用途</th></tr></thead><tbody><tr><td><strong>constructor()</strong></td><td>元素创建时</td><td>初始化状态、事件监听</td></tr><tr><td><strong>connectedCallback()</strong></td><td>元素插入DOM时</td><td>DOM操作、资源获取</td></tr><tr><td><strong>disconnectedCallback()</strong></td><td>元素从DOM移除时</td><td>清理事件监听、释放资源</td></tr><tr><td><strong>attributeChangedCallback(name, oldValue, newValue)</strong></td><td>被观察属性变化时</td><td>更新内部状态、重新渲染</td></tr><tr><td><strong>adoptedCallback()</strong></td><td>元素被移动到新文档时</td><td>处理文档相关逻辑</td></tr></tbody></table><h3 id="_3-2-生命周期流程图" tabindex="-1">3.2 生命周期流程图 <a class="header-anchor" href="#_3-2-生命周期流程图" aria-label="Permalink to &quot;3.2 生命周期流程图&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[constructor] --&gt; B[元素创建]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[属性设置]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[connectedCallback]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[元素插入DOM]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[attributeChangedCallback]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[属性变更]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H[disconnectedCallback]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I[元素移除]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; J[adoptedCallback]</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; K[文档迁移]</span></span></code></pre></div><h2 id="四、属性与反射" tabindex="-1">四、属性与反射 <a class="header-anchor" href="#四、属性与反射" aria-label="Permalink to &quot;四、属性与反射&quot;">​</a></h2><h3 id="_4-1-属性观察机制" tabindex="-1">4.1 属性观察机制 <a class="header-anchor" href="#_4-1-属性观察机制" aria-label="Permalink to &quot;4.1 属性观察机制&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MyElement</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> get</span><span class="__shiki_1t8gfj"> observedAttributes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 返回需要观察的属性数组</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;disabled&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;size&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;theme&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  attributeChangedCallback</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">oldValue</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">newValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 属性变化处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh">(name) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;disabled&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">toggleAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;aria-disabled&#39;</span><span class="__shiki_140thh">, newValue </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;size&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateSize</span><span class="__shiki_140thh">(newValue);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;theme&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">applyTheme</span><span class="__shiki_140thh">(newValue);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-属性与特性同步" tabindex="-1">4.2 属性与特性同步 <a class="header-anchor" href="#_4-2-属性与特性同步" aria-label="Permalink to &quot;4.2 属性与特性同步&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SliderElement</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> get</span><span class="__shiki_1t8gfj"> observedAttributes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  get</span><span class="__shiki_1t8gfj"> value</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> parseFloat</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  set</span><span class="__shiki_1t8gfj"> value</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">val</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;value&#39;</span><span class="__shiki_140thh">, val);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateSlider</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  attributeChangedCallback</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">oldValue</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">newValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;value&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> oldValue </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_140thh"> newValue) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateSlider</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  updateSlider</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 更新UI以反映当前值</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、事件处理" tabindex="-1">五、事件处理 <a class="header-anchor" href="#五、事件处理" aria-label="Permalink to &quot;五、事件处理&quot;">​</a></h2><h3 id="_5-1-自定义事件" tabindex="-1">5.1 自定义事件 <a class="header-anchor" href="#_5-1-自定义事件" aria-label="Permalink to &quot;5.1 自定义事件&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CustomButton</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleClick);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  handleClick</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建并分发自定义事件</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> event</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CustomEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;custom-click&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      bubbles: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 允许事件冒泡</span></span>
<span class="line"><span class="__shiki_140thh">      composed: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 穿透Shadow DOM边界</span></span>
<span class="line"><span class="__shiki_140thh">      detail: {           </span><span class="__shiki_21nrsd">// 传递自定义数据</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        element: </span><span class="__shiki_dzsirb">this</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(event);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-最佳实践" tabindex="-1">5.2 最佳实践 <a class="header-anchor" href="#_5-2-最佳实践" aria-label="Permalink to &quot;5.2 最佳实践&quot;">​</a></h3><ol><li><strong>事件命名</strong>：使用短横线命名法（如 <code>custom-click</code>）</li><li><strong>数据传递</strong>：通过 <code>detail</code> 属性传递复杂数据</li><li><strong>事件冒泡</strong>：合理设置 <code>bubbles</code> 和 <code>composed</code></li><li><strong>事件委托</strong>：在 Shadow DOM 内使用事件委托</li></ol><h2 id="六、样式封装" tabindex="-1">六、样式封装 <a class="header-anchor" href="#六、样式封装" aria-label="Permalink to &quot;六、样式封装&quot;">​</a></h2><h3 id="_6-1-结合-shadow-dom" tabindex="-1">6.1 结合 Shadow DOM <a class="header-anchor" href="#_6-1-结合-shadow-dom" aria-label="Permalink to &quot;6.1 结合 Shadow DOM&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> StyledElement</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> shadow</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    shadow.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          display: block;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          border: 1px solid #ddd;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          border-radius: 4px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          padding: 16px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host([disabled]) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          opacity: 0.5;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          pointer-events: none;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        .header {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          font-size: 1.2em;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          color: var(--header-color, #333);</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;div class=&quot;header&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;slot name=&quot;header&quot;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;div class=&quot;content&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;slot&gt;&lt;/slot&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-css-自定义属性" tabindex="-1">6.2 CSS 自定义属性 <a class="header-anchor" href="#_6-2-css-自定义属性" aria-label="Permalink to &quot;6.2 CSS 自定义属性&quot;">​</a></h3><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 组件外部 */</span></span>
<span class="line"><span class="__shiki_17hn0y">my-element</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  --header-color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#4285f4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  --border-color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#e0e0e0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 组件内部 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">:host</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">  border-color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">var</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">--border-color</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">#ddd</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、最佳实践" tabindex="-1">七、最佳实践 <a class="header-anchor" href="#七、最佳实践" aria-label="Permalink to &quot;七、最佳实践&quot;">​</a></h2><h3 id="_7-1-组件设计原则" tabindex="-1">7.1 组件设计原则 <a class="header-anchor" href="#_7-1-组件设计原则" aria-label="Permalink to &quot;7.1 组件设计原则&quot;">​</a></h3><table tabindex="0"><thead><tr><th>原则</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><strong>单一职责</strong></td><td>每个元素只做一件事</td><td><code>&lt;date-picker&gt;</code> 只处理日期选择</td></tr><tr><td><strong>属性接口</strong></td><td>通过属性配置行为</td><td><code>&lt;slider min=&quot;0&quot; max=&quot;100&quot;&gt;</code></td></tr><tr><td><strong>事件驱动</strong></td><td>通过事件通知变化</td><td><code>dispatchEvent(new CustomEvent(&#39;change&#39;))</code></td></tr><tr><td><strong>无障碍访问</strong></td><td>支持键盘和屏幕阅读器</td><td>添加 ARIA 属性</td></tr><tr><td><strong>响应式设计</strong></td><td>适应不同屏幕尺寸</td><td>使用 CSS 媒体查询</td></tr></tbody></table><h3 id="_7-2-性能优化" tabindex="-1">7.2 性能优化 <a class="header-anchor" href="#_7-2-性能优化" aria-label="Permalink to &quot;7.2 性能优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OptimizedElement</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 延迟初始化非关键资源</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._renderDebounce </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  attributeChangedCallback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 使用防抖避免频繁渲染</span></span>
<span class="line"><span class="__shiki_1t8gfj">    clearTimeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">._renderDebounce);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._renderDebounce </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">render</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  render</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 使用文档片段批量更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fragment</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">createDocumentFragment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ...创建内容</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(fragment);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  disconnectedCallback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 清理定时器和事件监听</span></span>
<span class="line"><span class="__shiki_1t8gfj">    clearTimeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">._renderDebounce);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、测试与调试" tabindex="-1">八、测试与调试 <a class="header-anchor" href="#八、测试与调试" aria-label="Permalink to &quot;八、测试与调试&quot;">​</a></h2><h3 id="_8-1-单元测试示例" tabindex="-1">8.1 单元测试示例 <a class="header-anchor" href="#_8-1-单元测试示例" aria-label="Permalink to &quot;8.1 单元测试示例&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { fixture, expect } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@web/test-runner&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;GreetingElement&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  it</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;默认显示 &quot;Hello, World!&quot;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> el</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fixture</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;&lt;greeting-element&gt;&lt;/greeting-element&gt;&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> h1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> el.shadowRoot.</span><span class="__shiki_1t8gfj">querySelector</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;h1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(h1.textContent).to.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Hello, World!&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  it</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;响应name属性变化&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> el</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fixture</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;&lt;greeting-element name=&quot;Alice&quot;&gt;&lt;/greeting-element&gt;&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    el.name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;Bob&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> el.updateComplete; </span><span class="__shiki_21nrsd">// 等待渲染完成</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> h1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> el.shadowRoot.</span><span class="__shiki_1t8gfj">querySelector</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;h1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(h1.textContent).to.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Hello, Bob!&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_8-2-调试技巧" tabindex="-1">8.2 调试技巧 <a class="header-anchor" href="#_8-2-调试技巧" aria-label="Permalink to &quot;8.2 调试技巧&quot;">​</a></h3><ol><li><p><strong>Chrome DevTools</strong>：</p><ul><li>检查自定义元素属性</li><li>调试生命周期回调</li><li>查看 Shadow DOM 结构</li></ul></li><li><p><strong>调试技巧</strong>：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 在生命周期中添加日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">connectedCallback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_dzsirb">this</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">tagName</span><span class="__shiki_mdbnqw">} 已连接\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用debugger语句</span></span>
<span class="line"><span class="__shiki_1t8gfj">attributeChangedCallback</span><span class="__shiki_140thh">(name, oldValue, newValue) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  debugger</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 调试属性变化</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li></ol><h2 id="九、完整示例-可折叠面板" tabindex="-1">九、完整示例：可折叠面板 <a class="header-anchor" href="#九、完整示例-可折叠面板" aria-label="Permalink to &quot;九、完整示例：可折叠面板&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CollapsePanel</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> get</span><span class="__shiki_1t8gfj"> observedAttributes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;expanded&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          display: block;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          border: 1px solid #ddd;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          border-radius: 4px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          margin-bottom: 8px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .header {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          padding: 12px 16px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          background: #f7f7f7;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          cursor: pointer;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          display: flex;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          justify-content: space-between;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          align-items: center;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          user-select: none;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .content {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          padding: 0 16px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          max-height: 0;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          overflow: hidden;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          transition: max-height 0.3s ease-out;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host([expanded]) .content {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          padding: 16px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          max-height: 1000px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .icon::after {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          content: &#39;▼&#39;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          transition: transform 0.3s;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          font-size: 0.8em;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host([expanded]) .icon::after {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          transform: rotate(180deg);</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;div class=&quot;header&quot; part=&quot;header&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;slot name=&quot;header&quot;&gt;面板标题&lt;/slot&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;span class=&quot;icon&quot; part=&quot;icon&quot;&gt;&lt;/span&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;div class=&quot;content&quot; part=&quot;content&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;slot&gt;&lt;/slot&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.header </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.shadowRoot.</span><span class="__shiki_1t8gfj">querySelector</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.header&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  connectedCallback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.header.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.toggle);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateAccessibility</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  disconnectedCallback</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.header.</span><span class="__shiki_1t8gfj">removeEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.toggle);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  attributeChangedCallback</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;expanded&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateAccessibility</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  get</span><span class="__shiki_1t8gfj"> expanded</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">hasAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;expanded&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  set</span><span class="__shiki_1t8gfj"> expanded</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    value </span><span class="__shiki_1itgoe">?</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;expanded&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">removeAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;expanded&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  toggle</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.expanded </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.expanded;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> CustomEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;collapse-toggle&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      detail: { expanded: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.expanded }</span></span>
<span class="line"><span class="__shiki_140thh">    }));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  updateAccessibility</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> expanded</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.expanded </span><span class="__shiki_1itgoe">?</span><span class="__shiki_mdbnqw"> &#39;true&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;false&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.header.</span><span class="__shiki_1t8gfj">setAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;aria-expanded&#39;</span><span class="__shiki_140thh">, expanded);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.header.</span><span class="__shiki_1t8gfj">setAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;role&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;button&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.header.</span><span class="__shiki_1t8gfj">setAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;tabindex&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;0&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">customElements.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;collapse-panel&#39;</span><span class="__shiki_140thh">, CollapsePanel);</span></span></code></pre></div><h2 id="十、进阶技巧" tabindex="-1">十、进阶技巧 <a class="header-anchor" href="#十、进阶技巧" aria-label="Permalink to &quot;十、进阶技巧&quot;">​</a></h2><h3 id="_10-1-元素升级" tabindex="-1">10.1 元素升级 <a class="header-anchor" href="#_10-1-元素升级" aria-label="Permalink to &quot;10.1 元素升级&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 定义前使用元素</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> el</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">createElement</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;unregistered-element&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">document.body.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(el);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 延迟定义</span></span>
<span class="line"><span class="__shiki_140thh">customElements.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;unregistered-element&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">class</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;元素已升级&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 检查元素是否已定义</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (customElements.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;my-element&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 元素已注册</span></span>
<span class="line"><span class="__shiki_140thh">} else {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 元素未注册</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-动态加载组件" tabindex="-1">10.2 动态加载组件 <a class="header-anchor" href="#_10-2-动态加载组件" aria-label="Permalink to &quot;10.2 动态加载组件&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 按需加载自定义元素</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> loadComponent</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">customElements.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(name)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> module</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1itgoe"> import</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`./components/\${</span><span class="__shiki_140thh">name</span><span class="__shiki_mdbnqw">}.js\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    customElements.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(name, </span><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.default);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用</span></span>
<span class="line"><span class="__shiki_140thh">document.</span><span class="__shiki_1t8gfj">querySelectorAll</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;lazy-component&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">el</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  loadComponent</span><span class="__shiki_140thh">(el.</span><span class="__shiki_1t8gfj">getAttribute</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;component&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="十一、常见问题与解决方案" tabindex="-1">十一、常见问题与解决方案 <a class="header-anchor" href="#十一、常见问题与解决方案" aria-label="Permalink to &quot;十一、常见问题与解决方案&quot;">​</a></h2><table tabindex="0"><thead><tr><th>问题</th><th>原因</th><th>解决方案</th></tr></thead><tbody><tr><td><strong>元素不渲染</strong></td><td>未调用 <code>connectedCallback</code> 渲染</td><td>在 <code>connectedCallback</code> 中初始化渲染</td></tr><tr><td><strong>属性变化不响应</strong></td><td>未在 <code>observedAttributes</code> 声明</td><td>返回需要观察的属性数组</td></tr><tr><td><strong>样式冲突</strong></td><td>未使用 Shadow DOM 封装</td><td>添加 Shadow DOM 或使用 CSS 作用域</td></tr><tr><td><strong>事件不触发</strong></td><td>未设置 <code>bubbles</code> 或 <code>composed</code></td><td>确保事件配置正确</td></tr><tr><td><strong>自定义内置元素不工作</strong></td><td>浏览器实现问题</td><td>使用完全自定义元素替代</td></tr></tbody></table><h2 id="十二、未来发展方向" tabindex="-1">十二、未来发展方向 <a class="header-anchor" href="#十二、未来发展方向" aria-label="Permalink to &quot;十二、未来发展方向&quot;">​</a></h2><h3 id="_12-1-element-internals-api" tabindex="-1">12.1 Element Internals API <a class="header-anchor" href="#_12-1-element-internals-api" aria-label="Permalink to &quot;12.1 Element Internals API&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> FormElement</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._internals </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachInternals</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  get</span><span class="__shiki_1t8gfj"> validity</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">._internals.validity;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  checkValidity</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">._internals.</span><span class="__shiki_1t8gfj">checkValidity</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_12-2-declarative-shadow-dom" tabindex="-1">12.2 Declarative Shadow DOM <a class="header-anchor" href="#_12-2-declarative-shadow-dom" aria-label="Permalink to &quot;12.2 Declarative Shadow DOM&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">my-element</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_1t8gfj"> shadowroot</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;open&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">style</span><span class="__shiki_140thh">&gt;</span><span class="__shiki_1t8gfj">:host</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">display</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">block</span><span class="__shiki_140thh">; }&lt;/</span><span class="__shiki_17hn0y">style</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  Light DOM 内容</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">my-element</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_12-3-css-shadow-parts" tabindex="-1">12.3 CSS Shadow Parts <a class="header-anchor" href="#_12-3-css-shadow-parts" aria-label="Permalink to &quot;12.3 CSS Shadow Parts&quot;">​</a></h3><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">my-element</span><span class="__shiki_140thh">::part(</span><span class="__shiki_17hn0y">header</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">  font-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.5</span><span class="__shiki_1itgoe">em</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">  color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#4285f4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><h3 id="关键知识点" tabindex="-1">关键知识点 <a class="header-anchor" href="#关键知识点" aria-label="Permalink to &quot;关键知识点&quot;">​</a></h3><ol><li><strong>元素创建</strong>：继承 <code>HTMLElement</code> 并注册</li><li><strong>生命周期</strong>：<code>connectedCallback</code>, <code>attributeChangedCallback</code> 等</li><li><strong>属性反射</strong>：通过 <code>observedAttributes</code> 观察变化</li><li><strong>事件系统</strong>：使用 <code>CustomEvent</code> 进行通信</li><li><strong>样式封装</strong>：结合 Shadow DOM 实现隔离</li></ol><h3 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h3><ul><li><strong>命名规范</strong>：使用短横线命名（如 <code>my-element</code>）</li><li><strong>渐进增强</strong>：确保基本功能在未注册时可用</li><li><strong>性能优化</strong>：合理使用防抖和文档片段</li><li><strong>无障碍访问</strong>：添加 ARIA 属性和键盘支持</li><li><strong>测试驱动</strong>：为自定义元素编写单元测试</li></ul><blockquote><p><strong>学习资源</strong>：</p><ul><li><a href="https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements" target="_blank" rel="noreferrer">MDN Custom Elements 文档</a></li><li><a href="https://developers.google.com/web/fundamentals/web-components/customelements" target="_blank" rel="noreferrer">Google Web Fundamentals</a></li><li><a href="https://custom-elements-everywhere.com/" target="_blank" rel="noreferrer">Custom Elements Everywhere</a>（框架兼容性测试）</li></ul></blockquote>`,69)])])}const r=a(_,[["render",l]]);export{o as __pageData,r as default};
