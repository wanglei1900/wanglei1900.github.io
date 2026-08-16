import{_ as a,o as n,c as p,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"GitLab CI/CD 与 .gitlab-ci.yml 详解学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/cicd-tools/gitlab-ci/configuration.md","filePath":"devops/deployment/cicd-tools/gitlab-ci/configuration.md"}'),i={name:"devops/deployment/cicd-tools/gitlab-ci/configuration.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[_(`<h1 id="gitlab-ci-cd-与-gitlab-ci-yml-详解学习笔记" tabindex="-1">GitLab CI/CD 与 .gitlab-ci.yml 详解学习笔记 <a class="header-anchor" href="#gitlab-ci-cd-与-gitlab-ci-yml-详解学习笔记" aria-label="Permalink to &quot;GitLab CI/CD 与 .gitlab-ci.yml 详解学习笔记&quot;">​</a></h1><h2 id="一、ci-cd-基础概念" tabindex="-1">一、CI/CD 基础概念 <a class="header-anchor" href="#一、ci-cd-基础概念" aria-label="Permalink to &quot;一、CI/CD 基础概念&quot;">​</a></h2><h3 id="_1-1-持续集成-ci" tabindex="-1">1.1 持续集成（CI） <a class="header-anchor" href="#_1-1-持续集成-ci" aria-label="Permalink to &quot;1.1 持续集成（CI）&quot;">​</a></h3><ul><li><strong>定义</strong>：频繁将代码集成到主干分支（通常每天多次）</li><li><strong>目标</strong>：尽早发现集成错误</li><li><strong>核心实践</strong>： <ul><li>代码提交触发自动构建</li><li>运行自动化测试套件</li><li>快速反馈构建状态</li></ul></li></ul><h3 id="_1-2-持续交付-cd" tabindex="-1">1.2 持续交付（CD） <a class="header-anchor" href="#_1-2-持续交付-cd" aria-label="Permalink to &quot;1.2 持续交付（CD）&quot;">​</a></h3><ul><li><strong>定义</strong>：确保代码始终处于可部署状态</li><li><strong>目标</strong>：快速、可靠地发布软件</li><li><strong>核心实践</strong>： <ul><li>自动化部署流程</li><li>环境配置管理</li><li>发布审批流程</li></ul></li></ul><h3 id="_1-3-gitlab-ci-cd-架构" tabindex="-1">1.3 GitLab CI/CD 架构 <a class="header-anchor" href="#_1-3-gitlab-ci-cd-架构" aria-label="Permalink to &quot;1.3 GitLab CI/CD 架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">GitLab Repository</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓ (触发事件)</span></span>
<span class="line"><span class="__shiki_wvjl67">GitLab CI/CD Pipeline</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">GitLab Runner（执行器）</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">Jobs（具体任务）</span></span></code></pre></div><h2 id="二、gitlab-ci-cd-核心概念" tabindex="-1">二、GitLab CI/CD 核心概念 <a class="header-anchor" href="#二、gitlab-ci-cd-核心概念" aria-label="Permalink to &quot;二、GitLab CI/CD 核心概念&quot;">​</a></h2><h3 id="_2-1-pipeline-流水线" tabindex="-1">2.1 Pipeline（流水线） <a class="header-anchor" href="#_2-1-pipeline-流水线" aria-label="Permalink to &quot;2.1 Pipeline（流水线）&quot;">​</a></h3><ul><li>一次完整的CI/CD执行流程</li><li>由特定事件触发（push、merge request等）</li><li>包含多个Stage和Job</li></ul><h3 id="_2-2-stage-阶段" tabindex="-1">2.2 Stage（阶段） <a class="header-anchor" href="#_2-2-stage-阶段" aria-label="Permalink to &quot;2.2 Stage（阶段）&quot;">​</a></h3><ul><li>定义Job的执行顺序</li><li>相同Stage的Job并行执行</li><li>不同Stage的Job串行执行</li><li>默认阶段：<code>.pre</code> → <code>build</code> → <code>test</code> → <code>deploy</code> → <code>.post</code></li></ul><h3 id="_2-3-job-作业-任务" tabindex="-1">2.3 Job（作业/任务） <a class="header-anchor" href="#_2-3-job-作业-任务" aria-label="Permalink to &quot;2.3 Job（作业/任务）&quot;">​</a></h3><ul><li>Pipeline的最小执行单元</li><li>包含具体的执行脚本</li><li>每个Job必须属于一个Stage</li></ul><h3 id="_2-4-runner-执行器" tabindex="-1">2.4 Runner（执行器） <a class="header-anchor" href="#_2-4-runner-执行器" aria-label="Permalink to &quot;2.4 Runner（执行器）&quot;">​</a></h3><ul><li>实际执行Job的代理</li><li>类型： <ul><li>Shared Runner：共享给所有项目</li><li>Group Runner：群组级别</li><li>Specific Runner：项目级别</li></ul></li><li>执行器类型： <ul><li>Shell</li><li>Docker</li><li>Kubernetes</li><li>SSH</li></ul></li></ul><h2 id="三、-gitlab-ci-yml-文件结构详解" tabindex="-1">三、.gitlab-ci.yml 文件结构详解 <a class="header-anchor" href="#三、-gitlab-ci-yml-文件结构详解" aria-label="Permalink to &quot;三、.gitlab-ci.yml 文件结构详解&quot;">​</a></h2><h3 id="_3-1-基础结构示例" tabindex="-1">3.1 基础结构示例 <a class="header-anchor" href="#_3-1-基础结构示例" aria-label="Permalink to &quot;3.1 基础结构示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 定义流水线阶段</span></span>
<span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义变量（可在所有作业中使用）</span></span>
<span class="line"><span class="__shiki_17hn0y">variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  DOCKER_IMAGE</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;registry.example.com/myapp&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  NODE_VERSION</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;16&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义缓存（加速后续构建）</span></span>
<span class="line"><span class="__shiki_17hn0y">cache</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${CI_COMMIT_REF_SLUG}</span></span>
<span class="line"><span class="__shiki_17hn0y">  paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">node_modules/</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">.npm/</span></span>
<span class="line"><span class="__shiki_17hn0y">  policy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pull-push</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 定义工件（Artifacts）</span></span>
<span class="line"><span class="__shiki_17hn0y">artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">dist/</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">reports/</span></span>
<span class="line"><span class="__shiki_17hn0y">  expire_in</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1 week</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 预定义模板（可被其他作业继承）</span></span>
<span class="line"><span class="__shiki_17hn0y">.base_template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node:\${NODE_VERSION}</span></span>
<span class="line"><span class="__shiki_17hn0y">  before_script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm ci --cache .npm --prefer-offline</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;Starting job for $CI_JOB_NAME&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 具体作业定义</span></span>
<span class="line"><span class="__shiki_17hn0y">build_job</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  extends</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">.base_template</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm run build</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;Build completed successfully&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">dist/</span></span>
<span class="line"><span class="__shiki_17hn0y">    reports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      junit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-results/junit.xml</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">merge_requests</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">develop</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">test_unit</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  extends</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">.base_template</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm run test:unit</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm run coverage</span></span>
<span class="line"><span class="__shiki_17hn0y">  coverage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/Statements\\s*:\\s*([^%]+)/&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    reports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      junit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-results/unit-tests.xml</span></span>
<span class="line"><span class="__shiki_17hn0y">      cobertura</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">coverage/cobertura-coverage.xml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">test_integration</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  extends</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">.base_template</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm run test:integration</span></span>
<span class="line"><span class="__shiki_17hn0y">  services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">postgres:13-alpine</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">redis:alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">  variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    POSTGRES_DB</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">myapp_test</span></span>
<span class="line"><span class="__shiki_17hn0y">    POSTGRES_USER</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">runner</span></span>
<span class="line"><span class="__shiki_17hn0y">    POSTGRES_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"><span class="__shiki_17hn0y">    REDIS_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis://redis:6379</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">integration-test-results/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy_staging</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">alpine:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">apk add --no-cache openssh-client rsync</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">eval $(ssh-agent -s)</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;$SSH_PRIVATE_KEY&quot; | ssh-add -</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">mkdir -p ~/.ssh</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">chmod 700 ~/.ssh</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">rsync -avz -e &quot;ssh -o StrictHostKeyChecking=no&quot; dist/ user@staging-server:/var/www/app/</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">staging</span></span>
<span class="line"><span class="__shiki_17hn0y">    url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://staging.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_17hn0y">  dependencies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">build_job</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy_production</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker:20.10</span></span>
<span class="line"><span class="__shiki_17hn0y">  services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker:dind</span></span>
<span class="line"><span class="__shiki_17hn0y">  variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    DOCKER_HOST</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tcp://docker:2375</span></span>
<span class="line"><span class="__shiki_17hn0y">    DOCKER_TLS_CERTDIR</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker build -t $DOCKER_IMAGE:$CI_COMMIT_SHORT_SHA .</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $DOCKER_IMAGE:$CI_COMMIT_SHORT_SHA</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker tag $DOCKER_IMAGE:$CI_COMMIT_SHORT_SHA $DOCKER_IMAGE:latest</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $DOCKER_IMAGE:latest</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 滚动更新生产环境</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl set image deployment/myapp app=$DOCKER_IMAGE:$CI_COMMIT_SHORT_SHA -n production</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">    url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_17hn0y">  needs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">test_unit</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">test_integration</span></span></code></pre></div><h2 id="四、关键配置详解" tabindex="-1">四、关键配置详解 <a class="header-anchor" href="#四、关键配置详解" aria-label="Permalink to &quot;四、关键配置详解&quot;">​</a></h2><h3 id="_4-1-stages-配置" tabindex="-1">4.1 Stages 配置 <a class="header-anchor" href="#_4-1-stages-配置" aria-label="Permalink to &quot;4.1 Stages 配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 自定义阶段顺序</span></span>
<span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">.pre</span><span class="__shiki_21nrsd">          # 特殊阶段：在所有阶段前执行</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">validate</span><span class="__shiki_21nrsd">      # 代码验证</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">build</span><span class="__shiki_21nrsd">         # 构建</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">security_scan</span><span class="__shiki_21nrsd"> # 安全扫描</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">test</span><span class="__shiki_21nrsd">          # 测试</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">staging</span><span class="__shiki_21nrsd">       # 预发布</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">production</span><span class="__shiki_21nrsd">    # 生产发布</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">.post</span><span class="__shiki_21nrsd">         # 特殊阶段：在所有阶段后执行</span></span></code></pre></div><h3 id="_4-2-job-控制流" tabindex="-1">4.2 Job 控制流 <a class="header-anchor" href="#_4-2-job-控制流" aria-label="Permalink to &quot;4.2 Job 控制流&quot;">​</a></h3><h4 id="条件执行" tabindex="-1">条件执行 <a class="header-anchor" href="#条件执行" aria-label="Permalink to &quot;条件执行&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">job1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 传统方式（已逐渐被rules替代）</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">/^feature-.*$/</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">merge_requests</span></span>
<span class="line"><span class="__shiki_17hn0y">  except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">schedules</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">web</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 推荐方式：rules（更灵活）</span></span>
<span class="line"><span class="__shiki_17hn0y">  rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 如果提交到main分支，且是合并请求</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$CI_PIPELINE_SOURCE == &quot;merge_request_event&quot; &amp;&amp; $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == &quot;main&quot;&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">      when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 如果标签以v开头</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$CI_COMMIT_TAG =~ /^v\\d+\\.\\d+\\.\\d+$/&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">      when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">on_success</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 如果是计划任务</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$CI_PIPELINE_SOURCE == &quot;schedule&quot;&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">      when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认规则</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">never</span></span></code></pre></div><h4 id="手动执行和延迟执行" tabindex="-1">手动执行和延迟执行 <a class="header-anchor" href="#手动执行和延迟执行" aria-label="Permalink to &quot;手动执行和延迟执行&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">manual_job</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;手动部署&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_17hn0y">  allow_failure</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">delayed_job</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;延迟执行&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">delayed</span></span>
<span class="line"><span class="__shiki_17hn0y">  start_in</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">2 hours</span></span>
<span class="line"><span class="__shiki_17hn0y">  needs</span><span class="__shiki_140thh">: []</span></span></code></pre></div><h3 id="_4-3-变量系统" tabindex="-1">4.3 变量系统 <a class="header-anchor" href="#_4-3-变量系统" aria-label="Permalink to &quot;4.3 变量系统&quot;">​</a></h3><h4 id="变量类型" tabindex="-1">变量类型 <a class="header-anchor" href="#变量类型" aria-label="Permalink to &quot;变量类型&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 预定义变量（GitLab提供）</span></span>
<span class="line"><span class="__shiki_21nrsd">  # $CI_COMMIT_SHA, $CI_PROJECT_ID, $CI_JOB_NAME等</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 自定义变量</span></span>
<span class="line"><span class="__shiki_17hn0y">  APP_NAME</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;my-application&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  NODE_ENV</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 文件类型变量</span></span>
<span class="line"><span class="__shiki_17hn0y">  SSH_PRIVATE_KEY</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">    -----BEGIN RSA PRIVATE KEY-----</span></span>
<span class="line"><span class="__shiki_mdbnqw">    ...</span></span>
<span class="line"><span class="__shiki_mdbnqw">    -----END RSA PRIVATE KEY-----</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 变量扩展</span></span>
<span class="line"><span class="__shiki_17hn0y">  DOCKER_TAG</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${CI_COMMIT_SHORT_SHA}</span></span>
<span class="line"><span class="__shiki_17hn0y">  API_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://\${CI_PROJECT_NAMESPACE}.example.com&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 作业级别变量</span></span>
<span class="line"><span class="__shiki_17hn0y">job_with_vars</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    DEPLOY_ENV</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;staging&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    DEBUG</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;true&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;Deploying to $DEPLOY_ENV&quot;</span></span></code></pre></div><h3 id="_4-4-缓存和工件-artifacts" tabindex="-1">4.4 缓存和工件（Artifacts） <a class="header-anchor" href="#_4-4-缓存和工件-artifacts" aria-label="Permalink to &quot;4.4 缓存和工件（Artifacts）&quot;">​</a></h3><h4 id="缓存配置" tabindex="-1">缓存配置 <a class="header-anchor" href="#缓存配置" aria-label="Permalink to &quot;缓存配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">cache</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 按分支缓存</span></span>
<span class="line"><span class="__shiki_17hn0y">  key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${CI_COMMIT_REF_SLUG}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 更细粒度的key</span></span>
<span class="line"><span class="__shiki_17hn0y">  key</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    files</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">package-lock.json</span></span>
<span class="line"><span class="__shiki_17hn0y">    prefix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${CI_COMMIT_REF_SLUG}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">node_modules/</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">.npm/</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">.cache/</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 缓存策略</span></span>
<span class="line"><span class="__shiki_17hn0y">  policy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">pull-push</span><span class="__shiki_21nrsd">  # 默认：下载并上传</span></span>
<span class="line"><span class="__shiki_21nrsd">  # policy: pull      # 只下载不上传</span></span>
<span class="line"><span class="__shiki_21nrsd">  # policy: push      # 只上传不下载</span></span>
<span class="line"><span class="__shiki_21nrsd">  # policy: undefined # 不使用缓存</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 设置缓存失效时间</span></span>
<span class="line"><span class="__shiki_17hn0y">  untracked</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">on_success</span></span></code></pre></div><h4 id="工件配置" tabindex="-1">工件配置 <a class="header-anchor" href="#工件配置" aria-label="Permalink to &quot;工件配置&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 指定路径</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">dist/</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">build/</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">reports/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 排除文件</span></span>
<span class="line"><span class="__shiki_17hn0y">    exclude</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">dist/**/*.map</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">node_modules/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 过期时间</span></span>
<span class="line"><span class="__shiki_17hn0y">    expire_in</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30 days</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 工件名称</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;$CI_COMMIT_REF_NAME-build&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 依赖工件</span></span>
<span class="line"><span class="__shiki_17hn0y">    dependencies</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 工件类型</span></span>
<span class="line"><span class="__shiki_17hn0y">    reports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      junit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-results/junit.xml</span></span>
<span class="line"><span class="__shiki_17hn0y">      cobertura</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">coverage/cobertura-coverage.xml</span></span>
<span class="line"><span class="__shiki_17hn0y">      terraform</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">terraform-plan.json</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 发布条件</span></span>
<span class="line"><span class="__shiki_17hn0y">    when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">on_success</span></span>
<span class="line"><span class="__shiki_17hn0y">    expose_as</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Build Output&quot;</span></span></code></pre></div><h3 id="_4-5-依赖和流水线图" tabindex="-1">4.5 依赖和流水线图 <a class="header-anchor" href="#_4-5-依赖和流水线图" aria-label="Permalink to &quot;4.5 依赖和流水线图&quot;">​</a></h3><h4 id="needs-关键字" tabindex="-1">needs 关键字 <a class="header-anchor" href="#needs-关键字" aria-label="Permalink to &quot;needs 关键字&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 允许作业跳过阶段直接运行</span></span>
<span class="line"><span class="__shiki_17hn0y">fast_deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  needs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">job</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">      artifacts</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">job</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security_scan</span></span>
<span class="line"><span class="__shiki_17hn0y">      artifacts</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;快速部署&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># DAG（有向无环图）示例</span></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  build_a</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  build_b</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  test_a</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">build_a</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  test_b</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">build_b</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">test_a</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">test_b</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_4-6-环境配置" tabindex="-1">4.6 环境配置 <a class="header-anchor" href="#_4-6-环境配置" aria-label="Permalink to &quot;4.6 环境配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">deploy_staging</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">staging/$CI_COMMIT_REF_NAME</span></span>
<span class="line"><span class="__shiki_17hn0y">    url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://staging.example.com</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 动态环境名称</span></span>
<span class="line"><span class="__shiki_21nrsd">    # name: review/$CI_COMMIT_REF_NAME</span></span>
<span class="line"><span class="__shiki_21nrsd">    # url: https://$CI_ENVIRONMENT_SLUG.example.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 环境保护</span></span>
<span class="line"><span class="__shiki_21nrsd">    # on_stop: stop_review</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 部署策略</span></span>
<span class="line"><span class="__shiki_21nrsd">    # auto_stop_in: 1 week</span></span>
<span class="line"><span class="__shiki_21nrsd">    # kubernetes:</span></span>
<span class="line"><span class="__shiki_21nrsd">    #   namespace: staging</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 停止环境作业</span></span>
<span class="line"><span class="__shiki_17hn0y">stop_review</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cleanup</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">make delete-app</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">staging/$CI_COMMIT_REF_NAME</span></span>
<span class="line"><span class="__shiki_17hn0y">    action</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">stop</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">branches</span></span>
<span class="line"><span class="__shiki_17hn0y">  except</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span></code></pre></div><h2 id="五、高级特性" tabindex="-1">五、高级特性 <a class="header-anchor" href="#五、高级特性" aria-label="Permalink to &quot;五、高级特性&quot;">​</a></h2><h3 id="_5-1-父子流水线" tabindex="-1">5.1 父子流水线 <a class="header-anchor" href="#_5-1-父子流水线" aria-label="Permalink to &quot;5.1 父子流水线&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 触发下游流水线</span></span>
<span class="line"><span class="__shiki_17hn0y">trigger_docker_build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  trigger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    project</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">group/docker-build</span></span>
<span class="line"><span class="__shiki_17hn0y">    branch</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">depend</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 动态生成子流水线</span></span>
<span class="line"><span class="__shiki_17hn0y">generate_config</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">generate-ci-config &gt; generated-config.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">generated-config.yml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">child_pipeline</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  trigger</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">artifact</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">generated-config.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">        job</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">generate_config</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">depend</span></span></code></pre></div><h3 id="_5-2-包含外部配置" tabindex="-1">5.2 包含外部配置 <a class="header-anchor" href="#_5-2-包含外部配置" aria-label="Permalink to &quot;5.2 包含外部配置&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 包含本地文件</span></span>
<span class="line"><span class="__shiki_17hn0y">include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">local</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/templates/.gitlab-ci-template.yml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 包含远程文件</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">remote</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;https://example.com/ci-config.yml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 包含模板</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Auto-DevOps.gitlab-ci.yml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 包含多个项目文件</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">project</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;my-group/my-project&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    ref</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_17hn0y">    file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/templates/.gitlab-ci.yml&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 条件包含</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">local</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/.gitlab-ci-extended.yml&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    rules</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;$CI_COMMIT_BRANCH == &quot;main&quot;&#39;</span></span></code></pre></div><h3 id="_5-3-并行和矩阵构建" tabindex="-1">5.3 并行和矩阵构建 <a class="header-anchor" href="#_5-3-并行和矩阵构建" aria-label="Permalink to &quot;5.3 并行和矩阵构建&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 并行测试</span></span>
<span class="line"><span class="__shiki_17hn0y">test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./run-tests.sh</span></span>
<span class="line"><span class="__shiki_17hn0y">  parallel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 矩阵构建</span></span>
<span class="line"><span class="__shiki_17hn0y">test_matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;Testing $VERSION on $OS&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  parallel</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">VERSION</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">12</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">14</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        OS</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">alpine-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">VERSION</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        OS</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 动态矩阵</span></span>
<span class="line"><span class="__shiki_17hn0y">deploy_matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./deploy.sh $REGION</span></span>
<span class="line"><span class="__shiki_17hn0y">  parallel</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">REGION</span><span class="__shiki_140thh">: </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">us-east-1</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">us-west-2</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">eu-west-1</span></span></code></pre></div><h3 id="_5-4-重试和超时" tabindex="-1">5.4 重试和超时 <a class="header-anchor" href="#_5-4-重试和超时" aria-label="Permalink to &quot;5.4 重试和超时&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">job_with_retry</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./unstable-script.sh</span></span>
<span class="line"><span class="__shiki_17hn0y">  retry</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    max</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    when</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">script_failure</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">runner_system_failure</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 指数退避</span></span>
<span class="line"><span class="__shiki_17hn0y">  retry</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    max</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">    when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">runner_system_failure</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 超时设置</span></span>
<span class="line"><span class="__shiki_17hn0y">  timeout</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1 hour</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 中断设置</span></span>
<span class="line"><span class="__shiki_17hn0y">  interruptible</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_5-5-服务和数据库" tabindex="-1">5.5 服务和数据库 <a class="header-anchor" href="#_5-5-服务和数据库" aria-label="Permalink to &quot;5.5 服务和数据库&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">tests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node:16</span></span>
<span class="line"><span class="__shiki_17hn0y">  services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Docker服务</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres:13</span></span>
<span class="line"><span class="__shiki_17hn0y">      alias</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">db</span></span>
<span class="line"><span class="__shiki_17hn0y">      command</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;postgres&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;-c&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;max_connections=200&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">redis:6-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">      alias</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">mongo:4.4</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    POSTGRES_DB</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test_db</span></span>
<span class="line"><span class="__shiki_17hn0y">    POSTGRES_USER</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">runner</span></span>
<span class="line"><span class="__shiki_17hn0y">    POSTGRES_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">password</span></span>
<span class="line"><span class="__shiki_17hn0y">    REDIS_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis://cache:6379/0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm test</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm run test:integration</span></span></code></pre></div><h2 id="六、安全最佳实践" tabindex="-1">六、安全最佳实践 <a class="header-anchor" href="#六、安全最佳实践" aria-label="Permalink to &quot;六、安全最佳实践&quot;">​</a></h2><h3 id="_6-1-密钥管理" tabindex="-1">6.1 密钥管理 <a class="header-anchor" href="#_6-1-密钥管理" aria-label="Permalink to &quot;6.1 密钥管理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用项目CI/CD变量存储密钥</span></span>
<span class="line"><span class="__shiki_21nrsd"># 在GitLab界面设置：Settings → CI/CD → Variables</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy_secure</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用文件类型变量</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;$SSH_PRIVATE_KEY&quot; &gt; id_rsa</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">chmod 600 id_rsa</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 使用掩码变量</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">echo &quot;Using token ending with \${API_TOKEN</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">-4}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 外部密钥管理集成</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      if [ -f &quot;$VAULT_TOKEN_FILE&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        export SECRET=$(vault read -field=value secret/data/app)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      fi</span></span></code></pre></div><h3 id="_6-2-安全扫描" tabindex="-1">6.2 安全扫描 <a class="header-anchor" href="#_6-2-安全扫描" aria-label="Permalink to &quot;6.2 安全扫描&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">security</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># SAST（静态应用安全测试）</span></span>
<span class="line"><span class="__shiki_17hn0y">sast</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;gitlab/gitlab-sast:latest&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    entrypoint</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    SAST_EXCLUDED_PATHS</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;spec, test&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    reports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      sast</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gl-sast-report.json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># DAST（动态应用安全测试）</span></span>
<span class="line"><span class="__shiki_17hn0y">dast</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;gitlab/gitlab-dast:latest&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    entrypoint</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    DAST_WEBSITE</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;https://example.com&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    reports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      dast</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gl-dast-report.json</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 依赖扫描</span></span>
<span class="line"><span class="__shiki_17hn0y">dependency_scanning</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;gitlab/gitlab-dependency-scanning:latest&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    entrypoint</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;&quot;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    reports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      dependency_scanning</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">gl-dependency-scanning-report.json</span></span></code></pre></div><h2 id="七、调试和优化" tabindex="-1">七、调试和优化 <a class="header-anchor" href="#七、调试和优化" aria-label="Permalink to &quot;七、调试和优化&quot;">​</a></h2><h3 id="_7-1-调试技巧" tabindex="-1">7.1 调试技巧 <a class="header-anchor" href="#_7-1-调试技巧" aria-label="Permalink to &quot;7.1 调试技巧&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">debug_job</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">.pre</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 查看环境变量</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">printenv | sort</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">echo &quot;CI_COMMIT_SHA</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">$CI_COMMIT_SHA&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 调试信息</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">echo &quot;Running on runner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">$CI_RUNNER_DESCRIPTION&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">echo &quot;Job URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">$CI_JOB_URL&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 条件调试</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      if [ -n &quot;$DEBUG&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        set -x  # 开启调试模式</span></span>
<span class="line"><span class="__shiki_mdbnqw">      fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 交互式调试（需要Runner支持）</span></span>
<span class="line"><span class="__shiki_17hn0y">debug_interactive</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">apt-get update &amp;&amp; apt-get install -y tmux</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">echo &quot;Attach using</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ssh runner@host&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">sleep 3600</span><span class="__shiki_21nrsd">  # 保持作业运行</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_17hn0y">  allow_failure</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_7-2-性能优化" tabindex="-1">7.2 性能优化 <a class="header-anchor" href="#_7-2-性能优化" aria-label="Permalink to &quot;7.2 性能优化&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 使用更小的基础镜像</span></span>
<span class="line"><span class="__shiki_17hn0y">image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">alpine:latest</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 并行下载依赖</span></span>
<span class="line"><span class="__shiki_17hn0y">before_script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">npm ci --prefer-offline --no-audit</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 增量构建</span></span>
<span class="line"><span class="__shiki_17hn0y">cache</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  key</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    files</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">package-lock.json</span></span>
<span class="line"><span class="__shiki_17hn0y">  paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">node_modules/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 作业超时优化</span></span>
<span class="line"><span class="__shiki_17hn0y">timeouts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  build</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">30m</span></span>
<span class="line"><span class="__shiki_17hn0y">  test</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">1h</span></span>
<span class="line"><span class="__shiki_17hn0y">  deploy</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">15m</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用needs优化流水线</span></span>
<span class="line"><span class="__shiki_17hn0y">optimized_pipeline</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  needs</span><span class="__shiki_140thh">: []</span></span>
<span class="line"><span class="__shiki_17hn0y">  parallel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span></code></pre></div><h2 id="八、实战示例" tabindex="-1">八、实战示例 <a class="header-anchor" href="#八、实战示例" aria-label="Permalink to &quot;八、实战示例&quot;">​</a></h2><h3 id="_8-1-完整的微服务流水线" tabindex="-1">8.1 完整的微服务流水线 <a class="header-anchor" href="#_8-1-完整的微服务流水线" aria-label="Permalink to &quot;8.1 完整的微服务流水线&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .gitlab-ci.yml for microservice</span></span>
<span class="line"><span class="__shiki_17hn0y">include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Security/SAST.gitlab-ci.yml</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">template</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Security/Dependency-Scanning.gitlab-ci.yml</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  DOCKER_REGISTRY</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">$CI_REGISTRY</span></span>
<span class="line"><span class="__shiki_17hn0y">  SERVICE_NAME</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">$CI_PROJECT_NAME</span></span>
<span class="line"><span class="__shiki_17hn0y">  DOCKER_IMAGE</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">$DOCKER_REGISTRY/$CI_PROJECT_PATH</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">stages</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">validate</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">security</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">package</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">.validate_template</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">alpine:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">  before_script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">apk add --no-cache git</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">validate_code</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  extends</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">.validate_template</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validate</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">git diff --check $CI_MERGE_REQUEST_TARGET_BRANCH_SHA $CI_COMMIT_SHA</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;Code validation passed&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">lint</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  extends</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">.validate_template</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validate</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node:16-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm ci</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm run lint</span></span>
<span class="line"><span class="__shiki_17hn0y">  cache</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${CI_COMMIT_REF_SLUG}</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">node_modules/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">unit_tests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node:16-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm ci</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm run test:unit -- --coverage</span></span>
<span class="line"><span class="__shiki_17hn0y">  coverage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;/All files[^|]*\\|[^|]*\\s+([\\d\\.]+)/&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  artifacts</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    reports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      junit</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">junit.xml</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">coverage/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">integration_tests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node:16-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">  services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">postgres:13-alpine</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">redis:alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">  variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    NODE_ENV</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">    DATABASE_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres://postgres:password@postgres:5432/test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm ci</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">npm run test:integration</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">build_docker</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker:20.10</span></span>
<span class="line"><span class="__shiki_17hn0y">  services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker:20.10-dind</span></span>
<span class="line"><span class="__shiki_17hn0y">  variables</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    DOCKER_TLS_CERTDIR</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    DOCKER_BUILDKIT</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">  before_script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      docker build \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --build-arg NODE_ENV=production \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --cache-from $DOCKER_IMAGE:latest \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --tag $DOCKER_IMAGE:$CI_COMMIT_SHA \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        --tag $DOCKER_IMAGE:latest \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $DOCKER_IMAGE:$CI_COMMIT_SHA</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker push $DOCKER_IMAGE:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">merge_requests</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy_staging</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bitnami/kubectl:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl set image deployment/$SERVICE_NAME \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        $SERVICE_NAME=$DOCKER_IMAGE:$CI_COMMIT_SHA \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">        -n staging</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">kubectl rollout status deployment/$SERVICE_NAME -n staging</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">staging</span></span>
<span class="line"><span class="__shiki_17hn0y">    url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://staging.example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">deploy_production</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bitnami/kubectl:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 蓝绿部署策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl apply -f k8s/production-blue.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl rollout status deployment/$SERVICE_NAME-blue -n production</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 流量切换</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl apply -f k8s/ingress-production.yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 清理旧版本</span></span>
<span class="line"><span class="__shiki_mdbnqw">      kubectl delete deployment/$SERVICE_NAME-green -n production --ignore-not-found=true</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">    url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">https://example.com</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">manual</span></span>
<span class="line"><span class="__shiki_17hn0y">  only</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">tags</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 清理作业</span></span>
<span class="line"><span class="__shiki_17hn0y">cleanup</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">.post</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker system prune -f</span></span>
<span class="line"><span class="__shiki_17hn0y">  when</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always</span></span></code></pre></div><h2 id="九、常见问题解决" tabindex="-1">九、常见问题解决 <a class="header-anchor" href="#九、常见问题解决" aria-label="Permalink to &quot;九、常见问题解决&quot;">​</a></h2><h3 id="_9-1-故障排除" tabindex="-1">9.1 故障排除 <a class="header-anchor" href="#_9-1-故障排除" aria-label="Permalink to &quot;9.1 故障排除&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 添加调试信息</span></span>
<span class="line"><span class="__shiki_17hn0y">debug_info</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">.pre</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;### Runner Info</span><span class="__shiki_21nrsd"> ###&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">docker info</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;### Disk Space</span><span class="__shiki_21nrsd"> ###&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">df -h</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">echo &quot;### Memory</span><span class="__shiki_21nrsd"> ###&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">free -h</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 作业重试策略</span></span>
<span class="line"><span class="__shiki_17hn0y">unstable_job</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  retry</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    max</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">    when</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">runner_system_failure</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">stuck_or_timeout_failure</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">scheduler_failure</span></span></code></pre></div><h3 id="_9-2-资源优化" tabindex="-1">9.2 资源优化 <a class="header-anchor" href="#_9-2-资源优化" aria-label="Permalink to &quot;9.2 资源优化&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 资源配置</span></span>
<span class="line"><span class="__shiki_17hn0y">resource_group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deployment</span><span class="__shiki_21nrsd">  # 串行执行同类作业</span></span>
<span class="line"><span class="__shiki_17hn0y">interruptible</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">         # 可中断作业</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 标签选择</span></span>
<span class="line"><span class="__shiki_17hn0y">tags</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">docker</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">linux</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">high-memory</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 服务健康检查</span></span>
<span class="line"><span class="__shiki_17hn0y">health_check</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  stage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">  script</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">timeout 60 bash -c &#39;until curl -f http://app:3000/health; do sleep 5; done&#39;</span></span></code></pre></div><h2 id="十、最佳实践总结" tabindex="-1">十、最佳实践总结 <a class="header-anchor" href="#十、最佳实践总结" aria-label="Permalink to &quot;十、最佳实践总结&quot;">​</a></h2><ol><li><strong>保持配置文件简洁</strong>：使用<code>include</code>和<code>extends</code>复用配置</li><li><strong>安全第一</strong>：使用CI/CD变量存储敏感信息，启用安全扫描</li><li><strong>快速反馈</strong>：将重要测试放在流水线前段</li><li><strong>资源优化</strong>：合理使用缓存，设置并行和矩阵构建</li><li><strong>环境一致性</strong>：使用容器确保环境一致</li><li><strong>监控和日志</strong>：收集构建指标，设置合理的超时时间</li><li><strong>渐进式部署</strong>：使用蓝绿部署或金丝雀发布</li><li><strong>文档化</strong>：在配置中添加注释说明</li></ol><h2 id="附录-常用预定义变量" tabindex="-1">附录：常用预定义变量 <a class="header-anchor" href="#附录-常用预定义变量" aria-label="Permalink to &quot;附录：常用预定义变量&quot;">​</a></h2><table tabindex="0"><thead><tr><th>变量</th><th>说明</th></tr></thead><tbody><tr><td><code>CI_COMMIT_SHA</code></td><td>当前提交的SHA</td></tr><tr><td><code>CI_COMMIT_REF_NAME</code></td><td>分支或标签名称</td></tr><tr><td><code>CI_PROJECT_PATH</code></td><td>项目路径（group/project）</td></tr><tr><td><code>CI_PIPELINE_SOURCE</code></td><td>流水线触发源</td></tr><tr><td><code>CI_MERGE_REQUEST_ID</code></td><td>合并请求ID</td></tr><tr><td><code>CI_JOB_NAME</code></td><td>作业名称</td></tr><tr><td><code>CI_RUNNER_DESCRIPTION</code></td><td>Runner描述</td></tr><tr><td><code>CI_REGISTRY</code></td><td>GitLab容器注册表地址</td></tr><tr><td><code>CI_API_V4_URL</code></td><td>GitLab API v4地址</td></tr></tbody></table><p>这份学习笔记涵盖了GitLab CI/CD的核心概念、.gitlab-ci.yml的详细配置、高级特性和最佳实践。建议结合实际项目实践，逐步掌握这些概念和技术。</p>`,75)])])}const r=a(i,[["render",l]]);export{o as __pageData,r as default};
