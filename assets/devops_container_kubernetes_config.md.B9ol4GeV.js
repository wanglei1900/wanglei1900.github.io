import{_ as a,o as n,c as p,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"Kubernetes配置管理方案 - 详细完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/container/kubernetes/config.md","filePath":"devops/container/kubernetes/config.md"}'),i={name:"devops/container/kubernetes/config.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[_(`<h1 id="kubernetes配置管理方案-详细完整学习笔记" tabindex="-1">Kubernetes配置管理方案 - 详细完整学习笔记 <a class="header-anchor" href="#kubernetes配置管理方案-详细完整学习笔记" aria-label="Permalink to &quot;Kubernetes配置管理方案 - 详细完整学习笔记&quot;">​</a></h1><h2 id="一、配置管理基础概念" tabindex="-1">一、配置管理基础概念 <a class="header-anchor" href="#一、配置管理基础概念" aria-label="Permalink to &quot;一、配置管理基础概念&quot;">​</a></h2><h3 id="_1-1-配置管理的重要性" tabindex="-1">1.1 配置管理的重要性 <a class="header-anchor" href="#_1-1-配置管理的重要性" aria-label="Permalink to &quot;1.1 配置管理的重要性&quot;">​</a></h3><p>在云原生环境中，配置管理需要解决：</p><ul><li><strong>环境差异性</strong>：开发、测试、生产环境配置分离</li><li><strong>配置一致性</strong>：确保不同实例使用相同配置</li><li><strong>配置安全性</strong>：敏感信息（密码、密钥）保护</li><li><strong>配置动态性</strong>：运行时配置更新能力</li><li><strong>配置版本化</strong>：跟踪配置变更历史</li></ul><h3 id="_1-2-kubernetes配置管理方案概览" tabindex="-1">1.2 Kubernetes配置管理方案概览 <a class="header-anchor" href="#_1-2-kubernetes配置管理方案概览" aria-label="Permalink to &quot;1.2 Kubernetes配置管理方案概览&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│               配置管理方案体系                      │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 1. ConfigMap        │ 2. Secret         │ 3. 环境变量 │</span></span>
<span class="line"><span class="__shiki_wvjl67">│    - 非敏感配置      │   - 敏感数据      │   - 简单配置│</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 4. Downward API     │ 5. External       │ 6. Operator │</span></span>
<span class="line"><span class="__shiki_wvjl67">│    - Pod元数据       │   - 外部配置源    │   - 复杂配置│</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────┘</span></span></code></pre></div><h2 id="二、configmap详解" tabindex="-1">二、ConfigMap详解 <a class="header-anchor" href="#二、configmap详解" aria-label="Permalink to &quot;二、ConfigMap详解&quot;">​</a></h2><h3 id="_2-1-configmap基础" tabindex="-1">2.1 ConfigMap基础 <a class="header-anchor" href="#_2-1-configmap基础" aria-label="Permalink to &quot;2.1 ConfigMap基础&quot;">​</a></h3><h4 id="_2-1-1-configmap定义" tabindex="-1">2.1.1 ConfigMap定义 <a class="header-anchor" href="#_2-1-1-configmap定义" aria-label="Permalink to &quot;2.1.1 ConfigMap定义&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Application configuration&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 键值对格式</span></span>
<span class="line"><span class="__shiki_17hn0y">  APP_NAME</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;My Application&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  LOG_LEVEL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;INFO&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  MAX_CONNECTIONS</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;100&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 文件格式内容</span></span>
<span class="line"><span class="__shiki_17hn0y">  application.properties</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    server.port=8080</span></span>
<span class="line"><span class="__shiki_mdbnqw">    server.host=0.0.0.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">    db.url=jdbc:mysql://db-host:3306/appdb</span></span>
<span class="line"><span class="__shiki_mdbnqw">    cache.ttl=3600</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  nginx.conf</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    server {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      listen 80;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      server_name localhost;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      location / {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        proxy_pass http://backend:8080;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        proxy_set_header Host $host;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_17hn0y">binaryData</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 二进制数据（base64编码）</span></span>
<span class="line"><span class="__shiki_17hn0y">  icon.png</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==&quot;</span></span></code></pre></div><h4 id="_2-1-2-configmap创建方式" tabindex="-1">2.1.2 ConfigMap创建方式 <a class="header-anchor" href="#_2-1-2-configmap创建方式" aria-label="Permalink to &quot;2.1.2 ConfigMap创建方式&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 从字面值创建</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_mdbnqw"> game-config</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-literal=player_initial_lives=</span><span class="__shiki_mdbnqw">&quot;3&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-literal=ui_properties_file_name=</span><span class="__shiki_mdbnqw">&quot;user-interface.properties&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 从文件创建</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_mdbnqw"> game-config</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-file=game.properties</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-file=ui.properties</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 从目录创建</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_mdbnqw"> game-config</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-file=configs/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 从.env文件创建</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_mdbnqw"> env-config</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-env-file=.env</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 从YAML文件创建</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> configmap.yaml</span></span></code></pre></div><h3 id="_2-2-configmap使用方式" tabindex="-1">2.2 ConfigMap使用方式 <a class="header-anchor" href="#_2-2-configmap使用方式" aria-label="Permalink to &quot;2.2 ConfigMap使用方式&quot;">​</a></h3><h4 id="_2-2-1-作为环境变量" tabindex="-1">2.2.1 作为环境变量 <a class="header-anchor" href="#_2-2-1-作为环境变量" aria-label="Permalink to &quot;2.2.1 作为环境变量&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">configmap-env-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;env&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 单个环境变量引用</span></span>
<span class="line"><span class="__shiki_17hn0y">    env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LOG_LEVEL</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMapKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LOG_LEVEL</span></span>
<span class="line"><span class="__shiki_17hn0y">          optional</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  # 可选配置，ConfigMap不存在时不报错</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 批量注入环境变量</span></span>
<span class="line"><span class="__shiki_17hn0y">    envFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">configMapRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">        optional</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">prefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;DB_&quot;</span><span class="__shiki_21nrsd">  # 添加前缀</span></span>
<span class="line"><span class="__shiki_17hn0y">      configMapRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-config</span></span></code></pre></div><h4 id="_2-2-2-作为命令行参数" tabindex="-1">2.2.2 作为命令行参数 <a class="header-anchor" href="#_2-2-2-作为命令行参数" aria-label="Permalink to &quot;2.2.2 作为命令行参数&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">configmap-args-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;echo $(APP_NAME) $(LOG_LEVEL)&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">APP_NAME</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMapKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">APP_NAME</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LOG_LEVEL</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMapKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LOG_LEVEL</span></span></code></pre></div><h4 id="_2-2-3-作为卷挂载" tabindex="-1">2.2.3 作为卷挂载 <a class="header-anchor" href="#_2-2-3-作为卷挂载" aria-label="Permalink to &quot;2.2.3 作为卷挂载&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">configmap-volume-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/config</span></span>
<span class="line"><span class="__shiki_17hn0y">      readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/application.properties</span></span>
<span class="line"><span class="__shiki_17hn0y">      subPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application.properties</span><span class="__shiki_21nrsd">  # 挂载单个文件</span></span>
<span class="line"><span class="__shiki_17hn0y">      readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">    configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">    configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">      items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application.properties</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application.properties</span></span>
<span class="line"><span class="__shiki_17hn0y">      defaultMode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0644</span><span class="__shiki_21nrsd">  # 设置文件权限</span></span></code></pre></div><h4 id="_2-2-4-多种挂载模式对比" tabindex="-1">2.2.4 多种挂载模式对比 <a class="header-anchor" href="#_2-2-4-多种挂载模式对比" aria-label="Permalink to &quot;2.2.4 多种挂载模式对比&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">  configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 模式1：挂载所有键作为文件</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 目录结构：</span></span>
<span class="line"><span class="__shiki_21nrsd">    # /etc/config/APP_NAME</span></span>
<span class="line"><span class="__shiki_21nrsd">    # /etc/config/LOG_LEVEL</span></span>
<span class="line"><span class="__shiki_21nrsd">    # /etc/config/application.properties</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 模式2：选择性挂载</span></span>
<span class="line"><span class="__shiki_17hn0y">    items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application.properties</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app.properties</span><span class="__shiki_21nrsd">  # 重命名</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 模式3：设置文件权限</span></span>
<span class="line"><span class="__shiki_17hn0y">    defaultMode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0644</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 模式4：可选配置（1.21+）</span></span>
<span class="line"><span class="__shiki_17hn0y">    optional</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_2-3-configmap高级特性" tabindex="-1">2.3 ConfigMap高级特性 <a class="header-anchor" href="#_2-3-configmap高级特性" aria-label="Permalink to &quot;2.3 ConfigMap高级特性&quot;">​</a></h3><h4 id="_2-3-1-不可变configmap" tabindex="-1">2.3.1 不可变ConfigMap <a class="header-anchor" href="#_2-3-1-不可变configmap" aria-label="Permalink to &quot;2.3.1 不可变ConfigMap&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">immutable-config</span></span>
<span class="line"><span class="__shiki_17hn0y">immutable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">  # 设置为不可变</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  config.json</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;featureFlags&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;newUI&quot;: true,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;experimental&quot;: false</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span></code></pre></div><p><strong>不可变ConfigMap优势：</strong></p><ul><li>防止意外修改</li><li>减少apiserver负载</li><li>提高安全性</li><li>性能优化（减少watch操作）</li></ul><h4 id="_2-3-2-configmap热更新" tabindex="-1">2.3.2 ConfigMap热更新 <a class="header-anchor" href="#_2-3-2-configmap热更新" aria-label="Permalink to &quot;2.3.2 ConfigMap热更新&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hot-reload-app</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxSurge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxUnavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 添加ConfigMap摘要，触发Pod重启</span></span>
<span class="line"><span class="__shiki_17hn0y">        checksum/config</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ include (print $.Template.BasePath &quot;/configmap.yaml&quot;) . | sha256sum }}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          postStart</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">              # 监控配置变化脚本</span></span>
<span class="line"><span class="__shiki_17hn0y">              command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;/bin/sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;inotifywait -m /etc/config -e create,modify,delete | while read; do reload-app; done&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/config</span></span>
<span class="line"><span class="__shiki_17hn0y">          readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">    configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span></code></pre></div><p><strong>热更新策略：</strong></p><ol><li><strong>Sidecar监控模式</strong>：使用sidecar容器监控配置变化</li><li><strong>信号通知模式</strong>：通过发送信号通知应用重载</li><li><strong>应用内监控模式</strong>：应用自身监控文件变化</li><li><strong>滚动更新模式</strong>：修改ConfigMap触发Pod重启</li></ol><h4 id="_2-3-3-configmap大小限制" tabindex="-1">2.3.3 ConfigMap大小限制 <a class="header-anchor" href="#_2-3-3-configmap大小限制" aria-label="Permalink to &quot;2.3.3 ConfigMap大小限制&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 最佳实践：分拆大ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">large-config-part1</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  part1.json</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    { /* 第一部分配置，小于1MB */ }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">large-config-part2</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  part2.json</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    { /* 第二部分配置，小于1MB */ }</span></span></code></pre></div><p><strong>限制说明：</strong></p><ul><li>单个ConfigMap最大1MB（etcd限制）</li><li>考虑分拆或使用外部存储</li><li>使用ConfigMap投影（Projected Volume）</li></ul><h2 id="三、secret详解" tabindex="-1">三、Secret详解 <a class="header-anchor" href="#三、secret详解" aria-label="Permalink to &quot;三、Secret详解&quot;">​</a></h2><h3 id="_3-1-secret基础概念" tabindex="-1">3.1 Secret基础概念 <a class="header-anchor" href="#_3-1-secret基础概念" aria-label="Permalink to &quot;3.1 Secret基础概念&quot;">​</a></h3><h4 id="_3-1-1-secret类型" tabindex="-1">3.1.1 Secret类型 <a class="header-anchor" href="#_3-1-1-secret类型" aria-label="Permalink to &quot;3.1.1 Secret类型&quot;">​</a></h4><table tabindex="0"><thead><tr><th>类型</th><th>用途</th><th>示例</th></tr></thead><tbody><tr><td>Opaque</td><td>用户定义的任意数据</td><td>用户名/密码</td></tr><tr><td>kubernetes.io/service-account-token</td><td>服务账号令牌</td><td>ServiceAccount token</td></tr><tr><td>kubernetes.io/dockerconfigjson</td><td>Docker镜像仓库认证</td><td>私有镜像拉取</td></tr><tr><td>kubernetes.io/tls</td><td>TLS证书和私钥</td><td>HTTPS证书</td></tr><tr><td>kubernetes.io/basic-auth</td><td>基本认证凭据</td><td>HTTP基本认证</td></tr><tr><td>kubernetes.io/ssh-auth</td><td>SSH密钥</td><td>Git仓库访问</td></tr></tbody></table><h4 id="_3-1-2-secret创建" tabindex="-1">3.1.2 Secret创建 <a class="header-anchor" href="#_3-1-2-secret创建" aria-label="Permalink to &quot;3.1.2 Secret创建&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. Opaque Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-credentials</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Opaque</span></span>
<span class="line"><span class="__shiki_17hn0y">stringData</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 明文数据，自动base64编码</span></span>
<span class="line"><span class="__shiki_17hn0y">  username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admin</span></span>
<span class="line"><span class="__shiki_17hn0y">  password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">S3cretP@ssw0rd!</span></span>
<span class="line"><span class="__shiki_17hn0y">  config.yaml</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    database:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      host: mysql.production.svc.cluster.local</span></span>
<span class="line"><span class="__shiki_mdbnqw">      port: 3306</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># base64编码数据</span></span>
<span class="line"><span class="__shiki_21nrsd">  # echo -n &#39;admin&#39; | base64</span></span>
<span class="line"><span class="__shiki_21nrsd">  # echo -n &#39;S3cretP@ssw0rd!&#39; | base64</span></span>
<span class="line"><span class="__shiki_17hn0y">  encoded-secret</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">YWRtaW4=</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. TLS Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/tls</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  tls.crt</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0t...</span></span>
<span class="line"><span class="__shiki_17hn0y">  tls.key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0t...</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. Docker Registry Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker-registry-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/dockerconfigjson</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  .dockerconfigjson</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eyJhdXRocyI6eyJodHRwczovL2luZGV4LmRvY2tlci5pby92MS8iOnsidXNlcm5hbWUiOiJ1c2VybmFtZSIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwiYXV0aCI6ImFXNTNjM1JsY2k1cGJtWnlZVzF6In19fQ==</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 命令行创建Secret</span></span>
<span class="line"><span class="__shiki_21nrsd"># 1. 从字面值创建</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> generic</span><span class="__shiki_mdbnqw"> db-secret</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-literal=username=admin</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-literal=password=secret</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 从文件创建</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> generic</span><span class="__shiki_mdbnqw"> ssh-key-secret</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-file=ssh-privatekey=</span><span class="__shiki_1itgoe">~</span><span class="__shiki_dzsirb">/.ssh/id_rsa</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-file=ssh-publickey=</span><span class="__shiki_1itgoe">~</span><span class="__shiki_dzsirb">/.ssh/id_rsa.pub</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 创建Docker Registry Secret</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> docker-registry</span><span class="__shiki_mdbnqw"> regcred</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-server=registry.example.com</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-username=admin</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-password=secret</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --docker-email=admin@example.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 创建TLS Secret</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> tls</span><span class="__shiki_mdbnqw"> tls-secret</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --cert=path/to/cert.pem</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --key=path/to/key.pem</span></span></code></pre></div><h3 id="_3-2-secret使用方式" tabindex="-1">3.2 Secret使用方式 <a class="header-anchor" href="#_3-2-secret使用方式" aria-label="Permalink to &quot;3.2 Secret使用方式&quot;">​</a></h3><h4 id="_3-2-1-环境变量方式" tabindex="-1">3.2.1 环境变量方式 <a class="header-anchor" href="#_3-2-1-环境变量方式" aria-label="Permalink to &quot;3.2.1 环境变量方式&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret-env-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mysql:8.0</span></span>
<span class="line"><span class="__shiki_17hn0y">    env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MYSQL_ROOT_PASSWORD</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        secretKeyRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-credentials</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"><span class="__shiki_17hn0y">          optional</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 必须存在</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 批量注入</span></span>
<span class="line"><span class="__shiki_17hn0y">    envFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">secretRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-credentials</span></span>
<span class="line"><span class="__shiki_17hn0y">        optional</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h4 id="_3-2-2-卷挂载方式" tabindex="-1">3.2.2 卷挂载方式 <a class="header-anchor" href="#_3-2-2-卷挂载方式" aria-label="Permalink to &quot;3.2.2 卷挂载方式&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret-volume-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls-certs</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/ssl/certs</span></span>
<span class="line"><span class="__shiki_17hn0y">      readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssh-keys</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/root/.ssh</span></span>
<span class="line"><span class="__shiki_17hn0y">      readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls-certs</span></span>
<span class="line"><span class="__shiki_17hn0y">    secret</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">      defaultMode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0400</span><span class="__shiki_21nrsd">  # 设置文件权限</span></span>
<span class="line"><span class="__shiki_17hn0y">      items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls.crt</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">server.crt</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls.key</span></span>
<span class="line"><span class="__shiki_17hn0y">        path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">server.key</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssh-keys</span></span>
<span class="line"><span class="__shiki_17hn0y">    secret</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssh-key-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">      optional</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span></code></pre></div><h4 id="_3-2-3-镜像拉取secret" tabindex="-1">3.2.3 镜像拉取Secret <a class="header-anchor" href="#_3-2-3-镜像拉取secret" aria-label="Permalink to &quot;3.2.3 镜像拉取Secret&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">private-image-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">private-app</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">registry.example.com/private/app:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    imagePullPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Always</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # Pod级别指定镜像拉取Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">  imagePullSecrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">regcred</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_21nrsd"># 或在ServiceAccount中指定</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">imagePullSecrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">regcred</span></span></code></pre></div><h3 id="_3-3-secret高级特性" tabindex="-1">3.3 Secret高级特性 <a class="header-anchor" href="#_3-3-secret高级特性" aria-label="Permalink to &quot;3.3 Secret高级特性&quot;">​</a></h3><h4 id="_3-3-1-不可变secret" tabindex="-1">3.3.1 不可变Secret <a class="header-anchor" href="#_3-3-1-不可变secret" aria-label="Permalink to &quot;3.3.1 不可变Secret&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">immutable-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">immutable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Opaque</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  api-key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">QVBJX0tFWV9IRVJF</span></span></code></pre></div><h4 id="_3-3-2-secret加密存储" tabindex="-1">3.3.2 Secret加密存储 <a class="header-anchor" href="#_3-3-2-secret加密存储" aria-label="Permalink to &quot;3.3.2 Secret加密存储&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 启用KMS加密</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apiserver.config.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">EncryptionConfiguration</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">secrets</span></span>
<span class="line"><span class="__shiki_17hn0y">    providers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">kms</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-kms</span></span>
<span class="line"><span class="__shiki_17hn0y">        endpoint</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">unix:///var/run/kmsplugin/socket.sock</span></span>
<span class="line"><span class="__shiki_17hn0y">        cachesize</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_17hn0y">        timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">3s</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">identity</span><span class="__shiki_140thh">: {}  </span><span class="__shiki_21nrsd"># 回退方案</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用External Secrets Operator</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-secrets.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ExternalSecret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  refreshInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1h</span></span>
<span class="line"><span class="__shiki_17hn0y">  secretStoreRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">vault-backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SecretStore</span></span>
<span class="line"><span class="__shiki_17hn0y">  target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">    creationPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Owner</span></span>
<span class="line"><span class="__shiki_17hn0y">  data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">secretKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">username</span></span>
<span class="line"><span class="__shiki_17hn0y">    remoteRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database/creds</span></span>
<span class="line"><span class="__shiki_17hn0y">      property</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">username</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">secretKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"><span class="__shiki_17hn0y">    remoteRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database/creds</span></span>
<span class="line"><span class="__shiki_17hn0y">      property</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span></code></pre></div><h4 id="_3-3-3-secret安全最佳实践" tabindex="-1">3.3.3 Secret安全最佳实践 <a class="header-anchor" href="#_3-3-3-secret安全最佳实践" aria-label="Permalink to &quot;3.3.3 Secret安全最佳实践&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 最小权限原则</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> role</span><span class="__shiki_mdbnqw"> secret-reader</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --verb=get,list,watch</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --resource=secrets</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 定期轮换</span></span>
<span class="line"><span class="__shiki_21nrsd"># 使用工具自动轮换Secret</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 自动轮换数据库密码</span></span>
<span class="line"><span class="__shiki_140thh">NEW_PASSWORD</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">openssl</span><span class="__shiki_mdbnqw"> rand</span><span class="__shiki_dzsirb"> -base64</span><span class="__shiki_dzsirb"> 32</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> create</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_mdbnqw"> generic</span><span class="__shiki_mdbnqw"> db-password-new</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --from-literal=password=</span><span class="__shiki_140thh">$NEW_PASSWORD</span><span class="__shiki_dzsirb"> --dry-run=client</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> -</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 审计追踪</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> involvedObject.kind=Secret</span><span class="__shiki_dzsirb"> --watch</span></span></code></pre></div><h2 id="四、高级配置管理方案" tabindex="-1">四、高级配置管理方案 <a class="header-anchor" href="#四、高级配置管理方案" aria-label="Permalink to &quot;四、高级配置管理方案&quot;">​</a></h2><h3 id="_4-1-downward-api" tabindex="-1">4.1 Downward API <a class="header-anchor" href="#_4-1-downward-api" aria-label="Permalink to &quot;4.1 Downward API&quot;">​</a></h3><h4 id="_4-1-1-环境变量方式" tabindex="-1">4.1.1 环境变量方式 <a class="header-anchor" href="#_4-1-1-环境变量方式" aria-label="Permalink to &quot;4.1.1 环境变量方式&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">downward-api-env-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    zone</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east-1a</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    build</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2024.01.15-1234&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    commit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;abc123def&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">client-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;printenv &amp;&amp; sleep 3600&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 注入Pod字段</span></span>
<span class="line"><span class="__shiki_17hn0y">    env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">POD_NAME</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.name</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">POD_NAMESPACE</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.namespace</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">POD_IP</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">status.podIP</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NODE_NAME</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">spec.nodeName</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SERVICE_ACCOUNT</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">spec.serviceAccountName</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 注入资源字段</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MY_CPU_REQUEST</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        resourceFieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">client-container</span></span>
<span class="line"><span class="__shiki_17hn0y">          resource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">requests.cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">          divisor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1m&quot;</span><span class="__shiki_21nrsd">  # 可选的除数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">MY_MEMORY_LIMIT</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        resourceFieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">client-container</span></span>
<span class="line"><span class="__shiki_17hn0y">          resource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">limits.memory</span></span>
<span class="line"><span class="__shiki_17hn0y">          divisor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1Mi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 注入标签和注解</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">POD_LABELS</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.labels</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">POD_ANNOTATIONS</span></span>
<span class="line"><span class="__shiki_17hn0y">      valueFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.annotations</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  restartPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Never</span></span></code></pre></div><h4 id="_4-1-2-卷挂载方式" tabindex="-1">4.1.2 卷挂载方式 <a class="header-anchor" href="#_4-1-2-卷挂载方式" aria-label="Permalink to &quot;4.1.2 卷挂载方式&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">downward-api-volume-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    zone</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east-1a</span></span>
<span class="line"><span class="__shiki_17hn0y">    app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    build</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2024.01.15-1234&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">client-container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;cat /etc/podinfo/* &amp;&amp; sleep 3600&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">podinfo</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/podinfo</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">podinfo</span></span>
<span class="line"><span class="__shiki_17hn0y">    downwardAPI</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;podname&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.name</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;labels&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.labels</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;annotations&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.annotations</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;cpu_limit&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        resourceFieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">client-container</span></span>
<span class="line"><span class="__shiki_17hn0y">          resource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">limits.cpu</span></span>
<span class="line"><span class="__shiki_17hn0y">          divisor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1m</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;memory_request&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        resourceFieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          containerName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">client-container</span></span>
<span class="line"><span class="__shiki_17hn0y">          resource</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">requests.memory</span></span>
<span class="line"><span class="__shiki_17hn0y">          divisor</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1Mi</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      defaultMode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">420</span><span class="__shiki_21nrsd">  # 0644八进制</span></span></code></pre></div><h3 id="_4-2-projected-volumes" tabindex="-1">4.2 Projected Volumes <a class="header-anchor" href="#_4-2-projected-volumes" aria-label="Permalink to &quot;4.2 Projected Volumes&quot;">​</a></h3><h4 id="_4-2-1-多配置源投影" tabindex="-1">4.2.1 多配置源投影 <a class="header-anchor" href="#_4-2-1-多配置源投影" aria-label="Permalink to &quot;4.2.1 多配置源投影&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">projected-volume-pod</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">container</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;ls -la /etc/projected-config &amp;&amp; sleep 3600&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">all-in-one</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/projected-config</span></span>
<span class="line"><span class="__shiki_17hn0y">      readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">all-in-one</span></span>
<span class="line"><span class="__shiki_17hn0y">    projected</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      sources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 1. ConfigMap投影</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">          items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app/config.yaml</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 2. Secret投影</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">secret</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">          items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">username</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db/username</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"><span class="__shiki_17hn0y">            path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db/password</span></span>
<span class="line"><span class="__shiki_17hn0y">            mode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0400</span><span class="__shiki_21nrsd">  # 只读权限</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 3. Downward API投影</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">downwardAPI</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          items</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;labels&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.labels</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;namespace&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            fieldRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              fieldPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metadata.namespace</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 4. ServiceAccount Token投影（1.20+）</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">serviceAccountToken</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          audience</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api</span></span>
<span class="line"><span class="__shiki_17hn0y">          expirationSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3600</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">token</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      defaultMode</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0644</span></span></code></pre></div><h3 id="_4-3-external-configuration" tabindex="-1">4.3 External Configuration <a class="header-anchor" href="#_4-3-external-configuration" aria-label="Permalink to &quot;4.3 External Configuration&quot;">​</a></h3><h4 id="_4-3-1-外部配置源集成" tabindex="-1">4.3.1 外部配置源集成 <a class="header-anchor" href="#_4-3-1-外部配置源集成" aria-label="Permalink to &quot;4.3.1 外部配置源集成&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 使用ConfigMap Reloader</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-reloader</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动触发重启</span></span>
<span class="line"><span class="__shiki_17hn0y">    reloader.stakater.com/auto</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">stakater/configmap-reloader:v0.0.100</span></span>
<span class="line"><span class="__shiki_17hn0y">        args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--volume-dir=/etc/config</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--webhook-url=http://localhost:9090/-/reload</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 使用External Secrets Operator</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-secrets.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterSecretStore</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-secret-store</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  provider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    aws</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      service</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">SecretsManager</span></span>
<span class="line"><span class="__shiki_17hn0y">      region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east-1</span></span>
<span class="line"><span class="__shiki_17hn0y">      auth</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        secretRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          accessKeyIDSecretRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-credentials</span></span>
<span class="line"><span class="__shiki_17hn0y">            key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">access-key</span></span>
<span class="line"><span class="__shiki_17hn0y">          secretAccessKeySecretRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-credentials</span></span>
<span class="line"><span class="__shiki_17hn0y">            key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secret-key</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 使用Vault Agent注入器</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">webapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    vault.hashicorp.com/agent-inject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    vault.hashicorp.com/role</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;webapp&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    vault.hashicorp.com/agent-inject-secret-db-creds</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;database/creds/webapp&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    vault.hashicorp.com/agent-inject-template-db-creds</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      {{- with secret &quot;database/creds/webapp&quot; -}}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;username&quot;: &quot;{{ .Data.username }}&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;password&quot;: &quot;{{ .Data.password }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      {{- end }}</span></span></code></pre></div><h2 id="五、配置管理最佳实践" tabindex="-1">五、配置管理最佳实践 <a class="header-anchor" href="#五、配置管理最佳实践" aria-label="Permalink to &quot;五、配置管理最佳实践&quot;">​</a></h2><h3 id="_5-1-配置分类与组织" tabindex="-1">5.1 配置分类与组织 <a class="header-anchor" href="#_5-1-配置分类与组织" aria-label="Permalink to &quot;5.1 配置分类与组织&quot;">​</a></h3><h4 id="_5-1-1-按环境分类" tabindex="-1">5.1.1 按环境分类 <a class="header-anchor" href="#_5-1-1-按环境分类" aria-label="Permalink to &quot;5.1.1 按环境分类&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 目录结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">config/</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> base/</span><span class="__shiki_21nrsd">                    # 基础配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> configmap.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">├──</span><span class="__shiki_mdbnqw"> overlays/</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> development/</span><span class="__shiki_21nrsd">        # 开发环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> patch.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> staging/</span><span class="__shiki_21nrsd">           # 测试环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   │</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> patch.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">   └──</span><span class="__shiki_mdbnqw"> production/</span><span class="__shiki_21nrsd">        # 生产环境</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">       ├──</span><span class="__shiki_mdbnqw"> kustomization.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">│</span><span class="__shiki_mdbnqw">       └──</span><span class="__shiki_mdbnqw"> patch.yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">└──</span><span class="__shiki_mdbnqw"> secrets/</span><span class="__shiki_21nrsd">               # 敏感配置</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ├──</span><span class="__shiki_mdbnqw"> development/</span></span>
<span class="line"><span class="__shiki_1t8gfj">    └──</span><span class="__shiki_mdbnqw"> production/</span></span></code></pre></div><h4 id="_5-1-2-按功能分类" tabindex="-1">5.1.2 按功能分类 <a class="header-anchor" href="#_5-1-2-按功能分类" aria-label="Permalink to &quot;5.1.2 按功能分类&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置组织策略</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-general</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  app.name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;MyApp&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  app.version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-database</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  db.host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;mysql-primary&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  db.port</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3306&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-cache</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cache.type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;redis&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  cache.ttl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;3600&quot;</span></span></code></pre></div><h3 id="_5-2-配置验证与校验" tabindex="-1">5.2 配置验证与校验 <a class="header-anchor" href="#_5-2-配置验证与校验" aria-label="Permalink to &quot;5.2 配置验证与校验&quot;">​</a></h3><h4 id="_5-2-1-schema验证" tabindex="-1">5.2.1 Schema验证 <a class="header-anchor" href="#_5-2-1-schema验证" aria-label="Permalink to &quot;5.2.1 Schema验证&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用ConfigMap Schema</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-schema</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    config.kubernetes.io/validation</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      {</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;openapi&quot;: &quot;3.0.0&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;paths&quot;: {},</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;components&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">          &quot;schemas&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;AppConfig&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;type&quot;: &quot;object&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;required&quot;: [&quot;appName&quot;, &quot;logLevel&quot;],</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;properties&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;appName&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  &quot;type&quot;: &quot;string&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  &quot;minLength&quot;: 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">                },</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;logLevel&quot;: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  &quot;type&quot;: &quot;string&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  &quot;enum&quot;: [&quot;DEBUG&quot;, &quot;INFO&quot;, &quot;WARN&quot;, &quot;ERROR&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">                }</span></span>
<span class="line"><span class="__shiki_mdbnqw">              }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }</span></span>
<span class="line"><span class="__shiki_mdbnqw">      }</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  config.json</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;appName&quot;: &quot;MyApp&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &quot;logLevel&quot;: &quot;INFO&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }</span></span></code></pre></div><h4 id="_5-2-2-配置校验工具" tabindex="-1">5.2.2 配置校验工具 <a class="header-anchor" href="#_5-2-2-配置校验工具" aria-label="Permalink to &quot;5.2.2 配置校验工具&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 配置校验脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">validate_config</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  local</span><span class="__shiki_140thh"> config_file</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 1. YAML语法校验</span></span>
<span class="line"><span class="__shiki_1t8gfj">  yamllint</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$config_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 2. Kubernetes资源校验</span></span>
<span class="line"><span class="__shiki_1t8gfj">  kubectl</span><span class="__shiki_mdbnqw"> apply</span><span class="__shiki_dzsirb"> --dry-run=server</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$config_file</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 3. 自定义校验</span></span>
<span class="line"><span class="__shiki_1t8gfj">  python3</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">import yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">with open(&#39;</span><span class="__shiki_140thh">$config_file</span><span class="__shiki_mdbnqw">&#39;) as f:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    config = yaml.safe_load(f)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 业务逻辑校验</span></span>
<span class="line"><span class="__shiki_mdbnqw">    if config[&#39;kind&#39;] == &#39;ConfigMap&#39;:</span></span>
<span class="line"><span class="__shiki_mdbnqw">        required_keys = [&#39;APP_NAME&#39;, &#39;ENVIRONMENT&#39;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">        for key in required_keys:</span></span>
<span class="line"><span class="__shiki_mdbnqw">            if key not in config[&#39;data&#39;]:</span></span>
<span class="line"><span class="__shiki_mdbnqw">                raise ValueError(f&#39;Missing required key: {key}&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">  &quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用kubeval</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubeval</span><span class="__shiki_dzsirb"> --strict</span><span class="__shiki_mdbnqw"> config.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用config-lint</span></span>
<span class="line"><span class="__shiki_1t8gfj">config-lint</span><span class="__shiki_dzsirb"> -rules</span><span class="__shiki_mdbnqw"> config_rules.yaml</span><span class="__shiki_mdbnqw"> config.yaml</span></span></code></pre></div><h3 id="_5-3-配置安全策略" tabindex="-1">5.3 配置安全策略 <a class="header-anchor" href="#_5-3-配置安全策略" aria-label="Permalink to &quot;5.3 配置安全策略&quot;">​</a></h3><h4 id="_5-3-1-rbac配置" tabindex="-1">5.3.1 RBAC配置 <a class="header-anchor" href="#_5-3-1-rbac配置" aria-label="Permalink to &quot;5.3.1 RBAC配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 限制ConfigMap访问</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Role</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-reader</span></span>
<span class="line"><span class="__shiki_17hn0y">rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">apiGroups</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resources</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;configmaps&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  resourceNames</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;app-config&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;db-config&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  verbs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;get&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;list&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;watch&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RoleBinding</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">read-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">subjects</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-service-account</span></span>
<span class="line"><span class="__shiki_17hn0y">roleRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Role</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-reader</span></span>
<span class="line"><span class="__shiki_17hn0y">  apiGroup</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">rbac.authorization.k8s.io</span></span></code></pre></div><h4 id="_5-3-2-网络策略" tabindex="-1">5.3.2 网络策略 <a class="header-anchor" href="#_5-3-2-网络策略" aria-label="Permalink to &quot;5.3.2 网络策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">networking.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">NetworkPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">restrict-config-access</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-server</span></span>
<span class="line"><span class="__shiki_17hn0y">  policyTypes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">Ingress</span></span>
<span class="line"><span class="__shiki_17hn0y">  ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">from</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">podSelector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          role</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-consumer</span></span>
<span class="line"><span class="__shiki_17hn0y">    ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">protocol</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">TCP</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8080</span></span></code></pre></div><h3 id="_5-4-配置更新策略" tabindex="-1">5.4 配置更新策略 <a class="header-anchor" href="#_5-4-配置更新策略" aria-label="Permalink to &quot;5.4 配置更新策略&quot;">​</a></h3><h4 id="_5-4-1-滚动更新策略" tabindex="-1">5.4.1 滚动更新策略 <a class="header-anchor" href="#_5-4-1-滚动更新策略" aria-label="Permalink to &quot;5.4.1 滚动更新策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-sensitive-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 配置变更摘要</span></span>
<span class="line"><span class="__shiki_17hn0y">    config/checksum</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;sha256:abc123...&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">  strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">RollingUpdate</span></span>
<span class="line"><span class="__shiki_17hn0y">    rollingUpdate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxSurge</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">      maxUnavailable</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 自动计算配置摘要</span></span>
<span class="line"><span class="__shiki_17hn0y">        checksum/config</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ include &quot;configmap.hash&quot; . }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        checksum/secret</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ include &quot;secret.hash&quot; . }}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        envFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">configMapRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/config</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">    configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span></code></pre></div><h4 id="_5-4-2-蓝绿部署策略" tabindex="-1">5.4.2 蓝绿部署策略 <a class="header-anchor" href="#_5-4-2-蓝绿部署策略" aria-label="Permalink to &quot;5.4.2 蓝绿部署策略&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  feature.new-ui</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;false&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  feature.new-ui</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-v1</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:v1</span></span>
<span class="line"><span class="__shiki_17hn0y">        envFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">configMapRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-v1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-v2</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;2.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:v2</span></span>
<span class="line"><span class="__shiki_17hn0y">        envFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">configMapRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config-v2</span></span></code></pre></div><h2 id="六、配置管理工具与生态" tabindex="-1">六、配置管理工具与生态 <a class="header-anchor" href="#六、配置管理工具与生态" aria-label="Permalink to &quot;六、配置管理工具与生态&quot;">​</a></h2><h3 id="_6-1-kustomize配置管理" tabindex="-1">6.1 Kustomize配置管理 <a class="header-anchor" href="#_6-1-kustomize配置管理" aria-label="Permalink to &quot;6.1 Kustomize配置管理&quot;">​</a></h3><h4 id="_6-1-1-基础使用" tabindex="-1">6.1.1 基础使用 <a class="header-anchor" href="#_6-1-1-基础使用" aria-label="Permalink to &quot;6.1.1 基础使用&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># kustomization.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Kustomization</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 基础配置</span></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">deployment.yaml</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">service.yaml</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">configmap.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置生成</span></span>
<span class="line"><span class="__shiki_17hn0y">configMapGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  files</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">configs/app.properties</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">configs/log4j.properties</span></span>
<span class="line"><span class="__shiki_17hn0y">  envs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">.env</span></span>
<span class="line"><span class="__shiki_17hn0y">  literals</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">APP_NAME=MyApp</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">ENVIRONMENT=production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Secret生成</span></span>
<span class="line"><span class="__shiki_17hn0y">secretGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">  files</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">secrets/db-password.txt</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kubernetes.io/tls</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 镜像替换</span></span>
<span class="line"><span class="__shiki_17hn0y">images</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  newName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">registry.example.com/myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  newTag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1.2.3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 命名空间设置</span></span>
<span class="line"><span class="__shiki_17hn0y">namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 标签和注解</span></span>
<span class="line"><span class="__shiki_17hn0y">commonLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  app</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">commonAnnotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  managed-by</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize</span></span></code></pre></div><h4 id="_6-1-2-多环境管理" tabindex="-1">6.1.2 多环境管理 <a class="header-anchor" href="#_6-1-2-多环境管理" aria-label="Permalink to &quot;6.1.2 多环境管理&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># base/kustomization.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Kustomization</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">../deployment.yaml</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">../service.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">configMapGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  files</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">configs/base.properties</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># overlays/development/kustomization.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Kustomization</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">bases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">../../base</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">development</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">patchesStrategicMerge</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">deployment-patch.yaml</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">config-patch.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">configMapGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">merge</span></span>
<span class="line"><span class="__shiki_17hn0y">  literals</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">ENVIRONMENT=development</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">LOG_LEVEL=DEBUG</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># overlays/production/kustomization.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kustomize.config.k8s.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Kustomization</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">bases</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">../../base</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">patchesStrategicMerge</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">deployment-patch.yaml</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_mdbnqw">config-patch.yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">configMapGenerator</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_17hn0y">  behavior</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">merge</span></span>
<span class="line"><span class="__shiki_17hn0y">  literals</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">ENVIRONMENT=production</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">LOG_LEVEL=INFO</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">CACHE_SIZE=2048</span></span></code></pre></div><h3 id="_6-2-helm配置管理" tabindex="-1">6.2 Helm配置管理 <a class="header-anchor" href="#_6-2-helm配置管理" aria-label="Permalink to &quot;6.2 Helm配置管理&quot;">​</a></h3><h4 id="_6-2-1-chart配置结构" tabindex="-1">6.2.1 Chart配置结构 <a class="header-anchor" href="#_6-2-1-chart配置结构" aria-label="Permalink to &quot;6.2.1 Chart配置结构&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># Chart.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v2</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">A Helm chart for MyApp</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">application</span></span>
<span class="line"><span class="__shiki_17hn0y">version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1.0.0</span></span>
<span class="line"><span class="__shiki_17hn0y">appVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># values.yaml</span></span>
<span class="line"><span class="__shiki_21nrsd"># 默认配置</span></span>
<span class="line"><span class="__shiki_17hn0y">replicaCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  repository</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">nginx</span></span>
<span class="line"><span class="__shiki_17hn0y">  pullPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">IfNotPresent</span></span>
<span class="line"><span class="__shiki_17hn0y">  tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;stable&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterIP</span></span>
<span class="line"><span class="__shiki_17hn0y">  port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">ingress</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  enabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">  className</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">: {}</span></span>
<span class="line"><span class="__shiki_17hn0y">  hosts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">chart-example.local</span></span>
<span class="line"><span class="__shiki_17hn0y">      paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/</span></span>
<span class="line"><span class="__shiki_17hn0y">          pathType</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ImplementationSpecific</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100m</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128Mi</span></span>
<span class="line"><span class="__shiki_17hn0y">  requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">100m</span></span>
<span class="line"><span class="__shiki_17hn0y">    memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">128Mi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 应用配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  appName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;MyApp&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;development&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  logLevel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;INFO&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 数据库配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3306</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;appdb&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # Redis配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  redis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    host</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;localhost&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">6379</span></span>
<span class="line"><span class="__shiki_17hn0y">    password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 加密的Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">  dbPassword</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  apiKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span></code></pre></div><h4 id="_6-2-2-模板配置" tabindex="-1">6.2.2 模板配置 <a class="header-anchor" href="#_6-2-2-模板配置" aria-label="Permalink to &quot;6.2.2 模板配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># templates/configmap.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">include &quot;myapp.fullname&quot; .</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    {{- </span><span class="__shiki_mdbnqw">include &quot;myapp.labels&quot; . | nindent 4</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  app.properties</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 应用配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">    app.name={{ .Values.config.appName }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    app.environment={{ .Values.config.environment }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    app.logLevel={{ .Values.config.logLevel }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # 数据库配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {{- if .Values.config.database }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    db.host={{ .Values.config.database.host }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    db.port={{ .Values.config.database.port }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    db.name={{ .Values.config.database.name }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {{- end }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    # Redis配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {{- if .Values.config.redis }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    redis.host={{ .Values.config.redis.host }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    redis.port={{ .Values.config.redis.port }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {{- if .Values.config.redis.password }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    redis.password=\${REDIS_PASSWORD}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {{- end }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    {{- end }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># templates/secret.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">include &quot;myapp.fullname&quot; .</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Opaque</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  {{- </span><span class="__shiki_mdbnqw">if .Values.secrets.dbPassword</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  db-password</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.secrets.dbPassword | b64enc</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">  {{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  {{- </span><span class="__shiki_mdbnqw">if .Values.secrets.apiKey</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  api-key</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Values.secrets.apiKey | b64enc</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">  {{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># templates/_helpers.tpl</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">define &quot;myapp.fullname&quot; -</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">if .Values.fullnameOverride</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">.Values.fullnameOverride | trunc 63 | trimSuffix &quot;-&quot;</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">else</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">$name := default .Chart.Name .Values.nameOverride</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">if contains $name .Release.Name</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">.Release.Name | trunc 63 | trimSuffix &quot;-&quot;</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">else</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">printf &quot;%s-%s&quot; .Release.Name $name | trunc 63 | trimSuffix &quot;-&quot;</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">define &quot;myapp.labels&quot; -</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">helm.sh/chart</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">include &quot;myapp.chart&quot; .</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{ </span><span class="__shiki_mdbnqw">include &quot;myapp.selectorLabels&quot; .</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">if .Chart.AppVersion</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">app.kubernetes.io/version</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Chart.AppVersion | quote</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_17hn0y">app.kubernetes.io/managed-by</span><span class="__shiki_140thh">: {{ </span><span class="__shiki_mdbnqw">.Release.Service</span><span class="__shiki_140thh"> }}</span></span>
<span class="line"><span class="__shiki_140thh">{{- </span><span class="__shiki_mdbnqw">end</span><span class="__shiki_140thh"> }}</span></span></code></pre></div><h3 id="_6-3-外部配置管理工具" tabindex="-1">6.3 外部配置管理工具 <a class="header-anchor" href="#_6-3-外部配置管理工具" aria-label="Permalink to &quot;6.3 外部配置管理工具&quot;">​</a></h3><h4 id="_6-3-1-external-secrets-operator" tabindex="-1">6.3.1 External Secrets Operator <a class="header-anchor" href="#_6-3-1-external-secrets-operator" aria-label="Permalink to &quot;6.3.1 External Secrets Operator&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 部署External Secrets Operator</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-secrets.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterSecretStore</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">vault-backend</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  provider</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    vault</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      server</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://vault.example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;secret&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;v2&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      auth</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        tokenSecretRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;vault-token&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;token&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-secrets.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ExternalSecret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database-secret</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  refreshInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1h&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  secretStoreRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">vault-backend</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterSecretStore</span></span>
<span class="line"><span class="__shiki_17hn0y">  target</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database-credentials</span></span>
<span class="line"><span class="__shiki_17hn0y">    creationPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Owner</span></span>
<span class="line"><span class="__shiki_17hn0y">  data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">secretKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">username</span></span>
<span class="line"><span class="__shiki_17hn0y">    remoteRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database/creds/myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">      property</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">username</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">secretKey</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"><span class="__shiki_17hn0y">    remoteRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">database/creds/myapp</span></span>
<span class="line"><span class="__shiki_17hn0y">      property</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">external-secrets.io/v1beta1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ExternalSecret</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">api-keys</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  refreshInterval</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;24h&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  secretStoreRef</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-secrets-manager</span></span>
<span class="line"><span class="__shiki_17hn0y">    kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterSecretStore</span></span>
<span class="line"><span class="__shiki_17hn0y">  dataFrom</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">extract</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production/api-keys</span></span></code></pre></div><h4 id="_6-3-2-configmap-reloader" tabindex="-1">6.3.2 ConfigMap Reloader <a class="header-anchor" href="#_6-3-2-configmap-reloader" aria-label="Permalink to &quot;6.3.2 ConfigMap Reloader&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-sensitive-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  annotations</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 自动重载配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    configmap.reloader.stakater.com/reload</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;app-config,redis-config&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    secret.reloader.stakater.com/reload</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;db-secret&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        lifecycle</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          postStart</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            exec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              command</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_mdbnqw">/bin/sh</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_mdbnqw">-c</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 监控配置变化</span></span>
<span class="line"><span class="__shiki_mdbnqw">                inotifywait -m -r -e modify,create,delete \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  /etc/config/ \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  /etc/secrets/ |</span></span>
<span class="line"><span class="__shiki_mdbnqw">                while read; do</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  echo &quot;Configuration changed, reloading...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                  kill -HUP 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">                done</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/config</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">secrets</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/etc/secrets</span></span></code></pre></div><h2 id="七、监控与可观测性" tabindex="-1">七、监控与可观测性 <a class="header-anchor" href="#七、监控与可观测性" aria-label="Permalink to &quot;七、监控与可观测性&quot;">​</a></h2><h3 id="_7-1-配置变更监控" tabindex="-1">7.1 配置变更监控 <a class="header-anchor" href="#_7-1-配置变更监控" aria-label="Permalink to &quot;7.1 配置变更监控&quot;">​</a></h3><h4 id="_7-1-1-事件监控" tabindex="-1">7.1.1 事件监控 <a class="header-anchor" href="#_7-1-1-事件监控" aria-label="Permalink to &quot;7.1.1 事件监控&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 配置变更事件收集</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ConfigMap</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-audit-policy</span></span>
<span class="line"><span class="__shiki_17hn0y">data</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  audit-policy.yaml</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    apiVersion: audit.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">    kind: Policy</span></span>
<span class="line"><span class="__shiki_mdbnqw">    rules:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - level: Metadata</span></span>
<span class="line"><span class="__shiki_mdbnqw">      resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - group: &quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources: [&quot;configmaps&quot;, &quot;secrets&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      verbs: [&quot;create&quot;, &quot;update&quot;, &quot;delete&quot;, &quot;patch&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">    - level: RequestResponse</span></span>
<span class="line"><span class="__shiki_mdbnqw">      resources:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - group: &quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        resources: [&quot;secrets&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">      verbs: [&quot;create&quot;, &quot;update&quot;, &quot;patch&quot;]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-audit-collector</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fluent-bit</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fluent/fluent-bit:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">audit-log</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/var/log/kubernetes/audit</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/fluent-bit/etc/</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">audit-log</span></span>
<span class="line"><span class="__shiki_17hn0y">        hostPath</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/var/log/kubernetes/audit</span></span>
<span class="line"><span class="__shiki_17hn0y">          type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">DirectoryOrCreate</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">fluent-bit-config</span></span></code></pre></div><h4 id="_7-1-2-配置漂移检测" tabindex="-1">7.1.2 配置漂移检测 <a class="header-anchor" href="#_7-1-2-配置漂移检测" aria-label="Permalink to &quot;7.1.2 配置漂移检测&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-drift-detector</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">detector</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ghcr.io/kyverno/kyverno:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">--config=config-drift-policy.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">policies</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/policies</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">policies</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-drift-policies</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">kyverno.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ClusterPolicy</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">detect-config-drift</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  validationFailureAction</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">audit</span></span>
<span class="line"><span class="__shiki_17hn0y">  background</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">check-configmap-drift</span></span>
<span class="line"><span class="__shiki_17hn0y">    match</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        kinds</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">    preconditions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      all</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ request.object.spec.volumes[?contains(@.configMap.name, &#39;prod-&#39;)] | length(@) }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GreaterThan</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_17hn0y">    validate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ConfigMap {{ request.object.spec.volumes[0].configMap.name }} has drifted from golden config&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      foreach</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">list</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;request.object.spec.volumes&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        context</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">goldenConfig</span></span>
<span class="line"><span class="__shiki_17hn0y">          configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;golden-{{ element.configMap.name }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;golden-configs&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        preconditions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          all</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ element.configMap.name }}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            operator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Equals</span></span>
<span class="line"><span class="__shiki_17hn0y">            value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*prod*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">        validate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ConfigMap {{ element.name }} does not match golden configuration&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          pattern</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">              - </span><span class="__shiki_17hn0y">=(volumeMounts)</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                - </span><span class="__shiki_17hn0y">=(mountPath)</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/etc/config&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">                  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{ element.name }}&quot;</span></span></code></pre></div><h3 id="_7-2-配置健康检查" tabindex="-1">7.2 配置健康检查 <a class="header-anchor" href="#_7-2-配置健康检查" aria-label="Permalink to &quot;7.2 配置健康检查&quot;">​</a></h3><h4 id="_7-2-1-配置验证webhook" tabindex="-1">7.2.1 配置验证Webhook <a class="header-anchor" href="#_7-2-1-配置验证webhook" aria-label="Permalink to &quot;7.2.1 配置验证Webhook&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">admissionregistration.k8s.io/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ValidatingWebhookConfiguration</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-validator</span></span>
<span class="line"><span class="__shiki_17hn0y">webhooks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">- </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-validator.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  clientConfig</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    service</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-validator</span></span>
<span class="line"><span class="__shiki_17hn0y">      namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">default</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;/validate-config&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">      port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">443</span></span>
<span class="line"><span class="__shiki_17hn0y">    caBundle</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Ci0tLS0tQk...&lt;ca-bundle&gt;...tLS0K&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">apiGroups</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    apiVersions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;v1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    operations</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;CREATE&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;UPDATE&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    resources</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;configmaps&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;secrets&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    scope</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;*&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  failurePolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Fail</span></span>
<span class="line"><span class="__shiki_17hn0y">  sideEffects</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">None</span></span>
<span class="line"><span class="__shiki_17hn0y">  admissionReviewVersions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;v1&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  timeoutSeconds</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">---</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-validator</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validator</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-validator:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8443</span></span>
<span class="line"><span class="__shiki_17hn0y">        volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/tls</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validation-rules</span></span>
<span class="line"><span class="__shiki_17hn0y">          mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/rules</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tls</span></span>
<span class="line"><span class="__shiki_17hn0y">        secret</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          secretName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">webhook-tls</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validation-rules</span></span>
<span class="line"><span class="__shiki_17hn0y">        configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validation-rules</span></span></code></pre></div><h2 id="八、故障排查与调试" tabindex="-1">八、故障排查与调试 <a class="header-anchor" href="#八、故障排查与调试" aria-label="Permalink to &quot;八、故障排查与调试&quot;">​</a></h2><h3 id="_8-1-常见问题排查" tabindex="-1">8.1 常见问题排查 <a class="header-anchor" href="#_8-1-常见问题排查" aria-label="Permalink to &quot;8.1 常见问题排查&quot;">​</a></h3><h4 id="_8-1-1-配置问题诊断" tabindex="-1">8.1.1 配置问题诊断 <a class="header-anchor" href="#_8-1-1-配置问题诊断" aria-label="Permalink to &quot;8.1.1 配置问题诊断&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 检查ConfigMap/Secret</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 验证配置内容</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> secret</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> yaml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 检查Pod配置挂载</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_dzsirb"> -B</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_mdbnqw"> &quot;Mounts&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 查看环境变量</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> env</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">confi</span><span class="__shiki_140thh">g</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 检查配置文件内容</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> exec</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">pod-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> --</span><span class="__shiki_mdbnqw"> cat</span><span class="__shiki_mdbnqw"> /etc/config/</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">fil</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 检查配置变更历史</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> rollout</span><span class="__shiki_mdbnqw"> history</span><span class="__shiki_mdbnqw"> deployment/</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">deployment-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> involvedObject.kind=ConfigMap,involvedObject.name=</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_mdbnqw">configmap-nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span></code></pre></div><h4 id="_8-1-2-权限问题排查" tabindex="-1">8.1.2 权限问题排查 <a class="header-anchor" href="#_8-1-2-权限问题排查" aria-label="Permalink to &quot;8.1.2 权限问题排查&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 检查RBAC权限</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> auth</span><span class="__shiki_mdbnqw"> can-i</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> configmap</span><span class="__shiki_dzsirb"> --as=system:serviceaccount:</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb">namespace</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb">:</span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb">serviceaccount</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 检查ServiceAccount</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> describe</span><span class="__shiki_mdbnqw"> serviceaccount</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_mdbnqw">nam</span><span class="__shiki_140thh">e</span><span class="__shiki_1itgoe">&gt;</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> secrets</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> type=kubernetes.io/service-account-token</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 查看审计日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">kubectl</span><span class="__shiki_mdbnqw"> get</span><span class="__shiki_mdbnqw"> events</span><span class="__shiki_dzsirb"> --field-selector</span><span class="__shiki_mdbnqw"> reason=FailedMount,source=controller-manager</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 检查节点kubelet日志</span></span>
<span class="line"><span class="__shiki_1t8gfj">journalctl</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_mdbnqw"> kubelet</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> configmap</span></span></code></pre></div><h3 id="_8-2-调试工具与技巧" tabindex="-1">8.2 调试工具与技巧 <a class="header-anchor" href="#_8-2-调试工具与技巧" aria-label="Permalink to &quot;8.2 调试工具与技巧&quot;">​</a></h3><h4 id="_8-2-1-调试pod配置" tabindex="-1">8.2.1 调试Pod配置 <a class="header-anchor" href="#_8-2-1-调试pod配置" aria-label="Permalink to &quot;8.2.1 调试Pod配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 调试专用Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Pod</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-debugger</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">debugger</span></span>
<span class="line"><span class="__shiki_17hn0y">    image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">busybox</span></span>
<span class="line"><span class="__shiki_17hn0y">    command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;sh&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;sleep 3600&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    volumeMounts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">      mountPath</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/config</span></span>
<span class="line"><span class="__shiki_17hn0y">      readOnly</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">config-volume</span></span>
<span class="line"><span class="__shiki_17hn0y">    projected</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      sources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">configMap</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-config</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">secret</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">app-secret</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 共享目标Pod的ServiceAccount</span></span>
<span class="line"><span class="__shiki_17hn0y">  serviceAccountName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">target-service-account</span></span>
<span class="line"><span class="__shiki_17hn0y">  automountServiceAccountToken</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h4 id="_8-2-2-配置注入验证" tabindex="-1">8.2.2 配置注入验证 <a class="header-anchor" href="#_8-2-2-配置注入验证" aria-label="Permalink to &quot;8.2.2 配置注入验证&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># 配置验证脚本</span></span>
<span class="line"><span class="__shiki_1t8gfj">validate_config_injection</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    POD_NAME</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_140thh">    NAMESPACE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">\${2</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_140thh">default</span><span class="__shiki_1jdh33">}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;=== 验证Pod配置注入 ===&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Pod: </span><span class="__shiki_140thh">$POD_NAME</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Namespace: </span><span class="__shiki_140thh">$NAMESPACE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 检查Pod状态</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n1. Pod状态:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">get</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> wide</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 检查配置挂载</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n2. 挂载的卷:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">describe</span><span class="__shiki_mdbnqw"> pod</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -A</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_mdbnqw"> &quot;Mounts&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 检查环境变量</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n3. 环境变量:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">exec</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_dzsirb">--</span><span class="__shiki_mdbnqw"> printenv</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;(DB_|APP_|CONFIG_)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 检查配置文件</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n4. 配置文件:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">exec</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_dzsirb">--</span><span class="__shiki_mdbnqw"> find</span><span class="__shiki_mdbnqw"> /etc/config</span><span class="__shiki_dzsirb"> -type</span><span class="__shiki_mdbnqw"> f</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_mdbnqw"> &quot;未找到配置目录&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 5. 检查配置内容</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n5. 配置内容示例:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">exec</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_dzsirb">--</span><span class="__shiki_mdbnqw"> sh</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &#39;for f in $(find /etc/config -type f 2&gt;/dev/null | head -5); do echo &quot;=== $f ===&quot;; cat $f; echo; done&#39;</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 6. 检查Secret挂载</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n6. Secret文件权限:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    kubectl</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh"> $NAMESPACE </span><span class="__shiki_mdbnqw">exec</span><span class="__shiki_140thh"> $POD_NAME </span><span class="__shiki_dzsirb">--</span><span class="__shiki_mdbnqw"> sh</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &#39;find /etc/secrets -type f -exec ls -la {} \\; 2&gt;/dev/null | head -5&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用示例</span></span>
<span class="line"><span class="__shiki_1t8gfj">validate_config_injection</span><span class="__shiki_mdbnqw"> &quot;myapp-pod&quot;</span><span class="__shiki_mdbnqw"> &quot;production&quot;</span></span></code></pre></div><h2 id="九、总结与最佳实践" tabindex="-1">九、总结与最佳实践 <a class="header-anchor" href="#九、总结与最佳实践" aria-label="Permalink to &quot;九、总结与最佳实践&quot;">​</a></h2><h3 id="_9-1-配置管理黄金法则" tabindex="-1">9.1 配置管理黄金法则 <a class="header-anchor" href="#_9-1-配置管理黄金法则" aria-label="Permalink to &quot;9.1 配置管理黄金法则&quot;">​</a></h3><ol><li><p><strong>分离原则</strong></p><ul><li>配置与代码分离</li><li>敏感与非敏感配置分离</li><li>环境配置分离</li></ul></li><li><p><strong>安全原则</strong></p><ul><li>最小权限访问</li><li>加密存储敏感数据</li><li>定期轮换密钥</li></ul></li><li><p><strong>可观测性原则</strong></p><ul><li>配置变更追踪</li><li>配置漂移检测</li><li>配置健康监控</li></ul></li><li><p><strong>可靠性原则</strong></p><ul><li>配置验证与校验</li><li>回滚机制</li><li>备份与恢复</li></ul></li></ol><h3 id="_9-2-推荐配置架构" tabindex="-1">9.2 推荐配置架构 <a class="header-anchor" href="#_9-2-推荐配置架构" aria-label="Permalink to &quot;9.2 推荐配置架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                 配置管理架构                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ 应用层配置        │ 环境配置       │ 集群配置           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ - 业务参数        │ - 环境变量     │ - 全局设置         │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ - 功能开关        │ - 服务发现     │ - 网络策略         │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ ConfigMap         │ Secret         │ External Config    │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ - 非敏感配置       │ - 敏感数据     │ - 外部配置源       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ - 配置文件        │ - 证书密钥     │ - 云服务配置       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├─────────────────────────────────────────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ Kustomize         │ Helm           │ Operator           │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ - 声明式管理       │ - 模板化       │ - 自动化管理       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ - GitOps友好      │ - 版本管理     │ - 复杂配置         │</span></span>
<span class="line"><span class="__shiki_wvjl67">└─────────────────────────────────────────────────────────┘</span></span></code></pre></div><h3 id="_9-3-未来发展趋势" tabindex="-1">9.3 未来发展趋势 <a class="header-anchor" href="#_9-3-未来发展趋势" aria-label="Permalink to &quot;9.3 未来发展趋势&quot;">​</a></h3><ol><li><strong>配置即代码（CaC）</strong></li><li><strong>智能配置管理</strong></li><li><strong>配置自愈机制</strong></li><li><strong>多集群配置同步</strong></li><li><strong>AI驱动的配置优化</strong></li></ol><p>通过全面掌握Kubernetes配置管理方案，可以构建出安全、可靠、可维护的云原生应用配置体系，为微服务架构提供坚实的配置管理基础。</p>`,133)])])}const r=a(i,[["render",l]]);export{o as __pageData,r as default};
