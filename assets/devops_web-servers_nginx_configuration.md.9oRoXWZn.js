import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Nginx配置优化完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/nginx/configuration.md","filePath":"devops/web-servers/nginx/configuration.md"}'),p={name:"devops/web-servers/nginx/configuration.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="nginx配置优化完全指南" tabindex="-1">Nginx配置优化完全指南 <a class="header-anchor" href="#nginx配置优化完全指南" aria-label="Permalink to &quot;Nginx配置优化完全指南&quot;">​</a></h1><h2 id="第一部分-nginx基础架构回顾" tabindex="-1">第一部分：Nginx基础架构回顾 <a class="header-anchor" href="#第一部分-nginx基础架构回顾" aria-label="Permalink to &quot;第一部分：Nginx基础架构回顾&quot;">​</a></h2><h3 id="_1-1-nginx进程模型" tabindex="-1">1.1 Nginx进程模型 <a class="header-anchor" href="#_1-1-nginx进程模型" aria-label="Permalink to &quot;1.1 Nginx进程模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">master进程（管理进程）</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── worker进程（工作进程，可配置多个）</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── cache manager进程（缓存管理）</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── cache loader进程（缓存加载）</span></span></code></pre></div><h3 id="_1-2-核心工作流程" tabindex="-1">1.2 核心工作流程 <a class="header-anchor" href="#_1-2-核心工作流程" aria-label="Permalink to &quot;1.2 核心工作流程&quot;">​</a></h3><ol><li>客户端发起请求</li><li>Worker进程接受连接</li><li>解析请求头</li><li>匹配location规则</li><li>执行内容处理</li><li>返回响应</li></ol><h2 id="第二部分-全局优化配置" tabindex="-1">第二部分：全局优化配置 <a class="header-anchor" href="#第二部分-全局优化配置" aria-label="Permalink to &quot;第二部分：全局优化配置&quot;">​</a></h2><h3 id="_2-1-进程与连接优化" tabindex="-1">2.1 进程与连接优化 <a class="header-anchor" href="#_2-1-进程与连接优化" aria-label="Permalink to &quot;2.1 进程与连接优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># nginx.conf - 主配置文件优化</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义运行用户和组</span></span>
<span class="line"><span class="__shiki_1itgoe">user </span><span class="__shiki_140thh">nginx nginx;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># worker进程数量（核心优化点）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 建议设置为CPU核心数或核心数的1.5-2倍</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 绑定worker进程到特定CPU核心（减少上下文切换）</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_cpu_affinity </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># worker进程优先级（-20到19，数字越小优先级越高）</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_priority </span><span class="__shiki_140thh">-5;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># worker进程可以打开的最大文件描述符数量</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_rlimit_nofile </span><span class="__shiki_dzsirb">65535</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 事件处理模型优化</span></span>
<span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用高效的事件模型（Linux推荐epoll）</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 每个worker进程的最大连接数</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最大客户端数 = worker_processes * worker_connections</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">10240</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 开启多连接接受（减少worker进程间争夺）</span></span>
<span class="line"><span class="__shiki_1itgoe">    multi_accept </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 优化惊群问题（Linux内核≥3.9）</span></span>
<span class="line"><span class="__shiki_1itgoe">    accept_mutex </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设置网络连接序列化</span></span>
<span class="line"><span class="__shiki_1itgoe">    accept_mutex_delay </span><span class="__shiki_140thh">100ms;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-连接与超时优化" tabindex="-1">2.2 连接与超时优化 <a class="header-anchor" href="#_2-2-连接与超时优化" aria-label="Permalink to &quot;2.2 连接与超时优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_header_timeout </span><span class="__shiki_dzsirb">15s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_timeout </span><span class="__shiki_dzsirb">15s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    send_timeout </span><span class="__shiki_dzsirb">15s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 长连接优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_timeout </span><span class="__shiki_dzsirb">65s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_requests </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重置超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    reset_timedout_connection </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # TCP优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    tcp_nodelay </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    tcp_nopush </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 发送文件优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    sendfile </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    sendfile_max_chunk </span><span class="__shiki_dzsirb">512k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 直接IO优化（大文件场景）</span></span>
<span class="line"><span class="__shiki_1itgoe">    directio </span><span class="__shiki_dzsirb">4m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    directio_alignment </span><span class="__shiki_dzsirb">512</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第三部分-性能调优参数详解" tabindex="-1">第三部分：性能调优参数详解 <a class="header-anchor" href="#第三部分-性能调优参数详解" aria-label="Permalink to &quot;第三部分：性能调优参数详解&quot;">​</a></h2><h3 id="_3-1-缓冲区优化" tabindex="-1">3.1 缓冲区优化 <a class="header-anchor" href="#_3-1-缓冲区优化" aria-label="Permalink to &quot;3.1 缓冲区优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 客户端请求头缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_header_buffer_size </span><span class="__shiki_dzsirb">4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    large_client_header_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 客户端请求体缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_buffer_size </span><span class="__shiki_dzsirb">128k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_max_body_size </span><span class="__shiki_dzsirb">20m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 代理缓冲区设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_buffer_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_buffers </span><span class="__shiki_dzsirb">4</span><span class="__shiki_dzsirb"> 32k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_busy_buffers_size </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 输出缓冲区设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    output_buffers </span><span class="__shiki_dzsirb">2</span><span class="__shiki_dzsirb"> 32k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    postpone_output </span><span class="__shiki_dzsirb">1460</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 临时文件优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_body_temp </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_proxy_temp </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fastcgi_temp_path </span><span class="__shiki_140thh">/dev/shm/nginx_fastcgi_temp </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-mime类型与压缩优化" tabindex="-1">3.2 MIME类型与压缩优化 <a class="header-anchor" href="#_3-2-mime类型与压缩优化" aria-label="Permalink to &quot;3.2 MIME类型与压缩优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文件扩展名与类型映射</span></span>
<span class="line"><span class="__shiki_1itgoe">    include </span><span class="__shiki_140thh">mime.types;</span></span>
<span class="line"><span class="__shiki_1itgoe">    default_type </span><span class="__shiki_140thh">application/octet-stream;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Gzip压缩配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    gzip </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    gzip_vary </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    gzip_proxied </span><span class="__shiki_140thh">any;</span></span>
<span class="line"><span class="__shiki_1itgoe">    gzip_comp_level </span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    gzip_buffers </span><span class="__shiki_dzsirb">16</span><span class="__shiki_dzsirb"> 8k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    gzip_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    gzip_min_length </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    gzip_types </span></span>
<span class="line"><span class="__shiki_140thh">        text/plain</span></span>
<span class="line"><span class="__shiki_140thh">        text/css</span></span>
<span class="line"><span class="__shiki_140thh">        text/xml</span></span>
<span class="line"><span class="__shiki_140thh">        text/javascript</span></span>
<span class="line"><span class="__shiki_140thh">        application/json</span></span>
<span class="line"><span class="__shiki_140thh">        application/javascript</span></span>
<span class="line"><span class="__shiki_140thh">        application/xml+rss</span></span>
<span class="line"><span class="__shiki_140thh">        application/atom+xml</span></span>
<span class="line"><span class="__shiki_140thh">        font/ttf</span></span>
<span class="line"><span class="__shiki_140thh">        font/otf</span></span>
<span class="line"><span class="__shiki_140thh">        image/svg+xml;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Brotli压缩（需要模块支持）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # brotli on;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # brotli_comp_level 6;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # brotli_types text/plain text/css application/json ...;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-静态资源优化" tabindex="-1">第四部分：静态资源优化 <a class="header-anchor" href="#第四部分-静态资源优化" aria-label="Permalink to &quot;第四部分：静态资源优化&quot;">​</a></h2><h3 id="_4-1-静态文件服务配置" tabindex="-1">4.1 静态文件服务配置 <a class="header-anchor" href="#_4-1-静态文件服务配置" aria-label="Permalink to &quot;4.1 静态文件服务配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        root </span><span class="__shiki_140thh">/var/www/html;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 开启文件系统缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        open_file_cache </span><span class="__shiki_140thh">max=10000 inactive=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">        open_file_cache_valid </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        open_file_cache_min_uses </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        open_file_cache_errors </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 浏览器缓存控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        expires </span><span class="__shiki_140thh">1y;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;SAMEORIGIN&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 访问日志关闭（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        log_not_found </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 图片处理优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(jpg|jpeg|png|webp)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 图像优化</span></span>
<span class="line"><span class="__shiki_1itgoe">        image_filter_buffer </span><span class="__shiki_dzsirb">10M</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缩略图生成</span></span>
<span class="line"><span class="__shiki_21nrsd">        # image_filter resize 800 600;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 渐进式JPEG</span></span>
<span class="line"><span class="__shiki_21nrsd">        # add_header Content-Disposition &quot;inline; filename=$1&quot;;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-文件上传优化" tabindex="-1">4.2 文件上传优化 <a class="header-anchor" href="#_4-2-文件上传优化" aria-label="Permalink to &quot;4.2 文件上传优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 大文件上传优化</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 调整上传限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_max_body_size </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 上传超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_timeout </span><span class="__shiki_dzsirb">5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 上传缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_buffer_size </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 临时文件存储</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_temp_path </span><span class="__shiki_140thh">/tmp/nginx_upload </span><span class="__shiki_dzsirb">1</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第五部分-代理与负载均衡优化" tabindex="-1">第五部分：代理与负载均衡优化 <a class="header-anchor" href="#第五部分-代理与负载均衡优化" aria-label="Permalink to &quot;第五部分：代理与负载均衡优化&quot;">​</a></h2><h3 id="_5-1-反向代理配置优化" tabindex="-1">5.1 反向代理配置优化 <a class="header-anchor" href="#_5-1-反向代理配置优化" aria-label="Permalink to &quot;5.1 反向代理配置优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend_servers </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 负载均衡算法</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_conn</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 最少连接数</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ip_hash;   # IP哈希</span></span>
<span class="line"><span class="__shiki_21nrsd">    # hash $request_uri consistent; # 一致性哈希</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 后端服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.101:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server 192.168.1.102:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server 192.168.1.103:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh"> backup;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接池配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive </span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_requests </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend_servers;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 代理头设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_connect_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_send_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_read_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓冲区优化</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffer_size </span><span class="__shiki_dzsirb">4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 4k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_busy_buffers_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">my_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout updating http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 重试机制</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout invalid_header http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream_tries </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-缓存配置详细优化" tabindex="-1">5.2 缓存配置详细优化 <a class="header-anchor" href="#_5-2-缓存配置详细优化" aria-label="Permalink to &quot;5.2 缓存配置详细优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存路径配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx levels=1:2 keys_zone=my_cache:100m </span></span>
<span class="line"><span class="__shiki_140thh">                     inactive=60m max_size=10g use_temp_path=off;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存清理配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx levels=1:2 keys_zone=cache_one:200m </span></span>
<span class="line"><span class="__shiki_140thh">                     inactive=1d max_size=30g;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 切片缓存（适用于大文件）</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/mp4 levels=1:2 keys_zone=mp4:512m </span></span>
<span class="line"><span class="__shiki_140thh">                     max_size=50g inactive=7d use_temp_path=off;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_lock_age </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_lock_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存绕过</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_bypass </span><span class="__shiki_140thh">$http_cache_control;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_no_cache </span><span class="__shiki_140thh">$http_pragma $http_authorization;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-安全优化配置" tabindex="-1">第六部分：安全优化配置 <a class="header-anchor" href="#第六部分-安全优化配置" aria-label="Permalink to &quot;第六部分：安全优化配置&quot;">​</a></h2><h3 id="_6-1-安全头部与访问控制" tabindex="-1">6.1 安全头部与访问控制 <a class="header-anchor" href="#_6-1-安全头部与访问控制" aria-label="Permalink to &quot;6.1 安全头部与访问控制&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基础安全头部</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;SAMEORIGIN&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-XSS-Protection </span><span class="__shiki_mdbnqw">&quot;1; mode=block&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Referrer-Policy </span><span class="__shiki_mdbnqw">&quot;strict-origin-when-cross-origin&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CSP内容安全策略（需要根据实际调整）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # add_header Content-Security-Policy &quot;default-src &#39;self&#39;;&quot; always;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 隐藏Nginx版本号</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_tokens </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制HTTP方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ($request_method </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_21q97f">^(GET|HEAD|POST)$</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 405</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 防盗链配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> \\.(jpg|jpeg|png|gif|mp4)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        valid_referers </span><span class="__shiki_140thh">none blocked server_names </span></span>
<span class="line"><span class="__shiki_140thh">                      *.example.com </span><span class="__shiki_1itgoe">~\\.google\\. ~</span><span class="__shiki_140thh">\\.baidu\\.;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($invalid_referer) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 或返回默认图片</span></span>
<span class="line"><span class="__shiki_21nrsd">            # rewrite ^ /static/images/forbidden.png;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制并发连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_conn_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=addr:10m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_conn </span><span class="__shiki_140thh">addr </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制请求速率</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=one:10m rate=10r/s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req </span><span class="__shiki_140thh">zone=one burst=20 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-ssl-tls优化" tabindex="-1">6.2 SSL/TLS优化 <a class="header-anchor" href="#_6-2-ssl-tls优化" aria-label="Permalink to &quot;6.2 SSL/TLS优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL证书配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/example.com.crt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate_key </span><span class="__shiki_140thh">/etc/nginx/ssl/example.com.key;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL会话缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_cache </span><span class="__shiki_140thh">shared:SSL:50m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_timeout </span><span class="__shiki_dzsirb">1d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_tickets </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全协议和加密套件</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_protocols </span><span class="__shiki_140thh">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_ciphers </span><span class="__shiki_140thh">ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_prefer_server_ciphers </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # OCSP装订</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_stapling </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_stapling_verify </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_trusted_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/ca-certs.pem;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # HSTS（强制HTTPS）</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=31536000; includeSubDomains; preload&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用HTTP/2</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_field_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_concurrent_streams </span><span class="__shiki_dzsirb">128</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    http2_max_requests </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-日志与监控优化" tabindex="-1">第七部分：日志与监控优化 <a class="header-anchor" href="#第七部分-日志与监控优化" aria-label="Permalink to &quot;第七部分：日志与监控优化&quot;">​</a></h2><h3 id="_7-1-访问日志优化" tabindex="-1">7.1 访问日志优化 <a class="header-anchor" href="#_7-1-访问日志优化" aria-label="Permalink to &quot;7.1 访问日志优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志格式定义</span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_dzsirb">main</span><span class="__shiki_mdbnqw"> &#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;$</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;&quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_x_forwarded_for</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;rt=$</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw"> uct=&quot;$</span><span class="__shiki_140thh">upstream_connect_time</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &#39;uht=&quot;$</span><span class="__shiki_140thh">upstream_header_time</span><span class="__shiki_mdbnqw">&quot; urt=&quot;$</span><span class="__shiki_140thh">upstream_response_time</span><span class="__shiki_mdbnqw">&quot;&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_140thh">json escape=json</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;{&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;time_local&quot;:&quot;$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;remote_addr&quot;:&quot;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;remote_user&quot;:&quot;$</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;request&quot;:&quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;status&quot;:&quot;$</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;body_bytes_sent&quot;:&quot;$</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;request_time&quot;:&quot;$</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;http_referer&quot;:&quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;http_user_agent&quot;:&quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot;,&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&quot;http_x_forwarded_for&quot;:&quot;$</span><span class="__shiki_140thh">http_x_forwarded_for</span><span class="__shiki_mdbnqw">&quot;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;}&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志缓存与缓冲</span></span>
<span class="line"><span class="__shiki_1itgoe">    access_log </span><span class="__shiki_140thh">/var/log/nginx/access.log </span><span class="__shiki_dzsirb">main</span><span class="__shiki_140thh"> buffer=32k flush=5s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_log </span><span class="__shiki_140thh">/var/log/nginx/error.log </span><span class="__shiki_dzsirb">warn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 条件日志记录</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">status</span><span class="__shiki_140thh"> $loggable {</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~</span><span class="__shiki_140thh">^[23]  </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 2xx和3xx不记录</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 其他状态码记录</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志轮转配置（需配合logrotate）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # /etc/logrotate.d/nginx</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-状态监控配置" tabindex="-1">7.2 状态监控配置 <a class="header-anchor" href="#_7-2-状态监控配置" aria-label="Permalink to &quot;7.2 状态监控配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 状态监控端点</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">localhost;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /nginx_status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        stub_status</span><span class="__shiki_140thh"> on;</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /server_status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        vhost_traffic_status_display;</span></span>
<span class="line"><span class="__shiki_1itgoe">        vhost_traffic_status_display_format</span><span class="__shiki_140thh"> html;</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第八部分-高级优化技巧" tabindex="-1">第八部分：高级优化技巧 <a class="header-anchor" href="#第八部分-高级优化技巧" aria-label="Permalink to &quot;第八部分：高级优化技巧&quot;">​</a></h2><h3 id="_8-1-动态模块加载" tabindex="-1">8.1 动态模块加载 <a class="header-anchor" href="#_8-1-动态模块加载" aria-label="Permalink to &quot;8.1 动态模块加载&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 动态加载模块（Nginx 1.9.11+）</span></span>
<span class="line"><span class="__shiki_1itgoe">load_module </span><span class="__shiki_140thh">modules/ngx_http_brotli_filter_module.so;</span></span>
<span class="line"><span class="__shiki_1itgoe">load_module </span><span class="__shiki_140thh">modules/ngx_http_brotli_static_module.so;</span></span>
<span class="line"><span class="__shiki_1itgoe">load_module </span><span class="__shiki_140thh">modules/ngx_http_headers_more_filter_module.so;</span></span>
<span class="line"><span class="__shiki_1itgoe">load_module </span><span class="__shiki_140thh">modules/ngx_http_geoip2_module.so;</span></span></code></pre></div><h3 id="_8-2-lua脚本扩展" tabindex="-1">8.2 Lua脚本扩展 <a class="header-anchor" href="#_8-2-lua脚本扩展" aria-label="Permalink to &quot;8.2 Lua脚本扩展&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># OpenResty或Nginx+Lua模块配置</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /api/lua </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.redis&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> red </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> redis</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_timeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">-- 1秒超时</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">connect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;failed to connect: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 业务逻辑处理</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello from Lua!&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-3-地理位置优化" tabindex="-1">8.3 地理位置优化 <a class="header-anchor" href="#_8-3-地理位置优化" aria-label="Permalink to &quot;8.3 地理位置优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # GeoIP2模块配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    geoip2</span><span class="__shiki_140thh"> /usr/share/GeoIP/GeoLite2-Country.mmdb {</span></span>
<span class="line"><span class="__shiki_140thh">        $</span><span class="__shiki_1itgoe">geoip2_country_code</span><span class="__shiki_140thh"> country iso_code;</span></span>
<span class="line"><span class="__shiki_140thh">        $</span><span class="__shiki_1itgoe">geoip2_country_name</span><span class="__shiki_140thh"> country names en;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    geoip2</span><span class="__shiki_140thh"> /usr/share/GeoIP/GeoLite2-City.mmdb {</span></span>
<span class="line"><span class="__shiki_140thh">        $</span><span class="__shiki_1itgoe">geoip2_city_name</span><span class="__shiki_140thh"> city names en;</span></span>
<span class="line"><span class="__shiki_140thh">        $</span><span class="__shiki_1itgoe">geoip2_latitude</span><span class="__shiki_140thh"> location latitude;</span></span>
<span class="line"><span class="__shiki_140thh">        $</span><span class="__shiki_1itgoe">geoip2_longitude</span><span class="__shiki_140thh"> location longitude;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 根据地理位置路由</span></span>
<span class="line"><span class="__shiki_1itgoe">    split_clients </span><span class="__shiki_mdbnqw">&quot;\${</span><span class="__shiki_140thh">geoip2_country_code</span><span class="__shiki_mdbnqw">}\${</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_140thh"> $backend_selector {</span></span>
<span class="line"><span class="__shiki_140thh">        50% backend_eu;</span></span>
<span class="line"><span class="__shiki_140thh">        50% backend_us;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第九部分-测试与验证" tabindex="-1">第九部分：测试与验证 <a class="header-anchor" href="#第九部分-测试与验证" aria-label="Permalink to &quot;第九部分：测试与验证&quot;">​</a></h2><h3 id="_9-1-配置验证命令" tabindex="-1">9.1 配置验证命令 <a class="header-anchor" href="#_9-1-配置验证命令" aria-label="Permalink to &quot;9.1 配置验证命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置文件语法检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_dzsirb"> -t</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_dzsirb"> -T</span><span class="__shiki_21nrsd">  # 显示完整配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置文件热重载</span></span>
<span class="line"><span class="__shiki_1t8gfj">nginx</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> reload</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 性能测试工具</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用wrk进行压力测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">wrk</span><span class="__shiki_dzsirb"> -t12</span><span class="__shiki_dzsirb"> -c400</span><span class="__shiki_dzsirb"> -d30s</span><span class="__shiki_mdbnqw"> https://example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用ab进行压力测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">ab</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_mdbnqw"> https://example.com/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控工具</span></span>
<span class="line"><span class="__shiki_21nrsd"># 实时监控连接状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">watch</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_mdbnqw"> &quot;netstat -an | grep :80 | wc -l&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Nginx状态监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_mdbnqw"> http://localhost:8080/nginx_status</span></span></code></pre></div><h3 id="_9-2-性能调优检查清单" tabindex="-1">9.2 性能调优检查清单 <a class="header-anchor" href="#_9-2-性能调优检查清单" aria-label="Permalink to &quot;9.2 性能调优检查清单&quot;">​</a></h3><ol><li><p><strong>进程检查</strong></p><ul><li>worker_processes = CPU核心数</li><li>worker_connections 设置合理</li><li>worker_rlimit_nofile 足够大</li></ul></li><li><p><strong>网络检查</strong></p><ul><li>开启sendfile</li><li>开启tcp_nopush</li><li>开启tcp_nodelay</li></ul></li><li><p><strong>缓冲区检查</strong></p><ul><li>各种缓冲区大小适中</li><li>临时文件路径正确</li></ul></li><li><p><strong>缓存检查</strong></p><ul><li>静态资源缓存开启</li><li>代理缓存配置正确</li><li>浏览器缓存头设置</li></ul></li><li><p><strong>安全检查</strong></p><ul><li>SSL配置安全</li><li>安全头部齐全</li><li>访问限制合理</li></ul></li></ol><h2 id="第十部分-常见场景配置模板" tabindex="-1">第十部分：常见场景配置模板 <a class="header-anchor" href="#第十部分-常见场景配置模板" aria-label="Permalink to &quot;第十部分：常见场景配置模板&quot;">​</a></h2><h3 id="_10-1-高并发api服务器" tabindex="-1">10.1 高并发API服务器 <a class="header-anchor" href="#_10-1-高并发api服务器" aria-label="Permalink to &quot;10.1 高并发API服务器&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">20000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    multi_accept </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> api_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        least_conn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> api1:8080 </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> api2:8080 </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">        keepalive </span><span class="__shiki_dzsirb">64</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh"> reuseport;</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://api_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout http_500;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-静态cdn节点" tabindex="-1">10.2 静态CDN节点 <a class="header-anchor" href="#_10-2-静态cdn节点" aria-label="Permalink to &quot;10.2 静态CDN节点&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/cache levels=1:2 keys_zone=cdn_cache:100m </span></span>
<span class="line"><span class="__shiki_140thh">                 max_size=10g inactive=60m use_temp_path=off;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(css|js|jpg|jpeg|png|gif|ico|woff2)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">cdn_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 7d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout updating;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache-Status $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-3-微服务网关" tabindex="-1">10.3 微服务网关 <a class="header-anchor" href="#_10-3-微服务网关" aria-label="Permalink to &quot;10.3 微服务网关&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $service {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/users/     user_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/orders/    order_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/products/  product_service;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">       default_service;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> user_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> user-service:8001;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> order_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> order-service:8002;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://$service;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 统一的认证、限流、日志等中间件配置</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="总结与最佳实践" tabindex="-1">总结与最佳实践 <a class="header-anchor" href="#总结与最佳实践" aria-label="Permalink to &quot;总结与最佳实践&quot;">​</a></h2><h3 id="关键原则" tabindex="-1">关键原则： <a class="header-anchor" href="#关键原则" aria-label="Permalink to &quot;关键原则：&quot;">​</a></h3><ol><li><strong>逐步调优</strong>：一次只修改一个参数，观察效果</li><li><strong>监控驱动</strong>：基于实际监控数据做决策</li><li><strong>场景定制</strong>：根据具体业务需求调整配置</li><li><strong>安全优先</strong>：在追求性能的同时确保安全</li></ol><h3 id="性能指标监控" tabindex="-1">性能指标监控： <a class="header-anchor" href="#性能指标监控" aria-label="Permalink to &quot;性能指标监控：&quot;">​</a></h3><ul><li>QPS（每秒查询率）</li><li>响应时间（P50/P95/P99）</li><li>错误率</li><li>连接数</li><li>系统资源（CPU、内存、磁盘IO、网络带宽）</li></ul><h3 id="版本管理" tabindex="-1">版本管理： <a class="header-anchor" href="#版本管理" aria-label="Permalink to &quot;版本管理：&quot;">​</a></h3><ul><li>使用配置管理工具（Ansible、Puppet等）</li><li>配置文件版本控制</li><li>变更记录和回滚方案</li></ul><hr><p><strong>注意事项</strong>：</p><ol><li>所有配置修改前备份原文件</li><li>生产环境修改先在测试环境验证</li><li>监控修改后的系统表现</li><li>根据硬件配置和业务特点调整参数</li><li>定期审查和更新配置</li></ol><p>通过以上优化配置，可以显著提升Nginx的性能、安全性和可靠性。但需要注意，最优配置因具体环境和需求而异，需要根据实际监控数据进行持续调优。</p>`,66)])])}const d=a(p,[["render",l]]);export{r as __pageData,d as default};
