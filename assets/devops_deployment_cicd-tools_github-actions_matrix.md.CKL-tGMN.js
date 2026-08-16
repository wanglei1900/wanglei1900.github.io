import{_ as a,o as n,c as i,a as p}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"GitHub Actions 构建矩阵策略完全指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/cicd-tools/github-actions/matrix.md","filePath":"devops/deployment/cicd-tools/github-actions/matrix.md"}'),_={name:"devops/deployment/cicd-tools/github-actions/matrix.md"};function h(l,s,c,e,t,k){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="github-actions-构建矩阵策略完全指南" tabindex="-1">GitHub Actions 构建矩阵策略完全指南 <a class="header-anchor" href="#github-actions-构建矩阵策略完全指南" aria-label="Permalink to &quot;GitHub Actions 构建矩阵策略完全指南&quot;">​</a></h1><h2 id="一、构建矩阵的核心概念与价值" tabindex="-1">一、构建矩阵的核心概念与价值 <a class="header-anchor" href="#一、构建矩阵的核心概念与价值" aria-label="Permalink to &quot;一、构建矩阵的核心概念与价值&quot;">​</a></h2><h3 id="_1-1-什么是构建矩阵" tabindex="-1">1.1 什么是构建矩阵？ <a class="header-anchor" href="#_1-1-什么是构建矩阵" aria-label="Permalink to &quot;1.1 什么是构建矩阵？&quot;">​</a></h3><p>构建矩阵（Build Matrix）是 GitHub Actions 的一项<strong>高级策略功能</strong>，允许你在单个作业中<strong>自动创建多个作业变体（variations）</strong>，每个变体使用不同的参数组合运行。这实质上是基于你定义的维度（如操作系统、运行时版本、测试环境等）自动生成笛卡尔积。</p><h3 id="_1-2-为什么需要构建矩阵" tabindex="-1">1.2 为什么需要构建矩阵？ <a class="header-anchor" href="#_1-2-为什么需要构建矩阵" aria-label="Permalink to &quot;1.2 为什么需要构建矩阵？&quot;">​</a></h3><p><strong>传统方式的问题</strong>：</p><ul><li>为每个环境配置单独作业 → 配置冗余，维护困难</li><li>手动枚举所有组合 → 容易遗漏，添加新维度时需修改多处</li><li>各作业独立运行 → 缺乏统一管理和报告机制</li></ul><p><strong>构建矩阵的优势</strong>：</p><ol><li><strong>配置简洁</strong>：一份配置，多环境执行</li><li><strong>全面覆盖</strong>：确保代码在所有支持的平台/版本上正常工作</li><li><strong>维护高效</strong>：添加/移除维度只需修改一处</li><li><strong>结果聚合</strong>：统一查看所有变体的执行状态</li><li><strong>资源优化</strong>：可控制并行度，平衡速度与资源消耗</li></ol><h3 id="_1-3-基础矩阵示例" tabindex="-1">1.3 基础矩阵示例 <a class="header-anchor" href="#_1-3-基础矩阵示例" aria-label="Permalink to &quot;1.3 基础矩阵示例&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.os }}</span><span class="__shiki_21nrsd">  # 使用矩阵变量</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">windows-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">macos-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">14</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 生成 3×3 = 9 个作业变体</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Use Node.js \${{ matrix.node-version }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.node-version }}</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm test</span></span></code></pre></div><h2 id="二、矩阵策略的完整配置体系" tabindex="-1">二、矩阵策略的完整配置体系 <a class="header-anchor" href="#二、矩阵策略的完整配置体系" aria-label="Permalink to &quot;二、矩阵策略的完整配置体系&quot;">​</a></h2><h3 id="_2-1-核心配置参数" tabindex="-1">2.1 核心配置参数 <a class="header-anchor" href="#_2-1-核心配置参数" aria-label="Permalink to &quot;2.1 核心配置参数&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  matrix-job</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.os }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 矩阵定义 - 核心部分</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-22.04</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">ubuntu-20.04</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        framework</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;react&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;vue&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;angular&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        include</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 包含额外组合</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-22.04</span></span>
<span class="line"><span class="__shiki_17hn0y">            node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">22</span></span>
<span class="line"><span class="__shiki_17hn0y">            framework</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;nextjs&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            experimental</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        exclude</span><span class="__shiki_140thh">:  </span><span class="__shiki_21nrsd"># 排除特定组合</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-20.04</span></span>
<span class="line"><span class="__shiki_17hn0y">            node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">18</span></span>
<span class="line"><span class="__shiki_17hn0y">            framework</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;angular&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 策略配置</span></span>
<span class="line"><span class="__shiki_17hn0y">      fail-fast</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_21nrsd">  # 默认true，一个失败就停止所有</span></span>
<span class="line"><span class="__shiki_17hn0y">      max-parallel</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_21nrsd">   # 最大并行作业数</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Display matrix values</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;OS: \${{ matrix.os }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Node: \${{ matrix.node-version }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Framework: \${{ matrix.framework }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Experimental: \${{ matrix.experimental || &#39;false&#39; }}&quot;</span></span></code></pre></div><h3 id="_2-2-矩阵维度详解" tabindex="-1">2.2 矩阵维度详解 <a class="header-anchor" href="#_2-2-矩阵维度详解" aria-label="Permalink to &quot;2.2 矩阵维度详解&quot;">​</a></h3><h4 id="_2-2-1-操作系统矩阵" tabindex="-1">2.2.1 操作系统矩阵 <a class="header-anchor" href="#_2-2-1-操作系统矩阵" aria-label="Permalink to &quot;2.2.1 操作系统矩阵&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基本操作系统</span></span>
<span class="line"><span class="__shiki_17hn0y">  os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-22.04</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">ubuntu-20.04</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">windows-2022</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">macos-12</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">macos-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 架构维度（注意：某些组合可能不支持）</span></span>
<span class="line"><span class="__shiki_17hn0y">  os-arch</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - {</span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-22.04</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">arch</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">x64</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    - {</span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-22.04</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">arch</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ARM64</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">    - {</span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">windows-2022</span><span class="__shiki_140thh">, </span><span class="__shiki_17hn0y">arch</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">x64</span><span class="__shiki_140thh">}</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 容器运行器</span></span>
<span class="line"><span class="__shiki_17hn0y">  container-image</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">node:18-alpine</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">node:20-bullseye-slim</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">python:3.11-slim</span></span></code></pre></div><h4 id="_2-2-2-语言-运行时版本矩阵" tabindex="-1">2.2.2 语言/运行时版本矩阵 <a class="header-anchor" href="#_2-2-2-语言-运行时版本矩阵" aria-label="Permalink to &quot;2.2.2 语言/运行时版本矩阵&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 多语言多版本</span></span>
<span class="line"><span class="__shiki_17hn0y">  python-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;3.9&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;3.10&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;3.11&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;3.12&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">22</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  java-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">8</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">11</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">17</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">21</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  go-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;1.19&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;1.20&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;1.21&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 与操作系统组合</span></span>
<span class="line"><span class="__shiki_17hn0y">  include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Python特定版本需要特定OS</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">python-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3.8&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">      os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-20.04</span><span class="__shiki_21nrsd">  # 3.8在ubuntu-22.04中可能不可用</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Windows上的特定Java版本</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">java-version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">8</span></span>
<span class="line"><span class="__shiki_17hn0y">      os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">windows-2022</span></span>
<span class="line"><span class="__shiki_17hn0y">      jdk-distribution</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;zulu&#39;</span></span></code></pre></div><h4 id="_2-2-3-功能-配置矩阵" tabindex="-1">2.2.3 功能/配置矩阵 <a class="header-anchor" href="#_2-2-3-功能-配置矩阵" aria-label="Permalink to &quot;2.2.3 功能/配置矩阵&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">  # 功能标志矩阵</span></span>
<span class="line"><span class="__shiki_17hn0y">  features</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&#39;basic&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&#39;extended&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_mdbnqw">&#39;full&#39;</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 构建配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  build-type</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;debug&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;release&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  optimization-level</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;O0&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;O1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;O2&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;O3&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;Os&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 测试配置</span></span>
<span class="line"><span class="__shiki_17hn0y">  test-suite</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;unit&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;integration&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;e2e&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;performance&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  database</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;sqlite&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;postgresql&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;mysql&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 部署目标</span></span>
<span class="line"><span class="__shiki_17hn0y">  environment</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;development&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;production&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  region</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;eu-west-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ap-northeast-1&#39;</span><span class="__shiki_140thh">]</span></span></code></pre></div><h3 id="_2-3-高级矩阵运算" tabindex="-1">2.3 高级矩阵运算 <a class="header-anchor" href="#_2-3-高级矩阵运算" aria-label="Permalink to &quot;2.3 高级矩阵运算&quot;">​</a></h3><h4 id="_2-3-1-动态矩阵生成" tabindex="-1">2.3.1 动态矩阵生成 <a class="header-anchor" href="#_2-3-1-动态矩阵生成" aria-label="Permalink to &quot;2.3.1 动态矩阵生成&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  setup-matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.set-matrix.outputs.matrix }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">set-matrix</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 从外部源获取矩阵配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">          MATRIX_JSON=$(cat &lt;&lt;EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">          {</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;node-version&quot;: [&quot;18&quot;, &quot;20&quot;],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;os&quot;: [&quot;ubuntu-latest&quot;, &quot;windows-latest&quot;],</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &quot;include&quot;: [</span></span>
<span class="line"><span class="__shiki_mdbnqw">              {&quot;node-version&quot;: &quot;22&quot;, &quot;os&quot;: &quot;ubuntu-latest&quot;, &quot;experimental&quot;: true}</span></span>
<span class="line"><span class="__shiki_mdbnqw">            ]</span></span>
<span class="line"><span class="__shiki_mdbnqw">          }</span></span>
<span class="line"><span class="__shiki_mdbnqw">          EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">          )</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;matrix=$MATRIX_JSON&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">setup-matrix</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.os }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ fromJSON(needs.setup-matrix.outputs.matrix) }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">run</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">echo &quot;Testing Node \${{ matrix.node-version }} on \${{ matrix.os }}&quot;</span></span></code></pre></div><h4 id="_2-3-2-条件化矩阵扩展" tabindex="-1">2.3.2 条件化矩阵扩展 <a class="header-anchor" href="#_2-3-2-条件化矩阵扩展" aria-label="Permalink to &quot;2.3.2 条件化矩阵扩展&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基于分支的矩阵扩展</span></span>
<span class="line"><span class="__shiki_17hn0y">  \${{ github.ref == &#39;refs/heads/main&#39; &amp;&amp; &#39;include&#39; }}</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">22</span></span>
<span class="line"><span class="__shiki_17hn0y">      os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">      production</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  # 基于事件类型的排除</span></span>
<span class="line"><span class="__shiki_17hn0y">  \${{ github.event_name == &#39;pull_request&#39; &amp;&amp; &#39;exclude&#39; }}</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">16</span><span class="__shiki_21nrsd">  # PR中跳过Node 16测试以加快速度</span></span></code></pre></div><h2 id="三、矩阵策略的实际应用场景" tabindex="-1">三、矩阵策略的实际应用场景 <a class="header-anchor" href="#三、矩阵策略的实际应用场景" aria-label="Permalink to &quot;三、矩阵策略的实际应用场景&quot;">​</a></h2><h3 id="_3-1-跨平台应用测试" tabindex="-1">3.1 跨平台应用测试 <a class="header-anchor" href="#_3-1-跨平台应用测试" aria-label="Permalink to &quot;3.1 跨平台应用测试&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cross-platform Electron App Test</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">push</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">pull_request</span><span class="__shiki_140thh">]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  test-electron</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.os }}</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">windows-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">macos-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        electron-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;25&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;26&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;27&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          # Windows特定配置</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">windows-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">            arch</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">x64</span></span>
<span class="line"><span class="__shiki_17hn0y">            windows-sdk</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;10.0.22621.0&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">          # macOS特定配置</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">macos-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">            macos-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;13&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            xcode-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;14.3&#39;</span></span>
<span class="line"><span class="__shiki_21nrsd">          # Linux特定配置</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">            display-server</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;x11&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;wayland&#39;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 嵌套矩阵特性</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup Node.js and Electron</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/setup-node@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          node-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.node-version }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install dependencies</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm ci</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm install electron@\${{ matrix.electron-version }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run tests</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 平台特定的测试命令</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ &quot;\${{ matrix.os }}&quot; == &quot;windows-latest&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            npm run test:windows</span></span>
<span class="line"><span class="__shiki_mdbnqw">          elif [ &quot;\${{ matrix.os }}&quot; == &quot;macos-latest&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            npm run test:macos</span></span>
<span class="line"><span class="__shiki_mdbnqw">          else</span></span>
<span class="line"><span class="__shiki_mdbnqw">            npm run test:linux</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Package application</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github.ref == &#39;refs/heads/main&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm run package -- \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --platform=\${{ matrix.os == &#39;ubuntu-latest&#39; &amp;&amp; &#39;linux&#39; || matrix.os == &#39;windows-latest&#39; &amp;&amp; &#39;win&#39; || &#39;mac&#39; }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --arch=\${{ matrix.arch || &#39;x64&#39; }}</span></span></code></pre></div><h3 id="_3-2-微服务多环境部署" tabindex="-1">3.2 微服务多环境部署 <a class="header-anchor" href="#_3-2-微服务多环境部署" aria-label="Permalink to &quot;3.2 微服务多环境部署&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Microservices Multi-environment Deployment</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  workflow_dispatch</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    inputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      environment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        description</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Target environment&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        required</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">        default</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;staging&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">        type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">choice</span></span>
<span class="line"><span class="__shiki_17hn0y">        options</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">development</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">staging</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  deploy-services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.event.inputs.environment }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 微服务列表 - 可从配置文件动态读取</span></span>
<span class="line"><span class="__shiki_17hn0y">        service</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;auth-service&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;user-service&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;order-service&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;payment-service&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;notification-service&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 环境特定配置</span></span>
<span class="line"><span class="__shiki_17hn0y">        include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">development</span></span>
<span class="line"><span class="__shiki_17hn0y">            replica-count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">            resources</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;small&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            region</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">staging</span></span>
<span class="line"><span class="__shiki_17hn0y">            replica-count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">            resources</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;medium&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            region</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;eu-west-1&#39;</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 多区域部署</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_17hn0y">            replica-count</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">            resources</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;large&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            region</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;eu-west-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ap-northeast-1&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">            canary-percentage</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">25</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">75</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 金丝雀发布阶段</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy \${{ matrix.service }} to \${{ matrix.environment }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          REGION</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.region }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          REPLICA_COUNT</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.replica-count }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          RESOURCE_PROFILE</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.resources }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Deploying \${{ matrix.service }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Region: $REGION&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Replicas: $REPLICA_COUNT&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 实际部署命令</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ./deploy.sh \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --service \${{ matrix.service }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --environment \${{ matrix.environment }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --region $REGION \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --replicas $REPLICA_COUNT \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --resource-profile $RESOURCE_PROFILE</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Health check</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 等待服务就绪</span></span>
<span class="line"><span class="__shiki_mdbnqw">          timeout=300</span></span>
<span class="line"><span class="__shiki_mdbnqw">          interval=10</span></span>
<span class="line"><span class="__shiki_mdbnqw">          elapsed=0</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          while [ $elapsed -lt $timeout ]; do</span></span>
<span class="line"><span class="__shiki_mdbnqw">            if ./health-check.sh \${{ matrix.service }} \${{ matrix.environment }}; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">              echo &quot;\${{ matrix.service }} is healthy&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">              exit 0</span></span>
<span class="line"><span class="__shiki_mdbnqw">            fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">            sleep $interval</span></span>
<span class="line"><span class="__shiki_mdbnqw">            elapsed=$((elapsed + interval))</span></span>
<span class="line"><span class="__shiki_mdbnqw">          done</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Health check timeout for \${{ matrix.service }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          exit 1</span></span></code></pre></div><h3 id="_3-3-数据库兼容性测试" tabindex="-1">3.3 数据库兼容性测试 <a class="header-anchor" href="#_3-3-数据库兼容性测试" aria-label="Permalink to &quot;3.3 数据库兼容性测试&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Database Compatibility Test Suite</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  db-compatibility</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 动态启动不同的数据库服务</span></span>
<span class="line"><span class="__shiki_17hn0y">      database</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.db.image }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          POSTGRES_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">postgres</span></span>
<span class="line"><span class="__shiki_17hn0y">          MYSQL_ROOT_PASSWORD</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">root</span></span>
<span class="line"><span class="__shiki_17hn0y">        options</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">&gt;-</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-cmd=\${{ matrix.db.health-cmd }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-interval=10s</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-timeout=5s</span></span>
<span class="line"><span class="__shiki_mdbnqw">          --health-retries=3</span></span>
<span class="line"><span class="__shiki_17hn0y">        ports</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_mdbnqw">\${{ matrix.db.port }}:5432</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        db</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;PostgreSQL&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;postgres:15-alpine&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;15&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">5432</span></span>
<span class="line"><span class="__shiki_17hn0y">            health-cmd</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;pg_isready -U postgres&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MySQL&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;mysql:8.0&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;8.0&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3306</span></span>
<span class="line"><span class="__shiki_17hn0y">            health-cmd</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;mysqladmin ping -h 127.0.0.1&#39;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MariaDB&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            image</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;mariadb:10.11&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;10.11&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            port</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3307</span></span>
<span class="line"><span class="__shiki_17hn0y">            health-cmd</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;mysqladmin ping -h 127.0.0.1&#39;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # ORM/数据库驱动版本</span></span>
<span class="line"><span class="__shiki_17hn0y">        orm-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;2.0&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;3.0&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;4.0&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 排除不兼容的组合</span></span>
<span class="line"><span class="__shiki_17hn0y">        exclude</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">db</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">              name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;MySQL&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            orm-version</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;4.0&#39;</span><span class="__shiki_21nrsd">  # ORM 4.0暂不支持MySQL 8.0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Wait for database</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;Waiting for \${{ matrix.db.name }} \${{ matrix.db.version }} to be ready...&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          sleep 30</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Setup test environment</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 根据数据库类型设置环境变量</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;DB_TYPE=\${{ matrix.db.name }}&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;DB_VERSION=\${{ matrix.db.version }}&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;ORM_VERSION=\${{ matrix.orm-version }}&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 安装特定版本的ORM</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm install orm-library@\${{ matrix.orm-version }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run database tests</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          DATABASE_URL</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.db.name == &#39;PostgreSQL&#39; &amp;&amp; &#39;postgresql://postgres:postgres@localhost:5432/test&#39; || &#39;mysql://root:root@localhost:3306/test&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm run test:database \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            -- --db-type=\${{ matrix.db.name }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">               --db-version=\${{ matrix.db.version }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">               --orm-version=\${{ matrix.orm-version }}</span></span></code></pre></div><h2 id="四、矩阵策略的高级技巧与优化" tabindex="-1">四、矩阵策略的高级技巧与优化 <a class="header-anchor" href="#四、矩阵策略的高级技巧与优化" aria-label="Permalink to &quot;四、矩阵策略的高级技巧与优化&quot;">​</a></h2><h3 id="_4-1-性能优化策略" tabindex="-1">4.1 性能优化策略 <a class="header-anchor" href="#_4-1-性能优化策略" aria-label="Permalink to &quot;4.1 性能优化策略&quot;">​</a></h3><h4 id="_4-1-1-智能矩阵分割" tabindex="-1">4.1.1 智能矩阵分割 <a class="header-anchor" href="#_4-1-1-智能矩阵分割" aria-label="Permalink to &quot;4.1.1 智能矩阵分割&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  smart-test-suite</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 基础测试 - 快速反馈</span></span>
<span class="line"><span class="__shiki_17hn0y">        test-type</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;unit&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;integration&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 扩展测试 - 仅在特定条件下运行</span></span>
<span class="line"><span class="__shiki_17hn0y">        \${{ github.ref == &#39;refs/heads/main&#39; &amp;&amp; &#39;include&#39; }}</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">test-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;e2e&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            browser</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;chrome&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;firefox&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;safari&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">            viewport</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;desktop&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;tablet&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;mobile&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">test-type</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;performance&#39;</span></span>
<span class="line"><span class="__shiki_17hn0y">            concurrency</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">50</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">            duration</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;30s&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;1m&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;5m&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 控制并行度，避免资源耗尽</span></span>
<span class="line"><span class="__shiki_17hn0y">      max-parallel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.ref == &#39;refs/heads/main&#39; &amp;&amp; 10 || 4 }}</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 重要作业失败时快速失败</span></span>
<span class="line"><span class="__shiki_17hn0y">      fail-fast</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.test-type == &#39;unit&#39; }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Dynamic test configuration</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 基于矩阵值决定测试深度</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ &quot;\${{ matrix.test-type }}&quot; == &quot;unit&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;TEST_TIMEOUT=30&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;TEST_RETRIES=1&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">          elif [ &quot;\${{ matrix.test-type }}&quot; == &quot;e2e&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;TEST_TIMEOUT=300&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;TEST_RETRIES=2&quot; &gt;&gt; $GITHUB_ENV</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span></code></pre></div><h4 id="_4-1-2-缓存优化矩阵构建" tabindex="-1">4.1.2 缓存优化矩阵构建 <a class="header-anchor" href="#_4-1-2-缓存优化矩阵构建" aria-label="Permalink to &quot;4.1.2 缓存优化矩阵构建&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  cached-build</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        node-version</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">windows-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache node modules</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/cache@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          # 为每个矩阵组合创建独立的缓存</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">~/.npm</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">npm-\${{ matrix.os }}-\${{ matrix.node-version }}-\${{ hashFiles(&#39;**/package-lock.json&#39;) }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          restore-keys</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            npm-\${{ matrix.os }}-\${{ matrix.node-version }}-</span></span>
<span class="line"><span class="__shiki_mdbnqw">            npm-\${{ matrix.os }}-</span></span>
<span class="line"><span class="__shiki_mdbnqw">            npm-</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Cache build outputs</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/cache@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            dist/</span></span>
<span class="line"><span class="__shiki_mdbnqw">            coverage/</span></span>
<span class="line"><span class="__shiki_17hn0y">          key</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">build-\${{ matrix.os }}-\${{ matrix.node-version }}-\${{ github.sha }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          restore-keys</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            build-\${{ matrix.os }}-\${{ matrix.node-version }}-</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Install and build</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm ci</span></span>
<span class="line"><span class="__shiki_mdbnqw">          npm run build -- --env=\${{ matrix.node-version }}</span></span></code></pre></div><h3 id="_4-2-条件执行与动态控制" tabindex="-1">4.2 条件执行与动态控制 <a class="header-anchor" href="#_4-2-条件执行与动态控制" aria-label="Permalink to &quot;4.2 条件执行与动态控制&quot;">​</a></h3><h4 id="_4-2-1-基于变更的矩阵筛选" tabindex="-1">4.2.1 基于变更的矩阵筛选 <a class="header-anchor" href="#_4-2-1-基于变更的矩阵筛选" aria-label="Permalink to &quot;4.2.1 基于变更的矩阵筛选&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  changed-files-matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    outputs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ steps.changed-files.outputs.matrix }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/checkout@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          fetch-depth</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_21nrsd">  # 获取完整历史以进行diff</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Get changed files</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">changed-files</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">tj-actions/changed-files@v44</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          files</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            packages/**</span></span>
<span class="line"><span class="__shiki_mdbnqw">            services/**</span></span>
<span class="line"><span class="__shiki_17hn0y">          files_ignore</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            **/*.md</span></span>
<span class="line"><span class="__shiki_mdbnqw">            **/*.spec.ts</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Create matrix based on changes</span></span>
<span class="line"><span class="__shiki_17hn0y">        id</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">set-matrix</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 分析变更的文件，决定需要测试的服务</span></span>
<span class="line"><span class="__shiki_mdbnqw">          MATRIX_JSON=&#39;{&quot;service&quot;: []}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [[ &quot; \${{ steps.changed-files.outputs.all_changed_files }} &quot; =~ &quot; packages/auth &quot; ]]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            MATRIX_JSON=$(echo $MATRIX_JSON | jq &#39;.service += [&quot;auth-service&quot;]&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [[ &quot; \${{ steps.changed-files.outputs.all_changed_files }} &quot; =~ &quot; services/order &quot; ]]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            MATRIX_JSON=$(echo $MATRIX_JSON | jq &#39;.service += [&quot;order-service&quot;]&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 如果没有变更，则测试所有服务</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ &quot;$(echo $MATRIX_JSON | jq &#39;.service | length&#39;)&quot; -eq 0 ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            MATRIX_JSON=&#39;{&quot;service&quot;: [&quot;auth-service&quot;, &quot;user-service&quot;, &quot;order-service&quot;]}&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;matrix=$MATRIX_JSON&quot; &gt;&gt; $GITHUB_OUTPUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">  </span></span>
<span class="line"><span class="__shiki_17hn0y">  test-services</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    needs</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">changed-files-matrix</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ fromJSON(needs.changed-files-matrix.outputs.matrix) }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Test \${{ matrix.service }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_17hn0y">echo &quot;Testing service</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.service }}&quot;</span></span></code></pre></div><h4 id="_4-2-2-渐进式部署矩阵" tabindex="-1">4.2.2 渐进式部署矩阵 <a class="header-anchor" href="#_4-2-2-渐进式部署矩阵" aria-label="Permalink to &quot;4.2.2 渐进式部署矩阵&quot;">​</a></h4><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  progressive-deployment</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">    environment</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">production</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 金丝雀部署阶段</span></span>
<span class="line"><span class="__shiki_17hn0y">        stage</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          # 阶段1：1%流量，内部测试</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">stage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">            percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_17hn0y">            regions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">            health-check-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_17hn0y">            auto-rollback</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          # 阶段2：10%流量，扩大测试范围</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">stage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_17hn0y">            percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_17hn0y">            regions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;eu-west-1&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">            health-check-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_17hn0y">            auto-rollback</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          # 阶段3：50%流量</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">stage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_17hn0y">            percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">50</span></span>
<span class="line"><span class="__shiki_17hn0y">            regions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;eu-west-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ap-northeast-1&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">            health-check-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">120</span></span>
<span class="line"><span class="__shiki_17hn0y">            auto-rollback</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          # 阶段4：100%流量，全面部署</span></span>
<span class="line"><span class="__shiki_140thh">          - </span><span class="__shiki_17hn0y">stage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">4</span></span>
<span class="line"><span class="__shiki_17hn0y">            percentage</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_17hn0y">            regions</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;us-east-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;eu-west-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ap-northeast-1&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;sa-east-1&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">            health-check-interval</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_17hn0y">            auto-rollback</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Deploy stage \${{ matrix.stage }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ./deploy-canary.sh \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --stage \${{ matrix.stage }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --percentage \${{ matrix.percentage }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --regions &quot;\${{ join(matrix.regions, &#39;,&#39;) }}&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --health-check-interval \${{ matrix.health-check-interval }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Monitor and validate</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">matrix.auto-rollback</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 监控部署，如有问题自动回滚</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ./monitor-deployment.sh \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --stage \${{ matrix.stage }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --timeout 600 \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --rollback-on-failure</span></span></code></pre></div><h3 id="_4-3-错误处理与重试策略" tabindex="-1">4.3 错误处理与重试策略 <a class="header-anchor" href="#_4-3-错误处理与重试策略" aria-label="Permalink to &quot;4.3 错误处理与重试策略&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  resilient-matrix-test</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">        test-scenario</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;api&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;ui&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;load&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;security&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">        retry-count</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">]  </span><span class="__shiki_21nrsd"># 不同场景的重试次数</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      # 基于场景的失败策略</span></span>
<span class="line"><span class="__shiki_17hn0y">      fail-fast</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ !contains(matrix.test-scenario, &#39;load&#39;) }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run \${{ matrix.test-scenario }} tests</span></span>
<span class="line"><span class="__shiki_17hn0y">        continue-on-error</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.test-scenario == &#39;security&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        timeout-minutes</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.test-scenario == &#39;load&#39; &amp;&amp; 30 || 10 }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        retry-on-error</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.test-scenario != &#39;api&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        max-attempts</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.retry-count }}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 设置重试间的延迟</span></span>
<span class="line"><span class="__shiki_mdbnqw">          if [ &quot;\${{ matrix.test-scenario }}&quot; == &quot;load&quot; ]; then</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;Running load test with \${{ matrix.retry-count }} retries&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            sleep 10  # 负载测试前等待</span></span>
<span class="line"><span class="__shiki_mdbnqw">          fi</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          ./run-test.sh \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --scenario \${{ matrix.test-scenario }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --attempt \${{ github.run_attempt }}</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload test artifacts</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span><span class="__shiki_21nrsd">  # 即使失败也上传日志</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">actions/upload-artifact@v4</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.test-scenario }}-logs-attempt-\${{ github.run_attempt }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          path</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">            logs/</span></span>
<span class="line"><span class="__shiki_mdbnqw">            reports/</span></span>
<span class="line"><span class="__shiki_17hn0y">          retention-days</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">7</span></span></code></pre></div><h2 id="五、矩阵策略的最佳实践" tabindex="-1">五、矩阵策略的最佳实践 <a class="header-anchor" href="#五、矩阵策略的最佳实践" aria-label="Permalink to &quot;五、矩阵策略的最佳实践&quot;">​</a></h2><h3 id="_5-1-设计原则" tabindex="-1">5.1 设计原则 <a class="header-anchor" href="#_5-1-设计原则" aria-label="Permalink to &quot;5.1 设计原则&quot;">​</a></h3><ol><li><p><strong>保持矩阵可管理</strong>：</p><ul><li>避免创建过大的笛卡尔积（&gt; 50个作业）</li><li>使用 <code>exclude</code> 过滤不必要的组合</li><li>考虑使用动态矩阵生成</li></ul></li><li><p><strong>合理使用 include/exclude</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 好：清晰的包含/排除逻辑</span></span>
<span class="line"><span class="__shiki_17hn0y">matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  os</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">ubuntu-latest</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">windows-latest</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  node</span><span class="__shiki_140thh">: [</span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">18</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_17hn0y">  include</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">macos-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">      node</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">20</span></span>
<span class="line"><span class="__shiki_17hn0y">      experimental</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">true</span></span>
<span class="line"><span class="__shiki_17hn0y">  exclude</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 排除已知不兼容的组合</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">os</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">windows-latest</span></span>
<span class="line"><span class="__shiki_17hn0y">      node</span><span class="__shiki_140thh">: </span><span class="__shiki_dzsirb">16</span><span class="__shiki_21nrsd">  # Node 16在Windows上有已知问题</span></span></code></pre></div></li><li><p><strong>资源意识</strong>：</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 根据团队资源调整并行度</span></span>
<span class="line"><span class="__shiki_17hn0y">    max-parallel</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ github.ref == &#39;refs/heads/main&#39; &amp;&amp; 8 || 4 }}</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 重要路径快速失败</span></span>
<span class="line"><span class="__shiki_17hn0y">    fail-fast</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ contains(github.event.head_commit.message, &#39;[critical]&#39;) }}</span></span></code></pre></div></li></ol><h3 id="_5-2-监控与维护" tabindex="-1">5.2 监控与维护 <a class="header-anchor" href="#_5-2-监控与维护" aria-label="Permalink to &quot;5.2 监控与维护&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Matrix Health Check</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">on</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  schedule</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">    - </span><span class="__shiki_17hn0y">cron</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0 0 * * 0&#39;</span><span class="__shiki_21nrsd">  # 每周日运行</span></span>
<span class="line"><span class="__shiki_17hn0y">  workflow_dispatch</span><span class="__shiki_140thh">:</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  matrix-audit</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Analyze matrix configurations</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 检查矩阵配置的健康状况</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;## Matrix Configuration Audit&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;### Repository: \${{ github.repository }}&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 查找所有工作流文件中的矩阵配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">          find .github/workflows -name &quot;*.yml&quot; -o -name &quot;*.yaml&quot; | while read file; do</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;#### File: $file&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &#39;\`\`\`yaml&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            grep -A 20 &quot;strategy:&quot; &quot;$file&quot; | grep -B 20 -A 20 &quot;matrix:&quot; || true</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &#39;\`\`\`&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            echo &quot;&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          done</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Report matrix statistics</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          GITHUB_TOKEN</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets.GITHUB_TOKEN }}</span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 使用GitHub API获取矩阵作业的执行统计</span></span>
<span class="line"><span class="__shiki_mdbnqw">          echo &quot;## Matrix Execution Statistics (Last 30 Days)&quot;</span></span>
<span class="line"><span class="__shiki_mdbnqw">          </span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 这里可以添加获取实际执行数据的脚本</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 包括：成功率、平均时长、资源消耗等</span></span></code></pre></div><h3 id="_5-3-安全考虑" tabindex="-1">5.3 安全考虑 <a class="header-anchor" href="#_5-3-安全考虑" aria-label="Permalink to &quot;5.3 安全考虑&quot;">​</a></h3><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_17hn0y">jobs</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">  secure-matrix-execution</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">    runs-on</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">ubuntu-latest</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    strategy</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">      matrix</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全扫描类型</span></span>
<span class="line"><span class="__shiki_17hn0y">        scan-type</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;sast&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;dast&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;secret-scanning&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;dependency-check&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 安全级别</span></span>
<span class="line"><span class="__shiki_17hn0y">        security-level</span><span class="__shiki_140thh">: [</span><span class="__shiki_mdbnqw">&#39;low&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;medium&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;high&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;critical&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    permissions</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">      # 最小权限原则</span></span>
<span class="line"><span class="__shiki_17hn0y">      contents</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">read</span></span>
<span class="line"><span class="__shiki_17hn0y">      security-events</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">write</span></span>
<span class="line"><span class="__shiki_17hn0y">      actions</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">read</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_17hn0y">    steps</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Run \${{ matrix.scan-type }} scan</span></span>
<span class="line"><span class="__shiki_17hn0y">        env</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          # 安全扫描的敏感配置</span></span>
<span class="line"><span class="__shiki_17hn0y">          SCAN_CONFIG</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ secrets[format(&#39;{0}_CONFIG&#39;, matrix.scan-type)] }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          REPORT_PATH</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reports/\${{ matrix.scan-type }}-\${{ matrix.security-level }}.json</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          # 根据安全级别调整参数</span></span>
<span class="line"><span class="__shiki_17hn0y">          SCAN_DEPTH</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.security-level == &#39;critical&#39; &amp;&amp; &#39;deep&#39; || &#39;standard&#39; }}</span></span>
<span class="line"><span class="__shiki_17hn0y">          TIMEOUT</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">\${{ matrix.security-level == &#39;critical&#39; &amp;&amp; 3600 || 1800 }}</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_17hn0y">        run</span><span class="__shiki_140thh">: </span><span class="__shiki_1itgoe">|</span></span>
<span class="line"><span class="__shiki_mdbnqw">          # 执行安全扫描</span></span>
<span class="line"><span class="__shiki_mdbnqw">          ./security-scanner.sh \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --type \${{ matrix.scan-type }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --level \${{ matrix.security-level }} \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --config &quot;$SCAN_CONFIG&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --output &quot;$REPORT_PATH&quot; \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            --timeout $TIMEOUT</span></span>
<span class="line"><span class="__shiki_mdbnqw">      </span></span>
<span class="line"><span class="__shiki_140thh">      - </span><span class="__shiki_17hn0y">name</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">Upload security report</span></span>
<span class="line"><span class="__shiki_17hn0y">        uses</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">github/codeql-action/upload-sarif@v3</span></span>
<span class="line"><span class="__shiki_17hn0y">        if</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">always()</span></span>
<span class="line"><span class="__shiki_17hn0y">        with</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_17hn0y">          sarif_file</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">reports/\${{ matrix.scan-type }}-\${{ matrix.security-level }}.json</span></span></code></pre></div><h2 id="六、总结-构建矩阵的策略思维" tabindex="-1">六、总结：构建矩阵的策略思维 <a class="header-anchor" href="#六、总结-构建矩阵的策略思维" aria-label="Permalink to &quot;六、总结：构建矩阵的策略思维&quot;">​</a></h2><h3 id="_6-1-核心优势回顾" tabindex="-1">6.1 核心优势回顾 <a class="header-anchor" href="#_6-1-核心优势回顾" aria-label="Permalink to &quot;6.1 核心优势回顾&quot;">​</a></h3><ol><li><strong>维度化测试</strong>：确保代码在多个维度上的兼容性</li><li><strong>配置即代码</strong>：矩阵配置本身是版本控制的一部分</li><li><strong>智能并行化</strong>：通过策略控制执行效率</li><li><strong>灵活扩展</strong>：轻松添加新的测试维度</li></ol><h3 id="_6-2-决策框架" tabindex="-1">6.2 决策框架 <a class="header-anchor" href="#_6-2-决策框架" aria-label="Permalink to &quot;6.2 决策框架&quot;">​</a></h3><p>在选择是否使用矩阵时，考虑以下问题：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">是否需要测试多个环境/配置的组合？ → 是 → 使用构建矩阵</span></span>
<span class="line"><span class="__shiki_wvjl67">                             ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">组合数量是否可控（&lt; 50）？ → 是 → 使用静态矩阵</span></span>
<span class="line"><span class="__shiki_wvjl67">                             ↓ 否</span></span>
<span class="line"><span class="__shiki_wvjl67">                  → 使用动态矩阵生成</span></span>
<span class="line"><span class="__shiki_wvjl67">                             ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">是否需要条件化执行？ → 是 → 使用 include/exclude + 条件表达式</span></span>
<span class="line"><span class="__shiki_wvjl67">                             ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">                  → 实施最终矩阵配置</span></span></code></pre></div><h3 id="_6-3-演进路径" tabindex="-1">6.3 演进路径 <a class="header-anchor" href="#_6-3-演进路径" aria-label="Permalink to &quot;6.3 演进路径&quot;">​</a></h3><p>随着项目增长，矩阵策略可以按以下路径演进：</p><ol><li><strong>初级阶段</strong>：基础操作系统/版本矩阵</li><li><strong>中级阶段</strong>：添加功能标志、配置选项</li><li><strong>高级阶段</strong>：动态矩阵、条件执行、智能缓存</li><li><strong>专家阶段</strong>：跨工作流矩阵协调、资源优化、预测性执行</li></ol><p>构建矩阵是 GitHub Actions 中最强大的功能之一，正确使用可以极大提升 CI/CD 管道的效率和可靠性。关键在于平衡全面性与实用性，确保矩阵既覆盖重要场景，又不会因过于复杂而难以维护。</p>`,63)])])}const r=a(_,[["render",h]]);export{o as __pageData,r as default};
