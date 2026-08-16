import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const t="/img/cicd/pipeline%E7%BB%93%E6%9E%84%E5%9B%BE.png",_="/img/cicd/%E6%B5%81%E6%B0%B4%E7%BA%BF%E7%94%9F%E6%88%90%E8%AF%AD%E6%B3%951.png",l="/img/cicd/%E6%B5%81%E6%B0%B4%E7%BA%BF%E7%94%9F%E6%88%90%E8%AF%AD%E6%B3%952.png",e="/img/cicd/%E6%96%B0%E5%BB%BApipeline%E4%BB%BB%E5%8A%A1.png",h="/img/cicd/%E5%8F%82%E6%95%B0%E5%8C%96%E6%9E%84%E5%BB%BA.png",c="/img/cicd/PipelineScript.png",k="/img/cicd/Pipeline-script-from-SCM.png",r="/img/cicd/%E6%A0%B9%E7%9B%AE%E5%BD%95%E6%96%B0%E5%BB%BAJenkinsfile%E6%96%87%E4%BB%B6.png",o="/img/cicd/%E5%AE%89%E8%A3%85webhook%E6%8F%92%E4%BB%B6.png",d="/img/cicd/%E9%85%8D%E7%BD%AEGeneric-Webhook-Trigger-Plugin1.png",b="/img/cicd/%E9%85%8D%E7%BD%AEGeneric-Webhook-Trigger-Plugin2.png",u="/img/cicd/%E9%85%8D%E7%BD%AEGeneric-Webhook-Trigger-Plugin3.png",S=JSON.parse('{"title":"🤖 Jenkins pipeline","description":"","frontmatter":{},"headers":[],"relativePath":"devops/cicd/jenkins/pipeline.md","filePath":"devops/cicd/jenkins/pipeline.md"}'),q={name:"devops/cicd/jenkins/pipeline.md"};function m(g,s,w,f,z,P){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="🤖-jenkins-pipeline" tabindex="-1">🤖 Jenkins pipeline <a class="header-anchor" href="#🤖-jenkins-pipeline" aria-label="Permalink to &quot;🤖 Jenkins pipeline&quot;">​</a></h1><h2 id="_1-jenkins-pipeline-知识点" tabindex="-1">1 Jenkins pipeline 知识点 <a class="header-anchor" href="#_1-jenkins-pipeline-知识点" aria-label="Permalink to &quot;1 Jenkins pipeline 知识点&quot;">​</a></h2><blockquote><p>Jenkins Pipeline以代码的方式实现了持续集成和持续交付（CI/CD）的自动化，通过编写脚本，开发者可以定义包括构建、测试、部署和监控等步骤在内的复杂流程。</p></blockquote><p>学习pipeline前，请保证你已经掌握前面的知识点，docker、jenkins、jenkins freestyle project。</p><h3 id="_1-1-jenkins-pipeline-主要特性" tabindex="-1">1.1 Jenkins pipeline 主要特性 <a class="header-anchor" href="#_1-1-jenkins-pipeline-主要特性" aria-label="Permalink to &quot;1.1 Jenkins pipeline 主要特性&quot;">​</a></h3><ul><li>代码化配置：Pipeline 的配置通过代码（Jenkinsfile）进行管理，这意味着配置可以随着代码一起存储在版本控制系统中，便于版本控制和团队协作。</li><li>可视化界面：Jenkins 提供了直观的 Web 界面来显示 Pipeline 的执行状态和结果，包括每个阶段的执行时间、日志输出等详细信息。</li><li>灵活性：Pipeline 支持多种类型的节点（Node）和阶段（Stage），允许用户根据具体需求定制流水线的结构和行为。</li><li>并行执行：Pipeline 支持在同一流水线中并行执行多个阶段或任务，从而进一步提高执行效率。</li><li>条件执行：Pipeline 允许根据前置条件或执行结果来决定是否执行某个阶段或任务，增加了流程的灵活性和智能性。</li></ul><br><h3 id="_1-2-jenkins-pipeline-流水线语法" tabindex="-1">1.2 Jenkins pipeline 流水线语法 <a class="header-anchor" href="#_1-2-jenkins-pipeline-流水线语法" aria-label="Permalink to &quot;1.2 Jenkins pipeline 流水线语法&quot;">​</a></h3><p>流水线语法分为声明式（Declarative）和脚本化（Scripted）两种。</p><p>官网推荐声明式写法，理由：简洁、简单、社区流行（推动后续版本更好的支持）。</p><p>故本文会主要介绍 Declarative 声明式写法。</p><h4 id="_1-2-1-declarative-声明式" tabindex="-1">1.2.1 Declarative 声明式 <a class="header-anchor" href="#_1-2-1-declarative-声明式" aria-label="Permalink to &quot;1.2.1 Declarative 声明式&quot;">​</a></h4><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile (Declarative Pipeline)</span></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any	</span><span class="__shiki_21nrsd">// 1.在任何可用的代理上，执行流水线或它的任何阶段。</span></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;Build&#39;</span><span class="__shiki_140thh">) {	</span><span class="__shiki_21nrsd">// 2.定义 &quot;Build&quot; 阶段。</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 3.执行与 &quot;Build&quot; 阶段相关的步骤。</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;Test&#39;</span><span class="__shiki_140thh">) {	</span><span class="__shiki_21nrsd">// 4.定义&quot;Test&quot; 阶段。</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 5.执行与&quot;Test&quot; 阶段相关的步骤。</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        stage(</span><span class="__shiki_mdbnqw">&#39;Deploy&#39;</span><span class="__shiki_140thh">) {	</span><span class="__shiki_21nrsd">// 6.定义 &quot;Deploy&quot; 阶段。</span></span>
<span class="line"><span class="__shiki_140thh">            steps {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 7.执行与 &quot;Deploy&quot; 阶段相关的步骤。</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h4 id="_1-2-2-scripted-脚本化" tabindex="-1">1.2.2 Scripted 脚本化 <a class="header-anchor" href="#_1-2-2-scripted-脚本化" aria-label="Permalink to &quot;1.2.2 Scripted 脚本化&quot;">​</a></h4><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile (Scripted Pipeline)</span></span>
<span class="line"><span class="__shiki_140thh">node {	</span><span class="__shiki_21nrsd">// 1.在任何可用的代理上，执行流水线或它的任何阶段。</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;Build&#39;</span><span class="__shiki_140thh">) {	</span><span class="__shiki_21nrsd">// 2.定义 &quot;Build&quot; 阶段。 stage 块 在脚本化流水线语法中是可选的。 然而, 在脚本化流水线中实现 stage 块 ，可以清楚的显示Jenkins UI中的每个 stage 的任务子集。</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 3.执行与 &quot;Build&quot; 阶段相关的步骤。</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;Test&#39;</span><span class="__shiki_140thh">) {	</span><span class="__shiki_21nrsd">// 4.定义&quot;Test&quot; 阶段。</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 5.执行与 &quot;Test&quot; 阶段相关的步骤。</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    stage(</span><span class="__shiki_mdbnqw">&#39;Deploy&#39;</span><span class="__shiki_140thh">) {	</span><span class="__shiki_21nrsd">// 6.定义 &quot;Deploy&quot; 阶段。</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 7.执行与 &quot;Deploy&quot; 阶段相关的步骤。</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><br><br><h3 id="_1-3-jenkins-pipeline-结构" tabindex="-1">1.3 Jenkins pipeline 结构 <a class="header-anchor" href="#_1-3-jenkins-pipeline-结构" aria-label="Permalink to &quot;1.3 Jenkins pipeline 结构&quot;">​</a></h3><p><img src="`+t+'" alt="pipeline 结构图" loading="lazy"></p><p><a href="https://www.lfhacks.com/tech/jenkins-declarative-pipeline/" target="_blank" rel="noreferrer">🚀 pipeline 结构图 参考资料 </a></p><ul><li>pipeline <ul><li>顶层定义：整个持续集成/持续部署(CI/CD)流程的容器，整个流水线的顶层定义。</li><li>包含元素：agent, environment, triggers, libraries, options, parameters, tools, stages。</li></ul></li><li>agent <ul><li>定义：用于指定所在模块（pipeline、stage）的运行环境，可以是Jenkins 节点机或者 docker 容器。</li><li>位置：可在Pipeline顶层定义，也可在Stage级别定义以覆盖顶层设置。</li></ul></li><li>environment <ul><li>定义：指定所在模块（pipeline、stage）的环境变量。</li><li>位置：可在Pipeline顶层或Stage级别定义。</li></ul></li><li>triggers <ul><li>定义：定义触发Pipeline运行的条件，如代码提交、定时任务等。</li><li>位置：通常位于Pipeline顶层。</li></ul></li><li>libraries <ul><li>定义：引用外部Jenkins共享库，以便重用代码和Pipeline模板。</li><li>位置：在Pipeline顶层通过libraries指令引用。</li></ul></li><li>options <ul><li>定义：配置Pipeline的运行选项，如重试失败的步骤、跳过默认阶段等。</li><li>位置：在Pipeline顶层定义。</li></ul></li><li>parameters <ul><li>定义：定义Pipeline运行时可输入的参数，如分支名、版本号等。</li><li>位置：在Pipeline顶层定义，用于手动触发Pipeline时输入。</li></ul></li><li>tools <ul><li>定义：指定Pipeline或Stage级别需要使用的工具，如Node、Maven、Gradle等。</li><li>位置：可在Pipeline顶层或Stage级别定义。</li></ul></li><li>stages <ul><li>定义：Pipeline中的逻辑分组，代表了一系列任务的集合。</li><li>包含元素：至少包含一个stage。</li></ul></li><li>stage <ul><li>定义：Pipeline中的一个阶段，包含一系列步骤（Steps）。</li><li>包含元素：agent, environment, tools, input, when, steps。</li></ul></li><li>agent (Stage级别) <ul><li>定义（同Pipeline级别）：指定当前Stage运行在哪个节点上。</li><li>位置：在Stage内部定义。</li></ul></li><li>environment (Stage级别) <ul><li>定义（同Pipeline级别）：设置当前Stage级别的环境变量。</li><li>位置：在Stage内部定义。</li></ul></li><li>tools (Stage级别) <ul><li>定义（同Pipeline级别）：指定当前Stage需要使用的工具。</li><li>位置：在Stage内部定义。</li></ul></li><li>input <ul><li>定义：允许Pipeline在执行到某个Stage时暂停，等待用户输入或确认。</li><li>位置：在Stage内部定义。</li></ul></li><li>when <ul><li>定义：根据条件判断是否执行当前Stage或步骤。</li><li>位置：在Stage或步骤（Steps）级别定义。</li></ul></li><li>steps <ul><li>定义：Stage中的具体执行步骤，如编译代码、运行测试等。</li><li>执行语句：使用Pipeline DSL或Groovy脚本定义的具体命令或操作。</li></ul></li><li>post <ul><li>定义：定义Pipeline或Stage执行完成后的操作，如发送通知、清理工作区等。- 位置：在Pipeline或Stage末尾定义。</li><li>包含条件：always, success, failure, unstable, changed, aborted等，用于指定不同执行结果下的操作。</li></ul></li></ul><p>上述结构只需要了解，使用的时候直接用生成器生成。</p><p><img src="'+_+'" alt="流水线生成语法1" loading="lazy"></p><p><img src="'+l+'" alt="流水线生成语法2" loading="lazy"></p><br><br><h2 id="_2-jenkins-pipeline-实战" tabindex="-1">2 Jenkins pipeline 实战 <a class="header-anchor" href="#_2-jenkins-pipeline-实战" aria-label="Permalink to &quot;2 Jenkins pipeline 实战&quot;">​</a></h2><h3 id="_2-1-新建pipeline任务" tabindex="-1">2.1 新建pipeline任务 <a class="header-anchor" href="#_2-1-新建pipeline任务" aria-label="Permalink to &quot;2.1 新建pipeline任务&quot;">​</a></h3><p><img src="'+e+'" alt="新建pipeline任务" loading="lazy"></p><br><br><h3 id="_2-2-git-paramater-参数化构建" tabindex="-1">2.2 Git Paramater 参数化构建 <a class="header-anchor" href="#_2-2-git-paramater-参数化构建" aria-label="Permalink to &quot;2.2 Git Paramater 参数化构建&quot;">​</a></h3><p><img src="'+h+'" alt="参数化构建" loading="lazy"></p><br><br><h3 id="_2-3-jenkins-pipeline-生成方式" tabindex="-1">2.3 Jenkins pipeline 生成方式 <a class="header-anchor" href="#_2-3-jenkins-pipeline-生成方式" aria-label="Permalink to &quot;2.3 Jenkins pipeline 生成方式&quot;">​</a></h3><p>Jenkins 流水线的定义有两种方式：Pipeline script 和 Pipeline script from SCM。推荐Pipeline script from SCM</p><h4 id="_2-3-1-pipeline-script" tabindex="-1">2.3.1 Pipeline script <a class="header-anchor" href="#_2-3-1-pipeline-script" aria-label="Permalink to &quot;2.3.1 Pipeline script&quot;">​</a></h4><p>直接在Jenkins页面上写，硬编码在Jenkins服务器上，在线编辑、固定内容不灵活</p><p><img src="'+c+'" alt="Pipeline script" loading="lazy"></p><h4 id="_2-3-2-pipeline-script-from-scm" tabindex="-1">2.3.2 Pipeline script from SCM <a class="header-anchor" href="#_2-3-2-pipeline-script-from-scm" aria-label="Permalink to &quot;2.3.2 Pipeline script from SCM&quot;">​</a></h4><p>创建一个 Jenkinsfile 文件 并将其检入源代码控制仓库是最佳实践</p><p><img src="'+k+'" alt="Pipeline script from SCM" loading="lazy"></p><br><br><h3 id="_2-4-项目根目录新建-jenkinsfile-文件" tabindex="-1">2.4 项目根目录新建 Jenkinsfile 文件 <a class="header-anchor" href="#_2-4-项目根目录新建-jenkinsfile-文件" aria-label="Permalink to &quot;2.4 项目根目录新建 Jenkinsfile 文件&quot;">​</a></h3><p><img src="'+r+'" alt="根目录新建Jenkinsfile文件" loading="lazy"></p><br><h3 id="_2-5-安装-generic-webhook-trigger-plugin-插件" tabindex="-1">2.5 安装 Generic Webhook Trigger Plugin 插件 <a class="header-anchor" href="#_2-5-安装-generic-webhook-trigger-plugin-插件" aria-label="Permalink to &quot;2.5 安装 Generic Webhook Trigger Plugin 插件&quot;">​</a></h3><p>前面文章介绍安装github webhook 插件来完成代码提交触发流水线的功能，那个处理github的webhook。</p><p>这次换成gitee 的 webhook，所以需要安装另外个更通用的插件，这个插件可以处理大部分的webhook。</p><p>Jenkins 插件管理页面搜索 Generic Webhook Trigger Plugin</p><p><img src="'+o+'" alt="安装webhook插件" loading="lazy"></p><p><a href="https://plugins.jenkins.io/generic-webhook-trigger/" target="_blank" rel="noreferrer">🚀 generic-webhook-trigger 文档</a></p><p>配置Generic Webhook Trigger Plugin</p><p><img src="'+d+'" alt="配置Generic-Webhook-Trigger-Plugin1" loading="lazy"></p><p><img src="'+b+'" alt="配置Generic-Webhook-Trigger-Plugin2" loading="lazy"></p><p><img src="'+u+`" alt="配置Generic-Webhook-Trigger-Plugin3" loading="lazy"></p><h3 id="_2-6-编写jenkisnfile" tabindex="-1">2.6 编写Jenkisnfile <a class="header-anchor" href="#_2-6-编写jenkisnfile" aria-label="Permalink to &quot;2.6 编写Jenkisnfile&quot;">​</a></h3><p>回到项目里Jenkisnfile文件里</p><div class="language-groovy vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">groovy</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// Jenkinsfile (Declarative Pipeline)</span></span>
<span class="line"><span class="__shiki_140thh">pipeline {</span></span>
<span class="line"><span class="__shiki_140thh">    agent any</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">		// 全局环境变量 为了和jenkins自带的环境变量区分。\${env.GIT_REPO}</span></span>
<span class="line"><span class="__shiki_140thh">		environment {</span></span>
<span class="line"><span class="__shiki_dzsirb">			GIT_REPO</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> &#39;https://gitee.com/paul958320/React18_Vite4_Admin.git&#39;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">		// 选择node,git版本</span></span>
<span class="line"><span class="__shiki_140thh">		tools {</span></span>
<span class="line"><span class="__shiki_140thh">			nodejs </span><span class="__shiki_mdbnqw">&#39;NodeJS 16.17.0&#39;</span></span>
<span class="line"><span class="__shiki_140thh">			git </span><span class="__shiki_mdbnqw">&#39;Default&#39;</span></span>
<span class="line"><span class="__shiki_140thh">		}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">		// 参数化共建</span></span>
<span class="line"><span class="__shiki_140thh">    parameters {</span></span>
<span class="line"><span class="__shiki_140thh">			gitParameter(</span></span>
<span class="line"><span class="__shiki_dzsirb">					name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;GIT_BRANCH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					branch</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					branchFilter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;origin/(.*)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;origin/dev&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;请选择部署分支&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					quickFilterEnabled</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					requiredParameter</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					selectedValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;DEFAULT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					sortMode</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ASCENDING_SMART&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					tagFilter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;*&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">					type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;GitParameterDefinition&#39;</span></span>
<span class="line"><span class="__shiki_140thh">			)</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">		// webhook trigger触发器</span></span>
<span class="line"><span class="__shiki_140thh">    triggers {</span></span>
<span class="line"><span class="__shiki_1itgoe">      GenericTrigger</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_dzsirb">        causeString</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Triggered on Gitee Webhook&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        genericRequestVariables</span><span class="__shiki_140thh">: [[</span><span class="__shiki_dzsirb">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">regexpFilter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">]],    </span><span class="__shiki_21nrsd">// 请求体提取信息，暂不需要，有些插件版本不兼容genericVariables</span></span>
<span class="line"><span class="__shiki_dzsirb">        genericHeaderVariables</span><span class="__shiki_140thh">: [[</span><span class="__shiki_dzsirb">key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">regexpFilter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">]],    </span><span class="__shiki_21nrsd">// 请求头部提取信息，暂不需要</span></span>
<span class="line"><span class="__shiki_dzsirb">        genericVariables</span><span class="__shiki_140thh">: [	    </span><span class="__shiki_21nrsd">// 请求体body中提取信息</span></span>
<span class="line"><span class="__shiki_140thh">					[</span></span>
<span class="line"><span class="__shiki_dzsirb">						key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ref&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$.ref&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						regexpFilter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;^(refs/heads/|refs/remotes/origin/)&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						expressionType</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&#39;JSONPath&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//Optional, defaults to JSONPath</span></span>
<span class="line"><span class="__shiki_dzsirb">						defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//Optional, defaults to empty string</span></span>
<span class="line"><span class="__shiki_140thh">					],</span></span>
<span class="line"><span class="__shiki_140thh">					[</span></span>
<span class="line"><span class="__shiki_dzsirb">						key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;clone_url&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$.repository.clone_url&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						regexpFilter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						expressionType</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&#39;JSONPath&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//Optional, defaults to JSONPath</span></span>
<span class="line"><span class="__shiki_dzsirb">						defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//Optional, defaults to empty string</span></span>
<span class="line"><span class="__shiki_140thh">					],</span></span>
<span class="line"><span class="__shiki_140thh">					[</span></span>
<span class="line"><span class="__shiki_dzsirb">						key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;changed_files&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$.commits[*].[</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">modified</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">added</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">removed</span><span class="__shiki_dzsirb">\\&#39;</span><span class="__shiki_mdbnqw">][*]&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						expressionType</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&#39;JSONPath&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">//Optional, defaults to JSONPath</span></span>
<span class="line"><span class="__shiki_dzsirb">						regexpFilter</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">						defaultValue</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">					]</span></span>
<span class="line"><span class="__shiki_140thh">				],</span></span>
<span class="line"><span class="__shiki_dzsirb">        printContributedVariables</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 打印所有通过genericVariables提取的变量</span></span>
<span class="line"><span class="__shiki_dzsirb">        printPostContent</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 打印触发构建时接收到的POST请求的内容</span></span>
<span class="line"><span class="__shiki_dzsirb">				silentResponse</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,	</span><span class="__shiki_21nrsd">// 对收到的触发请求返回响应</span></span>
<span class="line"><span class="__shiki_dzsirb">				shouldNotFlatten</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,	</span><span class="__shiki_21nrsd">// 不需要对提取的数据进行扁平化处理(嵌套数据结构)</span></span>
<span class="line"><span class="__shiki_dzsirb">        tokenCredentialId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;GITEE_WEBHOOK_SECRET&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// github webhook secrect 配置后请求头会带上 X-Hub-Signature-256: sha256=203a39e9d753415ded57e09710ecf9e98b694a6f0c8d530b65ef90d35bede405</span></span>
<span class="line"><span class="__shiki_dzsirb">        token</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 可选token，没有设置</span></span>
<span class="line"><span class="__shiki_dzsirb">        regexpFilterExpression</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">        regexpFilterText</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      )</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    stages {</span></span>
<span class="line"><span class="__shiki_140thh">			stage(</span><span class="__shiki_mdbnqw">&#39;Cleanup Workspace&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">				steps {</span></span>
<span class="line"><span class="__shiki_140thh">					sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;查看当前所在文件路径&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						pwd</span></span>
<span class="line"><span class="__shiki_mdbnqw">					&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					echo </span><span class="__shiki_mdbnqw">&quot;开始清理工作空间&quot;</span></span>
<span class="line"><span class="__shiki_140thh">					cleanWs()</span></span>
<span class="line"><span class="__shiki_140thh">					echo  </span><span class="__shiki_mdbnqw">&quot;清理工作空间结束&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">					// 或者，使用自定义配置来清理工作空间</span></span>
<span class="line"><span class="__shiki_21nrsd">					// cleanWs(</span></span>
<span class="line"><span class="__shiki_21nrsd">					//     exclude: &#39;**/some-directory/**&#39;,</span><span class="__shiki_21nrsd"> // 排除不删除的目录</span></span>
<span class="line"><span class="__shiki_21nrsd">					//     fingerprintCleanup: true,</span><span class="__shiki_21nrsd">       // 清理指纹信息</span></span>
<span class="line"><span class="__shiki_21nrsd">					//     when: &#39;before&#39;</span><span class="__shiki_21nrsd">                  // 在什么时候执行清理，默认为&#39;after&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">					// )</span></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">			stage(</span><span class="__shiki_mdbnqw">&#39;Pull Code&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">				steps {</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;查看当前所在文件路径&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						pwd</span></span>
<span class="line"><span class="__shiki_mdbnqw">					&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					echo </span><span class="__shiki_mdbnqw">&quot;开始clone代码&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					echo  </span><span class="__shiki_mdbnqw">&quot;ref \${ref}&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">					// echo  &quot;clone_url \${clone_url}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">					echo  </span><span class="__shiki_mdbnqw">&quot;GIT_REPO \${env.GIT_REPO}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">					echo  </span><span class="__shiki_mdbnqw">&quot;GIT_BRANCH \${env.GIT_BRANCH}&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">					// checkout scmGit(</span></span>
<span class="line"><span class="__shiki_21nrsd">					// 	branches: [[name: &#39;$GIT_BRANCH&#39;]],</span></span>
<span class="line"><span class="__shiki_21nrsd">					// 	extensions: [],</span></span>
<span class="line"><span class="__shiki_21nrsd">					// 	userRemoteConfigs: [</span></span>
<span class="line"><span class="__shiki_21nrsd">					// 		[url: &quot;\${clone_url}&quot;,credentialsId: &quot;GITHUB_PERSONAL_ACCESS_TOKEN&quot;]</span></span>
<span class="line"><span class="__shiki_21nrsd">					// 	]</span></span>
<span class="line"><span class="__shiki_21nrsd">					// )</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					checkout scmGit(</span></span>
<span class="line"><span class="__shiki_dzsirb">						branches</span><span class="__shiki_140thh">: [[</span><span class="__shiki_dzsirb">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$ref&#39;</span><span class="__shiki_140thh">]],</span></span>
<span class="line"><span class="__shiki_dzsirb">						extensions</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">							cleanBeforeCheckout(</span><span class="__shiki_dzsirb">deleteUntrackedNestedRepositories</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">							cleanAfterCheckout(</span><span class="__shiki_dzsirb">deleteUntrackedNestedRepositories</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">						],</span></span>
<span class="line"><span class="__shiki_dzsirb">						userRemoteConfigs</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_21nrsd">							// [ url: &#39;\${clone_url}&#39;，name:&#39;origin&#39;, credentialsId: &#39;GITHUB_PERSONAL_ACCESS_TOKEN&#39;,],</span></span>
<span class="line"><span class="__shiki_140thh">							[</span></span>
<span class="line"><span class="__shiki_dzsirb">								url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;\${env.GIT_REPO}&quot;</span><span class="__shiki_140thh">,	</span><span class="__shiki_21nrsd">// 仓库地址</span></span>
<span class="line"><span class="__shiki_dzsirb">								name</span><span class="__shiki_140thh">:</span><span class="__shiki_mdbnqw">&quot;gitee&quot;</span><span class="__shiki_140thh">,	</span><span class="__shiki_21nrsd">// 仓库remote</span></span>
<span class="line"><span class="__shiki_dzsirb">								credentialsId</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;GITEE_PERSONAL_ACCESS_TOKEN&quot;</span><span class="__shiki_21nrsd">	// 仓库token</span></span>
<span class="line"><span class="__shiki_140thh">						  ]</span></span>
<span class="line"><span class="__shiki_140thh">						]</span></span>
<span class="line"><span class="__shiki_140thh">					)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					echo  </span><span class="__shiki_mdbnqw">&quot;clone代码成功&quot;</span></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">				// when {</span></span>
<span class="line"><span class="__shiki_21nrsd">				// 	triggeredBy &#39;Triggered on GitHub Webhook&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">				// 	beforeOptions true</span></span>
<span class="line"><span class="__shiki_21nrsd">				// 	beforeInput true</span></span>
<span class="line"><span class="__shiki_21nrsd">				// 	beforeAgent true</span></span>
<span class="line"><span class="__shiki_21nrsd">				// }</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">			stage(</span><span class="__shiki_mdbnqw">&#39;Install Dependencies&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">				steps {</span></span>
<span class="line"><span class="__shiki_140thh">					echo </span><span class="__shiki_mdbnqw">&quot;开始安装依赖&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo  &quot;安装依赖前 检查环境...&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;查看当前所在文件路径&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						pwd</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;检查 Node.js 版本：&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						node -v</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">						npm config set registry https://registry.npmmirror.com</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;检查 npm 镜像源：&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						npm config get registry</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">						npm install -g pnpm@8.6.0</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;检查 pnpm 版本：&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						pnpm -v</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">						pnpm config set registry https://registry.npmmirror.com</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;pnpm 镜像源：&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						pnpm config get registry</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;检查环境 通过...&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;开始安装依赖...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						pnpm install || { echo &quot;安装依赖失败&quot;; exit 1; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo  &quot;安装依赖成功&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					echo  </span><span class="__shiki_mdbnqw">&quot;安装依赖成功&quot;</span></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">			stage(</span><span class="__shiki_mdbnqw">&#39;Build Project&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">				steps {</span></span>
<span class="line"><span class="__shiki_140thh">					echo </span><span class="__shiki_mdbnqw">&quot;开始构建项目&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;查看当前所在文件路径&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						pwd</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">						# 清理旧的 dist 目录</span></span>
<span class="line"><span class="__shiki_mdbnqw">						echo &quot;清理dist&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						rm -rf ./dist</span></span>
<span class="line"><span class="__shiki_mdbnqw">						# 这里是用你项目里的打包脚本，比如你的可能是npm run build</span></span>
<span class="line"><span class="__shiki_mdbnqw">						npm run build:jenkins || { echo &quot;构建失败&quot;; exit 1; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">					&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					echo </span><span class="__shiki_mdbnqw">&quot;构建项目成功&quot;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					echo </span><span class="__shiki_mdbnqw">&quot;开始打包&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					sh </span><span class="__shiki_mdbnqw">&quot;&quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						# 每次构建删除已存在的dist压缩包</span></span>
<span class="line"><span class="__shiki_mdbnqw">						rm -rf dist.tar</span></span>
<span class="line"><span class="__shiki_mdbnqw">						# 将dist文件压缩成dist.tar</span></span>
<span class="line"><span class="__shiki_mdbnqw">						tar -zcvf dist.tar ./dist</span></span>
<span class="line"><span class="__shiki_mdbnqw">						if [ </span><span class="__shiki_dzsirb">\\$</span><span class="__shiki_mdbnqw">? -eq 0 ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">								echo &quot;打包成功&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">						else</span></span>
<span class="line"><span class="__shiki_mdbnqw">								echo &quot;打包失败&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">								exit 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">						fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">					&quot;&quot;&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">					echo </span><span class="__shiki_mdbnqw">&quot;构建和打包完成&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"><span class="__shiki_140thh">			}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">			stage(</span><span class="__shiki_mdbnqw">&#39;Deploy&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">				steps {</span></span>
<span class="line"><span class="__shiki_21nrsd">					// ssh服务器发送文件</span></span>
<span class="line"><span class="__shiki_140thh">					sshPublisher(</span></span>
<span class="line"><span class="__shiki_dzsirb">						publishers</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">							sshPublisherDesc(</span></span>
<span class="line"><span class="__shiki_dzsirb">								configName</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;jenkins_node&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">								usePromotionTimestamp</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">								useWorkspaceInPromotion</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">								verbose</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">								transfers</span><span class="__shiki_140thh">: [</span></span>
<span class="line"><span class="__shiki_140thh">									sshTransfer(</span></span>
<span class="line"><span class="__shiki_dzsirb">										cleanRemote</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 表示在传输文件之前不清除远程目录</span></span>
<span class="line"><span class="__shiki_dzsirb">										excludes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 要排除的文件模式，这里为空表示不排除任何文件</span></span>
<span class="line"><span class="__shiki_dzsirb">										execCommand</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd">// 远程服务器上执行的命令</span></span>
<span class="line"><span class="__shiki_mdbnqw">											&#39;&#39;&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">												cd /docker/html/\${GIT_BRANCH}</span></span>
<span class="line"><span class="__shiki_mdbnqw">												rm  -rf   dist/</span></span>
<span class="line"><span class="__shiki_mdbnqw">												tar zxvf dist.tar</span></span>
<span class="line"><span class="__shiki_mdbnqw">												rm dist.tar</span></span>
<span class="line"><span class="__shiki_mdbnqw">											&#39;&#39;&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">										execTimeout</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">120000</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 远程命令执行的超时时间，单位是毫秒</span></span>
<span class="line"><span class="__shiki_dzsirb">										flatten</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 不将源文件目录结构展平到远程目录</span></span>
<span class="line"><span class="__shiki_dzsirb">										makeEmptyDirs</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 不创建空的远程目录</span></span>
<span class="line"><span class="__shiki_dzsirb">										noDefaultExcludes</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 是否应用默认的排除模式</span></span>
<span class="line"><span class="__shiki_dzsirb">										patternSeparator</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;[, ]+&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 定义了用于分隔多个源文件模式的分隔符</span></span>
<span class="line"><span class="__shiki_dzsirb">										remoteDirectory</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/docker/html/\${GIT_BRANCH}&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 远程目标目录</span></span>
<span class="line"><span class="__shiki_dzsirb">										remoteDirectorySDF</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 可能是一个与日期时间格式化相关的选项</span></span>
<span class="line"><span class="__shiki_dzsirb">										removePrefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">,  </span><span class="__shiki_21nrsd">// 传输到远程目录之前，从源文件路径中移除的前缀</span></span>
<span class="line"><span class="__shiki_dzsirb">										sourceFiles</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dist.tar&#39;</span><span class="__shiki_21nrsd"> // 要传输到远程服务器的源文件</span></span>
<span class="line"><span class="__shiki_140thh">									)</span></span>
<span class="line"><span class="__shiki_140thh">								]</span></span>
<span class="line"><span class="__shiki_140thh">							)</span></span>
<span class="line"><span class="__shiki_140thh">						]</span></span>
<span class="line"><span class="__shiki_140thh">					)</span></span>
<span class="line"><span class="__shiki_140thh">				}</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">    post {</span></span>
<span class="line"><span class="__shiki_140thh">        always {</span></span>
<span class="line"><span class="__shiki_140thh">            script {</span></span>
<span class="line"><span class="__shiki_21nrsd">                // 无论构建成功与否都不会影响整体结果</span></span>
<span class="line"><span class="__shiki_140thh">                catchError(</span><span class="__shiki_dzsirb">buildResult</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;SUCCESS&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">stageResult</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;SUCCESS&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">                    sh </span><span class="__shiki_mdbnqw">&#39;/var/jenkins_home/pipline_shell/dingding_jenkins --name=&quot;\${JOB_NAME}&quot; --id=&quot;\${BUILD_ID}&quot; --url=&quot;$JOB_URL&quot; --branch=&quot;$refVar&quot;&#39;</span></span>
<span class="line"><span class="__shiki_140thh">                }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div>`,61)])])}const B=a(q,[["render",m]]);export{S as __pageData,B as default};
