import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"GitHub Actions 自定义 Actions 开发完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/cicd-tools/github-actions/custom-actions.md","filePath":"devops/deployment/cicd-tools/github-actions/custom-actions.md"}'),_={name:"devops/deployment/cicd-tools/github-actions/custom-actions.md"};function l(h,s,c,t,e,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="github-actions-自定义-actions-开发完全指南" tabindex="-1">GitHub Actions 自定义 Actions 开发完全指南 <a class="header-anchor" href="#github-actions-自定义-actions-开发完全指南" aria-label="Permalink to &quot;GitHub Actions 自定义 Actions 开发完全指南&quot;">​</a></h1><h2 id="一、理解自定义-actions-的核心价值" tabindex="-1">一、理解自定义 Actions 的核心价值 <a class="header-anchor" href="#一、理解自定义-actions-的核心价值" aria-label="Permalink to &quot;一、理解自定义 Actions 的核心价值&quot;">​</a></h2><h3 id="_1-1-什么是自定义-action" tabindex="-1">1.1 什么是自定义 Action？ <a class="header-anchor" href="#_1-1-什么是自定义-action" aria-label="Permalink to &quot;1.1 什么是自定义 Action？&quot;">​</a></h3><p>GitHub Actions 的核心优势之一在于其<strong>可组合性</strong>，而自定义 Action 正是这种可组合性的体现。自定义 Action 是将 CI/CD 流程中的<strong>特定任务或逻辑封装成可复用的独立单元</strong>，可以被不同的工作流、仓库甚至组织引用。</p><h3 id="_1-2-为什么要开发自定义-action" tabindex="-1">1.2 为什么要开发自定义 Action？ <a class="header-anchor" href="#_1-2-为什么要开发自定义-action" aria-label="Permalink to &quot;1.2 为什么要开发自定义 Action？&quot;">​</a></h3><ul><li><strong>抽象复杂性</strong>：将复杂操作（如部署到特定云平台、代码质量扫描等）封装成简单接口</li><li><strong>统一标准</strong>：确保跨项目/团队执行相同任务时方法一致</li><li><strong>减少重复代码</strong>：避免在多个工作流中复制粘贴相同的步骤</li><li><strong>知识沉淀</strong>：将专家经验编码化，降低团队学习成本</li><li><strong>社区共享</strong>：通过 GitHub Marketplace 分享你的解决方案</li></ul><h3 id="_1-3-action-的三种类型" tabindex="-1">1.3 Action 的三种类型 <a class="header-anchor" href="#_1-3-action-的三种类型" aria-label="Permalink to &quot;1.3 Action 的三种类型&quot;">​</a></h3><table tabindex="0"><thead><tr><th>类型</th><th>描述</th><th>适用场景</th><th>执行环境</th></tr></thead><tbody><tr><td><strong>JavaScript Action</strong></td><td>用 Node.js 编写，直接在 runner 中执行</td><td>轻量级操作、文件处理、API调用</td><td>GitHub Runner 环境</td></tr><tr><td><strong>Docker Container Action</strong></td><td>封装在 Docker 容器中运行</td><td>需要特定运行时环境或依赖</td><td>独立容器环境</td></tr><tr><td><strong>Composite Action</strong></td><td>组合多个步骤（包括 run 命令和其他 Actions）</td><td>打包一组相关操作为单一单元</td><td>GitHub Runner 环境</td></tr></tbody></table><h2 id="二、javascript-action-开发详解" tabindex="-1">二、JavaScript Action 开发详解 <a class="header-anchor" href="#二、javascript-action-开发详解" aria-label="Permalink to &quot;二、JavaScript Action 开发详解&quot;">​</a></h2><h3 id="_2-1-项目结构与核心文件" tabindex="-1">2.1 项目结构与核心文件 <a class="header-anchor" href="#_2-1-项目结构与核心文件" aria-label="Permalink to &quot;2.1 项目结构与核心文件&quot;">​</a></h3><p>一个标准的 JavaScript Action 项目结构如下：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">my-custom-action/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── .github/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── workflows/</span></span>
<span class="line"><span class="__shiki_wvjl67">│       └── test.yml          # Action 自身的测试工作流</span></span>
<span class="line"><span class="__shiki_wvjl67">├── src/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── index.js              # 主逻辑文件</span></span>
<span class="line"><span class="__shiki_wvjl67">├── dist/</span></span>
<span class="line"><span class="__shiki_wvjl67">│   └── index.js              # 编译后的文件（可选）</span></span>
<span class="line"><span class="__shiki_wvjl67">├── action.yml                # Action 元数据定义</span></span>
<span class="line"><span class="__shiki_wvjl67">├── package.json              # Node.js 项目配置</span></span>
<span class="line"><span class="__shiki_wvjl67">├── README.md                 # 使用说明文档</span></span>
<span class="line"><span class="__shiki_wvjl67">└── .gitignore</span></span></code></pre></div><h3 id="_2-2-action-yml-action-的元数据定义" tabindex="-1">2.2 action.yml - Action 的元数据定义 <a class="header-anchor" href="#_2-2-action-yml-action-的元数据定义" aria-label="Permalink to &quot;2.2 action.yml - Action 的元数据定义&quot;">​</a></h3><p>这是自定义 Action 的核心配置文件：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;My Custom Action&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;A detailed description of what this action does&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">author</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Your Name&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输入参数定义</span></span>
<span class="line"><span class="__shiki_17hn0y">inputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  api-key</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;API key for authentication&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Target environment (dev, staging, prod)&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dev&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  verbose</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Enable verbose logging&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;false&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出参数定义</span></span>
<span class="line"><span class="__shiki_17hn0y">outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  result-id</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;The ID of the created resource&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.action-name.outputs.result-id }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行器配置</span></span>
<span class="line"><span class="__shiki_17hn0y">runs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  using</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;node20&#39;</span><span class="__shiki_21nrsd">  # Node.js 版本</span></span>
<span class="line"><span class="__shiki_17hn0y">  main</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dist/index.js&#39;</span><span class="__shiki_21nrsd">  # 入口文件</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 品牌信息（用于 GitHub Marketplace）</span></span>
<span class="line"><span class="__shiki_17hn0y">branding</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  icon</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;upload-cloud&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  color</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;green&#39;</span></span></code></pre></div><h3 id="_2-3-主逻辑文件开发" tabindex="-1">2.3 主逻辑文件开发 <a class="header-anchor" href="#_2-3-主逻辑文件开发" aria-label="Permalink to &quot;2.3 主逻辑文件开发&quot;">​</a></h3><p><code>src/index.js</code> 是 Action 的主逻辑文件，需要遵循特定的模式：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 导入必要的模块</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> core</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> github</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/github&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 获取输入参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> apiKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;api-key&#39;</span><span class="__shiki_140thh">, { required: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> environment</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;environment&#39;</span><span class="__shiki_140thh">, { required: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> verbose</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getBooleanInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;verbose&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 获取上下文信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> context</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> github.context;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> repo</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> context.repo;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> sha</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> context.sha;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Starting action for \${</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">owner</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">} @ \${</span><span class="__shiki_140thh">sha</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">debug</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Environment: \${</span><span class="__shiki_140thh">environment</span><span class="__shiki_mdbnqw">}, Verbose: \${</span><span class="__shiki_140thh">verbose</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 验证输入参数</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">[</span><span class="__shiki_mdbnqw">&#39;dev&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;prod&#39;</span><span class="__shiki_140thh">].</span><span class="__shiki_1t8gfj">includes</span><span class="__shiki_140thh">(environment)) {</span></span>
<span class="line"><span class="__shiki_140thh">      core.</span><span class="__shiki_1t8gfj">setFailed</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Invalid environment: \${</span><span class="__shiki_140thh">environment</span><span class="__shiki_mdbnqw">}. Must be one of: dev, staging, prod\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 执行业务逻辑</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">startGroup</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Executing main logic&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 示例：调用外部 API</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> response</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> callExternalAPI</span><span class="__shiki_140thh">(apiKey, {</span></span>
<span class="line"><span class="__shiki_140thh">      repo: repo.repo,</span></span>
<span class="line"><span class="__shiki_140thh">      branch: context.ref.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;refs/heads/&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      environment: environment</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">endGroup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 5. 设置输出参数</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setOutput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;result-id&#39;</span><span class="__shiki_140thh">, response.id);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setOutput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">, response.status);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 6. 添加总结信息（在 GitHub UI 中显示）</span></span>
<span class="line"><span class="__shiki_140thh">    core.summary</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addHeading</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Action Results&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addTable</span><span class="__shiki_140thh">([</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_mdbnqw">&#39;Result ID&#39;</span><span class="__shiki_140thh">, response.id],</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_mdbnqw">&#39;Status&#39;</span><span class="__shiki_140thh">, response.status],</span></span>
<span class="line"><span class="__shiki_140thh">        [</span><span class="__shiki_mdbnqw">&#39;Environment&#39;</span><span class="__shiki_140thh">, environment]</span></span>
<span class="line"><span class="__shiki_140thh">      ])</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addLink</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;View Details&#39;</span><span class="__shiki_140thh">, response.url)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">write</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 7. 设置状态通知</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (response.status </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;success&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      core.</span><span class="__shiki_1t8gfj">notice</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Action completed successfully for \${</span><span class="__shiki_140thh">environment</span><span class="__shiki_mdbnqw">} environment\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      core.</span><span class="__shiki_1t8gfj">warning</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Action completed with warnings for \${</span><span class="__shiki_140thh">environment</span><span class="__shiki_mdbnqw">} environment\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 错误处理</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setFailed</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Action failed: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(error.stack);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 辅助函数</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> callExternalAPI</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">apiKey</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 实际 API 调用逻辑</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    id: </span><span class="__shiki_mdbnqw">&#39;12345&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    status: </span><span class="__shiki_mdbnqw">&#39;success&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    url: </span><span class="__shiki_mdbnqw">&#39;https://example.com/results/12345&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 执行 Action</span></span>
<span class="line"><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">();</span></span></code></pre></div><h3 id="_2-4-package-json-配置" tabindex="-1">2.4 package.json 配置 <a class="header-anchor" href="#_2-4-package-json-配置" aria-label="Permalink to &quot;2.4 package.json 配置&quot;">​</a></h3><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;name&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;my-custom-action&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;version&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;1.0.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;description&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;A custom GitHub Action&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;main&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;dist/index.js&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;scripts&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;build&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;ncc build src/index.js -o dist --license licenses.txt&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;test&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;jest&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;lint&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;eslint src/**/*.js&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;format&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;prettier --write src/**/*.js&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;dependencies&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;@actions/core&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^1.10.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;@actions/github&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^5.1.1&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;axios&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^1.6.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;devDependencies&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;@vercel/ncc&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^0.38.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;jest&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^29.7.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;eslint&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^8.54.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;prettier&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^3.1.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;keywords&quot;</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&quot;actions&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;github&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;automation&quot;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;author&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;Your Name&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;license&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;MIT&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-5-本地测试与开发工作流" tabindex="-1">2.5 本地测试与开发工作流 <a class="header-anchor" href="#_2-5-本地测试与开发工作流" aria-label="Permalink to &quot;2.5 本地测试与开发工作流&quot;">​</a></h3><p>创建 <code>.github/workflows/test.yml</code> 来测试你的 Action：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Test Custom Action&#39;</span></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">develop</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  pull_request</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  workflow_dispatch</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 允许手动触发</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  test-action</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node.js</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;20&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm ci</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Lint code</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run lint</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run tests</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm test</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build Action</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run build</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Test Action locally</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          api-key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.TEST_API_KEY }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dev&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          verbose</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">custom-action</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Display outputs</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Result ID: \${{ steps.custom-action.outputs.result-id }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Status: \${{ steps.custom-action.outputs.status }}&quot;</span></span></code></pre></div><h2 id="三、docker-container-action-开发" tabindex="-1">三、Docker Container Action 开发 <a class="header-anchor" href="#三、docker-container-action-开发" aria-label="Permalink to &quot;三、Docker Container Action 开发&quot;">​</a></h2><h3 id="_3-1-docker-action-的优势与结构" tabindex="-1">3.1 Docker Action 的优势与结构 <a class="header-anchor" href="#_3-1-docker-action-的优势与结构" aria-label="Permalink to &quot;3.1 Docker Action 的优势与结构&quot;">​</a></h3><p>Docker Action 适合需要特定运行时环境或复杂依赖的场景：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">docker-action/</span></span>
<span class="line"><span class="__shiki_wvjl67">├── Dockerfile               # 容器定义</span></span>
<span class="line"><span class="__shiki_wvjl67">├── action.yml               # Action 元数据</span></span>
<span class="line"><span class="__shiki_wvjl67">├── entrypoint.sh            # 入口脚本</span></span>
<span class="line"><span class="__shiki_wvjl67">├── README.md</span></span>
<span class="line"><span class="__shiki_wvjl67">└── .github/workflows/</span></span>
<span class="line"><span class="__shiki_wvjl67">    └── test.yml</span></span></code></pre></div><h3 id="_3-2-dockerfile-示例" tabindex="-1">3.2 Dockerfile 示例 <a class="header-anchor" href="#_3-2-dockerfile-示例" aria-label="Permalink to &quot;3.2 Dockerfile 示例&quot;">​</a></h3><div class="language-dockerfile vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">dockerfile</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 基于官方镜像或自定义基础镜像</span></span>
<span class="line"><span class="__shiki_1itgoe">FROM</span><span class="__shiki_140thh"> node:20-alpine</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装系统依赖</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> apk add --no-cache \\</span></span>
<span class="line"><span class="__shiki_140thh">    git \\</span></span>
<span class="line"><span class="__shiki_140thh">    curl \\</span></span>
<span class="line"><span class="__shiki_140thh">    python3 \\</span></span>
<span class="line"><span class="__shiki_140thh">    py3-pip \\</span></span>
<span class="line"><span class="__shiki_140thh">    &amp;&amp; pip3 install awscli</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 将整个 Action 代码复制到容器中</span></span>
<span class="line"><span class="__shiki_1itgoe">COPY</span><span class="__shiki_140thh"> . /action</span></span>
<span class="line"><span class="__shiki_1itgoe">WORKDIR</span><span class="__shiki_140thh"> /action</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 安装 Node.js 依赖（如果是 JS Action 的容器化版本）</span></span>
<span class="line"><span class="__shiki_1itgoe">RUN</span><span class="__shiki_140thh"> npm ci --production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置入口点</span></span>
<span class="line"><span class="__shiki_1itgoe">ENTRYPOINT</span><span class="__shiki_140thh"> [</span><span class="__shiki_mdbnqw">&quot;node&quot;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&quot;/action/dist/index.js&quot;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_3-3-docker-action-的-action-yml" tabindex="-1">3.3 Docker Action 的 action.yml <a class="header-anchor" href="#_3-3-docker-action-的-action-yml" aria-label="Permalink to &quot;3.3 Docker Action 的 action.yml&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Docker Container Action&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;An action that runs in a Docker container&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">author</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Your Name&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">inputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  image-tag</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Docker image tag to deploy&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  region</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;AWS region&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">runs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  using</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;docker&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Dockerfile&#39;</span><span class="__shiki_21nrsd">  # 指向 Dockerfile</span></span>
<span class="line"><span class="__shiki_17hn0y">  args</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">\${{ inputs.image-tag }}</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">\${{ inputs.region }}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 容器运行参数</span></span>
<span class="line"><span class="__shiki_17hn0y">  env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    AWS_ACCESS_KEY_ID</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.AWS_ACCESS_KEY_ID }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    AWS_SECRET_ACCESS_KEY</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.AWS_SECRET_ACCESS_KEY }}</span></span></code></pre></div><h3 id="_3-4-入口脚本示例-entrypoint-sh" tabindex="-1">3.4 入口脚本示例（entrypoint.sh） <a class="header-anchor" href="#_3-4-入口脚本示例-entrypoint-sh" aria-label="Permalink to &quot;3.4 入口脚本示例（entrypoint.sh）&quot;">​</a></h3><p>对于非 Node.js 的 Docker Action，可以使用 shell 脚本作为入口点：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/sh</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 获取输入参数</span></span>
<span class="line"><span class="__shiki_140thh">IMAGE_TAG</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">$1</span></span>
<span class="line"><span class="__shiki_140thh">REGION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_1jdh33">\${2</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_mdbnqw">&quot;us-east-1&quot;</span><span class="__shiki_1jdh33">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 输出调试信息</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Deploying image tag: </span><span class="__shiki_140thh">$IMAGE_TAG</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Target region: </span><span class="__shiki_140thh">$REGION</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 执行部署逻辑</span></span>
<span class="line"><span class="__shiki_1t8gfj">aws</span><span class="__shiki_mdbnqw"> ecr</span><span class="__shiki_mdbnqw"> get-login-password</span><span class="__shiki_dzsirb"> --region</span><span class="__shiki_140thh"> $REGION </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> docker</span><span class="__shiki_mdbnqw"> login</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --username</span><span class="__shiki_mdbnqw"> AWS</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --password-stdin</span><span class="__shiki_140thh"> $AWS_ACCOUNT_ID</span><span class="__shiki_mdbnqw">.dkr.ecr.</span><span class="__shiki_140thh">$REGION</span><span class="__shiki_mdbnqw">.amazonaws.com</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 拉取镜像</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> pull</span><span class="__shiki_140thh"> $IMAGE_TAG</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 执行容器（示例）</span></span>
<span class="line"><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> run</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  --name</span><span class="__shiki_mdbnqw"> my-app</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">  -p</span><span class="__shiki_mdbnqw"> 8080:8080</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_140thh">  $IMAGE_TAG</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置输出</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;::set-output name=container-id::$(</span><span class="__shiki_1t8gfj">docker</span><span class="__shiki_mdbnqw"> ps </span><span class="__shiki_dzsirb">-q</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> name=my-app)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;::set-output name=status::deployed&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 健康检查</span></span>
<span class="line"><span class="__shiki_1t8gfj">sleep</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -f</span><span class="__shiki_mdbnqw"> http://localhost:8080/health</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> exit</span><span class="__shiki_dzsirb"> 1</span></span></code></pre></div><h2 id="四、composite-action-开发" tabindex="-1">四、Composite Action 开发 <a class="header-anchor" href="#四、composite-action-开发" aria-label="Permalink to &quot;四、Composite Action 开发&quot;">​</a></h2><h3 id="_4-1-composite-action-的优势" tabindex="-1">4.1 Composite Action 的优势 <a class="header-anchor" href="#_4-1-composite-action-的优势" aria-label="Permalink to &quot;4.1 Composite Action 的优势&quot;">​</a></h3><p>Composite Action 允许你将多个步骤组合成一个可重用的单元，非常适合封装一系列相关操作：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Composite Setup Action&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Sets up development environment with multiple tools&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">inputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  node-version</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Node.js version&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;20&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  python-version</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Python version&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.11&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  install-aws-cli</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Whether to install AWS CLI&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;true&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">runs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  using</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;composite&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node.js</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ inputs.node-version }}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Python</span></span>
<span class="line"><span class="__shiki_17hn0y">      uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-python@v5</span></span>
<span class="line"><span class="__shiki_17hn0y">      with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        python-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ inputs.python-version }}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">      shell</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bash</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;Setting up cache directories...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        mkdir -p ~/.npm ~/.cache/pip</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install AWS CLI (if requested)</span></span>
<span class="line"><span class="__shiki_17hn0y">      if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ inputs.install-aws-cli == &#39;true&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      shell</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bash</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        curl &quot;https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip&quot; -o &quot;awscliv2.zip&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        unzip awscliv2.zip</span></span>
<span class="line"><span class="__shiki_mdbnqw">        sudo ./aws/install</span></span>
<span class="line"><span class="__shiki_mdbnqw">        aws --version</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Configure git</span></span>
<span class="line"><span class="__shiki_17hn0y">      shell</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bash</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        git config --global user.name &quot;GitHub Actions&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        git config --global user.email &quot;actions@github.com&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Output versions</span></span>
<span class="line"><span class="__shiki_17hn0y">      shell</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bash</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;Node.js version: $(node --version)&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;Python version: $(python --version)&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;AWS CLI version: $(aws --version 2&gt;/dev/null || echo &#39;Not installed&#39;)&quot;</span></span></code></pre></div><h2 id="五、action-开发的高级技巧" tabindex="-1">五、Action 开发的高级技巧 <a class="header-anchor" href="#五、action-开发的高级技巧" aria-label="Permalink to &quot;五、Action 开发的高级技巧&quot;">​</a></h2><h3 id="_5-1-版本控制与发布策略" tabindex="-1">5.1 版本控制与发布策略 <a class="header-anchor" href="#_5-1-版本控制与发布策略" aria-label="Permalink to &quot;5.1 版本控制与发布策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 推荐使用语义化版本标签</span></span>
<span class="line"><span class="__shiki_21nrsd"># v1.0.0 - 主要版本（破坏性变更）</span></span>
<span class="line"><span class="__shiki_21nrsd"># v1.1.0 - 次要版本（新功能，向后兼容）</span></span>
<span class="line"><span class="__shiki_21nrsd"># v1.1.1 - 补丁版本（Bug修复）</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建版本标签</span></span>
<span class="line"><span class="__shiki_mdbnqw">git tag -a v1.0.0 -m &quot;Initial release&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">git push origin v1.0.0</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 用户可以通过以下方式引用：</span></span>
<span class="line"><span class="__shiki_21nrsd"># uses: your-org/your-action@v1.0.0        # 固定版本</span></span>
<span class="line"><span class="__shiki_21nrsd"># uses: your-org/your-action@v1             # 主要版本（自动获取最新小版本）</span></span>
<span class="line"><span class="__shiki_21nrsd"># uses: your-org/your-action@main          # 最新代码（不推荐生产环境）</span></span></code></pre></div><h3 id="_5-2-处理敏感数据的最佳实践" tabindex="-1">5.2 处理敏感数据的最佳实践 <a class="header-anchor" href="#_5-2-处理敏感数据的最佳实践" aria-label="Permalink to &quot;5.2 处理敏感数据的最佳实践&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 正确的方式：使用 @actions/core 的安全方法</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> core</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 安全地获取机密</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;github-token&#39;</span><span class="__shiki_140thh">, { required: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 在日志中隐藏敏感信息</span></span>
<span class="line"><span class="__shiki_140thh">  core.</span><span class="__shiki_1t8gfj">setSecret</span><span class="__shiki_140thh">(token);</span></span>
<span class="line"><span class="__shiki_140thh">  core.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Token retrieved successfully&#39;</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 不会显示实际token</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 错误示例：直接记录敏感信息</span></span>
<span class="line"><span class="__shiki_21nrsd">  // console.log(\`Token: \${token}\`);</span><span class="__shiki_21nrsd"> // 危险！</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 使用环境变量传递机密（适合子进程）</span></span>
<span class="line"><span class="__shiki_140thh">  process.env.</span><span class="__shiki_dzsirb">GITHUB_TOKEN</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> token;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-3-优化-action-性能" tabindex="-1">5.3 优化 Action 性能 <a class="header-anchor" href="#_5-3-优化-action-性能" aria-label="Permalink to &quot;5.3 优化 Action 性能&quot;">​</a></h3><ol><li><strong>依赖管理优化</strong>：</li></ol><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// package.json 中的依赖优化</span></span>
<span class="line"><span class="__shiki_140thh">{</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;dependencies&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 仅包含运行时必需的依赖</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;@actions/core&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^1.10.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;@actions/github&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^5.1.1&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_dzsirb">  &quot;devDependencies&quot;</span><span class="__shiki_140thh">: {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 构建和测试工具放在 devDependencies</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;@vercel/ncc&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^0.38.0&quot;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">    &quot;jest&quot;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;^29.7.0&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><ol start="2"><li><strong>使用 ncc 打包</strong>：</li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 安装 ncc</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> i</span><span class="__shiki_dzsirb"> -g</span><span class="__shiki_mdbnqw"> @vercel/ncc</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 打包为单个文件</span></span>
<span class="line"><span class="__shiki_1t8gfj">ncc</span><span class="__shiki_mdbnqw"> build</span><span class="__shiki_mdbnqw"> src/index.js</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> dist</span><span class="__shiki_dzsirb"> --license</span><span class="__shiki_mdbnqw"> licenses.txt</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 这会创建一个独立的 dist/index.js 文件</span></span>
<span class="line"><span class="__shiki_21nrsd"># 包含所有依赖，减少安装时间</span></span></code></pre></div><ol start="3"><li><strong>缓存策略</strong>：</li></ol><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 在 Action 使用方的工作流中添加缓存</span></span>
<span class="line"><span class="__shiki_17hn0y">steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache node modules</span></span>
<span class="line"><span class="__shiki_17hn0y">    uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/cache@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">    with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">~/.npm</span></span>
<span class="line"><span class="__shiki_17hn0y">      key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm-\${{ hashFiles(&#39;**/package-lock.json&#39;) }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Use Custom Action</span></span>
<span class="line"><span class="__shiki_17hn0y">    uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">your-org/your-action@v1</span></span></code></pre></div><h3 id="_5-4-测试策略" tabindex="-1">5.4 测试策略 <a class="header-anchor" href="#_5-4-测试策略" aria-label="Permalink to &quot;5.4 测试策略&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// __tests__/index.test.js</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> core</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> github</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/github&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">run</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;../src/index&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// Mock GitHub Actions 工具包</span></span>
<span class="line"><span class="__shiki_140thh">jest.</span><span class="__shiki_1t8gfj">mock</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">jest.</span><span class="__shiki_1t8gfj">mock</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/github&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">describe</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Custom Action Tests&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">  beforeEach</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清除所有 mock</span></span>
<span class="line"><span class="__shiki_140thh">    jest.</span><span class="__shiki_1t8gfj">clearAllMocks</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置默认的 mock 实现</span></span>
<span class="line"><span class="__shiki_140thh">    github.context </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      repo: {</span></span>
<span class="line"><span class="__shiki_140thh">        owner: </span><span class="__shiki_mdbnqw">&#39;test-owner&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        repo: </span><span class="__shiki_mdbnqw">&#39;test-repo&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      sha: </span><span class="__shiki_mdbnqw">&#39;abc123&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      ref: </span><span class="__shiki_mdbnqw">&#39;refs/heads/main&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should process inputs correctly&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟输入</span></span>
<span class="line"><span class="__shiki_140thh">    core.getInput</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">mockReturnValueOnce</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;test-api-key&#39;</span><span class="__shiki_140thh">)  </span><span class="__shiki_21nrsd">// api-key</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">mockReturnValueOnce</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;prod&#39;</span><span class="__shiki_140thh">)          </span><span class="__shiki_21nrsd">// environment</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">mockReturnValueOnce</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">);         </span><span class="__shiki_21nrsd">// verbose</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 模拟 setOutput</span></span>
<span class="line"><span class="__shiki_140thh">    core.setOutput </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jest.</span><span class="__shiki_1t8gfj">fn</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行 Action</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 验证输出</span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(core.setOutput).</span><span class="__shiki_1t8gfj">toHaveBeenCalledWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;result-id&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      expect.</span><span class="__shiki_1t8gfj">any</span><span class="__shiki_140thh">(String)</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  test</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;should fail on invalid environment&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_1itgoe">async</span><span class="__shiki_140thh"> () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    core.getInput</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">mockReturnValueOnce</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;test-api-key&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">mockReturnValueOnce</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;invalid-env&#39;</span><span class="__shiki_140thh">);  </span><span class="__shiki_21nrsd">// 无效环境</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    core.setFailed </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> jest.</span><span class="__shiki_1t8gfj">fn</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    expect</span><span class="__shiki_140thh">(core.setFailed).</span><span class="__shiki_1t8gfj">toHaveBeenCalledWith</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;Invalid environment: invalid-env. Must be one of: dev, staging, prod&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">});</span></span></code></pre></div><h3 id="_5-5-action-的持续集成" tabindex="-1">5.5 Action 的持续集成 <a class="header-anchor" href="#_5-5-action-的持续集成" aria-label="Permalink to &quot;5.5 Action 的持续集成&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .github/workflows/ci.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">CI for Custom Action</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">develop</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  pull_request</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">18.x</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">20.x</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Use Node.js \${{ matrix.node-version }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.node-version }}</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm ci</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Lint</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run lint</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Test</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm test</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run build</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Verify build output</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ ! -f &quot;dist/index.js&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;Build failed: dist/index.js not found&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            exit 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_17hn0y">  integration-test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Test Action in real workflow</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          api-key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.TEST_API_KEY }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dev&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Test with different inputs</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          api-key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.TEST_API_KEY }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          verbose</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h2 id="六、发布到-github-marketplace" tabindex="-1">六、发布到 GitHub Marketplace <a class="header-anchor" href="#六、发布到-github-marketplace" aria-label="Permalink to &quot;六、发布到 GitHub Marketplace&quot;">​</a></h2><h3 id="_6-1-准备发布" tabindex="-1">6.1 准备发布 <a class="header-anchor" href="#_6-1-准备发布" aria-label="Permalink to &quot;6.1 准备发布&quot;">​</a></h3><ol><li><p><strong>完善 README.md</strong>：</p><ul><li>清晰的使用说明</li><li>输入/输出参数文档</li><li>使用示例</li><li>贡献指南</li></ul></li><li><p><strong>创建发布</strong>：</p></li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 1. 更新版本号</span></span>
<span class="line"><span class="__shiki_1t8gfj">npm</span><span class="__shiki_mdbnqw"> version</span><span class="__shiki_mdbnqw"> patch</span><span class="__shiki_21nrsd">  # 或 minor, major</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 推送标签</span></span>
<span class="line"><span class="__shiki_1t8gfj">git</span><span class="__shiki_mdbnqw"> push</span><span class="__shiki_mdbnqw"> origin</span><span class="__shiki_dzsirb"> --tags</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 在 GitHub 上创建 Release</span></span>
<span class="line"><span class="__shiki_21nrsd"># 访问：https://github.com/your-org/your-action/releases/new</span></span></code></pre></div><h3 id="_6-2-marketplace-清单要求" tabindex="-1">6.2 Marketplace 清单要求 <a class="header-anchor" href="#_6-2-marketplace-清单要求" aria-label="Permalink to &quot;6.2 Marketplace 清单要求&quot;">​</a></h3><p>在 action.yml 中添加 marketplace 专用字段：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Advanced Code Scanner&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Scans code for security vulnerabilities and code quality issues&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># Marketplace 分类</span></span>
<span class="line"><span class="__shiki_17hn0y">branding</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  icon</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;shield&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  color</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;blue&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd"># 详细描述（支持 Markdown）</span></span>
<span class="line"><span class="__shiki_17hn0y">long-description</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">  # Advanced Code Scanner</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  This action performs comprehensive code analysis including:</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  ## Features</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  - **Security Scanning**: Detects OWASP Top 10 vulnerabilities</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - **Code Quality**: Checks code style, complexity, and best practices</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - **Dependency Analysis**: Identifies outdated or vulnerable dependencies</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  ## Usage Examples</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_mdbnqw">  \`\`\`yaml</span></span>
<span class="line"><span class="__shiki_mdbnqw">  - uses: your-org/code-scanner@v1</span></span>
<span class="line"><span class="__shiki_mdbnqw">    with:</span></span>
<span class="line"><span class="__shiki_mdbnqw">      scan-type: &#39;full&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      fail-on-issues: &#39;medium&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      output-format: &#39;sarif&#39;</span></span></code></pre></div><h2 id="outputs" tabindex="-1">Outputs <a class="header-anchor" href="#outputs" aria-label="Permalink to &quot;Outputs&quot;">​</a></h2><ul><li><code>report-path</code>: Path to the generated report</li><li><code>issue-count</code>: Total number of issues found</li><li><code>has-critical-issues</code>: Boolean indicating critical issues</li></ul><h2 id="requirements" tabindex="-1">Requirements <a class="header-anchor" href="#requirements" aria-label="Permalink to &quot;Requirements&quot;">​</a></h2><ul><li>Node.js 16+</li><li>GitHub token with repo scope</li></ul><h1 id="关键词-便于搜索" tabindex="-1">关键词（便于搜索） <a class="header-anchor" href="#关键词-便于搜索" aria-label="Permalink to &quot;关键词（便于搜索）&quot;">​</a></h1><p>keywords:</p><ul><li>security</li><li>scanning</li><li>code-quality</li><li>saas</li><li>dependency-check</li></ul><h1 id="支持的运行器" tabindex="-1">支持的运行器 <a class="header-anchor" href="#支持的运行器" aria-label="Permalink to &quot;支持的运行器&quot;">​</a></h1><p>runs-on:</p><ul><li>ubuntu-latest</li><li>windows-latest</li><li>macos-latest</li></ul><h1 id="认证信息-如果是商业-action" tabindex="-1">认证信息（如果是商业 Action） <a class="header-anchor" href="#认证信息-如果是商业-action" aria-label="Permalink to &quot;认证信息（如果是商业 Action）&quot;">​</a></h1><p>verified: false # 仅 GitHub 可以设置为 true verified-creator: false</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">## 七、实战：完整的自定义 Action 示例</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">### 7.1 实际案例：自动生成变更日志 Action</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">**action.yml**：</span></span>
<span class="line"><span class="__shiki_wvjl67">\`\`\`yaml</span></span>
<span class="line"><span class="__shiki_wvjl67">name: &#39;Changelog Generator&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">description: &#39;Automatically generates changelog from pull requests&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">author: &#39;Your Team&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">branding:</span></span>
<span class="line"><span class="__shiki_wvjl67">  icon: &#39;file-text&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">  color: &#39;orange&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">inputs:</span></span>
<span class="line"><span class="__shiki_wvjl67">  github-token:</span></span>
<span class="line"><span class="__shiki_wvjl67">    description: &#39;GitHub token for API access&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">    required: true</span></span>
<span class="line"><span class="__shiki_wvjl67">  from-tag:</span></span>
<span class="line"><span class="__shiki_wvjl67">    description: &#39;Start tag (exclusive)&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">    required: false</span></span>
<span class="line"><span class="__shiki_wvjl67">  to-tag:</span></span>
<span class="line"><span class="__shiki_wvjl67">    description: &#39;End tag (inclusive)&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">    required: false</span></span>
<span class="line"><span class="__shiki_wvjl67">    default: &#39;HEAD&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">  output-file:</span></span>
<span class="line"><span class="__shiki_wvjl67">    description: &#39;Path to output changelog file&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">    required: false</span></span>
<span class="line"><span class="__shiki_wvjl67">    default: &#39;CHANGELOG.md&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">  template:</span></span>
<span class="line"><span class="__shiki_wvjl67">    description: &#39;Template to use (default, keepachangelog, conventional)&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">    required: false</span></span>
<span class="line"><span class="__shiki_wvjl67">    default: &#39;default&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">outputs:</span></span>
<span class="line"><span class="__shiki_wvjl67">  changelog-path:</span></span>
<span class="line"><span class="__shiki_wvjl67">    description: &#39;Path to the generated changelog file&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">    value: \${{ steps.generate.outputs.changelog-path }}</span></span>
<span class="line"><span class="__shiki_wvjl67">  changelog-content:</span></span>
<span class="line"><span class="__shiki_wvjl67">    description: &#39;The generated changelog content&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">    value: \${{ steps.generate.outputs.changelog-content }}</span></span>
<span class="line"><span class="__shiki_wvjl67">  has-changes:</span></span>
<span class="line"><span class="__shiki_wvjl67">    description: &#39;Whether there were any changes in the range&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">    value: \${{ steps.generate.outputs.has-changes }}</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">runs:</span></span>
<span class="line"><span class="__shiki_wvjl67">  using: &#39;node20&#39;</span></span>
<span class="line"><span class="__shiki_wvjl67">  main: &#39;dist/index.js&#39;</span></span></code></pre></div><p><strong>src/index.js</strong>：</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> core</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> github</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/github&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fs&#39;</span><span class="__shiki_140thh">).promises;</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> path</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;path&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取输入</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> token</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;github-token&#39;</span><span class="__shiki_140thh">, { required: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fromTag</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;from-tag&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> toTag</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;to-tag&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> outputFile</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;output-file&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> template</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;template&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> octokit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> github.</span><span class="__shiki_1t8gfj">getOctokit</span><span class="__shiki_140thh">(token);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> context</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> github.context;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Generating changelog for \${</span><span class="__shiki_140thh">context</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">owner</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">context</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Range: \${</span><span class="__shiki_140thh">fromTag</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;beginning&#39;}..\${</span><span class="__shiki_140thh">toTag</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取标签间的 PRs</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> pulls</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> getPullRequestsBetweenTags</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      octokit,</span></span>
<span class="line"><span class="__shiki_140thh">      context.repo,</span></span>
<span class="line"><span class="__shiki_140thh">      fromTag,</span></span>
<span class="line"><span class="__shiki_140thh">      toTag</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (pulls.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      core.</span><span class="__shiki_1t8gfj">notice</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;No pull requests found in the specified range&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      core.</span><span class="__shiki_1t8gfj">setOutput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;has-changes&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;false&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 生成变更日志内容</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> changelog</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> generateChangelog</span><span class="__shiki_140thh">(pulls, template);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 写入文件</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fullPath</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> path.</span><span class="__shiki_1t8gfj">resolve</span><span class="__shiki_140thh">(process.</span><span class="__shiki_1t8gfj">cwd</span><span class="__shiki_140thh">(), outputFile);</span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_140thh"> fs.</span><span class="__shiki_1t8gfj">writeFile</span><span class="__shiki_140thh">(fullPath, changelog, </span><span class="__shiki_mdbnqw">&#39;utf-8&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Changelog written to \${</span><span class="__shiki_140thh">fullPath</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置输出</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setOutput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;changelog-path&#39;</span><span class="__shiki_140thh">, fullPath);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setOutput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;changelog-content&#39;</span><span class="__shiki_140thh">, changelog);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setOutput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;has-changes&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;true&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加到工作流摘要</span></span>
<span class="line"><span class="__shiki_140thh">    core.summary</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addHeading</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Changelog Generated&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addRaw</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Generated changelog with \${</span><span class="__shiki_140thh">pulls</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">} pull requests\`</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">addDetails</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;View Changelog&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_dzsirb">\\\`\\\`\\\`</span><span class="__shiki_mdbnqw">markdown</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\${</span><span class="__shiki_140thh">changelog</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">substring</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">500</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}...</span><span class="__shiki_dzsirb">\\n\\\`\\\`\\\`</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">      .</span><span class="__shiki_1t8gfj">write</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setFailed</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Failed to generate changelog: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> getPullRequestsBetweenTags</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">octokit</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">repo</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">fromTag</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">toTag</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 实现获取 PRs 的逻辑</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 这里简化处理</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_140thh"> { </span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">pulls</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_140thh"> octokit.rest.pulls.</span><span class="__shiki_1t8gfj">list</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">    owner: repo.owner,</span></span>
<span class="line"><span class="__shiki_140thh">    repo: repo.repo,</span></span>
<span class="line"><span class="__shiki_140thh">    state: </span><span class="__shiki_mdbnqw">&#39;closed&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    sort: </span><span class="__shiki_mdbnqw">&#39;updated&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    direction: </span><span class="__shiki_mdbnqw">&#39;desc&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    per_page: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> pulls.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">pr</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> pr.merged_at);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> generateChangelog</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">pulls</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">template</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> now</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Date</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">toISOString</span><span class="__shiki_140thh">().</span><span class="__shiki_1t8gfj">split</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;T&#39;</span><span class="__shiki_140thh">)[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  let</span><span class="__shiki_140thh"> changelog </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> \`# Changelog</span><span class="__shiki_dzsirb">\\n\\n</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  changelog </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> \`## [Unreleased] - \${</span><span class="__shiki_140thh">now</span><span class="__shiki_mdbnqw">}</span><span class="__shiki_dzsirb">\\n\\n</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 按类型分组</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> groups</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    feat: [],</span></span>
<span class="line"><span class="__shiki_140thh">    fix: [],</span></span>
<span class="line"><span class="__shiki_140thh">    docs: [],</span></span>
<span class="line"><span class="__shiki_140thh">    chore: [],</span></span>
<span class="line"><span class="__shiki_140thh">    other: []</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  pulls.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">pr</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> title</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> pr.title;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> type</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> determineChangeType</span><span class="__shiki_140thh">(title);</span></span>
<span class="line"><span class="__shiki_140thh">    groups[type].</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      title: title.</span><span class="__shiki_1t8gfj">replace</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">^</span><span class="__shiki_21q97f">(feat</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">fix</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">docs</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">chore):</span><span class="__shiki_dzsirb">\\s</span><span class="__shiki_1itgoe">*</span><span class="__shiki_mdbnqw">/</span><span class="__shiki_1itgoe">i</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;&#39;</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      number: pr.number,</span></span>
<span class="line"><span class="__shiki_140thh">      url: pr.html_url,</span></span>
<span class="line"><span class="__shiki_140thh">      author: pr.user.login</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加各个部分</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (groups.feat.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    changelog </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> \`### Features</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    groups.feat.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      changelog </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> \`- \${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">title</span><span class="__shiki_mdbnqw">} [#\${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">number</span><span class="__shiki_mdbnqw">}](\${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">url</span><span class="__shiki_mdbnqw">}) by @\${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">author</span><span class="__shiki_mdbnqw">}</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    changelog </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (groups.fix.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    changelog </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> \`### Bug Fixes</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    groups.fix.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">item</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      changelog </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> \`- \${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">title</span><span class="__shiki_mdbnqw">} [#\${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">number</span><span class="__shiki_mdbnqw">}](\${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">url</span><span class="__shiki_mdbnqw">}) by @\${</span><span class="__shiki_140thh">item</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">author</span><span class="__shiki_mdbnqw">}</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    changelog </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> &#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 添加链接</span></span>
<span class="line"><span class="__shiki_140thh">  changelog </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_mdbnqw"> \`[Unreleased]: https://github.com/\${</span><span class="__shiki_140thh">github</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">context</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">owner</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">github</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">context</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">repo</span><span class="__shiki_mdbnqw">}/compare/\${</span><span class="__shiki_140thh">fromTag</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_mdbnqw"> &#39;initial&#39;}...\${</span><span class="__shiki_140thh">toTag</span><span class="__shiki_mdbnqw">}</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> changelog;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> determineChangeType</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">title</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (title.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;feat:&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;feat&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (title.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fix:&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;fix&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (title.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;docs:&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;docs&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (title.</span><span class="__shiki_1t8gfj">startsWith</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;chore:&#39;</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_mdbnqw"> &#39;chore&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_mdbnqw"> &#39;other&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 导出用于测试</span></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> { run, generateChangelog, determineChangeType };</span></span></code></pre></div><h2 id="八、总结-自定义-action-的设计哲学" tabindex="-1">八、总结：自定义 Action 的设计哲学 <a class="header-anchor" href="#八、总结-自定义-action-的设计哲学" aria-label="Permalink to &quot;八、总结：自定义 Action 的设计哲学&quot;">​</a></h2><h3 id="_8-1-优秀-action-的特征" tabindex="-1">8.1 优秀 Action 的特征 <a class="header-anchor" href="#_8-1-优秀-action-的特征" aria-label="Permalink to &quot;8.1 优秀 Action 的特征&quot;">​</a></h3><ol><li><strong>单一职责</strong>：每个 Action 只做一件事，并做到最好</li><li><strong>明确接口</strong>：清晰的输入/输出定义，良好的文档</li><li><strong>错误友好</strong>：提供有意义的错误信息和恢复建议</li><li><strong>性能优化</strong>：快速执行，合理使用缓存</li><li><strong>向后兼容</strong>：新版本不破坏现有工作流</li><li><strong>可测试性</strong>：包含完整的测试套件</li></ol><h3 id="_8-2-维护建议" tabindex="-1">8.2 维护建议 <a class="header-anchor" href="#_8-2-维护建议" aria-label="Permalink to &quot;8.2 维护建议&quot;">​</a></h3><ul><li><strong>定期更新依赖</strong>：特别是安全相关的依赖</li><li><strong>维护变更日志</strong>：记录每个版本的变更</li><li><strong>收集用户反馈</strong>：通过 Issues 了解使用情况</li><li><strong>监控使用情况</strong>：关注 Action 在不同环境下的表现</li><li><strong>建立维护计划</strong>：明确支持周期和弃用策略</li></ul><h3 id="_8-3-安全注意事项" tabindex="-1">8.3 安全注意事项 <a class="header-anchor" href="#_8-3-安全注意事项" aria-label="Permalink to &quot;8.3 安全注意事项&quot;">​</a></h3><ol><li><strong>最小权限原则</strong>：只请求必要的权限</li><li><strong>输入验证</strong>：严格验证所有用户输入</li><li><strong>依赖审计</strong>：定期检查依赖的安全性</li><li><strong>机密处理</strong>：正确使用 GitHub Secrets，不在日志中暴露</li><li><strong>代码审查</strong>：所有更改都经过至少一人审查</li></ol><p>通过遵循这些原则和实践，你可以创建出强大、可靠且易于维护的自定义 GitHub Actions，不仅提升自己团队的工作效率，还可以贡献给更广泛的开发者社区。</p>`,84)])])}const r=a(_,[["render",l]]);export{d as __pageData,r as default};
