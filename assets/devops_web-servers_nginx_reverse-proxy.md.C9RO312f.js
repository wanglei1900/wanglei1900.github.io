import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Nginx反向代理完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/nginx/reverse-proxy.md","filePath":"devops/web-servers/nginx/reverse-proxy.md"}'),_={name:"devops/web-servers/nginx/reverse-proxy.md"};function l(h,s,e,c,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="nginx反向代理完全指南" tabindex="-1">Nginx反向代理完全指南 <a class="header-anchor" href="#nginx反向代理完全指南" aria-label="Permalink to &quot;Nginx反向代理完全指南&quot;">​</a></h1><h2 id="第一部分-反向代理基础概念" tabindex="-1">第一部分：反向代理基础概念 <a class="header-anchor" href="#第一部分-反向代理基础概念" aria-label="Permalink to &quot;第一部分：反向代理基础概念&quot;">​</a></h2><h3 id="_1-1-什么是反向代理" tabindex="-1">1.1 什么是反向代理 <a class="header-anchor" href="#_1-1-什么是反向代理" aria-label="Permalink to &quot;1.1 什么是反向代理&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">正向代理：客户端 → 代理服务器 → 互联网</span></span>
<span class="line"><span class="__shiki_wvjl67">反向代理：客户端 → 反向代理服务器 → 后端服务器集群</span></span></code></pre></div><h3 id="_1-2-反向代理的核心功能" tabindex="-1">1.2 反向代理的核心功能 <a class="header-anchor" href="#_1-2-反向代理的核心功能" aria-label="Permalink to &quot;1.2 反向代理的核心功能&quot;">​</a></h3><ol><li><strong>负载均衡</strong>：分发请求到多个后端服务器</li><li><strong>缓存加速</strong>：缓存静态内容和动态结果</li><li><strong>安全防护</strong>：隐藏后端服务器，防止直接攻击</li><li><strong>SSL终端</strong>：集中处理HTTPS加密解密</li><li><strong>内容压缩</strong>：统一压缩响应内容</li><li><strong>访问控制</strong>：实现统一的认证和授权</li></ol><h3 id="_1-3-nginx反向代理工作流程" tabindex="-1">1.3 Nginx反向代理工作流程 <a class="header-anchor" href="#_1-3-nginx反向代理工作流程" aria-label="Permalink to &quot;1.3 Nginx反向代理工作流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 客户端发起请求</span></span>
<span class="line"><span class="__shiki_wvjl67">2. Nginx接收请求</span></span>
<span class="line"><span class="__shiki_wvjl67">3. 匹配location规则</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 转发到上游服务器</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 接收后端响应</span></span>
<span class="line"><span class="__shiki_wvjl67">6. 处理响应内容</span></span>
<span class="line"><span class="__shiki_wvjl67">7. 返回给客户端</span></span></code></pre></div><h2 id="第二部分-基础反向代理配置" tabindex="-1">第二部分：基础反向代理配置 <a class="header-anchor" href="#第二部分-基础反向代理配置" aria-label="Permalink to &quot;第二部分：基础反向代理配置&quot;">​</a></h2><h3 id="_2-1-最简单的反向代理" tabindex="-1">2.1 最简单的反向代理 <a class="header-anchor" href="#_2-1-最简单的反向代理" aria-label="Permalink to &quot;2.1 最简单的反向代理&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础反向代理配置</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 代理到后端服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://localhost:8080;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基础代理头设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-多个后端服务的代理" tabindex="-1">2.2 多个后端服务的代理 <a class="header-anchor" href="#_2-2-多个后端服务的代理" aria-label="Permalink to &quot;2.2 多个后端服务的代理&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定义多个上游服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend_servers </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com:8080;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">api.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend_servers;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 详细代理头设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Port $server_port;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第三部分-代理头详解与最佳实践" tabindex="-1">第三部分：代理头详解与最佳实践 <a class="header-anchor" href="#第三部分-代理头详解与最佳实践" aria-label="Permalink to &quot;第三部分：代理头详解与最佳实践&quot;">​</a></h2><h3 id="_3-1-完整的代理头配置" tabindex="-1">3.1 完整的代理头配置 <a class="header-anchor" href="#_3-1-完整的代理头配置" aria-label="Permalink to &quot;3.1 完整的代理头配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 标准代理头</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Port $server_port;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义业务头</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Request-ID $request_id;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Session-ID $cookie_sessionid;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-User-ID $http_x_user_id;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 清理客户端传递的某些头</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Accept-Encoding </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Range </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 传递原始用户代理</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">User-Agent $http_user_agent;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 传递原始Referer</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Referer $http_referer;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-代理头的作用解析" tabindex="-1">3.2 代理头的作用解析 <a class="header-anchor" href="#_3-2-代理头的作用解析" aria-label="Permalink to &quot;3.2 代理头的作用解析&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># X-Forwarded-For 头的工作原理</span></span>
<span class="line"><span class="__shiki_21nrsd"># 客户端IP: 192.168.1.100</span></span>
<span class="line"><span class="__shiki_21nrsd"># 代理链: Client → Proxy1 → Proxy2 → Backend</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Proxy1设置:</span></span>
<span class="line"><span class="__shiki_140thh">X-Forwarded-For: 192.168.1.</span><span class="__shiki_1itgoe">100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Proxy2设置:</span></span>
<span class="line"><span class="__shiki_140thh">X-Forwarded-For: 192.168.1.100, 10.0.0.</span><span class="__shiki_1itgoe">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 最终Backend收到:</span></span>
<span class="line"><span class="__shiki_140thh">X-Forwarded-For: 192.168.1.100, 10.0.0.1, 10.0.0.</span><span class="__shiki_1itgoe">2</span></span></code></pre></div><h3 id="_3-3-真实ip获取方案" tabindex="-1">3.3 真实IP获取方案 <a class="header-anchor" href="#_3-3-真实ip获取方案" aria-label="Permalink to &quot;3.3 真实IP获取方案&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方案1：使用X-Real-IP（单层代理）</span></span>
<span class="line"><span class="__shiki_1itgoe">set_real_ip_from </span><span class="__shiki_140thh">10.0.0.0/8;</span></span>
<span class="line"><span class="__shiki_1itgoe">real_ip_header </span><span class="__shiki_140thh">X-Real-IP;</span></span>
<span class="line"><span class="__shiki_1itgoe">real_ip_recursive </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方案2：使用X-Forwarded-For（多层代理）</span></span>
<span class="line"><span class="__shiki_1itgoe">set_real_ip_from </span><span class="__shiki_140thh">10.0.0.0/8;</span></span>
<span class="line"><span class="__shiki_1itgoe">set_real_ip_from </span><span class="__shiki_140thh">192.168.0.0/16;</span></span>
<span class="line"><span class="__shiki_1itgoe">real_ip_header </span><span class="__shiki_140thh">X-Forwarded-For;</span></span>
<span class="line"><span class="__shiki_1itgoe">real_ip_recursive </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方案3：Cloudflare等CDN场景</span></span>
<span class="line"><span class="__shiki_1itgoe">include </span><span class="__shiki_140thh">/etc/nginx/conf.d/cloudflare.conf;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># cloudflare.conf内容:</span></span>
<span class="line"><span class="__shiki_1itgoe">real_ip_header </span><span class="__shiki_140thh">CF-Connecting-IP;</span></span>
<span class="line"><span class="__shiki_1itgoe">set_real_ip_from </span><span class="__shiki_140thh">103.21.244.0/22;</span></span>
<span class="line"><span class="__shiki_1itgoe">set_real_ip_from </span><span class="__shiki_140thh">103.22.200.0/22;</span></span>
<span class="line"><span class="__shiki_21nrsd"># ...更多Cloudflare IP段</span></span></code></pre></div><h2 id="第四部分-超时与连接管理" tabindex="-1">第四部分：超时与连接管理 <a class="header-anchor" href="#第四部分-超时与连接管理" aria-label="Permalink to &quot;第四部分：超时与连接管理&quot;">​</a></h2><h3 id="_4-1-超时配置详解" tabindex="-1">4.1 超时配置详解 <a class="header-anchor" href="#_4-1-超时配置详解" aria-label="Permalink to &quot;4.1 超时配置详解&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_connect_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd"># 连接到后端服务器的超时时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_send_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 发送请求到后端的超时时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_read_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 读取后端响应的超时时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 特殊场景的超时配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_connect_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;     </span><span class="__shiki_21nrsd"># 上传大文件时</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_send_timeout </span><span class="__shiki_dzsirb">300s</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd"># 长连接场景</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_read_timeout </span><span class="__shiki_dzsirb">300s</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd"># 流式响应场景</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 代理请求缓冲</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_request_buffering </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd"># 开启请求缓冲（默认）</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_request_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd"># 关闭请求缓冲（上传大文件）</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-连接池优化" tabindex="-1">4.2 连接池优化 <a class="header-anchor" href="#_4-2-连接池优化" aria-label="Permalink to &quot;4.2 连接池优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接池配置（HTTP/1.1）</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive </span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">;                  </span><span class="__shiki_21nrsd"># 每个worker进程保持的连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_timeout </span><span class="__shiki_dzsirb">60s</span><span class="__shiki_140thh">;         </span><span class="__shiki_21nrsd"># 连接保持时间</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive_requests </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd"># 每个连接的最大请求数</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用HTTP/1.1 keepalive</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接复用优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Keep-Alive $http_keep_alive;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Proxy-Connection </span><span class="__shiki_mdbnqw">&quot;keep-alive&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第五部分-缓冲区与缓存优化" tabindex="-1">第五部分：缓冲区与缓存优化 <a class="header-anchor" href="#第五部分-缓冲区与缓存优化" aria-label="Permalink to &quot;第五部分：缓冲区与缓存优化&quot;">​</a></h2><h3 id="_5-1-缓冲区配置" tabindex="-1">5.1 缓冲区配置 <a class="header-anchor" href="#_5-1-缓冲区配置" aria-label="Permalink to &quot;5.1 缓冲区配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 响应缓冲区配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_buffering </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;                    </span><span class="__shiki_21nrsd"># 开启缓冲（默认）</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_buffer_size </span><span class="__shiki_dzsirb">4k</span><span class="__shiki_140thh">;                  </span><span class="__shiki_21nrsd"># 第一个缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_buffers </span><span class="__shiki_dzsirb">8</span><span class="__shiki_dzsirb"> 4k</span><span class="__shiki_140thh">;                    </span><span class="__shiki_21nrsd"># 缓冲区数量和大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_busy_buffers_size </span><span class="__shiki_dzsirb">8k</span><span class="__shiki_140thh">;            </span><span class="__shiki_21nrsd"># 忙碌时缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_temp_file_write_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 临时文件写入大小</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 大文件缓冲优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;                   </span><span class="__shiki_21nrsd"># 关闭缓冲（大文件下载）</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_max_temp_file_size </span><span class="__shiki_dzsirb">1024m</span><span class="__shiki_140thh">;        </span><span class="__shiki_21nrsd"># 临时文件最大大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_temp_path </span><span class="__shiki_140thh">/var/cache/nginx/proxy_temp;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 请求体缓冲区</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_request_buffering </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_body_buffer_size </span><span class="__shiki_dzsirb">128k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_max_body_size </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-代理缓存配置" tabindex="-1">5.2 代理缓存配置 <a class="header-anchor" href="#_5-2-代理缓存配置" aria-label="Permalink to &quot;5.2 代理缓存配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定义缓存路径和参数</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/proxy_cache</span></span>
<span class="line"><span class="__shiki_140thh">    levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">    keys_zone=proxy_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">    max_size=10g</span></span>
<span class="line"><span class="__shiki_140thh">    inactive=60m</span></span>
<span class="line"><span class="__shiki_140thh">    use_temp_path=off;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存状态变量</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_method</span><span class="__shiki_140thh"> $skip_cache {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    POST    </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    PUT     </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    DELETE  </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    PATCH   </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 启用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache </span><span class="__shiki_140thh">proxy_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">is_args</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">args</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_valid </span><span class="__shiki_140thh">any </span><span class="__shiki_dzsirb">1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存控制</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_bypass </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_no_cache </span><span class="__shiki_140thh">$skip_cache;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_lock </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_lock_age </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_lock_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 陈旧缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout updating</span></span>
<span class="line"><span class="__shiki_140thh">                             http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_cache_background_update </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加缓存头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache-Status $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Cache-Key $upstream_cache_key;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-ssl-tls反向代理" tabindex="-1">第六部分：SSL/TLS反向代理 <a class="header-anchor" href="#第六部分-ssl-tls反向代理" aria-label="Permalink to &quot;第六部分：SSL/TLS反向代理&quot;">​</a></h2><h3 id="_6-1-ssl终端配置" tabindex="-1">6.1 SSL终端配置 <a class="header-anchor" href="#_6-1-ssl终端配置" aria-label="Permalink to &quot;6.1 SSL终端配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># HTTPS入口，HTTP后端</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">secure.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL证书配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/example.com.crt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate_key </span><span class="__shiki_140thh">/etc/nginx/ssl/example.com.key;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;  </span><span class="__shiki_21nrsd"># HTTP后端</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 传递原始协议信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto https;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Ssl </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-ssl双向代理" tabindex="-1">6.2 SSL双向代理 <a class="header-anchor" href="#_6-2-ssl双向代理" aria-label="Permalink to &quot;6.2 SSL双向代理&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># HTTPS到HTTPS代理</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">proxy.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 客户端SSL配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/client-facing.crt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate_key </span><span class="__shiki_140thh">/etc/nginx/ssl/client-facing.key;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">https://secure-backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 后端SSL配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/proxy-client.crt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_certificate_key </span><span class="__shiki_140thh">/etc/nginx/ssl/proxy-client.key;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_trusted_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/ca.crt;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # SSL验证</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_verify </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_verify_depth </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_session_reuse </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # SSL协议和加密套件</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_protocols </span><span class="__shiki_140thh">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_ciphers </span><span class="__shiki_140thh">HIGH:!aNULL:!MD5;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_ssl_server_name </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-websocket反向代理" tabindex="-1">第七部分：WebSocket反向代理 <a class="header-anchor" href="#第七部分-websocket反向代理" aria-label="Permalink to &quot;第七部分：WebSocket反向代理&quot;">​</a></h2><h3 id="_7-1-websocket基础配置" tabindex="-1">7.1 WebSocket基础配置 <a class="header-anchor" href="#_7-1-websocket基础配置" aria-label="Permalink to &quot;7.1 WebSocket基础配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /ws/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://websocket_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # WebSocket升级头</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Upgrade $http_upgrade;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&quot;upgrade&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 保持连接活跃</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_read_timeout </span><span class="__shiki_dzsirb">86400s</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 24小时</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_send_timeout </span><span class="__shiki_dzsirb">86400s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用缓冲</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_request_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # WebSocket特定头</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Sec-WebSocket-Key $http_sec_websocket_key;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Sec-WebSocket-Version $http_sec_websocket_version;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">Sec-WebSocket-Protocol $http_sec_websocket_protocol;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-websocket负载均衡" tabindex="-1">7.2 WebSocket负载均衡 <a class="header-anchor" href="#_7-2-websocket负载均衡" aria-label="Permalink to &quot;7.2 WebSocket负载均衡&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> websocket_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用IP哈希保持WebSocket连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    ip_hash</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> ws1.example.com:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> ws2.example.com:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> ws3.example.com:8080;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接保持</span></span>
<span class="line"><span class="__shiki_1itgoe">    keepalive </span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_upgrade</span><span class="__shiki_140thh"> $connection_upgrade {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh"> upgrade;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;&#39;</span><span class="__shiki_140thh"> close;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /ws/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://websocket_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Upgrade $http_upgrade;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">Connection $connection_upgrade;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 心跳检测</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_socket_keepalive </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第八部分-高级代理功能" tabindex="-1">第八部分：高级代理功能 <a class="header-anchor" href="#第八部分-高级代理功能" aria-label="Permalink to &quot;第八部分：高级代理功能&quot;">​</a></h2><h3 id="_8-1-重写与重定向" tabindex="-1">8.1 重写与重定向 <a class="header-anchor" href="#_8-1-重写与重定向" aria-label="Permalink to &quot;8.1 重写与重定向&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # URL重写</span></span>
<span class="line"><span class="__shiki_1itgoe">    rewrite</span><span class="__shiki_21q97f"> ^/api/(.*) /$</span><span class="__shiki_140thh">1 </span><span class="__shiki_1itgoe">break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 响应重写</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_redirect </span><span class="__shiki_140thh">http://backend/ https://$host/api/;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_redirect </span><span class="__shiki_dzsirb">default</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 修改响应内容（需要sub_filter模块）</span></span>
<span class="line"><span class="__shiki_1itgoe">    sub_filter </span><span class="__shiki_mdbnqw">&#39;http://backend&#39;</span><span class="__shiki_mdbnqw"> &#39;https://$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    sub_filter_once </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    sub_filter_types </span><span class="__shiki_140thh">text/html application/json;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-条件代理" tabindex="-1">8.2 条件代理 <a class="header-anchor" href="#_8-2-条件代理" aria-label="Permalink to &quot;8.2 条件代理&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于请求方法的路由</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_method</span><span class="__shiki_140thh"> $backend_name {</span></span>
<span class="line"><span class="__shiki_140thh">    GET    read_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    POST   write_backend;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh"> default_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于内容的代理</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_content_type</span><span class="__shiki_140thh"> $content_backend {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^multipart/form-data  upload_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^application/json     api_backend;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">               static_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态选择后端</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$selected_backend $backend_name;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 条件判断</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($http_user_agent </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;(Mobile|Android|iPhone)&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$selected_backend mobile_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($args </span><span class="__shiki_1itgoe">~* </span><span class="__shiki_mdbnqw">&quot;preview=true&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$selected_backend preview_backend;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://$selected_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-3-镜像流量" tabindex="-1">8.3 镜像流量 <a class="header-anchor" href="#_8-3-镜像流量" aria-label="Permalink to &quot;8.3 镜像流量&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 流量镜像（复制请求到多个后端）</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 主后端</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://primary_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 镜像到其他后端（不影响主响应）</span></span>
<span class="line"><span class="__shiki_1itgoe">    mirror </span><span class="__shiki_140thh">/mirror;</span></span>
<span class="line"><span class="__shiki_1itgoe">    mirror_request_body </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /mirror </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://mirror_backend$request_uri;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass_request_body </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_set_header </span><span class="__shiki_140thh">X-Mirrored </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第九部分-安全防护配置" tabindex="-1">第九部分：安全防护配置 <a class="header-anchor" href="#第九部分-安全防护配置" aria-label="Permalink to &quot;第九部分：安全防护配置&quot;">​</a></h2><h3 id="_9-1-访问控制" tabindex="-1">9.1 访问控制 <a class="header-anchor" href="#_9-1-访问控制" aria-label="Permalink to &quot;9.1 访问控制&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /admin/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # IP白名单</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_140thh">10.0.0.0/8;</span></span>
<span class="line"><span class="__shiki_1itgoe">    deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基础认证</span></span>
<span class="line"><span class="__shiki_1itgoe">    auth_basic </span><span class="__shiki_mdbnqw">&quot;Restricted Area&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    auth_basic_user_file </span><span class="__shiki_140thh">/etc/nginx/.htpasswd;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制请求方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ($request_method </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_21q97f">^(GET|POST)$</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 405</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://admin_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 速率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=api_limit:10m rate=10r/s;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req </span><span class="__shiki_140thh">zone=api_limit burst=20 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://api_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-请求验证" tabindex="-1">9.2 请求验证 <a class="header-anchor" href="#_9-2-请求验证" aria-label="Permalink to &quot;9.2 请求验证&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /upload/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 验证文件类型</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ($content_type </span><span class="__shiki_1itgoe">!~ </span><span class="__shiki_mdbnqw">&quot;^multipart/form-data&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 415</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 验证文件大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    client_max_body_size </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 验证Referer</span></span>
<span class="line"><span class="__shiki_1itgoe">    valid_referers </span><span class="__shiki_140thh">none blocked server_names</span></span>
<span class="line"><span class="__shiki_140thh">                  *.example.com </span><span class="__shiki_1itgoe">~\\.google\\. ~</span><span class="__shiki_140thh">\\.baidu\\.;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ($invalid_referer) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 403</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://upload_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-3-响应安全" tabindex="-1">9.3 响应安全 <a class="header-anchor" href="#_9-3-响应安全" aria-label="Permalink to &quot;9.3 响应安全&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 隐藏后端服务器信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_hide_header </span><span class="__shiki_140thh">X-Powered-By;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_hide_header </span><span class="__shiki_140thh">Server;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_hide_header </span><span class="__shiki_140thh">X-AspNet-Version;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 添加安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;SAMEORIGIN&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-XSS-Protection </span><span class="__shiki_mdbnqw">&quot;1; mode=block&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 内容安全策略</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Content-Security-Policy </span><span class="__shiki_mdbnqw">&quot;default-src &#39;self&#39;; script-src &#39;self&#39; &#39;unsafe-inline&#39; &#39;unsafe-eval&#39;;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 防止点击劫持</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;DENY&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十部分-错误处理与故障转移" tabindex="-1">第十部分：错误处理与故障转移 <a class="header-anchor" href="#第十部分-错误处理与故障转移" aria-label="Permalink to &quot;第十部分：错误处理与故障转移&quot;">​</a></h2><h3 id="_10-1-错误页面定制" tabindex="-1">10.1 错误页面定制 <a class="header-anchor" href="#_10-1-错误页面定制" aria-label="Permalink to &quot;10.1 错误页面定制&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_intercept_errors </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义错误页面</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_page </span><span class="__shiki_dzsirb">500</span><span class="__shiki_dzsirb"> 502</span><span class="__shiki_dzsirb"> 503</span><span class="__shiki_dzsirb"> 504</span><span class="__shiki_dzsirb"> =200</span><span class="__shiki_140thh"> @fallback;</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_page </span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh"> /404.html;</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_page </span><span class="__shiki_dzsirb">403</span><span class="__shiki_140thh"> /403.html;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> @fallback </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 降级服务</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://fallback_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或返回静态页面</span></span>
<span class="line"><span class="__shiki_21nrsd">    # root /var/www/html;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # try_files /maintenance.html =503;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 维护模式</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">-f </span><span class="__shiki_140thh">/var/www/maintenance.enable) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 503</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">error_page </span><span class="__shiki_dzsirb">503</span><span class="__shiki_140thh"> /maintenance.html;</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /maintenance.html </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">/var/www/html;</span></span>
<span class="line"><span class="__shiki_1itgoe">    internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-故障转移策略" tabindex="-1">10.2 故障转移策略 <a class="header-anchor" href="#_10-2-故障转移策略" aria-label="Permalink to &quot;10.2 故障转移策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> primary_backend </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backup_backend backup;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    health_check </span><span class="__shiki_140thh">interval=5s fails=3 passes=2;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 故障转移</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout invalid_header</span></span>
<span class="line"><span class="__shiki_140thh">                       http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream_tries </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 熔断器模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 临时禁用故障转移</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重试配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_connect_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_send_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_read_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十一部分-性能监控与调试" tabindex="-1">第十一部分：性能监控与调试 <a class="header-anchor" href="#第十一部分-性能监控与调试" aria-label="Permalink to &quot;第十一部分：性能监控与调试&quot;">​</a></h2><h3 id="_11-1-代理指标收集" tabindex="-1">11.1 代理指标收集 <a class="header-anchor" href="#_11-1-代理指标收集" aria-label="Permalink to &quot;11.1 代理指标收集&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">log_format </span><span class="__shiki_140thh">proxy_log </span><span class="__shiki_mdbnqw">&#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;&quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;&quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;upstream_addr=$</span><span class="__shiki_140thh">upstream_addr</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;upstream_status=$</span><span class="__shiki_140thh">upstream_status</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;upstream_response_time=$</span><span class="__shiki_140thh">upstream_response_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;upstream_connect_time=$</span><span class="__shiki_140thh">upstream_connect_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;upstream_header_time=$</span><span class="__shiki_140thh">upstream_header_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;request_time=$</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                     &#39;proxy_cache_status=$</span><span class="__shiki_140thh">upstream_cache_status</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    access_log </span><span class="__shiki_140thh">/var/log/nginx/proxy.log proxy_log;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 调试头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Upstream-Addr $upstream_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Upstream-Response-Time $upstream_response_time;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Upstream-Status $upstream_status;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Request-ID $request_id;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Proxy-Cache $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_11-2-实时监控端点" tabindex="-1">11.2 实时监控端点 <a class="header-anchor" href="#_11-2-实时监控端点" aria-label="Permalink to &quot;11.2 实时监控端点&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 代理状态监控</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /nginx-proxy-status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    stub_status</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 代理特定指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">    deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 上游状态监控</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /upstream-status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Nginx Plus功能</span></span>
<span class="line"><span class="__shiki_1itgoe">    status</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 缓存状态监控</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> /cache-status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 第三方模块或自定义实现</span></span>
<span class="line"><span class="__shiki_1itgoe">    content_by_lua_block</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        local</span><span class="__shiki_140thh"> cache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> require</span><span class="__shiki_mdbnqw"> &quot;ngx.cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ngx.</span><span class="__shiki_dzsirb">say</span><span class="__shiki_140thh">(cache.</span><span class="__shiki_dzsirb">status</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十二部分-完整配置示例" tabindex="-1">第十二部分：完整配置示例 <a class="header-anchor" href="#第十二部分-完整配置示例" aria-label="Permalink to &quot;第十二部分：完整配置示例&quot;">​</a></h2><h3 id="_12-1-企业级api网关" tabindex="-1">12.1 企业级API网关 <a class="header-anchor" href="#_12-1-企业级api网关" aria-label="Permalink to &quot;12.1 企业级API网关&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># api_gateway.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">user </span><span class="__shiki_140thh">nginx;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 上游服务器定义</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> user_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        zone </span><span class="__shiki_140thh">user_service </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> user1.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server user2.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server user3.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> backup;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        keepalive </span><span class="__shiki_dzsirb">32</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> order_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        least_conn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> order1.example.com:8081;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> order2.example.com:8081;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> order3.example.com:8081;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> payment_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        ip_hash</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> payment1.example.com:8082;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> payment2.example.com:8082;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_cache_path </span><span class="__shiki_140thh">/var/cache/nginx/api_cache</span></span>
<span class="line"><span class="__shiki_140thh">        levels=1:2</span></span>
<span class="line"><span class="__shiki_140thh">        keys_zone=api_cache:100m</span></span>
<span class="line"><span class="__shiki_140thh">        max_size=10g</span></span>
<span class="line"><span class="__shiki_140thh">        inactive=60m</span></span>
<span class="line"><span class="__shiki_140thh">        use_temp_path=off;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限流配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=api_limit:10m rate=100r/s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=auth_limit:10m rate=10r/s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 日志格式</span></span>
<span class="line"><span class="__shiki_1itgoe">    log_format </span><span class="__shiki_140thh">api_log </span><span class="__shiki_mdbnqw">&#39;[$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] $</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> &quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;$</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">request_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;&quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">upstream_addr</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;$</span><span class="__shiki_140thh">upstream_status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">upstream_response_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;cache:$</span><span class="__shiki_140thh">upstream_cache_status</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">api.company.com;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # SSL配置</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/api.company.com.crt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_certificate_key </span><span class="__shiki_140thh">/etc/nginx/ssl/api.company.com.key;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_session_cache </span><span class="__shiki_140thh">shared:SSL:50m;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssl_session_timeout </span><span class="__shiki_dzsirb">1d</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 全局安全头</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=31536000; includeSubDomains&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">        add_header </span><span class="__shiki_140thh">X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;DENY&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        access_log </span><span class="__shiki_140thh">/var/log/nginx/api_access.log api_log;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /health </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            access_log </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_mdbnqw"> &quot;OK</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 用户服务API</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> ^/api/v1/users/(.*)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=api_limit burst=200 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://user_service/api/v1/users/$1$is_args$args;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 代理头</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Request-ID $request_id;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存配置</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache </span><span class="__shiki_140thh">api_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_key </span><span class="__shiki_mdbnqw">&quot;$</span><span class="__shiki_140thh">scheme</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_method</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">host</span><span class="__shiki_mdbnqw">$</span><span class="__shiki_140thh">request_uri</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 302</span><span class="__shiki_dzsirb"> 5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">404</span><span class="__shiki_dzsirb"> 1m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_use_stale </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout updating http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 超时配置</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_connect_timeout </span><span class="__shiki_dzsirb">3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_send_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_read_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_intercept_errors </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            error_page </span><span class="__shiki_dzsirb">500</span><span class="__shiki_dzsirb"> 502</span><span class="__shiki_dzsirb"> 503</span><span class="__shiki_dzsirb"> 504</span><span class="__shiki_dzsirb"> =200</span><span class="__shiki_140thh"> @fallback_user;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 订单服务API</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> ^/api/v1/orders/(.*)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=api_limit burst=100 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://order_service/api/v1/orders/$1$is_args$args;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Request-ID $request_id;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 认证验证</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_request </span><span class="__shiki_140thh">/api/auth/validate;</span></span>
<span class="line"><span class="__shiki_1itgoe">            auth_request_set </span><span class="__shiki_140thh">$auth_status $upstream_status;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_connect_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_send_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_read_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 支付服务API</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_21q97f"> ^/api/v1/payments/(.*)$ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            limit_req </span><span class="__shiki_140thh">zone=api_limit burst=50 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://payment_service/api/v1/payments/$1$is_args$args;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Forwarded-Proto $scheme;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Request-ID $request_id;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-User-ID $http_x_user_id;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # SSL客户端证书验证</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_ssl_certificate </span><span class="__shiki_140thh">/etc/nginx/ssl/client.crt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_ssl_certificate_key </span><span class="__shiki_140thh">/etc/nginx/ssl/client.key;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_connect_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_send_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_read_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 认证验证端点（内部）</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_21q97f"> /api/auth/validate </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://auth_service/validate;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass_request_body </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Content-Length </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Original-URI $request_uri;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Original-Method $request_method;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # WebSocket支持</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/ws/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://websocket_service/ws/;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Upgrade $http_upgrade;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&quot;upgrade&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_read_timeout </span><span class="__shiki_dzsirb">86400s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_send_timeout </span><span class="__shiki_dzsirb">86400s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_buffering </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 降级处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> @fallback_user </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://user_service_fallback;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Fallback-Reason $upstream_status;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 默认错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        error_page </span><span class="__shiki_dzsirb">404</span><span class="__shiki_140thh"> /api/404.json;</span></span>
<span class="line"><span class="__shiki_1itgoe">        error_page </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh"> /api/500.json;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/404.json </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 404</span><span class="__shiki_mdbnqw"> &#39;{&quot;error&quot;: &quot;Not Found&quot;, &quot;code&quot;: 404}</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/500.json </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            internal</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_mdbnqw"> &#39;{&quot;error&quot;: &quot;Internal Server Error&quot;, &quot;code&quot;: 500}</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_12-2-微服务反向代理配置" tabindex="-1">12.2 微服务反向代理配置 <a class="header-anchor" href="#_12-2-微服务反向代理配置" aria-label="Permalink to &quot;12.2 微服务反向代理配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 动态服务路由</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">host</span><span class="__shiki_140thh"> $backend {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^user</span><span class="__shiki_1itgoe">\\.      </span><span class="__shiki_140thh">user_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^order</span><span class="__shiki_1itgoe">\\.     </span><span class="__shiki_140thh">order_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^product</span><span class="__shiki_1itgoe">\\.   </span><span class="__shiki_140thh">product_service;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">       gateway_service;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $api_version {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/v2/        v2_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/v1/        v1_backend;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">       default_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务发现集成</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> user_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态DNS解析</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> user-service.company.local resolve;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    resolver </span><span class="__shiki_dzsirb">10.0.0.2</span><span class="__shiki_140thh"> valid=10s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    resolver_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基于Host头的路由</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name ~</span><span class="__shiki_21q97f">^(?&lt;service&gt;.+)\\.api\\.company\\.com$</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    set </span><span class="__shiki_140thh">$target_service $service;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态选择后端</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://$target_service;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 服务网格集成头</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Service-Mesh </span><span class="__shiki_mdbnqw">&quot;nginx&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Service-Name $target_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Trace-ID $request_id;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 分布式追踪</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-B3-TraceId $request_id;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-B3-SpanId $request_id;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-B3-Sampled </span><span class="__shiki_mdbnqw">&quot;1&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 金丝雀发布支持</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$canary </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ($http_x_canary </span><span class="__shiki_1itgoe">= </span><span class="__shiki_mdbnqw">&quot;true&quot;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            set </span><span class="__shiki_140thh">$canary </span><span class="__shiki_mdbnqw">&quot;-canary&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        rewrite</span><span class="__shiki_21q97f"> ^ /v1$</span><span class="__shiki_140thh">canary$request_uri </span><span class="__shiki_1itgoe">break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十三部分-最佳实践总结" tabindex="-1">第十三部分：最佳实践总结 <a class="header-anchor" href="#第十三部分-最佳实践总结" aria-label="Permalink to &quot;第十三部分：最佳实践总结&quot;">​</a></h2><h3 id="_13-1-配置检查清单" tabindex="-1">13.1 配置检查清单 <a class="header-anchor" href="#_13-1-配置检查清单" aria-label="Permalink to &quot;13.1 配置检查清单&quot;">​</a></h3><ol><li><p><strong>安全性检查</strong></p><ul><li>[ ] 隐藏了后端服务器信息</li><li>[ ] 配置了适当的安全头</li><li>[ ] 实现了访问控制</li><li>[ ] 设置了请求验证</li></ul></li><li><p><strong>性能检查</strong></p><ul><li>[ ] 配置了连接池</li><li>[ ] 设置了合理的超时时间</li><li>[ ] 启用了响应缓冲</li><li>[ ] 配置了缓存策略</li></ul></li><li><p><strong>可靠性检查</strong></p><ul><li>[ ] 配置了健康检查</li><li>[ ] 实现了故障转移</li><li>[ ] 设置了重试机制</li><li>[ ] 配置了降级策略</li></ul></li><li><p><strong>可观测性检查</strong></p><ul><li>[ ] 配置了详细日志</li><li>[ ] 添加了监控头</li><li>[ ] 设置了指标收集</li><li>[ ] 实现了跟踪传播</li></ul></li></ol><h3 id="_13-2-常见问题解决" tabindex="-1">13.2 常见问题解决 <a class="header-anchor" href="#_13-2-常见问题解决" aria-label="Permalink to &quot;13.2 常见问题解决&quot;">​</a></h3><p><strong>问题1：502 Bad Gateway</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_connect_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_read_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span></code></pre></div><p><strong>问题2：请求体丢失</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_request_buffering </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">client_body_buffer_size </span><span class="__shiki_dzsirb">128k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">client_max_body_size </span><span class="__shiki_dzsirb">100m</span><span class="__shiki_140thh">;</span></span></code></pre></div><p><strong>问题3：WebSocket连接断开</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_http_version </span><span class="__shiki_dzsirb">1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_set_header </span><span class="__shiki_140thh">Upgrade $http_upgrade;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_set_header </span><span class="__shiki_140thh">Connection </span><span class="__shiki_mdbnqw">&quot;upgrade&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">proxy_read_timeout </span><span class="__shiki_dzsirb">86400s</span><span class="__shiki_140thh">;</span></span></code></pre></div><h3 id="_13-3-性能调优建议" tabindex="-1">13.3 性能调优建议 <a class="header-anchor" href="#_13-3-性能调优建议" aria-label="Permalink to &quot;13.3 性能调优建议&quot;">​</a></h3><ol><li><p><strong>连接管理</strong></p><ul><li>使用连接池减少TCP握手</li><li>配置合适的keepalive参数</li><li>根据业务特点调整超时时间</li></ul></li><li><p><strong>缓存策略</strong></p><ul><li>静态内容使用长期缓存</li><li>动态API使用短期缓存</li><li>配置缓存锁定避免惊群</li></ul></li><li><p><strong>缓冲优化</strong></p><ul><li>小文件使用内存缓冲</li><li>大文件使用磁盘缓冲</li><li>根据响应大小调整缓冲区</li></ul></li><li><p><strong>监控告警</strong></p><ul><li>监控上游响应时间</li><li>设置错误率告警</li><li>跟踪缓存命中率</li></ul></li></ol><hr><p><strong>关键要点总结</strong>：</p><ol><li><strong>安全性优先</strong>：始终验证和清理输入输出</li><li><strong>性能可调</strong>：根据业务需求调整各项参数</li><li><strong>可靠保障</strong>：实现完整的故障转移和降级机制</li><li><strong>可观测性</strong>：确保系统状态透明可见</li><li><strong>持续优化</strong>：基于监控数据不断调优配置</li></ol><p>Nginx反向代理是实现现代Web架构的关键组件，通过合理的配置可以实现高性能、高可用的代理服务。在实际应用中，需要根据具体业务场景、流量模式和性能要求，选择并调优最适合的配置方案。</p>`,85)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
