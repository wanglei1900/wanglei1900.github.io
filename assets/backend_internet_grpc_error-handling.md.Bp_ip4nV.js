import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"网络基础 - gRPC 错误处理学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"backend/internet/grpc/error-handling.md","filePath":"backend/internet/grpc/error-handling.md"}'),p={name:"backend/internet/grpc/error-handling.md"};function h(l,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="网络基础-grpc-错误处理学习笔记" tabindex="-1">网络基础 - gRPC 错误处理学习笔记 <a class="header-anchor" href="#网络基础-grpc-错误处理学习笔记" aria-label="Permalink to &quot;网络基础 - gRPC 错误处理学习笔记&quot;">​</a></h1><h2 id="_1-网络错误基础" tabindex="-1">1. 网络错误基础 <a class="header-anchor" href="#_1-网络错误基础" aria-label="Permalink to &quot;1. 网络错误基础&quot;">​</a></h2><h3 id="_1-1-网络错误分类" tabindex="-1">1.1 网络错误分类 <a class="header-anchor" href="#_1-1-网络错误分类" aria-label="Permalink to &quot;1.1 网络错误分类&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[网络错误分类] --&gt; B[传输层错误]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[应用层错误]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[业务逻辑错误]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[连接超时]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[连接拒绝]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[DNS解析失败]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[HTTP状态码]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[gRPC状态码]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[序列化错误]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[数据验证失败]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[权限不足]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[资源不存在]</span></span></code></pre></div><h3 id="_1-2-http-2-错误机制" tabindex="-1">1.2 HTTP/2 错误机制 <a class="header-anchor" href="#_1-2-http-2-错误机制" aria-label="Permalink to &quot;1.2 HTTP/2 错误机制&quot;">​</a></h3><ul><li><strong>RST_STREAM</strong>: 立即终止流</li><li><strong>GOAWAY</strong>: 优雅停止连接</li><li><strong>连接级别错误</strong>: 影响所有活跃流</li><li><strong>流级别错误</strong>: 仅影响单个流</li></ul><h2 id="_2-grpc-错误处理架构" tabindex="-1">2. gRPC 错误处理架构 <a class="header-anchor" href="#_2-grpc-错误处理架构" aria-label="Permalink to &quot;2. gRPC 错误处理架构&quot;">​</a></h2><h3 id="_2-1-grpc-错误处理层次" tabindex="-1">2.1 gRPC 错误处理层次 <a class="header-anchor" href="#_2-1-grpc-错误处理层次" aria-label="Permalink to &quot;2.1 gRPC 错误处理层次&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[gRPC错误处理] --&gt; B[传输层]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; C[协议层]</span></span>
<span class="line"><span class="__shiki_140thh">    A --&gt; D[应用层]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B1[连接管理]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B2[超时控制]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; B3[负载均衡]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C1[状态码]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C2[错误消息]</span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; C3[错误详情]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D1[业务验证]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D2[数据转换]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; D3[服务治理]</span></span></code></pre></div><h2 id="_3-grpc-状态码详解" tabindex="-1">3. gRPC 状态码详解 <a class="header-anchor" href="#_3-grpc-状态码详解" aria-label="Permalink to &quot;3. gRPC 状态码详解&quot;">​</a></h2><h3 id="_3-1-标准状态码分类" tabindex="-1">3.1 标准状态码分类 <a class="header-anchor" href="#_3-1-标准状态码分类" aria-label="Permalink to &quot;3.1 标准状态码分类&quot;">​</a></h3><table tabindex="0"><thead><tr><th>类别</th><th>状态码</th><th>描述</th><th>典型场景</th></tr></thead><tbody><tr><td><strong>成功</strong></td><td><code>OK</code></td><td>成功</td><td>正常响应</td></tr><tr><td><strong>客户端错误</strong></td><td><code>INVALID_ARGUMENT</code></td><td>无效参数</td><td>参数验证失败</td></tr><tr><td></td><td><code>FAILED_PRECONDITION</code></td><td>前置条件失败</td><td>业务规则不满足</td></tr><tr><td></td><td><code>OUT_OF_RANGE</code></td><td>超出范围</td><td>分页越界</td></tr><tr><td></td><td><code>UNAUTHENTICATED</code></td><td>未认证</td><td>缺少认证信息</td></tr><tr><td></td><td><code>PERMISSION_DENIED</code></td><td>权限不足</td><td>访问控制拒绝</td></tr><tr><td></td><td><code>NOT_FOUND</code></td><td>未找到</td><td>资源不存在</td></tr><tr><td><strong>服务器错误</strong></td><td><code>INTERNAL</code></td><td>内部错误</td><td>服务器异常</td></tr><tr><td></td><td><code>UNAVAILABLE</code></td><td>服务不可用</td><td>服务降级</td></tr><tr><td></td><td><code>DATA_LOSS</code></td><td>数据丢失</td><td>数据损坏</td></tr><tr><td></td><td><code>UNIMPLEMENTED</code></td><td>未实现</td><td>方法未实现</td></tr><tr><td><strong>流控制</strong></td><td><code>CANCELLED</code></td><td>已取消</td><td>客户端取消请求</td></tr><tr><td></td><td><code>DEADLINE_EXCEEDED</code></td><td>截止时间超时</td><td>处理超时</td></tr><tr><td></td><td><code>RESOURCE_EXHAUSTED</code></td><td>资源耗尽</td><td>限流、配额不足</td></tr></tbody></table><h3 id="_3-2-状态码使用指南" tabindex="-1">3.2 状态码使用指南 <a class="header-anchor" href="#_3-2-状态码使用指南" aria-label="Permalink to &quot;3.2 状态码使用指南&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">errors</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 状态码使用示例</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> validateUserRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">req</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">UserRequest</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> req.</span><span class="__shiki_1t8gfj">GetUsername</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.InvalidArgument, </span><span class="__shiki_mdbnqw">&quot;username is required&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(req.</span><span class="__shiki_1t8gfj">GetPassword</span><span class="__shiki_140thh">()) </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 8</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(codes.InvalidArgument, </span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;password must be at least 8 characters, got </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">len</span><span class="__shiki_140thh">(req.</span><span class="__shiki_1t8gfj">GetPassword</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> req.</span><span class="__shiki_1t8gfj">GetAge</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> req.</span><span class="__shiki_1t8gfj">GetAge</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 150</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.OutOfRange, </span><span class="__shiki_mdbnqw">&quot;age must be between 0 and 150&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> authenticateUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">token</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> token </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.Unauthenticated, </span><span class="__shiki_mdbnqw">&quot;authentication token is required&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟认证检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> token </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &quot;valid-token&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.PermissionDenied, </span><span class="__shiki_mdbnqw">&quot;invalid authentication token&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-错误处理实现" tabindex="-1">4. 错误处理实现 <a class="header-anchor" href="#_4-错误处理实现" aria-label="Permalink to &quot;4. 错误处理实现&quot;">​</a></h2><h3 id="_4-1-服务器端错误处理" tabindex="-1">4.1 服务器端错误处理 <a class="header-anchor" href="#_4-1-服务器端错误处理" aria-label="Permalink to &quot;4.1 服务器端错误处理&quot;">​</a></h3><h4 id="_4-1-1-基础错误处理" tabindex="-1">4.1.1 基础错误处理 <a class="header-anchor" href="#_4-1-1-基础错误处理" aria-label="Permalink to &quot;4.1.1 基础错误处理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">database/sql</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">errors</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/go-sql-driver/mysql</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> userService</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    db </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">sql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">DB</span></span>
<span class="line"><span class="__shiki_1t8gfj">    pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UnimplementedUserServiceServer</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">userService</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GetUserRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 参数验证</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> req.</span><span class="__shiki_1t8gfj">GetId</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.InvalidArgument, </span><span class="__shiki_mdbnqw">&quot;user ID must be positive&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 数据库查询</span></span>
<span class="line"><span class="__shiki_140thh">    user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">findUserByID</span><span class="__shiki_140thh">(ctx, req.</span><span class="__shiki_1t8gfj">GetId</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">handleDatabaseError</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;failed to get user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> user, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">userService</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CreateUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CreateUserRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 业务验证</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> validateUser</span><span class="__shiki_140thh">(req.</span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">()); err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查用户是否已存在</span></span>
<span class="line"><span class="__shiki_140thh">    existing, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">findUserByEmail</span><span class="__shiki_140thh">(ctx, req.</span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">GetEmail</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">errors.</span><span class="__shiki_1t8gfj">Is</span><span class="__shiki_140thh">(err, sql.ErrNoRows) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">handleDatabaseError</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;failed to check existing user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> existing </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.AlreadyExists, </span></span>
<span class="line"><span class="__shiki_140thh">            fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user with email </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> already exists&quot;</span><span class="__shiki_140thh">, req.</span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">GetEmail</span><span class="__shiki_140thh">()))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 创建用户</span></span>
<span class="line"><span class="__shiki_140thh">    userID, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">insertUser</span><span class="__shiki_140thh">(ctx, req.</span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, </span><span class="__shiki_1t8gfj">handleDatabaseError</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;failed to create user&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> s.</span><span class="__shiki_1t8gfj">findUserByID</span><span class="__shiki_140thh">(ctx, userID)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 数据库错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> handleDatabaseError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">Is</span><span class="__shiki_140thh">(err, sql.ErrNoRows) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.NotFound, </span><span class="__shiki_mdbnqw">&quot;resource not found&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> mysqlErr </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">mysql</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">MySQLError</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> errors.</span><span class="__shiki_1t8gfj">As</span><span class="__shiki_140thh">(err, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_140thh">mysqlErr) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> mysqlErr.Number {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_dzsirb"> 1062</span><span class="__shiki_140thh">: </span><span class="__shiki_21nrsd">// Duplicate entry</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.AlreadyExists, </span><span class="__shiki_mdbnqw">&quot;resource already exists&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_dzsirb"> 1045</span><span class="__shiki_140thh">: </span><span class="__shiki_21nrsd">// Access denied</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.PermissionDenied, </span><span class="__shiki_mdbnqw">&quot;database access denied&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_dzsirb"> 2003</span><span class="__shiki_140thh">: </span><span class="__shiki_21nrsd">// Connection refused</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.Unavailable, </span><span class="__shiki_mdbnqw">&quot;database unavailable&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;MySQL error </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, mysqlErr.Number, mysqlErr.Message)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.Internal, </span><span class="__shiki_mdbnqw">&quot;database error occurred&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Database error: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.Internal, message)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-1-2-高级错误详情" tabindex="-1">4.1.2 高级错误详情 <a class="header-anchor" href="#_4-1-2-高级错误详情" aria-label="Permalink to &quot;4.1.2 高级错误详情&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/genproto/googleapis/rpc/errdetails</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">s </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">userService</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CreateUserWithDetails</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CreateUserRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 复杂验证</span></span>
<span class="line"><span class="__shiki_140thh">    violations </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> validateUserDetailed</span><span class="__shiki_140thh">(req.</span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(violations) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        st </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(codes.InvalidArgument, </span><span class="__shiki_mdbnqw">&quot;validation failed&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 添加错误详情</span></span>
<span class="line"><span class="__shiki_140thh">        badRequest </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">errdetails</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">BadRequest</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_1itgoe">        for</span><span class="__shiki_140thh"> _, violation </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> violations {</span></span>
<span class="line"><span class="__shiki_140thh">            badRequest.FieldViolations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(badRequest.FieldViolations, </span></span>
<span class="line"><span class="__shiki_1itgoe">                &amp;</span><span class="__shiki_1t8gfj">errdetails</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">BadRequest_FieldViolation</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">                    Field:       violation.Field,</span></span>
<span class="line"><span class="__shiki_140thh">                    Description: violation.Description,</span></span>
<span class="line"><span class="__shiki_140thh">                })</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        st, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> st.</span><span class="__shiki_1t8gfj">WithDetails</span><span class="__shiki_140thh">(badRequest)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.Internal, </span><span class="__shiki_mdbnqw">&quot;failed to create error details&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 处理请求...</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">{}, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> ValidationViolation</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Field       </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Description </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> validateUserDetailed</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) []</span><span class="__shiki_1t8gfj">ValidationViolation</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> violations []</span><span class="__shiki_1t8gfj">ValidationViolation</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> user.</span><span class="__shiki_1t8gfj">GetName</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        violations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(violations, </span><span class="__shiki_1t8gfj">ValidationViolation</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Field:       </span><span class="__shiki_mdbnqw">&quot;name&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Description: </span><span class="__shiki_mdbnqw">&quot;name is required&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> user.</span><span class="__shiki_1t8gfj">GetEmail</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &quot;&quot;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        violations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(violations, </span><span class="__shiki_1t8gfj">ValidationViolation</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Field:       </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Description: </span><span class="__shiki_mdbnqw">&quot;email is required&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">isValidEmail</span><span class="__shiki_140thh">(user.</span><span class="__shiki_1t8gfj">GetEmail</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">        violations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(violations, </span><span class="__shiki_1t8gfj">ValidationViolation</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Field:       </span><span class="__shiki_mdbnqw">&quot;email&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Description: </span><span class="__shiki_mdbnqw">&quot;email format is invalid&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> violations</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-客户端错误处理" tabindex="-1">4.2 客户端错误处理 <a class="header-anchor" href="#_4-2-客户端错误处理" aria-label="Permalink to &quot;4.2 客户端错误处理&quot;">​</a></h3><h4 id="_4-2-1-基础错误处理" tabindex="-1">4.2.1 基础错误处理 <a class="header-anchor" href="#_4-2-1-基础错误处理" aria-label="Permalink to &quot;4.2.1 基础错误处理&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">fmt</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">io</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> UserClient</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client </span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserServiceClient</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userID</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.client.</span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GetUserRequest</span><span class="__shiki_140thh">{Id: userID})</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, c.</span><span class="__shiki_1t8gfj">handleGRPCError</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;GetUser&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> resp, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 统一的gRPC错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleGRPCError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">operation</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    st, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">FromError</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 非gRPC错误（如网络错误）</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Non-gRPC error in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;network error in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> st.</span><span class="__shiki_1t8gfj">Code</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.NotFound:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;User not found in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;user not found: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.InvalidArgument:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Invalid argument in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;invalid input: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.PermissionDenied:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Permission denied in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;access denied: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.Unavailable:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Service unavailable in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;service temporarily unavailable: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.DeadlineExceeded:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Timeout in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;request timeout: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;gRPC error in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw"> (code: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">): </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Code</span><span class="__shiki_140thh">(), st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;server error in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_4-2-2-高级错误解析" tabindex="-1">4.2.2 高级错误解析 <a class="header-anchor" href="#_4-2-2-高级错误解析" aria-label="Permalink to &quot;4.2.2 高级错误解析&quot;">​</a></h4><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/genproto/googleapis/rpc/errdetails</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">CreateUserWithDetailedError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">user</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">5</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    _, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.client.</span><span class="__shiki_1t8gfj">CreateUserWithDetails</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CreateUserRequest</span><span class="__shiki_140thh">{User: user})</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">handleDetailedError</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleDetailedError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    st, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">FromError</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 解析错误详情</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, detail </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> st.</span><span class="__shiki_1t8gfj">Details</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh"> t </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> detail.(</span><span class="__shiki_1itgoe">type</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">errdetails</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">BadRequest</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">handleBadRequestError</span><span class="__shiki_140thh">(t, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">errdetails</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">QuotaFailure</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">handleQuotaError</span><span class="__shiki_140thh">(t, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">errdetails</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ErrorInfo</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">handleErrorInfo</span><span class="__shiki_140thh">(t)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Code</span><span class="__shiki_140thh">(), st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleBadRequestError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">badReq</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">errdetails</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">BadRequest</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> fieldErrors []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, violation </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> badReq.FieldViolations {</span></span>
<span class="line"><span class="__shiki_140thh">        fieldErrors </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(fieldErrors, </span></span>
<span class="line"><span class="__shiki_140thh">            fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, violation.Field, violation.Description))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(fieldErrors) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;validation failed: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, fieldErrors)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;bad request: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, message)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleQuotaError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">quota</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">errdetails</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">QuotaFailure</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> quotaViolations []</span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> _, violation </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> range</span><span class="__shiki_140thh"> quota.Violations {</span></span>
<span class="line"><span class="__shiki_140thh">        quotaViolations </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> append</span><span class="__shiki_140thh">(quotaViolations,</span></span>
<span class="line"><span class="__shiki_140thh">            fmt.</span><span class="__shiki_1t8gfj">Sprintf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, violation.Subject, violation.Description))</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Quota exceeded: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, quotaViolations)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;quota limit exceeded: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, message)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleErrorInfo</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">info</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">errdetails</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ErrorInfo</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Error info - Domain: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">, Reason: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">, Metadata: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        info.Domain, info.Reason, info.Metadata)</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, info.Reason, info.Domain)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-流式错误处理" tabindex="-1">4.3 流式错误处理 <a class="header-anchor" href="#_4-3-流式错误处理" aria-label="Permalink to &quot;4.3 流式错误处理&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">io</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">StreamUsers</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    ctx, cancel </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> context.</span><span class="__shiki_1t8gfj">WithTimeout</span><span class="__shiki_140thh">(context.</span><span class="__shiki_1t8gfj">Background</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">30</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">time.Second)</span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1t8gfj"> cancel</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stream, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.client.</span><span class="__shiki_1t8gfj">StreamUsers</span><span class="__shiki_140thh">(ctx, </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StreamUsersRequest</span><span class="__shiki_140thh">{})</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">handleGRPCError</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;StreamUsers&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> stream.</span><span class="__shiki_1t8gfj">Recv</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_140thh"> io.EOF {</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Println</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Stream completed successfully&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">handleStreamError</span><span class="__shiki_140thh">(err, </span><span class="__shiki_mdbnqw">&quot;StreamUsers&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Received user: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, user.</span><span class="__shiki_1t8gfj">GetName</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">UserClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">handleStreamError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">operation</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    st, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">FromError</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Non-gRPC stream error in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;stream error in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> st.</span><span class="__shiki_1t8gfj">Code</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.Canceled:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Stream canceled in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;stream canceled: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.DeadlineExceeded:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Stream timeout in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;stream timeout: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.ResourceExhausted:</span></span>
<span class="line"><span class="__shiki_140thh">        log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Stream resource exhausted in </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, operation, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;resource exhausted: </span><span class="__shiki_dzsirb">%s</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Message</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">handleGRPCError</span><span class="__shiki_140thh">(err, operation)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-错误处理最佳实践" tabindex="-1">5. 错误处理最佳实践 <a class="header-anchor" href="#_5-错误处理最佳实践" aria-label="Permalink to &quot;5. 错误处理最佳实践&quot;">​</a></h2><h3 id="_5-1-错误处理模式" tabindex="-1">5.1 错误处理模式 <a class="header-anchor" href="#_5-1-错误处理模式" aria-label="Permalink to &quot;5.1 错误处理模式&quot;">​</a></h3><div class="language-mermaid vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">mermaid</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">graph TD</span></span>
<span class="line"><span class="__shiki_140thh">    A[接收请求] --&gt; B[参数验证]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; C[格式错误]</span></span>
<span class="line"><span class="__shiki_140thh">    B --&gt; D[业务验证]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; E[业务错误]</span></span>
<span class="line"><span class="__shiki_140thh">    D --&gt; F[处理请求]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; G[系统错误]</span></span>
<span class="line"><span class="__shiki_140thh">    F --&gt; H[成功响应]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    C --&gt; I[返回 INVALID_ARGUMENT]</span></span>
<span class="line"><span class="__shiki_140thh">    E --&gt; J[返回 FAILED_PRECONDITION]</span></span>
<span class="line"><span class="__shiki_140thh">    G --&gt; K[返回 INTERNAL/UNAVAILABLE]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    I --&gt; L[记录错误日志]</span></span>
<span class="line"><span class="__shiki_140thh">    J --&gt; L</span></span>
<span class="line"><span class="__shiki_140thh">    K --&gt; L</span></span>
<span class="line"><span class="__shiki_140thh">    H --&gt; M[记录成功日志]</span></span></code></pre></div><h3 id="_5-2-重试策略" tabindex="-1">5.2 重试策略 <a class="header-anchor" href="#_5-2-重试策略" aria-label="Permalink to &quot;5.2 重试策略&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">math</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">math/rand</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RetryConfig</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    MaxAttempts   </span><span class="__shiki_1itgoe">int</span></span>
<span class="line"><span class="__shiki_140thh">    InitialDelay  </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    MaxDelay      </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span></span>
<span class="line"><span class="__shiki_140thh">    BackoffFactor </span><span class="__shiki_1itgoe">float64</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> RetryableClient</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    client </span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserServiceClient</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1t8gfj">RetryConfig</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RetryableClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">GetUserWithRetry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">userID</span><span class="__shiki_1itgoe"> int64</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    var</span><span class="__shiki_140thh"> lastErr </span><span class="__shiki_1itgoe">error</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; attempt </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> c.config.MaxAttempts; attempt</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            delay </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">calculateBackoff</span><span class="__shiki_140thh">(attempt)</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Retry attempt </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> after </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, attempt, delay)</span></span>
<span class="line"><span class="__shiki_140thh">            time.</span><span class="__shiki_1t8gfj">Sleep</span><span class="__shiki_140thh">(delay)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> c.</span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">(userID)</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> user, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        lastErr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">c.</span><span class="__shiki_1t8gfj">shouldRetry</span><span class="__shiki_140thh">(err) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            break</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh">, fmt.</span><span class="__shiki_1t8gfj">Errorf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;all </span><span class="__shiki_dzsirb">%d</span><span class="__shiki_mdbnqw"> attempts failed: </span><span class="__shiki_dzsirb">%w</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, c.config.MaxAttempts, lastErr)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RetryableClient</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">shouldRetry</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">bool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    st, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">FromError</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 非gRPC错误，通常不重试</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> st.</span><span class="__shiki_1t8gfj">Code</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.Canceled,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.Unknown,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.DeadlineExceeded,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.ResourceExhausted,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.Aborted,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.Internal,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.Unavailable,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.DataLoss:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_140thh"> codes.InvalidArgument,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.NotFound,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.AlreadyExists,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.PermissionDenied,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.FailedPrecondition,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.OutOfRange,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.Unauthenticated,</span></span>
<span class="line"><span class="__shiki_140thh">         codes.Unimplemented:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> false</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">c </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">RetryConfig</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">calculateBackoff</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">attempt</span><span class="__shiki_1itgoe"> int</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">time</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> attempt </span><span class="__shiki_1itgoe">==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 指数退避 + 抖动</span></span>
<span class="line"><span class="__shiki_140thh">    delay </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(c.InitialDelay) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> math.</span><span class="__shiki_1t8gfj">Pow</span><span class="__shiki_140thh">(c.BackoffFactor, </span><span class="__shiki_1itgoe">float64</span><span class="__shiki_140thh">(attempt</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(c.MaxDelay) {</span></span>
<span class="line"><span class="__shiki_140thh">        delay </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> float64</span><span class="__shiki_140thh">(c.MaxDelay)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加随机抖动 (±20%)</span></span>
<span class="line"><span class="__shiki_140thh">    jitter </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_dzsirb"> 0.2</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> delay </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (rand.</span><span class="__shiki_1t8gfj">Float64</span><span class="__shiki_140thh">()</span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb">2</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    delay </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> jitter</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Duration</span><span class="__shiki_140thh">(delay)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-监控和可观测性" tabindex="-1">5.3 监控和可观测性 <a class="header-anchor" href="#_5-3-监控和可观测性" aria-label="Permalink to &quot;5.3 监控和可观测性&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">time</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">github.com/prometheus/client_golang/prometheus</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">var</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_140thh">    grpcRequestsTotal </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> prometheus.</span><span class="__shiki_1t8gfj">NewCounterVec</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">        prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CounterOpts</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Name: </span><span class="__shiki_mdbnqw">&quot;grpc_requests_total&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Help: </span><span class="__shiki_mdbnqw">&quot;Total number of gRPC requests&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;method&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    grpcRequestDuration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> prometheus.</span><span class="__shiki_1t8gfj">NewHistogramVec</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">        prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">HistogramOpts</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Name:    </span><span class="__shiki_mdbnqw">&quot;grpc_request_duration_seconds&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Help:    </span><span class="__shiki_mdbnqw">&quot;gRPC request duration in seconds&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Buckets: prometheus.DefBuckets,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;method&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;status&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    grpcErrorsByCode </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> prometheus.</span><span class="__shiki_1t8gfj">NewCounterVec</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1t8gfj">        prometheus</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">CounterOpts</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">            Name: </span><span class="__shiki_mdbnqw">&quot;grpc_errors_by_code&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">            Help: </span><span class="__shiki_mdbnqw">&quot;gRPC errors by status code&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        },</span></span>
<span class="line"><span class="__shiki_140thh">        []</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">{</span><span class="__shiki_mdbnqw">&quot;method&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;code&quot;</span><span class="__shiki_140thh">},</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> init</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    prometheus.</span><span class="__shiki_1t8gfj">MustRegister</span><span class="__shiki_140thh">(grpcRequestsTotal)</span></span>
<span class="line"><span class="__shiki_140thh">    prometheus.</span><span class="__shiki_1t8gfj">MustRegister</span><span class="__shiki_140thh">(grpcRequestDuration)</span></span>
<span class="line"><span class="__shiki_140thh">    prometheus.</span><span class="__shiki_1t8gfj">MustRegister</span><span class="__shiki_140thh">(grpcErrorsByCode)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> MonitoringMiddleware</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    next </span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UserServiceServer</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">m </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">MonitoringMiddleware</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">GetUserRequest</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">User</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    start </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">    status </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_mdbnqw"> &quot;success&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    defer</span><span class="__shiki_1itgoe"> func</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">        duration </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> time.</span><span class="__shiki_1t8gfj">Since</span><span class="__shiki_140thh">(start).</span><span class="__shiki_1t8gfj">Seconds</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        grpcRequestsTotal.</span><span class="__shiki_1t8gfj">WithLabelValues</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GetUser&quot;</span><span class="__shiki_140thh">, status).</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        grpcRequestDuration.</span><span class="__shiki_1t8gfj">WithLabelValues</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GetUser&quot;</span><span class="__shiki_140thh">, status).</span><span class="__shiki_1t8gfj">Observe</span><span class="__shiki_140thh">(duration)</span></span>
<span class="line"><span class="__shiki_140thh">    }()</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    user, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> m.next.</span><span class="__shiki_1t8gfj">GetUser</span><span class="__shiki_140thh">(ctx, req)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;error&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> st, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">FromError</span><span class="__shiki_140thh">(err); ok {</span></span>
<span class="line"><span class="__shiki_140thh">            grpcErrorsByCode.</span><span class="__shiki_1t8gfj">WithLabelValues</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;GetUser&quot;</span><span class="__shiki_140thh">, st.</span><span class="__shiki_1t8gfj">Code</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">String</span><span class="__shiki_140thh">()).</span><span class="__shiki_1t8gfj">Inc</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> user, err</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-高级主题" tabindex="-1">6. 高级主题 <a class="header-anchor" href="#_6-高级主题" aria-label="Permalink to &quot;6. 高级主题&quot;">​</a></h2><h3 id="_6-1-自定义错误类型" tabindex="-1">6.1 自定义错误类型 <a class="header-anchor" href="#_6-1-自定义错误类型" aria-label="Permalink to &quot;6.1 自定义错误类型&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">type</span><span class="__shiki_1t8gfj"> BusinessError</span><span class="__shiki_1itgoe"> struct</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    Code       </span><span class="__shiki_1t8gfj">codes</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Code</span></span>
<span class="line"><span class="__shiki_140thh">    Message    </span><span class="__shiki_1itgoe">string</span></span>
<span class="line"><span class="__shiki_140thh">    Details    </span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}</span></span>
<span class="line"><span class="__shiki_140thh">    Retryable  </span><span class="__shiki_1itgoe">bool</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BusinessError</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> e.Message</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_140thh"> (</span><span class="__shiki_1jdh33">e </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BusinessError</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">GRPCStatus</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">status</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Status</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    st </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">New</span><span class="__shiki_140thh">(e.Code, e.Message)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加自定义错误详情</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> len</span><span class="__shiki_140thh">(e.Details) </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 可以转换为 errdetails.ErrorInfo 或其他标准类型</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> st</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> NewBusinessError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">code</span><span class="__shiki_1t8gfj"> codes</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Code</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">message</span><span class="__shiki_1itgoe"> string</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">retryable</span><span class="__shiki_1itgoe"> bool</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_1t8gfj">BusinessError</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> &amp;</span><span class="__shiki_1t8gfj">BusinessError</span><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_140thh">        Code:      code,</span></span>
<span class="line"><span class="__shiki_140thh">        Message:   message,</span></span>
<span class="line"><span class="__shiki_140thh">        Details:   </span><span class="__shiki_1t8gfj">make</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">map</span><span class="__shiki_140thh">[</span><span class="__shiki_1itgoe">string</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}),</span></span>
<span class="line"><span class="__shiki_140thh">        Retryable: retryable,</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用自定义错误</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> processOrder</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">order</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">pb</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Order</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> order.</span><span class="__shiki_1t8gfj">GetAmount</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">&lt;=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> NewBusinessError</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            codes.InvalidArgument,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;order amount must be positive&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_1t8gfj">isInventoryAvailable</span><span class="__shiki_140thh">(order) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> NewBusinessError</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">            codes.FailedPrecondition,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;insufficient inventory&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            true</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 可能稍后重试</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-全局错误处理器" tabindex="-1">6.2 全局错误处理器 <a class="header-anchor" href="#_6-2-全局错误处理器" aria-label="Permalink to &quot;6.2 全局错误处理器&quot;">​</a></h3><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_1t8gfj"> main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> (</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">context</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/codes</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;</span><span class="__shiki_1t8gfj">google.golang.org/grpc/status</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> GlobalErrorHandler</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">ctx</span><span class="__shiki_1t8gfj"> context</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">Context</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">req</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh">{}, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">grpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UnaryServerInfo</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">handler</span><span class="__shiki_1t8gfj"> grpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">UnaryHandler</span><span class="__shiki_140thh">) (</span><span class="__shiki_1itgoe">interface</span><span class="__shiki_140thh">{}, </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    resp, err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> handler</span><span class="__shiki_140thh">(ctx, req)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> resp, </span><span class="__shiki_1t8gfj">TransformError</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> resp, </span><span class="__shiki_dzsirb">nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> TransformError</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">err</span><span class="__shiki_1itgoe"> error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 转换已知错误类型</span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> e </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> err.(</span><span class="__shiki_1itgoe">type</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    case</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">BusinessError</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> e.</span><span class="__shiki_1t8gfj">GRPCStatus</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">Err</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 确保所有错误都有合适的gRPC状态</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> _, ok </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">FromError</span><span class="__shiki_140thh">(err); </span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">ok {</span></span>
<span class="line"><span class="__shiki_140thh">            log.</span><span class="__shiki_1t8gfj">Printf</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;Transforming non-gRPC error: </span><span class="__shiki_dzsirb">%v</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">, err)</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> status.</span><span class="__shiki_1t8gfj">Error</span><span class="__shiki_140thh">(codes.Internal, </span><span class="__shiki_mdbnqw">&quot;internal server error&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> err</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 流式错误拦截器</span></span>
<span class="line"><span class="__shiki_1itgoe">func</span><span class="__shiki_1t8gfj"> StreamErrorHandler</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">srv</span><span class="__shiki_1itgoe"> interface</span><span class="__shiki_140thh">{}, </span><span class="__shiki_1jdh33">ss</span><span class="__shiki_1t8gfj"> grpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ServerStream</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">info</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_1t8gfj">grpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StreamServerInfo</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">handler</span><span class="__shiki_1t8gfj"> grpc</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">StreamHandler</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">error</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    err </span><span class="__shiki_1itgoe">:=</span><span class="__shiki_1t8gfj"> handler</span><span class="__shiki_140thh">(srv, ss)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> err </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> nil</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_1t8gfj"> TransformError</span><span class="__shiki_140thh">(err)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> nil</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p>这份学习笔记涵盖了 gRPC 错误处理的完整知识体系，从基础的状态码使用到高级的错误处理模式，包括重试策略、监控和自定义错误类型等高级主题。</p>`,40)])])}const g=a(p,[["render",h]]);export{r as __pageData,g as default};
