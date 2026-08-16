import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"🍀 vue2 数组修改方法","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/framework/vue2/methodsToPatch.md","filePath":"frontend/framework/vue2/methodsToPatch.md"}'),p={name:"frontend/framework/vue2/methodsToPatch.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="🍀-vue2-数组修改方法" tabindex="-1">🍀 vue2 数组修改方法 <a class="header-anchor" href="#🍀-vue2-数组修改方法" aria-label="Permalink to &quot;🍀 vue2 数组修改方法&quot;">​</a></h1><h2 id="☠️-一、vue2-响应式缺陷" tabindex="-1">☠️ 一、vue2 响应式缺陷 <a class="header-anchor" href="#☠️-一、vue2-响应式缺陷" aria-label="Permalink to &quot;☠️ 一、vue2 响应式缺陷&quot;">​</a></h2><p>vue2 的响应式由 Object.defineProperty 完成，这个方法是为对象设计的，数组肯定是无法使用。</p><ol><li>Object.defineProperty 的缺陷 Vue 2 使用 Object.defineProperty 实现响应式，但该 API：</li></ol><ul><li>无法监听数组索引变化（arr[0] = x）</li><li>无法检测 length 属性修改、</li></ul><ol start="2"><li>性能权衡 若要对数组索引实现响应式，需要：</li></ol><ul><li>遍历所有索引并用 defineProperty 包装</li><li>对大规模数组会造成严重性能问题</li></ul><h2 id="🧱-二、如何处理数组的方法" tabindex="-1">🧱 二、如何处理数组的方法 <a class="header-anchor" href="#🧱-二、如何处理数组的方法" aria-label="Permalink to &quot;🧱 二、如何处理数组的方法&quot;">​</a></h2><p>源码地址：<code>vue\\src\\core\\observer\\index.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * Observer class that is attached to each observed</span></span>
<span class="line"><span class="__shiki_21nrsd"> * object. Once attached, the observer converts the target</span></span>
<span class="line"><span class="__shiki_21nrsd"> * object&#39;s property keys into getter/setters that</span></span>
<span class="line"><span class="__shiki_21nrsd"> * collect dependencies and dispatch updates.</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> class</span><span class="__shiki_1t8gfj"> Observer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  dep</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Dep</span></span>
<span class="line"><span class="__shiki_1jdh33">  vmCount</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> number</span><span class="__shiki_21nrsd"> // number of vms that have this object as root $data</span></span>
<span class="line"><span class="__shiki_21nrsd">  /* </span></span>
<span class="line"><span class="__shiki_21nrsd">    value: 需要转为响应式的目标对象/数组</span></span>
<span class="line"><span class="__shiki_21nrsd">    shallow: 是否浅层观察（不递归子属性）</span></span>
<span class="line"><span class="__shiki_21nrsd">    mock: 是否为测试环境模拟</span></span>
<span class="line"><span class="__shiki_21nrsd">  */</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">public</span><span class="__shiki_1jdh33"> value</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">public</span><span class="__shiki_1jdh33"> shallow</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">public</span><span class="__shiki_1jdh33"> mock</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // this.value = value</span></span>
<span class="line"><span class="__shiki_21nrsd">    // # 创建依赖收集器</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.dep </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> mock </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> mockDep </span><span class="__shiki_1itgoe">:</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Dep</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_21nrsd">    // # 初始化 Vue 实例计数器</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.vmCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_21nrsd">    // # 给value添加__ob__属性指向当前Observer实例，__ob__: 标记该对象已被观察，避免重复处理</span></span>
<span class="line"><span class="__shiki_21nrsd">    // # def(): Vue 的工具函数，等价于 Object.defineProperty</span></span>
<span class="line"><span class="__shiki_1t8gfj">    def</span><span class="__shiki_140thh">(value, </span><span class="__shiki_mdbnqw">&#39;__ob__&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">isArray</span><span class="__shiki_140thh">(value)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">mock) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // # 原型链拦截（现代浏览器）：修改 __proto__ 指向重写后的原型</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (hasProto) {</span></span>
<span class="line"><span class="__shiki_21nrsd">          /* eslint-disable no-proto */</span></span>
<span class="line"><span class="__shiki_21nrsd">          // # 修改数组原型链</span></span>
<span class="line"><span class="__shiki_140thh">          ;(value </span><span class="__shiki_1itgoe">as</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">__proto__</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> arrayMethods</span></span>
<span class="line"><span class="__shiki_21nrsd">          /* eslint-enable no-proto */</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // # 方法拷贝（兼容旧环境）：直接在数组上定义重写的方法</span></span>
<span class="line"><span class="__shiki_1itgoe">          for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">, l </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> arrayKeys.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> l; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_dzsirb"> key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> arrayKeys[i]</span></span>
<span class="line"><span class="__shiki_21nrsd">            // # 降级方案：直接定义方法</span></span>
<span class="line"><span class="__shiki_1t8gfj">            def</span><span class="__shiki_140thh">(value, key, arrayMethods[key])</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">shallow) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // # 观察数组元素，调用 observe()，实现深层响应式</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">observeArray</span><span class="__shiki_140thh">(value)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      /**</span></span>
<span class="line"><span class="__shiki_21nrsd">       * Walk through all properties and convert them into</span></span>
<span class="line"><span class="__shiki_21nrsd">       * getter/setters. This method should only be called when</span></span>
<span class="line"><span class="__shiki_21nrsd">       * value type is Object.</span></span>
<span class="line"><span class="__shiki_21nrsd">       */</span></span>
<span class="line"><span class="__shiki_21nrsd">      // # 对象的响应式处理：递归实现</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> keys</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(value)</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> keys.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> key</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> keys[i]</span></span>
<span class="line"><span class="__shiki_1t8gfj">        defineReactive</span><span class="__shiki_140thh">(value, key, </span><span class="__shiki_dzsirb">NO_INITIAL_VALUE</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">undefined</span><span class="__shiki_140thh">, shallow, mock)</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span></code></pre></div><h2 id="✔️-三、vue2-改写数组响应式的方法" tabindex="-1">✔️ 三、vue2 改写数组响应式的方法 <a class="header-anchor" href="#✔️-三、vue2-改写数组响应式的方法" aria-label="Permalink to &quot;✔️ 三、vue2 改写数组响应式的方法&quot;">​</a></h2><p>源码路径：<code>vue\\src\\core\\observer\\array.ts</code></p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// # 数组改写方法</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> methodsToPatch</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;push&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;pop&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;shift&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;unshift&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;splice&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;sort&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &#39;reverse&#39;</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * Intercept mutating methods and emit events</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_140thh">methodsToPatch.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">method</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // cache original method</span></span>
<span class="line"><span class="__shiki_21nrsd">  // # 缓存原始方法（如 Array.prototype.push）</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> original</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> arrayProto[method]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // # 定义重写后的方法到 arrayMethods 对象上</span></span>
<span class="line"><span class="__shiki_1t8gfj">  def</span><span class="__shiki_140thh">(arrayMethods, method, </span><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> mutator</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ---- 步骤 1：执行原始方法 ----</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> original.</span><span class="__shiki_1t8gfj">apply</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, args)</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ---- 步骤 2：获取关联的 Observer 实例 ----</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> ob</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.__ob__</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ---- 步骤 3：处理新增元素（仅 push/unshift/splice 可能添加新元素） ----</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> inserted</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> (method) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;push&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;unshift&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        inserted </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> args     </span><span class="__shiki_21nrsd">// # push/unshift 的参数是新增元素</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;splice&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        inserted </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> args.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">// # splice 的第三个参数起是新增元素</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // # 如果存在新增元素，递归观察它们</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (inserted) ob.</span><span class="__shiki_1t8gfj">observeArray</span><span class="__shiki_140thh">(inserted)</span></span>
<span class="line"><span class="__shiki_21nrsd">    // notify change</span></span>
<span class="line"><span class="__shiki_21nrsd">    // ---- 步骤 4：触发依赖更新 ----</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (__DEV__) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // # 开发环境下传递额外调试信息</span></span>
<span class="line"><span class="__shiki_140thh">      ob.dep.</span><span class="__shiki_1t8gfj">notify</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: TriggerOpTypes.</span><span class="__shiki_dzsirb">ARRAY_MUTATION</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        target: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        key: method</span></span>
<span class="line"><span class="__shiki_140thh">      })</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // # 生产环境直接通知更新</span></span>
<span class="line"><span class="__shiki_140thh">      ob.dep.</span><span class="__shiki_1t8gfj">notify</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_21nrsd">    // # 返回原始方法的执行结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> result</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div>`,13)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
