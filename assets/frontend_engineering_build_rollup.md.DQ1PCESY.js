import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Rollup 打包优化学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/engineering/build/rollup.md","filePath":"frontend/engineering/build/rollup.md"}'),_={name:"frontend/engineering/build/rollup.md"};function l(h,s,t,e,c,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="rollup-打包优化学习笔记" tabindex="-1">Rollup 打包优化学习笔记 <a class="header-anchor" href="#rollup-打包优化学习笔记" aria-label="Permalink to &quot;Rollup 打包优化学习笔记&quot;">​</a></h1><h2 id="rollup-核心概念" tabindex="-1">Rollup 核心概念 <a class="header-anchor" href="#rollup-核心概念" aria-label="Permalink to &quot;Rollup 核心概念&quot;">​</a></h2><h3 id="rollup-的优势" tabindex="-1">Rollup 的优势 <a class="header-anchor" href="#rollup-的优势" aria-label="Permalink to &quot;Rollup 的优势&quot;">​</a></h3><ul><li><strong>Tree-shaking</strong>：自动移除未使用代码</li><li><strong>ESM 原生支持</strong>：基于 ES 模块标准</li><li><strong>轻量输出</strong>：生成更小的 bundle</li><li><strong>高度可配置</strong>：丰富的插件系统</li></ul><h3 id="基本配置文件" tabindex="-1">基本配置文件 <a class="header-anchor" href="#基本配置文件" aria-label="Permalink to &quot;基本配置文件&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// rollup.config.js</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  input: </span><span class="__shiki_mdbnqw">&#39;src/main.js&#39;</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 入口文件</span></span>
<span class="line"><span class="__shiki_140thh">  output: {</span></span>
<span class="line"><span class="__shiki_140thh">    file: </span><span class="__shiki_mdbnqw">&#39;bundle.js&#39;</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 输出文件</span></span>
<span class="line"><span class="__shiki_140thh">    format: </span><span class="__shiki_mdbnqw">&#39;esm&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 输出格式 (esm, cjs, iife, umd)</span></span>
<span class="line"><span class="__shiki_140thh">    sourcemap: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">          // 生成 sourcemap</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: []                </span><span class="__shiki_21nrsd">// 插件数组</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="核心优化策略" tabindex="-1">核心优化策略 <a class="header-anchor" href="#核心优化策略" aria-label="Permalink to &quot;核心优化策略&quot;">​</a></h2><h3 id="_1-tree-shaking-深度优化" tabindex="-1">1. Tree-Shaking 深度优化 <a class="header-anchor" href="#_1-tree-shaking-深度优化" aria-label="Permalink to &quot;1. Tree-Shaking 深度优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 配置示例</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ...</span></span>
<span class="line"><span class="__shiki_140thh">  treeshake: {</span></span>
<span class="line"><span class="__shiki_140thh">    moduleSideEffects: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 安全地假设模块无副作用</span></span>
<span class="line"><span class="__shiki_140thh">    propertyReadSideEffects: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    tryCatchDeoptimization: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><p><strong>优化技巧</strong>：</p><ul><li>使用 <code>/*#__PURE__*/</code> 标记无副作用函数</li><li>避免模块级副作用代码</li><li>使用 <code>sideEffects: false</code> 在 package.json</li></ul><h3 id="_2-代码分割与动态导入" tabindex="-1">2. 代码分割与动态导入 <a class="header-anchor" href="#_2-代码分割与动态导入" aria-label="Permalink to &quot;2. 代码分割与动态导入&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 动态导入示例</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> loadComponent</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_1itgoe"> import</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./heavy-module.js&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 配置代码分割</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  input: [</span><span class="__shiki_mdbnqw">&#39;src/main.js&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;src/admin.js&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">  output: {</span></span>
<span class="line"><span class="__shiki_140thh">    dir: </span><span class="__shiki_mdbnqw">&#39;dist&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    format: </span><span class="__shiki_mdbnqw">&#39;esm&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    chunkFileNames: </span><span class="__shiki_mdbnqw">&#39;[name]-[hash].js&#39;</span><span class="__shiki_21nrsd"> // 分割块命名</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-依赖优化" tabindex="-1">3. 依赖优化 <a class="header-anchor" href="#_3-依赖优化" aria-label="Permalink to &quot;3. 依赖优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 排除不需要打包的依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  external: [</span><span class="__shiki_mdbnqw">&#39;react&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;react-dom&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_21nrsd">// 外部化依赖</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  output: {</span></span>
<span class="line"><span class="__shiki_140thh">    globals: {</span></span>
<span class="line"><span class="__shiki_140thh">      react: </span><span class="__shiki_mdbnqw">&#39;React&#39;</span><span class="__shiki_21nrsd"> // 提供全局变量名</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><p><strong>优化技巧</strong>：</p><ul><li>使用 <code>rollup-plugin-node-externals</code> 自动外部化依赖</li><li>优先使用 ESM 格式的依赖包</li></ul><h2 id="性能优化技巧" tabindex="-1">性能优化技巧 <a class="header-anchor" href="#性能优化技巧" aria-label="Permalink to &quot;性能优化技巧&quot;">​</a></h2><h3 id="_1-构建速度优化" tabindex="-1">1. 构建速度优化 <a class="header-anchor" href="#_1-构建速度优化" aria-label="Permalink to &quot;1. 构建速度优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// rollup.config.js</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> typescript </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@rollup/plugin-typescript&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    typescript</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 禁用类型检查（在开发流程中单独进行）</span></span>
<span class="line"><span class="__shiki_140thh">      transpileOnly: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><p><strong>加速策略</strong>：</p><ul><li>使用 <code>rollup-plugin-cache</code> 缓存结果</li><li>减少插件数量（仅保留必需插件）</li><li>并行化处理（<code>rollup-plugin-parallel</code>）</li></ul><h3 id="_2-输出文件优化" tabindex="-1">2. 输出文件优化 <a class="header-anchor" href="#_2-输出文件优化" aria-label="Permalink to &quot;2. 输出文件优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { terser } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;rollup-plugin-terser&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> gzipPlugin </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;rollup-plugin-gzip&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    terser</span><span class="__shiki_140thh">(),        </span><span class="__shiki_21nrsd">// 代码压缩</span></span>
<span class="line"><span class="__shiki_1t8gfj">    gzipPlugin</span><span class="__shiki_140thh">(),    </span><span class="__shiki_21nrsd">// Gzip 压缩</span></span>
<span class="line"><span class="__shiki_1t8gfj">    brotli</span><span class="__shiki_140thh">()         </span><span class="__shiki_21nrsd">// Brotli 压缩</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-按需加载策略" tabindex="-1">3. 按需加载策略 <a class="header-anchor" href="#_3-按需加载策略" aria-label="Permalink to &quot;3. 按需加载策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 rollup-plugin-virtual 创建虚拟模块</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> virtual </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@rollup/plugin-virtual&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    virtual</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;dynamic-loader&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">        export function load(modulePath) {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          return import(/* webpackChunkName: &quot;[request]&quot; */ modulePath);</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      \`</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="高级优化插件" tabindex="-1">高级优化插件 <a class="header-anchor" href="#高级优化插件" aria-label="Permalink to &quot;高级优化插件&quot;">​</a></h2><h3 id="_1-依赖分析" tabindex="-1">1. 依赖分析 <a class="header-anchor" href="#_1-依赖分析" aria-label="Permalink to &quot;1. 依赖分析&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> visualizer </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;rollup-plugin-visualizer&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    visualizer</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      open: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,       </span><span class="__shiki_21nrsd">// 完成后自动打开报告</span></span>
<span class="line"><span class="__shiki_140thh">      template: </span><span class="__shiki_mdbnqw">&#39;sunburst&#39;</span><span class="__shiki_21nrsd"> // 图表类型</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_2-图片优化" tabindex="-1">2. 图片优化 <a class="header-anchor" href="#_2-图片优化" aria-label="Permalink to &quot;2. 图片优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> image </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@rollup/plugin-image&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> svgr </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@svgr/rollup&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    image</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    svgr</span><span class="__shiki_140thh">() </span><span class="__shiki_21nrsd">// SVG 转 React 组件</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-polyfill-智能引入" tabindex="-1">3. Polyfill 智能引入 <a class="header-anchor" href="#_3-polyfill-智能引入" aria-label="Permalink to &quot;3. Polyfill 智能引入&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> inject </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@rollup/plugin-inject&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    inject</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      Promise: [</span><span class="__shiki_mdbnqw">&#39;es6-promise&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Promise&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      fetch: [</span><span class="__shiki_mdbnqw">&#39;whatwg-fetch&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;fetch&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="最佳实践配置示例" tabindex="-1">最佳实践配置示例 <a class="header-anchor" href="#最佳实践配置示例" aria-label="Permalink to &quot;最佳实践配置示例&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 高级优化配置</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> resolve </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@rollup/plugin-node-resolve&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> commonjs </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@rollup/plugin-commonjs&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> babel </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@rollup/plugin-babel&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { terser } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;rollup-plugin-terser&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> analyze </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;rollup-plugin-analyzer&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  input: </span><span class="__shiki_mdbnqw">&#39;src/index.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  output: [</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      file: </span><span class="__shiki_mdbnqw">&#39;dist/bundle.esm.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      format: </span><span class="__shiki_mdbnqw">&#39;esm&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      sourcemap: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    {</span></span>
<span class="line"><span class="__shiki_140thh">      file: </span><span class="__shiki_mdbnqw">&#39;dist/bundle.cjs.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      format: </span><span class="__shiki_mdbnqw">&#39;cjs&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      sourcemap: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    resolve</span><span class="__shiki_140thh">(), </span><span class="__shiki_21nrsd">// 解析 node_modules 模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">    commonjs</span><span class="__shiki_140thh">(), </span><span class="__shiki_21nrsd">// 转换 CommonJS 模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">    babel</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      babelHelpers: </span><span class="__shiki_mdbnqw">&#39;bundled&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      exclude: </span><span class="__shiki_mdbnqw">&#39;node_modules/**&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      presets: [</span><span class="__shiki_mdbnqw">&#39;@babel/preset-env&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    terser</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      compress: {</span></span>
<span class="line"><span class="__shiki_140thh">        pure_funcs: [</span><span class="__shiki_mdbnqw">&#39;console.debug&#39;</span><span class="__shiki_140thh">] </span><span class="__shiki_21nrsd">// 移除调试日志</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    analyze</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      summaryOnly: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 显示摘要统计</span></span>
<span class="line"><span class="__shiki_140thh">      limit: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd"> // 显示最大的10个模块</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ],</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 高级 Tree-shaking 配置</span></span>
<span class="line"><span class="__shiki_140thh">  treeshake: {</span></span>
<span class="line"><span class="__shiki_140thh">    annotations: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">    moduleSideEffects</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_ghujbu">\\.</span><span class="__shiki_21q97f">css</span><span class="__shiki_1itgoe">$</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">test</span><span class="__shiki_140thh">(id),</span></span>
<span class="line"><span class="__shiki_140thh">    propertyReadSideEffects: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="性能优化对比" tabindex="-1">性能优化对比 <a class="header-anchor" href="#性能优化对比" aria-label="Permalink to &quot;性能优化对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>优化策略</th><th>构建时间减少</th><th>输出大小减少</th><th>实现复杂度</th></tr></thead><tbody><tr><td>Tree-shaking 深度配置</td><td>⚡ 10-20%</td><td>📦 15-30%</td><td>⭐⭐</td></tr><tr><td>依赖外部化</td><td>⚡ 30-50%</td><td>📦 40-70%</td><td>⭐</td></tr><tr><td>并行构建</td><td>⚡ 40-60%</td><td>-</td><td>⭐⭐</td></tr><tr><td>缓存机制</td><td>⚡ 70-90%</td><td>-</td><td>⭐</td></tr><tr><td>代码压缩</td><td>-</td><td>📦 60-80%</td><td>⭐</td></tr><tr><td>Gzip/Brotli</td><td>-</td><td>📦 额外70-90%</td><td>⭐</td></tr></tbody></table><h2 id="常见问题解决方案" tabindex="-1">常见问题解决方案 <a class="header-anchor" href="#常见问题解决方案" aria-label="Permalink to &quot;常见问题解决方案&quot;">​</a></h2><h3 id="_1-循环依赖问题" tabindex="-1">1. 循环依赖问题 <a class="header-anchor" href="#_1-循环依赖问题" aria-label="Permalink to &quot;1. 循环依赖问题&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用 rollup-plugin-dependency-graph 分析</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> depGraph </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;rollup-plugin-dependency-graph&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    depGraph</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      output: </span><span class="__shiki_mdbnqw">&#39;dependency-graph.json&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_2-大文件拆分策略" tabindex="-1">2. 大文件拆分策略 <a class="header-anchor" href="#_2-大文件拆分策略" aria-label="Permalink to &quot;2. 大文件拆分策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 手动代码分割</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  output: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    manualChunks</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">id</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (id.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;node_modules&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;vendor&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (id.</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;utils&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_mdbnqw"> &#39;utils&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-css-优化处理" tabindex="-1">3. CSS 优化处理 <a class="header-anchor" href="#_3-css-优化处理" aria-label="Permalink to &quot;3. CSS 优化处理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> postcss </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;rollup-plugin-postcss&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    postcss</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      extract: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 提取 CSS 文件</span></span>
<span class="line"><span class="__shiki_140thh">      minimize: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      modules: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// CSS 模块化</span></span>
<span class="line"><span class="__shiki_140thh">      plugins: [</span><span class="__shiki_1t8gfj">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;autoprefixer&#39;</span><span class="__shiki_140thh">)]</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="rollup-与-webpack-对比" tabindex="-1">Rollup 与 Webpack 对比 <a class="header-anchor" href="#rollup-与-webpack-对比" aria-label="Permalink to &quot;Rollup 与 Webpack 对比&quot;">​</a></h2><table tabindex="0"><thead><tr><th>特性</th><th>Rollup</th><th>Webpack</th></tr></thead><tbody><tr><td>打包目标</td><td>库/组件</td><td>应用程序</td></tr><tr><td>Tree-shaking</td><td>优秀</td><td>良好</td></tr><tr><td>输出大小</td><td>更小</td><td>稍大</td></tr><tr><td>配置复杂度</td><td>中等</td><td>较高</td></tr><tr><td>HMR 支持</td><td>需要插件</td><td>原生支持</td></tr><tr><td>代码分割</td><td>支持</td><td>优秀</td></tr><tr><td>生态系统</td><td>丰富</td><td>非常丰富</td></tr></tbody></table><h2 id="未来趋势" tabindex="-1">未来趋势 <a class="header-anchor" href="#未来趋势" aria-label="Permalink to &quot;未来趋势&quot;">​</a></h2><h3 id="_1-原生-esm-输出" tabindex="-1">1. 原生 ESM 输出 <a class="header-anchor" href="#_1-原生-esm-输出" aria-label="Permalink to &quot;1. 原生 ESM 输出&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 现代浏览器支持</span></span>
<span class="line"><span class="__shiki_1t8gfj">output</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  format</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;esm&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1t8gfj">  esModule</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-webassembly-集成" tabindex="-1">2. WebAssembly 集成 <a class="header-anchor" href="#_2-webassembly-集成" aria-label="Permalink to &quot;2. WebAssembly 集成&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> wasm </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;@rollup/plugin-wasm&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    wasm</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-构建缓存持久化" tabindex="-1">3. 构建缓存持久化 <a class="header-anchor" href="#_3-构建缓存持久化" aria-label="Permalink to &quot;3. 构建缓存持久化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { persistentCache } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;rollup-plugin-persistent-cache&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  plugins: [</span></span>
<span class="line"><span class="__shiki_1t8gfj">    persistentCache</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      cacheDir: </span><span class="__shiki_mdbnqw">&#39;.rollup_cache&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    })</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">  A[入口文件] --&gt; B[解析模块]</span></span>
<span class="line"><span class="__shiki_140thh">  B --&gt; C[Tree-shaking]</span></span>
<span class="line"><span class="__shiki_140thh">  C --&gt; D[代码转换]</span></span>
<span class="line"><span class="__shiki_140thh">  D --&gt; E[依赖优化]</span></span>
<span class="line"><span class="__shiki_140thh">  E --&gt; F[代码分割]</span></span>
<span class="line"><span class="__shiki_140thh">  F --&gt; G[压缩输出]</span></span>
<span class="line"><span class="__shiki_140thh">  G --&gt; H[分析报告]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  C --&gt;|未使用代码| I[移除]</span></span>
<span class="line"><span class="__shiki_140thh">  E --&gt;|外部依赖| J[排除]</span></span>
<span class="line"><span class="__shiki_140thh">  F --&gt;|动态导入| K[生成分块]</span></span></code></pre></div><blockquote><p><strong>最佳实践总结</strong>：Rollup 优化的核心在于 <strong>Tree-shaking 深度利用</strong>、<strong>智能依赖管理</strong>和<strong>输出文件优化</strong>。针对库开发优先选择 Rollup，结合插件系统实现极致优化。定期使用分析工具检测包内容，保持配置简洁高效，才能在现代前端工程中发挥最大价值。</p></blockquote>`,55)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
