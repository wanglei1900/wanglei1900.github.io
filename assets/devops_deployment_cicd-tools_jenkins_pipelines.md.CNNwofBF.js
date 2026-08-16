import{_ as a,o as n,c as p,a as i}from"./app.DkoUFz-u.js";const r=JSON.parse('{"title":"Jenkins流水线设计：完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/cicd-tools/jenkins/pipelines.md","filePath":"devops/deployment/cicd-tools/jenkins/pipelines.md"}'),_={name:"devops/deployment/cicd-tools/jenkins/pipelines.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[i(`<h1 id="jenkins流水线设计-完整学习笔记" tabindex="-1">Jenkins流水线设计：完整学习笔记 <a class="header-anchor" href="#jenkins流水线设计-完整学习笔记" aria-label="Permalink to &quot;Jenkins流水线设计：完整学习笔记&quot;">​</a></h1><h2 id="_1-jenkins流水线概述" tabindex="-1">1. Jenkins流水线概述 <a class="header-anchor" href="#_1-jenkins流水线概述" aria-label="Permalink to &quot;1. Jenkins流水线概述&quot;">​</a></h2><h3 id="_1-1-ci-cd与流水线的意义" tabindex="-1">1.1 CI/CD与流水线的意义 <a class="header-anchor" href="#_1-1-ci-cd与流水线的意义" aria-label="Permalink to &quot;1.1 CI/CD与流水线的意义&quot;">​</a></h3><p><strong>持续集成（CI）</strong>：开发人员频繁地将代码集成到共享仓库，每次集成都通过自动化构建和测试验证。</p><p><strong>持续交付/部署（CD）</strong>：确保代码变更可以安全、快速地部署到生产环境。</p><p><strong>流水线（Pipeline）</strong>：将软件交付过程建模为一系列阶段的可自动化流程，包括构建、测试、部署等步骤。</p><h3 id="_1-2-jenkins流水线的优势" tabindex="-1">1.2 Jenkins流水线的优势 <a class="header-anchor" href="#_1-2-jenkins流水线的优势" aria-label="Permalink to &quot;1.2 Jenkins流水线的优势&quot;">​</a></h3><ul><li><strong>代码化配置</strong>：流水线作为代码存储在版本控制中</li><li><strong>可视化</strong>：Blue Ocean界面提供清晰的阶段视图</li><li><strong>可恢复性</strong>：可以从失败点继续执行</li><li><strong>并行执行</strong>：支持并行阶段提高效率</li><li><strong>可扩展性</strong>：丰富的插件生态系统</li></ul><h2 id="_2-jenkins流水线类型" tabindex="-1">2. Jenkins流水线类型 <a class="header-anchor" href="#_2-jenkins流水线类型" aria-label="Permalink to &quot;2. Jenkins流水线类型&quot;">​</a></h2><h3 id="_2-1-声明式流水线-declarative-pipeline" tabindex="-1">2.1 声明式流水线（Declarative Pipeline） <a class="header-anchor" href="#_2-1-声明式流水线-declarative-pipeline" aria-label="Permalink to &quot;2.1 声明式流水线（Declarative Pipeline）&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;Build&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                echo </span><span class="__shiki_mdbnqw">&#39;Building...&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-脚本式流水线-scripted-pipeline" tabindex="-1">2.2 脚本式流水线（Scripted Pipeline） <a class="header-anchor" href="#_2-2-脚本式流水线-scripted-pipeline" aria-label="Permalink to &quot;2.2 脚本式流水线（Scripted Pipeline）&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">node {</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;Build&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        echo </span><span class="__shiki_mdbnqw">&#39;Building...&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-核心语法元素详解" tabindex="-1">3. 核心语法元素详解 <a class="header-anchor" href="#_3-核心语法元素详解" aria-label="Permalink to &quot;3. 核心语法元素详解&quot;">​</a></h2><h3 id="_3-1-基本结构" tabindex="-1">3.1 基本结构 <a class="header-anchor" href="#_3-1-基本结构" aria-label="Permalink to &quot;3.1 基本结构&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 全局配置部分</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    options {</span></span>
<span class="line"><span class="__shiki_140thh">        timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HOURS&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    triggers {</span></span>
<span class="line"><span class="__shiki_140thh">        cron(</span><span class="__shiki_mdbnqw">&#39;H */4 * * *&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    parameters {</span></span>
<span class="line"><span class="__shiki_140thh">        string(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;VERSION&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1.0.0&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    environment {</span></span>
<span class="line"><span class="__shiki_dzsirb">        NODE_VERSION</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;16.14.0&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    tools {</span></span>
<span class="line"><span class="__shiki_140thh">        maven </span><span class="__shiki_mdbnqw">&#39;Maven-3.8.6&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 阶段定义</span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;代码检出&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                git </span><span class="__shiki_dzsirb">branch</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;main&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                    url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;https://github.com/example/repo.git&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;构建&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&#39;mvn clean compile&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            post {</span></span>
<span class="line"><span class="__shiki_140thh">                success {</span></span>
<span class="line"><span class="__shiki_140thh">                    echo </span><span class="__shiki_mdbnqw">&#39;构建成功!&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                failure {</span></span>
<span class="line"><span class="__shiki_140thh">                    echo </span><span class="__shiki_mdbnqw">&#39;构建失败!&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 后置动作</span></span>
<span class="line"><span class="__shiki_140thh">    post {</span></span>
<span class="line"><span class="__shiki_140thh">        always {</span></span>
<span class="line"><span class="__shiki_140thh">            junit </span><span class="__shiki_mdbnqw">&#39;**/target/surefire-reports/*.xml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            archiveArtifacts </span><span class="__shiki_dzsirb">artifacts</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;target/*.jar&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        success {</span></span>
<span class="line"><span class="__shiki_140thh">            emailext </span><span class="__shiki_dzsirb">subject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;构建成功&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                      body</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;\${env.JOB_NAME}构建成功&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                      to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;team@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-2-agent-执行环境-配置" tabindex="-1">3.2 Agent（执行环境）配置 <a class="header-anchor" href="#_3-2-agent-执行环境-配置" aria-label="Permalink to &quot;3.2 Agent（执行环境）配置&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 使用任意可用agent</span></span>
<span class="line"><span class="__shiki_140thh">agent any</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用特定标签的agent</span></span>
<span class="line"><span class="__shiki_140thh">agent {</span></span>
<span class="line"><span class="__shiki_140thh">    label </span><span class="__shiki_mdbnqw">&#39;linux &amp;&amp; docker&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 使用Docker容器</span></span>
<span class="line"><span class="__shiki_140thh">agent {</span></span>
<span class="line"><span class="__shiki_140thh">    docker {</span></span>
<span class="line"><span class="__shiki_140thh">        image </span><span class="__shiki_mdbnqw">&#39;maven:3.8.6-jdk-11&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_mdbnqw">&#39;-v /tmp:/tmp&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 每个阶段使用不同agent</span></span>
<span class="line"><span class="__shiki_140thh">agent none</span></span>
<span class="line"><span class="__shiki_140thh">stages {</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;Build&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        agent {</span></span>
<span class="line"><span class="__shiki_140thh">            docker { image </span><span class="__shiki_mdbnqw">&#39;node:16-alpine&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        steps { </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh">. }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;Test&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        agent {</span></span>
<span class="line"><span class="__shiki_140thh">            docker { image </span><span class="__shiki_mdbnqw">&#39;python:3.9&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        steps { </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh">. }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-3-参数化构建" tabindex="-1">3.3 参数化构建 <a class="header-anchor" href="#_3-3-参数化构建" aria-label="Permalink to &quot;3.3 参数化构建&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">parameters {</span></span>
<span class="line"><span class="__shiki_140thh">    string(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;BRANCH_NAME&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;main&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">           description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;要构建的分支&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    choice(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DEPLOY_ENV&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">choices</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;dev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;prod&#39;</span><span class="__shiki_140thh">], </span></span>
<span class="line"><span class="__shiki_dzsirb">           description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;部署环境&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    booleanParam(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;RUN_TESTS&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;是否运行测试&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    text(</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;CUSTOM_CONFIG&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">         description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;自定义配置&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_3-4-环境变量" tabindex="-1">3.4 环境变量 <a class="header-anchor" href="#_3-4-环境变量" aria-label="Permalink to &quot;3.4 环境变量&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">environment {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基础环境变量</span></span>
<span class="line"><span class="__shiki_dzsirb">    APP_NAME</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;my-application&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">    BUILD_ID</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;\${env.BUILD_NUMBER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 从凭据获取</span></span>
<span class="line"><span class="__shiki_dzsirb">    AWS_ACCESS_KEY_ID</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> credentials(</span><span class="__shiki_mdbnqw">&#39;aws-access-key&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">    DOCKER_REGISTRY_CREDENTIALS</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> credentials(</span><span class="__shiki_mdbnqw">&#39;docker-registry&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 动态设置</span></span>
<span class="line"><span class="__shiki_dzsirb">    BUILD_TIMESTAMP</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> sh(</span><span class="__shiki_dzsirb">script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;date +%Y%m%d%H%M%S&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">returnStdout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">trim()</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-流水线阶段设计" tabindex="-1">4. 流水线阶段设计 <a class="header-anchor" href="#_4-流水线阶段设计" aria-label="Permalink to &quot;4. 流水线阶段设计&quot;">​</a></h2><h3 id="_4-1-典型阶段划分" tabindex="-1">4.1 典型阶段划分 <a class="header-anchor" href="#_4-1-典型阶段划分" aria-label="Permalink to &quot;4.1 典型阶段划分&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">stages {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段1：准备</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;初始化&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        steps {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_140thh">                currentBuild</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">displayName </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;#\${BUILD_NUMBER}-\${params.BRANCH_NAME}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                currentBuild</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">description </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &quot;构建分支: \${params.BRANCH_NAME}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段2：代码质量检查</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;代码检查&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        parallel {</span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;SonarQube分析&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    withSonarQubeEnv(</span><span class="__shiki_mdbnqw">&#39;sonar-server&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;mvn sonar:sonar&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;安全检查&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    dependencyCheck </span><span class="__shiki_dzsirb">additionalArguments</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;--scan ./&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                                   odcInstallation</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;OWASP-DC&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    dependencyCheckPublisher </span><span class="__shiki_dzsirb">pattern</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;**/dependency-check-report.xml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段3：构建</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;编译构建&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        steps {</span></span>
<span class="line"><span class="__shiki_140thh">            dir(</span><span class="__shiki_mdbnqw">&#39;backend&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&#39;mvn clean package -DskipTests&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            dir(</span><span class="__shiki_mdbnqw">&#39;frontend&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&#39;npm ci&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&#39;npm run build&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段4：测试</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;自动化测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        parallel {</span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;单元测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;mvn test&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    junit </span><span class="__shiki_mdbnqw">&#39;**/target/surefire-reports/*.xml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;集成测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;mvn verify -Pintegration-tests&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    junit </span><span class="__shiki_mdbnqw">&#39;**/target/failsafe-reports/*.xml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;前端测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;npm run test:ci&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    junit </span><span class="__shiki_mdbnqw">&#39;**/test-results/**/*.xml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段5：制品管理</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;制品打包&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        steps {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // Docker镜像构建</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_140thh">                dockerImage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> docker</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">build(</span><span class="__shiki_mdbnqw">&quot;\${APP_NAME}:\${BUILD_ID}&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 版本化制品</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                echo &quot;\${BUILD_ID}&quot; &gt; version.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">                tar -czf \${APP_NAME}-\${BUILD_ID}.tar.gz target/*.jar version.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            archiveArtifacts </span><span class="__shiki_dzsirb">artifacts</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;**/*.tar.gz, **/*.jar&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段6：部署</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;部署&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        when {</span></span>
<span class="line"><span class="__shiki_140thh">            expression { </span></span>
<span class="line"><span class="__shiki_140thh">                params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_ENV</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &#39;none&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">                currentBuild</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">resultIsBetterOrEqualTo(</span><span class="__shiki_mdbnqw">&#39;SUCCESS&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        steps {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_1itgoe">                switch</span><span class="__shiki_140thh">(params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_ENV</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">                    case</span><span class="__shiki_mdbnqw"> &#39;dev&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&quot;kubectl apply -f k8s/dev-deployment.yaml&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                        break</span></span>
<span class="line"><span class="__shiki_1itgoe">                    case</span><span class="__shiki_mdbnqw"> &#39;staging&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&quot;ansible-playbook deploy-staging.yml&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                        break</span></span>
<span class="line"><span class="__shiki_1itgoe">                    case</span><span class="__shiki_mdbnqw"> &#39;prod&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">                        input </span><span class="__shiki_dzsirb">message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;确认部署到生产环境?&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                              ok</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;确认部署&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&quot;./deploy-production.sh&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">                        break</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 阶段7：验证</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;健康检查&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        steps {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_140thh">                timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MINUTES&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    waitUntil {</span></span>
<span class="line"><span class="__shiki_1itgoe">                        def</span><span class="__shiki_140thh"> response </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> sh(</span></span>
<span class="line"><span class="__shiki_dzsirb">                            script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;curl -s -o /dev/null -w &#39;%{http_code}&#39; \${APP_URL}/health&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                            returnStdout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">                        )</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">trim()</span></span>
<span class="line"><span class="__shiki_1itgoe">                        return</span><span class="__shiki_140thh"> response </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;200&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                echo </span><span class="__shiki_mdbnqw">&#39;应用健康检查通过&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-高级流水线特性" tabindex="-1">5. 高级流水线特性 <a class="header-anchor" href="#_5-高级流水线特性" aria-label="Permalink to &quot;5. 高级流水线特性&quot;">​</a></h2><h3 id="_5-1-共享库-shared-libraries" tabindex="-1">5.1 共享库（Shared Libraries） <a class="header-anchor" href="#_5-1-共享库-shared-libraries" aria-label="Permalink to &quot;5.1 共享库（Shared Libraries）&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile中引用</span></span>
<span class="line"><span class="__shiki_1itgoe">@Library</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;my-shared-library@main&#39;</span><span class="__shiki_140thh">) _</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;使用共享库&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_140thh">                    myLib</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">buildJavaApp()</span></span>
<span class="line"><span class="__shiki_140thh">                    myLib</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">runIntegrationTests()</span></span>
<span class="line"><span class="__shiki_140thh">                    myLib</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">deployTo(</span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 共享库结构</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">src/org/company/</span></span>
<span class="line"><span class="__shiki_21nrsd">├── BuildTools.groovy</span></span>
<span class="line"><span class="__shiki_21nrsd">├── Deployment.groovy</span></span>
<span class="line"><span class="__shiki_21nrsd">└── Testing.groovy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">vars/</span></span>
<span class="line"><span class="__shiki_21nrsd">├── buildJavaApp.groovy</span></span>
<span class="line"><span class="__shiki_21nrsd">└── deployTo.groovy</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h3 id="_5-2-条件执行和超时控制" tabindex="-1">5.2 条件执行和超时控制 <a class="header-anchor" href="#_5-2-条件执行和超时控制" aria-label="Permalink to &quot;5.2 条件执行和超时控制&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;条件执行示例&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    when {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于分支条件</span></span>
<span class="line"><span class="__shiki_140thh">        branch </span><span class="__shiki_mdbnqw">&#39;feature/*&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 基于环境变量</span></span>
<span class="line"><span class="__shiki_140thh">        environment </span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DEPLOY&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;true&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 表达式条件</span></span>
<span class="line"><span class="__shiki_140thh">        expression {</span></span>
<span class="line"><span class="__shiki_1itgoe">            return</span><span class="__shiki_140thh"> params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">RUN_TESTS</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> fileExists(</span><span class="__shiki_mdbnqw">&#39;package.json&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 变更集条件</span></span>
<span class="line"><span class="__shiki_140thh">        changeset </span><span class="__shiki_mdbnqw">&#39;**/*.java&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 标签条件</span></span>
<span class="line"><span class="__shiki_140thh">        tag </span><span class="__shiki_mdbnqw">&#39;release-*&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 超时控制</span></span>
<span class="line"><span class="__shiki_140thh">    timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MINUTES&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        retry(</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">) {  </span><span class="__shiki_21nrsd">// 失败重试</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                echo </span><span class="__shiki_mdbnqw">&#39;执行可能失败的操作...&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-并行执行优化" tabindex="-1">5.3 并行执行优化 <a class="header-anchor" href="#_5-3-并行执行优化" aria-label="Permalink to &quot;5.3 并行执行优化&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;并行矩阵构建&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    matrix {</span></span>
<span class="line"><span class="__shiki_140thh">        axes {</span></span>
<span class="line"><span class="__shiki_140thh">            axis {</span></span>
<span class="line"><span class="__shiki_140thh">                name </span><span class="__shiki_mdbnqw">&#39;PLATFORM&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                values </span><span class="__shiki_mdbnqw">&#39;linux&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;windows&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;macos&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            axis {</span></span>
<span class="line"><span class="__shiki_140thh">                name </span><span class="__shiki_mdbnqw">&#39;BROWSER&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                values </span><span class="__shiki_mdbnqw">&#39;chrome&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;firefox&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;safari&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        excludes {</span></span>
<span class="line"><span class="__shiki_140thh">            exclude {</span></span>
<span class="line"><span class="__shiki_140thh">                axis {</span></span>
<span class="line"><span class="__shiki_140thh">                    name </span><span class="__shiki_mdbnqw">&#39;PLATFORM&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    values </span><span class="__shiki_mdbnqw">&#39;macos&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                axis {</span></span>
<span class="line"><span class="__shiki_140thh">                    name </span><span class="__shiki_mdbnqw">&#39;BROWSER&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    values </span><span class="__shiki_mdbnqw">&#39;chrome&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        stages {</span></span>
<span class="line"><span class="__shiki_140thh">            stage(</span><span class="__shiki_mdbnqw">&#39;测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                steps {</span></span>
<span class="line"><span class="__shiki_140thh">                    echo </span><span class="__shiki_mdbnqw">&quot;在 \${PLATFORM} 上测试 \${BROWSER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-4-错误处理和通知" tabindex="-1">5.4 错误处理和通知 <a class="header-anchor" href="#_5-4-错误处理和通知" aria-label="Permalink to &quot;5.4 错误处理和通知&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">post {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 根据状态执行不同操作</span></span>
<span class="line"><span class="__shiki_140thh">    always {</span></span>
<span class="line"><span class="__shiki_140thh">        script {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 清理工作空间</span></span>
<span class="line"><span class="__shiki_140thh">            cleanWs()</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录构建指标</span></span>
<span class="line"><span class="__shiki_140thh">            recordIssues(</span></span>
<span class="line"><span class="__shiki_dzsirb">                tools</span><span class="__shiki_140thh">: [checkStyle(), pmdParser()],</span></span>
<span class="line"><span class="__shiki_dzsirb">                filters</span><span class="__shiki_140thh">: [excludeFile(</span><span class="__shiki_mdbnqw">&#39;.*Test</span><span class="__shiki_dzsirb">\\\\</span><span class="__shiki_mdbnqw">.java&#39;</span><span class="__shiki_140thh">)]</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    success {</span></span>
<span class="line"><span class="__shiki_140thh">        script {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 成功通知</span></span>
<span class="line"><span class="__shiki_140thh">            slackSend(</span></span>
<span class="line"><span class="__shiki_dzsirb">                color</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;good&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;构建成功: \${env.JOB_NAME} #\${env.BUILD_NUMBER}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 更新Dashboard</span></span>
<span class="line"><span class="__shiki_140thh">            updateGitHubCommitStatus(</span></span>
<span class="line"><span class="__shiki_dzsirb">                state</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;SUCCESS&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                context</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;jenkins/ci&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    failure {</span></span>
<span class="line"><span class="__shiki_140thh">        script {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 失败通知</span></span>
<span class="line"><span class="__shiki_140thh">            emailext(</span></span>
<span class="line"><span class="__shiki_dzsirb">                subject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;构建失败: \${env.JOB_NAME} #\${env.BUILD_NUMBER}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                body</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;请检查构建日志: \${env.BUILD_URL}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dev-team@example.com&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                attachLog</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 自动创建Issue</span></span>
<span class="line"><span class="__shiki_140thh">            withCredentials([string(</span><span class="__shiki_dzsirb">credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;github-token&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                                  variable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;GITHUB_TOKEN&#39;</span><span class="__shiki_140thh">)]) {</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    curl -X POST \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    -H &quot;Authorization: token </span><span class="__shiki_dzsirb">\\$</span><span class="__shiki_mdbnqw">GITHUB_TOKEN&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    -d &#39;{&quot;title&quot;:&quot;构建失败 #\${BUILD_NUMBER}&quot;, </span></span>
<span class="line"><span class="__shiki_mdbnqw">                         &quot;body&quot;:&quot;自动生成的Issue&quot;}&#39; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    https://api.github.com/repos/owner/repo/issues</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    unstable {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 不稳定状态处理</span></span>
<span class="line"><span class="__shiki_140thh">        echo </span><span class="__shiki_mdbnqw">&#39;构建结果不稳定&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    cleanup {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 无论成功失败都执行</span></span>
<span class="line"><span class="__shiki_140thh">        echo </span><span class="__shiki_mdbnqw">&#39;执行清理操作...&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-实战示例" tabindex="-1">6. 实战示例 <a class="header-anchor" href="#_6-实战示例" aria-label="Permalink to &quot;6. 实战示例&quot;">​</a></h2><h3 id="_6-1-完整的java微服务流水线" tabindex="-1">6.1 完整的Java微服务流水线 <a class="header-anchor" href="#_6-1-完整的java微服务流水线" aria-label="Permalink to &quot;6.1 完整的Java微服务流水线&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent {</span></span>
<span class="line"><span class="__shiki_140thh">        kubernetes {</span></span>
<span class="line"><span class="__shiki_140thh">            label </span><span class="__shiki_mdbnqw">&#39;jenkins-agent-java&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            yaml </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">apiVersion: v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">kind: Pod</span></span>
<span class="line"><span class="__shiki_mdbnqw">spec:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  containers:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - name: maven</span></span>
<span class="line"><span class="__shiki_mdbnqw">    image: maven:3.8.6-jdk-11</span></span>
<span class="line"><span class="__shiki_mdbnqw">    command: [&#39;cat&#39;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">    tty: true</span></span>
<span class="line"><span class="__shiki_mdbnqw">    volumeMounts:</span></span>
<span class="line"><span class="__shiki_mdbnqw">    - name: maven-cache</span></span>
<span class="line"><span class="__shiki_mdbnqw">      mountPath: /root/.m2</span></span>
<span class="line"><span class="__shiki_mdbnqw">  volumes:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - name: maven-cache</span></span>
<span class="line"><span class="__shiki_mdbnqw">    persistentVolumeClaim:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      claimName: maven-cache-pvc</span></span>
<span class="line"><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    options {</span></span>
<span class="line"><span class="__shiki_140thh">        buildDiscarder(logRotator(</span><span class="__shiki_dzsirb">numToKeepStr</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;10&#39;</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        disableConcurrentBuilds()</span></span>
<span class="line"><span class="__shiki_140thh">        timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;HOURS&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        timestamps()</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    parameters {</span></span>
<span class="line"><span class="__shiki_140thh">        choice(</span></span>
<span class="line"><span class="__shiki_dzsirb">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DEPLOY_TO&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            choices</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;none&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;dev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;prod&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;选择部署环境&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">        booleanParam(</span></span>
<span class="line"><span class="__shiki_dzsirb">            name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;SKIP_TESTS&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">            description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;跳过测试阶段&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    environment {</span></span>
<span class="line"><span class="__shiki_dzsirb">        REGISTRY</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;registry.example.com&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">        PROJECT</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;myproject&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">        SERVICE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;user-service&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">        DOCKER_IMAGE</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &quot;\${REGISTRY}/\${PROJECT}/\${SERVICE}:\${BUILD_ID}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        KUBE_CONFIG</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> credentials(</span><span class="__shiki_mdbnqw">&#39;k8s-cluster-config&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">        SONAR_TOKEN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> credentials(</span><span class="__shiki_mdbnqw">&#39;sonar-token&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;代码质量门控&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                checkout scm</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 检查代码规范</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;mvn checkstyle:check&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 运行Sonar分析</span></span>
<span class="line"><span class="__shiki_140thh">                    withSonarQubeEnv(</span><span class="__shiki_mdbnqw">&#39;sonarqube&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&quot;mvn sonar:sonar -Dsonar.projectKey=\${SERVICE}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 质量门控检查</span></span>
<span class="line"><span class="__shiki_140thh">                    timeout(</span><span class="__shiki_dzsirb">time</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">unit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MINUTES&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                        waitForQualityGate </span><span class="__shiki_dzsirb">abortPipeline</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;构建和测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            when {</span></span>
<span class="line"><span class="__shiki_140thh">                expression { </span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">SKIP_TESTS</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            stages {</span></span>
<span class="line"><span class="__shiki_140thh">                stage(</span><span class="__shiki_mdbnqw">&#39;单元测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    steps {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;mvn test -DskipITs&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    post {</span></span>
<span class="line"><span class="__shiki_140thh">                        always {</span></span>
<span class="line"><span class="__shiki_140thh">                            junit </span><span class="__shiki_mdbnqw">&#39;**/target/surefire-reports/*.xml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                stage(</span><span class="__shiki_mdbnqw">&#39;集成测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    steps {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;mvn verify -Dit.test=*IT&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    post {</span></span>
<span class="line"><span class="__shiki_140thh">                        always {</span></span>
<span class="line"><span class="__shiki_140thh">                            junit </span><span class="__shiki_mdbnqw">&#39;**/target/failsafe-reports/*.xml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                stage(</span><span class="__shiki_mdbnqw">&#39;性能测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    steps {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;mvn gatling:test&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    post {</span></span>
<span class="line"><span class="__shiki_140thh">                        always {</span></span>
<span class="line"><span class="__shiki_140thh">                            gatlingArchive()</span></span>
<span class="line"><span class="__shiki_140thh">                        }</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;构建Docker镜像&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 构建应用</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;mvn clean package -DskipTests&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 构建并推送Docker镜像</span></span>
<span class="line"><span class="__shiki_140thh">                    docker</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">withRegistry(</span><span class="__shiki_mdbnqw">&quot;https://\${REGISTRY}&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;docker-registry-creds&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                        dockerImage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> docker</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">build(</span><span class="__shiki_dzsirb">DOCKER_IMAGE</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                        dockerImage</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">push()</span></span>
<span class="line"><span class="__shiki_140thh">                        dockerImage</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">push(</span><span class="__shiki_mdbnqw">&#39;latest&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;安全扫描&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 镜像漏洞扫描</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        trivy image --exit-code 1 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        --severity HIGH,CRITICAL \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        \${DOCKER_IMAGE}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 依赖漏洞检查</span></span>
<span class="line"><span class="__shiki_140thh">                    dependencyCheck </span><span class="__shiki_dzsirb">additionalArguments</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;--scan . --format ALL&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    dependencyCheckPublisher(</span></span>
<span class="line"><span class="__shiki_dzsirb">                        pattern</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;**/dependency-check-report.xml&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        unstableTotalHigh</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                        unstableTotalCritical</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span></span>
<span class="line"><span class="__shiki_140thh">                    )</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;部署到环境&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            when {</span></span>
<span class="line"><span class="__shiki_140thh">                expression { params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_TO</span><span class="__shiki_1itgoe"> !=</span><span class="__shiki_mdbnqw"> &#39;none&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 准备Kubernetes清单文件</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        sed -i &#39;s|__IMAGE_TAG__|\${DOCKER_IMAGE}|g&#39; k8s/deployment.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        sed -i &#39;s|__ENV__|\${params.DEPLOY_TO}|g&#39; k8s/configmap.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 使用kubectl部署</span></span>
<span class="line"><span class="__shiki_140thh">                    withKubeConfig([</span><span class="__shiki_dzsirb">credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;k8s-cluster&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                                  serverUrl</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;https://k8s-cluster.example.com&#39;</span><span class="__shiki_140thh">]) {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;kubectl apply -f k8s/&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                        </span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 等待部署完成</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            kubectl rollout status deployment/\${SERVICE} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            -n \${params.DEPLOY_TO} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            --timeout=300s</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;自动化验收测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            when {</span></span>
<span class="line"><span class="__shiki_140thh">                expression { params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_TO</span><span class="__shiki_1itgoe"> in</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;prod&#39;</span><span class="__shiki_140thh">] }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 运行API测试</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;newman run tests/api-collection.json&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 运行UI测试</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;npm run e2e&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    post {</span></span>
<span class="line"><span class="__shiki_140thh">        always {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 生成测试报告</span></span>
<span class="line"><span class="__shiki_140thh">            allure([</span></span>
<span class="line"><span class="__shiki_dzsirb">                includeProperties</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                jdk</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                properties</span><span class="__shiki_140thh">: [],</span></span>
<span class="line"><span class="__shiki_dzsirb">                reportBuildPolicy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ALWAYS&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                results</span><span class="__shiki_140thh">: [[</span><span class="__shiki_dzsirb">path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;target/allure-results&#39;</span><span class="__shiki_140thh">]]</span></span>
<span class="line"><span class="__shiki_140thh">            ])</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 清理资源</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (params</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEPLOY_TO</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;dev&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;kubectl delete -f k8s/ --ignore-not-found=true&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        success {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 更新部署记录</span></span>
<span class="line"><span class="__shiki_140thh">                withCredentials([string(</span><span class="__shiki_dzsirb">credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;slack-token&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_dzsirb">                                      variable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;SLACK_TOKEN&#39;</span><span class="__shiki_140thh">)]) {</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        curl -X POST \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        -H &#39;Authorization: Bearer </span><span class="__shiki_dzsirb">\\$</span><span class="__shiki_mdbnqw">SLACK_TOKEN&#39; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        -H &#39;Content-type: application/json&#39; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        --data &#39;{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;channel&quot;: &quot;#deployments&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                            &quot;text&quot;: &quot;\${SERVICE} v\${BUILD_ID} 已部署到 \${params.DEPLOY_TO}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        }&#39; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                        https://slack.com/api/chat.postMessage</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        failure {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 失败通知</span></span>
<span class="line"><span class="__shiki_140thh">            emailext(</span></span>
<span class="line"><span class="__shiki_dzsirb">                subject</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">\\$</span><span class="__shiki_mdbnqw">PROJECT_NAME - Build #</span><span class="__shiki_dzsirb">\\$</span><span class="__shiki_mdbnqw">BUILD_NUMBER - FAILED&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                body</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;检查构建失败原因: $BUILD_URL</span></span>
<span class="line"><span class="__shiki_mdbnqw">                </span></span>
<span class="line"><span class="__shiki_mdbnqw">                失败阶段: $STAGE_NAME</span></span>
<span class="line"><span class="__shiki_mdbnqw">                错误信息: 请查看详细日志&#39;&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;oncall-team@example.com&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_6-2-多分支流水线配置" tabindex="-1">6.2 多分支流水线配置 <a class="header-anchor" href="#_6-2-多分支流水线配置" aria-label="Permalink to &quot;6.2 多分支流水线配置&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile (在代码仓库根目录)</span></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    triggers {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // GitHub Webhook触发</span></span>
<span class="line"><span class="__shiki_140thh">        githubPush()</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 定期构建</span></span>
<span class="line"><span class="__shiki_140thh">        pollSCM(</span><span class="__shiki_mdbnqw">&#39;H/15 * * * *&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;检查PR状态&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            when {</span></span>
<span class="line"><span class="__shiki_140thh">                changeRequest()</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 检查PR是否可合并</span></span>
<span class="line"><span class="__shiki_1itgoe">                    def</span><span class="__shiki_140thh"> pr </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> githubPr</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">getProperty(</span><span class="__shiki_mdbnqw">&#39;pullRequest&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (pr</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">mergeable) {</span></span>
<span class="line"><span class="__shiki_140thh">                        echo </span><span class="__shiki_mdbnqw">&quot;PR #\${pr.number} 可合并&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                        error </span><span class="__shiki_mdbnqw">&quot;PR #\${pr.number} 存在冲突&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;运行特定测试集&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            when {</span></span>
<span class="line"><span class="__shiki_140thh">                branch </span><span class="__shiki_mdbnqw">&#39;release/*&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 发布分支运行完整测试</span></span>
<span class="line"><span class="__shiki_140thh">                sh </span><span class="__shiki_mdbnqw">&#39;mvn verify -Pfull-suite&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Jenkins多分支流水线配置</span></span>
<span class="line"><span class="__shiki_21nrsd">/*</span></span>
<span class="line"><span class="__shiki_21nrsd">1. 创建&quot;Multibranch Pipeline&quot;类型任务</span></span>
<span class="line"><span class="__shiki_21nrsd">2. 配置分支源（Git、GitHub、Bitbucket等）</span></span>
<span class="line"><span class="__shiki_21nrsd">3. 设置分支发现策略：</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 所有分支</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 仅PR</span></span>
<span class="line"><span class="__shiki_21nrsd">   - 按命名过滤（正则表达式）</span></span>
<span class="line"><span class="__shiki_21nrsd">4. 设置构建触发器</span></span>
<span class="line"><span class="__shiki_21nrsd">5. 配置Orchestration策略</span></span>
<span class="line"><span class="__shiki_21nrsd">*/</span></span></code></pre></div><h2 id="_7-最佳实践和优化建议" tabindex="-1">7. 最佳实践和优化建议 <a class="header-anchor" href="#_7-最佳实践和优化建议" aria-label="Permalink to &quot;7. 最佳实践和优化建议&quot;">​</a></h2><h3 id="_7-1-性能优化" tabindex="-1">7.1 性能优化 <a class="header-anchor" href="#_7-1-性能优化" aria-label="Permalink to &quot;7.1 性能优化&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 使用并行执行</span></span>
<span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;并行测试&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    parallel {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;单元测试&#39;</span><span class="__shiki_140thh">) { </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh">. }</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;集成测试&#39;</span><span class="__shiki_140thh">) { </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh">. }</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;静态分析&#39;</span><span class="__shiki_140thh">) { </span><span class="__shiki_1itgoe">..</span><span class="__shiki_140thh">. }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 缓存依赖</span></span>
<span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;缓存依赖&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    steps {</span></span>
<span class="line"><span class="__shiki_140thh">        cache(</span></span>
<span class="line"><span class="__shiki_dzsirb">            caches</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">                [ </span></span>
<span class="line"><span class="__shiki_dzsirb">                    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/root/.m2/repository&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    cacheId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;maven-deps&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    includes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;**/*&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                ],</span></span>
<span class="line"><span class="__shiki_140thh">                [</span></span>
<span class="line"><span class="__shiki_dzsirb">                    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;node_modules&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    cacheId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;npm-deps&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    includes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;**/*&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                ]</span></span>
<span class="line"><span class="__shiki_140thh">            ],</span></span>
<span class="line"><span class="__shiki_dzsirb">            cacheOperations</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;restore&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;save&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 增量构建</span></span>
<span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;增量构建&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    steps {</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            # 只编译变更的文件</span></span>
<span class="line"><span class="__shiki_mdbnqw">            find src -name &quot;*.java&quot; -newer target/last-build \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            | xargs javac -d target/classes</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-2-安全性考虑" tabindex="-1">7.2 安全性考虑 <a class="header-anchor" href="#_7-2-安全性考虑" aria-label="Permalink to &quot;7.2 安全性考虑&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 凭据管理</span></span>
<span class="line"><span class="__shiki_140thh">withCredentials([</span></span>
<span class="line"><span class="__shiki_140thh">    usernamePassword(</span></span>
<span class="line"><span class="__shiki_dzsirb">        credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;aws-credentials&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        usernameVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;AWS_ACCESS_KEY_ID&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        passwordVariable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;AWS_SECRET_ACCESS_KEY&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    ),</span></span>
<span class="line"><span class="__shiki_140thh">    string(</span></span>
<span class="line"><span class="__shiki_dzsirb">        credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;api-token&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        variable</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;API_TOKEN&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    )</span></span>
<span class="line"><span class="__shiki_140thh">]) {</span></span>
<span class="line"><span class="__shiki_140thh">    sh </span><span class="__shiki_mdbnqw">&#39;./deploy.sh&#39;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 敏感信息处理</span></span>
<span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;安全扫描&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    steps {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查硬编码的凭据</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&#39;trufflehog filesystem ./ --only-verified&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 检查依赖漏洞</span></span>
<span class="line"><span class="__shiki_140thh">        sh </span><span class="__shiki_mdbnqw">&#39;npm audit --audit-level=high&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 最小权限原则</span></span>
<span class="line"><span class="__shiki_140thh">agent {</span></span>
<span class="line"><span class="__shiki_140thh">    docker {</span></span>
<span class="line"><span class="__shiki_140thh">        image </span><span class="__shiki_mdbnqw">&#39;alpine:latest&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        args </span><span class="__shiki_mdbnqw">&#39;--user 1000:1000&#39;</span><span class="__shiki_21nrsd"> // 非root用户运行</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_7-3-监控和可观测性" tabindex="-1">7.3 监控和可观测性 <a class="header-anchor" href="#_7-3-监控和可观测性" aria-label="Permalink to &quot;7.3 监控和可观测性&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 构建指标收集</span></span>
<span class="line"><span class="__shiki_140thh">post {</span></span>
<span class="line"><span class="__shiki_140thh">    always {</span></span>
<span class="line"><span class="__shiki_140thh">        script {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 记录构建时长</span></span>
<span class="line"><span class="__shiki_1itgoe">            def</span><span class="__shiki_140thh"> duration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> currentBuild</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">duration</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                echo &quot;构建时长: \${duration/1000}秒&quot; &gt;&gt; metrics.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">                echo &quot;构建结果: \${currentBuild.currentResult}&quot; &gt;&gt; metrics.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 发送到监控系统</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                curl -X POST \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                -d &#39;{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;job&quot;: &quot;\${env.JOB_NAME}&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;build&quot;: \${env.BUILD_NUMBER},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;duration&quot;: \${duration},</span></span>
<span class="line"><span class="__shiki_mdbnqw">                    &quot;result&quot;: &quot;\${currentBuild.currentResult}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                }&#39; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">                http://metrics-server:9090/metrics</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 分布式追踪</span></span>
<span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;部署&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    steps {</span></span>
<span class="line"><span class="__shiki_140thh">        withEnv([</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;TRACE_ID=\${UUID.randomUUID().toString()}&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;SPAN_ID=deploy-span-1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ]) {</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                echo &quot;开始部署，追踪ID: $TRACE_ID&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                # 部署命令...</span></span>
<span class="line"><span class="__shiki_mdbnqw">                echo &quot;部署完成&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_8-故障排除和调试" tabindex="-1">8. 故障排除和调试 <a class="header-anchor" href="#_8-故障排除和调试" aria-label="Permalink to &quot;8. 故障排除和调试&quot;">​</a></h2><h3 id="_8-1-常见问题解决" tabindex="-1">8.1 常见问题解决 <a class="header-anchor" href="#_8-1-常见问题解决" aria-label="Permalink to &quot;8.1 常见问题解决&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. 调试模式</span></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    options {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 启用调试日志</span></span>
<span class="line"><span class="__shiki_140thh">        disableResume()</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 打印步骤执行时间</span></span>
<span class="line"><span class="__shiki_140thh">        timestamps()</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 保留失败的工作空间</span></span>
<span class="line"><span class="__shiki_140thh">        preserveStashes(</span><span class="__shiki_dzsirb">buildCount</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;调试示例&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_140thh">                script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 打印环境变量</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;env | sort&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 条件调试</span></span>
<span class="line"><span class="__shiki_1itgoe">                    if</span><span class="__shiki_140thh"> (env</span><span class="__shiki_1itgoe">.</span><span class="__shiki_dzsirb">DEBUG_MODE</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_mdbnqw"> &#39;true&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;set -x&#39;</span><span class="__shiki_21nrsd"> // 启用bash调试</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                    </span></span>
<span class="line"><span class="__shiki_21nrsd">                    // 使用try-catch处理异常</span></span>
<span class="line"><span class="__shiki_1itgoe">                    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                        sh </span><span class="__shiki_mdbnqw">&#39;可能会失败的命令&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">Exception</span><span class="__shiki_140thh"> e) {</span></span>
<span class="line"><span class="__shiki_140thh">                        echo </span><span class="__shiki_mdbnqw">&quot;命令失败: \${e.getMessage()}&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 记录到文件</span></span>
<span class="line"><span class="__shiki_140thh">                        writeFile </span><span class="__shiki_dzsirb">file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;error.log&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">text</span><span class="__shiki_140thh">: e</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">toString()</span></span>
<span class="line"><span class="__shiki_21nrsd">                        // 继续执行</span></span>
<span class="line"><span class="__shiki_140thh">                        currentBuild</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">result </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;UNSTABLE&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                    }</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. 资源清理</span></span>
<span class="line"><span class="__shiki_140thh">post {</span></span>
<span class="line"><span class="__shiki_140thh">    always {</span></span>
<span class="line"><span class="__shiki_140thh">        script {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 清理Docker资源</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                docker system prune -f || true</span></span>
<span class="line"><span class="__shiki_mdbnqw">                docker volume prune -f || true</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 清理临时文件</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&#39;find /tmp -name &quot;jenkins*&quot; -mtime +1 -delete&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-扩展和集成" tabindex="-1">9. 扩展和集成 <a class="header-anchor" href="#_9-扩展和集成" aria-label="Permalink to &quot;9. 扩展和集成&quot;">​</a></h2><h3 id="_9-1-与外部系统集成" tabindex="-1">9.1 与外部系统集成 <a class="header-anchor" href="#_9-1-与外部系统集成" aria-label="Permalink to &quot;9.1 与外部系统集成&quot;">​</a></h3><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 1. Jira集成</span></span>
<span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;更新Jira&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    steps {</span></span>
<span class="line"><span class="__shiki_140thh">        script {</span></span>
<span class="line"><span class="__shiki_1itgoe">            def</span><span class="__shiki_140thh"> issues </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jiraIssueSearch(</span><span class="__shiki_dzsirb">jql</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;project = PROJ AND fixVersion = &quot;next&quot;&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_140thh">            issues</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">each { </span><span class="__shiki_1jdh33">issue</span><span class="__shiki_1itgoe"> -&gt;</span></span>
<span class="line"><span class="__shiki_140thh">                jiraAddComment(</span></span>
<span class="line"><span class="__shiki_dzsirb">                    idOrKey</span><span class="__shiki_140thh">: issue</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">key,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    comment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;构建 #\${BUILD_NUMBER} 已通过测试&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    site</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;jira-site&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                jiraTransitionIssue(</span></span>
<span class="line"><span class="__shiki_dzsirb">                    idOrKey</span><span class="__shiki_140thh">: issue</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">key,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    input</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">transition</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;31&#39;</span><span class="__shiki_140thh">]], </span><span class="__shiki_21nrsd">// 转移到&quot;待发布&quot;状态</span></span>
<span class="line"><span class="__shiki_dzsirb">                    site</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;jira-site&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 2. Slack通知</span></span>
<span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;通知团队&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    steps {</span></span>
<span class="line"><span class="__shiki_140thh">        script {</span></span>
<span class="line"><span class="__shiki_140thh">            slackSend(</span></span>
<span class="line"><span class="__shiki_dzsirb">                channel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;#build-notifications&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                color</span><span class="__shiki_140thh">: currentBuild</span><span class="__shiki_1itgoe">.</span><span class="__shiki_140thh">currentResult </span><span class="__shiki_1itgoe">==</span><span class="__shiki_mdbnqw"> &#39;SUCCESS&#39;</span><span class="__shiki_1itgoe"> ?</span><span class="__shiki_mdbnqw"> &#39;good&#39;</span><span class="__shiki_1itgoe"> :</span><span class="__shiki_mdbnqw"> &#39;danger&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                message</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                *\${env.JOB_NAME}* 构建完成</span></span>
<span class="line"><span class="__shiki_mdbnqw">                *状态*: \${currentBuild.currentResult}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                *构建号*: \${env.BUILD_NUMBER}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                *分支*: \${env.GIT_BRANCH}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                *变更*: \${env.CHANGE_TITLE ?: &#39;无&#39;}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                *详情*: \${env.BUILD_URL}</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">            )</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 3. 发送自定义报告</span></span>
<span class="line"><span class="__shiki_140thh">stage(</span><span class="__shiki_mdbnqw">&#39;生成报告&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    steps {</span></span>
<span class="line"><span class="__shiki_140thh">        script {</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 生成HTML报告</span></span>
<span class="line"><span class="__shiki_140thh">            sh </span><span class="__shiki_mdbnqw">&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                cat &gt; report.html &lt;&lt; EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &lt;html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &lt;body&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &lt;h1&gt;构建报告 #\${BUILD_NUMBER}&lt;/h1&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &lt;p&gt;状态: \${currentBuild.currentResult}&lt;/p&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &lt;p&gt;测试通过率: 95%&lt;/p&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &lt;/body&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &lt;/html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">                EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            // 上传到S3</span></span>
<span class="line"><span class="__shiki_140thh">            withAWS(</span><span class="__shiki_dzsirb">credentials</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;aws-creds&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                s3Upload(</span></span>
<span class="line"><span class="__shiki_dzsirb">                    file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;report.html&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    bucket</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;build-reports&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                    path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;\${env.JOB_NAME}/\${BUILD_NUMBER}/&quot;</span></span>
<span class="line"><span class="__shiki_140thh">                )</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_10-总结" tabindex="-1">10. 总结 <a class="header-anchor" href="#_10-总结" aria-label="Permalink to &quot;10. 总结&quot;">​</a></h2><h3 id="_10-1-关键要点" tabindex="-1">10.1 关键要点 <a class="header-anchor" href="#_10-1-关键要点" aria-label="Permalink to &quot;10.1 关键要点&quot;">​</a></h3><ol><li><strong>Pipeline as Code</strong>：所有配置都应版本控制</li><li><strong>模块化设计</strong>：使用共享库和函数</li><li><strong>失败快速</strong>：尽早发现和报告问题</li><li><strong>安全性</strong>：凭据管理和安全扫描</li><li><strong>可观测性</strong>：监控和日志记录</li></ol><h3 id="_10-2-持续改进" tabindex="-1">10.2 持续改进 <a class="header-anchor" href="#_10-2-持续改进" aria-label="Permalink to &quot;10.2 持续改进&quot;">​</a></h3><ul><li>定期审查流水线性能</li><li>收集团队反馈进行优化</li><li>跟踪构建指标和趋势</li><li>及时更新插件和工具链</li></ul><h3 id="_10-3-资源推荐" tabindex="-1">10.3 资源推荐 <a class="header-anchor" href="#_10-3-资源推荐" aria-label="Permalink to &quot;10.3 资源推荐&quot;">​</a></h3><ol><li><strong>官方文档</strong>：<a href="https://www.jenkins.io/doc/book/pipeline/" target="_blank" rel="noreferrer">https://www.jenkins.io/doc/book/pipeline/</a></li><li><strong>插件市场</strong>：<a href="https://plugins.jenkins.io/" target="_blank" rel="noreferrer">https://plugins.jenkins.io/</a></li><li><strong>最佳实践</strong>：<a href="https://www.jenkins.io/doc/book/pipeline/best-practices/" target="_blank" rel="noreferrer">https://www.jenkins.io/doc/book/pipeline/best-practices/</a></li><li><strong>社区资源</strong>：Jenkins YouTube频道、博客、用户组</li></ol><p>这份学习笔记涵盖了Jenkins流水线设计的核心概念和实践方法。建议结合实际项目需求，从简单流水线开始，逐步增加复杂功能，持续优化和改进流水线设计。</p>`,60)])])}const o=a(_,[["render",l]]);export{r as __pageData,o as default};
