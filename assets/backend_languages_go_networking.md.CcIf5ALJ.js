import{_ as a,o as n,c as i,a as _}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Go 网络编程学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/languages/go/networking.md","filePath":"backend/languages/go/networking.md"}'),p={name:"backend/languages/go/networking.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[_(`<h1 id="go-网络编程学习笔记" tabindex="-1">Go 网络编程学习笔记 <a class="header-anchor" href="#go-网络编程学习笔记" aria-label="Permalink to &quot;Go 网络编程学习笔记&quot;">​</a></h1><h2 id="目录" tabindex="-1">目录 <a class="header-anchor" href="#目录" aria-label="Permalink to &quot;目录&quot;">​</a></h2><ol><li><a href="#网络基础概念">网络基础概念</a></li><li><a href="#tcp-编程">TCP 编程</a></li><li><a href="#udp-编程">UDP 编程</a></li><li><a href="#http-编程">HTTP 编程</a></li><li><a href="#websocket-编程">WebSocket 编程</a></li><li><a href="#并发模型">并发模型</a></li><li><a href="#性能优化">性能优化</a></li><li><a href="#最佳实践">最佳实践</a></li></ol><hr><h2 id="网络基础概念" tabindex="-1">网络基础概念 <a class="header-anchor" href="#网络基础概念" aria-label="Permalink to &quot;网络基础概念&quot;">​</a></h2><h3 id="osi-模型与-tcp-ip-协议栈" tabindex="-1">OSI 模型与 TCP/IP 协议栈 <a class="header-anchor" href="#osi-模型与-tcp-ip-协议栈" aria-label="Permalink to &quot;OSI 模型与 TCP/IP 协议栈&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">| OSI 层     | TCP/IP 层    | 协议示例          |</span></span>
<span class="line"><span class="__shiki_140thh">|------------|-------------|------------------|</span></span>
<span class="line"><span class="__shiki_140thh">| 应用层     | 应用层      | HTTP, FTP, SMTP |</span></span>
<span class="line"><span class="__shiki_140thh">| 表示层     |             |                  |</span></span>
<span class="line"><span class="__shiki_140thh">| 会话层     |             |                  |</span></span>
<span class="line"><span class="__shiki_140thh">| 传输层     | 传输层      | TCP, UDP        |</span></span>
<span class="line"><span class="__shiki_140thh">| 网络层     | 网络层      | IP, ICMP        |</span></span>
<span class="line"><span class="__shiki_140thh">| 数据链路层 | 网络接口层  | Ethernet, ARP   |</span></span>
<span class="line"><span class="__shiki_140thh">| 物理层     |             |                  |</span></span></code></pre></div><h3 id="关键术语" tabindex="-1">关键术语 <a class="header-anchor" href="#关键术语" aria-label="Permalink to &quot;关键术语&quot;">​</a></h3><ul><li><strong>TCP</strong>: 面向连接、可靠传输、流式协议</li><li><strong>UDP</strong>: 无连接、不可靠、数据报协议</li><li><strong>IP 地址</strong>: 网络设备标识 (IPv4, IPv6)</li><li><strong>端口</strong>: 应用标识 (0-65535)</li><li><strong>Socket</strong>: 网络通信端点</li></ul><hr><h2 id="tcp-编程" tabindex="-1">TCP 编程 <a class="header-anchor" href="#tcp-编程" aria-label="Permalink to &quot;TCP 编程&quot;">​</a></h2><h3 id="tcp-服务器" tabindex="-1">TCP 服务器 <a class="header-anchor" href="#tcp-服务器" aria-label="Permalink to &quot;TCP 服务器&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">bufio</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">net</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> handleConnection</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">conn</span><span class="__shiki_1t8gfj"> net</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Conn</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">	defer</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 读取客户端数据</span></span>
<span class="line"><span class="__shiki_140thh">	reader </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bufio.</span><span class="__shiki_1t8gfj">NewReader</span><span class="__shiki_140thh">(conn)</span></span>
<span class="line"><span class="__shiki_140thh">	message, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> reader.</span><span class="__shiki_1t8gfj">ReadString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;读取数据错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 处理并返回响应</span></span>
<span class="line"><span class="__shiki_140thh">	response </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;已接收: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, message)</span></span>
<span class="line"><span class="__shiki_140thh">	conn.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(response))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 监听端口</span></span>
<span class="line"><span class="__shiki_140thh">	listener, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">Listen</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tcp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;:8080&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;监听错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1itgoe">	defer</span><span class="__shiki_140thh"> listener.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;TCP 服务器启动，监听端口 8080...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">	for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 接受连接</span></span>
<span class="line"><span class="__shiki_140thh">		conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> listener.</span><span class="__shiki_1t8gfj">Accept</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;接受连接错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">			continue</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">		</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 处理连接</span></span>
<span class="line"><span class="__shiki_1itgoe">		go</span><span class="__shiki_1t8gfj"> handleConnection</span><span class="__shiki_140thh">(conn)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="tcp-客户端" tabindex="-1">TCP 客户端 <a class="header-anchor" href="#tcp-客户端" aria-label="Permalink to &quot;TCP 客户端&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">bufio</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">net</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">os</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 连接服务器</span></span>
<span class="line"><span class="__shiki_140thh">	conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">Dial</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tcp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;localhost:8080&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;连接错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1itgoe">	defer</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 读取用户输入</span></span>
<span class="line"><span class="__shiki_140thh">	reader </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bufio.</span><span class="__shiki_1t8gfj">NewReader</span><span class="__shiki_140thh">(os.Stdin)</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;输入消息: &quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	message, _ </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> reader.</span><span class="__shiki_1t8gfj">ReadString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 发送数据</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Fprintf</span><span class="__shiki_140thh">(conn, message)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 接收响应</span></span>
<span class="line"><span class="__shiki_140thh">	response, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bufio.</span><span class="__shiki_1t8gfj">NewReader</span><span class="__shiki_140thh">(conn).</span><span class="__shiki_1t8gfj">ReadString</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;读取响应错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;服务器响应: &quot;</span><span class="__shiki_140thh">, response)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="udp-编程" tabindex="-1">UDP 编程 <a class="header-anchor" href="#udp-编程" aria-label="Permalink to &quot;UDP 编程&quot;">​</a></h2><h3 id="udp-服务器" tabindex="-1">UDP 服务器 <a class="header-anchor" href="#udp-服务器" aria-label="Permalink to &quot;UDP 服务器&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">net</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 创建 UDP 地址</span></span>
<span class="line"><span class="__shiki_140thh">	udpAddr, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">ResolveUDPAddr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;udp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;:8081&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;解析地址错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 监听 UDP 端口</span></span>
<span class="line"><span class="__shiki_140thh">	conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">ListenUDP</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;udp&quot;</span><span class="__shiki_140thh">, udpAddr)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;监听错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1itgoe">	defer</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;UDP 服务器启动，监听端口 8081...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	buffer </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 读取数据</span></span>
<span class="line"><span class="__shiki_140thh">		n, addr, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">ReadFromUDP</span><span class="__shiki_140thh">(buffer)</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;读取错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">			continue</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">		</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 处理数据</span></span>
<span class="line"><span class="__shiki_140thh">		message </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(buffer[:n])</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;收到来自 </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> 的消息: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, addr.</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">(), message)</span></span>
<span class="line"><span class="__shiki_140thh">		</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 发送响应</span></span>
<span class="line"><span class="__shiki_140thh">		response </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;UDP 响应: &quot;</span><span class="__shiki_1itgoe"> +</span><span class="__shiki_140thh"> message)</span></span>
<span class="line"><span class="__shiki_140thh">		_, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">WriteToUDP</span><span class="__shiki_140thh">(response, addr)</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;发送响应错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="udp-客户端" tabindex="-1">UDP 客户端 <a class="header-anchor" href="#udp-客户端" aria-label="Permalink to &quot;UDP 客户端&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">net</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 解析服务器地址</span></span>
<span class="line"><span class="__shiki_140thh">	udpAddr, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">ResolveUDPAddr</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;udp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;localhost:8081&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;解析地址错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 创建连接</span></span>
<span class="line"><span class="__shiki_140thh">	conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">DialUDP</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;udp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">, udpAddr)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;连接错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1itgoe">	defer</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 发送消息</span></span>
<span class="line"><span class="__shiki_140thh">	message </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello UDP Server!&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	_, err </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Write</span><span class="__shiki_140thh">(message)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;发送错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 接收响应</span></span>
<span class="line"><span class="__shiki_140thh">	buffer </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">([]</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	n, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Read</span><span class="__shiki_140thh">(buffer)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;读取错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;服务器响应: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(buffer[:n]))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="http-编程" tabindex="-1">HTTP 编程 <a class="header-anchor" href="#http-编程" aria-label="Permalink to &quot;HTTP 编程&quot;">​</a></h2><h3 id="http-服务器" tabindex="-1">HTTP 服务器 <a class="header-anchor" href="#http-服务器" aria-label="Permalink to &quot;HTTP 服务器&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">net/http</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> helloHandler</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Fprintf</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;Hello, </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">!&quot;</span><span class="__shiki_140thh">, r.URL.Path[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">:])</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">	http.</span><span class="__shiki_1t8gfj">HandleFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/hello/&quot;</span><span class="__shiki_140thh">, helloHandler)</span></span>
<span class="line"><span class="__shiki_140thh">	http.</span><span class="__shiki_1t8gfj">HandleFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Fprint</span><span class="__shiki_140thh">(w, </span><span class="__shiki_mdbnqw">&quot;欢迎访问 Go HTTP 服务器!&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	})</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;HTTP 服务器启动，监听端口 8080...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_1t8gfj">ListenAndServe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;:8080&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;服务器启动错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="http-客户端" tabindex="-1">HTTP 客户端 <a class="header-anchor" href="#http-客户端" aria-label="Permalink to &quot;HTTP 客户端&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">io/ioutil</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">net/http</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// GET 请求</span></span>
<span class="line"><span class="__shiki_140thh">	resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> http.</span><span class="__shiki_1t8gfj">Get</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;http://localhost:8080/hello/World&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GET 请求错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1itgoe">	defer</span><span class="__shiki_140thh"> resp.Body.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 读取响应</span></span>
<span class="line"><span class="__shiki_140thh">	body, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> ioutil.</span><span class="__shiki_1t8gfj">ReadAll</span><span class="__shiki_140thh">(resp.Body)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;读取响应错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;响应状态码:&quot;</span><span class="__shiki_140thh">, resp.StatusCode)</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;响应内容:&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">(body))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="websocket-编程" tabindex="-1">WebSocket 编程 <a class="header-anchor" href="#websocket-编程" aria-label="Permalink to &quot;WebSocket 编程&quot;">​</a></h2><p>使用 <code>gorilla/websocket</code> 库:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1t8gfj">go</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> github.com/gorilla/websocket</span></span></code></pre></div><h3 id="websocket-服务器" tabindex="-1">WebSocket 服务器 <a class="header-anchor" href="#websocket-服务器" aria-label="Permalink to &quot;WebSocket 服务器&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">net/http</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_mdbnqw">	&quot;</span><span class="__shiki_1t8gfj">github.com/gorilla/websocket</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> upgrader </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> websocket</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Upgrader</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">	ReadBufferSize:  </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">	WriteBufferSize: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> wsHandler</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">w</span><span class="__shiki_1t8gfj"> http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ResponseWriter</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">r</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">http</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Request</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 升级为 WebSocket 连接</span></span>
<span class="line"><span class="__shiki_140thh">	conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> upgrader.</span><span class="__shiki_1t8gfj">Upgrade</span><span class="__shiki_140thh">(w, r, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">	if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;升级为 WebSocket 失败:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">		return</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_1itgoe">	defer</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;客户端连接成功&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 读取消息</span></span>
<span class="line"><span class="__shiki_140thh">		messageType, p, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">ReadMessage</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;读取消息错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">			return</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">		</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 处理消息</span></span>
<span class="line"><span class="__shiki_140thh">		msg </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">(p)</span></span>
<span class="line"><span class="__shiki_140thh">		fmt.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;收到消息: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, msg)</span></span>
<span class="line"><span class="__shiki_140thh">		</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 发送响应</span></span>
<span class="line"><span class="__shiki_140thh">		response </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;服务器收到: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, msg)</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> conn.</span><span class="__shiki_1t8gfj">WriteMessage</span><span class="__shiki_140thh">(messageType, []</span><span class="__shiki_1itgoe">byte</span><span class="__shiki_140thh">(response)); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;发送消息错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">			return</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">	http.</span><span class="__shiki_1t8gfj">HandleFunc</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;/ws&quot;</span><span class="__shiki_140thh">, wsHandler)</span></span>
<span class="line"><span class="__shiki_140thh">	fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;WebSocket 服务器启动，监听端口 8080...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	log.</span><span class="__shiki_1t8gfj">Fatal</span><span class="__shiki_140thh">(http.</span><span class="__shiki_1t8gfj">ListenAndServe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;:8080&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">nil</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="并发模型" tabindex="-1">并发模型 <a class="header-anchor" href="#并发模型" aria-label="Permalink to &quot;并发模型&quot;">​</a></h2><h3 id="goroutine-和-channel" tabindex="-1">Goroutine 和 Channel <a class="header-anchor" href="#goroutine-和-channel" aria-label="Permalink to &quot;Goroutine 和 Channel&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> handleConnections</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">listener</span><span class="__shiki_1t8gfj"> net</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Listener</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">	for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> listener.</span><span class="__shiki_1t8gfj">Accept</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">			log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;接受连接错误:&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">			continue</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">		</span></span>
<span class="line"><span class="__shiki_21nrsd">		// 每个连接启动一个 goroutine</span></span>
<span class="line"><span class="__shiki_1itgoe">		go</span><span class="__shiki_1t8gfj"> handleConnection</span><span class="__shiki_140thh">(conn)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用 channel 控制并发数量</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> handleConnectionsWithPool</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">listener</span><span class="__shiki_1t8gfj"> net</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Listener</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">	// 创建连接池 (100个并发)</span></span>
<span class="line"><span class="__shiki_140thh">	connPool </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">	</span></span>
<span class="line"><span class="__shiki_1itgoe">	for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">		connPool </span><span class="__shiki_1itgoe">&lt;-</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh">{}{} </span><span class="__shiki_21nrsd">// 获取令牌</span></span>
<span class="line"><span class="__shiki_140thh">		</span></span>
<span class="line"><span class="__shiki_140thh">		conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> listener.</span><span class="__shiki_1t8gfj">Accept</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">		if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">			&lt;-</span><span class="__shiki_140thh">connPool</span></span>
<span class="line"><span class="__shiki_1itgoe">			continue</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"><span class="__shiki_140thh">		</span></span>
<span class="line"><span class="__shiki_1itgoe">		go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">c</span><span class="__shiki_1t8gfj"> net</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Conn</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">			handleConnection</span><span class="__shiki_140thh">(c)</span></span>
<span class="line"><span class="__shiki_1itgoe">			&lt;-</span><span class="__shiki_140thh">connPool </span><span class="__shiki_21nrsd">// 释放令牌</span></span>
<span class="line"><span class="__shiki_140thh">		}(conn)</span></span>
<span class="line"><span class="__shiki_140thh">	}</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><hr><h2 id="性能优化" tabindex="-1">性能优化 <a class="header-anchor" href="#性能优化" aria-label="Permalink to &quot;性能优化&quot;">​</a></h2><ol><li><p><strong>连接池管理</strong></p><ul><li>复用 TCP 连接</li><li>设置合理的 Keep-Alive 时间</li></ul></li><li><p><strong>缓冲区优化</strong></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用缓冲读写器</span></span>
<span class="line"><span class="__shiki_140thh">reader </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bufio.</span><span class="__shiki_1t8gfj">NewReaderSize</span><span class="__shiki_140thh">(conn, </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">writer </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> bufio.</span><span class="__shiki_1t8gfj">NewWriterSize</span><span class="__shiki_140thh">(conn, </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_140thh">)</span></span></code></pre></div></li><li><p><strong>I/O 多路复用</strong></p><ul><li>使用 <code>netpoll</code> 或 <code>gnet</code> 等高性能网络库</li></ul></li><li><p><strong>协议优化</strong></p><ul><li>使用 Protocol Buffers 代替 JSON</li><li>压缩传输数据</li></ul></li></ol><hr><h2 id="最佳实践" tabindex="-1">最佳实践 <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践&quot;">​</a></h2><ol><li><p><strong>错误处理</strong></p><ul><li>始终检查网络操作的错误</li><li>实现重试机制</li></ul></li><li><p><strong>超时控制</strong></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 设置连接超时</span></span>
<span class="line"><span class="__shiki_140thh">conn, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> net.</span><span class="__shiki_1t8gfj">DialTimeout</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;tcp&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;example.com:80&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 设置读写超时</span></span>
<span class="line"><span class="__shiki_140thh">conn.</span><span class="__shiki_1t8gfj">SetReadDeadline</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second))</span></span>
<span class="line"><span class="__shiki_140thh">conn.</span><span class="__shiki_1t8gfj">SetWriteDeadline</span><span class="__shiki_140thh">(time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Add</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> time.Second))</span></span></code></pre></div></li><li><p><strong>安全考虑</strong></p><ul><li>使用 TLS 加密通信</li><li>验证输入数据</li><li>限制资源使用</li></ul></li><li><p><strong>日志记录</strong></p><ul><li>记录关键操作和错误</li><li>使用结构化日志</li></ul></li><li><p><strong>优雅关闭</strong></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 捕获中断信号</span></span>
<span class="line"><span class="__shiki_140thh">sigCh </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">chan</span><span class="__shiki_1t8gfj"> os</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Signal</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">signal.</span><span class="__shiki_1t8gfj">Notify</span><span class="__shiki_140thh">(sigCh, syscall.SIGINT, syscall.SIGTERM)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">go</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe"> 	&lt;-</span><span class="__shiki_140thh">sigCh</span></span>
<span class="line"><span class="__shiki_140thh"> 	fmt.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;接收到关闭信号，优雅关闭中...&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh"> 	</span></span>
<span class="line"><span class="__shiki_21nrsd"> 	// 关闭监听器</span></span>
<span class="line"><span class="__shiki_140thh"> 	listener.</span><span class="__shiki_1t8gfj">Close</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh"> 	</span></span>
<span class="line"><span class="__shiki_21nrsd"> 	// 等待处理中的连接完成</span></span>
<span class="line"><span class="__shiki_21nrsd"> 	// ...</span></span>
<span class="line"><span class="__shiki_140thh"> 	</span></span>
<span class="line"><span class="__shiki_140thh"> 	os.</span><span class="__shiki_1t8gfj">Exit</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh"> }()</span></span></code></pre></div></li></ol><hr><blockquote><p><strong>提示</strong>: Go 的标准库提供了强大的网络编程能力，结合 goroutine 的并发模型，可以轻松构建高性能的网络应用。在实际开发中，应根据具体需求选择合适的协议和模式。</p></blockquote>`,45)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
