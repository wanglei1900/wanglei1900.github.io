import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Docker多阶段构建详解 - 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/docker/multi-stage.md","filePath":"devops/container/docker/multi-stage.md"}'),_={name:"devops/container/docker/multi-stage.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="docker多阶段构建详解-完整学习笔记" tabindex="-1">Docker多阶段构建详解 - 完整学习笔记 <a class="header-anchor" href="#docker多阶段构建详解-完整学习笔记" aria-label="Permalink to &quot;Docker多阶段构建详解 - 完整学习笔记&quot;">​</a></h1><h2 id="一、多阶段构建核心概念" tabindex="-1">一、多阶段构建核心概念 <a class="header-anchor" href="#一、多阶段构建核心概念" aria-label="Permalink to &quot;一、多阶段构建核心概念&quot;">​</a></h2><h3 id="_1-1-什么是多阶段构建" tabindex="-1">1.1 什么是多阶段构建 <a class="header-anchor" href="#_1-1-什么是多阶段构建" aria-label="Permalink to &quot;1.1 什么是多阶段构建&quot;">​</a></h3><p>多阶段构建允许在单个Dockerfile中使用多个<code>FROM</code>指令，每个<code>FROM</code>指令开始一个新的构建阶段。每个阶段可以基于不同的基础镜像，并且可以选择性地将文件从一个阶段复制到另一个阶段。</p><h3 id="_1-2-为什么需要多阶段构建" tabindex="-1">1.2 为什么需要多阶段构建 <a class="header-anchor" href="#_1-2-为什么需要多阶段构建" aria-label="Permalink to &quot;1.2 为什么需要多阶段构建&quot;">​</a></h3><h4 id="传统构建的问题" tabindex="-1">传统构建的问题： <a class="header-anchor" href="#传统构建的问题" aria-label="Permalink to &quot;传统构建的问题：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">传统单阶段构建：</span></span>
<span class="line"><span class="__shiki_wvjl67">应用源代码 + 构建工具 + 运行时依赖 = 最终镜像</span></span>
<span class="line"><span class="__shiki_wvjl67">结果：镜像臃肿（通常&gt;1GB），包含不必要的构建工具和中间文件</span></span></code></pre></div><h4 id="多阶段构建的优势" tabindex="-1">多阶段构建的优势： <a class="header-anchor" href="#多阶段构建的优势" aria-label="Permalink to &quot;多阶段构建的优势：&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">第一阶段（构建阶段）：应用源代码 + 构建工具 = 编译产物</span></span>
<span class="line"><span class="__shiki_wvjl67">第二阶段（运行阶段）：仅运行时依赖 + 编译产物 = 最终镜像</span></span>
<span class="line"><span class="__shiki_wvjl67">结果：镜像精简（通常&lt;100MB），安全且高效</span></span></code></pre></div><h3 id="_1-3-核心优势对比" tabindex="-1">1.3 核心优势对比 <a class="header-anchor" href="#_1-3-核心优势对比" aria-label="Permalink to &quot;1.3 核心优势对比&quot;">​</a></h3><table tabindex="0"><thead><tr><th>特性</th><th>单阶段构建</th><th>多阶段构建</th></tr></thead><tbody><tr><td>镜像大小</td><td>大（包含所有构建依赖）</td><td>小（仅包含运行时所需）</td></tr><tr><td>安全性</td><td>较低（可能包含敏感信息）</td><td>高（仅暴露运行环境）</td></tr><tr><td>构建速度</td><td>较慢（每次全量构建）</td><td>较快（可缓存中间阶段）</td></tr><tr><td>维护性</td><td>复杂（需手动清理）</td><td>简单（自动分离关注点）</td></tr><tr><td>生产就绪</td><td>需要额外优化</td><td>开箱即用</td></tr></tbody></table><h2 id="二、多阶段构建语法详解" tabindex="-1">二、多阶段构建语法详解 <a class="header-anchor" href="#二、多阶段构建语法详解" aria-label="Permalink to &quot;二、多阶段构建语法详解&quot;">​</a></h2><h3 id="_2-1-基本语法结构" tabindex="-1">2.1 基本语法结构 <a class="header-anchor" href="#_2-1-基本语法结构" aria-label="Permalink to &quot;2.1 基本语法结构&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 第一阶段：构建阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> [基础镜像] </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> [阶段名称]</span></span>
<span class="line"><span class="__shiki_21nrsd"># 构建指令...</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> [构建命令]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：运行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> [运行镜像]</span></span>
<span class="line"><span class="__shiki_21nrsd"># 从构建阶段复制文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=[阶段名称] [源路径] [目标路径]</span></span>
<span class="line"><span class="__shiki_21nrsd"># 运行指令...</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [启动命令]</span></span></code></pre></div><h3 id="_2-2-阶段命名与引用" tabindex="-1">2.2 阶段命名与引用 <a class="header-anchor" href="#_2-2-阶段命名与引用" aria-label="Permalink to &quot;2.2 阶段命名与引用&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方式1：显式命名阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.21-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_21nrsd"># ...构建操作</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> runtime</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app /app  # 引用命名阶段</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方式2：使用阶段索引</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine</span></span>
<span class="line"><span class="__shiki_21nrsd"># ...第一阶段</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> python:3.11-slim</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=0 /dist /app/dist  # 引用阶段索引(0代表第一个FROM)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方式3：使用外部镜像</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=nginx:alpine /etc/nginx/nginx.conf /app/nginx.conf</span></span></code></pre></div><h3 id="_2-3-高级语法特性" tabindex="-1">2.3 高级语法特性 <a class="header-anchor" href="#_2-3-高级语法特性" aria-label="Permalink to &quot;2.3 高级语法特性&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 多阶段并行构建（Docker 18.09+）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.21 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> backend-builder</span></span>
<span class="line"><span class="__shiki_21nrsd"># ...后端构建</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> frontend-builder</span></span>
<span class="line"><span class="__shiki_21nrsd"># ...前端构建</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 条件构建（需BuildKit）</span></span>
<span class="line"><span class="__shiki_21nrsd"># docker build --target builder --build-arg BUILD_ENV=production</span></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> BUILD_ENV=production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> base </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> development-build</span></span>
<span class="line"><span class="__shiki_21nrsd"># 开发环境构建逻辑</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> base </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> production-build</span></span>
<span class="line"><span class="__shiki_21nrsd"># 生产环境构建逻辑</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 动态选择目标阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> base </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> final</span></span>
<span class="line"><span class="__shiki_21nrsd"># 根据参数选择文件来源</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=\${BUILD_ENV}-build /app /app</span></span></code></pre></div><h2 id="三、实战案例详解" tabindex="-1">三、实战案例详解 <a class="header-anchor" href="#三、实战案例详解" aria-label="Permalink to &quot;三、实战案例详解&quot;">​</a></h2><h3 id="_3-1-go应用多阶段构建" tabindex="-1">3.1 Go应用多阶段构建 <a class="header-anchor" href="#_3-1-go应用多阶段构建" aria-label="Permalink to &quot;3.1 Go应用多阶段构建&quot;">​</a></h3><h4 id="完整示例" tabindex="-1">完整示例： <a class="header-anchor" href="#完整示例" aria-label="Permalink to &quot;完整示例：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 第一阶段：依赖下载阶段（利用缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.21-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> deps</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /src</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> go.mod go.sum ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> go mod download</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：构建阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.21-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /build</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从依赖阶段复制go modules缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=deps /go/pkg/mod /go/pkg/mod</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制源代码</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 构建参数</span></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> VERSION=1.0.0</span></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> COMMIT_HASH=unknown</span></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> BUILD_TIME</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 编译（禁用CGO，静态链接）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> CGO_ENABLED=0 GOOS=linux go build \\</span></span>
<span class="line"><span class="__shiki_140thh">    -ldflags=</span><span class="__shiki_mdbnqw">&quot;-w -s \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    -X main.version=\${VERSION} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    -X main.commit=\${COMMIT_HASH} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    -X main.buildTime=\${BUILD_TIME}&quot;</span><span class="__shiki_140thh"> \\</span></span>
<span class="line"><span class="__shiki_140thh">    -o app .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第三阶段：测试阶段（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> builder </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> tester</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> go test -v ./...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第四阶段：运行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> scratch </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> runtime</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制时区数据（如需要）</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /usr/share/zoneinfo /usr/share/zoneinfo</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> TZ=Asia/Shanghai</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制SSL证书</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制应用</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /build/app /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /build/config /config</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> --interval=30s --timeout=3s --start-period=5s --retries=3 \\</span></span>
<span class="line"><span class="__shiki_1itgoe">    CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;/app&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;health&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用非root用户（通过scratch镜像需要特殊处理）</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> 10001:10001</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;/app&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="构建命令" tabindex="-1">构建命令： <a class="header-anchor" href="#构建命令" aria-label="Permalink to &quot;构建命令：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 完整构建</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --target</span><span class="__shiki_mdbnqw"> runtime</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -t</span><span class="__shiki_mdbnqw"> myapp:latest</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 仅构建测试阶段</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --target</span><span class="__shiki_mdbnqw"> tester</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -t</span><span class="__shiki_mdbnqw"> myapp:test</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 带构建参数</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --build-arg</span><span class="__shiki_mdbnqw"> VERSION=</span><span class="__shiki_dzsirb">2.0.0</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --build-arg</span><span class="__shiki_mdbnqw"> COMMIT_HASH=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> rev-parse</span><span class="__shiki_dzsirb"> --short</span><span class="__shiki_mdbnqw"> HEAD</span><span class="__shiki_140thh">) </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --build-arg</span><span class="__shiki_mdbnqw"> BUILD_TIME=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_mdbnqw"> +&#39;%Y-%m-%dT%H:%M:%SZ&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_dzsirb">\\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -t</span><span class="__shiki_mdbnqw"> myapp:</span><span class="__shiki_140thh">$COMMIT_HASH </span><span class="__shiki_mdbnqw">.</span></span></code></pre></div><h3 id="_3-2-node-js应用多阶段构建" tabindex="-1">3.2 Node.js应用多阶段构建 <a class="header-anchor" href="#_3-2-node-js应用多阶段构建" aria-label="Permalink to &quot;3.2 Node.js应用多阶段构建&quot;">​</a></h3><h4 id="完整示例-1" tabindex="-1">完整示例： <a class="header-anchor" href="#完整示例-1" aria-label="Permalink to &quot;完整示例：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 第一阶段：基础依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> base</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> package*.json ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm ci --only=production --ignore-scripts</span></span>
<span class="line"><span class="__shiki_21nrsd"># 保存生产依赖用于运行时</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：开发依赖（用于构建）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> dev-deps</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> package*.json ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm ci --include=dev</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第三阶段：构建器</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从dev-deps复制node_modules</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=dev-deps /app/node_modules ./node_modules</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 环境变量</span></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> NODE_ENV=production</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> NODE_ENV=\${NODE_ENV}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 构建应用</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm run build</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第四阶段：测试（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> builder </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> test</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm test</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第五阶段：运行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> runner</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建非root用户</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> addgroup --system --gid 1001 nodejs</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> adduser --system --uid 1001 nodejs</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从base复制生产依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=base /app/node_modules ./node_modules</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从builder复制构建产物</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app/dist ./dist</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app/package.json ./package.json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制必要的配置文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app/.env.example ./.env</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置权限</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> chown -R nodejs:nodejs /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 切换用户</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> nodejs</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 暴露端口</span></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 3000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> --interval=30s --timeout=10s --start-period=30s \\</span></span>
<span class="line"><span class="__shiki_1itgoe">    CMD</span><span class="__shiki_140thh"> node -e </span><span class="__shiki_mdbnqw">&quot;require(&#39;http&#39;).get(&#39;http://localhost:3000/health&#39;, (r) =&gt; { if (r.statusCode !== 200) throw new Error() })&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启动命令（使用node而不是npm start）</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;node&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;dist/index.js&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="优化技巧" tabindex="-1">优化技巧： <a class="header-anchor" href="#优化技巧" aria-label="Permalink to &quot;优化技巧：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用npm缓存层（加速后续构建）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> npm-cache</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> package*.json ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm cache clean --force &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    npm ci --only=production --prefer-offline --no-audit</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 分离依赖安装，利用Docker缓存</span></span>
<span class="line"><span class="__shiki_21nrsd"># package.json不变时，不会重新安装依赖</span></span></code></pre></div><h3 id="_3-3-java应用多阶段构建" tabindex="-1">3.3 Java应用多阶段构建 <a class="header-anchor" href="#_3-3-java应用多阶段构建" aria-label="Permalink to &quot;3.3 Java应用多阶段构建&quot;">​</a></h3><h4 id="完整示例-2" tabindex="-1">完整示例： <a class="header-anchor" href="#完整示例-2" aria-label="Permalink to &quot;完整示例：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 第一阶段：构建阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> eclipse-temurin:17-jdk-jammy </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置Maven缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> MAVEN_OPTS=</span><span class="__shiki_mdbnqw">&quot;-Dmaven.repo.local=/tmp/maven-repo&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> MAVEN_OPTS=\${MAVEN_OPTS}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /workspace</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制构建文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> mvnw .</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> .mvn .mvn</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> pom.xml .</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> src src</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 下载依赖（单独步骤以利用缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> ./mvnw dependency:go-offline -B</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 构建应用（跳过测试）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> ./mvnw clean package -DskipTests</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：提取JAR文件</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> eclipse-temurin:17-jdk-jammy </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> extractor</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /workspace</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /workspace/target/*.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 解压JAR以分离依赖（减小最终镜像）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> java -Djarmode=layertools -jar app.jar extract</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第三阶段：运行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> eclipse-temurin:17-jre-jammy </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> runtime</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装必要工具</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    apt-get install -y --no-install-recommends \\</span></span>
<span class="line"><span class="__shiki_140thh">    curl \\</span></span>
<span class="line"><span class="__shiki_140thh">    tini &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建应用用户</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> groupadd -r spring &amp;&amp; useradd -r -g spring spring</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> spring:spring</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /application</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 分层复制（优化镜像构建）</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=extractor --chown=spring:spring dependencies/ ./</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=extractor --chown=spring:spring spring-boot-loader/ ./</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=extractor --chown=spring:spring snapshot-dependencies/ ./</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=extractor --chown=spring:spring application/ ./</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JVM参数优化</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> JAVA_OPTS=</span><span class="__shiki_mdbnqw">&quot;-XX:+UseG1GC -XX:MaxRAMPercentage=75 -XX:+ExitOnOutOfMemoryError&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> JAVA_TOOL_OPTIONS=</span><span class="__shiki_mdbnqw">&quot;-XX:+UseContainerSupport&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用tini作为init进程</span></span>
<span class="line"><span class="__shiki_1itgoe">ENTRYPOINT</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;tini&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-g&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> --interval=30s --timeout=3s --start-period=60s \\</span></span>
<span class="line"><span class="__shiki_1itgoe">    CMD</span><span class="__shiki_140thh"> curl -f http://localhost:8080/actuator/health || exit 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;java&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;org.springframework.boot.loader.JarLauncher&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_3-4-python应用多阶段构建" tabindex="-1">3.4 Python应用多阶段构建 <a class="header-anchor" href="#_3-4-python应用多阶段构建" aria-label="Permalink to &quot;3.4 Python应用多阶段构建&quot;">​</a></h3><h4 id="完整示例-3" tabindex="-1">完整示例： <a class="header-anchor" href="#完整示例-3" aria-label="Permalink to &quot;完整示例：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 第一阶段：构建阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> python:3.11-slim </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装构建依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    apt-get install -y --no-install-recommends \\</span></span>
<span class="line"><span class="__shiki_140thh">    gcc \\</span></span>
<span class="line"><span class="__shiki_140thh">    g++ \\</span></span>
<span class="line"><span class="__shiki_140thh">    python3-dev \\</span></span>
<span class="line"><span class="__shiki_140thh">    libpq-dev &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建虚拟环境</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> python -m venv /opt/venv</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> PATH=</span><span class="__shiki_mdbnqw">&quot;/opt/venv/bin:$PATH&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制依赖文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> requirements.txt requirements-dev.txt ./</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装依赖（生产环境）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> pip install --no-cache-dir --upgrade pip &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    pip install --no-cache-dir -r requirements.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制应用代码并安装</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> pip install --no-cache-dir -e .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行测试（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> builder </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> tester</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> pip install -r requirements-dev.txt</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> pytest --cov=app --cov-report=html</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：运行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> python:3.11-slim </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> runtime</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装运行时依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    apt-get install -y --no-install-recommends \\</span></span>
<span class="line"><span class="__shiki_140thh">    libpq5 \\</span></span>
<span class="line"><span class="__shiki_140thh">    curl &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建非root用户</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> groupadd -r appuser &amp;&amp; useradd -r -g appuser appuser</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从构建阶段复制虚拟环境</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /opt/venv /opt/venv</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> PATH=</span><span class="__shiki_mdbnqw">&quot;/opt/venv/bin:$PATH&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制应用代码</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --chown=appuser:appuser . .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置权限</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> chown -R appuser:appuser /app</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> appuser</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建必要的目录</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> mkdir -p /app/logs /app/data</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 环境变量</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> PYTHONUNBUFFERED=1 \\</span></span>
<span class="line"><span class="__shiki_140thh">    PYTHONDONTWRITEBYTECODE=1 \\</span></span>
<span class="line"><span class="__shiki_140thh">    PYTHONPATH=/app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> --interval=30s --timeout=10s --start-period=40s \\</span></span>
<span class="line"><span class="__shiki_1itgoe">    CMD</span><span class="__shiki_140thh"> python -c </span><span class="__shiki_mdbnqw">&quot;import requests; requests.get(&#39;http://localhost:8000/health&#39;, timeout=5)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 8000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用gunicorn运行</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;gunicorn&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--bind&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;0.0.0.0:8000&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--workers&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;4&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--threads&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;app:app&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="四、高级多阶段构建技巧" tabindex="-1">四、高级多阶段构建技巧 <a class="header-anchor" href="#四、高级多阶段构建技巧" aria-label="Permalink to &quot;四、高级多阶段构建技巧&quot;">​</a></h2><h3 id="_4-1-多架构构建支持" tabindex="-1">4.1 多架构构建支持 <a class="header-anchor" href="#_4-1-多架构构建支持" aria-label="Permalink to &quot;4.1 多架构构建支持&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 构建x86_64和arm64架构的镜像</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> --platform=$BUILDPLATFORM golang:1.21-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> TARGETOS TARGETARCH</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据目标架构编译</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> GOOS=$TARGETOS GOARCH=$TARGETARCH go build -o /app/myapp .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 多架构运行镜像</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> --platform=$TARGETPLATFORM alpine:3.18</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app/myapp /app/myapp</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;/app/myapp&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="构建命令-1" tabindex="-1">构建命令： <a class="header-anchor" href="#构建命令-1" aria-label="Permalink to &quot;构建命令：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建构建器实例</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> buildx</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_dzsirb"> --name</span><span class="__shiki_mdbnqw"> multiarch</span><span class="__shiki_dzsirb"> --use</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 构建多架构镜像</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> buildx</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --platform</span><span class="__shiki_mdbnqw"> linux/amd64,linux/arm64</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -t</span><span class="__shiki_mdbnqw"> username/myapp:latest</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --push</span><span class="__shiki_mdbnqw"> .</span></span></code></pre></div><h3 id="_4-2-使用buildkit高级特性" tabindex="-1">4.2 使用BuildKit高级特性 <a class="header-anchor" href="#_4-2-使用buildkit高级特性" aria-label="Permalink to &quot;4.2 使用BuildKit高级特性&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># syntax=docker/dockerfile:1.4</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> base</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 缓存挂载（加速依赖安装）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> --mount=type=cache,target=/var/cache/apk \\</span></span>
<span class="line"><span class="__shiki_140thh">    apk add --update --no-cache nodejs npm</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 秘密挂载（安全处理敏感信息）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> --mount=type=secret,id=npmrc,target=/root/.npmrc \\</span></span>
<span class="line"><span class="__shiki_140thh">    npm install</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. SSH挂载（从私有仓库拉取代码）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> --mount=type=ssh \\</span></span>
<span class="line"><span class="__shiki_140thh">    git clone git@github.com:user/private-repo.git</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 绑定挂载（构建上下文外部的文件）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> --mount=type=bind,source=/host/path,target=/container/path \\</span></span>
<span class="line"><span class="__shiki_140thh">    cp /container/path/config.json /app/</span></span></code></pre></div><h4 id="启用buildkit构建" tabindex="-1">启用BuildKit构建： <a class="header-anchor" href="#启用buildkit构建" aria-label="Permalink to &quot;启用BuildKit构建：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 方法1：环境变量</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> DOCKER_BUILDKIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 方法2：使用docker buildx</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> buildx</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> myapp</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 完整构建命令示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --secret</span><span class="__shiki_mdbnqw"> id=npmrc,src=</span><span class="__shiki_140thh">$HOME</span><span class="__shiki_mdbnqw">/.npmrc</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ssh</span><span class="__shiki_mdbnqw"> default</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -t</span><span class="__shiki_mdbnqw"> myapp:latest</span><span class="__shiki_mdbnqw"> .</span></span></code></pre></div><h3 id="_4-3-动态多阶段构建" tabindex="-1">4.3 动态多阶段构建 <a class="header-anchor" href="#_4-3-动态多阶段构建" aria-label="Permalink to &quot;4.3 动态多阶段构建&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 根据参数选择不同的构建阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> BUILD_TYPE=production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> base</span></span>
<span class="line"><span class="__shiki_21nrsd"># 基础配置...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 开发构建阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> base </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> development-build</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apk add --no-cache \\</span></span>
<span class="line"><span class="__shiki_140thh">    git \\</span></span>
<span class="line"><span class="__shiki_140thh">    curl \\</span></span>
<span class="line"><span class="__shiki_140thh">    vim \\</span></span>
<span class="line"><span class="__shiki_140thh">    debug-tools</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 生产构建阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> base </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> production-build</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apk add --no-cache \\</span></span>
<span class="line"><span class="__shiki_140thh">    curl \\</span></span>
<span class="line"><span class="__shiki_140thh">    tini</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 最终阶段，根据BUILD_TYPE选择</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> \${BUILD_TYPE}-build </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> final</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据环境配置应用</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> docker/\${BUILD_TYPE}/config /app/config</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> docker/\${BUILD_TYPE}/entrypoint.sh /entrypoint.sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;/entrypoint.sh&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="五、性能优化策略" tabindex="-1">五、性能优化策略 <a class="header-anchor" href="#五、性能优化策略" aria-label="Permalink to &quot;五、性能优化策略&quot;">​</a></h2><h3 id="_5-1-构建缓存优化" tabindex="-1">5.1 构建缓存优化 <a class="header-anchor" href="#_5-1-构建缓存优化" aria-label="Permalink to &quot;5.1 构建缓存优化&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 优化前</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm install &amp;&amp; npm run build  # 任何文件变动都会导致npm install重新执行</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 优化后 - 依赖分层</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 单独复制package文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> package*.json ./</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 安装依赖（package.json不变时使用缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm ci --only=production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 复制源代码（依赖安装被缓存）</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 构建应用</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm run build</span></span></code></pre></div><h3 id="_5-2-并行构建优化" tabindex="-1">5.2 并行构建优化 <a class="header-anchor" href="#_5-2-并行构建优化" aria-label="Permalink to &quot;5.2 并行构建优化&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 并行构建前端和后端</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> frontend-builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /frontend</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> frontend/package*.json ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm ci</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> frontend/ .</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm run build</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.21-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> backend-builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /backend</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> backend/go.mod backend/go.sum ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> go mod download</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> backend/ .</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> CGO_ENABLED=0 go build -o app .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 合并构建结果</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> nginx:alpine</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=frontend-builder /frontend/dist /usr/share/nginx/html</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=backend-builder /backend/app /app/</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> nginx.conf /etc/nginx/conf.d/default.conf</span></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 80</span></span></code></pre></div><h3 id="_5-3-镜像大小优化技巧" tabindex="-1">5.3 镜像大小优化技巧 <a class="header-anchor" href="#_5-3-镜像大小优化技巧" aria-label="Permalink to &quot;5.3 镜像大小优化技巧&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 技巧1：使用distroless或scratch基础镜像</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> gcr.io/distroless/base-debian11</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 技巧2：删除不必要的文件</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; apt-get install -y \\</span></span>
<span class="line"><span class="__shiki_140thh">    package1 \\</span></span>
<span class="line"><span class="__shiki_140thh">    package2 \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; apt-get clean \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 技巧3：合并RUN指令减少层数</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; apt-get install -y \\</span></span>
<span class="line"><span class="__shiki_140thh">    curl \\</span></span>
<span class="line"><span class="__shiki_140thh">    git \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; apt-get clean</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 技巧4：使用.dockerignore排除无关文件</span></span>
<span class="line"><span class="__shiki_21nrsd"># .dockerignore内容：</span></span>
<span class="line"><span class="__shiki_140thh">.git</span></span>
<span class="line"><span class="__shiki_140thh">.gitignore</span></span>
<span class="line"><span class="__shiki_140thh">*.log</span></span>
<span class="line"><span class="__shiki_140thh">*.md</span></span>
<span class="line"><span class="__shiki_140thh">node_modules</span></span>
<span class="line"><span class="__shiki_140thh">*.tmp</span></span>
<span class="line"><span class="__shiki_140thh">Dockerfile</span></span>
<span class="line"><span class="__shiki_140thh">docker-compose.yml</span></span></code></pre></div><h2 id="六、安全最佳实践" tabindex="-1">六、安全最佳实践 <a class="header-anchor" href="#六、安全最佳实践" aria-label="Permalink to &quot;六、安全最佳实践&quot;">​</a></h2><h3 id="_6-1-最小权限原则" tabindex="-1">6.1 最小权限原则 <a class="header-anchor" href="#_6-1-最小权限原则" aria-label="Permalink to &quot;6.1 最小权限原则&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 第一阶段：构建（需要root权限）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.21-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apk add --no-cache git ca-certificates</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：运行（非root用户）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> scratch</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从builder复制CA证书</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从builder复制编译好的二进制文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /go/bin/app /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建非root用户（在scratch中需要特殊处理）</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用静态编译时指定的用户ID</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> 10001:10001</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;/app&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_6-2-安全扫描与验证" tabindex="-1">6.2 安全扫描与验证 <a class="header-anchor" href="#_6-2-安全扫描与验证" aria-label="Permalink to &quot;6.2 安全扫描与验证&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加安全扫描阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> aquasec/trivy:latest </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> scanner</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app /scan/app</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> trivy filesystem --exit-code 1 --severity HIGH,CRITICAL /scan</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或者集成到构建流程中</span></span>
<span class="line"><span class="__shiki_21nrsd"># docker build --target scanner .</span></span></code></pre></div><h3 id="_6-3-敏感信息处理" tabindex="-1">6.3 敏感信息处理 <a class="header-anchor" href="#_6-3-敏感信息处理" aria-label="Permalink to &quot;6.3 敏感信息处理&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 错误示例：在镜像中硬编码密码</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> DB_PASSWORD=mysecretpassword</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 正确做法：运行时注入</span></span>
<span class="line"><span class="__shiki_21nrsd"># docker run -e DB_PASSWORD=secret myapp</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用BuildKit secrets处理构建时的敏感信息</span></span>
<span class="line"><span class="__shiki_21nrsd"># docker build --secret id=mysecret,src=./secret.txt .</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> --mount=type=secret,id=mysecret \\</span></span>
<span class="line"><span class="__shiki_140thh">    export API_KEY=$(cat /run/secrets/mysecret) &amp;&amp; \\</span></span>
<span class="line"><span class="__shiki_140thh">    ./build-script.sh</span></span></code></pre></div><h2 id="七、ci-cd集成示例" tabindex="-1">七、CI/CD集成示例 <a class="header-anchor" href="#七、ci-cd集成示例" aria-label="Permalink to &quot;七、CI/CD集成示例&quot;">​</a></h2><h3 id="_7-1-github-actions集成" tabindex="-1">7.1 GitHub Actions集成 <a class="header-anchor" href="#_7-1-github-actions集成" aria-label="Permalink to &quot;7.1 GitHub Actions集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Docker Build and Push</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  pull_request</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v3</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Set up Docker Buildx</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/setup-buildx-action@v2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Login to DockerHub</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/login-action@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.DOCKER_USERNAME }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.DOCKER_PASSWORD }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Extract metadata</span></span>
<span class="line"><span class="__shiki_17hn0y">      id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">meta</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/metadata-action@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        images</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">username/myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">        tags</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          type=ref,event=branch</span></span>
<span class="line"><span class="__shiki_mdbnqw">          type=ref,event=pr</span></span>
<span class="line"><span class="__shiki_mdbnqw">          type=semver,pattern={{version}}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          type=semver,pattern={{major}}.{{minor}}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build and push</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/build-push-action@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        context</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">.</span></span>
<span class="line"><span class="__shiki_17hn0y">        file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./Dockerfile</span></span>
<span class="line"><span class="__shiki_17hn0y">        push</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.event_name != &#39;pull_request&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        tags</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.meta.outputs.tags }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        labels</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.meta.outputs.labels }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        cache-from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">type=gha</span></span>
<span class="line"><span class="__shiki_17hn0y">        cache-to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">type=gha,mode=max</span></span></code></pre></div><h3 id="_7-2-gitlab-ci集成" tabindex="-1">7.2 GitLab CI集成 <a class="header-anchor" href="#_7-2-gitlab-ci集成" aria-label="Permalink to &quot;7.2 GitLab CI集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">scan</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">push</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  DOCKER_BUILDKIT</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">.build-template</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&amp;</span><span class="__shiki_1t8gfj">build-template</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      docker build \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --target tester \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-test .</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      docker build \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --target runtime \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --build-arg VERSION=$CI_COMMIT_TAG \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --build-arg COMMIT_SHA=$CI_COMMIT_SHA \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        -t $CI_REGISTRY_IMAGE:latest .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_dzsirb">  &lt;&lt;</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh">build-template</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker run --rm $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA-test npm test</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">scan</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">scan</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">push</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $CI_REGISTRY_IMAGE:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span></code></pre></div><h2 id="八、调试与故障排除" tabindex="-1">八、调试与故障排除 <a class="header-anchor" href="#八、调试与故障排除" aria-label="Permalink to &quot;八、调试与故障排除&quot;">​</a></h2><h3 id="_8-1-调试多阶段构建" tabindex="-1">8.1 调试多阶段构建 <a class="header-anchor" href="#_8-1-调试多阶段构建" aria-label="Permalink to &quot;8.1 调试多阶段构建&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 构建特定阶段</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --target</span><span class="__shiki_mdbnqw"> builder</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> myapp:builder</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 运行中间阶段进行调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_dzsirb"> --rm</span><span class="__shiki_mdbnqw"> myapp:builder</span><span class="__shiki_mdbnqw"> sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 查看构建日志和缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --progress=plain</span><span class="__shiki_dzsirb"> --no-cache</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 使用dive分析镜像层</span></span>
<span class="line"><span class="__shiki_1t8gfj">dive</span><span class="__shiki_mdbnqw"> myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 检查构建上下文</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --no-cache</span><span class="__shiki_dzsirb"> --tag</span><span class="__shiki_mdbnqw"> debug-context</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_mdbnqw"> .</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">FROM alpine:latest</span></span>
<span class="line"><span class="__shiki_mdbnqw">COPY . /context</span></span>
<span class="line"><span class="__shiki_mdbnqw">RUN ls -la /context</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span></code></pre></div><h3 id="_8-2-常见问题解决" tabindex="-1">8.2 常见问题解决 <a class="header-anchor" href="#_8-2-常见问题解决" aria-label="Permalink to &quot;8.2 常见问题解决&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 问题1：COPY --from找不到阶段</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：确保阶段名称正确，或使用阶段索引</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题2：scratch镜像中缺少库文件</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：静态编译或从其他阶段复制必要文件</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> libs</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apk add --no-cache libc6-compat</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> scratch</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=libs /lib/ld-musl-x86_64.so.1 /lib/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题3：权限问题</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：在复制文件时设置权限</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --chown=appuser:appuser --from=builder /app /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 问题4：时区问题</span></span>
<span class="line"><span class="__shiki_21nrsd"># 解决方案：从基础镜像复制时区文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /usr/share/zoneinfo /usr/share/zoneinfo</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> TZ=Asia/Shanghai</span></span></code></pre></div><h2 id="九、最佳实践总结" tabindex="-1">九、最佳实践总结 <a class="header-anchor" href="#九、最佳实践总结" aria-label="Permalink to &quot;九、最佳实践总结&quot;">​</a></h2><h3 id="_9-1-多阶段构建检查清单" tabindex="-1">9.1 多阶段构建检查清单 <a class="header-anchor" href="#_9-1-多阶段构建检查清单" aria-label="Permalink to &quot;9.1 多阶段构建检查清单&quot;">​</a></h3><ul><li><p>[ ] <strong>分离构建与运行时环境</strong></p><ul><li>使用不同的基础镜像</li><li>仅复制必要的运行时文件</li></ul></li><li><p>[ ] <strong>优化构建缓存</strong></p><ul><li>分层安装依赖</li><li>利用Docker构建缓存</li></ul></li><li><p>[ ] <strong>安全加固</strong></p><ul><li>使用非root用户运行</li><li>删除敏感信息和构建工具</li><li>定期扫描安全漏洞</li></ul></li><li><p>[ ] <strong>镜像最小化</strong></p><ul><li>使用轻量级基础镜像（alpine、scratch、distroless）</li><li>删除不必要的文件和缓存</li><li>合并RUN指令减少层数</li></ul></li><li><p>[ ] <strong>可观测性</strong></p><ul><li>添加健康检查</li><li>设置适当的元数据标签</li><li>配置适当的日志输出</li></ul></li></ul><h3 id="_9-2-性能优化指标" tabindex="-1">9.2 性能优化指标 <a class="header-anchor" href="#_9-2-性能优化指标" aria-label="Permalink to &quot;9.2 性能优化指标&quot;">​</a></h3><table tabindex="0"><thead><tr><th>优化方向</th><th>实施方法</th><th>预期效果</th></tr></thead><tbody><tr><td>构建时间</td><td>分层依赖安装、并行构建</td><td>减少30-70%</td></tr><tr><td>镜像大小</td><td>多阶段构建、轻量级基础镜像</td><td>减少50-90%</td></tr><tr><td>安全性</td><td>非root用户、安全扫描</td><td>减少攻击面</td></tr><tr><td>可维护性</td><td>清晰阶段划分、文档注释</td><td>提升团队协作效率</td></tr></tbody></table><h3 id="_9-3-架构选择指南" tabindex="-1">9.3 架构选择指南 <a class="header-anchor" href="#_9-3-架构选择指南" aria-label="Permalink to &quot;9.3 架构选择指南&quot;">​</a></h3><table tabindex="0"><thead><tr><th>应用类型</th><th>推荐架构</th><th>备注</th></tr></thead><tbody><tr><td>静态二进制（Go、Rust）</td><td>scratch + 多阶段</td><td>最小化镜像</td></tr><tr><td>动态语言（Python、Node.js）</td><td>alpine + 虚拟环境</td><td>平衡大小和兼容性</td></tr><tr><td>JVM应用（Java、Scala）</td><td>distroless + 分层JAR</td><td>优化JVM启动</td></tr><tr><td>前端应用</td><td>nginx + 构建产物</td><td>CDN友好</td></tr></tbody></table><hr><p>通过掌握多阶段构建技术，您可以构建出更小、更安全、更高效的Docker镜像，显著提升容器化应用的交付质量和运行性能。</p>`,79)])])}const r=a(_,[["render",l]]);export{d as __pageData,r as default};
