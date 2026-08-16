import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Web服务器Apache模块开发指南学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/apache/modules.md","filePath":"devops/web-servers/apache/modules.md"}'),p={name:"devops/web-servers/apache/modules.md"};function l(h,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="web服务器apache模块开发指南学习笔记" tabindex="-1">Web服务器Apache模块开发指南学习笔记 <a class="header-anchor" href="#web服务器apache模块开发指南学习笔记" aria-label="Permalink to &quot;Web服务器Apache模块开发指南学习笔记&quot;">​</a></h1><h2 id="_1-apache模块开发基础" tabindex="-1">1. Apache模块开发基础 <a class="header-anchor" href="#_1-apache模块开发基础" aria-label="Permalink to &quot;1. Apache模块开发基础&quot;">​</a></h2><h3 id="_1-1-apache模块架构概述" tabindex="-1">1.1 Apache模块架构概述 <a class="header-anchor" href="#_1-1-apache模块架构概述" aria-label="Permalink to &quot;1.1 Apache模块架构概述&quot;">​</a></h3><h4 id="_1-1-1-模块化架构设计" tabindex="-1">1.1.1 模块化架构设计 <a class="header-anchor" href="#_1-1-1-模块化架构设计" aria-label="Permalink to &quot;1.1.1 模块化架构设计&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Apache核心 (httpd)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 核心功能 (内存管理、进程管理)</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 模块接口 (APR/API)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── 内容生成模块 (mod_cgi, mod_php)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── 认证授权模块 (mod_auth_basic)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── 输出过滤模块 (mod_deflate)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   ├── 输入过滤模块 (mod_ssl)</span></span>
<span class="line"><span class="__shiki_wvjl67">    │   └── 协议处理模块 (mod_http2)</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── MPM模块 (多处理模块)</span></span></code></pre></div><h4 id="_1-1-2-模块类型分类" tabindex="-1">1.1.2 模块类型分类 <a class="header-anchor" href="#_1-1-2-模块类型分类" aria-label="Permalink to &quot;1.1.2 模块类型分类&quot;">​</a></h4><table tabindex="0"><thead><tr><th>模块类型</th><th>功能</th><th>示例模块</th></tr></thead><tbody><tr><td><strong>内容生成器</strong></td><td>处理请求并生成响应内容</td><td>mod_cgi, mod_php</td></tr><tr><td><strong>认证模块</strong></td><td>验证用户身份</td><td>mod_auth_basic</td></tr><tr><td><strong>授权模块</strong></td><td>控制访问权限</td><td>mod_authz_core</td></tr><tr><td><strong>记录器模块</strong></td><td>日志记录</td><td>mod_log_config</td></tr><tr><td><strong>过滤器模块</strong></td><td>处理输入/输出流</td><td>mod_deflate, mod_ssl</td></tr><tr><td><strong>协议模块</strong></td><td>扩展HTTP协议</td><td>mod_http2</td></tr><tr><td><strong>元数据模块</strong></td><td>提供文件元信息</td><td>mod_mime</td></tr></tbody></table><h3 id="_1-2-开发环境搭建" tabindex="-1">1.2 开发环境搭建 <a class="header-anchor" href="#_1-2-开发环境搭建" aria-label="Permalink to &quot;1.2 开发环境搭建&quot;">​</a></h3><h4 id="_1-2-1-依赖安装" tabindex="-1">1.2.1 依赖安装 <a class="header-anchor" href="#_1-2-1-依赖安装" aria-label="Permalink to &quot;1.2.1 依赖安装&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Ubuntu/Debian</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> apache2-dev</span><span class="__shiki_mdbnqw"> build-essential</span><span class="__shiki_mdbnqw"> automake</span><span class="__shiki_mdbnqw"> autoconf</span><span class="__shiki_mdbnqw"> libtool</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> libapr1-dev</span><span class="__shiki_mdbnqw"> libaprutil1-dev</span><span class="__shiki_mdbnqw"> libpcre3-dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CentOS/RHEL</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> httpd-devel</span><span class="__shiki_mdbnqw"> apr-devel</span><span class="__shiki_mdbnqw"> apr-util-devel</span><span class="__shiki_mdbnqw"> pcre-devel</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum</span><span class="__shiki_mdbnqw"> groupinstall</span><span class="__shiki_mdbnqw"> &quot;Development Tools&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># macOS</span></span>
<span class="line"><span class="__shiki_1t8gfj">brew</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> apr</span><span class="__shiki_mdbnqw"> apr-util</span><span class="__shiki_mdbnqw"> pcre</span></span>
<span class="line"><span class="__shiki_1t8gfj">brew</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> httpd</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">apxs</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> CC</span><span class="__shiki_21nrsd">          # 查看C编译器</span></span>
<span class="line"><span class="__shiki_1t8gfj">apxs</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> INCLUDEDIR</span><span class="__shiki_21nrsd">  # 查看包含目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">apxs</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> LIBEXECDIR</span><span class="__shiki_21nrsd">  # 查看模块目录</span></span></code></pre></div><h4 id="_1-2-2-开发工具链" tabindex="-1">1.2.2 开发工具链 <a class="header-anchor" href="#_1-2-2-开发工具链" aria-label="Permalink to &quot;1.2.2 开发工具链&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. APXS (Apache扩展工具)</span></span>
<span class="line"><span class="__shiki_21nrsd"># 编译、安装、测试模块</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. Apache Portable Runtime (APR)</span></span>
<span class="line"><span class="__shiki_21nrsd"># 跨平台抽象层，提供：</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 内存管理</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 文件I/O</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 网络操作</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 线程/进程</span></span>
<span class="line"><span class="__shiki_21nrsd"># - 数据结构</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Apache配置系统</span></span>
<span class="line"><span class="__shiki_21nrsd"># 用于模块配置指令解析</span></span></code></pre></div><h2 id="_2-apache模块结构详解" tabindex="-1">2. Apache模块结构详解 <a class="header-anchor" href="#_2-apache模块结构详解" aria-label="Permalink to &quot;2. Apache模块结构详解&quot;">​</a></h2><h3 id="_2-1-模块数据结构" tabindex="-1">2.1 模块数据结构 <a class="header-anchor" href="#_2-1-模块数据结构" aria-label="Permalink to &quot;2.1 模块数据结构&quot;">​</a></h3><h4 id="_2-1-1-基本模块结构" tabindex="-1">2.1.1 基本模块结构 <a class="header-anchor" href="#_2-1-1-基本模块结构" aria-label="Permalink to &quot;2.1.1 基本模块结构&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 模块定义结构体 */</span></span>
<span class="line"><span class="__shiki_140thh">module AP_MODULE_DECLARE_DATA my_module </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    STANDARD20_MODULE_STUFF,</span><span class="__shiki_21nrsd">          /* 标准宏，Apache 2.0+ */</span></span>
<span class="line"><span class="__shiki_140thh">    create_my_dir_config,</span><span class="__shiki_21nrsd">             /* 创建目录配置 */</span></span>
<span class="line"><span class="__shiki_140thh">    merge_my_dir_config,</span><span class="__shiki_21nrsd">              /* 合并目录配置 */</span></span>
<span class="line"><span class="__shiki_140thh">    create_my_server_config,</span><span class="__shiki_21nrsd">         /* 创建服务器配置 */</span></span>
<span class="line"><span class="__shiki_140thh">    merge_my_server_config,</span><span class="__shiki_21nrsd">          /* 合并服务器配置 */</span></span>
<span class="line"><span class="__shiki_140thh">    my_cmds,</span><span class="__shiki_21nrsd">                         /* 配置指令表 */</span></span>
<span class="line"><span class="__shiki_140thh">    my_register_hooks</span><span class="__shiki_21nrsd">                /* 注册钩子函数 */</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h4 id="_2-1-2-标准宏详解" tabindex="-1">2.1.2 标准宏详解 <a class="header-anchor" href="#_2-1-2-标准宏详解" aria-label="Permalink to &quot;2.1.2 标准宏详解&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* STANDARD20_MODULE_STUFF 展开 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> STANDARD20_MODULE_STUFF</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_140thh">    MODULE_MAGIC_COOKIE,</span><span class="__shiki_21nrsd">             /* 魔数，标识模块版本 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    __FILE__</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">                        /* 模块源文件 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    NULL</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">                            /* 动态加载时的回调 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    0</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">                               /* 模块API版本 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    0</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">                               /* 模块索引 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    0</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">                               /* 模块名 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    0</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">                               /* 动态加载 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    NULL</span><span class="__shiki_21nrsd">                             /* 模块结构链表 */</span></span></code></pre></div><h3 id="_2-2-配置处理系统" tabindex="-1">2.2 配置处理系统 <a class="header-anchor" href="#_2-2-配置处理系统" aria-label="Permalink to &quot;2.2 配置处理系统&quot;">​</a></h3><h4 id="_2-2-1-配置指令表" tabindex="-1">2.2.1 配置指令表 <a class="header-anchor" href="#_2-2-1-配置指令表" aria-label="Permalink to &quot;2.2.1 配置指令表&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 配置指令定义 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_140thh"> command_rec my_cmds</span><span class="__shiki_1itgoe">[]</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AP_INIT_TAKE1</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;MyDirective&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">               /* 指令名 */</span></span>
<span class="line"><span class="__shiki_140thh">        set_my_directive,</span><span class="__shiki_21nrsd">            /* 处理函数 */</span></span>
<span class="line"><span class="__shiki_dzsirb">        NULL</span><span class="__shiki_140thh">,</span><span class="__shiki_21nrsd">                        /* 配置结构指针 */</span></span>
<span class="line"><span class="__shiki_140thh">        OR_OPTIONS,</span><span class="__shiki_21nrsd">                  /* 指令作用域 */</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;Description of MyDirective&quot;</span><span class="__shiki_21nrsd"> /* 帮助文本 */</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AP_INIT_TAKE2</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;MyDirective2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        set_my_directive2,</span></span>
<span class="line"><span class="__shiki_dzsirb">        NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ACCESS_CONF </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> RSRC_CONF,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;Description of MyDirective2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AP_INIT_FLAG</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;EnableMyFeature&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        set_my_flag,</span></span>
<span class="line"><span class="__shiki_dzsirb">        NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        OR_OPTIONS,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;Enable or disable feature&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AP_INIT_ITERATE</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;MyList&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        set_my_list,</span></span>
<span class="line"><span class="__shiki_dzsirb">        NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        OR_OPTIONS,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;List of values&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AP_INIT_TAKE_ARGV</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;MyArray&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        set_my_array,</span></span>
<span class="line"><span class="__shiki_dzsirb">        NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        OR_OPTIONS,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;Array of arguments&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 配置指令作用域常量 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> RSRC_CONF</span><span class="__shiki_1itgoe">      0x</span><span class="__shiki_dzsirb">01</span><span class="__shiki_21nrsd">  /* 在&lt;Location&gt;, &lt;Directory&gt;之外 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> ACCESS_CONF</span><span class="__shiki_1itgoe">    0x</span><span class="__shiki_dzsirb">02</span><span class="__shiki_21nrsd">  /* 在&lt;Location&gt;, &lt;Directory&gt;内 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> OR_OPTIONS</span><span class="__shiki_1itgoe">     0x</span><span class="__shiki_dzsirb">04</span><span class="__shiki_21nrsd">  /* 在.htaccess中可用 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> OR_FILEINFO</span><span class="__shiki_1itgoe">    0x</span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">  /* 在&lt;Files&gt;中可用 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> EXEC_ON_READ</span><span class="__shiki_1itgoe">   0x</span><span class="__shiki_dzsirb">20</span><span class="__shiki_21nrsd">  /* 读取配置时立即执行 */</span></span></code></pre></div><h4 id="_2-2-2-配置存储结构" tabindex="-1">2.2.2 配置存储结构 <a class="header-anchor" href="#_2-2-2-配置存储结构" aria-label="Permalink to &quot;2.2.2 配置存储结构&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 目录配置结构 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> enabled;</span><span class="__shiki_21nrsd">                    /* 功能开关 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">custom_string;</span><span class="__shiki_21nrsd">           /* 字符串配置 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> custom_int;</span><span class="__shiki_21nrsd">                /* 整数配置 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_array_header_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">list;</span><span class="__shiki_21nrsd">      /* 列表配置 */</span></span>
<span class="line"><span class="__shiki_140thh">} my_dir_config;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 服务器配置结构 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> global_setting;</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_hash_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">cache;</span></span>
<span class="line"><span class="__shiki_140thh">} my_server_config;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 配置创建函数 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">create_my_dir_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">dirspec</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    my_dir_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cfg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(p, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(my_dir_config));</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">              /* 默认禁用 */</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;custom_string </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;custom_int </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_array_make</span><span class="__shiki_140thh">(p, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> cfg;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 配置合并函数 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">merge_my_dir_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">basev</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">overridesv</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    my_dir_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">base </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (my_dir_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)basev;</span></span>
<span class="line"><span class="__shiki_140thh">    my_dir_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">overrides </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (my_dir_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)overridesv;</span></span>
<span class="line"><span class="__shiki_140thh">    my_dir_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">merged </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(p, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(my_dir_config));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 继承逻辑：使用新值或继承旧值 */</span></span>
<span class="line"><span class="__shiki_140thh">    merged-&gt;enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (overrides-&gt;enabled </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                      overrides-&gt;enabled </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> base-&gt;enabled;</span></span>
<span class="line"><span class="__shiki_140thh">    merged-&gt;custom_string </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> overrides-&gt;custom_string </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                           overrides-&gt;custom_string </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> base-&gt;custom_string;</span></span>
<span class="line"><span class="__shiki_140thh">    merged-&gt;custom_int </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> overrides-&gt;custom_int </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                        overrides-&gt;custom_int </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> base-&gt;custom_int;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 合并数组 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">apr_is_empty_array</span><span class="__shiki_140thh">(overrides-&gt;list)) {</span></span>
<span class="line"><span class="__shiki_140thh">        merged-&gt;list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> base-&gt;list;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        merged-&gt;list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> overrides-&gt;list;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> merged;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-钩子系统详解" tabindex="-1">3. 钩子系统详解 <a class="header-anchor" href="#_3-钩子系统详解" aria-label="Permalink to &quot;3. 钩子系统详解&quot;">​</a></h2><h3 id="_3-1-钩子注册与执行" tabindex="-1">3.1 钩子注册与执行 <a class="header-anchor" href="#_3-1-钩子注册与执行" aria-label="Permalink to &quot;3.1 钩子注册与执行&quot;">​</a></h3><h4 id="_3-1-1-钩子注册函数" tabindex="-1">3.1.1 钩子注册函数 <a class="header-anchor" href="#_3-1-1-钩子注册函数" aria-label="Permalink to &quot;3.1.1 钩子注册函数&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 钩子注册函数 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> my_register_hooks</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 预连接钩子 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_pre_connection</span><span class="__shiki_140thh">(pre_connection_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 后读取请求头钩子 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_post_read_request</span><span class="__shiki_140thh">(post_read_request_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 内容处理钩子 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_handler</span><span class="__shiki_140thh">(my_content_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 访问检查钩子 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_access_checker</span><span class="__shiki_140thh">(access_checker_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 认证检查钩子 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_check_user_id</span><span class="__shiki_140thh">(auth_checker_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 日志记录钩子 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_log_transaction</span><span class="__shiki_140thh">(log_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 子进程初始化钩子 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_child_init</span><span class="__shiki_140thh">(child_init_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 输入过滤器 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_register_input_filter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;MY_INPUT_FILTER&quot;</span><span class="__shiki_140thh">, my_input_filter, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, AP_FTYPE_RESOURCE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 输出过滤器 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_register_output_filter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;MY_OUTPUT_FILTER&quot;</span><span class="__shiki_140thh">, my_output_filter, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, AP_FTYPE_RESOURCE);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 钩子优先级常量 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> APR_HOOK_REALLY_FIRST</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span><span class="__shiki_21nrsd">  /* 最先执行 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> APR_HOOK_FIRST</span><span class="__shiki_140thh">        (</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span><span class="__shiki_21nrsd">    /* 早期执行 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> APR_HOOK_MIDDLE</span><span class="__shiki_140thh">       (</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span><span class="__shiki_21nrsd">   /* 中期执行 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> APR_HOOK_LAST</span><span class="__shiki_140thh">         (</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">)</span><span class="__shiki_21nrsd">   /* 后期执行 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> APR_HOOK_REALLY_LAST</span><span class="__shiki_140thh">  (</span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">)</span><span class="__shiki_21nrsd">   /* 最后执行 */</span></span></code></pre></div><h3 id="_3-2-请求处理钩子" tabindex="-1">3.2 请求处理钩子 <a class="header-anchor" href="#_3-2-请求处理钩子" aria-label="Permalink to &quot;3.2 请求处理钩子&quot;">​</a></h3><h4 id="_3-2-1-请求处理流程钩子" tabindex="-1">3.2.1 请求处理流程钩子 <a class="header-anchor" href="#_3-2-1-请求处理流程钩子" aria-label="Permalink to &quot;3.2.1 请求处理流程钩子&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 完整的请求处理钩子链 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> register_all_hooks</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 1. 创建请求前 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_create_request</span><span class="__shiki_140thh">(create_request_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_REALLY_FIRST);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 2. 后读取请求头 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_post_read_request</span><span class="__shiki_140thh">(post_read_request_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 3. 头部解析器 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_header_parser</span><span class="__shiki_140thh">(header_parser_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 4. 访问检查 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_access_checker</span><span class="__shiki_140thh">(access_checker_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 5. 认证检查 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_check_user_id</span><span class="__shiki_140thh">(auth_checker_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 6. 授权检查 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_auth_checker</span><span class="__shiki_140thh">(authz_checker_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 7. 类型检查 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_type_checker</span><span class="__shiki_140thh">(type_checker_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 8. 修复器（处理目录、尾斜杠等） */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_fixer_upper</span><span class="__shiki_140thh">(fixer_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 9. 内容处理器 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_handler</span><span class="__shiki_140thh">(content_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 10. 日志记录 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_log_transaction</span><span class="__shiki_140thh">(log_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_LAST);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-内容处理器示例" tabindex="-1">3.2.2 内容处理器示例 <a class="header-anchor" href="#_3-2-2-内容处理器示例" aria-label="Permalink to &quot;3.2.2 内容处理器示例&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 内容处理器函数 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> my_content_handler</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 检查请求方法 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (r-&gt;method_number </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> M_GET </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> r-&gt;method_number </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> M_POST) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> DECLINED;</span><span class="__shiki_21nrsd">  /* 不处理非GET/POST请求 */</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 检查内容类型 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">strcmp</span><span class="__shiki_140thh">(r-&gt;handler, </span><span class="__shiki_mdbnqw">&quot;my-handler&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> DECLINED;</span><span class="__shiki_21nrsd">  /* 只处理特定handler的请求 */</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 设置响应头 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_table_set</span><span class="__shiki_140thh">(r-&gt;headers_out, </span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;text/html; charset=utf-8&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_table_set</span><span class="__shiki_140thh">(r-&gt;headers_out, </span><span class="__shiki_mdbnqw">&quot;X-Module&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;my_module&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 开始发送响应 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">ap_setup_client_block</span><span class="__shiki_140thh">(r, REQUEST_CHUNKED_DECHUNK) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> OK) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> HTTP_INTERNAL_SERVER_ERROR;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 发送响应体 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rputs</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;!DOCTYPE html&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rputs</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;html&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rputs</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;head&gt;&lt;title&gt;My Module&lt;/title&gt;&lt;/head&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rputs</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;body&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;h1&gt;Hello from </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&lt;/h1&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r-&gt;uri);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;p&gt;Time: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&lt;/p&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">apr_psprintf</span><span class="__shiki_140thh">(r-&gt;pool, </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_2bbn9v">%</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> APR_TIME_T_FMT, </span></span>
<span class="line"><span class="__shiki_1t8gfj">              apr_time_now</span><span class="__shiki_140thh">()));</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rputs</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;/body&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rputs</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;/html&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> OK;</span><span class="__shiki_21nrsd">  /* 处理成功 */</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-过滤器开发" tabindex="-1">4. 过滤器开发 <a class="header-anchor" href="#_4-过滤器开发" aria-label="Permalink to &quot;4. 过滤器开发&quot;">​</a></h2><h3 id="_4-1-过滤器架构" tabindex="-1">4.1 过滤器架构 <a class="header-anchor" href="#_4-1-过滤器架构" aria-label="Permalink to &quot;4.1 过滤器架构&quot;">​</a></h3><h4 id="_4-1-1-过滤器类型" tabindex="-1">4.1.1 过滤器类型 <a class="header-anchor" href="#_4-1-1-过滤器类型" aria-label="Permalink to &quot;4.1.1 过滤器类型&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 过滤器类型常量 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> AP_FTYPE_RESOURCE</span><span class="__shiki_dzsirb">    10</span><span class="__shiki_21nrsd">  /* 资源过滤器（内容修改） */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> AP_FTYPE_CONTENT_SET</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_21nrsd">  /* 内容设置过滤器 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> AP_FTYPE_PROTOCOL</span><span class="__shiki_dzsirb">    30</span><span class="__shiki_21nrsd">  /* 协议过滤器 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> AP_FTYPE_TRANSCODE</span><span class="__shiki_dzsirb">   40</span><span class="__shiki_21nrsd">  /* 转码过滤器 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> AP_FTYPE_CONNECTION</span><span class="__shiki_dzsirb">  50</span><span class="__shiki_21nrsd">  /* 连接过滤器 */</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 过滤器上下文结构 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    apr_bucket_brigade </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">temp_bb;</span><span class="__shiki_21nrsd">    /* 临时存储 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> content_length;</span><span class="__shiki_21nrsd">              /* 内容长度 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> chunked;</span><span class="__shiki_21nrsd">                     /* 是否分块传输 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">context_data;</span><span class="__shiki_21nrsd">              /* 过滤器特定数据 */</span></span>
<span class="line"><span class="__shiki_140thh">} my_filter_ctx;</span></span></code></pre></div><h4 id="_4-1-2-输入过滤器" tabindex="-1">4.1.2 输入过滤器 <a class="header-anchor" href="#_4-1-2-输入过滤器" aria-label="Permalink to &quot;4.1.2 输入过滤器&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 输入过滤器示例：解压缩 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_dzsirb"> apr_status_t</span><span class="__shiki_1t8gfj"> my_input_filter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">ap_filter_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">f</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                    apr_bucket_brigade </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">bb</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                    ap_input_mode_t</span><span class="__shiki_1jdh33"> mode</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                    apr_read_type_e </span><span class="__shiki_1jdh33">block</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                    apr_off_t</span><span class="__shiki_1jdh33"> readbytes</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    my_filter_ctx </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> f-&gt;ctx;</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_status_t</span><span class="__shiki_140thh"> rv;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 如果没有上下文，创建它 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">ctx) {</span></span>
<span class="line"><span class="__shiki_140thh">        ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(f-&gt;r-&gt;pool, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(my_filter_ctx));</span></span>
<span class="line"><span class="__shiki_140thh">        ctx-&gt;temp_bb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_brigade_create</span><span class="__shiki_140thh">(f-&gt;r-&gt;pool, f-&gt;c-&gt;bucket_alloc);</span></span>
<span class="line"><span class="__shiki_140thh">        f-&gt;ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ctx;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 从上游过滤器读取数据 */</span></span>
<span class="line"><span class="__shiki_140thh">    rv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ap_get_brigade</span><span class="__shiki_140thh">(f-&gt;next, bb, mode, block, readbytes);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (rv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> APR_SUCCESS) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> rv;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 处理数据：这里可以做解压缩、解密等操作 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    APR_BRIGADE_FOREACH</span><span class="__shiki_140thh">(bucket, bb) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">APR_BUCKET_IS_METADATA</span><span class="__shiki_140thh">(bucket)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            /* 处理元数据桶 */</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        /* 读取桶数据 */</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">data;</span></span>
<span class="line"><span class="__shiki_dzsirb">        apr_size_t</span><span class="__shiki_140thh"> len;</span></span>
<span class="line"><span class="__shiki_140thh">        rv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_bucket_read</span><span class="__shiki_140thh">(bucket, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">data, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">len, block);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (rv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> APR_SUCCESS) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> rv;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        /* 处理数据（示例：转换为大写） */</span></span>
<span class="line"><span class="__shiki_1itgoe">        char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">upper </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pstrmemdup</span><span class="__shiki_140thh">(f-&gt;r-&gt;pool, data, len);</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">apr_size_t</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> len; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">upper</span><span class="__shiki_140thh">[i] </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_mdbnqw"> &#39;a&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1jdh33"> upper</span><span class="__shiki_140thh">[i] </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_mdbnqw"> &#39;z&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">                upper</span><span class="__shiki_140thh">[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33"> upper</span><span class="__shiki_140thh">[i] </span><span class="__shiki_1itgoe">-</span><span class="__shiki_mdbnqw"> &#39;a&#39;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_mdbnqw"> &#39;A&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        /* 创建新桶替换旧桶 */</span></span>
<span class="line"><span class="__shiki_140thh">        apr_bucket </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">new_bucket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_bucket_heap_create</span><span class="__shiki_140thh">(upper, len, </span></span>
<span class="line"><span class="__shiki_140thh">                                                        apr_bucket_free, </span></span>
<span class="line"><span class="__shiki_140thh">                                                        f-&gt;c-&gt;bucket_alloc);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        APR_BUCKET_INSERT_BEFORE</span><span class="__shiki_140thh">(bucket, new_bucket);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        apr_bucket_delete</span><span class="__shiki_140thh">(bucket);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> APR_SUCCESS;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-1-3-输出过滤器" tabindex="-1">4.1.3 输出过滤器 <a class="header-anchor" href="#_4-1-3-输出过滤器" aria-label="Permalink to &quot;4.1.3 输出过滤器&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 输出过滤器示例：响应压缩 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> my_output_filter</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">ap_filter_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">f</span><span class="__shiki_140thh">, apr_bucket_brigade </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">bb</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">r </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> f-&gt;r;</span></span>
<span class="line"><span class="__shiki_140thh">    my_filter_ctx </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> f-&gt;ctx;</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_status_t</span><span class="__shiki_140thh"> rv;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 初始化上下文 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">ctx) {</span></span>
<span class="line"><span class="__shiki_140thh">        ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(r-&gt;pool, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(my_filter_ctx));</span></span>
<span class="line"><span class="__shiki_140thh">        ctx-&gt;temp_bb </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_brigade_create</span><span class="__shiki_140thh">(r-&gt;pool, r-&gt;connection-&gt;bucket_alloc);</span></span>
<span class="line"><span class="__shiki_140thh">        f-&gt;ctx </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ctx;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        /* 设置压缩头 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">        apr_table_setn</span><span class="__shiki_140thh">(r-&gt;headers_out, </span><span class="__shiki_mdbnqw">&quot;Content-Encoding&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;gzip&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 如果不是最后一个过滤器，直接传递 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">APR_BRIGADE_EMPTY</span><span class="__shiki_140thh">(bb) </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_1t8gfj">        APR_BUCKET_IS_EOS</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">APR_BRIGADE_LAST</span><span class="__shiki_140thh">(bb))) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        /* 处理EOS桶：刷新所有缓冲数据 */</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">APR_BRIGADE_EMPTY</span><span class="__shiki_140thh">(ctx-&gt;temp_bb)) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            /* 压缩并发送缓冲数据 */</span></span>
<span class="line"><span class="__shiki_140thh">            rv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> compress_and_send</span><span class="__shiki_140thh">(f, ctx-&gt;temp_bb);</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (rv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> APR_SUCCESS) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> rv;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        /* 传递EOS桶 */</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> ap_pass_brigade</span><span class="__shiki_140thh">(f-&gt;next, bb);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 缓冲数据 */</span></span>
<span class="line"><span class="__shiki_140thh">    rv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_brigade_append</span><span class="__shiki_140thh">(ctx-&gt;temp_bb, bb);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (rv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> APR_SUCCESS) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> rv;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 如果缓冲达到阈值，处理并发送 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_off_t</span><span class="__shiki_140thh"> total_len;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_brigade_length</span><span class="__shiki_140thh">(ctx-&gt;temp_bb, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">total_len);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (total_len </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 8192</span><span class="__shiki_140thh">) {</span><span class="__shiki_21nrsd">  /* 8KB阈值 */</span></span>
<span class="line"><span class="__shiki_140thh">        rv </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> compress_and_send</span><span class="__shiki_140thh">(f, ctx-&gt;temp_bb);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (rv </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_140thh"> APR_SUCCESS) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> rv;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1t8gfj">        apr_brigade_cleanup</span><span class="__shiki_140thh">(ctx-&gt;temp_bb);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> APR_SUCCESS;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 辅助函数：压缩并发送 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_dzsirb"> apr_status_t</span><span class="__shiki_1t8gfj"> compress_and_send</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">ap_filter_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">f</span><span class="__shiki_140thh">, apr_bucket_brigade </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">bb</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 这里实现实际的压缩逻辑 */</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 简化为直接传递 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> ap_pass_brigade</span><span class="__shiki_140thh">(f-&gt;next, bb);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-完整的模块示例" tabindex="-1">5. 完整的模块示例 <a class="header-anchor" href="#_5-完整的模块示例" aria-label="Permalink to &quot;5. 完整的模块示例&quot;">​</a></h2><h3 id="_5-1-模块-mod-example" tabindex="-1">5.1 模块：mod_example <a class="header-anchor" href="#_5-1-模块-mod-example" aria-label="Permalink to &quot;5.1 模块：mod_example&quot;">​</a></h3><h4 id="_5-1-1-完整源代码" tabindex="-1">5.1.1 完整源代码 <a class="header-anchor" href="#_5-1-1-完整源代码" aria-label="Permalink to &quot;5.1.1 完整源代码&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* mod_example.c - Apache示例模块 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &quot;httpd.h&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &quot;http_config.h&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &quot;http_protocol.h&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &quot;http_request.h&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &quot;apr_strings.h&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 模块版本 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> MODULE_VERSION</span><span class="__shiki_mdbnqw"> &quot;1.0.0&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> MODULE_NAME</span><span class="__shiki_mdbnqw"> &quot;mod_example&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 配置结构 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> enabled;</span><span class="__shiki_21nrsd">            /* 是否启用 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">greeting;</span><span class="__shiki_21nrsd">        /* 问候语 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> count;</span><span class="__shiki_21nrsd">             /* 计数 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_array_header_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">users;</span><span class="__shiki_21nrsd"> /* 用户列表 */</span></span>
<span class="line"><span class="__shiki_140thh">} example_config;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 全局服务器配置 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_hash_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">cache;</span><span class="__shiki_21nrsd">     /* 缓存 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> cache_size;</span><span class="__shiki_21nrsd">        /* 缓存大小 */</span></span>
<span class="line"><span class="__shiki_140thh">} example_server_config;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 函数声明 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">create_example_dir_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">dirspec</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">merge_example_dir_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">base</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">overrides</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">create_example_server_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, server_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">s</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">merge_example_server_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">base</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">overrides</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">set_example_greeting</span><span class="__shiki_140thh">(cmd_parms </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">cmd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">cfg</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                        const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">arg</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">set_example_enable</span><span class="__shiki_140thh">(cmd_parms </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">cmd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">cfg</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> flag</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">add_example_user</span><span class="__shiki_140thh">(cmd_parms </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">cmd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">cfg</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">arg</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> example_handler</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> example_access_checker</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> example_register_hooks</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> example_child_init</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, server_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">s</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 配置指令表 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_140thh"> command_rec example_cmds</span><span class="__shiki_1itgoe">[]</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AP_INIT_TAKE1</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ExampleGreeting&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                  set_example_greeting,</span></span>
<span class="line"><span class="__shiki_dzsirb">                  NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                  ACCESS_CONF </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> OR_OPTIONS,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  &quot;设置问候语&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AP_INIT_FLAG</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ExampleEnable&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                 set_example_enable,</span></span>
<span class="line"><span class="__shiki_dzsirb">                 NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                 ACCESS_CONF </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> OR_OPTIONS,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                 &quot;启用或禁用模块&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1t8gfj">    AP_INIT_ITERATE</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;ExampleUser&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    add_example_user,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    NULL</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    ACCESS_CONF,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;添加用户到列表&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    {</span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 模块声明 */</span></span>
<span class="line"><span class="__shiki_140thh">module AP_MODULE_DECLARE_DATA example_module </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    STANDARD20_MODULE_STUFF,</span></span>
<span class="line"><span class="__shiki_140thh">    create_example_dir_config,</span><span class="__shiki_21nrsd">     /* 创建目录配置 */</span></span>
<span class="line"><span class="__shiki_140thh">    merge_example_dir_config,</span><span class="__shiki_21nrsd">      /* 合并目录配置 */</span></span>
<span class="line"><span class="__shiki_140thh">    create_example_server_config,</span><span class="__shiki_21nrsd">  /* 创建服务器配置 */</span></span>
<span class="line"><span class="__shiki_140thh">    merge_example_server_config,</span><span class="__shiki_21nrsd">   /* 合并服务器配置 */</span></span>
<span class="line"><span class="__shiki_140thh">    example_cmds,</span><span class="__shiki_21nrsd">                  /* 配置指令 */</span></span>
<span class="line"><span class="__shiki_140thh">    example_register_hooks</span><span class="__shiki_21nrsd">         /* 注册钩子 */</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 实现部分 */</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 创建目录配置 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">create_example_dir_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">dirspec</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cfg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(p, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(example_config));</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">                     /* 默认禁用 */</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;greeting </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pstrdup</span><span class="__shiki_140thh">(p, </span><span class="__shiki_mdbnqw">&quot;Hello&quot;</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd"> /* 默认问候语 */</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_array_make</span><span class="__shiki_140thh">(p, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> cfg;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 合并目录配置 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">merge_example_dir_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">base</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">overrides</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">parent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)base;</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">child </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)overrides;</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">merged </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(p, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(example_config));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    merged-&gt;enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (child-&gt;enabled </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> child-&gt;enabled </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> parent-&gt;enabled;</span></span>
<span class="line"><span class="__shiki_140thh">    merged-&gt;greeting </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> child-&gt;greeting </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> child-&gt;greeting </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> parent-&gt;greeting;</span></span>
<span class="line"><span class="__shiki_140thh">    merged-&gt;count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> child-&gt;count </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> child-&gt;count </span><span class="__shiki_1itgoe">:</span><span class="__shiki_140thh"> parent-&gt;count;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">apr_is_empty_array</span><span class="__shiki_140thh">(child-&gt;users)) {</span></span>
<span class="line"><span class="__shiki_140thh">        merged-&gt;users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> parent-&gt;users;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        merged-&gt;users </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> child-&gt;users;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> merged;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 创建服务器配置 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">create_example_server_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, server_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">s</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    example_server_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cfg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(p, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(example_server_config));</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_hash_make</span><span class="__shiki_140thh">(p);</span></span>
<span class="line"><span class="__shiki_140thh">    cfg-&gt;cache_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">  /* 默认缓存大小 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> cfg;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 合并服务器配置 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">merge_example_server_config</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">base</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">overrides</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 服务器配置通常不合并，使用覆盖配置 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> overrides;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 设置问候语 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">set_example_greeting</span><span class="__shiki_140thh">(cmd_parms </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">cmd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">cfg</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                        const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">arg</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">conf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)cfg;</span></span>
<span class="line"><span class="__shiki_140thh">    conf-&gt;greeting </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pstrdup</span><span class="__shiki_140thh">(cmd-&gt;pool, arg);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 启用/禁用模块 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">set_example_enable</span><span class="__shiki_140thh">(cmd_parms </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">cmd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">cfg</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> flag</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">conf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)cfg;</span></span>
<span class="line"><span class="__shiki_140thh">    conf-&gt;enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> flag;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 添加用户 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">add_example_user</span><span class="__shiki_140thh">(cmd_parms </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">cmd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">cfg</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">arg</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">conf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)cfg;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> **</span><span class="__shiki_140thh">new_user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_array_push</span><span class="__shiki_140thh">(conf-&gt;users);</span></span>
<span class="line"><span class="__shiki_1itgoe">    *</span><span class="__shiki_140thh">new_user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pstrdup</span><span class="__shiki_140thh">(cmd-&gt;pool, arg);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 内容处理器 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> example_handler</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cfg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ap_get_module_config</span><span class="__shiki_140thh">(r-&gt;per_dir_config, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                                &amp;</span><span class="__shiki_140thh">example_module);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 检查是否启用 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">cfg-&gt;enabled) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> DECLINED;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 只处理特定URI */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">strncmp</span><span class="__shiki_140thh">(r-&gt;uri, </span><span class="__shiki_mdbnqw">&quot;/example&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> DECLINED;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 设置响应头 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_set_content_type</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;text/html; charset=utf-8&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 发送响应 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;!DOCTYPE html&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;html&gt;&lt;head&gt;&lt;title&gt;Example Module&lt;/title&gt;&lt;/head&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;body&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;h1&gt;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> from Example Module&lt;/h1&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, cfg-&gt;greeting);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;p&gt;Request URI: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&lt;/p&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r-&gt;uri);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;p&gt;Server Name: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&lt;/p&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r-&gt;server-&gt;server_hostname);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 显示用户列表 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (cfg-&gt;users-&gt;nelts </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;h2&gt;Users:&lt;/h2&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&lt;ul&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> i;</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> cfg-&gt;users-&gt;nelts; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> **</span><span class="__shiki_140thh">user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> **</span><span class="__shiki_140thh">)cfg-&gt;users-&gt;elts;</span></span>
<span class="line"><span class="__shiki_1t8gfj">            ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;li&gt;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&lt;/li&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">user</span><span class="__shiki_140thh">[i]);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1t8gfj">        ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;/ul&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_rprintf</span><span class="__shiki_140thh">(r, </span><span class="__shiki_mdbnqw">&quot;&lt;/body&gt;&lt;/html&gt;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> OK;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 访问检查器 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> example_access_checker</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cfg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ap_get_module_config</span><span class="__shiki_140thh">(r-&gt;per_dir_config, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                                &amp;</span><span class="__shiki_140thh">example_module);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 如果模块禁用，跳过检查 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">cfg-&gt;enabled) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> DECLINED;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 示例：检查特定用户代理 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">user_agent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_table_get</span><span class="__shiki_140thh">(r-&gt;headers_in, </span><span class="__shiki_mdbnqw">&quot;User-Agent&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (user_agent </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1t8gfj"> strstr</span><span class="__shiki_140thh">(user_agent, </span><span class="__shiki_mdbnqw">&quot;BadBot&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_ERR, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &quot;Blocked BadBot user agent: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, user_agent);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> HTTP_FORBIDDEN;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> DECLINED;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 子进程初始化 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> example_child_init</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">, server_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">s</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_error</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_NOTICE, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, s,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Example module initialized in child process&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 初始化缓存等资源 */</span></span>
<span class="line"><span class="__shiki_140thh">    example_server_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cfg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ap_get_module_config</span><span class="__shiki_140thh">(s-&gt;module_config,</span></span>
<span class="line"><span class="__shiki_1itgoe">                                                      &amp;</span><span class="__shiki_140thh">example_module);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (cfg) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        /* 初始化缓存 */</span></span>
<span class="line"><span class="__shiki_140thh">        cfg-&gt;cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_hash_make</span><span class="__shiki_140thh">(p);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 注册钩子 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> example_register_hooks</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_handler</span><span class="__shiki_140thh">(example_handler, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_access_checker</span><span class="__shiki_140thh">(example_access_checker, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_hook_child_init</span><span class="__shiki_140thh">(example_child_init, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, APR_HOOK_MIDDLE);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 注册过滤器 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_register_output_filter</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;EXAMPLE_FILTER&quot;</span><span class="__shiki_140thh">, example_output_filter,</span></span>
<span class="line"><span class="__shiki_dzsirb">                             NULL</span><span class="__shiki_140thh">, AP_FTYPE_RESOURCE);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-编译和安装" tabindex="-1">5.2 编译和安装 <a class="header-anchor" href="#_5-2-编译和安装" aria-label="Permalink to &quot;5.2 编译和安装&quot;">​</a></h3><h4 id="_5-2-1-makefile示例" tabindex="-1">5.2.1 Makefile示例 <a class="header-anchor" href="#_5-2-1-makefile示例" aria-label="Permalink to &quot;5.2.1 Makefile示例&quot;">​</a></h4><div class="language-makefile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">makefile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># mod_example 编译配置</span></span>
<span class="line"><span class="__shiki_140thh">APXS?=apxs</span></span>
<span class="line"><span class="__shiki_140thh">APACHECTL?=apachectl</span></span>
<span class="line"><span class="__shiki_140thh">CC=gcc</span></span>
<span class="line"><span class="__shiki_140thh">CFLAGS=-Wall -Werror -fPIC -I.</span></span>
<span class="line"><span class="__shiki_140thh">LDFLAGS=-shared</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">: mod_example.so</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">mod_example.so</span><span class="__shiki_140thh">: mod_example.c</span></span>
<span class="line"><span class="__shiki_mdbnqw">	$(</span><span class="__shiki_140thh">APXS</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_140thh"> -c </span><span class="__shiki_mdbnqw">$(</span><span class="__shiki_140thh">CFLAGS</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_140thh"> mod_example.c</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">install</span><span class="__shiki_140thh">: mod_example.so</span></span>
<span class="line"><span class="__shiki_mdbnqw">	$(</span><span class="__shiki_140thh">APXS</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_140thh"> -i -a mod_example.la</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">	sudo </span><span class="__shiki_mdbnqw">$(</span><span class="__shiki_140thh">APACHECTL</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_140thh"> configtest</span></span>
<span class="line"><span class="__shiki_140thh">	sudo </span><span class="__shiki_mdbnqw">$(</span><span class="__shiki_140thh">APACHECTL</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_140thh"> graceful</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">clean</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">	rm -f mod_example.so mod_example.la mod_example.o mod_example.slo mod_example.lo</span></span>
<span class="line"><span class="__shiki_140thh">	rm -rf .libs</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">.PHONY</span><span class="__shiki_140thh">: all install test clean</span></span></code></pre></div><h4 id="_5-2-2-使用apxs编译" tabindex="-1">5.2.2 使用APXS编译 <a class="header-anchor" href="#_5-2-2-使用apxs编译" aria-label="Permalink to &quot;5.2.2 使用APXS编译&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：直接使用APXS</span></span>
<span class="line"><span class="__shiki_1t8gfj">apxs</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> mod_example.c</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：详细编译选项</span></span>
<span class="line"><span class="__shiki_1t8gfj">apxs</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -Wc,-Wall</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -Wc,-Werror</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -Wc,-O2</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -I/path/to/include</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -L/path/to/lib</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    -l</span><span class="__shiki_mdbnqw"> dependent_library</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    mod_example.c</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装模块</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apxs</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_mdbnqw"> mod_example.la</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apachectl</span><span class="__shiki_mdbnqw"> configtest</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apachectl</span><span class="__shiki_mdbnqw"> graceful</span></span></code></pre></div><h2 id="_6-高级开发技术" tabindex="-1">6. 高级开发技术 <a class="header-anchor" href="#_6-高级开发技术" aria-label="Permalink to &quot;6. 高级开发技术&quot;">​</a></h2><h3 id="_6-1-连接和请求对象详解" tabindex="-1">6.1 连接和请求对象详解 <a class="header-anchor" href="#_6-1-连接和请求对象详解" aria-label="Permalink to &quot;6.1 连接和请求对象详解&quot;">​</a></h3><h4 id="_6-1-1-request-rec结构体关键字段" tabindex="-1">6.1.1 request_rec结构体关键字段 <a class="header-anchor" href="#_6-1-1-request-rec结构体关键字段" aria-label="Permalink to &quot;6.1.1 request_rec结构体关键字段&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 请求结构体重要字段 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> request_rec {</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">pool;</span><span class="__shiki_21nrsd">                    /* 请求内存池 */</span></span>
<span class="line"><span class="__shiki_140thh">    conn_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">connection;</span><span class="__shiki_21nrsd">                /* 连接对象 */</span></span>
<span class="line"><span class="__shiki_140thh">    server_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">server;</span><span class="__shiki_21nrsd">                  /* 服务器对象 */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 请求行信息 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">method;</span><span class="__shiki_21nrsd">                  /* 请求方法 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> method_number;</span><span class="__shiki_21nrsd">                   /* 方法编号 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">protocol;</span><span class="__shiki_21nrsd">                /* 协议版本 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">unparsed_uri;</span><span class="__shiki_21nrsd">            /* 原始URI */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">uri;</span><span class="__shiki_21nrsd">                     /* 解析后的URI */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">filename;</span><span class="__shiki_21nrsd">                /* 物理文件路径 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">path_info;</span><span class="__shiki_21nrsd">               /* 路径信息 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">args;</span><span class="__shiki_21nrsd">                    /* 查询字符串 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_table_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">headers_in;</span><span class="__shiki_21nrsd">             /* 请求头 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_table_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">headers_out;</span><span class="__shiki_21nrsd">            /* 响应头 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_table_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">err_headers_out;</span><span class="__shiki_21nrsd">        /* 错误响应头 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_table_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">subprocess_env;</span><span class="__shiki_21nrsd">         /* 子进程环境变量 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_table_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">notes;</span><span class="__shiki_21nrsd">                  /* 请求笔记（模块间通信） */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 请求内容 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_off_t</span><span class="__shiki_140thh"> remaining;</span><span class="__shiki_21nrsd">                 /* 剩余内容长度 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_off_t</span><span class="__shiki_140thh"> read_length;</span><span class="__shiki_21nrsd">               /* 已读取长度 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> read_body;</span><span class="__shiki_21nrsd">                       /* 读取模式 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> read_chunked;</span><span class="__shiki_21nrsd">                    /* 分块传输 */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 响应信息 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> status;</span><span class="__shiki_21nrsd">                          /* 状态码 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">content_type;</span><span class="__shiki_21nrsd">            /* 内容类型 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_off_t</span><span class="__shiki_140thh"> bytes_sent;</span><span class="__shiki_21nrsd">                /* 已发送字节数 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">handler;</span><span class="__shiki_21nrsd">                 /* 处理器名称 */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 配置信息 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">per_dir_config;</span><span class="__shiki_21nrsd">                /* 目录配置 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">request_config;</span><span class="__shiki_21nrsd">                /* 请求配置 */</span></span>
<span class="line"><span class="__shiki_140thh">} request_rec;</span></span></code></pre></div><h4 id="_6-1-2-连接对象conn-rec" tabindex="-1">6.1.2 连接对象conn_rec <a class="header-anchor" href="#_6-1-2-连接对象conn-rec" aria-label="Permalink to &quot;6.1.2 连接对象conn_rec&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 连接对象重要字段 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> conn_rec {</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">pool;</span><span class="__shiki_21nrsd">                    /* 连接内存池 */</span></span>
<span class="line"><span class="__shiki_140thh">    server_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">server;</span><span class="__shiki_21nrsd">                  /* 服务器对象 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">vhost_lookup_data;</span><span class="__shiki_21nrsd">             /* 虚拟主机数据 */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 客户端信息 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_socket_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">client_socket;</span><span class="__shiki_21nrsd">         /* 客户端套接字 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in local_addr;</span><span class="__shiki_21nrsd">       /* 本地地址 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in remote_addr;</span><span class="__shiki_21nrsd">      /* 远程地址 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">remote_ip;</span><span class="__shiki_21nrsd">                     /* 远程IP */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">remote_host;</span><span class="__shiki_21nrsd">                   /* 远程主机名 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">remote_logname;</span><span class="__shiki_21nrsd">                /* 远程登录名 */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* SSL信息 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">ssl;</span><span class="__shiki_21nrsd">                           /* SSL连接数据 */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 连接状态 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> aborted;</span><span class="__shiki_21nrsd">                         /* 连接是否中止 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    signed</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh"> keepalive;</span><span class="__shiki_21nrsd">                /* 保持连接状态 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> double_reverse;</span><span class="__shiki_21nrsd">                  /* 双反向DNS */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 输入/输出 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_bucket_alloc_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">bucket_alloc;</span><span class="__shiki_21nrsd">    /* 桶分配器 */</span></span>
<span class="line"><span class="__shiki_140thh">    apr_bucket_brigade </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">bb;</span><span class="__shiki_21nrsd">              /* 桶 brigade */</span></span>
<span class="line"><span class="__shiki_140thh">} conn_rec;</span></span></code></pre></div><h3 id="_6-2-内存管理与资源池" tabindex="-1">6.2 内存管理与资源池 <a class="header-anchor" href="#_6-2-内存管理与资源池" aria-label="Permalink to &quot;6.2 内存管理与资源池&quot;">​</a></h3><h4 id="_6-2-1-apr内存池使用" tabindex="-1">6.2.1 APR内存池使用 <a class="header-anchor" href="#_6-2-1-apr内存池使用" aria-label="Permalink to &quot;6.2.1 APR内存池使用&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 内存池操作示例 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> memory_pool_example</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">pool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> r-&gt;pool;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 1. 分配内存 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_palloc</span><span class="__shiki_140thh">(pool, </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">  /* 分配1KB */</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">numbers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(pool, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh">));</span><span class="__shiki_21nrsd">  /* 分配并清零 */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 2. 字符串操作 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">str1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Hello&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">str2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;World&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">combined </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_psprintf</span><span class="__shiki_140thh">(pool, </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_dzsirb"> %s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, str1, str2);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 3. 复制字符串 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">copied </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pstrdup</span><span class="__shiki_140thh">(pool, combined);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 4. 连接字符串 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">concatenated </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pstrcat</span><span class="__shiki_140thh">(pool, str1, </span><span class="__shiki_mdbnqw">&quot; &quot;</span><span class="__shiki_140thh">, str2, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 5. 子池创建 */</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">subpool;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_pool_create</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">subpool, pool);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 在子池中分配资源 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">sub_mem </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_palloc</span><span class="__shiki_140thh">(subpool, </span><span class="__shiki_dzsirb">512</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 清理子池（自动释放所有资源） */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_pool_destroy</span><span class="__shiki_140thh">(subpool);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 注意：主池在请求结束时自动清理 */</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 清理钩子注册 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> register_cleanup_example</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">pool</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    my_resource </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">res </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (my_resource </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)data;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 注册清理函数 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_pool_cleanup_register</span><span class="__shiki_140thh">(pool, res, cleanup_my_resource,</span></span>
<span class="line"><span class="__shiki_140thh">                              apr_pool_cleanup_null);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_dzsirb"> apr_status_t</span><span class="__shiki_1t8gfj"> cleanup_my_resource</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    my_resource </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">res </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (my_resource </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)data;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 释放资源 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (res-&gt;file_handle) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        apr_file_close</span><span class="__shiki_140thh">(res-&gt;file_handle);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (res-&gt;mutex) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        apr_thread_mutex_destroy</span><span class="__shiki_140thh">(res-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> APR_SUCCESS;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-线程安全和并发控制" tabindex="-1">6.3 线程安全和并发控制 <a class="header-anchor" href="#_6-3-线程安全和并发控制" aria-label="Permalink to &quot;6.3 线程安全和并发控制&quot;">​</a></h3><h4 id="_6-3-1-线程安全数据结构" tabindex="-1">6.3.1 线程安全数据结构 <a class="header-anchor" href="#_6-3-1-线程安全数据结构" aria-label="Permalink to &quot;6.3.1 线程安全数据结构&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 线程安全模块示例 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &quot;apr_thread_mutex.h&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &quot;apr_thread_rwlock.h&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 模块全局数据结构 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_hash_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">cache;</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_thread_mutex_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">mutex;</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_thread_rwlock_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">rwlock;</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> request_count;</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_dzsirb">example_global_t</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_dzsirb"> example_global_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">global </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 初始化全局结构 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_dzsirb"> apr_status_t</span><span class="__shiki_1t8gfj"> init_global</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">p</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    global </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pcalloc</span><span class="__shiki_140thh">(p, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">example_global_t</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    global-&gt;cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_hash_make</span><span class="__shiki_140thh">(p);</span></span>
<span class="line"><span class="__shiki_140thh">    global-&gt;request_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 创建互斥锁 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_mutex_create</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">global-&gt;mutex, APR_THREAD_MUTEX_DEFAULT, p);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 创建读写锁 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_rwlock_create</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">global-&gt;rwlock, p);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> APR_SUCCESS;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 线程安全操作示例 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> safe_increment_counter</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">void</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_mutex_lock</span><span class="__shiki_140thh">(global-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_140thh">    global-&gt;request_count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_mutex_unlock</span><span class="__shiki_140thh">(global-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> safe_cache_operation</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                 const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 写操作使用写锁 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_rwlock_wrlock</span><span class="__shiki_140thh">(global-&gt;rwlock);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_hash_set</span><span class="__shiki_140thh">(global-&gt;cache, key, APR_HASH_KEY_STRING, value);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_rwlock_unlock</span><span class="__shiki_140thh">(global-&gt;rwlock);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 读操作使用读锁 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_rwlock_rdlock</span><span class="__shiki_140thh">(global-&gt;rwlock);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">cached </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_hash_get</span><span class="__shiki_140thh">(global-&gt;cache, key, APR_HASH_KEY_STRING);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_rwlock_unlock</span><span class="__shiki_140thh">(global-&gt;rwlock);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (cached) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_DEBUG, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &quot;Cache hit for key: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, key);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-调试和测试" tabindex="-1">7. 调试和测试 <a class="header-anchor" href="#_7-调试和测试" aria-label="Permalink to &quot;7. 调试和测试&quot;">​</a></h2><h3 id="_7-1-调试技术" tabindex="-1">7.1 调试技术 <a class="header-anchor" href="#_7-1-调试技术" aria-label="Permalink to &quot;7.1 调试技术&quot;">​</a></h3><h4 id="_7-1-1-日志记录" tabindex="-1">7.1.1 日志记录 <a class="header-anchor" href="#_7-1-1-日志记录" aria-label="Permalink to &quot;7.1.1 日志记录&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* Apache日志API使用 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> logging_examples</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 1. 基本日志 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_ERR, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                 &quot;Error processing request for </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r-&gt;uri);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 2. 不同级别日志 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_DEBUG, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, </span><span class="__shiki_mdbnqw">&quot;Debug message&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_INFO, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, </span><span class="__shiki_mdbnqw">&quot;Info message&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_NOTICE, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, </span><span class="__shiki_mdbnqw">&quot;Notice message&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_WARNING, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, </span><span class="__shiki_mdbnqw">&quot;Warning message&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_ERR, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, </span><span class="__shiki_mdbnqw">&quot;Error message&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_CRIT, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, </span><span class="__shiki_mdbnqw">&quot;Critical message&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_ALERT, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, </span><span class="__shiki_mdbnqw">&quot;Alert message&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_EMERG, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, </span><span class="__shiki_mdbnqw">&quot;Emergency message&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 3. 条件日志 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (ap_log_level </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_140thh"> APLOG_DEBUG) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_DEBUG, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &quot;Expensive debug operation: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1t8gfj">                     expensive_debug_info</span><span class="__shiki_140thh">(r));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 4. 无请求对象的日志 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_error</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_INFO, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r-&gt;server,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;Module initialized successfully&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 自定义日志格式 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> MY_LOG_DEBUG</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fmt</span><span class="__shiki_140thh">, ...) </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_DEBUG, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, fmt, ##</span><span class="__shiki_1t8gfj">__VA_ARGS__</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> MY_LOG_ERROR</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fmt</span><span class="__shiki_140thh">, ...) </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_ERR, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r, fmt, ##</span><span class="__shiki_1t8gfj">__VA_ARGS__</span><span class="__shiki_140thh">)</span></span></code></pre></div><h4 id="_7-1-2-调试宏和断言" tabindex="-1">7.1.2 调试宏和断言 <a class="header-anchor" href="#_7-1-2-调试宏和断言" aria-label="Permalink to &quot;7.1.2 调试宏和断言&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 调试辅助宏 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#ifdef</span><span class="__shiki_1t8gfj"> DEBUG</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> MY_DEBUG</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fmt</span><span class="__shiki_140thh">, ...) </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">    fprintf</span><span class="__shiki_140thh">(stderr, </span><span class="__shiki_mdbnqw">&quot;[DEBUG] </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">: &quot;</span><span class="__shiki_140thh"> fmt </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            __FILE__</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">__LINE__</span><span class="__shiki_140thh">, ##</span><span class="__shiki_1t8gfj">__VA_ARGS__</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">#else</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> MY_DEBUG</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">fmt</span><span class="__shiki_140thh">, ...)</span></span>
<span class="line"><span class="__shiki_1itgoe">#endif</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 自定义断言 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> MY_ASSERT</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">expr</span><span class="__shiki_140thh">) </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1itgoe">    do</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">(expr)) { </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            ap_log_error</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_ERR, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;Assertion failed: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">, file </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">, line </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_140thh">                        #expr, </span><span class="__shiki_1t8gfj">__FILE__</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">__LINE__</span><span class="__shiki_140thh">); </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            abort</span><span class="__shiki_140thh">(); </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 请求检查宏 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> CHECK_REQUEST</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1itgoe">    do</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">r </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">r-&gt;pool) { </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> HTTP_INTERNAL_SERVER_ERROR; </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span></code></pre></div><h3 id="_7-2-单元测试框架" tabindex="-1">7.2 单元测试框架 <a class="header-anchor" href="#_7-2-单元测试框架" aria-label="Permalink to &quot;7.2 单元测试框架&quot;">​</a></h3><h4 id="_7-2-1-使用cunit测试" tabindex="-1">7.2.1 使用CUnit测试 <a class="header-anchor" href="#_7-2-1-使用cunit测试" aria-label="Permalink to &quot;7.2.1 使用CUnit测试&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 模块单元测试示例 */</span></span>
<span class="line"><span class="__shiki_1itgoe">#ifdef</span><span class="__shiki_1t8gfj"> UNIT_TEST</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &quot;CUnit/Basic.h&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 测试用例 */</span></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> test_config_creation</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">void</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">pool;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_pool_create</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">pool, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">cfg </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> create_example_dir_config</span><span class="__shiki_140thh">(pool, </span><span class="__shiki_mdbnqw">&quot;/test&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_ASSERT_PTR_NOT_NULL</span><span class="__shiki_140thh">(cfg);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_ASSERT</span><span class="__shiki_140thh">(cfg-&gt;enabled </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_ASSERT_STRING_EQUAL</span><span class="__shiki_140thh">(cfg-&gt;greeting, </span><span class="__shiki_mdbnqw">&quot;Hello&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_pool_destroy</span><span class="__shiki_140thh">(pool);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> test_config_merge</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">void</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">pool;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_pool_create</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">pool, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">base </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> create_example_dir_config</span><span class="__shiki_140thh">(pool, </span><span class="__shiki_mdbnqw">&quot;/base&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">overrides </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> create_example_dir_config</span><span class="__shiki_140thh">(pool, </span><span class="__shiki_mdbnqw">&quot;/overrides&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    overrides-&gt;enabled </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    overrides-&gt;greeting </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Bonjour&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    example_config </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">merged </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> merge_example_dir_config</span><span class="__shiki_140thh">(pool, base, overrides);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_ASSERT</span><span class="__shiki_140thh">(merged-&gt;enabled </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_ASSERT_STRING_EQUAL</span><span class="__shiki_140thh">(merged-&gt;greeting, </span><span class="__shiki_mdbnqw">&quot;Bonjour&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_pool_destroy</span><span class="__shiki_140thh">(pool);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 测试套件注册 */</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_initialize_registry</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    CU_pSuite suite </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> CU_add_suite</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Example Module Tests&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_add_test</span><span class="__shiki_140thh">(suite, </span><span class="__shiki_mdbnqw">&quot;test_config_creation&quot;</span><span class="__shiki_140thh">, test_config_creation);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_add_test</span><span class="__shiki_140thh">(suite, </span><span class="__shiki_mdbnqw">&quot;test_config_merge&quot;</span><span class="__shiki_140thh">, test_config_merge);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_basic_set_mode</span><span class="__shiki_140thh">(CU_BRM_VERBOSE);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_basic_run_tests</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">    CU_cleanup_registry</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">#endif</span></span></code></pre></div><h2 id="_8-性能优化和安全" tabindex="-1">8. 性能优化和安全 <a class="header-anchor" href="#_8-性能优化和安全" aria-label="Permalink to &quot;8. 性能优化和安全&quot;">​</a></h2><h3 id="_8-1-性能优化技巧" tabindex="-1">8.1 性能优化技巧 <a class="header-anchor" href="#_8-1-性能优化技巧" aria-label="Permalink to &quot;8.1 性能优化技巧&quot;">​</a></h3><h4 id="_8-1-1-内存优化" tabindex="-1">8.1.1 内存优化 <a class="header-anchor" href="#_8-1-1-内存优化" aria-label="Permalink to &quot;8.1.1 内存优化&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 内存优化示例 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> optimize_memory_usage</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 1. 使用栈内存代替堆内存 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> stack_buffer</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">];</span><span class="__shiki_21nrsd">  /* 小缓冲区用栈 */</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 2. 重用内存池对象 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1t8gfj"> APR_RING_HEAD</span><span class="__shiki_140thh">(, buffer_node) buffer_pool;</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_dzsirb"> apr_thread_mutex_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">pool_mutex;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 3. 延迟分配 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (need_large_buffer) {</span></span>
<span class="line"><span class="__shiki_140thh">        large_buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_palloc</span><span class="__shiki_140thh">(r-&gt;pool, LARGE_SIZE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 4. 避免内存泄漏 */</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_pool_cleanup_register</span><span class="__shiki_140thh">(r-&gt;pool, resource, cleanup_func,</span></span>
<span class="line"><span class="__shiki_140thh">                              apr_pool_cleanup_null);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 5. 使用apr_pstrmemdup代替strdup */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">substr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_pstrmemdup</span><span class="__shiki_140thh">(r-&gt;pool, source </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> start, length);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* 连接池管理 */</span></span>
<span class="line"><span class="__shiki_1itgoe">typedef</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">pool;</span></span>
<span class="line"><span class="__shiki_1itgoe">    void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">resources</span><span class="__shiki_140thh">[RESOURCE_POOL_SIZE];</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> free_count;</span></span>
<span class="line"><span class="__shiki_dzsirb">    apr_thread_mutex_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">mutex;</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_dzsirb">resource_pool_t</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_dzsirb"> resource_pool_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">global_pool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> NULL</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">get_resource</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_mutex_lock</span><span class="__shiki_140thh">(global_pool-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (global_pool-&gt;free_count </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">res </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> global_pool-&gt;resources[</span><span class="__shiki_1itgoe">--</span><span class="__shiki_140thh">global_pool-&gt;free_count];</span></span>
<span class="line"><span class="__shiki_1t8gfj">        apr_thread_mutex_unlock</span><span class="__shiki_140thh">(global_pool-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> res;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_mutex_unlock</span><span class="__shiki_140thh">(global_pool-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 创建新资源 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> create_new_resource</span><span class="__shiki_140thh">(r-&gt;pool);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1t8gfj"> return_resource</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">resource</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apr_thread_mutex_lock</span><span class="__shiki_140thh">(global_pool-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (global_pool-&gt;free_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> RESOURCE_POOL_SIZE) {</span></span>
<span class="line"><span class="__shiki_140thh">        global_pool-&gt;resources[global_pool-&gt;free_count</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> resource;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        apr_thread_mutex_unlock</span><span class="__shiki_140thh">(global_pool-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        apr_thread_mutex_unlock</span><span class="__shiki_140thh">(global_pool-&gt;mutex);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        destroy_resource</span><span class="__shiki_140thh">(resource);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-安全开发实践" tabindex="-1">8.2 安全开发实践 <a class="header-anchor" href="#_8-2-安全开发实践" aria-label="Permalink to &quot;8.2 安全开发实践&quot;">​</a></h3><h4 id="_8-2-1-输入验证" tabindex="-1">8.2.1 输入验证 <a class="header-anchor" href="#_8-2-1-输入验证" aria-label="Permalink to &quot;8.2.1 输入验证&quot;">​</a></h4><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">/* 安全输入处理 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> safe_request_handler</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 1. 验证URI */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">is_valid_uri</span><span class="__shiki_140thh">(r-&gt;uri)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> HTTP_BAD_REQUEST;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 2. 验证查询参数 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (r-&gt;args) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">strstr</span><span class="__shiki_140thh">(r-&gt;args, </span><span class="__shiki_mdbnqw">&quot;../&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_1t8gfj"> strstr</span><span class="__shiki_140thh">(r-&gt;args, </span><span class="__shiki_mdbnqw">&quot;..</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            ap_log_rerror</span><span class="__shiki_140thh">(APLOG_MARK, APLOG_WARNING, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, r,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                         &quot;Potential path traversal: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, r-&gt;args);</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> HTTP_BAD_REQUEST;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        /* 限制参数长度 */</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(r-&gt;args) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> MAX_QUERY_LENGTH) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> HTTP_REQUEST_URI_TOO_LARGE;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 3. 验证请求头 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">content_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_table_get</span><span class="__shiki_140thh">(r-&gt;headers_in, </span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (content_type </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">is_allowed_content_type</span><span class="__shiki_140thh">(content_type)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> HTTP_UNSUPPORTED_MEDIA_TYPE;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 4. 验证内容长度 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">content_length </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_table_get</span><span class="__shiki_140thh">(r-&gt;headers_in, </span><span class="__shiki_mdbnqw">&quot;Content-Length&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (content_length) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        apr_off_t</span><span class="__shiki_140thh"> length </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> atol</span><span class="__shiki_140thh">(content_length);</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (length </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> MAX_CONTENT_LENGTH) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> HTTP_REQUEST_ENTITY_TOO_LARGE;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 5. 处理POST数据 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (r-&gt;method_number </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> M_POST) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_dzsirb">        apr_size_t</span><span class="__shiki_140thh"> bytes_read;</span></span>
<span class="line"><span class="__shiki_dzsirb">        apr_off_t</span><span class="__shiki_140thh"> total_read </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_140thh"> ((bytes_read </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ap_get_client_block</span><span class="__shiki_140thh">(r, buffer, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(buffer))) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            total_read </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> bytes_read;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            /* 处理数据，注意边界检查 */</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (total_read </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> MAX_CONTENT_LENGTH) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> HTTP_REQUEST_ENTITY_TOO_LARGE;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            /* 验证数据内容 */</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">is_safe_content</span><span class="__shiki_140thh">(buffer, bytes_read)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> HTTP_BAD_REQUEST;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> OK;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">/* SQL注入防护示例 */</span></span>
<span class="line"><span class="__shiki_1itgoe">static</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_1t8gfj"> safe_database_query</span><span class="__shiki_140thh">(request_rec </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1jdh33">r</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">user_input</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 1. 参数化查询（伪代码） */</span></span>
<span class="line"><span class="__shiki_21nrsd">    // db_prepare(&quot;SELECT * FROM users WHERE id = ?&quot;);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // db_bind_param(1, user_input);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 2. 输入白名单验证 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_1t8gfj">is_valid_username</span><span class="__shiki_140thh">(user_input)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> HTTP_BAD_REQUEST;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    /* 3. 转义特殊字符 */</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">escaped </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> apr_palloc</span><span class="__shiki_140thh">(r-&gt;pool, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(user_input) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    escape_sql_string</span><span class="__shiki_140thh">(user_input, escaped);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> OK;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-部署和发布" tabindex="-1">9. 部署和发布 <a class="header-anchor" href="#_9-部署和发布" aria-label="Permalink to &quot;9. 部署和发布&quot;">​</a></h2><h3 id="_9-1-打包和分发" tabindex="-1">9.1 打包和分发 <a class="header-anchor" href="#_9-1-打包和分发" aria-label="Permalink to &quot;9.1 打包和分发&quot;">​</a></h3><h4 id="_9-1-1-创建rpm包" tabindex="-1">9.1.1 创建RPM包 <a class="header-anchor" href="#_9-1-1-创建rpm包" aria-label="Permalink to &quot;9.1.1 创建RPM包&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># mod_example.spec 文件</span></span>
<span class="line"><span class="__shiki_17hn0y">Name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mod_example</span></span>
<span class="line"><span class="__shiki_17hn0y">Version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.0.0</span></span>
<span class="line"><span class="__shiki_17hn0y">Release</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1%{?dist}</span></span>
<span class="line"><span class="__shiki_17hn0y">Summary</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Apache example module</span></span>
<span class="line"><span class="__shiki_17hn0y">License</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Apache 2.0</span></span>
<span class="line"><span class="__shiki_17hn0y">URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://example.com/mod_example</span></span>
<span class="line"><span class="__shiki_17hn0y">Source0</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mod_example-%{version}.tar.gz</span></span>
<span class="line"><span class="__shiki_17hn0y">BuildRequires</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">httpd-devel</span></span>
<span class="line"><span class="__shiki_17hn0y">BuildRequires</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apr-devel</span></span>
<span class="line"><span class="__shiki_17hn0y">BuildRequires</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apr-util-devel</span></span>
<span class="line"><span class="__shiki_17hn0y">BuildRequires</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pcre-devel</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_dzsirb">description</span></span>
<span class="line"><span class="__shiki_mdbnqw">This is an example Apache module demonstrating module development.</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_dzsirb">prep</span></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_dzsirb">setup</span><span class="__shiki_2bbn9v"> -q</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_dzsirb">build</span></span>
<span class="line"><span class="__shiki_mdbnqw">apxs -c mod_example.c</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_dzsirb">install</span></span>
<span class="line"><span class="__shiki_mdbnqw">install -d %{buildroot}%{_libdir}/httpd/modules</span></span>
<span class="line"><span class="__shiki_mdbnqw">install .libs/mod_example.so %{buildroot}%{_libdir}/httpd/modules/</span></span>
<span class="line"><span class="__shiki_mdbnqw">install -d %{buildroot}%{_sysconfdir}/httpd/conf.modules.d</span></span>
<span class="line"><span class="__shiki_mdbnqw">echo &quot;LoadModule example_module modules/mod_example.so&quot; &gt; \\</span></span>
<span class="line"><span class="__shiki_140thh">    %{</span><span class="__shiki_mdbnqw">buildroot</span><span class="__shiki_140thh">}%{</span><span class="__shiki_mdbnqw">_sysconfdir</span><span class="__shiki_140thh">}</span><span class="__shiki_mdbnqw">/httpd/conf.modules.d/00-example.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_dzsirb">files</span></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_2bbn9v">{_libdir}/httpd/modules/mod_example.so</span></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_dzsirb">config</span><span class="__shiki_2bbn9v">(noreplace)</span><span class="__shiki_2bbn9v"> %{_sysconfdir}/httpd/conf.modules.d/00-example.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">%</span><span class="__shiki_dzsirb">changelog</span></span>
<span class="line"><span class="__shiki_140thh">* </span><span class="__shiki_mdbnqw">Tue Jan 01 2024 Developer &lt;developer@example.com&gt; - 1.0.0-1</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">Initial package</span></span></code></pre></div><h4 id="_9-1-2-创建debian包" tabindex="-1">9.1.2 创建Debian包 <a class="header-anchor" href="#_9-1-2-创建debian包" aria-label="Permalink to &quot;9.1.2 创建Debian包&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 目录结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">mod_example-1.0.0/</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> debian/</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> control</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> rules</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> changelog</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> copyright</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> src/</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> mod_example.c</span></span>
<span class="line"><span class="__shiki_1t8gfj">└──</span><span class="__shiki_mdbnqw"> Makefile</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># debian/control</span></span>
<span class="line"><span class="__shiki_1t8gfj">Package:</span><span class="__shiki_mdbnqw"> libapache2-mod-example</span></span>
<span class="line"><span class="__shiki_1t8gfj">Version:</span><span class="__shiki_dzsirb"> 1.0.0</span></span>
<span class="line"><span class="__shiki_1t8gfj">Architecture:</span><span class="__shiki_mdbnqw"> amd64</span></span>
<span class="line"><span class="__shiki_1t8gfj">Maintainer:</span><span class="__shiki_mdbnqw"> Developer</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">developer@example.co</span><span class="__shiki_140thh">m</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">Description:</span><span class="__shiki_mdbnqw"> Apache</span><span class="__shiki_mdbnqw"> example</span><span class="__shiki_mdbnqw"> module</span></span>
<span class="line"><span class="__shiki_1t8gfj">Depends:</span><span class="__shiki_mdbnqw"> apache2,</span><span class="__shiki_mdbnqw"> libc6</span></span></code></pre></div><h3 id="_9-2-持续集成" tabindex="-1">9.2 持续集成 <a class="header-anchor" href="#_9-2-持续集成" aria-label="Permalink to &quot;9.2 持续集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .github/workflows/build.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build and Test</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">push</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">pull_request</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        apache-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">2.4</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo apt-get update</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo apt-get install -y apache2-dev libapr1-dev libaprutil1-dev</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build module</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        apxs -c mod_example.c</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run tests</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        make test</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Static analysis</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo apt-get install -y cppcheck</span></span>
<span class="line"><span class="__shiki_mdbnqw">        cppcheck --enable=all --suppress=missingIncludeSystem src/</span></span></code></pre></div><h2 id="_10-最佳实践总结" tabindex="-1">10. 最佳实践总结 <a class="header-anchor" href="#_10-最佳实践总结" aria-label="Permalink to &quot;10. 最佳实践总结&quot;">​</a></h2><h3 id="_10-1-开发流程" tabindex="-1">10.1 开发流程 <a class="header-anchor" href="#_10-1-开发流程" aria-label="Permalink to &quot;10.1 开发流程&quot;">​</a></h3><ol><li><p><strong>需求分析</strong>：</p><ul><li>确定模块类型（处理器、过滤器、认证器等）</li><li>设计配置指令和API</li><li>规划内存管理和资源生命周期</li></ul></li><li><p><strong>原型开发</strong>：</p><ul><li>实现最小功能版本</li><li>测试基本工作流程</li><li>验证配置系统</li></ul></li><li><p><strong>完整实现</strong>：</p><ul><li>添加错误处理</li><li>实现性能优化</li><li>添加日志和调试支持</li></ul></li><li><p><strong>测试验证</strong>：</p><ul><li>单元测试</li><li>集成测试</li><li>性能测试</li><li>安全测试</li></ul></li><li><p><strong>文档和发布</strong>：</p><ul><li>编写用户文档</li><li>编写开发者文档</li><li>打包分发</li></ul></li></ol><h3 id="_10-2-性能最佳实践" tabindex="-1">10.2 性能最佳实践 <a class="header-anchor" href="#_10-2-性能最佳实践" aria-label="Permalink to &quot;10.2 性能最佳实践&quot;">​</a></h3><ol><li><p><strong>内存管理</strong>：</p><ul><li>使用内存池而非malloc/free</li><li>避免内存泄漏</li><li>重用对象和缓冲区</li></ul></li><li><p><strong>并发处理</strong>：</p><ul><li>使用线程安全数据结构</li><li>最小化锁的范围</li><li>避免死锁</li></ul></li><li><p><strong>I/O优化</strong>：</p><ul><li>使用异步I/O</li><li>实现缓冲区管理</li><li>避免不必要的复制</li></ul></li></ol><h3 id="_10-3-安全最佳实践" tabindex="-1">10.3 安全最佳实践 <a class="header-anchor" href="#_10-3-安全最佳实践" aria-label="Permalink to &quot;10.3 安全最佳实践&quot;">​</a></h3><ol><li><p><strong>输入验证</strong>：</p><ul><li>验证所有用户输入</li><li>使用白名单而非黑名单</li><li>限制资源使用</li></ul></li><li><p><strong>错误处理</strong>：</p><ul><li>不泄露敏感信息</li><li>记录安全事件</li><li>优雅失败</li></ul></li><li><p><strong>配置安全</strong>：</p><ul><li>安全的默认配置</li><li>最小权限原则</li><li>配置验证</li></ul></li></ol><h3 id="_10-4-维护最佳实践" tabindex="-1">10.4 维护最佳实践 <a class="header-anchor" href="#_10-4-维护最佳实践" aria-label="Permalink to &quot;10.4 维护最佳实践&quot;">​</a></h3><ol><li><p><strong>代码质量</strong>：</p><ul><li>遵循Apache编码标准</li><li>添加详细注释</li><li>编写单元测试</li></ul></li><li><p><strong>向后兼容</strong>：</p><ul><li>保持API稳定性</li><li>提供迁移路径</li><li>弃用而非删除</li></ul></li><li><p><strong>社区参与</strong>：</p><ul><li>贡献回Apache社区</li><li>响应问题报告</li><li>接受代码审查</li></ul></li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Apache模块开发是一项强大的技能，允许开发者深度定制Web服务器行为。关键要点包括：</p><ol><li><strong>理解架构</strong>：掌握Apache的模块化架构和请求处理流程</li><li><strong>熟悉API</strong>：熟练使用APR和Apache API</li><li><strong>遵循模式</strong>：使用标准模块结构和配置系统</li><li><strong>注重性能</strong>：优化内存使用和并发处理</li><li><strong>确保安全</strong>：实现严格的输入验证和错误处理</li><li><strong>全面测试</strong>：包括单元测试、集成测试和性能测试</li></ol><p>通过遵循本指南中的模式和最佳实践，开发者可以创建高效、稳定、安全的Apache模块，扩展服务器的功能以满足特定需求。</p>`,98)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
