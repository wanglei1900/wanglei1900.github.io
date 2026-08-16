import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"网络基础、gRPC与性能优化完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/internet/grpc/performance.md","filePath":"backend/internet/grpc/performance.md"}'),p={name:"backend/internet/grpc/performance.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="网络基础、grpc与性能优化完整学习笔记" tabindex="-1">网络基础、gRPC与性能优化完整学习笔记 <a class="header-anchor" href="#网络基础、grpc与性能优化完整学习笔记" aria-label="Permalink to &quot;网络基础、gRPC与性能优化完整学习笔记&quot;">​</a></h1><h2 id="_1-网络基础与性能瓶颈" tabindex="-1">1. 网络基础与性能瓶颈 <a class="header-anchor" href="#_1-网络基础与性能瓶颈" aria-label="Permalink to &quot;1. 网络基础与性能瓶颈&quot;">​</a></h2><h3 id="_1-1-网络分层模型与性能影响" tabindex="-1">1.1 网络分层模型与性能影响 <a class="header-anchor" href="#_1-1-网络分层模型与性能影响" aria-label="Permalink to &quot;1.1 网络分层模型与性能影响&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TB</span></span>
<span class="line"><span class="__shiki_140thh">    A[应用层 - gRPC/HTTP] --&gt; B[传输层 - TCP/UDP]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[网络层 - IP]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; D[数据链路层 - 以太网/WiFi]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[物理层 - 电缆/无线电]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    F[应用层优化] --&gt; A</span></span>
<span class="line"><span class="__shiki_140thh">    G[传输层优化] --&gt; B</span></span>
<span class="line"><span class="__shiki_140thh">    H[网络层优化] --&gt; C</span></span></code></pre></div><h3 id="_1-2-http-2-性能特性" tabindex="-1">1.2 HTTP/2 性能特性 <a class="header-anchor" href="#_1-2-http-2-性能特性" aria-label="Permalink to &quot;1.2 HTTP/2 性能特性&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>性能优势</th><th>对gRPC的影响</th></tr></thead><tbody><tr><td>多路复用</td><td>单个连接并行处理多个请求</td><td>减少连接建立开销</td></tr><tr><td>头部压缩(HPACK)</td><td>减少传输数据量</td><td>提高小消息传输效率</td></tr><tr><td>二进制分帧</td><td>解析效率更高</td><td>降低CPU使用率</td></tr><tr><td>服务器推送</td><td>主动推送资源</td><td>减少客户端请求延迟</td></tr></tbody></table><h3 id="_1-3-tcp性能优化参数" tabindex="-1">1.3 TCP性能优化参数 <a class="header-anchor" href="#_1-3-tcp性能优化参数" aria-label="Permalink to &quot;1.3 TCP性能优化参数&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Linux TCP优化参数示例</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &#39;net.core.rmem_max = 16777216&#39;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> /etc/sysctl.conf</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &#39;net.core.wmem_max = 16777216&#39;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> /etc/sysctl.conf</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &#39;net.ipv4.tcp_rmem = 4096 87380 16777216&#39;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> /etc/sysctl.conf</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &#39;net.ipv4.tcp_wmem = 4096 16384 16777216&#39;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> /etc/sysctl.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -p</span></span></code></pre></div><h2 id="_2-grpc性能优化架构" tabindex="-1">2. gRPC性能优化架构 <a class="header-anchor" href="#_2-grpc性能优化架构" aria-label="Permalink to &quot;2. gRPC性能优化架构&quot;">​</a></h2><h3 id="_2-1-grpc性能优化全景图" tabindex="-1">2.1 gRPC性能优化全景图 <a class="header-anchor" href="#_2-1-grpc性能优化全景图" aria-label="Permalink to &quot;2.1 gRPC性能优化全景图&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[gRPC性能优化] --&gt; B[协议层优化]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[应用层优化]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[基础设施优化]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[消息序列化]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[传输协议]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[压缩算法]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[连接管理]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[负载均衡]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[超时重试]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[服务发现]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[监控告警]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[资源调度]</span></span></code></pre></div><h2 id="_3-protocol-buffers优化" tabindex="-1">3. Protocol Buffers优化 <a class="header-anchor" href="#_3-protocol-buffers优化" aria-label="Permalink to &quot;3. Protocol Buffers优化&quot;">​</a></h2><h3 id="_3-1-高效的消息设计" tabindex="-1">3.1 高效的消息设计 <a class="header-anchor" href="#_3-1-高效的消息设计" aria-label="Permalink to &quot;3.1 高效的消息设计&quot;">​</a></h3><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">syntax</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;proto3&quot;</span><span class="__shiki_140thh">;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优化前的设计</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> UserProfile</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> username </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> first_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> last_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> phone </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> address </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> city </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> country </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 9</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int32</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh"> tags </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 11</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  map</span><span class="__shiki_140thh">&lt;</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">&gt; metadata </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  google.protobuf.Timestamp</span><span class="__shiki_140thh"> created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 13</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  google.protobuf.Timestamp</span><span class="__shiki_140thh"> updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 14</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 优化后的设计</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> UserProfile</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> id </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用oneof处理互斥字段</span></span>
<span class="line"><span class="__shiki_1itgoe">  oneof</span><span class="__shiki_140thh"> contact_info {</span></span>
<span class="line"><span class="__shiki_1itgoe">    string</span><span class="__shiki_140thh"> email </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    string</span><span class="__shiki_140thh"> phone </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 合并姓名字段</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> display_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用更紧凑的地址表示</span></span>
<span class="line"><span class="__shiki_1itgoe">  message</span><span class="__shiki_1t8gfj"> Address</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    string</span><span class="__shiki_140thh"> street </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    string</span><span class="__shiki_140thh"> city_code </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 使用代码而非全名</span></span>
<span class="line"><span class="__shiki_1itgoe">    string</span><span class="__shiki_140thh"> country_code </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  Address</span><span class="__shiki_140thh"> address </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用更小的数据类型</span></span>
<span class="line"><span class="__shiki_1itgoe">  uint32</span><span class="__shiki_140thh"> age </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 避免重复字符串存储</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> uint32</span><span class="__shiki_140thh"> tag_ids </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用bytes存储二进制元数据</span></span>
<span class="line"><span class="__shiki_1itgoe">  bytes</span><span class="__shiki_140thh"> metadata </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用更紧凑的时间戳</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> created_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 9</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  int64</span><span class="__shiki_140thh"> updated_at </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-字段优化策略" tabindex="-1">3.2 字段优化策略 <a class="header-anchor" href="#_3-2-字段优化策略" aria-label="Permalink to &quot;3.2 字段优化策略&quot;">​</a></h3><h4 id="_3-2-1-字段编号与类型选择" tabindex="-1">3.2.1 字段编号与类型选择 <a class="header-anchor" href="#_3-2-1-字段编号与类型选择" aria-label="Permalink to &quot;3.2.1 字段编号与类型选择&quot;">​</a></h4><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> OptimizedMessage</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用合适的数值类型</span></span>
<span class="line"><span class="__shiki_1itgoe">  int32</span><span class="__shiki_140thh"> small_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;      </span><span class="__shiki_21nrsd">// 适合小数值</span></span>
<span class="line"><span class="__shiki_1itgoe">  sint32</span><span class="__shiki_140thh"> signed_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd">// 适合有符号数</span></span>
<span class="line"><span class="__shiki_1itgoe">  fixed32</span><span class="__shiki_140thh"> fixed_number </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd">// 适合大数值</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 字符串优化</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> required_text </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_140thh">;    </span><span class="__shiki_21nrsd">// 必须的文本</span></span>
<span class="line"><span class="__shiki_1itgoe">  bytes</span><span class="__shiki_140thh"> binary_data </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;       </span><span class="__shiki_21nrsd">// 二进制数据</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 重复字段优化</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> int32</span><span class="__shiki_140thh"> numbers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">;  </span><span class="__shiki_21nrsd">// 适合小列表</span></span>
<span class="line"><span class="__shiki_1itgoe">  repeated</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh"> large_list </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 7</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">packed</span><span class="__shiki_140thh">=</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">]; </span><span class="__shiki_21nrsd">// 大列表使用packed</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_3-2-2-消息结构扁平化" tabindex="-1">3.2.2 消息结构扁平化 <a class="header-anchor" href="#_3-2-2-消息结构扁平化" aria-label="Permalink to &quot;3.2.2 消息结构扁平化&quot;">​</a></h4><div class="language-protobuf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">protobuf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 不推荐：嵌套过深</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> DeepNested</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  message</span><span class="__shiki_1t8gfj"> Level1</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    message</span><span class="__shiki_1t8gfj"> Level2</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      message</span><span class="__shiki_1t8gfj"> Level3</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        string</span><span class="__shiki_140thh"> value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_1itgoe">      Level3</span><span class="__shiki_140thh"> level3 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    Level2</span><span class="__shiki_140thh"> level2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_1itgoe">  Level1</span><span class="__shiki_140thh"> level1 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 推荐：扁平结构</span></span>
<span class="line"><span class="__shiki_1itgoe">message</span><span class="__shiki_1t8gfj"> FlatStructure</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  string</span><span class="__shiki_140thh"> level1_level2_level3_value </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-grpc连接与传输优化" tabindex="-1">4. gRPC连接与传输优化 <a class="header-anchor" href="#_4-grpc连接与传输优化" aria-label="Permalink to &quot;4. gRPC连接与传输优化&quot;">​</a></h2><h3 id="_4-1-连接池管理" tabindex="-1">4.1 连接池管理 <a class="header-anchor" href="#_4-1-连接池管理" aria-label="Permalink to &quot;4.1 连接池管理&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> grpc</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> concurrent </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> futures</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> threading</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> collections </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> deque</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConnectionPool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, target, max_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, min_size</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, idle_timeout</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.target </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> target</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.max_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> max_size</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.min_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> min_size</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.idle_timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> idle_timeout</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> deque()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.active_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.lock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> threading.Lock()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cleanup_thread </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> threading.Thread(</span><span class="__shiki_1jdh33">target</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">._cleanup_idle_connections)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cleanup_thread.daemon </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cleanup_thread.start()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_connection</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 尝试从池中获取空闲连接</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections:</span></span>
<span class="line"><span class="__shiki_140thh">                conn, last_used </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections.popleft()</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> last_used </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.idle_timeout:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> conn</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                    conn.close()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 创建新连接</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.active_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.max_size:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.active_count </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> grpc.insecure_channel(</span></span>
<span class="line"><span class="__shiki_dzsirb">                    self</span><span class="__shiki_140thh">.target,</span></span>
<span class="line"><span class="__shiki_1jdh33">                    options</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;grpc.max_send_message_length&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;grpc.max_receive_message_length&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_time_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_timeout_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_permit_without_calls&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;grpc.http2.max_pings_without_data&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;grpc.http2.min_time_between_pings_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">                    ]</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Connection pool exhausted&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> return_connection</span><span class="__shiki_140thh">(self, conn):</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.connections) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.max_size:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.connections.append((conn, time.time()))</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                conn.close()</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.active_count </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _cleanup_idle_connections</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        while</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            time.sleep(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># 每分钟清理一次</span></span>
<span class="line"><span class="__shiki_1itgoe">            with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_140thh">                current_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">                new_connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> deque()</span></span>
<span class="line"><span class="__shiki_1itgoe">                while</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections:</span></span>
<span class="line"><span class="__shiki_140thh">                    conn, last_used </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections.popleft()</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> current_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> last_used </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.idle_timeout:</span></span>
<span class="line"><span class="__shiki_140thh">                        new_connections.append((conn, last_used))</span></span>
<span class="line"><span class="__shiki_1itgoe">                    else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                        conn.close()</span></span>
<span class="line"><span class="__shiki_dzsirb">                        self</span><span class="__shiki_140thh">.active_count </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> new_connections</span></span></code></pre></div><h3 id="_4-2-keepalive配置" tabindex="-1">4.2 Keepalive配置 <a class="header-anchor" href="#_4-2-keepalive配置" aria-label="Permalink to &quot;4.2 Keepalive配置&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 服务器端Keepalive配置</span></span>
<span class="line"><span class="__shiki_140thh">server </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> grpc.server(</span></span>
<span class="line"><span class="__shiki_140thh">    futures.ThreadPoolExecutor(</span><span class="__shiki_1jdh33">max_workers</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_1jdh33">    options</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_21nrsd">        # Keepalive设置</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_time_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">),           </span><span class="__shiki_21nrsd"># 10秒发送一次keepalive</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_timeout_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">),         </span><span class="__shiki_21nrsd"># 5秒超时</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_permit_without_calls&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd"># 无调用时也发送</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.http2.max_pings_without_data&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),    </span><span class="__shiki_21nrsd"># 允许无数据ping</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.http2.min_time_between_pings_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd"># ping最小间隔</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 流量控制</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.http2.max_frame_size&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">16384</span><span class="__shiki_140thh">),        </span><span class="__shiki_21nrsd"># 最大帧大小</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.http2.max_concurrent_streams&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">),  </span><span class="__shiki_21nrsd"># 最大并发流</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 连接管理</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.max_connection_idle_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300000</span><span class="__shiki_140thh">),     </span><span class="__shiki_21nrsd"># 连接空闲超时</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.max_connection_age_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3600000</span><span class="__shiki_140thh">),     </span><span class="__shiki_21nrsd"># 连接最大寿命</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 客户端Keepalive配置</span></span>
<span class="line"><span class="__shiki_140thh">channel </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> grpc.insecure_channel(</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &#39;localhost:50051&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_1jdh33">    options</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_time_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_timeout_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.keepalive_permit_without_calls&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.http2.max_pings_without_data&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        (</span><span class="__shiki_mdbnqw">&#39;grpc.http2.min_ping_interval_without_data_ms&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300000</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span></code></pre></div><h2 id="_5-负载均衡与服务发现" tabindex="-1">5. 负载均衡与服务发现 <a class="header-anchor" href="#_5-负载均衡与服务发现" aria-label="Permalink to &quot;5. 负载均衡与服务发现&quot;">​</a></h2><h3 id="_5-1-客户端负载均衡" tabindex="-1">5.1 客户端负载均衡 <a class="header-anchor" href="#_5-1-客户端负载均衡" aria-label="Permalink to &quot;5.1 客户端负载均衡&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> grpc</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> grpc_resolver.consul </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> ConsulResolver</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> random</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> List</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> RoundRobinBalancer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, service_name: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.service_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> service_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.addresses: List[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.current_index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.lock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> threading.Lock()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.last_refresh </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.refresh_interval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_21nrsd">  # 30秒刷新一次</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_address</span><span class="__shiki_140thh">(self) -&gt; </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 定期刷新服务列表</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.last_refresh </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.refresh_interval:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">._refresh_addresses()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.addresses:</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;No available servers&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 轮询选择</span></span>
<span class="line"><span class="__shiki_140thh">            address </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.addresses[</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.current_index]</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.current_index </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.current_index </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">%</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.addresses)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> address</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _refresh_addresses</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 从服务发现系统获取地址</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 这里简化实现，实际应该集成Consul/Etcd等</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.addresses </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._fetch_from_discovery()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.last_refresh </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _fetch_from_discovery</span><span class="__shiki_140thh">(self) -&gt; List[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">]:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 模拟从服务发现获取地址</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;localhost:50051&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;localhost:50052&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;localhost:50053&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> LeastConnectionsBalancer</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, service_name: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.service_name </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> service_name</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}  </span><span class="__shiki_21nrsd"># address -&gt; connection_count</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.lock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> threading.Lock()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_address</span><span class="__shiki_140thh">(self) -&gt; </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections:</span></span>
<span class="line"><span class="__shiki_1itgoe">                raise</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;No available servers&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 选择连接数最少的服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.connections.items(), </span><span class="__shiki_1jdh33">key</span><span class="__shiki_1itgoe">=lambda</span><span class="__shiki_140thh"> x: x[</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">])[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> increment_connections</span><span class="__shiki_140thh">(self, address: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.connections[address] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections.get(address, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> decrement_connections</span><span class="__shiki_140thh">(self, address: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">        with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> address </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.connections[address] </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections[address] </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    del</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.connections[address]</span></span></code></pre></div><h3 id="_5-2-健康检查与熔断器" tabindex="-1">5.2 健康检查与熔断器 <a class="header-anchor" href="#_5-2-健康检查与熔断器" aria-label="Permalink to &quot;5.2 健康检查与熔断器&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> enum </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Enum</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> dataclasses </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Optional</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CircuitState</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">Enum</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">    CLOSED</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;closed&quot;</span><span class="__shiki_21nrsd">      # 正常状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    OPEN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;open&quot;</span><span class="__shiki_21nrsd">          # 熔断状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    HALF_OPEN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;half_open&quot;</span><span class="__shiki_21nrsd"> # 半开状态，尝试恢复</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CircuitBreakerConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    failure_threshold: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_21nrsd">        # 失败阈值</span></span>
<span class="line"><span class="__shiki_140thh">    success_threshold: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_21nrsd">        # 成功阈值</span></span>
<span class="line"><span class="__shiki_140thh">    timeout: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_21nrsd">                 # 熔断超时时间(秒)</span></span>
<span class="line"><span class="__shiki_140thh">    half_open_timeout: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_21nrsd">       # 半开状态超时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CircuitBreaker</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, config: CircuitBreakerConfig):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">CLOSED</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.failure_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.success_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.last_failure_time: Optional[</span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> None</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.last_state_change: </span><span class="__shiki_dzsirb">float</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> can_execute</span><span class="__shiki_140thh">(self) -&gt; </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        current_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">CLOSED</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">OPEN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 检查是否应该进入半开状态</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> current_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.last_state_change </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.config.timeout:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">HALF_OPEN</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.last_state_change </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current_time</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.success_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">HALF_OPEN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 在半开状态下限制请求量</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.success_count </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.config.success_threshold</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> on_success</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">HALF_OPEN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.success_count </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.success_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.config.success_threshold:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">CLOSED</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.failure_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.last_state_change </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.failure_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> on_failure</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.failure_count </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.last_failure_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">CLOSED</span><span class="__shiki_1itgoe"> and</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.failure_count </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.config.failure_threshold):</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">OPEN</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.last_state_change </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">HALF_OPEN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> CircuitState.</span><span class="__shiki_dzsirb">OPEN</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.last_state_change </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span></code></pre></div><h2 id="_6-序列化与压缩优化" tabindex="-1">6. 序列化与压缩优化 <a class="header-anchor" href="#_6-序列化与压缩优化" aria-label="Permalink to &quot;6. 序列化与压缩优化&quot;">​</a></h2><h3 id="_6-1-消息压缩" tabindex="-1">6.1 消息压缩 <a class="header-anchor" href="#_6-1-消息压缩" aria-label="Permalink to &quot;6.1 消息压缩&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> grpc</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> gzip</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> zlib</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> snappy</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> google.protobuf </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> message </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> _message</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> CompressionInterceptor</span><span class="__shiki_140thh">(</span><span class="__shiki_1t8gfj">grpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ServerInterceptor</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, compression_algorithm</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;gzip&#39;</span><span class="__shiki_140thh">, threshold</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.compression_algorithm </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> compression_algorithm</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.threshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> threshold  </span><span class="__shiki_21nrsd"># 压缩阈值</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> intercept_service</span><span class="__shiki_140thh">(self, continuation, handler_call_details):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查客户端支持的压缩算法</span></span>
<span class="line"><span class="__shiki_140thh">        compression_metadata </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> dict</span><span class="__shiki_140thh">(handler_call_details.invocation_metadata)</span></span>
<span class="line"><span class="__shiki_140thh">        client_supported </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> compression_metadata.get(</span><span class="__shiki_mdbnqw">&#39;accept-compression&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">).split(</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> compression_wrapper</span><span class="__shiki_140thh">(behavior, request_streaming, response_streaming):</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> response_streaming:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> behavior</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            def</span><span class="__shiki_1t8gfj"> compressed_handler</span><span class="__shiki_140thh">(request, context):</span></span>
<span class="line"><span class="__shiki_140thh">                response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> behavior(request, context)</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 序列化响应</span></span>
<span class="line"><span class="__shiki_140thh">                serialized </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> response.SerializeToString()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 根据大小决定是否压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(serialized) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.threshold </span><span class="__shiki_1itgoe">and</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.compression_algorithm </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> client_supported:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.compression_algorithm </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;gzip&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                        compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> gzip.compress(serialized)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.compression_algorithm </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;deflate&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                        compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> zlib.compress(serialized)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    elif</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.compression_algorithm </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;snappy&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                        compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> snappy.compress(serialized)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                        compressed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> serialized</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 设置压缩头</span></span>
<span class="line"><span class="__shiki_140thh">                    context.set_trailing_metadata((</span></span>
<span class="line"><span class="__shiki_140thh">                        (</span><span class="__shiki_mdbnqw">&#39;content-encoding&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.compression_algorithm),</span></span>
<span class="line"><span class="__shiki_140thh">                    ))</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_140thh">(response).FromString(compressed)</span></span>
<span class="line"><span class="__shiki_1itgoe">                else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_140thh"> response</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> compressed_handler</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> continuation(handler_call_details)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用压缩的客户端</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> create_compressed_channel</span><span class="__shiki_140thh">(target):</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> grpc.insecure_channel(</span></span>
<span class="line"><span class="__shiki_140thh">        target,</span></span>
<span class="line"><span class="__shiki_1jdh33">        options</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">[</span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_mdbnqw">&#39;grpc.default_compression_algorithm&#39;</span><span class="__shiki_140thh">, grpc.Compression.</span><span class="__shiki_dzsirb">GZIP</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span></code></pre></div><h3 id="_6-2-批处理与流式优化" tabindex="-1">6.2 批处理与流式优化 <a class="header-anchor" href="#_6-2-批处理与流式优化" aria-label="Permalink to &quot;6.2 批处理与流式优化&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> asyncio</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> List, AsyncIterator</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> grpc</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> concurrent.futures </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> ThreadPoolExecutor</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BatchProcessor</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, batch_size: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">, timeout: </span><span class="__shiki_dzsirb">float</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.batch_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> batch_size</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.timeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> timeout</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.batch: List </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.lock </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> asyncio.Lock()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.flush_event </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> asyncio.Event()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> add_request</span><span class="__shiki_140thh">(self, request):</span></span>
<span class="line"><span class="__shiki_1itgoe">        async</span><span class="__shiki_1itgoe"> with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.batch.append(request)</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.batch) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch_size:</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._flush()</span></span>
<span class="line"><span class="__shiki_1itgoe">            else</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                # 设置超时刷新</span></span>
<span class="line"><span class="__shiki_140thh">                asyncio.create_task(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">._schedule_flush())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _schedule_flush</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_140thh"> asyncio.sleep(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.timeout)</span></span>
<span class="line"><span class="__shiki_1itgoe">        async</span><span class="__shiki_1itgoe"> with</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.lock:</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch:</span></span>
<span class="line"><span class="__shiki_1itgoe">                await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._flush()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _flush</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        batch_to_process </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.batch.copy()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.batch.clear()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理批量请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._process_batch(batch_to_process)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _process_batch</span><span class="__shiki_140thh">(self, batch: List):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 实现批量处理逻辑</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 这里可以调用gRPC批量接口</span></span>
<span class="line"><span class="__shiki_1itgoe">        pass</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 流式消息优化</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OptimizedStreamHandler</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, chunk_size: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 65536</span><span class="__shiki_140thh">):  </span><span class="__shiki_21nrsd"># 64KB chunks</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.chunk_size </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> chunk_size</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> handle_large_stream</span><span class="__shiki_140thh">(self, request_stream: AsyncIterator) -&gt; AsyncIterator:</span></span>
<span class="line"><span class="__shiki_140thh">        buffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> bytearray</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        async</span><span class="__shiki_1itgoe"> for</span><span class="__shiki_140thh"> chunk </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> request_stream:</span></span>
<span class="line"><span class="__shiki_140thh">            buffer.extend(chunk.data)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 当缓冲区达到chunk_size时处理</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(buffer) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.chunk_size:</span></span>
<span class="line"><span class="__shiki_140thh">                process_chunk </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> buffer[:</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.chunk_size]</span></span>
<span class="line"><span class="__shiki_1itgoe">                del</span><span class="__shiki_140thh"> buffer[:</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.chunk_size]</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                # 处理chunk</span></span>
<span class="line"><span class="__shiki_140thh">                processed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._process_chunk(process_chunk)</span></span>
<span class="line"><span class="__shiki_1itgoe">                yield</span><span class="__shiki_140thh"> processed</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理剩余数据</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> buffer:</span></span>
<span class="line"><span class="__shiki_140thh">            processed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">._process_chunk(buffer)</span></span>
<span class="line"><span class="__shiki_1itgoe">            yield</span><span class="__shiki_140thh"> processed</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> _process_chunk</span><span class="__shiki_140thh">(self, chunk: </span><span class="__shiki_dzsirb">bytes</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 处理数据块的逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> chunk  </span><span class="__shiki_21nrsd"># 简化实现</span></span></code></pre></div><h2 id="_7-资源管理与监控" tabindex="-1">7. 资源管理与监控 <a class="header-anchor" href="#_7-资源管理与监控" aria-label="Permalink to &quot;7. 资源管理与监控&quot;">​</a></h2><h3 id="_7-1-连接和内存监控" tabindex="-1">7.1 连接和内存监控 <a class="header-anchor" href="#_7-1-连接和内存监控" aria-label="Permalink to &quot;7.1 连接和内存监控&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> psutil</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> resource</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> prometheus_client </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Counter, Gauge, Histogram, start_http_server</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PerformanceMonitor</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_21nrsd">        # Prometheus指标</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.request_counter </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Counter(</span><span class="__shiki_mdbnqw">&#39;grpc_requests_total&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Total gRPC requests&#39;</span><span class="__shiki_140thh">, [</span><span class="__shiki_mdbnqw">&#39;method&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.request_duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Histogram(</span><span class="__shiki_mdbnqw">&#39;grpc_request_duration_seconds&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Request duration&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.active_connections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Gauge(</span><span class="__shiki_mdbnqw">&#39;grpc_active_connections&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Active connections&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.memory_usage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Gauge(</span><span class="__shiki_mdbnqw">&#39;grpc_memory_bytes&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Memory usage&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cpu_usage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Gauge(</span><span class="__shiki_mdbnqw">&#39;grpc_cpu_percent&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;CPU usage&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.connection_count </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.start_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> monitor_connection</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;监控连接生命周期&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_1t8gfj"> monitoring_interceptor</span><span class="__shiki_140thh">(continuation, handler_call_details):</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.connection_count </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.active_connections.inc()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> continuation(handler_call_details)</span></span>
<span class="line"><span class="__shiki_1itgoe">            finally</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.connection_count </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.active_connections.dec()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> monitoring_interceptor</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> record_metrics</span><span class="__shiki_140thh">(self, method: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, duration: </span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">, success: </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;记录请求指标&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;success&#39;</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> success </span><span class="__shiki_1itgoe">else</span><span class="__shiki_mdbnqw"> &#39;error&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.request_counter.labels(</span><span class="__shiki_1jdh33">method</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">method, </span><span class="__shiki_1jdh33">status</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">status).inc()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.request_duration.observe(duration)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录资源使用情况</span></span>
<span class="line"><span class="__shiki_140thh">        process </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> psutil.Process()</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.memory_usage.set(process.memory_info().rss)</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.cpu_usage.set(process.cpu_percent())</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> get_performance_report</span><span class="__shiki_140thh">(self) -&gt; </span><span class="__shiki_dzsirb">dict</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;生成性能报告&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        uptime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.start_time</span></span>
<span class="line"><span class="__shiki_140thh">        process </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> psutil.Process()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;uptime_seconds&#39;</span><span class="__shiki_140thh">: uptime,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;active_connections&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.connection_count,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;memory_usage_bytes&#39;</span><span class="__shiki_140thh">: process.memory_info().rss,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;cpu_percent&#39;</span><span class="__shiki_140thh">: process.cpu_percent(),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;open_files&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">len</span><span class="__shiki_140thh">(process.open_files()),</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;threads_count&#39;</span><span class="__shiki_140thh">: process.num_threads(),</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启动监控服务器</span></span>
<span class="line"><span class="__shiki_140thh">monitor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> PerformanceMonitor()</span></span>
<span class="line"><span class="__shiki_140thh">start_http_server(</span><span class="__shiki_dzsirb">8000</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd"># Prometheus metrics endpoint</span></span></code></pre></div><h3 id="_7-2-自适应限流" tabindex="-1">7.2 自适应限流 <a class="header-anchor" href="#_7-2-自适应限流" aria-label="Permalink to &quot;7.2 自适应限流&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> Dict</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> numpy </span><span class="__shiki_1itgoe">as</span><span class="__shiki_140thh"> np</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> dataclasses </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> dataclass</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">@dataclass</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AdaptiveRateLimitConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    initial_rps: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">    min_rps: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_140thh">    max_rps: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">    window_size: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_21nrsd">  # 统计窗口(秒)</span></span>
<span class="line"><span class="__shiki_140thh">    adjustment_interval: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd">  # 调整间隔(秒)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AdaptiveRateLimiter</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, config: AdaptiveRateLimitConfig):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.current_rps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config.initial_rps</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.request_times: Dict[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}  </span><span class="__shiki_21nrsd"># method -&gt; timestamps</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.error_rates: Dict[</span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {}   </span><span class="__shiki_21nrsd"># method -&gt; error rate</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.last_adjustment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> should_rate_limit</span><span class="__shiki_140thh">(self, method: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">) -&gt; </span><span class="__shiki_dzsirb">bool</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        current_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 清理过期请求记录</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> method </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.request_times:</span></span>
<span class="line"><span class="__shiki_140thh">            window_start </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.config.window_size</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.request_times[method] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">                t </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> t </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.request_times[method] </span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> t </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> window_start</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 检查是否超过当前RPS限制</span></span>
<span class="line"><span class="__shiki_140thh">        recent_requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.request_times.get(method, [])</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(recent_requests) </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.current_rps:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录请求时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> method </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.request_times:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.request_times[method] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.request_times[method].append(current_time)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 定期调整限流阈值</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> current_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.last_adjustment </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.config.adjustment_interval:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">._adjust_rate_limit()</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.last_adjustment </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> current_time</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> record_error</span><span class="__shiki_140thh">(self, method: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;记录错误，用于调整限流&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> method </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.error_rates:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.error_rates[method] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 使用指数移动平均更新错误率</span></span>
<span class="line"><span class="__shiki_140thh">        alpha </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.7</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.error_rates[method] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">            alpha </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.error_rates[method] </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> alpha) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1.0</span><span class="__shiki_21nrsd">  # 这次请求错误</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> record_success</span><span class="__shiki_140thh">(self, method: </span><span class="__shiki_dzsirb">str</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;记录成功，用于调整限流&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> method </span><span class="__shiki_1itgoe">not</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.error_rates:</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.error_rates[method] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.0</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        alpha </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.7</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.error_rates[method] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">            alpha </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.error_rates[method] </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">            (</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> alpha) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.0</span><span class="__shiki_21nrsd">  # 这次请求成功</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _adjust_rate_limit</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;根据错误率自适应调整限流阈值&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.error_rates:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        avg_error_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> np.mean(</span><span class="__shiki_dzsirb">list</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.error_rates.values()))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> avg_error_rate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.1</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 错误率高于10%，降低限流</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.current_rps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.config.min_rps, </span></span>
<span class="line"><span class="__shiki_dzsirb">                int</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.current_rps </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> avg_error_rate </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 错误率低于1%，提高限流</span></span>
<span class="line"><span class="__shiki_dzsirb">            self</span><span class="__shiki_140thh">.current_rps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> min</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">                self</span><span class="__shiki_140thh">.config.max_rps, </span></span>
<span class="line"><span class="__shiki_dzsirb">                int</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.current_rps </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1.2</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span></code></pre></div><h2 id="_8-部署与基础设施优化" tabindex="-1">8. 部署与基础设施优化 <a class="header-anchor" href="#_8-部署与基础设施优化" aria-label="Permalink to &quot;8. 部署与基础设施优化&quot;">​</a></h2><h3 id="_8-1-kubernetes优化配置" tabindex="-1">8.1 Kubernetes优化配置 <a class="header-anchor" href="#_8-1-kubernetes优化配置" aria-label="Permalink to &quot;8.1 Kubernetes优化配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># grpc-server-optimized.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grpc-server</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grpc-server</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grpc-server</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grpc-server</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">my-grpc-server:optimized</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50051</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;250m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GRPC_VERBOSITY</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ERROR&quot;</span><span class="__shiki_21nrsd">  # 减少日志级别</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GRPC_TRACE</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;connectivity_state,http&quot;</span><span class="__shiki_21nrsd">  # 仅跟踪关键指标</span></span>
<span class="line"><span class="__shiki_17hn0y">        livenessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;grpc_health_probe&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-addr=:50051&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">        readinessProbe</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;grpc_health_probe&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-addr=:50051&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">          initialDelaySeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_17hn0y">          periodSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 优化容器设置</span></span>
<span class="line"><span class="__shiki_17hn0y">        securityContext</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          capabilities</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            drop</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            - </span><span class="__shiki_mdbnqw">ALL</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnlyRootFilesystem</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tmp</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/tmp</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tmp</span></span>
<span class="line"><span class="__shiki_17hn0y">        emptyDir</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 优化Pod调度</span></span>
<span class="line"><span class="__shiki_17hn0y">      affinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        podAntiAffinity</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          preferredDuringSchedulingIgnoredDuringExecution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">weight</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">            podAffinityTerm</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              labelSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">                matchExpressions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">                  operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">In</span></span>
<span class="line"><span class="__shiki_17hn0y">                  values</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                  - </span><span class="__shiki_mdbnqw">grpc-server</span></span>
<span class="line"><span class="__shiki_17hn0y">              topologyKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/hostname</span></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Service</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grpc-service</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    service.alpha.kubernetes.io/app-protocols</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;{&quot;grpc&quot;:&quot;HTTP2&quot;}&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grpc-server</span></span>
<span class="line"><span class="__shiki_17hn0y">  ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50051</span></span>
<span class="line"><span class="__shiki_17hn0y">    targetPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50051</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">grpc</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LoadBalancer</span></span></code></pre></div><h3 id="_8-2-性能测试与基准" tabindex="-1">8.2 性能测试与基准 <a class="header-anchor" href="#_8-2-性能测试与基准" aria-label="Permalink to &quot;8.2 性能测试与基准&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> asyncio</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> time</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> concurrent.futures </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> ThreadPoolExecutor</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> statistics</span></span>
<span class="line"><span class="__shiki_1itgoe">from</span><span class="__shiki_140thh"> typing </span><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> List, Dict</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> PerformanceBenchmark</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_dzsirb"> __init__</span><span class="__shiki_140thh">(self, stub, num_requests: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">, concurrency: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.stub </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> stub</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.num_requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> num_requests</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.concurrency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> concurrency</span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">.results: List[</span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> []</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> run_benchmark</span><span class="__shiki_140thh">(self):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;运行性能基准测试&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Starting benchmark: </span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.num_requests</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> requests with </span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.concurrency</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> concurrent clients&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        semaphore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> asyncio.Semaphore(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.concurrency)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        async</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> make_request</span><span class="__shiki_140thh">(request_id: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_1itgoe">            async</span><span class="__shiki_1itgoe"> with</span><span class="__shiki_140thh"> semaphore:</span></span>
<span class="line"><span class="__shiki_140thh">                start_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_1itgoe">                try</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">                    # 这里调用实际的gRPC方法</span></span>
<span class="line"><span class="__shiki_140thh">                    response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.stub.SomeMethod(create_test_request(request_id))</span></span>
<span class="line"><span class="__shiki_140thh">                    end_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> time.time()</span></span>
<span class="line"><span class="__shiki_140thh">                    latency </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> (end_time </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> start_time) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  # 转换为毫秒</span></span>
<span class="line"><span class="__shiki_dzsirb">                    self</span><span class="__shiki_140thh">.results.append(latency)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> True</span></span>
<span class="line"><span class="__shiki_1itgoe">                except</span><span class="__shiki_dzsirb"> Exception</span><span class="__shiki_1itgoe"> as</span><span class="__shiki_140thh"> e:</span></span>
<span class="line"><span class="__shiki_dzsirb">                    print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Request </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">request_id</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> failed: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">e</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    return</span><span class="__shiki_dzsirb"> False</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 创建并执行所有请求</span></span>
<span class="line"><span class="__shiki_140thh">        tasks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [make_request(i) </span><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_dzsirb"> range</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.num_requests)]</span></span>
<span class="line"><span class="__shiki_140thh">        results </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> asyncio.gather(</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">tasks, </span><span class="__shiki_1jdh33">return_exceptions</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        successful_requests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> sum</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_1itgoe"> for</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> results </span><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> r </span><span class="__shiki_1itgoe">is</span><span class="__shiki_dzsirb"> True</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        success_rate </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> successful_requests </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.num_requests</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        self</span><span class="__shiki_140thh">._print_report(success_rate)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> _print_report</span><span class="__shiki_140thh">(self, success_rate: </span><span class="__shiki_dzsirb">float</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;打印性能报告&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> not</span><span class="__shiki_dzsirb"> self</span><span class="__shiki_140thh">.results:</span></span>
<span class="line"><span class="__shiki_dzsirb">            print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;No successful requests to analyze&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">=== Performance Benchmark Results ===&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Total Requests: </span><span class="__shiki_dzsirb">{self</span><span class="__shiki_140thh">.num_requests</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Success Rate: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">success_rate</span><span class="__shiki_1itgoe">:.2%</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Successful Requests: </span><span class="__shiki_dzsirb">{len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results)</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Average Latency: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">statistics.mean(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results)</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> ms&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Median Latency: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">statistics.median(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results)</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> ms&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;95th Percentile: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">np.percentile(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results, </span><span class="__shiki_dzsirb">95</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> ms&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;99th Percentile: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">np.percentile(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results, </span><span class="__shiki_dzsirb">99</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> ms&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Minimum Latency: </span><span class="__shiki_dzsirb">{min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results)</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> ms&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Maximum Latency: </span><span class="__shiki_dzsirb">{max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results)</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> ms&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Standard Deviation: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">statistics.stdev(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results)</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> ms&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 吞吐量计算</span></span>
<span class="line"><span class="__shiki_140thh">        total_time </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_21nrsd">  # 最慢请求的时间(秒)</span></span>
<span class="line"><span class="__shiki_140thh">        throughput </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> len</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">self</span><span class="__shiki_140thh">.results) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> total_time</span></span>
<span class="line"><span class="__shiki_dzsirb">        print</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">f</span><span class="__shiki_mdbnqw">&quot;Throughput: </span><span class="__shiki_dzsirb">{</span><span class="__shiki_140thh">throughput</span><span class="__shiki_1itgoe">:.2f</span><span class="__shiki_dzsirb">}</span><span class="__shiki_mdbnqw"> requests/second&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> create_test_request</span><span class="__shiki_140thh">(request_id: </span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">):</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;创建测试请求&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> TestRequest(</span></span>
<span class="line"><span class="__shiki_1jdh33">        id</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">request_id,</span></span>
<span class="line"><span class="__shiki_1jdh33">        timestamp</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">int</span><span class="__shiki_140thh">(time.time()),</span></span>
<span class="line"><span class="__shiki_1jdh33">        payload</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;x&quot;</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_21nrsd">  # 100字节负载</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span></code></pre></div><h2 id="_9-性能优化检查清单" tabindex="-1">9. 性能优化检查清单 <a class="header-anchor" href="#_9-性能优化检查清单" aria-label="Permalink to &quot;9. 性能优化检查清单&quot;">​</a></h2><h3 id="_9-1-配置优化检查表" tabindex="-1">9.1 配置优化检查表 <a class="header-anchor" href="#_9-1-配置优化检查表" aria-label="Permalink to &quot;9.1 配置优化检查表&quot;">​</a></h3><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> OptimizationChecklist</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;&quot;&quot;gRPC性能优化检查清单&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> check_server_config</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查服务器配置&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        checklist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;连接设置&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;启用连接池&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;配置合适的最大并发流&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;设置连接超时和空闲超时&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;资源管理&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;配置合适的工作线程数&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;设置合理的消息大小限制&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;启用内存监控&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;传输优化&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;启用Keepalive&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;配置合适的流量控制窗口&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;启用压缩(对于大消息)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> checklist</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> check_client_config</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查客户端配置&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        checklist </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;连接管理&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;使用连接池复用连接&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;配置负载均衡策略&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;设置连接超时和重试策略&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;性能优化&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;启用请求批处理&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;配置合适的并发限制&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;使用异步非阻塞调用&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;容错处理&quot;</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;实现熔断器模式&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;配置服务降级策略&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;设置超时和截止时间&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            ]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> checklist</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    @</span><span class="__shiki_dzsirb">staticmethod</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> check_protobuf_optimization</span><span class="__shiki_140thh">():</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;检查Protocol Buffers优化&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;使用合适的数值类型(sint32/64用于有符号数)&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;避免过度嵌套的消息结构&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;使用packed=true处理重复字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;合理使用oneof处理互斥字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;避免不必要的可选字段&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>这份学习笔记全面覆盖了从网络基础到gRPC性能优化的各个方面。关键优化点包括：</p><ol><li><strong>网络层</strong>：TCP参数调优、HTTP/2特性利用</li><li><strong>协议层</strong>：Protocol Buffers消息设计优化、压缩策略</li><li><strong>应用层</strong>：连接池管理、负载均衡、批处理</li><li><strong>基础设施</strong>：容器化部署、监控告警、自动扩缩容</li><li><strong>容错机制</strong>：熔断器、限流、重试策略</li></ol><p>性能优化是一个持续的过程，需要根据实际的业务场景和负载特征进行调整。建议在生产环境中建立完善的监控体系，基于真实数据做出优化决策。</p>`,51)])])}const d=a(p,[["render",h]]);export{r as __pageData,d as default};
