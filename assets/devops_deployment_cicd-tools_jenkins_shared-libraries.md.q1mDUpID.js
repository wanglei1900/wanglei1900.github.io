import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Jenkins 共享库开发完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/cicd-tools/jenkins/shared-libraries.md","filePath":"devops/deployment/cicd-tools/jenkins/shared-libraries.md"}'),_={name:"devops/deployment/cicd-tools/jenkins/shared-libraries.md"};function l(h,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="jenkins-共享库开发完整学习笔记" tabindex="-1">Jenkins 共享库开发完整学习笔记 <a class="header-anchor" href="#jenkins-共享库开发完整学习笔记" aria-label="Permalink to &quot;Jenkins 共享库开发完整学习笔记&quot;">​</a></h1><h2 id="一、ci-cd与jenkins概述" tabindex="-1">一、CI/CD与Jenkins概述 <a class="header-anchor" href="#一、ci-cd与jenkins概述" aria-label="Permalink to &quot;一、CI/CD与Jenkins概述&quot;">​</a></h2><h3 id="_1-1-ci-cd基础概念" tabindex="-1">1.1 CI/CD基础概念 <a class="header-anchor" href="#_1-1-ci-cd基础概念" aria-label="Permalink to &quot;1.1 CI/CD基础概念&quot;">​</a></h3><p><strong>持续集成 (Continuous Integration)</strong></p><ul><li>开发人员频繁地将代码集成到共享仓库</li><li>每次集成都通过自动化构建验证</li><li>快速发现集成错误</li></ul><p><strong>持续交付/部署 (Continuous Delivery/Deployment)</strong></p><ul><li>确保代码始终处于可部署状态</li><li>自动化部署到不同环境</li><li>减少发布风险和时间</li></ul><h3 id="_1-2-jenkins在ci-cd中的角色" tabindex="-1">1.2 Jenkins在CI/CD中的角色 <a class="header-anchor" href="#_1-2-jenkins在ci-cd中的角色" aria-label="Permalink to &quot;1.2 Jenkins在CI/CD中的角色&quot;">​</a></h3><ul><li>开源的自动化服务器</li><li>提供数百个插件支持</li><li>支持流水线即代码 (Pipeline as Code)</li><li>分布式构建能力</li></ul><h2 id="二、jenkins共享库介绍" tabindex="-1">二、Jenkins共享库介绍 <a class="header-anchor" href="#二、jenkins共享库介绍" aria-label="Permalink to &quot;二、Jenkins共享库介绍&quot;">​</a></h2><h3 id="_2-1-什么是共享库" tabindex="-1">2.1 什么是共享库 <a class="header-anchor" href="#_2-1-什么是共享库" aria-label="Permalink to &quot;2.1 什么是共享库&quot;">​</a></h3><p><strong>定义</strong>：可重用的代码库，包含Pipeline步骤、变量、类等，可在多个Jenkins流水线中共享使用。</p><p><strong>解决的问题</strong>：</p><ul><li>代码重复：避免在不同流水线中复制粘贴相同代码</li><li>维护困难：统一管理通用逻辑</li><li>标准化：确保团队使用一致的构建部署流程</li><li>知识共享：沉淀团队最佳实践</li></ul><h3 id="_2-2-共享库结构" tabindex="-1">2.2 共享库结构 <a class="header-anchor" href="#_2-2-共享库结构" aria-label="Permalink to &quot;2.2 共享库结构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">shared-library/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── src/                    # Groovy类库</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── org/example/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── BuildTools.groovy</span></span>
<span class="line"><span class="__shiki_wvjl67">├── vars/                  # 全局变量/函数</span></span>
<span class="line"><span class="__shiki_wvjl67">│   ├── buildApp.groovy</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── deployApp.groovy</span></span>
<span class="line"><span class="__shiki_wvjl67">├── resources/            # 非代码资源文件</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── templates/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── deployment.yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">└── README.md</span></span></code></pre></div><h2 id="三、共享库开发环境搭建" tabindex="-1">三、共享库开发环境搭建 <a class="header-anchor" href="#三、共享库开发环境搭建" aria-label="Permalink to &quot;三、共享库开发环境搭建&quot;">​</a></h2><h3 id="_3-1-创建共享库仓库" tabindex="-1">3.1 创建共享库仓库 <a class="header-anchor" href="#_3-1-创建共享库仓库" aria-label="Permalink to &quot;3.1 创建共享库仓库&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 创建目录结构</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> shared-library/{src/org/example,vars,resources/templates}</span></span>
<span class="line"><span class="__shiki_dzsirb">cd</span><span class="__shiki_mdbnqw"> shared-library</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 初始化git仓库</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> init</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> add</span><span class="__shiki_mdbnqw"> .</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> commit</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_mdbnqw"> &quot;Initial shared library structure&quot;</span></span></code></pre></div><h3 id="_3-2-jenkins全局配置" tabindex="-1">3.2 Jenkins全局配置 <a class="header-anchor" href="#_3-2-jenkins全局配置" aria-label="Permalink to &quot;3.2 Jenkins全局配置&quot;">​</a></h3><ol><li><strong>系统管理</strong> → <strong>系统配置</strong> → <strong>Global Pipeline Libraries</strong></li><li>添加库配置： <ul><li>Name: <code>company-shared-lib</code></li><li>默认版本: <code>main</code> 或特定分支</li><li>加载方式: <code>Modern SCM</code></li><li>SCM: Git</li><li>Repository URL: <code>https://github.com/company/shared-library.git</code></li></ul></li></ol><h3 id="_3-3-本地开发环境" tabindex="-1">3.3 本地开发环境 <a class="header-anchor" href="#_3-3-本地开发环境" aria-label="Permalink to &quot;3.3 本地开发环境&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile - 引用本地库测试</span></span>
<span class="line"><span class="__shiki_1itgoe">@Library</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;shared-library@local&#39;</span><span class="__shiki_140thh">) _</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;Test&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 调用共享库方法</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="四、共享库核心组件开发" tabindex="-1">四、共享库核心组件开发 <a class="header-anchor" href="#四、共享库核心组件开发" aria-label="Permalink to &quot;四、共享库核心组件开发&quot;">​</a></h2><h3 id="_4-1-vars目录-全局变量和函数" tabindex="-1">4.1 vars目录 - 全局变量和函数 <a class="header-anchor" href="#_4-1-vars目录-全局变量和函数" aria-label="Permalink to &quot;4.1 vars目录 - 全局变量和函数&quot;">​</a></h3><p><strong>基础变量文件示例</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// vars/buildApp.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> call</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> config</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [:]) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 参数合并默认值</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> defaults </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        language</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;java&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        buildTool</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;maven&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0.0&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> defaults </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    echo </span><span class="__shiki_mdbnqw">&quot;开始构建 \${config.language} 应用&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    script {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 根据语言选择构建工具</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh">(config</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">language) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;java&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (config</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">buildTool </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;maven&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;mvn clean package -Dversion=\${config.version}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (config</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">buildTool </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;gradle&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;./gradlew build -Pversion=\${config.version}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;nodejs&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&quot;npm install &amp;&amp; npm run build&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;python&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&quot;pip install -r requirements.txt&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 返回构建结果信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;SUCCESS&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        artifact</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;target/\${config.language}-app-\${config.version}.jar&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>带参数的函数</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// vars/deployApp.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> call</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> environment</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> config</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [:]) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> validEnvs </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;dev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 参数验证</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">(environment </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> validEnvs)) {</span></span>
<span class="line"><span class="__shiki_140thh">        error </span><span class="__shiki_mdbnqw">&quot;无效环境: \${environment}。可选: \${validEnvs}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    echo </span><span class="__shiki_mdbnqw">&quot;开始部署到 \${environment} 环境&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 环境特定配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> envConfig </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">        dev</span><span class="__shiki_140thh">: [ </span><span class="__shiki_dzsirb">namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        staging</span><span class="__shiki_140thh">: [ </span><span class="__shiki_dzsirb">namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> ],</span></span>
<span class="line"><span class="__shiki_dzsirb">        production</span><span class="__shiki_140thh">: [ </span><span class="__shiki_dzsirb">namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;prod&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">replicas</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> ]</span></span>
<span class="line"><span class="__shiki_140thh">    ]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> settings </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> envConfig[environment] </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 部署逻辑</span></span>
<span class="line"><span class="__shiki_140thh">    script {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // Kubernetes部署示例</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            kubectl config use-context \${environment}-cluster</span></span>
<span class="line"><span class="__shiki_mdbnqw">            kubectl apply -f k8s/deployment.yaml -n \${settings.namespace}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            kubectl scale deployment myapp --replicas=\${settings.replicas} -n \${settings.namespace}</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">    healthCheck(environment, settings</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">namespace)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 私有方法（只能在此文件内调用）</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> healthCheck</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> env</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> namespace</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MINUTES&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        waitUntil {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_1itgoe">                def</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sh(</span></span>
<span class="line"><span class="__shiki_dzsirb">                    script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;kubectl get deployment myapp -n \${namespace} -o jsonpath=&#39;{.status.readyReplicas}&#39;&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    returnStdout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">                )</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">trim()</span></span>
<span class="line"><span class="__shiki_1itgoe">                return</span><span class="__shiki_140thh"> status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;1&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    echo </span><span class="__shiki_mdbnqw">&quot;✅ 应用在 \${env} 环境部署成功&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-src目录-groovy类库" tabindex="-1">4.2 src目录 - Groovy类库 <a class="header-anchor" href="#_4-2-src目录-groovy类库" aria-label="Permalink to &quot;4.2 src目录 - Groovy类库&quot;">​</a></h3><p><strong>基础工具类</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// src/org/example/BuildTools.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_140thh"> org.example</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> BuildTools</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Serializable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 必须的序列化字段</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> steps</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> env</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构造函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">    BuildTools</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">steps</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">env</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">steps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> steps</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">env </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> env</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> buildJavaApp</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> buildTool</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;maven&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [:]) {</span></span>
<span class="line"><span class="__shiki_140thh">        steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">echo </span><span class="__shiki_mdbnqw">&quot;使用 \${buildTool} 构建Java应用&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> defaultOpts </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_dzsirb">            skipTests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            profile</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;default&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            additionalArgs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        ]</span></span>
<span class="line"><span class="__shiki_140thh">        options </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> defaultOpts </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> options</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> command</span></span>
<span class="line"><span class="__shiki_1itgoe">        switch</span><span class="__shiki_140thh">(buildTool</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">toLowerCase()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;maven&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                command </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;mvn clean package&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (options</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">skipTests) {</span></span>
<span class="line"><span class="__shiki_140thh">                    command </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> &quot; -DskipTests&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (options</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">profile </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_mdbnqw"> &#39;default&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    command </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> &quot; -P\${options.profile}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"><span class="__shiki_1itgoe">            case</span><span class="__shiki_mdbnqw"> &#39;gradle&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                command </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;./gradlew build&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (options</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">skipTests) {</span></span>
<span class="line"><span class="__shiki_140thh">                    command </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> &quot; -x test&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_1itgoe">                break</span></span>
<span class="line"><span class="__shiki_1itgoe">            default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">error(</span><span class="__shiki_mdbnqw">&quot;不支持的构建工具: \${buildTool}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (options</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">additionalArgs) {</span></span>
<span class="line"><span class="__shiki_140thh">            command </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> &quot; \${options.additionalArgs}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">sh command</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 返回构建信息</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> getBuildInfo(buildTool)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> Map</span><span class="__shiki_1t8gfj"> getBuildInfo</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> buildTool</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> info </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [:]</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (buildTool </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;maven&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                mvn help:evaluate -Dexpression=project.version -q -DforceStdout &gt; version.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">                mvn help:evaluate -Dexpression=project.artifactId -q -DforceStdout &gt; artifactId.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            info</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">version </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">readFile(</span><span class="__shiki_mdbnqw">&#39;version.txt&#39;</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">trim()</span></span>
<span class="line"><span class="__shiki_140thh">            info</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">artifactId </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">readFile(</span><span class="__shiki_mdbnqw">&#39;artifactId.txt&#39;</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">trim()</span></span>
<span class="line"><span class="__shiki_140thh">            info</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">jarFile </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;target/\${info.artifactId}-\${info.version}.jar&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> info</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 静态工具方法</span></span>
<span class="line"><span class="__shiki_1itgoe">    static</span><span class="__shiki_1itgoe"> boolean</span><span class="__shiki_1t8gfj"> isProductionBranch</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> branch</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;main&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;master&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">]</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">contains(branch)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><p><strong>配置管理类</strong>：</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// src/org/example/ConfigManager.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">package</span><span class="__shiki_140thh"> org.example</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConfigManager</span><span class="__shiki_1itgoe"> implements</span><span class="__shiki_1t8gfj"> Serializable</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> steps</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> configCache </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [:]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    ConfigManager</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">steps</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">steps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> steps</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从JSON文件加载配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> loadConfig</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> configPath</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (configCache[configPath]) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> configCache[configPath]</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> configContent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">readFile(configPath)</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">readJSON(</span><span class="__shiki_dzsirb">text</span><span class="__shiki_140thh">: configContent)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 环境变量覆盖</span></span>
<span class="line"><span class="__shiki_140thh">        config </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> overrideWithEnvVars(config)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        configCache[configPath] </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从YAML文件加载配置</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_1t8gfj"> loadYamlConfig</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> yamlPath</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            python3 -c &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">import yaml, json, sys</span></span>
<span class="line"><span class="__shiki_mdbnqw">with open(&#39;\${yamlPath}&#39;, &#39;r&#39;) as f:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    data = yaml.safe_load(f)</span></span>
<span class="line"><span class="__shiki_mdbnqw">    print(json.dumps(data))</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;&quot;&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_140thh"> config</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">yaml</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> yamlContent </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">readFile(</span><span class="__shiki_mdbnqw">&#39;config.yaml&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> steps</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">readJSON(</span><span class="__shiki_dzsirb">text</span><span class="__shiki_140thh">: yamlContent)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    private</span><span class="__shiki_1itgoe"> def</span><span class="__shiki_1t8gfj"> overrideWithEnvVars</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 实现环境变量覆盖逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> config</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-3-resources目录-资源文件" tabindex="-1">4.3 resources目录 - 资源文件 <a class="header-anchor" href="#_4-3-resources目录-资源文件" aria-label="Permalink to &quot;4.3 resources目录 - 资源文件&quot;">​</a></h3><p><strong>Kubernetes模板</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># resources/templates/deployment.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">apiVersion</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">apps/v1</span></span>
<span class="line"><span class="__shiki_17hn0y">kind</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  name</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">APP_NAME</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">NAMESPACE</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  replicas</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">REPLICAS</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">  selector</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matchLabels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      app</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">APP_NAME</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">  template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    metadata</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        app</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">APP_NAME</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">    spec</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      containers</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">APP_NAME</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">IMAGE</span><span class="__shiki_140thh">}}</span><span class="__shiki_mdbnqw">:{{TAG}}</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">containerPort</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">PORT</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ENVIRONMENT</span></span>
<span class="line"><span class="__shiki_17hn0y">          value</span><span class="__shiki_140thh">: {{</span><span class="__shiki_mdbnqw">ENVIRONMENT</span><span class="__shiki_140thh">}}</span></span>
<span class="line"><span class="__shiki_17hn0y">        resources</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          requests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{MEMORY_REQUEST}}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{CPU_REQUEST}}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">          limits</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">            memory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{MEMORY_LIMIT}}&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">            cpu</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;{{CPU_LIMIT}}&quot;</span></span></code></pre></div><p><strong>工具脚本</strong>：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># resources/scripts/health-check.sh</span></span>
<span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">APP_URL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_140thh">MAX_RETRIES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">30</span></span>
<span class="line"><span class="__shiki_140thh">RETRY_INTERVAL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;开始健康检查: </span><span class="__shiki_140thh">$APP_URL</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $(</span><span class="__shiki_1t8gfj">seq</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh"> $MAX_RETRIES); </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;尝试 </span><span class="__shiki_140thh">$i</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_140thh">$MAX_RETRIES</span><span class="__shiki_mdbnqw">...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_140thh"> $APP_URL</span><span class="__shiki_mdbnqw">/health</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;✅ 健康检查通过&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        exit</span><span class="__shiki_dzsirb"> 0</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ $i </span><span class="__shiki_1itgoe">-lt</span><span class="__shiki_140thh"> $MAX_RETRIES ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;等待 \${</span><span class="__shiki_140thh">RETRY_INTERVAL</span><span class="__shiki_mdbnqw">}秒后重试...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh"> $RETRY_INTERVAL</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;❌ 健康检查失败&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">exit</span><span class="__shiki_dzsirb"> 1</span></span></code></pre></div><h2 id="五、共享库高级特性" tabindex="-1">五、共享库高级特性 <a class="header-anchor" href="#五、共享库高级特性" aria-label="Permalink to &quot;五、共享库高级特性&quot;">​</a></h2><h3 id="_5-1-动态加载库" tabindex="-1">5.1 动态加载库 <a class="header-anchor" href="#_5-1-动态加载库" aria-label="Permalink to &quot;5.1 动态加载库&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 根据条件加载不同版本的库</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> loadConditionalLibrary</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">BRANCH_NAME</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        library </span><span class="__shiki_mdbnqw">&#39;shared-library@production&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        library </span><span class="__shiki_mdbnqw">&#39;shared-library@latest&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-库的测试" tabindex="-1">5.2 库的测试 <a class="header-anchor" href="#_5-2-库的测试" aria-label="Permalink to &quot;5.2 库的测试&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// vars/testGroovyClass.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> test</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 单元测试示例</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> testTools </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> org.example.BuildTools</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, env)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> testTools</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">buildJavaApp(</span><span class="__shiki_mdbnqw">&#39;maven&#39;</span><span class="__shiki_140thh">, [</span><span class="__shiki_dzsirb">skipTests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">])</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    assert</span><span class="__shiki_140thh"> result</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">version </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_1itgoe">    assert</span><span class="__shiki_140thh"> result</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">artifactId </span><span class="__shiki_1itgoe">!=</span><span class="__shiki_dzsirb"> null</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    echo </span><span class="__shiki_mdbnqw">&quot;测试通过&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-异常处理和日志" tabindex="-1">5.3 异常处理和日志 <a class="header-anchor" href="#_5-3-异常处理和日志" aria-label="Permalink to &quot;5.3 异常处理和日志&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// vars/utils.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> call</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Closure</span><span class="__shiki_1jdh33"> body</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录开始时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> startTime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> System.</span><span class="__shiki_140thh">currentTimeMillis()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 执行闭包</span></span>
<span class="line"><span class="__shiki_140thh">        body()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 记录执行时间</span></span>
<span class="line"><span class="__shiki_1itgoe">        def</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> System.</span><span class="__shiki_140thh">currentTimeMillis() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> startTime</span></span>
<span class="line"><span class="__shiki_140thh">        echo </span><span class="__shiki_mdbnqw">&quot;✅ 任务执行成功，耗时: \${duration}ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">Exception</span><span class="__shiki_140thh"> e) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 错误处理</span></span>
<span class="line"><span class="__shiki_140thh">        echo </span><span class="__shiki_mdbnqw">&quot;❌ 任务执行失败: \${e.message}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        echo </span><span class="__shiki_mdbnqw">&quot;Stack trace: \${e.getStackTrace().join(&#39;\\n&#39;)}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送通知</span></span>
<span class="line"><span class="__shiki_140thh">        sendNotification(</span><span class="__shiki_mdbnqw">&quot;失败&quot;</span><span class="__shiki_140thh">, e</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">message)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 重新抛出异常</span></span>
<span class="line"><span class="__shiki_1itgoe">        throw</span><span class="__shiki_140thh"> e</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> sendNotification</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> status</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">String</span><span class="__shiki_1jdh33"> message</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送Slack/邮件通知</span></span>
<span class="line"><span class="__shiki_140thh">    script {</span></span>
<span class="line"><span class="__shiki_140thh">        slackSend(</span></span>
<span class="line"><span class="__shiki_dzsirb">            color</span><span class="__shiki_140thh">: status </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;成功&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;good&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;danger&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;构建\${status}: \${env.JOB_NAME} - \${env.BUILD_NUMBER}</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\${message}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="六、jenkinsfile中使用共享库" tabindex="-1">六、Jenkinsfile中使用共享库 <a class="header-anchor" href="#六、jenkinsfile中使用共享库" aria-label="Permalink to &quot;六、Jenkinsfile中使用共享库&quot;">​</a></h2><h3 id="_6-1-基础使用" tabindex="-1">6.1 基础使用 <a class="header-anchor" href="#_6-1-基础使用" aria-label="Permalink to &quot;6.1 基础使用&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile</span></span>
<span class="line"><span class="__shiki_1itgoe">@Library</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;company-shared-lib@main&#39;</span><span class="__shiki_140thh">) _</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 导入类</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.example.BuildTools</span></span>
<span class="line"><span class="__shiki_1itgoe">import</span><span class="__shiki_140thh"> org.example.ConfigManager</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    parameters {</span></span>
<span class="line"><span class="__shiki_140thh">        choice(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DEPLOY_ENV&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">choices</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;dev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">], </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;部署环境&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        string(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;APP_VERSION&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0.0&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;应用版本&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    environment {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 环境变量定义</span></span>
<span class="line"><span class="__shiki_dzsirb">        ARTIFACTORY_URL</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;https://artifactory.company.com&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">        DOCKER_REGISTRY</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;registry.company.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;初始化&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 初始化工具类</span></span>
<span class="line"><span class="__shiki_140thh">                    buildTools </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> BuildTools</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">, env)</span></span>
<span class="line"><span class="__shiki_140thh">                    configManager </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1itgoe"> ConfigManager</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 加载配置</span></span>
<span class="line"><span class="__shiki_140thh">                    appConfig </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> configManager</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">loadConfig(</span><span class="__shiki_mdbnqw">&#39;config/app.json&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_140thh">                    echo </span><span class="__shiki_mdbnqw">&quot;构建配置: \${appConfig}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;代码检查&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 调用共享库函数</span></span>
<span class="line"><span class="__shiki_140thh">                    codeQuality</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">check(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        language</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;java&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        sonarUrl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;https://sonar.company.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;构建&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 使用工具类构建</span></span>
<span class="line"><span class="__shiki_140thh">                    buildInfo </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> buildTools</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">buildJavaApp(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        buildTool</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;maven&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        skipTests</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        profile</span><span class="__shiki_140thh">: params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_ENV</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 保存构建信息</span></span>
<span class="line"><span class="__shiki_140thh">                    env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">ARTIFACT_PATH</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> buildInfo</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">jarFile</span></span>
<span class="line"><span class="__shiki_140thh">                    env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">APP_VERSION</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> buildInfo</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">version</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 归档制品</span></span>
<span class="line"><span class="__shiki_140thh">                    archiveArtifacts </span><span class="__shiki_dzsirb">artifacts</span><span class="__shiki_140thh">: buildInfo</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">jarFile</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            parallel {</span></span>
<span class="line"><span class="__shiki_140thh">                stage(</span><span class="__shiki_mdbnqw">&#39;单元测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    steps {</span></span>
<span class="line"><span class="__shiki_140thh">                        script {</span></span>
<span class="line"><span class="__shiki_140thh">                            testRunner</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">runUnitTests(</span></span>
<span class="line"><span class="__shiki_dzsirb">                                language</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;java&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                coverageThreshold</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span></span>
<span class="line"><span class="__shiki_140thh">                            )</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                stage(</span><span class="__shiki_mdbnqw">&#39;集成测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    steps {</span></span>
<span class="line"><span class="__shiki_140thh">                        script {</span></span>
<span class="line"><span class="__shiki_140thh">                            testRunner</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">runIntegrationTests(</span></span>
<span class="line"><span class="__shiki_dzsirb">                                environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                                timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">                            )</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;构建Docker镜像&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_140thh">                    docker</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">buildImage(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        registry</span><span class="__shiki_140thh">: env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DOCKER_REGISTRY</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        imageName</span><span class="__shiki_140thh">: appConfig</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">imageName,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;\${env.APP_VERSION}-\${env.BUILD_NUMBER}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        dockerfile</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Dockerfile&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;部署&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 根据参数选择部署环境</span></span>
<span class="line"><span class="__shiki_140thh">                    deployApp(params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_ENV</span><span class="__shiki_140thh">, [</span></span>
<span class="line"><span class="__shiki_dzsirb">                        namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;\${params.DEPLOY_ENV}-namespace&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        replicas</span><span class="__shiki_140thh">: params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_ENV</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;production&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_140thh">                    ])</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;验收测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_140thh">                    acceptanceTests</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">run(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        environment</span><span class="__shiki_140thh">: params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_ENV</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        url</span><span class="__shiki_140thh">: appConfig</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">urls[params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_ENV</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    post {</span></span>
<span class="line"><span class="__shiki_140thh">        always {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 清理工作空间</span></span>
<span class="line"><span class="__shiki_140thh">                cleanWs()</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_21nrsd">                // 生成报告</span></span>
<span class="line"><span class="__shiki_140thh">                generateReport([</span></span>
<span class="line"><span class="__shiki_dzsirb">                    buildInfo</span><span class="__shiki_140thh">: buildInfo,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    testResults</span><span class="__shiki_140thh">: testResults,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    deployment</span><span class="__shiki_140thh">: params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_ENV</span></span>
<span class="line"><span class="__shiki_140thh">                ])</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        success {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 成功通知</span></span>
<span class="line"><span class="__shiki_140thh">                notify</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">success(</span></span>
<span class="line"><span class="__shiki_dzsirb">                    message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;流水线 \${env.JOB_NAME}#\${env.BUILD_NUMBER} 执行成功&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    details</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;部署环境: \${params.DEPLOY_ENV}</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">版本: \${env.APP_VERSION}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        failure {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 失败通知</span></span>
<span class="line"><span class="__shiki_140thh">                notify</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">failure(</span></span>
<span class="line"><span class="__shiki_dzsirb">                    message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;流水线 \${env.JOB_NAME}#\${env.BUILD_NUMBER} 执行失败&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    details</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;请查看日志获取详细信息&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-模块化流水线" tabindex="-1">6.2 模块化流水线 <a class="header-anchor" href="#_6-2-模块化流水线" aria-label="Permalink to &quot;6.2 模块化流水线&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile - 模块化版本</span></span>
<span class="line"><span class="__shiki_1itgoe">@Library</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;company-shared-lib@main&#39;</span><span class="__shiki_140thh">) _</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;CI流水线&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 调用预定义的CI流水线</span></span>
<span class="line"><span class="__shiki_140thh">                    ciPipeline</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">run(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        language</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;java&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        buildTool</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;maven&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        qualityGates</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_dzsirb">                            coverage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            vulnerabilities</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;none&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            duplication</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">                        ]</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;CD流水线&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            when {</span></span>
<span class="line"><span class="__shiki_140thh">                expression { </span></span>
<span class="line"><span class="__shiki_140thh">                    env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">BRANCH_NAME</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;main&#39;</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                    env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">BRANCH_NAME</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;release/*&#39;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 调用预定义的CD流水线</span></span>
<span class="line"><span class="__shiki_140thh">                    cdPipeline</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">run(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        environments</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">                        approvalRequired</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        rollbackEnabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="七、最佳实践和注意事项" tabindex="-1">七、最佳实践和注意事项 <a class="header-anchor" href="#七、最佳实践和注意事项" aria-label="Permalink to &quot;七、最佳实践和注意事项&quot;">​</a></h2><h3 id="_7-1-版本管理策略" tabindex="-1">7.1 版本管理策略 <a class="header-anchor" href="#_7-1-版本管理策略" aria-label="Permalink to &quot;7.1 版本管理策略&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 语义化版本控制</span></span>
<span class="line"><span class="__shiki_21nrsd">// major.minor.patch</span></span>
<span class="line"><span class="__shiki_21nrsd">// @Library(&#39;shared-library@v1.2.3&#39;) _</span></span>
<span class="line"><span class="__shiki_21nrsd">// @Library(&#39;shared-library@feature/new-feature&#39;) _</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 版本锁定</span></span>
<span class="line"><span class="__shiki_1itgoe">@Library</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;shared-library@v1.0.0&#39;</span><span class="__shiki_140thh">) _  </span><span class="__shiki_21nrsd">// 生产环境推荐</span></span>
<span class="line"><span class="__shiki_1itgoe">@Library</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;shared-library@main&#39;</span><span class="__shiki_140thh">) _    </span><span class="__shiki_21nrsd">// 开发环境</span></span></code></pre></div><h3 id="_7-2-性能优化" tabindex="-1">7.2 性能优化 <a class="header-anchor" href="#_7-2-性能优化" aria-label="Permalink to &quot;7.2 性能优化&quot;">​</a></h3><ol><li><strong>懒加载</strong>：只在需要时加载库</li><li><strong>缓存机制</strong>：缓存配置和结果</li><li><strong>并行执行</strong>：合理使用parallel阶段</li><li><strong>资源清理</strong>：及时清理临时文件</li></ol><h3 id="_7-3-安全性考虑" tabindex="-1">7.3 安全性考虑 <a class="header-anchor" href="#_7-3-安全性考虑" aria-label="Permalink to &quot;7.3 安全性考虑&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 安全实践示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> call</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> config</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 验证输入参数</span></span>
<span class="line"><span class="__shiki_140thh">    validateInput(config)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 避免硬编码密码</span></span>
<span class="line"><span class="__shiki_140thh">    withCredentials([</span></span>
<span class="line"><span class="__shiki_140thh">        usernamePassword(</span></span>
<span class="line"><span class="__shiki_dzsirb">            credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;artifactory-creds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            usernameVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ARTIFACTORY_USER&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            passwordVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ARTIFACTORY_PASS&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    ]) {</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            curl -u $ARTIFACTORY_USER:$ARTIFACTORY_PASS \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                 -X POST $ARTIFACTORY_URL</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 最小权限原则</span></span>
<span class="line"><span class="__shiki_140thh">    sh(</span><span class="__shiki_dzsirb">script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;docker scan myimage&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">returnStdout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 日志脱敏</span></span>
<span class="line"><span class="__shiki_140thh">    maskSecretsInLogs()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-4-测试策略" tabindex="-1">7.4 测试策略 <a class="header-anchor" href="#_7-4-测试策略" aria-label="Permalink to &quot;7.4 测试策略&quot;">​</a></h3><ol><li><strong>单元测试</strong>：使用JUnit测试Groovy类</li><li><strong>集成测试</strong>：在测试Jenkins中测试完整流水线</li><li><strong>回归测试</strong>：确保更改不影响现有功能</li><li><strong>代码审查</strong>：所有更改必须经过代码审查</li></ol><h3 id="_7-5-文档和维护" tabindex="-1">7.5 文档和维护 <a class="header-anchor" href="#_7-5-文档和维护" aria-label="Permalink to &quot;7.5 文档和维护&quot;">​</a></h3><ol><li><strong>API文档</strong>：为所有公共方法提供文档</li><li><strong>示例代码</strong>：提供完整的示例</li><li><strong>变更日志</strong>：记录所有重大更改</li><li><strong>迁移指南</strong>：提供版本升级指南</li></ol><h2 id="八、故障排查和调试" tabindex="-1">八、故障排查和调试 <a class="header-anchor" href="#八、故障排查和调试" aria-label="Permalink to &quot;八、故障排查和调试&quot;">​</a></h2><h3 id="_8-1-常见问题" tabindex="-1">8.1 常见问题 <a class="header-anchor" href="#_8-1-常见问题" aria-label="Permalink to &quot;8.1 常见问题&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 调试技巧</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> debugExample</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 打印调试信息</span></span>
<span class="line"><span class="__shiki_140thh">    echo </span><span class="__shiki_mdbnqw">&quot;DEBUG: 当前参数 = \${params}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    echo </span><span class="__shiki_mdbnqw">&quot;DEBUG: 环境变量 = \${env}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 捕获命令输出</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> output </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sh(</span></span>
<span class="line"><span class="__shiki_dzsirb">        script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ls -la&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        returnStdout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    )</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">trim()</span></span>
<span class="line"><span class="__shiki_140thh">    echo </span><span class="__shiki_mdbnqw">&quot;命令输出: \${output}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 检查文件存在</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (fileExists(</span><span class="__shiki_mdbnqw">&#39;pom.xml&#39;</span><span class="__shiki_140thh">)) {</span></span>
<span class="line"><span class="__shiki_140thh">        echo </span><span class="__shiki_mdbnqw">&quot;找到pom.xml文件&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 逐步执行</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用timeout和retry包装</span></span>
<span class="line"><span class="__shiki_140thh">    retry(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MINUTES&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&#39;some-command&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_8-2-日志分析" tabindex="-1">8.2 日志分析 <a class="header-anchor" href="#_8-2-日志分析" aria-label="Permalink to &quot;8.2 日志分析&quot;">​</a></h3><ul><li><strong>Blue Ocean</strong>：可视化流水线执行</li><li><strong>Pipeline Steps</strong>：查看每个步骤的详细日志</li><li><strong>Console Output</strong>：原始日志输出</li><li><strong>Timestamps</strong>：添加时间戳分析性能</li></ul><h2 id="九、扩展和集成" tabindex="-1">九、扩展和集成 <a class="header-anchor" href="#九、扩展和集成" aria-label="Permalink to &quot;九、扩展和集成&quot;">​</a></h2><h3 id="_9-1-与其他工具集成" tabindex="-1">9.1 与其他工具集成 <a class="header-anchor" href="#_9-1-与其他工具集成" aria-label="Permalink to &quot;9.1 与其他工具集成&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 与第三方工具集成示例</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> integrateWithTools</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // SonarQube</span></span>
<span class="line"><span class="__shiki_140thh">    withSonarQubeEnv(</span><span class="__shiki_mdbnqw">&#39;sonar-server&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&#39;mvn sonar:sonar&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // JIRA</span></span>
<span class="line"><span class="__shiki_140thh">    jiraIssue </span><span class="__shiki_dzsirb">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;PROJ-123&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;transition&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">transition</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Done&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Slack</span></span>
<span class="line"><span class="__shiki_140thh">    slackSend(</span></span>
<span class="line"><span class="__shiki_dzsirb">        channel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;#build-notifications&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;构建完成: \${env.JOB_NAME}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        color</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;good&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Artifactory</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> server </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> Artifactory.</span><span class="__shiki_140thh">server(</span><span class="__shiki_mdbnqw">&#39;artifactory-server&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    def</span><span class="__shiki_140thh"> uploadSpec </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;&quot;&quot;{</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &quot;files&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;pattern&quot;: &quot;target/*.jar&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;target&quot;: &quot;libs-snapshot-local/&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    }&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    server</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">upload(uploadSpec)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-自定义步骤插件" tabindex="-1">9.2 自定义步骤插件 <a class="header-anchor" href="#_9-2-自定义步骤插件" aria-label="Permalink to &quot;9.2 自定义步骤插件&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 创建自定义步骤</span></span>
<span class="line"><span class="__shiki_21nrsd">// vars/customStep.groovy</span></span>
<span class="line"><span class="__shiki_1itgoe">def</span><span class="__shiki_1t8gfj"> call</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">Map</span><span class="__shiki_1jdh33"> config</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [:]) {</span></span>
<span class="line"><span class="__shiki_140thh">    node {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 步骤逻辑</span></span>
<span class="line"><span class="__shiki_140thh">        echo </span><span class="__shiki_mdbnqw">&quot;执行自定义步骤&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 可以使用所有Jenkins步骤</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&quot;echo &#39;Hello from custom step&#39;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 返回结果</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">timestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1itgoe"> Date</span><span class="__shiki_140thh">()]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="十、总结" tabindex="-1">十、总结 <a class="header-anchor" href="#十、总结" aria-label="Permalink to &quot;十、总结&quot;">​</a></h2><p>Jenkins共享库是CI/CD流水线代码复用的强大工具，通过合理设计和开发共享库，可以实现：</p><ol><li><strong>标准化</strong>：统一的构建部署流程</li><li><strong>高效维护</strong>：一处修改，处处生效</li><li><strong>知识沉淀</strong>：积累团队最佳实践</li><li><strong>快速上手</strong>：新项目快速接入标准流水线</li></ol><p><strong>关键成功因素</strong>：</p><ul><li>清晰的代码组织和架构</li><li>完整的文档和示例</li><li>严格的版本管理和测试</li><li>定期的维护和更新</li><li>团队的培训和推广</li></ul><p>通过本学习笔记的指导，您应该能够设计、开发和使用Jenkins共享库，构建高效、可靠、可维护的CI/CD流水线。</p>`,78)])])}const d=a(_,[["render",l]]);export{r as __pageData,d as default};
