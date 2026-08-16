import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"HTTPS 实现学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/internet/http/https.md","filePath":"backend/internet/http/https.md"}'),l={name:"backend/internet/http/https.md"};function h(t,s,_,e,c,r){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="https-实现学习笔记" tabindex="-1">HTTPS 实现学习笔记 <a class="header-anchor" href="#https-实现学习笔记" aria-label="Permalink to &quot;HTTPS 实现学习笔记&quot;">​</a></h1><h2 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h2><ol><li><a href="#概述">HTTPS 概述</a></li><li><a href="#加密基础">加密基础</a></li><li><a href="#ssl-tls">SSL/TLS 协议</a></li><li><a href="#数字证书">数字证书</a></li><li><a href="#tls-握手">TLS 握手过程</a></li><li><a href="#配置部署">HTTPS 配置与部署</a></li><li><a href="#性能优化">性能优化</a></li><li><a href="#安全考虑">安全考虑</a></li><li><a href="#实际应用">实际应用</a></li></ol><hr><h2 id="概述" tabindex="-1">1. HTTPS 概述 <a class="header-anchor" href="#概述" aria-label="Permalink to &quot;1. HTTPS 概述 {#概述}&quot;">​</a></h2><h3 id="什么是-https" tabindex="-1">什么是 HTTPS <a class="header-anchor" href="#什么是-https" aria-label="Permalink to &quot;什么是 HTTPS&quot;">​</a></h3><p>HTTPS（HyperText Transfer Protocol Secure）是 HTTP 的安全版本，通过 SSL/TLS 协议提供加密通信。</p><h3 id="https-与-http-对比" tabindex="-1">HTTPS 与 HTTP 对比 <a class="header-anchor" href="#https-与-http-对比" aria-label="Permalink to &quot;HTTPS 与 HTTP 对比&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">comparisonDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    title HTTP vs HTTPS 对比</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    section HTTP</span></span>
<span class="line"><span class="__shiki_140thh">        明文传输 : 高: 数据可见</span></span>
<span class="line"><span class="__shiki_140thh">        无身份验证 : 高: 可能被伪装</span></span>
<span class="line"><span class="__shiki_140thh">        无完整性保护 : 高: 可能被篡改</span></span>
<span class="line"><span class="__shiki_140thh">        端口80 : 固定: 80</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    section HTTPS</span></span>
<span class="line"><span class="__shiki_140thh">        加密传输 : 低: 数据加密</span></span>
<span class="line"><span class="__shiki_140thh">        服务器身份验证 : 低: 证书验证</span></span>
<span class="line"><span class="__shiki_140thh">        数据完整性 : 低: 防篡改</span></span>
<span class="line"><span class="__shiki_140thh">        端口443 : 固定: 443</span></span></code></pre></div><h3 id="https-核心价值" tabindex="-1">HTTPS 核心价值 <a class="header-anchor" href="#https-核心价值" aria-label="Permalink to &quot;HTTPS 核心价值&quot;">​</a></h3><ul><li><strong>保密性</strong>：防止窃听</li><li><strong>完整性</strong>：防止篡改</li><li><strong>身份验证</strong>：防止冒充</li></ul><h2 id="加密基础" tabindex="-1">2. 加密基础 <a class="header-anchor" href="#加密基础" aria-label="Permalink to &quot;2. 加密基础 {#加密基础}&quot;">​</a></h2><h3 id="对称加密" tabindex="-1">对称加密 <a class="header-anchor" href="#对称加密" aria-label="Permalink to &quot;对称加密&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[明文] --&gt; B[加密算法]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[密文]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[解密算法]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[明文]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F[密钥] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; D</span></span></code></pre></div><p><strong>特点</strong>：</p><ul><li>加解密使用相同密钥</li><li>速度快，适合大数据量</li><li>密钥分发困难</li></ul><p><strong>常用算法</strong>：</p><ul><li>AES（Advanced Encryption Standard）</li><li>DES（Data Encryption Standard）</li><li>3DES（Triple DES）</li></ul><h3 id="非对称加密" tabindex="-1">非对称加密 <a class="header-anchor" href="#非对称加密" aria-label="Permalink to &quot;非对称加密&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[明文] --&gt; B[公钥加密]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[密文]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[私钥解密]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[明文]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F[公钥] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    G[私钥] --&gt; D</span></span></code></pre></div><p><strong>特点</strong>：</p><ul><li>公钥加密，私钥解密</li><li>速度慢，适合小数据量</li><li>解决密钥分发问题</li></ul><p><strong>常用算法</strong>：</p><ul><li>RSA（Rivest–Shamir–Adleman）</li><li>ECC（Elliptic Curve Cryptography）</li><li>DH（Diffie-Hellman）</li></ul><h3 id="哈希函数" tabindex="-1">哈希函数 <a class="header-anchor" href="#哈希函数" aria-label="Permalink to &quot;哈希函数&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[任意长度数据] --&gt; B[哈希函数]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[固定长度哈希值]</span></span></code></pre></div><p><strong>特性</strong>：</p><ul><li>单向性：不可逆</li><li>抗碰撞：不同输入产生相同输出的概率极低</li><li>雪崩效应：微小变化导致巨大差异</li></ul><p><strong>常用算法</strong>：</p><ul><li>SHA-256</li><li>SHA-384</li><li>SHA-512</li></ul><h2 id="ssl-tls" tabindex="-1">3. SSL/TLS 协议 <a class="header-anchor" href="#ssl-tls" aria-label="Permalink to &quot;3. SSL/TLS 协议 {#ssl-tls}&quot;">​</a></h2><h3 id="ssl-tls-发展历程" tabindex="-1">SSL/TLS 发展历程 <a class="header-anchor" href="#ssl-tls-发展历程" aria-label="Permalink to &quot;SSL/TLS 发展历程&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">timeline</span></span>
<span class="line"><span class="__shiki_140thh">    title SSL/TLS 协议发展</span></span>
<span class="line"><span class="__shiki_140thh">    1994 : SSL 1.0 (未发布)</span></span>
<span class="line"><span class="__shiki_140thh">    1995 : SSL 2.0 (有严重漏洞)</span></span>
<span class="line"><span class="__shiki_140thh">    1996 : SSL 3.0 (广泛使用)</span></span>
<span class="line"><span class="__shiki_140thh">    1999 : TLS 1.0 (SSL 3.1)</span></span>
<span class="line"><span class="__shiki_140thh">    2006 : TLS 1.1</span></span>
<span class="line"><span class="__shiki_140thh">    2008 : TLS 1.2 (当前主流)</span></span>
<span class="line"><span class="__shiki_140thh">    2018 : TLS 1.3 (现代标准)</span></span></code></pre></div><h3 id="tls-协议栈" tabindex="-1">TLS 协议栈 <a class="header-anchor" href="#tls-协议栈" aria-label="Permalink to &quot;TLS 协议栈&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[TLS协议栈] --&gt; B[握手协议]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[记录协议]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[警报协议]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[变更密码规范协议]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[协商加密参数]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[身份验证]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[密钥交换]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[分片]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[压缩]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[加密]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C4[添加MAC]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[错误通知]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[连接关闭]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[密码变更通知]</span></span></code></pre></div><h3 id="tls-记录协议" tabindex="-1">TLS 记录协议 <a class="header-anchor" href="#tls-记录协议" aria-label="Permalink to &quot;TLS 记录协议&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</span></span>
<span class="line"><span class="__shiki_wvjl67">| 内容类型 |   版本   |       长度       |          数据载荷          |</span></span>
<span class="line"><span class="__shiki_wvjl67">+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+</span></span>
<span class="line"><span class="__shiki_wvjl67">    1字节       2字节        2字节             可变长度</span></span></code></pre></div><p><strong>处理流程</strong>：</p><ol><li>分片：将数据分成 2^14 字节或更小的块</li><li>压缩：可选步骤（现代 TLS 通常禁用）</li><li>添加 MAC：计算消息认证码</li><li>加密：使用对称加密算法</li><li>添加 TLS 记录头</li></ol><h2 id="数字证书" tabindex="-1">4. 数字证书 <a class="header-anchor" href="#数字证书" aria-label="Permalink to &quot;4. 数字证书 {#数字证书}&quot;">​</a></h2><h3 id="证书结构" tabindex="-1">证书结构 <a class="header-anchor" href="#证书结构" aria-label="Permalink to &quot;证书结构&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[数字证书] --&gt; B[证书信息]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[签名算法]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[数字签名]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[版本号]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[序列号]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[签名算法]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B4[颁发者]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B5[有效期]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B6[主体]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B7[主体公钥信息]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B8[扩展信息]</span></span></code></pre></div><h3 id="证书链验证" tabindex="-1">证书链验证 <a class="header-anchor" href="#证书链验证" aria-label="Permalink to &quot;证书链验证&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[浏览器信任库] --&gt; B[根证书]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[中间证书]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[服务器证书]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[网站域名]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    style A fill:#e1f5fe</span></span>
<span class="line"><span class="__shiki_140thh">    style B fill:#f3e5f5</span></span>
<span class="line"><span class="__shiki_140thh">    style C fill:#e8f5e8</span></span>
<span class="line"><span class="__shiki_140thh">    style D fill:#fff3e0</span></span></code></pre></div><h3 id="证书类型" tabindex="-1">证书类型 <a class="header-anchor" href="#证书类型" aria-label="Permalink to &quot;证书类型&quot;">​</a></h3><ul><li><strong>DV（Domain Validation）</strong>：域名验证</li><li><strong>OV（Organization Validation）</strong>：组织验证</li><li><strong>EV（Extended Validation）</strong>：扩展验证</li></ul><h2 id="tls-握手" tabindex="-1">5. TLS 握手过程 <a class="header-anchor" href="#tls-握手" aria-label="Permalink to &quot;5. TLS 握手过程 {#tls-握手}&quot;">​</a></h2><h3 id="tls-1-2-完整握手" tabindex="-1">TLS 1.2 完整握手 <a class="header-anchor" href="#tls-1-2-完整握手" aria-label="Permalink to &quot;TLS 1.2 完整握手&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Client</span></span>
<span class="line"><span class="__shiki_140thh">    participant S as Server</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    Note over C,S: 握手阶段</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: ClientHello&lt;br/&gt;- TLS版本&lt;br/&gt;- 随机数&lt;br/&gt;- 密码套件列表&lt;br/&gt;- 压缩方法&lt;br/&gt;- 扩展</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: ServerHello&lt;br/&gt;- 选择的TLS版本&lt;br/&gt;- 服务器随机数&lt;br/&gt;- 选择的密码套件&lt;br/&gt;- 压缩方法</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: Certificate&lt;br/&gt;- 服务器证书链</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: ServerKeyExchange&lt;br/&gt;- 密钥交换参数（可选）</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: CertificateRequest&lt;br/&gt;- 客户端证书请求（可选）</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: ServerHelloDone</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;C: 验证服务器证书</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    alt 需要客户端证书</span></span>
<span class="line"><span class="__shiki_140thh">        C-&gt;&gt;S: Certificate&lt;br/&gt;- 客户端证书</span></span>
<span class="line"><span class="__shiki_140thh">    end</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: ClientKeyExchange&lt;br/&gt;- 预主密钥（使用服务器公钥加密）</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: CertificateVerify&lt;br/&gt;- 客户端证书签名（如果提供证书）</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: ChangeCipherSpec&lt;br/&gt;- 密码变更通知</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: Finished&lt;br/&gt;- 加密的握手完成消息</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;S: 使用私钥解密预主密钥&lt;br/&gt;生成主密钥和会话密钥</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: ChangeCipherSpec&lt;br/&gt;- 密码变更通知</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: Finished&lt;br/&gt;- 加密的握手完成消息</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C,S: 安全通信阶段</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 应用数据（加密）</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 应用数据（加密）</span></span></code></pre></div><h3 id="tls-1-3-简化握手" tabindex="-1">TLS 1.3 简化握手 <a class="header-anchor" href="#tls-1-3-简化握手" aria-label="Permalink to &quot;TLS 1.3 简化握手&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Client</span></span>
<span class="line"><span class="__shiki_140thh">    participant S as Server</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: ClientHello&lt;br/&gt;- 支持的版本&lt;br/&gt;- 密钥共享&lt;br/&gt;- 签名算法&lt;br/&gt;- 密码套件</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: ServerHello&lt;br/&gt;- 选择的参数&lt;br/&gt;- 密钥共享</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: EncryptedExtensions&lt;br/&gt;- 加密的扩展</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: Certificate&lt;br/&gt;- 服务器证书（可选）</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: CertificateVerify&lt;br/&gt;- 证书验证</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: Finished&lt;br/&gt;- 完成消息</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;C: 验证服务器身份</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: Finished&lt;br/&gt;- 完成消息</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    Note over C,S: 开始安全通信</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 应用数据</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 应用数据</span></span></code></pre></div><h3 id="密钥生成过程" tabindex="-1">密钥生成过程 <a class="header-anchor" href="#密钥生成过程" aria-label="Permalink to &quot;密钥生成过程&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[客户端随机数] --&gt; D[主密钥]</span></span>
<span class="line"><span class="__shiki_140thh">    B[服务器随机数] --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    C[预主密钥] --&gt; D</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[密钥派生函数&lt;br/&gt;PRF]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; F[客户端写MAC密钥]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; G[服务器写MAC密钥]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; H[客户端写加密密钥]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; I[服务器写加密密钥]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; J[客户端写IV]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; K[服务器写IV]</span></span></code></pre></div><h2 id="配置部署" tabindex="-1">6. HTTPS 配置与部署 <a class="header-anchor" href="#配置部署" aria-label="Permalink to &quot;6. HTTPS 配置与部署 {#配置部署}&quot;">​</a></h2><h3 id="nginx-配置示例" tabindex="-1">Nginx 配置示例 <a class="header-anchor" href="#nginx-配置示例" aria-label="Permalink to &quot;Nginx 配置示例&quot;">​</a></h3><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">443</span><span class="__shiki_140thh"> ssl http2;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">example.com;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 证书配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate </span><span class="__shiki_140thh">/path/to/certificate.crt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_certificate_key </span><span class="__shiki_140thh">/path/to/private.key;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL 协议配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_protocols </span><span class="__shiki_140thh">TLSv1.2 TLSv1.3;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 密码套件配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_ciphers </span><span class="__shiki_140thh">ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_prefer_server_ciphers </span><span class="__shiki_dzsirb">off</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 会话缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_cache </span><span class="__shiki_140thh">shared:SSL:10m;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssl_session_timeout </span><span class="__shiki_dzsirb">10m</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全头部</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">Strict-Transport-Security </span><span class="__shiki_mdbnqw">&quot;max-age=63072000&quot;</span><span class="__shiki_140thh"> always;</span></span>
<span class="line"><span class="__shiki_1itgoe">    add_header </span><span class="__shiki_140thh">X-Content-Type-Options nosniff;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 其他配置...</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HTTP 到 HTTPS 重定向</span></span>
<span class="line"><span class="__shiki_1itgoe">server</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    listen </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    server_name </span><span class="__shiki_140thh">example.com;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 301</span><span class="__shiki_140thh"> https://$server_name$request_uri;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="apache-配置示例" tabindex="-1">Apache 配置示例 <a class="header-anchor" href="#apache-配置示例" aria-label="Permalink to &quot;Apache 配置示例&quot;">​</a></h3><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:443</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSL 配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLEngine</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateFile</span><span class="__shiki_140thh"> &quot;/path/to/certificate.crt&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateKeyFile</span><span class="__shiki_140thh"> &quot;/path/to/private.key&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCertificateChainFile</span><span class="__shiki_140thh"> &quot;/path/to/chain.crt&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 协议配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLProtocol</span><span class="__shiki_140thh"> all -SSLv3 -TLSv1 -TLSv1.</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLCipherSuite</span><span class="__shiki_140thh"> ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384</span></span>
<span class="line"><span class="__shiki_1itgoe">    SSLHonorCipherOrder</span><span class="__shiki_1t8gfj"> off</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # HSTS</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_140thh"> always </span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh"> Strict-Transport-Security &quot;max-age=</span><span class="__shiki_dzsirb">63072000</span><span class="__shiki_140thh">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_mdbnqw"> *:80</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerName</span><span class="__shiki_140thh"> example.com</span></span>
<span class="line"><span class="__shiki_1itgoe">    Redirect</span><span class="__shiki_1t8gfj"> permanent</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_mdbnqw"> https://example.com/</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">VirtualHost</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="性能优化" tabindex="-1">7. 性能优化 <a class="header-anchor" href="#性能优化" aria-label="Permalink to &quot;7. 性能优化 {#性能优化}&quot;">​</a></h2><h3 id="tls-性能优化技术" tabindex="-1">TLS 性能优化技术 <a class="header-anchor" href="#tls-性能优化技术" aria-label="Permalink to &quot;TLS 性能优化技术&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[TLS性能优化] --&gt; B[会话恢复]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[OCSP Stapling]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[False Start]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[HTTP/2]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[证书优化]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[会话标识符]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[会话票据]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[减少证书验证延迟]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[提前发送应用数据]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[多路复用]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[头部压缩]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F1[证书链优化]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; F2[密钥选择]</span></span></code></pre></div><h3 id="具体优化措施" tabindex="-1">具体优化措施 <a class="header-anchor" href="#具体优化措施" aria-label="Permalink to &quot;具体优化措施&quot;">​</a></h3><h4 id="_1-会话恢复" tabindex="-1">1. 会话恢复 <a class="header-anchor" href="#_1-会话恢复" aria-label="Permalink to &quot;1. 会话恢复&quot;">​</a></h4><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用会话票据</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_session_tickets </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置会话缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_session_cache </span><span class="__shiki_140thh">shared:SSL:50m;</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_session_timeout </span><span class="__shiki_dzsirb">1d</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_2-ocsp-stapling" tabindex="-1">2. OCSP Stapling <a class="header-anchor" href="#_2-ocsp-stapling" aria-label="Permalink to &quot;2. OCSP Stapling&quot;">​</a></h4><div class="language-nginx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">ssl_stapling </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">ssl_stapling_verify </span><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">resolver </span><span class="__shiki_dzsirb">8.8.8.8</span><span class="__shiki_dzsirb"> 8.8.4.4</span><span class="__shiki_140thh"> valid=300s;</span></span>
<span class="line"><span class="__shiki_1itgoe">resolver_timeout </span><span class="__shiki_dzsirb">5s</span><span class="__shiki_140thh">;</span></span></code></pre></div><h4 id="_3-证书优化" tabindex="-1">3. 证书优化 <a class="header-anchor" href="#_3-证书优化" aria-label="Permalink to &quot;3. 证书优化&quot;">​</a></h4><ul><li>使用 ECC 证书（更小的尺寸，更强的安全性）</li><li>优化证书链长度</li><li>启用证书压缩</li></ul><h2 id="安全考虑" tabindex="-1">8. 安全考虑 <a class="header-anchor" href="#安全考虑" aria-label="Permalink to &quot;8. 安全考虑 {#安全考虑}&quot;">​</a></h2><h3 id="常见攻击与防护" tabindex="-1">常见攻击与防护 <a class="header-anchor" href="#常见攻击与防护" aria-label="Permalink to &quot;常见攻击与防护&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[HTTPS安全威胁] --&gt; B[中间人攻击]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[降级攻击]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[密码套件攻击]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[证书欺诈]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[证书验证]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[HSTS]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[协议限制]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[密码套件限制]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[禁用弱密码]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[前向安全]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[证书透明度]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[OCSP必须装订]</span></span></code></pre></div><h3 id="安全配置检查清单" tabindex="-1">安全配置检查清单 <a class="header-anchor" href="#安全配置检查清单" aria-label="Permalink to &quot;安全配置检查清单&quot;">​</a></h3><ul><li>[ ] 禁用 SSLv2、SSLv3、TLS 1.0、TLS 1.1</li><li>[ ] 启用前向安全（Forward Secrecy）</li><li>[ ] 配置强密码套件</li><li>[ ] 启用 HSTS</li><li>[ ] 配置 OCSP Stapling</li><li>[ ] 定期更新证书</li><li>[ ] 监控证书过期</li><li>[ ] 实施证书透明度</li></ul><h2 id="实际应用" tabindex="-1">9. 实际应用 <a class="header-anchor" href="#实际应用" aria-label="Permalink to &quot;9. 实际应用 {#实际应用}&quot;">​</a></h2><h3 id="https-部署流程" tabindex="-1">HTTPS 部署流程 <a class="header-anchor" href="#https-部署流程" aria-label="Permalink to &quot;HTTPS 部署流程&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">flowchart TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[需求分析] --&gt; B[证书申请]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[服务器配置]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[测试验证]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[监控维护]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[选择证书类型]</span></span>
<span class="line"><span class="__shiki_140thh">    B1 --&gt; B2[生成密钥对]</span></span>
<span class="line"><span class="__shiki_140thh">    B2 --&gt; B3[提交CSR]</span></span>
<span class="line"><span class="__shiki_140thh">    B3 --&gt; B4[验证域名]</span></span>
<span class="line"><span class="__shiki_140thh">    B4 --&gt; B5[获取证书]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[安装证书]</span></span>
<span class="line"><span class="__shiki_140thh">    C1 --&gt; C2[配置Web服务器]</span></span>
<span class="line"><span class="__shiki_140thh">    C2 --&gt; C3[设置重定向]</span></span>
<span class="line"><span class="__shiki_140thh">    C3 --&gt; C4[优化配置]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[功能测试]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[安全测试]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[性能测试]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E1[证书更新]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E2[安全监控]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; E3[漏洞修复]</span></span></code></pre></div><h3 id="混合内容问题解决" tabindex="-1">混合内容问题解决 <a class="header-anchor" href="#混合内容问题解决" aria-label="Permalink to &quot;混合内容问题解决&quot;">​</a></h3><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">&lt;!-- 错误的混合内容 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;http://example.com/script.js&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">img</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;http://cdn.com/image.jpg&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">&lt;!-- 正确的HTTPS内容 --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;https://example.com/script.js&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">img</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;https://cdn.com/image.jpg&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">&lt;!-- 协议相对URL --&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">script</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;//example.com/script.js&quot;</span><span class="__shiki_140thh">&gt;&lt;/</span><span class="__shiki_17hn0y">script</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_17hn0y">img</span><span class="__shiki_1t8gfj"> src</span><span class="__shiki_140thh">=</span><span class="__shiki_mdbnqw">&quot;//cdn.com/image.jpg&quot;</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="开发环境-https" tabindex="-1">开发环境 HTTPS <a class="header-anchor" href="#开发环境-https" aria-label="Permalink to &quot;开发环境 HTTPS&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 生成自签名证书</span></span>
<span class="line"><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> req</span><span class="__shiki_dzsirb"> -x509</span><span class="__shiki_dzsirb"> -newkey</span><span class="__shiki_mdbnqw"> rsa:4096</span><span class="__shiki_dzsirb"> -keyout</span><span class="__shiki_mdbnqw"> key.pem</span><span class="__shiki_dzsirb"> -out</span><span class="__shiki_mdbnqw"> cert.pem</span><span class="__shiki_dzsirb"> -days</span><span class="__shiki_dzsirb"> 365</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用 mkcert 工具（推荐）</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkcert</span><span class="__shiki_dzsirb"> -install</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkcert</span><span class="__shiki_mdbnqw"> localhost</span><span class="__shiki_dzsirb"> 127.0.0.1</span><span class="__shiki_mdbnqw"> ::1</span></span></code></pre></div><h3 id="监控和测试工具" tabindex="-1">监控和测试工具 <a class="header-anchor" href="#监控和测试工具" aria-label="Permalink to &quot;监控和测试工具&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># SSL Labs 测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> s_client</span><span class="__shiki_dzsirb"> -connect</span><span class="__shiki_mdbnqw"> example.com:443</span><span class="__shiki_dzsirb"> -servername</span><span class="__shiki_mdbnqw"> example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查证书信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> x509</span><span class="__shiki_dzsirb"> -in</span><span class="__shiki_mdbnqw"> certificate.crt</span><span class="__shiki_dzsirb"> -text</span><span class="__shiki_dzsirb"> -noout</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用 SSL Labs API</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_mdbnqw"> &quot;https://api.ssllabs.com/api/v3/analyze?host=example.com&quot;</span></span></code></pre></div><hr><p>这份学习笔记详细涵盖了 HTTPS 的实现原理、配置部署、性能优化和安全考虑，为理解和实施 HTTPS 提供了全面的指导。HTTPS 已成为现代 Web 应用的标准安全要求，掌握其实现细节对于构建安全的网络服务至关重要。</p>`,84)])])}const d=a(l,[["render",h]]);export{o as __pageData,d as default};
