import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/caddy/auto-https.md","filePath":"devops/web-servers/caddy/auto-https.md"}'),l={name:"devops/web-servers/caddy/auto-https.md"};function t(_,s,e,h,c,o){return n(),p("div",null,[...s[0]||(s[0]=[i(`<p>关于Caddy的自动HTTPS配置，它通过内置的ACME客户端，能够在配置域名后，自动从Let‘s Encrypt等机构申请、续期SSL证书，并完成HTTPS服务配置。下表是它的核心工作原理：</p><table tabindex="0"><thead><tr><th style="text-align:left;">模块</th><th style="text-align:left;">功能描述</th><th style="text-align:left;">关键点/默认行为</th></tr></thead><tbody><tr><td style="text-align:left;"><strong>证书管理</strong></td><td style="text-align:left;">自动申请、续期SSL/TLS证书。</td><td style="text-align:left;">公网域名使用<strong>Let‘s Encrypt</strong>证书；本地地址（如<code>localhost</code>）使用自签名证书。</td></tr><tr><td style="text-align:left;"><strong>HTTPS重定向</strong></td><td style="text-align:left;">自动将HTTP请求（端口80）重定向到HTTPS（端口443）。</td><td style="text-align:left;"><strong>默认启用</strong>。</td></tr><tr><td style="text-align:left;"><strong>ACME验证</strong></td><td style="text-align:left;">验证域名所有权以获取证书。</td><td style="text-align:left;">默认启用<strong>HTTP-01</strong>（端口80）和<strong>TLS-ALPN-01</strong>（端口443）挑战。</td></tr><tr><td style="text-align:left;"><strong>监听端口</strong></td><td style="text-align:left;">服务于HTTP/HTTPS请求。</td><td style="text-align:left;">默认监听<strong>80</strong>(HTTP)和<strong>443</strong>(HTTPS)端口。</td></tr></tbody></table><h3 id="📝-自动https的基础配置" tabindex="-1">📝 自动HTTPS的基础配置 <a class="header-anchor" href="#📝-自动https的基础配置" aria-label="Permalink to &quot;📝 自动HTTPS的基础配置&quot;">​</a></h3><p>自动HTTPS是Caddy的默认行为，通常只需在<code>Caddyfile</code>中指定你的域名即可激活。</p><p><strong>1. 基础配置格式</strong></p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 最简配置：只需域名，自动启用HTTPS并托管该目录下的静态文件</span></span>
<span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    root </span><span class="__shiki_140thh">* /var/www/html</span></span>
<span class="line"><span class="__shiki_140thh">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 作为反向代理：自动为后端服务启用HTTPS</span></span>
<span class="line"><span class="__shiki_140thh">api.example.com {</span></span>
<span class="line"><span class="__shiki_140thh">    reverse_proxy localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>配置完成后，使用 <code>sudo systemctl reload caddy</code> 重载服务即可。</p><p><strong>2. 工作流程</strong> 下图直观展示了从你添加域名到启用HTTPS的完整过程：</p><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[在Caddyfile中添加域名&lt;br&gt;（如 example.com）] --&gt; B[Caddy启动/重载]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C{检查证书状态}</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|证书有效| D[直接提供HTTPS服务]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt;|证书无效或缺失| E[触发ACME申请流程]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[尝试HTTP-01&lt;br&gt;或TLS-ALPN-01挑战]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G{域名是否解析正确&lt;br&gt;且80/443端口可访问?}</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt;|是| H[验证通过，获取并存储证书]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt;|否| I[证书申请失败&lt;br&gt;检查域名与端口]</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; J[自动启用HTTPS服务&lt;br&gt;并将HTTP重定向至HTTPS]</span></span></code></pre></div><h3 id="⚙️-高级配置与场景应用" tabindex="-1">⚙️ 高级配置与场景应用 <a class="header-anchor" href="#⚙️-高级配置与场景应用" aria-label="Permalink to &quot;⚙️ 高级配置与场景应用&quot;">​</a></h3><p><strong>1. 自定义端口与监听设置</strong> 如果需要在非标准端口启用HTTPS，或监听特定IP，需要显式声明。</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 在非标准HTTP端口（如8080）启用HTTPS</span></span>
<span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 明确绑定HTTP和HTTPS端口</span></span>
<span class="line"><span class="__shiki_1itgoe">    bind</span><span class="__shiki_140thh"> :8080 </span><span class="__shiki_21nrsd"># HTTP端口</span></span>
<span class="line"><span class="__shiki_1itgoe">    bind</span><span class="__shiki_140thh"> :443  </span><span class="__shiki_21nrsd"># HTTPS端口</span></span>
<span class="line"><span class="__shiki_1itgoe">    tls</span><span class="__shiki_140thh"> admin@example.com </span><span class="__shiki_21nrsd"># 可指定证书联系人邮箱（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在多IP服务器上指定监听地址</span></span>
<span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    bind</span><span class="__shiki_140thh"> 192.168.1.100:80</span></span>
<span class="line"><span class="__shiki_1itgoe">    bind</span><span class="__shiki_140thh"> 192.168.1.100:443</span></span>
<span class="line"><span class="__shiki_1itgoe">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>2. 多站点与复杂路由</strong> 一个<code>Caddyfile</code>可配置多个站点，也支持高级路由。</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多站点配置</span></span>
<span class="line"><span class="__shiki_140thh">example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    file_server</span><span class="__shiki_140thh"> /var/www/example</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">blog.example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    reverse_proxy</span><span class="__shiki_140thh"> localhost:8080</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 单站点内路由：静态资源和反向代理分离</span></span>
<span class="line"><span class="__shiki_140thh">app.example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 优先处理静态路径</span></span>
<span class="line"><span class="__shiki_1itgoe">    route</span><span class="__shiki_140thh"> /static/* {</span></span>
<span class="line"><span class="__shiki_1itgoe">        file_server</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 其他请求代理到应用</span></span>
<span class="line"><span class="__shiki_1itgoe">    route</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        reverse_proxy</span><span class="__shiki_140thh"> unix//run/gunicorn.sock </span><span class="__shiki_21nrsd"># 例如Django应用</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>3. 按需TLS (On-Demand TLS)</strong> 适用于域名未知或动态的场景（如大规模托管），它允许在<strong>首次TLS握手时</strong>才申请证书。</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 在Caddyfile中启用和限制按需TLS</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    on_demand_tls</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        ask</span><span class="__shiki_140thh"> http://localhost:9000/check-domain</span></span>
<span class="line"><span class="__shiki_1itgoe">        burst</span><span class="__shiki_140thh"> 5</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 任意握手的域名都将触发证书申请</span></span>
<span class="line"><span class="__shiki_140thh">:</span><span class="__shiki_1itgoe">443</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    tls</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        on_demand</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    reverse_proxy</span><span class="__shiki_140thh"> localhost:3000</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>⚠️ <strong>注意</strong>：必须设置<strong>问询端点</strong>(<code>ask</code>)或<strong>域名白名单</strong>等限制策略，防止滥用。</p><h3 id="🔧-故障排查与禁用" tabindex="-1">🔧 故障排查与禁用 <a class="header-anchor" href="#🔧-故障排查与禁用" aria-label="Permalink to &quot;🔧 故障排查与禁用&quot;">​</a></h3><p>当自动HTTPS不工作时，可按以下步骤排查：</p><ol><li><strong>检查域名与端口</strong>：确认域名已正确<strong>解析到服务器IP</strong>，且服务器的<strong>80和443端口</strong>在防火墙中已开放。</li><li><strong>检查Caddy日志</strong>：使用 <code>sudo journalctl -u caddy --no-pager</code> 或 <code>tail -f /var/log/caddy/access.log</code> 查看详细错误。</li><li><strong>验证配置文件</strong>：运行 <code>caddy validate --config /etc/caddy/Caddyfile</code> 检查语法。</li><li><strong>测试环境</strong>：使用Let‘s Encrypt的<strong>暂存环境</strong>（<code>https://acme-staging-v02.api.letsencrypt.org/directory</code>）测试，避免触发生产环境速率限制。</li></ol><p>如果需要<strong>完全禁用自动HTTPS</strong>（例如在反向代理之后），配置如下：</p><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 在全局选项中禁用</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_1itgoe">    automatic_https</span><span class="__shiki_140thh"> off</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_21nrsd"># 或在特定服务器块禁用</span></span>
<span class="line"><span class="__shiki_140thh">http://example.</span><span class="__shiki_1itgoe">com</span><span class="__shiki_140thh"> { </span><span class="__shiki_21nrsd"># 使用 http:// 前缀明确指定HTTP</span></span>
<span class="line"><span class="__shiki_1itgoe">    file_server</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 在JSON配置中禁用某个服务器实例的自动HTTPS</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;apps&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;http&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">      &quot;servers&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">        &quot;srv0&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;automatic_https&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">            &quot;disable&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">          },</span></span>
<span class="line"><span class="__shiki_dzsirb">          &quot;listen&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;:80&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="💎-核心要点总结" tabindex="-1">💎 核心要点总结 <a class="header-anchor" href="#💎-核心要点总结" aria-label="Permalink to &quot;💎 核心要点总结&quot;">​</a></h3><p>Caddy的自动HTTPS是它区别于传统Web服务器的核心特性，其设计目标是<strong>零配置安全</strong>：</p><ul><li><strong>开箱即用</strong>：在<code>Caddyfile</code>中写入公网域名，Caddy会自动完成从申请证书到启用HTTPS的所有工作。</li><li><strong>全自动维护</strong>：证书续期、HTTP到HTTPS的重定向全部在后台自动完成，无需人工干预。</li><li><strong>灵活适应</strong>：通过<strong>按需TLS</strong>支持动态域名；通过<strong>DNS挑战</strong>支持不开放端口的内部环境。</li></ul><p>如果你能分享你计划使用Caddy的<strong>具体场景</strong>（例如部署个人博客、为内部工具提供HTTPS，还是在云原生环境中使用），我可以提供更具针对性的配置建议。</p>`,27)])])}const g=a(l,[["render",t]]);export{r as __pageData,g as default};
