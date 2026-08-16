import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Shadow DOM 封装技术学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/browser/advanced/shadow-dom.md","filePath":"frontend/browser/advanced/shadow-dom.md"}'),_={name:"frontend/browser/advanced/shadow-dom.md"};function h(l,s,t,c,e,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="shadow-dom-封装技术学习笔记" tabindex="-1">Shadow DOM 封装技术学习笔记 <a class="header-anchor" href="#shadow-dom-封装技术学习笔记" aria-label="Permalink to &quot;Shadow DOM 封装技术学习笔记&quot;">​</a></h1><h2 id="一、shadow-dom-概述" tabindex="-1">一、Shadow DOM 概述 <a class="header-anchor" href="#一、shadow-dom-概述" aria-label="Permalink to &quot;一、Shadow DOM 概述&quot;">​</a></h2><h3 id="_1-1-什么是-shadow-dom" tabindex="-1">1.1 什么是 Shadow DOM <a class="header-anchor" href="#_1-1-什么是-shadow-dom" aria-label="Permalink to &quot;1.1 什么是 Shadow DOM&quot;">​</a></h3><p>Shadow DOM 是一种<strong>浏览器原生封装技术</strong>，允许开发者创建<strong>隔离的 DOM 子树</strong>，具有以下核心特性：</p><ul><li><strong>DOM 封装</strong>：隐藏组件内部实现细节</li><li><strong>样式封装</strong>：组件样式不影响外部，外部样式不影响组件</li><li><strong>作用域隔离</strong>：组件拥有独立的 DOM 和 CSS 作用域</li><li><strong>组成模型</strong>：通过插槽(slot)实现内容分发</li></ul><h3 id="_1-2-shadow-dom-解决的问题" tabindex="-1">1.2 Shadow DOM 解决的问题 <a class="header-anchor" href="#_1-2-shadow-dom-解决的问题" aria-label="Permalink to &quot;1.2 Shadow DOM 解决的问题&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>传统方式</th><th>Shadow DOM</th></tr></thead><tbody><tr><td><strong>CSS 污染</strong></td><td>全局样式冲突</td><td>样式作用域隔离</td></tr><tr><td><strong>DOM 冲突</strong></td><td>ID/类名冲突</td><td>封装 DOM 子树</td></tr><tr><td><strong>组件复用</strong></td><td>需要手动管理</td><td>自包含组件</td></tr><tr><td><strong>第三方集成</strong></td><td>样式覆盖问题</td><td>安全边界保护</td></tr></tbody></table><h3 id="_1-3-浏览器支持情况" tabindex="-1">1.3 浏览器支持情况 <a class="header-anchor" href="#_1-3-浏览器支持情况" aria-label="Permalink to &quot;1.3 浏览器支持情况&quot;">​</a></h3><table tabindex="0"><thead><tr><th>浏览器</th><th>支持版本</th><th>支持程度</th></tr></thead><tbody><tr><td>Chrome</td><td>53+</td><td>完整支持</td></tr><tr><td>Firefox</td><td>63+</td><td>完整支持</td></tr><tr><td>Safari</td><td>10+</td><td>完整支持</td></tr><tr><td>Edge</td><td>79+</td><td>完整支持</td></tr><tr><td>Opera</td><td>40+</td><td>完整支持</td></tr></tbody></table><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 特性检测</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> supportsShadowDOM</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1itgoe">  typeof</span><span class="__shiki_dzsirb"> Element</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">prototype</span><span class="__shiki_140thh">.attachShadow </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;function&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span></span>
<span class="line"><span class="__shiki_1itgoe">  typeof</span><span class="__shiki_140thh"> HTMLTemplateElement </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;function&#39;</span><span class="__shiki_140thh">;</span></span></code></pre></div><h2 id="二、核心概念与术语" tabindex="-1">二、核心概念与术语 <a class="header-anchor" href="#二、核心概念与术语" aria-label="Permalink to &quot;二、核心概念与术语&quot;">​</a></h2><h3 id="_2-1-shadow-dom-结构模型" tabindex="-1">2.1 Shadow DOM 结构模型 <a class="header-anchor" href="#_2-1-shadow-dom-结构模型" aria-label="Permalink to &quot;2.1 Shadow DOM 结构模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">+-----------------------+</span></span>
<span class="line"><span class="__shiki_wvjl67">|   宿主元素 (Host)     |</span></span>
<span class="line"><span class="__shiki_wvjl67">| +-------------------+ |</span></span>
<span class="line"><span class="__shiki_wvjl67">| |   Shadow Root     | |</span></span>
<span class="line"><span class="__shiki_wvjl67">| | +---------------+ | |</span></span>
<span class="line"><span class="__shiki_wvjl67">| | | Shadow Tree   | | |</span></span>
<span class="line"><span class="__shiki_wvjl67">| | | +-----------+ | | |</span></span>
<span class="line"><span class="__shiki_wvjl67">| | | | &lt;slot&gt;    | | | |</span></span>
<span class="line"><span class="__shiki_wvjl67">| | | +-----------+ | | |</span></span>
<span class="line"><span class="__shiki_wvjl67">| | +---------------+ | |</span></span>
<span class="line"><span class="__shiki_wvjl67">| +-------------------+ |</span></span>
<span class="line"><span class="__shiki_wvjl67">|                       |</span></span>
<span class="line"><span class="__shiki_wvjl67">|    Light DOM 内容     |</span></span>
<span class="line"><span class="__shiki_wvjl67">|   (用户提供的内容)     |</span></span>
<span class="line"><span class="__shiki_wvjl67">+-----------------------+</span></span></code></pre></div><h3 id="_2-2-关键术语" tabindex="-1">2.2 关键术语 <a class="header-anchor" href="#_2-2-关键术语" aria-label="Permalink to &quot;2.2 关键术语&quot;">​</a></h3><table tabindex="0"><thead><tr><th>术语</th><th>描述</th></tr></thead><tbody><tr><td><strong>Shadow Host</strong></td><td>挂载 Shadow DOM 的常规 DOM 节点</td></tr><tr><td><strong>Shadow Root</strong></td><td>Shadow DOM 的根节点</td></tr><tr><td><strong>Shadow Tree</strong></td><td>Shadow Root 下的 DOM 树</td></tr><tr><td><strong>Light DOM</strong></td><td>组件的实际子元素（用户提供）</td></tr><tr><td><strong>Slotted Content</strong></td><td>通过插槽投射到 Shadow DOM 的内容</td></tr></tbody></table><h2 id="三、创建与使用-shadow-dom" tabindex="-1">三、创建与使用 Shadow DOM <a class="header-anchor" href="#三、创建与使用-shadow-dom" aria-label="Permalink to &quot;三、创建与使用 Shadow DOM&quot;">​</a></h2><h3 id="_3-1-基本创建方式" tabindex="-1">3.1 基本创建方式 <a class="header-anchor" href="#_3-1-基本创建方式" aria-label="Permalink to &quot;3.1 基本创建方式&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建宿主元素</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> hostElement</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">createElement</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;div&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">hostElement.id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;host&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 附加 Shadow Root</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> shadowRoot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> hostElement.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 添加内容到 Shadow DOM</span></span>
<span class="line"><span class="__shiki_140thh">shadowRoot.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &lt;style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    :host {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      display: block;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      border: 1px solid #ccc;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      padding: 15px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    .internal {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      color: blue;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &lt;/style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &lt;div class=&quot;internal&quot;&gt;Shadow DOM 内容&lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &lt;slot name=&quot;content&quot;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 添加到文档</span></span>
<span class="line"><span class="__shiki_140thh">document.body.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(hostElement);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 添加 Light DOM 内容</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> content</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">createElement</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;div&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">content.slot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;content&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">content.textContent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;投射的内容&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">hostElement.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(content);</span></span></code></pre></div><h3 id="_3-2-shadow-root-模式" tabindex="-1">3.2 Shadow Root 模式 <a class="header-anchor" href="#_3-2-shadow-root-模式" aria-label="Permalink to &quot;3.2 Shadow Root 模式&quot;">​</a></h3><table tabindex="0"><thead><tr><th>模式</th><th>访问权限</th><th>特点</th></tr></thead><tbody><tr><td><strong>open</strong></td><td>外部可通过 <code>element.shadowRoot</code> 访问</td><td>推荐模式，允许有限外部访问</td></tr><tr><td><strong>closed</strong></td><td>外部无法访问 Shadow Root</td><td>更高安全性，但限制灵活性</td></tr></tbody></table><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建 closed 模式 Shadow DOM</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> closedShadow</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> element.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;closed&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(element.shadowRoot); </span><span class="__shiki_21nrsd">// null (无法访问)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 内部引用保存</span></span>
<span class="line"><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">._shadowRoot </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> closedShadow;</span></span></code></pre></div><h2 id="四、样式封装机制" tabindex="-1">四、样式封装机制 <a class="header-anchor" href="#四、样式封装机制" aria-label="Permalink to &quot;四、样式封装机制&quot;">​</a></h2><h3 id="_4-1-样式作用域规则" tabindex="-1">4.1 样式作用域规则 <a class="header-anchor" href="#_4-1-样式作用域规则" aria-label="Permalink to &quot;4.1 样式作用域规则&quot;">​</a></h3><table tabindex="0"><thead><tr><th>选择器</th><th>目标</th><th>示例</th></tr></thead><tbody><tr><td><strong>:host</strong></td><td>宿主元素</td><td><code>:host { display: block }</code></td></tr><tr><td><strong>:host()</strong></td><td>特定状态的宿主</td><td><code>:host([disabled]) { opacity: 0.5 }</code></td></tr><tr><td><strong>:host-context()</strong></td><td>根据宿主祖先</td><td><code>:host-context(.dark) { background: #333 }</code></td></tr><tr><td><strong>::slotted()</strong></td><td>插槽内容</td><td><code>::slotted(img) { max-width: 100% }</code></td></tr></tbody></table><h3 id="_4-2-样式封装示例" tabindex="-1">4.2 样式封装示例 <a class="header-anchor" href="#_4-2-样式封装示例" aria-label="Permalink to &quot;4.2 样式封装示例&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- 宿主元素 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">custom-card</span><span class="__shiki_1t8gfj"> disabled</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">img</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;image.jpg&quot;</span><span class="__shiki_1t8gfj"> slot</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;image&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">h2</span><span class="__shiki_1t8gfj"> slot</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;title&quot;</span><span class="__shiki_140thh">&gt;卡片标题&lt;/</span><span class="__shiki_17hn0y">h2</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">custom-card</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">&lt;!-- Shadow DOM 内部 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">style</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  :host</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    display</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">block</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    border</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe">px</span><span class="__shiki_dzsirb"> solid</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  :host</span><span class="__shiki_140thh">([</span><span class="__shiki_1t8gfj">disabled</span><span class="__shiki_140thh">]) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    opacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    pointer-events</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">none</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  :host-context(</span><span class="__shiki_1t8gfj">.dark-theme</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    background</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#333</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">white</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  ::slotted(</span><span class="__shiki_17hn0y">img</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    border-radius</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span><span class="__shiki_1itgoe">%</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    max-width</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_1itgoe">px</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  .card-header</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    font-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.2</span><span class="__shiki_1itgoe">em</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">var</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">--primary-color</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">blue</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">style</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;card&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;card-header&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;title&quot;</span><span class="__shiki_140thh">&gt;默认标题&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;image&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_4-3-使用-css-自定义属性" tabindex="-1">4.3 使用 CSS 自定义属性 <a class="header-anchor" href="#_4-3-使用-css-自定义属性" aria-label="Permalink to &quot;4.3 使用 CSS 自定义属性&quot;">​</a></h3><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 组件内部 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">:host</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">  background-color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">var</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">--card-bg</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">#fff</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">  border-color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">var</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">--card-border-color</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">#ddd</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 外部全局样式 */</span></span>
<span class="line"><span class="__shiki_17hn0y">body</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  --card-bg</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#f5f5f5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  --card-border-color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#eee</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="五、插槽-slot-机制详解" tabindex="-1">五、插槽(Slot)机制详解 <a class="header-anchor" href="#五、插槽-slot-机制详解" aria-label="Permalink to &quot;五、插槽(Slot)机制详解&quot;">​</a></h2><h3 id="_5-1-基本插槽使用" tabindex="-1">5.1 基本插槽使用 <a class="header-anchor" href="#_5-1-基本插槽使用" aria-label="Permalink to &quot;5.1 基本插槽使用&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- Shadow DOM 模板 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;user-card&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;avatar&quot;</span><span class="__shiki_140thh">&gt;默认头像&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">div</span><span class="__shiki_1t8gfj"> class</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;info&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">&gt;未命名用户&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">div</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">&lt;!-- 使用组件 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">user-card</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">img</span><span class="__shiki_1t8gfj"> slot</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;avatar&quot;</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;user.jpg&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">span</span><span class="__shiki_1t8gfj"> slot</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">&gt;张三&lt;/</span><span class="__shiki_17hn0y">span</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">span</span><span class="__shiki_1t8gfj"> slot</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">&gt;zhangsan@example.com&lt;/</span><span class="__shiki_17hn0y">span</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">user-card</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_5-2-插槽高级用法" tabindex="-1">5.2 插槽高级用法 <a class="header-anchor" href="#_5-2-插槽高级用法" aria-label="Permalink to &quot;5.2 插槽高级用法&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 默认插槽（未命名）</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 后备内容（未提供内容时显示）</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;footer&quot;</span><span class="__shiki_140thh">&gt;默认页脚&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 多重插槽（相同名字）</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;extra-info&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_1t8gfj"> name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;extra-info&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt; </span><span class="__shiki_1itgoe">&lt;!--</span><span class="__shiki_140thh"> 相同内容会显示两次 </span><span class="__shiki_1itgoe">--&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 4. 插槽变化监听</span></span>
<span class="line"><span class="__shiki_140thh">shadowRoot.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;slotchange&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> slot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> e.target;</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (slot.name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;content&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;内容插槽已更新&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> nodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> slot.</span><span class="__shiki_1t8gfj">assignedNodes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理新节点...</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="六、事件处理与通信" tabindex="-1">六、事件处理与通信 <a class="header-anchor" href="#六、事件处理与通信" aria-label="Permalink to &quot;六、事件处理与通信&quot;">​</a></h2><h3 id="_6-1-事件穿透模型" tabindex="-1">6.1 事件穿透模型 <a class="header-anchor" href="#_6-1-事件穿透模型" aria-label="Permalink to &quot;6.1 事件穿透模型&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[Shadow DOM 内部] --&gt;|事件| B[Shadow Root]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C{composed?}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|true| D[穿透到 Light DOM]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|false| E[在 Shadow DOM 内处理]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F[外部 DOM]</span></span></code></pre></div><h3 id="_6-2-自定义事件配置" tabindex="-1">6.2 自定义事件配置 <a class="header-anchor" href="#_6-2-自定义事件配置" aria-label="Permalink to &quot;6.2 自定义事件配置&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建可穿透事件</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> event</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CustomEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;internal-action&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">  bubbles: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 冒泡通过 DOM</span></span>
<span class="line"><span class="__shiki_140thh">  composed: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,     </span><span class="__shiki_21nrsd">// 穿透 Shadow DOM 边界</span></span>
<span class="line"><span class="__shiki_140thh">  detail: {           </span><span class="__shiki_21nrsd">// 传递数据</span></span>
<span class="line"><span class="__shiki_140thh">    element: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 分发事件</span></span>
<span class="line"><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(event);</span></span></code></pre></div><h3 id="_6-3-事件重定向" tabindex="-1">6.3 事件重定向 <a class="header-anchor" href="#_6-3-事件重定向" aria-label="Permalink to &quot;6.3 事件重定向&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 在 Shadow DOM 内重定向事件</span></span>
<span class="line"><span class="__shiki_140thh">shadowRoot.</span><span class="__shiki_1t8gfj">querySelector</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;button&#39;</span><span class="__shiki_140thh">).</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">e</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 创建新事件并重新分发</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> newEvent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CustomEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;card-click&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">    bubbles: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    composed: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    detail: { originalEvent: e }</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_dzsirb">  this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(newEvent);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 阻止原始事件冒泡</span></span>
<span class="line"><span class="__shiki_140thh">  e.</span><span class="__shiki_1t8gfj">stopPropagation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="七、高级封装技巧" tabindex="-1">七、高级封装技巧 <a class="header-anchor" href="#七、高级封装技巧" aria-label="Permalink to &quot;七、高级封装技巧&quot;">​</a></h2><h3 id="_7-1-动态样式注入" tabindex="-1">7.1 动态样式注入 <a class="header-anchor" href="#_7-1-动态样式注入" aria-label="Permalink to &quot;7.1 动态样式注入&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ThemedComponent</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建可复用样式表</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._styleSheet </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> CSSStyleSheet</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._styleSheet.</span><span class="__shiki_1t8gfj">replaceSync</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      :host {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        display: block;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        background: var(--bg-color, white);</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加到 Shadow DOM</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.adoptedStyleSheets </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">._styleSheet];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setTheme</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">theme</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 动态更新样式</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">._styleSheet.</span><span class="__shiki_1t8gfj">replaceSync</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      :host {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        background: \${</span><span class="__shiki_140thh">theme</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">background</span><span class="__shiki_mdbnqw">};</span></span>
<span class="line"><span class="__shiki_mdbnqw">        color: \${</span><span class="__shiki_140thh">theme</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">text</span><span class="__shiki_mdbnqw">};</span></span>
<span class="line"><span class="__shiki_mdbnqw">        padding: \${</span><span class="__shiki_140thh">theme</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">spacing</span><span class="__shiki_mdbnqw">}px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-组合式-shadow-dom" tabindex="-1">7.2 组合式 Shadow DOM <a class="header-anchor" href="#_7-2-组合式-shadow-dom" aria-label="Permalink to &quot;7.2 组合式 Shadow DOM&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CompositeComponent</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 组合多个模板</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> headerTemplate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;header-tpl&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> bodyTemplate</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;body-tpl&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(headerTemplate.content.</span><span class="__shiki_1t8gfj">cloneNode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(bodyTemplate.content.</span><span class="__shiki_1t8gfj">cloneNode</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加样式</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> style</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">createElement</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;style&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    style.textContent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      /* 组件样式 */</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(style);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="八、性能优化策略" tabindex="-1">八、性能优化策略 <a class="header-anchor" href="#八、性能优化策略" aria-label="Permalink to &quot;八、性能优化策略&quot;">​</a></h2><h3 id="_8-1-shadow-dom-性能特点" tabindex="-1">8.1 Shadow DOM 性能特点 <a class="header-anchor" href="#_8-1-shadow-dom-性能特点" aria-label="Permalink to &quot;8.1 Shadow DOM 性能特点&quot;">​</a></h3><table tabindex="0"><thead><tr><th>操作</th><th>性能影响</th><th>优化建议</th></tr></thead><tbody><tr><td><strong>初始渲染</strong></td><td>中等开销</td><td>延迟加载非关键组件</td></tr><tr><td><strong>DOM 更新</strong></td><td>高效（子树隔离）</td><td>避免频繁修改 Shadow Root</td></tr><tr><td><strong>样式计算</strong></td><td>高效（作用域限制）</td><td>减少深层嵌套选择器</td></tr><tr><td><strong>事件处理</strong></td><td>高效（局部冒泡）</td><td>使用事件委托</td></tr></tbody></table><h3 id="_8-2-高效渲染模式" tabindex="-1">8.2 高效渲染模式 <a class="header-anchor" href="#_8-2-高效渲染模式" aria-label="Permalink to &quot;8.2 高效渲染模式&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OptimizedComponent</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 预定义静态模板</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;div id=&quot;container&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.container </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.shadowRoot.</span><span class="__shiki_1t8gfj">getElementById</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;container&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  set</span><span class="__shiki_1t8gfj"> data</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">items</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 高效批量更新（使用 DocumentFragment）</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fragment</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">createDocumentFragment</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    items.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> element</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> document.</span><span class="__shiki_1t8gfj">createElement</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;div&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      element.textContent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> item.name;</span></span>
<span class="line"><span class="__shiki_140thh">      fragment.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(element);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 单次 DOM 操作</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.container.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.container.</span><span class="__shiki_1t8gfj">appendChild</span><span class="__shiki_140thh">(fragment);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="九、调试与测试" tabindex="-1">九、调试与测试 <a class="header-anchor" href="#九、调试与测试" aria-label="Permalink to &quot;九、调试与测试&quot;">​</a></h2><h3 id="_9-1-chrome-开发者工具" tabindex="-1">9.1 Chrome 开发者工具 <a class="header-anchor" href="#_9-1-chrome-开发者工具" aria-label="Permalink to &quot;9.1 Chrome 开发者工具&quot;">​</a></h3><ol><li><p><strong>元素检查</strong>：</p><ul><li>启用 &quot;Show user agent shadow DOM&quot;</li><li>直接查看 Shadow DOM 结构</li></ul></li><li><p><strong>样式调试</strong>：</p><ul><li>查看作用域样式</li><li>调试 ::slotted 和 :host 规则</li></ul></li><li><p><strong>性能分析</strong>：</p><ul><li>单独分析 Shadow DOM 渲染性能</li><li>检测样式计算成本</li></ul></li></ol><h3 id="_9-2-单元测试策略" tabindex="-1">9.2 单元测试策略 <a class="header-anchor" href="#_9-2-单元测试策略" aria-label="Permalink to &quot;9.2 单元测试策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { fixture, expect } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@web/test-runner&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;ShadowComponent&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  it</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;正确渲染 Shadow DOM&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> el</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> fixture</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;shadow-component&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;span slot=&quot;content&quot;&gt;测试内容&lt;/span&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/shadow-component&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 访问 Shadow Root</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> shadow</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> el.shadowRoot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证内部元素</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> slot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> shadow.</span><span class="__shiki_1t8gfj">querySelector</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;slot[name=&quot;content&quot;]&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(slot).to.exist;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证投射内容</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> assignedNodes</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> slot.</span><span class="__shiki_1t8gfj">assignedNodes</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(assignedNodes[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].textContent).to.</span><span class="__shiki_1t8gfj">equal</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;测试内容&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h2 id="十、实际应用案例" tabindex="-1">十、实际应用案例 <a class="header-anchor" href="#十、实际应用案例" aria-label="Permalink to &quot;十、实际应用案例&quot;">​</a></h2><h3 id="_10-1-可复用模态框组件" tabindex="-1">10.1 可复用模态框组件 <a class="header-anchor" href="#_10-1-可复用模态框组件" aria-label="Permalink to &quot;10.1 可复用模态框组件&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ModalDialog</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.shadowRoot.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          display: none;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          position: fixed;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          top: 0;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          left: 0;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          width: 100%;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          height: 100%;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          background: rgba(0,0,0,0.5);</span></span>
<span class="line"><span class="__shiki_mdbnqw">          z-index: 1000;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        .dialog {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          position: absolute;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          top: 50%;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          left: 50%;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          transform: translate(-50%, -50%);</span></span>
<span class="line"><span class="__shiki_mdbnqw">          background: white;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          padding: 20px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          border-radius: 8px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          min-width: 300px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        .close {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          position: absolute;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          top: 10px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          right: 10px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          cursor: pointer;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;div class=&quot;dialog&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;slot name=&quot;header&quot;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;slot name=&quot;content&quot;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;div class=&quot;close&quot;&gt;×&lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.closeButton </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.shadowRoot.</span><span class="__shiki_1t8gfj">querySelector</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;.close&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.closeButton.</span><span class="__shiki_1t8gfj">addEventListener</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;click&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">close</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  open</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.style.display </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;block&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Event</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  close</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.style.display </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;none&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">dispatchEvent</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Event</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;close&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">customElements.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;modal-dialog&#39;</span><span class="__shiki_140thh">, ModalDialog);</span></span></code></pre></div><h3 id="_10-2-主题化按钮组件" tabindex="-1">10.2 主题化按钮组件 <a class="header-anchor" href="#_10-2-主题化按钮组件" aria-label="Permalink to &quot;10.2 主题化按钮组件&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ThemedButton</span><span class="__shiki_1itgoe"> extends</span><span class="__shiki_1t8gfj"> HTMLElement</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> get</span><span class="__shiki_1t8gfj"> observedAttributes</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;variant&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;size&#39;</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    super</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> shadow</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">attachShadow</span><span class="__shiki_140thh">({ mode: </span><span class="__shiki_mdbnqw">&#39;open&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    shadow.innerHTML </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          display: inline-block;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        button {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          border: none;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          border-radius: 4px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          padding: 8px 16px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          cursor: pointer;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          font-family: inherit;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          transition: all 0.2s;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        /* 变体样式 */</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host([variant=&quot;primary&quot;]) button {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          background: var(--primary-color, #007bff);</span></span>
<span class="line"><span class="__shiki_mdbnqw">          color: white;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host([variant=&quot;secondary&quot;]) button {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          background: var(--secondary-color, #6c757d);</span></span>
<span class="line"><span class="__shiki_mdbnqw">          color: white;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        /* 尺寸样式 */</span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host([size=&quot;small&quot;]) button {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          padding: 4px 8px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          font-size: 0.8rem;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        :host([size=&quot;large&quot;]) button {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          padding: 12px 24px;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          font-size: 1.2rem;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;button&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;slot&gt;&lt;/slot&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &lt;/button&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    \`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.button </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> shadow.</span><span class="__shiki_1t8gfj">querySelector</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;button&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  attributeChangedCallback</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">oldValue</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">newValue</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;variant&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> name </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;size&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.button.</span><span class="__shiki_1t8gfj">setAttribute</span><span class="__shiki_140thh">(name, newValue);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">customElements.</span><span class="__shiki_1t8gfj">define</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;themed-button&#39;</span><span class="__shiki_140thh">, ThemedButton);</span></span></code></pre></div><h2 id="十一、最佳实践与常见问题" tabindex="-1">十一、最佳实践与常见问题 <a class="header-anchor" href="#十一、最佳实践与常见问题" aria-label="Permalink to &quot;十一、最佳实践与常见问题&quot;">​</a></h2><h3 id="_11-1-最佳实践" tabindex="-1">11.1 最佳实践 <a class="header-anchor" href="#_11-1-最佳实践" aria-label="Permalink to &quot;11.1 最佳实践&quot;">​</a></h3><ol><li><strong>使用 open 模式</strong>：除非有特殊安全需求</li><li><strong>合理使用插槽</strong>：保持组件灵活性</li><li><strong>响应式设计</strong>：使用 CSS 媒体查询和自定义属性</li><li><strong>无障碍访问</strong>：添加 ARIA 属性和键盘支持</li><li><strong>性能优化</strong>：批量 DOM 操作，避免深层嵌套</li></ol><h3 id="_11-2-常见问题解决方案" tabindex="-1">11.2 常见问题解决方案 <a class="header-anchor" href="#_11-2-常见问题解决方案" aria-label="Permalink to &quot;11.2 常见问题解决方案&quot;">​</a></h3><table tabindex="0"><thead><tr><th>问题</th><th>解决方案</th></tr></thead><tbody><tr><td><strong>外部样式无法影响组件</strong></td><td>使用 CSS 自定义属性或 ::part</td></tr><tr><td><strong>组件内事件不冒泡</strong></td><td>设置 <code>composed: true</code></td></tr><tr><td><strong>插槽内容不显示</strong></td><td>检查 slot 名称匹配，确保内容有 slot 属性</td></tr><tr><td><strong>动态内容不渲染</strong></td><td>使用 slotchange 事件监听变化</td></tr><tr><td><strong>表单元素无法提交</strong></td><td>在组件内部使用原生表单元素</td></tr></tbody></table><h3 id="_11-3-未来发展方向" tabindex="-1">11.3 未来发展方向 <a class="header-anchor" href="#_11-3-未来发展方向" aria-label="Permalink to &quot;11.3 未来发展方向&quot;">​</a></h3><ol><li><p><strong>Declarative Shadow DOM</strong> (服务端渲染支持)</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">custom-element</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;</span><span class="__shiki_17hn0y">template</span><span class="__shiki_1t8gfj"> shadowroot</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;open&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">style</span><span class="__shiki_140thh">&gt;</span><span class="__shiki_21nrsd">/* 样式 */</span><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">style</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">slot</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  &lt;/</span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">  Light DOM 内容</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_17hn0y">custom-element</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div></li><li><p><strong>CSS Shadow Parts</strong> (增强样式控制)</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">custom-element</span><span class="__shiki_140thh">::part(</span><span class="__shiki_17hn0y">button</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">  background</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">purple</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li><li><p><strong>Custom States</strong> (自定义状态伪类)</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">:host</span><span class="__shiki_140thh">(:--loading) {</span></span>
<span class="line"><span class="__shiki_dzsirb">  opacity</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0.6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div></li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Shadow DOM 是现代 Web 组件化的核心技术，提供真正的样式和 DOM 封装：</p><ul><li><strong>核心优势</strong>：作用域隔离、样式封装、组件化</li><li><strong>关键机制</strong>：宿主元素、影子树、插槽系统</li><li><strong>开发模式</strong>：组件驱动、封装优先、接口设计</li><li><strong>适用场景</strong>：UI 组件库、第三方集成、复杂应用模块</li></ul><blockquote><p><strong>学习建议</strong>：从简单组件开始实践，逐步掌握插槽使用和样式封装技巧，结合 Custom Elements 创建完整 Web Components。使用开发者工具深入理解 Shadow DOM 的内部结构和事件流，最终构建出可维护、可复用且样式安全的组件体系。</p></blockquote>`,71)])])}const r=a(_,[["render",h]]);export{d as __pageData,r as default};
