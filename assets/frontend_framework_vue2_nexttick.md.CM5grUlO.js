import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"🍀 vue2 nexttick 源码解读","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/framework/vue2/nexttick.md","filePath":"frontend/framework/vue2/nexttick.md"}'),p={name:"frontend/framework/vue2/nexttick.md"};function l(h,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="🍀-vue2-nexttick-源码解读" tabindex="-1">🍀 vue2 nexttick 源码解读 <a class="header-anchor" href="#🍀-vue2-nexttick-源码解读" aria-label="Permalink to &quot;🍀 vue2 nexttick 源码解读&quot;">​</a></h1><h2 id="🎯-一、nexttick-源码" tabindex="-1">🎯 一、nexttick 源码 <a class="header-anchor" href="#🎯-一、nexttick-源码" aria-label="Permalink to &quot;🎯 一、nexttick 源码&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* globals MutationObserver */</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { noop } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;shared/util&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { handleError } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;./error&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { isIE, isIOS, isNative } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;./env&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 微任务使用标识</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> let</span><span class="__shiki_140thh"> isUsingMicroTask </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">// 存储回调队列</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> callbacks</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Array</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Function</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_21nrsd">// 释放锁</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 回调队列执行函数</span></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> flushCallbacks</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 重置执行状态</span></span>
<span class="line"><span class="__shiki_140thh">  pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 创建回调队列快照</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> copies</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> callbacks.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 切断与原数组的引用，实现回调执行的原子性与安全性</span></span>
<span class="line"><span class="__shiki_140thh">  callbacks.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 执行所有回调</span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> copies.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    copies[i]();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 此处为使用微任务的异步延迟包装器实现</span></span>
<span class="line"><span class="__shiki_21nrsd">// 在2.5版本中曾采用宏任务与微任务结合的方案</span></span>
<span class="line"><span class="__shiki_21nrsd">// 但该方案存在状态变更恰好在重绘前发生的隐性问题</span></span>
<span class="line"><span class="__shiki_21nrsd">// （例如案例#6813中的输入输出过渡效果异常）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 同时在事件处理函数中使用宏任务会引发不可规避的异常行为</span></span>
<span class="line"><span class="__shiki_21nrsd">// （如案例#7109、#7153、#7546、#7834、#8109所示）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 因此当前版本统一使用微任务实现</span></span>
<span class="line"><span class="__shiki_21nrsd">// 此方案的主要缺陷在于某些场景下</span></span>
<span class="line"><span class="__shiki_21nrsd">// 微任务优先级过高可能导致其在预期顺序事件间触发</span></span>
<span class="line"><span class="__shiki_21nrsd">// （如案例#4521、#6690，已提供临时解决方案）</span></span>
<span class="line"><span class="__shiki_21nrsd">// 甚至在同事件冒泡阶段之间触发（案例#6566）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 核心：异步执行策略选择</span></span>
<span class="line"><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> timerFunc;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// nextTick的实现机制基于微任务队列的调用方式，可通过原生Promise.then或MutationObserver两种途径实现</span></span>
<span class="line"><span class="__shiki_21nrsd">// 虽然MutationObserver拥有更广泛的浏览器支持，但在iOS &gt;=9.3.3版本的UIWebView环境中</span></span>
<span class="line"><span class="__shiki_21nrsd">// 当通过触摸事件处理程序触发时存在严重缺陷。该缺陷表现为多次触发后会完全失效</span></span>
<span class="line"><span class="__shiki_21nrsd">// 因此，当原生Promise可用时，我们将优先采用Promise方案：</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 判断环境按照顺序降级决定使用   Promise微任务 &gt;&gt;&gt; MutationObserver微任务 &gt;&gt;&gt; setImmediate宏任务 &gt;&gt;&gt; setTimeout宏任务</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_1itgoe"> !==</span><span class="__shiki_mdbnqw"> &quot;undefined&quot;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1t8gfj"> isNative</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">Promise</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> p</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">  timerFunc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Promise.resolve().then() 将 flushCallbacks 放入微任务队列</span></span>
<span class="line"><span class="__shiki_140thh">    p.</span><span class="__shiki_1t8gfj">then</span><span class="__shiki_140thh">(flushCallbacks);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在存在兼容性问题的UIWebView环境中，Promise.then虽不会完全失效，</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 但可能陷入回调被推入微任务队列却无法及时清空的异常状态，直到浏览器</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 需要执行其他操作（例如处理定时器）才会恢复。为此，我们通过添加空定时器</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 来&quot;强制&quot;触发微任务队列的清空机制。</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // iOS WebView兼容处理：强制刷新微任务队列</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (isIOS) </span><span class="__shiki_1t8gfj">setTimeout</span><span class="__shiki_140thh">(noop);</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  isUsingMicroTask </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_1itgoe">  !</span><span class="__shiki_140thh">isIE </span><span class="__shiki_1itgoe">&amp;&amp;</span></span>
<span class="line"><span class="__shiki_1itgoe">  typeof</span><span class="__shiki_140thh"> MutationObserver </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &quot;undefined&quot;</span><span class="__shiki_1itgoe"> &amp;&amp;</span></span>
<span class="line"><span class="__shiki_140thh">  (</span><span class="__shiki_1t8gfj">isNative</span><span class="__shiki_140thh">(MutationObserver) </span><span class="__shiki_1itgoe">||</span></span>
<span class="line"><span class="__shiki_21nrsd">    // PhantomJS and iOS 7.x</span></span>
<span class="line"><span class="__shiki_140thh">    MutationObserver.</span><span class="__shiki_1t8gfj">toString</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &quot;[object MutationObserverConstructor]&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 在原生Promise不可用的环境中，使用MutationObserver作为替代方案，</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 例如PhantomJS、iOS7及Android 4.4等环境</span></span>
<span class="line"><span class="__shiki_21nrsd">  // （参考问题#6466，MutationObserver在IE11中存在兼容性问题）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 通过修改文本节点内容触发 MutationObserver（微任务）</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> counter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> observer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> MutationObserver</span><span class="__shiki_140thh">(flushCallbacks);</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> textNode</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">createTextNode</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(counter));</span></span>
<span class="line"><span class="__shiki_140thh">  observer.</span><span class="__shiki_1t8gfj">observe</span><span class="__shiki_140thh">(textNode, {</span></span>
<span class="line"><span class="__shiki_140thh">    characterData: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_1t8gfj">  timerFunc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    counter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (counter </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    textNode.data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> String</span><span class="__shiki_140thh">(counter);</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  isUsingMicroTask </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">typeof</span><span class="__shiki_140thh"> setImmediate </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_mdbnqw"> &quot;undefined&quot;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1t8gfj"> isNative</span><span class="__shiki_140thh">(setImmediate)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 当其他方案不可行时，回退至setImmediate实现。</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 从技术原理上，该方案利用了宏任务队列机制，</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 但在执行效率及时序控制方面仍优于setTimeout方案。</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 优于 setTimeout，但仅IE/Node.js支持。</span></span>
<span class="line"><span class="__shiki_1t8gfj">  timerFunc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setImmediate</span><span class="__shiki_140thh">(flushCallbacks);</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 降级兜底方案  setTimeout.</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 兼容性最好的宏任务，但可能有4ms的最低延迟。</span></span>
<span class="line"><span class="__shiki_1t8gfj">  timerFunc</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setTimeout</span><span class="__shiki_140thh">(flushCallbacks, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> nextTick</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> Promise</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_dzsirb">void</span><span class="__shiki_140thh">&gt;;</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> nextTick</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt;(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">cb</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">...</span><span class="__shiki_1jdh33">args</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">[]) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> void</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> nextTick</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">T</span><span class="__shiki_140thh">&gt;(</span><span class="__shiki_1t8gfj">cb</span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">...</span><span class="__shiki_1jdh33">args</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">[]) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1itgoe">:</span><span class="__shiki_1t8gfj"> T</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> void</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">/**</span></span>
<span class="line"><span class="__shiki_21nrsd"> * </span><span class="__shiki_1itgoe">@internal</span></span>
<span class="line"><span class="__shiki_21nrsd"> */</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> nextTick</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">cb</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">...</span><span class="__shiki_1jdh33">args</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">[]) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1itgoe">?:</span><span class="__shiki_dzsirb"> object</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 这里使用了闭包</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 每个nextTick调用需独立绑定自身的resolve函数，避免多个 Promise 实例间的冲突</span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> _resolve;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 推进回调队列</span></span>
<span class="line"><span class="__shiki_140thh">  callbacks.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (cb) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行用户回调</span></span>
<span class="line"><span class="__shiki_140thh">        cb.</span><span class="__shiki_1t8gfj">call</span><span class="__shiki_140thh">(ctx);</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_1itgoe">:</span><span class="__shiki_dzsirb"> any</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 异常捕获</span></span>
<span class="line"><span class="__shiki_1t8gfj">        handleError</span><span class="__shiki_140thh">(e, ctx, </span><span class="__shiki_mdbnqw">&quot;nextTick&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (_resolve) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 兼容写法  支持持无回调的Promise用法</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 这里使用了 “先注册依赖，后初始化状态” 模式（因为callbacks都是异步任务）</span></span>
<span class="line"><span class="__shiki_1t8gfj">      _resolve</span><span class="__shiki_140thh">(ctx);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 如果还未启动异步任务</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">pending) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 加锁</span></span>
<span class="line"><span class="__shiki_140thh">    pending </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    timerFunc</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 不传回调时返回promise</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">cb </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> typeof</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_1itgoe"> !==</span><span class="__shiki_mdbnqw"> &quot;undefined&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 将 Promise 的resolve方法绑定至_resolve变量</span></span>
<span class="line"><span class="__shiki_140thh">      _resolve </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> resolve;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="🎲-二、流程图" tabindex="-1">🎲 二、流程图 <a class="header-anchor" href="#🎲-二、流程图" aria-label="Permalink to &quot;🎲 二、流程图&quot;">​</a></h2><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">%% Mermaid flowchart of nextTick implementation</span></span>
<span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[&quot;nextTick(cb)&quot;] --&gt; B[&quot;将 cb 推入 callbacks 队列&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C{&quot;pending == false?&quot;}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|是| D[&quot;调用 timerFunc()&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[&quot;选择异步方案&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[&quot;Promise.resolve().then()&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; G[&quot;MutationObserver&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; H[&quot;setImmediate&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; I[&quot;setTimeout&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    F &amp; G &amp; H &amp; I --&gt; J[&quot;异步任务触发&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; K[&quot;执行 flushCallbacks()&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; L[&quot;遍历执行所有 callbacks 中的回调&quot;]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|否| M[&quot;直接返回&quot;]</span></span></code></pre></div>`,5)])])}const g=a(p,[["render",l]]);export{r as __pageData,g as default};
