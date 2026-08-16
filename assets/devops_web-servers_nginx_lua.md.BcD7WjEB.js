import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Nginx Lua脚本扩展完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/nginx/lua.md","filePath":"devops/web-servers/nginx/lua.md"}'),p={name:"devops/web-servers/nginx/lua.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nginx-lua脚本扩展完全指南" tabindex="-1">Nginx Lua脚本扩展完全指南 <a class="header-anchor" href="#nginx-lua脚本扩展完全指南" aria-label="Permalink to &quot;Nginx Lua脚本扩展完全指南&quot;">​</a></h1><h2 id="第一部分-openresty与luajit基础" tabindex="-1">第一部分：OpenResty与LuaJIT基础 <a class="header-anchor" href="#第一部分-openresty与luajit基础" aria-label="Permalink to &quot;第一部分：OpenResty与LuaJIT基础&quot;">​</a></h2><h3 id="_1-1-openresty架构概览" tabindex="-1">1.1 OpenResty架构概览 <a class="header-anchor" href="#_1-1-openresty架构概览" aria-label="Permalink to &quot;1.1 OpenResty架构概览&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">OpenResty = Nginx + LuaJIT + Lua模块生态系统</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 核心模块（ngx_lua, stream_lua）</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 第三方Lua库</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── LuaJIT即时编译器</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── Nginx C模块集成</span></span></code></pre></div><h3 id="_1-2-安装与配置openresty" tabindex="-1">1.2 安装与配置OpenResty <a class="header-anchor" href="#_1-2-安装与配置openresty" aria-label="Permalink to &quot;1.2 安装与配置OpenResty&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Ubuntu/Debian 安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> software-properties-common</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> add-apt-repository</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> ppa:openresty/ppa</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> update</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> openresty</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CentOS/RHEL 安装</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_mdbnqw"> yum-utils</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum-config-manager</span><span class="__shiki_dzsirb"> --add-repo</span><span class="__shiki_mdbnqw"> https://openresty.org/package/centos/openresty.repo</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> yum</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> openresty</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 源码编译安装（推荐生产环境）</span></span>
<span class="line"><span class="__shiki_1t8gfj">wget</span><span class="__shiki_mdbnqw"> https://openresty.org/download/openresty-1.21.4.1.tar.gz</span></span>
<span class="line"><span class="__shiki_1t8gfj">tar</span><span class="__shiki_dzsirb"> -xzf</span><span class="__shiki_mdbnqw"> openresty-1.21.4.1.tar.gz</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> openresty-1.21.4.1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">./configure</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --prefix=/usr/local/openresty</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-luajit</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-http_ssl_module</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-http_v2_module</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-http_realip_module</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-http_stub_status_module</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-http_iconv_module</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-stream</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-stream_ssl_module</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-http_geoip_module=dynamic</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-pcre-jit</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">    --with-threads</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">make</span><span class="__shiki_dzsirb"> -j$(</span><span class="__shiki_1t8gfj">nproc</span><span class="__shiki_dzsirb">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> make</span><span class="__shiki_mdbnqw"> install</span></span></code></pre></div><h3 id="_1-3-基础配置文件结构" tabindex="-1">1.3 基础配置文件结构 <a class="header-anchor" href="#_1-3-基础配置文件结构" aria-label="Permalink to &quot;1.3 基础配置文件结构&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /usr/local/openresty/nginx/conf/nginx.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">user </span><span class="__shiki_140thh">www-data;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_rlimit_nofile </span><span class="__shiki_dzsirb">65535</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用LuaJIT</span></span>
<span class="line"><span class="__shiki_1itgoe">env </span><span class="__shiki_140thh">LUA_PATH;</span></span>
<span class="line"><span class="__shiki_1itgoe">env </span><span class="__shiki_140thh">LUA_CPATH;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    multi_accept </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    include </span><span class="__shiki_140thh">mime.types;</span></span>
<span class="line"><span class="__shiki_1itgoe">    default_type </span><span class="__shiki_140thh">application/octet-stream;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Lua模块搜索路径</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_package_path</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">prefix</span><span class="__shiki_mdbnqw">/lualib/?.lua;$</span><span class="__shiki_140thh">prefix</span><span class="__shiki_mdbnqw">/lualib/?/init.lua;/usr/local/openresty/lualib/?.lua;;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_package_cpath</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">prefix</span><span class="__shiki_mdbnqw">/lualib/?.so;/usr/local/openresty/lualib/?.so;;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Lua共享字典（内存共享）</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> shared_data </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd"># 100MB共享内存</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> cache_dict </span><span class="__shiki_dzsirb">50m</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 50MB缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> ip_blacklist </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd"># 10MB IP黑名单</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> rate_limit </span><span class="__shiki_dzsirb">20m</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 20MB限流存储</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Lua代码缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_code_cache</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;                     </span><span class="__shiki_21nrsd"># 生产环境开启</span></span>
<span class="line"><span class="__shiki_21nrsd">    # lua_code_cache off;                  # 开发环境关闭（热重载）</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Lua虚拟机配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_socket_log_errors</span><span class="__shiki_dzsirb"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_max_running_timers</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_max_pending_timers</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_need_request_body</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;              </span><span class="__shiki_21nrsd"># 自动读取请求体</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">localhost;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            default_type </span><span class="__shiki_140thh">text/html;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 内联Lua代码</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;h1&gt;Hello, OpenResty!&lt;/h1&gt;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;p&gt;当前时间: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_dzsirb"> os.date</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d %H:%M:%S&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;&lt;/p&gt;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;p&gt;请求方法: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">get_method</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">..</span><span class="__shiki_mdbnqw"> &quot;&lt;/p&gt;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;&lt;p&gt;客户端IP: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_1itgoe"> ..</span><span class="__shiki_mdbnqw"> &quot;&lt;/p&gt;&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第二部分-lua基础与nginx集成" tabindex="-1">第二部分：Lua基础与Nginx集成 <a class="header-anchor" href="#第二部分-lua基础与nginx集成" aria-label="Permalink to &quot;第二部分：Lua基础与Nginx集成&quot;">​</a></h2><h3 id="_2-1-lua语法快速入门" tabindex="-1">2.1 Lua语法快速入门 <a class="header-anchor" href="#_2-1-lua语法快速入门" aria-label="Permalink to &quot;2.1 Lua语法快速入门&quot;">​</a></h3><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- Lua基础语法示例</span></span>
<span class="line"><span class="__shiki_21nrsd">-- 注释：单行注释使用 --，多行注释使用 --[[ ... ]]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 变量和数据类型</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> str </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Hello Lua&quot;           </span><span class="__shiki_21nrsd">-- 字符串</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> num </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 42</span><span class="__shiki_21nrsd">                    -- 数字</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> bool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_21nrsd">                 -- 布尔值</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> nil_val </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_21nrsd">               -- nil值</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_1t8gfj"> func</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(x) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_1itgoe"> end</span><span class="__shiki_21nrsd">  -- 函数</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 表（Table）- Lua唯一的数据结构</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> array </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">}        </span><span class="__shiki_21nrsd">-- 数组</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> dict </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {                    </span><span class="__shiki_21nrsd">-- 字典</span></span>
<span class="line"><span class="__shiki_140thh">    name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;OpenResty&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;1.21.4&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    features </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;LuaJIT&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Nginx&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Modules&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 控制结构</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">    grade </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;A&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">elseif</span><span class="__shiki_140thh"> score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 80</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">    grade </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;B&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_140thh">    grade </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;C&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 循环</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe"> do</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(i)</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> k, v </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> pairs</span><span class="__shiki_140thh">(dict) </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(k, v)</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">while</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_1itgoe"> do</span></span>
<span class="line"><span class="__shiki_dzsirb">    print</span><span class="__shiki_140thh">(i)</span></span>
<span class="line"><span class="__shiki_140thh">    i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">-- 函数定义</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> greet</span><span class="__shiki_140thh">(name)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &quot;Hello, &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> name</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_1t8gfj"> greet</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(name)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_mdbnqw"> &quot;Hello, &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> name</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span></code></pre></div><h3 id="_2-2-nginx与lua交互api" tabindex="-1">2.2 Nginx与Lua交互API <a class="header-anchor" href="#_2-2-nginx与lua交互api" aria-label="Permalink to &quot;2.2 Nginx与Lua交互API&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Lua共享内存初始化</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> global_cache </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- Nginx Master进程启动时执行一次</span></span>
<span class="line"><span class="__shiki_dzsirb">        package.path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> package.path</span><span class="__shiki_1itgoe"> ..</span><span class="__shiki_mdbnqw"> &#39;;/usr/local/openresty/lualib/?.lua&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 初始化全局变量</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">global_cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;app_version&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">global_cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;start_time&quot;</span><span class="__shiki_140thh">, ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 预加载模块</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_mdbnqw"> &quot;resty.core&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 每个Worker进程启动时执行</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_21nrsd">  -- 5秒</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> handler</span></span>
<span class="line"><span class="__shiki_1t8gfj">        handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 定时任务逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">global_cache</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;worker_&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">worker</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_140thh">(), ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 重新设置定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(delay, handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;failed to create timer: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 启动定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(delay, handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;failed to create timer: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # Lua执行阶段演示</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /test-phase </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 重写阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">            rewrite_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;rewrite_by_lua_block&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 访问控制阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;access_by_lua_block&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ip </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> blacklist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ip_blacklist</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1t8gfj"> blacklist</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(ip) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_FORBIDDEN</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 内容生成阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;content_by_lua_block&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Lua执行阶段测试完成&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 响应头过滤阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">            header_filter_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.log(ngx.INFO, &quot;header_filter_by_lua_block&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[&quot;X-Powered-By&quot;] = &quot;OpenResty-Lua&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[&quot;X-Request-ID&quot;] = ngx.var.</span><span class="__shiki_1itgoe">request_id</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 响应体过滤阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">            body_filter_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.log(ngx.INFO, &quot;body_filter_by_lua_block&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> chunk = ngx.arg[1]</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> eof = ngx.arg[2]</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 可以修改响应体</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> chunk and not eof then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.arg[1] = string.upper(chunk)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 日志记录阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;log_by_lua_block&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;请求完成: &quot;</span><span class="__shiki_140thh">, ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_time</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-3-核心ngx-api详解" tabindex="-1">2.3 核心ngx API详解 <a class="header-anchor" href="#_2-3-核心ngx-api详解" aria-label="Permalink to &quot;2.3 核心ngx API详解&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /ngx-api-demo </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 1. 请求信息获取</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> req_method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">get_method</span><span class="__shiki_140thh">()           </span><span class="__shiki_21nrsd">-- 请求方法</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> req_headers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">get_headers</span><span class="__shiki_140thh">()         </span><span class="__shiki_21nrsd">-- 请求头</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> req_args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">get_uri_args</span><span class="__shiki_140thh">()           </span><span class="__shiki_21nrsd">-- 查询参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> req_body </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">get_body_data</span><span class="__shiki_140thh">()          </span><span class="__shiki_21nrsd">-- 请求体</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 2. Nginx变量访问</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> remote_addr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_21nrsd">           -- 客户端IP</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> server_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">server_name</span><span class="__shiki_21nrsd">           -- 服务器名</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> request_uri </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span><span class="__shiki_21nrsd">           -- 请求URI</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> query_string </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">query_string</span><span class="__shiki_21nrsd">         -- 查询字符串</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 3. 响应控制</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_21nrsd">                                  -- 设置状态码</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">content_type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;      </span><span class="__shiki_21nrsd">-- 设置响应头</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;X-Custom-Header&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Lua-Nginx&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 4. 输出响应</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello from Lua&quot;</span><span class="__shiki_140thh">)                         </span><span class="__shiki_21nrsd">-- 输出并换行</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;More content&quot;</span><span class="__shiki_140thh">)                         </span><span class="__shiki_21nrsd">-- 输出不换行</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 5. 重定向</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- ngx.redirect(&quot;/new-location&quot;, 301)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 6. 退出处理</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- ngx.exit(ngx.HTTP_OK)                         -- 正常退出</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)      -- 错误退出</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 7. 日志记录</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;INFO级别日志&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ERROR级别日志&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">WARN</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;WARN级别日志&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">DEBUG</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;DEBUG级别日志&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 8. 获取当前时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">()                             </span><span class="__shiki_21nrsd">-- 当前时间戳（秒.毫秒）</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> today </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">today</span><span class="__shiki_140thh">()                         </span><span class="__shiki_21nrsd">-- 今天日期</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">()                           </span><span class="__shiki_21nrsd">-- 当前时间戳（秒）</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> utc_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">utctime</span><span class="__shiki_140thh">()                    </span><span class="__shiki_21nrsd">-- UTC时间</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 9. 共享内存操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> shared </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_dict</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> success, err, forcible </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> shared</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 60秒过期</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> shared</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        shared</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;counter&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)                         </span><span class="__shiki_21nrsd">-- 原子递增</span></span>
<span class="line"><span class="__shiki_1t8gfj">        shared</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">delete</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key&quot;</span><span class="__shiki_140thh">)                              </span><span class="__shiki_21nrsd">-- 删除键</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 10. 定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_1t8gfj"> handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;定时器触发&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, handler)         </span><span class="__shiki_21nrsd">-- 10秒后执行</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">every</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, handler)      </span><span class="__shiki_21nrsd">-- 每60秒执行</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 11. 协程操作</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> co </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">thread</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">spawn</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 模拟耗时操作</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_mdbnqw"> &quot;结果&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, res </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">thread</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">wait</span><span class="__shiki_140thh">(co)               </span><span class="__shiki_21nrsd">-- 等待协程完成</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 12. 子请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> res </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">location</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">capture</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/api/data&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">HTTP_GET</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 123</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_1itgoe">            body</span><span class="__shiki_140thh"> = nil,</span></span>
<span class="line"><span class="__shiki_1itgoe">            ctx</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> res.status == </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(&quot;子请求成功: &quot;, res.body)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 13. 正则表达式</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> m, err = ngx.re.match(</span><span class="__shiki_mdbnqw">&quot;hello world&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">w+&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;jo&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> m then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(&quot;匹配成功: &quot;, m[0])</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 14. 编解码</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> encoded = ngx.encode_base64(</span><span class="__shiki_mdbnqw">&quot;Hello Lua&quot;</span><span class="__shiki_140thh">)    -- Base64编码</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> decoded = ngx.decode_base64(encoded)        -- Base64解码</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> escaped = ngx.escape_uri(</span><span class="__shiki_mdbnqw">&quot;a=b&amp;c=d&quot;</span><span class="__shiki_140thh">)         -- URI编码</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> unescaped = ngx.unescape_uri(escaped)       -- URI解码</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 15. MD5/</span><span class="__shiki_1itgoe">SHA1</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> md5 = ngx.md5(</span><span class="__shiki_mdbnqw">&quot;Hello Lua&quot;</span><span class="__shiki_140thh">)                  -- MD5哈希</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> sha1 = ngx.sha1_bin(</span><span class="__shiki_mdbnqw">&quot;Hello Lua&quot;</span><span class="__shiki_140thh">)            -- SHA1二进制</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 输出所有信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> response = {</span></span>
<span class="line"><span class="__shiki_1itgoe">            request</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                method</span><span class="__shiki_140thh"> = req_method,</span></span>
<span class="line"><span class="__shiki_1itgoe">                ip</span><span class="__shiki_140thh"> = remote_addr,</span></span>
<span class="line"><span class="__shiki_1itgoe">                uri</span><span class="__shiki_140thh"> = request_uri</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_1itgoe">            time</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                now</span><span class="__shiki_140thh"> = now,</span></span>
<span class="line"><span class="__shiki_1itgoe">                today</span><span class="__shiki_140thh"> = today</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_1itgoe">            shared_data</span><span class="__shiki_140thh"> = value,</span></span>
<span class="line"><span class="__shiki_1itgoe">            base64</span><span class="__shiki_140thh"> = encoded</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(require(&quot;cjson&quot;).encode(response))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第三部分-常用lua模块详解" tabindex="-1">第三部分：常用Lua模块详解 <a class="header-anchor" href="#第三部分-常用lua模块详解" aria-label="Permalink to &quot;第三部分：常用Lua模块详解&quot;">​</a></h2><h3 id="_3-1-resty-core-核心模块" tabindex="-1">3.1 resty.core 核心模块 <a class="header-anchor" href="#_3-1-resty-core-核心模块" aria-label="Permalink to &quot;3.1 resty.core 核心模块&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用resty.core优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_load_resty_core</span><span class="__shiki_dzsirb"> off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 默认开启，显式关闭</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 手动加载resty.core</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_mdbnqw"> &quot;resty.core&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 性能优化配置</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;resty.core.regex&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">enable</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;resty.core.hash&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">enable</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;resty.core.base64&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">enable</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;resty.core.var&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">enable</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-cjson-json处理" tabindex="-1">3.2 cjson - JSON处理 <a class="header-anchor" href="#_3-2-cjson-json处理" aria-label="Permalink to &quot;3.2 cjson - JSON处理&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /json-demo </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cjson </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;cjson&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cjson_safe </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;cjson.safe&quot;  </span><span class="__shiki_21nrsd">-- 安全版本</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- JSON编码</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;OpenResty&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;1.21.4&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            features </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;LuaJIT&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Nginx&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Lua&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1itgoe">            config</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                port</span><span class="__shiki_140thh"> = 80,</span></span>
<span class="line"><span class="__shiki_1itgoe">                ssl </span><span class="__shiki_140thh">= true</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local json_str = cjson.encode(data)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(</span><span class="__shiki_mdbnqw">&quot;编码结果: &quot;</span><span class="__shiki_140thh">, json_str)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- JSON解码</span></span>
<span class="line"><span class="__shiki_140thh">        local decoded = cjson.decode(json_str)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(</span><span class="__shiki_mdbnqw">&quot;解码name: &quot;</span><span class="__shiki_140thh">, decoded.name)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 安全解码（不会抛出错误）</span></span>
<span class="line"><span class="__shiki_140thh">        local ok, decoded_or_err = cjson_safe.decode(</span><span class="__shiki_mdbnqw">&quot;invalid json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        if not ok then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;JSON解析失败: &quot;</span><span class="__shiki_140thh">, decoded_or_err)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 配置cjson</span></span>
<span class="line"><span class="__shiki_140thh">        cjson.encode_empty_table_as_object(false)  -- 空表编码为数组</span></span>
<span class="line"><span class="__shiki_140thh">        cjson.encode_sparse_array(true)            -- 编码稀疏数组</span></span>
<span class="line"><span class="__shiki_140thh">        cjson.encode_number_precision(14)          -- 数字精度</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-resty-string-字符串处理" tabindex="-1">3.3 resty.string - 字符串处理 <a class="header-anchor" href="#_3-3-resty-string-字符串处理" aria-label="Permalink to &quot;3.3 resty.string - 字符串处理&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /string-demo </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> str </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.string&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 十六进制编码/解码</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> hex </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> str.</span><span class="__shiki_dzsirb">to_hex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;十六进制: &quot;</span><span class="__shiki_140thh">, hex)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;解码: &quot;</span><span class="__shiki_140thh">, str.</span><span class="__shiki_dzsirb">to_hex</span><span class="__shiki_140thh">(hex))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- MD5/SHA1</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;MD5: &quot;</span><span class="__shiki_140thh">, str.</span><span class="__shiki_dzsirb">to_hex</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_dzsirb">md5</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">)))</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;SHA1: &quot;</span><span class="__shiki_140thh">, str.</span><span class="__shiki_dzsirb">to_hex</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_dzsirb">sha1</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">)))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 随机字符串</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> rand </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.random&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> random_bytes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> rand.</span><span class="__shiki_dzsirb">bytes</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;随机字节: &quot;</span><span class="__shiki_140thh">, str.</span><span class="__shiki_dzsirb">to_hex</span><span class="__shiki_140thh">(random_bytes))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-网络通信模块" tabindex="-1">第四部分：网络通信模块 <a class="header-anchor" href="#第四部分-网络通信模块" aria-label="Permalink to &quot;第四部分：网络通信模块&quot;">​</a></h2><h3 id="_4-1-resty-http-http客户端" tabindex="-1">4.1 resty.http - HTTP客户端 <a class="header-anchor" href="#_4-1-resty-http-http客户端" aria-label="Permalink to &quot;4.1 resty.http - HTTP客户端&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /http-client </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 1. 简单GET请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> httpc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">request_uri</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;https://httpbin.org/get&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;GET&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            headers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;User-Agent&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;OpenResty-HTTP-Client&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;Accept&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> not res then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(&quot;请求失败: &quot;, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(</span><span class="__shiki_mdbnqw">&quot;状态码: &quot;</span><span class="__shiki_140thh">, res.status)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(</span><span class="__shiki_mdbnqw">&quot;响应头: &quot;</span><span class="__shiki_140thh">, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(res.headers))</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(</span><span class="__shiki_mdbnqw">&quot;响应体: &quot;</span><span class="__shiki_140thh">, res.body)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">2.</span><span class="__shiki_140thh"> POST请求（JSON）</span></span>
<span class="line"><span class="__shiki_140thh">        local res, err = httpc:request_uri(</span><span class="__shiki_mdbnqw">&quot;https://httpbin.org/post&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">            method = </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            headers = {</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;X-API-Key&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;your-api-key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            body = require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode({</span></span>
<span class="line"><span class="__shiki_140thh">                name = </span><span class="__shiki_mdbnqw">&quot;OpenResty&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                action = </span><span class="__shiki_mdbnqw">&quot;test&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">3.</span><span class="__shiki_140thh"> 连接池管理</span></span>
<span class="line"><span class="__shiki_140thh">        -- 保持连接</span></span>
<span class="line"><span class="__shiki_140thh">        httpc:set_keepalive(10000, 100)  -- 10秒空闲，最多100个连接</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 关闭连接</span></span>
<span class="line"><span class="__shiki_140thh">        -- httpc:close()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">4.</span><span class="__shiki_140thh"> 代理设置</span></span>
<span class="line"><span class="__shiki_140thh">        httpc:set_proxy_options({</span></span>
<span class="line"><span class="__shiki_140thh">            http_proxy = </span><span class="__shiki_mdbnqw">&quot;http://proxy.example.com:8080&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            https_proxy = </span><span class="__shiki_mdbnqw">&quot;http://proxy.example.com:8080&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            no_proxy = </span><span class="__shiki_mdbnqw">&quot;localhost,127.0.0.1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">5.</span><span class="__shiki_140thh"> SSL/TLS配置</span></span>
<span class="line"><span class="__shiki_140thh">        httpc:set_timeout(5000)  -- 5秒超时</span></span>
<span class="line"><span class="__shiki_140thh">        httpc:ssl_handshake(true)  -- 启用SSL验证</span></span>
<span class="line"><span class="__shiki_140thh">        httpc:ssl_verify(false)    -- 关闭SSL证书验证（测试环境）</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">6.</span><span class="__shiki_140thh"> 流式响应处理</span></span>
<span class="line"><span class="__shiki_140thh">        local reader = httpc:get_client_body_reader()</span></span>
<span class="line"><span class="__shiki_140thh">        local chunks = {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        repeat</span></span>
<span class="line"><span class="__shiki_140thh">            local chunk, err = reader()</span></span>
<span class="line"><span class="__shiki_140thh">            if chunk then</span></span>
<span class="line"><span class="__shiki_140thh">                table.insert(chunks, chunk)</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        until not chunk</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local body = table.concat(chunks)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">7.</span><span class="__shiki_140thh"> 多请求并发</span></span>
<span class="line"><span class="__shiki_140thh">        local requests = {</span></span>
<span class="line"><span class="__shiki_140thh">            {url = </span><span class="__shiki_mdbnqw">&quot;https://api1.example.com/data&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">            {url = </span><span class="__shiki_mdbnqw">&quot;https://api2.example.com/data&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">            {url = </span><span class="__shiki_mdbnqw">&quot;https://api3.example.com/data&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local threads = {}</span></span>
<span class="line"><span class="__shiki_140thh">        for i, req in ipairs(requests) do</span></span>
<span class="line"><span class="__shiki_140thh">            local co = ngx.thread.spawn(function()</span></span>
<span class="line"><span class="__shiki_140thh">                local http = require </span><span class="__shiki_mdbnqw">&quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                local hc = http.new()</span></span>
<span class="line"><span class="__shiki_140thh">                return hc:request_uri(req.url)</span></span>
<span class="line"><span class="__shiki_140thh">            end)</span></span>
<span class="line"><span class="__shiki_140thh">            table.insert(threads, co)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        for i, co in ipairs(threads) do</span></span>
<span class="line"><span class="__shiki_140thh">            local ok, res = ngx.thread.wait(co)</span></span>
<span class="line"><span class="__shiki_140thh">            if ok then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(</span><span class="__shiki_mdbnqw">&quot;请求&quot;</span><span class="__shiki_140thh">, i, </span><span class="__shiki_mdbnqw">&quot;成功: &quot;</span><span class="__shiki_140thh">, res.status)</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-resty-redis-redis客户端" tabindex="-1">4.2 resty.redis - Redis客户端 <a class="header-anchor" href="#_4-2-resty-redis-redis客户端" aria-label="Permalink to &quot;4.2 resty.redis - Redis客户端&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /redis-demo </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.redis&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> red </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> redis</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 连接配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_timeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 1秒超时</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 连接到Redis</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">connect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;连接失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 认证（如果需要）</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- local res, err = red:auth(&quot;password&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 选择数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">select</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 1. 字符串操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;value&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GET key: &quot;</span><span class="__shiki_140thh">, value)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 设置过期时间</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">setex</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;temp_key&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;temp_value&quot;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 60秒过期</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">expire</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">)                  </span><span class="__shiki_21nrsd">-- 1小时后过期</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 2. 哈希操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">hmset</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:1000&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;age&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;25&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;alice@example.com&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">hgetall</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user:1000&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;用户信息: &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">(user))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 3. 列表操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">lpush</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;queue&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;item1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">rpush</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;queue&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;item2&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> item </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">lpop</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;queue&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;出队: &quot;</span><span class="__shiki_140thh">, item)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 4. 集合操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">sadd</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tags&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;redis&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;lua&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;nginx&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">smembers</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tags&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;标签: &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">table.concat</span><span class="__shiki_140thh">(tags, </span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 5. 有序集合</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">zadd</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;scores&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Bob&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> scores </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">zrange</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;scores&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;WITHSCORES&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 6. 管道操作（Pipeline）</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">init_pipeline</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;p1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;v1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;p2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;v2&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;p1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;p2&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> results, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">commit_pipeline</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> results </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;管道结果: &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">(results))</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 7. Lua脚本（EVAL）</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> script </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> [[</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local key = KEYS[1]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            local value = ARGV[1]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            redis.call(&#39;SET&#39;, key, value)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            return redis.call(&#39;GET&#39;, key)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ]]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">eval</span><span class="__shiki_140thh">(script, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;script_key&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;script_value&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;脚本执行结果: &quot;</span><span class="__shiki_140thh">, result)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 8. 订阅/发布</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 注意：订阅会阻塞连接，需要使用单独的连接</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 9. 事务（MULTI/EXEC）</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">init_pipeline</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">multi</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tx1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;v1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tx2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;v2&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">exec</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> results, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">commit_pipeline</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 10. 扫描操作（SCAN）</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cursor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;0&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        repeat</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">scan</span><span class="__shiki_140thh">(cursor, </span><span class="__shiki_mdbnqw">&quot;MATCH&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;user:*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;COUNT&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> res </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;扫描失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            cursor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> res[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> keys </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> res[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, key </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> ipairs</span><span class="__shiki_140thh">(keys) </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;找到键: &quot;</span><span class="__shiki_140thh">, key)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        until</span><span class="__shiki_140thh"> cursor </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 连接池管理</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_keepalive</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 10秒空闲，最多100个连接</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;连接池设置失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1t8gfj">            red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-resty-mysql-mysql客户端" tabindex="-1">4.3 resty.mysql - MySQL客户端 <a class="header-anchor" href="#_4-3-resty-mysql-mysql客户端" aria-label="Permalink to &quot;4.3 resty.mysql - MySQL客户端&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /mysql-demo </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> mysql </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.mysql&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> db, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> mysql</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> db </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;创建MySQL客户端失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        db</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_timeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 1秒超时</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 连接数据库</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err, errcode, sqlstate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> db</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">connect</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            host </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;127.0.0.1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3306</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            database </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;test_db&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;root&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            password </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;password&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            charset </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;utf8mb4&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            max_packet_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> not ok then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(&quot;连接失败: &quot;, err, &quot; 错误码: &quot;, errcode)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">1.</span><span class="__shiki_140thh"> 查询操作</span></span>
<span class="line"><span class="__shiki_140thh">        local res, err, errcode, sqlstate = db:query(</span><span class="__shiki_mdbnqw">&quot;SELECT id, name, email FROM users WHERE status = 1 LIMIT 10&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        if not res then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;查询失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">        else</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;查询结果: &quot;</span><span class="__shiki_140thh">, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(res))</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">2.</span><span class="__shiki_140thh"> 插入数据</span></span>
<span class="line"><span class="__shiki_140thh">        local sql = </span><span class="__shiki_mdbnqw">&quot;INSERT INTO users (name, email, created_at) VALUES (&#39;&quot;</span><span class="__shiki_140thh"> .. </span></span>
<span class="line"><span class="__shiki_140thh">                   ngx.quote_sql_str(</span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">) .. </span><span class="__shiki_mdbnqw">&quot;&#39;, &#39;&quot;</span><span class="__shiki_140thh"> .. </span></span>
<span class="line"><span class="__shiki_140thh">                   ngx.quote_sql_str(</span><span class="__shiki_mdbnqw">&quot;alice@example.com&quot;</span><span class="__shiki_140thh">) .. </span><span class="__shiki_mdbnqw">&quot;&#39;, NOW())&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local res, err, errcode, sqlstate = db:query(sql)</span></span>
<span class="line"><span class="__shiki_140thh">        if not res then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;插入失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">        else</span></span>
<span class="line"><span class="__shiki_140thh">            local insert_id = res.insert_id</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;插入成功，ID: &quot;</span><span class="__shiki_140thh">, insert_id)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">3.</span><span class="__shiki_140thh"> 使用预处理语句（防止SQL注入）</span></span>
<span class="line"><span class="__shiki_140thh">        local stmt, err = db:prepare(</span><span class="__shiki_mdbnqw">&quot;INSERT INTO users (name, email) VALUES (?, ?)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        if not stmt then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;预处理失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">        else</span></span>
<span class="line"><span class="__shiki_140thh">            local res, err, errcode, sqlstate = stmt:execute(</span><span class="__shiki_mdbnqw">&quot;Bob&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;bob@example.com&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            if res then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(</span><span class="__shiki_mdbnqw">&quot;预处理插入成功&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">4.</span><span class="__shiki_140thh"> 事务处理</span></span>
<span class="line"><span class="__shiki_140thh">        db:query(</span><span class="__shiki_mdbnqw">&quot;START TRANSACTION&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local success = true</span></span>
<span class="line"><span class="__shiki_140thh">        local res1, err = db:query(</span><span class="__shiki_mdbnqw">&quot;UPDATE accounts SET balance = balance - 100 WHERE user_id = 1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        if not res1 then</span></span>
<span class="line"><span class="__shiki_140thh">            success = false</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;更新失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local res2, err = db:query(</span><span class="__shiki_mdbnqw">&quot;UPDATE accounts SET balance = balance + 100 WHERE user_id = 2&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        if not res2 then</span></span>
<span class="line"><span class="__shiki_140thh">            success = false</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;更新失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        if success then</span></span>
<span class="line"><span class="__shiki_140thh">            db:query(</span><span class="__shiki_mdbnqw">&quot;COMMIT&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;事务提交成功&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        else</span></span>
<span class="line"><span class="__shiki_140thh">            db:query(</span><span class="__shiki_mdbnqw">&quot;ROLLBACK&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;事务回滚&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">5.</span><span class="__shiki_140thh"> 批量插入</span></span>
<span class="line"><span class="__shiki_140thh">        db:query(</span><span class="__shiki_mdbnqw">&quot;START TRANSACTION&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local values = {}</span></span>
<span class="line"><span class="__shiki_140thh">        for i = 1, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">            table.insert(values, </span><span class="__shiki_mdbnqw">&quot;(&#39;user&quot;</span><span class="__shiki_140thh"> .. i .. </span><span class="__shiki_mdbnqw">&quot;&#39;, &#39;user&quot;</span><span class="__shiki_140thh"> .. i .. </span><span class="__shiki_mdbnqw">&quot;@example.com&#39;)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local sql = </span><span class="__shiki_mdbnqw">&quot;INSERT INTO users (name, email) VALUES &quot;</span><span class="__shiki_140thh"> .. table.concat(values, </span><span class="__shiki_mdbnqw">&quot;,&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        local res, err = db:query(sql)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        if res then</span></span>
<span class="line"><span class="__shiki_140thh">            db:query(</span><span class="__shiki_mdbnqw">&quot;COMMIT&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;批量插入成功，影响行数: &quot;</span><span class="__shiki_140thh">, res.affected_rows)</span></span>
<span class="line"><span class="__shiki_140thh">        else</span></span>
<span class="line"><span class="__shiki_140thh">            db:query(</span><span class="__shiki_mdbnqw">&quot;ROLLBACK&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;批量插入失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 连接池管理</span></span>
<span class="line"><span class="__shiki_140thh">        local ok, err = db:set_keepalive(10000, 100)  -- 10秒空闲，最多100个连接</span></span>
<span class="line"><span class="__shiki_140thh">        if not ok then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;连接池设置失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">            db:close()</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第五部分-高级特性与性能优化" tabindex="-1">第五部分：高级特性与性能优化 <a class="header-anchor" href="#第五部分-高级特性与性能优化" aria-label="Permalink to &quot;第五部分：高级特性与性能优化&quot;">​</a></h2><h3 id="_5-1-共享内存与原子操作" tabindex="-1">5.1 共享内存与原子操作 <a class="header-anchor" href="#_5-1-共享内存与原子操作" aria-label="Permalink to &quot;5.1 共享内存与原子操作&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定义共享内存区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> my_cache </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> rate_limits </span><span class="__shiki_dzsirb">50m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> sessions </span><span class="__shiki_dzsirb">20m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 初始化共享数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">my_cache</span></span>
<span class="line"><span class="__shiki_1t8gfj">        cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;app_start_time&quot;</span><span class="__shiki_140thh">, ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1t8gfj">        cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /shared-demo </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">my_cache</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 1. 基本操作</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> success, err, forcible </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;value1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 60秒过期</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> success </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;设置失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;获取值: &quot;</span><span class="__shiki_140thh">, value)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 2. 原子操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">add</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;counter&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 只在不存在时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> newval, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;counter&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 原子递增</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;计数器: &quot;</span><span class="__shiki_140thh">, newval)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 3. 批量操作</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">mset</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    key2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;value2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    key3 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;value3&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    key4 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;value4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                })</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> values = cache:mget({</span><span class="__shiki_mdbnqw">&quot;key2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;key3&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;key4&quot;</span><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(&quot;批量获取: &quot;, require(&quot;cjson&quot;).encode(values))</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 4. 遍历所有键（谨慎使用，性能消耗大）</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> keys = cache:get_keys()</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(&quot;总键数: &quot;, </span><span class="__shiki_21nrsd">#keys)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 5. 带过期时间的CAS操作</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cas_value = {data = </span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh">, version = 1}</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> success, err, forcible = cache:set(</span><span class="__shiki_mdbnqw">&quot;cas_key&quot;</span><span class="__shiki_140thh">, cas_value, 60)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取值和版本</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> value, flags = cache:get(</span><span class="__shiki_mdbnqw">&quot;cas_key&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                value.</span><span class="__shiki_1itgoe">version</span><span class="__shiki_140thh"> = value.version + 1</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 使用CAS更新</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> success, err, forcible = cache:cas(</span><span class="__shiki_mdbnqw">&quot;cas_key&quot;</span><span class="__shiki_140thh">, cas_value, value, 60)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> success then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(&quot;CAS更新成功&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(&quot;CAS更新失败: &quot;, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 6. 容量监控</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> free_page_bytes = cache:free_space()</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(&quot;剩余内存: &quot;, free_page_bytes, &quot; 字节&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /rate-limit </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> limit_req </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.limit.req&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> limit_traffic </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.limit.traffic&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 请求频率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> lim, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> limit_req.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;rate_limits&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 10r/s, 突发1个</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> lim </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> delay, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> lim</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incoming</span><span class="__shiki_140thh">(key, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;rejected&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;X-RateLimit-Limit&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;10&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;X-RateLimit-Remaining&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;X-RateLimit-Reset&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">                        return</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">429</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;X-RateLimit-Limit&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;10&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;X-RateLimit-Remaining&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> math.floor</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh">delay)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;X-RateLimit-Reset&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;请求通过频率限制&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-定时器与后台任务" tabindex="-1">5.2 定时器与后台任务 <a class="header-anchor" href="#_5-2-定时器与后台任务" aria-label="Permalink to &quot;5.2 定时器与后台任务&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 初始化定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_21nrsd">  -- 60秒</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> handler</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 后台任务逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">my_cache</span></span>
<span class="line"><span class="__shiki_1t8gfj">            cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;background_jobs&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 执行一些后台处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 调用外部API</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> httpc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">request_uri</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;https://api.example.com/health&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> res </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;api_health&quot;</span><span class="__shiki_140thh">, res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 重新设置定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(delay, handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;failed to create timer: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 启动第一个定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(delay, handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;failed to create timer: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 批量初始化多个定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> timers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            {name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;cleanup&quot;</span><span class="__shiki_140thh">, interval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 300</span><span class="__shiki_140thh">},    -- 5分钟清理</span></span>
<span class="line"><span class="__shiki_140thh">            {</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;stats&quot;</span><span class="__shiki_140thh">, interval = 60},       -- 1分钟统计</span></span>
<span class="line"><span class="__shiki_140thh">            {</span><span class="__shiki_1itgoe">name</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;backup&quot;</span><span class="__shiki_140thh">, interval = 3600}     -- 1小时备份</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, timer in ipairs(timers) do</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> timer_func = function(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> not premature then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.log(ngx.INFO, &quot;执行定时任务: &quot;, timer.name)</span></span>
<span class="line"><span class="__shiki_140thh">                    -- 任务逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> ok, err = ngx.timer.at(timer.interval, timer_func)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ok, err = ngx.timer.at(0, timer_func)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /timer-demo </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 一次性延迟任务</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_1t8gfj"> handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature, user_id, message)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;延迟任务执行: &quot;</span><span class="__shiki_140thh">, user_id, </span><span class="__shiki_mdbnqw">&quot; - &quot;</span><span class="__shiki_140thh">, message)</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        -- 发送通知</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">                        httpc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">request_uri</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;https://api.example.com/notify&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">                            method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;POST&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                            body </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                                user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user_id,</span></span>
<span class="line"><span class="__shiki_140thh">                                message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> message</span></span>
<span class="line"><span class="__shiki_140thh">                            })</span></span>
<span class="line"><span class="__shiki_140thh">                        })</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 创建延迟任务</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err = ngx.timer.at(10, handler, 1001, </span><span class="__shiki_mdbnqw">&quot;您的订单已发货&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> not ok then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(&quot;创建定时器失败: &quot;, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(&quot;定时器创建成功，10秒后执行&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 周期性任务</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> periodic_handler = function(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> not premature then</span></span>
<span class="line"><span class="__shiki_140thh">                        -- 执行周期性任务</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> cache = ngx.shared.my_cache</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> count = cache:get(</span><span class="__shiki_mdbnqw">&quot;periodic_count&quot;</span><span class="__shiki_140thh">) or 0</span></span>
<span class="line"><span class="__shiki_140thh">                        cache:set(&quot;periodic_count&quot;, </span><span class="__shiki_1itgoe">count</span><span class="__shiki_140thh"> + 1, 3600)</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        -- 重新设置定时器（实现周期性）</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> ok, err = ngx.timer.at(5, periodic_handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err = ngx.timer.at(5, periodic_handler)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /schedule-job </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 接收任务并调度</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">get_uri_args</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> job_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> args.</span><span class="__shiki_1t8gfj">type</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> tonumber</span><span class="__shiki_140thh">(args.</span><span class="__shiki_1t8gfj">delay</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_1t8gfj"> job_handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;执行调度任务: &quot;</span><span class="__shiki_140thh">, job_type)</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        -- 根据任务类型执行不同逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> job_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;email&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                            -- 发送邮件</span></span>
<span class="line"><span class="__shiki_1itgoe">                        elseif</span><span class="__shiki_140thh"> job_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;report&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                            -- 生成报告</span></span>
<span class="line"><span class="__shiki_1itgoe">                        elseif</span><span class="__shiki_140thh"> job_type </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;cleanup&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                            -- 清理数据</span></span>
<span class="line"><span class="__shiki_1itgoe">                        end</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(delay, job_handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;任务调度成功，&quot;</span><span class="__shiki_140thh">, delay, </span><span class="__shiki_mdbnqw">&quot;秒后执行&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;任务调度失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-协程与并发处理" tabindex="-1">5.3 协程与并发处理 <a class="header-anchor" href="#_5-3-协程与并发处理" aria-label="Permalink to &quot;5.3 协程与并发处理&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /coroutine-demo </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 1. 基础协程使用</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> co </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> coroutine.create</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">function</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;协程开始执行&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">            coroutine.yield</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;协程恢复执行&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        coroutine.resume</span><span class="__shiki_140thh">(co)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;主流程执行&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        coroutine.resume</span><span class="__shiki_140thh">(co)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 2. 使用ngx.thread实现并发</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> fetch_url</span><span class="__shiki_140thh">(url)</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> httpc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">request_uri</span><span class="__shiki_140thh">(url)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> res </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> {url </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> url, status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> res.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">, length </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> #</span><span class="__shiki_140thh">res.</span><span class="__shiki_1t8gfj">body</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> {url = url, </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> = err}</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 并发获取多个URL</span></span>
<span class="line"><span class="__shiki_140thh">        local urls = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;https://httpbin.org/get&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;https://httpbin.org/post&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;https://httpbin.org/status/200&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local threads = {}</span></span>
<span class="line"><span class="__shiki_140thh">        for _, url in ipairs(urls) do</span></span>
<span class="line"><span class="__shiki_140thh">            local co = ngx.thread.spawn(fetch_url, url)</span></span>
<span class="line"><span class="__shiki_140thh">            table.insert(threads, co)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 等待所有协程完成</span></span>
<span class="line"><span class="__shiki_140thh">        local results = {}</span></span>
<span class="line"><span class="__shiki_140thh">        for i, co in ipairs(threads) do</span></span>
<span class="line"><span class="__shiki_140thh">            local ok, res = ngx.thread.wait(co)</span></span>
<span class="line"><span class="__shiki_140thh">            if ok then</span></span>
<span class="line"><span class="__shiki_140thh">                results[i] = res</span></span>
<span class="line"><span class="__shiki_140thh">            else</span></span>
<span class="line"><span class="__shiki_140thh">                results[i] = {error = </span><span class="__shiki_mdbnqw">&quot;协程执行失败&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(</span><span class="__shiki_mdbnqw">&quot;并发结果: &quot;</span><span class="__shiki_140thh">, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(results))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">3.</span><span class="__shiki_140thh"> 协程超时控制</span></span>
<span class="line"><span class="__shiki_140thh">        local function long_running_task()</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.sleep(5)  -- 模拟耗时操作</span></span>
<span class="line"><span class="__shiki_140thh">            return </span><span class="__shiki_mdbnqw">&quot;任务完成&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local co = ngx.thread.spawn(long_running_task)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 设置超时</span></span>
<span class="line"><span class="__shiki_140thh">        local ok, res = ngx.thread.wait(co, 3000)  -- 3秒超时</span></span>
<span class="line"><span class="__shiki_140thh">        if not ok then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;任务超时&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.thread.kill(co)  -- 终止协程</span></span>
<span class="line"><span class="__shiki_140thh">        else</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;任务结果: &quot;</span><span class="__shiki_140thh">, res)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">4.</span><span class="__shiki_140thh"> 生产者-消费者模式</span></span>
<span class="line"><span class="__shiki_140thh">        local queue = {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local producer = ngx.thread.spawn(function()</span></span>
<span class="line"><span class="__shiki_140thh">            for i = 1, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">                table.insert(queue, </span><span class="__shiki_mdbnqw">&quot;任务&quot;</span><span class="__shiki_140thh"> .. i)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.sleep(0.5)  -- 每0.5秒生产一个任务</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">            table.insert(queue, nil)  -- 结束信号</span></span>
<span class="line"><span class="__shiki_140thh">        end)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local consumer = ngx.thread.spawn(function()</span></span>
<span class="line"><span class="__shiki_140thh">            while </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">                if </span><span class="__shiki_21nrsd">#queue &gt; 0 then</span></span>
<span class="line"><span class="__shiki_140thh">                    local task = table.remove(queue, 1)</span></span>
<span class="line"><span class="__shiki_140thh">                    if task == nil then</span></span>
<span class="line"><span class="__shiki_140thh">                        break  -- 收到结束信号</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&quot;消费: &quot;</span><span class="__shiki_140thh">, task)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.sleep(1)  -- 模拟处理时间</span></span>
<span class="line"><span class="__shiki_140thh">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.sleep(0.1)  -- 短暂等待</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        end)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.thread.wait(producer)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.thread.wait(consumer)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">5.</span><span class="__shiki_140thh"> 协程池模式</span></span>
<span class="line"><span class="__shiki_140thh">        local function worker(id, task)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;Worker &quot;</span><span class="__shiki_140thh">, id, </span><span class="__shiki_mdbnqw">&quot; 开始处理: &quot;</span><span class="__shiki_140thh">, task)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.sleep(math.random(1, 3))  -- 随机处理时间</span></span>
<span class="line"><span class="__shiki_140thh">            return </span><span class="__shiki_mdbnqw">&quot;Worker &quot;</span><span class="__shiki_140thh"> .. id .. </span><span class="__shiki_mdbnqw">&quot; 完成: &quot;</span><span class="__shiki_140thh"> .. task</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local worker_pool = {}</span></span>
<span class="line"><span class="__shiki_140thh">        local tasks = {</span><span class="__shiki_mdbnqw">&quot;A&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;B&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;C&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;D&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;E&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;F&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;G&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 创建worker池（3个worker）</span></span>
<span class="line"><span class="__shiki_140thh">        for i = 1, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">            local co = ngx.thread.spawn(function()</span></span>
<span class="line"><span class="__shiki_140thh">                while </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">                    local task = coroutine.yield()</span></span>
<span class="line"><span class="__shiki_140thh">                    if task == nil then</span></span>
<span class="line"><span class="__shiki_140thh">                        break  -- 终止worker</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    worker(i, task)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">            end)</span></span>
<span class="line"><span class="__shiki_140thh">            table.insert(worker_pool, co)</span></span>
<span class="line"><span class="__shiki_140thh">            coroutine.resume(co)  -- 启动worker</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 分发任务</span></span>
<span class="line"><span class="__shiki_140thh">        for _, task in ipairs(tasks) do</span></span>
<span class="line"><span class="__shiki_140thh">            -- 找到空闲的worker</span></span>
<span class="line"><span class="__shiki_140thh">            for _, worker_co in ipairs(worker_pool) do</span></span>
<span class="line"><span class="__shiki_140thh">                if coroutine.status(worker_co) == </span><span class="__shiki_mdbnqw">&quot;suspended&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    coroutine.resume(worker_co, task)</span></span>
<span class="line"><span class="__shiki_140thh">                    break</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 终止所有worker</span></span>
<span class="line"><span class="__shiki_140thh">        for _, worker_co in ipairs(worker_pool) do</span></span>
<span class="line"><span class="__shiki_140thh">            coroutine.resume(worker_co, nil)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-安全与防护" tabindex="-1">第六部分：安全与防护 <a class="header-anchor" href="#第六部分-安全与防护" aria-label="Permalink to &quot;第六部分：安全与防护&quot;">​</a></h2><h3 id="_6-1-输入验证与过滤" tabindex="-1">6.1 输入验证与过滤 <a class="header-anchor" href="#_6-1-输入验证与过滤" aria-label="Permalink to &quot;6.1 输入验证与过滤&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /input-validation </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> validation </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.validation&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 获取并验证参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> args </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">req</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">get_uri_args</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 1. 基础验证</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> validators </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> validation.</span><span class="__shiki_1t8gfj">string</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">minlen</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">maxlen</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">match</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;^[a-zA-Z0-9_]+$&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> validation.</span><span class="__shiki_1t8gfj">string</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">match</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;^[^@]+@[^@]+%.[^@]+$&quot;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> validation.</span><span class="__shiki_1t8gfj">number</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">120</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            score </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> validation.</span><span class="__shiki_1t8gfj">number</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">between</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> validation.</span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh">({</span><span class="__shiki_mdbnqw">&quot;active&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;inactive&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;pending&quot;</span><span class="__shiki_140thh">})</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> results = {}</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> field, validator in pairs(validators) do</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> value = args[field]</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ok, err = validator(value)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> not ok then</span></span>
<span class="line"><span class="__shiki_140thh">                results[field] = {</span><span class="__shiki_1itgoe">valid</span><span class="__shiki_140thh"> = false, </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> = err}</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span></span>
<span class="line"><span class="__shiki_140thh">                results[field] = {</span><span class="__shiki_1itgoe">valid</span><span class="__shiki_140thh"> = true, value = value}</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 2. XSS防护</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> function escape_html(str)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> not str then return str end</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> (str:gsub(</span><span class="__shiki_mdbnqw">&quot;[&lt;&gt;&amp;</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">&#39;]&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;&lt;&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;&amp;lt;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;&gt;&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;&amp;gt;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;&amp;&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;&amp;amp;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&#39;&quot;&#39;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;&amp;quot;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                [</span><span class="__shiki_mdbnqw">&quot;&#39;&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;&amp;#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            }))</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">3.</span><span class="__shiki_140thh"> SQL注入防护</span></span>
<span class="line"><span class="__shiki_140thh">        local function safe_sql_value(val)</span></span>
<span class="line"><span class="__shiki_140thh">            if val == nil then return </span><span class="__shiki_mdbnqw">&quot;NULL&quot;</span><span class="__shiki_140thh"> end</span></span>
<span class="line"><span class="__shiki_140thh">            if type(val) == </span><span class="__shiki_mdbnqw">&quot;number&quot;</span><span class="__shiki_140thh"> then return tostring(val) end</span></span>
<span class="line"><span class="__shiki_140thh">            return </span><span class="__shiki_mdbnqw">&quot;&#39;&quot;</span><span class="__shiki_140thh"> .. ngx.quote_sql_str(val) .. </span><span class="__shiki_mdbnqw">&quot;&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">4.</span><span class="__shiki_140thh"> 文件上传验证</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.req.read_body()</span></span>
<span class="line"><span class="__shiki_140thh">        local upload = require </span><span class="__shiki_mdbnqw">&quot;resty.upload&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        local form, err = upload:new()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        if not form then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(</span><span class="__shiki_mdbnqw">&quot;表单解析失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">            return</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local max_file_size = </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh"> * </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">  -- 1MB</span></span>
<span class="line"><span class="__shiki_140thh">        local allowed_types = {</span></span>
<span class="line"><span class="__shiki_140thh">            [</span><span class="__shiki_mdbnqw">&quot;image/jpeg&quot;</span><span class="__shiki_140thh">] = true,</span></span>
<span class="line"><span class="__shiki_140thh">            [</span><span class="__shiki_mdbnqw">&quot;image/png&quot;</span><span class="__shiki_140thh">] = true,</span></span>
<span class="line"><span class="__shiki_140thh">            [</span><span class="__shiki_mdbnqw">&quot;application/pdf&quot;</span><span class="__shiki_140thh">] = true</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        local file_info = {}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        while </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">            local typ, res, err = form:read()</span></span>
<span class="line"><span class="__shiki_140thh">            if not typ then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(</span><span class="__shiki_mdbnqw">&quot;读取失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                break</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            if typ == </span><span class="__shiki_mdbnqw">&quot;header&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                local name = res[1]</span></span>
<span class="line"><span class="__shiki_140thh">                local value = res[2]</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                if name:lower() == </span><span class="__shiki_mdbnqw">&quot;content-disposition&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    -- 解析文件名</span></span>
<span class="line"><span class="__shiki_140thh">                    local filename = value:match(</span><span class="__shiki_mdbnqw">&#39;filename=&quot;([^&quot;]+)&quot;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    if filename then</span></span>
<span class="line"><span class="__shiki_140thh">                        file_info.filename = filename</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                elseif name:lower() == </span><span class="__shiki_mdbnqw">&quot;content-type&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    file_info.content_type = value</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">            elseif typ == </span><span class="__shiki_mdbnqw">&quot;body&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                -- 验证文件类型</span></span>
<span class="line"><span class="__shiki_140thh">                if not allowed_types[file_info.content_type] then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&quot;不支持的文件类型: &quot;</span><span class="__shiki_140thh">, file_info.content_type)</span></span>
<span class="line"><span class="__shiki_140thh">                    break</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 验证文件大小</span></span>
<span class="line"><span class="__shiki_140thh">                file_info.size = (file_info.size or 0) + </span><span class="__shiki_21nrsd">#res</span></span>
<span class="line"><span class="__shiki_140thh">                if file_info.size &gt; max_file_size then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&quot;文件大小超过限制&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    break</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">            elseif typ == </span><span class="__shiki_mdbnqw">&quot;part_end&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                if file_info.filename then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&quot;文件上传成功: &quot;</span><span class="__shiki_140thh">, file_info.filename)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                file_info = {}</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">            elseif typ == </span><span class="__shiki_mdbnqw">&quot;eof&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                break</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- </span><span class="__shiki_dzsirb">5.</span><span class="__shiki_140thh"> 输出验证结果</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(</span><span class="__shiki_mdbnqw">&quot;验证结果: &quot;</span><span class="__shiki_140thh">, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(results))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-jwt身份验证" tabindex="-1">6.2 JWT身份验证 <a class="header-anchor" href="#_6-2-jwt身份验证" aria-label="Permalink to &quot;6.2 JWT身份验证&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /jwt-auth </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> jwt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.jwt&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> validators </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.jwt-validators&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 从Header获取Token</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> auth_header </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http_Authorization</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> auth_header </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_UNAUTHORIZED</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> token </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> auth_header</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">match</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Bearer%s+(.+)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> token </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_UNAUTHORIZED</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- JWT密钥（从配置或环境变量获取）</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> secret </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;your-secret-key-here&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 验证JWT</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> jwt_obj </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> jwt</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">verify</span><span class="__shiki_140thh">(secret, token)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> jwt_obj.</span><span class="__shiki_1t8gfj">verified</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;JWT验证失败: &quot;</span><span class="__shiki_140thh">, jwt_obj.</span><span class="__shiki_1t8gfj">reason</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_UNAUTHORIZED</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 验证标准声明</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> validators </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.jwt-validators&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> check_validators </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            validators.</span><span class="__shiki_dzsirb">isset</span><span class="__shiki_140thh">(jwt_obj.</span><span class="__shiki_1t8gfj">payload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">exp</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            validators.</span><span class="__shiki_dzsirb">is_not_expired</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">            validators.</span><span class="__shiki_dzsirb">isset</span><span class="__shiki_140thh">(jwt_obj.</span><span class="__shiki_1t8gfj">payload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">iss</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            validators.</span><span class="__shiki_dzsirb">equals</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;your-issuer&quot;</span><span class="__shiki_140thh">, jwt_obj.</span><span class="__shiki_1t8gfj">payload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">iss</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            validators.</span><span class="__shiki_dzsirb">isset</span><span class="__shiki_140thh">(jwt_obj.</span><span class="__shiki_1t8gfj">payload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">aud</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">            validators.</span><span class="__shiki_dzsirb">equals</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;your-audience&quot;</span><span class="__shiki_140thh">, jwt_obj.</span><span class="__shiki_1t8gfj">payload</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">aud</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, validator in ipairs(check_validators) do</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ok, err = validator(jwt_obj.payload, jwt_obj.header)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> not ok then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.log(ngx.ERR, &quot;JWT声明验证失败: &quot;, err)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.exit(ngx.HTTP_UNAUTHORIZED)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 验证自定义声明</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> not jwt_obj.payload.roles then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.log(ngx.ERR, &quot;JWT缺少roles声明&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.exit(ngx.HTTP_UNAUTHORIZED)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 检查权限</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> required_roles = {</span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;editor&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> has_role = false</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, role in ipairs(jwt_obj.payload.roles) do</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> _, required in ipairs(required_roles) do</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> role == required then</span></span>
<span class="line"><span class="__shiki_1itgoe">                    has_role</span><span class="__shiki_140thh"> = true</span></span>
<span class="line"><span class="__shiki_1itgoe">                    break</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> not has_role then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.exit(ngx.HTTP_FORBIDDEN)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 将用户信息存储到ngx.ctx中供后续使用</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.ctx.</span><span class="__shiki_1itgoe">user</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">            id</span><span class="__shiki_140thh"> = jwt_obj.payload.sub,</span></span>
<span class="line"><span class="__shiki_1itgoe">            username</span><span class="__shiki_140thh"> = jwt_obj.payload.username,</span></span>
<span class="line"><span class="__shiki_1itgoe">            roles</span><span class="__shiki_140thh"> = jwt_obj.payload.roles,</span></span>
<span class="line"><span class="__shiki_1itgoe">            permissions</span><span class="__shiki_140thh"> = jwt_obj.payload.permissions or {}</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">ctx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">user</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;欢迎, &quot;</span><span class="__shiki_140thh">, user.</span><span class="__shiki_1t8gfj">username</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;您的角色: &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">table.concat</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">roles</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;, &quot;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;您的权限: &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">permissions</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /jwt-generate </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> jwt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.jwt&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cjson </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;cjson&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> secret </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;your-secret-key-here&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 创建JWT payload</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> payload </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            iss </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;your-issuer&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            aud </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;your-audience&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            sub </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;user123&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            exp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 3600</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">-- 1小时后过期</span></span>
<span class="line"><span class="__shiki_140thh">            iat </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now,</span></span>
<span class="line"><span class="__shiki_140thh">            nbf </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> now,         </span><span class="__shiki_21nrsd">-- 不早于当前时间生效</span></span>
<span class="line"><span class="__shiki_140thh">            jti </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">md5</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">worker</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">pid</span><span class="__shiki_140thh">()),  </span><span class="__shiki_21nrsd">-- 唯一ID</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 自定义声明</span></span>
<span class="line"><span class="__shiki_140thh">            username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;alice&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;alice@example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            roles </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_mdbnqw">&quot;user&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1itgoe">            permissions</span><span class="__shiki_140thh"> = {</span><span class="__shiki_mdbnqw">&quot;read&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;write&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;delete&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 生成JWT</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> token = jwt:sign(secret, {</span></span>
<span class="line"><span class="__shiki_1itgoe">            header</span><span class="__shiki_140thh"> = {typ = </span><span class="__shiki_mdbnqw">&quot;JWT&quot;</span><span class="__shiki_140thh">, alg = </span><span class="__shiki_mdbnqw">&quot;HS256&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_1itgoe">            payload</span><span class="__shiki_140thh"> = payload</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.header[&quot;Content-Type&quot;] = &quot;</span><span class="__shiki_dzsirb">application/json</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        ngx.say(cjson.encode({</span></span>
<span class="line"><span class="__shiki_mdbnqw">            access_token = token,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            token_type = &quot;</span><span class="__shiki_140thh">Bearer</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            expires_in = 3600,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            user = {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                username = payload.username,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                roles = payload.roles</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }))</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h2 id="第七部分-缓存与性能优化" tabindex="-1">第七部分：缓存与性能优化 <a class="header-anchor" href="#第七部分-缓存与性能优化" aria-label="Permalink to &quot;第七部分：缓存与性能优化&quot;">​</a></h2><h3 id="_7-1-lua缓存策略" tabindex="-1">7.1 Lua缓存策略 <a class="header-anchor" href="#_7-1-lua缓存策略" aria-label="Permalink to &quot;7.1 Lua缓存策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> lru_cache </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> ttl_cache </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /lru-cache </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> lrucache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.lrucache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 创建LRU缓存（最大1000个条目）</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cache, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> lrucache.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;创建LRU缓存失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 设置缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;value1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;key2&quot;</span><span class="__shiki_140thh">, {data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;value2&quot;</span><span class="__shiki_140thh">, time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">()})</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> value = cache:get(</span><span class="__shiki_mdbnqw">&quot;key1&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> value then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(&quot;缓存命中: &quot;, value)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(&quot;缓存未命中&quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 删除缓存</span></span>
<span class="line"><span class="__shiki_140thh">                cache:delete(&quot;key1&quot;)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> count = cache:count()</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(&quot;缓存条目数: &quot;, count)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /ttl-cache </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ttl_cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ttl_cache</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 带TTL的缓存封装</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> cached_get</span><span class="__shiki_140thh">(key, ttl, fetch_func)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ttl_cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                        return</span><span class="__shiki_140thh"> value, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  -- 缓存命中</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 缓存未命中，获取数据</span></span>
<span class="line"><span class="__shiki_140thh">                    value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> fetch_func</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> succ, err, forcible </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ttl_cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(key, value, ttl)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        if</span><span class="__shiki_140thh"> succ </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                            return</span><span class="__shiki_140thh"> value, </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_1itgoe">                        else</span></span>
<span class="line"><span class="__shiki_140thh">                            ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;缓存设置失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        end</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> value, </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 使用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> fetch_user_data</span><span class="__shiki_140thh">(user_id)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">sleep</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">-- 模拟耗时操作</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                        id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> user_id,</span></span>
<span class="line"><span class="__shiki_140thh">                        name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;User &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> user_id,</span></span>
<span class="line"><span class="__shiki_140thh">                        time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> user_id = ngx.var.arg_id or </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> data, cached = cached_get(</span><span class="__shiki_mdbnqw">&quot;user:&quot;</span><span class="__shiki_140thh"> .. user_id, 30, function()</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> fetch_user_data(user_id)</span></span>
<span class="line"><span class="__shiki_140thh">                end)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                if cached then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&quot;缓存命中: &quot;</span><span class="__shiki_140thh">, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(data))</span></span>
<span class="line"><span class="__shiki_140thh">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&quot;缓存未命中，重新获取: &quot;</span><span class="__shiki_140thh">, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(data))</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /cache-patterns {</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                -- </span><span class="__shiki_dzsirb">1.</span><span class="__shiki_140thh"> 缓存穿透防护</span></span>
<span class="line"><span class="__shiki_140thh">                local cache = ngx.shared.lru_cache</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local function get_with_penetration_protection(key, fetch_func)</span></span>
<span class="line"><span class="__shiki_140thh">                    local value = cache:get(key)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    -- 如果是特殊标记的</span><span class="__shiki_mdbnqw">&quot;空值&quot;</span><span class="__shiki_140thh">，直接返回nil</span></span>
<span class="line"><span class="__shiki_140thh">                    if value == </span><span class="__shiki_mdbnqw">&quot;__nil__&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                        return nil</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if value then</span></span>
<span class="line"><span class="__shiki_140thh">                        return value</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    -- 获取数据</span></span>
<span class="line"><span class="__shiki_140thh">                    value = fetch_func()</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if value == nil then</span></span>
<span class="line"><span class="__shiki_140thh">                        -- 缓存空值，防止缓存穿透</span></span>
<span class="line"><span class="__shiki_140thh">                        cache:set(key, </span><span class="__shiki_mdbnqw">&quot;__nil__&quot;</span><span class="__shiki_140thh">, 60)  -- 空值缓存60秒</span></span>
<span class="line"><span class="__shiki_140thh">                        return nil</span></span>
<span class="line"><span class="__shiki_140thh">                    else</span></span>
<span class="line"><span class="__shiki_140thh">                        cache:set(key, value, 300)  -- 正常缓存5分钟</span></span>
<span class="line"><span class="__shiki_140thh">                        return value</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- </span><span class="__shiki_dzsirb">2.</span><span class="__shiki_140thh"> 缓存雪崩防护 - 随机过期时间</span></span>
<span class="line"><span class="__shiki_140thh">                local function get_with_avalanche_protection(key, fetch_func, base_ttl)</span></span>
<span class="line"><span class="__shiki_140thh">                    local value = cache:get(key)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if value then</span></span>
<span class="line"><span class="__shiki_140thh">                        return value</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    -- 获取数据</span></span>
<span class="line"><span class="__shiki_140thh">                    value = fetch_func()</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if value then</span></span>
<span class="line"><span class="__shiki_140thh">                        -- 添加随机偏移，防止同时过期</span></span>
<span class="line"><span class="__shiki_140thh">                        local random_offset = math.random(1, 30)  -- 1-30秒随机偏移</span></span>
<span class="line"><span class="__shiki_140thh">                        local ttl = base_ttl + random_offset</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        cache:set(key, value, ttl)</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    return value</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- </span><span class="__shiki_dzsirb">3.</span><span class="__shiki_140thh"> 缓存击穿防护 - 互斥锁</span></span>
<span class="line"><span class="__shiki_140thh">                local function get_with_mutex_lock(key, fetch_func, ttl)</span></span>
<span class="line"><span class="__shiki_140thh">                    local value = cache:get(key)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if value then</span></span>
<span class="line"><span class="__shiki_140thh">                        return value</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    -- 尝试获取锁</span></span>
<span class="line"><span class="__shiki_140thh">                    local lock_key = key .. </span><span class="__shiki_mdbnqw">&quot;:lock&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    local lock_ttl = </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">  -- 锁5秒过期</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    local lock_acquired = cache:add(lock_key, 1, lock_ttl)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if lock_acquired then</span></span>
<span class="line"><span class="__shiki_140thh">                        -- 获取到锁，加载数据</span></span>
<span class="line"><span class="__shiki_140thh">                        value = fetch_func()</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        if value then</span></span>
<span class="line"><span class="__shiki_140thh">                            cache:set(key, value, ttl)</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        -- 释放锁</span></span>
<span class="line"><span class="__shiki_140thh">                        cache:delete(lock_key)</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        return value</span></span>
<span class="line"><span class="__shiki_140thh">                    else</span></span>
<span class="line"><span class="__shiki_140thh">                        -- 未获取到锁，等待并重试</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.sleep(0.1)  -- 等待100ms</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        -- 重试</span></span>
<span class="line"><span class="__shiki_140thh">                        for i = 1, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh"> do  -- 最多重试10次</span></span>
<span class="line"><span class="__shiki_140thh">                            value = cache:get(key)</span></span>
<span class="line"><span class="__shiki_140thh">                            if value then</span></span>
<span class="line"><span class="__shiki_140thh">                                return value</span></span>
<span class="line"><span class="__shiki_140thh">                            end</span></span>
<span class="line"><span class="__shiki_140thh">                            ngx.sleep(0.1)</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        -- 重试失败，直接获取</span></span>
<span class="line"><span class="__shiki_140thh">                        value = fetch_func()</span></span>
<span class="line"><span class="__shiki_140thh">                        if value then</span></span>
<span class="line"><span class="__shiki_140thh">                            cache:set(key, value, ttl)</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        return value</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- </span><span class="__shiki_dzsirb">4.</span><span class="__shiki_140thh"> 热点数据缓存预热</span></span>
<span class="line"><span class="__shiki_140thh">                local function warmup_cache(keys, fetch_func, ttl)</span></span>
<span class="line"><span class="__shiki_140thh">                    for _, key in ipairs(keys) do</span></span>
<span class="line"><span class="__shiki_140thh">                        local value = fetch_func(key)</span></span>
<span class="line"><span class="__shiki_140thh">                        if value then</span></span>
<span class="line"><span class="__shiki_140thh">                            cache:set(key, value, ttl)</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 示例使用</span></span>
<span class="line"><span class="__shiki_140thh">                local user_data, cached = get_with_mutex_lock(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;user:1001&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    function()</span></span>
<span class="line"><span class="__shiki_140thh">                        -- 模拟数据库查询</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.sleep(0.5)</span></span>
<span class="line"><span class="__shiki_140thh">                        return {id = 1001, name = </span><span class="__shiki_mdbnqw">&quot;Alice&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">                    end,</span></span>
<span class="line"><span class="__shiki_140thh">                    300</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                if user_data then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&quot;用户数据: &quot;</span><span class="__shiki_140thh">, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(user_data))</span></span>
<span class="line"><span class="__shiki_140thh">                    if cached then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.say(</span><span class="__shiki_mdbnqw">&quot;(来自缓存)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-性能监控与调优" tabindex="-1">7.2 性能监控与调优 <a class="header-anchor" href="#_7-2-性能监控与调优" aria-label="Permalink to &quot;7.2 性能监控与调优&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> stats </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 初始化统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_time&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;errors&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_hits&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_misses&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 性能监控定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_1t8gfj"> monitor_handler</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(premature)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> premature </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> total_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_time&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> errors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;errors&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> avg_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    avg_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> total_time </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> requests</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> error_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    error_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errors </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">string.format</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;性能统计 - 请求数: %d, 平均响应时间: %.3fs, 错误率: %.2f%%&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    requests, avg_time, error_rate</span></span>
<span class="line"><span class="__shiki_140thh">                ))</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 重置小时统计</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> now </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> 3600</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span><span class="__shiki_21nrsd">  -- 每小时重置</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hourly_requests&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hourly_time&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 重新设置定时器</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, monitor_handler)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">timer</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">at</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, monitor_handler)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 记录请求统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> request_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> tonumber</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_time</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> old_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_time&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_time&quot;</span><span class="__shiki_140thh">, old_time </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> request_time)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 错误统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_dzsirb"> tonumber</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;errors&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 缓存命中率统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cache_status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">upstream_cache_status</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> cache_status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;HIT&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_hits&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elseif</span><span class="__shiki_140thh"> cache_status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;MISS&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_misses&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 慢请求日志</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> slow_threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_21nrsd">  -- 1秒</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> request_time </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> slow_threshold </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">WARN</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">string.format</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;慢请求: %s %s 耗时: %.3fs&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_method</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                request_time</span></span>
<span class="line"><span class="__shiki_140thh">            ))</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /stats </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stats</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> total_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_time&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> errors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;errors&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cache_hits </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_hits&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cache_misses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_misses&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> avg_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    avg_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> total_time </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> requests</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> error_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    error_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> errors </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cache_total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache_hits </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> cache_misses</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cache_hit_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> cache_total </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    cache_hit_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache_hits </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> cache_total </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                    requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> requests,</span></span>
<span class="line"><span class="__shiki_140thh">                    average_response_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> avg_time,</span></span>
<span class="line"><span class="__shiki_140thh">                    error_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> error_rate,</span></span>
<span class="line"><span class="__shiki_140thh">                    cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                        hits </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache_hits,</span></span>
<span class="line"><span class="__shiki_140thh">                        misses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache_misses,</span></span>
<span class="line"><span class="__shiki_140thh">                        hit_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cache_hit_rate</span></span>
<span class="line"><span class="__shiki_140thh">                    },</span></span>
<span class="line"><span class="__shiki_1itgoe">                    worker</span><span class="__shiki_140thh"> = {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        id</span><span class="__shiki_140thh"> = ngx.worker.id(),</span></span>
<span class="line"><span class="__shiki_1itgoe">                        pid </span><span class="__shiki_140thh">= ngx.worker.pid(),</span></span>
<span class="line"><span class="__shiki_140thh">                        count = ngx.worker.count()</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /benchmark {</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                -- 简单的基准测试</span></span>
<span class="line"><span class="__shiki_140thh">                local start_time = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 测试字符串操作性能</span></span>
<span class="line"><span class="__shiki_140thh">                local str_ops = 100000</span></span>
<span class="line"><span class="__shiki_140thh">                local str = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                for i = 1, str_ops do</span></span>
<span class="line"><span class="__shiki_140thh">                    str = str .. </span><span class="__shiki_mdbnqw">&quot;test&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local str_time = ngx.now() - start_time</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 测试表操作性能</span></span>
<span class="line"><span class="__shiki_140thh">                start_time = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                local tbl = {}</span></span>
<span class="line"><span class="__shiki_140thh">                for i = 1, str_ops do</span></span>
<span class="line"><span class="__shiki_140thh">                    tbl[i] = </span><span class="__shiki_mdbnqw">&quot;test&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                local table_time = ngx.now() - start_time</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 测试数学运算性能</span></span>
<span class="line"><span class="__shiki_140thh">                start_time = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                local sum = 0</span></span>
<span class="line"><span class="__shiki_140thh">                for i = 1, str_ops do</span></span>
<span class="line"><span class="__shiki_140thh">                    sum = sum + math.sqrt(i)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                local math_time = ngx.now() - start_time</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(string.format([[</span></span>
<span class="line"><span class="__shiki_140thh">基准测试结果:</span></span>
<span class="line"><span class="__shiki_140thh">============</span></span>
<span class="line"><span class="__shiki_140thh">字符串拼接 (%d次): %.4f 秒</span></span>
<span class="line"><span class="__shiki_140thh">表操作 (%d次): %.4f 秒</span></span>
<span class="line"><span class="__shiki_140thh">数学运算 (%d次): %.4f 秒</span></span>
<span class="line"><span class="__shiki_140thh">]], str_ops, str_time, str_ops, table_time, str_ops, math_time))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /profiling {</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                -- 简单的性能分析</span></span>
<span class="line"><span class="__shiki_140thh">                local </span><span class="__shiki_dzsirb">debug</span><span class="__shiki_140thh"> = require </span><span class="__shiki_mdbnqw">&quot;debug&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 定义要分析的函数</span></span>
<span class="line"><span class="__shiki_140thh">                local function slow_function()</span></span>
<span class="line"><span class="__shiki_140thh">                    local result = 0</span></span>
<span class="line"><span class="__shiki_140thh">                    for i = 1, </span><span class="__shiki_dzsirb">1000000</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">                        result = result + math.sin(i) * math.cos(i)</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    return result</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local function fast_function()</span></span>
<span class="line"><span class="__shiki_140thh">                    local result = 0</span></span>
<span class="line"><span class="__shiki_140thh">                    for i = 1, </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">                        result = result + i * i</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    return result</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 测量执行时间</span></span>
<span class="line"><span class="__shiki_140thh">                local function measure_time(func, name)</span></span>
<span class="line"><span class="__shiki_140thh">                    local start = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                    local result = func()</span></span>
<span class="line"><span class="__shiki_140thh">                    local elapsed = ngx.now() - start</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(string.format(</span><span class="__shiki_mdbnqw">&quot;%s: %.6f 秒, 结果: %s&quot;</span><span class="__shiki_140thh">, name, elapsed, tostring(result)))</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                measure_time(slow_function, </span><span class="__shiki_mdbnqw">&quot;慢函数&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                measure_time(fast_function, </span><span class="__shiki_mdbnqw">&quot;快函数&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 内存使用分析</span></span>
<span class="line"><span class="__shiki_140thh">                collectgarbage(</span><span class="__shiki_mdbnqw">&quot;collect&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                local before = collectgarbage(</span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                slow_function()</span></span>
<span class="line"><span class="__shiki_140thh">                local after = collectgarbage(</span><span class="__shiki_mdbnqw">&quot;count&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(string.format(</span><span class="__shiki_mdbnqw">&quot;内存使用: %.2f KB&quot;</span><span class="__shiki_140thh">, after - before))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第八部分-实战项目示例" tabindex="-1">第八部分：实战项目示例 <a class="header-anchor" href="#第八部分-实战项目示例" aria-label="Permalink to &quot;第八部分：实战项目示例&quot;">​</a></h2><h3 id="_8-1-api网关实现" tabindex="-1">8.1 API网关实现 <a class="header-anchor" href="#_8-1-api网关实现" aria-label="Permalink to &quot;8.1 API网关实现&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> api_keys </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> rate_limits </span><span class="__shiki_dzsirb">50m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> circuit_breakers </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 加载API路由配置</span></span>
<span class="line"><span class="__shiki_dzsirb">        package.path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> package.path</span><span class="__shiki_1itgoe"> ..</span><span class="__shiki_mdbnqw"> &#39;;/usr/local/openresty/lua/?.lua&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> router </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;api_router&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 初始化API路由</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_1t8gfj">ctx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">api_router</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> router.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 加载API配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> apis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_140thh">                name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;user_service&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                upstream </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;http://user-service:8080&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                routes </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    {method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;GET&quot;</span><span class="__shiki_140thh">, path </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;/api/v1/users&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span><span class="__shiki_1itgoe">method</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, path = </span><span class="__shiki_mdbnqw">&quot;/api/v1/users/(%d+)&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span><span class="__shiki_1itgoe">method</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;POST&quot;</span><span class="__shiki_140thh">, path = </span><span class="__shiki_mdbnqw">&quot;/api/v1/users&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span><span class="__shiki_1itgoe">method</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;PUT&quot;</span><span class="__shiki_140thh">, path = </span><span class="__shiki_mdbnqw">&quot;/api/v1/users/(%d+)&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span><span class="__shiki_1itgoe">method</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;DELETE&quot;</span><span class="__shiki_140thh">, path = </span><span class="__shiki_mdbnqw">&quot;/api/v1/users/(%d+)&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_1itgoe">                rate_limit</span><span class="__shiki_140thh"> = {requests = 100, period = 60},  -- 100次/分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">                timeout </span><span class="__shiki_140thh">= 5000,  -- 5秒超时</span></span>
<span class="line"><span class="__shiki_140thh">                retry = {times = 3, delay = 100}  -- 重试3次，间隔100ms</span></span>
<span class="line"><span class="__shiki_140thh">            },</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_140thh">                name = </span><span class="__shiki_mdbnqw">&quot;product_service&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                upstream = </span><span class="__shiki_mdbnqw">&quot;http://product-service:8081&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                routes = {</span></span>
<span class="line"><span class="__shiki_140thh">                    {method = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, path = </span><span class="__shiki_mdbnqw">&quot;/api/v1/products&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                    {method = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, path = </span><span class="__shiki_mdbnqw">&quot;/api/v1/products/(%d+)&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">                    {method = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span><span class="__shiki_140thh">, path = </span><span class="__shiki_mdbnqw">&quot;/api/v1/products/search&quot;</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">                },</span></span>
<span class="line"><span class="__shiki_140thh">                rate_limit = {requests = 1000, period = 60},</span></span>
<span class="line"><span class="__shiki_140thh">                cache = {ttl = 300}  -- 缓存5分钟</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        for _, api in ipairs(apis) do</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.ctx.api_router:add_api(api)</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    server {</span></span>
<span class="line"><span class="__shiki_140thh">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">api.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 全局CORS配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Access-Control-Allow-Origin </span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Access-Control-Allow-Methods </span><span class="__shiki_mdbnqw">&quot;GET, POST, PUT, DELETE, OPTIONS&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Access-Control-Allow-Headers </span><span class="__shiki_mdbnqw">&quot;Authorization, Content-Type&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Access-Control-Allow-Credentials </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # API网关处理链</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> gateway </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;api_gateway&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 1. 请求预处理</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> gateway.</span><span class="__shiki_dzsirb">preprocess</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;请求预处理失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_BAD_REQUEST</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 2. 认证验证</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> user, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> gateway.</span><span class="__shiki_dzsirb">authenticate</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> user </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;认证失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_UNAUTHORIZED</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">ctx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">user</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> user</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 3. 权限检查</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> allowed, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> gateway.</span><span class="__shiki_dzsirb">authorize</span><span class="__shiki_140thh">(user)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> allowed </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;权限不足: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_FORBIDDEN</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 4. 频率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> passed, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> gateway.</span><span class="__shiki_dzsirb">rate_limit</span><span class="__shiki_140thh">(user)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> passed </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;频率限制: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_TOO_MANY_REQUESTS</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 5. 路由匹配</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> api_config, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">ctx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">api_router</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">match</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_method</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> api_config </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;路由未找到: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_NOT_FOUND</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">ctx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">api_config</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> api_config</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 6. 熔断器检查</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> circuit_ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> gateway.</span><span class="__shiki_dzsirb">check_circuit_breaker</span><span class="__shiki_140thh">(api_config.</span><span class="__shiki_1t8gfj">name</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> circuit_ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;服务熔断: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_SERVICE_UNAVAILABLE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 代理到具体服务</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">$upstream;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 代理设置</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-User-ID $ctx_user_id;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_connect_timeout </span><span class="__shiki_dzsirb">3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_send_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_read_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout invalid_header http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_next_upstream_tries </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 响应后处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            header_filter_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> gateway = require </span><span class="__shiki_mdbnqw">&quot;api_gateway&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                gateway.postprocess()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            body_filter_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> gateway = require </span><span class="__shiki_mdbnqw">&quot;api_gateway&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                gateway.transform_response()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> gateway </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;api_gateway&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                gateway.</span><span class="__shiki_dzsirb">log_request</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 更新熔断器状态</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_dzsirb"> tonumber</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    gateway.</span><span class="__shiki_dzsirb">update_circuit_breaker</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ctx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">api_config</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">name</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;failure&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    gateway.</span><span class="__shiki_dzsirb">update_circuit_breaker</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ctx</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">api_config</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">name</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;success&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 管理接口</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /admin/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> admin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;api_admin&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> allowed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> admin.</span><span class="__shiki_dzsirb">check_access</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> allowed </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_FORBIDDEN</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> admin </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;api_admin&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">match</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/admin/stats&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    admin.</span><span class="__shiki_dzsirb">show_stats</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">match</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/admin/keys&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    admin.</span><span class="__shiki_dzsirb">manage_api_keys</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                elseif</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">match</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/admin/circuit&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    admin.</span><span class="__shiki_dzsirb">manage_circuit_breakers</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_NOT_FOUND</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /health </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> health </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;api_health&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> health.</span><span class="__shiki_dzsirb">check</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">healthy</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;OK&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">HTTP_SERVICE_UNAVAILABLE</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).</span><span class="__shiki_dzsirb">encode</span><span class="__shiki_140thh">(status))</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # Metrics端点（Prometheus格式）</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /metrics </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;api_metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;text/plain; version=0.0.4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(metrics.</span><span class="__shiki_dzsirb">export</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-实时websocket服务" tabindex="-1">8.2 实时WebSocket服务 <a class="header-anchor" href="#_8-2-实时websocket服务" aria-label="Permalink to &quot;8.2 实时WebSocket服务&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> ws_connections </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> ws_rooms </span><span class="__shiki_dzsirb">50m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> ws_sessions </span><span class="__shiki_dzsirb">20m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- WebSocket连接管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> websocket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;websocket_manager&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        websocket.</span><span class="__shiki_dzsirb">init</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /ws </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # WebSocket升级</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ws </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.websocket.server&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 验证WebSocket连接</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> wb, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> ws</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                    timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">-- 5秒超时</span></span>
<span class="line"><span class="__shiki_140thh">                    max_payload_len </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 65535</span><span class="__shiki_21nrsd">  -- 最大载荷长度</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> not wb then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.log(ngx.ERR, &quot;WebSocket创建失败: &quot;, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> ngx.exit(400)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.ctx.ws = wb</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                local ws = ngx.ctx.ws</span></span>
<span class="line"><span class="__shiki_140thh">                local manager = require </span><span class="__shiki_mdbnqw">&quot;websocket_manager&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 获取连接信息</span></span>
<span class="line"><span class="__shiki_140thh">                local client_id = ngx.var.arg_client_id or ngx.md5(ngx.var.remote_addr .. ngx.now())</span></span>
<span class="line"><span class="__shiki_140thh">                local room_id = ngx.var.arg_room_id or </span><span class="__shiki_mdbnqw">&quot;default&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 注册连接</span></span>
<span class="line"><span class="__shiki_140thh">                manager.register_connection(client_id, room_id, ws)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 发送欢迎消息</span></span>
<span class="line"><span class="__shiki_140thh">                ws:send_text(</span><span class="__shiki_mdbnqw">&#39;{&quot;type&quot;:&quot;welcome&quot;,&quot;client_id&quot;:&quot;&#39;</span><span class="__shiki_140thh"> .. client_id .. </span><span class="__shiki_mdbnqw">&#39;&quot;,&quot;room&quot;:&quot;&#39;</span><span class="__shiki_140thh"> .. room_id .. </span><span class="__shiki_mdbnqw">&#39;&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 广播新用户加入</span></span>
<span class="line"><span class="__shiki_140thh">                manager.broadcast(room_id, </span><span class="__shiki_mdbnqw">&#39;{&quot;type&quot;:&quot;join&quot;,&quot;client_id&quot;:&quot;&#39;</span><span class="__shiki_140thh"> .. client_id .. </span><span class="__shiki_mdbnqw">&#39;&quot;}&#39;</span><span class="__shiki_140thh">, client_id)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 消息处理循环</span></span>
<span class="line"><span class="__shiki_140thh">                while </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">                    local data, typ, err = ws:recv_frame()</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if ws.fatal then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.log(ngx.ERR, </span><span class="__shiki_mdbnqw">&quot;WebSocket致命错误: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                        break</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if not data then</span></span>
<span class="line"><span class="__shiki_140thh">                        -- 接收超时，发送ping</span></span>
<span class="line"><span class="__shiki_140thh">                        local bytes, err = ws:send_ping()</span></span>
<span class="line"><span class="__shiki_140thh">                        if not bytes then</span></span>
<span class="line"><span class="__shiki_140thh">                            ngx.log(ngx.ERR, </span><span class="__shiki_mdbnqw">&quot;发送ping失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                            break</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                    else</span></span>
<span class="line"><span class="__shiki_140thh">                        -- 处理消息</span></span>
<span class="line"><span class="__shiki_140thh">                        if typ == </span><span class="__shiki_mdbnqw">&quot;close&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            -- 关闭连接</span></span>
<span class="line"><span class="__shiki_140thh">                            break</span></span>
<span class="line"><span class="__shiki_140thh">                        elseif typ == </span><span class="__shiki_mdbnqw">&quot;ping&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            -- 响应pong</span></span>
<span class="line"><span class="__shiki_140thh">                            ws:send_pong()</span></span>
<span class="line"><span class="__shiki_140thh">                        elseif typ == </span><span class="__shiki_mdbnqw">&quot;pong&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            -- 收到pong，不做处理</span></span>
<span class="line"><span class="__shiki_140thh">                        elseif typ == </span><span class="__shiki_mdbnqw">&quot;text&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            -- 处理文本消息</span></span>
<span class="line"><span class="__shiki_140thh">                            local ok, msg = pcall(require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).decode, data)</span></span>
<span class="line"><span class="__shiki_140thh">                            if ok and msg then</span></span>
<span class="line"><span class="__shiki_140thh">                                if msg.type == </span><span class="__shiki_mdbnqw">&quot;message&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                                    -- 广播消息</span></span>
<span class="line"><span class="__shiki_140thh">                                    msg.sender = client_id</span></span>
<span class="line"><span class="__shiki_140thh">                                    msg.timestamp = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                                    manager.broadcast(room_id, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(msg), client_id)</span></span>
<span class="line"><span class="__shiki_140thh">                                    </span></span>
<span class="line"><span class="__shiki_140thh">                                elseif msg.type == </span><span class="__shiki_mdbnqw">&quot;private&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                                    -- 私聊消息</span></span>
<span class="line"><span class="__shiki_140thh">                                    if msg.to then</span></span>
<span class="line"><span class="__shiki_140thh">                                        manager.send_to_client(msg.to, require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode({</span></span>
<span class="line"><span class="__shiki_140thh">                                            type = </span><span class="__shiki_mdbnqw">&quot;private&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                            from = client_id,</span></span>
<span class="line"><span class="__shiki_140thh">                                            content = msg.content,</span></span>
<span class="line"><span class="__shiki_140thh">                                            timestamp = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                                        }))</span></span>
<span class="line"><span class="__shiki_140thh">                                    end</span></span>
<span class="line"><span class="__shiki_140thh">                                    </span></span>
<span class="line"><span class="__shiki_140thh">                                elseif msg.type == </span><span class="__shiki_mdbnqw">&quot;join_room&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                                    -- 加入房间</span></span>
<span class="line"><span class="__shiki_140thh">                                    local old_room = room_id</span></span>
<span class="line"><span class="__shiki_140thh">                                    room_id = msg.room</span></span>
<span class="line"><span class="__shiki_140thh">                                    manager.change_room(client_id, old_room, room_id)</span></span>
<span class="line"><span class="__shiki_140thh">                                    </span></span>
<span class="line"><span class="__shiki_140thh">                                elseif msg.type == </span><span class="__shiki_mdbnqw">&quot;leave_room&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                                    -- 离开房间</span></span>
<span class="line"><span class="__shiki_140thh">                                    manager.leave_room(client_id, room_id)</span></span>
<span class="line"><span class="__shiki_140thh">                                    room_id = </span><span class="__shiki_mdbnqw">&quot;default&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                                    </span></span>
<span class="line"><span class="__shiki_140thh">                                elseif msg.type == </span><span class="__shiki_mdbnqw">&quot;list_users&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                                    -- 列出房间用户</span></span>
<span class="line"><span class="__shiki_140thh">                                    local users = manager.list_users(room_id)</span></span>
<span class="line"><span class="__shiki_140thh">                                    ws:send_text(require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode({</span></span>
<span class="line"><span class="__shiki_140thh">                                        type = </span><span class="__shiki_mdbnqw">&quot;user_list&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                                        room = room_id,</span></span>
<span class="line"><span class="__shiki_140thh">                                        users = users</span></span>
<span class="line"><span class="__shiki_140thh">                                    }))</span></span>
<span class="line"><span class="__shiki_140thh">                                end</span></span>
<span class="line"><span class="__shiki_140thh">                            end</span></span>
<span class="line"><span class="__shiki_140thh">                        elseif typ == </span><span class="__shiki_mdbnqw">&quot;binary&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            -- 处理二进制消息</span></span>
<span class="line"><span class="__shiki_140thh">                            ngx.log(ngx.INFO, </span><span class="__shiki_mdbnqw">&quot;收到二进制消息，长度: &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">#data)</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 清理连接</span></span>
<span class="line"><span class="__shiki_140thh">                manager.unregister_connection(client_id, room_id)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 广播用户离开</span></span>
<span class="line"><span class="__shiki_140thh">                manager.broadcast(room_id, </span><span class="__shiki_mdbnqw">&#39;{&quot;type&quot;:&quot;leave&quot;,&quot;client_id&quot;:&quot;&#39;</span><span class="__shiki_140thh"> .. client_id .. </span><span class="__shiki_mdbnqw">&#39;&quot;}&#39;</span><span class="__shiki_140thh">, client_id)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 发送关闭帧</span></span>
<span class="line"><span class="__shiki_140thh">                ws:send_close()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /ws/stats {</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                local manager = require </span><span class="__shiki_mdbnqw">&quot;websocket_manager&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                local stats = manager.get_stats()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(stats))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /ws/send {</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                -- HTTP API发送WebSocket消息</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.req.read_body()</span></span>
<span class="line"><span class="__shiki_140thh">                local args = ngx.req.get_post_args()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local room_id = args.room or </span><span class="__shiki_mdbnqw">&quot;default&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                local message = args.message</span></span>
<span class="line"><span class="__shiki_140thh">                local exclude = args.exclude</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                if not message then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.exit(ngx.HTTP_BAD_REQUEST)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local manager = require </span><span class="__shiki_mdbnqw">&quot;websocket_manager&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                local success, err = manager.broadcast(room_id, message, exclude)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                if success then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&#39;{&quot;status&quot;:&quot;ok&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.status = ngx.HTTP_INTERNAL_SERVER_ERROR</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(</span><span class="__shiki_mdbnqw">&#39;{&quot;status&quot;:&quot;error&quot;,&quot;message&quot;:&quot;&#39;</span><span class="__shiki_140thh"> .. err .. </span><span class="__shiki_mdbnqw">&#39;&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-3-文件上传与处理服务" tabindex="-1">8.3 文件上传与处理服务 <a class="header-anchor" href="#_8-3-文件上传与处理服务" aria-label="Permalink to &quot;8.3 文件上传与处理服务&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_max_body_size </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> upload_progress </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /upload </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 文件上传处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> upload </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.upload&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> cjson </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;cjson&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> chunk_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4096</span><span class="__shiki_21nrsd">  -- 4KB块大小</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> form, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> upload</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">(chunk_size)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> form </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;创建上传处理器失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">exit</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">HTTP_INTERNAL_SERVER_ERROR</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 生成上传ID</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> upload_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">md5</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">remote_addr</span><span class="__shiki_1itgoe"> ..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">..</span><span class="__shiki_dzsirb"> math.random</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;X-Upload-ID&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> upload_id</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> file_info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> upload_id,</span></span>
<span class="line"><span class="__shiki_140thh">                    filename </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    content_type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                    chunks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {},</span></span>
<span class="line"><span class="__shiki_1itgoe">                    status</span><span class="__shiki_140thh"> = &quot;processing&quot;,</span></span>
<span class="line"><span class="__shiki_1itgoe">                    created_at</span><span class="__shiki_140thh"> = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 存储上传进度</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> progress = ngx.shared.upload_progress</span></span>
<span class="line"><span class="__shiki_140thh">                progress:set(upload_id, cjson.encode(file_info), 3600)  -- 1小时过期</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 处理表单数据</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> current_file = nil</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> file_count = 0</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                while</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> typ, res, err = form:read()</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> not typ then</span></span>
<span class="line"><span class="__shiki_140thh">                        progress:delete(upload_id)</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.say(&#39;{&quot;error&quot;:&quot;读取失败&quot;,&quot;message&quot;:&quot;&#39; .. </span><span class="__shiki_1itgoe">err</span><span class="__shiki_140thh"> .. </span><span class="__shiki_mdbnqw">&#39;&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                        return</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if typ == </span><span class="__shiki_mdbnqw">&quot;header&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                        local name = res[1]</span></span>
<span class="line"><span class="__shiki_140thh">                        local value = res[2]</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        if name:lower() == </span><span class="__shiki_mdbnqw">&quot;content-disposition&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            -- 解析文件名</span></span>
<span class="line"><span class="__shiki_140thh">                            local filename = value:match(</span><span class="__shiki_mdbnqw">&#39;filename=&quot;([^&quot;]+)&quot;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                            if filename then</span></span>
<span class="line"><span class="__shiki_140thh">                                file_count = file_count + 1</span></span>
<span class="line"><span class="__shiki_140thh">                                current_file = {</span></span>
<span class="line"><span class="__shiki_140thh">                                    filename = filename,</span></span>
<span class="line"><span class="__shiki_140thh">                                    path = </span><span class="__shiki_mdbnqw">&quot;/tmp/uploads/&quot;</span><span class="__shiki_140thh"> .. upload_id .. </span><span class="__shiki_mdbnqw">&quot;_&quot;</span><span class="__shiki_140thh"> .. file_count,</span></span>
<span class="line"><span class="__shiki_140thh">                                    size = 0,</span></span>
<span class="line"><span class="__shiki_140thh">                                    chunk_count = 0</span></span>
<span class="line"><span class="__shiki_140thh">                                }</span></span>
<span class="line"><span class="__shiki_140thh">                                </span></span>
<span class="line"><span class="__shiki_140thh">                                -- 创建文件</span></span>
<span class="line"><span class="__shiki_140thh">                                local file, err = io.open(current_file.path, </span><span class="__shiki_mdbnqw">&quot;w&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                                if not file then</span></span>
<span class="line"><span class="__shiki_140thh">                                    ngx.log(ngx.ERR, </span><span class="__shiki_mdbnqw">&quot;创建文件失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                                    progress:delete(upload_id)</span></span>
<span class="line"><span class="__shiki_140thh">                                    ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)</span></span>
<span class="line"><span class="__shiki_140thh">                                end</span></span>
<span class="line"><span class="__shiki_140thh">                                file:close()</span></span>
<span class="line"><span class="__shiki_140thh">                            end</span></span>
<span class="line"><span class="__shiki_140thh">                        elseif name:lower() == </span><span class="__shiki_mdbnqw">&quot;content-type&quot;</span><span class="__shiki_140thh"> and current_file then</span></span>
<span class="line"><span class="__shiki_140thh">                            current_file.content_type = value</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                    elseif typ == </span><span class="__shiki_mdbnqw">&quot;body&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                        if current_file then</span></span>
<span class="line"><span class="__shiki_140thh">                            -- 追加到文件</span></span>
<span class="line"><span class="__shiki_140thh">                            local file, err = io.open(current_file.path, </span><span class="__shiki_mdbnqw">&quot;ab&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                            if file then</span></span>
<span class="line"><span class="__shiki_140thh">                                file:write(res)</span></span>
<span class="line"><span class="__shiki_140thh">                                file:close()</span></span>
<span class="line"><span class="__shiki_140thh">                                </span></span>
<span class="line"><span class="__shiki_140thh">                                current_file.size = current_file.size + </span><span class="__shiki_21nrsd">#res</span></span>
<span class="line"><span class="__shiki_140thh">                                current_file.chunk_count = current_file.chunk_count + 1</span></span>
<span class="line"><span class="__shiki_140thh">                            end</span></span>
<span class="line"><span class="__shiki_140thh">                            </span></span>
<span class="line"><span class="__shiki_140thh">                            -- 更新进度</span></span>
<span class="line"><span class="__shiki_140thh">                            file_info.size = file_info.size + </span><span class="__shiki_21nrsd">#res</span></span>
<span class="line"><span class="__shiki_140thh">                            file_info.chunks[file_count] = current_file</span></span>
<span class="line"><span class="__shiki_140thh">                            progress:set(upload_id, cjson.encode(file_info), 3600)</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                    elseif typ == </span><span class="__shiki_mdbnqw">&quot;part_end&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                        if current_file then</span></span>
<span class="line"><span class="__shiki_140thh">                            -- 文件上传完成</span></span>
<span class="line"><span class="__shiki_140thh">                            file_info.filename = current_file.filename</span></span>
<span class="line"><span class="__shiki_140thh">                            file_info.content_type = current_file.content_type</span></span>
<span class="line"><span class="__shiki_140thh">                            </span></span>
<span class="line"><span class="__shiki_140thh">                            -- 文件处理（例如：验证、转码等）</span></span>
<span class="line"><span class="__shiki_140thh">                            process_uploaded_file(current_file)</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                        current_file = nil</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                    elseif typ == </span><span class="__shiki_mdbnqw">&quot;eof&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                        break</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 上传完成</span></span>
<span class="line"><span class="__shiki_140thh">                file_info.status = </span><span class="__shiki_mdbnqw">&quot;completed&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                file_info.completed_at = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                progress:set(upload_id, cjson.encode(file_info), 3600)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 返回结果</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(cjson.encode({</span></span>
<span class="line"><span class="__shiki_140thh">                    upload_id = upload_id,</span></span>
<span class="line"><span class="__shiki_140thh">                    files = file_count,</span></span>
<span class="line"><span class="__shiki_140thh">                    total_size = file_info.size,</span></span>
<span class="line"><span class="__shiki_140thh">                    message = </span><span class="__shiki_mdbnqw">&quot;上传成功&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /upload/progress {</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 查询上传进度</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                local upload_id = ngx.var.arg_id</span></span>
<span class="line"><span class="__shiki_140thh">                if not upload_id then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.exit(ngx.HTTP_BAD_REQUEST)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local progress = ngx.shared.upload_progress</span></span>
<span class="line"><span class="__shiki_140thh">                local info_json = progress:get(upload_id)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                if not info_json then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.exit(ngx.HTTP_NOT_FOUND)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(info_json)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /download {</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 文件下载（支持断点续传）</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                local filepath = ngx.var.arg_file</span></span>
<span class="line"><span class="__shiki_140thh">                if not filepath then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.exit(ngx.HTTP_BAD_REQUEST)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 安全检查</span></span>
<span class="line"><span class="__shiki_140thh">                if filepath:match(</span><span class="__shiki_mdbnqw">&quot;%.%.%/&quot;</span><span class="__shiki_140thh">) then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.exit(ngx.HTTP_FORBIDDEN)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local full_path = </span><span class="__shiki_mdbnqw">&quot;/tmp/uploads/&quot;</span><span class="__shiki_140thh"> .. filepath</span></span>
<span class="line"><span class="__shiki_140thh">                local file, err = io.open(full_path, </span><span class="__shiki_mdbnqw">&quot;rb&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                if not file then</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.log(ngx.ERR, </span><span class="__shiki_mdbnqw">&quot;打开文件失败: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.exit(ngx.HTTP_NOT_FOUND)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local file_size = file:seek(</span><span class="__shiki_mdbnqw">&quot;end&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                file:seek(</span><span class="__shiki_mdbnqw">&quot;set&quot;</span><span class="__shiki_140thh">, 0)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 支持Range请求（断点续传）</span></span>
<span class="line"><span class="__shiki_140thh">                local range = ngx.var.http_range</span></span>
<span class="line"><span class="__shiki_140thh">                local start_byte = 0</span></span>
<span class="line"><span class="__shiki_140thh">                local end_byte = file_size - 1</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                if range then</span></span>
<span class="line"><span class="__shiki_140thh">                    local from, to = range:match(</span><span class="__shiki_mdbnqw">&quot;bytes=(%d+)-(%d*)&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    from = tonumber(from)</span></span>
<span class="line"><span class="__shiki_140thh">                    to = tonumber(to) or (file_size - 1)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if from and from &lt; file_size then</span></span>
<span class="line"><span class="__shiki_140thh">                        start_byte = from</span></span>
<span class="line"><span class="__shiki_140thh">                        end_byte = to &lt; file_size and to or (file_size - 1)</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Range&quot;</span><span class="__shiki_140thh">] = string.format(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;bytes %d-%d/%d&quot;</span><span class="__shiki_140thh">, start_byte, end_byte, file_size</span></span>
<span class="line"><span class="__shiki_140thh">                        )</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.status = 206</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 设置响应头</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/octet-stream&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Length&quot;</span><span class="__shiki_140thh">] = tostring(end_byte - start_byte + 1)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Accept-Ranges&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;bytes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Disposition&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&#39;attachment; filename=&quot;&#39;</span><span class="__shiki_140thh"> .. filepath .. </span><span class="__shiki_mdbnqw">&#39;&quot;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 发送文件内容</span></span>
<span class="line"><span class="__shiki_140thh">                if start_byte &gt; </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    file:seek(</span><span class="__shiki_mdbnqw">&quot;set&quot;</span><span class="__shiki_140thh">, start_byte)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local chunk_size = </span><span class="__shiki_dzsirb">8192</span><span class="__shiki_140thh">  -- 8KB块</span></span>
<span class="line"><span class="__shiki_140thh">                local remaining = end_byte - start_byte + 1</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                while remaining &gt; </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_140thh">                    local read_size = chunk_size &lt; remaining and chunk_size or remaining</span></span>
<span class="line"><span class="__shiki_140thh">                    local chunk = file:read(read_size)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if not chunk then</span></span>
<span class="line"><span class="__shiki_140thh">                        break</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.print(chunk)</span></span>
<span class="line"><span class="__shiki_140thh">                    remaining = remaining - </span><span class="__shiki_21nrsd">#chunk</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    -- 刷新输出缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.flush(true)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                file:close()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /files {</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 文件列表和管理</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                local cjson = require </span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local action = ngx.var.arg_action</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                if action == </span><span class="__shiki_mdbnqw">&quot;list&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    -- 列出文件</span></span>
<span class="line"><span class="__shiki_140thh">                    local files = {}</span></span>
<span class="line"><span class="__shiki_140thh">                    local lfs = require </span><span class="__shiki_mdbnqw">&quot;lfs&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    for file in lfs.dir(</span><span class="__shiki_mdbnqw">&quot;/tmp/uploads&quot;</span><span class="__shiki_140thh">) do</span></span>
<span class="line"><span class="__shiki_140thh">                        if file </span><span class="__shiki_1itgoe">~</span><span class="__shiki_140thh">= </span><span class="__shiki_mdbnqw">&quot;.&quot;</span><span class="__shiki_140thh"> and file </span><span class="__shiki_1itgoe">~</span><span class="__shiki_140thh">= </span><span class="__shiki_mdbnqw">&quot;..&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                            local attr = lfs.attributes(</span><span class="__shiki_mdbnqw">&quot;/tmp/uploads/&quot;</span><span class="__shiki_140thh"> .. file)</span></span>
<span class="line"><span class="__shiki_140thh">                            if attr.mode == </span><span class="__shiki_mdbnqw">&quot;file&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                                table.insert(files, {</span></span>
<span class="line"><span class="__shiki_140thh">                                    name = file,</span></span>
<span class="line"><span class="__shiki_140thh">                                    size = attr.size,</span></span>
<span class="line"><span class="__shiki_140thh">                                    modified = attr.modification,</span></span>
<span class="line"><span class="__shiki_140thh">                                    permissions = attr.permissions</span></span>
<span class="line"><span class="__shiki_140thh">                                })</span></span>
<span class="line"><span class="__shiki_140thh">                            end</span></span>
<span class="line"><span class="__shiki_140thh">                        end</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(cjson.encode(files))</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                elseif action == </span><span class="__shiki_mdbnqw">&quot;delete&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    -- 删除文件</span></span>
<span class="line"><span class="__shiki_140thh">                    local filename = ngx.var.arg_file</span></span>
<span class="line"><span class="__shiki_140thh">                    if not filename then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.exit(ngx.HTTP_BAD_REQUEST)</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    local ok, err = os.remove(</span><span class="__shiki_mdbnqw">&quot;/tmp/uploads/&quot;</span><span class="__shiki_140thh"> .. filename)</span></span>
<span class="line"><span class="__shiki_140thh">                    if ok then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.say(</span><span class="__shiki_mdbnqw">&#39;{&quot;status&quot;:&quot;success&quot;,&quot;message&quot;:&quot;文件已删除&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    else</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.say(</span><span class="__shiki_mdbnqw">&#39;{&quot;status&quot;:&quot;error&quot;,&quot;message&quot;:&quot;&#39;</span><span class="__shiki_140thh"> .. err .. </span><span class="__shiki_mdbnqw">&#39;&quot;}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                elseif action == </span><span class="__shiki_mdbnqw">&quot;info&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                    -- 文件信息</span></span>
<span class="line"><span class="__shiki_140thh">                    local filename = ngx.var.arg_file</span></span>
<span class="line"><span class="__shiki_140thh">                    if not filename then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.exit(ngx.HTTP_BAD_REQUEST)</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    local lfs = require </span><span class="__shiki_mdbnqw">&quot;lfs&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    local attr = lfs.attributes(</span><span class="__shiki_mdbnqw">&quot;/tmp/uploads/&quot;</span><span class="__shiki_140thh"> .. filename)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    if attr then</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.say(cjson.encode(attr))</span></span>
<span class="line"><span class="__shiki_140thh">                    else</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.exit(ngx.HTTP_NOT_FOUND)</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                else</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.exit(ngx.HTTP_BAD_REQUEST)</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第九部分-最佳实践与调试" tabindex="-1">第九部分：最佳实践与调试 <a class="header-anchor" href="#第九部分-最佳实践与调试" aria-label="Permalink to &quot;第九部分：最佳实践与调试&quot;">​</a></h2><h3 id="_9-1-代码组织与模块化" tabindex="-1">9.1 代码组织与模块化 <a class="header-anchor" href="#_9-1-代码组织与模块化" aria-label="Permalink to &quot;9.1 代码组织与模块化&quot;">​</a></h3><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">-- /usr/local/openresty/lua/utils/validation.lua</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> _M </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}</span></span>
<span class="line"><span class="__shiki_1itgoe">local</span><span class="__shiki_140thh"> mt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> { __index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> _M }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> _M</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> setmetatable</span><span class="__shiki_140thh">({}, mt)</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> _M</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">validate_email</span><span class="__shiki_140thh">(email)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> email </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;邮箱不能为空&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> pattern </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+%.[a-zA-Z]{2,}$&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> string.match</span><span class="__shiki_140thh">(email, pattern) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;邮箱格式不正确&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> _M</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">validate_phone</span><span class="__shiki_140thh">(phone)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> phone </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;手机号不能为空&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> pattern </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;^1[3-9]%d{9}$&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> string.match</span><span class="__shiki_140thh">(phone, pattern) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;手机号格式不正确&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> _M</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">validate_password</span><span class="__shiki_140thh">(password)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> password </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;密码不能为空&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> #</span><span class="__shiki_140thh">password </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;密码长度至少8位&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> string.match</span><span class="__shiki_140thh">(password, </span><span class="__shiki_mdbnqw">&quot;%d&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;密码必须包含数字&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> string.match</span><span class="__shiki_140thh">(password, </span><span class="__shiki_mdbnqw">&quot;[a-zA-Z]&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;密码必须包含字母&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">end</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh"> _M</span></span></code></pre></div><h3 id="_9-2-错误处理与日志" tabindex="-1">9.2 错误处理与日志 <a class="header-anchor" href="#_9-2-错误处理与日志" aria-label="Permalink to &quot;9.2 错误处理与日志&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> error_logs </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 自定义错误处理器</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> error_handler</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> traceback </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> debug.traceback</span><span class="__shiki_140thh">(err, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 记录到共享内存</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> errors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">error_logs</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> error_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">md5</span><span class="__shiki_140thh">(traceback </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1t8gfj">            errors</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(error_id, {</span></span>
<span class="line"><span class="__shiki_140thh">                message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> err,</span></span>
<span class="line"><span class="__shiki_140thh">                traceback </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> traceback,</span></span>
<span class="line"><span class="__shiki_140thh">                time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_dzsirb">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">                count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">            }, 86400)  -- 24小时过期</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            -- 返回友好错误信息</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                success = false,</span></span>
<span class="line"><span class="__shiki_dzsirb">                error</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;服务器内部错误&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                code = </span><span class="__shiki_mdbnqw">&quot;INTERNAL_ERROR&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                request_id = ngx.var.request_id</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 安全执行包装器</span></span>
<span class="line"><span class="__shiki_140thh">        function safe_execute(func, ...)</span></span>
<span class="line"><span class="__shiki_140thh">            local ok, result = xpcall(func, error_handler, ...)</span></span>
<span class="line"><span class="__shiki_140thh">            if ok then</span></span>
<span class="line"><span class="__shiki_140thh">                return result</span></span>
<span class="line"><span class="__shiki_140thh">            else</span></span>
<span class="line"><span class="__shiki_140thh">                return result  -- 已经经过error_handler处理</span></span>
<span class="line"><span class="__shiki_140thh">            end</span></span>
<span class="line"><span class="__shiki_140thh">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    server {</span></span>
<span class="line"><span class="__shiki_140thh">        location /error-test {</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                -- 使用安全执行</span></span>
<span class="line"><span class="__shiki_140thh">                local result = safe_execute(function()</span></span>
<span class="line"><span class="__shiki_140thh">                    -- 可能抛出错误的代码</span></span>
<span class="line"><span class="__shiki_140thh">                    local data = require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).decode(</span><span class="__shiki_mdbnqw">&quot;invalid json&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    return data</span></span>
<span class="line"><span class="__shiki_140thh">                end)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(result))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        location /error-stats {</span></span>
<span class="line"><span class="__shiki_140thh">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_140thh">                local errors = ngx.shared.error_logs</span></span>
<span class="line"><span class="__shiki_140thh">                local keys = errors:get_keys(0)  -- 获取所有键</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                local error_stats = {}</span></span>
<span class="line"><span class="__shiki_140thh">                for _, key in ipairs(keys) do</span></span>
<span class="line"><span class="__shiki_140thh">                    local err_info = errors:get(key)</span></span>
<span class="line"><span class="__shiki_140thh">                    if err_info then</span></span>
<span class="line"><span class="__shiki_140thh">                        table.insert(error_stats, {</span></span>
<span class="line"><span class="__shiki_140thh">                            id = key,</span></span>
<span class="line"><span class="__shiki_140thh">                            message = err_info.message,</span></span>
<span class="line"><span class="__shiki_140thh">                            time = os.date(</span><span class="__shiki_mdbnqw">&quot;%Y-%m-%d %H:%M:%S&quot;</span><span class="__shiki_140thh">, err_info.time),</span></span>
<span class="line"><span class="__shiki_140thh">                            count = err_info.count</span></span>
<span class="line"><span class="__shiki_140thh">                        })</span></span>
<span class="line"><span class="__shiki_140thh">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.header[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] = </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(require(</span><span class="__shiki_mdbnqw">&quot;cjson&quot;</span><span class="__shiki_140thh">).encode(error_stats))</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-3-调试与性能分析" tabindex="-1">9.3 调试与性能分析 <a class="header-anchor" href="#_9-3-调试与性能分析" aria-label="Permalink to &quot;9.3 调试与性能分析&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_code_cache</span><span class="__shiki_dzsirb"> off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 开发环境关闭代码缓存</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /debug </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                -- 1. 打印环境信息</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Lua版本: &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">_VERSION</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Nginx变量: &quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> vars </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;remote_addr&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;server_name&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;request_uri&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;request_method&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;content_type&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;query_string&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> _, var in ipairs(vars) do</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.say(string.format(&quot;  %</span><span class="__shiki_1itgoe">s</span><span class="__shiki_140thh"> = %s</span><span class="__shiki_mdbnqw">&quot;, var, ngx.var[var] or &quot;</span><span class="__shiki_140thh">nil</span><span class="__shiki_mdbnqw">&quot;))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 2. 打印请求头</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(&quot;</span><span class="__shiki_1itgoe">\\n请求头: </span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local headers = ngx.req.get_headers()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                for k, v in pairs(headers) do</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    if type(v) == &quot;</span><span class="__shiki_140thh">table</span><span class="__shiki_mdbnqw">&quot; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ngx.say(string.format(&quot;</span><span class="__shiki_140thh">  %s = %s</span><span class="__shiki_mdbnqw">&quot;, k, table.concat(v, &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;)))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    else</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ngx.say(string.format(&quot;</span><span class="__shiki_140thh">  %s = %s</span><span class="__shiki_mdbnqw">&quot;, k, v))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 3. 打印请求参数</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(&quot;</span><span class="__shiki_1itgoe">\\n查询参数: </span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local args = ngx.req.get_uri_args()</span></span>
<span class="line"><span class="__shiki_mdbnqw">                for k, v in pairs(args) do</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    if type(v) == &quot;</span><span class="__shiki_140thh">table</span><span class="__shiki_mdbnqw">&quot; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ngx.say(string.format(&quot;</span><span class="__shiki_140thh">  %s = %s</span><span class="__shiki_mdbnqw">&quot;, k, table.concat(v, &quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;)))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    else</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ngx.say(string.format(&quot;</span><span class="__shiki_140thh">  %s = %s</span><span class="__shiki_mdbnqw">&quot;, k, v))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 4. 调试内存使用</span></span>
<span class="line"><span class="__shiki_mdbnqw">                collectgarbage(&quot;</span><span class="__shiki_140thh">collect</span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local mem = collectgarbage(&quot;</span><span class="__shiki_140thh">count</span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(string.format(&quot;</span><span class="__shiki_1itgoe">\\n内存使用: %.2f KB&quot;, </span><span class="__shiki_140thh">mem))</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 5. 性能分析</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(&quot;\\n性能分析: &quot;)</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> start = ngx.now()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 测试代码块</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> sum = 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                for</span><span class="__shiki_140thh"> i = 1, </span><span class="__shiki_dzsirb">1000000</span><span class="__shiki_140thh"> do</span></span>
<span class="line"><span class="__shiki_1itgoe">                    sum</span><span class="__shiki_140thh"> = sum + i</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> elapsed = ngx.now() - start</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(string.format(&quot;  循环耗时: %.</span><span class="__shiki_1itgoe">6f</span><span class="__shiki_140thh"> 秒</span><span class="__shiki_mdbnqw">&quot;, elapsed))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(string.format(&quot;</span><span class="__shiki_140thh">  计算结果: %d</span><span class="__shiki_mdbnqw">&quot;, sum))</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 6. 堆栈跟踪</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(&quot;</span><span class="__shiki_1itgoe">\\n当前堆栈: </span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(debug.traceback())</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 7. 模块加载信息</span></span>
<span class="line"><span class="__shiki_mdbnqw">                ngx.say(&quot;</span><span class="__shiki_1itgoe">\\n已加载模块: </span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                for k, v in pairs(package.loaded) do</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    if type(k) == &quot;</span><span class="__shiki_140thh">string</span><span class="__shiki_mdbnqw">&quot; and k:match(&quot;</span><span class="__shiki_140thh">^[%a_]</span><span class="__shiki_mdbnqw">&quot;) then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        ngx.say(&quot;</span><span class="__shiki_mdbnqw">  &quot; .. k)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        location /lua-reload {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            content_by_lua_block {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 热重载Lua模块</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local module_name = ngx.var.arg_module</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                if not module_name then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ngx.say(&quot;</span><span class="__shiki_140thh">请指定要重载的模块名</span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    return</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 从package.loaded中移除模块</span></span>
<span class="line"><span class="__shiki_mdbnqw">                package.loaded[module_name] = nil</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 清除模块缓存</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local utils = require &quot;</span><span class="__shiki_140thh">resty.core.base</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                utils.clear_tab(package.loaded)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                -- 重新加载模块</span></span>
<span class="line"><span class="__shiki_mdbnqw">                local ok, err = pcall(require, module_name)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                if ok then</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ngx.say(&quot;</span><span class="__shiki_140thh">模块重载成功: </span><span class="__shiki_mdbnqw">&quot;, module_name)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                else</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ngx.say(&quot;</span><span class="__shiki_140thh">模块重载失败: </span><span class="__shiki_mdbnqw">&quot;, err)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                end</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h2 id="第十部分-部署与生产环境" tabindex="-1">第十部分：部署与生产环境 <a class="header-anchor" href="#第十部分-部署与生产环境" aria-label="Permalink to &quot;第十部分：部署与生产环境&quot;">​</a></h2><h3 id="_10-1-生产环境配置" tabindex="-1">10.1 生产环境配置 <a class="header-anchor" href="#_10-1-生产环境配置" aria-label="Permalink to &quot;10.1 生产环境配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># nginx.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">user </span><span class="__shiki_140thh">www-data;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_cpu_affinity </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_rlimit_nofile </span><span class="__shiki_dzsirb">65535</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">error_log </span><span class="__shiki_140thh">/var/log/nginx/error.log </span><span class="__shiki_dzsirb">warn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">pid </span><span class="__shiki_140thh">/var/run/nginx.pid;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    multi_accept </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    include </span><span class="__shiki_140thh">mime.types;</span></span>
<span class="line"><span class="__shiki_1itgoe">    default_type </span><span class="__shiki_140thh">application/octet-stream;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志格式</span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_dzsirb">main</span><span class="__shiki_mdbnqw"> &#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;$</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;&quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_x_forwarded_for</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;rt=$</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw"> uct=&quot;$</span><span class="__shiki_140thh">upstream_connect_time</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;uht=&quot;$</span><span class="__shiki_140thh">upstream_header_time</span><span class="__shiki_mdbnqw">&quot; urt=&quot;$</span><span class="__shiki_140thh">upstream_response_time</span><span class="__shiki_mdbnqw">&quot;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    access_log </span><span class="__shiki_140thh">/var/log/nginx/access.log </span><span class="__shiki_dzsirb">main</span><span class="__shiki_140thh"> buffer=32k flush=5s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Lua配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_package_path</span><span class="__shiki_mdbnqw"> &quot;/usr/local/openresty/lua/?.lua;/usr/local/openresty/lualib/?.lua;;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_package_cpath</span><span class="__shiki_mdbnqw"> &quot;/usr/local/openresty/lualib/?.so;;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 共享内存区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> shared_data </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> cache </span><span class="__shiki_dzsirb">50m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> sessions </span><span class="__shiki_dzsirb">20m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> rate_limits </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> locks </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 性能优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_code_cache</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_check_client_abort</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_socket_log_errors</span><span class="__shiki_dzsirb"> off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_max_running_timers</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_max_pending_timers</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_need_request_body</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 初始化</span></span>
<span class="line"><span class="__shiki_1itgoe">    init_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_mdbnqw"> &quot;resty.core&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 预加载常用模块</span></span>
<span class="line"><span class="__shiki_140thh">        preload </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;cjson&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;cjson.safe&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;resty.redis&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;resty.mysql&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;resty.http&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;resty.string&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;resty.sha1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;resty.aes&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;resty.lrucache&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;resty.limit.req&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, mod in ipairs(preload) do</span></span>
<span class="line"><span class="__shiki_140thh">            require(mod)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 应用初始化</span></span>
<span class="line"><span class="__shiki_140thh">        require(&quot;app.config&quot;):init()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        -- Worker初始化</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;app.worker&quot;</span><span class="__shiki_140thh">):</span><span class="__shiki_dzsirb">init</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 启动健康检查</span></span>
<span class="line"><span class="__shiki_dzsirb">        require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;app.health&quot;</span><span class="__shiki_140thh">):</span><span class="__shiki_dzsirb">start</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 服务器配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    include </span><span class="__shiki_140thh">/usr/local/openresty/nginx/conf/sites-enabled/*.conf;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-监控与告警" tabindex="-1">10.2 监控与告警 <a class="header-anchor" href="#_10-2-监控与告警" aria-label="Permalink to &quot;10.2 监控与告警&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 监控配置</span></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /nginx-status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            stub_status</span><span class="__shiki_140thh"> on;</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /lua-status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.core.status&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(status.</span><span class="__shiki_dzsirb">get_status</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /metrics </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> metrics </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;prometheus_metrics&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1t8gfj">header</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;text/plain; version=0.0.4&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">print</span><span class="__shiki_140thh">(metrics.</span><span class="__shiki_dzsirb">collect</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Nginx Lua扩展通过OpenResty提供了强大的功能扩展能力。本指南涵盖了从基础到高级的所有内容，包括：</p><ol><li><strong>OpenResty安装与配置</strong> - 生产环境最佳实践</li><li><strong>Lua语言基础</strong> - 语法和与Nginx的集成</li><li><strong>核心API</strong> - ngx模块和各种resty库</li><li><strong>网络通信</strong> - HTTP客户端、Redis、MySQL等</li><li><strong>高级特性</strong> - 共享内存、定时器、协程</li><li><strong>安全防护</strong> - 输入验证、JWT认证</li><li><strong>性能优化</strong> - 缓存策略、监控调优</li><li><strong>实战项目</strong> - API网关、WebSocket、文件处理</li><li><strong>最佳实践</strong> - 代码组织、错误处理、调试</li></ol><p>关键要点：</p><ul><li>合理使用共享内存进行数据共享</li><li>注意Lua代码的性能影响</li><li>生产环境保持lua_code_cache开启</li><li>使用合适的错误处理机制</li><li>监控和日志是生产环境的关键</li></ul><p>通过合理使用Nginx Lua扩展，可以构建高性能、高可用的Web应用和服务，充分发挥Nginx的高性能特性和Lua的灵活性。</p>`,71)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
