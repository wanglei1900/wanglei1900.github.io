import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"前端内存管理深度指南","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/performance/strategies/memory.md","filePath":"frontend/performance/strategies/memory.md"}'),_={name:"frontend/performance/strategies/memory.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="前端内存管理深度指南" tabindex="-1">前端内存管理深度指南 <a class="header-anchor" href="#前端内存管理深度指南" aria-label="Permalink to &quot;前端内存管理深度指南&quot;">​</a></h1><h2 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h2><ul><li><a href="#内存管理的重要性">内存管理的重要性</a></li><li><a href="#javascript内存模型">JavaScript内存模型</a></li><li><a href="#常见内存问题">常见内存问题</a></li><li><a href="#内存优化策略">内存优化策略</a></li><li><a href="#垃圾回收机制">垃圾回收机制</a></li><li><a href="#内存分析工具">内存分析工具</a></li><li><a href="#框架特定优化">框架特定优化</a></li><li><a href="#高级内存管理技术">高级内存管理技术</a></li><li><a href="#内存管理最佳实践">内存管理最佳实践</a></li></ul><hr><h2 id="内存管理的重要性" tabindex="-1">内存管理的重要性 <a class="header-anchor" href="#内存管理的重要性" aria-label="Permalink to &quot;内存管理的重要性&quot;">​</a></h2><h3 id="为什么需要关注内存管理" tabindex="-1">为什么需要关注内存管理 <a class="header-anchor" href="#为什么需要关注内存管理" aria-label="Permalink to &quot;为什么需要关注内存管理&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[内存问题] --&gt; B[页面卡顿]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[崩溃/闪退]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[电池消耗快]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[用户体验差]</span></span></code></pre></div><h3 id="内存使用生命周期" tabindex="-1">内存使用生命周期 <a class="header-anchor" href="#内存使用生命周期" aria-label="Permalink to &quot;内存使用生命周期&quot;">​</a></h3><ol><li><strong>分配</strong> - 创建变量、对象、函数等</li><li><strong>使用</strong> - 读取/写入内存</li><li><strong>释放</strong> - 内存不再需要时回收</li></ol><h3 id="内存限制" tabindex="-1">内存限制 <a class="header-anchor" href="#内存限制" aria-label="Permalink to &quot;内存限制&quot;">​</a></h3><ul><li><strong>移动设备</strong>：通常限制在100-400MB</li><li><strong>桌面设备</strong>：通常限制在1-4GB</li><li>超过限制会导致页面崩溃或强制刷新</li></ul><hr><h2 id="javascript内存模型" tabindex="-1">JavaScript内存模型 <a class="header-anchor" href="#javascript内存模型" aria-label="Permalink to &quot;JavaScript内存模型&quot;">​</a></h2><h3 id="内存结构" tabindex="-1">内存结构 <a class="header-anchor" href="#内存结构" aria-label="Permalink to &quot;内存结构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph JavaScript 内存模型</span></span>
<span class="line"><span class="__shiki_140thh">        A[栈 Stack] --&gt;|原始值| B[Number, String, Boolean等]</span></span>
<span class="line"><span class="__shiki_140thh">        C[堆 Heap] --&gt;|引用值| D[Object, Array, Function等]</span></span>
<span class="line"><span class="__shiki_140thh">        E[闭包 Closure] --&gt;|特殊作用域| F[保留的变量引用]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span></code></pre></div><h3 id="变量存储机制" tabindex="-1">变量存储机制 <a class="header-anchor" href="#变量存储机制" aria-label="Permalink to &quot;变量存储机制&quot;">​</a></h3><table tabindex="0"><thead><tr><th>类型</th><th>存储位置</th><th>访问速度</th><th>大小限制</th></tr></thead><tbody><tr><td><strong>原始值</strong></td><td>栈</td><td>快</td><td>固定大小</td></tr><tr><td><strong>引用值</strong></td><td>堆</td><td>较慢</td><td>动态分配</td></tr><tr><td><strong>闭包变量</strong></td><td>堆</td><td>较慢</td><td>动态分配</td></tr></tbody></table><h3 id="示例-内存分配" tabindex="-1">示例：内存分配 <a class="header-anchor" href="#示例-内存分配" aria-label="Permalink to &quot;示例：内存分配&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 栈分配（原始值）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> age</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_140thh">; </span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> name</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;John&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 堆分配（对象）</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  name: </span><span class="__shiki_mdbnqw">&quot;John&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  age: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  preferences: {}</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 闭包保留</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> createCounter</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 保留在闭包中</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> count;</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="常见内存问题" tabindex="-1">常见内存问题 <a class="header-anchor" href="#常见内存问题" aria-label="Permalink to &quot;常见内存问题&quot;">​</a></h2><h3 id="内存泄漏" tabindex="-1">内存泄漏 <a class="header-anchor" href="#内存泄漏" aria-label="Permalink to &quot;内存泄漏&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[未释放的资源] --&gt; B[内存占用增长]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[性能下降]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[应用崩溃]</span></span></code></pre></div><h3 id="常见泄漏场景" tabindex="-1">常见泄漏场景 <a class="header-anchor" href="#常见泄漏场景" aria-label="Permalink to &quot;常见泄漏场景&quot;">​</a></h3><ol><li><p><strong>意外全局变量</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> createUser</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 忘记使用var/let/const</span></span>
<span class="line"><span class="__shiki_140thh">  username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;John&#39;</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 成为window.username</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li><li><p><strong>未清除的定时器</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> intervalId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 长期运行的操作</span></span>
<span class="line"><span class="__shiki_140thh">}, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 忘记清除: clearInterval(intervalId)</span></span></code></pre></div></li><li><p><strong>DOM引用未释放</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> elements</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  button: document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;myButton&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">  container: document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;container&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 即使从DOM移除，JS引用仍保留</span></span>
<span class="line"><span class="__shiki_140thh">document.body.</span><span class="__shiki_1t8gfj">removeChild</span><span class="__shiki_140thh">(document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;container&#39;</span><span class="__shiki_140thh">));</span></span></code></pre></div></li><li><p><strong>闭包保留</strong></p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> setup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> fetchHugeData</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 大数据</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  element.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 闭包保留对data的引用</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(data);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li></ol><h3 id="内存膨胀" tabindex="-1">内存膨胀 <a class="header-anchor" href="#内存膨胀" aria-label="Permalink to &quot;内存膨胀&quot;">​</a></h3><ul><li>应用使用超过必要的大量内存</li><li>常见原因： <ul><li>加载未使用的资源</li><li>缓存过大</li><li>频繁创建大型对象</li></ul></li></ul><hr><h2 id="内存优化策略" tabindex="-1">内存优化策略 <a class="header-anchor" href="#内存优化策略" aria-label="Permalink to &quot;内存优化策略&quot;">​</a></h2><h3 id="基本优化技术" tabindex="-1">基本优化技术 <a class="header-anchor" href="#基本优化技术" aria-label="Permalink to &quot;基本优化技术&quot;">​</a></h3><table tabindex="0"><thead><tr><th>技术</th><th>描述</th><th>代码示例</th></tr></thead><tbody><tr><td><strong>及时释放引用</strong></td><td>不再需要的对象设为null</td><td><code>largeObj = null;</code></td></tr><tr><td><strong>避免全局变量</strong></td><td>使用局部作用域</td><td><code>function(){...}</code></td></tr><tr><td><strong>事件监听清理</strong></td><td>移除不再需要的事件监听</td><td><code>element.removeEventListener()</code></td></tr><tr><td><strong>定时器清理</strong></td><td>清除不需要的定时器</td><td><code>clearInterval(timer)</code></td></tr><tr><td><strong>弱引用</strong></td><td>使用WeakMap/WeakSet</td><td><code>const wm = new WeakMap()</code></td></tr></tbody></table><h3 id="对象池模式" tabindex="-1">对象池模式 <a class="header-anchor" href="#对象池模式" aria-label="Permalink to &quot;对象池模式&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ObjectPool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">createFn</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.createFn </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> createFn;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.pool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  acquire</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.pool.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">      ?</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.pool.</span><span class="__shiki_1t8gfj">pop</span><span class="__shiki_140thh">() </span></span>
<span class="line"><span class="__shiki_1itgoe">      :</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createFn</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  release</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">obj</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重置对象状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (obj.reset) obj.</span><span class="__shiki_1t8gfj">reset</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.pool.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(obj);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> particlePool</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ObjectPool</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> ({</span></span>
<span class="line"><span class="__shiki_140thh">  x: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, y: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, vx: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, vy: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  reset</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.x </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.y </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.vx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.vy </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 获取粒子</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> particle</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> particlePool.</span><span class="__shiki_1t8gfj">acquire</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用后释放</span></span>
<span class="line"><span class="__shiki_140thh">particlePool.</span><span class="__shiki_1t8gfj">release</span><span class="__shiki_140thh">(particle);</span></span></code></pre></div><h3 id="数据分页处理" tabindex="-1">数据分页处理 <a class="header-anchor" href="#数据分页处理" aria-label="Permalink to &quot;数据分页处理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function*</span><span class="__shiki_1t8gfj"> paginatedDataFetcher</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">url</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">pageSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> hasMore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  while</span><span class="__shiki_140thh"> (hasMore) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">url</span><span class="__shiki_mdbnqw">}?page=\${</span><span class="__shiki_140thh">page</span><span class="__shiki_mdbnqw">}&amp;size=\${</span><span class="__shiki_140thh">pageSize</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> data</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> response.</span><span class="__shiki_1t8gfj">json</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (data.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh"> pageSize) {</span></span>
<span class="line"><span class="__shiki_140thh">      hasMore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    yield</span><span class="__shiki_140thh"> data; </span><span class="__shiki_21nrsd">// 每次只返回一页数据</span></span>
<span class="line"><span class="__shiki_140thh">    page</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dataFetcher</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> paginatedDataFetcher</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/api/large-dataset&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 按需获取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">value</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> dataFetcher.</span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">processData</span><span class="__shiki_140thh">(value);</span></span></code></pre></div><hr><h2 id="垃圾回收机制" tabindex="-1">垃圾回收机制 <a class="header-anchor" href="#垃圾回收机制" aria-label="Permalink to &quot;垃圾回收机制&quot;">​</a></h2><h3 id="标记-清除算法" tabindex="-1">标记-清除算法 <a class="header-anchor" href="#标记-清除算法" aria-label="Permalink to &quot;标记-清除算法&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[GC开始] --&gt; B[从根对象开始遍历]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[标记所有可达对象]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[扫描堆内存]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[清除未标记对象]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[释放内存]</span></span></code></pre></div><h3 id="引用计数算法" tabindex="-1">引用计数算法 <a class="header-anchor" href="#引用计数算法" aria-label="Permalink to &quot;引用计数算法&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 引用计数示例</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> a </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { name: </span><span class="__shiki_mdbnqw">&#39;A&#39;</span><span class="__shiki_140thh"> }; </span><span class="__shiki_21nrsd">// 引用计数: 1</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> a;             </span><span class="__shiki_21nrsd">// 引用计数: 2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">a </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;              </span><span class="__shiki_21nrsd">// 引用计数: 1</span></span>
<span class="line"><span class="__shiki_140thh">b </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;              </span><span class="__shiki_21nrsd">// 引用计数: 0 -&gt; 可回收</span></span></code></pre></div><h3 id="循环引用问题" tabindex="-1">循环引用问题 <a class="header-anchor" href="#循环引用问题" aria-label="Permalink to &quot;循环引用问题&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> createCycle</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> obj1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> obj2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {};</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  obj1.ref </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> obj2; </span><span class="__shiki_21nrsd">// obj1引用obj2</span></span>
<span class="line"><span class="__shiki_140thh">  obj2.ref </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> obj1; </span><span class="__shiki_21nrsd">// obj2引用obj1</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_mdbnqw"> &#39;Cycle created&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">createCycle</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 即使函数结束，对象仍互相引用</span></span></code></pre></div><h3 id="现代gc优化" tabindex="-1">现代GC优化 <a class="header-anchor" href="#现代gc优化" aria-label="Permalink to &quot;现代GC优化&quot;">​</a></h3><ol><li><strong>分代收集</strong> - 将内存分为新生代和老生代</li><li><strong>增量收集</strong> - 将GC工作分成小部分执行</li><li><strong>空闲收集</strong> - 在CPU空闲时运行GC</li></ol><hr><h2 id="内存分析工具" tabindex="-1">内存分析工具 <a class="header-anchor" href="#内存分析工具" aria-label="Permalink to &quot;内存分析工具&quot;">​</a></h2><h3 id="chrome-devtools-内存分析" tabindex="-1">Chrome DevTools 内存分析 <a class="header-anchor" href="#chrome-devtools-内存分析" aria-label="Permalink to &quot;Chrome DevTools 内存分析&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[DevTools Memory] --&gt; B[Heap Snapshot]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[Allocation Timeline]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[Allocation Sampling]</span></span></code></pre></div><h3 id="内存分析流程" tabindex="-1">内存分析流程 <a class="header-anchor" href="#内存分析流程" aria-label="Permalink to &quot;内存分析流程&quot;">​</a></h3><ol><li>创建基准快照（Heap Snapshot）</li><li>执行操作</li><li>创建第二个快照</li><li>比较快照，查找内存泄漏</li><li>使用Allocation Timeline记录实时分配</li></ol><h3 id="内存问题识别" tabindex="-1">内存问题识别 <a class="header-anchor" href="#内存问题识别" aria-label="Permalink to &quot;内存问题识别&quot;">​</a></h3><table tabindex="0"><thead><tr><th>工具</th><th>适用场景</th><th>关键指标</th></tr></thead><tbody><tr><td><strong>Heap Snapshot</strong></td><td>静态内存分析</td><td>对象保留树</td></tr><tr><td><strong>Allocation Timeline</strong></td><td>动态分配跟踪</td><td>实时分配记录</td></tr><tr><td><strong>Performance Monitor</strong></td><td>整体内存趋势</td><td>JS堆大小、DOM节点数</td></tr></tbody></table><h3 id="内存分析技巧" tabindex="-1">内存分析技巧 <a class="header-anchor" href="#内存分析技巧" aria-label="Permalink to &quot;内存分析技巧&quot;">​</a></h3><ul><li>使用&quot;Comparison&quot;视图查找泄漏对象</li><li>关注&quot;Retainers&quot;查看对象引用链</li><li>过滤特定构造函数（如Detached HTMLElement）</li></ul><hr><h2 id="框架特定优化" tabindex="-1">框架特定优化 <a class="header-anchor" href="#框架特定优化" aria-label="Permalink to &quot;框架特定优化&quot;">​</a></h2><h3 id="react-内存优化" tabindex="-1">React 内存优化 <a class="header-anchor" href="#react-内存优化" aria-label="Permalink to &quot;React 内存优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 避免不必要的状态</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> UserList</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">users</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">setUsers</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> useState</span><span class="__shiki_140thh">([]);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  useEffect</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    fetchUsers</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 只存储必要字段</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> minimalData</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> data.</span><span class="__shiki_1t8gfj">map</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">u</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> ({id: u.id, name: u.name}));</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setUsers</span><span class="__shiki_140thh">(minimalData);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }, []);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // ...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 清理副作用</span></span>
<span class="line"><span class="__shiki_1t8gfj">useEffect</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> controller</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> AbortController</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  fetch</span><span class="__shiki_140thh">(url, { signal: controller.signal })</span></span>
<span class="line"><span class="__shiki_140thh">    .</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_21nrsd">/* ... */</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> controller.</span><span class="__shiki_1t8gfj">abort</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 清理函数</span></span>
<span class="line"><span class="__shiki_140thh">}, []);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 虚拟列表</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { FixedSizeList } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;react-window&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> BigList</span><span class="__shiki_140thh">({ </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh"> }) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_dzsirb">FixedSizeList</span></span>
<span class="line"><span class="__shiki_1t8gfj">      height</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">600</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1t8gfj">      width</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1t8gfj">      itemCount</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{data.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1t8gfj">      itemSize</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{</span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    &gt;</span></span>
<span class="line"><span class="__shiki_140thh">      {({ </span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">style</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> style</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">{style}&gt;{data[index].name}&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      )}</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_dzsirb">FixedSizeList</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  );</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="vue-内存优化" tabindex="-1">Vue 内存优化 <a class="header-anchor" href="#vue-内存优化" aria-label="Permalink to &quot;Vue 内存优化&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">  &lt;!-- 使用v-if替代v-show卸载组件 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">HeavyComponent</span><span class="__shiki_1t8gfj"> v-if</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;showComponent&quot;</span><span class="__shiki_140thh"> /&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  &lt;!-- 虚拟滚动 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">RecycleScroller</span></span>
<span class="line"><span class="__shiki_1t8gfj">    class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;scroller&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    :items</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;largeList&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    :item-size</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;50&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    key-field</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;id&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  &gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_1t8gfj"> v-slot</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">{ item }</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">      &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;{{ item.name }}&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">RecycleScroller</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeUnmount</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理非Vue资源</span></span>
<span class="line"><span class="__shiki_140thh">    window.</span><span class="__shiki_1t8gfj">removeEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;resize&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleResize);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.cancelTokenSource?.</span><span class="__shiki_1t8gfj">cancel</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  methods: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    loadPartialData</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 只加载可见区域数据</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="angular-内存优化" tabindex="-1">Angular 内存优化 <a class="header-anchor" href="#angular-内存优化" aria-label="Permalink to &quot;Angular 内存优化&quot;">​</a></h3><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 取消订阅Observable</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Component</span><span class="__shiki_140thh">({</span><span class="__shiki_21nrsd">/* ... */</span><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> UserComponent</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> OnDestroy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  private</span><span class="__shiki_1jdh33"> destroy$</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Subject</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">void</span><span class="__shiki_140thh">&gt;();</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    userService.</span><span class="__shiki_1t8gfj">getUsers</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">pipe</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">takeUntil</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.destroy$))</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">subscribe</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">users</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // ...</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  ngOnDestroy</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.destroy$.</span><span class="__shiki_1t8gfj">next</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.destroy$.</span><span class="__shiki_1t8gfj">complete</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 使用OnPush变更检测</span></span>
<span class="line"><span class="__shiki_140thh">@</span><span class="__shiki_1t8gfj">Component</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  selector: </span><span class="__shiki_mdbnqw">&#39;app-user-list&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  templateUrl: </span><span class="__shiki_mdbnqw">&#39;./user-list.component.html&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  changeDetection: ChangeDetectionStrategy.OnPush</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 惰性加载模块</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> routes</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Routes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">  {</span></span>
<span class="line"><span class="__shiki_140thh">    path: </span><span class="__shiki_mdbnqw">&#39;admin&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    loadChildren</span><span class="__shiki_140thh">: () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> import</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./admin/admin.module&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">m</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> m.AdminModule)</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">];</span></span></code></pre></div><hr><h2 id="高级内存管理技术" tabindex="-1">高级内存管理技术 <a class="header-anchor" href="#高级内存管理技术" aria-label="Permalink to &quot;高级内存管理技术&quot;">​</a></h2><h3 id="共享内存与webassembly" tabindex="-1">共享内存与WebAssembly <a class="header-anchor" href="#共享内存与webassembly" aria-label="Permalink to &quot;共享内存与WebAssembly&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建共享内存</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sharedBuffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SharedArrayBuffer</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> sharedArray</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Int32Array</span><span class="__shiki_140thh">(sharedBuffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// WebAssembly内存管理</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> memory</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> WebAssembly.</span><span class="__shiki_1t8gfj">Memory</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  initial: </span><span class="__shiki_dzsirb">256</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 初始256页 (每页64KB)</span></span>
<span class="line"><span class="__shiki_140thh">  maximum: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 最大1024页 (64MB)</span></span>
<span class="line"><span class="__shiki_140thh">  shared: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">   // 是否共享内存</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// WebAssembly模块使用</span></span>
<span class="line"><span class="__shiki_140thh">WebAssembly.</span><span class="__shiki_1t8gfj">instantiateStreaming</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">fetch</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;module.wasm&#39;</span><span class="__shiki_140thh">), {</span></span>
<span class="line"><span class="__shiki_140thh">  js: {</span></span>
<span class="line"><span class="__shiki_140thh">    mem: memory</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="内存压缩技术" tabindex="-1">内存压缩技术 <a class="header-anchor" href="#内存压缩技术" aria-label="Permalink to &quot;内存压缩技术&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用字符串池</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> stringPool</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> getPooledString</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">str</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">stringPool.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(str)) {</span></span>
<span class="line"><span class="__shiki_140thh">    stringPool.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(str, str);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> stringPool.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(str);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用数组缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> buffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> ArrayBuffer</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 分配1KB连续内存</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> dataView</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> DataView</span><span class="__shiki_140thh">(buffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 写入数据</span></span>
<span class="line"><span class="__shiki_140thh">dataView.</span><span class="__shiki_1t8gfj">setInt32</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">123456</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 在位置0写入32位整数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 读取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> value</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> dataView.</span><span class="__shiki_1t8gfj">getInt32</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 123456</span></span></code></pre></div><h3 id="内存限制适配" tabindex="-1">内存限制适配 <a class="header-anchor" href="#内存限制适配" aria-label="Permalink to &quot;内存限制适配&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 根据设备内存调整策略</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> deviceMemory</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> navigator.deviceMemory </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// GB</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> configureMemoryStrategy</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> strategies</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    cacheSize: Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(deviceMemory </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// 每GB内存10MB缓存</span></span>
<span class="line"><span class="__shiki_140thh">    maxParticles: deviceMemory </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    textureQuality: deviceMemory </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;high&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;medium&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (deviceMemory </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    strategies.useObjectPool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    strategies.disableAnimations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> strategies;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> memoryStrategy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> configureMemoryStrategy</span><span class="__shiki_140thh">();</span></span></code></pre></div><hr><h2 id="内存管理最佳实践" tabindex="-1">内存管理最佳实践 <a class="header-anchor" href="#内存管理最佳实践" aria-label="Permalink to &quot;内存管理最佳实践&quot;">​</a></h2><h3 id="内存优化检查清单" tabindex="-1">内存优化检查清单 <a class="header-anchor" href="#内存优化检查清单" aria-label="Permalink to &quot;内存优化检查清单&quot;">​</a></h3><ol><li>[ ] 定期进行内存分析</li><li>[ ] 使用对象池复用对象</li><li>[ ] 避免内存泄漏模式</li><li>[ ] 分页加载大型数据集</li><li>[ ] 清理事件监听器和订阅</li><li>[ ] 使用弱引用(WeakMap/WeakSet)</li><li>[ ] 优化闭包使用</li><li>[ ] 按需加载资源</li><li>[ ] 使用虚拟化长列表</li><li>[ ] 监控内存使用情况</li></ol><h3 id="性能与内存平衡" tabindex="-1">性能与内存平衡 <a class="header-anchor" href="#性能与内存平衡" aria-label="Permalink to &quot;性能与内存平衡&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[优化目标] --&gt; B[减少内存占用]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[提高执行速度]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[可能增加CPU使用]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; E[可能增加内存使用]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F[平衡点]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[平衡点]</span></span></code></pre></div><h3 id="持续监控策略" tabindex="-1">持续监控策略 <a class="header-anchor" href="#持续监控策略" aria-label="Permalink to &quot;持续监控策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 内存监控实现</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MemoryMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">threshold</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> threshold;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.lastMemory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> performance.memory?.usedJSHeapSize </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.leakCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startMonitoring</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  startMonitoring</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> currentMemory</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> performance.memory?.usedJSHeapSize;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">currentMemory) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检测内存增长</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (currentMemory </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.lastMemory </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1.5</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.leakCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.leakCount </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">          console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Potential memory leak detected!&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 触发内存清理</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cleanup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.leakCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检测内存限制</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> limit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> performance.memory?.jsHeapSizeLimit </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (limit </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> currentMemory </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> limit </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.threshold) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Memory usage approaching limit!&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">freeMemory</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.lastMemory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> currentMemory;</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 每10秒检查一次</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  cleanup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 释放缓存</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理临时对象</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  freeMemory</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 释放非关键资源</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 降低功能复杂度</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 启动监控</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (performance.memory) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  new</span><span class="__shiki_1t8gfj"> MemoryMonitor</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><blockquote><p><strong>内存管理黄金法则</strong>：</p><ol><li><strong>最小分配</strong> - 只分配真正需要的内存</li><li><strong>及时释放</strong> - 不再使用的资源立即释放</li><li><strong>复用优先</strong> - 尽可能复用已有对象</li><li><strong>监控预警</strong> - 实时监控内存使用情况</li><li><strong>渐进优化</strong> - 根据设备能力动态调整内存策略</li></ol></blockquote><p>通过系统化实施这些内存管理技术，可显著提升应用性能，防止崩溃，并为用户提供更流畅的体验。</p>`,81)])])}const d=a(_,[["render",h]]);export{r as __pageData,d as default};
