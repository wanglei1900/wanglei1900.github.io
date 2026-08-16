import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Caddyfile 语法详解：从入门到精通","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/caddy/caddyfile.md","filePath":"devops/web-servers/caddy/caddyfile.md"}'),l={name:"devops/web-servers/caddy/caddyfile.md"};function _(h,s,e,c,t,o){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="caddyfile-语法详解-从入门到精通" tabindex="-1">Caddyfile 语法详解：从入门到精通 <a class="header-anchor" href="#caddyfile-语法详解-从入门到精通" aria-label="Permalink to &quot;Caddyfile 语法详解：从入门到精通&quot;">​</a></h1><h2 id="_1-caddyfile-概述" tabindex="-1">1. Caddyfile 概述 <a class="header-anchor" href="#_1-caddyfile-概述" aria-label="Permalink to &quot;1. Caddyfile 概述&quot;">​</a></h2><p>Caddyfile 是 Caddy Web 服务器的配置文件，采用<strong>声明式、人性化</strong>的语法设计。它借鉴了 Nginx 等传统服务器的配置风格，但更加简洁直观，特别强调<strong>合理的默认值</strong>和<strong>自动化</strong>，是 Caddy 实现“零配置 HTTPS”等强大功能的基础。</p><h3 id="_1-1-基础示例" tabindex="-1">1.1 基础示例 <a class="header-anchor" href="#_1-1-基础示例" aria-label="Permalink to &quot;1.1 基础示例&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 最简单的 Caddyfile：一个域名 + 静态文件服务</span></span>
<span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">* /var/www/html</span></span>
<span class="line"><span class="__shiki_140thh">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 反向代理示例</span></span>
<span class="line"><span class="__shiki_140thh">api.example.com {</span></span>
<span class="line"><span class="__shiki_140thh">    reverse_proxy localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_2-核心语法结构" tabindex="-1">2. 核心语法结构 <a class="header-anchor" href="#_2-核心语法结构" aria-label="Permalink to &quot;2. 核心语法结构&quot;">​</a></h2><h3 id="_2-1-基本组成元素" tabindex="-1">2.1 基本组成元素 <a class="header-anchor" href="#_2-1-基本组成元素" aria-label="Permalink to &quot;2.1 基本组成元素&quot;">​</a></h3><table tabindex="0"><thead><tr><th>组件</th><th>描述</th><th>示例</th></tr></thead><tbody><tr><td><strong>站点地址</strong></td><td>定义服务器监听的地址</td><td><code>example.com</code>, <code>:8080</code>, <code>http://example.com</code></td></tr><tr><td><strong>指令</strong></td><td>执行特定操作的命令</td><td><code>file_server</code>, <code>reverse_proxy</code>, <code>encode</code></td></tr><tr><td><strong>参数</strong></td><td>传递给指令的值</td><td><code>/var/www/html</code>, <code>localhost:3000</code>, <code>gzip</code></td></tr><tr><td><strong>块</strong></td><td>用花括号包裹的指令组</td><td><code>{ file_server }</code></td></tr></tbody></table><h3 id="_2-2-站点地址-site-addresses" tabindex="-1">2.2 站点地址（Site Addresses） <a class="header-anchor" href="#_2-2-站点地址-site-addresses" aria-label="Permalink to &quot;2.2 站点地址（Site Addresses）&quot;">​</a></h3><p>站点地址指定 Caddy 如何监听和处理请求：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 域名形式（自动启用HTTPS）</span></span>
<span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span></span>
<span class="line"><span class="__shiki_140thh">www.example.</span><span class="__shiki_1itgoe">com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 端口形式</span></span>
<span class="line"><span class="__shiki_140thh">:</span><span class="__shiki_1itgoe">8080</span><span class="__shiki_21nrsd">                    # 监听所有接口的8080端口</span></span>
<span class="line"><span class="__shiki_140thh">localhost:</span><span class="__shiki_1itgoe">8080</span><span class="__shiki_21nrsd">           # 仅本地访问</span></span>
<span class="line"><span class="__shiki_140thh">0.0.0.0:</span><span class="__shiki_1itgoe">8443</span><span class="__shiki_21nrsd">             # 明确指定监听所有接口</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 协议前缀（强制特定协议）</span></span>
<span class="line"><span class="__shiki_140thh">http://example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_21nrsd">       # 强制HTTP，禁用自动HTTPS</span></span>
<span class="line"><span class="__shiki_140thh">https://example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_21nrsd">      # 强制HTTPS（默认行为）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 路径（用于子路由）</span></span>
<span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_dzsirb">com/api</span><span class="__shiki_21nrsd">          # 仅匹配 /api 路径</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 通配符</span></span>
<span class="line"><span class="__shiki_140thh">*.example.com            </span><span class="__shiki_21nrsd"># 匹配所有子域名</span></span>
<span class="line"><span class="__shiki_140thh">*.example.com:8080       </span><span class="__shiki_21nrsd"># 带端口的通配符</span></span></code></pre></div><h3 id="_2-3-指令与参数" tabindex="-1">2.3 指令与参数 <a class="header-anchor" href="#_2-3-指令与参数" aria-label="Permalink to &quot;2.3 指令与参数&quot;">​</a></h3><h4 id="指令执行顺序" tabindex="-1">指令执行顺序 <a class="header-anchor" href="#指令执行顺序" aria-label="Permalink to &quot;指令执行顺序&quot;">​</a></h4><p>Caddy 执行指令时遵循<strong>特定顺序</strong>，而非书写顺序。了解这点对调试复杂配置至关重要：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 这些指令会按Caddy内部顺序执行，而非书写顺序</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">/var/www</span></span>
<span class="line"><span class="__shiki_140thh">    rewrite /api/* /v2/api/*</span></span>
<span class="line"><span class="__shiki_140thh">    try_files {path} {path}/index.html</span></span>
<span class="line"><span class="__shiki_140thh">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 反向代理通常在最后（除非有特殊路由）</span></span>
<span class="line"><span class="__shiki_140thh">    reverse_proxy /api/* localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>主要指令类别及其执行顺序：</p><ol><li><strong>请求修改类</strong>：<code>uri</code>, <code>rewrite</code>, <code>redir</code></li><li><strong>响应处理类</strong>：<code>header</code>, <code>encode</code></li><li><strong>内容服务类</strong>：<code>file_server</code>, <code>templates</code></li><li><strong>代理类</strong>：<code>reverse_proxy</code></li></ol><h2 id="_3-占位符-placeholders" tabindex="-1">3. 占位符（Placeholders） <a class="header-anchor" href="#_3-占位符-placeholders" aria-label="Permalink to &quot;3. 占位符（Placeholders）&quot;">​</a></h2><p>占位符是 Caddy 强大的变量系统，可以在运行时动态获取值：</p><h3 id="_3-1-常用占位符" tabindex="-1">3.1 常用占位符 <a class="header-anchor" href="#_3-1-常用占位符" aria-label="Permalink to &quot;3.1 常用占位符&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 请求信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">* /sites/{host}                     </span><span class="__shiki_21nrsd"># {host} = 请求的主机名</span></span>
<span class="line"><span class="__shiki_140thh">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">    header X-Original-URI {uri}              </span><span class="__shiki_21nrsd"># {uri} = 请求的URI</span></span>
<span class="line"><span class="__shiki_140thh">    header X-Client-IP {remote_host}         </span><span class="__shiki_21nrsd"># {remote_host} = 客户端IP</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 响应信息</span></span>
<span class="line"><span class="__shiki_140thh">    header X-Response-Time {duration_ms}ms   </span><span class="__shiki_21nrsd"># {duration_ms} = 处理时间(ms)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文件系统</span></span>
<span class="line"><span class="__shiki_140thh">    try_files {path} {path}/index.html {path}.html</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 正则捕获组（需配合regexp指令）</span></span>
<span class="line"><span class="__shiki_140thh">    @matched path_regexp ^/(?&lt;id&gt;\\d+)/?</span></span>
<span class="line"><span class="__shiki_140thh">    reverse_proxy @matched localhost:3000/{re.id}  </span><span class="__shiki_21nrsd"># 使用捕获的id</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-占位符修饰器" tabindex="-1">3.2 占位符修饰器 <a class="header-anchor" href="#_3-2-占位符修饰器" aria-label="Permalink to &quot;3.2 占位符修饰器&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 字符串操作</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-URI-Lower {lc:{uri}}            </span><span class="__shiki_21nrsd"># 转换为小写</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-URI-Upper {uc:{uri}}            </span><span class="__shiki_21nrsd"># 转换为大写</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-Path {path_segments.0}          </span><span class="__shiki_21nrsd"># 获取路径的第一段</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认值</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-Forwarded-Proto {scheme}        </span><span class="__shiki_21nrsd"># {scheme} = http或https</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-Custom {http.header.X-Custom:default}  </span><span class="__shiki_21nrsd"># 带默认值的请求头</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 切片与选择</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-First-Param {query.p1|first}    </span><span class="__shiki_21nrsd"># 获取第一个p1参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-JSON-Body {json_doc.key}        </span><span class="__shiki_21nrsd"># 解析JSON body</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 条件判断</span></span>
<span class="line"><span class="__shiki_140thh">    @is-</span><span class="__shiki_1itgoe">json</span><span class="__shiki_140thh"> method POST header Content-Type application/json</span></span>
<span class="line"><span class="__shiki_1itgoe">    handle</span><span class="__shiki_140thh"> @is-json {</span></span>
<span class="line"><span class="__shiki_1itgoe">        header</span><span class="__shiki_140thh"> X-Parsed-Value {json_doc.key}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-子路由与请求处理" tabindex="-1">4. 子路由与请求处理 <a class="header-anchor" href="#_4-子路由与请求处理" aria-label="Permalink to &quot;4. 子路由与请求处理&quot;">​</a></h2><h3 id="_4-1-使用-handle-和-route" tabindex="-1">4.1 使用 <code>handle</code> 和 <code>route</code> <a class="header-anchor" href="#_4-1-使用-handle-和-route" aria-label="Permalink to &quot;4.1 使用 \`handle\` 和 \`route\`&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 基于路径的路由</span></span>
<span class="line"><span class="__shiki_1itgoe">    handle</span><span class="__shiki_140thh"> /api/* {</span></span>
<span class="line"><span class="__shiki_1itgoe">        reverse_proxy</span><span class="__shiki_140thh"> localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    handle</span><span class="__shiki_140thh"> /static/* {</span></span>
<span class="line"><span class="__shiki_1itgoe">        root </span><span class="__shiki_140thh">* /var/www/static</span></span>
<span class="line"><span class="__shiki_140thh">        file_server browse</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 基于条件的路由（匹配器）</span></span>
<span class="line"><span class="__shiki_140thh">    @admin {</span></span>
<span class="line"><span class="__shiki_140thh">        path /admin/*</span></span>
<span class="line"><span class="__shiki_140thh">        remote_ip 192.168.1.0/24</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    handle @admin {</span></span>
<span class="line"><span class="__shiki_140thh">        basicauth {</span></span>
<span class="line"><span class="__shiki_140thh">            admin $2a$14$...</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        reverse_proxy localhost:3001</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 默认处理器</span></span>
<span class="line"><span class="__shiki_140thh">    handle {</span></span>
<span class="line"><span class="__shiki_140thh">        root * /var/www/public</span></span>
<span class="line"><span class="__shiki_140thh">        try_files {path} {path}/index.html</span></span>
<span class="line"><span class="__shiki_140thh">        file_server</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. route指令：显式控制执行流</span></span>
<span class="line"><span class="__shiki_140thh">api.example.com {</span></span>
<span class="line"><span class="__shiki_140thh">    route {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 按书写顺序执行</span></span>
<span class="line"><span class="__shiki_140thh">        jwt</span></span>
<span class="line"><span class="__shiki_140thh">        rewrite * /api{uri}</span></span>
<span class="line"><span class="__shiki_140thh">        reverse_proxy localhost:8080</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # route与handle的区别：</span></span>
<span class="line"><span class="__shiki_21nrsd">    # - route：指令按书写顺序执行</span></span>
<span class="line"><span class="__shiki_21nrsd">    # - handle：指令按Caddy内部顺序执行</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-请求处理流程图" tabindex="-1">4.2 请求处理流程图 <a class="header-anchor" href="#_4-2-请求处理流程图" aria-label="Permalink to &quot;4.2 请求处理流程图&quot;">​</a></h3><p>以下流程图展示了请求在 Caddy 中的处理流程：</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[客户端请求] --&gt; B{匹配站点地址}</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|匹配失败| C[默认站点或404]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt;|匹配成功| D[进入站点配置]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E{评估全局中间件}</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[执行rewrite/uri/redir等]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G{寻找匹配的handle/route}</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; H[评估匹配器&lt;br&gt;@path, @header等]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; I{是否有匹配项?}</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt;|否| J[继续下一个handle或默认]</span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt;|是| K[进入匹配的handle/route块]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; L[按顺序执行指令]</span></span>
<span class="line"><span class="__shiki_140thh">    L --&gt; M{指令类型?}</span></span>
<span class="line"><span class="__shiki_140thh">    M --&gt;|内容服务| N[file_server&lt;br&gt;static_response等]</span></span>
<span class="line"><span class="__shiki_140thh">    M --&gt;|代理| O[reverse_proxy]</span></span>
<span class="line"><span class="__shiki_140thh">    M --&gt;|修改| P[继续执行修改类指令]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    N --&gt; Q[生成响应]</span></span>
<span class="line"><span class="__shiki_140thh">    O --&gt; Q</span></span>
<span class="line"><span class="__shiki_140thh">    P --&gt; Q</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Q --&gt; R{是否有后处理指令?}</span></span>
<span class="line"><span class="__shiki_140thh">    R --&gt;|是| S[执行encode/header等]</span></span>
<span class="line"><span class="__shiki_140thh">    R --&gt;|否| T[发送响应给客户端]</span></span>
<span class="line"><span class="__shiki_140thh">    S --&gt; T</span></span></code></pre></div><h2 id="_5-常用指令详解" tabindex="-1">5. 常用指令详解 <a class="header-anchor" href="#_5-常用指令详解" aria-label="Permalink to &quot;5. 常用指令详解&quot;">​</a></h2><h3 id="_5-1-内容服务指令" tabindex="-1">5.1 内容服务指令 <a class="header-anchor" href="#_5-1-内容服务指令" aria-label="Permalink to &quot;5.1 内容服务指令&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 静态文件服务</span></span>
<span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基本文件服务</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">* /var/www/html</span></span>
<span class="line"><span class="__shiki_140thh">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 带浏览功能</span></span>
<span class="line"><span class="__shiki_140thh">    file_server browse {</span></span>
<span class="line"><span class="__shiki_140thh">        hide .gitignore</span></span>
<span class="line"><span class="__shiki_140thh">        index index.html index.txt</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义MIME类型</span></span>
<span class="line"><span class="__shiki_140thh">    file_server {</span></span>
<span class="line"><span class="__shiki_140thh">        mime .md text/markdown</span></span>
<span class="line"><span class="__shiki_140thh">        mime .json application/json</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 静态响应</span></span>
<span class="line"><span class="__shiki_140thh">status.example.com {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 直接返回响应，不访问文件系统</span></span>
<span class="line"><span class="__shiki_140thh">    respond </span><span class="__shiki_mdbnqw">&quot;服务正常&quot;</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        header Content-Type </span><span class="__shiki_mdbnqw">&quot;text/plain; charset=utf-8&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        header X-Custom </span><span class="__shiki_mdbnqw">&quot;Value&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 返回JSON</span></span>
<span class="line"><span class="__shiki_140thh">    @json path /api/status</span></span>
<span class="line"><span class="__shiki_140thh">    handle @json {</span></span>
<span class="line"><span class="__shiki_140thh">        respond \`{</span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;ok&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_mdbnqw">&quot;timestamp&quot;</span><span class="__shiki_140thh">:{iso8601}}\` </span><span class="__shiki_dzsirb">200</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            header Content-Type </span><span class="__shiki_mdbnqw">&quot;application/json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-反向代理指令" tabindex="-1">5.2 反向代理指令 <a class="header-anchor" href="#_5-2-反向代理指令" aria-label="Permalink to &quot;5.2 反向代理指令&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">backend.example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基本代理</span></span>
<span class="line"><span class="__shiki_1itgoe">    reverse_proxy</span><span class="__shiki_140thh"> localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 带负载均衡和健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    reverse_proxy</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        to</span><span class="__shiki_140thh"> localhost:3001 localhost:3002 localhost:3003</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        lb_policy</span><span class="__shiki_140thh"> round_robin  </span><span class="__shiki_21nrsd"># 负载均衡策略</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">        health_uri</span><span class="__shiki_140thh"> /health</span></span>
<span class="line"><span class="__shiki_1itgoe">        health_interval</span><span class="__shiki_140thh"> 30s</span></span>
<span class="line"><span class="__shiki_1itgoe">        health_timeout</span><span class="__shiki_140thh"> 5s</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 连接池</span></span>
<span class="line"><span class="__shiki_1itgoe">        max_conns</span><span class="__shiki_140thh"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">        flush_interval</span><span class="__shiki_140thh"> -1</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 请求头处理</span></span>
<span class="line"><span class="__shiki_1itgoe">        header_up</span><span class="__shiki_140thh"> X-Real-IP {remote_host}</span></span>
<span class="line"><span class="__shiki_1itgoe">        header_up</span><span class="__shiki_140thh"> Host {upstream_hostport}</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 路径重写与分流</span></span>
<span class="line"><span class="__shiki_1itgoe">    reverse_proxy</span><span class="__shiki_140thh"> /v1/* localhost:3001  </span><span class="__shiki_21nrsd"># v1 API到旧服务</span></span>
<span class="line"><span class="__shiki_1itgoe">    reverse_proxy</span><span class="__shiki_140thh"> /v2/* localhost:3002  </span><span class="__shiki_21nrsd"># v2 API到新服务</span></span>
<span class="line"><span class="__shiki_1itgoe">    reverse_proxy</span><span class="__shiki_140thh"> /docs/* localhost:3003  </span><span class="__shiki_21nrsd"># 文档服务</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-安全相关指令" tabindex="-1">5.3 安全相关指令 <a class="header-anchor" href="#_5-3-安全相关指令" aria-label="Permalink to &quot;5.3 安全相关指令&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">secure.example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 基本认证</span></span>
<span class="line"><span class="__shiki_1itgoe">    basicauth</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        user1</span><span class="__shiki_140thh"> $2a$14$...  </span><span class="__shiki_21nrsd"># bcrypt哈希密码</span></span>
<span class="line"><span class="__shiki_1itgoe">        user2</span><span class="__shiki_140thh"> $2a$14$...</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. CORS配置</span></span>
<span class="line"><span class="__shiki_140thh">    @</span><span class="__shiki_1itgoe">cors_preflight</span><span class="__shiki_140thh"> method OPTIONS</span></span>
<span class="line"><span class="__shiki_1itgoe">    handle</span><span class="__shiki_140thh"> @cors_preflight {</span></span>
<span class="line"><span class="__shiki_1itgoe">        header</span><span class="__shiki_140thh"> Access-Control-Allow-Origin </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        header</span><span class="__shiki_140thh"> Access-Control-Allow-Methods </span><span class="__shiki_mdbnqw">&quot;GET, POST, OPTIONS&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        header</span><span class="__shiki_140thh"> Access-Control-Allow-Headers </span><span class="__shiki_mdbnqw">&quot;Content-Type, Authorization&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        respond</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> 204</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> Access-Control-Allow-Origin </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 速率限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    rate_limit</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        zone </span><span class="__shiki_140thh">dynamic {</span></span>
<span class="line"><span class="__shiki_140thh">            key {remote_host}</span></span>
<span class="line"><span class="__shiki_140thh">            events 100</span></span>
<span class="line"><span class="__shiki_140thh">            window 1m</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 安全头部</span></span>
<span class="line"><span class="__shiki_140thh">    header {</span></span>
<span class="line"><span class="__shiki_21nrsd">        # HSTS</span></span>
<span class="line"><span class="__shiki_140thh">        Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=31536000; includeSubDomains&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 点击劫持保护</span></span>
<span class="line"><span class="__shiki_140thh">        X-Frame-Options </span><span class="__shiki_mdbnqw">&quot;SAMEORIGIN&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # XSS保护</span></span>
<span class="line"><span class="__shiki_140thh">        X-Content-Type-Options </span><span class="__shiki_mdbnqw">&quot;nosniff&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        X-XSS-Protection </span><span class="__shiki_mdbnqw">&quot;1; mode=block&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # CSP</span></span>
<span class="line"><span class="__shiki_140thh">        Content-Security-Policy </span><span class="__shiki_mdbnqw">&quot;default-src &#39;self&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 引用策略</span></span>
<span class="line"><span class="__shiki_140thh">        Referrer-Policy </span><span class="__shiki_mdbnqw">&quot;strict-origin-when-cross-origin&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-高级特性与配置模式" tabindex="-1">6. 高级特性与配置模式 <a class="header-anchor" href="#_6-高级特性与配置模式" aria-label="Permalink to &quot;6. 高级特性与配置模式&quot;">​</a></h2><h3 id="_6-1-环境变量与配置文件" tabindex="-1">6.1 环境变量与配置文件 <a class="header-anchor" href="#_6-1-环境变量与配置文件" aria-label="Permalink to &quot;6.1 环境变量与配置文件&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 在Caddyfile中使用环境变量</span></span>
<span class="line"><span class="__shiki_140thh">{$DOMAIN_NAME} {</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">* {$DOCUMENT_ROOT:/var/www/html}  </span><span class="__shiki_21nrsd"># 带默认值</span></span>
<span class="line"><span class="__shiki_140thh">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    reverse_proxy {$API_URL:localhost:3000}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 条件配置</span></span>
<span class="line"><span class="__shiki_140thh">{$ENV:production} {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 生产环境特定配置</span></span>
<span class="line"><span class="__shiki_140thh">    header Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=3600&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误页面</span></span>
<span class="line"><span class="__shiki_140thh">    handle_errors {</span></span>
<span class="line"><span class="__shiki_140thh">        @404 {</span></span>
<span class="line"><span class="__shiki_140thh">            expression {http.error.status_code} == 404</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        handle @404 {</span></span>
<span class="line"><span class="__shiki_140thh">            rewrite * /404.html</span></span>
<span class="line"><span class="__shiki_140thh">            file_server</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">{$ENV:development} {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 开发环境配置</span></span>
<span class="line"><span class="__shiki_140thh">    header Cache-Control </span><span class="__shiki_mdbnqw">&quot;no-cache, no-store, must-revalidate&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 详细日志</span></span>
<span class="line"><span class="__shiki_140thh">    log {</span></span>
<span class="line"><span class="__shiki_140thh">        output stdout</span></span>
<span class="line"><span class="__shiki_140thh">        format console</span></span>
<span class="line"><span class="__shiki_140thh">        level DEBUG</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-全局选项与片段重用" tabindex="-1">6.2 全局选项与片段重用 <a class="header-anchor" href="#_6-2-全局选项与片段重用" aria-label="Permalink to &quot;6.2 全局选项与片段重用&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 全局配置块</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 调试模式</span></span>
<span class="line"><span class="__shiki_1itgoe">    debug</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义存储</span></span>
<span class="line"><span class="__shiki_1itgoe">    storage</span><span class="__shiki_140thh"> file_system {</span></span>
<span class="line"><span class="__shiki_1itgoe">        root </span><span class="__shiki_140thh">/data/caddy</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 电子邮件（用于证书通知）</span></span>
<span class="line"><span class="__shiki_140thh">    email admin@example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ACME配置</span></span>
<span class="line"><span class="__shiki_140thh">    acme_ca https://acme-staging-v02.api.letsencrypt.org/directory</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自定义日志</span></span>
<span class="line"><span class="__shiki_140thh">    log {</span></span>
<span class="line"><span class="__shiki_140thh">        output file /var/log/caddy/access.log {</span></span>
<span class="line"><span class="__shiki_140thh">            roll_size 100mb</span></span>
<span class="line"><span class="__shiki_140thh">            roll_keep 10</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        format json</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 管理API（谨慎启用）</span></span>
<span class="line"><span class="__shiki_140thh">    admin localhost:2019</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动HTTPS配置</span></span>
<span class="line"><span class="__shiki_140thh">    automatic_https {</span></span>
<span class="line"><span class="__shiki_140thh">        disable_redirects</span></span>
<span class="line"><span class="__shiki_140thh">        skip_certificates internal.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置片段定义</span></span>
<span class="line"><span class="__shiki_140thh">(static_content) {</span></span>
<span class="line"><span class="__shiki_140thh">    root * /var/www</span></span>
<span class="line"><span class="__shiki_140thh">    file_server browse</span></span>
<span class="line"><span class="__shiki_140thh">    header Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=600&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">(api_proxy) {</span></span>
<span class="line"><span class="__shiki_140thh">    reverse_proxy localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">    header_up X-Forwarded-For {remote_host}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用配置片段</span></span>
<span class="line"><span class="__shiki_140thh">blog.example.com {</span></span>
<span class="line"><span class="__shiki_140thh">    import static_content</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">api.example.com {</span></span>
<span class="line"><span class="__shiki_140thh">    import api_proxy</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-3-json-与-caddyfile-互操作" tabindex="-1">6.3 JSON 与 Caddyfile 互操作 <a class="header-anchor" href="#_6-3-json-与-caddyfile-互操作" aria-label="Permalink to &quot;6.3 JSON 与 Caddyfile 互操作&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Caddyfile 可以转换为 JSON 配置</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;apps&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;http&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;servers&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;example&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;listen&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;:443&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;routes&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">            {</span></span>
<span class="line"><span class="__shiki_dzsirb">              &quot;match&quot;</span><span class="__shiki_140thh">: [{</span><span class="__shiki_dzsirb">&quot;host&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;example.com&quot;</span><span class="__shiki_140thh">]}],</span></span>
<span class="line"><span class="__shiki_dzsirb">              &quot;handle&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                {</span></span>
<span class="line"><span class="__shiki_dzsirb">                  &quot;handler&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;subroute&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                  &quot;routes&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                    {</span></span>
<span class="line"><span class="__shiki_dzsirb">                      &quot;handle&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                        {</span></span>
<span class="line"><span class="__shiki_dzsirb">                          &quot;handler&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;file_server&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                          &quot;root&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/var/www/html&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                      ]</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                  ]</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">              ]</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          ]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 转换命令</span></span>
<span class="line"><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_mdbnqw"> adapt</span><span class="__shiki_dzsirb"> --config</span><span class="__shiki_mdbnqw"> Caddyfile</span><span class="__shiki_dzsirb"> --pretty</span></span>
<span class="line"><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_mdbnqw"> validate</span><span class="__shiki_dzsirb"> --config</span><span class="__shiki_mdbnqw"> Caddyfile</span></span>
<span class="line"><span class="__shiki_1t8gfj">caddy</span><span class="__shiki_mdbnqw"> fmt</span><span class="__shiki_dzsirb"> --overwrite</span><span class="__shiki_mdbnqw"> Caddyfile</span><span class="__shiki_21nrsd">  # 格式化Caddyfile</span></span></code></pre></div><h2 id="_7-实用技巧与最佳实践" tabindex="-1">7. 实用技巧与最佳实践 <a class="header-anchor" href="#_7-实用技巧与最佳实践" aria-label="Permalink to &quot;7. 实用技巧与最佳实践&quot;">​</a></h2><h3 id="_7-1-调试与问题排查" tabindex="-1">7.1 调试与问题排查 <a class="header-anchor" href="#_7-1-调试与问题排查" aria-label="Permalink to &quot;7.1 调试与问题排查&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 添加调试头部</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-Debug-Original-URI {uri}</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-Debug-Host {host}</span></span>
<span class="line"><span class="__shiki_1itgoe">    header</span><span class="__shiki_140thh"> X-Debug-Remote {remote_host}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 条件日志</span></span>
<span class="line"><span class="__shiki_1itgoe">    log</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        output</span><span class="__shiki_140thh"> stdout</span></span>
<span class="line"><span class="__shiki_1itgoe">        format</span><span class="__shiki_140thh"> console</span></span>
<span class="line"><span class="__shiki_1itgoe">        level</span><span class="__shiki_140thh"> DEBUG</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 仅记录特定路径</span></span>
<span class="line"><span class="__shiki_1itgoe">        include_paths</span><span class="__shiki_140thh"> /api/* /admin/*</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 使用try_files调试</span></span>
<span class="line"><span class="__shiki_1itgoe">    try_files </span><span class="__shiki_140thh">{path} {path}.html /debug/{path}.txt</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 中间件排序验证</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 记住：指令按Caddy内部顺序执行，不是书写顺序</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用\`caddy validate\`检查配置</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-性能优化" tabindex="-1">7.2 性能优化 <a class="header-anchor" href="#_7-2-性能优化" aria-label="Permalink to &quot;7.2 性能优化&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 全局性能调优</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接保持</span></span>
<span class="line"><span class="__shiki_1itgoe">    servers</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        protocol </span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            experimental_http3</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 超时设置</span></span>
<span class="line"><span class="__shiki_140thh">        timeouts {</span></span>
<span class="line"><span class="__shiki_140thh">            read_body 30s</span></span>
<span class="line"><span class="__shiki_140thh">            write 60s</span></span>
<span class="line"><span class="__shiki_140thh">            idle 300s</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓冲区</span></span>
<span class="line"><span class="__shiki_140thh">        compression {</span></span>
<span class="line"><span class="__shiki_140thh">            enabled </span><span class="__shiki_dzsirb">off</span><span class="__shiki_21nrsd">  # 如果前端已有压缩</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 站点级优化</span></span>
<span class="line"><span class="__shiki_140thh">assets.example.com {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 静态资源优化</span></span>
<span class="line"><span class="__shiki_140thh">    root * /var/www/assets</span></span>
<span class="line"><span class="__shiki_140thh">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 长期缓存</span></span>
<span class="line"><span class="__shiki_140thh">    header Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=31536000, immutable&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预压缩文件</span></span>
<span class="line"><span class="__shiki_140thh">    encode zstd gzip</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 条件请求处理</span></span>
<span class="line"><span class="__shiki_140thh">    header -Server  </span><span class="__shiki_21nrsd"># 隐藏服务器标识</span></span>
<span class="line"><span class="__shiki_140thh">    header Etag {http.file.hash}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-常见配置模式" tabindex="-1">7.3 常见配置模式 <a class="header-anchor" href="#_7-3-常见配置模式" aria-label="Permalink to &quot;7.3 常见配置模式&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 模式1：多应用单入口</span></span>
<span class="line"><span class="__shiki_140thh">app.example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SPA应用</span></span>
<span class="line"><span class="__shiki_1itgoe">    handle</span><span class="__shiki_140thh"> /app/* {</span></span>
<span class="line"><span class="__shiki_1itgoe">        root </span><span class="__shiki_140thh">* /var/www/spa</span></span>
<span class="line"><span class="__shiki_140thh">        try_files {path} /app/index.html</span></span>
<span class="line"><span class="__shiki_140thh">        file_server</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # API后端</span></span>
<span class="line"><span class="__shiki_140thh">    handle /api/* {</span></span>
<span class="line"><span class="__shiki_140thh">        reverse_proxy localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 静态资源</span></span>
<span class="line"><span class="__shiki_140thh">    handle /static/* {</span></span>
<span class="line"><span class="__shiki_140thh">        root * /var/www/static</span></span>
<span class="line"><span class="__shiki_140thh">        file_server</span></span>
<span class="line"><span class="__shiki_140thh">        header Cache-Control </span><span class="__shiki_mdbnqw">&quot;public, max-age=31536000&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认重定向到SPA</span></span>
<span class="line"><span class="__shiki_140thh">    handle {</span></span>
<span class="line"><span class="__shiki_140thh">        redir /app</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 模式2：多租户配置</span></span>
<span class="line"><span class="__shiki_140thh">{$TENANT_DOMAIN} {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态根目录</span></span>
<span class="line"><span class="__shiki_140thh">    root * /tenants/{host}</span></span>
<span class="line"><span class="__shiki_140thh">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 租户特定配置</span></span>
<span class="line"><span class="__shiki_140thh">    handle /config {</span></span>
<span class="line"><span class="__shiki_140thh">        respond \`{</span><span class="__shiki_mdbnqw">&quot;tenant&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;{host}&quot;</span><span class="__shiki_140thh">,</span><span class="__shiki_mdbnqw">&quot;theme&quot;</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;default&quot;</span><span class="__shiki_140thh">}\` 200</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 模式3：蓝绿部署</span></span>
<span class="line"><span class="__shiki_140thh">production.example.com {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # A/B测试路由</span></span>
<span class="line"><span class="__shiki_140thh">    @versionA {</span></span>
<span class="line"><span class="__shiki_140thh">        header X-Version A</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    @versionB {</span></span>
<span class="line"><span class="__shiki_140thh">        header X-Version B</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    handle @versionA {</span></span>
<span class="line"><span class="__shiki_140thh">        reverse_proxy localhost:3001</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    handle @versionB {</span></span>
<span class="line"><span class="__shiki_140thh">        reverse_proxy localhost:3002</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认版本</span></span>
<span class="line"><span class="__shiki_140thh">    handle {</span></span>
<span class="line"><span class="__shiki_140thh">        reverse_proxy localhost:3001</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_8-总结" tabindex="-1">8. 总结 <a class="header-anchor" href="#_8-总结" aria-label="Permalink to &quot;8. 总结&quot;">​</a></h2><p>Caddyfile 的核心设计理念是<strong>简洁</strong>与<strong>强大</strong>的平衡。关键要点：</p><ol><li><strong>合理的默认值</strong>：大多数配置都有安全且高效的默认值</li><li><strong>声明式语法</strong>：描述“想要什么”而非“如何实现”</li><li><strong>强大的占位符系统</strong>：提供运行时灵活性</li><li><strong>自动化的HTTPS</strong>：内置证书管理是最大亮点</li><li><strong>模块化设计</strong>：通过导入和片段实现配置复用</li></ol><p>Caddyfile 的学习曲线初期平缓，但随着需求复杂化，需要深入理解其执行模型和占位符系统。建议从简单配置开始，逐步实验更复杂的路由和条件处理，充分利用 <code>caddy validate</code> 和 <code>caddy adapt</code> 命令来验证和调试配置。</p><p>如果你有特定的使用场景（如微服务网关、静态网站托管、API网关等），我可以提供更针对性的配置示例和最佳实践。</p>`,56)])])}const r=a(l,[["render",_]]);export{d as __pageData,r as default};
