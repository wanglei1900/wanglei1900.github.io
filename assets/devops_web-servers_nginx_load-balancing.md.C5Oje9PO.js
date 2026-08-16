import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Nginx负载均衡策略完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/nginx/load-balancing.md","filePath":"devops/web-servers/nginx/load-balancing.md"}'),_={name:"devops/web-servers/nginx/load-balancing.md"};function l(h,s,e,c,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="nginx负载均衡策略完全指南" tabindex="-1">Nginx负载均衡策略完全指南 <a class="header-anchor" href="#nginx负载均衡策略完全指南" aria-label="Permalink to &quot;Nginx负载均衡策略完全指南&quot;">​</a></h1><h2 id="第一部分-负载均衡基础理论" tabindex="-1">第一部分：负载均衡基础理论 <a class="header-anchor" href="#第一部分-负载均衡基础理论" aria-label="Permalink to &quot;第一部分：负载均衡基础理论&quot;">​</a></h2><h3 id="_1-1-负载均衡核心概念" tabindex="-1">1.1 负载均衡核心概念 <a class="header-anchor" href="#_1-1-负载均衡核心概念" aria-label="Permalink to &quot;1.1 负载均衡核心概念&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">负载均衡 = 流量分发 + 健康检查 + 故障转移 + 会话保持</span></span></code></pre></div><h3 id="_1-2-nginx负载均衡架构" tabindex="-1">1.2 Nginx负载均衡架构 <a class="header-anchor" href="#_1-2-nginx负载均衡架构" aria-label="Permalink to &quot;1.2 Nginx负载均衡架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">客户端请求 → Nginx（负载均衡器） → 上游服务器池（Upstream）</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 流量分发策略</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 健康检查机制</span></span>
<span class="line"><span class="__shiki_wvjl67">    ├── 故障转移处理</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── 会话保持方案</span></span></code></pre></div><h3 id="_1-3-负载均衡类型" tabindex="-1">1.3 负载均衡类型 <a class="header-anchor" href="#_1-3-负载均衡类型" aria-label="Permalink to &quot;1.3 负载均衡类型&quot;">​</a></h3><ol><li><strong>第4层负载均衡</strong>（传输层 - TCP/UDP）</li><li><strong>第7层负载均衡</strong>（应用层 - HTTP/HTTPS）</li><li><strong>混合负载均衡</strong>（支持多协议）</li></ol><h2 id="第二部分-基础负载均衡策略" tabindex="-1">第二部分：基础负载均衡策略 <a class="header-anchor" href="#第二部分-基础负载均衡策略" aria-label="Permalink to &quot;第二部分：基础负载均衡策略&quot;">​</a></h2><h3 id="_2-1-轮询策略-round-robin" tabindex="-1">2.1 轮询策略（Round Robin） <a class="header-anchor" href="#_2-1-轮询策略-round-robin" aria-label="Permalink to &quot;2.1 轮询策略（Round Robin）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 默认策略，按顺序分配请求</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认就是轮询，weight默认为1</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 可配置权重</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend4.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 权重为3</span></span>
<span class="line"><span class="__shiki_140thh">    server backend5.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 权重为2</span></span>
<span class="line"><span class="__shiki_140thh">    server backend6.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 权重为1</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>算法特点</strong>：</p><ul><li>简单、公平</li><li>不考虑服务器负载、响应时间</li><li>适合服务器性能相近的场景</li></ul><h3 id="_2-2-加权轮询-weighted-round-robin" tabindex="-1">2.2 加权轮询（Weighted Round Robin） <a class="header-anchor" href="#_2-2-加权轮询-weighted-round-robin" aria-label="Permalink to &quot;2.2 加权轮询（Weighted Round Robin）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 权重分配：3:2:1的比例</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.101:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server 192.168.1.102:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server 192.168.1.103:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 高级配置</span></span>
<span class="line"><span class="__shiki_140thh">    server 192.168.1.104:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server 192.168.1.105:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server 192.168.1.106:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh"> backup;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>权重计算示例</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">总权重 = 3 + 2 + 1 = 6</span></span>
<span class="line"><span class="__shiki_wvjl67">服务器1概率 = 3/6 = 50%</span></span>
<span class="line"><span class="__shiki_wvjl67">服务器2概率 = 2/6 = 33.3%</span></span>
<span class="line"><span class="__shiki_wvjl67">服务器3概率 = 1/6 = 16.7%</span></span></code></pre></div><h3 id="_2-3-最少连接-least-connections" tabindex="-1">2.3 最少连接（Least Connections） <a class="header-anchor" href="#_2-3-最少连接-least-connections" aria-label="Permalink to &quot;2.3 最少连接（Least Connections）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_conn</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 最少连接策略</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 带权重的least_conn（Nginx Plus支持）</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或者通过第三方模块实现</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>算法原理</strong>：</p><ul><li>跟踪每个服务器的活动连接数</li><li>将新连接分配给连接数最少的服务器</li><li>适合处理长连接场景</li></ul><h3 id="_2-4-ip哈希-ip-hash" tabindex="-1">2.4 IP哈希（IP Hash） <a class="header-anchor" href="#_2-4-ip哈希-ip-hash" aria-label="Permalink to &quot;2.4 IP哈希（IP Hash）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    ip_hash</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 基于客户端IP的哈希</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # IP哈希的注意事项</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 后端服务器不能标记为down，除非移除</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 权重设置会被忽略</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 适合会话保持场景</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>哈希算法</strong>：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">hash(客户端IP) % 服务器数量 = 服务器索引</span></span></code></pre></div><p><strong>会话保持场景</strong>：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> shopping_cart </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    ip_hash</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> cart1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> cart2.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> cart3.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第三部分-高级负载均衡策略" tabindex="-1">第三部分：高级负载均衡策略 <a class="header-anchor" href="#第三部分-高级负载均衡策略" aria-label="Permalink to &quot;第三部分：高级负载均衡策略&quot;">​</a></h2><h3 id="_3-1-一致性哈希-consistent-hash" tabindex="-1">3.1 一致性哈希（Consistent Hash） <a class="header-anchor" href="#_3-1-一致性哈希-consistent-hash" aria-label="Permalink to &quot;3.1 一致性哈希（Consistent Hash）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 需要第三方模块或Nginx Plus</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基于请求URI的哈希</span></span>
<span class="line"><span class="__shiki_1itgoe">    hash </span><span class="__shiki_140thh">$request_uri consistent;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于特定变量的哈希</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> api_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基于API key的哈希</span></span>
<span class="line"><span class="__shiki_1itgoe">    hash </span><span class="__shiki_140thh">$arg_api_key consistent;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> api1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> api2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于源IP的一致性哈希</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    hash </span><span class="__shiki_140thh">$remote_addr consistent;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.101:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.102:8080;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>一致性哈希优势</strong>：</p><ol><li><strong>减少重新哈希</strong>：服务器增减时，只有少量请求需要重新映射</li><li><strong>缓存友好</strong>：相同请求总是路由到同一服务器</li><li><strong>负载均衡</strong>：均匀分布请求</li></ol><h3 id="_3-2-随机负载均衡" tabindex="-1">3.2 随机负载均衡 <a class="header-anchor" href="#_3-2-随机负载均衡" aria-label="Permalink to &quot;3.2 随机负载均衡&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">    random;  </span><span class="__shiki_21nrsd"># 随机策略</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 带权重的随机（Nginx Plus）</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    random </span><span class="__shiki_140thh">two;  </span><span class="__shiki_21nrsd"># 从两个服务器中随机选择一个</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server backend2.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server backend3.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-最少时间-least-time-nginx-plus专有" tabindex="-1">3.3 最少时间（Least Time）- Nginx Plus专有 <a class="header-anchor" href="#_3-3-最少时间-least-time-nginx-plus专有" aria-label="Permalink to &quot;3.3 最少时间（Least Time）- Nginx Plus专有&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_time </span><span class="__shiki_140thh">header;  </span><span class="__shiki_21nrsd"># 计算到接收完响应头的时间</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 三种计算模式</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_time </span><span class="__shiki_140thh">header;     </span><span class="__shiki_21nrsd"># header - 接收到第一个字节</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_time </span><span class="__shiki_140thh">last_byte;  </span><span class="__shiki_21nrsd"># last_byte - 接收到最后一个字节</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_time </span><span class="__shiki_140thh">last_byte inflight;  </span><span class="__shiki_21nrsd"># 考虑当前请求数</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第四部分-健康检查与故障转移" tabindex="-1">第四部分：健康检查与故障转移 <a class="header-anchor" href="#第四部分-健康检查与故障转移" aria-label="Permalink to &quot;第四部分：健康检查与故障转移&quot;">​</a></h2><h3 id="_4-1-被动健康检查" tabindex="-1">4.1 被动健康检查 <a class="header-anchor" href="#_4-1-被动健康检查" aria-label="Permalink to &quot;4.1 被动健康检查&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查参数</span></span>
<span class="line"><span class="__shiki_21nrsd">    # max_fails: 失败次数阈值</span></span>
<span class="line"><span class="__shiki_21nrsd">    # fail_timeout: 失败后暂停时间</span></span>
<span class="line"><span class="__shiki_21nrsd">    # slow_start: 恢复后的预热时间（Nginx Plus）</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>失败条件</strong>：</p><ol><li>连接超时</li><li>无效响应头</li><li>HTTP 5xx状态码</li><li>服务器拒绝连接</li></ol><h3 id="_4-2-主动健康检查-nginx-plus" tabindex="-1">4.2 主动健康检查（Nginx Plus） <a class="header-anchor" href="#_4-2-主动健康检查-nginx-plus" aria-label="Permalink to &quot;4.2 主动健康检查（Nginx Plus）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    zone </span><span class="__shiki_140thh">backend </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 共享内存区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    health_check </span><span class="__shiki_140thh">interval=5s fails=3 passes=2;</span></span>
<span class="line"><span class="__shiki_1itgoe">    health_check_timeout </span><span class="__shiki_dzsirb">3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    health_check_http_version</span><span class="__shiki_dzsirb"> 1.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义健康检查端点</span></span>
<span class="line"><span class="__shiki_1itgoe">    health_check </span><span class="__shiki_140thh">uri=/health;</span></span>
<span class="line"><span class="__shiki_1itgoe">    health_check </span><span class="__shiki_140thh">match=health_ok;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查匹配条件</span></span>
<span class="line"><span class="__shiki_1itgoe">match </span><span class="__shiki_140thh">health_ok {</span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> Content-Type = text/html;</span></span>
<span class="line"><span class="__shiki_1itgoe">    body</span><span class="__shiki_1itgoe"> ~</span><span class="__shiki_mdbnqw"> &quot;OK&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-第三方健康检查模块" tabindex="-1">4.3 第三方健康检查模块 <a class="header-anchor" href="#_4-3-第三方健康检查模块" aria-label="Permalink to &quot;4.3 第三方健康检查模块&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># nginx_upstream_check_module 示例</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.101:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.102:8080;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # TCP健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    check</span><span class="__shiki_140thh"> interval=3000 rise=2 fall=5 timeout=1000 type=tcp;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # HTTP健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    check</span><span class="__shiki_140thh"> interval=3000 rise=2 fall=5 timeout=1000 type=http;</span></span>
<span class="line"><span class="__shiki_1itgoe">    check_http_send</span><span class="__shiki_mdbnqw"> &quot;GET /health HTTP/1.0\\r</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\\r</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    check_http_expect_alive</span><span class="__shiki_140thh"> http_2xx http_3xx;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-4-故障转移策略" tabindex="-1">4.4 故障转移策略 <a class="header-anchor" href="#_4-4-故障转移策略" aria-label="Permalink to &quot;4.4 故障转移策略&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 主服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> primary.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 备份服务器（主服务器不可用时使用）</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backup1.example.com backup;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backup2.example.com backup;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 服务器状态标记</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> down.example.com down;      </span><span class="__shiki_21nrsd"># 永久下线</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> draining.example.com drain; </span><span class="__shiki_21nrsd"># 排空模式（Nginx Plus）</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第五部分-会话保持-session-persistence" tabindex="-1">第五部分：会话保持（Session Persistence） <a class="header-anchor" href="#第五部分-会话保持-session-persistence" aria-label="Permalink to &quot;第五部分：会话保持（Session Persistence）&quot;">​</a></h2><h3 id="_5-1-基于cookie的会话保持" tabindex="-1">5.1 基于Cookie的会话保持 <a class="header-anchor" href="#_5-1-基于cookie的会话保持" aria-label="Permalink to &quot;5.1 基于Cookie的会话保持&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Nginx Plus的sticky cookie</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    sticky </span><span class="__shiki_140thh">cookie srv_id expires=1h domain=.example.com path=/;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第三方模块的会话保持</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    ip_hash</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 简单会话保持</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-基于路由的会话保持" tabindex="-1">5.2 基于路由的会话保持 <a class="header-anchor" href="#_5-2-基于路由的会话保持" aria-label="Permalink to &quot;5.2 基于路由的会话保持&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用URI路由特定请求到固定服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $backend_pool {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/users  user_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/api/v1/orders order_backend;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">          default_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> user_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> user1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> user2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> order_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> order1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> order2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /api/ </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://$backend_pool;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-应用层会话保持" tabindex="-1">5.3 应用层会话保持 <a class="header-anchor" href="#_5-3-应用层会话保持" aria-label="Permalink to &quot;5.3 应用层会话保持&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于JWT或Session ID的路由</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_authorization</span><span class="__shiki_140thh"> $user_backend {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_mdbnqw">&quot;Bearer (.+)&quot;</span><span class="__shiki_140thh"> $1;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    hash </span><span class="__shiki_140thh">$user_backend consistent;  </span><span class="__shiki_21nrsd"># 基于token哈希</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第六部分-流量控制与限流" tabindex="-1">第六部分：流量控制与限流 <a class="header-anchor" href="#第六部分-流量控制与限流" aria-label="Permalink to &quot;第六部分：流量控制与限流&quot;">​</a></h2><h3 id="_6-1-连接数限制" tabindex="-1">6.1 连接数限制 <a class="header-anchor" href="#_6-1-连接数限制" aria-label="Permalink to &quot;6.1 连接数限制&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 限制每个服务器的最大连接数</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    zone </span><span class="__shiki_140thh">backend </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com max_conns=100;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com max_conns=100;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend3.example.com max_conns=100;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 队列配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    queue </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> timeout=30s;  </span><span class="__shiki_21nrsd"># 排队连接数和超时</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-请求速率限制" tabindex="-1">6.2 请求速率限制 <a class="header-anchor" href="#_6-2-请求速率限制" aria-label="Permalink to &quot;6.2 请求速率限制&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 限制到上游服务器的请求速率</span></span>
<span class="line"><span class="__shiki_1itgoe">limit_req_zone </span><span class="__shiki_140thh">$server_name zone=backend:10m rate=100r/s;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限流配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req </span><span class="__shiki_140thh">zone=backend burst=200 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-慢启动配置-nginx-plus" tabindex="-1">6.3 慢启动配置（Nginx Plus） <a class="header-anchor" href="#_6-3-慢启动配置-nginx-plus" aria-label="Permalink to &quot;6.3 慢启动配置（Nginx Plus）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com </span><span class="__shiki_1jdh33">slow_start</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server backend2.example.com </span><span class="__shiki_1jdh33">slow_start</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 新服务器加入集群时逐渐增加流量</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 避免冷启动问题</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第七部分-四层负载均衡-tcp-udp" tabindex="-1">第七部分：四层负载均衡（TCP/UDP） <a class="header-anchor" href="#第七部分-四层负载均衡-tcp-udp" aria-label="Permalink to &quot;第七部分：四层负载均衡（TCP/UDP）&quot;">​</a></h2><h3 id="_7-1-tcp负载均衡" tabindex="-1">7.1 TCP负载均衡 <a class="header-anchor" href="#_7-1-tcp负载均衡" aria-label="Permalink to &quot;7.1 TCP负载均衡&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># stream模块配置（与http同级）</span></span>
<span class="line"><span class="__shiki_1itgoe">stream</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> tcp_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        zone </span><span class="__shiki_140thh">tcp_backend </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> backend1.example.com:3306 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server backend2.example.com:3306 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server backend3.example.com:3306 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">        health_check interval=10s passes=2 fails=3;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">3306</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">tcp_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_timeout </span><span class="__shiki_dzsirb">3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_connect_timeout </span><span class="__shiki_dzsirb">1s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # TCP优化</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_buffer_size </span><span class="__shiki_dzsirb">16k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        tcp_nodelay </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-udp负载均衡" tabindex="-1">7.2 UDP负载均衡 <a class="header-anchor" href="#_7-2-udp负载均衡" aria-label="Permalink to &quot;7.2 UDP负载均衡&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">stream</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> dns_servers </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        zone </span><span class="__shiki_140thh">dns_servers </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> 192.168.1.101:53;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> 192.168.1.102:53;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # UDP专用参数</span></span>
<span class="line"><span class="__shiki_1itgoe">        udp_timeout</span><span class="__shiki_dzsirb"> 3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">53</span><span class="__shiki_140thh"> udp reuseport;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">dns_servers;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_timeout </span><span class="__shiki_dzsirb">1s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_responses </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第八部分-动态负载均衡" tabindex="-1">第八部分：动态负载均衡 <a class="header-anchor" href="#第八部分-动态负载均衡" aria-label="Permalink to &quot;第八部分：动态负载均衡&quot;">​</a></h2><h3 id="_8-1-nginx-plus-api动态配置" tabindex="-1">8.1 Nginx Plus API动态配置 <a class="header-anchor" href="#_8-1-nginx-plus-api动态配置" aria-label="Permalink to &quot;8.1 Nginx Plus API动态配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用动态配置API</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    zone </span><span class="__shiki_140thh">backend </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.101:8080;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.102:8080;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /upstream_conf </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 允许通过API动态管理upstream</span></span>
<span class="line"><span class="__shiki_1itgoe">        upstream_conf</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>API操作示例</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加服务器</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -X</span><span class="__shiki_mdbnqw"> POST</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> &quot;server=192.168.1.103:8080&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">     http://localhost:8080/upstream_conf?upstream=backend</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 删除服务器</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -X</span><span class="__shiki_mdbnqw"> DELETE</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;http://localhost:8080/upstream_conf?upstream=backend&amp;id=2&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 修改权重</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -X</span><span class="__shiki_mdbnqw"> PATCH</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw"> &quot;weight=5&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">     &quot;http://localhost:8080/upstream_conf?upstream=backend&amp;id=1&quot;</span></span></code></pre></div><h3 id="_8-2-dns动态解析" tabindex="-1">8.2 DNS动态解析 <a class="header-anchor" href="#_8-2-dns动态解析" aria-label="Permalink to &quot;8.2 DNS动态解析&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    zone </span><span class="__shiki_140thh">backend </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用域名，定期解析</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> api.example.com:8080 resolve;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 解析参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    resolver </span><span class="__shiki_dzsirb">8.8.8.8</span><span class="__shiki_140thh"> valid=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">    resolver_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第九部分-高级路由策略" tabindex="-1">第九部分：高级路由策略 <a class="header-anchor" href="#第九部分-高级路由策略" aria-label="Permalink to &quot;第九部分：高级路由策略&quot;">​</a></h2><h3 id="_9-1-基于地理位置的负载均衡" tabindex="-1">9.1 基于地理位置的负载均衡 <a class="header-anchor" href="#_9-1-基于地理位置的负载均衡" aria-label="Permalink to &quot;9.1 基于地理位置的负载均衡&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用GeoIP模块</span></span>
<span class="line"><span class="__shiki_1itgoe">geo </span><span class="__shiki_140thh">$client_geo {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh"> default_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    192.168.1.0/</span><span class="__shiki_1itgoe">24</span><span class="__shiki_140thh"> lan_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">geo </span><span class="__shiki_140thh">$client_country {</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh"> us_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    CN</span><span class="__shiki_140thh"> cn_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    EU</span><span class="__shiki_140thh"> eu_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> us_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> us1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> us2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> cn_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> cn1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> cn2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://$client_country;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-基于内容的负载均衡" tabindex="-1">9.2 基于内容的负载均衡 <a class="header-anchor" href="#_9-2-基于内容的负载均衡" aria-label="Permalink to &quot;9.2 基于内容的负载均衡&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 根据请求内容路由</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_method</span><span class="__shiki_140thh"> $backend_pool {</span></span>
<span class="line"><span class="__shiki_140thh">    GET    read_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    POST   write_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    PUT    write_backend;</span></span>
<span class="line"><span class="__shiki_140thh">    DELETE write_backend;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh"> default_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">http_content_type</span><span class="__shiki_140thh"> $content_backend {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^application/json  json_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^text/xml         xml_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^multipart/form-data upload_backend;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">            default_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-3-金丝雀发布-canary-release" tabindex="-1">9.3 金丝雀发布（Canary Release） <a class="header-anchor" href="#_9-3-金丝雀发布-canary-release" aria-label="Permalink to &quot;9.3 金丝雀发布（Canary Release）&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于权重的金丝雀发布</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> stable.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">90</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd"># 90%流量到稳定版</span></span>
<span class="line"><span class="__shiki_140thh">    server canary.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">;   </span><span class="__shiki_21nrsd"># 10%流量到金丝雀版</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于Header的金丝雀发布</span></span>
<span class="line"><span class="__shiki_140thh">map $http_canary $backend {</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;true&quot;</span><span class="__shiki_140thh"> canary_backend;</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh"> stable_backend;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> canary_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> canary.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> stable_backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> stable.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十部分-监控与调优" tabindex="-1">第十部分：监控与调优 <a class="header-anchor" href="#第十部分-监控与调优" aria-label="Permalink to &quot;第十部分：监控与调优&quot;">​</a></h2><h3 id="_10-1-监控指标收集" tabindex="-1">10.1 监控指标收集 <a class="header-anchor" href="#_10-1-监控指标收集" aria-label="Permalink to &quot;10.1 监控指标收集&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 状态监控配置</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    zone </span><span class="__shiki_140thh">backend </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Nginx Plus状态API</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /upstreams </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        status</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> /status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        stub_status</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-性能指标监控" tabindex="-1">10.2 性能指标监控 <a class="header-anchor" href="#_10-2-性能指标监控" aria-label="Permalink to &quot;10.2 性能指标监控&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 日志记录负载均衡相关指标</span></span>
<span class="line"><span class="__shiki_1itgoe">log_format </span><span class="__shiki_140thh">loadbalance </span><span class="__shiki_mdbnqw">&#39;$</span><span class="__shiki_140thh">remote_addr</span><span class="__shiki_mdbnqw"> - $</span><span class="__shiki_140thh">remote_user</span><span class="__shiki_mdbnqw"> [$</span><span class="__shiki_140thh">time_local</span><span class="__shiki_mdbnqw">] &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;&quot;$</span><span class="__shiki_140thh">request</span><span class="__shiki_mdbnqw">&quot; $</span><span class="__shiki_140thh">status</span><span class="__shiki_mdbnqw"> $</span><span class="__shiki_140thh">body_bytes_sent</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;&quot;$</span><span class="__shiki_140thh">http_referer</span><span class="__shiki_mdbnqw">&quot; &quot;$</span><span class="__shiki_140thh">http_user_agent</span><span class="__shiki_mdbnqw">&quot; &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;upstream_addr=$</span><span class="__shiki_140thh">upstream_addr</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;upstream_status=$</span><span class="__shiki_140thh">upstream_status</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;upstream_response_time=$</span><span class="__shiki_140thh">upstream_response_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;upstream_connect_time=$</span><span class="__shiki_140thh">upstream_connect_time</span><span class="__shiki_mdbnqw"> &#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                      &#39;upstream_header_time=$</span><span class="__shiki_140thh">upstream_header_time</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    access_log </span><span class="__shiki_140thh">/var/log/nginx/loadbalance.log loadbalance;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-3-常见问题排查" tabindex="-1">10.3 常见问题排查 <a class="header-anchor" href="#_10-3-常见问题排查" aria-label="Permalink to &quot;10.3 常见问题排查&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 调试配置</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 添加调试信息到响应头</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 在响应头中添加负载均衡信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Upstream-Addr $upstream_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Upstream-Response-Time $upstream_response_time;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Upstream-Status $upstream_status;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_pass </span><span class="__shiki_140thh">http://backend;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout invalid_header http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream_tries </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 降级处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    error_page </span><span class="__shiki_dzsirb">500</span><span class="__shiki_dzsirb"> 502</span><span class="__shiki_dzsirb"> 503</span><span class="__shiki_dzsirb"> 504</span><span class="__shiki_dzsirb"> =200</span><span class="__shiki_140thh"> @fallback;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">location</span><span class="__shiki_1t8gfj"> @fallback </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 返回静态维护页面</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">/var/www/html;</span></span>
<span class="line"><span class="__shiki_1itgoe">    try_files </span><span class="__shiki_140thh">/maintenance.html </span><span class="__shiki_dzsirb">=503</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十一部分-完整配置示例" tabindex="-1">第十一部分：完整配置示例 <a class="header-anchor" href="#第十一部分-完整配置示例" aria-label="Permalink to &quot;第十一部分：完整配置示例&quot;">​</a></h2><h3 id="_11-1-电商系统负载均衡配置" tabindex="-1">11.1 电商系统负载均衡配置 <a class="header-anchor" href="#_11-1-电商系统负载均衡配置" aria-label="Permalink to &quot;11.1 电商系统负载均衡配置&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 全局配置</span></span>
<span class="line"><span class="__shiki_1itgoe">user </span><span class="__shiki_140thh">nginx;</span></span>
<span class="line"><span class="__shiki_1itgoe">worker_processes </span><span class="__shiki_140thh">auto;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">events</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    worker_connections </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    use </span><span class="__shiki_dzsirb">epoll</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">http</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 共享内存区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream_zone</span><span class="__shiki_140thh"> backend_zones </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 商品服务 - 一致性哈希（缓存友好）</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> product_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        zone </span><span class="__shiki_140thh">product_service </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        hash </span><span class="__shiki_140thh">$request_uri consistent;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> product1.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server product2.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server product3.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server product4.example.com:8080 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> max_fails=3 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh"> backup;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        health_check </span><span class="__shiki_140thh">interval=5s uri=/health;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 购物车服务 - IP哈希（会话保持）</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> cart_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        zone </span><span class="__shiki_140thh">cart_service </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ip_hash</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> cart1.example.com:8081;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> cart2.example.com:8081;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> cart3.example.com:8081;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 连接限制</span></span>
<span class="line"><span class="__shiki_1itgoe">        max_conns</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        queue </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh"> timeout=30s;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 订单服务 - 最少连接（处理耗时操作）</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> order_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        zone </span><span class="__shiki_140thh">order_service </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        least_conn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> order1.example.com:8082 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> slow_start=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> order2.example.com:8082 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> slow_start=30s;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> order3.example.com:8082 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> slow_start=30s;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 限流</span></span>
<span class="line"><span class="__shiki_1itgoe">        limit_req </span><span class="__shiki_140thh">zone=order_limit burst=100 nodelay;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 支付服务 - 加权轮询（重要服务）</span></span>
<span class="line"><span class="__shiki_1itgoe">    upstream</span><span class="__shiki_1t8gfj"> payment_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">        zone </span><span class="__shiki_140thh">payment_service </span><span class="__shiki_dzsirb">64k</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        server</span><span class="__shiki_140thh"> payment1.example.com:8083 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> max_fails=1 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server payment2.example.com:8083 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> max_fails=1 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        server payment3.example.com:8083 </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> max_fails=1 </span><span class="__shiki_1jdh33">fail_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh"> backup;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 快速失败转移</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream_tries </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限流区域</span></span>
<span class="line"><span class="__shiki_1itgoe">    limit_req_zone </span><span class="__shiki_140thh">$binary_remote_addr zone=order_limit:10m rate=50r/s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        server_name </span><span class="__shiki_140thh">api.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 商品服务路由</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/products </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://product_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 缓存相关</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache </span><span class="__shiki_140thh">product_cache;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_cache_valid </span><span class="__shiki_dzsirb">200</span><span class="__shiki_dzsirb"> 5m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            add_header </span><span class="__shiki_140thh">X-Cache-Status $upstream_cache_status;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 购物车服务路由</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/cart </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://cart_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 超时设置</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_connect_timeout </span><span class="__shiki_dzsirb">2s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_send_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_read_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 订单服务路由</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/orders </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://order_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 长时间操作</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_connect_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_send_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_read_timeout </span><span class="__shiki_dzsirb">30s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 支付服务路由</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /api/payments </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_pass </span><span class="__shiki_140thh">http://payment_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">X-Real-IP $remote_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_set_header </span><span class="__shiki_140thh">Host $host;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 安全设置</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_connect_timeout </span><span class="__shiki_dzsirb">3s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_send_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            proxy_read_timeout </span><span class="__shiki_dzsirb">10s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查端点</span></span>
<span class="line"><span class="__shiki_1itgoe">        location</span><span class="__shiki_1t8gfj"> /nginx_status </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">            stub_status</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_dzsirb">127.0.0.1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">            allow </span><span class="__shiki_140thh">192.168.1.0/24;</span></span>
<span class="line"><span class="__shiki_1itgoe">            deny </span><span class="__shiki_dzsirb">all</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_11-2-微服务网关负载均衡" tabindex="-1">11.2 微服务网关负载均衡 <a class="header-anchor" href="#_11-2-微服务网关负载均衡" aria-label="Permalink to &quot;11.2 微服务网关负载均衡&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 微服务动态路由</span></span>
<span class="line"><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh"> $</span><span class="__shiki_1jdh33">request_uri</span><span class="__shiki_140thh"> $service_name {</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/user-service/(.*)  user_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/order-service/(.*) order_service;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ~</span><span class="__shiki_140thh">^/product-service/(.*) product_service;</span></span>
<span class="line"><span class="__shiki_dzsirb">    default</span><span class="__shiki_140thh">               gateway_service;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务发现集成（Consul模板生成）</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> user_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.101:8001;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.102:8001;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.103:8001;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> order_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_conn</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.104:8002;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.105:8002;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> product_service </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    hash </span><span class="__shiki_140thh">$request_uri consistent;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.106:8003;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> 192.168.1.107:8003;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    location</span><span class="__shiki_1t8gfj"> / </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 动态路由</span></span>
<span class="line"><span class="__shiki_1itgoe">        set </span><span class="__shiki_140thh">$backend_service $service_name;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_pass </span><span class="__shiki_140thh">http://$backend_service;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 跨服务头部传递</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Service-Name $service_name;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_set_header </span><span class="__shiki_140thh">X-Request-ID $request_id;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 熔断设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">        proxy_next_upstream_tries </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="第十二部分-最佳实践与总结" tabindex="-1">第十二部分：最佳实践与总结 <a class="header-anchor" href="#第十二部分-最佳实践与总结" aria-label="Permalink to &quot;第十二部分：最佳实践与总结&quot;">​</a></h2><h3 id="_12-1-策略选择指南" tabindex="-1">12.1 策略选择指南 <a class="header-anchor" href="#_12-1-策略选择指南" aria-label="Permalink to &quot;12.1 策略选择指南&quot;">​</a></h3><table tabindex="0"><thead><tr><th>场景</th><th>推荐策略</th><th>原因</th></tr></thead><tbody><tr><td>静态资源服务</td><td>轮询/加权轮询</td><td>简单高效，无状态</td></tr><tr><td>会话型应用</td><td>IP哈希/一致性哈希</td><td>保持会话一致性</td></tr><tr><td>数据库代理</td><td>最少连接</td><td>避免连接堆积</td></tr><tr><td>API网关</td><td>一致性哈希</td><td>提高缓存命中率</td></tr><tr><td>实时通信</td><td>最少时间（Nginx Plus）</td><td>响应最快</td></tr><tr><td>混合负载</td><td>混合策略</td><td>根据路由选择不同策略</td></tr></tbody></table><h3 id="_12-2-配置检查清单" tabindex="-1">12.2 配置检查清单 <a class="header-anchor" href="#_12-2-配置检查清单" aria-label="Permalink to &quot;12.2 配置检查清单&quot;">​</a></h3><ol><li><p><strong>健康检查配置</strong></p><ul><li>[ ] 设置了合理的max_fails和fail_timeout</li><li>[ ] 配置了适当的健康检查端点</li><li>[ ] 实现了故障转移机制</li></ul></li><li><p><strong>会话保持</strong></p><ul><li>[ ] 需要会话保持的服务使用了合适策略</li><li>[ ] 配置了会话超时时间</li><li>[ ] 考虑了会话迁移需求</li></ul></li><li><p><strong>性能调优</strong></p><ul><li>[ ] 设置了合适的连接超时</li><li>[ ] 配置了缓冲区大小</li><li>[ ] 实现了限流保护</li></ul></li><li><p><strong>监控告警</strong></p><ul><li>[ ] 启用了负载均衡指标监控</li><li>[ ] 配置了日志记录</li><li>[ ] 设置了异常告警</li></ul></li></ol><h3 id="_12-3-常见问题解决方案" tabindex="-1">12.3 常见问题解决方案 <a class="header-anchor" href="#_12-3-常见问题解决方案" aria-label="Permalink to &quot;12.3 常见问题解决方案&quot;">​</a></h3><p><strong>问题1：负载不均</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：调整权重或更换策略</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    least_conn</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 改用最少连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    server backend2.example.com </span><span class="__shiki_1jdh33">weight</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>问题2：会话丢失</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：启用会话保持</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    ip_hash</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd"># 或使用sticky cookie</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend2.example.com;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>问题3：服务雪崩</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 解决方案：配置熔断和降级</span></span>
<span class="line"><span class="__shiki_1itgoe">upstream</span><span class="__shiki_1t8gfj"> backend </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backend1.example.com </span><span class="__shiki_1jdh33">max_fails</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> fail_timeout=30s;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 熔断配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream </span><span class="__shiki_dzsirb">error</span><span class="__shiki_140thh"> timeout http_500 http_502 http_503 http_504;</span></span>
<span class="line"><span class="__shiki_1itgoe">    proxy_next_upstream_tries </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 降级服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">    server</span><span class="__shiki_140thh"> backup.example.com backup;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_12-4-未来发展趋势" tabindex="-1">12.4 未来发展趋势 <a class="header-anchor" href="#_12-4-未来发展趋势" aria-label="Permalink to &quot;12.4 未来发展趋势&quot;">​</a></h3><ol><li><strong>服务网格集成</strong>：与Istio、Linkerd等服务网格方案集成</li><li><strong>智能负载均衡</strong>：基于机器学习的动态负载预测</li><li><strong>边缘计算</strong>：地理感知的智能路由</li><li><strong>云原生支持</strong>：更好的Kubernetes集成</li><li><strong>实时调优</strong>：基于实时监控的自适应调优</li></ol><hr><p><strong>关键要点总结</strong>：</p><ol><li><strong>策略匹配</strong>：根据业务特性选择合适的负载均衡策略</li><li><strong>健康检查</strong>：配置完善的健康检查机制，防止流量打到故障节点</li><li><strong>会话管理</strong>：有状态服务需要合适的会话保持方案</li><li><strong>性能监控</strong>：建立完整的监控体系，实时发现和解决问题</li><li><strong>渐进优化</strong>：从小规模开始，根据监控数据逐步优化</li></ol><p>通过合理的负载均衡策略配置，可以显著提高系统的可用性、扩展性和性能。在实际应用中，需要根据具体业务场景、流量模式和系统架构，选择并调优最适合的负载均衡方案。</p>`,110)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
