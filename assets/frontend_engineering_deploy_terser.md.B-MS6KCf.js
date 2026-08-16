import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"【性能优化】Terser压缩js代码","description":"","frontmatter":{},"headers":[],"relativePath":"frontend/engineering/deploy/terser.md","filePath":"frontend/engineering/deploy/terser.md"}'),_={name:"frontend/engineering/deploy/terser.md"};function t(l,s,e,h,c,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="【性能优化】terser压缩js代码" tabindex="-1">【性能优化】Terser压缩js代码 <a class="header-anchor" href="#【性能优化】terser压缩js代码" aria-label="Permalink to &quot;【性能优化】Terser压缩js代码&quot;">​</a></h1><p><a href="https://webpack.docschina.org/plugins/terser-webpack-plugin/" target="_blank" rel="noreferrer">📚 webpack v5 terser插件 文档</a></p><h2 id="代码" tabindex="-1">代码 <a class="header-anchor" href="#代码" aria-label="Permalink to &quot;代码&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">	// vue-cli是默认开启Terser的，webpack则需要手动开启</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> TerserWebpackPlugin</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;terser-webpack-plugin&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // ...</span></span>
<span class="line"><span class="__shiki_140thh">  optimization: {</span></span>
<span class="line"><span class="__shiki_140thh">    minimize: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    minimizer: [</span></span>
<span class="line"><span class="__shiki_1itgoe">			new</span><span class="__shiki_1t8gfj"> TerserWebpackPlugin</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_21nrsd">				// test: /\\.js(\\?.*)?$/i,</span><span class="__shiki_21nrsd"> //用来匹配需要压缩的文件，默认所有js文件</span></span>
<span class="line"><span class="__shiki_21nrsd">				// include: /\\/includes/,</span><span class="__shiki_21nrsd"> //匹配参与压缩的文件。</span></span>
<span class="line"><span class="__shiki_21nrsd">				// exclude: /\\/excludes/,</span><span class="__shiki_21nrsd"> //匹配不需要压缩的文件</span></span>
<span class="line"><span class="__shiki_140thh">				cache: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//降版本后添加</span></span>
<span class="line"><span class="__shiki_140thh">				sourceMap: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//降版本后添加</span></span>
<span class="line"><span class="__shiki_140thh">				parallel: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//使用多进程并发运行以提高构建速度。 并发运行的默认数量： os.cpus().length - 1 。</span></span>
<span class="line"><span class="__shiki_140thh">				extractComments: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//是否将注释剥离到单独的文件中,默认值： true</span></span>
<span class="line"><span class="__shiki_140thh">				terserOptions: {</span></span>
<span class="line"><span class="__shiki_140thh">					ecma: </span><span class="__shiki_dzsirb">undefined</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					warnings: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					parse: {},</span></span>
<span class="line"><span class="__shiki_140thh">					compress: {</span></span>
<span class="line"><span class="__shiki_140thh">						drop_console: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">						drop_debugger: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">						pure_funcs: [</span><span class="__shiki_mdbnqw">&quot;console.log&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_21nrsd">// 移除console</span></span>
<span class="line"><span class="__shiki_140thh">					}</span></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"><span class="__shiki_140thh">			})</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="打包产物分析" tabindex="-1">打包产物分析 <a class="header-anchor" href="#打包产物分析" aria-label="Permalink to &quot;打包产物分析&quot;">​</a></h2><p>以下仅为测试Terser压缩（不分包不使用gzip）,大文件的压缩率看来在30%-50%之间。</p><ul><li>开启Terser压缩前，打包产物体积为 79.1 M。 <ul><li>入口文件 app.js 6391 kb。</li><li>最大依赖 monaco-editor 4173 kb。</li></ul></li><li>开启Terser压缩后，打包产物体积为 60.0 M。 <ul><li>入口文件 app.js 2953 kb。</li><li>最大依赖 monaco-editor 1555 kb。</li></ul></li></ul>`,7)])])}const d=a(_,[["render",t]]);export{o as __pageData,d as default};
