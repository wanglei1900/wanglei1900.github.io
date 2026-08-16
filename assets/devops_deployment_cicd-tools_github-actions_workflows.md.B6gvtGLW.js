import{_ as a,o as n,c as p,a as _}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"部署与持续交付：GitHub Actions 工作流设计完整学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/cicd-tools/github-actions/workflows.md","filePath":"devops/deployment/cicd-tools/github-actions/workflows.md"}'),i={name:"devops/deployment/cicd-tools/github-actions/workflows.md"};function l(h,s,c,e,t,k){return n(),p("div",null,[...s[0]||(s[0]=[_(`<h1 id="部署与持续交付-github-actions-工作流设计完整学习笔记" tabindex="-1">部署与持续交付：GitHub Actions 工作流设计完整学习笔记 <a class="header-anchor" href="#部署与持续交付-github-actions-工作流设计完整学习笔记" aria-label="Permalink to &quot;部署与持续交付：GitHub Actions 工作流设计完整学习笔记&quot;">​</a></h1><h2 id="_1-github-actions-核心概念深度解析" tabindex="-1">1. GitHub Actions 核心概念深度解析 <a class="header-anchor" href="#_1-github-actions-核心概念深度解析" aria-label="Permalink to &quot;1. GitHub Actions 核心概念深度解析&quot;">​</a></h2><h3 id="_1-1-github-actions-架构全景图" tabindex="-1">1.1 GitHub Actions 架构全景图 <a class="header-anchor" href="#_1-1-github-actions-架构全景图" aria-label="Permalink to &quot;1.1 GitHub Actions 架构全景图&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">┌─────────────────────────────────────────────────────────────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">│                    GitHub Actions 生态系统                  │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┬──────────────────┬───────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│   事件触发层     │   工作流执行层   │      集成扩展层       │</span></span>
<span class="line"><span class="__shiki_wvjl67">├──────────────────┼──────────────────┼───────────────────────┤</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • push/pull      │ • 运行器(Runner) │ • 官方Marketplace     │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • schedule       │ • 作业(Job)      │ • 社区Action          │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • workflow_dispatch│ • 步骤(Step)   │ • 自定义Action       │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • repository_dispatch│ • 容器(Container)│ • 第三方服务集成  │</span></span>
<span class="line"><span class="__shiki_wvjl67">│ • webhook        │ • 服务容器       │ • 私有Registry       │</span></span>
<span class="line"><span class="__shiki_wvjl67">└──────────────────┴──────────────────┴───────────────────────┘</span></span></code></pre></div><h3 id="_1-2-核心组件详解" tabindex="-1">1.2 核心组件详解 <a class="header-anchor" href="#_1-2-核心组件详解" aria-label="Permalink to &quot;1.2 核心组件详解&quot;">​</a></h3><h4 id="_1-2-1-运行器-runner" tabindex="-1">1.2.1 运行器 (Runner) <a class="header-anchor" href="#_1-2-1-运行器-runner" aria-label="Permalink to &quot;1.2.1 运行器 (Runner)&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 自托管运行器配置示例</span></span>
<span class="line"><span class="__shiki_21nrsd"># .github/runner/runner.yaml</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production-runner&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">labels</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">linux</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">x64</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;production-group&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">workFolder</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;_work&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 运行器类型对比</span></span>
<span class="line"><span class="__shiki_17hn0y">runner_types</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  github_hosted</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">windows-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">macos-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    specs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">2-core CPU</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">7GB RAM</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">14GB SSD</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    pros</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;无需维护，预装工具&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cons</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;使用限制，成本较高&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  self_hosted</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">任何支持的操作系统</span></span>
<span class="line"><span class="__shiki_17hn0y">    specs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">自定义配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    pros</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;完全控制，无使用限制&quot;</span></span>
<span class="line"><span class="__shiki_17hn0y">    cons</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;需要维护，安全责任&quot;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  larger_runner</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    specs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">4-64核 CPU</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">16-256GB RAM</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    use_cases</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&quot;大规模构建，机器学习训练&quot;</span></span></code></pre></div><h4 id="_1-2-2-工作流文件结构" tabindex="-1">1.2.2 工作流文件结构 <a class="header-anchor" href="#_1-2-2-工作流文件结构" aria-label="Permalink to &quot;1.2.2 工作流文件结构&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 完整工作流文件结构</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">CI/CD Pipeline</span><span class="__shiki_21nrsd">                    # 工作流名称</span></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:                                     </span><span class="__shiki_21nrsd"># 触发条件</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [ </span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">develop</span><span class="__shiki_140thh"> ]</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;src/**&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;package.json&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;.github/workflows/**&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  pull_request</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [ </span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh"> ]</span></span>
<span class="line"><span class="__shiki_17hn0y">    types</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">opened</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">synchronize</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">reopened</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  schedule</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cron</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0 2 * * 1-5&#39;</span><span class="__shiki_21nrsd">              # 工作日凌晨2点</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  workflow_dispatch</span><span class="__shiki_140thh">:                    </span><span class="__shiki_21nrsd"># 手动触发</span></span>
<span class="line"><span class="__shiki_17hn0y">    inputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;部署环境&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">choice</span></span>
<span class="line"><span class="__shiki_17hn0y">        options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">staging</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      version</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;部署版本&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">string</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">env</span><span class="__shiki_140thh">:                                    </span><span class="__shiki_21nrsd"># 全局环境变量</span></span>
<span class="line"><span class="__shiki_17hn0y">  NODE_VERSION</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;18.x&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  REGISTRY</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;ghcr.io&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  DOCKER_IMAGE_NAME</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;\${{ github.repository }}&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">concurrency</span><span class="__shiki_140thh">:                           </span><span class="__shiki_21nrsd"># 并发控制</span></span>
<span class="line"><span class="__shiki_17hn0y">  group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.ref }}</span></span>
<span class="line"><span class="__shiki_17hn0y">  cancel-in-progress</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:                                  </span><span class="__shiki_21nrsd"># 作业定义开始</span></span>
<span class="line"><span class="__shiki_17hn0y">  test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run Tests</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_dzsirb">    ...</span></span></code></pre></div><h2 id="_2-高级事件触发机制" tabindex="-1">2. 高级事件触发机制 <a class="header-anchor" href="#_2-高级事件触发机制" aria-label="Permalink to &quot;2. 高级事件触发机制&quot;">​</a></h2><h3 id="_2-1-精细化的路径过滤" tabindex="-1">2.1 精细化的路径过滤 <a class="header-anchor" href="#_2-1-精细化的路径过滤" aria-label="Permalink to &quot;2.1 精细化的路径过滤&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 包含路径模式</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;src/**&#39;</span><span class="__shiki_21nrsd">                      # src目录下的任何更改</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;tests/**&#39;</span><span class="__shiki_21nrsd">                    # tests目录下的任何更改</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;package.json&#39;</span><span class="__shiki_21nrsd">                # package.json文件更改</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;Dockerfile&#39;</span><span class="__shiki_21nrsd">                  # Dockerfile更改</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;.github/workflows/**&#39;</span><span class="__shiki_21nrsd">        # 工作流文件更改</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 排除路径模式</span></span>
<span class="line"><span class="__shiki_17hn0y">    paths-ignore</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;docs/**&#39;</span><span class="__shiki_21nrsd">                     # 忽略docs目录</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;*.md&#39;</span><span class="__shiki_21nrsd">                        # 忽略Markdown文件</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;LICENSE&#39;</span><span class="__shiki_21nrsd">                     # 忽略LICENSE文件</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 分支过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;releases/**&#39;</span><span class="__shiki_21nrsd">                 # releases/下的所有分支</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;feature/**&#39;</span><span class="__shiki_21nrsd">                  # feature/下的所有分支</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 标签过滤</span></span>
<span class="line"><span class="__shiki_17hn0y">    tags</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;v*&#39;</span><span class="__shiki_21nrsd">                          # v开头的标签</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;release-*&#39;</span><span class="__shiki_21nrsd">                   # release-开头的标签</span></span></code></pre></div><h3 id="_2-2-复杂的事件类型" tabindex="-1">2.2 复杂的事件类型 <a class="header-anchor" href="#_2-2-复杂的事件类型" aria-label="Permalink to &quot;2.2 复杂的事件类型&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 完整的pull_request事件配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  pull_request</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    types</span><span class="__shiki_140thh">:                           </span><span class="__shiki_21nrsd"># 事件类型细分</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">opened</span><span class="__shiki_21nrsd">                       # PR打开</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">edited</span><span class="__shiki_21nrsd">                       # PR编辑</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">synchronize</span><span class="__shiki_21nrsd">                  # 新提交推送到PR分支</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">reopened</span><span class="__shiki_21nrsd">                     # PR重新打开</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">ready_for_review</span><span class="__shiki_21nrsd">             # 准备review</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">review_requested</span><span class="__shiki_21nrsd">             # review请求</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">review_request_removed</span><span class="__shiki_21nrsd">       # review请求移除</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">labeled</span><span class="__shiki_21nrsd">                      # 添加标签</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">unlabeled</span><span class="__shiki_21nrsd">                    # 移除标签</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">assigned</span><span class="__shiki_21nrsd">                     # 分配人员</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">unassigned</span><span class="__shiki_21nrsd">                   # 取消分配</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">closed</span><span class="__shiki_21nrsd">                       # 关闭</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 基于标签的条件触发</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      github.event.pull_request.draft == false &amp;&amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      contains(github.event.pull_request.labels.*.name, &#39;ready-for-merge&#39;)</span></span></code></pre></div><h3 id="_2-3-跨仓库和工作流触发" tabindex="-1">2.3 跨仓库和工作流触发 <a class="header-anchor" href="#_2-3-跨仓库和工作流触发" aria-label="Permalink to &quot;2.3 跨仓库和工作流触发&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 仓库分发事件 (repository_dispatch)</span></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  repository_dispatch</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    types</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">deploy-request</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">cleanup-request</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">data-sync-complete</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 在其他仓库触发</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger External Workflow</span></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">push</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  trigger-external</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trigger workflow in another repo</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">convictional/trigger-workflow-and-wait@v1.6.3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          owner</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">organization-name</span></span>
<span class="line"><span class="__shiki_17hn0y">          repo</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">another-repo</span></span>
<span class="line"><span class="__shiki_17hn0y">          github_token</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.ORG_TOKEN }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          workflow_file_name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">          ref</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_17hn0y">          wait_interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">          client_payload</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;{&quot;environment&quot;: &quot;production&quot;, &quot;version&quot;: &quot;\${{ github.sha }}&quot;}&#39;</span></span></code></pre></div><h2 id="_3-作业设计与优化策略" tabindex="-1">3. 作业设计与优化策略 <a class="header-anchor" href="#_3-作业设计与优化策略" aria-label="Permalink to &quot;3. 作业设计与优化策略&quot;">​</a></h2><h3 id="_3-1-作业依赖与条件控制" tabindex="-1">3.1 作业依赖与条件控制 <a class="header-anchor" href="#_3-1-作业依赖与条件控制" aria-label="Permalink to &quot;3.1 作业依赖与条件控制&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  lint</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Lint Code</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:                          </span><span class="__shiki_21nrsd"># 作业输出定义</span></span>
<span class="line"><span class="__shiki_17hn0y">      eslint_status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.eslint.outcome }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      passed</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.check.outputs.passed }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run ESLint</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">eslint</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run lint</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Check results</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">check</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ $? -eq 0 ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;passed=true&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">          else</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;passed=false&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run Tests</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lint</span><span class="__shiki_21nrsd">                       # 依赖lint作业</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      needs.lint.outputs.passed == &#39;true&#39; &amp;&amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      github.event_name == &#39;pull_request&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">16.x</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">18.x</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">windows-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node.js</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.node-version }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          cache</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;npm&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm ci</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run tests</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm test</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          CI</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">          NODE_ENV</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload coverage</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">codecov/codecov-action@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          token</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.CODECOV_TOKEN }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy to Production</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">lint</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">test</span><span class="__shiki_140thh">]              </span><span class="__shiki_21nrsd"># 依赖多个作业</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      always() &amp;&amp;                    # 即使前面作业失败也执行</span></span>
<span class="line"><span class="__shiki_mdbnqw">      github.ref == &#39;refs/heads/main&#39; &amp;&amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      contains(needs.*.result, &#39;success&#39;)</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">    permissions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      contents</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">read</span></span>
<span class="line"><span class="__shiki_17hn0y">      deployments</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 部署步骤</span></span></code></pre></div><h3 id="_3-2-矩阵策略高级用法" tabindex="-1">3.2 矩阵策略高级用法 <a class="header-anchor" href="#_3-2-矩阵策略高级用法" aria-label="Permalink to &quot;3.2 矩阵策略高级用法&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  build-and-test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.os }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基础矩阵</span></span>
<span class="line"><span class="__shiki_17hn0y">        os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">windows-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">macos-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">16.x</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">18.x</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">20.x</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 排除特定组合</span></span>
<span class="line"><span class="__shiki_17hn0y">        exclude</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">windows-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">            node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">20.x</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 包含额外组合</span></span>
<span class="line"><span class="__shiki_17hn0y">        include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">            node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">14.x</span></span>
<span class="line"><span class="__shiki_17hn0y">            experimental</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">            node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">22.x</span></span>
<span class="line"><span class="__shiki_17hn0y">            experimental</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 失败处理策略</span></span>
<span class="line"><span class="__shiki_17hn0y">        fail-fast</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">              # 一个失败不停止其他</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 最大并行数</span></span>
<span class="line"><span class="__shiki_17hn0y">        max-parallel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build on \${{ matrix.os }} with Node \${{ matrix.node-version }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Checkout</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node.js</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.node-version }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run build</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Test</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">matrix.experimental != &#39;true&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm test</span></span></code></pre></div><h3 id="_3-3-容器化作业与服务容器" tabindex="-1">3.3 容器化作业与服务容器 <a class="header-anchor" href="#_3-3-容器化作业与服务容器" aria-label="Permalink to &quot;3.3 容器化作业与服务容器&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  integration-tests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 主容器配置</span></span>
<span class="line"><span class="__shiki_17hn0y">    container</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">node:18-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">      env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        NODE_ENV</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test</span></span>
<span class="line"><span class="__shiki_17hn0y">      ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_dzsirb">3000</span></span>
<span class="line"><span class="__shiki_17hn0y">      volumes</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        - </span><span class="__shiki_mdbnqw">/var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span class="__shiki_17hn0y">      options</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">--privileged</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 服务容器（数据库、缓存等）</span></span>
<span class="line"><span class="__shiki_17hn0y">    services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      postgres</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres:15-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          POSTGRES_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres</span></span>
<span class="line"><span class="__shiki_17hn0y">          POSTGRES_DB</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">testdb</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">5432:5432</span></span>
<span class="line"><span class="__shiki_17hn0y">        options</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;-</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-cmd pg_isready</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-interval 10s</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-timeout 5s</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-retries 5</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      redis</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis:7-alpine</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">6379:6379</span></span>
<span class="line"><span class="__shiki_17hn0y">        options</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;-</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-cmd &quot;redis-cli ping&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-interval 10s</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-timeout 5s</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-retries 5</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      localstack</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">localstack/localstack:latest</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          SERVICES</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">s3,sqs,dynamodb</span></span>
<span class="line"><span class="__shiki_17hn0y">          DEBUG</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">4566:4566</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Checkout</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm ci</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm install -g wait-on</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Wait for services</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          wait-on tcp:localhost:5432 &amp;&amp; echo &quot;PostgreSQL is ready&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          wait-on tcp:localhost:6379 &amp;&amp; echo &quot;Redis is ready&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          wait-on tcp:localhost:4566 &amp;&amp; echo &quot;LocalStack is ready&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run integration tests</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          DATABASE_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgresql://postgres:postgres@postgres:5432/testdb</span></span>
<span class="line"><span class="__shiki_17hn0y">          REDIS_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">redis://redis:6379</span></span>
<span class="line"><span class="__shiki_17hn0y">          AWS_ENDPOINT</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">http://localstack:4566</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run test:integration</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload test results</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">integration-test-results</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-results/</span></span></code></pre></div><h2 id="_4-步骤-step-高级技巧" tabindex="-1">4. 步骤(Step)高级技巧 <a class="header-anchor" href="#_4-步骤-step-高级技巧" aria-label="Permalink to &quot;4. 步骤(Step)高级技巧&quot;">​</a></h2><h3 id="_4-1-步骤条件与错误处理" tabindex="-1">4.1 步骤条件与错误处理 <a class="header-anchor" href="#_4-1-步骤条件与错误处理" aria-label="Permalink to &quot;4.1 步骤条件与错误处理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Check code style</span></span>
<span class="line"><span class="__shiki_17hn0y">    id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">style-check</span></span>
<span class="line"><span class="__shiki_17hn0y">    continue-on-error</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_21nrsd">          # 失败继续执行</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run lint</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Analyze lint results</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">steps.style-check.outcome == &#39;failure&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;Linting failed but continuing...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 生成报告</span></span>
<span class="line"><span class="__shiki_mdbnqw">      npm run lint:report &gt; lint-report.json</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload lint report</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always() &amp;&amp; steps.style-check.outcome == &#39;failure&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">    with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lint-report</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lint-report.json</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run tests</span></span>
<span class="line"><span class="__shiki_17hn0y">    timeout-minutes</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_21nrsd">              # 设置超时</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm test</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Handle test failure</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">failure()</span><span class="__shiki_21nrsd">                    # 仅在失败时执行</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;Tests failed! Sending notification...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 发送通知逻辑</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Always run cleanup</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span><span class="__shiki_21nrsd">                     # 总是执行</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;Cleaning up resources...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 清理逻辑</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Conditional step</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      github.event_name == &#39;push&#39; &amp;&amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      github.ref == &#39;refs/heads/main&#39; &amp;&amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      !contains(github.event.commits[0].message, &#39;[skip-ci]&#39;)</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;This step runs only on main branch push without [skip-ci]&quot;</span></span></code></pre></div><h3 id="_4-2-环境变量与秘密管理" tabindex="-1">4.2 环境变量与秘密管理 <a class="header-anchor" href="#_4-2-环境变量与秘密管理" aria-label="Permalink to &quot;4.2 环境变量与秘密管理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 全局环境变量</span></span>
<span class="line"><span class="__shiki_17hn0y">  NODE_ENV</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">  CI</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  GITHUB_TOKEN</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">    env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 作业级环境变量</span></span>
<span class="line"><span class="__shiki_17hn0y">      AWS_REGION</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east-1</span></span>
<span class="line"><span class="__shiki_17hn0y">      ECR_REGISTRY</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.AWS_ACCOUNT_ID }}.dkr.ecr.\${{ env.AWS_REGION }}.amazonaws.com</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup environment</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          # 步骤级环境变量</span></span>
<span class="line"><span class="__shiki_17hn0y">          DATABASE_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.DATABASE_URL }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          API_KEY</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.API_KEY }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          SENTRY_DSN</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.SENTRY_DSN }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 敏感信息处理</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;DATABASE_URL is set: \${#DATABASE_URL} characters&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;API_KEY=\${API_KEY:0:4}****&quot;  # 部分显示</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 动态设置环境变量</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;BUILD_VERSION=\${{ github.sha }}&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;BUILD_DATE=$(date -u +&#39;%Y-%m-%dT%H:%M:%SZ&#39;)&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 设置路径</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;$HOME/.local/bin&quot; &gt;&gt; $GITHUB_PATH</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Use build version</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Building version: $BUILD_VERSION&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Build date: $BUILD_DATE&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Mask sensitive data</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 将敏感输出添加为mask</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::add-mask::\${{ secrets.API_KEY }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::add-mask::password123&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 添加group和endgroup</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::group::Debug Information&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Repository: \${{ github.repository }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Ref: \${{ github.ref }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;SHA: \${{ github.sha }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::endgroup::&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Create JSON configuration</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 使用jq创建包含secrets的配置文件</span></span>
<span class="line"><span class="__shiki_mdbnqw">          jq -n \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --arg api_key &quot;\${{ secrets.API_KEY }}&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --arg db_url &quot;\${{ secrets.DATABASE_URL }}&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &#39;{</span></span>
<span class="line"><span class="__shiki_mdbnqw">              api: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                key: $api_key</span></span>
<span class="line"><span class="__shiki_mdbnqw">              },</span></span>
<span class="line"><span class="__shiki_mdbnqw">              database: {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                url: $db_url</span></span>
<span class="line"><span class="__shiki_mdbnqw">              }</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }&#39; &gt; config.json</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 保护配置文件权限</span></span>
<span class="line"><span class="__shiki_mdbnqw">          chmod 600 config.json</span></span></code></pre></div><h3 id="_4-3-高级输出与状态管理" tabindex="-1">4.3 高级输出与状态管理 <a class="header-anchor" href="#_4-3-高级输出与状态管理" aria-label="Permalink to &quot;4.3 高级输出与状态管理&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup outputs</span></span>
<span class="line"><span class="__shiki_17hn0y">    id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">setup</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 设置输出变量</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;branch=\${GITHUB_REF#refs/heads/}&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;timestamp=$(date +%s)&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;random_id=\${RANDOM}&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 设置多行输出</span></span>
<span class="line"><span class="__shiki_mdbnqw">      cat &lt;&lt; EOF &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">      commit_message&lt;&lt;EOF2</span></span>
<span class="line"><span class="__shiki_mdbnqw">      \${{ github.event.head_commit.message }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      EOF2</span></span>
<span class="line"><span class="__shiki_mdbnqw">      EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 设置状态</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;::set-output name=status::success&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Use outputs</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;Branch: \${{ steps.setup.outputs.branch }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;Timestamp: \${{ steps.setup.outputs.timestamp }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;Commit message: \${{ steps.setup.outputs.commit_message }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 在环境中使用输出</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;BUILD_ID=\${{ steps.setup.outputs.random_id }}&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Set job summary</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 创建作业摘要</span></span>
<span class="line"><span class="__shiki_mdbnqw">      cat &lt;&lt; EOF &gt;&gt; $GITHUB_STEP_SUMMARY</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # Build Summary</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      ## Details</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - **Status**: \${{ job.status }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - **Branch**: \${{ github.ref }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      - **Commit**: \${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      ## Test Results</span></span>
<span class="line"><span class="__shiki_mdbnqw">      | Test Suite | Passed | Failed | Skipped |</span></span>
<span class="line"><span class="__shiki_mdbnqw">      |------------|--------|--------|---------|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      | Unit Tests | 95 | 5 | 0 |</span></span>
<span class="line"><span class="__shiki_mdbnqw">      | Integration | 80 | 2 | 18 |</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      ## Coverage</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ![Coverage Badge](https://img.shields.io/badge/coverage-92%25-green)</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      ## Next Steps</span></span>
<span class="line"><span class="__shiki_mdbnqw">      1. Review failed tests</span></span>
<span class="line"><span class="__shiki_mdbnqw">      2. Check deployment logs</span></span>
<span class="line"><span class="__shiki_mdbnqw">      3. Update documentation</span></span>
<span class="line"><span class="__shiki_mdbnqw">      EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 添加通知</span></span>
<span class="line"><span class="__shiki_mdbnqw">      echo &quot;::notice title=Build Complete::Build \${{ github.run_number }} completed with status: \${{ job.status }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 添加警告</span></span>
<span class="line"><span class="__shiki_mdbnqw">      if [ &quot;\${{ job.status }}&quot; = &quot;failure&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;::warning file=src/app.js,line=10,col=15::Potential memory leak detected&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      fi</span></span></code></pre></div><h2 id="_5-缓存与构件管理" tabindex="-1">5. 缓存与构件管理 <a class="header-anchor" href="#_5-缓存与构件管理" aria-label="Permalink to &quot;5. 缓存与构件管理&quot;">​</a></h2><h3 id="_5-1-智能缓存策略" tabindex="-1">5.1 智能缓存策略 <a class="header-anchor" href="#_5-1-智能缓存策略" aria-label="Permalink to &quot;5.1 智能缓存策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Checkout</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache Node.js modules</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache-npm</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/cache@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ~/.npm</span></span>
<span class="line"><span class="__shiki_mdbnqw">            node_modules</span></span>
<span class="line"><span class="__shiki_mdbnqw">            **/node_modules</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ runner.os }}-node-\${{ hashFiles(&#39;**/package-lock.json&#39;) }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          restore-keys</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            \${{ runner.os }}-node-</span></span>
<span class="line"><span class="__shiki_mdbnqw">            \${{ runner.os }}-</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache Docker layers</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/cache@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">/tmp/.buildx-cache</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ runner.os }}-buildx-\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          restore-keys</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            \${{ runner.os }}-buildx-</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache pip packages</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/cache@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">~/.cache/pip</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ runner.os }}-pip-\${{ hashFiles(&#39;**/requirements.txt&#39;) }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">steps.cache-npm.outputs.cache-hit != &#39;true&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm ci --prefer-offline</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build application</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run build</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache build output</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/cache@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dist</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ runner.os }}-build-\${{ github.sha }}</span></span></code></pre></div><h3 id="_5-2-构件管理高级模式" tabindex="-1">5.2 构件管理高级模式 <a class="header-anchor" href="#_5-2-构件管理高级模式" aria-label="Permalink to &quot;5.2 构件管理高级模式&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build artifacts</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 构建不同环境的构件</span></span>
<span class="line"><span class="__shiki_mdbnqw">      npm run build:production</span></span>
<span class="line"><span class="__shiki_mdbnqw">      npm run build:staging</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 创建版本化构件</span></span>
<span class="line"><span class="__shiki_mdbnqw">      mkdir -p artifacts/\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      cp -r dist/* artifacts/\${{ github.sha }}/</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 创建latest符号链接</span></span>
<span class="line"><span class="__shiki_mdbnqw">      ln -sfn \${{ github.sha }} artifacts/latest</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload production artifact</span></span>
<span class="line"><span class="__shiki_17hn0y">    uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">    with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-build-\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        dist/production/</span></span>
<span class="line"><span class="__shiki_mdbnqw">        !dist/production/**/*.map          # 排除source maps</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention-days</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">      if-no-files-found</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">error</span></span>
<span class="line"><span class="__shiki_17hn0y">      compression-level</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">9</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload staging artifact</span></span>
<span class="line"><span class="__shiki_17hn0y">    uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">    with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">staging-build-\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">dist/staging/</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention-days</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">7</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload test results</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">    uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">    with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-results-\${{ github.run_number }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        coverage/</span></span>
<span class="line"><span class="__shiki_mdbnqw">        test-results/</span></span>
<span class="line"><span class="__shiki_mdbnqw">        junit.xml</span></span>
<span class="line"><span class="__shiki_17hn0y">      retention-days</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">90</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Download and merge artifacts</span></span>
<span class="line"><span class="__shiki_17hn0y">    uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/download-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">    with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production-build-\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">downloaded-artifacts</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">List artifacts</span></span>
<span class="line"><span class="__shiki_17hn0y">    run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      # 使用GitHub API列出构件</span></span>
<span class="line"><span class="__shiki_mdbnqw">      artifacts_url=&quot;https://api.github.com/repos/\${{ github.repository }}/actions/runs/\${{ github.run_id }}/artifacts&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      curl -s -H &quot;Authorization: Bearer \${{ secrets.GITHUB_TOKEN }}&quot; $artifacts_url | jq &#39;.artifacts[] | .name&#39;</span></span></code></pre></div><h2 id="_6-可重用工作流与自定义action" tabindex="-1">6. 可重用工作流与自定义Action <a class="header-anchor" href="#_6-可重用工作流与自定义action" aria-label="Permalink to &quot;6. 可重用工作流与自定义Action&quot;">​</a></h2><h3 id="_6-1-可重用工作流设计" tabindex="-1">6.1 可重用工作流设计 <a class="header-anchor" href="#_6-1-可重用工作流设计" aria-label="Permalink to &quot;6.1 可重用工作流设计&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .github/workflows/reusable-ci.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Reusable CI Pipeline</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  workflow_call</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    inputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      node_versions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Node.js versions to test&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">        default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;[16.x, 18.x, 20.x]&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">string</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      run_tests</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Whether to run tests&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">        default</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">boolean</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Deployment environment&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">        default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;test&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">string</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      build_status</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Build status&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ jobs.build.outputs.status }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">      test_coverage</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Test coverage percentage&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ jobs.test.outputs.coverage }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      NPM_TOKEN</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">      DATABASE_URL</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  lint</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Lint Code</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run linters</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">wearerequired/lint-action@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          eslint</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">          eslint_extensions</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">js,ts,jsx,tsx</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build Application</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">lint</span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.build.outputs.status }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node.js</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ fromJSON(inputs.node_versions)[0] }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          registry-url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;https://registry.npmjs.org&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          NPM_TOKEN</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.NPM_TOKEN }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;//registry.npmjs.org/:_authToken=$NPM_TOKEN&quot; &gt; ~/.npmrc</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm ci</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm run build</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;status=success&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run Tests</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ inputs.run_tests }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      coverage</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.coverage.outputs.percentage }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      DATABASE_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.DATABASE_URL }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run tests with coverage</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">coverage</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm test -- --coverage</span></span>
<span class="line"><span class="__shiki_mdbnqw">          COVERAGE=$(cat coverage/coverage-summary.json | jq &#39;.total.lines.pct&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;percentage=$COVERAGE&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload coverage</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">codecov/codecov-action@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          token</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.CODECOV_TOKEN }}</span></span></code></pre></div><h3 id="_6-2-调用可重用工作流" tabindex="-1">6.2 调用可重用工作流 <a class="header-anchor" href="#_6-2-调用可重用工作流" aria-label="Permalink to &quot;6.2 调用可重用工作流&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># .github/workflows/main-ci.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Main CI Pipeline</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">develop</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  pull_request</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  call-reusable-workflow</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run CI Pipeline</span></span>
<span class="line"><span class="__shiki_17hn0y">    uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./.github/workflows/reusable-ci.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">    with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      node_versions</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;[18.x, 20.x]&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">      run_tests</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.event_name == &#39;pull_request&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.ref == &#39;refs/heads/main&#39; &amp;&amp; &#39;production&#39; || &#39;staging&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      DATABASE_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.DATABASE_URL }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      NPM_TOKEN</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.NPM_TOKEN }}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  security-scan</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Security Scan</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">call-reusable-workflow</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run Snyk</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">snyk/actions/node@master</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          SNYK_TOKEN</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.SNYK_TOKEN }}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy Application</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">call-reusable-workflow</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">security-scan</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">      github.event_name == &#39;push&#39; &amp;&amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      github.ref == &#39;refs/heads/main&#39; &amp;&amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      needs.call-reusable-workflow.result == &#39;success&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy to production</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;Deploying...&quot;</span></span></code></pre></div><h3 id="_6-3-自定义action开发" tabindex="-1">6.3 自定义Action开发 <a class="header-anchor" href="#_6-3-自定义action开发" aria-label="Permalink to &quot;6.3 自定义Action开发&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># action.yml</span></span>
<span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Deploy to Kubernetes&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Deploy application to Kubernetes cluster&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">author</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Your Team&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">branding</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  icon</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;cloud&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  color</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;blue&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">inputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cluster_name</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Kubernetes cluster name&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;production&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  namespace</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Kubernetes namespace&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;default&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  image_tag</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Docker image tag to deploy&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;latest&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  deployment_file</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Path to deployment YAML file&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;k8s/deployment.yaml&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  wait_for_rollout</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Wait for rollout to complete&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;true&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  deployment_status</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Status of the deployment&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.deploy.outputs.status }}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  deployment_url</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;URL of the deployed application&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    value</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.get_url.outputs.url }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">runs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  using</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;composite&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Configure kubectl</span></span>
<span class="line"><span class="__shiki_17hn0y">      shell</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bash</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;Configuring kubectl for cluster: \${{ inputs.cluster_name }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        # 配置kubectl逻辑</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;KUBECONFIG=/tmp/kubeconfig&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Update deployment image</span></span>
<span class="line"><span class="__shiki_17hn0y">      shell</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bash</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;Updating deployment image to tag: \${{ inputs.image_tag }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        kubectl set image deployment/app \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          app=ghcr.io/\${{ github.repository }}:\${{ inputs.image_tag }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --namespace \${{ inputs.namespace }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Wait for rollout</span></span>
<span class="line"><span class="__shiki_17hn0y">      if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ inputs.wait_for_rollout == &#39;true&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      shell</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bash</span></span>
<span class="line"><span class="__shiki_17hn0y">      id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        echo &quot;Waiting for rollout to complete...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        kubectl rollout status deployment/app \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --namespace \${{ inputs.namespace }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --timeout=300s</span></span>
<span class="line"><span class="__shiki_mdbnqw">        </span></span>
<span class="line"><span class="__shiki_mdbnqw">        if [ $? -eq 0 ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;status=success&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">        else</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;status=failed&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Get service URL</span></span>
<span class="line"><span class="__shiki_17hn0y">      shell</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">bash</span></span>
<span class="line"><span class="__shiki_17hn0y">      id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">get_url</span></span>
<span class="line"><span class="__shiki_17hn0y">      run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">        if [ &quot;\${{ inputs.cluster_name }}&quot; = &quot;production&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;url=https://app.example.com&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">        else</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;url=https://\${{ inputs.cluster_name }}.example.com&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fi</span></span></code></pre></div><h3 id="_6-4-javascript-action开发" tabindex="-1">6.4 JavaScript Action开发 <a class="header-anchor" href="#_6-4-javascript-action开发" aria-label="Permalink to &quot;6.4 JavaScript Action开发&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// action.yml for JavaScript Action</span></span>
<span class="line"><span class="__shiki_1t8gfj">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Custom GitHub Action&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;A custom GitHub Action written in JavaScript&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">inputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">  input1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;First input&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_1t8gfj">  input2</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Second input&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_1itgoe">    default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;default-value&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">  output1</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;First output&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  output2</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">    description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Second output&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">runs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_1t8gfj">  using</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;node20&#39;</span></span>
<span class="line"><span class="__shiki_1t8gfj">  main</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;dist/index.js&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// src/main.js</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> core</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/core&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> github</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@actions/github&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> run</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取输入</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> input1</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;input1&#39;</span><span class="__shiki_140thh">, { required: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> input2</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;input2&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 获取上下文</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> context</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> github.context;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> octokit</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> github.</span><span class="__shiki_1t8gfj">getOctokit</span><span class="__shiki_140thh">(core.</span><span class="__shiki_1t8gfj">getInput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;token&#39;</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 业务逻辑</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Processing input1: \${</span><span class="__shiki_140thh">input1</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">debug</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Context payload: \${</span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">context</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">payload</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置输出</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setOutput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;output1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;value1&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setOutput</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;output2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;value2&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置环境变量</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">exportVariable</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;CUSTOM_VAR&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;custom-value&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 添加路径</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">addPath</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;/usr/local/custom-bin&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 状态报告</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">startGroup</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Processing Results&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">info</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Process completed successfully&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">endGroup</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送通知</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">notice</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Action completed&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      title: </span><span class="__shiki_mdbnqw">&#39;Custom Action&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      file: </span><span class="__shiki_mdbnqw">&#39;src/main.js&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      startLine: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">setFailed</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Action failed: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(error.stack);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 发送错误通知</span></span>
<span class="line"><span class="__shiki_140thh">    core.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Detailed error information&#39;</span><span class="__shiki_140thh">, {</span></span>
<span class="line"><span class="__shiki_140thh">      title: </span><span class="__shiki_mdbnqw">&#39;Error Details&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      file: </span><span class="__shiki_mdbnqw">&#39;src/main.js&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">run</span><span class="__shiki_140thh">();</span></span></code></pre></div><h2 id="_7-安全与权限管理" tabindex="-1">7. 安全与权限管理 <a class="header-anchor" href="#_7-安全与权限管理" aria-label="Permalink to &quot;7. 安全与权限管理&quot;">​</a></h2><h3 id="_7-1-最小权限原则" tabindex="-1">7.1 最小权限原则 <a class="header-anchor" href="#_7-1-最小权限原则" aria-label="Permalink to &quot;7.1 最小权限原则&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secure Pipeline</span></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">push</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 全局权限设置</span></span>
<span class="line"><span class="__shiki_17hn0y">permissions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  contents</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">read</span></span>
<span class="line"><span class="__shiki_17hn0y">  issues</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">  pull-requests</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">  deployments</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">  packages</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">  actions</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">read</span></span>
<span class="line"><span class="__shiki_17hn0y">  checks</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">  statuses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">  security-events</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  security-scan</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    permissions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      contents</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">read</span></span>
<span class="line"><span class="__shiki_17hn0y">      security-events</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run CodeQL</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github/codeql-action/init@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          languages</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">javascript, python</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run dependency check</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/dependency-review-action@v3</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run SAST scan</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">azure/pipelines-container-scan@v0</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run secret scanning</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github/ossar-action@v1</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload results</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github/codeql-action/upload-sarif@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          sarif_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">results.sarif</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">  deployment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">    permissions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      contents</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">read</span></span>
<span class="line"><span class="__shiki_17hn0y">      deployments</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">      id-token</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span><span class="__shiki_21nrsd">  # 用于OIDC令牌</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Configure AWS credentials</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-actions/configure-aws-credentials@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          role-to-assume</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">arn:aws:iam::123456789012:role/github-actions</span></span>
<span class="line"><span class="__shiki_17hn0y">          aws-region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">us-east-1</span></span>
<span class="line"><span class="__shiki_17hn0y">          role-session-name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GitHubActions-\${{ github.run_id }}</span></span></code></pre></div><h3 id="_7-2-秘密管理与注入" tabindex="-1">7.2 秘密管理与注入 <a class="header-anchor" href="#_7-2-秘密管理与注入" aria-label="Permalink to &quot;7.2 秘密管理与注入&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 避免在日志中暴露秘密</span></span>
<span class="line"><span class="__shiki_17hn0y">  SENSITIVE_DATA</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.SENSITIVE_DATA }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  handle-secrets</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Secure secret handling</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          DB_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.DB_PASSWORD }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          API_KEY</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.API_KEY }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          PRIVATE_KEY</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.PRIVATE_KEY }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 安全处理秘密</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Database password length: \${#DB_PASSWORD}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 创建加密文件</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;$PRIVATE_KEY&quot; | gpg --symmetric --cipher-algo AES256 --output private.key.gpg</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 使用临时文件</span></span>
<span class="line"><span class="__shiki_mdbnqw">          TEMP_FILE=$(mktemp)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;$API_KEY&quot; &gt; $TEMP_FILE</span></span>
<span class="line"><span class="__shiki_mdbnqw">          chmod 600 $TEMP_FILE</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 清理环境变量</span></span>
<span class="line"><span class="__shiki_mdbnqw">          unset DB_PASSWORD</span></span>
<span class="line"><span class="__shiki_mdbnqw">          unset API_KEY</span></span>
<span class="line"><span class="__shiki_mdbnqw">          unset PRIVATE_KEY</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 验证秘密未暴露</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if printenv | grep -i password; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;::error::Password found in environment!&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            exit 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Use OpenID Connect</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aws-actions/configure-aws-credentials@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          role-to-assume</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.AWS_ROLE }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          aws-region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.AWS_REGION }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          role-session-name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">GitHubActions-\${{ github.run_id }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">HashiCorp Vault integration</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">hashicorp/vault-action@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          url</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.VAULT_URL }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          token</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.VAULT_TOKEN }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          secrets</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            secret/data/production/database username | DB_USER ;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            secret/data/production/database password | DB_PASSWORD ;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Use secrets from Vault</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          DB_USER</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.vault.outputs.DB_USER }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          DB_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.vault.outputs.DB_PASSWORD }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Connecting to database...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 使用从Vault获取的秘密</span></span></code></pre></div><h2 id="_8-监控、调试与优化" tabindex="-1">8. 监控、调试与优化 <a class="header-anchor" href="#_8-监控、调试与优化" aria-label="Permalink to &quot;8. 监控、调试与优化&quot;">​</a></h2><h3 id="_8-1-工作流监控与指标" tabindex="-1">8.1 工作流监控与指标 <a class="header-anchor" href="#_8-1-工作流监控与指标" aria-label="Permalink to &quot;8.1 工作流监控与指标&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  monitor-workflow</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Extract workflow metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">metrics</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 计算工作流执行时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">          START_TIME=\${{ github.event.workflow_run.created_at }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          CURRENT_TIME=$(date -u +&quot;%Y-%m-%dT%H:%M:%SZ&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 使用GitHub API获取详细指标</span></span>
<span class="line"><span class="__shiki_mdbnqw">          WORKFLOW_DATA=$(curl -s \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            -H &quot;Authorization: Bearer \${{ secrets.GITHUB_TOKEN }}&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;https://api.github.com/repos/\${{ github.repository }}/actions/runs/\${{ github.run_id }}&quot;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;duration=$(echo $WORKFLOW_DATA | jq &#39;.run_duration_ms&#39;)&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;conclusion=$(echo $WORKFLOW_DATA | jq &#39;.conclusion&#39;)&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Send metrics to monitoring</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 发送到Datadog</span></span>
<span class="line"><span class="__shiki_mdbnqw">          curl -X POST &quot;https://api.datadoghq.com/api/v1/series&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            -H &quot;Content-Type: application/json&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            -H &quot;DD-API-KEY: \${{ secrets.DATADOG_API_KEY }}&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            -d &#39;{</span></span>
<span class="line"><span class="__shiki_mdbnqw">              &quot;series&quot;: [{</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;metric&quot;: &quot;github.workflow.duration&quot;,</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;points&quot;: [[$(date +%s), \${{ steps.metrics.outputs.duration }}]],</span></span>
<span class="line"><span class="__shiki_mdbnqw">                &quot;tags&quot;: [&quot;workflow:\${{ github.workflow }}&quot;, &quot;repo:\${{ github.repository }}&quot;]</span></span>
<span class="line"><span class="__shiki_mdbnqw">              }]</span></span>
<span class="line"><span class="__shiki_mdbnqw">            }&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Create status badge</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 生成状态徽章</span></span>
<span class="line"><span class="__shiki_mdbnqw">          STATUS=\${{ job.status }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          COLOR=\${{ job.status == &#39;success&#39; &amp;&amp; &#39;green&#39; || &#39;red&#39; }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;![Workflow Status](https://img.shields.io/badge/\${{ github.workflow }}-$STATUS-$COLOR)&quot; &gt;&gt; $GITHUB_STEP_SUMMARY</span></span></code></pre></div><h3 id="_8-2-调试与故障排除" tabindex="-1">8.2 调试与故障排除 <a class="header-anchor" href="#_8-2-调试与故障排除" aria-label="Permalink to &quot;8.2 调试与故障排除&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  debug-workflow</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Enable debug logging</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 启用步骤调试</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;ACTIONS_STEP_DEBUG=true&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;ACTIONS_RUNNER_DEBUG=true&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Debug context</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 输出完整上下文信息</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::group::GitHub Context&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Event: \${{ github.event_name }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Action: \${{ github.action }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Actor: \${{ github.actor }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Repository: \${{ github.repository }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Ref: \${{ github.ref }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;SHA: \${{ github.sha }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Workflow: \${{ github.workflow }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Run ID: \${{ github.run_id }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Run Number: \${{ github.run_number }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::endgroup::&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::group::Event Payload&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &#39;\${{ toJSON(github.event) }}&#39; | jq .</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::endgroup::&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Check runner environment</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::group::Runner Information&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          uname -a</span></span>
<span class="line"><span class="__shiki_mdbnqw">          df -h</span></span>
<span class="line"><span class="__shiki_mdbnqw">          free -h</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::endgroup::&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::group::Installed Tools&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          node --version</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm --version</span></span>
<span class="line"><span class="__shiki_mdbnqw">          python --version</span></span>
<span class="line"><span class="__shiki_mdbnqw">          docker --version</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kubectl version --client</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::endgroup::&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Network diagnostics</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::group::Network Check&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ping -c 3 github.com</span></span>
<span class="line"><span class="__shiki_mdbnqw">          curl -I https://api.github.com</span></span>
<span class="line"><span class="__shiki_mdbnqw">          nslookup github.com</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;::endgroup::&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Create debug artifact</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">failure()</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 收集调试信息</span></span>
<span class="line"><span class="__shiki_mdbnqw">          mkdir -p debug-info</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 系统信息</span></span>
<span class="line"><span class="__shiki_mdbnqw">          uname -a &gt; debug-info/system.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">          env &gt; debug-info/environment.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ps aux &gt; debug-info/processes.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 网络信息</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ifconfig &gt; debug-info/network.txt 2&gt;/dev/null || ip addr &gt; debug-info/network.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">          netstat -tulpn &gt; debug-info/ports.txt 2&gt;/dev/null || ss -tulpn &gt; debug-info/ports.txt</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload debug artifacts</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">failure()</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">debug-info-\${{ github.run_id }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">debug-info/</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Interactive debugging</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 需要时启用</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">mxschmitt/action-tmate@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          limit-access-to-actor</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span></code></pre></div><h3 id="_8-3-性能优化策略" tabindex="-1">8.3 性能优化策略 <a class="header-anchor" href="#_8-3-性能优化策略" aria-label="Permalink to &quot;8.3 性能优化策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  optimized-build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 并发控制</span></span>
<span class="line"><span class="__shiki_17hn0y">    concurrency</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      group</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.ref }}-\${{ github.workflow }}</span></span>
<span class="line"><span class="__shiki_17hn0y">      cancel-in-progress</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">18.x</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">      fail-fast</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Checkout with depth 1</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fetch-depth</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_21nrsd">           # 只拉取最近一次提交</span></span>
<span class="line"><span class="__shiki_17hn0y">          sparse-checkout</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span><span class="__shiki_21nrsd">       # 只检出必要文件</span></span>
<span class="line"><span class="__shiki_mdbnqw">            src/</span></span>
<span class="line"><span class="__shiki_mdbnqw">            package.json</span></span>
<span class="line"><span class="__shiki_mdbnqw">            package-lock.json</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache everything</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/cache@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">cache</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ~/.npm</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ~/.cache</span></span>
<span class="line"><span class="__shiki_mdbnqw">            node_modules</span></span>
<span class="line"><span class="__shiki_mdbnqw">            .next/cache</span></span>
<span class="line"><span class="__shiki_mdbnqw">            dist</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ runner.os }}-\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          restore-keys</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            \${{ runner.os }}-</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Parallel setup</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 并行安装依赖和工具</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm ci --prefer-offline --no-audit --progress=false &amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm install -g concurrently wait-on &amp;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          wait</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Parallel build tasks</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 使用concurrently并行执行任务</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npx concurrently \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;npm run build:client&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;npm run build:server&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;npm run build:styles&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --kill-others-on-fail</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Optimized Docker build</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.ref == &#39;refs/heads/main&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/build-push-action@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          context</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">.</span></span>
<span class="line"><span class="__shiki_17hn0y">          file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">./Dockerfile</span></span>
<span class="line"><span class="__shiki_17hn0y">          push</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_17hn0y">          cache-from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">type=gha</span></span>
<span class="line"><span class="__shiki_17hn0y">          cache-to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">type=gha,mode=max</span></span>
<span class="line"><span class="__shiki_17hn0y">          builder</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.buildx.outputs.name }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Size analysis</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 分析构建产物大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">          du -sh dist/</span></span>
<span class="line"><span class="__shiki_mdbnqw">          find dist/ -name &quot;*.js&quot; -exec sh -c &#39;echo &quot;{}: $(wc -c &lt; {}) bytes&quot;&#39; \\;</span></span></code></pre></div><h2 id="_9-复杂ci-cd管道设计" tabindex="-1">9. 复杂CI/CD管道设计 <a class="header-anchor" href="#_9-复杂ci-cd管道设计" aria-label="Permalink to &quot;9. 复杂CI/CD管道设计&quot;">​</a></h2><h3 id="_9-1-多环境部署管道" tabindex="-1">9.1 多环境部署管道 <a class="header-anchor" href="#_9-1-多环境部署管道" aria-label="Permalink to &quot;9.1 多环境部署管道&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Multi-Environment Deployment Pipeline</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  push</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">main</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">develop</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">&#39;release/**&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">  pull_request</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    branches</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">main</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 管道阶段定义</span></span>
<span class="line"><span class="__shiki_17hn0y">env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  REGISTRY</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ghcr.io</span></span>
<span class="line"><span class="__shiki_17hn0y">  IMAGE_NAME</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.repository }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 阶段1: 验证与测试</span></span>
<span class="line"><span class="__shiki_17hn0y">  validate</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Validate Changes</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      validation_passed</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.validate.outputs.passed }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Validate commit messages</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">wagoid/commitlint-github-action@v5</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Validate PR</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github.event_name == &#39;pull_request&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">julb/action-PR-validation@v1</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          github-token</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          require-description</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">          require-linked-issue</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Set validation result</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validate</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;passed=true&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 阶段2: 构建与测试</span></span>
<span class="line"><span class="__shiki_17hn0y">  build-and-test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build and Test</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">validate</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Unit Tests&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;test:unit&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Integration Tests&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;test:integration&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;E2E Tests&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            command</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;test:e2e&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node.js</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;18.x&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          cache</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;npm&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm ci</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run \${{ matrix.name }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm run \${{ matrix.command }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload test results</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-results-\${{ matrix.name }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">test-results/</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 阶段3: 安全扫描</span></span>
<span class="line"><span class="__shiki_17hn0y">  security</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Security Scanning</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build-and-test</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Snyk Security Scan</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">snyk/actions/node@master</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          SNYK_TOKEN</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.SNYK_TOKEN }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          args</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">--severity-threshold=high</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Trivy Vulnerability Scanner</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">aquasecurity/trivy-action@master</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          image-ref</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          format</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;sarif&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">          output</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;trivy-results.sarif&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload Trivy results</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github/codeql-action/upload-sarif@v2</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          sarif_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;trivy-results.sarif&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 阶段4: 镜像构建</span></span>
<span class="line"><span class="__shiki_17hn0y">  build-image</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build Docker Image</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">security</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github.event_name == &#39;push&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      image_tag</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.meta.outputs.tags }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Docker meta</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">meta</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/metadata-action@v5</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          images</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          tags</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            type=ref,event=branch</span></span>
<span class="line"><span class="__shiki_mdbnqw">            type=ref,event=pr</span></span>
<span class="line"><span class="__shiki_mdbnqw">            type=semver,pattern={{version}}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            type=semver,pattern={{major}}.{{minor}}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            type=sha,prefix={{branch}}-</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Set up Docker Buildx</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/setup-buildx-action@v3</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Login to Container Registry</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/login-action@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          registry</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ env.REGISTRY }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          username</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.actor }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          password</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Build and push</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">docker/build-push-action@v5</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          context</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">.</span></span>
<span class="line"><span class="__shiki_17hn0y">          push</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.event_name == &#39;push&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          tags</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.meta.outputs.tags }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          labels</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.meta.outputs.labels }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          cache-from</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">type=gha</span></span>
<span class="line"><span class="__shiki_17hn0y">          cache-to</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">type=gha,mode=max</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 阶段5: 环境部署</span></span>
<span class="line"><span class="__shiki_17hn0y">  deploy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy to \${{ inputs.environment }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build-image</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.ref == &#39;refs/heads/main&#39; &amp;&amp; &#39;production&#39; || &#39;staging&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        environment</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github.ref == &#39;refs/heads/develop&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            k8s_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;k8s/staging&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;production&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github.ref == &#39;refs/heads/main&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            namespace</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;production&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            k8s_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;k8s/production&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.if }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Configure Kubernetes</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">azure/setup-kubectl@v3</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy to \${{ matrix.environment }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kubectl apply -f \${{ matrix.k8s_file }} --namespace \${{ matrix.namespace }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kubectl rollout status deployment/app --namespace \${{ matrix.namespace }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run smoke tests</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm run test:smoke -- --environment=\${{ matrix.environment }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Notify deployment</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">8398a7/action-slack@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          status</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ job.status }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          channel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;#deployments&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          SLACK_WEBHOOK_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.SLACK_WEBHOOK_URL }}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">  # 阶段6: 监控与清理</span></span>
<span class="line"><span class="__shiki_17hn0y">  post-deployment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Post-Deployment Tasks</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deploy</span></span>
<span class="line"><span class="__shiki_17hn0y">    if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Clean up old deployments</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 清理旧的Kubernetes资源</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kubectl delete pods --field-selector=status.phase=Succeeded --namespace=default</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Update deployment tracker</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/github-script@v6</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          script</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            await github.rest.issues.create({</span></span>
<span class="line"><span class="__shiki_mdbnqw">              owner: context.repo.owner,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              repo: context.repo.repo,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              title: \`Deployment completed: \${context.sha}\`,</span></span>
<span class="line"><span class="__shiki_mdbnqw">              body: \`Deployment of \${context.sha} completed at \${new Date().toISOString()}\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">            })</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Generate deployment report</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          cat &lt;&lt; EOF &gt; deployment-report.md</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # Deployment Report</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          ## Summary</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - **Status**: \${{ needs.deploy.result }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - **Environment**: \${{ needs.deploy.outputs.environment }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - **Image**: \${{ needs.build-image.outputs.image_tag }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          - **Timestamp**: $(date)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          ## Rollback Information</span></span>
<span class="line"><span class="__shiki_mdbnqw">          To rollback, run:</span></span>
<span class="line"><span class="__shiki_mdbnqw">          \\\`\\\`\\\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">          kubectl rollout undo deployment/app --namespace=\${{ needs.deploy.outputs.namespace }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          \\\`\\\`\\\`</span></span>
<span class="line"><span class="__shiki_mdbnqw">          EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload deployment report</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deployment-report-\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">deployment-report.md</span></span></code></pre></div><h2 id="_10-最佳实践总结" tabindex="-1">10. 最佳实践总结 <a class="header-anchor" href="#_10-最佳实践总结" aria-label="Permalink to &quot;10. 最佳实践总结&quot;">​</a></h2><h3 id="_10-1-设计原则" tabindex="-1">10.1 设计原则 <a class="header-anchor" href="#_10-1-设计原则" aria-label="Permalink to &quot;10.1 设计原则&quot;">​</a></h3><ol><li><strong>保持工作流模块化</strong>：使用可重用工作流和自定义Action</li><li><strong>实施渐进式部署</strong>：分阶段验证和部署</li><li><strong>优化执行性能</strong>：利用缓存、并行执行和选择性触发</li><li><strong>确保安全性</strong>：最小权限原则和秘密管理</li><li><strong>完善监控和调试</strong>：全面的日志和指标收集</li></ol><h3 id="_10-2-性能优化清单" tabindex="-1">10.2 性能优化清单 <a class="header-anchor" href="#_10-2-性能优化清单" aria-label="Permalink to &quot;10.2 性能优化清单&quot;">​</a></h3><ul><li>[ ] 使用浅克隆（fetch-depth: 1）</li><li>[ ] 实现智能缓存策略</li><li>[ ] 并行执行独立任务</li><li>[ ] 使用自托管运行器处理大规模任务</li><li>[ ] 设置适当的超时和资源限制</li><li>[ ] 定期清理旧的构件和缓存</li></ul><h3 id="_10-3-安全最佳实践" tabindex="-1">10.3 安全最佳实践 <a class="header-anchor" href="#_10-3-安全最佳实践" aria-label="Permalink to &quot;10.3 安全最佳实践&quot;">​</a></h3><ul><li>[ ] 使用OpenID Connect代替长期凭证</li><li>[ ] 实施最小权限原则</li><li>[ ] 定期轮换秘密</li><li>[ ] 扫描依赖和镜像中的漏洞</li><li>[ ] 审计工作流执行日志</li><li>[ ] 使用环境保护机制</li></ul><h3 id="_10-4-维护与演进" tabindex="-1">10.4 维护与演进 <a class="header-anchor" href="#_10-4-维护与演进" aria-label="Permalink to &quot;10.4 维护与演进&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 工作流版本管理策略</span></span>
<span class="line"><span class="__shiki_17hn0y">versioning_strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  weekly_review</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    tasks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">检查过期的工作流</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">更新依赖的Action版本</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">优化缓存策略</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">审查安全设置</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  quarterly_audit</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    tasks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">评估性能指标</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">识别瓶颈</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">更新架构设计</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">培训团队成员</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  migration_plan</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    tasks</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">制定迁移路线图</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">创建兼容层</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">逐步替换旧工作流</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_mdbnqw">验证新工作流</span></span></code></pre></div><p>通过系统性地应用这些高级工作流设计模式，您可以构建出强大、灵活且可维护的CI/CD管道，显著提升软件交付的效率和质量。记住，最有效的工作流是那些能够随着团队和产品需求而演进的工作流。</p>`,69)])])}const m=a(i,[["render",l]]);export{o as __pageData,m as default};
