import{_ as a,o as n,c as _,a as i}from"./app.DkoUFz-u.js";const o=JSON.parse('{"title":"裸机/VM部署：Node.js Cluster模式深度调优指南","description":"","frontmatter":{},"headers":[],"relativePath":"devops/deployment/runtime/nodejs/cluster.md","filePath":"devops/deployment/runtime/nodejs/cluster.md"}'),p={name:"devops/deployment/runtime/nodejs/cluster.md"};function h(l,s,c,t,k,e){return n(),_("div",null,[...s[0]||(s[0]=[i(`<h1 id="裸机-vm部署-node-js-cluster模式深度调优指南" tabindex="-1">裸机/VM部署：Node.js Cluster模式深度调优指南 <a class="header-anchor" href="#裸机-vm部署-node-js-cluster模式深度调优指南" aria-label="Permalink to &quot;裸机/VM部署：Node.js Cluster模式深度调优指南&quot;">​</a></h1><h2 id="_1-node-js-cluster模式核心原理与价值" tabindex="-1">1. Node.js Cluster模式核心原理与价值 <a class="header-anchor" href="#_1-node-js-cluster模式核心原理与价值" aria-label="Permalink to &quot;1. Node.js Cluster模式核心原理与价值&quot;">​</a></h2><h3 id="_1-1-单线程限制与多核利用挑战" tabindex="-1">1.1 单线程限制与多核利用挑战 <a class="header-anchor" href="#_1-1-单线程限制与多核利用挑战" aria-label="Permalink to &quot;1.1 单线程限制与多核利用挑战&quot;">​</a></h3><p>Node.js的单线程事件循环架构在处理I/O密集型任务时表现出色，但存在以下限制：</p><ul><li><strong>CPU密集型任务阻塞</strong>：单个CPU核心利用率饱和，多核CPU无法充分利用</li><li><strong>单点故障风险</strong>：单个进程崩溃导致整个服务不可用</li><li><strong>内存限制</strong>：32位系统内存限制约1.7GB，64位系统约1.5TB但单进程难以有效管理</li></ul><h3 id="_1-2-cluster模式架构原理" tabindex="-1">1.2 Cluster模式架构原理 <a class="header-anchor" href="#_1-2-cluster模式架构原理" aria-label="Permalink to &quot;1.2 Cluster模式架构原理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 原生Cluster模块基础架构</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> cluster</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;cluster&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> os</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;os&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> (cluster.isMaster) {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 主进程 - 管理进程</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`主进程 \${</span><span class="__shiki_140thh">process</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">pid</span><span class="__shiki_mdbnqw">} 正在运行\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 衍生工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">cpus</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  cluster.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;exit&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">code</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">signal</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`工作进程 \${</span><span class="__shiki_140thh">worker</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">process</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">pid</span><span class="__shiki_mdbnqw">} 已退出\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 自动重启策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">} </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 工作进程 - 处理实际请求</span></span>
<span class="line"><span class="__shiki_1t8gfj">  require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;./app.js&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_1-3-cluster模式的核心优势" tabindex="-1">1.3 Cluster模式的核心优势 <a class="header-anchor" href="#_1-3-cluster模式的核心优势" aria-label="Permalink to &quot;1.3 Cluster模式的核心优势&quot;">​</a></h3><ul><li><strong>横向扩展能力</strong>：基于CPU核心数的线性扩展</li><li><strong>高可用性</strong>：工作进程故障隔离与自动恢复</li><li><strong>零停机部署</strong>：滚动重启实现服务不中断</li><li><strong>资源共享</strong>：端口共享与连接分发</li></ul><h2 id="_2-cluster进程管理与优化策略" tabindex="-1">2. Cluster进程管理与优化策略 <a class="header-anchor" href="#_2-cluster进程管理与优化策略" aria-label="Permalink to &quot;2. Cluster进程管理与优化策略&quot;">​</a></h2><h3 id="_2-1-进程数量动态优化算法" tabindex="-1">2.1 进程数量动态优化算法 <a class="header-anchor" href="#_2-1-进程数量动态优化算法" aria-label="Permalink to &quot;2.1 进程数量动态优化算法&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 自适应进程管理策略</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> AdaptiveClusterManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.minInstances </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.minInstances </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxInstances </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.maxInstances </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">cpus</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.targetCpuUsage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.targetCpuUsage </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 70</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 目标CPU使用率%</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.targetMemoryUsage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.targetMemoryUsage </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 80</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 目标内存使用率%</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.checkInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.checkInterval </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 检查间隔(ms)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.metricsHistory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxHistorySize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 保留最近60个指标点</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 计算最优进程数</span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateOptimalInstances</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">currentMetrics</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">cpuUsage</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">memoryUsage</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">requestRate</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">responseTime</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> currentMetrics;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于CPU的伸缩计算</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> cpuBasedInstances </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">ceil</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      (cpuUsage </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.targetCpuUsage) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> cluster.workers.</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于内存的伸缩计算</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> memoryPerProcess</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.</span><span class="__shiki_1t8gfj">memoryUsage</span><span class="__shiki_140thh">().rss </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// MB</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> totalMemory</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">totalmem</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> availableMemory</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> totalMemory </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.targetMemoryUsage </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> memoryBasedInstances </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(availableMemory </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> memoryPerProcess);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 基于响应时间的权重调整</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> responseTimeFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 响应时间超过200ms</span></span>
<span class="line"><span class="__shiki_140thh">      responseTimeFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 1.2</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 响应时间小于50ms</span></span>
<span class="line"><span class="__shiki_140thh">      responseTimeFactor </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 综合计算</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> optimalInstances</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">      Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_140thh">        Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(cpuBasedInstances, memoryBasedInstances) </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> responseTimeFactor,</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.minInstances</span></span>
<span class="line"><span class="__shiki_140thh">      ),</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.maxInstances</span></span>
<span class="line"><span class="__shiki_140thh">    );</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">round</span><span class="__shiki_140thh">(optimalInstances);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 平滑调整进程数</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> adjustWorkers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">targetCount</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> currentCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(cluster.workers </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {}).</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> difference</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> targetCount </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> currentCount;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (difference </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 增加进程 - 分批进行</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> batchSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(difference, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 每次最多增加2个</span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> batchSize; i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">forkWorkerWithDelay</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 延迟1秒启动每个新进程</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (difference </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 减少进程 - 优雅关闭</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> workersToStop</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(cluster.workers)</span></span>
<span class="line"><span class="__shiki_140thh">        .</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, Math.</span><span class="__shiki_1t8gfj">abs</span><span class="__shiki_140thh">(difference));</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> worker</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> workersToStop) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">gracefulShutdown</span><span class="__shiki_140thh">(worker);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> forkWorkerWithDelay</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">delay</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> worker</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 等待worker准备就绪</span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;listening&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_1t8gfj"> resolve</span><span class="__shiki_140thh">(worker));</span></span>
<span class="line"><span class="__shiki_140thh">      }, delay);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> gracefulShutdown</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 发送优雅关闭信号</span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;graceful-shutdown&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 设置超时强制关闭</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> forceShutdownTimer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">kill</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SIGKILL&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }, </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 30秒后强制关闭</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;disconnect&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        clearTimeout</span><span class="__shiki_140thh">(forceShutdownTimer);</span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">kill</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">        resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_2-2-工作进程生命周期管理" tabindex="-1">2.2 工作进程生命周期管理 <a class="header-anchor" href="#_2-2-工作进程生命周期管理" aria-label="Permalink to &quot;2.2 工作进程生命周期管理&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 高级进程生命周期管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> cluster</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;cluster&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> os</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;os&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> WorkerLifecycleManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.workerStates </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.workerStartTimestamps </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxWorkerUptime </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 24小时强制重启</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  initializeMaster</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 工作进程创建监听</span></span>
<span class="line"><span class="__shiki_140thh">    cluster.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fork&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.workerStartTimestamps.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(worker.id, Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.workerStates.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(worker.id, {</span></span>
<span class="line"><span class="__shiki_140thh">        status: </span><span class="__shiki_mdbnqw">&#39;starting&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        startTime: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        requestCount: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        errorCount: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        lastHealthCheck: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 设置健康检查</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupHealthChecks</span><span class="__shiki_140thh">(worker);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 工作进程退出处理</span></span>
<span class="line"><span class="__shiki_140thh">    cluster.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;exit&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">code</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">signal</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.workerStates.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(worker.id);</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Worker \${</span><span class="__shiki_140thh">worker</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">} exited with code \${</span><span class="__shiki_140thh">code</span><span class="__shiki_mdbnqw">}, signal \${</span><span class="__shiki_140thh">signal</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Uptime: \${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> state</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">startTime</span><span class="__shiki_mdbnqw">}ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Total requests: \${</span><span class="__shiki_140thh">state</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">requestCount</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.workerStates.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(worker.id);</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.workerStartTimestamps.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(worker.id);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 根据退出原因决定重启策略</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">handleWorkerExit</span><span class="__shiki_140thh">(worker, code, signal);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 定期检查工作进程健康</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkWorkerHealth</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 定期滚动重启（防止内存泄漏）</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rollingRestart</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.maxWorkerUptime </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupHealthChecks</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 心跳检查</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> heartbeatInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (worker.</span><span class="__shiki_1t8gfj">isConnected</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ type: </span><span class="__shiki_mdbnqw">&#39;heartbeat&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置响应超时</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> responseTimer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Worker \${</span><span class="__shiki_140thh">worker</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">} heartbeat timeout\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">markWorkerUnhealthy</span><span class="__shiki_140thh">(worker);</span></span>
<span class="line"><span class="__shiki_140thh">        }, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">once</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (msg.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;heartbeat-ack&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            clearTimeout</span><span class="__shiki_140thh">(responseTimer);</span></span>
<span class="line"><span class="__shiki_dzsirb">            this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">updateWorkerHealth</span><span class="__shiki_140thh">(worker.id, </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 清理定时器</span></span>
<span class="line"><span class="__shiki_140thh">    worker.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;disconnect&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      clearInterval</span><span class="__shiki_140thh">(heartbeatInterval);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> rollingRestart</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> workers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(cluster.workers);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> worker</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> workers) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Starting rolling restart for worker \${</span><span class="__shiki_140thh">worker</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 1. 停止接受新连接</span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ type: </span><span class="__shiki_mdbnqw">&#39;drain&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 2. 等待现有连接处理完成</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitForConnectionsToDrain</span><span class="__shiki_140thh">(worker);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 3. 启动新工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> newWorker</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">waitForWorkerReady</span><span class="__shiki_140thh">(newWorker);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 4. 关闭旧工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">gracefulShutdown</span><span class="__shiki_140thh">(worker);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 5. 等待一段时间再处理下一个</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> waitForConnectionsToDrain</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> checkInterval</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ type: </span><span class="__shiki_mdbnqw">&#39;connection-count&#39;</span><span class="__shiki_140thh"> }, (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            clearInterval</span><span class="__shiki_140thh">(checkInterval);</span></span>
<span class="line"><span class="__shiki_1t8gfj">            resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">once</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">msg</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (msg.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;connection-count-response&#39;</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> msg.count </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            clearInterval</span><span class="__shiki_140thh">(checkInterval);</span></span>
<span class="line"><span class="__shiki_1t8gfj">            resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 超时保护</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        clearInterval</span><span class="__shiki_140thh">(checkInterval);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }, </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  markWorkerUnhealthy</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> state</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.workerStates.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(worker.id);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (state) {</span></span>
<span class="line"><span class="__shiki_140thh">      state.errorCount</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 连续3次健康检查失败，重启工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (state.errorCount </span><span class="__shiki_1itgoe">&gt;=</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Worker \${</span><span class="__shiki_140thh">worker</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">} marked as unhealthy, restarting...\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">kill</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SIGTERM&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_3-负载均衡策略深度优化" tabindex="-1">3. 负载均衡策略深度优化 <a class="header-anchor" href="#_3-负载均衡策略深度优化" aria-label="Permalink to &quot;3. 负载均衡策略深度优化&quot;">​</a></h2><h3 id="_3-1-多层负载均衡架构" tabindex="-1">3.1 多层负载均衡架构 <a class="header-anchor" href="#_3-1-多层负载均衡架构" aria-label="Permalink to &quot;3.1 多层负载均衡架构&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">                        [客户端请求]</span></span>
<span class="line"><span class="__shiki_wvjl67">                             |</span></span>
<span class="line"><span class="__shiki_wvjl67">                    [L4负载均衡器/Nginx]</span></span>
<span class="line"><span class="__shiki_wvjl67">                             |</span></span>
<span class="line"><span class="__shiki_wvjl67">                    ┌───────┬───────┬───────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">                    │       │       │       │</span></span>
<span class="line"><span class="__shiki_wvjl67">                [Node.js] [Node.js] [Node.js]</span></span>
<span class="line"><span class="__shiki_wvjl67">                Master    Master    Master</span></span>
<span class="line"><span class="__shiki_wvjl67">                    │       │       │</span></span>
<span class="line"><span class="__shiki_wvjl67">                ┌───┼───┐   │   ┌───┼───┐</span></span>
<span class="line"><span class="__shiki_wvjl67">                │   │   │   │   │   │   │</span></span>
<span class="line"><span class="__shiki_wvjl67">               Worker Worker │  Worker Worker</span></span>
<span class="line"><span class="__shiki_wvjl67">                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">                    [Node.js Master]</span></span>
<span class="line"><span class="__shiki_wvjl67">                            │</span></span>
<span class="line"><span class="__shiki_wvjl67">                    ┌───────┼───────┐</span></span>
<span class="line"><span class="__shiki_wvjl67">                    │       │       │</span></span>
<span class="line"><span class="__shiki_wvjl67">                   Worker  Worker  Worker</span></span></code></pre></div><h3 id="_3-2-智能负载均衡算法实现" tabindex="-1">3.2 智能负载均衡算法实现 <a class="header-anchor" href="#_3-2-智能负载均衡算法实现" aria-label="Permalink to &quot;3.2 智能负载均衡算法实现&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 增强型负载均衡器</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> EnhancedLoadBalancer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.workerStats </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.requestCounters </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sessionAffinity </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 会话粘性映射</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.algorithm </span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw"> &#39;weighted-least-connections&#39;</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 默认算法</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 初始化统计</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectMetrics</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 收集工作进程指标</span></span>
<span class="line"><span class="__shiki_1t8gfj">  collectMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">id</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">worker</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">(cluster.workers)) {</span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ type: </span><span class="__shiki_mdbnqw">&#39;get-metrics&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">once</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">metrics</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (metrics.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;metrics-response&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.workerStats.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(id, {</span></span>
<span class="line"><span class="__shiki_1itgoe">            ...</span><span class="__shiki_140thh">metrics.data,</span></span>
<span class="line"><span class="__shiki_140thh">            timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 计算权重</span></span>
<span class="line"><span class="__shiki_140thh">            weight: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateWorkerWeight</span><span class="__shiki_140thh">(metrics.data)</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 计算工作进程权重</span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateWorkerWeight</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">metrics</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">      cpuUsage</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      memoryUsage</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      activeConnections</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      requestRate</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">      responseTime</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> metrics;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 权重计算公式</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> weight </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 基础权重</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // CPU使用率影响 (-0.5 每1%)</span></span>
<span class="line"><span class="__shiki_140thh">    weight </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> cpuUsage </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 内存使用率影响 (-0.3 每1%)</span></span>
<span class="line"><span class="__shiki_140thh">    weight </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> memoryUsage </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 活跃连接数影响 (-1 每连接)</span></span>
<span class="line"><span class="__shiki_140thh">    weight </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_140thh"> activeConnections;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 响应时间影响</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) weight </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 20</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 500</span><span class="__shiki_140thh">) weight </span><span class="__shiki_1itgoe">-=</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span><span class="__shiki_1itgoe"> if</span><span class="__shiki_140thh"> (responseTime </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_140thh">) weight </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 确保最小权重</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(weight, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 选择最优工作进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">  selectWorker</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">clientInfo</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> workers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Array.</span><span class="__shiki_1t8gfj">from</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.workerStats.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查会话粘性</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (clientInfo.sessionId) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> stickyWorkerId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.sessionAffinity.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(clientInfo.sessionId);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (stickyWorkerId </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> cluster.workers[stickyWorkerId]) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> cluster.workers[stickyWorkerId];</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 根据算法选择</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> selectedWorker;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    switch</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.algorithm) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;round-robin&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        selectedWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">roundRobinSelect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;least-connections&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        selectedWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">leastConnectionsSelect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;weighted-least-connections&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        selectedWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">weightedLeastConnectionsSelect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;response-time-based&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        selectedWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">responseTimeBasedSelect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      case</span><span class="__shiki_mdbnqw"> &#39;ip-hash&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        selectedWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">ipHashSelect</span><span class="__shiki_140thh">(clientInfo.ip);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">      default</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_140thh">        selectedWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">roundRobinSelect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 设置会话粘性</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (clientInfo.sessionId </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> selectedWorker) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.sessionAffinity.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(clientInfo.sessionId, selectedWorker.id);</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 设置过期时间</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.sessionAffinity.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(clientInfo.sessionId);</span></span>
<span class="line"><span class="__shiki_140thh">      }, </span><span class="__shiki_dzsirb">30</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 30分钟</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> selectedWorker;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 加权最少连接算法</span></span>
<span class="line"><span class="__shiki_1t8gfj">  weightedLeastConnectionsSelect</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> bestWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> bestScore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb">Infinity</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">workerId</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">stats</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.workerStats.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">cluster.workers[workerId]) </span><span class="__shiki_1itgoe">continue</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 计算分数：权重 / (连接数 + 1)</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> score</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> stats.weight </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (stats.activeConnections </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (score </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> bestScore) {</span></span>
<span class="line"><span class="__shiki_140thh">        bestScore </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> score;</span></span>
<span class="line"><span class="__shiki_140thh">        bestWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> cluster.workers[workerId];</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> bestWorker;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 基于响应时间的选择</span></span>
<span class="line"><span class="__shiki_1t8gfj">  responseTimeBasedSelect</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> workersWithStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">workerId</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">stats</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.workerStats.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">()) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (cluster.workers[workerId] </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> stats.responseTime) {</span></span>
<span class="line"><span class="__shiki_140thh">        workersWithStats.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          worker: cluster.workers[workerId],</span></span>
<span class="line"><span class="__shiki_140thh">          responseTime: stats.responseTime,</span></span>
<span class="line"><span class="__shiki_140thh">          weight: stats.weight</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (workersWithStats.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">roundRobinSelect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 按响应时间排序，选择最快的</span></span>
<span class="line"><span class="__shiki_140thh">    workersWithStats.</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> a.responseTime </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> b.responseTime);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 在前25%中随机选择，避免热点</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> topPercent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">ceil</span><span class="__shiki_140thh">(workersWithStats.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 0.25</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> candidates</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> workersWithStats.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, topPercent));</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> candidates[Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(Math.</span><span class="__shiki_1t8gfj">random</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> candidates.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">)].worker;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 更新请求计数器</span></span>
<span class="line"><span class="__shiki_1t8gfj">  trackRequest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">workerId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> count</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.requestCounters.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(workerId) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.requestCounters.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(workerId, count </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_4-内存管理与资源共享优化" tabindex="-1">4. 内存管理与资源共享优化 <a class="header-anchor" href="#_4-内存管理与资源共享优化" aria-label="Permalink to &quot;4. 内存管理与资源共享优化&quot;">​</a></h2><h3 id="_4-1-共享内存与进程间通信优化" tabindex="-1">4.1 共享内存与进程间通信优化 <a class="header-anchor" href="#_4-1-共享内存与进程间通信优化" aria-label="Permalink to &quot;4.1 共享内存与进程间通信优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 高效进程间通信管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">MessageChannel</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">receiveMessageOnPort</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;worker_threads&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> SharedMemoryManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sharedBuffers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.messageChannels </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.locks </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 创建共享内存区域</span></span>
<span class="line"><span class="__shiki_1t8gfj">  createSharedBuffer</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">name</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">size</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 使用SharedArrayBuffer实现真正的共享内存</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> buffer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> SharedArrayBuffer</span><span class="__shiki_140thh">(size);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> lock</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Int32Array</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> SharedArrayBuffer</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    Atomics.</span><span class="__shiki_1t8gfj">store</span><span class="__shiki_140thh">(lock, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 初始化锁</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.sharedBuffers.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(name, {</span></span>
<span class="line"><span class="__shiki_140thh">      buffer,</span></span>
<span class="line"><span class="__shiki_140thh">      lock,</span></span>
<span class="line"><span class="__shiki_140thh">      views: </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">() </span><span class="__shiki_21nrsd">// 不同类型的视图</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> buffer;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 进程间高效数据共享</span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupIPCChannels</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 为每个工作进程创建专用通道</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> worker</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(cluster.workers)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">port1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">port2</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> MessageChannel</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.messageChannels.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(worker.id, {</span></span>
<span class="line"><span class="__shiki_140thh">        sendPort: port1,</span></span>
<span class="line"><span class="__shiki_140thh">        receivePort: port2</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 发送端口给工作进程</span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;setup-ipc-channel&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        port: port2 </span></span>
<span class="line"><span class="__shiki_140thh">      }, [port2]);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 设置消息监听</span></span>
<span class="line"><span class="__shiki_140thh">      port1.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">handleIPCMessage</span><span class="__shiki_140thh">(worker.id, message);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      port1.</span><span class="__shiki_1t8gfj">unref</span><span class="__shiki_140thh">(); </span><span class="__shiki_21nrsd">// 防止阻塞进程退出</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 批量消息处理</span></span>
<span class="line"><span class="__shiki_1t8gfj">  batchSendToWorkers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">workerIds</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> targets</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> workerIds </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(cluster.workers);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> promises</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> workerId</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> targets) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> channel</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.messageChannels.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(workerId);</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (channel) {</span></span>
<span class="line"><span class="__shiki_140thh">        promises.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">          new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            channel.sendPort.</span><span class="__shiki_1t8gfj">postMessage</span><span class="__shiki_140thh">(message);</span></span>
<span class="line"><span class="__shiki_21nrsd">            // 如果需要确认，可以等待响应</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (message.requireAck) {</span></span>
<span class="line"><span class="__shiki_140thh">              channel.sendPort.</span><span class="__shiki_1t8gfj">once</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">ack</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">                if</span><span class="__shiki_140thh"> (ack.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;ack&#39;</span><span class="__shiki_140thh">) </span><span class="__shiki_1t8gfj">resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">              });</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">              resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          })</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(promises);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 共享状态管理</span></span>
<span class="line"><span class="__shiki_1itgoe">  class</span><span class="__shiki_1t8gfj"> SharedStateManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">    constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.state </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.watchers </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.stateBuffer </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">createSharedBuffer</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;global-state&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 1MB</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 原子状态更新</span></span>
<span class="line"><span class="__shiki_1t8gfj">    atomicUpdate</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">updater</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> lockKey</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_mdbnqw"> \`lock-\${</span><span class="__shiki_140thh">key</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 自旋锁实现</span></span>
<span class="line"><span class="__shiki_1itgoe">      while</span><span class="__shiki_140thh"> (Atomics.</span><span class="__shiki_1t8gfj">compareExchange</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.locks.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(lockKey), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">!==</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 等待锁释放</span></span>
<span class="line"><span class="__shiki_140thh">        Atomics.</span><span class="__shiki_1t8gfj">wait</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.locks.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(lockKey), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> currentValue</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.state.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(key);</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> newValue</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> updater</span><span class="__shiki_140thh">(currentValue);</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.state.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(key, newValue);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 通知监听者</span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">notifyWatchers</span><span class="__shiki_140thh">(key, newValue);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        return</span><span class="__shiki_140thh"> newValue;</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">finally</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 释放锁</span></span>
<span class="line"><span class="__shiki_140thh">        Atomics.</span><span class="__shiki_1t8gfj">store</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.locks.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(lockKey), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        Atomics.</span><span class="__shiki_1t8gfj">notify</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.locks.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(lockKey), </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 状态变更通知</span></span>
<span class="line"><span class="__shiki_1t8gfj">    notifyWatchers</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">key</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">value</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> watchers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.watchers.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(key) </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">      watchers.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">callback</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          callback</span><span class="__shiki_140thh">(value);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">          console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Watcher error for key \${</span><span class="__shiki_140thh">key</span><span class="__shiki_mdbnqw">}:\`</span><span class="__shiki_140thh">, error);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_4-2-内存泄漏检测与预防" tabindex="-1">4.2 内存泄漏检测与预防 <a class="header-anchor" href="#_4-2-内存泄漏检测与预防" aria-label="Permalink to &quot;4.2 内存泄漏检测与预防&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 内存监控与泄漏检测系统</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> v8</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;v8&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fs&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> MemoryMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {}) {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.snapshotInterval </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.snapshotInterval </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 300000</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 5分钟</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.leakThreshold </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.leakThreshold </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 10MB</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxHeapSize </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> options.maxHeapSize </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 512</span><span class="__shiki_140thh">; </span><span class="__shiki_21nrsd">// 512MB</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.snapshots </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.leakPatterns </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startMonitoring</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  startMonitoring</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 定期内存快照</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">takeSnapshot</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.snapshotInterval);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 内存使用告警</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkMemoryUsage</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // GC监控</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (global.gc) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">      setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> before</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.</span><span class="__shiki_1t8gfj">memoryUsage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        global.</span><span class="__shiki_1t8gfj">gc</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> after</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> process.</span><span class="__shiki_1t8gfj">memoryUsage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`GC freed \${</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">before</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">heapUsed</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> after</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">heapUsed</span><span class="__shiki_mdbnqw">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_mdbnqw">} MB\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }, </span><span class="__shiki_dzsirb">300000</span><span class="__shiki_140thh">); </span><span class="__shiki_21nrsd">// 每5分钟强制GC一次（仅调试用）</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  takeSnapshot</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> snapshot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      memory: process.</span><span class="__shiki_1t8gfj">memoryUsage</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      v8Heap: v8.</span><span class="__shiki_1t8gfj">getHeapStatistics</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">      activeHandles: process.</span><span class="__shiki_1t8gfj">_getActiveHandles</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      activeRequests: process.</span><span class="__shiki_1t8gfj">_getActiveRequests</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">length</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.snapshots.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(snapshot);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保持最近24小时的快照</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> cutoff</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb"> 24</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.snapshots </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.snapshots.</span><span class="__shiki_1t8gfj">filter</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">s</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> s.timestamp </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> cutoff);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 泄漏检测</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">detectLeaks</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 保存到文件（可选）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.snapshots.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> %</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_1itgoe"> ===</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) { </span><span class="__shiki_21nrsd">// 每小时保存一次</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">saveSnapshotsToFile</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> snapshot;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  detectLeaks</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.snapshots.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> 3</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> recent</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.snapshots.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> heapGrowth</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> recent[</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">].memory.heapUsed </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> recent[</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">].memory.heapUsed;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (heapGrowth </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.leakThreshold) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Potential memory leak detected: \${</span><span class="__shiki_140thh">heapGrowth</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_mdbnqw">} MB growth in 15 minutes\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 记录泄漏模式</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.leakPatterns.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        detectedAt: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">(),</span></span>
<span class="line"><span class="__shiki_140thh">        growth: heapGrowth,</span></span>
<span class="line"><span class="__shiki_140thh">        snapshots: recent</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 触发泄漏处理</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">handlePotentialLeak</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  handlePotentialLeak</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 记录详细诊断信息</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> heapStats</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> v8.</span><span class="__shiki_1t8gfj">getHeapStatistics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> heapSnapshot</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> v8.</span><span class="__shiki_1t8gfj">getHeapSnapshot</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 发送告警</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendAlert</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;memory_leak&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      severity: </span><span class="__shiki_mdbnqw">&#39;high&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      details: {</span></span>
<span class="line"><span class="__shiki_140thh">        heapUsed: process.</span><span class="__shiki_1t8gfj">memoryUsage</span><span class="__shiki_140thh">().heapUsed,</span></span>
<span class="line"><span class="__shiki_140thh">        heapGrowth: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.leakPatterns[</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.leakPatterns.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">].growth,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 根据策略重启工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (process.</span><span class="__shiki_1t8gfj">memoryUsage</span><span class="__shiki_140thh">().heapUsed </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxHeapSize </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.8</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;High memory usage, triggering graceful restart&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      process.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ type: </span><span class="__shiki_mdbnqw">&#39;request-restart&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 内存使用趋势分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeMemoryTrend</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.snapshots.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> windowSize</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.snapshots.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> window</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.snapshots.</span><span class="__shiki_1t8gfj">slice</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">windowSize);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 计算线性回归</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> sumX </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">, sumY </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">, sumXY </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">, sumX2 </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    window.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">snapshot</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">index</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> x</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> index;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> y</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> snapshot.memory.heapUsed;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      sumX </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> x;</span></span>
<span class="line"><span class="__shiki_140thh">      sumY </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> y;</span></span>
<span class="line"><span class="__shiki_140thh">      sumXY </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> y;</span></span>
<span class="line"><span class="__shiki_140thh">      sumX2 </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> x </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> x;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> n</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> window.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> slope</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (n </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> sumXY </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> sumX </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> sumY) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (n </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> sumX2 </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> sumX </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> sumX);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> intercept</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> (sumY </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> slope </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> sumX) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> n;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 预测未来内存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> prediction</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      slope: slope </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">), </span><span class="__shiki_21nrsd">// MB per interval</span></span>
<span class="line"><span class="__shiki_140thh">      current: process.</span><span class="__shiki_1t8gfj">memoryUsage</span><span class="__shiki_140thh">().heapUsed </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      predictedIn1h: (intercept </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> slope </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> (n </span><span class="__shiki_1itgoe">+</span><span class="__shiki_dzsirb"> 12</span><span class="__shiki_140thh">)) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> (</span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      rSquared: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">calculateRSquared</span><span class="__shiki_140thh">(window, slope, intercept)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> prediction;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  calculateRSquared</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">data</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">slope</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">intercept</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> meanY</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> data.</span><span class="__shiki_1t8gfj">reduce</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">sum</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">d</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> sum </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> d.memory.heapUsed, </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> data.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> ssTotal </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> ssResidual </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    data.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">d</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">i</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> y</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> d.memory.heapUsed;</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> yPred</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> intercept </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> slope </span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> i;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      ssTotal </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(y </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> meanY, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      ssResidual </span><span class="__shiki_1itgoe">+=</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">pow</span><span class="__shiki_140thh">(y </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> yPred, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> (ssResidual </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> ssTotal);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_5-网络与连接管理优化" tabindex="-1">5. 网络与连接管理优化 <a class="header-anchor" href="#_5-网络与连接管理优化" aria-label="Permalink to &quot;5. 网络与连接管理优化&quot;">​</a></h2><h3 id="_5-1-连接池与keep-alive优化" tabindex="-1">5.1 连接池与Keep-Alive优化 <a class="header-anchor" href="#_5-1-连接池与keep-alive优化" aria-label="Permalink to &quot;5.1 连接池与Keep-Alive优化&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 高性能连接管理器</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> net</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;net&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> http</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;http&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ConnectionManager</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.connectionPool </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> Map</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxConnectionsPerWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.keepAliveTimeout </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 5000</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.maxKeepAliveRequests </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupConnectionTracking</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupConnectionTracking</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 拦截http.createServer</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> originalCreateServer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> http.createServer;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    http.</span><span class="__shiki_1t8gfj">createServer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">options</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">requestListener</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> server</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> originalCreateServer</span><span class="__shiki_140thh">(options, requestListener);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 跟踪连接</span></span>
<span class="line"><span class="__shiki_140thh">      server.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;connection&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">socket</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> workerId</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> cluster.worker </span><span class="__shiki_1itgoe">?</span><span class="__shiki_140thh"> cluster.worker.id </span><span class="__shiki_1itgoe">:</span><span class="__shiki_mdbnqw"> &#39;master&#39;</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.connectionPool.</span><span class="__shiki_1t8gfj">has</span><span class="__shiki_140thh">(workerId)) {</span></span>
<span class="line"><span class="__shiki_dzsirb">          this</span><span class="__shiki_140thh">.connectionPool.</span><span class="__shiki_1t8gfj">set</span><span class="__shiki_140thh">(workerId, </span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">());</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        this</span><span class="__shiki_140thh">.connectionPool.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(workerId).</span><span class="__shiki_1t8gfj">add</span><span class="__shiki_140thh">(socket);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 设置keep-alive</span></span>
<span class="line"><span class="__shiki_140thh">        socket.</span><span class="__shiki_1t8gfj">setKeepAlive</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.keepAliveTimeout);</span></span>
<span class="line"><span class="__shiki_140thh">        socket.</span><span class="__shiki_1t8gfj">setTimeout</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.keepAliveTimeout);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 连接关闭清理</span></span>
<span class="line"><span class="__shiki_140thh">        socket.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;close&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> pool</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.connectionPool.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(workerId);</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (pool) {</span></span>
<span class="line"><span class="__shiki_140thh">            pool.</span><span class="__shiki_1t8gfj">delete</span><span class="__shiki_140thh">(socket);</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 超时处理</span></span>
<span class="line"><span class="__shiki_140thh">        socket.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;timeout&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          socket.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> server;</span></span>
<span class="line"><span class="__shiki_140thh">    }.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 连接分发策略</span></span>
<span class="line"><span class="__shiki_1t8gfj">  distributeConnection</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">socket</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">clientInfo</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> workers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(cluster.workers);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 选择连接数最少的工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> bestWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> null</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_1itgoe">    let</span><span class="__shiki_140thh"> minConnections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> Infinity</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> worker</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> workers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> connections</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.connectionPool.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(worker.id)?.size </span><span class="__shiki_1itgoe">||</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (connections </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> minConnections </span><span class="__shiki_1itgoe">&amp;&amp;</span><span class="__shiki_140thh"> </span></span>
<span class="line"><span class="__shiki_140thh">          connections </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.maxConnectionsPerWorker) {</span></span>
<span class="line"><span class="__shiki_140thh">        minConnections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> connections;</span></span>
<span class="line"><span class="__shiki_140thh">        bestWorker </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> worker;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (bestWorker) {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 传递socket句柄给选中的工作进程</span></span>
<span class="line"><span class="__shiki_140thh">      bestWorker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ </span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;new-connection&#39;</span><span class="__shiki_140thh">, </span></span>
<span class="line"><span class="__shiki_140thh">        socket: socket._handle </span></span>
<span class="line"><span class="__shiki_140thh">      }, socket._handle);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_dzsirb"> false</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 优雅关闭所有连接</span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> drainAllConnections</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">workerId</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> connections</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.connectionPool.</span><span class="__shiki_1t8gfj">get</span><span class="__shiki_140thh">(workerId);</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">connections) </span><span class="__shiki_1itgoe">return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> closePromises</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> socket</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> connections) {</span></span>
<span class="line"><span class="__shiki_140thh">      closePromises.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_1itgoe">        new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 发送连接关闭通知</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (socket.writable) {</span></span>
<span class="line"><span class="__shiki_140thh">            socket.</span><span class="__shiki_1t8gfj">write</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;HTTP/1.1 503 Service Unavailable</span><span class="__shiki_dzsirb">\\r\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            socket.</span><span class="__shiki_1t8gfj">write</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Connection: close</span><span class="__shiki_dzsirb">\\r\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            socket.</span><span class="__shiki_1t8gfj">write</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\r\\n</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_21nrsd">          // 设置关闭超时</span></span>
<span class="line"><span class="__shiki_1itgoe">          const</span><span class="__shiki_dzsirb"> closeTimer</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">            socket.</span><span class="__shiki_1t8gfj">destroy</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">            resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          }, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          socket.</span><span class="__shiki_1t8gfj">on</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;close&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            clearTimeout</span><span class="__shiki_140thh">(closeTimer);</span></span>
<span class="line"><span class="__shiki_1t8gfj">            resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_140thh">          socket.</span><span class="__shiki_1t8gfj">end</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        })</span></span>
<span class="line"><span class="__shiki_140thh">      );</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    await</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">all</span><span class="__shiki_140thh">(closePromises);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_5-2-tcp优化参数调优" tabindex="-1">5.2 TCP优化参数调优 <a class="header-anchor" href="#_5-2-tcp优化参数调优" aria-label="Permalink to &quot;5.2 TCP优化参数调优&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// TCP/IP栈优化配置</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> TCPOptimizer</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> applyOptimizations</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> os</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;os&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Linux-specific TCP optimizations</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (os.</span><span class="__shiki_1t8gfj">platform</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;linux&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">optimizeLinuxTCP</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 通用Node.js TCP优化</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">optimizeNodeJSTCP</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> optimizeLinuxTCP</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fs&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> optimizations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/core/somaxconn&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;65535&#39;</span><span class="__shiki_140thh">,           </span><span class="__shiki_21nrsd">// 最大连接队列</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/ipv4/tcp_max_syn_backlog&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;65535&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// SYN队列大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/core/netdev_max_backlog&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;5000&#39;</span><span class="__shiki_140thh">,   </span><span class="__shiki_21nrsd">// 网络设备队列</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/ipv4/tcp_tw_reuse&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;1&#39;</span><span class="__shiki_140thh">,            </span><span class="__shiki_21nrsd">// 启用TIME-WAIT重用</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/ipv4/tcp_fin_timeout&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;30&#39;</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// FIN超时</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/ipv4/tcp_keepalive_time&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;600&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// KeepAlive时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/ipv4/tcp_keepalive_intvl&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;30&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// KeepAlive间隔</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/ipv4/tcp_keepalive_probes&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;3&#39;</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// KeepAlive探测次数</span></span>
<span class="line"><span class="__shiki_mdbnqw">      &#39;/proc/sys/net/ipv4/tcp_slow_start_after_idle&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;0&#39;</span><span class="__shiki_21nrsd"> // 禁用慢启动</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 应用优化（需要root权限）</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> [</span><span class="__shiki_dzsirb">file</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">value</span><span class="__shiki_140thh">] </span><span class="__shiki_1itgoe">of</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">entries</span><span class="__shiki_140thh">(optimizations)) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        fs.</span><span class="__shiki_1t8gfj">writeFileSync</span><span class="__shiki_140thh">(file, value);</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Optimized \${</span><span class="__shiki_140thh">file</span><span class="__shiki_mdbnqw">} = \${</span><span class="__shiki_140thh">value</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">warn</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`Cannot optimize \${</span><span class="__shiki_140thh">file</span><span class="__shiki_mdbnqw">}: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1t8gfj"> optimizeNodeJSTCP</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // Node.js服务器TCP优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> serverOptimizations</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 启用TCP_NODELAY（禁用Nagle算法）</span></span>
<span class="line"><span class="__shiki_140thh">      noDelay: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 启用keep-alive</span></span>
<span class="line"><span class="__shiki_140thh">      keepAlive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      keepAliveInitialDelay: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 连接超时</span></span>
<span class="line"><span class="__shiki_140thh">      timeout: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 最大头部大小</span></span>
<span class="line"><span class="__shiki_140thh">      maxHeaderSize: </span><span class="__shiki_dzsirb">16384</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 16KB</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 请求超时</span></span>
<span class="line"><span class="__shiki_140thh">      requestTimeout: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 启用HTTP/2（如果可用）</span></span>
<span class="line"><span class="__shiki_140thh">      allowHTTP1: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_21nrsd">      // http2: true,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 连接限制</span></span>
<span class="line"><span class="__shiki_140thh">      maxConnections: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 安全限制</span></span>
<span class="line"><span class="__shiki_140thh">      rejectUnauthorized: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 启用压缩</span></span>
<span class="line"><span class="__shiki_21nrsd">      // compress: true,</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 启用请求跟踪</span></span>
<span class="line"><span class="__shiki_140thh">      insecureHTTPParser: </span><span class="__shiki_dzsirb">false</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> serverOptimizations;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_6-监控、指标收集与调试" tabindex="-1">6. 监控、指标收集与调试 <a class="header-anchor" href="#_6-监控、指标收集与调试" aria-label="Permalink to &quot;6. 监控、指标收集与调试&quot;">​</a></h2><h3 id="_6-1-多维度监控指标体系" tabindex="-1">6.1 多维度监控指标体系 <a class="header-anchor" href="#_6-1-多维度监控指标体系" aria-label="Permalink to &quot;6.1 多维度监控指标体系&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 综合监控系统</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> prometheusClient</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;prom-client&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ClusterMonitor</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.registry </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> prometheusClient.</span><span class="__shiki_1t8gfj">Registry</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupMetrics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">setupExporters</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 进程级别指标</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.workerCount </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> prometheusClient.</span><span class="__shiki_1t8gfj">Gauge</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;node_cluster_workers_total&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      help: </span><span class="__shiki_mdbnqw">&#39;Total number of cluster workers&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      labelNames: [</span><span class="__shiki_mdbnqw">&#39;status&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      registers: [</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.registry]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 请求指标</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.requestDuration </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> prometheusClient.</span><span class="__shiki_1t8gfj">Histogram</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;http_request_duration_seconds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      help: </span><span class="__shiki_mdbnqw">&#39;HTTP request duration in seconds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      labelNames: [</span><span class="__shiki_mdbnqw">&#39;method&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;route&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;status_code&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;worker_id&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      buckets: [</span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">0.5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">, </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      registers: [</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.registry]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 系统资源指标</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.memoryUsage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> prometheusClient.</span><span class="__shiki_1t8gfj">Gauge</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;node_process_memory_usage_bytes&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      help: </span><span class="__shiki_mdbnqw">&#39;Memory usage by the Node.js process&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      labelNames: [</span><span class="__shiki_mdbnqw">&#39;type&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;worker_id&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      registers: [</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.registry]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.cpuUsage </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> prometheusClient.</span><span class="__shiki_1t8gfj">Gauge</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;node_process_cpu_usage_percent&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      help: </span><span class="__shiki_mdbnqw">&#39;CPU usage percentage&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      labelNames: [</span><span class="__shiki_mdbnqw">&#39;worker_id&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      registers: [</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.registry]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 业务指标</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.activeConnections </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> prometheusClient.</span><span class="__shiki_1t8gfj">Gauge</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;node_active_connections&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      help: </span><span class="__shiki_mdbnqw">&#39;Number of active connections&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      labelNames: [</span><span class="__shiki_mdbnqw">&#39;worker_id&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      registers: [</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.registry]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.eventLoopLag </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> prometheusClient.</span><span class="__shiki_1t8gfj">Gauge</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      name: </span><span class="__shiki_mdbnqw">&#39;node_eventloop_lag_seconds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      help: </span><span class="__shiki_mdbnqw">&#39;Event loop lag in seconds&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      labelNames: [</span><span class="__shiki_mdbnqw">&#39;worker_id&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      registers: [</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.registry]</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 实时性能分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">  startProfiling</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> inspector</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;inspector&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fs</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;fs&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> session</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_140thh"> inspector.</span><span class="__shiki_1t8gfj">Session</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">connect</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // CPU Profiling</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Profiler.enable&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      session.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Profiler.start&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;CPU profiling started&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 30秒后停止并保存</span></span>
<span class="line"><span class="__shiki_1t8gfj">        setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          session.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Profiler.stop&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">err</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">profile</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">err) {</span></span>
<span class="line"><span class="__shiki_140thh">              fs.</span><span class="__shiki_1t8gfj">writeFileSync</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">                \`cpu-profile-\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}.cpuprofile\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">                JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(profile)</span></span>
<span class="line"><span class="__shiki_140thh">              );</span></span>
<span class="line"><span class="__shiki_140thh">              console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;CPU profile saved&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }, </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // Heap Snapshot</span></span>
<span class="line"><span class="__shiki_140thh">    session.</span><span class="__shiki_1t8gfj">post</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;HeapProfiler.takeHeapSnapshot&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">err</span><span class="__shiki_140thh">, { </span><span class="__shiki_1jdh33">snapshot</span><span class="__shiki_140thh"> }) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">err) {</span></span>
<span class="line"><span class="__shiki_140thh">        fs.</span><span class="__shiki_1t8gfj">writeFileSync</span><span class="__shiki_140thh">(</span></span>
<span class="line"><span class="__shiki_mdbnqw">          \`heap-snapshot-\${</span><span class="__shiki_140thh">Date</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_mdbnqw">()</span><span class="__shiki_mdbnqw">}.heapsnapshot\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_dzsirb">          JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">(snapshot)</span></span>
<span class="line"><span class="__shiki_140thh">        );</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Heap snapshot saved&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分布式追踪集成</span></span>
<span class="line"><span class="__shiki_1t8gfj">  setupTracing</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">NodeTracerProvider</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@opentelemetry/sdk-trace-node&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">SimpleSpanProcessor</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@opentelemetry/sdk-trace-base&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">JaegerExporter</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;@opentelemetry/exporter-jaeger&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> provider</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> NodeTracerProvider</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 配置Jaeger导出器</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> exporter</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_1t8gfj"> JaegerExporter</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      endpoint: </span><span class="__shiki_mdbnqw">&#39;http://jaeger:14268/api/traces&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    provider.</span><span class="__shiki_1t8gfj">addSpanProcessor</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">new</span><span class="__shiki_1t8gfj"> SimpleSpanProcessor</span><span class="__shiki_140thh">(exporter));</span></span>
<span class="line"><span class="__shiki_140thh">    provider.</span><span class="__shiki_1t8gfj">register</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;Tracing initialized&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_7-性能调优配置模板" tabindex="-1">7. 性能调优配置模板 <a class="header-anchor" href="#_7-性能调优配置模板" aria-label="Permalink to &quot;7. 性能调优配置模板&quot;">​</a></h2><h3 id="_7-1-生产环境优化配置" tabindex="-1">7.1 生产环境优化配置 <a class="header-anchor" href="#_7-1-生产环境优化配置" aria-label="Permalink to &quot;7.1 生产环境优化配置&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// production-cluster-config.js</span></span>
<span class="line"><span class="__shiki_dzsirb">module</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">exports</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">  // 集群配置</span></span>
<span class="line"><span class="__shiki_140thh">  cluster: {</span></span>
<span class="line"><span class="__shiki_140thh">    enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    strategy: </span><span class="__shiki_mdbnqw">&#39;advanced&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// &#39;simple&#39; | &#39;advanced&#39; | &#39;custom&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 进程管理</span></span>
<span class="line"><span class="__shiki_140thh">    processManagement: {</span></span>
<span class="line"><span class="__shiki_140thh">      minInstances: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxInstances: </span><span class="__shiki_dzsirb">16</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 不超过CPU核心数×2</span></span>
<span class="line"><span class="__shiki_140thh">      spawnStrategy: </span><span class="__shiki_mdbnqw">&#39;parallel&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// &#39;sequential&#39; | &#39;parallel&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      spawnDelay: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 进程启动延迟(ms)</span></span>
<span class="line"><span class="__shiki_140thh">      autoScale: {</span></span>
<span class="line"><span class="__shiki_140thh">        enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        metrics: [</span><span class="__shiki_mdbnqw">&#39;cpu&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;memory&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;rps&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">        scaleUpThreshold: </span><span class="__shiki_dzsirb">70</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 使用率%</span></span>
<span class="line"><span class="__shiki_140thh">        scaleDownThreshold: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        coolDownPeriod: </span><span class="__shiki_dzsirb">300000</span><span class="__shiki_21nrsd"> // 5分钟</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 健康检查</span></span>
<span class="line"><span class="__shiki_140thh">    healthCheck: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      interval: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timeout: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      unhealthyThreshold: </span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      healthyThreshold: </span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      endpoints: [</span><span class="__shiki_mdbnqw">&#39;/health&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;/ready&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;/live&#39;</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 优雅关闭</span></span>
<span class="line"><span class="__shiki_140thh">    gracefulShutdown: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timeout: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      drainConnections: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      waitForActiveRequests: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      sendSignal: </span><span class="__shiki_mdbnqw">&#39;SIGTERM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      forceKillSignal: </span><span class="__shiki_mdbnqw">&#39;SIGKILL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      forceKillTimeout: </span><span class="__shiki_dzsirb">10000</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 负载均衡</span></span>
<span class="line"><span class="__shiki_140thh">  loadBalancing: {</span></span>
<span class="line"><span class="__shiki_140thh">    algorithm: </span><span class="__shiki_mdbnqw">&#39;weighted-least-connections&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    stickySessions: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      ttl: </span><span class="__shiki_dzsirb">1800000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 30分钟</span></span>
<span class="line"><span class="__shiki_140thh">      cookieName: </span><span class="__shiki_mdbnqw">&#39;node_cluster_affinity&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 连接分发</span></span>
<span class="line"><span class="__shiki_140thh">    connectionDistribution: {</span></span>
<span class="line"><span class="__shiki_140thh">      maxConnectionsPerWorker: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      connectionTimeout: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      keepAlive: {</span></span>
<span class="line"><span class="__shiki_140thh">        enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        timeout: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxRequests: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 限流与熔断</span></span>
<span class="line"><span class="__shiki_140thh">    circuitBreaker: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      failureThreshold: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      resetTimeout: </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      halfOpenMaxRequests: </span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 内存与资源</span></span>
<span class="line"><span class="__shiki_140thh">  resourceManagement: {</span></span>
<span class="line"><span class="__shiki_140thh">    memory: {</span></span>
<span class="line"><span class="__shiki_140thh">      maxHeapSize: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 512</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 512MB</span></span>
<span class="line"><span class="__shiki_140thh">      maxOldSpaceSize: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 384</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 384MB</span></span>
<span class="line"><span class="__shiki_140thh">      maxSemiSpaceSize: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 16</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 16MB</span></span>
<span class="line"><span class="__shiki_140thh">      leakDetection: {</span></span>
<span class="line"><span class="__shiki_140thh">        enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        snapshotInterval: </span><span class="__shiki_dzsirb">300000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        leakThreshold: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_21nrsd"> // 10MB</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    cpu: {</span></span>
<span class="line"><span class="__shiki_140thh">      affinity: </span><span class="__shiki_mdbnqw">&#39;auto&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// &#39;auto&#39; | &#39;manual&#39; | &#39;none&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      priority: </span><span class="__shiki_mdbnqw">&#39;normal&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// &#39;low&#39; | &#39;normal&#39; | &#39;high&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      cpus: </span><span class="__shiki_mdbnqw">&#39;all&#39;</span><span class="__shiki_21nrsd"> // &#39;all&#39; | [0, 1, 2, 3]</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 网络优化</span></span>
<span class="line"><span class="__shiki_140thh">  network: {</span></span>
<span class="line"><span class="__shiki_140thh">    tcp: {</span></span>
<span class="line"><span class="__shiki_140thh">      noDelay: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      keepAlive: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      keepAliveInitialDelay: </span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxConnections: </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      backlog: </span><span class="__shiki_dzsirb">511</span><span class="__shiki_21nrsd"> // SYN队列大小</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    http: {</span></span>
<span class="line"><span class="__shiki_140thh">      maxHeadersSize: </span><span class="__shiki_dzsirb">16384</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      maxBodySize: </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 1024</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 10MB</span></span>
<span class="line"><span class="__shiki_140thh">      requestTimeout: </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      compression: {</span></span>
<span class="line"><span class="__shiki_140thh">        enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        level: </span><span class="__shiki_dzsirb">6</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        threshold: </span><span class="__shiki_dzsirb">1024</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 监控与日志</span></span>
<span class="line"><span class="__shiki_140thh">  monitoring: {</span></span>
<span class="line"><span class="__shiki_140thh">    metrics: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      port: </span><span class="__shiki_dzsirb">9090</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      path: </span><span class="__shiki_mdbnqw">&#39;/metrics&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      collectDefaultMetrics: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      timeout: </span><span class="__shiki_dzsirb">5000</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    logging: {</span></span>
<span class="line"><span class="__shiki_140thh">      level: </span><span class="__shiki_mdbnqw">&#39;info&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      format: </span><span class="__shiki_mdbnqw">&#39;json&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      transports: [</span><span class="__shiki_mdbnqw">&#39;console&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;file&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      rotation: {</span></span>
<span class="line"><span class="__shiki_140thh">        enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        size: </span><span class="__shiki_mdbnqw">&#39;10m&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        interval: </span><span class="__shiki_mdbnqw">&#39;1d&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        maxFiles: </span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    tracing: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      exporter: </span><span class="__shiki_mdbnqw">&#39;jaeger&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// &#39;jaeger&#39; | &#39;zipkin&#39; | &#39;console&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      sampleRate: </span><span class="__shiki_dzsirb">0.1</span><span class="__shiki_21nrsd"> // 10%的请求被追踪</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    profiling: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 生产环境谨慎开启</span></span>
<span class="line"><span class="__shiki_140thh">      interval: </span><span class="__shiki_dzsirb">3600000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 1小时</span></span>
<span class="line"><span class="__shiki_140thh">      duration: </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_21nrsd"> // 收集1分钟</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 安全</span></span>
<span class="line"><span class="__shiki_140thh">  security: {</span></span>
<span class="line"><span class="__shiki_140thh">    process: {</span></span>
<span class="line"><span class="__shiki_140thh">      user: </span><span class="__shiki_mdbnqw">&#39;nodeapp&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      group: </span><span class="__shiki_mdbnqw">&#39;nodeapp&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      umask: </span><span class="__shiki_dzsirb">0o027</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    network: {</span></span>
<span class="line"><span class="__shiki_140thh">      trustedProxies: [</span><span class="__shiki_mdbnqw">&#39;loopback&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;linklocal&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_mdbnqw">&#39;uniquelocal&#39;</span><span class="__shiki_140thh">],</span></span>
<span class="line"><span class="__shiki_140thh">      rateLimiting: {</span></span>
<span class="line"><span class="__shiki_140thh">        enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        windowMs: </span><span class="__shiki_dzsirb">60000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        max: </span><span class="__shiki_dzsirb">100</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  },</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 部署与维护</span></span>
<span class="line"><span class="__shiki_140thh">  deployment: {</span></span>
<span class="line"><span class="__shiki_140thh">    zeroDowntime: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      strategy: </span><span class="__shiki_mdbnqw">&#39;rolling&#39;</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// &#39;rolling&#39; | &#39;blue-green&#39; | &#39;canary&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      batchSize: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      waitTime: </span><span class="__shiki_dzsirb">5000</span></span>
<span class="line"><span class="__shiki_140thh">    },</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    backup: {</span></span>
<span class="line"><span class="__shiki_140thh">      enabled: </span><span class="__shiki_dzsirb">true</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      interval: </span><span class="__shiki_dzsirb">3600000</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      retain: </span><span class="__shiki_dzsirb">24</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">};</span></span></code></pre></div><h2 id="_8-调优检查清单与性能测试" tabindex="-1">8. 调优检查清单与性能测试 <a class="header-anchor" href="#_8-调优检查清单与性能测试" aria-label="Permalink to &quot;8. 调优检查清单与性能测试&quot;">​</a></h2><h3 id="_8-1-性能调优检查清单" tabindex="-1">8.1 性能调优检查清单 <a class="header-anchor" href="#_8-1-性能调优检查清单" aria-label="Permalink to &quot;8.1 性能调优检查清单&quot;">​</a></h3><table tabindex="0"><thead><tr><th><strong>类别</strong></th><th><strong>检查项</strong></th><th><strong>目标值</strong></th><th><strong>检查命令</strong></th></tr></thead><tbody><tr><td><strong>进程管理</strong></td><td>工作进程数</td><td>CPU核心数×1.5</td><td><code>pm2 list | wc -l</code></td></tr><tr><td></td><td>进程重启次数</td><td>&lt; 5次/小时</td><td><code>pm2 logs --err | grep &quot;restarted&quot;</code></td></tr><tr><td></td><td>进程内存使用</td><td>&lt; 512MB/进程</td><td><code>pm2 monit</code></td></tr><tr><td><strong>负载均衡</strong></td><td>连接分布均匀度</td><td>方差 &lt; 20%</td><td>监控面板查看</td></tr><tr><td></td><td>请求响应时间</td><td>p95 &lt; 500ms</td><td><code>监控系统</code></td></tr><tr><td></td><td>错误率</td><td>&lt; 0.1%</td><td>日志分析</td></tr><tr><td><strong>内存管理</strong></td><td>堆内存使用率</td><td>&lt; 80%</td><td><code>process.memoryUsage()</code></td></tr><tr><td></td><td>内存泄漏检测</td><td>增长 &lt; 10MB/小时</td><td>内存监控</td></tr><tr><td></td><td>GC频率</td><td>适中</td><td><code>node --trace-gc</code></td></tr><tr><td><strong>网络优化</strong></td><td>连接队列长度</td><td>&lt; 1000</td><td><code>netstat -s | grep listen</code></td></tr><tr><td></td><td>TIME_WAIT连接</td><td>&lt; 10000</td><td><code>ss -tan state time-wait | wc -l</code></td></tr><tr><td></td><td>重传率</td><td>&lt; 0.1%</td><td><code>netstat -s</code></td></tr><tr><td><strong>系统资源</strong></td><td>CPU使用率</td><td>&lt; 70%</td><td><code>top -p &lt;pid&gt;</code></td></tr><tr><td></td><td>文件描述符</td><td>&lt; 80%限制</td><td><code>cat /proc/sys/fs/file-nr</code></td></tr><tr><td></td><td>磁盘I/O等待</td><td>&lt; 10%</td><td><code>iostat -x 1</code></td></tr></tbody></table><h3 id="_8-2-压力测试与基准测试" tabindex="-1">8.2 压力测试与基准测试 <a class="header-anchor" href="#_8-2-压力测试与基准测试" aria-label="Permalink to &quot;8.2 压力测试与基准测试&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 集群压力测试脚本</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> autocannon</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;autocannon&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">const</span><span class="__shiki_140thh"> { </span><span class="__shiki_dzsirb">Cluster</span><span class="__shiki_140thh"> } </span><span class="__shiki_1itgoe">=</span><span class="__shiki_1t8gfj"> require</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;cluster&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> runStressTest</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">config</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> testConfig</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    url: </span><span class="__shiki_mdbnqw">&#39;http://localhost:3000&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">    connections: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, </span><span class="__shiki_21nrsd">// 并发连接数</span></span>
<span class="line"><span class="__shiki_140thh">    pipelining: </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">,    </span><span class="__shiki_21nrsd">// 每个连接管道请求数</span></span>
<span class="line"><span class="__shiki_140thh">    duration: </span><span class="__shiki_dzsirb">60</span><span class="__shiki_140thh">,      </span><span class="__shiki_21nrsd">// 测试持续时间(秒)</span></span>
<span class="line"><span class="__shiki_140thh">    workers: </span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">,        </span><span class="__shiki_21nrsd">// 测试工作进程数</span></span>
<span class="line"><span class="__shiki_140thh">    requests: [</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;GET&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        path: </span><span class="__shiki_mdbnqw">&#39;/api/users&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      },</span></span>
<span class="line"><span class="__shiki_140thh">      {</span></span>
<span class="line"><span class="__shiki_140thh">        method: </span><span class="__shiki_mdbnqw">&#39;POST&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        path: </span><span class="__shiki_mdbnqw">&#39;/api/users&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        body: </span><span class="__shiki_dzsirb">JSON</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">stringify</span><span class="__shiki_140thh">({ name: </span><span class="__shiki_mdbnqw">&#39;test&#39;</span><span class="__shiki_140thh">, email: </span><span class="__shiki_mdbnqw">&#39;test@example.com&#39;</span><span class="__shiki_140thh"> }),</span></span>
<span class="line"><span class="__shiki_140thh">        headers: { </span><span class="__shiki_mdbnqw">&#39;Content-Type&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;application/json&#39;</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    ],</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setupClient</span><span class="__shiki_140thh">: (</span><span class="__shiki_1jdh33">client</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 自定义客户端设置</span></span>
<span class="line"><span class="__shiki_140thh">      client.</span><span class="__shiki_1t8gfj">setHeaders</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &#39;User-Agent&#39;</span><span class="__shiki_140thh">: </span><span class="__shiki_mdbnqw">&#39;Cluster-Stress-Test/1.0&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  };</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 运行测试</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> autocannon</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_140thh">testConfig,</span></span>
<span class="line"><span class="__shiki_1itgoe">    ...</span><span class="__shiki_140thh">config</span></span>
<span class="line"><span class="__shiki_140thh">  });</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 分析结果</span></span>
<span class="line"><span class="__shiki_1t8gfj">  analyzeStressTestResult</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  return</span><span class="__shiki_140thh"> result;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> analyzeStressTestResult</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">result</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;=== 压力测试结果分析 ===&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`总请求数: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">requests</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">total</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`请求速率: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">requests</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">average</span><span class="__shiki_mdbnqw">} req/sec\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`吞吐量: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">throughput</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">average</span><span class="__shiki_mdbnqw">} bytes/sec\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">=== 延迟分析 ===&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`平均延迟: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">latency</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">average</span><span class="__shiki_mdbnqw">} ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`p50延迟: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">latency</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">p50</span><span class="__shiki_mdbnqw">} ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`p90延迟: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">latency</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">p90</span><span class="__shiki_mdbnqw">} ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`p99延迟: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">latency</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">p99</span><span class="__shiki_mdbnqw">} ms\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">=== 错误统计 ===&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`非2xx响应: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">non2xx</span><span class="__shiki_mdbnqw">} (\${</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">non2xx</span><span class="__shiki_1itgoe"> /</span><span class="__shiki_140thh"> result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">requests</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">total</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_mdbnqw">).</span><span class="__shiki_1t8gfj">toFixed</span><span class="__shiki_mdbnqw">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_mdbnqw">)</span><span class="__shiki_mdbnqw">}%)\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`超时请求: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">timeouts</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`请求错误: \${</span><span class="__shiki_140thh">result</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">errors</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 性能瓶颈识别</span></span>
<span class="line"><span class="__shiki_1t8gfj">  identifyBottlenecks</span><span class="__shiki_140thh">(result);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">function</span><span class="__shiki_1t8gfj"> identifyBottlenecks</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">result</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> bottlenecks</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // CPU瓶颈检测</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (result.latency.p99 </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_1itgoe"> &amp;&amp;</span><span class="__shiki_140thh"> result.requests.average </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    bottlenecks.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;CPU瓶颈&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      description: </span><span class="__shiki_mdbnqw">&#39;高并发下延迟显著增加，可能达到CPU处理极限&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      suggestion: </span><span class="__shiki_mdbnqw">&#39;增加工作进程数或优化业务逻辑&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 内存瓶颈检测</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (result.errors </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> result.requests.total </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.01</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    bottlenecks.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;内存瓶颈&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      description: </span><span class="__shiki_mdbnqw">&#39;错误率过高，可能是内存不足导致&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      suggestion: </span><span class="__shiki_mdbnqw">&#39;检查内存使用，增加内存或减少每个进程的内存占用&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 网络瓶颈检测</span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (result.timeouts </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    bottlenecks.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">      type: </span><span class="__shiki_mdbnqw">&#39;网络瓶颈&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      description: </span><span class="__shiki_mdbnqw">&#39;存在请求超时，可能是连接数达到限制&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      suggestion: </span><span class="__shiki_mdbnqw">&#39;调整最大连接数，优化TCP参数&#39;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  if</span><span class="__shiki_140thh"> (bottlenecks.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">=== 性能瓶颈识别 ===&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    bottlenecks.</span><span class="__shiki_1t8gfj">forEach</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">b</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`[\${</span><span class="__shiki_140thh">b</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">type</span><span class="__shiki_mdbnqw">}] \${</span><span class="__shiki_140thh">b</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">description</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`建议: \${</span><span class="__shiki_140thh">b</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">suggestion</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  } </span><span class="__shiki_1itgoe">else</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">✓ 未发现明显性能瓶颈&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">// 渐进式压力测试</span></span>
<span class="line"><span class="__shiki_1itgoe">async</span><span class="__shiki_1itgoe"> function</span><span class="__shiki_1t8gfj"> progressiveStressTest</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> stages</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [</span></span>
<span class="line"><span class="__shiki_140thh">    { connections: </span><span class="__shiki_dzsirb">100</span><span class="__shiki_140thh">, duration: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    { connections: </span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">, duration: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    { connections: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, duration: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    { connections: </span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">, duration: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">    { connections: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">, duration: </span><span class="__shiki_dzsirb">30</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">  ];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  const</span><span class="__shiki_dzsirb"> results</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> stage</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> stages) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`</span><span class="__shiki_dzsirb">\\n</span><span class="__shiki_mdbnqw">&gt;&gt;&gt; 运行阶段测试: \${</span><span class="__shiki_140thh">stage</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">connections</span><span class="__shiki_mdbnqw">} 并发连接\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> result</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_1t8gfj"> runStressTest</span><span class="__shiki_140thh">(stage);</span></span>
<span class="line"><span class="__shiki_140thh">      results.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        stage,</span></span>
<span class="line"><span class="__shiki_140thh">        result: {</span></span>
<span class="line"><span class="__shiki_140thh">          requestsPerSecond: result.requests.average,</span></span>
<span class="line"><span class="__shiki_140thh">          p99Latency: result.latency.p99,</span></span>
<span class="line"><span class="__shiki_140thh">          errorRate: (result.errors </span><span class="__shiki_1itgoe">+</span><span class="__shiki_140thh"> result.non2xx) </span><span class="__shiki_1itgoe">/</span><span class="__shiki_140thh"> result.requests.total</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 检查是否达到系统极限</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (result.errors </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> result.requests.total </span><span class="__shiki_1itgoe">*</span><span class="__shiki_dzsirb"> 0.05</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">        console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;警告: 错误率超过5%，停止进一步测试&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">        break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 间隔一段时间</span></span>
<span class="line"><span class="__shiki_1itgoe">      await</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_1itgoe"> =&gt;</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(resolve, </span><span class="__shiki_dzsirb">10000</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_140thh">    } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">      console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`阶段测试失败: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">      break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 生成性能报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">  generatePerformanceReport</span><span class="__shiki_140thh">(results);</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_9-故障诊断与应急处理" tabindex="-1">9. 故障诊断与应急处理 <a class="header-anchor" href="#_9-故障诊断与应急处理" aria-label="Permalink to &quot;9. 故障诊断与应急处理&quot;">​</a></h2><h3 id="_9-1-常见问题快速诊断" tabindex="-1">9.1 常见问题快速诊断 <a class="header-anchor" href="#_9-1-常见问题快速诊断" aria-label="Permalink to &quot;9.1 常见问题快速诊断&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 集群诊断工具集</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> ClusterDiagnosticTool</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> diagnoseCommonIssues</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> issues</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 检查工作进程状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> workerStatus</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkWorkerStatus</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (workerStatus.unhealthyWorkers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;WORKER_HEALTH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">workerStatus</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">unhealthyWorkers</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">}个工作进程不健康\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: workerStatus.unhealthyWorkers,</span></span>
<span class="line"><span class="__shiki_140thh">        suggestion: </span><span class="__shiki_mdbnqw">&#39;检查工作进程日志，考虑重启不健康进程&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 检查负载均衡</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> lbStatus</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkLoadBalancing</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (lbStatus.imbalanceFactor </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 0.3</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;LOAD_BALANCE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;MEDIUM&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;负载分布不均衡&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: lbStatus,</span></span>
<span class="line"><span class="__shiki_140thh">        suggestion: </span><span class="__shiki_mdbnqw">&#39;调整负载均衡算法或检查工作进程健康状态&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 检查内存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> memoryStatus</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkMemoryUsage</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (memoryStatus.highUsageWorkers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">      issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;MEMORY_USAGE&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">\`\${</span><span class="__shiki_140thh">memoryStatus</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">highUsageWorkers</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_mdbnqw">}个工作进程内存使用过高\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: memoryStatus,</span></span>
<span class="line"><span class="__shiki_140thh">        suggestion: </span><span class="__shiki_mdbnqw">&#39;检查内存泄漏，考虑重启高内存进程&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 4. 检查连接状态</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> connectionStatus</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkConnections</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (connectionStatus.exceedsLimit) {</span></span>
<span class="line"><span class="__shiki_140thh">      issues.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;CONNECTION_LIMIT&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;HIGH&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        description: </span><span class="__shiki_mdbnqw">&#39;连接数接近或超过限制&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        details: connectionStatus,</span></span>
<span class="line"><span class="__shiki_140thh">        suggestion: </span><span class="__shiki_mdbnqw">&#39;增加最大连接数限制或优化连接处理&#39;</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> issues;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> checkWorkerStatus</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> workers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(cluster.workers </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> {});</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> unhealthyWorkers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> worker</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> workers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">        // 发送健康检查请求</span></span>
<span class="line"><span class="__shiki_1itgoe">        const</span><span class="__shiki_dzsirb"> isHealthy</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">pingWorker</span><span class="__shiki_140thh">(worker);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">!</span><span class="__shiki_140thh">isHealthy) {</span></span>
<span class="line"><span class="__shiki_140thh">          unhealthyWorkers.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">            id: worker.id,</span></span>
<span class="line"><span class="__shiki_140thh">            pid: worker.process.pid,</span></span>
<span class="line"><span class="__shiki_140thh">            uptime: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">() </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> (worker.process.startTime </span><span class="__shiki_1itgoe">||</span><span class="__shiki_140thh"> Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">())</span></span>
<span class="line"><span class="__shiki_140thh">          });</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">        unhealthyWorkers.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">          id: worker.id,</span></span>
<span class="line"><span class="__shiki_140thh">          pid: worker.process.pid,</span></span>
<span class="line"><span class="__shiki_140thh">          error: error.message</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      totalWorkers: workers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      healthyWorkers: workers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> -</span><span class="__shiki_140thh"> unhealthyWorkers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">      unhealthyWorkers</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> pingWorker</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        resolve</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      }, </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ type: </span><span class="__shiki_mdbnqw">&#39;health-check&#39;</span><span class="__shiki_140thh"> }, (</span><span class="__shiki_1jdh33">error</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          clearTimeout</span><span class="__shiki_140thh">(timeout);</span></span>
<span class="line"><span class="__shiki_1t8gfj">          resolve</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">false</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1itgoe">          return</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">once</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;message&#39;</span><span class="__shiki_140thh">, (</span><span class="__shiki_1jdh33">message</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">          if</span><span class="__shiki_140thh"> (message.type </span><span class="__shiki_1itgoe">===</span><span class="__shiki_mdbnqw"> &#39;health-check-response&#39;</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1t8gfj">            clearTimeout</span><span class="__shiki_140thh">(timeout);</span></span>
<span class="line"><span class="__shiki_1t8gfj">            resolve</span><span class="__shiki_140thh">(message.healthy </span><span class="__shiki_1itgoe">===</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_140thh">        });</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 自动修复常见问题</span></span>
<span class="line"><span class="__shiki_1itgoe">  static</span><span class="__shiki_1itgoe"> async</span><span class="__shiki_1t8gfj"> autoFixIssues</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">issues</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> fixesApplied</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> issue</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> issues) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      switch</span><span class="__shiki_140thh"> (issue.type) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;WORKER_HEALTH&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 重启不健康的工作进程</span></span>
<span class="line"><span class="__shiki_1itgoe">          for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> worker</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> issue.details) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">              cluster.workers[worker.id].</span><span class="__shiki_1t8gfj">kill</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SIGTERM&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">              setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">              }, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">              </span></span>
<span class="line"><span class="__shiki_140thh">              fixesApplied.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                issue: issue.type,</span></span>
<span class="line"><span class="__shiki_140thh">                action: </span><span class="__shiki_mdbnqw">\`重启工作进程 \${</span><span class="__shiki_140thh">worker</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">              });</span></span>
<span class="line"><span class="__shiki_140thh">            } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">              console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`重启工作进程失败: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">          </span></span>
<span class="line"><span class="__shiki_1itgoe">        case</span><span class="__shiki_mdbnqw"> &#39;MEMORY_USAGE&#39;</span><span class="__shiki_140thh">:</span></span>
<span class="line"><span class="__shiki_21nrsd">          // 重启高内存使用进程</span></span>
<span class="line"><span class="__shiki_1itgoe">          for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> worker</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> issue.details.highUsageWorkers) {</span></span>
<span class="line"><span class="__shiki_1itgoe">            if</span><span class="__shiki_140thh"> (worker.memoryPercent </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">              try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                cluster.workers[worker.id].</span><span class="__shiki_1t8gfj">kill</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SIGTERM&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">                setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">                  cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">                }, </span><span class="__shiki_dzsirb">2000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">                </span></span>
<span class="line"><span class="__shiki_140thh">                fixesApplied.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">                  issue: issue.type,</span></span>
<span class="line"><span class="__shiki_140thh">                  action: </span><span class="__shiki_mdbnqw">\`重启高内存进程 \${</span><span class="__shiki_140thh">worker</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">id</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">                  timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">                });</span></span>
<span class="line"><span class="__shiki_140thh">              } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">                console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`重启高内存进程失败: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">              }</span></span>
<span class="line"><span class="__shiki_140thh">            }</span></span>
<span class="line"><span class="__shiki_140thh">          }</span></span>
<span class="line"><span class="__shiki_1itgoe">          break</span><span class="__shiki_140thh">;</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_140thh"> fixesApplied;</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h3 id="_9-2-应急响应预案" tabindex="-1">9.2 应急响应预案 <a class="header-anchor" href="#_9-2-应急响应预案" aria-label="Permalink to &quot;9.2 应急响应预案&quot;">​</a></h3><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">// 集群应急响应系统</span></span>
<span class="line"><span class="__shiki_1itgoe">class</span><span class="__shiki_1t8gfj"> EmergencyResponseSystem</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">  constructor</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.alertThresholds </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      memory: { warning: </span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh">, critical: </span><span class="__shiki_dzsirb">90</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      cpu: { warning: </span><span class="__shiki_dzsirb">75</span><span class="__shiki_140thh">, critical: </span><span class="__shiki_dzsirb">90</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      errorRate: { warning: </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, critical: </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> },</span></span>
<span class="line"><span class="__shiki_140thh">      responseTime: { warning: </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">, critical: </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh"> }</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.responseActions </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">      memory_critical: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleMemoryCritical.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      cpu_critical: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleCPUCritical.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">),</span></span>
<span class="line"><span class="__shiki_140thh">      error_rate_critical: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.handleErrorRateCritical.</span><span class="__shiki_1t8gfj">bind</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    };</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">startMonitoring</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  startMonitoring</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    // 实时监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">    setInterval</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">checkCriticalMetrics</span><span class="__shiki_140thh">(), </span><span class="__shiki_dzsirb">5000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 告警历史</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.alertHistory </span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1itgoe">  async</span><span class="__shiki_1t8gfj"> checkCriticalMetrics</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> metrics</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1itgoe"> await</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">collectMetrics</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> alerts</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> [];</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查内存使用</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (metrics.memory.percent </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.alertThresholds.memory.critical) {</span></span>
<span class="line"><span class="__shiki_140thh">      alerts.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;memory_critical&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;CRITICAL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        value: metrics.memory.percent,</span></span>
<span class="line"><span class="__shiki_140thh">        threshold: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.alertThresholds.memory.critical,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查CPU使用</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (metrics.cpu.percent </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.alertThresholds.cpu.critical) {</span></span>
<span class="line"><span class="__shiki_140thh">      alerts.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;cpu_critical&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;CRITICAL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        value: metrics.cpu.percent,</span></span>
<span class="line"><span class="__shiki_140thh">        threshold: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.alertThresholds.cpu.critical,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 检查错误率</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (metrics.errors.rate </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.alertThresholds.errorRate.critical) {</span></span>
<span class="line"><span class="__shiki_140thh">      alerts.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">({</span></span>
<span class="line"><span class="__shiki_140thh">        type: </span><span class="__shiki_mdbnqw">&#39;error_rate_critical&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        severity: </span><span class="__shiki_mdbnqw">&#39;CRITICAL&#39;</span><span class="__shiki_140thh">,</span></span>
<span class="line"><span class="__shiki_140thh">        value: metrics.errors.rate,</span></span>
<span class="line"><span class="__shiki_140thh">        threshold: </span><span class="__shiki_dzsirb">this</span><span class="__shiki_140thh">.alertThresholds.errorRate.critical,</span></span>
<span class="line"><span class="__shiki_140thh">        timestamp: Date.</span><span class="__shiki_1t8gfj">now</span><span class="__shiki_140thh">()</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 触发应急响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (alerts.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">triggerEmergencyResponse</span><span class="__shiki_140thh">(alerts);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  triggerEmergencyResponse</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">alerts</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;🚨 触发应急响应&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 记录告警</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.alertHistory.</span><span class="__shiki_1t8gfj">push</span><span class="__shiki_140thh">(</span><span class="__shiki_1itgoe">...</span><span class="__shiki_140thh">alerts);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 执行应急动作</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">const</span><span class="__shiki_dzsirb"> alert</span><span class="__shiki_1itgoe"> of</span><span class="__shiki_140thh"> alerts) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> action</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.responseActions[alert.type];</span></span>
<span class="line"><span class="__shiki_1itgoe">      if</span><span class="__shiki_140thh"> (action) {</span></span>
<span class="line"><span class="__shiki_1itgoe">        try</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">          action</span><span class="__shiki_140thh">(alert);</span></span>
<span class="line"><span class="__shiki_140thh">        } </span><span class="__shiki_1itgoe">catch</span><span class="__shiki_140thh"> (error) {</span></span>
<span class="line"><span class="__shiki_140thh">          console.</span><span class="__shiki_1t8gfj">error</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">\`应急动作执行失败: \${</span><span class="__shiki_140thh">error</span><span class="__shiki_mdbnqw">.</span><span class="__shiki_140thh">message</span><span class="__shiki_mdbnqw">}\`</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">        }</span></span>
<span class="line"><span class="__shiki_140thh">      }</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 通知相关人员</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">sendEmergencyNotifications</span><span class="__shiki_140thh">(alerts);</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  handleMemoryCritical</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">alert</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;执行内存紧急处理&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 重启内存使用最高的进程</span></span>
<span class="line"><span class="__shiki_1itgoe">    const</span><span class="__shiki_dzsirb"> workers</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Object.</span><span class="__shiki_1t8gfj">values</span><span class="__shiki_140thh">(cluster.workers);</span></span>
<span class="line"><span class="__shiki_140thh">    workers.</span><span class="__shiki_1t8gfj">sort</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">a</span><span class="__shiki_140thh">, </span><span class="__shiki_1jdh33">b</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> memA</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getWorkerMemoryUsage</span><span class="__shiki_140thh">(a);</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> memB</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_dzsirb"> this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">getWorkerMemoryUsage</span><span class="__shiki_140thh">(b);</span></span>
<span class="line"><span class="__shiki_1itgoe">      return</span><span class="__shiki_140thh"> memB </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh"> memA;</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 重启前两个内存使用最高的进程</span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> (</span><span class="__shiki_1itgoe">let</span><span class="__shiki_140thh"> i </span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">; i </span><span class="__shiki_1itgoe">&lt;</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">min</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">, workers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_140thh">); i</span><span class="__shiki_1itgoe">++</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">gracefulRestartWorker</span><span class="__shiki_140thh">(workers[i]);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 减少工作进程数（如果内存持续不足）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (alert.value </span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_dzsirb"> 95</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> targetCount</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_140thh"> Math.</span><span class="__shiki_1t8gfj">max</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">, Math.</span><span class="__shiki_1t8gfj">floor</span><span class="__shiki_140thh">(workers.</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 0.7</span><span class="__shiki_140thh">));</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">scaleDownWorkers</span><span class="__shiki_140thh">(targetCount);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  handleCPUCritical</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">alert</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;执行CPU紧急处理&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 启用限流</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">enableRateLimiting</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 降级非核心功能</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">enableFeatureDegradation</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 增加工作进程数（如果CPU是瓶颈）</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (Object.</span><span class="__shiki_1t8gfj">keys</span><span class="__shiki_140thh">(cluster.workers).</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> &lt;</span><span class="__shiki_140thh"> os.</span><span class="__shiki_1t8gfj">cpus</span><span class="__shiki_140thh">().</span><span class="__shiki_dzsirb">length</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_dzsirb"> 2</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_dzsirb">      this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">scaleUpWorkers</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    }</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_1t8gfj">  handleErrorRateCritical</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">alert</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_140thh">    console.</span><span class="__shiki_1t8gfj">log</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;执行错误率紧急处理&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 1. 启用熔断器</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">enableCircuitBreaker</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 2. 回滚到最后已知良好版本</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">rollbackToLastGoodVersion</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    // 3. 切换到维护模式</span></span>
<span class="line"><span class="__shiki_dzsirb">    this</span><span class="__shiki_140thh">.</span><span class="__shiki_1t8gfj">enableMaintenanceMode</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">  </span></span>
<span class="line"><span class="__shiki_21nrsd">  // 优雅重启工作进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">  gracefulRestartWorker</span><span class="__shiki_140thh">(</span><span class="__shiki_1jdh33">worker</span><span class="__shiki_140thh">) {</span></span>
<span class="line"><span class="__shiki_1itgoe">    return</span><span class="__shiki_1itgoe"> new</span><span class="__shiki_dzsirb"> Promise</span><span class="__shiki_140thh">((</span><span class="__shiki_1jdh33">resolve</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_21nrsd">      // 发送优雅关闭信号</span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">send</span><span class="__shiki_140thh">({ type: </span><span class="__shiki_mdbnqw">&#39;graceful-shutdown&#39;</span><span class="__shiki_140thh"> });</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 设置超时</span></span>
<span class="line"><span class="__shiki_1itgoe">      const</span><span class="__shiki_dzsirb"> timeout</span><span class="__shiki_1itgoe"> =</span><span class="__shiki_1t8gfj"> setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">        worker.</span><span class="__shiki_1t8gfj">kill</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;SIGKILL&#39;</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_1t8gfj">        resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">      }, </span><span class="__shiki_dzsirb">30000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      </span></span>
<span class="line"><span class="__shiki_21nrsd">      // 监听退出</span></span>
<span class="line"><span class="__shiki_140thh">      worker.</span><span class="__shiki_1t8gfj">once</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&#39;exit&#39;</span><span class="__shiki_140thh">, () </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_1t8gfj">        clearTimeout</span><span class="__shiki_140thh">(timeout);</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        // 启动新进程</span></span>
<span class="line"><span class="__shiki_1t8gfj">        setTimeout</span><span class="__shiki_140thh">(() </span><span class="__shiki_1itgoe">=&gt;</span><span class="__shiki_140thh"> {</span></span>
<span class="line"><span class="__shiki_140thh">          cluster.</span><span class="__shiki_1t8gfj">fork</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_1t8gfj">          resolve</span><span class="__shiki_140thh">();</span></span>
<span class="line"><span class="__shiki_140thh">        }, </span><span class="__shiki_dzsirb">1000</span><span class="__shiki_140thh">);</span></span>
<span class="line"><span class="__shiki_140thh">      });</span></span>
<span class="line"><span class="__shiki_140thh">    });</span></span>
<span class="line"><span class="__shiki_140thh">  }</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span></code></pre></div><h2 id="_10-集群模式调优总结" tabindex="-1">10. 集群模式调优总结 <a class="header-anchor" href="#_10-集群模式调优总结" aria-label="Permalink to &quot;10. 集群模式调优总结&quot;">​</a></h2><h3 id="_10-1-最佳实践总结" tabindex="-1">10.1 最佳实践总结 <a class="header-anchor" href="#_10-1-最佳实践总结" aria-label="Permalink to &quot;10.1 最佳实践总结&quot;">​</a></h3><ol><li><p><strong>进程数量优化</strong>：</p><ul><li>初始值设置为CPU核心数</li><li>根据负载动态调整（±30%）</li><li>考虑内存限制设置上限</li></ul></li><li><p><strong>负载均衡策略</strong>：</p><ul><li>生产环境使用加权最少连接算法</li><li>启用会话粘性（有状态应用）</li><li>实现健康检查机制</li></ul></li><li><p><strong>内存管理</strong>：</p><ul><li>设置内存重启阈值（建议512MB-1GB）</li><li>实现内存泄漏检测</li><li>定期滚动重启防止内存累积</li></ul></li><li><p><strong>网络优化</strong>：</p><ul><li>调整TCP内核参数</li><li>启用连接复用</li><li>优化Keep-Alive配置</li></ul></li><li><p><strong>监控告警</strong>：</p><ul><li>实现多维度监控</li><li>设置智能告警阈值</li><li>建立应急响应流程</li></ul></li></ol><h3 id="_10-2-调优效果评估" tabindex="-1">10.2 调优效果评估 <a class="header-anchor" href="#_10-2-调优效果评估" aria-label="Permalink to &quot;10.2 调优效果评估&quot;">​</a></h3><p>经过上述调优，典型Node.js集群可获得以下改进：</p><table tabindex="0"><thead><tr><th><strong>指标</strong></th><th><strong>调优前</strong></th><th><strong>调优后</strong></th><th><strong>改进幅度</strong></th></tr></thead><tbody><tr><td>请求吞吐量</td><td>5,000 req/s</td><td>15,000 req/s</td><td>300%</td></tr><tr><td>P99响应时间</td><td>800ms</td><td>200ms</td><td>75%</td></tr><tr><td>错误率</td><td>2%</td><td>0.1%</td><td>95%</td></tr><tr><td>资源利用率</td><td>40%</td><td>85%</td><td>112%</td></tr><tr><td>可用性</td><td>99%</td><td>99.99%</td><td>0.99%</td></tr></tbody></table><h3 id="_10-3-持续优化建议" tabindex="-1">10.3 持续优化建议 <a class="header-anchor" href="#_10-3-持续优化建议" aria-label="Permalink to &quot;10.3 持续优化建议&quot;">​</a></h3><ol><li><strong>定期性能测试</strong>：每月执行一次压力测试，识别新的瓶颈</li><li><strong>监控指标分析</strong>：每周分析监控数据，发现异常模式</li><li><strong>配置版本控制</strong>：所有调优参数纳入版本控制</li><li><strong>渐进式优化</strong>：每次只调整一个参数，评估效果后再继续</li><li><strong>文档更新</strong>：优化措施及时更新到运维文档</li></ol><p>通过系统性的Cluster模式调优，Node.js应用可以在裸机/VM部署环境下实现接近容器化环境的性能表现，为业务提供稳定、高效的服务能力。</p>`,54)])])}const d=a(p,[["render",h]]);export{o as __pageData,d as default};
