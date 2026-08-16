import{_ as l,r as e,o as _,c as t,a as n,f as h,w as c,b as a,d as i}from"./app.DkoUFz-u.js";const v=JSON.parse('{"title":"🕰️ VitePress 时间线插件完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/blog/timeline.md","filePath":"devops/blog/timeline.md"}'),o={name:"devops/blog/timeline.md"};function k(d,s,r,m,u,b){const p=e("PluginTabs");return _(),t("div",null,[s[1]||(s[1]=n(`<h1 id="🕰️-vitepress-时间线插件完全指南" tabindex="-1">🕰️ VitePress 时间线插件完全指南 <a class="header-anchor" href="#🕰️-vitepress-时间线插件完全指南" aria-label="Permalink to &quot;🕰️ VitePress 时间线插件完全指南&quot;">​</a></h1><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装命令</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> vitepress-markdown-timeline</span><span class="__shiki_dzsirb"> -D</span></span>
<span class="line"><span class="__shiki_21nrsd"># 或</span></span>
<span class="line"><span class="__shiki_1t8gfj">yarn</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> vitepress-markdown-timeline</span><span class="__shiki_dzsirb"> --dev</span></span></code></pre></div><h2 id="一、基础配置" tabindex="-1">一、基础配置 <a class="header-anchor" href="#一、基础配置" aria-label="Permalink to &quot;一、基础配置&quot;">​</a></h2><h3 id="时间线展示" tabindex="-1">时间线展示 <a class="header-anchor" href="#时间线展示" aria-label="Permalink to &quot;时间线展示&quot;">​</a></h3>`,4)),h(p,null,{default:c(()=>[...s[0]||(s[0]=[a("p",null,"@tab 渲染效果",-1),a("div",{class:"timeline-dot"},[a("span",{class:"timeline-dot-title"}),a("p",null,[i('::: timeline-item year=2023 month=Q1 icon="💡" '),a("strong",null,"概念设计"),a("br"),i(" 时间线插件原型构思")])],-1)])]),_:1}),s[2]||(s[2]=n(`<p>::: timeline-item year=2023 month=Q3 icon=&quot;🔧&quot; <strong>开发实现</strong><br> 核心功能开发完成 :::</p><p>::: timeline-item year=2024 month=Q1 icon=&quot;🚢&quot; <strong>正式发布</strong><br> v1.0 稳定版发布 ::: ::::</p><p>@tab 源代码</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">:::: timeline</span></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2023 month=Q1 icon=&quot;💡&quot;</span></span>
<span class="line"><span class="__shiki_28tyc3">**概念设计**</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">时间线插件原型构思</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2023 month=Q3 icon=&quot;🔧&quot;</span></span>
<span class="line"><span class="__shiki_28tyc3">**开发实现**</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">核心功能开发完成</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2024 month=Q1 icon=&quot;🚢&quot;</span></span>
<span class="line"><span class="__shiki_28tyc3">**正式发布**</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">v1.0 稳定版发布</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"><span class="__shiki_140thh">::::</span></span></code></pre></div><h3 id="_1-启用插件-docs-vitepress-config-js" tabindex="-1">1. 启用插件 (<code>docs/.vitepress/config.js</code>) <a class="header-anchor" href="#_1-启用插件-docs-vitepress-config-js" aria-label="Permalink to &quot;1. 启用插件 (\`docs/.vitepress/config.js\`)&quot;">​</a></h3><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> { defineConfig } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;vitepress&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> timeline </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &#39;vitepress-markdown-timeline&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_1itgoe"> default</span><span class="__shiki_1t8gfj"> defineConfig</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">  markdown: {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    config</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">md</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      md.</span><span class="__shiki_1t8gfj">use</span><span class="__shiki_140thh">(timeline)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">})</span></span></code></pre></div><h3 id="_2-创建时间线容器" tabindex="-1">2. 创建时间线容器 <a class="header-anchor" href="#_2-创建时间线容器" aria-label="Permalink to &quot;2. 创建时间线容器&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- 在任意.md文件中 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">:::: timeline</span></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2024</span></span>
<span class="line"><span class="__shiki_140thh">内容区域...</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"><span class="__shiki_140thh">::::</span></span></code></pre></div><h2 id="二、核心语法详解" tabindex="-1">二、核心语法详解 <a class="header-anchor" href="#二、核心语法详解" aria-label="Permalink to &quot;二、核心语法详解&quot;">​</a></h2><h3 id="_1-基础时间线" tabindex="-1">1. 基础时间线 <a class="header-anchor" href="#_1-基础时间线" aria-label="Permalink to &quot;1. 基础时间线&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">:::: timeline</span></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2023 month=6</span></span>
<span class="line"><span class="__shiki_28tyc3">**六月里程碑**</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">VitePress 1.0 正式发布</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2023 month=9</span></span>
<span class="line"><span class="__shiki_28tyc3">**九月更新**</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 新增暗黑模式支持  </span></span>
<span class="line"><span class="__shiki_1jdh33">-</span><span class="__shiki_140thh"> 优化移动端体验</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"><span class="__shiki_140thh">::::</span></span></code></pre></div><h3 id="_2-自定义时间点图标" tabindex="-1">2. 自定义时间点图标 <a class="header-anchor" href="#_2-自定义时间点图标" aria-label="Permalink to &quot;2. 自定义时间点图标&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">:::: timeline</span></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2025 icon=&quot;🚀&quot;</span></span>
<span class="line"><span class="__shiki_28tyc3">**技术突破**</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">量子计算原型机发布</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2026 icon=&quot;🌍&quot;</span></span>
<span class="line"><span class="__shiki_28tyc3">**生态合作**</span><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">全球开发者大会召开</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"><span class="__shiki_140thh">::::</span></span></code></pre></div><h3 id="_3-嵌套时间线" tabindex="-1">3. 嵌套时间线 <a class="header-anchor" href="#_3-嵌套时间线" aria-label="Permalink to &quot;3. 嵌套时间线&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">:::: timeline</span></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item year=2024</span></span>
<span class="line"><span class="__shiki_28tyc3">**年度计划**</span></span>
<span class="line"><span class="__shiki_140thh">:::: timeline</span></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item quarter=Q1</span></span>
<span class="line"><span class="__shiki_140thh">第一季度目标</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item quarter=Q2</span></span>
<span class="line"><span class="__shiki_140thh">第二季度目标</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"><span class="__shiki_140thh">::::</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"><span class="__shiki_140thh">::::</span></span></code></pre></div><h2 id="三、高级功能" tabindex="-1">三、高级功能 <a class="header-anchor" href="#三、高级功能" aria-label="Permalink to &quot;三、高级功能&quot;">​</a></h2><h3 id="_1-自定义样式-css-变量" tabindex="-1">1. 自定义样式 (CSS 变量) <a class="header-anchor" href="#_1-自定义样式-css-变量" aria-label="Permalink to &quot;1. 自定义样式 (CSS 变量)&quot;">​</a></h3><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* .vitepress/theme/custom.css */</span></span>
<span class="line"><span class="__shiki_1t8gfj">:root</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  --timeline-line-color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#3498db</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd">/* 时间线颜色 */</span></span>
<span class="line"><span class="__shiki_1jdh33">  --timeline-icon-size</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.8</span><span class="__shiki_1itgoe">rem</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd">/* 图标尺寸 */</span></span>
<span class="line"><span class="__shiki_1jdh33">  --timeline-content-bg</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#f8f9fa</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd">/* 内容背景 */</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">.dark</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1jdh33">  --timeline-line-color</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#9b59b6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1jdh33">  --timeline-content-bg</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">#2d3436</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-动态时间线-结合-vue" tabindex="-1">2. 动态时间线 (结合 Vue) <a class="header-anchor" href="#_2-动态时间线-结合-vue" aria-label="Permalink to &quot;2. 动态时间线 (结合 Vue)&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">\`\`\`vue</span></span>
<span class="line"><span class="__shiki_140thh">&lt;script setup&gt;</span></span>
<span class="line"><span class="__shiki_140thh">const events = [</span></span>
<span class="line"><span class="__shiki_140thh">  { year: 2023, month: &#39;Aug&#39;, title: &#39;项目启动&#39;, icon: &#39;🚦&#39; },</span></span>
<span class="line"><span class="__shiki_140thh">  { year: 2024, month: &#39;Mar&#39;, title: &#39;公测发布&#39;, icon: &#39;🎯&#39; }</span></span>
<span class="line"><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">:::: timeline</span></span>
<span class="line"><span class="__shiki_140thh">&lt;template v-for=&quot;event in events&quot;&gt;</span></span>
<span class="line"><span class="__shiki_140thh">::: timeline-item :year=&quot;event.year&quot; :month=&quot;event.month&quot; :icon=&quot;event.icon&quot;</span></span>
<span class="line"><span class="__shiki_140thh">**{{ event.title }}**  </span></span>
<span class="line"><span class="__shiki_140thh">详情描述...</span></span>
<span class="line"><span class="__shiki_140thh">:::</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/template&gt;</span></span>
<span class="line"><span class="__shiki_140thh">::::</span></span>
<span class="line"><span class="__shiki_140thh">\`\`\`</span></span></code></pre></div>`,20))])}const q=l(o,[["render",k]]);export{v as __pageData,q as default};
