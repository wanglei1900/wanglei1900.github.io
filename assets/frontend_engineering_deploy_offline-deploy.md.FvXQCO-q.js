import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const _="/img/engineering/pkg-SEA-Single-Executable-Applications.png",g=JSON.parse('{"title":"vite 静态离线无服务器部署 方案","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/engineering/deploy/offline-deploy.md","filePath":"frontend/engineering/deploy/offline-deploy.md"}'),l={name:"frontend/engineering/deploy/offline-deploy.md"};function h(e,s,t,c,o,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="vite-静态离线无服务器部署-方案" tabindex="-1">vite 静态离线无服务器部署 方案 <a class="header-anchor" href="#vite-静态离线无服务器部署-方案" aria-label="Permalink to &quot;vite 静态离线无服务器部署 方案&quot;">​</a></h1><h2 id="第一、第二种方案" tabindex="-1">第一、第二种方案 <a class="header-anchor" href="#第一、第二种方案" aria-label="Permalink to &quot;第一、第二种方案&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">  import</span><span class="__shiki_140thh"> path </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;path&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  import</span><span class="__shiki_140thh"> { defineConfig } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;vite&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  import</span><span class="__shiki_140thh"> vue </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@vitejs/plugin-vue&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  import</span><span class="__shiki_140thh"> vueJsx </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@vitejs/plugin-vue-jsx&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  import</span><span class="__shiki_140thh"> { viteSingleFile } </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;vite-plugin-singlefile&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  import</span><span class="__shiki_140thh"> legacy </span><span class="__shiki_1itgoe">from</span><span class="__shiki_mdbnqw"> &quot;@vitejs/plugin-legacy&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 基于不可控远端的vite项目离线部署的多种方式</span></span>
<span class="line"><span class="__shiki_21nrsd">  /* 把所有资源打包在一个index.html 体积较大 */</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> SingleConfig</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> defineConfig</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    resolve: {</span></span>
<span class="line"><span class="__shiki_140thh">      alias: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          find: </span><span class="__shiki_mdbnqw">&quot;@&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          replacement: path.</span><span class="__shiki_1t8gfj">resolve</span><span class="__shiki_140thh">(dirname, </span><span class="__shiki_mdbnqw">&quot;./src&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    plugins: [</span><span class="__shiki_1t8gfj">vue</span><span class="__shiki_140thh">(), </span><span class="__shiki_1t8gfj">vueJsx</span><span class="__shiki_140thh">(), </span><span class="__shiki_1t8gfj">vitesingleFile</span><span class="__shiki_140thh">()]</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用webpack那种引入方式，不用type=module</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> LegacyConfig</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> defineConfig</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    base:</span><span class="__shiki_mdbnqw">&quot;./&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    resolve: {</span></span>
<span class="line"><span class="__shiki_140thh">      alias: [</span></span>
<span class="line"><span class="__shiki_140thh">        {</span></span>
<span class="line"><span class="__shiki_140thh">          find: </span><span class="__shiki_mdbnqw">&quot;@&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          replacement: path.</span><span class="__shiki_1t8gfj">resolve</span><span class="__shiki_140thh">(dirname, </span><span class="__shiki_mdbnqw">&quot;./src&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      ]</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    plugins: [</span><span class="__shiki_1t8gfj">vue</span><span class="__shiki_140thh">(), </span><span class="__shiki_1t8gfj">vueJsx</span><span class="__shiki_140thh">(), </span><span class="__shiki_1t8gfj">legacy</span><span class="__shiki_140thh">({targets:[</span><span class="__shiki_mdbnqw">&quot;defaults&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_mdbnqw">&quot;not IE 11&quot;</span><span class="__shiki_140thh">]})]</span></span>
<span class="line"><span class="__shiki_140thh">  })</span></span></code></pre></div><h2 id="第三种方案" tabindex="-1">第三种方案 <a class="header-anchor" href="#第三种方案" aria-label="Permalink to &quot;第三种方案&quot;">​</a></h2><p>pkg SEA Single Executable Applications <img src="`+_+'" alt="" loading="lazy"></p>',5)])])}const d=a(l,[["render",h]]);export{g as __pageData,d as default};
