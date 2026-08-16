import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"操作系统知识 - 进程间通信 - 套接字","description":"","frontmatter":{},"headers":[],"relativePath":"backend/os/ipc/sockets.md","filePath":"backend/os/ipc/sockets.md"}'),p={name:"backend/os/ipc/sockets.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="操作系统知识-进程间通信-套接字" tabindex="-1">操作系统知识 - 进程间通信 - 套接字 <a class="header-anchor" href="#操作系统知识-进程间通信-套接字" aria-label="Permalink to &quot;操作系统知识 - 进程间通信 - 套接字&quot;">​</a></h1><h2 id="_1-套接字基础概念" tabindex="-1">1. 套接字基础概念 <a class="header-anchor" href="#_1-套接字基础概念" aria-label="Permalink to &quot;1. 套接字基础概念&quot;">​</a></h2><h3 id="_1-1-什么是套接字" tabindex="-1">1.1 什么是套接字 <a class="header-anchor" href="#_1-1-什么是套接字" aria-label="Permalink to &quot;1.1 什么是套接字&quot;">​</a></h3><ul><li><strong>套接字</strong>是网络编程的端点，是支持TCP/IP协议的网络通信的基本操作单元</li><li>提供了不同主机间进程通信的能力，也可以用于同一主机的进程间通信</li><li>是应用层与传输层之间的接口</li></ul><h3 id="_1-2-套接字的特点" tabindex="-1">1.2 套接字的特点 <a class="header-anchor" href="#_1-2-套接字的特点" aria-label="Permalink to &quot;1.2 套接字的特点&quot;">​</a></h3><ul><li><strong>通用性</strong>：支持不同协议（TCP、UDP等）</li><li><strong>灵活性</strong>：可用于本地和网络通信</li><li><strong>双向通信</strong>：全双工通信通道</li><li><strong>跨平台</strong>：标准化的编程接口</li></ul><h3 id="_1-3-套接字通信的基本流程" tabindex="-1">1.3 套接字通信的基本流程 <a class="header-anchor" href="#_1-3-套接字通信的基本流程" aria-label="Permalink to &quot;1.3 套接字通信的基本流程&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">客户端：socket() → connect() → send()/recv() → close()</span></span>
<span class="line"><span class="__shiki_wvjl67">服务端：socket() → bind() → listen() → accept() → send()/recv() → close()</span></span></code></pre></div><h2 id="_2-套接字类型和协议" tabindex="-1">2. 套接字类型和协议 <a class="header-anchor" href="#_2-套接字类型和协议" aria-label="Permalink to &quot;2. 套接字类型和协议&quot;">​</a></h2><h3 id="_2-1-主要套接字类型" tabindex="-1">2.1 主要套接字类型 <a class="header-anchor" href="#_2-1-主要套接字类型" aria-label="Permalink to &quot;2.1 主要套接字类型&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 流式套接字（TCP）</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> tcp_socket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_STREAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 数据报套接字（UDP）</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> udp_socket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_DGRAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 原始套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> raw_socket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_RAW, IPPROTO_RAW);</span></span></code></pre></div><h3 id="_2-2-地址族" tabindex="-1">2.2 地址族 <a class="header-anchor" href="#_2-2-地址族" aria-label="Permalink to &quot;2.2 地址族&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// IPv4 地址族</span></span>
<span class="line"><span class="__shiki_140thh">AF_INET</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// IPv6 地址族  </span></span>
<span class="line"><span class="__shiki_140thh">AF_INET6</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 本地通信（同一主机）</span></span>
<span class="line"><span class="__shiki_140thh">AF_UNIX 或 AF_LOCAL</span></span></code></pre></div><h2 id="_3-套接字地址结构" tabindex="-1">3. 套接字地址结构 <a class="header-anchor" href="#_3-套接字地址结构" aria-label="Permalink to &quot;3. 套接字地址结构&quot;">​</a></h2><h3 id="_3-1-通用套接字地址结构" tabindex="-1">3.1 通用套接字地址结构 <a class="header-anchor" href="#_3-1-通用套接字地址结构" aria-label="Permalink to &quot;3.1 通用套接字地址结构&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr {</span></span>
<span class="line"><span class="__shiki_dzsirb">    sa_family_t</span><span class="__shiki_140thh"> sa_family;</span><span class="__shiki_21nrsd">    // 地址族</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33">        sa_data</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">14</span><span class="__shiki_140thh">];</span><span class="__shiki_21nrsd">  // 地址数据</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-2-ipv4-地址结构" tabindex="-1">3.2 IPv4 地址结构 <a class="header-anchor" href="#_3-2-ipv4-地址结构" aria-label="Permalink to &quot;3.2 IPv4 地址结构&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;netinet/in.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> in_addr {</span></span>
<span class="line"><span class="__shiki_1itgoe">    in_addr_t</span><span class="__shiki_140thh"> s_addr;</span><span class="__shiki_21nrsd">         // 32位IPv4地址</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr_in {</span></span>
<span class="line"><span class="__shiki_dzsirb">    sa_family_t</span><span class="__shiki_140thh">    sin_family;</span><span class="__shiki_21nrsd">   // 地址族：AF_INET</span></span>
<span class="line"><span class="__shiki_1itgoe">    in_port_t</span><span class="__shiki_140thh">      sin_port;</span><span class="__shiki_21nrsd">     // 16位端口号，网络字节序</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> in_addr sin_addr;</span><span class="__shiki_21nrsd">     // IPv4地址</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33">           sin_zero</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">];</span><span class="__shiki_21nrsd">  // 填充字段</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-3-ipv6-地址结构" tabindex="-1">3.3 IPv6 地址结构 <a class="header-anchor" href="#_3-3-ipv6-地址结构" aria-label="Permalink to &quot;3.3 IPv6 地址结构&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> in6_addr {</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint8_t</span><span class="__shiki_1jdh33"> s6_addr</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">];</span><span class="__shiki_21nrsd">      // 128位IPv6地址</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr_in6 {</span></span>
<span class="line"><span class="__shiki_dzsirb">    sa_family_t</span><span class="__shiki_140thh">     sin6_family;</span><span class="__shiki_21nrsd">   // 地址族：AF_INET6</span></span>
<span class="line"><span class="__shiki_1itgoe">    in_port_t</span><span class="__shiki_140thh">       sin6_port;</span><span class="__shiki_21nrsd">     // 端口号，网络字节序</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint32_t</span><span class="__shiki_140thh">        sin6_flowinfo;</span><span class="__shiki_21nrsd"> // IPv6流信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> in6_addr sin6_addr;</span><span class="__shiki_21nrsd">     // IPv6地址</span></span>
<span class="line"><span class="__shiki_1itgoe">    uint32_t</span><span class="__shiki_140thh">        sin6_scope_id;</span><span class="__shiki_21nrsd"> // 范围ID</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h3 id="_3-4-本地套接字地址结构" tabindex="-1">3.4 本地套接字地址结构 <a class="header-anchor" href="#_3-4-本地套接字地址结构" aria-label="Permalink to &quot;3.4 本地套接字地址结构&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/un.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr_un {</span></span>
<span class="line"><span class="__shiki_dzsirb">    sa_family_t</span><span class="__shiki_140thh"> sun_family;</span><span class="__shiki_21nrsd">        // 地址族：AF_UNIX</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33">        sun_path</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">108</span><span class="__shiki_140thh">];</span><span class="__shiki_21nrsd">     // 路径名</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_4-字节序转换函数" tabindex="-1">4. 字节序转换函数 <a class="header-anchor" href="#_4-字节序转换函数" aria-label="Permalink to &quot;4. 字节序转换函数&quot;">​</a></h2><h3 id="_4-1-主机字节序与网络字节序" tabindex="-1">4.1 主机字节序与网络字节序 <a class="header-anchor" href="#_4-1-主机字节序与网络字节序" aria-label="Permalink to &quot;4.1 主机字节序与网络字节序&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;arpa/inet.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 主机到网络字节序转换</span></span>
<span class="line"><span class="__shiki_1itgoe">uint32_t</span><span class="__shiki_1t8gfj"> htonl</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">uint32_t</span><span class="__shiki_1jdh33"> hostlong</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">    // 长整型（32位）</span></span>
<span class="line"><span class="__shiki_1itgoe">uint16_t</span><span class="__shiki_1t8gfj"> htons</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">uint16_t</span><span class="__shiki_1jdh33"> hostshort</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">   // 短整型（16位）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 网络到主机字节序转换</span></span>
<span class="line"><span class="__shiki_1itgoe">uint32_t</span><span class="__shiki_1t8gfj"> ntohl</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">uint32_t</span><span class="__shiki_1jdh33"> netlong</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">uint16_t</span><span class="__shiki_1t8gfj"> ntohs</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">uint16_t</span><span class="__shiki_1jdh33"> netshort</span><span class="__shiki_140thh">);</span></span></code></pre></div><h3 id="_4-2-地址转换函数" tabindex="-1">4.2 地址转换函数 <a class="header-anchor" href="#_4-2-地址转换函数" aria-label="Permalink to &quot;4.2 地址转换函数&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;arpa/inet.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 点分十进制字符串 → 网络字节序二进制</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> inet_pton</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> af</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">src</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">dst</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 网络字节序二进制 → 点分十进制字符串</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">inet_ntop</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> af</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">src</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">dst</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">socklen_t</span><span class="__shiki_1jdh33"> size</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 传统转换函数（已废弃，但常见于旧代码）</span></span>
<span class="line"><span class="__shiki_1itgoe">in_addr_t</span><span class="__shiki_1t8gfj"> inet_addr</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">cp</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">           // 字符串 → 二进制</span></span>
<span class="line"><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">inet_ntoa</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> in_addr </span><span class="__shiki_1jdh33">in</span><span class="__shiki_140thh">);</span><span class="__shiki_21nrsd">            // 二进制 → 字符串</span></span></code></pre></div><h2 id="_5-tcp-套接字编程" tabindex="-1">5. TCP 套接字编程 <a class="header-anchor" href="#_5-tcp-套接字编程" aria-label="Permalink to &quot;5. TCP 套接字编程&quot;">​</a></h2><h3 id="_5-1-tcp-服务端实现" tabindex="-1">5.1 TCP 服务端实现 <a class="header-anchor" href="#_5-1-tcp-服务端实现" aria-label="Permalink to &quot;5.1 TCP 服务端实现&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;netinet/in.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;arpa/inet.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> PORT</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BACKLOG</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_SIZE</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> server_fd, new_socket;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in address;</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> opt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> addrlen </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(address);</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[BUFFER_SIZE] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">};</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">hello </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Hello from server&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((server_fd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_STREAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;socket failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 设置套接字选项</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">setsockopt</span><span class="__shiki_140thh">(server_fd, SOL_SOCKET, SO_REUSEADDR </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> SO_REUSEPORT, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">opt, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(opt))) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;setsockopt&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 绑定地址</span></span>
<span class="line"><span class="__shiki_140thh">    address.sin_family </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AF_INET;</span></span>
<span class="line"><span class="__shiki_140thh">    address.sin_addr.s_addr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> INADDR_ANY;</span><span class="__shiki_21nrsd">  // 监听所有接口</span></span>
<span class="line"><span class="__shiki_140thh">    address.sin_port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> htons</span><span class="__shiki_140thh">(PORT);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(server_fd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">address, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(address)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bind failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 开始监听</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">listen</span><span class="__shiki_140thh">(server_fd, BACKLOG) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;listen&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Server listening on port </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, PORT);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 5. 接受连接</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> ((new_socket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> accept</span><span class="__shiki_140thh">(server_fd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">address, </span></span>
<span class="line"><span class="__shiki_140thh">                                (</span><span class="__shiki_dzsirb">socklen_t</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">addrlen)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accept&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">            exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 显示客户端信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        char</span><span class="__shiki_1jdh33"> client_ip</span><span class="__shiki_140thh">[INET_ADDRSTRLEN];</span></span>
<span class="line"><span class="__shiki_1t8gfj">        inet_ntop</span><span class="__shiki_140thh">(AF_INET, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">(address.sin_addr), client_ip, INET_ADDRSTRLEN);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Connection accepted from </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">               client_ip, </span><span class="__shiki_1t8gfj">ntohs</span><span class="__shiki_140thh">(address.sin_port));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 6. 读取客户端数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssize_t</span><span class="__shiki_140thh"> bytes_read </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> read</span><span class="__shiki_140thh">(new_socket, buffer, BUFFER_SIZE);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, buffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 7. 发送响应</span></span>
<span class="line"><span class="__shiki_1t8gfj">        send</span><span class="__shiki_140thh">(new_socket, hello, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(hello), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello message sent</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 8. 关闭连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">        close</span><span class="__shiki_140thh">(new_socket);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 清空缓冲区</span></span>
<span class="line"><span class="__shiki_1t8gfj">        memset</span><span class="__shiki_140thh">(buffer, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, BUFFER_SIZE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(server_fd);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-tcp-客户端实现" tabindex="-1">5.2 TCP 客户端实现 <a class="header-anchor" href="#_5-2-tcp-客户端实现" aria-label="Permalink to &quot;5.2 TCP 客户端实现&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;netinet/in.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;arpa/inet.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> PORT</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_SIZE</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> sock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in serv_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">hello </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Hello from client&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[BUFFER_SIZE] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">};</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((sock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_STREAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Socket creation error&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 设置服务器地址</span></span>
<span class="line"><span class="__shiki_140thh">    serv_addr.sin_family </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AF_INET;</span></span>
<span class="line"><span class="__shiki_140thh">    serv_addr.sin_port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> htons</span><span class="__shiki_140thh">(PORT);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 转换IP地址</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">inet_pton</span><span class="__shiki_140thh">(AF_INET, </span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">serv_addr.sin_addr) </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Invalid address/ Address not supported&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 连接服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(sock, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">serv_addr, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(serv_addr)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Connection Failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 发送数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">    send</span><span class="__shiki_140thh">(sock, hello, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(hello), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello message sent</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 读取响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssize_t</span><span class="__shiki_140thh"> bytes_read </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> read</span><span class="__shiki_140thh">(sock, buffer, BUFFER_SIZE);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Server response: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, buffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 关闭套接字</span></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(sock);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-udp-套接字编程" tabindex="-1">6. UDP 套接字编程 <a class="header-anchor" href="#_6-udp-套接字编程" aria-label="Permalink to &quot;6. UDP 套接字编程&quot;">​</a></h2><h3 id="_6-1-udp-服务端实现" tabindex="-1">6.1 UDP 服务端实现 <a class="header-anchor" href="#_6-1-udp-服务端实现" aria-label="Permalink to &quot;6.1 UDP 服务端实现&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;netinet/in.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;arpa/inet.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> PORT</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_SIZE</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> sockfd;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in serv_addr, cli_addr;</span></span>
<span class="line"><span class="__shiki_dzsirb">    socklen_t</span><span class="__shiki_140thh"> len;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[BUFFER_SIZE];</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">hello </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Hello from UDP server&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建UDP套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((sockfd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_DGRAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;socket creation failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 设置服务器地址</span></span>
<span class="line"><span class="__shiki_140thh">    serv_addr.sin_family </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AF_INET;</span></span>
<span class="line"><span class="__shiki_140thh">    serv_addr.sin_addr.s_addr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> INADDR_ANY;</span></span>
<span class="line"><span class="__shiki_140thh">    serv_addr.sin_port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> htons</span><span class="__shiki_140thh">(PORT);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 绑定地址</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(sockfd, (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">serv_addr, </span></span>
<span class="line"><span class="__shiki_1itgoe">             sizeof</span><span class="__shiki_140thh">(serv_addr)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bind failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;UDP Server listening on port </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, PORT);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    len </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(cli_addr);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 4. 接收数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        ssize_t</span><span class="__shiki_140thh"> n </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> recvfrom</span><span class="__shiki_140thh">(sockfd, (</span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">)buffer, BUFFER_SIZE, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                           (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">cli_addr, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">len);</span></span>
<span class="line"><span class="__shiki_1jdh33">        buffer</span><span class="__shiki_140thh">[n] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\0</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 显示客户端信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        char</span><span class="__shiki_1jdh33"> client_ip</span><span class="__shiki_140thh">[INET_ADDRSTRLEN];</span></span>
<span class="line"><span class="__shiki_1t8gfj">        inet_ntop</span><span class="__shiki_140thh">(AF_INET, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">(cli_addr.sin_addr), client_ip, INET_ADDRSTRLEN);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received from </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">               client_ip, </span><span class="__shiki_1t8gfj">ntohs</span><span class="__shiki_140thh">(cli_addr.sin_port), buffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 5. 发送响应</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sendto</span><span class="__shiki_140thh">(sockfd, (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">)hello, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(hello), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">               (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">cli_addr, len);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Response sent.</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(sockfd);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-udp-客户端实现" tabindex="-1">6.2 UDP 客户端实现 <a class="header-anchor" href="#_6-2-udp-客户端实现" aria-label="Permalink to &quot;6.2 UDP 客户端实现&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;netinet/in.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;arpa/inet.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> PORT</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_SIZE</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> sockfd;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in serv_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">hello </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Hello from UDP client&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[BUFFER_SIZE];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建UDP套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((sockfd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_DGRAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;socket creation failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 设置服务器地址</span></span>
<span class="line"><span class="__shiki_140thh">    serv_addr.sin_family </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AF_INET;</span></span>
<span class="line"><span class="__shiki_140thh">    serv_addr.sin_port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> htons</span><span class="__shiki_140thh">(PORT);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">inet_pton</span><span class="__shiki_140thh">(AF_INET, </span><span class="__shiki_mdbnqw">&quot;127.0.0.1&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">serv_addr.sin_addr) </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Invalid address&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">    socklen_t</span><span class="__shiki_140thh"> len </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(serv_addr);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 发送数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sendto</span><span class="__shiki_140thh">(sockfd, (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">)hello, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(hello), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">           (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">serv_addr, len);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Hello message sent.</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 接收响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssize_t</span><span class="__shiki_140thh"> n </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> recvfrom</span><span class="__shiki_140thh">(sockfd, (</span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">)buffer, BUFFER_SIZE, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                         (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">serv_addr, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">len);</span></span>
<span class="line"><span class="__shiki_1jdh33">    buffer</span><span class="__shiki_140thh">[n] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\0</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Server : </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, buffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 关闭套接字</span></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(sockfd);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-本地套接字-unix-domain-socket" tabindex="-1">7. 本地套接字（Unix Domain Socket） <a class="header-anchor" href="#_7-本地套接字-unix-domain-socket" aria-label="Permalink to &quot;7. 本地套接字（Unix Domain Socket）&quot;">​</a></h2><h3 id="_7-1-本地套接字服务端" tabindex="-1">7.1 本地套接字服务端 <a class="header-anchor" href="#_7-1-本地套接字服务端" aria-label="Permalink to &quot;7.1 本地套接字服务端&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/un.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> SOCKET_PATH</span><span class="__shiki_mdbnqw"> &quot;/tmp/local_socket&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_SIZE</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> server_fd, client_fd;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_un server_addr, client_addr;</span></span>
<span class="line"><span class="__shiki_dzsirb">    socklen_t</span><span class="__shiki_140thh"> client_len;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[BUFFER_SIZE];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建本地套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((server_fd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_UNIX, SOCK_STREAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;socket&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 设置服务器地址</span></span>
<span class="line"><span class="__shiki_140thh">    server_addr.sun_family </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AF_UNIX;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    strcpy</span><span class="__shiki_140thh">(server_addr.sun_path, SOCKET_PATH);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 如果套接字文件已存在，先删除</span></span>
<span class="line"><span class="__shiki_1t8gfj">    unlink</span><span class="__shiki_140thh">(SOCKET_PATH);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 绑定地址</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(server_fd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">server_addr, </span></span>
<span class="line"><span class="__shiki_1itgoe">             sizeof</span><span class="__shiki_140thh">(server_addr)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bind&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 开始监听</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">listen</span><span class="__shiki_140thh">(server_fd, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;listen&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Local socket server listening on </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, SOCKET_PATH);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    client_len </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(client_addr);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 接受连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((client_fd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> accept</span><span class="__shiki_140thh">(server_fd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">client_addr, </span></span>
<span class="line"><span class="__shiki_1itgoe">                           &amp;</span><span class="__shiki_140thh">client_len)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accept&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 读取数据</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssize_t</span><span class="__shiki_140thh"> n </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> read</span><span class="__shiki_140thh">(client_fd, buffer, BUFFER_SIZE);</span></span>
<span class="line"><span class="__shiki_1jdh33">    buffer</span><span class="__shiki_140thh">[n] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\0</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, buffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 8. 发送响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Hello from local server&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    write</span><span class="__shiki_140thh">(client_fd, response, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(response));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 9. 清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(client_fd);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(server_fd);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    unlink</span><span class="__shiki_140thh">(SOCKET_PATH);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-本地套接字客户端" tabindex="-1">7.2 本地套接字客户端 <a class="header-anchor" href="#_7-2-本地套接字客户端" aria-label="Permalink to &quot;7.2 本地套接字客户端&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/un.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> SOCKET_PATH</span><span class="__shiki_mdbnqw"> &quot;/tmp/local_socket&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_SIZE</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> sockfd;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_un server_addr;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh">message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;Hello from local client&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[BUFFER_SIZE];</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 创建本地套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((sockfd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_UNIX, SOCK_STREAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;socket&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 设置服务器地址</span></span>
<span class="line"><span class="__shiki_140thh">    server_addr.sun_family </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AF_UNIX;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    strcpy</span><span class="__shiki_140thh">(server_addr.sun_path, SOCKET_PATH);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 连接服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">(sockfd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">server_addr, </span></span>
<span class="line"><span class="__shiki_1itgoe">                sizeof</span><span class="__shiki_140thh">(server_addr)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;connect&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 发送数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">    write</span><span class="__shiki_140thh">(sockfd, message, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(message));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 接收响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssize_t</span><span class="__shiki_140thh"> n </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> read</span><span class="__shiki_140thh">(sockfd, buffer, BUFFER_SIZE);</span></span>
<span class="line"><span class="__shiki_1jdh33">    buffer</span><span class="__shiki_140thh">[n] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\0</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, buffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 关闭套接字</span></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(sockfd);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_8-高级套接字编程" tabindex="-1">8. 高级套接字编程 <a class="header-anchor" href="#_8-高级套接字编程" aria-label="Permalink to &quot;8. 高级套接字编程&quot;">​</a></h2><h3 id="_8-1-多路复用-i-o" tabindex="-1">8.1 多路复用 I/O <a class="header-anchor" href="#_8-1-多路复用-i-o" aria-label="Permalink to &quot;8.1 多路复用 I/O&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;netinet/in.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/select.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> MAX_CLIENTS</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_SIZE</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> server_fd, </span><span class="__shiki_1jdh33">client_sockets</span><span class="__shiki_140thh">[MAX_CLIENTS], max_sd, sd;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in address;</span></span>
<span class="line"><span class="__shiki_140thh">    fd_set readfds;</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[BUFFER_SIZE];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化客户端套接字数组</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> MAX_CLIENTS; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">        client_sockets</span><span class="__shiki_140thh">[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建服务器套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((server_fd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_STREAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;socket failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    address.sin_family </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AF_INET;</span></span>
<span class="line"><span class="__shiki_140thh">    address.sin_addr.s_addr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> INADDR_ANY;</span></span>
<span class="line"><span class="__shiki_140thh">    address.sin_port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> htons</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">8080</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(server_fd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">address, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(address)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bind failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">listen</span><span class="__shiki_140thh">(server_fd, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;listen&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Select server listening on port 8080...</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 清空文件描述符集合</span></span>
<span class="line"><span class="__shiki_1t8gfj">        FD_ZERO</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">readfds);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加服务器套接字</span></span>
<span class="line"><span class="__shiki_1t8gfj">        FD_SET</span><span class="__shiki_140thh">(server_fd, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">readfds);</span></span>
<span class="line"><span class="__shiki_140thh">        max_sd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> server_fd;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加客户端套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> MAX_CLIENTS; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            sd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33"> client_sockets</span><span class="__shiki_140thh">[i];</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (sd </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                FD_SET</span><span class="__shiki_140thh">(sd, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">readfds);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (sd </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> max_sd) {</span></span>
<span class="line"><span class="__shiki_140thh">                max_sd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sd;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 等待活动</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> activity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> select</span><span class="__shiki_140thh">(max_sd </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">readfds, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">NULL</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (activity </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;select error&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查新连接</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">FD_ISSET</span><span class="__shiki_140thh">(server_fd, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">readfds)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            int</span><span class="__shiki_140thh"> new_socket;</span></span>
<span class="line"><span class="__shiki_1itgoe">            int</span><span class="__shiki_140thh"> addrlen </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(address);</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> ((new_socket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> accept</span><span class="__shiki_140thh">(server_fd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">address, </span></span>
<span class="line"><span class="__shiki_140thh">                                   (</span><span class="__shiki_dzsirb">socklen_t</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">addrlen)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">                perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accept&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">                exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1t8gfj">            printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;New connection, socket fd is </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, new_socket);</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 添加到客户端数组</span></span>
<span class="line"><span class="__shiki_1itgoe">            for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> MAX_CLIENTS; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">client_sockets</span><span class="__shiki_140thh">[i] </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1jdh33">                    client_sockets</span><span class="__shiki_140thh">[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> new_socket;</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Adding to list of sockets as </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, i);</span></span>
<span class="line"><span class="__shiki_1itgoe">                    break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查客户端数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> MAX_CLIENTS; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            sd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33"> client_sockets</span><span class="__shiki_140thh">[i];</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">FD_ISSET</span><span class="__shiki_140thh">(sd, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">readfds)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                ssize_t</span><span class="__shiki_140thh"> valread </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> read</span><span class="__shiki_140thh">(sd, buffer, BUFFER_SIZE);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (valread </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 客户端断开连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Client disconnected, socket fd </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, sd);</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    close</span><span class="__shiki_140thh">(sd);</span></span>
<span class="line"><span class="__shiki_1jdh33">                    client_sockets</span><span class="__shiki_140thh">[i] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 处理数据</span></span>
<span class="line"><span class="__shiki_1jdh33">                    buffer</span><span class="__shiki_140thh">[valread] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\0</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received: </span><span class="__shiki_dzsirb">%s\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, buffer);</span></span>
<span class="line"><span class="__shiki_1t8gfj">                    send</span><span class="__shiki_140thh">(sd, buffer, </span><span class="__shiki_1t8gfj">strlen</span><span class="__shiki_140thh">(buffer), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-非阻塞套接字" tabindex="-1">8.2 非阻塞套接字 <a class="header-anchor" href="#_8-2-非阻塞套接字" aria-label="Permalink to &quot;8.2 非阻塞套接字&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;fcntl.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;errno.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 设置套接字为非阻塞模式</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> set_nonblocking</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sockfd</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> flags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> fcntl</span><span class="__shiki_140thh">(sockfd, F_GETFL, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (flags </span><span class="__shiki_1itgoe">==</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1t8gfj"> fcntl</span><span class="__shiki_140thh">(sockfd, F_SETFL, flags </span><span class="__shiki_1itgoe">|</span><span class="__shiki_140thh"> O_NONBLOCK);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 非阻塞接收示例</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> nonblocking_recv</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sockfd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">buffer</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> buffer_size</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> bytes_received </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> recv</span><span class="__shiki_140thh">(sockfd, buffer, buffer_size, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (bytes_received </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (errno </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> EWOULDBLOCK </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> errno </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> EAGAIN) {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 没有数据可读，不是错误</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 真正的错误</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (bytes_received </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接关闭</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bytes_received;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-套接字选项和高级特性" tabindex="-1">9. 套接字选项和高级特性 <a class="header-anchor" href="#_9-套接字选项和高级特性" aria-label="Permalink to &quot;9. 套接字选项和高级特性&quot;">​</a></h2><h3 id="_9-1-常用套接字选项" tabindex="-1">9.1 常用套接字选项 <a class="header-anchor" href="#_9-1-常用套接字选项" aria-label="Permalink to &quot;9.1 常用套接字选项&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 设置套接字选项的通用函数</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> setsockopt</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sockfd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> level</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> optname</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">               const</span><span class="__shiki_1itgoe"> void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">optval</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">socklen_t</span><span class="__shiki_1jdh33"> optlen</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> getsockopt</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sockfd</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> level</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> optname</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_1itgoe">               void</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">optval</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">socklen_t</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">optlen</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 常用选项示例</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_140thh"> enable </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">// 地址重用</span></span>
<span class="line"><span class="__shiki_1t8gfj">setsockopt</span><span class="__shiki_140thh">(sockfd, SOL_SOCKET, SO_REUSEADDR, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1jdh33">enable</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(enable));</span></span>
<span class="line"><span class="__shiki_21nrsd">// 端口重用</span></span>
<span class="line"><span class="__shiki_1t8gfj">setsockopt</span><span class="__shiki_140thh">(sockfd, SOL_SOCKET, SO_REUSEPORT, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1jdh33">enable</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(enable));</span></span>
<span class="line"><span class="__shiki_21nrsd">// 保持连接</span></span>
<span class="line"><span class="__shiki_1t8gfj">setsockopt</span><span class="__shiki_140thh">(sockfd, SOL_SOCKET, SO_KEEPALIVE, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1jdh33">enable</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(enable));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 设置发送超时</span></span>
<span class="line"><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> timeval timeout;</span></span>
<span class="line"><span class="__shiki_140thh">timeout.tv_sec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">timeout.tv_usec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">setsockopt</span><span class="__shiki_140thh">(sockfd, SOL_SOCKET, SO_SNDTIMEO, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1jdh33">timeout</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(timeout));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 设置接收超时</span></span>
<span class="line"><span class="__shiki_1t8gfj">setsockopt</span><span class="__shiki_140thh">(sockfd, SOL_SOCKET, SO_RCVTIMEO, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1jdh33">timeout</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(timeout));</span></span></code></pre></div><h3 id="_9-2-获取套接字信息" tabindex="-1">9.2 获取套接字信息 <a class="header-anchor" href="#_9-2-获取套接字信息" aria-label="Permalink to &quot;9.2 获取套接字信息&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 获取对端地址</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> get_peer_address</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sockfd</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in addr;</span></span>
<span class="line"><span class="__shiki_dzsirb">    socklen_t</span><span class="__shiki_140thh"> addr_len </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(addr);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">getpeername</span><span class="__shiki_140thh">(sockfd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">addr, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">addr_len) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        char</span><span class="__shiki_1jdh33"> ip</span><span class="__shiki_140thh">[INET_ADDRSTRLEN];</span></span>
<span class="line"><span class="__shiki_1t8gfj">        inet_ntop</span><span class="__shiki_140thh">(AF_INET, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">addr.sin_addr, ip, INET_ADDRSTRLEN);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Peer: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, ip, </span><span class="__shiki_1t8gfj">ntohs</span><span class="__shiki_140thh">(addr.sin_port));</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 获取本地地址</span></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> get_local_address</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> sockfd</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in addr;</span></span>
<span class="line"><span class="__shiki_dzsirb">    socklen_t</span><span class="__shiki_140thh"> addr_len </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(addr);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">getsockname</span><span class="__shiki_140thh">(sockfd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">addr, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">addr_len) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        char</span><span class="__shiki_1jdh33"> ip</span><span class="__shiki_140thh">[INET_ADDRSTRLEN];</span></span>
<span class="line"><span class="__shiki_1t8gfj">        inet_ntop</span><span class="__shiki_140thh">(AF_INET, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">addr.sin_addr, ip, INET_ADDRSTRLEN);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Local: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, ip, </span><span class="__shiki_1t8gfj">ntohs</span><span class="__shiki_140thh">(addr.sin_port));</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_10-错误处理和最佳实践" tabindex="-1">10. 错误处理和最佳实践 <a class="header-anchor" href="#_10-错误处理和最佳实践" aria-label="Permalink to &quot;10. 错误处理和最佳实践&quot;">​</a></h2><h3 id="_10-1-完整的错误处理框架" tabindex="-1">10.1 完整的错误处理框架 <a class="header-anchor" href="#_10-1-完整的错误处理框架" aria-label="Permalink to &quot;10.1 完整的错误处理框架&quot;">​</a></h3><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdio.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;stdlib.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;string.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;unistd.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;sys/socket.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;netinet/in.h&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">#include</span><span class="__shiki_mdbnqw"> &lt;errno.h&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> PORT</span><span class="__shiki_dzsirb"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">#define</span><span class="__shiki_1t8gfj"> BUFFER_SIZE</span><span class="__shiki_dzsirb"> 1024</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> handle_error</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">const</span><span class="__shiki_1itgoe"> char</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">    perror</span><span class="__shiki_140thh">(msg);</span></span>
<span class="line"><span class="__shiki_1t8gfj">    exit</span><span class="__shiki_140thh">(EXIT_FAILURE);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> create_tcp_server</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> server_fd;</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in address;</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> opt </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建套接字</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> ((server_fd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> socket</span><span class="__shiki_140thh">(AF_INET, SOCK_STREAM, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        handle_error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;socket failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置套接字选项</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">setsockopt</span><span class="__shiki_140thh">(server_fd, SOL_SOCKET, SO_REUSEADDR, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">opt, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(opt))) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        close</span><span class="__shiki_140thh">(server_fd);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        handle_error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;setsockopt&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    address.sin_family </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> AF_INET;</span></span>
<span class="line"><span class="__shiki_140thh">    address.sin_addr.s_addr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> INADDR_ANY;</span></span>
<span class="line"><span class="__shiki_140thh">    address.sin_port </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> htons</span><span class="__shiki_140thh">(PORT);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 绑定地址</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(server_fd, (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">address, </span><span class="__shiki_1itgoe">sizeof</span><span class="__shiki_140thh">(address)) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        close</span><span class="__shiki_140thh">(server_fd);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        handle_error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bind failed&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">    // 开始监听</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">listen</span><span class="__shiki_140thh">(server_fd, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        close</span><span class="__shiki_140thh">(server_fd);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        handle_error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;listen&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Server listening on port </span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, PORT);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> server_fd;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">void</span><span class="__shiki_1t8gfj"> handle_client</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">int</span><span class="__shiki_1jdh33"> client_socket</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    char</span><span class="__shiki_1jdh33"> buffer</span><span class="__shiki_140thh">[BUFFER_SIZE];</span></span>
<span class="line"><span class="__shiki_1itgoe">    ssize_t</span><span class="__shiki_140thh"> bytes_read;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        bytes_read </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> recv</span><span class="__shiki_140thh">(client_socket, buffer, BUFFER_SIZE </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (bytes_read </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (errno </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> EINTR) </span><span class="__shiki_1itgoe">continue</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">  // 被信号中断，继续</span></span>
<span class="line"><span class="__shiki_1t8gfj">            perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;recv&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (bytes_read </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Client disconnected</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1jdh33">        buffer</span><span class="__shiki_140thh">[bytes_read] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\0</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, buffer);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 回显数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(client_socket, buffer, bytes_read, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;send&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(client_socket);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">int</span><span class="__shiki_1t8gfj"> main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    int</span><span class="__shiki_140thh"> server_fd </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> create_tcp_server</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    struct</span><span class="__shiki_140thh"> sockaddr_in client_addr;</span></span>
<span class="line"><span class="__shiki_dzsirb">    socklen_t</span><span class="__shiki_140thh"> client_len </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> sizeof</span><span class="__shiki_140thh">(client_addr);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        int</span><span class="__shiki_140thh"> client_socket </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> accept</span><span class="__shiki_140thh">(server_fd, </span></span>
<span class="line"><span class="__shiki_140thh">                                 (</span><span class="__shiki_1itgoe">struct</span><span class="__shiki_140thh"> sockaddr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">client_addr, </span></span>
<span class="line"><span class="__shiki_1itgoe">                                 &amp;</span><span class="__shiki_140thh">client_len);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (client_socket </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            perror</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;accept&quot;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">            continue</span><span class="__shiki_140thh">;</span><span class="__shiki_21nrsd">  // 继续接受其他连接</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">        // 显示客户端信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        char</span><span class="__shiki_1jdh33"> client_ip</span><span class="__shiki_140thh">[INET_ADDRSTRLEN];</span></span>
<span class="line"><span class="__shiki_1t8gfj">        inet_ntop</span><span class="__shiki_140thh">(AF_INET, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">client_addr.sin_addr, client_ip, INET_ADDRSTRLEN);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;New client: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">%d\\n</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, client_ip, </span><span class="__shiki_1t8gfj">ntohs</span><span class="__shiki_140thh">(client_addr.sin_port));</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">        handle_client</span><span class="__shiki_140thh">(client_socket);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">    close</span><span class="__shiki_140thh">(server_fd);</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_10-2-套接字编程最佳实践" tabindex="-1">10.2 套接字编程最佳实践 <a class="header-anchor" href="#_10-2-套接字编程最佳实践" aria-label="Permalink to &quot;10.2 套接字编程最佳实践&quot;">​</a></h3><ol><li><strong>始终检查返回值</strong>：所有套接字函数都可能失败</li><li><strong>处理EINTR错误</strong>：系统调用可能被信号中断</li><li><strong>使用正确的字节序</strong>：网络字节序与主机字节序转换</li><li><strong>资源清理</strong>：确保关闭所有套接字描述符</li><li><strong>错误恢复</strong>：适当的错误处理和重试机制</li><li><strong>缓冲区管理</strong>：防止缓冲区溢出</li><li><strong>超时处理</strong>：设置合理的超时值</li></ol><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>套接字是进程间通信（特别是网络通信）的核心机制，具有以下关键特性：</p><ol><li><strong>通用通信</strong>：支持本地和网络进程通信</li><li><strong>协议无关</strong>：支持TCP、UDP等多种协议</li><li><strong>双向通信</strong>：全双工数据交换</li><li><strong>丰富的API</strong>：提供完整的控制选项</li><li><strong>可扩展性</strong>：支持多路复用、非阻塞等高级特性</li></ol><p>掌握套接字编程对于开发网络应用程序和分布式系统至关重要。</p>`,61)])])}const r=a(p,[["render",h]]);export{d as __pageData,r as default};
