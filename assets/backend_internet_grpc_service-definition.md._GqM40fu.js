import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"网络基础 - gRPC 服务定义学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/internet/grpc/service-definition.md","filePath":"backend/internet/grpc/service-definition.md"}'),_={name:"backend/internet/grpc/service-definition.md"};function h(l,s,t,c,e,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="网络基础-grpc-服务定义学习笔记" tabindex="-1">网络基础 - gRPC 服务定义学习笔记 <a class="header-anchor" href="#网络基础-grpc-服务定义学习笔记" aria-label="Permalink to &quot;网络基础 - gRPC 服务定义学习笔记&quot;">​</a></h1><h2 id="_1-grpc-概述" tabindex="-1">1. gRPC 概述 <a class="header-anchor" href="#_1-grpc-概述" aria-label="Permalink to &quot;1. gRPC 概述&quot;">​</a></h2><h3 id="_1-1-什么是-grpc" tabindex="-1">1.1 什么是 gRPC <a class="header-anchor" href="#_1-1-什么是-grpc" aria-label="Permalink to &quot;1.1 什么是 gRPC&quot;">​</a></h3><ul><li><strong>gRPC</strong> = Google Remote Procedure Call</li><li>高性能、开源的通用 RPC 框架</li><li>基于 HTTP/2 协议标准设计</li><li>使用 Protocol Buffers 作为接口定义语言(IDL)</li><li>支持多种编程语言</li></ul><h3 id="_1-2-grpc-核心特性" tabindex="-1">1.2 gRPC 核心特性 <a class="header-anchor" href="#_1-2-grpc-核心特性" aria-label="Permalink to &quot;1.2 gRPC 核心特性&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[gRPC核心特性] --&gt; B[HTTP/2协议]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[Protocol Buffers]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[多语言支持]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; E[双向流]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; F[认证与负载均衡]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[多路复用]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[头部压缩]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[二进制传输]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[高效序列化]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[接口定义]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[版本兼容]</span></span></code></pre></div><h2 id="_2-protocol-buffers-基础" tabindex="-1">2. Protocol Buffers 基础 <a class="header-anchor" href="#_2-protocol-buffers-基础" aria-label="Permalink to &quot;2. Protocol Buffers 基础&quot;">​</a></h2><h3 id="_2-1-protocol-buffers-简介" tabindex="-1">2.1 Protocol Buffers 简介 <a class="header-anchor" href="#_2-1-protocol-buffers-简介" aria-label="Permalink to &quot;2.1 Protocol Buffers 简介&quot;">​</a></h3><ul><li>语言中立、平台中立</li><li>高效的二进制序列化格式</li><li>通过 <code>.proto</code> 文件定义数据结构</li></ul><h3 id="_2-2-基本语法示例" tabindex="-1">2.2 基本语法示例 <a class="header-anchor" href="#_2-2-基本语法示例" aria-label="Permalink to &quot;2.2 基本语法示例&quot;">​</a></h3><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">syntax</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;proto3&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_mdbnqw"> example</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 消息定义</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Person</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int32</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  enum</span><span class="__shiki_1t8gfj"> PhoneType</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    MOBILE </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    HOME </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    WORK </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  message</span><span class="__shiki_1t8gfj"> PhoneNumber</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    string</span><span class="__shiki_140thh"> number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    PhoneType</span><span class="__shiki_140thh"> type </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> PhoneNumber</span><span class="__shiki_140thh"> phones </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 服务定义</span></span>
<span class="line"><span class="__shiki_1itgoe">service</span><span class="__shiki_1t8gfj"> PersonService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> GetPerson</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">PersonRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">Person</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> CreatePerson</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">Person</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">PersonResponse</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-grpc-服务定义详解" tabindex="-1">3. gRPC 服务定义详解 <a class="header-anchor" href="#_3-grpc-服务定义详解" aria-label="Permalink to &quot;3. gRPC 服务定义详解&quot;">​</a></h2><h3 id="_3-1-服务定义结构" tabindex="-1">3.1 服务定义结构 <a class="header-anchor" href="#_3-1-服务定义结构" aria-label="Permalink to &quot;3.1 服务定义结构&quot;">​</a></h3><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">syntax</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;proto3&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_mdbnqw"> your.package.name</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;google/protobuf/timestamp.proto&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 可选：定义服务选项</span></span>
<span class="line"><span class="__shiki_1itgoe">option</span><span class="__shiki_dzsirb"> java_package</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;com.example.grpc&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">option</span><span class="__shiki_dzsirb"> java_outer_classname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;ExampleProto&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 请求消息</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> RequestType</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int32</span><span class="__shiki_140thh"> page_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int32</span><span class="__shiki_140thh"> result_per_page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 响应消息</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> ResponseType</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh"> results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  google.protobuf.Timestamp</span><span class="__shiki_140thh"> timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 服务定义</span></span>
<span class="line"><span class="__shiki_1itgoe">service</span><span class="__shiki_1t8gfj"> YourService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 一元 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> SimpleRpc</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">RequestType</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">ResponseType</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 服务器流式 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> ServerStreamingRpc</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">RequestType</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> ResponseType</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 客户端流式 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> ClientStreamingRpc</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> RequestType</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">ResponseType</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 双向流式 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> BidirectionalStreamingRpc</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> RequestType</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> ResponseType</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-四种服务方法类型" tabindex="-1">3.2 四种服务方法类型 <a class="header-anchor" href="#_3-2-四种服务方法类型" aria-label="Permalink to &quot;3.2 四种服务方法类型&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">sequenceDiagram</span></span>
<span class="line"><span class="__shiki_140thh">    participant C as Client</span></span>
<span class="line"><span class="__shiki_140thh">    participant S as Server</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    Note over C,S: 1. 一元RPC (Unary RPC)</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 单个请求</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 单个响应</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    Note over C,S: 2. 服务器流式RPC&lt;br/&gt;(Server Streaming RPC)</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 单个请求</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 流式响应1</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 流式响应2</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 流式响应...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    Note over C,S: 3. 客户端流式RPC&lt;br/&gt;(Client Streaming RPC)</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 流式请求1</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 流式请求2</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 流式请求...</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 单个响应</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    Note over C,S: 4. 双向流式RPC&lt;br/&gt;(Bidirectional Streaming RPC)</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 流式请求1</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 流式请求2</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 流式响应1</span></span>
<span class="line"><span class="__shiki_140thh">    C-&gt;&gt;S: 流式请求3</span></span>
<span class="line"><span class="__shiki_140thh">    S-&gt;&gt;C: 流式响应2</span></span></code></pre></div><h4 id="_3-2-1-一元-rpc-unary-rpc" tabindex="-1">3.2.1 一元 RPC (Unary RPC) <a class="header-anchor" href="#_3-2-1-一元-rpc-unary-rpc" aria-label="Permalink to &quot;3.2.1 一元 RPC (Unary RPC)&quot;">​</a></h4><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">rpc GetFeature(Point) returns (Feature) {}</span></span></code></pre></div><h4 id="_3-2-2-服务器流式-rpc-server-streaming-rpc" tabindex="-1">3.2.2 服务器流式 RPC (Server Streaming RPC) <a class="header-anchor" href="#_3-2-2-服务器流式-rpc-server-streaming-rpc" aria-label="Permalink to &quot;3.2.2 服务器流式 RPC (Server Streaming RPC)&quot;">​</a></h4><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">rpc ListFeatures(Rectangle) returns (stream Feature) {}</span></span></code></pre></div><h4 id="_3-2-3-客户端流式-rpc-client-streaming-rpc" tabindex="-1">3.2.3 客户端流式 RPC (Client Streaming RPC) <a class="header-anchor" href="#_3-2-3-客户端流式-rpc-client-streaming-rpc" aria-label="Permalink to &quot;3.2.3 客户端流式 RPC (Client Streaming RPC)&quot;">​</a></h4><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">rpc RecordRoute(stream Point) returns (RouteSummary) {}</span></span></code></pre></div><h4 id="_3-2-4-双向流式-rpc-bidirectional-streaming-rpc" tabindex="-1">3.2.4 双向流式 RPC (Bidirectional Streaming RPC) <a class="header-anchor" href="#_3-2-4-双向流式-rpc-bidirectional-streaming-rpc" aria-label="Permalink to &quot;3.2.4 双向流式 RPC (Bidirectional Streaming RPC)&quot;">​</a></h4><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">rpc RouteChat(stream RouteNote) returns (stream RouteNote) {}</span></span></code></pre></div><h2 id="_4-消息类型定义" tabindex="-1">4. 消息类型定义 <a class="header-anchor" href="#_4-消息类型定义" aria-label="Permalink to &quot;4. 消息类型定义&quot;">​</a></h2><h3 id="_4-1-标量值类型" tabindex="-1">4.1 标量值类型 <a class="header-anchor" href="#_4-1-标量值类型" aria-label="Permalink to &quot;4.1 标量值类型&quot;">​</a></h3><table tabindex="0"><thead><tr><th>.proto Type</th><th>C++ Type</th><th>Java Type</th><th>Description</th></tr></thead><tbody><tr><td>double</td><td>double</td><td>double</td><td>双精度浮点数</td></tr><tr><td>float</td><td>float</td><td>float</td><td>单精度浮点数</td></tr><tr><td>int32</td><td>int32</td><td>int</td><td>可变长编码，对负数效率低</td></tr><tr><td>int64</td><td>int64</td><td>long</td><td>可变长编码，对负数效率低</td></tr><tr><td>uint32</td><td>uint32</td><td>int</td><td>无符号整数</td></tr><tr><td>uint64</td><td>uint64</td><td>long</td><td>无符号整数</td></tr><tr><td>sint32</td><td>int32</td><td>int</td><td>有符号整数，对负数效率高</td></tr><tr><td>sint64</td><td>int64</td><td>long</td><td>有符号整数，对负数效率高</td></tr><tr><td>fixed32</td><td>uint32</td><td>int</td><td>固定4字节，大于2^28时效率高</td></tr><tr><td>fixed64</td><td>uint64</td><td>long</td><td>固定8字节，大于2^56时效率高</td></tr><tr><td>sfixed32</td><td>int32</td><td>int</td><td>固定4字节</td></tr><tr><td>sfixed64</td><td>int64</td><td>long</td><td>固定8字节</td></tr><tr><td>bool</td><td>bool</td><td>boolean</td><td>布尔值</td></tr><tr><td>string</td><td>string</td><td>String</td><td>UTF-8 或 7-bit ASCII 文本</td></tr><tr><td>bytes</td><td>string</td><td>ByteString</td><td>任意字节序列</td></tr></tbody></table><h3 id="_4-2-复杂消息类型" tabindex="-1">4.2 复杂消息类型 <a class="header-anchor" href="#_4-2-复杂消息类型" aria-label="Permalink to &quot;4.2 复杂消息类型&quot;">​</a></h3><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">syntax</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;proto3&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> SearchRequest</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> query </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int32</span><span class="__shiki_140thh"> page_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int32</span><span class="__shiki_140thh"> result_per_page </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 枚举类型</span></span>
<span class="line"><span class="__shiki_1itgoe">  enum</span><span class="__shiki_1t8gfj"> Corpus</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    UNIVERSAL </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    WEB </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    IMAGES </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    LOCAL </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    NEWS </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    PRODUCTS </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    VIDEO </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  Corpus</span><span class="__shiki_140thh"> corpus </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> SearchResponse</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Result</span><span class="__shiki_140thh"> results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Result</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> url </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> title </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh"> snippets </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-高级服务定义特性" tabindex="-1">5. 高级服务定义特性 <a class="header-anchor" href="#_5-高级服务定义特性" aria-label="Permalink to &quot;5. 高级服务定义特性&quot;">​</a></h2><h3 id="_5-1-使用导入和包" tabindex="-1">5.1 使用导入和包 <a class="header-anchor" href="#_5-1-使用导入和包" aria-label="Permalink to &quot;5.1 使用导入和包&quot;">​</a></h3><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">syntax</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;proto3&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_mdbnqw"> ecommerce</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;google/protobuf/empty.proto&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;google/protobuf/wrappers.proto&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用导入的类型</span></span>
<span class="line"><span class="__shiki_1itgoe">service</span><span class="__shiki_1t8gfj"> ProductService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> AddProduct</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">google</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">protobuf</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StringValue</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> GetProduct</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">google</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">protobuf</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StringValue</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> DeleteProduct</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">google</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">protobuf</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StringValue</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">google</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">protobuf</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Empty</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-定义-rpc-选项" tabindex="-1">5.2 定义 RPC 选项 <a class="header-anchor" href="#_5-2-定义-rpc-选项" aria-label="Permalink to &quot;5.2 定义 RPC 选项&quot;">​</a></h3><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">service</span><span class="__shiki_1t8gfj"> OrderService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> GetOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">GetOrderRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    option</span><span class="__shiki_dzsirb"> (google.api.http)</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      get</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/v1/{name=orders/*}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> CreateOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">CreateOrderRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    option</span><span class="__shiki_dzsirb"> (google.api.http)</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      post</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/v1/orders&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">      body</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;order&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-完整的服务定义示例" tabindex="-1">6. 完整的服务定义示例 <a class="header-anchor" href="#_6-完整的服务定义示例" aria-label="Permalink to &quot;6. 完整的服务定义示例&quot;">​</a></h2><h3 id="_6-1-电子商务系统示例" tabindex="-1">6.1 电子商务系统示例 <a class="header-anchor" href="#_6-1-电子商务系统示例" aria-label="Permalink to &quot;6.1 电子商务系统示例&quot;">​</a></h3><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">syntax</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;proto3&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_mdbnqw"> ecommerce</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;google/protobuf/timestamp.proto&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_mdbnqw"> &quot;google/protobuf/empty.proto&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">option</span><span class="__shiki_dzsirb"> java_multiple_files</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">option</span><span class="__shiki_dzsirb"> java_package</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;com.example.ecommerce&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">option</span><span class="__shiki_dzsirb"> java_outer_classname</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;EcommerceProto&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 产品相关消息</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  float</span><span class="__shiki_140thh"> price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh"> categories </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  google.protobuf.Timestamp</span><span class="__shiki_140thh"> created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  google.protobuf.Timestamp</span><span class="__shiki_140thh"> updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> ProductID</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> ProductList</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Product</span><span class="__shiki_140thh"> products </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 订单相关消息</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> Order</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> OrderItem</span><span class="__shiki_140thh"> items </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  float</span><span class="__shiki_140thh"> total_price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  OrderStatus</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> customer_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  google.protobuf.Timestamp</span><span class="__shiki_140thh"> created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> OrderItem</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> product_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int32</span><span class="__shiki_140thh"> quantity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  float</span><span class="__shiki_140thh"> price </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">enum</span><span class="__shiki_1t8gfj"> OrderStatus</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">  PENDING </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  CONFIRMED </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  SHIPPED </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  DELIVERED </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  CANCELLED </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> OrderID</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> OrderList</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> Order</span><span class="__shiki_140thh"> orders </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 服务定义</span></span>
<span class="line"><span class="__shiki_1itgoe">service</span><span class="__shiki_1t8gfj"> ProductService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 一元 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> AddProduct</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">ProductID</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> GetProduct</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">ProductID</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">Product</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> DeleteProduct</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">ProductID</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">google</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">protobuf</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Empty</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 服务器流式 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> ListProducts</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">google</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">protobuf</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Empty</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> Product</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">service</span><span class="__shiki_1t8gfj"> OrderService</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 一元 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> CreateOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">OrderID</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> GetOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">OrderID</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 客户端流式 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> ProcessOrders</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> OrderID</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1t8gfj">google</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">protobuf</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Empty</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 双向流式 RPC</span></span>
<span class="line"><span class="__shiki_1itgoe">  rpc</span><span class="__shiki_1t8gfj"> Chat</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> ChatMessage</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">returns</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">stream</span><span class="__shiki_1t8gfj"> ChatMessage</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 聊天消息用于双向流示例</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> ChatMessage</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> user_id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> message </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  google.protobuf.Timestamp</span><span class="__shiki_140thh"> timestamp </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-grpc-生态系统" tabindex="-1">7. gRPC 生态系统 <a class="header-anchor" href="#_7-grpc-生态系统" aria-label="Permalink to &quot;7. gRPC 生态系统&quot;">​</a></h2><h3 id="_7-1-相关工具和库" tabindex="-1">7.1 相关工具和库 <a class="header-anchor" href="#_7-1-相关工具和库" aria-label="Permalink to &quot;7.1 相关工具和库&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph LR</span></span>
<span class="line"><span class="__shiki_140thh">    A[gRPC生态系统] --&gt; B[核心组件]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[扩展工具]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[集成框架]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[gRPC Core]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[Protocol Buffers]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[HTTP/2]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[gRPC Gateway]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[gRPC Web]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[gRPCurl]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[Spring Boot gRPC]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[gRPC Node.js]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[gRPC Python]</span></span></code></pre></div><h3 id="_7-2-常用-grpc-工具" tabindex="-1">7.2 常用 gRPC 工具 <a class="header-anchor" href="#_7-2-常用-grpc-工具" aria-label="Permalink to &quot;7.2 常用 gRPC 工具&quot;">​</a></h3><ul><li><strong>grpcurl</strong>: 类似 curl 的 gRPC 命令行工具</li><li><strong>grpc-gateway</strong>: 将 gRPC 服务暴露为 RESTful JSON API</li><li><strong>grpc-web</strong>: 让浏览器客户端能够调用 gRPC 服务</li><li><strong>protoc</strong>: Protocol Buffers 编译器</li></ul><h2 id="_8-最佳实践" tabindex="-1">8. 最佳实践 <a class="header-anchor" href="#_8-最佳实践" aria-label="Permalink to &quot;8. 最佳实践&quot;">​</a></h2><h3 id="_8-1-服务设计原则" tabindex="-1">8.1 服务设计原则 <a class="header-anchor" href="#_8-1-服务设计原则" aria-label="Permalink to &quot;8.1 服务设计原则&quot;">​</a></h3><ol><li><strong>使用有意义的包名和命名空间</strong></li><li><strong>版本控制策略</strong></li><li><strong>向后兼容性设计</strong></li><li><strong>合理的错误处理</strong></li><li><strong>适当的超时设置</strong></li></ol><h3 id="_8-2-性能优化建议" tabindex="-1">8.2 性能优化建议 <a class="header-anchor" href="#_8-2-性能优化建议" aria-label="Permalink to &quot;8.2 性能优化建议&quot;">​</a></h3><ul><li>合理使用流式 RPC 处理大数据量</li><li>注意消息大小，避免过大的单个消息</li><li>使用适当的压缩策略</li><li>考虑连接复用和负载均衡</li></ul><h2 id="_9-总结" tabindex="-1">9. 总结 <a class="header-anchor" href="#_9-总结" aria-label="Permalink to &quot;9. 总结&quot;">​</a></h2><p>gRPC 服务定义是构建高性能微服务通信的基础。通过 Protocol Buffers 的强类型接口定义，结合 HTTP/2 的多路复用和流式传输能力，gRPC 提供了高效、类型安全的 RPC 框架。掌握服务定义的各种模式和最佳实践，对于构建可扩展、可维护的分布式系统至关重要。</p><p>这份学习笔记涵盖了 gRPC 服务定义的核心概念，从基础的 Protocol Buffers 语法到复杂的服务模式设计，为深入学习和实践 gRPC 提供了坚实的基础。</p>`,50)])])}const g=a(_,[["render",h]]);export{r as __pageData,g as default};
