import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Docker镜像构建最佳实践 - 完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/docker/image-build.md","filePath":"devops/container/docker/image-build.md"}'),l={name:"devops/container/docker/image-build.md"};function _(e,s,h,c,t,o){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="docker镜像构建最佳实践-完整学习笔记" tabindex="-1">Docker镜像构建最佳实践 - 完整学习笔记 <a class="header-anchor" href="#docker镜像构建最佳实践-完整学习笔记" aria-label="Permalink to &quot;Docker镜像构建最佳实践 - 完整学习笔记&quot;">​</a></h1><h2 id="一、docker镜像构建基础" tabindex="-1">一、Docker镜像构建基础 <a class="header-anchor" href="#一、docker镜像构建基础" aria-label="Permalink to &quot;一、Docker镜像构建基础&quot;">​</a></h2><h3 id="_1-1-镜像构建核心概念" tabindex="-1">1.1 镜像构建核心概念 <a class="header-anchor" href="#_1-1-镜像构建核心概念" aria-label="Permalink to &quot;1.1 镜像构建核心概念&quot;">​</a></h3><ul><li><strong>镜像层（Layer）</strong>：Docker镜像是<strong>只读分层结构</strong>，每层代表Dockerfile中的一条指令</li><li><strong>联合文件系统（UnionFS）</strong>：实现分层存储和资源共享</li><li><strong>构建缓存（Build Cache）</strong>：Docker会缓存中间层，加速后续构建</li></ul><h3 id="_1-2-dockerfile基本结构" tabindex="-1">1.2 Dockerfile基本结构 <a class="header-anchor" href="#_1-2-dockerfile基本结构" aria-label="Permalink to &quot;1.2 Dockerfile基本结构&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基础镜像</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> ubuntu:22.04</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 维护者信息（已弃用，推荐使用LABEL）</span></span>
<span class="line"><span class="__shiki_1itgoe">LABEL</span><span class="__shiki_140thh"> maintainer=</span><span class="__shiki_mdbnqw">&quot;your-email@example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置工作目录</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; apt-get install -y \\</span></span>
<span class="line"><span class="__shiki_140thh">    python3 \\</span></span>
<span class="line"><span class="__shiki_140thh">    python3-pip</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 暴露端口</span></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 8080</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置环境变量</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> PYTHONUNBUFFERED=1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 容器启动命令</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;python3&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;app.py&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h2 id="二、镜像构建最佳实践" tabindex="-1">二、镜像构建最佳实践 <a class="header-anchor" href="#二、镜像构建最佳实践" aria-label="Permalink to &quot;二、镜像构建最佳实践&quot;">​</a></h2><h3 id="_2-1-选择合适的基础镜像" tabindex="-1">2.1 选择合适的基础镜像 <a class="header-anchor" href="#_2-1-选择合适的基础镜像" aria-label="Permalink to &quot;2.1 选择合适的基础镜像&quot;">​</a></h3><h4 id="最佳实践" tabindex="-1">最佳实践： <a class="header-anchor" href="#最佳实践" aria-label="Permalink to &quot;最佳实践：&quot;">​</a></h4><ul><li><strong>使用官方镜像</strong>：优先选择Docker官方认证的镜像</li><li><strong>指定版本标签</strong>：避免使用latest标签，明确指定版本</li><li><strong>选择轻量级镜像</strong>：<div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 推荐：Alpine Linux（约5MB）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用distroless镜像（仅包含运行时）</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> gcr.io/distroless/base-debian11</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 对于Go应用</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.21-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> scratch</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app /app</span></span></code></pre></div></li></ul><h4 id="示例对比" tabindex="-1">示例对比： <a class="header-anchor" href="#示例对比" aria-label="Permalink to &quot;示例对比：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 不推荐</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> ubuntu:latest  # 大小约77MB，版本不确定</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 推荐</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> ubuntu:22.04   # 明确版本，约77MB</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18    # 更轻量，约5MB</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> python:3.11-slim  # 专门优化的Python镜像</span></span></code></pre></div><h3 id="_2-2-优化镜像层构建顺序" tabindex="-1">2.2 优化镜像层构建顺序 <a class="header-anchor" href="#_2-2-优化镜像层构建顺序" aria-label="Permalink to &quot;2.2 优化镜像层构建顺序&quot;">​</a></h3><h4 id="核心原则" tabindex="-1">核心原则： <a class="header-anchor" href="#核心原则" aria-label="Permalink to &quot;核心原则：&quot;">​</a></h4><ol><li><strong>将不常变动的层放在前面</strong></li><li><strong>将经常变动的层放在最后</strong></li><li><strong>合并相关RUN指令减少层数</strong></li></ol><h4 id="优化示例" tabindex="-1">优化示例： <a class="header-anchor" href="#优化示例" aria-label="Permalink to &quot;优化示例：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 不推荐：创建了多个不必要的层</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get install -y python3</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get install -y python3-pip</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> pip3 install flask</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get clean</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 推荐：合并指令，清理缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; apt-get install -y \\</span></span>
<span class="line"><span class="__shiki_140thh">    python3 \\</span></span>
<span class="line"><span class="__shiki_140thh">    python3-pip \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; pip3 install flask \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; apt-get clean \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; rm -rf /var/lib/apt/lists/*</span></span></code></pre></div><h3 id="_2-3-有效利用构建缓存" tabindex="-1">2.3 有效利用构建缓存 <a class="header-anchor" href="#_2-3-有效利用构建缓存" aria-label="Permalink to &quot;2.3 有效利用构建缓存&quot;">​</a></h3><h4 id="缓存策略" tabindex="-1">缓存策略： <a class="header-anchor" href="#缓存策略" aria-label="Permalink to &quot;缓存策略：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 将依赖文件单独复制，利用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> requirements.txt /tmp/</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> pip install -r /tmp/requirements.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 最后复制应用代码</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用.dockerignore排除无关文件</span></span>
<span class="line"><span class="__shiki_21nrsd"># .dockerignore示例：</span></span>
<span class="line"><span class="__shiki_140thh">.git</span></span>
<span class="line"><span class="__shiki_140thh">.gitignore</span></span>
<span class="line"><span class="__shiki_140thh">*.log</span></span>
<span class="line"><span class="__shiki_140thh">*.tmp</span></span>
<span class="line"><span class="__shiki_140thh">node_modules</span></span>
<span class="line"><span class="__shiki_140thh">*.md</span></span>
<span class="line"><span class="__shiki_140thh">Dockerfile</span></span>
<span class="line"><span class="__shiki_140thh">docker-compose.yml</span></span></code></pre></div><h3 id="_2-4-安全性最佳实践" tabindex="-1">2.4 安全性最佳实践 <a class="header-anchor" href="#_2-4-安全性最佳实践" aria-label="Permalink to &quot;2.4 安全性最佳实践&quot;">​</a></h3><h4 id="最小权限原则" tabindex="-1">最小权限原则： <a class="header-anchor" href="#最小权限原则" aria-label="Permalink to &quot;最小权限原则：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 创建非root用户</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> groupadd -r appuser &amp;&amp; useradd -r -g appuser appuser</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 设置用户</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> appuser</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 最小化安装，移除不需要的包</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; apt-get install -y \\</span></span>
<span class="line"><span class="__shiki_140thh">    --no-install-recommends \\</span></span>
<span class="line"><span class="__shiki_140thh">    python3 \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 避免在镜像中存储敏感信息</span></span>
<span class="line"><span class="__shiki_21nrsd"># 不推荐：</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> DB_PASSWORD=</span><span class="__shiki_mdbnqw">&quot;secret&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 推荐：通过运行时注入</span></span>
<span class="line"><span class="__shiki_21nrsd"># docker run -e DB_PASSWORD=secret ...</span></span></code></pre></div><h3 id="_2-5-多阶段构建-multi-stage-builds" tabindex="-1">2.5 多阶段构建（Multi-stage Builds） <a class="header-anchor" href="#_2-5-多阶段构建-multi-stage-builds" aria-label="Permalink to &quot;2.5 多阶段构建（Multi-stage Builds）&quot;">​</a></h3><h4 id="优势" tabindex="-1">优势： <a class="header-anchor" href="#优势" aria-label="Permalink to &quot;优势：&quot;">​</a></h4><ul><li>减小最终镜像大小</li><li>分离构建环境和运行环境</li></ul><h4 id="示例" tabindex="-1">示例： <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 第一阶段：构建环境</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> golang:1.21 </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /build</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> go.mod go.sum ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> go mod download</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> CGO_ENABLED=0 GOOS=linux go build -o app .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第二阶段：运行环境</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> alpine:3.18</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apk --no-cache add ca-certificates</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /build/app .</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /build/config ./config</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 第三阶段（可选）：测试环境</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> builder </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> test</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> go test ./...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> nobody</span></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 8080</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;./app&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h4 id="node-js多阶段构建" tabindex="-1">Node.js多阶段构建： <a class="header-anchor" href="#node-js多阶段构建" aria-label="Permalink to &quot;Node.js多阶段构建：&quot;">​</a></h4><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 构建阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> package*.json ./</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm ci --only=production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:18-alpine</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /app/node_modules ./node_modules</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . .</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> node</span></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 3000</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;node&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;server.js&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_2-6-健康检查配置" tabindex="-1">2.6 健康检查配置 <a class="header-anchor" href="#_2-6-健康检查配置" aria-label="Permalink to &quot;2.6 健康检查配置&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> --interval=30s --timeout=3s --start-period=5s --retries=3 \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  CMD</span><span class="__shiki_140thh"> curl -f http://localhost:8080/health || exit 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用特定命令</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> CMD pg_isready -U postgres || exit 1</span></span></code></pre></div><h3 id="_2-7-资源限制优化" tabindex="-1">2.7 资源限制优化 <a class="header-anchor" href="#_2-7-资源限制优化" aria-label="Permalink to &quot;2.7 资源限制优化&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 设置时区</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> TZ=Asia/Shanghai</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> ln -snf /usr/share/zoneinfo/$TZ /etc/localtime &amp;&amp; echo $TZ &gt; /etc/timezone</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置语言环境</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> LANG=C.UTF-8 \\</span></span>
<span class="line"><span class="__shiki_140thh">    LC_ALL=C.UTF-8</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 优化Python内存管理</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> PYTHONUNBUFFERED=1 \\</span></span>
<span class="line"><span class="__shiki_140thh">    PYTHONDONTWRITEBYTECODE=1</span></span></code></pre></div><h2 id="三、高级优化技巧" tabindex="-1">三、高级优化技巧 <a class="header-anchor" href="#三、高级优化技巧" aria-label="Permalink to &quot;三、高级优化技巧&quot;">​</a></h2><h3 id="_3-1-构建参数-build-arguments" tabindex="-1">3.1 构建参数（Build Arguments） <a class="header-anchor" href="#_3-1-构建参数-build-arguments" aria-label="Permalink to &quot;3.1 构建参数（Build Arguments）&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> NODE_VERSION=18</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:\${NODE_VERSION}-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">ARG</span><span class="__shiki_140thh"> BUILD_ENV=production</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> NODE_ENV=\${BUILD_ENV}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 构建时指定参数：</span></span>
<span class="line"><span class="__shiki_21nrsd"># docker build --build-arg NODE_VERSION=20 --build-arg BUILD_ENV=development .</span></span></code></pre></div><h3 id="_3-2-镜像标签策略" tabindex="-1">3.2 镜像标签策略 <a class="header-anchor" href="#_3-2-镜像标签策略" aria-label="Permalink to &quot;3.2 镜像标签策略&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 支持多个标签</span></span>
<span class="line"><span class="__shiki_140thh">docker build -t myapp:latest -t myapp:v1.2.3 .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于Git commit</span></span>
<span class="line"><span class="__shiki_140thh">docker build -t myapp:$(git rev-parse --short HEAD) .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基于时间戳</span></span>
<span class="line"><span class="__shiki_140thh">docker build -t myapp:$(date +%Y%m%d-%H%M%S) .</span></span></code></pre></div><h3 id="_3-3-镜像扫描与安全" tabindex="-1">3.3 镜像扫描与安全 <a class="header-anchor" href="#_3-3-镜像扫描与安全" aria-label="Permalink to &quot;3.3 镜像扫描与安全&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用Trivy扫描镜像</span></span>
<span class="line"><span class="__shiki_1t8gfj">trivy</span><span class="__shiki_mdbnqw"> image</span><span class="__shiki_mdbnqw"> myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用Docker Scout</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> scout</span><span class="__shiki_mdbnqw"> quickview</span><span class="__shiki_mdbnqw"> myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用Hadolint检查Dockerfile</span></span>
<span class="line"><span class="__shiki_1t8gfj">hadolint</span><span class="__shiki_mdbnqw"> Dockerfile</span></span></code></pre></div><h3 id="_3-4-构建工具链优化" tabindex="-1">3.4 构建工具链优化 <a class="header-anchor" href="#_3-4-构建工具链优化" aria-label="Permalink to &quot;3.4 构建工具链优化&quot;">​</a></h3><h4 id="buildkit特性启用" tabindex="-1">BuildKit特性启用： <a class="header-anchor" href="#buildkit特性启用" aria-label="Permalink to &quot;BuildKit特性启用：&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 启用BuildKit（Docker 18.09+）</span></span>
<span class="line"><span class="__shiki_1itgoe">export</span><span class="__shiki_140thh"> DOCKER_BUILDKIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用缓存挂载提高性能</span></span>
<span class="line"><span class="__shiki_1t8gfj">RUN</span><span class="__shiki_dzsirb"> --mount=type=cache,target=/var/cache/apt</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">    apt-get</span><span class="__shiki_mdbnqw"> update</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_1t8gfj">apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> ...</span></span></code></pre></div><h2 id="四、完整的dockerfile示例" tabindex="-1">四、完整的Dockerfile示例 <a class="header-anchor" href="#四、完整的dockerfile示例" aria-label="Permalink to &quot;四、完整的Dockerfile示例&quot;">​</a></h2><h3 id="_4-1-python应用最佳实践" tabindex="-1">4.1 Python应用最佳实践 <a class="header-anchor" href="#_4-1-python应用最佳实践" aria-label="Permalink to &quot;4.1 Python应用最佳实践&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多阶段构建Python应用</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> python:3.11-slim </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装构建依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update &amp;&amp; apt-get install -y \\</span></span>
<span class="line"><span class="__shiki_140thh">    --no-install-recommends \\</span></span>
<span class="line"><span class="__shiki_140thh">    gcc \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制依赖文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> requirements.txt .</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用虚拟环境</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> python -m venv /opt/venv</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> PATH=</span><span class="__shiki_mdbnqw">&quot;/opt/venv/bin:$PATH&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> pip install --no-cache-dir -r requirements.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> python:3.11-slim</span></span>
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
<span class="line"><span class="__shiki_21nrsd"># 切换用户</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> appuser</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查</span></span>
<span class="line"><span class="__shiki_1itgoe">HEALTHCHECK</span><span class="__shiki_140thh"> --interval=30s --timeout=3s --start-period=5s \\</span></span>
<span class="line"><span class="__shiki_1itgoe">  CMD</span><span class="__shiki_140thh"> python -c </span><span class="__shiki_mdbnqw">&quot;import urllib.request; urllib.request.urlopen(&#39;http://localhost:5000/health&#39;)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 5000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用gunicorn运行应用</span></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;gunicorn&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--bind&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;0.0.0.0:5000&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;wsgi:app&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_4-2-生产环境java应用" tabindex="-1">4.2 生产环境Java应用 <a class="header-anchor" href="#_4-2-生产环境java应用" aria-label="Permalink to &quot;4.2 生产环境Java应用&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用官方Eclipse Temurin镜像</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> eclipse-temurin:17-jdk-jammy </span><span class="__shiki_1itgoe">AS</span><span class="__shiki_140thh"> builder</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /workspace/app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 复制构建文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> mvnw .</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> .mvn .mvn</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> pom.xml .</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> src src</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 构建应用</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> ./mvnw clean package -DskipTests</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行阶段</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> eclipse-temurin:17-jre-jammy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 下载并安装Tini（init系统）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apt-get update \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; apt-get install -y curl \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; curl -sSL https://github.com/krallin/tini/releases/download/v0.19.0/tini -o /sbin/tini \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; chmod +x /sbin/tini \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; apt-get clean \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; rm -rf /var/lib/apt/lists/*</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建应用用户</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> groupadd -r appuser &amp;&amp; useradd -r -g appuser appuser</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /app</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 从构建阶段复制jar文件</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> --from=builder /workspace/app/target/*.jar app.jar</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置非root用户</span></span>
<span class="line"><span class="__shiki_1itgoe">USER</span><span class="__shiki_140thh"> appuser</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用Tini作为PID 1</span></span>
<span class="line"><span class="__shiki_1itgoe">ENTRYPOINT</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;/sbin/tini&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;--&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># JVM参数优化</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> JAVA_OPTS=</span><span class="__shiki_mdbnqw">&quot;-Xms512m -Xmx512m -XX:+UseG1GC -XX:MaxGCPauseMillis=200&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">ENV</span><span class="__shiki_140thh"> JAVA_TOOL_OPTIONS=</span><span class="__shiki_mdbnqw">&quot;-XX:+ExitOnOutOfMemoryError&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">EXPOSE</span><span class="__shiki_140thh"> 8080</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">CMD</span><span class="__shiki_140thh"> java \${JAVA_OPTS} -jar app.jar</span></span></code></pre></div><h2 id="五、构建流程优化" tabindex="-1">五、构建流程优化 <a class="header-anchor" href="#五、构建流程优化" aria-label="Permalink to &quot;五、构建流程优化&quot;">​</a></h2><h3 id="_5-1-ci-cd集成示例" tabindex="-1">5.1 CI/CD集成示例 <a class="header-anchor" href="#_5-1-ci-cd集成示例" aria-label="Permalink to &quot;5.1 CI/CD集成示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .gitlab-ci.yml示例</span></span>
<span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">scan</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">push</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker build -t $CI_REGISTRY_IMAGE:latest .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker run --rm $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA npm test</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">scan</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">scan</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker scout quickview $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">push</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $CI_REGISTRY_IMAGE:latest</span></span></code></pre></div><h3 id="_5-2-构建性能优化" tabindex="-1">5.2 构建性能优化 <a class="header-anchor" href="#_5-2-构建性能优化" aria-label="Permalink to &quot;5.2 构建性能优化&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用构建缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --cache-from</span><span class="__shiki_mdbnqw"> myapp:latest</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> myapp:new</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 并行构建（多阶段构建）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_dzsirb"> --parallel</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用.dockerignore减少构建上下文</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 合理使用构建参数</span></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 选择离构建服务器近的镜像仓库</span></span></code></pre></div><h2 id="六、监控与维护" tabindex="-1">六、监控与维护 <a class="header-anchor" href="#六、监控与维护" aria-label="Permalink to &quot;六、监控与维护&quot;">​</a></h2><h3 id="_6-1-镜像分析工具" tabindex="-1">6.1 镜像分析工具 <a class="header-anchor" href="#_6-1-镜像分析工具" aria-label="Permalink to &quot;6.1 镜像分析工具&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 分析镜像层大小</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> history</span><span class="__shiki_mdbnqw"> myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 详细分析镜像内容</span></span>
<span class="line"><span class="__shiki_1t8gfj">dive</span><span class="__shiki_mdbnqw"> myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查镜像漏洞</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> scan</span><span class="__shiki_mdbnqw"> myapp:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看镜像元数据</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> image</span><span class="__shiki_mdbnqw"> inspect</span><span class="__shiki_mdbnqw"> myapp:latest</span></span></code></pre></div><h3 id="_6-2-镜像清理策略" tabindex="-1">6.2 镜像清理策略 <a class="header-anchor" href="#_6-2-镜像清理策略" aria-label="Permalink to &quot;6.2 镜像清理策略&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定期清理无用镜像</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> image</span><span class="__shiki_mdbnqw"> prune</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_dzsirb"> --filter</span><span class="__shiki_mdbnqw"> &quot;until=24h&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理构建缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> builder</span><span class="__shiki_mdbnqw"> prune</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自动化清理脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> system</span><span class="__shiki_mdbnqw"> prune</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_dzsirb"> --volumes</span></span></code></pre></div><h2 id="七、总结要点" tabindex="-1">七、总结要点 <a class="header-anchor" href="#七、总结要点" aria-label="Permalink to &quot;七、总结要点&quot;">​</a></h2><h3 id="关键最佳实践" tabindex="-1">关键最佳实践： <a class="header-anchor" href="#关键最佳实践" aria-label="Permalink to &quot;关键最佳实践：&quot;">​</a></h3><ol><li><strong>使用多阶段构建</strong>减少最终镜像大小</li><li><strong>指定基础镜像版本</strong>确保一致性</li><li><strong>合并RUN指令</strong>减少镜像层数</li><li><strong>使用非root用户</strong>提高安全性</li><li><strong>添加健康检查</strong>便于容器编排</li><li><strong>利用构建缓存</strong>加速构建过程</li><li><strong>扫描镜像漏洞</strong>确保安全性</li><li><strong>优化构建上下文</strong>使用.dockerignore</li><li><strong>标签策略</strong>明确镜像版本</li><li><strong>资源限制</strong>合理分配容器资源</li></ol><h3 id="生产环境检查清单" tabindex="-1">生产环境检查清单： <a class="header-anchor" href="#生产环境检查清单" aria-label="Permalink to &quot;生产环境检查清单：&quot;">​</a></h3><ul><li>[ ] 是否使用非root用户运行？</li><li>[ ] 是否添加了健康检查？</li><li>[ ] 镜像大小是否优化？</li><li>[ ] 是否存在安全漏洞？</li><li>[ ] 构建时间是否合理？</li><li>[ ] 是否使用了版本标签？</li><li>[ ] 是否有完整的文档？</li><li>[ ] 是否经过充分测试？</li></ul><hr><p>通过遵循这些最佳实践，可以构建出安全、高效、可维护的Docker镜像，为容器化应用的部署和运行打下坚实基础。</p>`,66)])])}const d=a(l,[["render",_]]);export{r as __pageData,d as default};
