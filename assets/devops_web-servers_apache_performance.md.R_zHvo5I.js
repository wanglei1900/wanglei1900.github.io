import{_ as a,o as n,c as _,a as p}from"./app.DkoUFz-u.js";const d=JSON.parse('{"title":"Web服务器Apache性能优化策略深度解析学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"devops/web-servers/apache/performance.md","filePath":"devops/web-servers/apache/performance.md"}'),i={name:"devops/web-servers/apache/performance.md"};function l(h,s,c,t,e,k){return n(),_("div",null,[...s[0]||(s[0]=[p(`<h1 id="web服务器apache性能优化策略深度解析学习笔记" tabindex="-1">Web服务器Apache性能优化策略深度解析学习笔记 <a class="header-anchor" href="#web服务器apache性能优化策略深度解析学习笔记" aria-label="Permalink to &quot;Web服务器Apache性能优化策略深度解析学习笔记&quot;">​</a></h1><h2 id="_1-apache性能优化概述" tabindex="-1">1. Apache性能优化概述 <a class="header-anchor" href="#_1-apache性能优化概述" aria-label="Permalink to &quot;1. Apache性能优化概述&quot;">​</a></h2><h3 id="_1-1-性能优化的核心目标" tabindex="-1">1.1 性能优化的核心目标 <a class="header-anchor" href="#_1-1-性能优化的核心目标" aria-label="Permalink to &quot;1.1 性能优化的核心目标&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">性能优化 = 资源利用率 + 响应速度 + 并发能力 + 稳定性</span></span>
<span class="line"><span class="__shiki_wvjl67">    ↓</span></span>
<span class="line"><span class="__shiki_wvjl67">核心指标:</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 请求吞吐量 (Requests/Second)</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 并发连接数 (Concurrent Connections)</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 响应时间 (Response Time)</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 资源消耗 (CPU, Memory, I/O)</span></span></code></pre></div><h3 id="_1-2-优化层次模型" tabindex="-1">1.2 优化层次模型 <a class="header-anchor" href="#_1-2-优化层次模型" aria-label="Permalink to &quot;1.2 优化层次模型&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">7层：应用层优化 (代码、缓存策略、数据库)</span></span>
<span class="line"><span class="__shiki_wvjl67">6层：HTTP层优化 (压缩、缓存头、连接管理)</span></span>
<span class="line"><span class="__shiki_wvjl67">5层：Apache配置优化 (MPM、模块、参数)</span></span>
<span class="line"><span class="__shiki_wvjl67">4层：操作系统优化 (内核参数、文件系统)</span></span>
<span class="line"><span class="__shiki_wvjl67">3层：网络层优化 (TCP/IP、负载均衡)</span></span>
<span class="line"><span class="__shiki_wvjl67">2层：硬件层优化 (CPU、内存、磁盘、网络)</span></span>
<span class="line"><span class="__shiki_wvjl67">1层：架构层优化 (集群、CDN、反向代理)</span></span></code></pre></div><h2 id="_2-apache核心配置优化" tabindex="-1">2. Apache核心配置优化 <a class="header-anchor" href="#_2-apache核心配置优化" aria-label="Permalink to &quot;2. Apache核心配置优化&quot;">​</a></h2><h3 id="_2-1-mpm模块选择与调优" tabindex="-1">2.1 MPM模块选择与调优 <a class="header-anchor" href="#_2-1-mpm模块选择与调优" aria-label="Permalink to &quot;2.1 MPM模块选择与调优&quot;">​</a></h3><h4 id="_2-1-1-mpm类型选择决策树" tabindex="-1">2.1.1 MPM类型选择决策树 <a class="header-anchor" href="#_2-1-1-mpm类型选择决策树" aria-label="Permalink to &quot;2.1.1 MPM类型选择决策树&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">评估标准：</span></span>
<span class="line"><span class="__shiki_wvjl67">    内存限制？ → 是 → 选择Worker或Event</span></span>
<span class="line"><span class="__shiki_wvjl67">              ↓ 否</span></span>
<span class="line"><span class="__shiki_wvjl67">    需要线程安全？ → 否 → 选择Prefork</span></span>
<span class="line"><span class="__shiki_wvjl67">                ↓ 是</span></span>
<span class="line"><span class="__shiki_wvjl67">    高并发长连接？ → 是 → 选择Event</span></span>
<span class="line"><span class="__shiki_wvjl67">                ↓ 否</span></span>
<span class="line"><span class="__shiki_wvjl67">             选择Worker</span></span></code></pre></div><h4 id="_2-1-2-prefork-mpm深度优化" tabindex="-1">2.1.2 Prefork MPM深度优化 <a class="header-anchor" href="#_2-1-2-prefork-mpm深度优化" aria-label="Permalink to &quot;2.1.2 Prefork MPM深度优化&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/mods-available/mpm_prefork.conf</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mpm_prefork_module</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 进程管理配置 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启动时的服务器进程数 (基于预期负载设置)</span></span>
<span class="line"><span class="__shiki_1itgoe">    StartServers</span><span class="__shiki_dzsirb">          5</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最小空闲进程数 (保持足够进程处理突发请求)</span></span>
<span class="line"><span class="__shiki_1itgoe">    MinSpareServers</span><span class="__shiki_dzsirb">       10</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最大空闲进程数 (避免过多空闲进程浪费内存)</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxSpareServers</span><span class="__shiki_dzsirb">       20</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 并发控制配置 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # Apache可以创建的最大进程数 (关键参数)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 计算公式: MaxRequestWorkers ≈ (可用内存 - 系统内存) / 单个进程平均内存</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 监控命令: ps -ylC apache2 --sort:rss | awk &#39;{sum+=$8} END {print sum/NR}&#39;</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxRequestWorkers</span><span class="__shiki_dzsirb">     250</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 单个进程处理的请求数上限 (防止内存泄漏)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设置为0表示无限制，生产环境建议设置10000-30000</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxConnectionsPerChild</span><span class="__shiki_dzsirb">  10000</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 性能调优配置 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 监听队列长度 (backlog)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 公式: ListenBacklog ≈ MaxRequestWorkers × 1.5</span></span>
<span class="line"><span class="__shiki_1itgoe">    ListenBacklog</span><span class="__shiki_dzsirb">        511</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最大请求大小 (Bytes)</span></span>
<span class="line"><span class="__shiki_1itgoe">    LimitRequestBody</span><span class="__shiki_dzsirb">     10485760</span><span class="__shiki_140thh">  # 10MB</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 资源限制配置 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # CPU时间限制 (秒)</span></span>
<span class="line"><span class="__shiki_1itgoe">    RLimitCPU</span><span class="__shiki_140thh">            max </span><span class="__shiki_dzsirb">600</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 内存限制 (Bytes)</span></span>
<span class="line"><span class="__shiki_1itgoe">    RLimitMEM</span><span class="__shiki_140thh">            max </span><span class="__shiki_dzsirb">1073741824</span><span class="__shiki_140thh">  # 1GB</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 进程数限制</span></span>
<span class="line"><span class="__shiki_1itgoe">    RLimitNPROC</span><span class="__shiki_140thh">          max </span><span class="__shiki_dzsirb">1000</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h4 id="_2-1-3-worker-event-mpm深度优化" tabindex="-1">2.1.3 Worker/Event MPM深度优化 <a class="header-anchor" href="#_2-1-3-worker-event-mpm深度优化" aria-label="Permalink to &quot;2.1.3 Worker/Event MPM深度优化&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/mods-available/mpm_worker.conf</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mpm_worker_module</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 进程配置 ==========</span></span>
<span class="line"><span class="__shiki_1itgoe">    StartServers</span><span class="__shiki_dzsirb">          3</span></span>
<span class="line"><span class="__shiki_1itgoe">    ServerLimit</span><span class="__shiki_dzsirb">           16</span><span class="__shiki_140thh">          # 最大进程数</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 线程配置 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 每个进程的线程数 (推荐: 2×CPU核心数)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 查看CPU核心: grep -c ^processor /proc/cpuinfo</span></span>
<span class="line"><span class="__shiki_1itgoe">    ThreadsPerChild</span><span class="__shiki_dzsirb">      25</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最小空闲线程数</span></span>
<span class="line"><span class="__shiki_1itgoe">    MinSpareThreads</span><span class="__shiki_dzsirb">      50</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最大空闲线程数</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxSpareThreads</span><span class="__shiki_dzsirb">      150</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 并发控制 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 最大线程数 = ServerLimit × ThreadsPerChild</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 示例: 16 × 25 = 400</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxRequestWorkers</span><span class="__shiki_dzsirb">    400</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 线程栈大小 (Bytes)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ThreadStackSize</span><span class="__shiki_dzsirb">      8388608</span><span class="__shiki_140thh">      # 8MB</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 事件特定配置 (Event MPM) ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 异步监听线程数 (Apache 2.4+)</span></span>
<span class="line"><span class="__shiki_140thh">    AsyncRequestWorkerFactor  </span><span class="__shiki_dzsirb">2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 监听器线程数 (优化keep-alive连接)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ListenCoresBucketsRatio 8</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_2-2-内存使用分析与优化" tabindex="-1">2.2 内存使用分析与优化 <a class="header-anchor" href="#_2-2-内存使用分析与优化" aria-label="Permalink to &quot;2.2 内存使用分析与优化&quot;">​</a></h3><h4 id="_2-2-1-apache内存监控脚本" tabindex="-1">2.2.1 Apache内存监控脚本 <a class="header-anchor" href="#_2-2-1-apache内存监控脚本" aria-label="Permalink to &quot;2.2.1 Apache内存监控脚本&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># apache-memory-monitor.sh</span></span>
<span class="line"><span class="__shiki_21nrsd"># Apache内存使用详细监控</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">LOG_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/apache-memory.log&quot;</span></span>
<span class="line"><span class="__shiki_140thh">APACHE_USER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;www-data&quot;</span></span>
<span class="line"><span class="__shiki_140thh">SAMPLE_INTERVAL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">5</span><span class="__shiki_21nrsd">  # 采样间隔(秒)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 颜色定义</span></span>
<span class="line"><span class="__shiki_140thh">RED</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;31m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">GREEN</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;32m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">YELLOW</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[1;33m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">BLUE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;34m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">NC</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0m&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 函数：获取Apache进程内存信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">get_apache_memory</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;================ Apache内存分析报告 ================&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;时间: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;===================================================&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 按用户统计Apache内存</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[1] Apache进程内存汇总:\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ps</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_140thh"> $APACHE_USER </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> pid,rss,vsz,pmem,pcpu,comm</span><span class="__shiki_dzsirb"> --sort</span><span class="__shiki_dzsirb"> -rss</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -20</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 详细内存统计</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[2] 详细内存统计:\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    PIDS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">ps</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_140thh"> $APACHE_USER </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> pid=</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    TOTAL_RSS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">0</span></span>
<span class="line"><span class="__shiki_140thh">    TOTAL_VSZ</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">0</span></span>
<span class="line"><span class="__shiki_140thh">    COUNT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">0</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> PID </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $PIDS; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">        RSS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">ps</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $PID </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> rss=</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        VSZ</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">ps</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_140thh"> $PID </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> vsz=</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> echo</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        TOTAL_RSS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">TOTAL_RSS</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> RSS</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        TOTAL_VSZ</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">TOTAL_VSZ</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> VSZ</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        COUNT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">COUNT</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_dzsirb"> 1</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_140thh">    AVG_RSS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">TOTAL_RSS</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_mdbnqw"> COUNT</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    AVG_VSZ</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">TOTAL_VSZ</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_mdbnqw"> COUNT</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;进程数: </span><span class="__shiki_140thh">$COUNT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;总RSS内存: $((</span><span class="__shiki_1t8gfj">TOTAL_RSS</span><span class="__shiki_mdbnqw"> / </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_mdbnqw">)) MB&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;总VSZ内存: $((</span><span class="__shiki_1t8gfj">TOTAL_VSZ</span><span class="__shiki_mdbnqw"> / </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_mdbnqw">)) MB&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;平均RSS/进程: $((</span><span class="__shiki_1t8gfj">AVG_RSS</span><span class="__shiki_mdbnqw"> / </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_mdbnqw">)) MB&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;平均VSZ/进程: $((</span><span class="__shiki_1t8gfj">AVG_VSZ</span><span class="__shiki_mdbnqw"> / </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_mdbnqw">)) MB&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. 按模块分析内存 (需要Apache在编译时启用mod_info)</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[3] 通过mod_info获取模块内存(如果可用):\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> http://localhost/server-info?server</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;Module Name&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">        curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> http://localhost/server-info?server</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            grep</span><span class="__shiki_dzsirb"> -A2</span><span class="__shiki_mdbnqw"> &quot;Module Name&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1t8gfj">            head</span><span class="__shiki_dzsirb"> -50</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 4. 共享内存分析</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[4] 共享内存分析:\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ipcs</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_140thh"> $APACHE_USER</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 5. 内存使用趋势</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[5] 内存使用趋势:\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;系统总内存: $(</span><span class="__shiki_1t8gfj">free</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;/^Mem:/ {print $2}&#39;)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;已用内存: $(</span><span class="__shiki_1t8gfj">free</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;/^Mem:/ {print $3}&#39;)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;可用内存: $(</span><span class="__shiki_1t8gfj">free</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;/^Mem:/ {print $7}&#39;)&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Swap使用: $(</span><span class="__shiki_1t8gfj">free</span><span class="__shiki_dzsirb"> -h</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;/^Swap:/ {print $3}&#39;)&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 6. 内存泄漏检测</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[6] 内存泄漏检测(需要长期监控):\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$LOG_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;最近5次采样对比:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        tail</span><span class="__shiki_dzsirb"> -5</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$LOG_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $1, $4}&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_1itgoe">            while</span><span class="__shiki_mdbnqw"> read</span><span class="__shiki_mdbnqw"> time</span><span class="__shiki_mdbnqw"> mem</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">                echo</span><span class="__shiki_mdbnqw"> &quot;  </span><span class="__shiki_140thh">$time</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$mem</span><span class="__shiki_mdbnqw"> KB&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">            done</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 7. 配置建议</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[7] 配置优化建议:\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ $AVG_RSS </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 50000</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span><span class="__shiki_21nrsd">  # &gt; 50MB</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">RED</span><span class="__shiki_mdbnqw">}警告: 进程内存使用过高\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;建议: 考虑使用Worker/Event MPM, 或减少MaxRequestWorkers&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    elif</span><span class="__shiki_140thh"> [ $AVG_RSS </span><span class="__shiki_1itgoe">-lt</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span><span class="__shiki_21nrsd">  # &lt; 10MB</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}良好: 进程内存使用正常\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">YELLOW</span><span class="__shiki_mdbnqw">}正常: 进程内存使用在正常范围\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 保存到日志</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">) </span><span class="__shiki_140thh">$COUNT</span><span class="__shiki_140thh"> $TOTAL_RSS</span><span class="__shiki_140thh"> $AVG_RSS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$LOG_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 8. 详细的进程内存映射</span></span>
<span class="line"><span class="__shiki_1t8gfj">detailed_memory_map</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[8] 详细进程内存映射(前3个进程):\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    TOP_PIDS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">ps</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_140thh"> $APACHE_USER </span><span class="__shiki_dzsirb">-o</span><span class="__shiki_mdbnqw"> pid=</span><span class="__shiki_dzsirb"> --sort</span><span class="__shiki_dzsirb"> -rss</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -3</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> PID </span><span class="__shiki_1itgoe">in</span><span class="__shiki_140thh"> $TOP_PIDS; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;进程 </span><span class="__shiki_140thh">$PID</span><span class="__shiki_mdbnqw"> 内存映射:&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">-f</span><span class="__shiki_mdbnqw"> &quot;/proc/</span><span class="__shiki_140thh">$PID</span><span class="__shiki_mdbnqw">/smaps&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  RSS总和: $(</span><span class="__shiki_1t8gfj">awk</span><span class="__shiki_mdbnqw"> &#39;/Rss/ {sum+=$2} END {print sum}&#39; /proc/</span><span class="__shiki_140thh">$PID</span><span class="__shiki_mdbnqw">/smaps) KB&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  PSS总和: $(</span><span class="__shiki_1t8gfj">awk</span><span class="__shiki_mdbnqw"> &#39;/Pss/ {sum+=$2} END {print sum}&#39; /proc/</span><span class="__shiki_140thh">$PID</span><span class="__shiki_mdbnqw">/smaps) KB&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;  私有内存: $(</span><span class="__shiki_1t8gfj">awk</span><span class="__shiki_mdbnqw"> &#39;/Private/ {sum+=$2} END {print sum}&#39; /proc/</span><span class="__shiki_140thh">$PID</span><span class="__shiki_mdbnqw">/smaps) KB&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 9. 模块内存热点分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">module_hotspots</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[9] 内存分配热点(需要valgrind或类似工具):\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;安装分析工具:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;  sudo apt-get install valgrind massif-visualizer&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;分析命令示例:&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;  valgrind --tool=massif --massif-out-file=massif.out apache2 -X&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;  ms_print massif.out | head -100&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主监控循环</span></span>
<span class="line"><span class="__shiki_1t8gfj">continuous_monitoring</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}开始持续内存监控，间隔: \${</span><span class="__shiki_140thh">SAMPLE_INTERVAL</span><span class="__shiki_mdbnqw">}秒\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;按Ctrl+C停止&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1t8gfj">        clear</span></span>
<span class="line"><span class="__shiki_1t8gfj">        get_apache_memory</span></span>
<span class="line"><span class="__shiki_1t8gfj">        detailed_memory_map</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh"> $SAMPLE_INTERVAL</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据参数选择模式</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> in</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;continuous&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        continuous_monitoring</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;report&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        get_apache_memory</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /tmp/apache-memory-report.txt</span></span>
<span class="line"><span class="__shiki_1t8gfj">        detailed_memory_map</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> /tmp/apache-memory-report.txt</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;报告已保存到: /tmp/apache-memory-report.txt&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">    *)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        get_apache_memory</span></span>
<span class="line"><span class="__shiki_1t8gfj">        detailed_memory_map</span></span>
<span class="line"><span class="__shiki_1t8gfj">        module_hotspots</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">esac</span></span></code></pre></div><h2 id="_3-http层优化策略" tabindex="-1">3. HTTP层优化策略 <a class="header-anchor" href="#_3-http层优化策略" aria-label="Permalink to &quot;3. HTTP层优化策略&quot;">​</a></h2><h3 id="_3-1-连接管理优化" tabindex="-1">3.1 连接管理优化 <a class="header-anchor" href="#_3-1-连接管理优化" aria-label="Permalink to &quot;3.1 连接管理优化&quot;">​</a></h3><h4 id="_3-1-1-全局连接配置" tabindex="-1">3.1.1 全局连接配置 <a class="header-anchor" href="#_3-1-1-全局连接配置" aria-label="Permalink to &quot;3.1.1 全局连接配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/conf-available/http-optimization.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 连接超时配置 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 请求超时时间 (降低以减少资源占用)</span></span>
<span class="line"><span class="__shiki_1itgoe">Timeout</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用持久连接</span></span>
<span class="line"><span class="__shiki_1itgoe">KeepAlive</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 持久连接超时 (平衡性能与资源)</span></span>
<span class="line"><span class="__shiki_21nrsd"># 短: 减少内存占用，长: 减少TCP握手</span></span>
<span class="line"><span class="__shiki_1itgoe">KeepAliveTimeout</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 每个连接的最大请求数</span></span>
<span class="line"><span class="__shiki_1itgoe">MaxKeepAliveRequests</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 请求限制 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 限制请求行大小</span></span>
<span class="line"><span class="__shiki_1itgoe">LimitRequestLine</span><span class="__shiki_dzsirb"> 8190</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制请求头大小</span></span>
<span class="line"><span class="__shiki_1itgoe">LimitRequestFields</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制每个请求的头部字段大小</span></span>
<span class="line"><span class="__shiki_1itgoe">LimitRequestFieldSize</span><span class="__shiki_dzsirb"> 8190</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 限制请求体大小</span></span>
<span class="line"><span class="__shiki_1itgoe">LimitRequestBody</span><span class="__shiki_dzsirb"> 10485760</span><span class="__shiki_140thh">  # 10MB</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 缓冲区优化 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 请求头缓冲区大小</span></span>
<span class="line"><span class="__shiki_140thh">RequestHeaderBufferSize </span><span class="__shiki_dzsirb">8192</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 请求体缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">RequestReadTimeout</span><span class="__shiki_140thh"> header=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">-</span><span class="__shiki_dzsirb">40</span><span class="__shiki_140thh">,MinRate=</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh"> body=</span><span class="__shiki_dzsirb">20</span><span class="__shiki_140thh">,MinRate=</span><span class="__shiki_dzsirb">500</span></span></code></pre></div><h4 id="_3-1-2-基于位置的连接优化" tabindex="-1">3.1.2 基于位置的连接优化 <a class="header-anchor" href="#_3-1-2-基于位置的连接优化" aria-label="Permalink to &quot;3.1.2 基于位置的连接优化&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># 动态内容 (PHP, Python等)</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(php|py|pl|cgi)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 较短的超时，快速释放连接</span></span>
<span class="line"><span class="__shiki_1itgoe">    KeepAliveTimeout</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxKeepAliveRequests</span><span class="__shiki_dzsirb"> 50</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制请求体大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    LimitRequestBody</span><span class="__shiki_dzsirb"> 5242880</span><span class="__shiki_140thh">  # 5MB</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 静态内容 (CSS, JS, 图片)</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(css|js|jpg|jpeg|png|gif|ico|woff|woff2)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 较长超时，支持流水线</span></span>
<span class="line"><span class="__shiki_1itgoe">    KeepAliveTimeout</span><span class="__shiki_dzsirb"> 15</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxKeepAliveRequests</span><span class="__shiki_dzsirb"> 200</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用sendfile加速</span></span>
<span class="line"><span class="__shiki_1itgoe">    EnableSendfile</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用内存映射</span></span>
<span class="line"><span class="__shiki_1itgoe">    EnableMMAP</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># API端点</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /api/</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # API需要快速响应</span></span>
<span class="line"><span class="__shiki_1itgoe">    Timeout</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">    KeepAliveTimeout</span><span class="__shiki_dzsirb"> 3</span></span>
<span class="line"><span class="__shiki_1itgoe">    MaxKeepAliveRequests</span><span class="__shiki_dzsirb"> 1000</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    SetOutputFilter</span><span class="__shiki_140thh"> DEFLATE</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 限制请求频率 (需要mod_ratelimit)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SetEnvIf Request_URI &quot;^/api/&quot; rate_limit=1</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_3-2-内容压缩优化" tabindex="-1">3.2 内容压缩优化 <a class="header-anchor" href="#_3-2-内容压缩优化" aria-label="Permalink to &quot;3.2 内容压缩优化&quot;">​</a></h3><h4 id="_3-2-1-智能压缩配置" tabindex="-1">3.2.1 智能压缩配置 <a class="header-anchor" href="#_3-2-1-智能压缩配置" aria-label="Permalink to &quot;3.2.1 智能压缩配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/conf-available/deflate-optimized.conf</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_deflate.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 压缩引擎配置 ==========</span></span>
<span class="line"><span class="__shiki_1itgoe">    DeflateCompressionLevel</span><span class="__shiki_dzsirb"> 6</span><span class="__shiki_140thh">  # </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">-</span><span class="__shiki_dzsirb">9</span><span class="__shiki_140thh">, 6是性能与压缩比的平衡点</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 压缩缓冲区大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    DeflateBufferSize</span><span class="__shiki_dzsirb"> 8096</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 内存使用级别</span></span>
<span class="line"><span class="__shiki_1itgoe">    DeflateMemLevel</span><span class="__shiki_dzsirb"> 9</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 窗口大小</span></span>
<span class="line"><span class="__shiki_1itgoe">    DeflateWindowSize</span><span class="__shiki_dzsirb"> 15</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 智能压缩规则 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 1. 文本内容 - 高压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">text/html</span><span class="__shiki_1t8gfj"> text/plain</span><span class="__shiki_1t8gfj"> text/xml</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">text/css</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/x-javascript</span><span class="__shiki_1t8gfj"> application/javascript</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/json</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/xml</span><span class="__shiki_1t8gfj"> application/rss+xml</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/atom+xml</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 2. 字体文件 - 中度压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE font/ttf font/otf</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/font-woff</span><span class="__shiki_1t8gfj"> application/font-woff2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 3. SVG - 中度压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">image/svg+xml</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 排除规则 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 已压缩的内容不再压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    SetEnvIfNoCase</span><span class="__shiki_140thh"> Request_URI \\.(?:gif|jpe?g|png|webp)$ no-gzip dont-vary</span></span>
<span class="line"><span class="__shiki_1itgoe">    SetEnvIfNoCase</span><span class="__shiki_140thh"> Request_URI \\.(?:exe|t?gz|zip|bz2|sit|rar|pdf|avi|mov|mp4)$ no-gzip dont-vary</span></span>
<span class="line"><span class="__shiki_1itgoe">    SetEnvIfNoCase</span><span class="__shiki_140thh"> Request_URI \\.(?:ogg|mp3|wav|flac)$ no-gzip dont-vary</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 旧浏览器排除</span></span>
<span class="line"><span class="__shiki_1itgoe">    BrowserMatch</span><span class="__shiki_140thh"> ^Mozilla/</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh"> gzip-only-</span><span class="__shiki_1t8gfj">text/html</span></span>
<span class="line"><span class="__shiki_1itgoe">    BrowserMatch</span><span class="__shiki_140thh"> ^Mozilla/</span><span class="__shiki_dzsirb">4</span><span class="__shiki_140thh">\\.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">[</span><span class="__shiki_dzsirb">678</span><span class="__shiki_140thh">] no-gzip</span></span>
<span class="line"><span class="__shiki_1itgoe">    BrowserMatch</span><span class="__shiki_140thh"> \\bMSIE !no-gzip !gzip-only-</span><span class="__shiki_1t8gfj">text/html</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 性能监控 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 记录压缩统计</span></span>
<span class="line"><span class="__shiki_1itgoe">    DeflateFilterNote</span><span class="__shiki_140thh"> Input instream</span></span>
<span class="line"><span class="__shiki_1itgoe">    DeflateFilterNote</span><span class="__shiki_140thh"> Output outstream</span></span>
<span class="line"><span class="__shiki_1itgoe">    DeflateFilterNote</span><span class="__shiki_140thh"> Ratio ratio</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    LogFormat</span><span class="__shiki_140thh"> &#39;&quot;%r&quot; %{</span><span class="__shiki_1jdh33">outstream</span><span class="__shiki_140thh">}n/%{</span><span class="__shiki_1jdh33">instream</span><span class="__shiki_140thh">}n (%{</span><span class="__shiki_1jdh33">ratio</span><span class="__shiki_140thh">}n%%)&#39; deflate</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> /var/log/apache2/deflate.log deflate</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== Brotli压缩 (Apache 2.4.26+) ==========</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_brotli.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    BrotliCompressionQuality </span><span class="__shiki_dzsirb">6</span></span>
<span class="line"><span class="__shiki_140thh">    BrotliWindowSize </span><span class="__shiki_dzsirb">22</span></span>
<span class="line"><span class="__shiki_140thh">    BrotliMaxInputBlock </span><span class="__shiki_dzsirb">16</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> BROTLI_COMPRESS </span><span class="__shiki_1t8gfj">text/html</span><span class="__shiki_1t8gfj"> text/plain</span><span class="__shiki_1t8gfj"> text/xml</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> BROTLI_COMPRESS </span><span class="__shiki_1t8gfj">text/css</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> BROTLI_COMPRESS </span><span class="__shiki_1t8gfj">application/javascript</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> BROTLI_COMPRESS </span><span class="__shiki_1t8gfj">application/json</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_4-缓存策略优化" tabindex="-1">4. 缓存策略优化 <a class="header-anchor" href="#_4-缓存策略优化" aria-label="Permalink to &quot;4. 缓存策略优化&quot;">​</a></h2><h3 id="_4-1-客户端缓存优化" tabindex="-1">4.1 客户端缓存优化 <a class="header-anchor" href="#_4-1-客户端缓存优化" aria-label="Permalink to &quot;4.1 客户端缓存优化&quot;">​</a></h3><h4 id="_4-1-1-智能缓存头配置" tabindex="-1">4.1.1 智能缓存头配置 <a class="header-anchor" href="#_4-1-1-智能缓存头配置" aria-label="Permalink to &quot;4.1.1 智能缓存头配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/conf-available/cache-headers.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== Expires头策略 ==========</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_expires.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresActive</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 默认策略: 1天</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresDefault</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> day&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 静态资源长期缓存 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 图片: 1年</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/jpg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/jpeg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/png</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/gif</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/webp</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/avif</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/svg+xml</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> image/x-icon</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 字体: 1年</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_140thh"> font/ttf &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_140thh"> font/otf &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_140thh"> font/woff &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_140thh"> font/woff2 &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/font-woff</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> year&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CSS和JS: 1周 (使用版本控制)</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> text/css</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> week&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/javascript</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> week&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/x-javascript</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> week&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 动态内容短期缓存 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # HTML: 1小时</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> text/html</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> hour&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # XML/JSON: 5分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/xml</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> minutes&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/json</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> minutes&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/rss+xml</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> minutes&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> application/atom+xml</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> minutes&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 多媒体内容 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 视频/音频: 1月</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> video/mp4</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> video/webm</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> audio/mpeg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ExpiresByType</span><span class="__shiki_1t8gfj"> audio/ogg</span><span class="__shiki_140thh"> &quot;access plus </span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> month&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== Cache-Control头策略 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 静态资源</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(jpg|jpeg|png|gif|ico|css|js|woff|woff2|ttf|otf|svg)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;public, max-age=</span><span class="__shiki_dzsirb">31536000</span><span class="__shiki_140thh">, immutable&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 版本控制的资源 (带hash)</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(css|js)\\.(v[0-9]+|[a-f0-9]{8,})\\.(min\\.)?(css|js)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;public, max-age=</span><span class="__shiki_dzsirb">31536000</span><span class="__shiki_140thh">, immutable&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># HTML页面</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(html|htm)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;public, max-age=</span><span class="__shiki_dzsirb">3600</span><span class="__shiki_140thh">, must-revalidate&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># API响应</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_mdbnqw"> &quot;^/api/&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;no-cache, no-store, must-revalidate&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Pragma &quot;no-cache&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Expires &quot;</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== ETag优化 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 禁用ETag以减少带宽 (在负载均衡环境中推荐)</span></span>
<span class="line"><span class="__shiki_1itgoe">FileETag</span><span class="__shiki_140thh"> None</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 或使用弱ETag</span></span>
<span class="line"><span class="__shiki_21nrsd"># FileETag MTime Size</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 最后修改时间 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 启用最后修改时间头</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_headers.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> unset</span><span class="__shiki_140thh"> Last-Modified</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 或者根据内容类型设置</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(html|css|js)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Last-Modified &quot;&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_4-2-服务器端缓存优化" tabindex="-1">4.2 服务器端缓存优化 <a class="header-anchor" href="#_4-2-服务器端缓存优化" aria-label="Permalink to &quot;4.2 服务器端缓存优化&quot;">​</a></h3><h4 id="_4-2-1-mod-cache深度配置" tabindex="-1">4.2.1 mod_cache深度配置 <a class="header-anchor" href="#_4-2-1-mod-cache深度配置" aria-label="Permalink to &quot;4.2.1 mod_cache深度配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/mods-available/cache-optimized.conf</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_cache.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 缓存引擎配置 ==========</span></span>
<span class="line"><span class="__shiki_140thh">    CacheQuickHandler </span><span class="__shiki_1t8gfj">off</span></span>
<span class="line"><span class="__shiki_140thh">    CacheLock </span><span class="__shiki_1t8gfj">on</span></span>
<span class="line"><span class="__shiki_140thh">    CacheLockMaxAge </span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">    CacheLockPath /tmp/apache_cache_lock</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 磁盘缓存配置 ==========</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_cache_disk.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheRoot</span><span class="__shiki_140thh"> /var/cache/apache2/mod_cache_disk</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheEnable</span><span class="__shiki_140thh"> disk /</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheDirLevels</span><span class="__shiki_dzsirb"> 2</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheDirLength</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheMaxFileSize</span><span class="__shiki_dzsirb"> 10000000</span><span class="__shiki_140thh">  # 10MB</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheMinFileSize</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheIgnoreNoLastMod</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 忽略的URL模式</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheDisable</span><span class="__shiki_140thh"> /api/</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheDisable</span><span class="__shiki_140thh"> /admin/</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheDisable</span><span class="__shiki_140thh"> /login</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存头控制</span></span>
<span class="line"><span class="__shiki_140thh">        CacheHeader </span><span class="__shiki_1t8gfj">on</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存详细日志</span></span>
<span class="line"><span class="__shiki_140thh">        CacheDetailHeader </span><span class="__shiki_1t8gfj">on</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存忽略的头部</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheIgnoreHeaders</span><span class="__shiki_1t8gfj"> Set</span><span class="__shiki_140thh">-Cookie Authorization</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存控制: 根据状态码</span></span>
<span class="line"><span class="__shiki_140thh">        CacheStoreNoStore </span><span class="__shiki_1t8gfj">on</span></span>
<span class="line"><span class="__shiki_140thh">        CacheStorePrivate </span><span class="__shiki_1t8gfj">on</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 缓存过期设置</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheDefaultExpire</span><span class="__shiki_dzsirb"> 3600</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheMaxExpire</span><span class="__shiki_dzsirb"> 86400</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheLastModifiedFactor</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 强制刷新间隔</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheForceCompletion</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 内存缓存配置 ==========</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_cache_mem.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheEnable</span><span class="__shiki_140thh"> mem /</span></span>
<span class="line"><span class="__shiki_1itgoe">        MCacheSize</span><span class="__shiki_dzsirb"> 512000</span><span class="__shiki_140thh">  # 500MB</span></span>
<span class="line"><span class="__shiki_1itgoe">        MCacheMaxObjectCount</span><span class="__shiki_dzsirb"> 10000</span></span>
<span class="line"><span class="__shiki_1itgoe">        MCacheMinObjectSize</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">        MCacheMaxObjectSize</span><span class="__shiki_dzsirb"> 512000</span><span class="__shiki_140thh">  # 500KB</span></span>
<span class="line"><span class="__shiki_1itgoe">        MCacheRemovalAlgorithm</span><span class="__shiki_140thh"> GDSF  # GreedyDual-Size Frequency</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 缓存统计 ==========</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /cache-stat</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        SetHandler</span><span class="__shiki_140thh"> cache-status</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">127</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> ip ::</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">        Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">16</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 智能缓存规则 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 基于内容类型和URL模式的缓存规则</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(html|htm)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # HTML页面: 缓存5分钟</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheEnable</span><span class="__shiki_140thh"> disk</span></span>
<span class="line"><span class="__shiki_140thh">    CacheHeader </span><span class="__shiki_1t8gfj">on</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheDefaultExpire</span><span class="__shiki_dzsirb"> 300</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheIgnoreCacheControl</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_140thh">    CacheStoreNoStore </span><span class="__shiki_1t8gfj">off</span></span>
<span class="line"><span class="__shiki_140thh">    CacheStorePrivate </span><span class="__shiki_1t8gfj">off</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(css|js)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # CSS/JS: 缓存1周</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheEnable</span><span class="__shiki_140thh"> disk</span></span>
<span class="line"><span class="__shiki_140thh">    CacheHeader </span><span class="__shiki_1t8gfj">on</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheDefaultExpire</span><span class="__shiki_dzsirb"> 604800</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheIgnoreCacheControl</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(jpg|jpeg|png|gif|ico|webp)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 图片: 缓存1个月</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheEnable</span><span class="__shiki_140thh"> disk</span></span>
<span class="line"><span class="__shiki_140thh">    CacheHeader </span><span class="__shiki_1t8gfj">on</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheDefaultExpire</span><span class="__shiki_dzsirb"> 2592000</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheIgnoreCacheControl</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 缓存预热脚本集成 ==========</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_rewrite.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存预热触发</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteCond</span><span class="__shiki_21q97f"> %{HTTP_USER_AGENT}</span><span class="__shiki_mdbnqw"> ^CacheWarmer</span></span>
<span class="line"><span class="__shiki_1itgoe">    RewriteRule</span><span class="__shiki_21q97f"> .*</span><span class="__shiki_mdbnqw"> -</span><span class="__shiki_140thh"> [E=CacheWarmer:</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">]</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓存预热内容</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_mdbnqw"> &quot;%{ENV:CacheWarmer} == &#39;1&#39;&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        CacheIgnoreCacheControl</span><span class="__shiki_1t8gfj"> on</span></span>
<span class="line"><span class="__shiki_140thh">        CacheStoreNoStore </span><span class="__shiki_1t8gfj">off</span></span>
<span class="line"><span class="__shiki_140thh">        CacheStorePrivate </span><span class="__shiki_1t8gfj">off</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">If</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_5-操作系统级优化" tabindex="-1">5. 操作系统级优化 <a class="header-anchor" href="#_5-操作系统级优化" aria-label="Permalink to &quot;5. 操作系统级优化&quot;">​</a></h2><h3 id="_5-1-linux内核参数优化" tabindex="-1">5.1 Linux内核参数优化 <a class="header-anchor" href="#_5-1-linux内核参数优化" aria-label="Permalink to &quot;5.1 Linux内核参数优化&quot;">​</a></h3><h4 id="_5-1-1-tcp-ip栈优化" tabindex="-1">5.1.1 TCP/IP栈优化 <a class="header-anchor" href="#_5-1-1-tcp-ip栈优化" aria-label="Permalink to &quot;5.1.1 TCP/IP栈优化&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># apache-tcp-optimization.sh</span></span>
<span class="line"><span class="__shiki_21nrsd"># Linux TCP/IP栈优化配置</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">SYSCTL_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/etc/sysctl.d/99-apache-optimization.conf&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1t8gfj">cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SYSCTL_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> &#39;EOF&#39;</span></span>
<span class="line"><span class="__shiki_mdbnqw"># ======================================================</span></span>
<span class="line"><span class="__shiki_mdbnqw"># Apache性能优化 - TCP/IP栈配置</span></span>
<span class="line"><span class="__shiki_mdbnqw"># ======================================================</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"><span class="__shiki_mdbnqw"># 网络连接优化</span></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 增大本地端口范围</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.ip_local_port_range = 1024 65535</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 增加最大监听队列</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.somaxconn = 65535</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.netdev_max_backlog = 5000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># TCP缓冲区优化</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.rmem_default = 262144</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.wmem_default = 262144</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.rmem_max = 16777216</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.wmem_max = 16777216</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># TCP内存自动调整</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_rmem = 4096 87380 16777216</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_wmem = 4096 65536 16777216</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># TCP内存分配</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_mem = 8388608 12582912 16777216</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"><span class="__shiki_mdbnqw"># TCP连接管理优化</span></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启用TCP快速回收</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_tw_recycle = 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_tw_reuse = 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 减少TIME_WAIT状态时间</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_fin_timeout = 30</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 增大最大半连接队列</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_max_syn_backlog = 65536</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启用SYN cookies (防SYN flood)</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_syncookies = 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># SYN+ACK重试次数</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_synack_retries = 2</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_syn_retries = 3</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启用TCP时间戳</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_timestamps = 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># TCP窗口缩放</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_window_scaling = 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># TCP SACK (选择性确认)</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_sack = 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_dsack = 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># TCP FACK (前向确认)</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.ipv4.tcp_fack = 1</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"><span class="__shiki_mdbnqw"># 文件描述符和inode优化</span></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 增加系统文件描述符限制</span></span>
<span class="line"><span class="__shiki_mdbnqw">fs.file-max = 2097152</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 增加进程文件描述符限制</span></span>
<span class="line"><span class="__shiki_mdbnqw">fs.nr_open = 2097152</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 增加inode缓存</span></span>
<span class="line"><span class="__shiki_mdbnqw">fs.inotify.max_user_watches = 524288</span></span>
<span class="line"><span class="__shiki_mdbnqw">fs.inotify.max_user_instances = 1024</span></span>
<span class="line"><span class="__shiki_mdbnqw">fs.inotify.max_queued_events = 16384</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"><span class="__shiki_mdbnqw"># 内存管理优化</span></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 减少交换倾向</span></span>
<span class="line"><span class="__shiki_mdbnqw">vm.swappiness = 10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启用透明大页 (根据CPU架构调整)</span></span>
<span class="line"><span class="__shiki_mdbnqw"># vm.nr_hugepages = 1024</span></span>
<span class="line"><span class="__shiki_mdbnqw"># vm.hugetlb_shm_group = 33</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 内存过量使用策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">vm.overcommit_memory = 1</span></span>
<span class="line"><span class="__shiki_mdbnqw">vm.overcommit_ratio = 50</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 脏页写回策略</span></span>
<span class="line"><span class="__shiki_mdbnqw">vm.dirty_background_ratio = 5</span></span>
<span class="line"><span class="__shiki_mdbnqw">vm.dirty_ratio = 10</span></span>
<span class="line"><span class="__shiki_mdbnqw">vm.dirty_writeback_centisecs = 500</span></span>
<span class="line"><span class="__shiki_mdbnqw">vm.dirty_expire_centisecs = 3000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"><span class="__shiki_mdbnqw"># 网络接口优化</span></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启用网络接口RSS (Receive Side Scaling)</span></span>
<span class="line"><span class="__shiki_mdbnqw"># 需要多队列网卡支持</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.netdev_budget = 600</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.netdev_budget_usecs = 6000</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启用RPS (Receive Packet Steering)</span></span>
<span class="line"><span class="__shiki_mdbnqw"># 根据CPU核心数设置</span></span>
<span class="line"><span class="__shiki_mdbnqw"># echo &quot;ffff&quot; &gt; /sys/class/net/eth0/queues/rx-0/rps_cpus</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 启用RFS (Receive Flow Steering)</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.core.rps_sock_flow_entries = 32768</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"><span class="__shiki_mdbnqw"># 连接追踪优化 (如果使用防火墙)</span></span>
<span class="line"><span class="__shiki_mdbnqw"># ------------------------------------------------------</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw"># 增加连接追踪表大小</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.nf_conntrack_max = 262144</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.netfilter.nf_conntrack_max = 262144</span></span>
<span class="line"><span class="__shiki_mdbnqw">net.netfilter.nf_conntrack_tcp_timeout_established = 86400</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 应用配置</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;应用TCP/IP优化配置...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SYSCTL_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证关键配置</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;验证优化配置:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">sysctl</span><span class="__shiki_dzsirb"> -a</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &#39;^(net.core.somaxconn|net.ipv4.tcp_tw_reuse|fs.file-max)&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 设置永久生效</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;配置已保存到: </span><span class="__shiki_140thh">$SYSCTL_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;重启后自动生效&quot;</span></span></code></pre></div><h3 id="_5-2-文件系统优化" tabindex="-1">5.2 文件系统优化 <a class="header-anchor" href="#_5-2-文件系统优化" aria-label="Permalink to &quot;5.2 文件系统优化&quot;">​</a></h3><h4 id="_5-2-1-文件系统挂载参数优化" tabindex="-1">5.2.1 文件系统挂载参数优化 <a class="header-anchor" href="#_5-2-1-文件系统挂载参数优化" aria-label="Permalink to &quot;5.2.1 文件系统挂载参数优化&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># filesystem-optimization.sh</span></span>
<span class="line"><span class="__shiki_21nrsd"># 文件系统挂载参数优化</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检测Web根目录所在文件系统</span></span>
<span class="line"><span class="__shiki_140thh">WEB_ROOT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/www/html&quot;</span></span>
<span class="line"><span class="__shiki_140thh">FS_DEVICE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">df</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$WEB_ROOT</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;NR==2 {print $1}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">FS_TYPE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">df</span><span class="__shiki_dzsirb"> -T</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$WEB_ROOT</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;NR==2 {print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;检测到Web根目录: </span><span class="__shiki_140thh">$WEB_ROOT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;文件系统: </span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw"> (</span><span class="__shiki_140thh">$FS_TYPE</span><span class="__shiki_mdbnqw">)&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 备份fstab</span></span>
<span class="line"><span class="__shiki_1t8gfj">cp</span><span class="__shiki_mdbnqw"> /etc/fstab</span><span class="__shiki_mdbnqw"> /etc/fstab.backup.</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d</span><span class="__shiki_140thh">)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 根据文件系统类型优化</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_TYPE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> in</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;ext4&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_140thh">        OPTIONS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;noatime,nodiratime,data=writeback,barrier=0,nobh,errors=remount-ro&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;xfs&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_140thh">        OPTIONS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;noatime,nodiratime,attr2,inode64,noquota&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;btrfs&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_140thh">        OPTIONS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;noatime,compress=zstd,space_cache=v2,autodefrag&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">    *)</span></span>
<span class="line"><span class="__shiki_140thh">        OPTIONS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;noatime,nodiratime&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">esac</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;推荐的挂载选项: </span><span class="__shiki_140thh">$OPTIONS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 更新fstab</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> /etc/fstab</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;更新fstab中 </span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw"> 的挂载选项...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sed</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;s|^</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw">.*|</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_140thh"> $WEB_ROOT</span><span class="__shiki_140thh"> $FS_TYPE</span><span class="__shiki_140thh"> $OPTIONS</span><span class="__shiki_mdbnqw"> 0 0|&quot;</span><span class="__shiki_mdbnqw"> /etc/fstab</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;在fstab中添加新条目...&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_140thh"> $WEB_ROOT</span><span class="__shiki_140thh"> $FS_TYPE</span><span class="__shiki_140thh"> $OPTIONS</span><span class="__shiki_mdbnqw"> 0 0&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> /etc/fstab</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 临时重新挂载（测试）</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;测试重新挂载...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">mount</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> remount</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$WEB_ROOT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 验证挂载选项</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;当前挂载选项:&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">mount</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 文件系统特定优化</span></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_TYPE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> in</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;ext4&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 调整日志提交间隔</span></span>
<span class="line"><span class="__shiki_1t8gfj">        tune2fs</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> journal_data_writeback</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        tune2fs</span><span class="__shiki_dzsirb"> -O</span><span class="__shiki_mdbnqw"> &quot;^has_journal&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> true</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &quot;xfs&quot;</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_21nrsd">        # 增加inode缓存</span></span>
<span class="line"><span class="__shiki_1t8gfj">        xfs_admin</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;logbufs=8&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">esac</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># I/O调度器优化</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;优化I/O调度器...&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd"># 检测存储类型</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [[ $(</span><span class="__shiki_1t8gfj">cat</span><span class="__shiki_mdbnqw"> /sys/block/</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">basename</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span><span class="__shiki_mdbnqw">/queue/rotational</span><span class="__shiki_140thh">) </span><span class="__shiki_1itgoe">-eq</span><span class="__shiki_dzsirb"> 0</span><span class="__shiki_140thh"> ]]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSD</span></span>
<span class="line"><span class="__shiki_140thh">    SCHEDULER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;noop&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用TRIM</span></span>
<span class="line"><span class="__shiki_1t8gfj">    fstrim</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$WEB_ROOT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_21nrsd">    # HDD</span></span>
<span class="line"><span class="__shiki_140thh">    SCHEDULER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;deadline&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;设置I/O调度器为: </span><span class="__shiki_140thh">$SCHEDULER</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCHEDULER</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /sys/block/</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">basename</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$FS_DEVICE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span><span class="__shiki_mdbnqw">/queue/scheduler</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;文件系统优化完成!&quot;</span></span></code></pre></div><h2 id="_6-应用级优化" tabindex="-1">6. 应用级优化 <a class="header-anchor" href="#_6-应用级优化" aria-label="Permalink to &quot;6. 应用级优化&quot;">​</a></h2><h3 id="_6-1-php-fpm与apache集成优化" tabindex="-1">6.1 PHP-FPM与Apache集成优化 <a class="header-anchor" href="#_6-1-php-fpm与apache集成优化" aria-label="Permalink to &quot;6.1 PHP-FPM与Apache集成优化&quot;">​</a></h3><h4 id="_6-1-1-php-fpm进程管理优化" tabindex="-1">6.1.1 PHP-FPM进程管理优化 <a class="header-anchor" href="#_6-1-1-php-fpm进程管理优化" aria-label="Permalink to &quot;6.1.1 PHP-FPM进程管理优化&quot;">​</a></h4><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">; /etc/php/8.1/fpm/pool.d/www.conf</span></span>
<span class="line"><span class="__shiki_1t8gfj">[www]</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; ========== 进程管理策略 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">; 动态进程管理</span></span>
<span class="line"><span class="__shiki_1itgoe">pm</span><span class="__shiki_140thh"> = dynamic</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 最大子进程数 (基于内存计算)</span></span>
<span class="line"><span class="__shiki_21nrsd">; 公式: pm.max_children ≈ (可用内存 - 系统内存) / 单个进程内存</span></span>
<span class="line"><span class="__shiki_1itgoe">pm.max_children</span><span class="__shiki_140thh"> = 50</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 启动时的进程数</span></span>
<span class="line"><span class="__shiki_1itgoe">pm.start_servers</span><span class="__shiki_140thh"> = 5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 最小空闲进程数</span></span>
<span class="line"><span class="__shiki_1itgoe">pm.min_spare_servers</span><span class="__shiki_140thh"> = 5</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 最大空闲进程数</span></span>
<span class="line"><span class="__shiki_1itgoe">pm.max_spare_servers</span><span class="__shiki_140thh"> = 10</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; ========== 进程生命周期 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">; 每个进程处理的最大请求数 (防止内存泄漏)</span></span>
<span class="line"><span class="__shiki_1itgoe">pm.max_requests</span><span class="__shiki_140thh"> = 500</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 进程终止后的延迟 (秒)</span></span>
<span class="line"><span class="__shiki_1itgoe">process_control_timeout</span><span class="__shiki_140thh"> = 10s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; ========== 性能优化 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">; 启用慢日志</span></span>
<span class="line"><span class="__shiki_1itgoe">slowlog</span><span class="__shiki_140thh"> = /var/log/php-fpm/slow.log</span></span>
<span class="line"><span class="__shiki_1itgoe">request_slowlog_timeout</span><span class="__shiki_140thh"> = 5s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 请求终止时间</span></span>
<span class="line"><span class="__shiki_1itgoe">request_terminate_timeout</span><span class="__shiki_140thh"> = 30s</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 内存限制</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[memory_limit] = 256M</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 上传限制</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[upload_max_filesize] = 20M</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[post_max_size] = 25M</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; 执行时间限制</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[max_execution_time] = 30</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; ========== 状态页面 ==========</span></span>
<span class="line"><span class="__shiki_1itgoe">pm.status_path</span><span class="__shiki_140thh"> = /php-status</span></span>
<span class="line"><span class="__shiki_1itgoe">ping.path</span><span class="__shiki_140thh"> = /php-ping</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd">; ========== 环境优化 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">; 启用OPcache</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[opcache.enable] = 1</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[opcache.memory_consumption] = 256</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[opcache.interned_strings_buffer] = 16</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[opcache.max_accelerated_files] = 10000</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[opcache.revalidate_freq] = 2</span></span>
<span class="line"><span class="__shiki_140thh">php_admin_value[opcache.fast_shutdown] = 1</span></span></code></pre></div><h4 id="_6-1-2-apache-mod-proxy-fcgi优化" tabindex="-1">6.1.2 Apache mod_proxy_fcgi优化 <a class="header-anchor" href="#_6-1-2-apache-mod-proxy-fcgi优化" aria-label="Permalink to &quot;6.1.2 Apache mod_proxy_fcgi优化&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/conf-available/php-fpm-optimized.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== PHP-FPM代理配置 ==========</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_proxy_fcgi.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 定义PHP文件处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddHandler</span><span class="__shiki_140thh"> &quot;proxy:unix:/run/php/php8.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">-fpm.sock|fcgi://localhost&quot; .php</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接池设置</span></span>
<span class="line"><span class="__shiki_140thh">    ProxyFCGIBackendType FPM</span></span>
<span class="line"><span class="__shiki_140thh">    ProxyFCGISetEnvIf &quot;true&quot; SCRIPT_FILENAME $document_root$fastcgi_script_name</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接超时</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyTimeout</span><span class="__shiki_dzsirb"> 60</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用连接保持</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassMatch</span><span class="__shiki_140thh"> &quot;^/(.*\\.php(/.*)?)$&quot; &quot;unix:/run/php/php8.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">-fpm.sock|fcgi://localhost/var/www/html/$</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接池参数</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_mdbnqw"> &quot;fcgi://localhost&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        ProxySet connectiontimeout=</span><span class="__shiki_dzsirb">5</span><span class="__shiki_140thh"> timeout=</span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 错误处理</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyErrorOverride</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用统计</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /php-status</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        SetHandler</span><span class="__shiki_140thh"> &quot;proxy:unix:/run/php/php8.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">-fpm.sock|fcgi://localhost&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ProxyPassReverse</span><span class="__shiki_140thh"> &quot;unix:/run/php/php8.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">-fpm.sock|fcgi://localhost&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== PHP特定优化 ==========</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.php$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用输出缓冲</span></span>
<span class="line"><span class="__shiki_1itgoe">    php_value</span><span class="__shiki_1t8gfj"> output_buffering</span><span class="__shiki_mdbnqw"> 4096</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用实时压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    php_flag</span><span class="__shiki_1t8gfj"> zlib.output_compression</span><span class="__shiki_mdbnqw"> on</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用危险函数</span></span>
<span class="line"><span class="__shiki_1itgoe">    php_admin_flag</span><span class="__shiki_1t8gfj"> allow_url_fopen</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_1itgoe">    php_admin_flag</span><span class="__shiki_1t8gfj"> allow_url_include</span><span class="__shiki_mdbnqw"> off</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 设置时区</span></span>
<span class="line"><span class="__shiki_1itgoe">    php_value</span><span class="__shiki_1t8gfj"> date.timezone</span><span class="__shiki_mdbnqw"> &quot;Asia/Shanghai&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 性能监控 ==========</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /php-status</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    SetHandler</span><span class="__shiki_140thh"> proxy:fcgi://</span><span class="__shiki_dzsirb">127</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh">:</span><span class="__shiki_dzsirb">9000</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">127</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> ip ::</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_1itgoe">    Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">16</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h3 id="_6-2-静态文件服务优化" tabindex="-1">6.2 静态文件服务优化 <a class="header-anchor" href="#_6-2-静态文件服务优化" aria-label="Permalink to &quot;6.2 静态文件服务优化&quot;">​</a></h3><h4 id="_6-2-1-sendfile和内存映射优化" tabindex="-1">6.2.1 Sendfile和内存映射优化 <a class="header-anchor" href="#_6-2-1-sendfile和内存映射优化" aria-label="Permalink to &quot;6.2.1 Sendfile和内存映射优化&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/conf-available/static-optimization.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 静态文件处理配置 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 启用sendfile (内核直接发送文件)</span></span>
<span class="line"><span class="__shiki_1itgoe">EnableSendfile</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启用内存映射 (减少内存拷贝)</span></span>
<span class="line"><span class="__shiki_1itgoe">EnableMMAP</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 排除网络文件系统 (NFS上需要关闭)</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_headers.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(pdf|avi|mov|mp3|mp4)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        EnableSendfile</span><span class="__shiki_1t8gfj"> Off</span></span>
<span class="line"><span class="__shiki_1itgoe">        EnableMMAP</span><span class="__shiki_1t8gfj"> Off</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 文件类型特定优化 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 图片文件</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(jpg|jpeg|png|gif|webp|avif)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预读取优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    FileETag</span><span class="__shiki_140thh"> MTime Size</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用浏览器缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;public, max-age=</span><span class="__shiki_dzsirb">31536000</span><span class="__shiki_140thh">, immutable&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用压缩 (如果适用)</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_deflate.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">image/svg+xml</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CSS和JavaScript</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(css|js)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用Gzip压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">text/css</span><span class="__shiki_1t8gfj"> application/javascript</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用浏览器缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;public, max-age=</span><span class="__shiki_dzsirb">604800</span><span class="__shiki_140thh">, immutable&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用预加载</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_headers.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Header</span><span class="__shiki_140thh"> add Link &quot;&lt;/style.css&gt;; rel=preload; as=style&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Header</span><span class="__shiki_140thh"> add Link &quot;&lt;/app.js&gt;; rel=preload; as=script&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 字体文件</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(woff|woff2|ttf|otf|eot)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 跨域访问支持</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_headers.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Access-Control-</span><span class="__shiki_1itgoe">Allow</span><span class="__shiki_140thh">-Origin &quot;*&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用压缩</span></span>
<span class="line"><span class="__shiki_1itgoe">    AddOutputFilterByType</span><span class="__shiki_140thh"> DEFLATE </span><span class="__shiki_1t8gfj">application/font-woff</span><span class="__shiki_1t8gfj"> application/font-woff2</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 长期缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Cache-Control &quot;public, max-age=</span><span class="__shiki_dzsirb">31536000</span><span class="__shiki_140thh">, immutable&quot;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 目录优化 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 静态资源目录</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_mdbnqw"> &quot;/var/www/html/static&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    Options</span><span class="__shiki_140thh"> -Indexes +FollowSymLinks -MultiViews</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用.htaccess查找</span></span>
<span class="line"><span class="__shiki_1itgoe">    AllowOverride</span><span class="__shiki_140thh"> None</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用内容协商</span></span>
<span class="line"><span class="__shiki_1itgoe">    MultiviewsMatch</span><span class="__shiki_140thh"> Any</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 文件默认类型</span></span>
<span class="line"><span class="__shiki_1itgoe">    DefaultType</span><span class="__shiki_1t8gfj"> application/octet-stream</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 强制下载特定文件类型</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(zip|tar|gz|bz2)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">        ForceType</span><span class="__shiki_1t8gfj"> application/octet-stream</span></span>
<span class="line"><span class="__shiki_1itgoe">        Header</span><span class="__shiki_1t8gfj"> set</span><span class="__shiki_140thh"> Content-Disposition attachment</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">FilesMatch</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">Directory</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 性能监控 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># 静态文件服务统计</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_log_config.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    LogFormat</span><span class="__shiki_140thh"> &quot;%h %l %u %t \\&quot;%r\\&quot; %&gt;s %b %D %{</span><span class="__shiki_1jdh33">Content-Type</span><span class="__shiki_140thh">}o&quot; static_perf</span></span>
<span class="line"><span class="__shiki_1itgoe">    CustomLog</span><span class="__shiki_140thh"> /var/log/apache2/static-performance.log static_perf env=static_file</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 标记静态文件请求</span></span>
<span class="line"><span class="__shiki_1itgoe">    SetEnvIf</span><span class="__shiki_140thh"> Request_URI &quot;\\.(css|js|jpg|jpeg|png|gif|ico|woff|woff2|ttf|otf)$&quot; static_file</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_7-监控与调优工具" tabindex="-1">7. 监控与调优工具 <a class="header-anchor" href="#_7-监控与调优工具" aria-label="Permalink to &quot;7. 监控与调优工具&quot;">​</a></h2><h3 id="_7-1-性能监控系统" tabindex="-1">7.1 性能监控系统 <a class="header-anchor" href="#_7-1-性能监控系统" aria-label="Permalink to &quot;7.1 性能监控系统&quot;">​</a></h3><h4 id="_7-1-1-综合监控脚本" tabindex="-1">7.1.1 综合监控脚本 <a class="header-anchor" href="#_7-1-1-综合监控脚本" aria-label="Permalink to &quot;7.1.1 综合监控脚本&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># apache-performance-monitor.sh</span></span>
<span class="line"><span class="__shiki_21nrsd"># Apache性能综合监控</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">INTERVAL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">5</span><span class="__shiki_21nrsd">  # 监控间隔(秒)</span></span>
<span class="line"><span class="__shiki_140thh">LOG_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/apache-monitor&quot;</span></span>
<span class="line"><span class="__shiki_140thh">REPORT_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$LOG_DIR</span><span class="__shiki_mdbnqw">/performance-report-$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d).csv&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建日志目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$LOG_DIR</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># CSV文件头</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_1itgoe">!</span><span class="__shiki_1itgoe"> -f</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;Timestamp,RequestsPerSec,BytesPerSec,CPULoad,MemoryMB,ActiveWorkers,IdleWorkers,OpenSlots,RequestQueue,KeepAlive&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 颜色定义</span></span>
<span class="line"><span class="__shiki_140thh">RED</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;31m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">GREEN</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;32m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">YELLOW</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[1;33m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">BLUE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;34m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">PURPLE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;35m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">CYAN</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0;36m&#39;</span></span>
<span class="line"><span class="__shiki_140thh">NC</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;\\033[0m&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 函数：获取Apache状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">get_apache_status</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 尝试从mod_status获取数据</span></span>
<span class="line"><span class="__shiki_140thh">    STATUS_URL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;http://localhost/server-status?auto&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_dzsirb"> command</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> curl</span><span class="__shiki_140thh"> &amp;</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> /dev/null; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">        STATUS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">curl</span><span class="__shiki_dzsirb"> -s</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$STATUS_URL</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    elif</span><span class="__shiki_dzsirb"> command</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> wget</span><span class="__shiki_140thh"> &amp;</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> /dev/null; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">        STATUS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">wget</span><span class="__shiki_dzsirb"> -qO-</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$STATUS_URL</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;需要curl或wget&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        exit</span><span class="__shiki_dzsirb"> 1</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 解析关键指标</span></span>
<span class="line"><span class="__shiki_140thh">    REQUESTS_PER_SEC</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$STATUS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> &quot;ReqPerSec&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    BYTES_PER_SEC</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$STATUS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> &quot;BytesPerSec&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    BUSY_WORKERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$STATUS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> &quot;BusyWorkers&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    IDLE_WORKERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$STATUS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> &quot;IdleWorkers&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    SCOREBOARD</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$STATUS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> &quot;Scoreboard&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REQUESTS_PER_SEC</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$BYTES_PER_SEC</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$BUSY_WORKERS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$IDLE_WORKERS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 函数：获取系统状态</span></span>
<span class="line"><span class="__shiki_1t8gfj">get_system_status</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_21nrsd">    # CPU使用率</span></span>
<span class="line"><span class="__shiki_140thh">    CPU_LOAD</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">top</span><span class="__shiki_dzsirb"> -bn1</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> &quot;Cpu(s)&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2 + $4}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 内存使用</span></span>
<span class="line"><span class="__shiki_140thh">    MEMORY_MB</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">free</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;/^Mem:/ {print $3}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Apache进程数</span></span>
<span class="line"><span class="__shiki_140thh">    APACHE_PROCESSES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">ps</span><span class="__shiki_dzsirb"> -ef</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;[a]pache2\\|[h]ttpd&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接数</span></span>
<span class="line"><span class="__shiki_140thh">    CONNECTIONS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">netstat</span><span class="__shiki_dzsirb"> -an</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> :80</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    KEEPALIVE_CONNS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">netstat</span><span class="__shiki_dzsirb"> -an</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> :80</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> ESTABLISHED</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CPU_LOAD</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$MEMORY_MB</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$APACHE_PROCESSES</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$CONNECTIONS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$KEEPALIVE_CONNS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 函数：分析Scoreboard</span></span>
<span class="line"><span class="__shiki_1t8gfj">analyze_scoreboard</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_140thh">    SCOREBOARD</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 计算各种状态的数量</span></span>
<span class="line"><span class="__shiki_140thh">    OPEN_SLOTS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;_&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    WAITING</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;\\\\.&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    READING</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;R&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    WRITING</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;W&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    KEEPALIVE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;K&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    DNS_LOOKUP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;D&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    CLOSING</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;C&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    LOGGING</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;L&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    FINISHING</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;G&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    CLEANUP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &#39;I&#39;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> wc</span><span class="__shiki_dzsirb"> -l</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$OPEN_SLOTS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$WAITING</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$READING</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$WRITING</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$KEEPALIVE</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$DNS_LOOKUP</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$CLOSING</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$LOGGING</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$FINISHING</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$CLEANUP</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 函数：性能分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">performance_analysis</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> rps</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> cpu</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> workers</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$3</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> queue</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$4</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">CYAN</span><span class="__shiki_mdbnqw">}性能分析:\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 请求速率分析</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (( $(echo </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$rps</span><span class="__shiki_mdbnqw"> &gt; 100&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_140thh"> bc </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">l) )); </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}✓ 高吞吐量: \${</span><span class="__shiki_140thh">rps</span><span class="__shiki_mdbnqw">} 请求/秒\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    elif</span><span class="__shiki_140thh"> (( $(echo </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$rps</span><span class="__shiki_mdbnqw"> &gt; 10&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_140thh"> bc </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">l) )); </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">YELLOW</span><span class="__shiki_mdbnqw">}⚠ 中等吞吐量: \${</span><span class="__shiki_140thh">rps</span><span class="__shiki_mdbnqw">} 请求/秒\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">RED</span><span class="__shiki_mdbnqw">}✗ 低吞吐量: \${</span><span class="__shiki_140thh">rps</span><span class="__shiki_mdbnqw">} 请求/秒\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # CPU分析</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> (( $(echo </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$cpu</span><span class="__shiki_mdbnqw"> &gt; 80&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_140thh"> bc </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">l) )); </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">RED</span><span class="__shiki_mdbnqw">}✗ CPU使用率高: \${</span><span class="__shiki_140thh">cpu</span><span class="__shiki_mdbnqw">}%\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    elif</span><span class="__shiki_140thh"> (( $(echo </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$cpu</span><span class="__shiki_mdbnqw"> &gt; 50&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_140thh"> bc </span><span class="__shiki_1itgoe">-</span><span class="__shiki_140thh">l) )); </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">YELLOW</span><span class="__shiki_mdbnqw">}⚠ CPU使用率中等: \${</span><span class="__shiki_140thh">cpu</span><span class="__shiki_mdbnqw">}%\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}✓ CPU使用率正常: \${</span><span class="__shiki_140thh">cpu</span><span class="__shiki_mdbnqw">}%\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # Worker分析</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> max_workers</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">apachectl</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -i</span><span class="__shiki_mdbnqw"> &quot;mpm&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [[ </span><span class="__shiki_1itgoe">-n</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$max_workers</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh"> ]]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [[ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$max_workers</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_mdbnqw">&quot;prefork&quot;</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> ]]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            MAX_WORKERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;MaxRequestWorkers&quot;</span><span class="__shiki_mdbnqw"> /etc/apache2/mods-enabled/mpm_prefork.conf</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> [[ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$max_workers</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> ==</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_mdbnqw">&quot;worker&quot;</span><span class="__shiki_1itgoe">*</span><span class="__shiki_140thh"> ]]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_140thh">            MAX_WORKERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;MaxRequestWorkers&quot;</span><span class="__shiki_mdbnqw"> /etc/apache2/mods-enabled/mpm_worker.conf</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span></span>
<span class="line"><span class="__shiki_140thh">            MAX_WORKERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">256</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_140thh">        WORKER_USAGE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">workers</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_mdbnqw"> /</span><span class="__shiki_mdbnqw"> MAX_WORKERS</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ $WORKER_USAGE </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 90</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">RED</span><span class="__shiki_mdbnqw">}✗ Worker使用率高: \${</span><span class="__shiki_140thh">workers</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">MAX_WORKERS</span><span class="__shiki_mdbnqw">} (\${</span><span class="__shiki_140thh">WORKER_USAGE</span><span class="__shiki_mdbnqw">}%)\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;建议: 增加MaxRequestWorkers或优化应用&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        elif</span><span class="__shiki_140thh"> [ $WORKER_USAGE </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 70</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">YELLOW</span><span class="__shiki_mdbnqw">}⚠ Worker使用率中等: \${</span><span class="__shiki_140thh">workers</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">MAX_WORKERS</span><span class="__shiki_mdbnqw">} (\${</span><span class="__shiki_140thh">WORKER_USAGE</span><span class="__shiki_mdbnqw">}%)\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        else</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}✓ Worker使用率正常: \${</span><span class="__shiki_140thh">workers</span><span class="__shiki_mdbnqw">}/\${</span><span class="__shiki_140thh">MAX_WORKERS</span><span class="__shiki_mdbnqw">} (\${</span><span class="__shiki_140thh">WORKER_USAGE</span><span class="__shiki_mdbnqw">}%)\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 队列分析</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_140thh"> [ $queue </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">RED</span><span class="__shiki_mdbnqw">}✗ 请求队列过长: \${</span><span class="__shiki_140thh">queue</span><span class="__shiki_mdbnqw">}\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;建议: 增加进程/线程数或优化后端响应时间&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    elif</span><span class="__shiki_140thh"> [ $queue </span><span class="__shiki_1itgoe">-gt</span><span class="__shiki_dzsirb"> 5</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">YELLOW</span><span class="__shiki_mdbnqw">}⚠ 请求队列中等: \${</span><span class="__shiki_140thh">queue</span><span class="__shiki_mdbnqw">}\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">GREEN</span><span class="__shiki_mdbnqw">}✓ 请求队列正常: \${</span><span class="__shiki_140thh">queue</span><span class="__shiki_mdbnqw">}\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主监控循环</span></span>
<span class="line"><span class="__shiki_1t8gfj">monitor_loop</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">PURPLE</span><span class="__shiki_mdbnqw">}Apache性能监控启动... (按Ctrl+C停止)\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;采样间隔: \${</span><span class="__shiki_140thh">INTERVAL</span><span class="__shiki_mdbnqw">}秒\\n&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    while</span><span class="__shiki_dzsirb"> true</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_140thh">        TIMESTAMP</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> &quot;+%Y-%m-%d %H:%M:%S&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取Apache状态</span></span>
<span class="line"><span class="__shiki_140thh">        APACHE_STATUS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">get_apache_status</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        IFS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> RPS</span><span class="__shiki_mdbnqw"> BPS</span><span class="__shiki_mdbnqw"> ACTIVE_WORKERS</span><span class="__shiki_mdbnqw"> IDLE_WORKERS</span><span class="__shiki_mdbnqw"> SCOREBOARD</span><span class="__shiki_1itgoe"> &lt;&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$APACHE_STATUS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 获取系统状态</span></span>
<span class="line"><span class="__shiki_140thh">        SYSTEM_STATUS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">get_system_status</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        IFS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> CPU_LOAD</span><span class="__shiki_mdbnqw"> MEMORY_MB</span><span class="__shiki_mdbnqw"> PROCESS_COUNT</span><span class="__shiki_mdbnqw"> CONNECTIONS</span><span class="__shiki_mdbnqw"> KEEPALIVE</span><span class="__shiki_1itgoe"> &lt;&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SYSTEM_STATUS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 分析Scoreboard</span></span>
<span class="line"><span class="__shiki_140thh">        SCOREBOARD_ANALYSIS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">analyze_scoreboard</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">        IFS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&#39;,&#39;</span><span class="__shiki_dzsirb"> read</span><span class="__shiki_dzsirb"> -r</span><span class="__shiki_mdbnqw"> OPEN_SLOTS</span><span class="__shiki_mdbnqw"> WAITING</span><span class="__shiki_mdbnqw"> READING</span><span class="__shiki_mdbnqw"> WRITING</span><span class="__shiki_mdbnqw"> KEEPALIVE_COUNT</span><span class="__shiki_mdbnqw"> DNS_LOOKUP</span><span class="__shiki_mdbnqw"> CLOSING</span><span class="__shiki_mdbnqw"> LOGGING</span><span class="__shiki_mdbnqw"> FINISHING</span><span class="__shiki_mdbnqw"> CLEANUP</span><span class="__shiki_1itgoe"> &lt;&lt;&lt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$SCOREBOARD_ANALYSIS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 计算请求队列</span></span>
<span class="line"><span class="__shiki_140thh">        REQUEST_QUEUE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$((</span><span class="__shiki_1t8gfj">WAITING</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> READING</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> WRITING</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> DNS_LOOKUP</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> CLOSING</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> LOGGING</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> FINISHING</span><span class="__shiki_mdbnqw"> +</span><span class="__shiki_mdbnqw"> CLEANUP</span><span class="__shiki_140thh">))</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 显示监控信息</span></span>
<span class="line"><span class="__shiki_1t8gfj">        clear</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;==================================================&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;Apache性能监控 - </span><span class="__shiki_140thh">$TIMESTAMP</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;==================================================&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[基本指标]\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;请求速率: </span><span class="__shiki_140thh">$RPS</span><span class="__shiki_mdbnqw"> 请求/秒&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;吞吐量: $((</span><span class="__shiki_1t8gfj">BPS</span><span class="__shiki_mdbnqw"> / </span><span class="__shiki_dzsirb">1024</span><span class="__shiki_mdbnqw">)) KB/秒&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;CPU负载: \${</span><span class="__shiki_140thh">CPU_LOAD</span><span class="__shiki_mdbnqw">}%&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;内存使用: \${</span><span class="__shiki_140thh">MEMORY_MB</span><span class="__shiki_mdbnqw">} MB&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[Worker状态]\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;活跃Worker: </span><span class="__shiki_140thh">$ACTIVE_WORKERS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;空闲Worker: </span><span class="__shiki_140thh">$IDLE_WORKERS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;总Worker: $((</span><span class="__shiki_1t8gfj">ACTIVE_WORKERS</span><span class="__shiki_mdbnqw"> + IDLE_WORKERS))&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[连接状态]\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;总连接数: </span><span class="__shiki_140thh">$CONNECTIONS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;Keep-Alive连接: </span><span class="__shiki_140thh">$KEEPALIVE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">BLUE</span><span class="__shiki_mdbnqw">}[Scoreboard分析]\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;空闲槽位: </span><span class="__shiki_140thh">$OPEN_SLOTS</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;等待请求: </span><span class="__shiki_140thh">$WAITING</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;读取请求: </span><span class="__shiki_140thh">$READING</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;写入响应: </span><span class="__shiki_140thh">$WRITING</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;KeepAlive: </span><span class="__shiki_140thh">$KEEPALIVE_COUNT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;DNS查询: </span><span class="__shiki_140thh">$DNS_LOOKUP</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;请求队列: </span><span class="__shiki_140thh">$REQUEST_QUEUE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 性能分析</span></span>
<span class="line"><span class="__shiki_1t8gfj">        performance_analysis</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$RPS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$CPU_LOAD</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$ACTIVE_WORKERS</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REQUEST_QUEUE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 记录到CSV</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$TIMESTAMP</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$RPS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$BPS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$CPU_LOAD</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$MEMORY_MB</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$ACTIVE_WORKERS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$IDLE_WORKERS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$OPEN_SLOTS</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$REQUEST_QUEUE</span><span class="__shiki_mdbnqw">,</span><span class="__shiki_140thh">$KEEPALIVE</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n\${</span><span class="__shiki_140thh">YELLOW</span><span class="__shiki_mdbnqw">}监控数据已保存到: </span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">\${</span><span class="__shiki_140thh">NC</span><span class="__shiki_mdbnqw">}&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;==================================================&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_140thh"> $INTERVAL</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 启动监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">monitor_loop</span></span></code></pre></div><h2 id="_8-负载均衡与集群优化" tabindex="-1">8. 负载均衡与集群优化 <a class="header-anchor" href="#_8-负载均衡与集群优化" aria-label="Permalink to &quot;8. 负载均衡与集群优化&quot;">​</a></h2><h3 id="_8-1-apache作为负载均衡器" tabindex="-1">8.1 Apache作为负载均衡器 <a class="header-anchor" href="#_8-1-apache作为负载均衡器" aria-label="Permalink to &quot;8.1 Apache作为负载均衡器&quot;">​</a></h3><h4 id="_8-1-1-mod-proxy-balancer优化配置" tabindex="-1">8.1.1 mod_proxy_balancer优化配置 <a class="header-anchor" href="#_8-1-1-mod-proxy-balancer优化配置" aria-label="Permalink to &quot;8.1.1 mod_proxy_balancer优化配置&quot;">​</a></h4><div class="language-apache vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">apache</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd"># /etc/apache2/conf-available/load-balancer-optimized.conf</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_proxy.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_mdbnqw"> mod_proxy_balancer.c</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">        # ========== 负载均衡器配置 ==========</span></span>
<span class="line"><span class="__shiki_1itgoe">        ProxyPass</span><span class="__shiki_140thh"> /balancer-manager !</span></span>
<span class="line"><span class="__shiki_1itgoe">        ProxyPass</span><span class="__shiki_140thh"> / balancer://mycluster/</span></span>
<span class="line"><span class="__shiki_1itgoe">        ProxyPassReverse</span><span class="__shiki_140thh"> / balancer://mycluster/</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # ========== 集群定义 ==========</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_mdbnqw"> balancer://mycluster</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 后端服务器定义</span></span>
<span class="line"><span class="__shiki_1itgoe">            BalancerMember</span><span class="__shiki_140thh"> http://backend1.example.com:</span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh"> route=</span><span class="__shiki_dzsirb">1</span><span class="__shiki_140thh"> loadfactor=</span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_1itgoe">            BalancerMember</span><span class="__shiki_140thh"> http://backend2.example.com:</span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh"> route=</span><span class="__shiki_dzsirb">2</span><span class="__shiki_140thh"> loadfactor=</span><span class="__shiki_dzsirb">30</span></span>
<span class="line"><span class="__shiki_1itgoe">            BalancerMember</span><span class="__shiki_140thh"> http://backend3.example.com:</span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh"> route=</span><span class="__shiki_dzsirb">3</span><span class="__shiki_140thh"> loadfactor=</span><span class="__shiki_dzsirb">40</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # 热备用服务器</span></span>
<span class="line"><span class="__shiki_1itgoe">            BalancerMember</span><span class="__shiki_140thh"> http://backup.example.com:</span><span class="__shiki_dzsirb">80</span><span class="__shiki_140thh"> status=+H</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # ========== 负载均衡算法 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd">            # 可选: byrequests, bytraffic, bybusyness, heartbeat</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet lbmethod=byrequests</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # ========== 会话保持 ==========</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet stickysession=JSESSIONID|jsessionid scolonpathdelim=</span><span class="__shiki_1t8gfj">On</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # ========== 健康检查 ==========</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet failonstatus=</span><span class="__shiki_dzsirb">500</span><span class="__shiki_140thh">,</span><span class="__shiki_dzsirb">503</span><span class="__shiki_140thh">,timeout=</span><span class="__shiki_dzsirb">10</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet maxattempts=</span><span class="__shiki_dzsirb">3</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # ========== 超时设置 ==========</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet timeout=</span><span class="__shiki_dzsirb">300</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet keepalive=</span><span class="__shiki_1t8gfj">On</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet disablereuse=</span><span class="__shiki_1t8gfj">Off</span></span>
<span class="line"><span class="__shiki_140thh">            </span></span>
<span class="line"><span class="__shiki_21nrsd">            # ========== 故障转移 ==========</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet nofailover=</span><span class="__shiki_1t8gfj">Off</span></span>
<span class="line"><span class="__shiki_140thh">            ProxySet retry=</span><span class="__shiki_dzsirb">60</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # ========== 管理器页面 ==========</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /balancer-manager</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            SetHandler</span><span class="__shiki_140thh"> balancer-manager</span></span>
<span class="line"><span class="__shiki_1itgoe">            Require</span><span class="__shiki_140thh"> host localhost</span></span>
<span class="line"><span class="__shiki_1itgoe">            Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">192</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">168</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">16</span></span>
<span class="line"><span class="__shiki_1itgoe">            Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">10</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">/</span><span class="__shiki_dzsirb">8</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # ========== 统计信息 ==========</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /lb-stats</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">            SetHandler</span><span class="__shiki_140thh"> balancer-manager</span></span>
<span class="line"><span class="__shiki_1itgoe">            Require</span><span class="__shiki_140thh"> ip </span><span class="__shiki_dzsirb">127</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">0</span><span class="__shiki_140thh">.</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">        &lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    &lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # ========== 代理通用配置 ==========</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyRequests</span><span class="__shiki_1t8gfj"> Off</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPreserveHost</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyVia</span><span class="__shiki_1t8gfj"> On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接池设置</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyMaxForwards</span><span class="__shiki_dzsirb"> 100</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyBadHeader</span><span class="__shiki_140thh"> Ignore</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 缓冲区优化</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyIOBufferSize</span><span class="__shiki_dzsirb"> 8192</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">IfModule</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 后端连接优化 ==========</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_mdbnqw"> *</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 连接超时</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyTimeout</span><span class="__shiki_dzsirb"> 60</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用连接保持</span></span>
<span class="line"><span class="__shiki_140thh">    ProxySet connectiontimeout=</span><span class="__shiki_dzsirb">5</span></span>
<span class="line"><span class="__shiki_140thh">    ProxySet enablereuse=</span><span class="__shiki_1t8gfj">On</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 禁用SSL验证 (仅在内网使用)</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSLProxyEngine Off</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSLProxyVerify none</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSLProxyCheckPeerCN off</span></span>
<span class="line"><span class="__shiki_21nrsd">    # SSLProxyCheckPeerName off</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">Proxy</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># ========== 基于路径的路由 ==========</span></span>
<span class="line"><span class="__shiki_21nrsd"># API请求路由到特定后端</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_mdbnqw"> /api/</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> http://api-cluster/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> http://api-cluster/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # API特定超时</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyTimeout</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">Location</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 静态文件路由</span></span>
<span class="line"><span class="__shiki_140thh">&lt;</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_mdbnqw"> &quot;\\.(css|js|jpg|jpeg|png|gif)$&quot;</span><span class="__shiki_140thh">&gt;</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPass</span><span class="__shiki_140thh"> http://static-cluster/</span></span>
<span class="line"><span class="__shiki_1itgoe">    ProxyPassReverse</span><span class="__shiki_140thh"> http://static-cluster/</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启用缓存</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheEnable</span><span class="__shiki_140thh"> disk</span></span>
<span class="line"><span class="__shiki_1itgoe">    CacheDefaultExpire</span><span class="__shiki_dzsirb"> 3600</span></span>
<span class="line"><span class="__shiki_140thh">&lt;/</span><span class="__shiki_1t8gfj">LocationMatch</span><span class="__shiki_140thh">&gt;</span></span></code></pre></div><h2 id="_9-压力测试与基准测试" tabindex="-1">9. 压力测试与基准测试 <a class="header-anchor" href="#_9-压力测试与基准测试" aria-label="Permalink to &quot;9. 压力测试与基准测试&quot;">​</a></h2><h3 id="_9-1-自动化性能测试脚本" tabindex="-1">9.1 自动化性能测试脚本 <a class="header-anchor" href="#_9-1-自动化性能测试脚本" aria-label="Permalink to &quot;9.1 自动化性能测试脚本&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># apache-benchmark-suite.sh</span></span>
<span class="line"><span class="__shiki_21nrsd"># Apache性能基准测试套件</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">set</span><span class="__shiki_dzsirb"> -e</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 配置</span></span>
<span class="line"><span class="__shiki_140thh">TEST_DURATION</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">300</span><span class="__shiki_21nrsd">           # 测试持续时间(秒)</span></span>
<span class="line"><span class="__shiki_140thh">CONCURRENT_USERS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">100</span><span class="__shiki_21nrsd">        # 并发用户数</span></span>
<span class="line"><span class="__shiki_140thh">REQUESTS_PER_USER</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">1000</span><span class="__shiki_21nrsd">      # 每个用户请求数</span></span>
<span class="line"><span class="__shiki_140thh">TEST_URL</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;http://localhost/&quot;</span></span>
<span class="line"><span class="__shiki_140thh">REPORT_DIR</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;/var/log/apache-benchmarks&quot;</span></span>
<span class="line"><span class="__shiki_140thh">REPORT_FILE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/benchmark-$(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw"> +%Y%m%d-%H%M%S).json&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 创建报告目录</span></span>
<span class="line"><span class="__shiki_1t8gfj">mkdir</span><span class="__shiki_dzsirb"> -p</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 检查依赖</span></span>
<span class="line"><span class="__shiki_1t8gfj">check_dependencies</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;检查依赖工具...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查ab (Apache Benchmark)</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_dzsirb"> command</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> ab</span><span class="__shiki_140thh"> &amp;</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> /dev/null; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;安装apache2-utils...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> apache2-utils</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查siege</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_dzsirb"> command</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> siege</span><span class="__shiki_140thh"> &amp;</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> /dev/null; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;安装siege...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> siege</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查wrk</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1itgoe"> !</span><span class="__shiki_dzsirb"> command</span><span class="__shiki_dzsirb"> -v</span><span class="__shiki_mdbnqw"> wrk</span><span class="__shiki_140thh"> &amp;</span><span class="__shiki_1itgoe">&gt;</span><span class="__shiki_140thh"> /dev/null; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;安装wrk...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sudo</span><span class="__shiki_mdbnqw"> apt-get</span><span class="__shiki_mdbnqw"> install</span><span class="__shiki_dzsirb"> -y</span><span class="__shiki_mdbnqw"> build-essential</span><span class="__shiki_mdbnqw"> libssl-dev</span></span>
<span class="line"><span class="__shiki_1t8gfj">        git</span><span class="__shiki_mdbnqw"> clone</span><span class="__shiki_mdbnqw"> https://github.com/wg/wrk.git</span><span class="__shiki_mdbnqw"> /tmp/wrk</span></span>
<span class="line"><span class="__shiki_dzsirb">        cd</span><span class="__shiki_mdbnqw"> /tmp/wrk</span><span class="__shiki_140thh"> &amp;&amp; </span><span class="__shiki_1t8gfj">make</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sudo</span><span class="__shiki_mdbnqw"> cp</span><span class="__shiki_mdbnqw"> wrk</span><span class="__shiki_mdbnqw"> /usr/local/bin/</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 预热阶段</span></span>
<span class="line"><span class="__shiki_1t8gfj">warmup</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;预热服务器...&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    ab</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_dzsirb"> 1000</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_dzsirb"> 10</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$TEST_URL</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> /dev/null</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_dzsirb"> 5</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用ab进行基准测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">run_ab_test</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;运行Apache Benchmark测试...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> test_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> concurrent</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> requests</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$3</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;测试: </span><span class="__shiki_140thh">$test_name</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;并发: </span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;请求: </span><span class="__shiki_140thh">$requests</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    ab</span><span class="__shiki_dzsirb"> -k</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$requests</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -g</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/ab-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.tsv&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        -e</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/ab-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.csv&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$TEST_URL</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/ab-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.txt&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 提取关键指标</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> rps</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;Requests per second&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/ab-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.txt&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $4}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> transfer</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;Transfer rate&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/ab-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.txt&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $3}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> p95</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;95%&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/ab-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.txt&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;结果: RPS=</span><span class="__shiki_140thh">$rps</span><span class="__shiki_mdbnqw">, 吞吐量=\${</span><span class="__shiki_140thh">transfer</span><span class="__shiki_mdbnqw">}KB/s, P95=</span><span class="__shiki_140thh">$p95</span><span class="__shiki_mdbnqw"> ms&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">test</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_140thh">$test_name</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">concurrent</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">rps</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$rps</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">throughput</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$transfer</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">p95</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$p95</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用siege进行压力测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">run_siege_test</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;运行Siege压力测试...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> test_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> concurrent</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> time</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$3</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    siege</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">time</span><span class="__shiki_mdbnqw">}s&quot;</span><span class="__shiki_dzsirb"> -b</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$TEST_URL</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --log=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/siege-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.log&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --mark=</span><span class="__shiki_mdbnqw">&quot;\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --full-url</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 分析结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> transactions</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;Transaction rate&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/siege-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.log&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $3}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> response_time</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;Response time&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/siege-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.log&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $3}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> availability</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;Availability&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/siege-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.log&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;结果: 事务率=</span><span class="__shiki_140thh">$transactions</span><span class="__shiki_mdbnqw">, 响应时间=</span><span class="__shiki_140thh">$response_time</span><span class="__shiki_mdbnqw">, 可用性=</span><span class="__shiki_140thh">$availability</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">test</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">siege_</span><span class="__shiki_140thh">$test_name</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">concurrent</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">transactions</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$transactions</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">response_time</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$response_time</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">availability</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$availability</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 使用wrk进行高级测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">run_wrk_test</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;运行WRK高级测试...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> test_name</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> threads</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$2</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> connections</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$3</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> duration</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$4</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    wrk</span><span class="__shiki_dzsirb"> -t</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$threads</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -c</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$connections</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> -d</span><span class="__shiki_mdbnqw">&quot;\${</span><span class="__shiki_140thh">duration</span><span class="__shiki_mdbnqw">}s&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">        --latency</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$TEST_URL</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/wrk-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.txt&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 提取结果</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> rps</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;Requests/sec&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/wrk-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.txt&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> transfer</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">grep</span><span class="__shiki_mdbnqw"> &quot;Transfer/sec&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/wrk-\${</span><span class="__shiki_140thh">test_name</span><span class="__shiki_mdbnqw">}.txt&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{print $2}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;结果: RPS=</span><span class="__shiki_140thh">$rps</span><span class="__shiki_mdbnqw">, 吞吐量=</span><span class="__shiki_140thh">$transfer</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;{</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">test</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">wrk_</span><span class="__shiki_140thh">$test_name</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">threads</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$threads</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">connections</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$connections</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">rps</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$rps</span><span class="__shiki_mdbnqw">, </span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">throughput</span><span class="__shiki_dzsirb">\\&quot;</span><span class="__shiki_mdbnqw">: </span><span class="__shiki_140thh">$transfer</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 监控系统资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">monitor_resources</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;监控系统资源使用...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> duration</span><span class="__shiki_1itgoe">=</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb">$1</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    local</span><span class="__shiki_140thh"> interval</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">1</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 启动监控</span></span>
<span class="line"><span class="__shiki_1t8gfj">    vmstat</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$interval</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$duration</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/vmstat.txt&quot;</span><span class="__shiki_140thh"> &amp;</span></span>
<span class="line"><span class="__shiki_140thh">    VMSTAT_PID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">$!</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    mpstat</span><span class="__shiki_dzsirb"> -P</span><span class="__shiki_mdbnqw"> ALL</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$interval</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$duration</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/mpstat.txt&quot;</span><span class="__shiki_140thh"> &amp;</span></span>
<span class="line"><span class="__shiki_140thh">    MPSTAT_PID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">$!</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    iostat</span><span class="__shiki_dzsirb"> -dx</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$interval</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$duration</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/iostat.txt&quot;</span><span class="__shiki_140thh"> &amp;</span></span>
<span class="line"><span class="__shiki_140thh">    IOSTAT_PID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">$!</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 等待监控完成</span></span>
<span class="line"><span class="__shiki_1t8gfj">    sleep</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$duration</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 停止监控进程</span></span>
<span class="line"><span class="__shiki_dzsirb">    kill</span><span class="__shiki_140thh"> $VMSTAT_PID $MPSTAT_PID $IOSTAT_PID </span><span class="__shiki_1itgoe">2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 生成测试报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">generate_report</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;生成性能测试报告...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/report.html&quot;</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;head&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;title&gt;Apache性能测试报告 - $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&lt;/title&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        body { font-family: Arial, sans-serif; margin: 40px; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .header { background: #f0f0f0; padding: 20px; border-radius: 5px; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .metric { background: #e8f4f8; padding: 15px; margin: 10px 0; border-radius: 3px; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .chart { width: 100%; height: 300px; background: #f9f9f9; margin: 20px 0; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        table { width: 100%; border-collapse: collapse; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        th { background-color: #4CAF50; color: white; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .good { color: green; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .warning { color: orange; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">        .bad { color: red; }</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/style&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;/head&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;body&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div class=&quot;header&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;h1&gt;Apache性能测试报告&lt;/h1&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;p&gt;测试时间: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)&lt;/p&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;p&gt;测试URL: </span><span class="__shiki_140thh">$TEST_URL</span><span class="__shiki_mdbnqw">&lt;/p&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;h2&gt;测试概要&lt;/h2&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div class=&quot;metric&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;p&gt;&lt;strong&gt;测试配置:&lt;/strong&gt;&lt;/p&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;ul&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &lt;li&gt;持续时间: \${</span><span class="__shiki_140thh">TEST_DURATION</span><span class="__shiki_mdbnqw">}秒&lt;/li&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &lt;li&gt;并发用户: \${</span><span class="__shiki_140thh">CONCURRENT_USERS</span><span class="__shiki_mdbnqw">}&lt;/li&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">            &lt;li&gt;总请求数: $((</span><span class="__shiki_140thh">$CONCURRENT_USERS</span><span class="__shiki_1itgoe"> *</span><span class="__shiki_140thh"> $REQUESTS_PER_USER</span><span class="__shiki_mdbnqw">))&lt;/li&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;/ul&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;h2&gt;测试结果&lt;/h2&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div id=&quot;results&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;!-- 结果将通过JavaScript动态加载 --&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;h2&gt;系统资源使用&lt;/h2&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div class=&quot;chart&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;!-- 这里可以添加图表 --&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;h2&gt;优化建议&lt;/h2&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;div id=&quot;recommendations&quot;&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        &lt;!-- 优化建议将通过JavaScript动态生成 --&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/div&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">    </span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;script&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">        // 这里可以添加JavaScript来解析JSON结果并生成动态内容</span></span>
<span class="line"><span class="__shiki_mdbnqw">        fetch(&#39;$(</span><span class="__shiki_1t8gfj">basename</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;)&#39;)</span></span>
<span class="line"><span class="__shiki_mdbnqw">            .then(response =&gt; response.json())</span></span>
<span class="line"><span class="__shiki_mdbnqw">            .then(data =&gt; {</span></span>
<span class="line"><span class="__shiki_mdbnqw">                // 处理测试数据</span></span>
<span class="line"><span class="__shiki_mdbnqw">                console.log(data);</span></span>
<span class="line"><span class="__shiki_mdbnqw">            });</span></span>
<span class="line"><span class="__shiki_mdbnqw">    &lt;/script&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;/body&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">&lt;/html&gt;</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;报告已生成: </span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/report.html&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 分析结果并提供建议</span></span>
<span class="line"><span class="__shiki_1t8gfj">analyze_and_recommend</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;分析测试结果并提供优化建议...&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    cat</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/recommendations.txt&quot;</span><span class="__shiki_1itgoe"> &lt;&lt;</span><span class="__shiki_mdbnqw"> EOF</span></span>
<span class="line"><span class="__shiki_mdbnqw">Apache性能优化建议</span></span>
<span class="line"><span class="__shiki_mdbnqw">===================</span></span>
<span class="line"><span class="__shiki_mdbnqw">测试时间: $(</span><span class="__shiki_1t8gfj">date</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_mdbnqw">测试URL: </span><span class="__shiki_140thh">$TEST_URL</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">1. MPM配置建议:</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 当前MPM: $(</span><span class="__shiki_1t8gfj">apachectl</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_mdbnqw"> mpm_ </span><span class="__shiki_1itgoe">|</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -1</span><span class="__shiki_mdbnqw">)</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 建议根据并发模式调整MaxRequestWorkers</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">2. 内存优化:</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 当前内存使用: $(</span><span class="__shiki_1t8gfj">free</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;/^Mem:/ {print $3}&#39;) MB / $(</span><span class="__shiki_1t8gfj">free</span><span class="__shiki_dzsirb"> -m</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;/^Mem:/ {print $2}&#39;) MB</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 建议确保MaxRequestWorkers × 平均进程内存 &lt; 可用内存</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">3. 连接优化:</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 调整KeepAliveTimeout和MaxKeepAliveRequests</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 考虑启用HTTP/2</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">4. 缓存优化:</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 确保mod_cache正确配置</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 优化Expires和Cache-Control头</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">5. 操作系统优化:</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 调整文件描述符限制</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 优化TCP/IP栈参数</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 考虑使用更快的文件系统(如XFS)</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_mdbnqw">6. 监控建议:</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 启用mod_status进行实时监控</span></span>
<span class="line"><span class="__shiki_mdbnqw">   - 设置性能基线并进行定期测试</span></span>
<span class="line"><span class="__shiki_mdbnqw">EOF</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1t8gfj">    cat</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">/recommendations.txt&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 主测试流程</span></span>
<span class="line"><span class="__shiki_1t8gfj">main</span><span class="__shiki_140thh">() {</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;开始Apache性能基准测试套件&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;==============================&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查依赖</span></span>
<span class="line"><span class="__shiki_1t8gfj">    check_dependencies</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 初始化JSON报告</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;[&quot;</span><span class="__shiki_1itgoe"> &gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 预热</span></span>
<span class="line"><span class="__shiki_1t8gfj">    warmup</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 运行不同并发级别的测试</span></span>
<span class="line"><span class="__shiki_140thh">    CONCURRENCY_LEVELS</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_dzsirb">10</span><span class="__shiki_dzsirb"> 50</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_dzsirb"> 200</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_1itgoe">    for</span><span class="__shiki_140thh"> concurrent </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">CONCURRENCY_LEVELS</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;测试并发级别: </span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 监控资源</span></span>
<span class="line"><span class="__shiki_1t8gfj">        monitor_resources</span><span class="__shiki_dzsirb"> 60</span><span class="__shiki_140thh"> &amp;</span></span>
<span class="line"><span class="__shiki_140thh">        MONITOR_PID</span><span class="__shiki_1itgoe">=</span><span class="__shiki_dzsirb">$!</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 运行ab测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">        run_ab_test</span><span class="__shiki_mdbnqw"> &quot;concurrent_\${</span><span class="__shiki_140thh">concurrent</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_mdbnqw"> &quot;$((</span><span class="__shiki_1t8gfj">concurrent</span><span class="__shiki_dzsirb"> *</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_mdbnqw">))&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 运行siege测试</span></span>
<span class="line"><span class="__shiki_1t8gfj">        run_siege_test</span><span class="__shiki_mdbnqw"> &quot;stress_\${</span><span class="__shiki_140thh">concurrent</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 运行wrk测试</span></span>
<span class="line"><span class="__shiki_1itgoe">        if</span><span class="__shiki_140thh"> [ </span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_1itgoe"> -le</span><span class="__shiki_dzsirb"> 100</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_1t8gfj">            run_wrk_test</span><span class="__shiki_mdbnqw"> &quot;advanced_\${</span><span class="__shiki_140thh">concurrent</span><span class="__shiki_mdbnqw">}&quot;</span><span class="__shiki_dzsirb"> 4</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$concurrent</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_dzsirb"> 30</span></span>
<span class="line"><span class="__shiki_1itgoe">        fi</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 等待监控完成</span></span>
<span class="line"><span class="__shiki_dzsirb">        wait</span><span class="__shiki_140thh"> $MONITOR_PID</span></span>
<span class="line"><span class="__shiki_140thh">        </span></span>
<span class="line"><span class="__shiki_21nrsd">        # 测试间隔</span></span>
<span class="line"><span class="__shiki_1t8gfj">        sleep</span><span class="__shiki_dzsirb"> 10</span></span>
<span class="line"><span class="__shiki_1itgoe">    done</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 完成JSON报告</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;]&quot;</span><span class="__shiki_1itgoe"> &gt;&gt;</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$REPORT_FILE</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 生成报告</span></span>
<span class="line"><span class="__shiki_1t8gfj">    generate_report</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_21nrsd">    # 提供优化建议</span></span>
<span class="line"><span class="__shiki_1t8gfj">    analyze_and_recommend</span></span>
<span class="line"><span class="__shiki_140thh">    </span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;测试完成! 详细结果请查看: </span><span class="__shiki_140thh">$REPORT_DIR</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_140thh">}</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 执行主函数</span></span>
<span class="line"><span class="__shiki_1t8gfj">main</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_dzsirb">$@</span><span class="__shiki_mdbnqw">&quot;</span></span></code></pre></div><h2 id="_10-优化策略总结" tabindex="-1">10. 优化策略总结 <a class="header-anchor" href="#_10-优化策略总结" aria-label="Permalink to &quot;10. 优化策略总结&quot;">​</a></h2><h3 id="_10-1-性能优化检查清单" tabindex="-1">10.1 性能优化检查清单 <a class="header-anchor" href="#_10-1-性能优化检查清单" aria-label="Permalink to &quot;10.1 性能优化检查清单&quot;">​</a></h3><h4 id="配置优化检查清单" tabindex="-1">配置优化检查清单 <a class="header-anchor" href="#配置优化检查清单" aria-label="Permalink to &quot;配置优化检查清单&quot;">​</a></h4><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_21nrsd">#!/bin/bash</span></span>
<span class="line"><span class="__shiki_21nrsd"># apache-optimization-checklist.sh</span></span>
<span class="line"><span class="__shiki_21nrsd"># Apache性能优化检查清单</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;Apache性能优化检查清单&quot;</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;======================&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 1. MPM配置检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n1. MPM配置检查:&quot;</span></span>
<span class="line"><span class="__shiki_140thh">MPM_TYPE</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">apachectl</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> &quot;mpm_[a-z]*&quot;</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> head</span><span class="__shiki_dzsirb"> -1</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;   MPM类型: \${</span><span class="__shiki_140thh">MPM_TYPE</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_mdbnqw">未检测到}&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_1itgoe">case</span><span class="__shiki_140thh"> $MPM_TYPE </span><span class="__shiki_1itgoe">in</span></span>
<span class="line"><span class="__shiki_21q97f">    mpm_prefork</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;StartServers|MinSpareServers|MaxSpareServers|MaxRequestWorkers&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            /etc/apache2/mods-enabled/mpm_prefork.conf</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;   配置未找到&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_21q97f">    mpm_worker</span><span class="__shiki_1itgoe">|</span><span class="__shiki_21q97f">mpm_event</span><span class="__shiki_1itgoe">)</span></span>
<span class="line"><span class="__shiki_1t8gfj">        grep</span><span class="__shiki_dzsirb"> -E</span><span class="__shiki_mdbnqw"> &quot;StartServers|ThreadsPerChild|MaxRequestWorkers&quot;</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_mdbnqw">            /etc/apache2/mods-enabled/</span><span class="__shiki_140thh">$MPM_TYPE</span><span class="__shiki_mdbnqw">.conf</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> ||</span><span class="__shiki_dzsirb"> \\</span></span>
<span class="line"><span class="__shiki_dzsirb">            echo</span><span class="__shiki_mdbnqw"> &quot;   配置未找到&quot;</span></span>
<span class="line"><span class="__shiki_140thh">        ;;</span></span>
<span class="line"><span class="__shiki_1itgoe">esac</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 2. 模块检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n2. 必要模块检查:&quot;</span></span>
<span class="line"><span class="__shiki_140thh">REQUIRED_MODULES</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">(</span><span class="__shiki_mdbnqw">&quot;deflate&quot;</span><span class="__shiki_mdbnqw"> &quot;expires&quot;</span><span class="__shiki_mdbnqw"> &quot;headers&quot;</span><span class="__shiki_mdbnqw"> &quot;rewrite&quot;</span><span class="__shiki_mdbnqw"> &quot;cache&quot;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_1itgoe">for</span><span class="__shiki_140thh"> module </span><span class="__shiki_1itgoe">in</span><span class="__shiki_mdbnqw"> &quot;\${</span><span class="__shiki_140thh">REQUIRED_MODULES</span><span class="__shiki_mdbnqw">[</span><span class="__shiki_1itgoe">@</span><span class="__shiki_mdbnqw">]}&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">do</span></span>
<span class="line"><span class="__shiki_1itgoe">    if</span><span class="__shiki_1t8gfj"> apachectl</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;</span><span class="__shiki_140thh">$module</span><span class="__shiki_mdbnqw">&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;   ✓ </span><span class="__shiki_140thh">$module模块已启用</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    else</span></span>
<span class="line"><span class="__shiki_dzsirb">        echo</span><span class="__shiki_mdbnqw"> &quot;   ✗ </span><span class="__shiki_140thh">$module模块未启用</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">    fi</span></span>
<span class="line"><span class="__shiki_1itgoe">done</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 3. 压缩配置检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n3. 压缩配置检查:&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;DeflateCompressionLevel&quot;</span><span class="__shiki_mdbnqw"> /etc/apache2/mods-enabled/deflate.conf</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✓ 压缩已配置&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✗ 压缩未配置&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 4. 缓存配置检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n4. 缓存配置检查:&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;ExpiresActive&quot;</span><span class="__shiki_mdbnqw"> /etc/apache2/mods-enabled/expires.conf</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✓ Expires头已配置&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✗ Expires头未配置&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 5. 连接配置检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n5. 连接配置检查:&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;KeepAlive&quot;</span><span class="__shiki_mdbnqw"> /etc/apache2/apache2.conf</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✓ KeepAlive已配置&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✗ KeepAlive未配置&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 6. 安全头检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n6. 安全/性能头检查:&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> apachectl</span><span class="__shiki_dzsirb"> -M</span><span class="__shiki_1itgoe"> 2&gt;</span><span class="__shiki_mdbnqw">/dev/null</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> headers</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✓ headers模块已启用&quot;</span></span>
<span class="line"><span class="__shiki_21nrsd">    # 检查常见安全头</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   安全头配置检查需要查看具体站点配置&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✗ headers模块未启用&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 7. 文件描述符检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n7. 系统限制检查:&quot;</span></span>
<span class="line"><span class="__shiki_140thh">ULIMIT</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_dzsirb">ulimit</span><span class="__shiki_dzsirb"> -n</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;   当前文件描述符限制: </span><span class="__shiki_140thh">$ULIMIT</span><span class="__shiki_mdbnqw">&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_140thh"> [ $ULIMIT </span><span class="__shiki_1itgoe">-lt</span><span class="__shiki_dzsirb"> 10000</span><span class="__shiki_140thh"> ]; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ⚠ 建议增加到至少10000&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 8. 内存使用检查</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n8. 内存使用检查:&quot;</span></span>
<span class="line"><span class="__shiki_140thh">APACHE_MEM</span><span class="__shiki_1itgoe">=</span><span class="__shiki_140thh">$(</span><span class="__shiki_1t8gfj">ps</span><span class="__shiki_dzsirb"> -u</span><span class="__shiki_mdbnqw"> www-data</span><span class="__shiki_dzsirb"> -o</span><span class="__shiki_mdbnqw"> rss=</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> awk</span><span class="__shiki_mdbnqw"> &#39;{sum+=$1} END {print sum/1024}&#39;</span><span class="__shiki_140thh">)</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_mdbnqw"> &quot;   Apache总内存使用: \${</span><span class="__shiki_140thh">APACHE_MEM</span><span class="__shiki_1itgoe">:-</span><span class="__shiki_140thh">0</span><span class="__shiki_mdbnqw">} MB&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_21nrsd"># 9. 配置验证</span></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n9. 配置语法检查:&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">if</span><span class="__shiki_1t8gfj"> apachectl</span><span class="__shiki_mdbnqw"> configtest</span><span class="__shiki_1itgoe"> 2&gt;&amp;1</span><span class="__shiki_1itgoe"> |</span><span class="__shiki_1t8gfj"> grep</span><span class="__shiki_dzsirb"> -q</span><span class="__shiki_mdbnqw"> &quot;Syntax OK&quot;</span><span class="__shiki_140thh">; </span><span class="__shiki_1itgoe">then</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✓ 配置语法正确&quot;</span></span>
<span class="line"><span class="__shiki_1itgoe">else</span></span>
<span class="line"><span class="__shiki_dzsirb">    echo</span><span class="__shiki_mdbnqw"> &quot;   ✗ 配置有错误&quot;</span></span>
<span class="line"><span class="__shiki_1t8gfj">    apachectl</span><span class="__shiki_mdbnqw"> configtest</span></span>
<span class="line"><span class="__shiki_1itgoe">fi</span></span>
<span class="line"></span>
<span class="line"><span class="__shiki_dzsirb">echo</span><span class="__shiki_dzsirb"> -e</span><span class="__shiki_mdbnqw"> &quot;\\n检查完成!&quot;</span></span></code></pre></div><h3 id="_10-2-性能优化优先级矩阵" tabindex="-1">10.2 性能优化优先级矩阵 <a class="header-anchor" href="#_10-2-性能优化优先级矩阵" aria-label="Permalink to &quot;10.2 性能优化优先级矩阵&quot;">​</a></h3><table tabindex="0"><thead><tr><th>优化项</th><th>影响程度</th><th>实施难度</th><th>推荐优先级</th><th>预期性能提升</th></tr></thead><tbody><tr><td><strong>启用KeepAlive</strong></td><td>高</td><td>低</td><td>P0</td><td>20-50%</td></tr><tr><td><strong>启用压缩</strong></td><td>中</td><td>低</td><td>P0</td><td>10-70% (取决于内容)</td></tr><tr><td><strong>调整MPM参数</strong></td><td>高</td><td>中</td><td>P1</td><td>30-100%</td></tr><tr><td><strong>启用缓存头</strong></td><td>高</td><td>低</td><td>P1</td><td>20-60%</td></tr><tr><td><strong>操作系统调优</strong></td><td>中</td><td>高</td><td>P2</td><td>10-30%</td></tr><tr><td><strong>启用mod_cache</strong></td><td>高</td><td>中</td><td>P2</td><td>50-300%</td></tr><tr><td><strong>启用HTTP/2</strong></td><td>中</td><td>中</td><td>P3</td><td>10-30%</td></tr><tr><td><strong>启用Brotli压缩</strong></td><td>中</td><td>中</td><td>P3</td><td>5-20%</td></tr></tbody></table><h3 id="_10-3-性能监控指标基准" tabindex="-1">10.3 性能监控指标基准 <a class="header-anchor" href="#_10-3-性能监控指标基准" aria-label="Permalink to &quot;10.3 性能监控指标基准&quot;">​</a></h3><h4 id="健康指标基准值" tabindex="-1">健康指标基准值 <a class="header-anchor" href="#健康指标基准值" aria-label="Permalink to &quot;健康指标基准值&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">请求吞吐量(RPS):</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 良好: &gt; 1000 请求/秒</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 正常: 100-1000 请求/秒  </span></span>
<span class="line"><span class="__shiki_wvjl67">    - 警告: &lt; 100 请求/秒</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">响应时间(P95):</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 优秀: &lt; 100ms</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 良好: 100-500ms</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 警告: &gt; 500ms</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">内存使用:</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 安全: &lt; 70% 总内存</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 警告: 70-90% 总内存</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 危险: &gt; 90% 总内存</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">CPU使用率:</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 安全: &lt; 70%</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 警告: 70-90%</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 危险: &gt; 90%</span></span>
<span class="line"><span class="__shiki_wvjl67"></span></span>
<span class="line"><span class="__shiki_wvjl67">Worker使用率:</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 安全: &lt; 70% MaxRequestWorkers</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 警告: 70-90% MaxRequestWorkers</span></span>
<span class="line"><span class="__shiki_wvjl67">    - 危险: &gt; 90% MaxRequestWorkers</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>Apache性能优化是一个系统工程，需要从多个层面综合考虑：</p><h3 id="关键原则" tabindex="-1">关键原则： <a class="header-anchor" href="#关键原则" aria-label="Permalink to &quot;关键原则：&quot;">​</a></h3><ol><li><strong>测量优先</strong>：优化前先建立性能基准</li><li><strong>渐进优化</strong>：一次只改变一个变量，测量效果</li><li><strong>持续监控</strong>：优化后持续监控性能变化</li><li><strong>平衡艺术</strong>：在性能、资源、稳定性间找到平衡点</li></ol><h3 id="最佳实践流程" tabindex="-1">最佳实践流程： <a class="header-anchor" href="#最佳实践流程" aria-label="Permalink to &quot;最佳实践流程：&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span class="__shiki_wvjl67">1. 基准测试 → 建立性能基线</span></span>
<span class="line"><span class="__shiki_wvjl67">2. 配置优化 → 调整MPM和核心参数  </span></span>
<span class="line"><span class="__shiki_wvjl67">3. 内容优化 → 启用压缩和缓存</span></span>
<span class="line"><span class="__shiki_wvjl67">4. 系统优化 → 调整操作系统参数</span></span>
<span class="line"><span class="__shiki_wvjl67">5. 架构优化 → 考虑负载均衡和集群</span></span>
<span class="line"><span class="__shiki_wvjl67">6. 持续监控 → 建立监控和告警</span></span></code></pre></div><h3 id="工具链推荐" tabindex="-1">工具链推荐： <a class="header-anchor" href="#工具链推荐" aria-label="Permalink to &quot;工具链推荐：&quot;">​</a></h3><ul><li><strong>监控工具</strong>：mod_status, Apache Exporter (Prometheus), New Relic</li><li><strong>测试工具</strong>：ab, wrk, siege, JMeter</li><li><strong>分析工具</strong>：goaccess, awstats, ELK Stack</li><li><strong>调优工具</strong>：ApacheBench, WebPageTest, Lighthouse</li></ul><p>通过系统化的优化策略，Apache可以支持从中小型网站到大型企业级应用的各种场景，关键是根据实际负载特征进行有针对性的调优。</p>`,78)])])}const r=a(i,[["render",l]]);export{d as __pageData,r as default};
