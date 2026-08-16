import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Nginx缓存加速机制完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/nginx/caching.md","filePath":"devops/web-servers/nginx/caching.md"}'),p={name:"devops/web-servers/nginx/caching.md"};function h(l,s,c,e,t,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="nginx缓存加速机制完全指南" tabindex="-1">Nginx缓存加速机制完全指南 <a class="header-anchor" href="#nginx缓存加速机制完全指南" aria-label="Permalink to &quot;Nginx缓存加速机制完全指南&quot;">​</a></h1><h2 id="第一部分-缓存基础理论" tabindex="-1">第一部分：缓存基础理论 <a class="header-anchor" href="#第一部分-缓存基础理论" aria-label="Permalink to &quot;第一部分：缓存基础理论&quot;">​</a></h2><h3 id="_1-1-缓存架构概览" tabindex="-1">1.1 缓存架构概览 <a class="header-anchor" href="#_1-1-缓存架构概览" aria-label="Permalink to &quot;1.1 缓存架构概览&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">Nginx缓存体系 = 代理缓存 + FastCGI缓存 + uWSGI缓存 + SCGI缓存 + 内存缓存</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 客户端缓存（浏览器缓存）</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 边缘缓存（CDN缓存）</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 反向代理缓存</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 应用缓存</span></span></code></pre></div><h3 id="_1-2-缓存工作流程" tabindex="-1">1.2 缓存工作流程 <a class="header-anchor" href="#_1-2-缓存工作流程" aria-label="Permalink to &quot;1.2 缓存工作流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">请求流程：</span></span>
<span class="line"><span class="__shiki_wvjl67">1. 客户端请求到达Nginx</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 检查内存缓存（如有）</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 检查磁盘缓存</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 缓存命中 → 直接返回</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 缓存未命中 → 转发到上游 → 缓存响应 → 返回客户端</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">缓存决策：</span></span>
<span class="line"><span class="__shiki_wvjl67">客户端请求 → 缓存键计算 → 缓存查找 → 缓存验证 → 返回/回源</span></span></code></pre></div><h3 id="_1-3-缓存类型对比" tabindex="-1">1.3 缓存类型对比 <a class="header-anchor" href="#_1-3-缓存类型对比" aria-label="Permalink to &quot;1.3 缓存类型对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>缓存类型</th><th>存储位置</th><th>适用场景</th><th>配置复杂度</th></tr></thead><tbody><tr><td>代理缓存</td><td>磁盘/内存</td><td>反向代理内容</td><td>中等</td></tr><tr><td>FastCGI缓存</td><td>磁盘</td><td>PHP应用</td><td>简单</td></tr><tr><td>内存缓存</td><td>内存</td><td>热点数据</td><td>复杂</td></tr><tr><td>客户端缓存</td><td>浏览器</td><td>静态资源</td><td>简单</td></tr></tbody></table><h2 id="第二部分-代理缓存-proxy-cache" tabindex="-1">第二部分：代理缓存（Proxy Cache） <a class="header-anchor" href="#第二部分-代理缓存-proxy-cache" aria-label="Permalink to &quot;第二部分：代理缓存（Proxy Cache）&quot;">​</a></h2><h3 id="_2-1-基础代理缓存配置" tabindex="-1">2.1 基础代理缓存配置 <a class="header-anchor" href="#_2-1-基础代理缓存配置" aria-label="Permalink to &quot;2.1 基础代理缓存配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定义缓存区域</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/proxy_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2                      </span><span class="__shiki_21nrsd"># 目录层级 1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=proxy_cache:100m      </span><span class="__shiki_21nrsd"># 内存中的键区域（100MB）</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=10g                    </span><span class="__shiki_21nrsd"># 磁盘缓存最大大小（10GB）</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=60m                    </span><span class="__shiki_21nrsd"># 未被访问的缓存保留时间（60分钟）</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;              </span><span class="__shiki_21nrsd"># 不使用临时路径</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义缓存键</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">is_args</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">args</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">proxy_cache;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存有效时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 10m</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 200/302状态码缓存10分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd"># 404状态码缓存1分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_140thh">any </span><span class="__shiki_dzsirb">5m</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd"># 其他状态码缓存5分钟</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加缓存状态头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache-Status $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-高级缓存策略配置" tabindex="-1">2.2 高级缓存策略配置 <a class="header-anchor" href="#_2-2-高级缓存策略配置" aria-label="Permalink to &quot;2.2 高级缓存策略配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多级缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/fast_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=fast_cache:50m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=5g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=30m</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/slow_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=slow_cache:50m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=20g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=7d</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存键优化</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $cache_key {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">is_args</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">args</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_21q97f">^/api/v1/users/(?&lt;user_id&gt;\\d+) &quot;$</span><span class="__shiki_140thh">scheme$request_method$host/api/v1/users/$user_id</span><span class="__shiki_mdbnqw">&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ~^/products/(?&lt;product_id&gt;[^/]+) &quot;</span><span class="__shiki_140thh">$scheme$request_method$host/products/$product_id</span><span class="__shiki_mdbnqw">&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 条件缓存</span></span>
<span class="line"><span class="__shiki_mdbnqw">map $</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">skip_cache</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    default 0;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    POST 1;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    PUT 1;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    DELETE 1;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    PATCH 1;</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">map $</span><span class="__shiki_140thh">http_cookie</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">cache_bypass</span><span class="__shiki_mdbnqw"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ~*sessionid 1;      # 有sessionid时不缓存</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ~*token     1;      # 有token时不缓存</span></span>
<span class="line"><span class="__shiki_mdbnqw">    default     0;</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h3 id="_2-3-缓存锁定与并发控制" tabindex="-1">2.3 缓存锁定与并发控制 <a class="header-anchor" href="#_2-3-缓存锁定与并发控制" aria-label="Permalink to &quot;2.3 缓存锁定与并发控制&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache </span><span class="__shiki_140thh">proxy_cache;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存锁定（防止缓存击穿）</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;                  </span><span class="__shiki_21nrsd"># 启用缓存锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_lock_age </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;              </span><span class="__shiki_21nrsd"># 锁定最大时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_lock_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;          </span><span class="__shiki_21nrsd"># 等待锁定的超时时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 后台缓存更新</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_background_update </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;     </span><span class="__shiki_21nrsd"># 后台更新过期缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_revalidate </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;            </span><span class="__shiki_21nrsd"># 使用条件请求验证缓存</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存刷新</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_purge </span><span class="__shiki_140thh">purge_cache;        </span><span class="__shiki_21nrsd"># 缓存清理支持</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 陈旧缓存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout invalid_header</span></span>
<span class="line"><span class="__shiki_140thh">                                       updating http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存最小使用次数</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_min_uses </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;               </span><span class="__shiki_21nrsd"># 至少被请求3次才缓存</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第三部分-fastcgi缓存" tabindex="-1">第三部分：FastCGI缓存 <a class="header-anchor" href="#第三部分-fastcgi缓存" aria-label="Permalink to &quot;第三部分：FastCGI缓存&quot;">​</a></h2><h3 id="_3-1-基础fastcgi缓存配置" tabindex="-1">3.1 基础FastCGI缓存配置 <a class="header-anchor" href="#_3-1-基础fastcgi缓存配置" aria-label="Permalink to &quot;3.1 基础FastCGI缓存配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># FastCGI缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">fastcgi_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/fastcgi_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=fastcgi_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=10g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=60m</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">php.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> \\.php$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_pass </span><span class="__shiki_140thh">unix:/var/run/php/php7.4-fpm.sock;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # FastCGI参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_param </span><span class="__shiki_140thh">SCRIPT_FILENAME $document_root$fastcgi_script_name;</span></span>
<span class="line"><span class="__shiki_1itgoe">        include </span><span class="__shiki_140thh">fastcgi_params;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache </span><span class="__shiki_140thh">fastcgi_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_bypass </span><span class="__shiki_140thh">$http_cache_control;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_no_cache </span><span class="__shiki_140thh">$http_pragma $http_authorization;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Fastcgi-Cache $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-wordpress专用缓存配置" tabindex="-1">3.2 WordPress专用缓存配置 <a class="header-anchor" href="#_3-2-wordpress专用缓存配置" aria-label="Permalink to &quot;3.2 WordPress专用缓存配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># WordPress缓存优化</span></span>
<span class="line"><span class="__shiki_1itgoe">fastcgi_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/wordpress_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=WORDPRESS:100m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=5g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=24h;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_cookie</span><span class="__shiki_140thh"> $skip_cache {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # WordPress登录用户不缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">wordpress_logged_in_ </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">comment_author_      </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">wp-postpass_         </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # WooCommerce购物车不缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">woocommerce_items_in_cart </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">wc_session_               </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> \\.php$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_pass </span><span class="__shiki_140thh">unix:/var/run/php/php-fpm.sock;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # WordPress缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache </span><span class="__shiki_140thh">WORDPRESS;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 301</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 12h</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_bypass </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_no_cache </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_lock_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存微调</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout updating</span></span>
<span class="line"><span class="__shiki_140thh">                              http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_background_update </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_revalidate </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存清理支持</span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_purge </span><span class="__shiki_140thh">$purge_method;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存清理端点</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> /purge(/.*) </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        fastcgi_cache_purge </span><span class="__shiki_140thh">WORDPRESS </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-内存缓存与共享字典" tabindex="-1">第四部分：内存缓存与共享字典 <a class="header-anchor" href="#第四部分-内存缓存与共享字典" aria-label="Permalink to &quot;第四部分：内存缓存与共享字典&quot;">​</a></h2><h3 id="_4-1-共享字典配置-nginx-plus" tabindex="-1">4.1 共享字典配置（Nginx Plus） <a class="header-anchor" href="#_4-1-共享字典配置-nginx-plus" aria-label="Permalink to &quot;4.1 共享字典配置（Nginx Plus）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 共享内存区域配置</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/proxy_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=proxy_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=10g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=60m</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 共享字典用于存储热点数据</span></span>
<span class="line"><span class="__shiki_1itgoe">zone_sync</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">zone_sync_server </span><span class="__shiki_140thh">nginx_sync:8080;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存统计共享区域</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/stats levels=1:2 keys_zone=cache_stats:10m;</span></span></code></pre></div><h3 id="_4-2-lua-redis内存缓存" tabindex="-1">4.2 Lua + Redis内存缓存 <a class="header-anchor" href="#_4-2-lua-redis内存缓存" aria-label="Permalink to &quot;4.2 Lua + Redis内存缓存&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># OpenResty配置示例</span></span>
<span class="line"><span class="__shiki_1itgoe">lua_shared_dict</span><span class="__shiki_140thh"> redis_cache </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 100MB共享内存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">init_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.redis&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> red </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> redis</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_timeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">-- 1秒超时</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 连接池配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">connect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">ERR</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;failed to connect to redis: &quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span></span>
<span class="line"><span class="__shiki_1itgoe">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 保持连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">    red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_keepalive</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /api/data </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.redis&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> cjson </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;cjson&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">redis_cache</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 生成缓存键</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> key </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;api:data:&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 首先检查内存缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> cached_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> cached_data </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(cached_data)</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 检查Redis缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> red </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> redis</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">            red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_timeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">connect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(key)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> res </span><span class="__shiki_1itgoe">and</span><span class="__shiki_140thh"> res </span><span class="__shiki_1itgoe">~=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">null</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 放入内存缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    cache</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(key, res, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">) </span><span class="__shiki_21nrsd">-- 缓存60秒</span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(res)</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_keepalive</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_1t8gfj">                red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_keepalive</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 回源获取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> httpc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">request_uri</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;http://backend&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">request_uri</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">                method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;GET&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                headers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                    [</span><span class="__shiki_mdbnqw">&quot;Content-Type&quot;</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;application/json&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> res and res.status == </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">                -- 缓存到Redis</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> red = redis:new()</span></span>
<span class="line"><span class="__shiki_140thh">                red:set_timeout(1000)</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> ok, err = red:connect(</span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, 6379)</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> ok then</span></span>
<span class="line"><span class="__shiki_140thh">                    red:setex(key, 300, res.body) -- Redis缓存5分钟</span></span>
<span class="line"><span class="__shiki_140thh">                    red:set_keepalive(10000, 100)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                -- 缓存到内存</span></span>
<span class="line"><span class="__shiki_140thh">                cache:set(key, res.body, 60) -- 内存缓存1分钟</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(res.body)</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.</span><span class="__shiki_1itgoe">status</span><span class="__shiki_140thh"> = 500</span></span>
<span class="line"><span class="__shiki_140thh">                ngx.say(&#39;{&quot;error&quot;: &quot;</span><span class="__shiki_1itgoe">Internal</span><span class="__shiki_140thh"> Server Error</span><span class="__shiki_mdbnqw">&quot;}&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            end</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h2 id="第五部分-浏览器缓存控制" tabindex="-1">第五部分：浏览器缓存控制 <a class="header-anchor" href="#第五部分-浏览器缓存控制" aria-label="Permalink to &quot;第五部分：浏览器缓存控制&quot;">​</a></h2><h3 id="_5-1-静态资源缓存优化" tabindex="-1">5.1 静态资源缓存优化 <a class="header-anchor" href="#_5-1-静态资源缓存优化" aria-label="Permalink to &quot;5.1 静态资源缓存优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 静态文件缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">sent_http_content_type</span><span class="__shiki_140thh"> $expires {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_dzsirb">                    off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文本文件</span></span>
<span class="line"><span class="__shiki_140thh">    text/html                  </span><span class="__shiki_dzsirb">1h</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    text/css                   1y;</span></span>
<span class="line"><span class="__shiki_140thh">    application/javascript     1y;</span></span>
<span class="line"><span class="__shiki_140thh">    application/json           </span><span class="__shiki_dzsirb">1h</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 图片文件</span></span>
<span class="line"><span class="__shiki_140thh">    image/jpeg                 1y;</span></span>
<span class="line"><span class="__shiki_140thh">    image/png                  1y;</span></span>
<span class="line"><span class="__shiki_140thh">    image/gif                  1y;</span></span>
<span class="line"><span class="__shiki_140thh">    image/webp                 1y;</span></span>
<span class="line"><span class="__shiki_140thh">    image/svg+xml              1y;</span></span>
<span class="line"><span class="__shiki_140thh">    image/x-icon               1y;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 字体文件</span></span>
<span class="line"><span class="__shiki_140thh">    font/woff2                 1y;</span></span>
<span class="line"><span class="__shiki_140thh">    font/woff                  1y;</span></span>
<span class="line"><span class="__shiki_140thh">    font/ttf                   1y;</span></span>
<span class="line"><span class="__shiki_140thh">    font/otf                   1y;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 媒体文件</span></span>
<span class="line"><span class="__shiki_140thh">    audio/mpeg                 1y;</span></span>
<span class="line"><span class="__shiki_140thh">    video/mp4                  1y;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 应用程序</span></span>
<span class="line"><span class="__shiki_140thh">    application/pdf            1y;</span></span>
<span class="line"><span class="__shiki_140thh">    application/zip            1y;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">static.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 静态资源目录</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">/var/www/static;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 开启文件系统缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache </span><span class="__shiki_140thh">max=10000 inactive=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_valid </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_min_uses </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    open_file_cache_errors </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用sendfile</span></span>
<span class="line"><span class="__shiki_1itgoe">    sendfile </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    sendfile_max_chunk </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    tcp_nopush </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动应用缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    expires </span><span class="__shiki_140thh">$expires;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 强制缓存控制头</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 资源不变时使用强缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加唯一标识（版本控制）</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($uri </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;\\.(css|js)$&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable, max-age=31536000&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 关闭访问日志（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        log_not_found </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # HTML文件特殊处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.html$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=3600, must-revalidate&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">ETag </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 禁用HTML文件的缓存（开发环境）</span></span>
<span class="line"><span class="__shiki_21nrsd">        # expires -1;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # add_header Cache-Control &quot;no-store, no-cache, must-revalidate, proxy-revalidate&quot;;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-版本控制与缓存清除" tabindex="-1">5.2 版本控制与缓存清除 <a class="header-anchor" href="#_5-2-版本控制与缓存清除" aria-label="Permalink to &quot;5.2 版本控制与缓存清除&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于内容的版本控制</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> &quot;^/static/(.+)-([a-f0-9]</span><span class="__shiki_140thh">{8,})\\.(js|css|jpg|png|gif|svg)$&quot; {</span></span>
<span class="line"><span class="__shiki_1itgoe">    alias </span><span class="__shiki_140thh">/var/www/static/$1.$3;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 长期缓存（内容变化时文件名会变）</span></span>
<span class="line"><span class="__shiki_1itgoe">    expires </span><span class="__shiki_dzsirb">max</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable, max-age=31536000&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 添加内容安全策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查询参数版本控制</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">args</span><span class="__shiki_140thh"> $cache_control {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;~v=[0-9a-f]+&quot;</span><span class="__shiki_mdbnqw"> &quot;public, immutable, max-age=31536000&quot;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 带版本号</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw">        &quot;public, max-age=3600&quot;</span><span class="__shiki_140thh">;                   </span><span class="__shiki_21nrsd"># 无版本号</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /static/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">/var/www;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基于查询参数的缓存控制</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Cache-Control $cache_control;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 移除版本参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ($args </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;(^|&amp;)v=[^&amp;]+&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$args </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-cdn边缘缓存" tabindex="-1">第六部分：CDN边缘缓存 <a class="header-anchor" href="#第六部分-cdn边缘缓存" aria-label="Permalink to &quot;第六部分：CDN边缘缓存&quot;">​</a></h2><h3 id="_6-1-cdn源站配置" tabindex="-1">6.1 CDN源站配置 <a class="header-anchor" href="#_6-1-cdn源站配置" aria-label="Permalink to &quot;6.1 CDN源站配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># CDN源站缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/cdn_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=cdn_cache:200m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=50g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=30d</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $cdn_cache_key {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 去除CDN添加的参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_21q97f">^(?&lt;path&gt;[^?]*)(?:\\?.*)?$</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">path</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">cdn-source.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CDN回源配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # CDN专用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">cdn_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_key </span><span class="__shiki_140thh">$cdn_cache_key;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 长期缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 7d</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd"># 7天</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1h</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 1小时</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_140thh">any </span><span class="__shiki_dzsirb">1d</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 1天</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # CDN相关头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=604800&quot;</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 7天</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Access-Control-Allow-Origin </span><span class="__shiki_mdbnqw">&quot;*&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Access-Control-Allow-Methods </span><span class="__shiki_mdbnqw">&quot;GET, HEAD&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 禁止CDN缓存的页面</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($request_uri </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;(login|admin|dashboard|api)&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$skip_cache </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_bypass </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_no_cache </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存刷新接口</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> /purge-cdn-cache(/.*) </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_140thh">10.0.0.0/8;    </span><span class="__shiki_21nrsd"># CDN IP段</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_140thh">192.168.0.0/16;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_purge </span><span class="__shiki_140thh">cdn_cache </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-多级cdn缓存策略" tabindex="-1">6.2 多级CDN缓存策略 <a class="header-anchor" href="#_6-2-多级cdn缓存策略" aria-label="Permalink to &quot;6.2 多级CDN缓存策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 三级缓存策略</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 浏览器缓存</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. CDN边缘节点缓存</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. CDN父节点缓存</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 源站缓存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据请求头判断缓存级别</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_x_cache_level</span><span class="__shiki_140thh"> $cache_duration {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;edge&quot;</span><span class="__shiki_mdbnqw">    &quot;public, max-age=3600, s-maxage=86400&quot;</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd"># 边缘节点1小时，父节点1天</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;parent&quot;</span><span class="__shiki_mdbnqw">  &quot;public, max-age=3600, s-maxage=604800&quot;</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd"># 边缘节点1小时，父节点7天</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw">   &quot;public, max-age=86400, s-maxage=2592000&quot;</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd"># 边缘节点1天，父节点30天</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据文件类型设置不同的CDN策略</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">sent_http_content_type</span><span class="__shiki_140thh"> $cdn_cache_control {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 静态资源 - 长期缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^image/                  </span><span class="__shiki_mdbnqw">&quot;public, max-age=31536000, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^font/                   </span><span class="__shiki_mdbnqw">&quot;public, max-age=31536000, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^text/css                </span><span class="__shiki_mdbnqw">&quot;public, max-age=31536000, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^application/javascript  </span><span class="__shiki_mdbnqw">&quot;public, max-age=31536000, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态资源 - 短期缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^text/html               </span><span class="__shiki_mdbnqw">&quot;public, max-age=3600, s-maxage=7200&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^application/json        </span><span class="__shiki_mdbnqw">&quot;public, max-age=300, s-maxage=3600&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 媒体文件 - 中期缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^video/                  </span><span class="__shiki_mdbnqw">&quot;public, max-age=86400, s-maxage=604800&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^audio/                  </span><span class="__shiki_mdbnqw">&quot;public, max-age=86400, s-maxage=604800&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw">                   &quot;public, max-age=3600&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 设置CDN缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control $cdn_cache_control;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # Vary头处理（CDN兼容）</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_hide_header </span><span class="__shiki_140thh">Vary;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Vary </span><span class="__shiki_mdbnqw">&quot;Accept-Encoding&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 支持条件请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">If-None-Match $http_if_none_match;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">If-Modified-Since $http_if_modified_since;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-缓存优化与性能调优" tabindex="-1">第七部分：缓存优化与性能调优 <a class="header-anchor" href="#第七部分-缓存优化与性能调优" aria-label="Permalink to &quot;第七部分：缓存优化与性能调优&quot;">​</a></h2><h3 id="_7-1-缓存分区与分层" tabindex="-1">7.1 缓存分区与分层 <a class="header-anchor" href="#_7-1-缓存分区与分层" aria-label="Permalink to &quot;7.1 缓存分区与分层&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于访问频率的分区缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/hot_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=hot_cache:50m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=5g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=1h</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off</span></span>
<span class="line"><span class="__shiki_140thh">    loader_threshold=300</span></span>
<span class="line"><span class="__shiki_140thh">    loader_files=200;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/cold_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=cold_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=20g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=7d</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于访问模式的路由</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $cache_zone {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/products/(hot|trending)  hot_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/products/                cold_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/articles/recent/                hot_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/articles/                       cold_cache;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">                            hot_cache;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态选择缓存分区</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">$cache_zone;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 分区特定的缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($cache_zone </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">hot_cache) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_min_uses </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($cache_zone </span><span class="__shiki_1itgoe">= </span><span class="__shiki_140thh">cold_cache) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 30m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_min_uses </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-缓存预热与预加载" tabindex="-1">7.2 缓存预热与预加载 <a class="header-anchor" href="#_7-2-缓存预热与预加载" aria-label="Permalink to &quot;7.2 缓存预热与预加载&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 缓存预热配置</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /warmup-cache </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    internal</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 内部接口，只能内部访问</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预热特定的缓存项</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache </span><span class="__shiki_140thh">proxy_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">arg_key</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预加载参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Cache-Warmup </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 不返回给客户端</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 204</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定时预热脚本集成</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /admin/cache-warmup </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">    deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 调用预热接口</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 预热热门页面</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> urls </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;/&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;/products&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;/articles&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;/api/v1/products/hot&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, url in ipairs(urls) do</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> res, err = httpc:request_uri(</span><span class="__shiki_mdbnqw">&quot;http://127.0.0.1/warmup-cache?key=&quot;</span><span class="__shiki_140thh"> .. ngx.escape_uri(url), {</span></span>
<span class="line"><span class="__shiki_1itgoe">                method</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">            ngx.say(&quot;</span><span class="__shiki_1itgoe">Warmed</span><span class="__shiki_140thh"> up: </span><span class="__shiki_mdbnqw">&quot; .. url)</span></span>
<span class="line"><span class="__shiki_mdbnqw">        end</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h3 id="_7-3-缓存监控与统计" tabindex="-1">7.3 缓存监控与统计 <a class="header-anchor" href="#_7-3-缓存监控与统计" aria-label="Permalink to &quot;7.3 缓存监控与统计&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 缓存统计配置</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/stats_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=stats_cache:10m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=100m</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=1h;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存统计端点</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /cache-stats </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">    deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 返回JSON格式的缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    default_type </span><span class="__shiki_140thh">application/json;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;ngx.cache&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cjson </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;cjson&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        -- 获取缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            hits </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hits&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            misses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;misses&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            expired </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;expired&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            bypass </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bypass&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;size&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        -- 计算命中率</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> total = stats.hits + stats.misses</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> total &gt; </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_140thh">            stats.</span><span class="__shiki_1itgoe">hit_rate</span><span class="__shiki_140thh"> = stats.hits / total</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span></span>
<span class="line"><span class="__shiki_140thh">            stats.</span><span class="__shiki_1itgoe">hit_rate</span><span class="__shiki_140thh"> = 0</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(cjson.encode(stats))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日志中的缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">log_format </span><span class="__shiki_140thh">cache_stats </span><span class="__shiki_mdbnqw">&#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       &#39;&quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       &#39;&quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       &#39;Cache:$</span><span class="__shiki_140thh">upstream_cache_status</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       &#39;Time:$</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                       &#39;Upstream:$</span><span class="__shiki_140thh">upstream_response_time</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache </span><span class="__shiki_140thh">proxy_cache;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 记录缓存状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cache_stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">upstream_cache_status</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;HIT&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;hits&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elseif</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;MISS&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;misses&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elseif</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;EXPIRED&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;expired&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elseif</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;BYPASS&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            cache_stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bypass&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第八部分-高级缓存策略" tabindex="-1">第八部分：高级缓存策略 <a class="header-anchor" href="#第八部分-高级缓存策略" aria-label="Permalink to &quot;第八部分：高级缓存策略&quot;">​</a></h2><h3 id="_8-1-缓存分片-slice-cache" tabindex="-1">8.1 缓存分片（Slice Cache） <a class="header-anchor" href="#_8-1-缓存分片-slice-cache" aria-label="Permalink to &quot;8.1 缓存分片（Slice Cache）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 大文件分片缓存（支持HTTP Range请求）</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/slice_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=slice_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=100g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=30d;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /videos/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用分片缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    slice </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 每个分片1MB</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://video_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 分片缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache </span><span class="__shiki_140thh">slice_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">slice_range</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Range $slice_range;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 206</span><span class="__shiki_dzsirb"> 30d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 分片锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_lock_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 支持Range请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Accept-Ranges bytes;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 添加分片缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Slice-Cache $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Accept-Ranges bytes;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># MP4视频流优化</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> \\.mp4$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    mp4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    mp4_buffer_size </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    mp4_max_buffer_size </span><span class="__shiki_dzsirb">5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://video_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache </span><span class="__shiki_140thh">video_cache;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 视频文件长期缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 206</span><span class="__shiki_dzsirb"> 365d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用请求体缓冲</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_request_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-esi-edge-side-includes-缓存" tabindex="-1">8.2 ESI（Edge Side Includes）缓存 <a class="header-anchor" href="#_8-2-esi-edge-side-includes-缓存" aria-label="Permalink to &quot;8.2 ESI（Edge Side Includes）缓存&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># ESI片段缓存（需要第三方模块）</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用ESI处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    esi</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    esi_syntax</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 片段缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache </span><span class="__shiki_140thh">esi_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 不同片段的缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    esi_ignore_other_elements</span><span class="__shiki_dzsirb"> on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ESI变量传递</span></span>
<span class="line"><span class="__shiki_1itgoe">    esi_set</span><span class="__shiki_140thh"> $user_id $cookie_userid;</span></span>
<span class="line"><span class="__shiki_1itgoe">    esi_set</span><span class="__shiki_140thh"> $locale $http_accept_language;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 片段缓存单独配置</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /fragments/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://fragment_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 片段专用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache </span><span class="__shiki_140thh">fragment_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 片段缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Fragment-Cache $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-3-智能缓存失效" tabindex="-1">8.3 智能缓存失效 <a class="header-anchor" href="#_8-3-智能缓存失效" aria-label="Permalink to &quot;8.3 智能缓存失效&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于事件的缓存失效</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> redis_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 127.0.0.1:6379;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存失效通道</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /cache-invalidate </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.redis&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> red </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> redis</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_timeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">connect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 订阅缓存失效消息</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">subscribe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_invalidation&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> res </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">                while</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_1itgoe"> do</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> msg, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">read_reply</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> msg </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">                        -- 处理缓存失效消息</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.</span><span class="__shiki_dzsirb">log</span><span class="__shiki_140thh">(ngx.</span><span class="__shiki_1t8gfj">INFO</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;Invalidating cache: &quot;</span><span class="__shiki_140thh">, msg[</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        -- 调用缓存清理</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1t8gfj">                        httpc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">request_uri</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;http://127.0.0.1/purge&quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> msg[</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">], {</span></span>
<span class="line"><span class="__shiki_140thh">                            method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;PURGE&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        })</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_140thh">            red:set_keepalive(10000, 100)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主动失效接口</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /invalidate </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">    deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> redis </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.redis&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> red </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> redis</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_timeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> ok, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">connect</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">6379</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ok </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">            -- 发布缓存失效消息</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> path </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">arg_path</span><span class="__shiki_1itgoe"> or</span><span class="__shiki_mdbnqw"> &quot;/&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">publish</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;cache_invalidation&quot;</span><span class="__shiki_140thh">, path)</span></span>
<span class="line"><span class="__shiki_1t8gfj">            red</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set_keepalive</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Cache invalidation published for: &quot; </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh"> path)</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第九部分-安全与缓存" tabindex="-1">第九部分：安全与缓存 <a class="header-anchor" href="#第九部分-安全与缓存" aria-label="Permalink to &quot;第九部分：安全与缓存&quot;">​</a></h2><h3 id="_9-1-缓存安全策略" tabindex="-1">9.1 缓存安全策略 <a class="header-anchor" href="#_9-1-缓存安全策略" aria-label="Permalink to &quot;9.1 缓存安全策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 防止缓存污染</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $cache_safe {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 敏感路径不缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*</span><span class="__shiki_mdbnqw"> &quot;(admin|login|logout|register|profile|api/private)&quot;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 包含敏感参数的请求不缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*</span><span class="__shiki_mdbnqw"> &quot;\\?(.*&amp;)?(token|auth|password|key)=&quot;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 防止缓存攻击</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全缓存控制</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_bypass </span><span class="__shiki_140thh">$cache_safe;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_no_cache </span><span class="__shiki_140thh">$cache_safe;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 验证缓存内容</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_revalidate </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制缓存大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_max_range_offset </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 防止缓存投毒</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_hide_header </span><span class="__shiki_140thh">Set-Cookie;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_ignore_headers </span><span class="__shiki_140thh">Set-Cookie;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Cache-Safe $cache_safe;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Vary头安全处理</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_accept_encoding</span><span class="__shiki_140thh"> $vary_header {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw"> &quot;Accept-Encoding&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;</span><span class="__shiki_mdbnqw">      &quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全处理Vary头</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_hide_header </span><span class="__shiki_140thh">Vary;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Vary $vary_header;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 防止缓存键碰撞</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">http_accept_encoding</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-缓存隔离策略" tabindex="-1">9.2 缓存隔离策略 <a class="header-anchor" href="#_9-2-缓存隔离策略" aria-label="Permalink to &quot;9.2 缓存隔离策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于用户角色的缓存隔离</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_authorization</span><span class="__shiki_140thh"> $user_role {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw"> &quot;anonymous&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*</span><span class="__shiki_mdbnqw"> &quot;admin&quot;</span><span class="__shiki_mdbnqw">    &quot;admin&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*</span><span class="__shiki_mdbnqw"> &quot;premium&quot;</span><span class="__shiki_mdbnqw">  &quot;premium&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~*</span><span class="__shiki_mdbnqw"> &quot;basic&quot;</span><span class="__shiki_mdbnqw">    &quot;basic&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 角色特定的缓存键</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">user_role</span><span class="__shiki_140thh"> $role_specific_key {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    admin   </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">user_role</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    premium </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">user_role</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基于角色的缓存隔离</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">proxy_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_key </span><span class="__shiki_140thh">$role_specific_key;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 不同角色的缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($user_role </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;anonymous&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($user_role </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;basic&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 2m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($user_role </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;premium&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($user_role </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;admin&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_no_cache </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_bypass </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十部分-完整配置示例" tabindex="-1">第十部分：完整配置示例 <a class="header-anchor" href="#第十部分-完整配置示例" aria-label="Permalink to &quot;第十部分：完整配置示例&quot;">​</a></h2><h3 id="_10-1-电商平台缓存配置" tabindex="-1">10.1 电商平台缓存配置 <a class="header-anchor" href="#_10-1-电商平台缓存配置" aria-label="Permalink to &quot;10.1 电商平台缓存配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 电商平台综合缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">user </span><span class="__shiki_140thh">nginx;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存路径定义</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/product_cache</span></span>
<span class="line"><span class="__shiki_140thh">        levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">        keys_zone=product_cache:200m</span></span>
<span class="line"><span class="__shiki_140thh">        max_size=20g</span></span>
<span class="line"><span class="__shiki_140thh">        inactive=7d</span></span>
<span class="line"><span class="__shiki_140thh">        use_temp_path=off;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/cart_cache</span></span>
<span class="line"><span class="__shiki_140thh">        levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">        keys_zone=cart_cache:50m</span></span>
<span class="line"><span class="__shiki_140thh">        max_size=2g</span></span>
<span class="line"><span class="__shiki_140thh">        inactive=1h</span></span>
<span class="line"><span class="__shiki_140thh">        use_temp_path=off;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/user_cache</span></span>
<span class="line"><span class="__shiki_140thh">        levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">        keys_zone=user_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">        max_size=5g</span></span>
<span class="line"><span class="__shiki_140thh">        inactive=30m</span></span>
<span class="line"><span class="__shiki_140thh">        use_temp_path=off;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    fastcgi_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/php_cache</span></span>
<span class="line"><span class="__shiki_140thh">        levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">        keys_zone=php_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">        max_size=10g</span></span>
<span class="line"><span class="__shiki_140thh">        inactive=1h</span></span>
<span class="line"><span class="__shiki_140thh">        use_temp_path=off;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存统计共享内存</span></span>
<span class="line"><span class="__shiki_1itgoe">    lua_shared_dict</span><span class="__shiki_140thh"> cache_stats </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存键映射</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $cache_type {</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~</span><span class="__shiki_140thh">^/api/v1/products/      product_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~</span><span class="__shiki_140thh">^/api/v1/cart/          cart_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~</span><span class="__shiki_140thh">^/api/v1/user/          user_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~</span><span class="__shiki_140thh">^/product/              product_cache;</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_140thh">                  none;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存跳过条件</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_cookie</span><span class="__shiki_140thh"> $skip_cache {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ~*</span><span class="__shiki_mdbnqw"> &quot;(session|token|cart_id)&quot;</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 浏览器缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">sent_http_content_type</span><span class="__shiki_140thh"> $expires {</span></span>
<span class="line"><span class="__shiki_dzsirb">        default</span><span class="__shiki_dzsirb">                    off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        text/html                  </span><span class="__shiki_dzsirb">1h</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        text/css                   1y;</span></span>
<span class="line"><span class="__shiki_140thh">        application/javascript     1y;</span></span>
<span class="line"><span class="__shiki_140thh">        image/*                    1y;</span></span>
<span class="line"><span class="__shiki_140thh">        font/*                     1y;</span></span>
<span class="line"><span class="__shiki_140thh">        application/json           </span><span class="__shiki_dzsirb">5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 初始化缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    init_worker_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_hits&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_misses&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">set</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">shop.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 静态资源服务</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~*</span><span class="__shiki_21q97f"> \\.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            root </span><span class="__shiki_140thh">/var/www/static;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 文件系统缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">            open_file_cache </span><span class="__shiki_140thh">max=10000 inactive=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">            open_file_cache_valid </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            open_file_cache_min_uses </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            open_file_cache_errors </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 浏览器缓存（强缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">            expires </span><span class="__shiki_140thh">$expires;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, immutable&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 日志优化</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            log_not_found </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 产品页面缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> ^/product/(?&lt;product_id&gt;\\d+)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://product_service/product/$product_id;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 产品专用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache </span><span class="__shiki_140thh">product_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;product:$</span><span class="__shiki_140thh">product_id</span><span class="__shiki_mdbnqw">:$</span><span class="__shiki_140thh">http_accept_language</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 30m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_lock_age </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_lock_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 陈旧缓存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout updating http_500 http_502;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Product-Cache $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Product-ID $product_id;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 记录缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">            log_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span></span>
<span class="line"><span class="__shiki_1t8gfj">                stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">var</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">upstream_cache_status</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &quot;HIT&quot; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_hits&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">incr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_misses&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                end</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 购物车API（短期缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/v1/cart </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://cart_service;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 购物车缓存（带用户隔离）</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache </span><span class="__shiki_140thh">cart_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;cart:$</span><span class="__shiki_140thh">cookie_session_id</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 短期缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_140thh">any </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 跳过有变化的请求</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($request_method </span><span class="__shiki_1itgoe">!= </span><span class="__shiki_140thh">GET) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                set </span><span class="__shiki_140thh">$skip_cache </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_bypass </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_no_cache </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加版本头</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Cart-Cache $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 用户API（个性化缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/v1/user </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://user_service;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 用户数据缓存（带隔离）</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache </span><span class="__shiki_140thh">user_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;user:$</span><span class="__shiki_140thh">http_authorization</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 个性化缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 2m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 安全控制</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_hide_header </span><span class="__shiki_140thh">Set-Cookie;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_ignore_headers </span><span class="__shiki_140thh">Set-Cookie;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-User-Cache $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # PHP动态页面（FastCGI缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> \\.php$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_pass </span><span class="__shiki_140thh">unix:/var/run/php/php-fpm.sock;</span></span>
<span class="line"><span class="__shiki_1itgoe">            include </span><span class="__shiki_140thh">fastcgi_params;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # PHP页面缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_cache </span><span class="__shiki_140thh">php_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">http_cookie</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 跳过登录用户</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ($http_cookie </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;PHPSESSID&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                set </span><span class="__shiki_140thh">$skip_cache </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_cache_bypass </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_no_cache </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            fastcgi_cache_lock_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 添加缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-PHP-Cache $upstream_fastcgi_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存管理接口</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /admin/cache </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存统计</span></span>
<span class="line"><span class="__shiki_1itgoe">            location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /admin/cache/stats </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">                content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> stats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> ngx.</span><span class="__shiki_1t8gfj">shared</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache_stats</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> hits </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_hits&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> misses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_misses&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> stats</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;total_requests&quot;</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">or</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> hit_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> requests </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> then</span></span>
<span class="line"><span class="__shiki_140thh">                        hit_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> hits </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> requests</span></span>
<span class="line"><span class="__shiki_1itgoe">                    end</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">string.format</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">[[</span></span>
<span class="line"><span class="__shiki_mdbnqw">Cache Statistics:</span></span>
<span class="line"><span class="__shiki_mdbnqw">===============</span></span>
<span class="line"><span class="__shiki_mdbnqw">Total Requests: %d</span></span>
<span class="line"><span class="__shiki_mdbnqw">Cache Hits:     %d</span></span>
<span class="line"><span class="__shiki_mdbnqw">Cache Misses:   %d</span></span>
<span class="line"><span class="__shiki_mdbnqw">Hit Rate:       %.2f%%</span></span>
<span class="line"><span class="__shiki_mdbnqw">]]</span><span class="__shiki_140thh">, requests, hits, misses, hit_rate </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存清理</span></span>
<span class="line"><span class="__shiki_1itgoe">            location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> /admin/cache/purge/(.+) </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">                proxy_cache_purge </span><span class="__shiki_140thh">product_cache </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                proxy_cache_purge </span><span class="__shiki_140thh">cart_cache </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">                proxy_cache_purge </span><span class="__shiki_140thh">user_cache </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_mdbnqw"> &quot;Cache purged: $</span><span class="__shiki_140thh">1</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存预热</span></span>
<span class="line"><span class="__shiki_1itgoe">            location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /admin/cache/warmup </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">                content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    -- 预热热门产品</span></span>
<span class="line"><span class="__shiki_1itgoe">                    local</span><span class="__shiki_140thh"> products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_dzsirb">1001</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1002</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1003</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1004</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1005</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_1itgoe">                    for</span><span class="__shiki_140thh"> _, id in ipairs(products) do</span></span>
<span class="line"><span class="__shiki_1itgoe">                        local</span><span class="__shiki_140thh"> res = httpc:request_uri(</span><span class="__shiki_mdbnqw">&quot;http://127.0.0.1/product/&quot;</span><span class="__shiki_140thh"> .. id, {</span></span>
<span class="line"><span class="__shiki_1itgoe">                            method</span><span class="__shiki_140thh"> = </span><span class="__shiki_mdbnqw">&quot;GET&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        })</span></span>
<span class="line"><span class="__shiki_140thh">                        ngx.say(&quot;</span><span class="__shiki_1itgoe">Warmed</span><span class="__shiki_140thh"> up product: </span><span class="__shiki_mdbnqw">&quot; .. id)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    end</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    </span></span>
<span class="line"><span class="__shiki_mdbnqw">                    -- 预热首页</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    local res = httpc:request_uri(&quot;</span><span class="__shiki_140thh">http://127.0.0.1/</span><span class="__shiki_mdbnqw">&quot;, {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        method = &quot;</span><span class="__shiki_140thh">GET</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    })</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    ngx.say(&quot;</span><span class="__shiki_140thh">Warmed up homepage</span><span class="__shiki_mdbnqw">&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">                }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 健康检查端点</span></span>
<span class="line"><span class="__shiki_mdbnqw">        location /health {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            access_log off;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            return 200 &quot;</span><span class="__shiki_140thh">OK\\n</span><span class="__shiki_mdbnqw">&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 默认错误处理</span></span>
<span class="line"><span class="__shiki_mdbnqw">        error_page 500 502 503 504 =200 @fallback;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        location @fallback {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 返回静态错误页面</span></span>
<span class="line"><span class="__shiki_mdbnqw">            root /var/www/static;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            try_files /error.html =503;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            </span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 添加缓存头</span></span>
<span class="line"><span class="__shiki_mdbnqw">            add_header Cache-Control &quot;</span><span class="__shiki_140thh">no-store, no-cache, must-revalidate</span><span class="__shiki_mdbnqw">&quot;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h3 id="_10-2-新闻媒体网站缓存配置" tabindex="-1">10.2 新闻媒体网站缓存配置 <a class="header-anchor" href="#_10-2-新闻媒体网站缓存配置" aria-label="Permalink to &quot;10.2 新闻媒体网站缓存配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 新闻网站多级缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/news_hot</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=news_hot:100m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=5g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=1h</span></span>
<span class="line"><span class="__shiki_140thh">    loader_threshold=300</span></span>
<span class="line"><span class="__shiki_140thh">    loader_files=200;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/news_cold</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=news_cold:200m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=50g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=7d;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于时间的缓存策略</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $news_cache_zone {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/news/(breaking|latest)  news_hot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/news/([0-9]{4})/([0-9]{2})/([0-9]{2})  news_cold;</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">                     news_hot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于时间的缓存有效期</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $cache_duration {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/news/breaking  </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd"># 5分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/news/latest    </span><span class="__shiki_dzsirb">1800</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd"># 30分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/news/today     </span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd"># 1小时</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_dzsirb">           86400</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 24小时</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /news/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://news_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态选择缓存区域</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">$news_cache_zone;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态设置缓存时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh"> $cache_duration;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 智能缓存失效</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_revalidate </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout updating http_500;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加时间相关的缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-News-Cache-Zone $news_cache_zone;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache-Duration $cache_duration;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache-Status $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Article-Age $upstream_http_x_article_age;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 支持HTTP条件请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">If-None-Match $http_if_none_match;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">If-Modified-Since $http_if_modified_since;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 实时新闻不缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /news/live </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://news_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 禁用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_no_cache </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_bypass </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加实时头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Cache-Control </span><span class="__shiki_mdbnqw">&quot;no-store, no-cache, must-revalidate&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Content-Type </span><span class="__shiki_mdbnqw">&quot;text/event-stream&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十一部分-缓存测试与验证" tabindex="-1">第十一部分：缓存测试与验证 <a class="header-anchor" href="#第十一部分-缓存测试与验证" aria-label="Permalink to &quot;第十一部分：缓存测试与验证&quot;">​</a></h2><h3 id="_11-1-缓存测试工具" tabindex="-1">11.1 缓存测试工具 <a class="header-anchor" href="#_11-1-缓存测试工具" aria-label="Permalink to &quot;11.1 缓存测试工具&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 缓存测试端点</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /cache-test </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 返回缓存相关信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Content-Type </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_mdbnqw"> &#39;{</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;cache_key&quot;: &quot;$</span><span class="__shiki_140thh">proxy_cache_key</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;cache_status&quot;: &quot;$</span><span class="__shiki_140thh">upstream_cache_status</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;cache_zone&quot;: &quot;$</span><span class="__shiki_140thh">proxy_cache_zone</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;request_uri&quot;: &quot;$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;request_method&quot;: &quot;$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;scheme&quot;: &quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;host&quot;: &quot;$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存命中率测试</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /benchmark/cache </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> http </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.http&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> httpc </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_dzsirb">new</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> hits </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> total </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, total </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">            local</span><span class="__shiki_140thh"> res, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> httpc</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">request_uri</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;http://127.0.0.1/test-page&quot;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">                method </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;GET&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            })</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> res and res.headers[</span><span class="__shiki_mdbnqw">&quot;X-Cache-Status&quot;</span><span class="__shiki_140thh">] == </span><span class="__shiki_mdbnqw">&quot;HIT&quot;</span><span class="__shiki_140thh"> then</span></span>
<span class="line"><span class="__shiki_1itgoe">                hits</span><span class="__shiki_140thh"> = hits + 1</span></span>
<span class="line"><span class="__shiki_1itgoe">            end</span></span>
<span class="line"><span class="__shiki_1itgoe">        end</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> hit_rate = (hits / total) * 100</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.say(string.format(&quot;</span><span class="__shiki_1itgoe">Cache</span><span class="__shiki_140thh"> hit rate: %.2f%% (%d/%d)</span><span class="__shiki_mdbnqw">&quot;, hit_rate, hits, total))</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">}</span></span></code></pre></div><h3 id="_11-2-缓存验证方法" tabindex="-1">11.2 缓存验证方法 <a class="header-anchor" href="#_11-2-缓存验证方法" aria-label="Permalink to &quot;11.2 缓存验证方法&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用curl验证缓存</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 首次请求（应该MISS）</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> http://example.com/page</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 再次请求（应该HIT）</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_mdbnqw"> http://example.com/page</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 带条件请求</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_dzsirb"> -H</span><span class="__shiki_mdbnqw"> &quot;If-None-Match: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">etag_value</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> http://example.com/page</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 强制绕过缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -I</span><span class="__shiki_dzsirb"> -H</span><span class="__shiki_mdbnqw"> &quot;Cache-Control: no-cache&quot;</span><span class="__shiki_mdbnqw"> http://example.com/page</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 验证缓存头</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_dzsirb"> -D</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> http://example.com/page</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> cache</span></span></code></pre></div><h2 id="第十二部分-最佳实践总结" tabindex="-1">第十二部分：最佳实践总结 <a class="header-anchor" href="#第十二部分-最佳实践总结" aria-label="Permalink to &quot;第十二部分：最佳实践总结&quot;">​</a></h2><h3 id="_12-1-缓存策略选择矩阵" tabindex="-1">12.1 缓存策略选择矩阵 <a class="header-anchor" href="#_12-1-缓存策略选择矩阵" aria-label="Permalink to &quot;12.1 缓存策略选择矩阵&quot;">​</a></h3><table tabindex="0"><thead><tr><th>内容类型</th><th>缓存位置</th><th>缓存时间</th><th>缓存键设计</th><th>注意事项</th></tr></thead><tbody><tr><td>静态资源</td><td>浏览器/CDN</td><td>1年</td><td>内容哈希</td><td>使用immutable标记</td></tr><tr><td>产品目录</td><td>代理缓存</td><td>30分钟</td><td>产品ID+语言</td><td>价格更新时清除</td></tr><tr><td>用户数据</td><td>代理缓存</td><td>2分钟</td><td>用户ID+角色</td><td>个性化内容隔离</td></tr><tr><td>新闻文章</td><td>多级缓存</td><td>热点5分钟，历史7天</td><td>文章ID+发布时间</td><td>支持条件请求</td></tr><tr><td>API响应</td><td>代理缓存</td><td>1-5分钟</td><td>API路径+参数</td><td>敏感数据不缓存</td></tr><tr><td>购物车</td><td>短期缓存</td><td>1分钟</td><td>会话ID</td><td>写操作不缓存</td></tr></tbody></table><h3 id="_12-2-性能优化检查清单" tabindex="-1">12.2 性能优化检查清单 <a class="header-anchor" href="#_12-2-性能优化检查清单" aria-label="Permalink to &quot;12.2 性能优化检查清单&quot;">​</a></h3><ol><li><p><strong>缓存命中率监控</strong></p><ul><li>[ ] 监控总体缓存命中率</li><li>[ ] 按内容类型统计命中率</li><li>[ ] 设置命中率告警阈值（如&lt;80%）</li></ul></li><li><p><strong>缓存存储优化</strong></p><ul><li>[ ] 合理设置缓存分区大小</li><li>[ ] 使用SSD存储热点缓存</li><li>[ ] 配置适当的inactive时间</li></ul></li><li><p><strong>缓存策略优化</strong></p><ul><li>[ ] 根据业务特点设置缓存时间</li><li>[ ] 实现智能缓存失效</li><li>[ ] 配置缓存预热机制</li></ul></li><li><p><strong>安全与合规</strong></p><ul><li>[ ] 敏感数据不缓存</li><li>[ ] 用户数据隔离存储</li><li>[ ] 符合GDPR等法规要求</li></ul></li></ol><h3 id="_12-3-常见问题解决方案" tabindex="-1">12.3 常见问题解决方案 <a class="header-anchor" href="#_12-3-常见问题解决方案" aria-label="Permalink to &quot;12.3 常见问题解决方案&quot;">​</a></h3><p><strong>问题1：缓存雪崩</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：缓存锁定 + 随机过期时间</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_lock_age </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 添加随机过期时间</span></span>
<span class="line"><span class="__shiki_1itgoe">set_random</span><span class="__shiki_140thh"> $rand_expire </span><span class="__shiki_dzsirb">300</span><span class="__shiki_dzsirb"> 600</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 300-600秒随机</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh"> $rand_expire;</span></span></code></pre></div><p><strong>问题2：缓存穿透</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：空结果缓存 + 布隆过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 缓存404结果</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_valid </span><span class="__shiki_dzsirb">403</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 缓存403结果</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用Lua实现布隆过滤器</span></span>
<span class="line"><span class="__shiki_1itgoe">content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> bloom </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;resty.bloom&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    -- 检查是否在过滤器中</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>问题3：缓存污染</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：请求验证 + 缓存清理</span></span>
<span class="line"><span class="__shiki_21nrsd"># 验证请求合法性</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> ($request_uri </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;\\.\\./&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 400</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定期清理旧缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">... purge_threshold=0.1;  </span><span class="__shiki_21nrsd"># 达到90%时自动清理</span></span></code></pre></div><h3 id="_12-4-未来发展趋势" tabindex="-1">12.4 未来发展趋势 <a class="header-anchor" href="#_12-4-未来发展趋势" aria-label="Permalink to &quot;12.4 未来发展趋势&quot;">​</a></h3><ol><li><p><strong>AI驱动的智能缓存</strong></p><ul><li>基于机器学习预测缓存需求</li><li>动态调整缓存策略</li><li>智能缓存预热</li></ul></li><li><p><strong>边缘计算集成</strong></p><ul><li>与CDN深度集成</li><li>边缘节点智能缓存</li><li>分布式缓存同步</li></ul></li><li><p><strong>实时缓存分析</strong></p><ul><li>实时缓存监控</li><li>自动化调优建议</li><li>预测性维护</li></ul></li><li><p><strong>Serverless缓存</strong></p><ul><li>无服务器缓存服务</li><li>按需缓存资源分配</li><li>自动扩缩容</li></ul></li></ol><hr><p><strong>关键要点总结</strong>：</p><ol><li><strong>分层缓存</strong>：建立多级缓存体系（浏览器、CDN、代理、应用）</li><li><strong>智能失效</strong>：基于事件和时间的智能缓存失效策略</li><li><strong>安全隔离</strong>：确保用户数据的安全性和隔离性</li><li><strong>性能监控</strong>：建立全面的缓存监控和告警体系</li><li><strong>持续优化</strong>：基于业务变化和数据反馈持续优化缓存策略</li></ol><p>Nginx缓存加速机制是实现高性能Web应用的关键。通过合理的缓存策略配置，可以显著提升系统性能、降低后端负载、改善用户体验。在实际应用中，需要根据具体业务特点、流量模式和性能要求，设计并实施最适合的缓存方案。</p>`,82)])])}const r=a(p,[["render",h]]);export{d as __pageData,r as default};
