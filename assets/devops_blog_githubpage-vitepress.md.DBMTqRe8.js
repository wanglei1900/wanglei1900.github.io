import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"🧊 GitHub Page 和 VitePress","description":"","frontmatter":{},"headers":[],"relativePath":"devops/blog/githubpage-vitepress.md","filePath":"devops/blog/githubpage-vitepress.md"}'),_={name:"devops/blog/githubpage-vitepress.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="🧊-github-page-和-vitepress" tabindex="-1">🧊 GitHub Page 和 VitePress <a class="header-anchor" href="#🧊-github-page-和-vitepress" aria-label="Permalink to &quot;🧊 GitHub Page 和 VitePress&quot;">​</a></h1><h2 id="🔩-1-vitepress-项目搭建" tabindex="-1">🔩 1 VitePress 项目搭建 <a class="header-anchor" href="#🔩-1-vitepress-项目搭建" aria-label="Permalink to &quot;🔩 1 VitePress 项目搭建&quot;">​</a></h2><h3 id="_1-1-博客源码-项目构建" tabindex="-1">1.1 博客源码 项目构建 <a class="header-anchor" href="#_1-1-博客源码-项目构建" aria-label="Permalink to &quot;1.1 博客源码 项目构建&quot;">​</a></h3><p><a href="https://vitejs.cn/vitepress/guide/getting-started" target="_blank" rel="noreferrer">📚 vitepress 文档 快速搭建</a></p><br><h3 id="_1-2-vitepress-项目目录" tabindex="-1">1.2 vitepress 项目目录 <a class="header-anchor" href="#_1-2-vitepress-项目目录" aria-label="Permalink to &quot;1.2 vitepress 项目目录&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">.</span></span>
<span class="line"><span class="__shiki_wvjl67">├─ docs                         根目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ├─ .vitepress                vitepress 文件夹</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └─ cache                  vitepress 缓存</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └─ dist                   vitepress 打包目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └─ public                 静态资源放入public不打包</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └─ config.mts             vitepress 配置文件</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ├─ api-examples.md</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ├─ markdown-examples.md</span></span>
<span class="line"><span class="__shiki_wvjl67">│  └─ index.md</span></span>
<span class="line"><span class="__shiki_wvjl67">└─ package.json</span></span></code></pre></div><br><h3 id="_1-3-创建github-io-仓库-作为-个人博客网站" tabindex="-1">1.3 创建github.io 仓库 作为 个人博客网站 <a class="header-anchor" href="#_1-3-创建github-io-仓库-作为-个人博客网站" aria-label="Permalink to &quot;1.3 创建github.io 仓库 作为 个人博客网站&quot;">​</a></h3><p>github.io 是github给广大程序员提供的 静态网站托管服务。</p><p><strong>创建github.io</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[GitHub新建仓库] --&gt; B[仓库名必须为 username.github.io &lt;br&gt; 仓库必须为public]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[进入仓库的 Setting 界面]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[左侧 Pages &lt;br&gt; 点击 visit site]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[修改 branch 为 gh-pages&lt;br&gt;新建发布分支]</span></span></code></pre></div><br><h3 id="_1-4-创建自动推送部署脚本" tabindex="-1">1.4 创建自动推送部署脚本 <a class="header-anchor" href="#_1-4-创建自动推送部署脚本" aria-label="Permalink to &quot;1.4 创建自动推送部署脚本&quot;">​</a></h3><h4 id="_1-4-1-自动脚本目录结构" tabindex="-1">1.4.1 自动脚本目录结构 <a class="header-anchor" href="#_1-4-1-自动脚本目录结构" aria-label="Permalink to &quot;1.4.1 自动脚本目录结构&quot;">​</a></h4><p>根目录下</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">.</span></span>
<span class="line"><span class="__shiki_wvjl67">├─ scripts/                     根目录</span></span>
<span class="line"><span class="__shiki_wvjl67">│  ├─ deployment/               部署脚本 文件夹</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └─ deploy.bat             windows 用 batch 脚本</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └─ deploy.sh              macos 用 shell 脚本</span></span>
<span class="line"><span class="__shiki_wvjl67">│  │  └─ deploy.js              node 统一调用 脚本</span></span>
<span class="line"><span class="__shiki_wvjl67">├──└─ readme.md                 说明（含部署命令）  </span></span>
<span class="line"><span class="__shiki_wvjl67">└─ package.json                 直接运行node自动部署搅拌额</span></span></code></pre></div><br><h4 id="_1-4-2-windows-用-batch-脚本" tabindex="-1">1.4.2 windows 用 batch 脚本 <a class="header-anchor" href="#_1-4-2-windows-用-batch-脚本" aria-label="Permalink to &quot;1.4.2 windows 用 batch 脚本&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># scripts/deployment/deploy.bat</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@echo</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_mdbnqw"> 仅用于快速提交和推送代码，触发</span><span class="__shiki_mdbnqw"> GitHub</span><span class="__shiki_mdbnqw"> Actions</span></span>
<span class="line"><span class="__shiki_1t8gfj">setlocal</span><span class="__shiki_mdbnqw"> enabledelayedexpansion</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_mdbnqw"> &quot;info=&gt;&gt;&gt;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_mdbnqw"> &quot;error=!!!&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_mdbnqw"> &quot;notice=***&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> ======================================</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   GITHUB</span><span class="__shiki_mdbnqw"> ACTIONS</span><span class="__shiki_mdbnqw"> SCRIPTS</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   Version:</span><span class="__shiki_dzsirb"> 1.0</span><span class="__shiki_140thh"> (Windows </span><span class="__shiki_mdbnqw">Edition</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   开始时间:</span><span class="__shiki_mdbnqw"> %date%</span><span class="__shiki_mdbnqw"> %time%</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> ======================================</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">1]</span><span class="__shiki_mdbnqw"> 验证</span><span class="__shiki_mdbnqw"> Git</span><span class="__shiki_mdbnqw"> 安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">1]</span><span class="__shiki_mdbnqw"> 检查</span><span class="__shiki_mdbnqw"> Git</span><span class="__shiki_mdbnqw"> 可用性...</span></span>
<span class="line"><span class="__shiki_1t8gfj">where</span><span class="__shiki_mdbnqw"> git</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">nul</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> %ERRORLEVEL%</span><span class="__shiki_mdbnqw"> neq</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !error!</span><span class="__shiki_mdbnqw"> ERROR:</span><span class="__shiki_mdbnqw"> Git</span><span class="__shiki_mdbnqw"> 未安装或未在</span><span class="__shiki_mdbnqw"> PATH</span><span class="__shiki_mdbnqw"> 中配置</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 解决方案:</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     1.</span><span class="__shiki_mdbnqw"> 从</span><span class="__shiki_mdbnqw"> https://git-scm.com/downloads</span><span class="__shiki_mdbnqw"> 安装</span><span class="__shiki_mdbnqw"> Git</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     2.</span><span class="__shiki_mdbnqw"> 确保安装时选择</span><span class="__shiki_mdbnqw"> &#39;Add Git to PATH&#39;</span><span class="__shiki_mdbnqw"> 选项</span></span>
<span class="line"><span class="__shiki_1t8gfj">    timeout</span><span class="__shiki_mdbnqw"> /t</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_mdbnqw"> /b</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> Git</span><span class="__shiki_mdbnqw"> 已安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_dzsirb"> --version</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> find</span><span class="__shiki_mdbnqw"> /v</span><span class="__shiki_mdbnqw"> &quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">2]</span><span class="__shiki_mdbnqw"> 验证</span><span class="__shiki_mdbnqw"> Git</span><span class="__shiki_mdbnqw"> 仓库</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">2]</span><span class="__shiki_mdbnqw"> 检查当前目录是否为</span><span class="__shiki_mdbnqw"> Git</span><span class="__shiki_mdbnqw"> 仓库...</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> rev-parse</span><span class="__shiki_dzsirb"> --is-inside-work-tree</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> %ERRORLEVEL%</span><span class="__shiki_mdbnqw"> neq</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !error!</span><span class="__shiki_mdbnqw"> ERROR:</span><span class="__shiki_mdbnqw"> 当前目录不是</span><span class="__shiki_mdbnqw"> Git</span><span class="__shiki_mdbnqw"> 仓库</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 解决方案:</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     1.</span><span class="__shiki_mdbnqw"> 确保在项目根目录运行此脚本</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     2.</span><span class="__shiki_mdbnqw"> 运行</span><span class="__shiki_mdbnqw"> &#39;git init&#39;</span><span class="__shiki_mdbnqw"> 初始化仓库</span></span>
<span class="line"><span class="__shiki_1t8gfj">    timeout</span><span class="__shiki_mdbnqw"> /t</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_mdbnqw"> /b</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 位于有效的</span><span class="__shiki_mdbnqw"> Git</span><span class="__shiki_mdbnqw"> 仓库中</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">3]</span><span class="__shiki_mdbnqw"> 检查网络连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">3]</span><span class="__shiki_mdbnqw"> 测试</span><span class="__shiki_mdbnqw"> GitHub</span><span class="__shiki_mdbnqw"> 连接性...</span></span>
<span class="line"><span class="__shiki_1t8gfj">ping</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw"> github.com</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> %ERRORLEVEL%</span><span class="__shiki_mdbnqw"> neq</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !error!</span><span class="__shiki_mdbnqw"> ERROR:</span><span class="__shiki_mdbnqw"> 无法连接</span><span class="__shiki_mdbnqw"> GitHub</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 解决方案:</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     1.</span><span class="__shiki_mdbnqw"> 检查网络连接</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     2.</span><span class="__shiki_mdbnqw"> 确保没有被防火墙阻止</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     3.</span><span class="__shiki_mdbnqw"> 尝试</span><span class="__shiki_mdbnqw"> ping</span><span class="__shiki_mdbnqw"> github.com</span><span class="__shiki_mdbnqw"> 手动测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">    timeout</span><span class="__shiki_mdbnqw"> /t</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_mdbnqw"> /b</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> GitHub</span><span class="__shiki_mdbnqw"> 连接正常</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">4]</span><span class="__shiki_mdbnqw"> 提交更改</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">4]</span><span class="__shiki_mdbnqw"> 提交所有更改...</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> .</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> commit</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> &quot;自动提交以触发部署&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> %ERRORLEVEL%</span><span class="__shiki_mdbnqw"> equ</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 更改已成功提交</span></span>
<span class="line"><span class="__shiki_140thh">) else (</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 无更改可提交</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> 跳过推送</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> ======================================</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">   INFO:</span><span class="__shiki_mdbnqw"> 没有需要部署的新更改</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">   结束时间:</span><span class="__shiki_mdbnqw"> %date%</span><span class="__shiki_mdbnqw"> %time%</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> ======================================</span></span>
<span class="line"><span class="__shiki_1t8gfj">    timeout</span><span class="__shiki_mdbnqw"> /t</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_mdbnqw"> /b</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">5]</span><span class="__shiki_mdbnqw"> 推送代码</span></span>
<span class="line"><span class="__shiki_1t8gfj">REM</span><span class="__shiki_dzsirb"> ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_140thh"> [STEP </span><span class="__shiki_mdbnqw">5]</span><span class="__shiki_mdbnqw"> 推送代码到</span><span class="__shiki_mdbnqw"> GitHub...</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> push</span><span class="__shiki_mdbnqw"> origin</span><span class="__shiki_mdbnqw"> master</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> %ERRORLEVEL%</span><span class="__shiki_mdbnqw"> neq</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !error!</span><span class="__shiki_mdbnqw"> ERROR:</span><span class="__shiki_mdbnqw"> 代码推送失败</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 解决方案:</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     1.</span><span class="__shiki_mdbnqw"> 检查网络连接</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     2.</span><span class="__shiki_mdbnqw"> 验证</span><span class="__shiki_mdbnqw"> GitHub</span><span class="__shiki_mdbnqw"> 访问权限</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw">     3.</span><span class="__shiki_mdbnqw"> 尝试手动运行</span><span class="__shiki_mdbnqw"> &#39;git push&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    timeout</span><span class="__shiki_mdbnqw"> /t</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_mdbnqw"> /b</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">.</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> ======================================</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   SUCCESS:</span><span class="__shiki_mdbnqw"> 部署已触发</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   代码已推送到</span><span class="__shiki_mdbnqw"> GitHub</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   GitHub</span><span class="__shiki_mdbnqw"> Actions</span><span class="__shiki_mdbnqw"> 将自动构建和部署</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   结束时间:</span><span class="__shiki_mdbnqw"> %date%</span><span class="__shiki_mdbnqw"> %time%</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> ======================================</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 注意:</span><span class="__shiki_mdbnqw"> 部署过程通常需要</span><span class="__shiki_mdbnqw"> 2-5</span><span class="__shiki_mdbnqw"> 分钟完成</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> !info!</span><span class="__shiki_mdbnqw"> 您可以在</span><span class="__shiki_mdbnqw"> GitHub</span><span class="__shiki_mdbnqw"> Actions</span><span class="__shiki_mdbnqw"> 标签页查看进度</span></span>
<span class="line"><span class="__shiki_1t8gfj">timeout</span><span class="__shiki_mdbnqw"> /t</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw">nul</span></span></code></pre></div><br><h4 id="_1-4-3-macos-用-shell-脚本" tabindex="-1">1.4.3 macos 用 shell 脚本 <a class="header-anchor" href="#_1-4-3-macos-用-shell-脚本" aria-label="Permalink to &quot;1.4.3 macos 用 shell 脚本&quot;">​</a></h4><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># scripts/deployment/deploy.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/sh</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> ======================================</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   GITHUB</span><span class="__shiki_mdbnqw"> ACTIONS</span><span class="__shiki_mdbnqw"> SCRIPTS</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   Version:</span><span class="__shiki_dzsirb"> 1.0</span><span class="__shiki_140thh"> (Unix </span><span class="__shiki_mdbnqw">Edition</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw">   开始时间:</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> ======================================</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义输出函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">print_info</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;&gt;&gt;&gt; </span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">print_error</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;!!! </span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">print_solution</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> solution </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$@</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;  * </span><span class="__shiki_140thh">$solution</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_21nrsd"># [STEP 1] 验证 Git 安装</span></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;[STEP 1] 检查 Git 可用性...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_dzsirb"> command</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> git</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_error</span><span class="__shiki_mdbnqw"> &quot;ERROR: Git 未安装或未在 PATH 中配置&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_solution</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;1. 使用包管理器安装 Git：&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;   Ubuntu/Debian: sudo apt install git&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;   CentOS/RHEL: sudo yum install git&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;   macOS: brew install git&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;2. 确保 Git 已添加到 PATH 环境变量&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">print_info</span><span class="__shiki_mdbnqw"> &quot;Git 已安装&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_dzsirb"> --version</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_21nrsd"># [STEP 2] 验证 Git 仓库</span></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;[STEP 2] 检查当前目录是否为 Git 仓库...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj"> git</span><span class="__shiki_mdbnqw"> rev-parse</span><span class="__shiki_dzsirb"> --is-inside-work-tree</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_error</span><span class="__shiki_mdbnqw"> &quot;ERROR: 当前目录不是 Git 仓库&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_solution</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;1. 确保在项目根目录运行此脚本&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;2. 运行 &#39;git init&#39; 初始化仓库&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"><span class="__shiki_1t8gfj">print_info</span><span class="__shiki_mdbnqw"> &quot;位于有效的 Git 仓库中&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_21nrsd"># [STEP 3] 检查网络连接</span></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;[STEP 3] 测试 GitHub 连接性...&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj"> ping</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw"> github.com</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_error</span><span class="__shiki_mdbnqw"> &quot;ERROR: 无法连接 GitHub&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_solution</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;1. 检查网络连接&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;2. 确保没有被防火墙阻止&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;3. 尝试 ping github.com 手动测试&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"><span class="__shiki_1t8gfj">print_info</span><span class="__shiki_mdbnqw"> &quot;GitHub 连接正常&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_21nrsd"># [STEP 4] 提交更改</span></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;[STEP 4] 提交所有更改...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> .</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查是否有更改可提交</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> git</span><span class="__shiki_mdbnqw"> diff-index</span><span class="__shiki_dzsirb"> --quiet</span><span class="__shiki_mdbnqw"> HEAD</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_info</span><span class="__shiki_mdbnqw"> &quot;无更改可提交 - 跳过推送&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;======================================&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;  提示: 没有需要部署的新更改&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;  结束时间: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;======================================&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 执行提交</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> commit</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> &quot;自动提交以触发部署&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_dzsirb">$?</span><span class="__shiki_1itgoe"> -ne</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_error</span><span class="__shiki_mdbnqw"> &quot;ERROR: 提交更改时出错&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_solution</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;1. 检查 Git 状态 (git status)&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;2. 验证 Git 配置 (git config user.email)&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;3. 检查是否有未跟踪的大文件&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"><span class="__shiki_1t8gfj">print_info</span><span class="__shiki_mdbnqw"> &quot;更改已成功提交&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_21nrsd"># [STEP 5] 推送代码</span></span>
<span class="line"><span class="__shiki_21nrsd"># ---------------------------------------</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;[STEP 5] 推送代码到 GitHub...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> push</span><span class="__shiki_mdbnqw"> origin</span><span class="__shiki_mdbnqw"> master</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_dzsirb">$?</span><span class="__shiki_1itgoe"> -ne</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_error</span><span class="__shiki_mdbnqw"> &quot;ERROR: 代码推送失败&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    print_solution</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;1. 检查网络连接&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;2. 验证 GitHub 访问权限&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;3. 尝试手动运行 &#39;git push&#39;&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;4. 检查是否有未提交的更改&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;======================================&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  SUCCESS: 部署已触发&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  代码已推送到 GitHub&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  GitHub Actions 将自动构建和部署&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;  结束时间: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;======================================&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">print_info</span><span class="__shiki_mdbnqw"> &quot;注意: 部署过程通常需要 2-5 分钟完成&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">print_info</span><span class="__shiki_mdbnqw"> &quot;您可以在 GitHub Actions 标签页查看进度&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_dzsirb"> 5</span></span></code></pre></div><br><h4 id="_1-4-4-node-脚本统一调用" tabindex="-1">1.4.4 node 脚本统一调用 <a class="header-anchor" href="#_1-4-4-node-脚本统一调用" aria-label="Permalink to &quot;1.4.4 node 脚本统一调用&quot;">​</a></h4><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// scripts/deployment/deploy.js</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">execSync</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;child_process&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;path&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fs&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 获取当前脚本所在的目录</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> scriptDir</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> __dirname;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> isWindows</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.platform </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;win32&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`&gt;&gt;&gt; 部署脚本目录: \${</span><span class="__shiki_140thh">scriptDir</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`&gt;&gt;&gt; 操作系统: \${</span><span class="__shiki_140thh">process</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">platform</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`&gt;&gt;&gt; 准备部署在 \${</span><span class="__shiki_140thh">isWindows</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;Windows&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;Unix&#39;}...\`</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (isWindows) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Windows 执行 .bat 文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> batPath</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(scriptDir, </span><span class="__shiki_mdbnqw">&#39;deploy.bat&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`&gt;&gt;&gt; [WIN] 执行脚本路径: \${</span><span class="__shiki_140thh">batPath</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    execSync</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`&quot;\${</span><span class="__shiki_140thh">batPath</span><span class="__shiki_mdbnqw">}&quot;\`</span><span class="__shiki_140thh">, { stdio: </span><span class="__shiki_mdbnqw">&#39;inherit&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Unix 执行 .sh 文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> shPath</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> path.</span><span class="__shiki_1t8gfj">join</span><span class="__shiki_140thh">(scriptDir, </span><span class="__shiki_mdbnqw">&#39;deploy.sh&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`&gt;&gt;&gt; [UNIX] 执行脚本路径: \${</span><span class="__shiki_140thh">shPath</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 确保有执行权限</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      fs.</span><span class="__shiki_1t8gfj">accessSync</span><span class="__shiki_140thh">(shPath, fs.constants.</span><span class="__shiki_dzsirb">X_OK</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;&gt;&gt;&gt; [Permission] 添加执行权限...&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      fs.</span><span class="__shiki_1t8gfj">chmodSync</span><span class="__shiki_140thh">(shPath, </span><span class="__shiki_dzsirb">0o755</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// rwxr-xr-x</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    execSync</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`sh &quot;\${</span><span class="__shiki_140thh">shPath</span><span class="__shiki_mdbnqw">}&quot;\`</span><span class="__shiki_140thh">, { stdio: </span><span class="__shiki_mdbnqw">&#39;inherit&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;&gt;&gt;&gt; SUCCESS: 部署成功完成!&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;!!! ERROR: 部署失败!&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`!!! Details: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  process.</span><span class="__shiki_1t8gfj">exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><br><br><h2 id="🔑-2-本地生成-推送私钥-和-部署公钥" tabindex="-1">🔑 2 本地生成 推送私钥 和 部署公钥 <a class="header-anchor" href="#🔑-2-本地生成-推送私钥-和-部署公钥" aria-label="Permalink to &quot;🔑 2 本地生成 推送私钥 和 部署公钥&quot;">​</a></h2><h3 id="_2-1-图解-github-secrets-安全工作流" tabindex="-1">2.1 图解 GitHub Secrets 安全工作流 <a class="header-anchor" href="#_2-1-图解-github-secrets-安全工作流" aria-label="Permalink to &quot;2.1 图解 GitHub Secrets 安全工作流&quot;">​</a></h3><p><strong>安全的工作流程</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[本地生成密钥对] --&gt; B[公钥添加到目标仓库]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[私钥存入GitHub Secrets]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[在.gitignore忽略密钥文件]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[工作流从Secrets读取]</span></span></code></pre></div><p><strong>操作安全是如何保证的</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TB</span></span>
<span class="line"><span class="__shiki_140thh">    subgraph 安全边界</span></span>
<span class="line"><span class="__shiki_140thh">        A[开发者机器] -- 密钥生成 --&gt; B[本地文件系统]</span></span>
<span class="line"><span class="__shiki_140thh">        B -- 复制内容 --&gt; C[GitHub Secrets]</span></span>
<span class="line"><span class="__shiki_140thh">        B -- 文件路径 --&gt; D[.gitignore]</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    C -- 加密引用 --&gt; E[GitHub Actions]</span></span></code></pre></div><br><h3 id="_2-2-生成公钥和私钥" tabindex="-1">2.2 生成公钥和私钥 <a class="header-anchor" href="#_2-2-生成公钥和私钥" aria-label="Permalink to &quot;2.2 生成公钥和私钥&quot;">​</a></h3><p>以linux/macos 为示例，windows同理，区别就是权限之类的东西</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 进入ssh安全目录</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> ~/.ssh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 不用输入密码直接回车跳过</span></span>
<span class="line"><span class="__shiki_1t8gfj">ssh-keygen</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> ed25519</span><span class="__shiki_dzsirb"> -C</span><span class="__shiki_mdbnqw"> &quot;actions@github&quot;</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> github-actions-deploy_blog</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置严格权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">chmod</span><span class="__shiki_dzsirb"> 700</span><span class="__shiki_mdbnqw"> ~/.ssh</span></span>
<span class="line"><span class="__shiki_1t8gfj">chmod</span><span class="__shiki_dzsirb"> 600</span><span class="__shiki_mdbnqw"> ~/.ssh/github-actions-deploy_blog</span></span>
<span class="line"><span class="__shiki_1t8gfj">chmod</span><span class="__shiki_dzsirb"> 644</span><span class="__shiki_mdbnqw"> ~/.ssh/github-actions-deploy_blog.pub</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 测试连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">ssh</span><span class="__shiki_dzsirb"> -T</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> github-actions-deploy</span><span class="__shiki_mdbnqw"> git@github.com</span></span></code></pre></div><ul><li>私钥文件 github-actions-deploy ：</li><li>公钥文件 github-actions-deploy.pub ：644权限（所有者读写，其他人只读）</li></ul><p>测试连接：成功后输出 Hi username/username.github.io! You&#39;ve successfully authenticated...</p><br><h3 id="_2-3-私钥存储注意事项" tabindex="-1">2.3 私钥存储注意事项 <a class="header-anchor" href="#_2-3-私钥存储注意事项" aria-label="Permalink to &quot;2.3 私钥存储注意事项&quot;">​</a></h3><p><strong>秘钥存储位置</strong></p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[生成密钥对] --&gt; B[公钥添加到目标仓库]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[私钥安全存储]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[GitHub Secrets]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; E[本地安全位置]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; F[密码管理器]</span></span></code></pre></div><ol><li>专用 SSH 目录（最佳）</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">~</span><span class="__shiki_140thh">/.ssh/  </span><span class="__shiki_21nrsd"># 专用子目录（仅示例），权限700</span></span></code></pre></div><ol start="2"><li>系统密钥管理器</li></ol><ul><li>macOS: 钥匙串访问</li><li>Windows: 证书管理器</li><li>Linux: GNOME Keyring/KWallet</li></ul><ol start="3"><li>加密密码管理器</li></ol><ul><li>1Password</li><li>Bitwarden</li><li>KeePassXC</li></ul><ol start="4"><li>加密外部存储</li></ol><ul><li>加密 U 盘</li><li>VeraCrypt 加密容器</li></ul><br><h3 id="_2-4-gitignore-增加密钥文件防止提交" tabindex="-1">2.4 .gitignore 增加密钥文件防止提交 <a class="header-anchor" href="#_2-4-gitignore-增加密钥文件防止提交" aria-label="Permalink to &quot;2.4 .gitignore 增加密钥文件防止提交&quot;">​</a></h3><p>私钥不允许放在项目目录下，以免提交到远端仓库造成安全问题</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">github-actions-deploy*</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">.key</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">.pem</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">_deploy</span></span>
<span class="line"><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">_private</span></span></code></pre></div><br><br><h2 id="🔐-在-github-上的配置-secrets-私钥和-deploy公钥" tabindex="-1">🔐 在 GitHub 上的配置 Secrets 私钥和 Deploy公钥 <a class="header-anchor" href="#🔐-在-github-上的配置-secrets-私钥和-deploy公钥" aria-label="Permalink to &quot;🔐 在 GitHub 上的配置 Secrets 私钥和 Deploy公钥&quot;">​</a></h2><h3 id="_3-1-目标仓库-username-github-io" tabindex="-1">3.1 目标仓库 (username.github.io) <a class="header-anchor" href="#_3-1-目标仓库-username-github-io" aria-label="Permalink to &quot;3.1 目标仓库 (username.github.io)&quot;">​</a></h3><ul><li><p>步骤顺序： 目标仓库首页 → Settings → Deploy keys → Add deploy key</p></li><li><p>填写 Title: ACTIONS_DEPLOYER</p></li><li><p>填写 Key: 粘贴 公钥 内容（从 github-actions-deploy.pub 公钥文件）</p></li><li><p>勾选 Allow write access 权限</p></li></ul><br><h3 id="_3-2-源码仓库-blog" tabindex="-1">3.2 源码仓库 (blog) <a class="header-anchor" href="#_3-2-源码仓库-blog" aria-label="Permalink to &quot;3.2 源码仓库  (blog)&quot;">​</a></h3><ul><li><p>步骤顺序： 源码仓库首页 → Settings → Secrets and variables → Actions → New repository secret</p></li><li><p>填写 Name: DEPLOY_KEY</p></li><li><p>填写 Secret: 粘贴 私钥 完整内容（从 github-actions-deploy 私钥文件，包括 BEGIN/END 标记）</p></li></ul><br><br><h2 id="🤖-4-github-actions-工作流" tabindex="-1">🤖 4 GitHub Actions 工作流 <a class="header-anchor" href="#🤖-4-github-actions-工作流" aria-label="Permalink to &quot;🤖 4 GitHub Actions 工作流&quot;">​</a></h2><p>通过创建 GitHub Actions 的钩子来触发源码仓库的推送，来进行打包并部署到目标仓库（username.github.io）</p><div class="language-yml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 文件路径 .github/workflows.deploy.yml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 工作流名称：构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy VitePress to External Repo</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 触发条件</span></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 当推送到 master 分支时触发</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">master</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 允许从 GitHub Actions 页面手动触发此工作流</span></span>
<span class="line"><span class="__shiki_17hn0y">  workflow_dispatch</span><span class="__shiki_140thh">:</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 权限设置</span></span>
<span class="line"><span class="__shiki_17hn0y">permissions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 授予工作流推送代码的权限（跨仓库部署需要）</span></span>
<span class="line"><span class="__shiki_17hn0y">  contents</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 并发控制设置</span></span>
<span class="line"><span class="__shiki_17hn0y">concurrency</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 使用相同的并发组名，确保同一时间只有一个部署运行</span></span>
<span class="line"><span class="__shiki_17hn0y">  group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pages</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 不取消正在进行的运行，允许现有部署完成</span></span>
<span class="line"><span class="__shiki_17hn0y">  cancel-in-progress</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 任务定义</span></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 构建工作</span></span>
<span class="line"><span class="__shiki_17hn0y">  build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 任务名称</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build VitePress Site</span></span>
<span class="line"><span class="__shiki_17hn0y">    env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      NODE_OPTIONS</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;--max-old-space-size=6144&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 运行环境</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 任务输出定义（用于后续任务的条件判断）</span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 构建状态输出，来自 build_verification 步骤</span></span>
<span class="line"><span class="__shiki_17hn0y">      build_status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.build_verification.outputs.status }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    # 构建任务的步骤</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤1: 检出源代码</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Checkout Source Code</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">checkout</span><span class="__shiki_21nrsd">                                      # 步骤唯一标识符</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span><span class="__shiki_21nrsd">                         # 使用官方检出action</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fetch-depth</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">                                  # 获取完整历史记录（用于VitePress的lastUpdated功能）</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">source</span><span class="__shiki_21nrsd">                                    # 指定检出到 source 目录，保持工作区整洁</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤2: 配置环境变量</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Configure Environment</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">env_setup</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;NODE_VERSION=20&quot; &gt;&gt; $GITHUB_ENV</span><span class="__shiki_21nrsd">        # 设置Node.js版本环境变量，便于后续引用</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤3: 安装PNPM包管理器</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup pnpm</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pnpm_setup</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pnpm/action-setup@v3</span><span class="__shiki_21nrsd">                         # 官方Node.js安装action</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">9</span><span class="__shiki_21nrsd">                                       # 安装稳定版9</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤4: 设置Node.js环境</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node_setup</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span><span class="__shiki_21nrsd">                        # 官方Node.js安装action</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ env.NODE_VERSION }}</span><span class="__shiki_21nrsd">            # 使用前面设置的Node版本</span></span>
<span class="line"><span class="__shiki_17hn0y">          cache</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pnpm</span><span class="__shiki_21nrsd">                                      # 启用PNPM缓存加速后续安装</span></span>
<span class="line"><span class="__shiki_17hn0y">          cache-dependency-path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;source/pnpm-lock.yaml&#39;</span><span class="__shiki_21nrsd">   # 指定 lock 文件位置，防止actions报错</span></span>
<span class="line"><span class="__shiki_17hn0y">          registry-url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://registry.npmmirror.com/</span><span class="__shiki_21nrsd">    # 使用国内npm镜像源加速安装</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤5: 安装项目依赖</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install Dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dependency_install</span></span>
<span class="line"><span class="__shiki_17hn0y">        working-directory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./source</span><span class="__shiki_21nrsd">                        # 在source目录下执行命令</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Installing dependencies...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 使用--frozen-lockfile确保依赖版本与lock文件一致</span></span>
<span class="line"><span class="__shiki_mdbnqw">          pnpm install --no-frozen-lockfile  # 允许生成新 lock 文件，更新依赖后使用</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # pnpm install --frozen-lockfile</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Dependencies installed successfully&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤7: 构建项目</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build with VitePress</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build_vitepress</span></span>
<span class="line"><span class="__shiki_17hn0y">        working-directory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./source</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Starting build process...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 执行VitePress构建命令</span></span>
<span class="line"><span class="__shiki_mdbnqw">          pnpm run docs:build</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Build completed successfully&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤6: 验证构建输出</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Verify Build Output</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build_verification</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 检查构建输出目录是否存在</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ -d &quot;source/docs/.vitepress/dist&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;Build output directory exists&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 设置成功状态输出</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;status=success&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">          else</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 输出错误信息（在GitHub UI中高亮显示）</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;::error::Build output directory not found!&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 设置失败状态输出</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;status=failure&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 退出并标记步骤失败</span></span>
<span class="line"><span class="__shiki_mdbnqw">            exit 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤7: 上传构建产物</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload Build Artifact</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">upload_artifact</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 仅在构建验证成功时执行</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">steps.build_verification.outputs.status == &#39;success&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">site-dist</span><span class="__shiki_21nrsd">                                 # 工件名称</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">source/docs/.vitepress/dist</span><span class="__shiki_21nrsd">               # 要上传的路径（构建输出目录）</span></span>
<span class="line"><span class="__shiki_17hn0y">          retention-days</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">                               # 工件保留时间（1天后自动删除）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤8: 清理工作空间</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cleanup Workspace</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cleanup_build</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 无论构建成功与否都执行清理</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Cleaning up workspace...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 删除node_modules目录节省空间</span></span>
<span class="line"><span class="__shiki_mdbnqw">          rm -rf source/node_modules</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Workspace cleanup completed&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 部署任务：将构建产物推送到目标仓库</span></span>
<span class="line"><span class="__shiki_17hn0y">  deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy to GitHub Pages</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 依赖构建任务</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 仅在构建成功时执行</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">needs.build.outputs.build_status == &#39;success&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    # 部署任务的步骤</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤1: 下载构建产物</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Download Build Artifact</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">download_artifact</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/download-artifact@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          # 要下载的工件名称</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">site-dist</span></span>
<span class="line"><span class="__shiki_21nrsd">          # 下载到dist目录</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dist</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤2: 验证工件内容</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Verify Artifact Content</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">verify_artifact</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 检查下载的目录是否存在</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ ! -d &quot;dist&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;::error::Artifact directory not found!&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            exit 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 计算目录中的文件数量</span></span>
<span class="line"><span class="__shiki_mdbnqw">          file_count=$(find dist -type f | wc -l)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 验证文件数量是否合理（至少5个文件）</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ &quot;$file_count&quot; -lt 5 ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;::error::Insufficient files in artifact ($file_count)&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            exit 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Artifact verified with $file_count files&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤3: 配置Git身份，配置跨仓库推送权限</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Configure Git Identity</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">git_config</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 设置Git用户名（使用GitHub Actions标识）</span></span>
<span class="line"><span class="__shiki_mdbnqw">          git config --global user.name &quot;GitHub Actions&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 设置Git邮箱（使用GitHub提供的noreply邮箱）</span></span>
<span class="line"><span class="__shiki_mdbnqw">          git config --global user.email &quot;actions@users.noreply.github.com&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 禁用主机密钥检查（避免首次连接时的确认提示）</span></span>
<span class="line"><span class="__shiki_mdbnqw">          git config --global core.sshCommand &quot;ssh -o StrictHostKeyChecking=no&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤4: 部署到GitHub Pages</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy to GitHub Pages</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy_pages</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">peaceiris/actions-gh-pages@v3</span><span class="__shiki_21nrsd">                           # 使用第三方action进行GitHub Pages部署</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          deploy_key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.DEPLOY_KEY }}</span><span class="__shiki_21nrsd">                       # 使用存储在Secrets中的SSH部署密钥</span></span>
<span class="line"><span class="__shiki_17hn0y">          external_repository</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">wanglei1900/wanglei1900.github.io</span><span class="__shiki_21nrsd">      # 目标仓库（格式：用户名/仓库名）</span></span>
<span class="line"><span class="__shiki_17hn0y">          publish_branch</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gh-pages</span><span class="__shiki_21nrsd">                                    # 目标分支（GitHub Pages使用的分支）</span></span>
<span class="line"><span class="__shiki_17hn0y">          publish_dir</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./dist</span><span class="__shiki_21nrsd">                                         # 要部署的目录（包含构建产物的目录）</span></span>
<span class="line"><span class="__shiki_17hn0y">          keep_files</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">                                           # 完全覆盖目标分支（删除旧文件）</span></span>
<span class="line"><span class="__shiki_17hn0y">          destination_dir</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">.</span><span class="__shiki_21nrsd">                                          # 部署到根目录</span></span>
<span class="line"><span class="__shiki_17hn0y">          force_orphan</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">                                          # 强制清空历史（创建孤立提交）</span></span>
<span class="line"><span class="__shiki_17hn0y">          allow_empty_commit</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">                                   # 禁止空提交（没有变更时不提交）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤5: 验证部署</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Verify Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">verify_deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 输出部署完成时间和访问链接</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Deployment completed at $(date)&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Check site at: https://wanglei1900.github.io&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">      # 步骤6: 部署后清理</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Post-Deployment Cleanup</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cleanup_deploy</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 无论部署成功与否都执行清理</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 删除下载的构建产物</span></span>
<span class="line"><span class="__shiki_mdbnqw">          rm -rf dist</span></span></code></pre></div><br><br><h2 id="🧩-5-其他" tabindex="-1">🧩 5 其他 <a class="header-anchor" href="#🧩-5-其他" aria-label="Permalink to &quot;🧩 5 其他&quot;">​</a></h2><p>构建产物 .nojekyll 文件由vitepress自动创建，用于告诉 GitHub Pages 不要使用 Jekyll 构建您的站点。以下是详细解释：</p>`,73)])])}const b=a(_,[["render",l]]);export{o as __pageData,b as default};
