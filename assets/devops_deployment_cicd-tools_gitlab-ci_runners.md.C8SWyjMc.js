import{_ as a,o as n,c as p,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"GitLab Runner 配置优化深度指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/cicd-tools/gitlab-ci/runners.md","filePath":"devops/deployment/cicd-tools/gitlab-ci/runners.md"}'),i={name:"devops/deployment/cicd-tools/gitlab-ci/runners.md"};function l(h,s,c,t,e,k){return n(),p("div",null,[...s[0]||(s[0]=[_(`<h1 id="gitlab-runner-配置优化深度指南" tabindex="-1">GitLab Runner 配置优化深度指南 <a class="header-anchor" href="#gitlab-runner-配置优化深度指南" aria-label="Permalink to &quot;GitLab Runner 配置优化深度指南&quot;">​</a></h1><h2 id="一、runner-架构与工作原理" tabindex="-1">一、Runner 架构与工作原理 <a class="header-anchor" href="#一、runner-架构与工作原理" aria-label="Permalink to &quot;一、Runner 架构与工作原理&quot;">​</a></h2><h3 id="_1-1-runner-核心组件" tabindex="-1">1.1 Runner 核心组件 <a class="header-anchor" href="#_1-1-runner-核心组件" aria-label="Permalink to &quot;1.1 Runner 核心组件&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">GitLab Runner 架构:</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Coordinator (协调器)</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Executor (执行器)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── Shell</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── Docker</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── Docker Machine (自动缩放)</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── Kubernetes</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── SSH</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── VirtualBox/Parallels</span></span>
<span class="line"><span class="__shiki_wvjl67">└── Cache Manager (缓存管理器)</span></span></code></pre></div><h3 id="_1-2-runner-工作流程" tabindex="-1">1.2 Runner 工作流程 <a class="header-anchor" href="#_1-2-runner-工作流程" aria-label="Permalink to &quot;1.2 Runner 工作流程&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">工作流程</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_mdbnqw">1. Runner 轮询 GitLab API (check_interval)</span></span>
<span class="line"><span class="__shiki_mdbnqw">2. 获取待处理作业 (concurrent 控制并发)</span></span>
<span class="line"><span class="__shiki_mdbnqw">3. 准备执行环境 (executor 配置)</span></span>
<span class="line"><span class="__shiki_mdbnqw">4. 执行作业脚本</span></span>
<span class="line"><span class="__shiki_mdbnqw">5. 上传日志和制品</span></span>
<span class="line"><span class="__shiki_mdbnqw">6. 清理环境</span></span></code></pre></div><h2 id="二、runner-安装与注册优化" tabindex="-1">二、Runner 安装与注册优化 <a class="header-anchor" href="#二、runner-安装与注册优化" aria-label="Permalink to &quot;二、Runner 安装与注册优化&quot;">​</a></h2><h3 id="_2-1-生产环境安装指南" tabindex="-1">2.1 生产环境安装指南 <a class="header-anchor" href="#_2-1-生产环境安装指南" aria-label="Permalink to &quot;2.1 生产环境安装指南&quot;">​</a></h3><h4 id="docker-安装-推荐" tabindex="-1">Docker 安装（推荐） <a class="header-anchor" href="#docker-安装-推荐" aria-label="Permalink to &quot;Docker 安装（推荐）&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建数据卷</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> volume</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> gitlab-runner-config</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> volume</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> gitlab-runner-cache</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行Runner容器</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --restart</span><span class="__shiki_mdbnqw"> always</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --privileged</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --add-host</span><span class="__shiki_mdbnqw"> gitlab.example.com:192.168.1.100</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /var/run/docker.sock:/var/run/docker.sock</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> gitlab-runner-config:/etc/gitlab-runner</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> gitlab-runner-cache:/var/gitlab-runner/cache</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -v</span><span class="__shiki_mdbnqw"> /opt/gitlab-runner/builds:/opt/gitlab-runner/builds</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -e</span><span class="__shiki_mdbnqw"> DOCKER_HOST=tcp://docker:2375</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory=</span><span class="__shiki_mdbnqw">&quot;2g&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --memory-swap=</span><span class="__shiki_mdbnqw">&quot;4g&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpus=</span><span class="__shiki_mdbnqw">&quot;2&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cpu-shares=1024</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --ulimit</span><span class="__shiki_mdbnqw"> nofile=65536:65536</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">  gitlab/gitlab-runner:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> logs</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_dzsirb"> --tail</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_mdbnqw"> gitlab-runner</span></span></code></pre></div><h4 id="kubernetes-安装-大规模部署" tabindex="-1">Kubernetes 安装（大规模部署） <a class="header-anchor" href="#kubernetes-安装-大规模部署" aria-label="Permalink to &quot;Kubernetes 安装（大规模部署）&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># gitlab-runner-values.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">gitlabUrl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://gitlab.example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">runnerRegistrationToken</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;REGISTRATION_TOKEN&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 资源限制</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2Gi&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;512Mi&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 自动缩放配置</span></span>
<span class="line"><span class="__shiki_17hn0y">replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">concurrent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 持久化存储</span></span>
<span class="line"><span class="__shiki_17hn0y">runners</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cache</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cacheType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">s3</span></span>
<span class="line"><span class="__shiki_17hn0y">    s3ServerAddress</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">s3.amazonaws.com</span></span>
<span class="line"><span class="__shiki_17hn0y">    s3BucketName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gitlab-runner-cache</span></span>
<span class="line"><span class="__shiki_17hn0y">    s3BucketLocation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east-1</span></span>
<span class="line"><span class="__shiki_17hn0y">    secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">s3-access-key</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  builds</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    nodeSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      node-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">runner</span></span>
<span class="line"><span class="__shiki_17hn0y">    tolerations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;runner&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Exists&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        effect</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;NoSchedule&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 服务账户配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceAccount</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    create</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      eks.amazonaws.com/role-arn</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">arn:aws:iam::123456789012:role/gitlab-runner-role</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用 Helm 安装</span></span>
<span class="line"><span class="__shiki_mdbnqw">helm repo add gitlab https://charts.gitlab.io</span></span>
<span class="line"><span class="__shiki_mdbnqw">helm install gitlab-runner -f gitlab-runner-values.yaml gitlab/gitlab-runner</span></span></code></pre></div><h4 id="二进制安装-自定义控制" tabindex="-1">二进制安装（自定义控制） <a class="header-anchor" href="#二进制安装-自定义控制" aria-label="Permalink to &quot;二进制安装（自定义控制）&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 下载二进制</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> --output</span><span class="__shiki_mdbnqw"> /usr/local/bin/gitlab-runner</span><span class="__shiki_mdbnqw"> https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64</span></span>
<span class="line"><span class="__shiki_1t8gfj">chmod</span><span class="__shiki_mdbnqw"> +x</span><span class="__shiki_mdbnqw"> /usr/local/bin/gitlab-runner</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建用户</span></span>
<span class="line"><span class="__shiki_1t8gfj">useradd</span><span class="__shiki_dzsirb"> --comment</span><span class="__shiki_mdbnqw"> &#39;GitLab Runner&#39;</span><span class="__shiki_dzsirb"> --create-home</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_dzsirb"> --shell</span><span class="__shiki_mdbnqw"> /bin/bash</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装服务</span></span>
<span class="line"><span class="__shiki_1t8gfj">gitlab-runner</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> --user=gitlab-runner</span><span class="__shiki_dzsirb"> --working-directory=/home/gitlab-runner</span></span>
<span class="line"><span class="__shiki_1t8gfj">gitlab-runner</span><span class="__shiki_mdbnqw"> start</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置系统限制</span></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /etc/systemd/system/gitlab-runner.service.d/override.conf</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">[Service]</span></span>
<span class="line"><span class="__shiki_mdbnqw">Environment=&quot;GODEBUG=netdns=go&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">LimitNOFILE=65536</span></span>
<span class="line"><span class="__shiki_mdbnqw">LimitNPROC=65536</span></span>
<span class="line"><span class="__shiki_mdbnqw">LimitCORE=infinity</span></span>
<span class="line"><span class="__shiki_mdbnqw">TasksMax=infinity</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">systemctl</span><span class="__shiki_mdbnqw"> daemon-reload</span></span>
<span class="line"><span class="__shiki_1t8gfj">systemctl</span><span class="__shiki_mdbnqw"> restart</span><span class="__shiki_mdbnqw"> gitlab-runner</span></span></code></pre></div><h3 id="_2-2-高级注册配置" tabindex="-1">2.2 高级注册配置 <a class="header-anchor" href="#_2-2-高级注册配置" aria-label="Permalink to &quot;2.2 高级注册配置&quot;">​</a></h3><h4 id="带参数的注册" tabindex="-1">带参数的注册 <a class="header-anchor" href="#带参数的注册" aria-label="Permalink to &quot;带参数的注册&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 交互式注册</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> register</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --non-interactive</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --url</span><span class="__shiki_mdbnqw"> &quot;https://gitlab.example.com&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --registration-token</span><span class="__shiki_mdbnqw"> &quot;PROJECT_REGISTRATION_TOKEN&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> &quot;docker-runner-01&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --tag-list</span><span class="__shiki_mdbnqw"> &quot;docker,linux,amd64&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --executor</span><span class="__shiki_mdbnqw"> &quot;docker&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-image</span><span class="__shiki_mdbnqw"> &quot;alpine:latest&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-privileged</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-volumes</span><span class="__shiki_mdbnqw"> &quot;/var/run/docker.sock:/var/run/docker.sock&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-volumes</span><span class="__shiki_mdbnqw"> &quot;/cache&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-extra-hosts</span><span class="__shiki_mdbnqw"> &quot;gitlab.example.com:192.168.1.100&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-network-mode</span><span class="__shiki_mdbnqw"> &quot;bridge&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --env</span><span class="__shiki_mdbnqw"> &quot;DOCKER_HOST=tcp://docker:2375&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --env</span><span class="__shiki_mdbnqw"> &quot;DOCKER_TLS_CERTDIR=&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --locked=</span><span class="__shiki_mdbnqw">&quot;false&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --access-level=</span><span class="__shiki_mdbnqw">&quot;not_protected&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --limit=10</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --output-limit=4096</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --request-concurrency=10</span></span></code></pre></div><h4 id="配置文件注册" tabindex="-1">配置文件注册 <a class="header-anchor" href="#配置文件注册" aria-label="Permalink to &quot;配置文件注册&quot;">​</a></h4><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 预先生成配置</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;kubernetes-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;https://gitlab.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;token-here&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;kubernetes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">kubernetes</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    namespace = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    namespace_overwrite_allowed = </span><span class="__shiki_mdbnqw">&quot;ci-.*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_limit = </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    memory_limit = </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    service_cpu_limit = </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    service_memory_limit = </span><span class="__shiki_mdbnqw">&quot;128Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    helper_cpu_limit = </span><span class="__shiki_mdbnqw">&quot;200m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    helper_memory_limit = </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    poll_interval = </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">    poll_timeout = </span><span class="__shiki_dzsirb">600</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    Type = </span><span class="__shiki_mdbnqw">&quot;s3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Path = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Shared = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">s3</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      ServerAddress = </span><span class="__shiki_mdbnqw">&quot;s3.amazonaws.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      AccessKey = </span><span class="__shiki_mdbnqw">&quot;access-key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      SecretKey = </span><span class="__shiki_mdbnqw">&quot;secret-key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      BucketName = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner-cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      BucketLocation = </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      Insecure = </span><span class="__shiki_dzsirb">false</span></span></code></pre></div><h2 id="三、runner-配置文件深度解析" tabindex="-1">三、Runner 配置文件深度解析 <a class="header-anchor" href="#三、runner-配置文件深度解析" aria-label="Permalink to &quot;三、Runner 配置文件深度解析&quot;">​</a></h2><h3 id="_3-1-全局配置-config-toml" tabindex="-1">3.1 全局配置（config.toml） <a class="header-anchor" href="#_3-1-全局配置-config-toml" aria-label="Permalink to &quot;3.1 全局配置（config.toml）&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/gitlab-runner/config.toml</span></span>
<span class="line"><span class="__shiki_140thh">concurrent = </span><span class="__shiki_dzsirb">20</span><span class="__shiki_21nrsd">  # 全局并发作业数，根据CPU核心数调整：CPU数 * 2</span></span>
<span class="line"><span class="__shiki_140thh">check_interval = </span><span class="__shiki_dzsirb">3</span><span class="__shiki_21nrsd">  # 检查新作业的间隔（秒）</span></span>
<span class="line"><span class="__shiki_140thh">sessionserver = []  </span><span class="__shiki_21nrsd"># 会话服务器配置，用于分布式缓存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日志配置</span></span>
<span class="line"><span class="__shiki_140thh">log_level = </span><span class="__shiki_mdbnqw">&quot;info&quot;</span><span class="__shiki_21nrsd">  # debug, info, warn, error, fatal, panic</span></span>
<span class="line"><span class="__shiki_140thh">log_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span><span class="__shiki_21nrsd">  # text 或 json</span></span>
<span class="line"><span class="__shiki_140thh">log_format_json = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">log_format_json_structured = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控配置</span></span>
<span class="line"><span class="__shiki_140thh">listen_address = </span><span class="__shiki_mdbnqw">&quot;:9252&quot;</span><span class="__shiki_21nrsd">  # Prometheus 指标端点</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_metrics_enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 构建目录配置</span></span>
<span class="line"><span class="__shiki_140thh">builds_dir = </span><span class="__shiki_mdbnqw">&quot;/opt/gitlab-runner/builds&quot;</span></span>
<span class="line"><span class="__shiki_140thh">cache_dir = </span><span class="__shiki_mdbnqw">&quot;/opt/gitlab-runner/cache&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 调试配置</span></span>
<span class="line"><span class="__shiki_140thh">debug = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">trace = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 网络配置</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;docker-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;https://gitlab.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;token-here&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;docker&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 作业限制</span></span>
<span class="line"><span class="__shiki_140thh">  limit = </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">  # 单个Runner最大作业数</span></span>
<span class="line"><span class="__shiki_140thh">  output_limit = </span><span class="__shiki_dzsirb">4096</span><span class="__shiki_21nrsd">  # 作业输出限制（KB）</span></span>
<span class="line"><span class="__shiki_140thh">  request_concurrency = </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">  # 同时请求的作业数</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 重试配置</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">custom_build_dir</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    enabled = </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 允许自定义构建目录</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 缓存配置</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    Type = </span><span class="__shiki_mdbnqw">&quot;s3&quot;</span><span class="__shiki_21nrsd">  # s3, gcs, azure, redis</span></span>
<span class="line"><span class="__shiki_140thh">    Path = </span><span class="__shiki_mdbnqw">&quot;runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Shared = </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 是否在Runner间共享缓存</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # S3 配置</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">s3</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      ServerAddress = </span><span class="__shiki_mdbnqw">&quot;s3.amazonaws.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      AccessKey = </span><span class="__shiki_mdbnqw">&quot;access-key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      SecretKey = </span><span class="__shiki_mdbnqw">&quot;secret-key&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      BucketName = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner-cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      BucketLocation = </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      Insecure = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">      AuthenticationType = </span><span class="__shiki_mdbnqw">&quot;IAM&quot;</span><span class="__shiki_21nrsd">  # 或 AccessKey</span></span>
<span class="line"><span class="__shiki_140thh">      IAMRoleARN = </span><span class="__shiki_mdbnqw">&quot;arn:aws:iam::123456789012:role/gitlab-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # GCS 配置</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">gcs</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      BucketName = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner-cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      CredentialsFile = </span><span class="__shiki_mdbnqw">&quot;/path/to/gcs-key.json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Redis 配置</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">redis</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      Server = </span><span class="__shiki_mdbnqw">&quot;redis://redis.example.com:6379&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      Password = </span><span class="__shiki_mdbnqw">&quot;redis-password&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      DB = </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">      TTL = </span><span class="__shiki_dzsirb">86400</span></span></code></pre></div><h3 id="_3-2-docker-executor-配置优化" tabindex="-1">3.2 Docker Executor 配置优化 <a class="header-anchor" href="#_3-2-docker-executor-配置优化" aria-label="Permalink to &quot;3.2 Docker Executor 配置优化&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;docker-executor-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;docker&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基础配置</span></span>
<span class="line"><span class="__shiki_140thh">    tls_verify = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    image = </span><span class="__shiki_mdbnqw">&quot;alpine:latest&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    privileged = </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  # 需要构建Docker镜像时启用</span></span>
<span class="line"><span class="__shiki_140thh">    disable_entrypoint_overwrite = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    oom_kill_disable = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    disable_cache = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    volumes = [</span><span class="__shiki_mdbnqw">&quot;/cache&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/var/run/docker.sock:/var/run/docker.sock&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    shm_size = </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">  # 共享内存大小，0表示使用默认</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 网络配置</span></span>
<span class="line"><span class="__shiki_140thh">    network_mode = </span><span class="__shiki_mdbnqw">&quot;bridge&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dns = [</span><span class="__shiki_mdbnqw">&quot;8.8.8.8&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;8.8.4.4&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    dns_search = []</span></span>
<span class="line"><span class="__shiki_140thh">    extra_hosts = [</span><span class="__shiki_mdbnqw">&quot;gitlab.example.com:192.168.1.100&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    links = []</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全配置</span></span>
<span class="line"><span class="__shiki_140thh">    userns_mode = </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_21nrsd">  # 用户命名空间</span></span>
<span class="line"><span class="__shiki_140thh">    cap_add = [</span><span class="__shiki_mdbnqw">&quot;CAP_SYS_ADMIN&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    cap_drop = [</span><span class="__shiki_mdbnqw">&quot;CAP_DAC_OVERRIDE&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    security_opt = [</span><span class="__shiki_mdbnqw">&quot;seccomp=unconfined&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 资源限制</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_shares = </span><span class="__shiki_dzsirb">1024</span></span>
<span class="line"><span class="__shiki_140thh">    cpuset_cpus = </span><span class="__shiki_mdbnqw">&quot;0-3&quot;</span><span class="__shiki_21nrsd">  # 绑定到特定CPU</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_quota = </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_21nrsd">  # CPU配额（微秒）</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_period = </span><span class="__shiki_dzsirb">100000</span><span class="__shiki_21nrsd">  # CPU周期（微秒）</span></span>
<span class="line"><span class="__shiki_140thh">    memory = </span><span class="__shiki_mdbnqw">&quot;4g&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    memory_swap = </span><span class="__shiki_mdbnqw">&quot;8g&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    memory_reservation = </span><span class="__shiki_mdbnqw">&quot;2g&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    oom_score_adjust = </span><span class="__shiki_dzsirb">500</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设备映射</span></span>
<span class="line"><span class="__shiki_140thh">    devices = [</span><span class="__shiki_mdbnqw">&quot;/dev/fuse&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 卷优化</span></span>
<span class="line"><span class="__shiki_140thh">    volume_driver = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    volumes_from = []</span></span>
<span class="line"><span class="__shiki_140thh">    cache_dir = </span><span class="__shiki_mdbnqw">&quot;/opt/gitlab-runner/cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 拉取策略</span></span>
<span class="line"><span class="__shiki_140thh">    pull_policy = [</span><span class="__shiki_mdbnqw">&quot;if-not-present&quot;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># never, always, if-not-present</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 等待容器停止时间</span></span>
<span class="line"><span class="__shiki_140thh">    wait_for_services_timeout = </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">    allowed_images = [</span><span class="__shiki_mdbnqw">&quot;docker.io/*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;registry.gitlab.com/*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    allowed_services = [</span><span class="__shiki_mdbnqw">&quot;postgres:*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;redis:*&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;mysql:*&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 环境变量</span></span>
<span class="line"><span class="__shiki_140thh">    environment = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;DOCKER_TLS_CERTDIR=&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;DOCKER_HOST=tcp://docker:2375&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;CI_DEBUG_TRACE=false&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 容器清理</span></span>
<span class="line"><span class="__shiki_140thh">    cleanup_containers = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    cleanup_images = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    cleanup_volumes = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 性能调优</span></span>
<span class="line"><span class="__shiki_140thh">    sysctls = {</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;net.core.somaxconn&quot; = </span><span class="__shiki_mdbnqw">&quot;1024&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;net.ipv4.tcp_tw_reuse&quot; = </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 运行时配置</span></span>
<span class="line"><span class="__shiki_140thh">    runtime = </span><span class="__shiki_mdbnqw">&quot;runc&quot;</span><span class="__shiki_21nrsd">  # runc, nvidia, kata, etc.</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">    healthcheck = {</span></span>
<span class="line"><span class="__shiki_140thh">      interval = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timeout = </span><span class="__shiki_mdbnqw">&quot;10s&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      retries = </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      start_period = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span></code></pre></div><h3 id="_3-3-kubernetes-executor-配置优化" tabindex="-1">3.3 Kubernetes Executor 配置优化 <a class="header-anchor" href="#_3-3-kubernetes-executor-配置优化" aria-label="Permalink to &quot;3.3 Kubernetes Executor 配置优化&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;kubernetes-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;kubernetes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">kubernetes</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接配置</span></span>
<span class="line"><span class="__shiki_140thh">    host = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    cert_file = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    key_file = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ca_file = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    bearer_token = </span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_21nrsd">  # 使用服务账户令牌</span></span>
<span class="line"><span class="__shiki_140thh">    bearer_token_overwrite_allowed = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 命名空间配置</span></span>
<span class="line"><span class="__shiki_140thh">    namespace = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    namespace_overwrite_allowed = </span><span class="__shiki_mdbnqw">&quot;ci-.*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 拉取策略</span></span>
<span class="line"><span class="__shiki_140thh">    image_pull_secrets = [</span><span class="__shiki_mdbnqw">&quot;regcred&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 节点选择</span></span>
<span class="line"><span class="__shiki_140thh">    node_selector = {</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;node-type&quot; = </span><span class="__shiki_mdbnqw">&quot;runner&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;cpu-arch&quot; = </span><span class="__shiki_mdbnqw">&quot;amd64&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    node_selector_overwrite_allowed = </span><span class="__shiki_mdbnqw">&quot;.*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 污点和容忍</span></span>
<span class="line"><span class="__shiki_140thh">    tolerations = [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        key = </span><span class="__shiki_mdbnqw">&quot;runner&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        operator = </span><span class="__shiki_mdbnqw">&quot;Exists&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        effect = </span><span class="__shiki_mdbnqw">&quot;NoSchedule&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Pod 配置</span></span>
<span class="line"><span class="__shiki_140thh">    pod_labels = {</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;app&quot; = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;runner&quot; = </span><span class="__shiki_mdbnqw">&quot;kubernetes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    pod_annotations = {</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;cluster-autoscaler.kubernetes.io/safe-to-evict&quot; = </span><span class="__shiki_mdbnqw">&quot;false&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;prometheus.io/scrape&quot; = </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 资源限制</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_limit = </span><span class="__shiki_mdbnqw">&quot;2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    memory_limit = </span><span class="__shiki_mdbnqw">&quot;4Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_request = </span><span class="__shiki_mdbnqw">&quot;500m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    memory_request = </span><span class="__shiki_mdbnqw">&quot;1Gi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    service_cpu_limit = </span><span class="__shiki_mdbnqw">&quot;100m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    service_memory_limit = </span><span class="__shiki_mdbnqw">&quot;128Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    helper_cpu_limit = </span><span class="__shiki_mdbnqw">&quot;200m&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    helper_memory_limit = </span><span class="__shiki_mdbnqw">&quot;256Mi&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 辅助镜像</span></span>
<span class="line"><span class="__shiki_140thh">    helper_image = </span><span class="__shiki_mdbnqw">&quot;gitlab/gitlab-runner-helper:x86_64-latest&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    helper_image_flavor = </span><span class="__shiki_mdbnqw">&quot;alpine&quot;</span><span class="__shiki_21nrsd">  # alpine, ubuntu</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 卷配置</span></span>
<span class="line"><span class="__shiki_140thh">    volumes = [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name = </span><span class="__shiki_mdbnqw">&quot;docker-sock&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        host_path = {</span></span>
<span class="line"><span class="__shiki_140thh">          path = </span><span class="__shiki_mdbnqw">&quot;/var/run/docker.sock&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name = </span><span class="__shiki_mdbnqw">&quot;cache&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        empty_dir = {</span></span>
<span class="line"><span class="__shiki_140thh">          medium = </span><span class="__shiki_mdbnqw">&quot;Memory&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全上下文</span></span>
<span class="line"><span class="__shiki_140thh">    security_context = {</span></span>
<span class="line"><span class="__shiki_140thh">      run_as_user = </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      run_as_group = </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      fs_group = </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 服务配置</span></span>
<span class="line"><span class="__shiki_140thh">    services = [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        name = </span><span class="__shiki_mdbnqw">&quot;postgres&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        image = </span><span class="__shiki_mdbnqw">&quot;postgres:13&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        env_vars = [</span></span>
<span class="line"><span class="__shiki_140thh">          { name = </span><span class="__shiki_mdbnqw">&quot;POSTGRES_DB&quot;</span><span class="__shiki_140thh">, value = </span><span class="__shiki_mdbnqw">&quot;test&quot;</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">          { name = </span><span class="__shiki_mdbnqw">&quot;POSTGRES_USER&quot;</span><span class="__shiki_140thh">, value = </span><span class="__shiki_mdbnqw">&quot;runner&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 变量配置</span></span>
<span class="line"><span class="__shiki_140thh">    container_env_vars = [</span></span>
<span class="line"><span class="__shiki_140thh">      { name = </span><span class="__shiki_mdbnqw">&quot;DOCKER_HOST&quot;</span><span class="__shiki_140thh">, value = </span><span class="__shiki_mdbnqw">&quot;tcp://localhost:2375&quot;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 存活探针</span></span>
<span class="line"><span class="__shiki_140thh">    liveness_probe = {</span></span>
<span class="line"><span class="__shiki_140thh">      initial_delay_seconds = </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timeout_seconds = </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      period_seconds = </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      success_threshold = </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      failure_threshold = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 亲和性配置</span></span>
<span class="line"><span class="__shiki_140thh">    affinity = {</span></span>
<span class="line"><span class="__shiki_140thh">      nodeAffinity = {</span></span>
<span class="line"><span class="__shiki_140thh">        requiredDuringSchedulingIgnoredDuringExecution = {</span></span>
<span class="line"><span class="__shiki_140thh">          nodeSelectorTerms = [{</span></span>
<span class="line"><span class="__shiki_140thh">            matchExpressions = [{</span></span>
<span class="line"><span class="__shiki_140thh">              key = </span><span class="__shiki_mdbnqw">&quot;node-type&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">              operator = </span><span class="__shiki_mdbnqw">&quot;In&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">              values = [</span><span class="__shiki_mdbnqw">&quot;runner&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">            }]</span></span>
<span class="line"><span class="__shiki_140thh">          }]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 污点容忍配置</span></span>
<span class="line"><span class="__shiki_140thh">    tolerations_overwrite_allowed = </span><span class="__shiki_mdbnqw">&quot;.*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 性能优化</span></span>
<span class="line"><span class="__shiki_140thh">    poll_interval = </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">    poll_timeout = </span><span class="__shiki_dzsirb">600</span></span>
<span class="line"><span class="__shiki_140thh">    wait_for_services_timeout = </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">    cleanup_grace_period_seconds = </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_140thh">    termination_grace_period_seconds = </span><span class="__shiki_dzsirb">3600</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 特权模式</span></span>
<span class="line"><span class="__shiki_140thh">    privileged = </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  # 需要构建Docker镜像时启用</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # DNS配置</span></span>
<span class="line"><span class="__shiki_140thh">    dns_policy = </span><span class="__shiki_mdbnqw">&quot;ClusterFirst&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    dns_config = {</span></span>
<span class="line"><span class="__shiki_140thh">      nameservers = [</span><span class="__shiki_mdbnqw">&quot;8.8.8.8&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;8.8.4.4&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      searches = [</span><span class="__shiki_mdbnqw">&quot;svc.cluster.local&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span></code></pre></div><h3 id="_3-4-docker-machine-executor-自动缩放" tabindex="-1">3.4 Docker Machine Executor（自动缩放） <a class="header-anchor" href="#_3-4-docker-machine-executor-自动缩放" aria-label="Permalink to &quot;3.4 Docker Machine Executor（自动缩放）&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;docker-machine-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;docker+machine&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    tls_verify = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    image = </span><span class="__shiki_mdbnqw">&quot;alpine:latest&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    privileged = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    disable_cache = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    volumes = [</span><span class="__shiki_mdbnqw">&quot;/cache&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">machine</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基础配置</span></span>
<span class="line"><span class="__shiki_140thh">    IdleCount = </span><span class="__shiki_dzsirb">2</span><span class="__shiki_21nrsd">  # 空闲机器数量</span></span>
<span class="line"><span class="__shiki_140thh">    IdleTime = </span><span class="__shiki_dzsirb">1800</span><span class="__shiki_21nrsd">  # 空闲时间（秒）</span></span>
<span class="line"><span class="__shiki_140thh">    MaxBuilds = </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">  # 每个机器最大构建数</span></span>
<span class="line"><span class="__shiki_140thh">    MachineDriver = </span><span class="__shiki_mdbnqw">&quot;amazonec2&quot;</span><span class="__shiki_21nrsd">  # digitalocean, google, azure, virtualbox</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # AWS EC2 配置</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">machine</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">autoscaling</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      Periods = [</span><span class="__shiki_mdbnqw">&quot;* * 9-17 * * mon-fri *&quot;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 工作时间段</span></span>
<span class="line"><span class="__shiki_140thh">      Timezone = </span><span class="__shiki_mdbnqw">&quot;UTC&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      IdleCount = </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">      IdleTime = </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">machine</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">machine_options</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-access-key = </span><span class="__shiki_mdbnqw">&quot;AWS_ACCESS_KEY&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-secret-key = </span><span class="__shiki_mdbnqw">&quot;AWS_SECRET_KEY&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-region = </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-vpc-id = </span><span class="__shiki_mdbnqw">&quot;vpc-123456&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-subnet-id = </span><span class="__shiki_mdbnqw">&quot;subnet-123456&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-zone = </span><span class="__shiki_mdbnqw">&quot;a&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-instance-type = </span><span class="__shiki_mdbnqw">&quot;c5.large&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-root-size = </span><span class="__shiki_dzsirb">64</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-ami = </span><span class="__shiki_mdbnqw">&quot;ami-123456&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-security-group = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner-sg&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-tags = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner,auto-scaling&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-ssh-user = </span><span class="__shiki_mdbnqw">&quot;ubuntu&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-request-spot-instance = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      amazonec2-spot-price = </span><span class="__shiki_mdbnqw">&quot;0.05&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 机器配置</span></span>
<span class="line"><span class="__shiki_140thh">    MachineName = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner-%s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    MachineDriver = </span><span class="__shiki_mdbnqw">&quot;amazonec2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动缩放策略</span></span>
<span class="line"><span class="__shiki_140thh">    OffPeakPeriods = [</span><span class="__shiki_mdbnqw">&quot;* * 0-9,18-23 * * * *&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;* * * * * sat,sun *&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    OffPeakTimezone = </span><span class="__shiki_mdbnqw">&quot;UTC&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    OffPeakIdleCount = </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    OffPeakIdleTime = </span><span class="__shiki_dzsirb">1800</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 清理策略</span></span>
<span class="line"><span class="__shiki_140thh">    machine_destroy_strategy = </span><span class="__shiki_mdbnqw">&quot;most-idle&quot;</span><span class="__shiki_21nrsd">  # most-idle, least-recently-used, oldest</span></span></code></pre></div><h2 id="四、性能优化配置" tabindex="-1">四、性能优化配置 <a class="header-anchor" href="#四、性能优化配置" aria-label="Permalink to &quot;四、性能优化配置&quot;">​</a></h2><h3 id="_4-1-并发和资源优化" tabindex="-1">4.1 并发和资源优化 <a class="header-anchor" href="#_4-1-并发和资源优化" aria-label="Permalink to &quot;4.1 并发和资源优化&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 根据硬件资源调整</span></span>
<span class="line"><span class="__shiki_140thh">concurrent = </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 作业限制</span></span>
<span class="line"><span class="__shiki_140thh">  limit = </span><span class="__shiki_dzsirb">10</span><span class="__shiki_21nrsd">  # 单个Runner最大作业数</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 输出限制</span></span>
<span class="line"><span class="__shiki_140thh">  output_limit = </span><span class="__shiki_dzsirb">16384</span><span class="__shiki_21nrsd">  # 16MB，增加大日志输出</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 请求并发</span></span>
<span class="line"><span class="__shiki_140thh">  request_concurrency = </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 自定义构建目录（减少磁盘IO）</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">custom_build_dir</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 缓存优化</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    Type = </span><span class="__shiki_mdbnqw">&quot;s3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Shared = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">s3</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      BucketName = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner-cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      CachePath = </span><span class="__shiki_mdbnqw">&quot;runner-cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      Insecure = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">      StorageClass = </span><span class="__shiki_mdbnqw">&quot;STANDARD_IA&quot;</span><span class="__shiki_21nrsd">  # 降低成本</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # Docker 性能优化</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用 overlay2 存储驱动</span></span>
<span class="line"><span class="__shiki_140thh">    storage_driver = </span><span class="__shiki_mdbnqw">&quot;overlay2&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 优化层缓存</span></span>
<span class="line"><span class="__shiki_140thh">    disable_cache_layer = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用本地镜像缓存</span></span>
<span class="line"><span class="__shiki_140thh">    pull_policy = [</span><span class="__shiki_mdbnqw">&quot;if-not-present&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 内存优化</span></span>
<span class="line"><span class="__shiki_140thh">    memory = </span><span class="__shiki_mdbnqw">&quot;4g&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    memory_swap = </span><span class="__shiki_mdbnqw">&quot;8g&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    memory_reservation = </span><span class="__shiki_mdbnqw">&quot;2g&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CPU优化</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_shares = </span><span class="__shiki_dzsirb">1024</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_quota = </span><span class="__shiki_dzsirb">100000</span></span>
<span class="line"><span class="__shiki_140thh">    cpu_period = </span><span class="__shiki_dzsirb">100000</span></span>
<span class="line"><span class="__shiki_140thh">    cpuset_cpus = </span><span class="__shiki_mdbnqw">&quot;0-3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # I/O优化</span></span>
<span class="line"><span class="__shiki_140thh">    blkio_weight = </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_140thh">    storage_opt = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;size=20G&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 网络优化</span></span>
<span class="line"><span class="__shiki_140thh">    network_mode = </span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_21nrsd">  # 高性能网络模式</span></span>
<span class="line"><span class="__shiki_140thh">    dns = [</span><span class="__shiki_mdbnqw">&quot;8.8.8.8&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;1.1.1.1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    extra_hosts = [</span><span class="__shiki_mdbnqw">&quot;gitlab.example.com:192.168.1.100&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_4-2-缓存策略优化" tabindex="-1">4.2 缓存策略优化 <a class="header-anchor" href="#_4-2-缓存策略优化" aria-label="Permalink to &quot;4.2 缓存策略优化&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 多级缓存配置</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 主缓存：S3</span></span>
<span class="line"><span class="__shiki_140thh">    Type = </span><span class="__shiki_mdbnqw">&quot;s3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    Shared = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">s3</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      ServerAddress = </span><span class="__shiki_mdbnqw">&quot;s3.amazonaws.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      BucketName = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner-cache-prod&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      BucketLocation = </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      CachePath = </span><span class="__shiki_mdbnqw">&quot;runner-cache&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      StorageClass = </span><span class="__shiki_mdbnqw">&quot;STANDARD_IA&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      ServerSideEncryption = </span><span class="__shiki_mdbnqw">&quot;AES256&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      EncryptionMode = </span><span class="__shiki_mdbnqw">&quot;SSE-S3&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      AuthenticationType = </span><span class="__shiki_mdbnqw">&quot;IAM&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      IAMRoleARN = </span><span class="__shiki_mdbnqw">&quot;arn:aws:iam::123456789012:role/gitlab-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 本地缓存：Redis（快速访问）</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">cache</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">redis</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      Server = </span><span class="__shiki_mdbnqw">&quot;redis://redis-cluster.example.com:6379&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      Password = </span><span class="__shiki_mdbnqw">&quot;\${REDIS_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      DB = </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">      TTL = </span><span class="__shiki_dzsirb">86400</span></span>
<span class="line"><span class="__shiki_140thh">      KeyPrefix = </span><span class="__shiki_mdbnqw">&quot;runner:cache:&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      ConnectionTimeout = </span><span class="__shiki_mdbnqw">&quot;5s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      ReadTimeout = </span><span class="__shiki_mdbnqw">&quot;3s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      WriteTimeout = </span><span class="__shiki_mdbnqw">&quot;3s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      PoolSize = </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">      PoolTimeout = </span><span class="__shiki_mdbnqw">&quot;30s&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    # GC 配置</span></span>
<span class="line"><span class="__shiki_140thh">    GC = {</span></span>
<span class="line"><span class="__shiki_140thh">      Enabled = </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      CachePath = </span><span class="__shiki_mdbnqw">&quot;/var/gitlab-runner/cache&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      MaxAge = </span><span class="__shiki_dzsirb">604800</span><span class="__shiki_140thh">,  # 7天</span></span>
<span class="line"><span class="__shiki_140thh">      CacheSize = </span><span class="__shiki_dzsirb">10737418240</span><span class="__shiki_140thh">  # 10GB</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span></code></pre></div><h3 id="_4-3-网络优化" tabindex="-1">4.3 网络优化 <a class="header-anchor" href="#_4-3-网络优化" aria-label="Permalink to &quot;4.3 网络优化&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  # DNS优化</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    dns = [</span><span class="__shiki_mdbnqw">&quot;8.8.8.8&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;8.8.4.4&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;1.1.1.1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    dns_search = [</span><span class="__shiki_mdbnqw">&quot;svc.cluster.local&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;example.com&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    dns_opt = [</span><span class="__shiki_mdbnqw">&quot;timeout:2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;attempts:3&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 网络模式选择</span></span>
<span class="line"><span class="__shiki_140thh">    network_mode = </span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_21nrsd">  # 最高性能，但安全性较低</span></span>
<span class="line"><span class="__shiki_21nrsd">    # network_mode = &quot;bridge&quot;  # 默认，安全性较好</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # MTU调整</span></span>
<span class="line"><span class="__shiki_140thh">    mtu = </span><span class="__shiki_dzsirb">1500</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 网络别名</span></span>
<span class="line"><span class="__shiki_140thh">    network_aliases = [</span><span class="__shiki_mdbnqw">&quot;runner&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;builder&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # HTTP代理配置</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">http_proxy</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    url = </span><span class="__shiki_mdbnqw">&quot;http://proxy.example.com:3128&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    user = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    password = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # Git配置</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">git</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    sslVerify = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    depth = </span><span class="__shiki_dzsirb">50</span><span class="__shiki_21nrsd">  # 浅克隆深度</span></span>
<span class="line"><span class="__shiki_140thh">    submoduleStrategy = </span><span class="__shiki_mdbnqw">&quot;normal&quot;</span><span class="__shiki_21nrsd">  # normal, recursive, none</span></span>
<span class="line"><span class="__shiki_140thh">    submoduleDepth = </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    noTLSVerify = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    httpProxy = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    httpsProxy = </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span></code></pre></div><h2 id="五、安全配置优化" tabindex="-1">五、安全配置优化 <a class="header-anchor" href="#五、安全配置优化" aria-label="Permalink to &quot;五、安全配置优化&quot;">​</a></h2><h3 id="_5-1-访问控制" tabindex="-1">5.1 访问控制 <a class="header-anchor" href="#_5-1-访问控制" aria-label="Permalink to &quot;5.1 访问控制&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Runner访问级别</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 访问级别</span></span>
<span class="line"><span class="__shiki_140thh">  access_level = </span><span class="__shiki_mdbnqw">&quot;ref_protected&quot;</span><span class="__shiki_21nrsd">  # not_protected, ref_protected</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 保护分支</span></span>
<span class="line"><span class="__shiki_140thh">  protected = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 运行未标记作业</span></span>
<span class="line"><span class="__shiki_140thh">  run_untagged = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 锁定到项目</span></span>
<span class="line"><span class="__shiki_140thh">  locked = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 最大超时时间</span></span>
<span class="line"><span class="__shiki_140thh">  maximum_timeout = </span><span class="__shiki_dzsirb">3600</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 环境变量白名单</span></span>
<span class="line"><span class="__shiki_140thh">  environment = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;CI_*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;DOCKER_*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;GIT_*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;KUBE_*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;AWS_*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  ]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 镜像白名单</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    allowed_images = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;docker.io/library/*:latest&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;registry.gitlab.com/*:*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;gcr.io/*:*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    allowed_services = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;postgres:*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;redis:*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;mysql:*&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;mongo:*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 安全配置</span></span>
<span class="line"><span class="__shiki_140thh">    privileged = </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 生产环境建议关闭</span></span>
<span class="line"><span class="__shiki_140thh">    userns_mode = </span><span class="__shiki_mdbnqw">&quot;host&quot;</span><span class="__shiki_21nrsd">  # 用户命名空间隔离</span></span>
<span class="line"><span class="__shiki_140thh">    cap_add = []  </span><span class="__shiki_21nrsd"># 最小权限原则</span></span>
<span class="line"><span class="__shiki_140thh">    cap_drop = [</span><span class="__shiki_mdbnqw">&quot;ALL&quot;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 丢弃所有权限</span></span>
<span class="line"><span class="__shiki_140thh">    security_opt = [</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;no-new-privileges:true&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;seccomp=unconfined&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 只读根文件系统</span></span>
<span class="line"><span class="__shiki_140thh">    read_only = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 用户和组</span></span>
<span class="line"><span class="__shiki_140thh">    user = </span><span class="__shiki_mdbnqw">&quot;1000:1000&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设备白名单</span></span>
<span class="line"><span class="__shiki_140thh">    devices = []</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # sysctl限制</span></span>
<span class="line"><span class="__shiki_140thh">    sysctls = {</span></span>
<span class="line"><span class="__shiki_140thh">      &quot;net.ipv4.ip_forward&quot; = </span><span class="__shiki_mdbnqw">&quot;0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span></code></pre></div><h3 id="_5-2-密钥管理" tabindex="-1">5.2 密钥管理 <a class="header-anchor" href="#_5-2-密钥管理" aria-label="Permalink to &quot;5.2 密钥管理&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用外部密钥管理</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">secrets</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Vault集成</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">secrets</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">vault</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      server = </span><span class="__shiki_mdbnqw">&quot;https://vault.example.com:8200&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      auth = {</span></span>
<span class="line"><span class="__shiki_140thh">        name = </span><span class="__shiki_mdbnqw">&quot;jwt&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        path = </span><span class="__shiki_mdbnqw">&quot;jwt&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        data = {</span></span>
<span class="line"><span class="__shiki_140thh">          role = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">          jwt = </span><span class="__shiki_mdbnqw">&quot;{{.CI_JOB_JWT}}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      engine = {</span></span>
<span class="line"><span class="__shiki_140thh">        name = </span><span class="__shiki_mdbnqw">&quot;kv-v2&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        path = </span><span class="__shiki_mdbnqw">&quot;secret&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      field = </span><span class="__shiki_mdbnqw">&quot;token&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    # AWS Secrets Manager</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">secrets</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">aws_secrets_manager</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      server = </span><span class="__shiki_mdbnqw">&quot;https://secretsmanager.us-east-1.amazonaws.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      auth = {</span></span>
<span class="line"><span class="__shiki_140thh">        name = </span><span class="__shiki_mdbnqw">&quot;aws&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        data = {</span></span>
<span class="line"><span class="__shiki_140thh">          region = </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 环境变量注入</span></span>
<span class="line"><span class="__shiki_140thh">    [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">secrets</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">env</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      name = </span><span class="__shiki_mdbnqw">&quot;DOCKER_AUTH_CONFIG&quot;</span></span>
<span class="line"><span class="__shiki_140thh">      value = </span><span class="__shiki_mdbnqw">&quot;{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">auths</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">:{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">$CI_REGISTRY</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">:{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">username</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">$CI_REGISTRY_USER</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">password</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">:</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">$CI_REGISTRY_PASSWORD</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">}}}&quot;</span></span></code></pre></div><h2 id="六、监控与日志" tabindex="-1">六、监控与日志 <a class="header-anchor" href="#六、监控与日志" aria-label="Permalink to &quot;六、监控与日志&quot;">​</a></h2><h3 id="_6-1-监控配置" tabindex="-1">6.1 监控配置 <a class="header-anchor" href="#_6-1-监控配置" aria-label="Permalink to &quot;6.1 监控配置&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Prometheus指标</span></span>
<span class="line"><span class="__shiki_140thh">listen_address = </span><span class="__shiki_mdbnqw">&quot;:9252&quot;</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_metrics_enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">prometheus_metrics_buckets = [</span><span class="__shiki_dzsirb">0.001</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.01</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">300</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">600</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">metrics_server</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  listen_address = </span><span class="__shiki_mdbnqw">&quot;:9253&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 自定义指标</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">observability</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">observability</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sentry</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    dsn = </span><span class="__shiki_mdbnqw">&quot;https://sentry.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    environment = </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">observability</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">tracing</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    service_name = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    provider = </span><span class="__shiki_mdbnqw">&quot;jaeger&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    endpoint = </span><span class="__shiki_mdbnqw">&quot;http://jaeger:14268/api/traces&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    sample_rate = </span><span class="__shiki_dzsirb">0.1</span></span></code></pre></div><h3 id="_6-2-日志配置" tabindex="-1">6.2 日志配置 <a class="header-anchor" href="#_6-2-日志配置" aria-label="Permalink to &quot;6.2 日志配置&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 结构化日志</span></span>
<span class="line"><span class="__shiki_140thh">log_level = </span><span class="__shiki_mdbnqw">&quot;info&quot;</span></span>
<span class="line"><span class="__shiki_140thh">log_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"><span class="__shiki_140thh">log_format_json = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">log_format_json_structured = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日志轮转</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">logging</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  max_size = </span><span class="__shiki_dzsirb">100</span><span class="__shiki_21nrsd">  # MB</span></span>
<span class="line"><span class="__shiki_140thh">  max_age = </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">    # 天</span></span>
<span class="line"><span class="__shiki_140thh">  max_backups = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">  compress = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 审计日志</span></span>
<span class="line"><span class="__shiki_140thh">audit_log_path = </span><span class="__shiki_mdbnqw">&quot;/var/log/gitlab-runner/audit.log&quot;</span></span>
<span class="line"><span class="__shiki_140thh">audit_log_format = </span><span class="__shiki_mdbnqw">&quot;json&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 系统日志集成</span></span>
<span class="line"><span class="__shiki_140thh">syslog = {</span></span>
<span class="line"><span class="__shiki_140thh">  enabled = </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  address = </span><span class="__shiki_mdbnqw">&quot;udp://syslog.example.com:514&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  facility = </span><span class="__shiki_mdbnqw">&quot;local7&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  tag = </span><span class="__shiki_mdbnqw">&quot;gitlab-runner&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 错误追踪</span></span>
<span class="line"><span class="__shiki_140thh">error_tracking = {</span></span>
<span class="line"><span class="__shiki_140thh">  enabled = </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  sentry_dsn = </span><span class="__shiki_mdbnqw">&quot;https://sentry.example.com&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  environment = </span><span class="__shiki_mdbnqw">&quot;production&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">  release = </span><span class="__shiki_mdbnqw">&quot;v14.0.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、高可用与灾备" tabindex="-1">七、高可用与灾备 <a class="header-anchor" href="#七、高可用与灾备" aria-label="Permalink to &quot;七、高可用与灾备&quot;">​</a></h2><h3 id="_7-1-多runner配置" tabindex="-1">7.1 多Runner配置 <a class="header-anchor" href="#_7-1-多runner配置" aria-label="Permalink to &quot;7.1 多Runner配置&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 主Runner配置</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;runner-primary&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;https://gitlab.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;primary-token&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;docker&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 故障转移配置</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">failover</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    retry_attempts = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    retry_wait_time = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">    max_failures = </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">    failure_window = </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">health</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    check_interval = </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">    unhealthy_threshold = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    healthy_threshold = </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">    timeout = </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd"># 备份Runner配置</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;runner-backup&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;https://gitlab-backup.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;backup-token&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;docker&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 负载均衡配置</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">load_balancer</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    strategy = </span><span class="__shiki_mdbnqw">&quot;round_robin&quot;</span><span class="__shiki_21nrsd">  # round_robin, least_connections</span></span>
<span class="line"><span class="__shiki_140thh">    sticky_sessions = </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    health_check_path = </span><span class="__shiki_mdbnqw">&quot;/health&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 自动恢复</span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">autorecovery</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    check_interval = </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">    max_restarts = </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    restart_delay = </span><span class="__shiki_dzsirb">300</span></span></code></pre></div><h3 id="_7-2-地理分布配置" tabindex="-1">7.2 地理分布配置 <a class="header-anchor" href="#_7-2-地理分布配置" aria-label="Permalink to &quot;7.2 地理分布配置&quot;">​</a></h3><div class="language-toml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">toml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 北美区域</span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;runner-us-east&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;https://gitlab-us.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;us-token&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;docker&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    image = </span><span class="__shiki_mdbnqw">&quot;alpine:latest&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">geo</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    region = </span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    priority = </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd"># 欧洲区域  </span></span>
<span class="line"><span class="__shiki_140thh">[[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">  name = </span><span class="__shiki_mdbnqw">&quot;runner-eu-west&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  url = </span><span class="__shiki_mdbnqw">&quot;https://gitlab-eu.example.com&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  token = </span><span class="__shiki_mdbnqw">&quot;eu-token&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  executor = </span><span class="__shiki_mdbnqw">&quot;docker&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    image = </span><span class="__shiki_mdbnqw">&quot;alpine:latest&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  [</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">geo</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    region = </span><span class="__shiki_mdbnqw">&quot;eu-west-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    enabled = </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    priority = </span><span class="__shiki_dzsirb">90</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd"># 故障转移规则</span></span>
<span class="line"><span class="__shiki_140thh">[</span><span class="__shiki_1t8gfj">runners</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">coordinator</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  strategy = </span><span class="__shiki_mdbnqw">&quot;geo_affinity&quot;</span><span class="__shiki_21nrsd">  # geo_affinity, failover, load_balance</span></span>
<span class="line"><span class="__shiki_140thh">  failover_regions = [</span><span class="__shiki_mdbnqw">&quot;us-west-2&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ap-northeast-1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  health_check_timeout = </span><span class="__shiki_dzsirb">30</span></span></code></pre></div><h2 id="八、故障排除与调试" tabindex="-1">八、故障排除与调试 <a class="header-anchor" href="#八、故障排除与调试" aria-label="Permalink to &quot;八、故障排除与调试&quot;">​</a></h2><h3 id="_8-1-常用命令" tabindex="-1">8.1 常用命令 <a class="header-anchor" href="#_8-1-常用命令" aria-label="Permalink to &quot;8.1 常用命令&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 检查配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> verify</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> troubleshoot</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 查看状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> status</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> list</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启停控制</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> start</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> stop</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> restart</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 日志查看</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> journalctl</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_dzsirb"> -f</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> tail</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> /var/log/gitlab-runner/runner.log</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 内存和性能分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> monitor</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> profiler</span><span class="__shiki_dzsirb"> --cpu</span><span class="__shiki_dzsirb"> --mem</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 重置和清理</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> unregister</span><span class="__shiki_dzsirb"> --all-runners</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> cache-clear</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Docker执行器调试</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_dzsirb"> -it</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> gitlab-runner</span><span class="__shiki_mdbnqw"> debug</span></span></code></pre></div><h3 id="_8-2-性能分析工具" tabindex="-1">8.2 性能分析工具 <a class="header-anchor" href="#_8-2-性能分析工具" aria-label="Permalink to &quot;8.2 性能分析工具&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装性能分析工具</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> sysstat</span><span class="__shiki_mdbnqw"> dstat</span><span class="__shiki_mdbnqw"> iotop</span><span class="__shiki_mdbnqw"> htop</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 实时监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> dstat</span><span class="__shiki_dzsirb"> -cdngy</span><span class="__shiki_dzsirb"> --top-io</span><span class="__shiki_dzsirb"> --top-cpu</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> iotop</span><span class="__shiki_dzsirb"> -o</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> htop</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># I/O性能测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">sudo</span><span class="__shiki_mdbnqw"> fio</span><span class="__shiki_dzsirb"> --name=test</span><span class="__shiki_dzsirb"> --ioengine=libaio</span><span class="__shiki_dzsirb"> --rw=randread</span><span class="__shiki_dzsirb"> --bs=4k</span><span class="__shiki_dzsirb"> --numjobs=16</span><span class="__shiki_dzsirb"> --size=1G</span><span class="__shiki_dzsirb"> --runtime=60</span><span class="__shiki_dzsirb"> --time_based</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 网络性能测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">iperf3</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">serve</span><span class="__shiki_140thh">r</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_dzsirb"> 30</span><span class="__shiki_dzsirb"> -P</span><span class="__shiki_dzsirb"> 10</span></span></code></pre></div><h2 id="九、最佳实践总结" tabindex="-1">九、最佳实践总结 <a class="header-anchor" href="#九、最佳实践总结" aria-label="Permalink to &quot;九、最佳实践总结&quot;">​</a></h2><h3 id="_9-1-容量规划建议" tabindex="-1">9.1 容量规划建议 <a class="header-anchor" href="#_9-1-容量规划建议" aria-label="Permalink to &quot;9.1 容量规划建议&quot;">​</a></h3><table tabindex="0"><thead><tr><th>资源类型</th><th>小型团队</th><th>中型团队</th><th>大型企业</th></tr></thead><tbody><tr><td>并发作业数</td><td>4-8</td><td>16-32</td><td>64+</td></tr><tr><td>内存/作业</td><td>2GB</td><td>4GB</td><td>8GB+</td></tr><tr><td>CPU/作业</td><td>1核</td><td>2核</td><td>4核+</td></tr><tr><td>存储/作业</td><td>10GB</td><td>50GB</td><td>100GB+</td></tr><tr><td>网络带宽</td><td>100Mbps</td><td>1Gbps</td><td>10Gbps+</td></tr></tbody></table><h3 id="_9-2-配置检查清单" tabindex="-1">9.2 配置检查清单 <a class="header-anchor" href="#_9-2-配置检查清单" aria-label="Permalink to &quot;9.2 配置检查清单&quot;">​</a></h3><ul><li>[ ] 启用监控和日志记录</li><li>[ ] 配置适当的资源限制</li><li>[ ] 设置缓存策略（S3/Redis）</li><li>[ ] 配置安全策略（最小权限）</li><li>[ ] 启用自动缩放（Docker Machine）</li><li>[ ] 设置地理分布（多区域）</li><li>[ ] 配置故障转移机制</li><li>[ ] 定期更新Runner版本</li><li>[ ] 备份配置文件</li><li>[ ] 监控磁盘和内存使用</li></ul><h3 id="_9-3-版本升级策略" tabindex="-1">9.3 版本升级策略 <a class="header-anchor" href="#_9-3-版本升级策略" aria-label="Permalink to &quot;9.3 版本升级策略&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 测试环境先升级</span></span>
<span class="line"><span class="__shiki_1t8gfj">gitlab-runner</span><span class="__shiki_mdbnqw"> stop</span></span>
<span class="line"><span class="__shiki_1t8gfj">gitlab-runner</span><span class="__shiki_mdbnqw"> uninstall</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -L</span><span class="__shiki_dzsirb"> --output</span><span class="__shiki_mdbnqw"> /usr/local/bin/gitlab-runner</span><span class="__shiki_mdbnqw"> https://gitlab-runner-downloads.s3.amazonaws.com/latest/binaries/gitlab-runner-linux-amd64</span></span>
<span class="line"><span class="__shiki_1t8gfj">chmod</span><span class="__shiki_mdbnqw"> +x</span><span class="__shiki_mdbnqw"> /usr/local/bin/gitlab-runner</span></span>
<span class="line"><span class="__shiki_1t8gfj">gitlab-runner</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> --user=gitlab-runner</span></span>
<span class="line"><span class="__shiki_1t8gfj">gitlab-runner</span><span class="__shiki_mdbnqw"> start</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 滚动升级策略</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 先升级25%的Runner</span></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 监控24小时</span></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 再升级50%</span></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 最后升级剩余25%</span></span></code></pre></div><p>这份详细的Runner配置优化指南涵盖了从基础安装到高级优化的各个方面。根据实际需求和环境调整这些配置，可以显著提升GitLab CI/CD流水线的性能和可靠性。</p>`,63)])])}const d=a(i,[["render",l]]);export{o as __pageData,d as default};
